import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { NavigationBar, Footer } from '../components/basics';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/authActions';

const Layout = ({ checkAuthenticated, load_user, children }) => {
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

  const location = useLocation();
  const showFooter =
    location.pathname === '/' ||
    location.pathname.startsWith('/oferty') ||
    location.pathname.startsWith('/oferta') ||
    location.pathname.startsWith('/pracodawcy') ||
    location.pathname.startsWith('/pracodawca');

  return (
    <div style={{ backgroundColor: '#F0EEE6' }}>
      <NavigationBar />
      {children}
      {showFooter ? <Footer /> : null}
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
