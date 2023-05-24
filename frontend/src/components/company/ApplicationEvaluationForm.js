import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { Row } from 'react-bootstrap'
import { updateApplication } from '../../actions/applicationActions'
import { TextArea } from '../formHelpers'
import styles from './ApplicationEvaluationForm.module.css'
import styles2 from '../../screens/MainPanelScreen.module.css'

const ApplicationEvaluationForm = ({ application }) => {
  const dispatch = useDispatch()

  const initialValues = {
    notes: application.notes,
    mark: application.mark,
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        dispatch(updateApplication(application.id, values))
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Row>
            <h5 className={styles2['panel-h5']}>Ocena kompetencji</h5>
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
          <Row>
            <h5 className={styles2['panel-h5']}>Notatki</h5>
            <TextArea name='notes' as='textarea' />
          </Row>
          <div className='d-flex justify-content-center'>
            <button
              type='submit'
              className={`btn rounded-pill px-4 ${styles.saveBtn}`}
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
