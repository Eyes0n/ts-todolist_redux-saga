import React from 'react';
import styled from 'styled-components';
import { Priority, Status } from 'type';

interface IFilterToggleItem<T> {
  value: T;
  isActive: boolean;
  onClick: (value: React.MouseEvent<HTMLElement>) => void;
}

const FilterToggleItem: React.FC<IFilterToggleItem<Priority | Status>> = ({
  value,
  isActive,
  onClick,
}) => {
  return (
    <Item isActive={isActive} onClick={onClick} id={value}>
      {value}
    </Item>
  );
};

interface IItem {
  isActive: boolean;
}

const Item = styled.button<IItem>`
  width: 120px;
  padding: 3px;
  margin: 2px;
  border: 0;
  border-radius: 10px;
  background-color: ${({ isActive }) => {
    return isActive ? '#82d2b3' : '#aaa';
  }};
  color: ${({ isActive }) => {
    return isActive ? 'white' : '#777';
  }};
`;

export default FilterToggleItem;
