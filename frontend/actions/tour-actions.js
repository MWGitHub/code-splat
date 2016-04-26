import Dispatcher from '../dispatcher/dispatcher';
import TourConstants from '../constants/tour-constants';

export default {
  receiveItem: function (name, total) {
    Dispatcher.dispatch({
      actionType: TourConstants.RECEIVE_ITEM,
      name: name,
      total: total
    });
  }
};
