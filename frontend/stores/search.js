import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import WebConstants from '../constants/web-constants';

var SearchStore = new Store(Dispatcher);

var _searchBarResults = [];
var _searchResults = [];
var _meta = {};

SearchStore.allBarResults = function () {
	return _searchBarResults.slice();
};

SearchStore.all = function () {
  return _searchResults.slice();
};

SearchStore.meta = function () {
  return Object.assign({}, _meta);
};

SearchStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
		case WebConstants.RECEIVE_SEARCH_BAR_RESULTS:
			_searchBarResults = payload.results;
			SearchStore.__emitChange();
			break;
		case WebConstants.CLEAR_SEARCH_BAR:
			_searchBarResults = [];
			SearchStore.__emitChange();
			break;
    case WebConstants.RECEIVE_SEARCH:
      _searchResults = payload.results;
      _meta = payload.meta;
      SearchStore.__emitChange();
      break;
  }
};

module.exports = SearchStore;
