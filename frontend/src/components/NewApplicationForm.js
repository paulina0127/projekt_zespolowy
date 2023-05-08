import { Modal, Button } from 'react-bootstrap'
import styles from './NewApplicationForm.module.css'
import { useState } from 'react'

const NewApplicationForm = ({ offer }) => {
  const [applyMethod, setApplyMethod] = useState('profile')
  const handleMethodChange = (e) => {
    const target = e.target
    if (target.checked) {
      setApplyMethod(target.value)
    }
  }

  return (
    <Modal show={false} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className='bg-warning' closeButton>
        <Modal.Title>
          Potwierdzenie aplikacji
          <div className={`mt-3 ${styles['radio_container']}`}>
            <input onChange={handleMethodChange} type="radio" name="applyMethod" id='profile' value='profile' checked={applyMethod === 'profile'}/>
            <label htmlFor="profile">Aplikuję profilem kandydata</label>
            <input onChange={handleMethodChange} type="radio" name="applyMethod" id='cv' value='cv' checked={applyMethod === 'cv'}/> 
            <label htmlFor="cv">Aplikuję CV</label>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Dane osobowe</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default NewApplicationForm