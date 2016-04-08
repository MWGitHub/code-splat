import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import ExplanationConstants from '../constants/explanation-constants';

let _sourceFileId = null;
let _explanation = null;
let _fragment = null;
let _start = null;

let ExplanationSelectionStore = new Store(Dispatcher);

ExplanationSelectionStore.isSelecting = function () {
	return _explanation !== null || _fragment !== null;
};

ExplanationSelectionStore.isNewExplanation = function () {
	return !_explanation;
};

ExplanationSelectionStore.getSourceFieldId = function () {
	return _sourceFileId;
};

ExplanationSelectionStore.getExplanation = function () {
	return _explanation;
};

ExplanationSelectionStore.getFragment = function () {
	return _fragment;
};

ExplanationSelectionStore.getStart = function () {
	return _start;
};

ExplanationSelectionStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case ExplanationConstants.SELECT_EXPLANATION:
			_sourceFileId = payload.selection.sourceFileId;
			_explanation = payload.selection.explanation;
			_fragment = payload.selection.fragment;
			_start = payload.selection.start;
			ExplanationSelectionStore.__emitChange();
			break;
		case ExplanationConstants.DESELECT_EXPLANATION:
			_sourceFileId = null;
			_explanation = null;
			_fragment = null;
			_start = null;
			ExplanationSelectionStore.__emitChange();
			break;
	}
};

export default ExplanationSelectionStore;
