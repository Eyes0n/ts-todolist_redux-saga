import { SortOptions } from 'type';

export const CHANGE_SORT = 'sort/CHANGE_SORT' as const;

export const changeSort = (sort: SortOptions) => ({
  type: CHANGE_SORT,
  sort,
});

type sortAction = ReturnType<typeof changeSort>;

const initialState: SortOptions = {
  sortBy: null,
  order: 'ASC',
};

const sortReducer = (state: SortOptions = initialState, action: sortAction): SortOptions => {
  switch (action.type) {
    case CHANGE_SORT:
      return { ...state, ...action.sort };

    default:
      return state;
  }
};

export default sortReducer;
