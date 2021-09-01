export type Todo = {
  id: number;
  task: string;
  status: string;
  priority: string;
  deadLine: string;
  createdAt: string;
  updatedAt: string;
};

export type EditTodo = {
  id: number;
  task?: string;
  status?: string;
  priority?: string;
  deadLine?: string;
  createdAt?: string;
};
