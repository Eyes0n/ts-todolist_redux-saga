import { combineReducers } from 'redux';
import todosReducer from './todos';
import filterReducer from './filter';
import sortReducer from './sort';

const rootReducer = combineReducers({
  todos: todosReducer,
  filters: filterReducer,
  sort: sortReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
