"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
var PORT = 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var todos = [
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
app.get('/todos', function (req, res) {
    try {
        return res.send(todos);
    }
    catch (error) {
        res.send(error.message);
    }
});
app.post('/todo', function (req, res) {
    try {
        var todo = req.body.todo;
        var nextId = todos.length
            ? Math.max.apply(Math, todos.map(function (todo) { return todo.id; })) + 1
            : 1;
        var newTodo = __assign(__assign({}, todo), { id: nextId, updatedAt: todo.createdAt });
        todos.push(newTodo);
        return res.send(newTodo);
    }
    catch (error) {
        res.send(error.message);
    }
});
app.patch('/todo/:id', function (req, res) {
    try {
        var id_1 = parseInt(req.params.id);
        var editTodo = req.body.editTodo;
        var index = todos.findIndex(function (todo) { return todo.id === id_1; });
        if (index > -1) {
            var updateTodo = __assign(__assign(__assign({}, todos[index]), editTodo), { updatedAt: new Date().toISOString() });
            todos[index] = updateTodo;
        }
        return res.send(todos[index]);
    }
    catch (error) {
        res.send(error.message);
    }
});
app.delete('/todo/:id', function (req, res) {
    try {
        var id_2 = parseInt(req.params.id);
        var index = todos.findIndex(function (todo) { return todo.id === id_2; });
        if (index > -1) {
            todos.splice(index, 1);
        }
        return res.send(id_2.toString());
    }
    catch (error) {
        res.send(error.message);
    }
});
app.listen(PORT, function () { return console.log("Server running on port " + PORT); });
