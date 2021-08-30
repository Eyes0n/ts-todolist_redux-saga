import React from 'react';
import styled from 'styled-components';
import TodoHeader from 'components/TodoHeader/TodoHeader';
import TodoKanBan from 'components/TodoKanban/TodoKanBan';

const App: React.FC = () => {
  return (
    <TodoContainer>
      <TodoHeader />
      <TodoKanBan />
    </TodoContainer>
  );
};

export default App;

const TodoContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7f9;
`;
