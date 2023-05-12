import { Modal, Button } from 'react-bootstrap'

const MyModal = ({ children, title, showModal, danger }) => {
  return (
    <Modal show={showModal} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className={danger ? 'bg-danger' : 'bg-warning'}>
        <Modal.Title>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { children }
      </Modal.Body>
    </Modal>
  )
}

export default MyModal