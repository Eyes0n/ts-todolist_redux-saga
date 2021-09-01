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

function* watchLoadTodos() {
  yield throttle(5000, LOAD_TODOS_REQUEST, loadTodos);
}

function* watchAddTodo() {
  yield takeLatest(CREATE_TODO_REQUEST, createTodo);
}

function* watchRemoveTodo() {
  yield takeLatest(REMOVE_TODO_REQUEST, removeTodo);
}

function* watchUpdateTodo() {
  yield takeLatest(UPDATE_TODO_REQUEST, updateTodo);
}

export default function* todoSaga() {
  yield all([
    fork(watchLoadTodos),
    fork(watchAddTodo),
    fork(watchRemoveTodo),
    fork(watchUpdateTodo),
  ]);
}
