import { Formik, Form, Field, FieldArray } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { parseISO } from 'date-fns'
import { validateExperience } from '../../validators/validators'
import { createExperience, updateExperience } from '../../actions/candidateActions'
import { TextField, MyDatePicker } from '../formHelpers'
import { HiOutlineTrash } from 'react-icons/hi'
import { MdOutlineAdd } from 'react-icons/md'
import styles from '../company/CreateOfferForm.module.css'

const ExperienceForm = ({ type, experience, label, handleCloseModal }) => {

  const files = useSelector((state) => state.userProfileDetails.filesList)
  const profile = useSelector((state) => state.auth.user.profile.id)

  const dispatch = useDispatch()
  const initialValues = type === 'create' ? {
    position: '',
    company: '',
    location: {
      street_address: '',
      postal_code: '',
      city: ''
    },
    start_date: new Date(),
    end_date: '',
    duties: [],
    is_current: 'false',
    references: ''
  }
  : type === 'update' ? {
    position: experience.position,
    company: experience.company,
    location: experience.location !== null
      ? {
          street_address: experience.location.street_address,
          postal_code: experience.location.postal_code,
          city: experience.location.city
        }
      : {
          street_address: '',
          postal_code: '',
          city: ''
        },
    start_date: parseISO(experience.start_date),
    end_date: experience.end_date !== null ? parseISO(experience.end_date) : '',
    duties: experience.duties,
    is_current: experience.is_current.toString(),
    references: experience.references
  } : null


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateExperience}
      onSubmit={(values) => {
        if (type === 'update') {
          dispatch(updateExperience(profile, experience.id, values))
        } else {
          dispatch(createExperience(profile, values))
        }
        handleCloseModal()
      }}
    >
      {({ values }) => (
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
            <MyDatePicker label='Data rozpoczęcia pracy*' name='start_date' maxDate={new Date()}/>
          </Col>
          <Col>
            <MyDatePicker label='Data zakończenia pracy' name='end_date' maxDate={new Date()}/>
          </Col>
        </Row>
        <hr className='text-secondary' />
        <Row>
          <p className="text-secondary mb-2">Wypełnij wszystkie pola poniżej, aby lokalizacja została dodana:</p>
          <Col>
          <TextField label='Ulica' name='location.street_address' type='text' />
          </Col>
          <Col>
          <TextField label='Kod pocztowy' name='location.postal_code' type='text' />
          </Col>
          <Col>
          <TextField label='Miasto' name='location.city' type='text' />
          </Col>
        </Row>
        <hr className='text-secondary' />
        <div className="d-flex align-items-center mb-3">
          <div className="text-muted mr-3">Czy to aktualna praca?</div>
          <div className="form-check form-check-inline mt-2">
            <label className="form-check-label d-flex align-items-center">
              <Field className="form-check-input ms-2" type="radio" name="is_current" value="true" checked={values.is_current === 'true'} />
              &nbsp;&nbsp;Tak
            </label>
          </div>
          <div className="form-check form-check-inline mt-2">
            <label className="form-check-label d-flex align-items-center">
              <Field className="form-check-input" type="radio" name="is_current" value="false" checked={values.is_current === 'false'} />
              &nbsp;&nbsp;Nie
            </label>
          </div>
        </div>

        <div className="d-flex align-items-center mb-3">
          <label htmlFor="references" className="text-muted mr-2">Referencje:</label>
          <div className="flex-grow-1">
            <Field as="select" name="references" className="form-select rounded-pill ms-2 w-80">
              <option value="">Wybierz referencje</option>
              {files && files.results && files.results.map((file, index) => (
                <option key={file.id} value={String(file.id)}>{file.name}</option>
              ))}
            </Field>
          </div>
        </div>

        <FieldArray name='duties'>
          {({ push, remove, form }) => {
            const { values } = form
            const { duties } = values
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
            )
          }}
        </FieldArray>
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
            {label}
          </button>
        </div>
      </Form>
    )}
    </Formik>
  )
}

export default ExperienceForm

