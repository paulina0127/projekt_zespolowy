import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { validateSkill } from '../../validators/validators';
import { updateApplication } from '../../actions/applicationActions';
import { TextArea } from '../formHelpers';
import styles from './ApplicationEvaluationForm.module.css'

const ApplicationEvaluationForm = ({ handleCloseModal, application }) => {
  const dispatch = useDispatch()

  const initialValues = {
    notes: application.notes,
    mark: application.mark,
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values)
        dispatch(updateApplication(application.id, values))
        handleCloseModal()
      }}
    >
      {({values, setFieldValue}) => (
        <Form>
          <Row>
            <TextArea
              label='Notatki'
              name='notes'
              as='textarea'
            />
          </Row>
          <Row>
            <span className='my-2 mx-2 text-muted'>Ocena</span>
            <div className='d-flex justify-content-center'>
              <div className={styles['star-rating']}>
                <input
                  id='star-5'
                  type='radio'
                  name='mark'
                  value={5}
                  checked={values.mark === 5}
                  onChange={() => setFieldValue('mark', 5)}
                />
                <label htmlFor='star-5' title='5 stars'>
                  <i className='active fa fa-star' aria-hidden='true'></i>
                </label>
                <input
                  id='star-4'
                  type='radio'
                  name='mark'
                  value={4}
                  checked={values.mark === 4}
                  onChange={() => setFieldValue('mark', 4)}
                />
                <label htmlFor='star-4' title='4 stars'>
                  <i className='active fa fa-star' aria-hidden='true'></i>
                </label>
                <input
                  id='star-3'
                  type='radio'
                  name='mark'
                  value={3}
                  checked={values.mark === 3}
                  onChange={() => setFieldValue('mark', 3)}
                />
                <label htmlFor='star-3' title='3 stars'>
                  <i className='active fa fa-star' aria-hidden='true'></i>
                </label>
                <input
                  id='star-2'
                  type='radio'
                  name='mark'
                  value={2}
                  checked={values.mark === 2}
                  onChange={() => setFieldValue('mark', 2)}
                />
                <label htmlFor='star-2' title='2 stars'>
                  <i className='active fa fa-star' aria-hidden='true'></i>
                </label>
                <input
                  id='star-1'
                  type='radio'
                  name='mark'
                  value={1}
                  checked={values.mark === 1}
                  onChange={() => setFieldValue('mark', 1)}
                />
                <label htmlFor='star-1' title='1 star'>
                  <i className='active fa fa-star' aria-hidden='true'></i>
                </label>
              </div>
            </div>
          </Row>
          <hr className='text-secondary' />
          <div className='d-flex justify-content-center'>
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
              Zapisz
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default ApplicationEvaluationForm