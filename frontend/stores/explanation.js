import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import ExplanationConstants from '../constants/explanation-constants';

let ExplanationStore = new Store(Dispatcher);

let _explanations = [];

function resetExplanations(explanations) {
	_explanations = explanations.slice();
}

function receiveExplanation(explanation) {
	let found = false;
	for (let i = 0; i < _explanations.length; ++i) {
		if (_explanations[i].id === explanation.id) {
			_explanations[i] = explanation;
			found = true;
			break;
		}
	}
	if (!found) {
		_explanations.push(explanation);
	}
}

ExplanationStore.all = function () {
	return _explanations.slice();
};

ExplanationStore.find = function (id) {
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
		case ExplanationConstants.RECEIVE_EXPLANATIONS:
			resetExplanations(payload.explanations);
			ExplanationStore.__emitChange();
			break;
		case ExplanationConstants.RECEIVE_EXPLANATION:
			receiveExplanation(payload.explanation);
			ExplanationStore.__emitChange();
			break;
	}
};

export default ExplanationStore;
