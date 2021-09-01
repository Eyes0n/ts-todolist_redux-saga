import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './style/global';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from 'modules';

// saga 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();

// store에 saga 미들웨어 연결
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

// 루트 사가 실행
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root'),
);
