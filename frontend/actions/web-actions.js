import Dispatcher from '../dispatcher/dispatcher';
import WebConstants from '../constants/web-constants';

export default {
  receiveProjects: function (projects) {
    Dispatcher.dispatch({
      actionType: WebConstants.RECEIVE_PROJECTS,
      projects: projects
    });
  },

  receiveProject: function (project) {
    Dispatcher.dispatch({
      actionType: WebConstants.RECEIVE_PROJECT,
      project: project
    });
  },

  removeProject: function (project) {
    Dispatcher.dispatch({
      actionType: WebConstants.REMOVE_PROJECT,
      project: project
    });
  },

  receiveProjectChanges: function (projectChanges) {
    Dispatcher.dispatch({
      actionType: WebConstants.RECEIVE_PROJECT_CHANGES,
      changes: projectChanges
    });
  },

	receiveProjectReplies: function (projectReplies) {
		Dispatcher.dispatch({
			actionType: WebConstants.RECEIVE_PROJECT_REPLIES,
			replies: projectReplies
		});
	},

	receiveProjectReply: function (projectReply) {
		Dispatcher.dispatch({
			actionType: WebConstants.RECEIVE_PROJECT_REPLY,
			reply: projectReply
		});
	},




  receiveSourceFile: function (sourceFile) {
    Dispatcher.dispatch({
      actionType: WebConstants.RECEIVE_FILE,
      sourceFile: sourceFile
    });
  },

  removeSourceFile: function (sourceFile) {
    Dispatcher.dispatch({
      actionType: WebConstants.REMOVE_FILE,
      sourceFile: sourceFile
    });
  },

  receiveSourceFileChanges: function (sourceFileChanges) {
    Dispatcher.dispatch({
      actionType: WebConstants.RECEIVE_FILE_CHANGES,
      changes: sourceFileChanges
    });
  },

	receiveSourceFileReplies: function (replies) {
		Dispatcher.dispatch({
			actionType: WebConstants.RECEIVE_FILE_REPLIES,
			replies: replies
		});
	},

	receiveSourceFileReply: function (reply) {
		Dispatcher.dispatch({
			actionType: WebConstants.RECEIVE_FILE_REPLY,
			reply: reply
		});
	},



	removeReply: function (reply) {
		Dispatcher.dispatch({
			actionType: WebConstants.REMOVE_REPLY,
			reply: reply
		});
	},



	receieveFrontPageItems: function (items) {
		Dispatcher.dispatch({
			actionType: WebConstants.RECEIVE_FRONT_PAGE_ITEMS,
			items: items
		});
	},

	receiveExplanations: function (explanations) {
		Dispatcher.dispatch({
			actionType: WebConstants.RECEIVE_EXPLANATIONS,
			explanations: explanations
		});
	},

	receiveExplanation: function (explanation) {
		Dispatcher.dispatch({
			actionType: WebConstants.RECEIVE_EXPLANATION,
			explanation: explanation
		});
	}
};
