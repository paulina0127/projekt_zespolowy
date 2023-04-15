import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../../actions/authActions'

import LayoutAuth from '../../hocs/LayoutAuth';
import Background from '../../images/register.jpg';
import { FiCheckCircle } from "react-icons/fi";


const SignUpScreen = ( {  signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: '',
    account_type: 'kandydat',
  });

  const { first_name, last_name, email, password, re_password, account_type } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (password === re_password) {
      signup(first_name, last_name, email, password, re_password, account_type);
      setAccountCreated(true);
    }
  };

  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  if (accountCreated) {
    return <Navigate replace to="/logowanie" />;
  }

  return (
    <LayoutAuth bgImage={Background}> 
      <h3 className="display-4">Rejestracja</h3>
      <p className="text-muted mb-4">
      Załóż nowe konto.
      </p>
      <form onSubmit={e => onSubmit(e)}>

        <div className="btn-group my-3 w-100">
          <input 
            type="radio" 
            className="btn-check" 
            name="account_type"
            value="kandydat" 
            id="btnradio1" 
            checked={formData.account_type === "kandydat"}
            onChange={e => onChange(e)}
            />
            
          <label 
            className="btn btn-outline-warning" 
            htmlFor="btnradio1">
            Kandydat &nbsp;&nbsp;
            {formData.account_type  === "kandydat" ? <FiCheckCircle /> : ''} 
          </label>

          <input 
            type="radio" 
            className="btn-check" 
            name="account_type" 
            value="pracodawca" 
            id="btnradio2" 
            checked={formData.account_type === "pracodawca"}
            onChange={e => onChange(e)}
            />
          <label
            className="btn btn-outline-warning" 
            htmlFor="btnradio2">
            Pracodawca &nbsp;&nbsp;
            {formData.account_type  === "pracodawca" ? <FiCheckCircle /> : ''}   
          </label>
        </div>

        <div className="form-row form-group mb-3">
          <input
            className="form-control rounded-pill border-2 shadow-sm px-4"
            type='text'
            placeholder='Imię'
            name='first_name'
            value={first_name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            className="form-control rounded-pill border-2 shadow-sm px-4"
            type='text'
            placeholder='Nazwisko'
            name='last_name'
            value={last_name}
            onChange={e => onChange(e)}
            required
          />
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
