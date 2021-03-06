import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Status, ITodo, Priority } from 'type';
import TodoList from './TodoList/TodoList';
import useModal from 'hooks/useModal';
import DetailModal from 'components/common/Modal/DetailModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules';
import { useFilterAndSrot } from 'hooks/useFilterAndSort';
import { loadTodos } from 'modules/todos';

const defaultModal: ITodo = {
  id: 0,
  task: '',
  priority: Priority.LOW,
  status: Status.NOT_STARTED,
  deadLine: new Date(),
  createdAt: new Date(),
  updatedAt: new Date(),
};

const TodoKanBan: React.FC = () => {
  const [modalVisible, openModal, closeModal] = useModal(false);
  const [detailTodo, setDetailTodo] = useState<ITodo | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const {
    todos: { todos },
    filters,
    sort,
  } = useSelector(({ todos, filters, sort }: RootState) => ({
    todos,
    filters,
    sort,
  }));

  const modifiedTodos = useFilterAndSrot(todos, filters, sort);

  const preTodo = modifiedTodos.filter((todo) => todo.status === Status.NOT_STARTED);
  const ingTodo = modifiedTodos.filter((todo) => todo.status === Status.IN_PROGRESS);
  const endTodo = modifiedTodos.filter((todo) => todo.status === Status.FINISHED);

  const openDetail = (item: ITodo) => {
    setDetailTodo(item);
    openModal();
  };

  return (
    <TodoKanBanContainer>
      <TodoList todos={preTodo} status={Status.NOT_STARTED} openDetail={openDetail} />
      <TodoList todos={ingTodo} status={Status.IN_PROGRESS} openDetail={openDetail} />
      <TodoList todos={endTodo} status={Status.FINISHED} openDetail={openModal} />
      <DetailModal visible={modalVisible} onClose={closeModal} item={detailTodo || defaultModal} />
    </TodoKanBanContainer>
  );
};

export default TodoKanBan;

const TodoKanBanContainer = styled.section`
  display: flex;
  justify-content: center;
  margin: 100px auto 0;
`;
