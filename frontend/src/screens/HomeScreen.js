import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/categoryActions";
import { Link, useNavigate } from "react-router-dom";
import { DropdownButton } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

import CategoryCheckbox from "../components/CategoryCheckbox";
import styles from './HomeScreen.module.css'

const HomeScreen = () => {
  const [searchInput, setSearchInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categoryList = useSelector(state => state.categoryList);
  const { categories } = categoryList;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    sendSearchData(searchInput, locationInput, selectedCategories);
  };

  console.log(selectedCategories);

  const sendSearchData = (searchInput, locationInput, categories) => {
    // axios.get('http://localhost:8000/api/search/', {
    //   params: {
    //     searchInput: searchInput,
    //     locationInput: locationInput,
    //     categories: categories
    //   }
    // })
    //   .then(res => {
    //     dispatch({ type: 'SET_SEARCH_RESULTS', payload: res.data });
    //     // Przejście do ekranu z wynikami wyszukiwania
    //     navigate('/search-results');
    //   })
    //   .catch(err => console.log(err));
  };

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
          <form onSubmit={handleSearch}>
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex flex-row justify-content-around">
                  <div className="col-lg-4 col-md-3 col-sm-12 p-0 mx-2">
                    <div className="input-group">
                      <input 
                        type="text" 
                        className="form-control rounded-pill" 
                        placeholder="Zawód, firma"
                        value={searchInput} 
                        onChange={e => setSearchInput(e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-3 col-sm-12 p-0 mx-2">
                    <div className="input-group">
                      <input 
                        type="text" 
                        className="form-control rounded-pill" 
                        placeholder="Lokalizacja"
                        value={locationInput} 
                        onChange={e => setLocationInput(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-2 col-md-3 col-sm-12 p-0 mx-2">
                    {Object.keys(categories).length === 0 ? null : (
                      <DropdownButton variant="light" title="Wybierz kategorię">
                        {categories.map(category => (
                          <CategoryCheckbox 
                            key={category.id} 
                            category={category} 
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            />
                        ))}
                      </DropdownButton>
                    )}
                  </div>
                  <div className="col-lg-2 col-md-3 col-sm-12 p-0 mx-2 flex-fill">
                    <button type="button" className="btn btn-warning rounded-pill fw-bold">Wyszukaj</button>
                  </div>
                  </div>
                </div>
            </div>
          </form>
        </div>
    </section>
    <section className={styles["hero-image"]}>
      <div className={styles["hero-image-cta-container"]}>
        <div className={styles["hero-image-cta-title"]}>
          <h1 style={{color: "var(--yellow)"}}>Stwórz darmowe konto</h1>
          <h1>I zacznij szukać swojej wymarzonej <br/> pracy już teraz!</h1>
          <Link to="/rejestracja">
            <button type="button" className="btn btn-warning rounded-pill fw-bold btn-lg">Zarejestruj się</button>
          </Link>
        </div>
      </div>
    </section>
    <div className="container mt-5"></div>
  </>
  );
}

export default HomeScreen