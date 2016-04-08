import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/root';

export default function configureStore(initialState) {
  return createStore(
    RootReducer,
    initialState,
    applyMiddleware(thunk)
  )
};
