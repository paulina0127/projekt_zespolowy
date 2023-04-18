import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { signup } from '../../actions/authActions'

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {Modal, Button } from 'react-bootstrap';
import LayoutAuth from '../../hocs/LayoutAuth';
import Background from '../../images/register.jpg';
import { FiCheckCircle } from "react-icons/fi";
import { BsSendCheck } from "react-icons/bs";


const SignUpScreen = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    re_password: '',
    type: 'Kandydat',
  });

  const { email, password, re_password, type } = formData;

  const auth = useSelector(state => state.auth);
  const { error, loading } = auth;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


  const onSubmit = e => {
    e.preventDefault();

    if (password !== re_password) {
      setMessage('Wprowadzone hasła różnią się od siebie');
    } else {
      signup(type, email, password, re_password);
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <LayoutAuth bgImage={Background}> 
      <Modal
        show={accountCreated}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className='bg-success text-light'>
          <Modal.Title id="contained-modal-title-vcenter">
          Konto zostało utworzone <BsSendCheck />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Sprawdź pocztę i aktywuj konto</h5>
          <p>
            Link aktywacyjny wysłaliśmy na adres: <h6 className='text-success'>{email}</h6>
          </p>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Link className='w-100' to='/logowanie'>
              <Button variant='success w-100'>Rozumiem</Button>
          </Link>   
        </Modal.Footer>
      </Modal>
      <h3 className="display-4">Rejestracja</h3>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <p className="text-muted mb-4">
      Załóż nowe konto.
      </p>
      <form onSubmit={e => onSubmit(e)}>

        <div className="btn-group my-3 w-100">
          <input 
            type="radio" 
            className="btn-check" 
            name="type"
            value="Kandydat" 
            id="btnradio1" 
            checked={formData.type === "Kandydat"}
            onChange={e => onChange(e)}
            />
            
          <label 
            className="btn btn-outline-warning" 
            htmlFor="btnradio1">
            Kandydat &nbsp;&nbsp;
            {formData.type  === "Kandydat" ? <FiCheckCircle /> : ''} 
          </label>

          <input 
            type="radio" 
            className="btn-check" 
            name="type" 
            value="Pracodawca" 
            id="btnradio2" CheckCircle
            checked={formData.type === "Pracodawca"}
            onChange={e => onChange(e)}
            />
          <label
            className="btn btn-outline-warning" 
            htmlFor="btnradio2">
            Pracodawca &nbsp;&nbsp;
            {formData.type  === "Pracodawca" ? <FiCheckCircle /> : ''}   
          </label>
        </div>

        <div className="form-group mb-3">
          <input
            className="form-control rounded-pill border-2 shadow-sm px-4"
            type='email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            className="form-control rounded-pill border-2 shadow-sm px-4 text-primary"
            type='password'
            placeholder='Hasło'
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength='6'
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            className="form-control rounded-pill border-2 shadow-sm px-4 text-primary"
            type='password'
            placeholder='Potwierdź hasło'
            name='re_password'
            value={re_password}
            onChange={e => onChange(e)}
            minLength='6'
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm w-100"
        >
          Zarejestruj
        </button>
    
      </form>
      <p className='mt-3'>
        Masz już konto? <Link className='text-decoration-none' to='/logowanie'>Zaloguj się</Link>
      </p>
    </LayoutAuth>         
  );

  
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(SignUpScreen);