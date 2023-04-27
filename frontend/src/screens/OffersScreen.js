import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { listFilteredOffers } from "../actions/offerActions";
import Offer from '../components/Offer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import JobSearchForm from '../components/JobSearchForm';
import ReactPaginate from "react-paginate";

const OffersScreen = () => {
  const [filters, setFilters] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [offerLength, setOfferLength] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const filteredOfferList = useSelector(state => state.filteredOfferList);
  const { offers, loading, length, error } = filteredOfferList;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = (filters) => {
    setPageNumber(1);
    setFilters(filters);
  };

  const offersPerPage = 5;
  const pagesVisited = (pageNumber - 1) * offersPerPage;

  const filtered = useMemo(() => {
    return Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        } else {
          return value !== "";
        }
      })
    );
  }, [filters]);

  const dispatchAction = useMemo(() => {
    return async () => {
      const pageParam = pageNumber > 1 ? `&page=${pageNumber}` : "";
      const filteredQueryString = new URLSearchParams(filtered).toString();
      dispatch(listFilteredOffers({ ...filtered, page: pageNumber }));
      navigate(`/oferty/${filteredQueryString}${pageParam}`);
    };
  }, [dispatch, filtered, pageNumber, navigate]);

  useEffect(() => {
    dispatchAction();
  }, [dispatchAction]);

  useEffect(() => {
    if (length) {
      setOfferLength(length);
    }
  }, [length]);

  useEffect(() => {
    if (offerLength) {
      setPageCount(Math.ceil(offerLength / offersPerPage));
    }
  }, [offerLength, offersPerPage]);

  return (
    <>
      <JobSearchForm onSearch={handleSearch}/>
      <div className="container justify-content-center px-4 py-5 bg-white border shadow rounded my-3">
        <h1 className='mt-2 mb-5'>Znalezione oferty pracy: {length}</h1>
        {loading ? <Loader />
          : error ? <Message variant='danger'>{error}</Message>
          : length === 0 ? <Message variant='danger'>Brak wyników dla podanych filtrów</Message>
          :
          <> 
            <ul className="col-12">
              {offers
                .slice(pagesVisited, pagesVisited + offersPerPage)
                .map(offer => <Offer key={offer.id} offer={offer}/>
              )}
            </ul>
            <div className="d-flex justify-content-center">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={({ selected }) => setPageNumber(selected + 1)}
                containerClassName="pagination"
                breakLinkClassName="page-link"
                breakClassName="page-item"
                nextLinkClassName="page-link"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                previousClassName="page-item"
                pageLinkClassName="page-link"
                pageClassName="page-item"
                activeClassName="active"
              />
            </div>
          </>
        }
      </div>
    </>
  );
};

export default OffersScreen;