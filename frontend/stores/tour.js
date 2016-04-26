import { Store } from 'flux/utils';
import Dispatcher from '../dispatcher/dispatcher';
import TourConstants from '../constants/tour-constants';

let loadNames = [];

var TourStore = new Store(Dispatcher);

function receiveItemName(name) {
  if (loadNames.indexOf(name) === -1) {
    loadNames.push(name);
  }
}

TourStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case TourConstants.RECEIVE_ITEM:
      let name = payload.name;
      let total = payload.total;
      receiveItemName(name);
      if (loadNames.length === total) {
        TourStore.__emitChange();
      }
      break;
  }
};

export default TourStore;
