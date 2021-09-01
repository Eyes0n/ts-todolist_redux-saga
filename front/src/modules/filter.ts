import { IFilterOptions } from 'type';

export const CHANGE_FILTER = 'filter/CHANGE_FILTER' as const;

// 필터 액션 생성 함수 생성
export const changeFilter = (filters: IFilterOptions) => ({
  type: CHANGE_FILTER,
  filters: filters,
});

export type filterAction = ReturnType<typeof changeFilter>;

const initialState: IFilterOptions = {
  status: [],
  priority: [],
  startDate: null,
  endDate: null,
};

// 필터 리듀서 함수 생성
// 액션 타입에 따른 로직 처리의 결과로 상태를 갱신
const filterReducer = (
  state: IFilterOptions = initialState,
  action: filterAction,
): IFilterOptions => {
  switch (action.type) {
    case CHANGE_FILTER: {
      return { ...state, ...action.filters };
    }
    default:
      return state;
  }
};

export default filterReducer;
