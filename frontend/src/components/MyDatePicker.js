import DatePicker from 'react-datepicker'
import { ErrorMessage, useField } from 'formik'
import 'react-datepicker/dist/react-datepicker.css'

const MyDatePicker = ({ label, name = '', minDate, maxDate }) => {
  const [field, meta, helpers] = useField(name)

  const { value } = meta
  const { setValue } = helpers

  return (
    <div className='form-group mb-3'>
      <label htmlFor={field.name} className='mx-2 my-2 text-muted'>{label}</label>
      <DatePicker
        className={`form-control rounded-pill border-2 shadow-sm px-4 ${meta.touched && meta.error && 'is-invalid'}`}
        {...field}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat='dd/MM/yyyy'
        selected={value}
        onChange={(date) => setValue(date)}
      />
      <ErrorMessage component='div' name={field.name} className='error mt-2 text-danger' />
    </div>
  )
}
export default MyDatePicker
