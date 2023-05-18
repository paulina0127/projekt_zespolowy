import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import Pagination from 'react-bootstrap/Pagination'
import { listFilteredOffers } from '../actions/offerActions'
import { SuccessApplicationModal } from '../components/candidate'
import { Offer, JobSearchForm } from '../components/offers'
import { Loader, Message } from '../components/basics'

const OffersScreen = () => {
  const user = useSelector((state) => state.auth.user)
  const searchFormLoading = useSelector((state) => state.categoryList.loading)
  const success = useSelector((state) => state.candidate.success)

  const { page = 1 } = useParams()
  const offerList = useSelector((state) => state.offerList)
  const { offers, loading, length, error } = offerList

  const perPage = 5 // number of offers to display per page
  const start = (page - 1) * perPage // calculate the start index of the current page
  const end = start + perPage // calculate

  const dispatch = useDispatch()

  useEffect(() => {
    const filters = new URLSearchParams(window.location.search)
    dispatch(listFilteredOffers(Object.fromEntries(filters.entries())))
  }, [])

  return (
    <>
      <div style={{ minHeight: 'calc(100vh - 200px - 65px)' }}>
        <JobSearchForm page={page} />
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
              ) : user.profile === null ? (
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
                  {offers.slice(start, end).map((offer) => (
                    <Offer key={offer.id} offer={offer} />
                  ))}
                </ul>
              )}
              <div className='d-flex justify-content-center'>
                <Pagination className='mt-4'>
                  <Pagination.Prev disabled={page <= 1} />
                  {Array.from(
                    { length: Math.ceil(length / perPage) },
                    (_, i) => (
                      <Pagination.Item
                        key={i + 1}
                        active={i + 1 === Number(page)}
                      >
                        {i + 1}
                      </Pagination.Item>
                    )
                  )}
                  <Pagination.Next
                    disabled={page >= Math.ceil(length / perPage)}
                  />
                </Pagination>
              </div>
            </>
          )}
        </div>
        {success && <SuccessApplicationModal showModal={success} />}
      </div>
    </>
  )
}

export default OffersScreen
