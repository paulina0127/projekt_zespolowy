import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOffers } from "../actions/offerActions";
import { Link } from "react-router-dom";

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
        <div className={styles["hero-image-title"]}>
          <h1>Znajdź swoją <br />wymarzoną<br />ofertę i <span style={{color: "var(--yellow)"}}>Aplikuj</span> z<br />nami!</h1>
          {/* <a href="" className={styles["hero-butt"]}>Button</a> */}
        </div>    
      </div>
    </section>
      <section className={styles["search-sec"]}>
        <div className="container">
          <form action="#" method="post" noValidate="noValidate">
              <div className="row">
                  <div className="col-lg-12">
                      <div className="d-flex flex-row justify-content-between">
                          <div className="col-lg-6 col-md-3 col-sm-12 p-0 mx-2">
                              <div className="input-group">
                                {/* <i className="fa fa-search"></i> */}
                                <input type="search" className="form-control rounded-pill" i="fa fa-search" placeholder="Zawód, firma"/>
                              </div>
                          </div>
                          <div className="col-lg-5 col-md-3 col-sm-12 p-0 mx-2 flex-fill">
                            <div className="input-group">
                                {/* <i className="fa fa-search"></i> */}
                                <input type="search" className="form-control rounded-pill" placeholder="Lokalizacja"/>
                            </div>
                          </div>
                          <div className="col-lg-2 col-md-3 col-sm-12 p-0 mx-2">
                              <select className="form-control rounded-pill fw-bold ">
                                  <option selected disabled>Kategoria</option>
                                  <option>Example one</option>
                                  <option>Example one</option>
                                  <option>Example one</option>
                                  <option>Example one</option>
                                  <option>Example one</option>
                                  <option>Example one</option>
                              </select>
                          </div>
                          <div className="col-lg-1 col-md-3 col-sm-12 p-0 mx-3 flex-fill">
                              <button type="button" className="btn btn-warning rounded-pill fw-bold">Wyszukaj</button>
                          </div>
                      </div>
                  </div>
              </div>
          </form>
        </div>
    </section>
  <div className="container mt-5">
      <div className="row justify-content-center">
      <h1 className={styles["hero-title"]}>Znalezione oferty pracy</h1>
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
    <section className={styles["hero-image"]}>
      <div className={styles["hero-image-cta-container"]}>
        <div className={styles["hero-image-cta-title"]}>
          <h1 style={{color: "var(--yellow)"}}>Stwórz darmowe konto</h1>
          <h1>I zacznij szukać swojej wymarzonej <br/> pracy już teraz!</h1>
          <a href="/rejestracja" target="_blank" rel="noreferrer">
          <button type="button" className="btn btn-warning rounded-pill fw-bold btn-lg">Zarejestruj się</button>
          </a>
        </div>
      </div>
    </section>
    <div className="container mt-5"></div>
  </>
  );
}

export default HomeScreen