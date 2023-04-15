import { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/authActions';

const Layout = ({ checkAuthenticated, load_user, children }) => {
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

  return (
    <div>
      <NavigationBar />
      {children}
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout); 