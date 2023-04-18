import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { login } from "../../actions/authActions"

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import LayoutAuth from '../../hocs/LayoutAuth';
import Background from '../../images/background_image_login.jpg';

const LoginScreen = ( { login, isAuthenticated } ) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const auth = useSelector(state => state.auth);
  const { error, loading } = auth;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    login(email, password);
  };


  // Is the user authenticated?
  // Redirect them to the home page
  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <LayoutAuth bgImage={Background}> 
      <h3 className="display-4">Logowanie</h3>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <p className="text-muted mb-4">
      Zaloguj się na swoje konto.
      </p>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group mb-3">
          <input
            id="inputEmail"
            type="email"
            placeholder="Email"
            name='email'
            value={email}
            onChange={e => onChange(e)}
            required
            className="form-control rounded-pill border-2 shadow-sm px-4"
          />
        </div>
        <div className="form-group mb-3">
          <input
            className="form-control rounded-pill border-2 shadow-sm px-4 text-primary"
            id="inputPassword"
            type="password"
            placeholder="Hasło"
            name='password'
            value={password}
            onChange={e => onChange(e)}
            minLength={8}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm w-100"
        >
          Zaloguj
        </button>
      </form>
      <p className='mt-3'>
        Nie pamiętasz hasła? <Link className='text-decoration-none' to='/przypominanie-hasła'>Przypomnij hasło</Link>
      </p>
      <p className='mt-3'>
       Nie masz konta? <Link className='text-decoration-none' to='/rejestracja'>Zarejestruj się</Link>
      </p>
    </LayoutAuth>             
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(LoginScreen);