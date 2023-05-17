import { Formik, Form, Field, FieldArray } from 'formik'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listCategories } from '../../actions/categoryActions'
import { createOffer } from '../../actions/offerActions'
import { validateOffer } from '../../validators/validators'
import { CATEGORY_LIST_CLEAR } from '../../constants/categoryConst'
import { addDays } from 'date-fns'
import { HiOutlineTrash } from 'react-icons/hi'
import { MdOutlineAdd } from 'react-icons/md'
import {
  TextField,
  SelectField,
  CategorySelect,
  CheckboxGroup,
  MyDatePicker,
} from '../formHelpers'
import { Message, Loader } from '../basics'
import styles from './CreateOfferForm.module.css'

const CreateOfferForm = () => {
  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  const newOffer = useSelector((state) => state.offerCreate)
  const { success, error, loading } = newOffer

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listCategories())
    return () => {
      dispatch({ type: CATEGORY_LIST_CLEAR })
    }
  }, [])

  const minDate = addDays(new Date(), 1)

  const initialValues = {
    position: '',
    position_level: '',
    location: {
      street_address: '',
      postal_code: '',
      city: '',
    },
    category: '',
    salary: '',
    contract_type: [],
    working_mode: [],
    working_time: [],
    duties: [''],
    advantages: [''],
    // requirements: [],
    expiration_date: new Date(),
  }

  return (
    <>
      {loading && <Loader />}
      {success && (
        <Message variant='success'>
          Nowa oferta została dodana i oczekuje na weryfikację. Możesz dodać
          kolejną ofertę pracy.
        </Message>
      )}
      {error && <Message variant='danger'>{error}</Message>}
      <Formik
        initialValues={initialValues}
        validationSchema={validateOffer}
        onSubmit={(values, { resetForm }) => {
          dispatch(createOffer(values))
          resetForm()
        }}
      >
        {({ values }) => (
          <Form>
            <div className='container'>
              <div className='row mt-4 justify-content-around'>
                <div className='col-md-3'>
                  <TextField label='Stanowisko' name='position' type='text' />
                </div>
                <div className='col-md-3 '>
                  <SelectField
                    label='Poziom stanowiska'
                    name='position_level'
                    options={[
                      {
                        label: 'Praktykant / Stażysta',
                        value: 'Praktykant / Stażysta',
                      },
                      { label: 'Asystent', value: 'Asystent' },
                      {
                        label: 'Młodszy specjalista (Junior)',
                        value: 'Młodszy specjalista (Junior)',
                      },
                      {
                        label: 'Specjalista (Mid / Regular)',
                        value: 'Specjalista (Mid / Regular)',
                      },
                      {
                        label: 'Starszy specjalista (Senior)',
                        value: 'Starszy specjalista (Senior)',
                      },
                      { label: 'Ekspert / Lider', value: 'Ekspert / Lider' },
                      { label: 'Kierownik', value: 'Kierownik' },
                      { label: 'Menedżer', value: 'Menedżer' },
                      {
                        label: 'Dyrektor / Prezes',
                        value: 'Dyrektor / Prezes',
                      },
                      {
                        label: 'Pracownik fizyczny',
                        value: 'Pracownik fizyczny',
                      },
                    ]}
                    defaultOption='Wybierz poziom stanowiska'
                  />
                </div>
                <div className='col-md-3'>
                  <TextField label='Wynagrodzenie' name='salary' type='text' />
                </div>
              </div>

              <div className='row mt-4 justify-content-around'>
                <div className='col-md-3'>
                  <TextField
                    label='Ulica (nazwa i numer)'
                    name='location.street_address'
                    type='text'
                  />
                </div>
                <div className='col-md-3'>
                  <TextField
                    label='Kod pocztowy'
                    name='location.postal_code'
                    type='text'
                  />
                </div>
                <div className='col-md-3'>
                  <TextField label='Miasto' name='location.city' type='text' />
                </div>
              </div>

              <div className='row mt-4 justify-content-around'>
                <div className='col-md-3'>
                  <CheckboxGroup
                    label='Wymiar etatu'
                    name='working_time'
                    options={[
                      { value: 'Pełny etat', label: 'Pełny etat' },
                      { value: 'Część etatu', label: 'Część etatu' },
                      {
                        value: 'Praca dodatkowa / tymczasowa',
                        label: 'Praca dodatkowa / tymczasowa',
                      },
                    ]}
                  />
                </div>
                <div className='col-md-3'>
                  <CheckboxGroup
                    label='Tryb pracy'
                    name='working_mode'
                    options={[
                      { value: 'Praca zdalna', label: 'Praca zdalna' },
                      { value: 'Praca hybrydowa', label: 'Praca hybrydowa' },
                      {
                        value: 'Praca stacjonarna',
                        label: 'Praca stacjonarna',
                      },
                      { value: 'Praca mobilna', label: 'Praca mobilna' },
                    ]}
                  />
                </div>
                <div className='col-md-3'>
                  <CheckboxGroup
                    label='Rodzaj umowy'
                    name='contract_type'
                    options={[
                      { value: 'Umowa o pracę', label: 'Umowa o pracę' },
                      { value: 'Umowa zlecenie', label: 'Umowa zlecenie' },
                      { value: 'Umowa o dzieło', label: 'Umowa o dzieło' },
                      {
                        value: 'Umowa o pracę tymczasową',
                        label: 'Umowa o pracę tymczasową',
                      },
                      {
                        value: 'Umowa na zastępstwo',
                        label: 'Umowa na zastępstwo',
                      },
                      { value: 'Umowa agencyjna', label: 'Umowa agencyjna' },
                      { value: 'Kontrakt B2B', label: 'Kontrakt B2B' },
                      { value: 'Staż / Praktyka', label: 'Staż / Praktyka' },
                    ]}
                  />
                </div>
              </div>
              <div className='row mt-4 justify-content-center'>
                <div className='col-md-3'>
                  <MyDatePicker
                    label='Data wygaśnięcia'
                    name='expiration_date'
                    minDate={minDate}
                  />
                </div>
                <div className='col-md-3'>
                  <CategorySelect
                    categoryLabel='Kategoria'
                    name='category'
                    categories={categories}
                  />
                </div>
              </div>
              <div className='row mt-5 justify-content-around'>
                <div className='col-md-8'>
                  <FieldArray name='duties'>
                    {({ push, remove, form }) => {
                      const { values } = form
                      const { duties } = values
                      return (
                        <>
                          <div className='d-flex align-items-center'>
                            <h5 className='mb-0'>Lista obowiązków</h5>
                            <button
                              type='button'
                              className={`btn btn-success rounded-circle ${styles.addBtn}`}
                              onClick={() => push('')}
                            >
                              <MdOutlineAdd />
                            </button>
                          </div>
                          {duties.map((duty, index) => (
                            <div
                              key={index}
                              className='d-flex align-items-center my-2'
                            >
                              <Field
                                name={`duties[${index}]`}
                                className='form-control rounded-pill border-2 shadow-sm px-4 mr-3 my-1'
                              />
                              <button
                                type='button'
                                className={`btn btn-danger rounded-circle ${styles.deleteBtn}`}
                                onClick={() => remove(index)}
                              >
                                <HiOutlineTrash />
                              </button>
                            </div>
                          ))}
                        </>
                      )
                    }}
                  </FieldArray>
                </div>
              </div>
              <div className='row mt-4 justify-content-around'>
                <div className='col-md-8'>
                  <FieldArray name='advantages'>
                    {({ push, remove, form }) => {
                      const { values } = form
                      const { advantages } = values
                      return (
                        <>
                          <div className='d-flex align-items-center'>
                            <h5 className='mb-0'>Lista zalet</h5>
                            <button
                              type='button'
                              className={`btn btn-success rounded-circle ${styles.addBtn}`}
                              onClick={() => push('')}
                            >
                              <MdOutlineAdd />
                            </button>
                          </div>
                          {advantages.map((advantage, index) => (
                            <div
                              key={index}
                              className='d-flex align-items-center my-2'
                            >
                              <Field
                                name={`advantages[${index}]`}
                                className='form-control rounded-pill border-2 shadow-sm px-4 mr-3 my-1'
                              />
                              <button
                                type='button'
                                className={`btn btn-danger rounded-circle ${styles.deleteBtn}`}
                                onClick={() => remove(index)}
                              >
                                <HiOutlineTrash />
                              </button>
                            </div>
                          ))}
                        </>
                      )
                    }}
                  </FieldArray>
                </div>
              </div>
              <div className='mt-5'>
                <button type='submit' className={styles['yellow-lg-btn']}>
                  Dodaj ofertę
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default CreateOfferForm
