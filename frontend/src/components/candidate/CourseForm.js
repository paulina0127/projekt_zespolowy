import { Formik, Form, Field, FieldArray } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { parseISO, subDays } from 'date-fns'
import { validateCourse } from '../../validators/validators'
import { createCourse, updateCourse } from '../../actions/candidateActions'
import { TextField, MyDatePicker, SelectField, TextArea } from '../formHelpers'

const CourseForm = ({ type, course, label, handleCloseModal }) => {
  const files = useSelector((state) => state.userProfileDetails.filesList)
  const profile = useSelector((state) => state.auth.user.profile.id)

  const dispatch = useDispatch()
  const initialValues = type === 'create' ? {
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    certificate: ''
  }
  : type === 'update' ? {
    name: course.name,
    description: course.description,
    start_date: parseISO(course.start_date),
    end_date: parseISO(course.end_date),
    certificate: course.certificate,
  } : null

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateCourse}
      onSubmit={(values) => {
        if (type === 'update') {
          dispatch(updateCourse(profile, course.id, values))
        } else if (type === 'create') {
          dispatch(createCourse(profile, values))
        }
        handleCloseModal()
      }}
    >
      {({ values }) => (
      <Form>
        <Row>
          <Col>
            <TextField name='name' type='text' label='Nazwa*' />
          </Col>
          <Col>
            <SelectField
              label='Certyfikat'
              name='certificate'
              options={files && files.results ? files.results.map((file) => ({
                label: file.name,
                value: String(file.id),
              })) : []}
              defaultOption='Wybierz certyfikat'
              value={type === 'update' ? course.certificate : ''}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <MyDatePicker label='Data rozpoczęcia kursu*' name='start_date' maxDate={subDays(new Date(), 1)}/>
          </Col>
          <Col>
            <MyDatePicker label='Data zakończenia kursu*' name='end_date' maxDate={subDays(new Date(), 1)}/>
          </Col>
        </Row>
          <TextArea name='description' type='text' label='Opis kursu'/>
        <Row>
          
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

export default CourseForm