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
  }
};
