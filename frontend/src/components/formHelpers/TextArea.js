import { Field, ErrorMessage, useField } from 'formik'

export const TextArea = ({label, ...props}) => {
  const [field, meta] = useField(props)
  return (
    <div className='form-group mb-3'>
      <label htmlFor={field.name} className='mx-2 my-2 text-muted'>{label}</label>
      <Field
        as='textarea'
        className={`form-control rounded-pill border-2 shadow-sm px-4 ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
      />
      <ErrorMessage component='div' name={field.name} className='error mt-2 text-danger' />
    </div>
  )
}

