import React from 'react';
import styled from 'styled-components';
import { Priority, Status } from 'type';
import ToggleItem from './FilterToggleItem';

interface IFilterToggleList<T> {
  optionKey: string;
  headerText: string;
  toggleList: T[];
  activeList: T[];
  handleFilter: (key: string, option: T[]) => void;
}

const FilterToggleList: React.FC<IFilterToggleList<Priority | Status>> = ({
  toggleList,
  activeList,
  headerText,
  optionKey,
  handleFilter,
}) => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const targetToggleItem = e.currentTarget.id as Priority | Status;
    const newActiveList: (Priority | Status)[] = activeList.some(
      (value) => value === targetToggleItem,
    )
      ? activeList.filter((item) => item !== targetToggleItem)
      : [...activeList, targetToggleItem];
    handleFilter(optionKey, newActiveList);
  };

  return (
    <Wrapper>
      {headerText}
      <ToggleItemListWrapper>
        {toggleList.map((item, index) => {
          const isActive = activeList.some((value) => value === item);
          return <ToggleItem key={index} value={item} isActive={isActive} onClick={onClick} />;
        })}
      </ToggleItemListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 6px;
`;

const ToggleItemListWrapper = styled.div`
  display: flex;
  padding-top: 3px;
  justify-content: space-around;
`;

export default FilterToggleList;
