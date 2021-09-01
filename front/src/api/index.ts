import { Status } from './../type';
import { CreateTodoType, IEditTodo } from 'type';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/';
// axios.defaults.withCredentials = true;

export const loadTodosAPI = () => axios.get('/todos');

export const createTodoAPI = (todo: CreateTodoType) => axios.post('/todo', { todo });

export const updateTodoAPI = (editTodo: IEditTodo) =>
  axios.patch(`/todo/${editTodo.id}`, { editTodo });

export const deleteTodoAPI = (id: number) => axios.delete(`/todo/${id}`);

export const changeTodoStatusAPI = (id: number, status: Status) =>
  axios.patch(`todo/${id}`, { status });
