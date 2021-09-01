import { combineReducers } from 'redux';
import todosReducer from './todos';
import filterReducer from './filter';
import sortReducer from './sort';
import { all, fork } from 'redux-saga/effects';
import todoSaga from './todoSaga';

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filterReducer,
  sort: sortReducer,
});

export function* rootSaga() {
  yield all([fork(todoSaga)]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
