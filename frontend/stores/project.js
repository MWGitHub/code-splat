import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import WebConstants from '../constants/web-constants';

let _projects = {};

let ProjectStore = new Store(Dispatcher);

function resetProjects(projects) {
  for (let i = 0; i < projects.length; i++) {
    let project = projects[i];
    _projects[project.id] = project;
  }
}

ProjectStore.all = function () {
  return _projects;
}

ProjectStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case WebConstants.RECEIVE_PROJECTS:
      resetProjects(payload.projects);
      ProjectStore.__emitChange();
      break;
    case WebConstants.RECEIVE_PROJECT:
      let project = payload.project;
      _projects[project.id] = project;
      ProjectStore.__emitChange();
      break;
    case WebConstants.REMOVE_PROJECT:
      delete _projects[payload.project.id]
      ProjectStore.__emitChange();
      break;
  }
};


export default ProjectStore;
