import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { BsClipboard2Check } from 'react-icons/bs';
import { CANDIDATE_COMPONENT_RESET } from '../../constants/candidateConst';

const SuccessApplicationModal = ({ showModal }) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch({ type: CANDIDATE_COMPONENT_RESET });
  };

  return (
    <Modal
      show={showModal}
      size='md'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header className='bg-success text-light'>
        <Modal.Title id='contained-modal-title-vcenter'>
          Aplikacja została wysłana do pracodawcy <BsClipboard2Check />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Status swoich aplikacji możesz śledzić w zakładce
          <strong> Moje aplikacje. </strong>
          <p className='mt-3'>Życzymy samych sukcesów!</p>
        </p>
        <hr className='text-secondary' />
        <div className='d-flex justify-content-center'>
          <Link to='/oferty/'>
            <button
              type='button'
              className='btn btn-outline-success rounded-pill fw-bold shadow-sm mx-2 px-5'
              onClick={handleCloseModal}
            >
              Powrót do ofert
            </button>
          </Link>
          <Link to='/user-panel/moje-aplikacje'>
            <button
              type='submit'
              className='btn btn-success rounded-pill fw-bold shadow-sm px-5'
              onClick={handleCloseModal}
            >
              Moje aplikacje
            </button>
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SuccessApplicationModal;
