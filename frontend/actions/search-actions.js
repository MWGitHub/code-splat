import Dispatcher from '../dispatcher/dispatcher';
import WebConstants from '../constants/web-constants';

export default {
	receiveBarResults: function (results) {
		Dispatcher.dispatch({
			actionType: WebConstants.RECEIVE_SEARCH_BAR_RESULTS,
			meta: results.meta,
			results: results.search_results
		});
	},

	clearSearchBar: function () {
		Dispatcher.dispatch({
			actionType: WebConstants.CLEAR_SEARCH_BAR
		});
	},

	receiveResults: function (results) {
		Dispatcher.dispatch({
			actionType: WebConstants.RECEIVE_SEARCH,
			meta: results.meta,
			results: results.search_results
		})
	}
}
