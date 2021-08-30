import { Status, IEditTodo, IFilterOptions, ITodo, SortOptions } from 'type';
import { CreateTodoType } from './TodoContext';

export type Action =
  | { type: 'LOAD_TODOS'; todos: ITodo[] }
  | { type: 'CREATE'; todo: CreateTodoType }
  | { type: 'REMOVE'; id: number }
  | { type: 'EDIT'; editTodo: IEditTodo }
  | { type: 'STATUS'; id: number; status: Status }
  | { type: 'FILTER'; filters: IFilterOptions }
  | { type: 'SORT'; sort: SortOptions }
  | { type: 'DrageAndDrop'; todos: ITodo[] };
