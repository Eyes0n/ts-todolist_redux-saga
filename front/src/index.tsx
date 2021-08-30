import React from 'react';
import ReactDOM from 'react-dom';
import { TodoProvider } from 'context/TodoContext';
import App from './App';
import GlobalStyle from './style/global';

ReactDOM.render(
  <React.StrictMode>
    <TodoProvider>
      <App />
    </TodoProvider>
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root'),
);
