import React from 'react';
import ReactDOM from 'react-dom';
import SearchStore from "../stores/search";
import WebUtil from '../util/web-util';
import { Link } from 'react-router';
import DOMUtil from '../util/dom-util';
import SearchActions from '../actions/search-actions';

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
			this.setState({ results: SearchStore.allBarResults() });
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

  handleInputChange(e) {
    var query = e.currentTarget.value;
    this.setState({ query: query }, () => {
      if (query.length > 2) {
        this.search();
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
		let makeLink = (id, link, type, text) => {
			return (
				<li key={id}>
					<Link
						onClick={this.onLinkClick.bind(this)}
						to={link}>
						{type} - {text}
					</Link>
				</li>
			);
		};

    return this.state.results.map(function (result) {
			switch (result._type) {
				case 'User':
					return makeLink(
						result.id,
						'/user/' + result.username,
						'User',
						result.username
					);
					break;
				case 'Project':
					return makeLink(
						result.id,
						'/projects/' + result.slug,
						'Project',
						result.title
					);
					break;
				case 'SourceFile':
					return makeLink(
						result.id,
						'/projects/' + result.project_slug + '/files/' + result.slug,
						'File',
						result.name
					);
					break;
				default:
					return '';
			}
    });
  }

	_handleSubmit(e) {
		e.preventDefault();

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
							onChange={ this.handleInputChange.bind(this) }/>
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

class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			query: props.location.query.q || '',
			results: SearchStore.all()
		};
	}

  componentDidMount() {
    this.storeListener = SearchStore.addListener(() => {
			this.setState({ results: SearchStore.all() });
		});
		this.search();
  }

  componentWillUnmount() {
    this.storeListener.remove();
  }

  search(e) {
    WebUtil.search(this.state.query, 1);
  }

  nextPage() {
    var meta = SearchStore.meta();
    WebUtil.search(meta.query, meta.page + 1);
  }

	resultList() {
		let makeLink = (id, link, type, text) => {
			return (
				<li key={id} className="list-result">
					<Link	to={link}>
						{type} - {text}
					</Link>
				</li>
			);
		};

    return this.state.results.map(function (result) {
			switch (result._type) {
				case 'User':
					return makeLink(
						result.id,
						'/user/' + result.username,
						'User',
						result.username
					);
					break;
				case 'Project':
					return makeLink(
						result.id,
						'/projects/' + result.slug,
						'Project',
						result.title
					);
					break;
				case 'SourceFile':
					return makeLink(
						result.id,
						'/projects/' + result.project_slug + '/files/' + result.slug,
						'File',
						result.name
					);
					break;
				default:
					return '';
			}
    });
  }

  render() {
    var meta = SearchStore.meta();
    return (
      <article className="search-results list-index">
				<h1>Results for "{this.state.query}"</h1>
        <ul className="primary-list">
          { this.resultList() }
        </ul>

				<nav>
					Displaying page { meta.page } of { meta.total_pages }
					<button onClick={ this.nextPage }>NEXT PAGE</button>
				</nav>
      </article>
    );
  }
}

export default Search;
