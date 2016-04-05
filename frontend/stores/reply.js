import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import WebConstants from '../constants/web-constants';

let ReplyStore = new Store(Dispatcher);

let _projectReplies = [];
let _fileReplies = [];
let _explanationReplies = [];

function resetReplies(replyArray) {
	return replyArray.slice();
}

function retrieveAll(replies) {
	return replies.slice();
}

function remove(arr, id) {
	for (let i = 0; i < arr.length; ++i) {
		if (arr[i].id === id) {
			arr.splice(i, 1);
			break;
		}
	}
}

function removeReply(id) {
	remove(_projectReplies, id);
	remove(_fileReplies, id);
	remove(_explanationReplies, id);
}

function receiveReply(arr, reply) {
	let found = false;
	for (let i = 0; i < arr.length; ++i) {
		if (arr[i].id === reply.id) {
			found = true;
			arr[i] = reply;
			break;
		}
	}
	if (!found) {
		arr.push(reply);
	}
}

ReplyStore.allProjectReplies = function () {
	return retrieveAll(_projectReplies);
};

ReplyStore.allSourceFileReplies = function () {
	return retrieveAll(_fileReplies);
};

ReplyStore.allExplanationReplies = function () {
	return retrieveAll(_explanationReplies);
};

ReplyStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case WebConstants.RECEIVE_PROJECT_REPLIES:
			_projectReplies = resetReplies(payload.replies);
			ReplyStore.__emitChange();
			break;
		case WebConstants.RECEIVE_PROJECT_REPLY:
			receiveReply(_projectReplies, payload.reply);
			ReplyStore.__emitChange();
			break;
		case WebConstants.RECEIVE_FILE_REPLIES:
			_fileReplies = resetReplies(payload.replies);
			ReplyStore.__emitChange();
			break;
		case WebConstants.RECEIVE_FILE_REPLY:
			receiveReply(_fileReplies, payload.reply);
			ReplyStore.__emitChange();
			break;
		case WebConstants.RECEIVE_EXPLANATION_REPLIES:
			_explanationReplies = resetReplies(payload.replies);
			ReplyStore.__emitChange();
			break;
		case WebConstants.RECEIVE_EXPLANATION_REPLY:
			receiveReply(_explanationReplies, payload.reply);
			ReplyStore.__emitChange();
			break;
		case WebConstants.REMOVE_REPLY:
			removeReply(payload.reply.id)
			ReplyStore.__emitChange();
			break;
	}
};

export default ReplyStore;
