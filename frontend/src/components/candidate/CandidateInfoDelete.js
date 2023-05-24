import { MdDelete } from 'react-icons/md';

const CandidateInfoDelete = ({ name, handleCloseModal, handleDelete, id }) => {
  return (
    <>
      <h5>Czy na pewno chcesz usunąć {name}?</h5>
      <p>Ta operacja jest nieodwracalna</p>
      <hr className='text-secondary' />
      <div className='d-flex justify-content-center'>
        <button
          type='button'
          className='btn btn-secondary rounded-pill fw-bold shadow-sm mx-2 px-5'
          onClick={handleCloseModal}
        >
          Wróć
        </button>
        <button
          type='button'
          className='btn btn-danger rounded-pill fw-bold shadow-sm px-5'
          onClick={() => handleDelete(id)}
        >
          Usuń <MdDelete />
        </button>
      </div>
    </>
  );
};

export default CandidateInfoDelete;
