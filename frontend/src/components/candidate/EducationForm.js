import { Formik, Form } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { parseISO, subDays } from 'date-fns'
import { validateEducation } from '../../validators/validators'
import { createEducation, updateEducation } from '../../actions/candidateActions'
import { TextField, MyDatePicker, SelectField } from '../formHelpers'

const EducationForm = ({ type, education, label, handleCloseModal }) => {

  const files = useSelector((state) => state.userProfileDetails.filesList)
  const profile = useSelector((state) => state.auth.user.profile.id)
  const dispatch = useDispatch()

  const initialValues = type === 'create' ? {
    institute: '',
    education_level: '',
    major: '',
    start_date: '',
    end_date: '',
    diploma: '',
    is_current: ''
  }
  : type === 'update' ? {
    institute: education.institute,
    education_level: education.education_level,
    major: education.major,
    start_date: parseISO(education.start_date),
    end_date: education.end_date !== null ? parseISO(education.end_date) : '',
    diploma: education.diploma !== null ? education.diploma : '',
    is_current: education.is_current.toString()
  } : null

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateEducation}
      onSubmit={(values) => {
        if (!values.end_date) {
          values.is_current = 'true'
        } else {
          values.is_current = 'false'
        }

        if (type === 'update') {
          dispatch(updateEducation(profile, education.id, values))
        } else if (type === 'create') {
          dispatch(createEducation(profile, values))
        }
        handleCloseModal()
      }}
    >
      {({ values }) => (
      <Form>
        <Row>
          <TextField name='institute' type='text' label='Uczelnia*' />
        </Row>
        <Row>
         <SelectField
            label='Poziom wykształcenia*'
            name='education_level'
            options={[
              { label: 'Podstawowe', value: 'Podstawowe' },
              { label: 'Zawodowe', value: 'Zawodowe' },
              { label: 'Średnie', value: 'Średnie' },
              { label: 'Licencjat', value: 'Licencjat' },
              { label: 'Inżynier', value: 'Inżynier' },
              { label: 'Magister', value: 'Magister' },
              { label: 'Magister inżynier', value: 'Magister inżynier' },
              { label: 'Doktor', value: 'Doktor' },
              { label: 'Doktor habilitowany', value: 'Doktor habilitowany' },
              { label: 'Profesor', value: 'Profesor' },
              { label: 'Studia podyplomowe', value: 'Studia podyplomowe' },
              { label: 'Lekarz medycyny', value: 'Lekarz medycyny' }
            ]}
            defaultOption='Wybierz poziom wykształcenia'
            value={type === 'update' ? education.education_level : ''}
          />
        </Row>
        <Row>
          <Col>
            <TextField name='major' type='text' label='Kierunek' />
          </Col>
          <Col>
            <SelectField
              label='Dyplom'
              name='diploma'
              options={files && files.results ? files.results.map((file) => ({
                label: file.name,
                value: String(file.id),
              })) : []}
              defaultOption='Wybierz dyplom'
              value={type === 'update' ? education.diploma : ''}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <MyDatePicker label='Data rozpoczęcia*' name='start_date' maxDate={subDays(new Date(), 1)}/>
          </Col>
          <Col>
            <MyDatePicker label='Data zakończenia' name='end_date' maxDate={subDays(new Date(), 1)}/>
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
            {label}
          </button>
        </div>
      </Form>
    )}
    </Formik>
  )
}

export default EducationForm 

