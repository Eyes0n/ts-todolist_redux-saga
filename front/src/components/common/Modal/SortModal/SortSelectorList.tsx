import React from 'react';
import styled from 'styled-components';
import SortSelectorItem from './SortSelectorItem';

interface ISortSelectorList {
  info: string;
  isNullOption?: boolean;
  activeOption: null | string;
  optionList: string[];
  handleValue: (key: string, option: string | null) => void;
}

const SortSelectorList: React.FC<ISortSelectorList> = ({
  info,
  isNullOption = false,
  activeOption,
  optionList,
  handleValue,
}) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    const { id } = e.target;
    id === 'null' ? handleValue(info, null) : handleValue(info, id);
  };
  return (
    <Wrapper>
      {info}
      <SelectorItemListWrapper>
        {isNullOption && (
          <SortSelectorItem
            name={info}
            id='null'
            isActive={activeOption === null}
            onChange={onChange}
          />
        )}
        {optionList.map((item, index) => {
          return (
            <SortSelectorItem
              name={info}
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

const SelectorItemListWrapper = styled.div`
  display: flex;
  padding-top: 12px;
  justify-content: space-around;
`;
export default SortSelectorList;
