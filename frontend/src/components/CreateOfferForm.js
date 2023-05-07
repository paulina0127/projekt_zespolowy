import { Formik, Form, Field } from 'formik'
import { string, ref, object } from 'yup'

import { TextField } from './TextField'
import MyDatePicker from './MyDatePicker'

import styles from '../screens/MainPanelScreen.module.css'

const CreateOfferForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          position: '',
          position_level: '',
          location: {
            street_address: '',
            postal_code: '',
            city: '',
          },
          category: '',
          salary: '',
          contract_type: [],
          working_mode: [],
          working_time: [],
          duties: [],
          advantages: [],
          requirements: [],
          // created_date: new Date(),
          expiration_date: new Date(),
          company: {},
        }}
        onSubmit={(values) => {}}
      >
        {({ values }) => (
          <Form>
            <TextField label='Stanowisko' name='position' type='text' />
            {/* position_level - select */}
            <TextField
              label='Ulica (nazwa i numer)'
              name='location.street_address'
              type='text'
            />
            <TextField
              label='Kod pocztowy'
              name='location.postal_code'
              type='text'
            />
            <TextField label='Miasto' name='location.city' type='text' />
            {/* category - select */}
            <TextField label='Wynagrodzenie' name='salary' type='text' />
            <div className='row mt-4'>
              <div className='col-md-4'>
                <h5>Wymiar etatu</h5>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='working_time'
                    value='Pełny etat'
                  />
                  Pełny etat
                </label>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='working_time'
                    value='Część etatu'
                  />
                  Część etatu
                </label>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='working_time'
                    value='Praca dodatkowa / tymczasowa'
                  />
                  Praca dodatkowa / tymczasowa
                </label>
              </div>
              <div className='col-md-4'>
                <h5>Rodzaj umowy</h5>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='contract_type'
                    value='Umowa o pracę'
                  />
                  Umowa o pracę
                </label>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='contract_type'
                    value='Umowa zlecenie'
                  />
                  Umowa zlecenie
                </label>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='contract_type'
                    value='Umowa o dzieło'
                  />
                  Umowa o dzieło
                </label>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='contract_type'
                    value='Umowa o pracę tymczasową'
                  />
                  Umowa o pracę tymczasową
                </label>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='contract_type'
                    value='Umowa na zastępstwo'
                  />
                  Umowa na zastępstwo
                </label>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='contract_type'
                    value='Umowa agencyjna'
                  />
                  Umowa agencyjna
                </label>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='contract_type'
                    value='Kontrakt B2B'
                  />
                  Kontrakt B2B
                </label>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='contract_type'
                    value='Staż / Praktyka'
                  />
                  Staż / Praktyka
                </label>
              </div>
              <div className='col-md-4'>
                <h5>Tryb pracy</h5>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='working_time'
                    value='Praca zdalna'
                  />
                  Praca zdalna
                </label>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='working_time'
                    value='Praca hybrydowa'
                  />
                  Praca hybrydowa
                </label>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='working_time'
                    value='Praca stacjonarna'
                  />
                  Praca stacjonarna
                </label>
                <label className='mb-3'>
                  <Field
                    type='checkbox'
                    name='working_time'
                    value='Praca mobilna'
                  />
                  Praca mobilna
                </label>
              </div>
            </div>
            <div className='form-group mb-3'>
              <label htmlFor='expiration_date' className='mx-2 my-2 text-muted'>
                Data wygaśnięcia
              </label>
              <MyDatePicker name='expiration_date' minDate={new Date()} />
            </div>
            <button
              type='submit'
              className='btn btn-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm w-100'
            >
              Dodaj ofertę
            </button>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default CreateOfferForm
