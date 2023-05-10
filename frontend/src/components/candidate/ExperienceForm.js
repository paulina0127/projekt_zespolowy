import { Formik, Form, Field, FieldArray } from 'formik'
import { useSelector } from 'react-redux'
import { validateExperience } from '../../validators/validators'
import { TextField, MyDatePicker } from '../formHelpers'
import { HiOutlineTrash } from 'react-icons/hi'
import { MdOutlineAdd } from 'react-icons/md'
import styles from '../company/CreateOfferForm.module.css'

const ExperienceForm = ({ type, experience, label }) => {

  const files = useSelector((state) => state.userProfileDetails.files)

  const initialValues = type === 'create' ? {
    position: '',
    company: '',
    location: {
      street_address: '',
      postal_code: '',
      city: ''
    },
    start_date: new Date(),
    end_date: '',
    duties: [],
    is_current: '',
    references: ''
  }
  : type === 'update' ? {
    position: experience.position,
    company: experience.company,
    location: {
      street_address: experience.location.street_address,
      postal_code: experience.location.postal_code,
      city: experience.location.city
    },
    start_date: experience.start_date,
    end_date: experience.end_date,
    duties: experience.duties,
    is_current: experience.is_current,
    references: experience.references
  } : null

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateExperience}
      onSubmit={(values) => {
        console.log(values);
        // if (profileExist) {
        //   const updatedValues = {};
        //   for (const key in values) {
        //     if (values[key] !== initialValues[key]) {
        //       updatedValues[key] = values[key];
        //     }
        //   }
        //   dispatch(updateUserProfile(userProfile, 'Kandydat', updatedValues))
        // } else {
        //   dispatch(createUserProfile('Kandydat', values))
        // }
      }}
    >
      {({ values }) => (
      <Form>
        <TextField name='position' type='text' label='Stanowisko*' />
        <TextField name='company' type='text' label='Nazwa firmy*' />
        <TextField label='Ulica (nazwa i numer)' name='location.street_address' type='text' />
        <TextField label='Kod pocztowy' name='location.postal_code' type='text' />
        <TextField label='Miasto' name='location.city' type='text' />
        <MyDatePicker label='Data rozpoczęcia pracy*' name='start_date' maxDate={new Date()}/>
        <MyDatePicker label='Data zakończenia pracy' name='end_date' maxDate={new Date()}/>
        <FieldArray name='duties'>
          {({ push, remove, form }) => {
            const { values } = form
            const { duties } = values
            return (
              <>
                <div className='d-flex align-items-center'>
                  <h5 className='mb-0'>Obowiązki</h5>
                  <button
                    type='button'
                    className={`btn btn-success rounded-circle ${styles.addBtn}`}
                    onClick={() => push('')}
                  >
                    <MdOutlineAdd />
                  </button>
                </div>
                {duties.map((duty, index) => (
                  <div key={index} className='d-flex align-items-center my-2'>
                    <Field
                      name={`duties[${index}]`}
                      className='form-control rounded-pill border-2 shadow-sm px-4 mr-3 my-1'
                    />
                    <button
                      type='button'
                      className={`btn btn-danger rounded-circle ${styles.deleteBtn}`}
                      onClick={() => remove(index)}
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                ))}
              </>
            )
          }}
        </FieldArray>
        <h5>Referencje: </h5>
        {/* select */}
        <button
          type='submit'
          className='btn btn-warning rounded-pill fw-bold shadow-sm '
        >
          {label}
        </button>
      </Form>
    )}
    </Formik>
  )
}

export default ExperienceForm