import React from 'react';
import styled from 'styled-components';
import RadioItem from './RadioItem';

interface IModalRadioForm {
  optionKey: string;
  headerText: string;
  isNullOption?: boolean;
  activeOption: null | string;
  optionList: string[];
  handleValue: (key: string, option: string | null) => void;
}

const ModalRadioForm: React.FC<IModalRadioForm> = ({
  optionKey,
  headerText,
  isNullOption = false,
  activeOption,
  optionList,
  handleValue,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { value } = e.target;
    value === 'null' ? handleValue(optionKey, null) : handleValue(optionKey, value);
  };
  return (
    <Wrapper>
      {headerText}
      <SelectorItemListWrapper>
        {isNullOption && (
          <RadioItem
            name={optionKey}
            id='null'
            isActive={activeOption === null}
            onChange={onChange}
          />
        )}
        {optionList.map((item, index) => {
          return (
            <RadioItem
              name={optionKey}
              id={item}
              key={index}
              isActive={activeOption === item}
              onChange={onChange}
            />
          );
        })}
      </SelectorItemListWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 6px;
`;

const SelectorItemListWrapper = styled.form`
  display: flex;
  padding-top: 12px;
  justify-content: space-around;
`;
export default ModalRadioForm;
