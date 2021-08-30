import { useTodoAndDispatchContext } from 'context/TodoContext';
import React, { useState } from 'react';
import styled from 'styled-components';
import { OrderType } from 'type';
import Modal, { IModal } from '../Modal';
import ModalRadioForm from '../Form/ModalRadioForm';
import { ApplyButton } from '../Button';

export interface ISortOption {
  sortBy: null | string;
  order: OrderType;
}

export interface ISortModal extends IModal {
  sortOptions?: ISortOption;
}

const defaultSortOption: ISortOption = {
  sortBy: null,
  order: 'DESC',
};

const sortByOptionList: string[] = ['deadLine', 'updatedAt', 'priority']; //priority 옵션 우선순위는 추후 추가
const orderOptionList: ('DESC' | 'ASC')[] = ['DESC', 'ASC'];

const SortModal: React.FC<ISortModal> = ({ sortOptions = defaultSortOption, visible, onClose }) => {
  const [sort, setSort] = useState<ISortOption>(sortOptions);
  const { dispatch } = useTodoAndDispatchContext();
  const handleSort = (key: string, option: string | null) => {
    setSort((prev) => {
      return { ...prev, [key]: option };
    });
  };
  const applySort = () => {
    dispatch({ type: 'SORT', sort: sort });
    onClose();
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <Wrapper>
        <ModalRadioForm
          isNullOption
          optionKey='sortBy'
          headerText='정렬기준'
          activeOption={sort.sortBy}
          optionList={sortByOptionList}
          handleValue={handleSort}
        />
        <ModalRadioForm
          optionKey='order'
          headerText='정렬순서'
          activeOption={sort.order}
          optionList={orderOptionList}
          handleValue={handleSort}
        />
        <ApplyButton onClick={applySort}>Apply</ApplyButton>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 400px;
`;

export default SortModal;
