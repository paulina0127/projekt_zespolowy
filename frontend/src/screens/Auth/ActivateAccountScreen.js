import { useParams, Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { verify } from '../../actions/authActions'

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import LayoutAuth from '../../hocs/LayoutAuth';
import Background from '../../images/activate.jpg';
import { Modal, Button } from 'react-bootstrap';
import { BsPersonCheck } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";

const ActivateAccountScreen = ({ verify }) => {
  const uid = useParams().uid; 
  const token = useParams().token;

  const auth = useSelector(state => state.auth);
  let { error, loading, success } = auth;

  const verify_account = () => {
    verify(uid, token);
};

  return (
    <LayoutAuth bgImage={Background}> 
      <Modal
        show={success}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='bg-success text-light'>
          <Modal.Title id="contained-modal-title-vcenter">
          Konto zostało aktywowane!  <BsPersonCheck />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Zaloguj się na swoje konto i zacznij korzystać z naszego serwisu</h5>
          <p>Pozdrawiamy, zespół HireMeNow</p>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Link className='w-40' to='/'>
              <Button variant='outline-success w-100'>Strona Główna</Button>
          </Link>
          <Link className='w-40' to='/logowanie'>
              <Button variant='success w-100'>Przejdź do logowania</Button>
          </Link>      
        </Modal.Footer>
      </Modal>
      <h3 className="display-4">Aktywacja konta</h3>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <p className="text-muted mb-4">
      Potwierdź, aby aktywować założone konto
      </p>
      <button
        onClick={verify_account}
        type='button'
        className='btn btn-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm w-100'
      >
          Aktywuję konto  <FcApproval /> 
      </button>
    </LayoutAuth>    
  )
}

export default connect(null, { verify })(ActivateAccountScreen);