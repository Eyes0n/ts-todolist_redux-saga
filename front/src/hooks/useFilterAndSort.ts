import { ISortOption } from './../components/common/Modal/SortModal/SortModal';
import { ITodo, Priority, OrderType, IFilterOptions } from './../type';

// filter와 sort를 적용한 todos를 반환하는 hook
export const useFilterAndSrot = (
  todos: ITodo[],
  filters: IFilterOptions,
  sort: ISortOption,
): ITodo[] => {
  const { startDate, endDate } = filters;
  const { sortBy, order } = sort;

  let modifiedTodos: ITodo[] = [...todos];

  // filter조건과 priority에 따른 필터링
  if (filters.priority.length) {
    modifiedTodos = modifiedTodos?.filter((todo) => filters.priority.includes(todo.priority));
  }

  // 최소일 보다 큰 마감기간
  const startDateFilter = (start: Date | null, target: Date): boolean => {
    return (start !== null && target >= start) || start === null;
  };

  // 최대일 보다 작은 마감기간
  const endDateFilter = (end: Date | null, target: Date): boolean => {
    return (end !== null && target <= end) || end === null;
  };

  // 마감기간이 최소일과 최대일 범위에 있는 todo들 필터링
  if (startDate || endDate) {
    modifiedTodos = modifiedTodos.filter(
      (todo) =>
        startDateFilter(startDate, new Date(todo.deadLine)) &&
        endDateFilter(endDate, new Date(todo.deadLine)),
    );
  }

  // sortBy(정렬 기준 값)에 따른 정렬된 todo들을 반환
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

  // enum 타입의 Priority를 숫자로 변환시키는 함수
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

  // 우선 순위에 따른 정렬된 todos를 반환하는 함수
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
