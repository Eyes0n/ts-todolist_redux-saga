const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(json());

let todos = [
  {
    task: '1',
    deadLine: '2021-08-31T06:41:21.305Z',
    priority: 'LOW',
    status: 'IN_PROGRESS',
    createdAt: '2021-08-31T06:41:21.305Z',
    id: 1,
    updatedAt: '2021-08-31T06:41:32.592Z',
  },
  {
    task: '2',
    deadLine: '2021-08-31T06:41:26.601Z',
    priority: 'LOW',
    status: 'TODO',
    createdAt: '2021-08-31T06:41:26.601Z',
    id: 2,
    updatedAt: '2021-08-31T06:41:26.601Z',
  },
  {
    task: '3',
    deadLine: '2021-08-31T06:41:26.818Z',
    priority: 'MEDIUM',
    status: 'TODO',
    createdAt: '2021-08-31T06:41:26.818Z',
    id: 3,
    updatedAt: '2021-08-31T06:41:34.864Z',
  },
  {
    task: '4',
    deadLine: '2021-08-31T06:41:27.009Z',
    priority: 'HIGH',
    status: 'TODO',
    createdAt: '2021-08-31T06:41:27.009Z',
    id: 4,
    updatedAt: '2021-08-31T06:41:37.628Z',
  },
  {
    task: '5',
    deadLine: '2021-08-31T06:41:27.225Z',
    priority: 'LOW',
    status: 'DONE',
    createdAt: '2021-08-31T06:41:27.225Z',
    id: 5,
    updatedAt: '2021-08-31T06:41:41.274Z',
  },
  {
    task: '6',
    deadLine: '2021-08-31T06:41:27.482Z',
    priority: 'LOW',
    status: 'TODO',
    createdAt: '2021-08-31T06:41:27.482Z',
    id: 6,
    updatedAt: '2021-08-31T06:41:27.482Z',
  },
  {
    task: '7',
    deadLine: '2021-08-31T14:59:59.000Z',
    priority: 'HIGH',
    status: 'DONE',
    createdAt: '2021-08-31T06:57:50.603Z',
    id: 7,
    updatedAt: '2021-08-31T06:58:21.674Z',
  },
  {
    task: '8',
    deadLine: '2021-09-02T14:59:59.000Z',
    priority: 'LOW',
    status: 'TODO',
    createdAt: '2021-08-31T06:57:57.385Z',
    id: 8,
    updatedAt: '2021-08-31T06:57:57.385Z',
  },
  {
    task: '9',
    deadLine: '2021-09-03T14:59:59.000Z',
    priority: 'MEDIUM',
    status: 'TODO',
    createdAt: '2021-08-31T07:13:58.089Z',
    id: 9,
    updatedAt: '2021-08-31T07:13:58.089Z',
  },
  {
    task: '10',
    deadLine: '2021-09-04T14:59:59.000Z',
    priority: 'LOW',
    status: 'TODO',
    createdAt: '2021-08-31T07:14:05.420Z',
    id: 10,
    updatedAt: '2021-08-31T07:14:05.420Z',
  },
  {
    task: '11',
    deadLine: '2021-08-31T14:59:59.000Z',
    priority: 'LOW',
    status: 'TODO',
    createdAt: '2021-08-31T08:09:15.154Z',
    id: 11,
    updatedAt: '2021-08-31T08:09:15.154Z',
  },
  {
    task: '12',
    deadLine: '2021-08-31T08:09:32.189Z',
    priority: 'LOW',
    status: 'TODO',
    createdAt: '2021-08-31T08:09:32.189Z',
    id: 12,
    updatedAt: '2021-08-31T08:09:32.189Z',
  },
  {
    task: '13',
    deadLine: '2021-08-31T08:09:32.405Z',
    priority: 'LOW',
    status: 'TODO',
    createdAt: '2021-08-31T08:09:32.405Z',
    id: 13,
    updatedAt: '2021-08-31T08:09:32.405Z',
  },
];

app.get('/todos', (req, res) => res.send(todos));

app.post('/todo', (req, res) => {
  const todo = req.body.todo;
  const nextId = todos.length
    ? Math.max(...todos.map((todo) => todo.id)) + 1
    : 1;
  const newTodo = { id: nextId, ...todo, updatedAt: todo.createdAt };
  todos.push(newTodo);
  return res.send(newTodo);
});

app.patch('/todo/:id', (req, res) => {
  const id = req.params.id;
  const editTodo = req.body.editTodo;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    const updateTodo = {
      ...todos[index],
      ...editTodo,
      updatedAt: new Date().toISOString(),
    };
    todos[index] = updateTodo;
  }
  return res.send(todos[index]);
});

app.delete('/todo/:id', (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) {
    todos.splice(index, 1);
  }
  return res.send(id);
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
