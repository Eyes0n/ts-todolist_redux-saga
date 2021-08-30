import Modal, { IModal } from '../Modal';

const ConfirmModal: React.FC<IModal> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} onClose={onClose}>
      할일을 입력해주세요 📝
    </Modal>
  );
};
export default ConfirmModal;
