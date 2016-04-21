import React from 'react';
import ReactDOM from 'react-dom';
import SearchStore from "../stores/search";
import WebUtil from '../util/web-util';
import { Link } from 'react-router';
import DOMUtil from '../util/dom-util';
import SearchActions from '../actions/search-actions';
import Infinite from 'react-infinite';

function getItemFields(item) {
	let fields = {
		id: item.id
	};
	switch (item._type) {
		case 'User':
			fields.url = '/user/' + item.username;
			fields.type = 'User';
			fields.text = item.username
			break;
		case 'Project':
			fields.url = '/projects/' + item.slug;
			fields.type = 'Project';
			fields.text = item.title;
			break;
		case 'SourceFile':
			fields.url = '/projects/' + item.project_slug + '/files/' + item.slug;
			fields.type = 'File';
			fields.text = item.name;
			break;
	}
	return fields;
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			query: '',
			results: SearchStore.allBarResults()
		};
	}

  componentDidMount() {
    this.storeListener = SearchStore.addListener(() => {
			// Prevent erasing queries while waiting on a request to run after
			if (this.state.query.length <= 2) {
				this.setState({ results: [] });
			} else {
				this.setState({ results: SearchStore.allBarResults() });
			}
		});

		this.clickListener = e => {
			let searchBar = ReactDOM.findDOMNode(this.refs.searchBar);
			if (DOMUtil.hasAncestor(e.target, searchBar)) return;

			SearchActions.clearSearchBar();
		};
		document.addEventListener('mousedown', this.clickListener);
  }

  componentWillUnmount() {
    this.storeListener.remove();
		document.removeEventListener('mousedown', this.clickListener);
  }

  componentWillReceiveProps(newProps) {
    // this.setState({
    //   query: ''
    // });
    // SearchActions.clearSearchBar();
    let searchText = ReactDOM.findDOMNode(this.refs.searchText);
    searchText.value = '';
  }

  handleInputChange(e) {
    var query = e.currentTarget.value;
    this.setState({ query: query }, () => {
			// Only query if the search is long enough
      if (query.length > 2) {
        this.search();
      } else {
				SearchActions.clearSearchBar();
			}
    });
  }

  search(e) {
    WebUtil.searchBar(this.state.query);
  }

	onLinkClick(e) {
		SearchActions.clearSearchBar();
	}

  resultList() {
		let makeLink = (fields) => {
			return (
				<li key={fields.id}>
					<Link
						onClick={this.onLinkClick.bind(this)}
						to={fields.url}>
						{fields.type} - {fields.text}
					</Link>
				</li>
			);
		};

    return this.state.results.map(function (result) {
			let fields = getItemFields(result);
			return makeLink(fields);
    });
  }

	_handleSubmit(e) {
		e.preventDefault();

		SearchActions.clearSearchBar();
    this.context.router.push('/search/?q=' + this.state.query);
	}

  render() {
    return (
			<div className="search-bar" ref="searchBar">
				<div className="search">
					<form onSubmit={this._handleSubmit.bind(this)}>
						<input
							type="text"
							placeholder="Search projects &amp; more"
							onChange={ this.handleInputChange.bind(this) }
              ref="searchText" />
						<span
							onClick={this._handleSubmit.bind(this)}
							className="search-icon input-icon fa fa-search">
						</span>
					</form>
				</div>
				<article className="search-bar-results">
					<ul>
						{ this.resultList() }
					</ul>
				</article>
			</div>
    );
  }
}
SearchBar.contextTypes = {
  router: React.PropTypes.object.isRequired
};

module.exports.SearchBar = SearchBar;

class SearchItem extends React.Component {
	render() {
		return (
			<li className="list-result">
				<Link
					onClick={this.props.onClick}
					to={this.props.url}>
					{this.props.type} - {this.props.text}
				</Link>
			</li>
		);
	}
}

class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			results: [],
			isInfiniteLoading: false
		};
	}

  componentDidMount() {
    this.storeListener = SearchStore.addListener(() => {
			this.setState({ results: this.buildResults() });
		});
		this.search(1);
  }

  componentWillUnmount() {
    this.storeListener.remove();
  }

	componentWillReceiveProps(newProps) {
		this.setState({
			results: [],
			isInfiniteLoading: false
		});
		this.search(1, newProps.location.query.q);
	}

  search(page, query) {
		let searchQuery = query || this.props.location.query.q || '';
		if (searchQuery === '') return;

		WebUtil.search(searchQuery, page, response => {
			this.setState({
				results: this.buildResults(),
				isInfiniteLoading: false
			});
		});
  }

  nextPage() {
		let meta = SearchStore.meta();
		if (meta.page >= meta.total_pages) {
			return;
		}

		this.search(meta.page + 1 || 1);
  }

  buildResults() {
		let newResults = SearchStore.all();
		let results = [];

		// Generate results hash to check for existing results quicker
		let currentResults = {};
		for (let i = 0; i < this.state.results.length; ++i) {
			let result = this.state.results[i];
			currentResults[result.id] = result;
		}

		for (let i = 0; i < newResults.length; ++i) {
			let result = newResults[i];
			if (!currentResults[result.id]) {
				results.push(result);
			}
		}

    return this.state.results.concat(results);
  }

  handleInfiniteLoad() {
		let meta = SearchStore.meta();
		if (meta.page >= meta.total_pages) {
			this.setState({
				isInfiniteLoading: false
			});
			return;
		}

    this.setState({
      isInfiniteLoading: true
    });
		this.nextPage();
  }

  elementInfiniteLoad() {
    return (
			<div className="infinite-list-loading">
				<div className="loader">Loading...</div>
			</div>
		);
  }

  render() {
		let results = this.state.results.map(result => {
			let fields = getItemFields(result);
			return (
				<SearchItem
					key={'search-' + fields.type + '-' + fields.id}
					type={fields.type}
					text={fields.text}
					url={fields.url}
					onClick={()=>{}} />
			);
		});

		let meta = SearchStore.meta();
		let resultText = '';
		if (meta.total_count === 1) {
			resultText = '1 result';
		} else {
			resultText = (meta.total_count || 0) + ' results';
		}
    return (
      <article className="search-results list-index">
				<h1>
					{resultText} for "{this.props.location.query.q}"
				</h1>
				<ul className="primary-list">
					<Infinite
						elementHeight={60}
						useWindowAsScrollContainer
						infiniteLoadBeginEdgeOffset={200}
						onInfiniteLoad={this.handleInfiniteLoad.bind(this)}
						loadingSpinnerDelegate={this.elementInfiniteLoad()}
						isInfiniteLoading={this.state.isInfiniteLoading}
					>
						{results}
					</Infinite>
				</ul>
      </article>
    );
  }
}

export default Search;
