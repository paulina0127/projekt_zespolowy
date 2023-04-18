import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from "../../actions/authActions"

import Message from '../../components/Message';
import LayoutAuth from '../../hocs/LayoutAuth';
import Background from '../../images/resetpass.jpg';
import { VscCheckAll} from "react-icons/vsc";

const ResetPasswordConfirm = ({ reset_password_confirm }) => {
  const [error, setError] = useState('');
  const uid = useParams().uid; 
  const token = useParams().token;
  
  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
      new_password: '',
      re_new_password: ''
  });

  const { new_password, re_new_password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (new_password !== re_new_password) {
      setError('Wprowadzone hasła różnią się od siebie');
      setFormData({
        new_password: '',
        re_new_password: ''
      });
    } else {
    reset_password_confirm(uid, token, new_password, re_new_password);
    setRequestSent(true);
    setFormData({
      new_password: '',
      re_new_password: ''
    })};
  };

  return (
    <LayoutAuth bgImage={Background}>
      <h3 className="display-4">Podaj nowe hasło</h3>
      {requestSent && <Message variant='success'>Pomyślnie zmieniono hasło <VscCheckAll/></Message>}
      {error !== '' && <Message variant='danger'>{error}</Message>}
      <p className="text-muted mb-4">
        Po zatwierdzeniu nowego hasła, użyj go do zalogowania się do swojego konta.
      </p>
      <form onSubmit={e => onSubmit(e)}>
        <div className="form-group mb-3">
          <input
            className="form-control rounded-pill border-2 shadow-sm px-4"
            type='password'
            placeholder='Nowe hasło'
            name='new_password'
            value={new_password}
            onChange={e => onChange(e)}
            minLength='6'
            required
          />
        </div>
        <div className="form-group mb-3">
          <input
            className="form-control rounded-pill border-2 shadow-sm px-4"
            type='password'
            placeholder='Potwierdź nowe hasło'
            name='re_new_password'
            value={re_new_password}
            onChange={e => onChange(e)}
            minLength='6'
            required
          />
        </div>
        <button 
          className="btn btn-warning btn-block text-uppercase mb-2 rounded-pill shadow-sm w-100"
          type='submit'>
            Zmień hasło
        </button>
      </form>
    </LayoutAuth>
  );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);