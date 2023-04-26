import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/categoryActions";
import { DropdownButton } from "react-bootstrap";
import CategoryCheckbox from './CategoryCheckbox';

// poprawić duplikaty i połączyć z backendem

const JobSearchForm = (props) => {
  const categoryList = useSelector(state => state.categoryList);
  const { categories } = categoryList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleFiltersToggle = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  const [searchParams, setSearchParams] = useState({
    position: '',
    location: '',
    category: [],
    working_mode: [],
    working_time: [],
    contract_type: [],
  });

  const handleCheckboxChange = e => {
    const { name, value, checked } = e.target;
    setSearchParams(prevSearchParams => {
      const newSearchParams = { ...prevSearchParams };
      if (name === 'working_mode') {
        if (checked) {
          newSearchParams.working_mode.push(value);
        } else {
          newSearchParams.working_mode = newSearchParams.working_mode.filter(mode => mode !== value);
        }
      } else if (name === 'contract_type') {
        if (checked) {
          newSearchParams.contract_type.push(value);
        } else {
          newSearchParams.contract_type = newSearchParams.contract_type.filter(type => type !== value);
        }
      } else if (name === 'working_time') {
        if (checked) {
          newSearchParams.working_time.push(value);
        } else {
          newSearchParams.working_time = newSearchParams.working_time.filter(type => type !== value);
        }
      } else if (name === 'category') {
        if (checked) {
          newSearchParams.category.push(Number(value));
        } else {
          newSearchParams.category = newSearchParams.category.filter(type => type !== Number(value));
        }
      }
      
      return newSearchParams;
    });
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  const handleSubmit = e => {
    e.preventDefault();
    console.log(searchParams);
    // props.onSearch(searchParams);
  };

  return (
    <div className="container px-4 py-5 bg-white border shadow rounded my-3">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                id="position"
                placeholder="Stanowisko, firma"
                value={searchParams.position}
                onChange={handleInputChange}
                name="position"
              />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              id="location"
              placeholder="Lokalizacja"
              value={searchParams.location}
              onChange={handleInputChange}
              name="location"
            />
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12 p-0 mx-2">
            {Object.keys(categories).length === 0 ? null : (
              <DropdownButton variant="light" title="Wybierz kategorię">
                {categories.map(category => (
                  <CategoryCheckbox 
                    key={category.id} 
                    category={category}
                    selectedCategories={searchParams.category}
                    setSelectedCategories={handleCheckboxChange}
                    />
                ))}
              </DropdownButton>
            )}
          </div>
          <div className="col-lg-2 col-md-3 col-sm-12 mx-2">
            <button type="submit" className="btn btn-warning rounded-pill fw-bold">Wyszukaj</button>
          </div>
          <button type="button" className="btn btn-primary my-4 col-3" onClick={handleFiltersToggle}>
            Filtrowanie zaawansowane
          </button>
        </div>
        <div className={`collapse ${isFiltersOpen ? 'show' : ''}`} id="collapseFilters">
          <div className="row mt-3">
            <div className="col-md-4">
              <label htmlFor="working_time">Wymiar etatu</label>
              <div>
                <input
                  type="checkbox"
                  name="working_time"
                  value="Pełny etat"
                  onChange={handleCheckboxChange}
                  checked={searchParams.working_time.includes('Pełny etat')}
                />
                Pełny etat
              </div>
              <div>
                <input
                  type="checkbox"
                  name="working_time"
                  value="Część etatu"
                  onChange={handleCheckboxChange}
                  checked={searchParams.working_time.includes('Część etatu')}
                />
                Część etatu
              </div>
              <div>
                <input
                  type="checkbox"
                  name="working_time"
                  value="Praca dodatkowa / tymczasowa"
                  onChange={handleCheckboxChange}
                  checked={searchParams.working_time.includes('Praca dodatkowa / tymczasowa')}
                />
                Praca dodatkowa / tymczasowa
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="contract_type">Rodzaj umowy:</label>
              <div>
                <input
                  type="checkbox"
                  name="contract_type"
                  value="Umowa o pracę"
                  onChange={handleCheckboxChange}
                  checked={searchParams.contract_type.includes('Umowa o pracę')}
                />
                Umowa o pracę
              </div>
              <div>
                <input
                  type="checkbox"
                  name="contract_type"
                  value="Umowa zlecenie"
                  onChange={handleCheckboxChange}
                  checked={searchParams.contract_type.includes('Umowa zlecenie')}
                />
                Umowa zlecenie
              </div>
              <div>
                <input
                  type="checkbox"
                  name="contract_type"
                  value="Umowa o dzieło"
                  onChange={handleCheckboxChange}
                  checked={searchParams.contract_type.includes('Umowa o dzieło')}
                />
                Umowa o dzieło
              </div>
              <div>
                <input
                  type="checkbox"
                  name="contract_type"
                  value="Umowa o pracę tymczasową"
                  onChange={handleCheckboxChange}
                  checked={searchParams.contract_type.includes('Umowa o pracę tymczasową')}
                />
                Umowa o pracę tymczasową
              </div>
              <div>
                <input
                  type="checkbox"
                  name="contract_type"
                  value="Umowa na zastępstwo"
                  onChange={handleCheckboxChange}
                  checked={searchParams.contract_type.includes('Umowa na zastępstwo')}
                />
                Umowa na zastępstwo
              </div>
              <div>
                <input
                  type="checkbox"
                  name="contract_type"
                  value="Umowa agencyjna"
                  onChange={handleCheckboxChange}
                  checked={searchParams.contract_type.includes('Umowa agencyjna')}
                />
                Umowa agencyjna
              </div>
              <div>
                <input
                  type="checkbox"
                  name="contract_type"
                  value="Kontrakt B2B"
                  onChange={handleCheckboxChange}
                  checked={searchParams.contract_type.includes('Kontrakt B2B')}
                />
                Kontrakt B2B
              </div>
              <div>
                <input
                  type="checkbox"
                  name="contract_type"
                  value="Staż / Praktyka"
                  onChange={handleCheckboxChange}
                  checked={searchParams.contract_type.includes('Staż / Praktyka')}
                />
                Staż / Praktyka
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="working_mode">Tryb pracy</label>
              <div>
                <input
                  type="checkbox"
                  name="working_mode"
                  value="Praca zdalna"
                  onChange={handleCheckboxChange}
                  checked={searchParams.working_mode.includes('Praca zdalna')}
                />
                Praca zdalna
              </div>
              <div>
                <input
                  type="checkbox"
                  name="working_mode"
                  value="Praca hybrydowa"
                  onChange={handleCheckboxChange}
                  checked={searchParams.working_mode.includes('Praca hybrydowa')}
                />
                Praca hybrydowa
              </div>
              <div>
                <input
                  type="checkbox"
                  name="working_mode"
                  value="Praca stacjonarna"
                  onChange={handleCheckboxChange}
                  checked={searchParams.working_mode.includes('Praca stacjonarna')}
                />
                Praca stacjonarna
              </div>
              <div>
                <input
                  type="checkbox"
                  name="working_mode"
                  value="Praca mobilna"
                  onChange={handleCheckboxChange}
                  checked={searchParams.working_mode.includes('Praca mobilna')}
                />
                Praca mobilna
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobSearchForm;