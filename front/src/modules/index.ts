import { combineReducers } from 'redux';
import todosReducer from './todos';
import filterReducer from './filter';
import sortReducer from './sort';
import { all, fork } from 'redux-saga/effects';
import todoSaga from './todoSaga';

// 루트 리듀서 함수 생성
// 각 리듀서를 하나의 리듀서로 합쳐주는 역할
const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filterReducer,
  sort: sortReducer,
});

// 루트 사가 함수 생성
// 루트 Saga는 sagaMiddleware가 실행되도록 여러 Saga를 하나의 Saga로 합쳐줌
export function* rootSaga() {
  yield all([fork(todoSaga)]);
}

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
