import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { ITodo } from 'type';
import { dateToString } from 'utils/commons';
import { useDispatch } from 'react-redux';
import { removeTodo } from 'modules/todos';

interface ITodoProps {
  todo: ITodo;
  openDetail: (item: ITodo) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

const TodoItem: React.FC<ITodoProps> = ({
  todo,
  openDetail,
  onDragStart,
  onDragEnter,
  onDragOver,
}) => {
  const { task, priority, deadLine, status } = todo;
  const dispatch = useDispatch();

  const handleDeleteTodo = () => {
    dispatch(removeTodo(todo.id));
  };

  return (
    <TodoItemLayout
      draggable
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
    >
      <StausAndTask>
        <StatusEllipse color={status} />
        <TaskName>{task}</TaskName>
      </StausAndTask>
      <DateAndPriority>
        <PriorityWrap>
          <PriorityEllipse color={priority} />
          <Priority>{priority}</Priority>
        </PriorityWrap>
        <TodoDeadline>{dateToString(deadLine).substring(2)}</TodoDeadline>
      </DateAndPriority>
      <IconWrap>
        <DeleteIcon onClick={handleDeleteTodo}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </DeleteIcon>
        <EditIcon onClick={() => openDetail(todo)}>
          <FontAwesomeIcon icon={faPen} />
        </EditIcon>
      </IconWrap>
    </TodoItemLayout>
  );
};

const TodoItemLayout = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 370px;
  padding: 1rem 1.5rem;
  border-radius: 68px;
  background-color: #ffffff;
  box-shadow: 0px 3px 4px lightgrey;
`;

const StausAndTask = styled.div`
  display: flex;
`;
const StatusEllipse = styled.button`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.7rem;
  border: 2.5px solid
    ${(props) =>
      props.color === 'TODO' ? '#000000' : props.color === 'IN_PROGRESS' ? '#FF7A00' : '#35793F'};
  border-radius: 50%;
  background-color: #ffffff;
  cursor: pointer;
`;

const TaskName = styled.div`
  width: 165px;
  padding-bottom: 2.5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DateAndPriority = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PriorityWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.2rem;
`;

const PriorityEllipse = styled.div`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  margin-right: 0.4rem;
  background-color: ${(props) =>
    props.color === 'HIGH' ? '#FF0202' : props.color === 'MEDIUM' ? '#FF7A00' : '#666BD3'};
`;

const Priority = styled.p`
  font-size: 1rem;
`;

const TodoDeadline = styled.p`
  min-width: 89px;
  font-size: 0.7rem;
`;

const IconWrap = styled.div`
  display: flex;
`;

const DeleteIcon = styled.button`
  border: none;
  margin: 0 1rem;
  background-color: #ffffff;
`;

const EditIcon = styled.button`
  border: none;
  background-color: #ffffff;
`;

export default TodoItem;
