import { ISortOption } from './../components/common/Modal/SortModal/SortModal';
import { ITodo, Priority, OrderType, IFilterOptions } from './../type';

export const useFilterAndSrot = (
  todos: ITodo[],
  filters: IFilterOptions,
  sort: ISortOption,
): ITodo[] => {
  const { startDate, endDate } = filters;
  const { sortBy, order } = sort;

  let modifiedTodos: ITodo[] = [...todos];

  // filter
  if (filters.priority.length) {
    modifiedTodos = modifiedTodos?.filter((todo) => filters.priority.includes(todo.priority));
  }

  const startDateFilter = (start: Date | null, target: Date): boolean => {
    return (start !== null && target >= start) || start === null;
  };

  const endDateFilter = (end: Date | null, target: Date): boolean => {
    return (end !== null && target <= end) || end === null;
  };

  if (startDate || endDate) {
    modifiedTodos = modifiedTodos.filter(
      (todo) =>
        startDateFilter(startDate, new Date(todo.deadLine)) &&
        endDateFilter(endDate, new Date(todo.deadLine)),
    );
  }

  // sort
  const sortDate = (prev: Date, next: Date, order: OrderType): number => {
    return order === 'ASC'
      ? new Date(prev).valueOf() - new Date(next).valueOf()
      : -(new Date(prev).valueOf() - new Date(next).valueOf());
  };

  if (sortBy === 'deadLine') {
    modifiedTodos = [
      ...modifiedTodos.sort((prev, next) =>
        sortDate(new Date(prev.deadLine), new Date(next.deadLine), order),
      ),
    ];
  }

  if (sortBy === 'updatedAt') {
    modifiedTodos = [
      ...modifiedTodos.sort((prev, next) =>
        sortDate(new Date(prev.updatedAt), new Date(next.updatedAt), order),
      ),
    ];
  }

  const convertPriority = (target: Priority): number => {
    switch (target) {
      case 'LOW':
        return 0;
      case 'MEDIUM':
        return 1;
      case 'HIGH':
        return 2;
      default:
        return 0;
    }
  };

  const prioritySort = (prev: Priority, next: Priority, order: OrderType): number => {
    const convertedPrev: number = convertPriority(prev);
    const convertedNext: number = convertPriority(next);
    return order === 'ASC' ? convertedPrev - convertedNext : -(convertedPrev - convertedNext);
  };

  if (sortBy === 'priority') {
    modifiedTodos = [
      ...modifiedTodos.sort((prev, next) => prioritySort(prev.priority, next.priority, order)),
    ];
  }

  return modifiedTodos;
};
