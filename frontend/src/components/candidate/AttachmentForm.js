import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { validateFile } from '../../validators/validators';
import { TextField, FileField, SelectField } from '../formHelpers';
import { createFile, updateFile } from '../../actions/candidateActions';

const AttachmentForm = ({ type, file, label, handleCloseModal, profile }) => {
  const dispatch = useDispatch()

  const initialValues = type === 'create' ? {
    name: '',
    type: '',
    path: ''
  }
  : type === 'update' ? {
    name: file.name,
    type: file.type,
    path: file.path
  } : null

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateFile}
      onSubmit={(values) => {
        if (type === 'create') {
          dispatch(createFile(profile, values));
        } else if (type === 'update') {
          dispatch(updateFile(profile, file.id, values));
        }
      }}
    >
      {({ values }) => (
        <Form id='form'>
          <TextField label='Nazwa' name='name' type='text' />
          <SelectField
            label='Rodzaj pliku*'
            name='type'
            options={[
              { label: 'CV', value: 'CV' },
              { label: 'Certyfikat', value: 'Certyfikat' },
              { label: 'Referencje', value: 'Referencje' },
              { label: 'Dyplom', value: 'Dyplom' },
              { label: 'List motywacyjny', value: 'List motywacyjny' },
              { label: 'Inny', value: 'Inny' },
            ]}
            defaultOption='Wybierz rodzaj pliku'
          />
          <FileField
            name='path'
            type='file'
            accept='.pdf, .doc, .docx, .jpg, .png'
            hidden={false}
          />
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

export default AttachmentForm