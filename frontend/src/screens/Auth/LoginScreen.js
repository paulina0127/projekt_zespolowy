import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect} from 'react-redux';
import { login } from "../../actions/loginActions"

import Background from '../../images/background_image_login.jpg';

const LoginScreen = ( { login, isAuthenticated } ) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    login(email, password);
  };

  const bgImageStyle = {
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundImage: `url(${Background})`
  }

  // Is the user authenticated?
  // Redirect them to the home page
  if (isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="col-md-4 bg-light">
          <div className="d-flex align-items-center py-5"
          style={ {  minHeight: '100vh'} }>
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 mx-auto">
                  <h3 className="display-4">Logowanie</h3>
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
                        className="form-control rounded-pill border-0 shadow-sm px-4"
                      />
                    </div>
                    <div className="form-group mb-3">
                      <input
                        className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div 
          className="col-md-8 d-none d-md-flex"
          style={ bgImageStyle }>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps, { login })(LoginScreen);