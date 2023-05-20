import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { listFilteredOffers } from '../actions/offerActions';
import { SuccessApplicationModal } from '../components/candidate';
import { Offer, JobSearchForm } from '../components/offers';
import { Loader, Message, Pagination } from '../components/basics';

const OffersScreen = () => {
  const user = useSelector((state) => state.auth.user);
  const searchFormLoading = useSelector((state) => state.categoryList.loading);
  const success = useSelector((state) => state.candidate.success);

  const offerList = useSelector((state) => state.offerList);
  const { offers, loading, length, error } = offerList;

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const dispatch = useDispatch();

  useEffect(() => {
    const filters = new URLSearchParams(window.location.search);
    filters.set('page', page);
    console.log(filters);
    dispatch(listFilteredOffers(Object.fromEntries(filters.entries())));
  }, [page]);

  const handleClickBack = () => {
    setPage(page - 1);
  };

  const handleClickForward = () => {
    setPage(page + 1);
  };

  const handlePageReset = () => {
    setPage(1);
  };

  return (
    <>
      <div style={{ minHeight: 'calc(100vh - 200px - 65px)' }}>
        <JobSearchForm pageReset={handlePageReset} />
        <div className='container justify-content-center px-4 py-5 my-3'>
          {searchFormLoading ? (
            ''
          ) : (
            <>
              {user === null ? (
                <Message>
                  Aplikowanie możliwe jest tylko dla zalogowanych użytkowników
                  <Link to='/rejestracja' className='text-primary fw-bold'>
                    {' '}
                    Załóż konto
                  </Link>{' '}
                  lub
                  <Link to='/logowanie' className='text-primary fw-bold'>
                    {' '}
                    Zaloguj się
                  </Link>
                  , aby móc aplikować
                </Message>
              ) : user?.profile === null ? (
                <Message>
                  Zauważyliśmy, że nie posiadasz profilu kandydata.
                  <Link
                    to='/user-panel/dane-osobowe'
                    className='text-primary fw-bold'
                  >
                    {' '}
                    Załóż go
                  </Link>
                  , aby móc aplikować
                </Message>
              ) : (
                ''
              )}
              <h1 className='mt-2 mb-5'>Znalezione oferty pracy: {length}</h1>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : length === 0 ? (
                <Message variant='danger'>
                  Brak wyników dla podanych filtrów
                </Message>
              ) : (
                <ul className='col-12'>
                  {offers.map((offer) => (
                    <Offer key={offer.id} offer={offer} />
                  ))}
                </ul>
              )}
              <div className='d-flex justify-content-center'>
                {!loading && (
                  <Pagination
                    page={page}
                    pageSize={pageSize}
                    count={length}
                    clickBack={handleClickBack}
                    clickForward={handleClickForward}
                  />
                )}
              </div>
            </>
          )}
        </div>
        {success && <SuccessApplicationModal showModal={success} />}
      </div>
    </>
  );
};

export default OffersScreen;
