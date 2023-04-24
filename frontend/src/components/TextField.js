import { ErrorMessage, useField } from 'formik';

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="form-group mb-3">
      <label htmlFor={field.name} className='mx-2 my-2 text-muted'>{label}</label>
      <input
        className={`form-control rounded-pill border-2 shadow-sm px-4 ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="error mt-2 text-danger" />
    </div>
  )
}