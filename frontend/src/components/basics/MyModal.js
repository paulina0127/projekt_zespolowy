import { Modal } from 'react-bootstrap';

const MyModal = ({ children, title, showModal, danger }) => {
  return (
    <Modal
      show={showModal}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header
        className={
          danger === 'accept'
            ? 'bg-success text-light'
            : danger
            ? 'bg-danger text-light'
            : 'bg-warning'
        }
      >
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default MyModal;
