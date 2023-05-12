import { ErrorMessage, useField } from 'formik'

export const SelectField = ({ label, defaultOption, ...props }) => {
  const [field, meta] = useField(props)
  const { value } = field

  return (
    <div className='form-group mb-3'>
      <label htmlFor={field.name} className='mx-2 my-2 text-muted'>{label}</label>
      <select
        className={`form-control rounded-pill border-2 shadow-sm px-4 ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        value={value || ''}
      >
        <option value='' disabled>{defaultOption}</option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        </select>
      <ErrorMessage component='div' name={field.name} className='error mt-2 text-danger' />
    </div>
  )
}