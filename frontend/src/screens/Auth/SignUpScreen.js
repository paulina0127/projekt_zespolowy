import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { validateNewUser } from '../../validators/validators';

import { Loader, Message } from '../../components/basics'
import { TextField } from '../../components/formHelpers';
import { Modal, Button } from 'react-bootstrap';
import { signup } from '../../actions/authActions'
import LayoutAuth from '../../hocs/LayoutAuth';
import Background from '../../images/register.jpg';
import { FiCheckCircle } from "react-icons/fi";
import { BsSendCheck } from "react-icons/bs";


const SignUpScreen = ({ signup, isAuthenticated }) => {
  const [modal, setModal] = useState(false);

  const auth = useSelector(state => state.auth);
  let { error, loading, success } = auth;

  if(error === "Request failed with status code 400") {
    error = "Istnieje już konto z podanym adresem e-mail";
  }

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <LayoutAuth bgImage={Background}> 
      <h3 className="display-4">Rejestracja</h3>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <p className="text-muted mb-4">
      Załóż nowe konto.
      </p>
      <Formik
        initialValues={{
          email: '',
          password: '',
          re_password: '',
          type: 'Kandydat',
        }}
        validationSchema={validateNewUser}
        onSubmit={values => {
          const { email, password, re_password, type } = values;
          signup(type, email, password, re_password);
          setModal(prev => !prev);
        }}
      >
      {({ values }) => (
        <>
          <Modal
            show={success && modal}
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
                Link aktywacyjny wysłaliśmy na adres: <strong className='text-success'>{values.email}</strong>
              </p>
            </Modal.Body>
            <Modal.Footer className='justify-content-center'>
              <Link className='w-100' to='/logowanie'>
                  <Button variant='success w-100'>Rozumiem</Button>
              </Link>   
            </Modal.Footer>
          </Modal>
          <Form>
            <div 
              role="group" 
              aria-labelledby="my-radio-group" 
              className="btn-group my-3 w-100"
            >
              <label className={values.type  === "Kandydat" ? 'btn btn-warning' : 'btn btn-outline-warning'}> 
                <Field type="radio" name="type" value="Kandydat" className={"btn-check"}/>
                Kandydat &nbsp;&nbsp;
                {values.type  === "Kandydat" ? <FiCheckCircle /> : ''} 
              </label>

              <label className={values.type  === "Pracodawca" ? 'btn btn-warning' : 'btn btn-outline-warning'} > 
                <Field type="radio" name="type" value="Pracodawca" className="btn-check"/>
                Pracodawca &nbsp;&nbsp;
                {values.type  === "Pracodawca" ? <FiCheckCircle /> : ''} 
              </label>
          </div>
            <TextField label="Email" name="email" type="email" />
            <TextField label="Hasło" name="password" type="password" />
            <TextField label="Potwierdź hasło" name="re_password" type="password" />
            <button
              type="submit"
              className="btn btn-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm w-100"
            >
              Zarejestruj
            </button>
          </Form>
        </>
      )}
      </Formik>
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