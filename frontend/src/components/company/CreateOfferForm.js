import { Formik, Form, Field, FieldArray } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { listCategories } from '../../actions/categoryActions';
import { listSkills } from '../../actions/skillActions';
import { createOffer } from '../../actions/offerActions';
import { validateOffer } from '../../validators/validators';
import { CATEGORY_LIST_CLEAR } from '../../constants/categoryConst';
import { SKILL_LIST_CLEAR } from '../../constants/skillConst';
import { addDays } from 'date-fns';
import { HiOutlineTrash } from 'react-icons/hi';
import { MdOutlineAdd, MdCheck } from 'react-icons/md';
import {
  TextField,
  SelectField,
  CategorySelect,
  CheckboxGroup,
  MyDatePicker,
} from '../formHelpers';
import { Message, Loader } from '../basics';
import styles from './CreateOfferForm.module.css';

const CreateOfferForm = () => {
  const categories = useSelector((state) => state.categoryList.categories);
  const skills = useSelector((state) => state.skillsList.skills);
  const { success, error, loading } = useSelector((state) => state.offerCreate);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
    dispatch(listSkills());
    return () => {
      dispatch({ type: CATEGORY_LIST_CLEAR });
      dispatch({ type: SKILL_LIST_CLEAR });
    };
  }, []);

  const minDate = addDays(new Date(), 1);

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
    duties: [],
    advantages: [],
    requirements: [],
    expiration_date: new Date(),
  };

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
          dispatch(createOffer(values));
          // resetForm()
        }}
      >
        {() => (
          <Form>
            <div className='container'>
              <Row className='mt-4 justify-content-around'>
                <Col md={3}>
                  <TextField label='Stanowisko' name='position' type='text' />
                </Col>
                <Col md={3}>
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
                </Col>
                <Col md={3}>
                  <TextField label='Wynagrodzenie' name='salary' type='text' />
                </Col>
                <Col md={3}>
                  <MyDatePicker
                    label='Data wygaśnięcia'
                    name='expiration_date'
                    minDate={minDate}
                  />
                </Col>
              </Row>

              <Row className='mt-4 justify-content-around'>
                <Col md={3}>
                  <TextField
                    label='Ulica (nazwa i numer)'
                    name='location.street_address'
                    type='text'
                  />
                </Col>
                <Col md={3}>
                  <TextField
                    label='Kod pocztowy'
                    name='location.postal_code'
                    type='text'
                  />
                </Col>
                <Col md={3}>
                  <TextField label='Miasto' name='location.city' type='text' />
                </Col>
                <Col md={3}>
                  <CategorySelect
                    categoryLabel='Kategoria'
                    name='category'
                    categories={categories}
                  />
                </Col>
              </Row>

              <Row className='mt-4 justify-content-around'>
                <Col md={3}>
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
                </Col>
                <Col md={3}>
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
                </Col>
                <Col md={3}>
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
                </Col>
              </Row>
              <Row className='mt-5 justify-content-around'>
                <Col md={6}>
                  <FieldArray name='duties'>
                    {({ push, remove, form }) => {
                      const { values } = form;
                      const { duties } = values;
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
                      );
                    }}
                  </FieldArray>
                </Col>
                <Col md={6}>
                  <FieldArray name='advantages'>
                    {({ push, remove, form }) => {
                      const { values } = form;
                      const { advantages } = values;
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
                      );
                    }}
                  </FieldArray>
                </Col>
              </Row>
              <Row className='mt-4 justify-content-around'>
                <Col md={12}>
                  <FieldArray name='requirements'>
                    {({ push, remove, form }) => {
                      const { values } = form;
                      const { requirements } = values;
                      return (
                        <>
                          <div className='d-flex align-items-center'>
                            <h5 className='mb-0'>Wymagania</h5>
                            <button
                              type='button'
                              className={`btn btn-success rounded-circle ${styles.addBtn}`}
                              onClick={() =>
                                push({
                                  name: '',
                                  type: '',
                                  level: '',
                                  skill: '',
                                })
                              }
                            >
                              <MdOutlineAdd />
                            </button>
                          </div>
                          {requirements.map((requirement, index) => (
                            <div
                              key={index}
                              className='d-flex gap-4 align-items-center my-2'
                            >
                              <Col>
                                <SelectField
                                  label='Rodzaj'
                                  name={`requirements[${index}].type`}
                                  options={[
                                    { label: 'Język', value: 'Język' },
                                    {
                                      label: 'Umiejętność twarda',
                                      value: 'Umiejętność twarda',
                                    },
                                    {
                                      label: 'Umiejętność miękka',
                                      value: 'Umiejętność miękka',
                                    },
                                    { label: 'Inny', value: 'Inny' },
                                  ]}
                                  defaultOption='Wybierz rodzaj umiejętności'
                                  value=''
                                />
                              </Col>
                              <Col>
                                <TextField
                                  label='Nazwa'
                                  name={`requirements[${index}].name`}
                                  type='text'
                                  disabled={
                                    requirement.skill !== null &&
                                    requirement.skill !== ''
                                  }
                                />
                              </Col>
                              <Col>
                                <TextField
                                  label='Poziom'
                                  name={`requirements[${index}].level`}
                                  type='text'
                                />
                              </Col>
                              <Col>
                                <SelectField
                                  label='Gotowa umiejętność'
                                  name={`requirements[${index}].skill`}
                                  disabled={requirement.name !== ''}
                                  defaultOption='Wybierz umiejętność'
                                  options={
                                    skills
                                      ? skills
                                          .filter(
                                            (skill) =>
                                              skill.type === requirement.type
                                          )
                                          .map((skill) => ({
                                            label: skill.name,
                                            value: String(skill.id),
                                          }))
                                      : []
                                  }
                                />
                              </Col>
                              <Col>
                                <button
                                  type='button'
                                  className={`btn btn-danger rounded-circle ${styles.deleteBtn}`}
                                  onClick={() => remove(index)}
                                >
                                  <HiOutlineTrash />
                                </button>
                              </Col>
                            </div>
                          ))}
                        </>
                      );
                    }}
                  </FieldArray>
                </Col>
              </Row>
              <div className='d-flex justify-content-center'>
                <button type='submit' className={styles['yellow-lg-btn']}>
                  <MdCheck />
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateOfferForm;
