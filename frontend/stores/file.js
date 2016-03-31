import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import WebConstants from '../constants/web-constants';

let _files = {};

let FileStore = new Store(Dispatcher);

function resetFiles(files) {
  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    _files[file.slug] = file;
  }
}

FileStore.all = function () {
  let files = [];
  for (let key in _files) {
    files.push(_files[key]);
  }
  return files;
}

FileStore.find = function (slug) {
  return _files[slug];
}

FileStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case WebConstants.RECEIVE_PROJECT:
      resetFiles(payload.project.source_files);
      FileStore.__emitChange();
      break;
    case WebConstants.RECEIVE_FILE:
      _files[payload.sourceFile.slug] = payload.sourceFile;
      FileStore.__emitChange();
      break;
    case WebConstants.REMOVE_FILE:
      delete _files[payload.sourceFile.slug]
      FileStore.__emitChange();
      break;
  }
};

export default FileStore;
