import { ErrorMessage, useField } from 'formik'
import { Fragment } from 'react'

export const CategorySelect = ({ categoryLabel, ...props }) => {
  const [field, meta] = useField(props)
  const isEmpty = !field.value || field.value === ''
  
  return (
    <div className='form-group mb-3'>
      <label htmlFor={field.name} className='mx-2 my-2 text-muted'>{categoryLabel}</label>
      <select
        className={`form-control rounded-pill border-2 shadow-sm px-4 ${meta.touched && meta.error && 'is-invalid'}`}
        {...field} {...props}
        autoComplete='off'
      >
        <option value='' disabled={true}>{isEmpty ? 'Wybierz kategorię' : null}</option>
        {props.categories.map(category => (
          <Fragment key={category.id}>
            <option value={category.id}>{category.name}</option>
            {category.subcategories && category.subcategories.map(subcategory => (
              <Fragment key={subcategory.id}>
                <option value={subcategory.id}>&nbsp;&nbsp;&nbsp; -- {subcategory.name}</option>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </select>
      <ErrorMessage component='div' name={field.name} className='error mt-2 text-danger' />
    </div>
  )
}