import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import WebConstants from '../constants/web-constants';

let _projects = [];
let _projectsFront = [];

let ProjectStore = new Store(Dispatcher);

function resetProjects(projects) {
	_projects = projects.slice();
}

function receiveProject(project) {
	let found = false;
	for (let i = 0; i < _projects.length; ++i) {
		if (_projects[i].id === project.id) {
			_projects[i] = project;
			found = true;
			break;
		}
	}
	if (!found) {
		_projects.push(project);
	}
}

ProjectStore.allFront = function () {
	return _projectsFront.slice();
};

ProjectStore.all = function () {
  return _projects.slice();
};

ProjectStore.find = function (slug) {
	for (let i = 0; i < _projects.length; ++i) {
		let project = _projects[i];
		if (project.slug === slug) {
			return project;
		}
	}
	return null;
};

ProjectStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case WebConstants.RECEIVE_PROJECTS:
      resetProjects(payload.projects);
      ProjectStore.__emitChange();
      break;
    case WebConstants.RECEIVE_PROJECT:
      let project = payload.project;
      receiveProject(project);
      ProjectStore.__emitChange();
      break;
    case WebConstants.REMOVE_PROJECT:
      delete _projects[payload.project.slug]
      ProjectStore.__emitChange();
      break;
		case WebConstants.RECEIVE_FRONT_PAGE_ITEMS:
			_projectsFront = payload.items;
			ProjectStore.__emitChange();
			break;
  }
};


export default ProjectStore;
