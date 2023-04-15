import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from "../../actions/authActions"

import LayoutAuth from '../../hocs/LayoutAuth';
import Background from '../../images/resetpass.jpg';

const ResetPassword = ({ reset_password }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    reset_password(email);
    setRequestSent(true);
  };

  if (requestSent) {
    return <Navigate replace to="/" />;
  }

  return (
    <LayoutAuth bgImage={Background}>
      <h3 className="display-4">Przypomnij hasło</h3>
      <p className="text-muted mb-4">
        Podaj nam swój e-mail.
        Wyślemy Ci link do zmiany hasła.
      </p>
      <form onSubmit={e => onSubmit(e)}>
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
        <button 
          className="btn btn-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm w-100" 
          type='submit'>
            Wyślij
        </button>
      </form>
    </LayoutAuth>

  );
};

export default connect(null, { reset_password })(ResetPassword);