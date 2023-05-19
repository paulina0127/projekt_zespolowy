import { Formik, Form, Field, FieldArray } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { parseISO, subDays } from 'date-fns';
import { validateExperience } from '../../validators/validators';
import {
  createExperience,
  updateExperience,
} from '../../actions/candidateActions';
import { TextField, MyDatePicker, SelectField } from '../formHelpers';
import { HiOutlineTrash } from 'react-icons/hi';
import { MdOutlineAdd } from 'react-icons/md';
import styles from '../company/CreateOfferForm.module.css';

const ExperienceForm = ({ type, experience, handleCloseModal }) => {
  const files = useSelector((state) => state.userProfileDetails.filesList);
  const profile = useSelector((state) => state.auth.user?.profile?.id);

  const dispatch = useDispatch();
  const initialValues =
    type === 'create'
      ? {
          position: '',
          company: '',
          location: {
            street_address: '',
            postal_code: '',
            city: '',
          },
          start_date: '',
          end_date: '',
          duties: [],
          is_current: '',
          references: '',
        }
      : type === 'update'
      ? {
          position: experience.position,
          company: experience.company,
          location:
            experience.location !== null
              ? {
                  street_address: experience.location.street_address,
                  postal_code: experience.location.postal_code,
                  city: experience.location.city,
                }
              : {
                  street_address: '',
                  postal_code: '',
                  city: '',
                },
          start_date: parseISO(experience.start_date),
          end_date:
            experience.end_date !== null ? parseISO(experience.end_date) : '',
          duties: experience.duties,
          is_current: experience.is_current.toString(),
          references:
            experience.references !== null ? experience.references : '',
        }
      : null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateExperience}
      onSubmit={(values) => {
        if (!values.end_date) {
          values.is_current = 'true';
        } else {
          values.is_current = 'false';
        }
        if (type === 'update') {
          dispatch(updateExperience(profile, experience.id, values));
        } else if (type === 'create') {
          dispatch(createExperience(profile, values));
        }
        handleCloseModal();
      }}
    >
      {() => (
        <Form>
          <Row>
            <Col>
              <TextField name='position' type='text' label='Stanowisko*' />
            </Col>
            <Col>
              <TextField name='company' type='text' label='Nazwa firmy*' />
            </Col>
          </Row>
          <Row>
            <Col>
              <MyDatePicker
                label='Data rozpoczęcia pracy*'
                name='start_date'
                maxDate={subDays(new Date(), 1)}
              />
            </Col>
            <Col>
              <MyDatePicker
                label='Data zakończenia pracy'
                name='end_date'
                maxDate={subDays(new Date(), 1)}
              />
            </Col>
          </Row>

          <Row>
            <SelectField
              label='Referencje'
              name='references'
              options={
                files && files.results
                  ? files.results.map((file) => ({
                      label: file.name,
                      value: String(file.id),
                    }))
                  : []
              }
              defaultOption='Wybierz referencję'
              value={type === 'update' ? experience.references : ''}
            />
          </Row>

          <FieldArray name='duties'>
            {({ push, remove, form }) => {
              const { values } = form;
              const { duties } = values;
              return (
                <>
                  <div className='d-flex align-items-center mt-3'>
                    <span className='mb-0 text-muted'>Obowiązki</span>
                    <button
                      type='button'
                      className={`btn btn-success rounded-circle ${styles.addBtn}`}
                      onClick={() => push('')}
                    >
                      <MdOutlineAdd />
                    </button>
                  </div>
                  {duties.map((duty, index) => (
                    <div key={index} className='d-flex align-items-center my-2'>
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
          <Row>
            <p className='text-secondary mb-2 mt-4'>
              Wypełnij wszystkie pola poniżej, aby lokalizacja została dodana:
            </p>
            <Col>
              <TextField
                label='Ulica'
                name='location.street_address'
                type='text'
              />
            </Col>
            <Col>
              <TextField
                label='Kod pocztowy'
                name='location.postal_code'
                type='text'
              />
            </Col>
            <Col>
              <TextField label='Miasto' name='location.city' type='text' />
            </Col>
          </Row>
          <hr className='text-secondary' />
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              className='btn btn-outline-warning rounded-pill fw-bold shadow-sm mx-2 px-5'
              onClick={handleCloseModal}
            >
              Wróć
            </button>
            <button
              type='submit'
              className='btn btn-warning rounded-pill fw-bold shadow-sm px-5'
            >
              {type === 'create' ? 'Dodaj' : 'Zapisz'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ExperienceForm;
