import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

function Pagination({ page, pageSize, count, clickBack, clickForward }) {
  const pages = Math.ceil(count / pageSize);

  return (
    !isNaN(pages) &&
    pages !== 0 && (
      <div className='paginationContainer'>
        <button
          onClick={clickBack}
          disabled={page === 1}
          className='paginationBtn'
        >
          <AiOutlineArrowLeft size='1.5rem' />
        </button>
        <div>
          {page} z {pages}
        </div>
        <button
          onClick={clickForward}
          disabled={page === pages}
          className='paginationBtn'
        >
          <AiOutlineArrowRight size='1.5rem' />
        </button>
      </div>
    )
  );
}

export default Pagination;
