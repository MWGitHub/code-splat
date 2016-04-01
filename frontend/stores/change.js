import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import WebConstants from '../constants/web-constants';

let _changes = {};

let ChangeStore = new Store(Dispatcher);

function resetChanges(changes) {
  for (let i = 0; i < changes.length; i++) {
    let change = changes[i];
    _changes[change.id] = change;
  }
}

ChangeStore.all = function () {
  let changes = [];
  for (let key in _changes) {
    changes.push(_changes[key]);
  }
  return changes;
}

ChangeStore.find = function (id) {
  return _changes[id];
}

ChangeStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case WebConstants.RECEIVE_PROJECT_CHANGES:
      resetChanges(payload.changes);
      ChangeStore.__emitChange();
      break;
    case WebConstants.RECEIVE_FILE_CHANGES:
      resetChanges(payload.changes);
      ChangeStore.__emitChange();
      break;
  }
};

export default ChangeStore;
