import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { listFilteredOffers } from "../actions/offerActions";

import Offer from '../components/Offer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import JobSearchForm from '../components/JobSearchForm';
import Pagination from 'react-bootstrap/Pagination';

const OffersScreen = () => {
  const { page = 1 } = useParams(); 
  const offerList = useSelector(state => state.offerList);
  const { offers, loading, length, error } = offerList;

  const perPage = 5; // number of offers to display per page
  const start = (page - 1) * perPage; // calculate the start index of the current page
  const end = start + perPage; // calculate 

  const dispatch = useDispatch();

  useEffect(() => {
    const filters = new URLSearchParams(window.location.search);
    dispatch(listFilteredOffers(Object.fromEntries(filters.entries())));
  }, []);

  return (
    <>
      <JobSearchForm page={page} />
      <div className="container justify-content-center px-4 py-5 bg-white border shadow rounded my-3">
        <h1 className='mt-2 mb-5'>Znalezione oferty pracy: {length}</h1>
        { loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message>
          : length === 0 ? <Message variant='danger'>Brak wyników dla podanych filtrów</Message>
          :
          <ul className="col-12">
            {offers
              .slice(start, end)
              .map(offer => <Offer key={offer.id} offer={offer}/>
            )}
          </ul>
        }
        <div className="d-flex justify-content-center">
          <Pagination className="mt-4">
            <Pagination.Prev disabled={page <= 1} />
            {Array.from({ length: Math.ceil(length / perPage) }, (_, i) => (
              <Pagination.Item key={i + 1} active={i + 1 === Number(page)} >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next disabled={page >= Math.ceil(length / perPage)} />
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default OffersScreen;