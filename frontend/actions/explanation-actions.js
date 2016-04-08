import Dispatcher from '../dispatcher/dispatcher';
import ExplanationConstants from '../constants/explanation-constants';

export default {
	receiveExplanations: function (explanations) {
		Dispatcher.dispatch({
			actionType: ExplanationConstants.RECEIVE_EXPLANATIONS,
			explanations: explanations
		});
	},

	receiveExplanation: function (explanation) {
		Dispatcher.dispatch({
			actionType: ExplanationConstants.RECEIVE_EXPLANATION,
			explanation: explanation
		});
	},

	selectExplanation: function (selection) {
		Dispatcher.dispatch({
			actionType: ExplanationConstants.SELECT_EXPLANATION,
			selection: selection
		});
	},

	deselectExplanation: function () {
		Dispatcher.dispatch({
			actionType: ExplanationConstants.DESELECT_EXPLANATION
		});
	}
};
