import { ErrorMessage, useField, Field } from 'formik'

export const CheckboxGroup = ({ label, name, options, ...props }) => {
  const [field, meta] = useField({ name, ...props })

  return (
    <div className='form-group mb-3'>
      <label htmlFor={props.id || props.name} className='mx-2 my-3 text-muted fs-5'>
        {label}
      </label>
      <div className='checkbox-group row'>
        <ErrorMessage
          name={field.name}
          component='div'
          className='error my-3 text-danger fw-bold'
        />
        {options.map((option) => (
          <label key={option.value} className='checkbox-label mb-2'>
            <Field type='checkbox' name={name} value={option.value} className='mx-2'/>
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}
