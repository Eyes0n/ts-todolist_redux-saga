import { Status } from './../type';
import { CreateTodoType, IEditTodo } from 'type';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/';
// axios.defaults.withCredentials = true;

// todos를 불러오는 요청 api
export const loadTodosAPI = () => axios.get('/todos');

// 새로운 todo 생성 요청 api
export const createTodoAPI = (todo: CreateTodoType) => axios.post('/todo', { todo });

// 기존 todo 수정 요청 api
export const updateTodoAPI = (editTodo: IEditTodo) =>
  axios.patch(`/todo/${editTodo.id}`, { editTodo });

// 기존 todo 삭제 요청 api
export const deleteTodoAPI = (id: number) => axios.delete(`/todo/${id}`);
