import { Formik, Form } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Row } from 'react-bootstrap'
import { validateLink } from '../../validators/validators'
import { createLink, updateLink } from '../../actions/candidateActions'
import { TextField, SelectField } from '../formHelpers'

const LinkForm = ({ type, link, label, handleCloseModal }) => {
  const profile = useSelector((state) => state.auth.user.profile.id)
  const dispatch = useDispatch()

  const initialValues = type === 'create' ? {
    type: '',
    url: ''
  }
  : type === 'update' ? {
    type: link.type,
    url: link.url
  } : null

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateLink}
      onSubmit={(values) => {
        if (type === 'update') {
          dispatch(updateLink(profile, link.id, values))
        } else if (type === 'create') {
          dispatch(createLink(profile, values))
        }
        handleCloseModal()
      }}
    >
      {({ values }) => (
      <Form>
        <Row>
          <SelectField
            label='Rodzaj*'
            name='type'
            options={[
              { label: 'Portfolio', value: 'Portfolio' },
              { label: 'Strona osobista', value: 'Strona osobista' },
              { label: 'Strona firmowa', value: 'Strona firmowa' },
              { label: 'Projekt', value: 'Projekt' },
              { label: 'Profil społecznościowy', value: 'Profil społecznościowy' },
              { label: 'Inny', value: 'Inny' },
            ]}
            defaultOption='Wybierz rodzaj linku'
            value={type === 'update' ? link.type : ''}
          />
        </Row>
        <Row>
          <TextField 
            name='url' 
            type='text' 
            label='Adres URL*' 
          />
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
export default LinkForm