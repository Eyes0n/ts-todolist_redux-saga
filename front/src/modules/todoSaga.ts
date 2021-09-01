import {
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_FAILURE,
  CREATE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  REMOVE_TODO_REQUEST,
  REMOVE_TODO_SUCCESS,
  REMOVE_TODO_FAILURE,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  loadAction,
  createAction,
  updateAction,
  removeAction,
} from './todos';
import { loadTodosAPI, createTodoAPI, updateTodoAPI, deleteTodoAPI } from './../api/index';
import { call, all, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

// 여러 todo들을 불러오는 제너레이터 함수
function* loadTodos() {
  try {
    const response: AxiosResponse<loadAction> = yield call(loadTodosAPI);
    yield put({
      type: LOAD_TODOS_SUCCESS,
      todos: response.data,
    });
  } catch (error: any) {
    console.error(error);
    yield put({
      type: LOAD_TODOS_FAILURE,
      error: error.message,
    });
  }
}

// 새로운 todo를 생성하는 제너레이터 함수
function* createTodo(action: createAction) {
  try {
    const response: AxiosResponse<createAction> = yield call(createTodoAPI, action.todo);
    yield put({
      type: CREATE_TODO_SUCCESS,
      todo: response.data,
    });
  } catch (error: any) {
    console.error(error);
    yield put({
      type: CREATE_TODO_FAILURE,
      error: error.message,
    });
  }
}

// 특정 todo를 삭제하는 제너레이터 함수
function* removeTodo(action: removeAction) {
  try {
    const response: AxiosResponse<removeAction> = yield call(deleteTodoAPI, action.id);
    yield put({
      type: REMOVE_TODO_SUCCESS,
      id: response.data,
    });
  } catch (error: any) {
    console.error(error);
    yield put({
      type: REMOVE_TODO_FAILURE,
      error: error.message,
    });
  }
}

// 특정 todo를 수정하는 제너레이터 함수
function* updateTodo(action: updateAction) {
  try {
    const response: AxiosResponse<updateAction> = yield call(updateTodoAPI, action.editTodo);
    yield put({
      type: UPDATE_TODO_SUCCESS,
      editTodo: response.data,
    });
  } catch (error: any) {
    console.error(error);
    yield put({
      type: UPDATE_TODO_FAILURE,
      error: error.message,
    });
  }
}

// 여러 todo들을 불러오는 액션을 모니터링하는 제너레이터 함수
function* watchLoadTodos() {
  yield throttle(5000, LOAD_TODOS_REQUEST, loadTodos);
}

// 새로운 todo생성 액션을 모니터링하는 제너레이터 함수
function* watchAddTodo() {
  yield takeLatest(CREATE_TODO_REQUEST, createTodo);
}

// 특정 todo 삭제 액션을 모니터링하는 제너레이터 함수
function* watchRemoveTodo() {
  yield takeLatest(REMOVE_TODO_REQUEST, removeTodo);
}
// 특정 todo 수정 액션을 모니터링하는 제너레이터 함수
function* watchUpdateTodo() {
  yield takeLatest(UPDATE_TODO_REQUEST, updateTodo);
}

// 액션을 모니터링하는 제너레이터 함수들을 하나의 saga로 합침
export default function* todoSaga() {
  yield all([
    fork(watchLoadTodos),
    fork(watchAddTodo),
    fork(watchRemoveTodo),
    fork(watchUpdateTodo),
  ]);
}
