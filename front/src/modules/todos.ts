import { ITodo, CreateTodoType, IEditTodo, Status } from 'type';

export const LOAD_TODOS = 'todo/LOAD_TODOS' as const;
export const CREATE_TODO = 'todo/CREATE_TODO' as const;
export const REMOVE_TODO = 'todo/REMOVE_TODO' as const;
export const UPDATE_TODO = 'todo/UPDATE_TODO' as const;
export const STATUS_TODO = 'todo/STATUS_TODO' as const;

export const loadTodos = (todos: ITodo[]) => ({ type: LOAD_TODOS, todos });
export const createTodo = (todo: CreateTodoType) => ({ type: CREATE_TODO, todo });
export const removeTodo = (id: number) => ({ type: REMOVE_TODO, id });
export const updateTodo = (editTodo: IEditTodo) => ({ type: UPDATE_TODO, editTodo });
export const changeTodoStatus = (id: number, status: Status) => ({
  type: STATUS_TODO,
  id,
  status,
});

type todosAction =
  | ReturnType<typeof loadTodos>
  | ReturnType<typeof createTodo>
  | ReturnType<typeof removeTodo>
  | ReturnType<typeof updateTodo>
  | ReturnType<typeof changeTodoStatus>;

const initialState: ITodo[] = [];

const todosReducer = (state: ITodo[] = initialState, action: todosAction): ITodo[] => {
  switch (action.type) {
    case LOAD_TODOS:
      return [...action.todos];

    case CREATE_TODO:
      const nextId = state.length ? Math.max(...state.map((todo) => todo.id)) + 1 : 1;
      return state.concat({
        ...action.todo,
        id: nextId,
        updatedAt: action.todo.createdAt,
      });

    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);

    case UPDATE_TODO:
      return state.map((todo) =>
        todo.id === action.editTodo.id
          ? { ...todo, ...action.editTodo, updatedAt: new Date() }
          : todo,
      );

    case STATUS_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, status: action.status } : todo,
      );

    default:
      return state;
  }
};

export default todosReducer;
