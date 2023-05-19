import { Formik, Form } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import { validateSkill} from '../../validators/validators'
import { createSkill, updateSkill } from '../../actions/candidateActions'
import { TextField, SelectField } from '../formHelpers'

const SkillForm = ({ type, skill, handleCloseModal }) => {
  const files = useSelector((state) => state.userProfileDetails.filesList)
  const skills = useSelector((state) => state.skillsList.skills)
  const profile = useSelector((state) => state.auth.user.profile.id)
  const dispatch = useDispatch()

  const initialValues = type === 'create' ? {
    name: '',
    type: '',
    level: '',
    skill: '',
    certificate: '',
  }
  : type === 'update' ? {
    name: skill.name,
    type: skill.type,
    level: skill.level,
    skill: skill.skill,
    certificate: skill.certificate,
  } : null

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateSkill}
      onSubmit={(values) => {
        if (type === 'update') {
          dispatch(updateSkill(profile, skill.id, values))
        } else if (type === 'create') {
          dispatch(createSkill(profile, values))
        }
        handleCloseModal()
      }}
    >
      {({ values }) => (
      <Form>
        <Row>
          <SelectField
            label='Rodzaj'
            name='type'
            options={[
              { label: 'Język', value: 'Język' },
              { label: 'Umiejętność twarda', value: 'Umiejętność twarda' },
              { label: 'Umiejętność miękka', value: 'Umiejętność miękka' },
              { label: 'Inny', value: 'Inny' },
            ]}
            disabled={values.skill !== null && type === 'update'}
            defaultOption='Wybierz rodzaj umiejętności'
            value={type === 'update' ? skill.type : ''}
          />
        </Row>
        <Row>
          <Col>
            <TextField 
              name='name' 
              type='text' 
              label='Nazwa' 
              disabled={values.skill !== null && values.skill !== ''}/>
          </Col>
          <Col>
            {type === 'create' && 
            <SelectField
              label='Wybierz gotową umiejętność'
              name='skill'
              defaultOption='Wybierz umiejętność'
              disabled={values.name !== ''}
              options={ skills ? skills
                .filter(skill => skill.type === values.type)
                .map(skill => ({
                  label: skill.name,
                  value: String(skill.id),
                }))
                : []
              }
            />
            }
            
          </Col>
        </Row>
        <Row>
          <Col>
            <TextField name='level' type='text' label='Poziom' />
          </Col>
          <Col>
            <SelectField
              label='Certyfikat'
              name='certificate'
              options={files && files.results ? files.results.map((file) => ({
                label: file.name,
                value: String(file.id),
              })) : []}
              defaultOption='Wybierz ceryfikat'
              value={type === 'update' ? skill.certificate : ''}
            />
          </Col>
        </Row>
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
            {type === 'create' ? 'Dodaj' : 'Zapisz'}
          </button>
        </div>
      </Form>
    )}
    </Formik>
  )
}

export default SkillForm