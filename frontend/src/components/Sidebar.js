import { useSelector, connect } from "react-redux";
import { Navigate, Link, useLocation } from "react-router-dom";
import { logout } from '../actions/authActions';
import { FaUserCog, FaRegFileAlt, FaRegAddressCard, FaPowerOff, FaRegCommentDots, FaList } from 'react-icons/fa';
import { MdWork } from 'react-icons/md'

const Sidebar = ({logout, isAuthenticated}) => {
  const type = useSelector(state => state.auth.user.type);
  const { pathname } = useLocation();

  if (!isAuthenticated) {
    return <Navigate replace to="/" />;
  }

  const candidateLinks = () => (
    <>
      <Link to={`/user-panel/profil`} className={pathname === '/user-panel/profil' ? 'active' : ''}>
        <li className="nav-item text-white fs-5 my-2">
          <FaRegAddressCard className="ms-3"/> 
          <span className="ms-2">Profil kandydata</span>
        </li>
      </Link>
      <Link to={`/user-panel/moje-aplikacje`} className={pathname === '/user-panel/moje-aplikacje' ? 'active' : ''}>
        <li className="nav-item text-white fs-5 my-2">
          <FaRegAddressCard className="ms-3"/> 
          <span className="ms-2">Moje aplikacje</span>
        </li>
      </Link>
      <Link to={`/user-panel/dokumenty`} className={pathname === '/user-panel/dokumenty' ? 'active' : ''}>
        <li className="nav-item text-white fs-5 my-2">
          <FaRegFileAlt className="ms-3"/>
          <span className="ms-2">Dokumenty</span>
        </li>
      </Link>
    </>
  );

  const companyLinks = () => (
    <>
      <Link to={`/user-panel/profil`} className={pathname === '/user-panel/profil' ? 'active' : ''}>
        <li className="nav-item text-white fs-5 my-2">
          <FaRegAddressCard className="ms-3"/> 
          <span className="ms-2">Profil pracodawcy</span>
        </li>
      </Link>
      <Link to={`/user-panel/moje-oferty`} className={pathname === '/user-panel/moje-oferty' ? 'active' : ''}>
        <li className="nav-item text-white fs-5 my-2">
          <FaList className="ms-3" /> 
          <span className="ms-2">Moje oferty</span>
        </li>
      </Link>
      <Link to={`/user-panel/aplikacje`} className={pathname === '/user-panel/aplikacje' ? 'active' : ''}>
        <li className="nav-item text-white fs-5 my-2">
          < MdWork className="ms-3"/> 
          <span className="ms-2">Otrzymane aplikacje</span>
          </li>
      </Link>
    </>
  );

  return (
    <div className="bg-dark col-auto col-md-3 col-lg-2 min-vh-100">
      <a className="text-decoration-none text-white d-flex align-itemcenter ms-3 mt-4">
        <span className="ms-1 fs-4">Brand</span>
      </a>
      <hr className="text-secondary"/>
      <ul className="nav nav-pills flex-column">
        <Link to={`/user-panel/konto`} className={pathname === '/user-panel/profil' ? 'active' : ''}>
          <li className="nav-item text-white fs-5 my-2">
            <FaUserCog className="ms-3"/>
            <span className="ms-2">Konto</span>
          </li>
        </Link>
        { type === "Kandydat"  ? candidateLinks()
          : type === "Pracodawca" ? companyLinks() : null }
        <Link to={`/user-panel/konwersacje`} className={pathname === '/user-panel/konwersacje' ? 'active' : ''}>
          <li className="nav-item text-white fs-5 my-2">
            <FaRegCommentDots className="ms-3"/> 
            <span className="ms-2">Konwersacje</span>
          </li>
        </Link>
        <li className="nav-item text-white fs-5 my-2">
          <button className="btn btn-warning" onClick={logout}>Wyloguj <FaPowerOff/></button>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { logout })(Sidebar);

