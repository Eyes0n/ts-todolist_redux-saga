import { SortOptions } from 'type';

export const CHANGE_SORT = 'sort/CHANGE_SORT' as const;

// 정렬 액션 생성 함수 생성
export const changeSort = (sort: SortOptions) => ({
  type: CHANGE_SORT,
  sort,
});

type sortAction = ReturnType<typeof changeSort>;

const initialState: SortOptions = {
  sortBy: null,
  order: 'ASC',
};

// 정렬 리듀서 생성
// 액션 타입에 따른 로직 처리의 결과로 상태를 갱신
const sortReducer = (state: SortOptions = initialState, action: sortAction): SortOptions => {
  switch (action.type) {
    case CHANGE_SORT:
      return { ...state, ...action.sort };

    default:
      return state;
  }
};

export default sortReducer;
