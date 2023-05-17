import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listCategories } from '../../actions/categoryActions'
import { listFilteredOffers } from '../../actions/offerActions'
import { CATEGORY_LIST_CLEAR } from '../../constants/categoryConst'
import { OFFER_FILTERED_LIST_CLEAR } from '../../constants/offerConst'
import { DropdownButton } from 'react-bootstrap'

import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { SearchInput, CategoryCheckbox } from '../formHelpers'
import AdvancedFilters from './AdvancedFilters'
import styles from './Offer.module.css'

const JobSearchForm = () => {
  const [filters, setFilters] = useState({})
  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(listCategories())
    return () => {
      dispatch({ type: CATEGORY_LIST_CLEAR })
    }
  }, [])

  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const handleFiltersToggle = () => {
    setIsFiltersOpen(!isFiltersOpen)
  }

  const [searchParams, setSearchParams] = useState({
    search: '',
    location: '',
    category: [],
    working_mode: [],
    working_time: [],
    contract_type: [],
  })

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target
    setSearchParams((prevSearchParams) => {
      const newSearchParams = { ...prevSearchParams }
      if (name === 'working_mode') {
        if (checked) {
          newSearchParams.working_mode = [
            ...newSearchParams.working_mode,
            value,
          ]
        } else {
          newSearchParams.working_mode = newSearchParams.working_mode.filter(
            (mode) => mode !== value
          )
        }
      } else if (name === 'contract_type') {
        if (checked) {
          newSearchParams.contract_type = [
            ...newSearchParams.contract_type,
            value,
          ]
        } else {
          newSearchParams.contract_type = newSearchParams.contract_type.filter(
            (type) => type !== value
          )
        }
      } else if (name === 'working_time') {
        if (checked) {
          newSearchParams.working_time = [
            ...newSearchParams.working_time,
            value,
          ]
        } else {
          newSearchParams.working_time = newSearchParams.working_time.filter(
            (time) => time !== value
          )
        }
      } else if (name === 'category') {
        if (checked) {
          newSearchParams.category = [
            ...newSearchParams.category,
            Number(value),
          ]
        } else {
          newSearchParams.category = newSearchParams.category.filter(
            (cat) => cat !== Number(value)
          )
        }
      }

      return newSearchParams
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    if (filters) {
      const filtered = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => {
          if (Array.isArray(value)) {
            return value.length > 0
          } else {
            return value !== ''
          }
        })
      )
      dispatch(listFilteredOffers(filtered))
      const filteredQueryString = new URLSearchParams(filtered).toString()
      navigate(`/oferty/${filteredQueryString}`)
    }

    return () => {
      dispatch({ type: OFFER_FILTERED_LIST_CLEAR })
    }
  }, [filters, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFilters(searchParams)
  }

  return (
    <>
      {Object.keys(categories).length === 0 ? (
        ''
      ) : (
        <div className='container px-4 py-5 bg-white border shadow rounded my-3'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <SearchInput
                placeholder='Stanowisko, firma'
                value={searchParams.search}
                onChange={handleInputChange}
                name='search'
              />
              <SearchInput
                placeholder='Lokalizacja'
                value={searchParams.location}
                onChange={handleInputChange}
                name='location'
              />
              <div className='col-lg-2 col-md-2 p-0 mx-2'>
                <DropdownButton variant='light' title='Wybierz kategorię'>
                  {categories.map((category) => (
                    <CategoryCheckbox
                      key={category.id}
                      category={category}
                      selectedCategories={searchParams.category}
                      setSelectedCategories={handleCheckboxChange}
                    />
                  ))}
                </DropdownButton>
              </div>
              <div className='col-lg-3 col-md-3 col-sm-12 mx-2'>
                <button type='submit' className={styles['yellow-lg-btn']}>
                  Wyszukaj
                </button>
              </div>
              <div className='d-flex justify-content-center'>
                <button
                  type='button'
                  className='btn btn-outline-secondary rounded-pill my-4 col-4'
                  onClick={handleFiltersToggle}
                >
                  Filtrowanie zaawansowane{' '}
                  {isFiltersOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
              </div>
            </div>
            <AdvancedFilters
              searchParams={searchParams}
              onCheckboxChange={handleCheckboxChange}
              isOpen={isFiltersOpen}
            />
          </form>
        </div>
      )}
    </>
  )
}

export default JobSearchForm
