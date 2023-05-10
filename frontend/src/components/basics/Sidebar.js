import { Image } from 'react-bootstrap';
import {
  FaList,
  FaPowerOff,
  FaRegAddressCard,
  FaRegFileAlt,
  FaUserCog,
} from 'react-icons/fa';
import { MdWork } from 'react-icons/md';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import placeholder from '../../images/placeholder.png';
import styles from './Sidebar.module.css';

const Sidebar = ({ logout, user }) => {
  const { pathname } = useLocation();

  const candidateLinks = () => (
    <>
      <Link
        to={`/user-panel/profil-kandydata`}
        className={
          pathname === '/user-panel/profil-kandydata' ? styles.active : ''
        }
      >
        <li className='nav-item text-white fs-5 my-2'>
          <FaRegAddressCard className='ms-3' />
          <span className='ms-2'>Profil kandydata</span>
        </li>
      </Link>
      <Link
        to={`/user-panel/moje-aplikacje`}
        className={
          pathname === '/user-panel/moje-aplikacje' ? styles.active : ''
        }
      >
        <li className='nav-item text-white fs-5 my-2'>
          <FaRegAddressCard className='ms-3' />
          <span className='ms-2'>Moje aplikacje</span>
        </li>
      </Link>
      <Link
        to={`/user-panel/dokumenty`}
        className={pathname === '/user-panel/dokumenty' ? styles.active : ''}
      >
        <li className='nav-item text-white fs-5 my-2'>
          <FaRegFileAlt className='ms-3' />
          <span className='ms-2'>Dokumenty</span>
        </li>
      </Link>
    </>
  );

  const companyLinks = () => (
    <>
      <Link
        to={`/user-panel/profil-pracodawcy`}
        className={
          pathname === '/user-panel/profil-pracodawcy' ? styles.active : ''
        }
      >
        <li className='nav-item text-white fs-5 my-2'>
          <FaRegAddressCard className='ms-3' />
          <span className='ms-2'>Profil pracodawcy</span>
        </li>
      </Link>
      <Link
        to={`/user-panel/moje-oferty`}
        className={pathname === '/user-panel/moje-oferty' ? styles.active : ''}
      >
        <li className='nav-item text-white fs-5 my-2'>
          <FaList className='ms-3' />
          <span className='ms-2'>Moje oferty</span>
        </li>
      </Link>
      <Link
        to={`/user-panel/aplikacje`}
        className={pathname === '/user-panel/aplikacje' ? styles.active : ''}
      >
        <li className='nav-item text-white fs-5 my-2'>
          <MdWork className='ms-3' />
          <span className='ms-2'>Otrzymane aplikacje</span>
        </li>
      </Link>
    </>
  );

  return (
    <div className='bg-dark col-auto col-md-3 col-lg-2 min-vh-100 gx-0 d-flex flex-column'>
      <Image
        style={{
          height: '100px',
          width: '100px',
          margin: '20px auto',
          objectFit: 'cover',
        }}
        src={user?.profile?.image ? user?.profile?.image : placeholder}
        alt='User pic'
        roundedCircle
      />
      <hr className='text-secondary' />
      <ul className='nav nav-pills flex-column'>
        <Link
          to={`/user-panel/konto`}
          className={pathname === '/user-panel/konto' ? styles.active : ''}
        >
          <li className='nav-item text-white fs-5 my-2'>
            <FaUserCog className='ms-3' />
            <span className='ms-2'>Konto</span>
          </li>
        </Link>
        {user?.type === 'Kandydat'
          ? candidateLinks()
          : user?.type === 'Pracodawca'
          ? companyLinks()
          : null}
        <li className='nav-item text-white fs-5 my-2 align-self-center'>
          <button className='btn btn-warning' onClick={logout}>
            Wyloguj <FaPowerOff />
          </button>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(Sidebar);
