import React, { useState, useEffect } from 'react';
import TodoFilter from './TodoFilter/TodoFilter';
import styled from 'styled-components';
import { getKoreaTime } from 'utils/commons';

const TodoHeader: React.FC = () => {
  const [currentTime, setCurrentTime] = useState('');

  const getCurrentTime = () => {
    const currentTime = getKoreaTime(new Date());
    setCurrentTime(currentTime!.toLocaleString('ko-KR'));
  };

  useEffect(() => {
    setInterval(getCurrentTime, 1000);
    return () => {
      setInterval(getCurrentTime, 1000);
    };
  }, []);

  return (
    <>
      <Wrapper>
        <h1>Tworello</h1>
        <span>{currentTime}</span>
      </Wrapper>
      <TodoFilter />
    </>
  );
};

export default TodoHeader;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100px;
  z-index: 1;
  background-color: #8ee5c2;
  & span {
    color: white;
    font-weight: bold;
    position: fixed;
    top: 80px;
  }
  & h1 {
    margin: 0;
    color: white;
    text-align: center;
    line-height: 100px;
  }
`;
