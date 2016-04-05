import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import WebConstants from '../constants/web-constants';

let _files = [];

let FileStore = new Store(Dispatcher);

function resetFiles(files) {
	_files = files.slice();
}

function receiveFile(file) {
	let found = false;
	for (let i = 0; i < _files.length; ++i) {
		if (_files[i].id === file.id) {
			_files[i] = file;
			found = true;
			break;
		}
	}
	if (!found) {
		_files.push(file);
	}
}

FileStore.all = function () {
  return _files.slice();
}

FileStore.find = function (slug) {
	for (let i = 0; i < _files.length; ++i) {
		let file = _files[i];
		if (file.slug === slug) {
			return file;
		}
	}
  return null;
}

FileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case WebConstants.RECEIVE_PROJECT:
      resetFiles(payload.project.source_files);
      FileStore.__emitChange();
      break;
    case WebConstants.RECEIVE_FILE:
      receiveFile(payload.sourceFile);
      FileStore.__emitChange();
      break;
    case WebConstants.REMOVE_FILE:
      delete _files[payload.sourceFile.slug]
      FileStore.__emitChange();
      break;
  }
};

export default FileStore;
