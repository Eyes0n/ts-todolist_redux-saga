import { LOAD_TODOS } from '../modules/todos';
import { RootState } from '../modules';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//TODO: 제너레이터 요청으로 변환되면 필요없음
export const useLoadStorage = (): void => {
  const dispatch = useDispatch();

  const loadStorage = useCallback((): void => {
    const data = localStorage.getItem('todos') || '[]';
    const storageTodos = JSON.parse(data);

    dispatch({ type: LOAD_TODOS, todos: storageTodos });
  }, [dispatch]);

  useEffect(() => {
    loadStorage();
  }, [loadStorage]);
};

export const useSaveStorage = (): void => {
  const todos = useSelector((state: RootState) => state.todos);

  const saveStorage = useCallback((): void => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    saveStorage();
  }, [saveStorage, todos]);
};
