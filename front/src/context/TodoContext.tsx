import React, { useReducer, createContext, useContext, Dispatch, ReactElement } from 'react';
import { IFilterOptions, ITodo, SortOptions, Priority, Status, OrderType } from 'type';
import { Action } from './actions';

type TodosWithFilterAndSort = {
  todos: ITodo[];
  filters: IFilterOptions;
  sort: SortOptions;
};

const initialState: TodosWithFilterAndSort = {
  todos: [],
  filters: {
    status: [],
    priority: [],
    startDate: null,
    endDate: null,
  },
  sort: {
    sortBy: null,
    order: 'ASC',
  },
};

export type CreateTodoType = {
  task: string;
  priority: Priority;
  status: Status;
  deadLine: Date;
  createdAt: Date;
};

type todoDispatch = Dispatch<Action>;

function todoWithFilterReducer(
  state: TodosWithFilterAndSort = initialState,
  action: Action,
): TodosWithFilterAndSort {
  switch (action.type) {
    case 'LOAD_TODOS':
      return { ...state, todos: action.todos };
    case 'CREATE': {
      const nextId = state.todos.length ? Math.max(...state.todos.map((todo) => todo.id)) + 1 : 1;
      const updatedTodos = state.todos.concat({
        ...action.todo,
        id: nextId,
        updatedAt: action.todo.createdAt,
      });
      return { ...state, todos: updatedTodos };
    }
    case 'REMOVE': {
      const updatedTodos = state.todos.filter((todo) => todo.id !== action.id);
      return { ...state, todos: updatedTodos };
    }
    case 'EDIT': {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.editTodo.id
          ? { ...todo, ...action.editTodo, updatedAt: new Date() }
          : todo,
      );
      return { ...state, todos: updatedTodos };
    }
    case 'STATUS': {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.id ? { ...todo, status: action.status } : todo,
      );
      return { ...state, todos: updatedTodos };
    }
    case 'FILTER': {
      const updatedFilters = Object.assign({}, { ...state.filters, ...action.filters });
      return { ...state, filters: updatedFilters };
    }
    case 'SORT': {
      const updatedSort = Object.assign({}, action.sort);
      return { ...state, sort: updatedSort };
    }
    case 'DrageAndDrop': {
      const updatedTodos = action.todos;
      return { ...state, todos: updatedTodos };
    }
    default:
      return state;
  }
}

type TodosAndDispatch = {
  todosWithFilterAndSort: TodosWithFilterAndSort;
  modifiedTodos: ITodo[];
  dispatch: todoDispatch;
};
const TodosAndDispatchContext = createContext<TodosAndDispatch | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }): ReactElement => {
  const [state, dispatch] = useReducer(todoWithFilterReducer, initialState);
  const { todos, filters, sort } = state;
  const { startDate, endDate } = filters;
  const { sortBy, order } = sort;

  let modifiedTodos: ITodo[] = [...todos];

  if (filters.priority.length) {
    modifiedTodos = modifiedTodos?.filter((todo) => filters.priority.includes(todo.priority));
  }

  const startDateFilter = (start: Date | null, target: Date): boolean => {
    return (start !== null && target >= start) || start === null;
  };

  const endDateFilter = (end: Date | null, target: Date): boolean => {
    return (end !== null && target <= end) || end === null;
  };

  if (startDate || endDate) {
    modifiedTodos = modifiedTodos.filter(
      (todo) =>
        startDateFilter(startDate, new Date(todo.deadLine)) &&
        endDateFilter(endDate, new Date(todo.deadLine)),
    );
  }

  const sortDate = (prev: Date, next: Date, order: OrderType): number => {
    return order === 'ASC'
      ? new Date(prev).valueOf() - new Date(next).valueOf()
      : -(new Date(prev).valueOf() - new Date(next).valueOf());
  };

  if (sortBy === 'deadLine') {
    modifiedTodos = [
      ...modifiedTodos.sort((prev, next) =>
        sortDate(new Date(prev.deadLine), new Date(next.deadLine), order),
      ),
    ];
  }

  if (sortBy === 'updatedAt') {
    modifiedTodos = [
      ...modifiedTodos.sort((prev, next) =>
        sortDate(new Date(prev.updatedAt), new Date(next.updatedAt), order),
      ),
    ];
  }

  const convertPriority = (target: Priority): number => {
    switch (target) {
      case 'LOW':
        return 0;
      case 'MEDIUM':
        return 1;
      case 'HIGH':
        return 2;
      default:
        return 0;
    }
  };

  const prioritySort = (prev: Priority, next: Priority, order: OrderType): number => {
    const convertedPrev: number = convertPriority(prev);
    const convertedNext: number = convertPriority(next);
    return order === 'ASC' ? convertedPrev - convertedNext : -(convertedPrev - convertedNext);
  };

  if (sortBy === 'priority') {
    modifiedTodos = [
      ...modifiedTodos.sort((prev, next) => prioritySort(prev.priority, next.priority, order)),
    ];
  }

  return (
    <TodosAndDispatchContext.Provider
      value={{ modifiedTodos, todosWithFilterAndSort: state, dispatch }}
    >
      {children}
    </TodosAndDispatchContext.Provider>
  );
};

export const useTodoAndDispatchContext = (): TodosAndDispatch => {
  const context = useContext(TodosAndDispatchContext);
  if (!context) {
    throw new Error('Cannot find todoState in TodoProvider');
  }
  return context;
};
