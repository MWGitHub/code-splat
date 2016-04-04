import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import WebConstants from '../constants/web-constants';

let ExplanationStore = new Store(Dispatcher);

let _explanations = [];

function resetExplanations(explanations) {
	_explanations = explanations.slice();
}

function receiveExplanation(explanation) {
	if (_explanations.indexOf(explanation) === -1) {
		_explanations.push(explanation);
	}
}

ExplanationStore.all = function () {
	return _explanations.slice();
};

ProjectStore.find = function (id) {
	for (let i = 0; i < _explanations.length; ++i) {
		let explanation = _explanations[i];
		if (explanation.id === id) {
			return explanation;
		}
	}
	return null;
};

ExplanationStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case WebConstants.RECEIVE_EXPLANATIONS:
			resetExplanations(payload.explanations);
			ExplanationStore.__emitChange();
			break;
		case WebConstants.RECEIVE_EXPLANATION:
			_projectReplies[payload.reply.id] = payload.reply;
			ExplanationStore.__emitChange();
			break;
	}
};

export default ExplanationStore;
