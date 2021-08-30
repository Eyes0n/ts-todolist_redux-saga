import { useTodoAndDispatchContext } from 'context/TodoContext';
import { useCallback, useEffect } from 'react';

export const useLoadStorage = (): void => {
  const { dispatch } = useTodoAndDispatchContext();

  const loadStorage = useCallback((): void => {
    const data = localStorage.getItem('todos') || '[]';
    const storageTodos = JSON.parse(data);
    dispatch({ type: 'LOAD_TODOS', todos: storageTodos });
  }, [dispatch]);

  useEffect(() => {
    loadStorage();
  }, [loadStorage]);
};

export const useSaveStorage = (): void => {
  const {
    todosWithFilterAndSort: { todos },
  } = useTodoAndDispatchContext();
  const saveStorage = useCallback((): void => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    saveStorage();
  }, [saveStorage, todos]);
};
