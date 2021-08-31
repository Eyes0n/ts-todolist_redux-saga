import { IFilterOptions } from 'type';

export const CHANGE_FILTER = 'filter/CHANGE_FILTER' as const;

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
