import React from 'react';
import styled from 'styled-components';

interface IRadioItem {
  name: string;
  id: string;
  isActive: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioItem: React.FC<IRadioItem> = ({ name, id, isActive, onChange }) => {
  const labelText = (value: string) => {
    switch (value) {
      case 'DESC':
        return '내림차순';
      case 'ASC':
        return '오름차순';
      case 'deadLine':
        return '마감일';
      case 'updatedAt':
        return '수정일';
      case 'priority':
        return '중요도';
      case 'null':
        return '비활성화';
      default:
        return value;
    }
  };

  return (
    <SelectorItem>
      <RadioButtonItem type='radio' name={name} value={id} checked={isActive} onChange={onChange} />
      <LabelText isActive={isActive}>{labelText(id)}</LabelText>
    </SelectorItem>
  );
};

interface IItemText {
  isActive: boolean;
}

const SelectorItem = styled.div`
  display: flex;
  padding: 3px;
`;

const RadioButtonItem = styled.input`
  margin-right: 12px;
  &[type='radio'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    display: inline-block;
    width: 20px;
    height: 20px;
    padding: 3px;
    background-clip: content-box;
    border: 2px solid #bbbbbb;
    background-color: #e7e6e7;
    border-radius: 50%;
  }
  &[type='radio']:checked {
    background-color: #8ee5c2;
  }
`;

const LabelText = styled.span<IItemText>`
  color: ${({ isActive }) => (isActive ? 'black' : '#aaa')};
`;

export default RadioItem;
