import React from 'react';
import { Company } from '../components/company';
import { Loader, Message, Pagination } from '../components/basics';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { listCompanies } from '../actions/companyActions';
import { COMPANY_LIST_CLEAR } from '../constants/companyConst';
import styles from './CompaniesScreen.module.css';
import classNames from 'classnames';

const CompaniesScreen = () => {
  const companyList = useSelector((state) => state.companyList);
  const { companies, loading, length, error } = companyList;

  const [page, setPage] = useState(1);
  const pageSize = 15;

  const handleClickBack = () => {
    setPage(page - 1);
  };

  const handleClickForward = () => {
    setPage(page + 1);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCompanies({ page: page }));
    return () => {
      dispatch({ type: COMPANY_LIST_CLEAR });
    };
  }, [page]);

  return (
    <>
      <div style={{ minHeight: 'calc(100vh - 200px - 65px)' }}>
        <h1 className='text-center fw-bold m-5'>Pracodawcy</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : length === 0 ? (
          <Message variant='danger'>Brak wyników</Message>
        ) : (
          <div className={'container mb-5'}>
            <div className={styles.container}>
              {companies.map((company) => (
                <Company key={company.id} company={company} />
              ))}
            </div>
            <div className='d-flex mt-5 justify-content-center'>
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
          </div>
        )}
      </div>
    </>
  );
};

export default CompaniesScreen;
