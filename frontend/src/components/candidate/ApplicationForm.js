import { Formik, Form, Field, ErrorMessage } from 'formik';

const ApplicationForm = ({ initialValues, filesList }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form>
          <h4 className='border-bottom my-3'>Załączniki</h4>
          <Field
            as='select'
            name='attachments'
            multiple
            className='form-control rounded-pill border-2 shadow-sm px-4'
          >
            {filesList.results.map((file) => (
              <option key={file.id} value={file.id}>
                {file.name}
              </option>
            ))}
          </Field>
          <ErrorMessage
            component='div'
            name='selectedFiles'
            className='error mt-2 text-danger'
          />
          <button
            type='submit'
            className='btn btn-warning btn-block text-uppercase my-3 rounded-pill shadow-sm w-100'
          >
            Aplikuję
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ApplicationForm;
