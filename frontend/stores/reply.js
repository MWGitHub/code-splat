import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import WebConstants from '../constants/web-constants';

let ReplyStore = new Store(Dispatcher);

let _projectReplies = {};
let _fileReplies = {};
let _explanationReplies = {};

function resetReplies(replyArray) {
	let replies = {};
	for (let i = 0; i < replyArray.length; i++) {
		let reply = replyArray[i];
		replies[reply.id] = reply;
	}
	return replies;
}

function retrieveAll(replies) {
	let output = [];
	for (let key in replies) {
		output.push(replies[key]);
	}
	return output;
}

function removeReply(id) {
	delete _projectReplies[id];
	delete _fileReplies[id];
	delete _explanationReplies[id];
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
			_projectReplies[payload.reply.id] = payload.reply;
			ReplyStore.__emitChange();
			break;
		case WebConstants.RECEIVE_FILE_REPLIES:
			_fileReplies = resetReplies(payload.replies);
			ReplyStore.__emitChange();
			break;
		case WebConstants.RECEIVE_FILE_REPLY:
			_fileReplies[payload.reply.id] = payload.reply;
			ReplyStore.__emitChange();
			break;
		case WebConstants.RECEIVE_EXPLANATION_REPLIES:
			_explanationReplies = resetReplies(payload.replies);
			ReplyStore.__emitChange();
			break;
		case WebConstants.RECEIVE_EXPLANATION_REPLY:
			_explanationReplies[payload.reply.id] = payload.reply;
			ReplyStore.__emitChange();
			break;
		case WebConstants.REMOVE_REPLY:
			removeReply(payload.reply.id)
			ReplyStore.__emitChange();
			break;
	}
};

export default ReplyStore;
