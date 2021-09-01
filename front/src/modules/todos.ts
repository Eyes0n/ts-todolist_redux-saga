import { ITodo, CreateTodoType, IEditTodo } from 'type';

export const LOAD_TODOS_REQUEST = 'todo/LOAD_TODOS_REQUEST' as const;
export const LOAD_TODOS_SUCCESS = 'todo/LOAD_TODOS_SUCCESS' as const;
export const LOAD_TODOS_FAILURE = 'todo/LOAD_TODOS_FAILURE' as const;

export const CREATE_TODO_REQUEST = 'todo/CREATE_TODO_REQUEST' as const;
export const CREATE_TODO_SUCCESS = 'todo/CREATE_TODO_SUCCESS' as const;
export const CREATE_TODO_FAILURE = 'todo/CREATE_TODO_FAILURE' as const;

export const REMOVE_TODO_REQUEST = 'todo/REMOVE_TODO_REQUEST' as const;
export const REMOVE_TODO_SUCCESS = 'todo/REMOVE_TODO_SUCCESS' as const;
export const REMOVE_TODO_FAILURE = 'todo/REMOVE_TODO_FAILURE' as const;

export const UPDATE_TODO_REQUEST = 'todo/UPDATE_TODO_REQUEST' as const;
export const UPDATE_TODO_SUCCESS = 'todo/UPDATE_TODO_SUCCESS' as const;
export const UPDATE_TODO_FAILURE = 'todo/UPDATE_TODO_FAILURE' as const;

export interface loadAction {
  type: typeof LOAD_TODOS_REQUEST;
}
export interface createAction {
  type: typeof CREATE_TODO_REQUEST;
  todo: CreateTodoType;
}
export interface removeAction {
  type: typeof REMOVE_TODO_REQUEST;
  id: number;
}
export interface updateAction {
  type: typeof UPDATE_TODO_REQUEST;
  editTodo: IEditTodo;
}

// 비동기 요청을 위한 request success failure 경우에 대해 각각 액션 생성 함수 생성
export const loadTodos = () => ({ type: LOAD_TODOS_REQUEST });
export const loadTodosSuccess = (todos: ITodo[]) => ({ type: LOAD_TODOS_SUCCESS, todos });
export const loadTodosFailure = (error: any) => ({ type: LOAD_TODOS_FAILURE, error });

export const createTodo = (todo: CreateTodoType) => ({ type: CREATE_TODO_REQUEST, todo });
export const createTodoSuccess = (todo: CreateTodoType) => ({ type: CREATE_TODO_SUCCESS, todo });
export const createTodoFailure = (error: any) => ({ type: CREATE_TODO_FAILURE, error });

export const removeTodo = (id: number) => ({ type: REMOVE_TODO_REQUEST, id });
export const removeTodoSuccess = (id: number) => ({ type: REMOVE_TODO_SUCCESS, id });
export const removeTodoFailure = (error: any) => ({ type: REMOVE_TODO_FAILURE, error });

export const updateTodo = (editTodo: IEditTodo) => ({ type: UPDATE_TODO_REQUEST, editTodo });
export const updateTodoSuccess = (editTodo: IEditTodo) => ({ type: UPDATE_TODO_SUCCESS, editTodo });
export const updateTodoFailure = (error: any) => ({ type: UPDATE_TODO_FAILURE, error });

export type todosAction =
  | ReturnType<typeof loadTodos>
  | ReturnType<typeof loadTodosSuccess>
  | ReturnType<typeof loadTodosFailure>
  | ReturnType<typeof createTodo>
  | ReturnType<typeof createTodoSuccess>
  | ReturnType<typeof createTodoFailure>
  | ReturnType<typeof removeTodo>
  | ReturnType<typeof removeTodoSuccess>
  | ReturnType<typeof removeTodoFailure>
  | ReturnType<typeof updateTodo>
  | ReturnType<typeof updateTodoSuccess>
  | ReturnType<typeof updateTodoFailure>;

type todoState = {
  loading: boolean;
  todos: ITodo[];
  error: string;
};
const initialState: todoState = {
  loading: false,
  todos: [],
  error: '',
};

// todo리듀서 생성
// 각 액션 타입에 따른 로직 처리의 결과로 상태를 갱신
const todosReducer = (state: todoState = initialState, action: todosAction): todoState => {
  switch (action.type) {
    case LOAD_TODOS_REQUEST:
    case CREATE_TODO_REQUEST:
    case REMOVE_TODO_REQUEST:
    case UPDATE_TODO_REQUEST:
      return { ...state, loading: true, error: '' };

    case LOAD_TODOS_SUCCESS:
      return { ...state, loading: false, todos: action.todos };
    case CREATE_TODO_SUCCESS: {
      const { todos } = state;
      const nextId = todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
      return {
        ...state,
        loading: false,
        todos: todos.concat({
          ...action.todo,
          id: nextId,
          updatedAt: action.todo.createdAt,
        }),
      };
    }
    case REMOVE_TODO_SUCCESS: {
      const { todos } = state;
      const updatedTodos = todos.filter((todo) => todo.id !== action.id);
      return { ...state, todos: updatedTodos };
    }
    case UPDATE_TODO_SUCCESS: {
      const { todos } = state;
      const updatedTodos = todos.map((todo) =>
        todo.id === action.editTodo.id
          ? { ...todo, ...action.editTodo, updatedAt: new Date() }
          : todo,
      );
      return { ...state, todos: updatedTodos };
    }

    case LOAD_TODOS_FAILURE:
    case CREATE_TODO_FAILURE:
    case REMOVE_TODO_FAILURE:
    case UPDATE_TODO_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default todosReducer;
