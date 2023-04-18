import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOffers } from "../actions/offerActions";

import Offer from "../components/Offer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import styles from './HomeScreen.module.css'

const HomeScreen = () => {
  const dispatch = useDispatch();
  const offerList = useSelector(state => state.offerList);
  const { error, loading, offers } = offerList;

  useEffect(() => {
    dispatch(listOffers());
  }, [dispatch]);

  return (
  <>
    <section className={styles["hero-image"]}>
      <div className={styles["hero-image-container"]}>
          <div className={styles["hero-text"]}>
              <h1 className={styles["hero-title"]}>Jakiś tytuł może</h1>
              <p className={styles["hero-p"]}>Znajdź swoją wymarzoną ofertę i Aplikuj z nami!</p>
              {/* <a href="" className={styles["hero-butt"]}>Button</a> */}
          </div>    
      </div>
    </section>
    <section className={styles["search-sec"]}>
      <div className="container">
          <form action="#" method="post" novalidate="novalidate">
              <div className="row">
                  <div className="col-lg-12">
                      <div className="d-flex flex-row justify-content-center">
                          <div className="col-lg-5 col-md-3 col-sm-12 p-0 mx-2">
                              <input type="text" className="form-control rounded-pill" placeholder="Słowa kluczowe"/>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-12 p-0 mx-2">
                              <input type="text" className="form-control rounded-pill" placeholder="Lokalizacja"/>
                          </div>
                          <div className="col-lg-2 col-md-3 col-sm-12 p-0 mx-2">
                              <select className="form-control rounded-pill" id="exampleFormControlSelect1">
                                  <option>Kategoria</option>
                                  <option>Example one</option>
                                  <option>Example one</option>
                                  <option>Example one</option>
                                  <option>Example one</option>
                                  <option>Example one</option>
                                  <option>Example one</option>
                              </select>
                          </div>
                          <div className="col-lg-2 col-md-3 col-sm-12 p-0">
                              <button type="button" className="btn btn-warning rounded-pill">Wyszukaj</button>
                          </div>
                      </div>
                  </div>
              </div>
          </form>
      </div>
  </section>
  <div className="container mt-5">
      <div className="row">
      <h1 className='justify-content-center mb-5'>Znalezione oferty pracy</h1>
      {loading ? <Loader />
        : error ? <Message variant='danger'>{error}</Message>
        :
        <ul className="col-12">
          {offers.map(offer => <Offer key={offer.id} offer={offer}/>
          )}
        </ul>
      }
      </div>
    </div>
  </>
  );
}

export default HomeScreen