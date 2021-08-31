import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown, faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import useModal from 'hooks/useModal';
import { Status, Priority } from 'type';
import { PRIORITY_RANGE } from 'utils/constants';
import FilterModal from 'components/common/Modal/FilterModal';
import SortModal from 'components/common/Modal/SortModal';
import ConfirmModal from 'components/common/Modal/ConfirmModal';
import { useDispatch } from 'react-redux';
import { createTodo } from 'modules/todos';

const TodoFilter = (): JSX.Element => {
  const [filterVisible, openFilter, closeFilter] = useModal(false);
  const [sortVisible, openSort, closeSort] = useModal(false);
  const [confirmVisible, openConfirm, closeConfirm] = useModal(false);
  const [inputValue, setInputValue] = useState({
    task: '',
    deadLine: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      23,
      59,
      59,
    ),
    priority: Priority.LOW,
    status: Status.NOT_STARTED,
    createdAt: new Date(),
  });
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const onInputReset = () => {
    setInputValue({
      task: '',
      deadLine: new Date(),
      priority: Priority.LOW,
      status: Status.NOT_STARTED,
      createdAt: new Date(),
    });
    inputRef?.current?.focus();
  };

  const getConvertedDate = (date: Date) => {
    const convertedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

    setInputValue({ ...inputValue, deadLine: convertedDate });
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.task.trim().length === 0) {
      openConfirm();
      return;
    }
    dispatch(createTodo(inputValue));
    onInputReset();
  };

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <FormInput
            ref={inputRef}
            type='text'
            name='task'
            placeholder='Add your new todo'
            value={inputValue.task}
            onChange={(e) => handleChange(e)}
          />
          <select
            value={inputValue.priority}
            id='priority'
            name='priority'
            onChange={(e) => handleChange(e)}
          >
            {PRIORITY_RANGE.map((priority: string, index: number) => {
              return (
                <option key={priority + index} defaultValue={inputValue.priority} value={priority}>
                  {priority}
                </option>
              );
            })}
          </select>
          <DatePicker
            dateFormat='yyyy-MM-dd'
            minDate={new Date()}
            closeOnScroll={true}
            placeholderText='마감 날짜 선택'
            selected={inputValue.deadLine}
            onChange={(date: Date) => getConvertedDate(date)}
          />
          <button type='submit'>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </Form>
        <button onClick={openSort}>
          <FontAwesomeIcon icon={faSortAmountDown} /> Sort
        </button>
        <button onClick={openFilter}>
          <FontAwesomeIcon icon={faFilter} />
          Filter
        </button>
      </Wrapper>
      <ConfirmModal visible={confirmVisible} onClose={closeConfirm} />
      <FilterModal visible={filterVisible} onClose={closeFilter} />
      <SortModal visible={sortVisible} onClose={closeSort} />
    </>
  );
};

export default TodoFilter;

const Wrapper = styled.div`
  position: fixed;
  top: 100px;
  width: 100vw;
  height: 70px;
  z-index: 1;
  background-color: #82d2b3;
  display: flex;
  justify-content: center;
  align-items: center;
  & button {
    font-size: 1.2rem;
    padding: 5px 10px;
    margin-right: 5px;
    border: none;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    &:hover {
      background-color: #dfdfdf;
    }
  }
`;

const FormInput = styled.input`
  padding: 10px;
  border: 0;
  margin-right: 1rem;
  line-height: normal;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;

  & .react-datepicker-wrapper,
  .react-datepicker__input-container input {
    border: 0;
    width: 10rem;
    font-size: 1.1rem;
    margin-right: 1rem;
  }
  & input {
    width: 20rem;
    &:last-child {
      padding: 10px 0;
      border: 0;
    }
  }
  & select {
    border: none;
    padding: 6px 20px;
    margin-right: 1rem;
  }
`;
