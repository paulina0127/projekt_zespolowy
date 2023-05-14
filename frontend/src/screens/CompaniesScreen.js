import React from 'react';
import { Company } from '../components/company';
import { Loader, Message } from '../components/basics';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { listCompanies } from '../actions/companyActions';
import { COMPANY_LIST_CLEAR } from '../constants/companyConst';
import styles from './CompaniesScreen.module.css';
import classNames from 'classnames';

const CompaniesScreen = () => {
  const companyList = useSelector((state) => state.companyList);
  const { companies, loading, length, error } = companyList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCompanies());
    return () => {
      dispatch({ type: COMPANY_LIST_CLEAR });
    };
  }, []);

  return (
    <>
      <h1 className='text-center fw-bold m-5'>Pracodawcy</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : length === 0 ? (
        <Message variant='danger'>Brak wyników</Message>
      ) : (
        <div className={classNames('container mb-5', styles.container)}>
          {companies.map((company) => (
            <Company key={company.id} company={company} />
          ))}
        </div>
      )}
    </>
  );
};

export default CompaniesScreen;
