import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const CompanyApplicationInfo = ({
  type,
  handleCloseModal,
  handleChangeStatus,
  id,
}) => {
  const variant = type === 'accept' ? 'success' : 'danger';
  return (
    <>
      <p>Prosimy o potwierdzenie zmiany statusu aplikacji</p>
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
          className={`btn btn-${variant} rounded-pill fw-bold shadow-sm px-5`}
          onClick={() => handleChangeStatus(id, type)}
        >
          {type === 'accept' ? 'Akceptuj ' : 'Odrzuć '}
          {type === 'accept' ? <AiOutlineCheck /> : <AiOutlineClose />}
        </button>
      </div>
    </>
  );
};

export default CompanyApplicationInfo;
