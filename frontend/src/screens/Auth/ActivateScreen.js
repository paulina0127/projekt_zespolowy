import { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../actions/authActions'

import LayoutAuth from '../../hocs/LayoutAuth';
import Background from '../../images/activate.jpg';
import { FcApproval } from "react-icons/fc";


const ActivateScreen = ({ verify }) => {

  const [verified, setVerified] = useState(false);

  const uid = useParams().uid; 
  const token = useParams().token;

  const verify_account = e => {
    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    return <Navigate replace to="/logowanie" />;
  }

  return (
    <LayoutAuth bgImage={Background}> 
      <h3 className="display-4">Aktywacja konta</h3>
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

export default connect(null, { verify })(ActivateScreen);