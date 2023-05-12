import { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Image, Collapse } from 'react-bootstrap';
import {
  FaList,
  FaPowerOff,
  FaRegAddressCard,
  FaRegFileAlt,
  FaUserCog,
} from 'react-icons/fa';
import { IoIosArrowDropdown } from 'react-icons/io';
import { MdWork } from 'react-icons/md';
import { logout } from '../../actions/authActions';
import placeholder from '../../images/placeholder.png';
import styles from './Sidebar.module.css';

const Sidebar = ({ logout, user }) => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const candidateLinks = () => (
    <>
      <div className={`text-white fs-5 my-2 ${styles.candidateLinks}`}>
        <FaRegAddressCard className='ms-3' />
        <span 
          onClick={() => setOpen(!open)}
          aria-controls="candidateSubMenu"
          aria-expanded={open}
          className='ms-2' 
          >
          Profil kandydata <IoIosArrowDropdown/>
        </span>
        <Collapse in={open}>
          <ul className='nav nav-pills flex-column' id='candidateSubMenu'>
            <Link
              to={`/user-panel/dane-osobowe`}
              className={
                pathname === '/user-panel/dane-osobowe' ? styles.active : styles.hoverEffect
              }
            >
              <li className='nav-item text-white fs-5 my-2'>
                <FaRegAddressCard className='ms-5' />
                <span className='ms-2'>Dane osobowe</span>
              </li>
            </Link>
            <Link
              to={`/user-panel/doświadczenie`}
              className={
                pathname === '/user-panel/doświadczenie' ? styles.active : styles.hoverEffect
              }
            >
              <li className='nav-item text-white fs-5 my-2'>
                <FaRegAddressCard className='ms-5' />
                <span className='ms-2'>Doświadczenie</span>
              </li>
            </Link>
            <Link
              to={`/user-panel/wykształcenie`}
              className={
                pathname === '/user-panel/wykształcenie' ? styles.active : styles.hoverEffect
              }
            >
              <li className='nav-item text-white fs-5 my-2'>
                <FaRegAddressCard className='ms-5' />
                <span className='ms-2'>Wykształcenie</span>
              </li>
            </Link>
            <Link
              to={`/user-panel/kursy`}
              className={
                pathname === '/user-panel/kursy' ? styles.active : styles.hoverEffect
              }
            >
              <li className='nav-item text-white fs-5 my-2'>
                <FaRegAddressCard className='ms-5' />
                <span className='ms-2'>Kursy</span>
              </li>
            </Link>
            <Link
              to={`/user-panel/linki`}
              className={
                pathname === '/user-panel/linki' ? styles.active : styles.hoverEffect
              }
            >
              <li className='nav-item text-white fs-5 my-2'>
                <FaRegAddressCard className='ms-5' />
                <span className='ms-2'>Linki</span>
              </li>
            </Link>
          </ul>
        </Collapse>
      </div>
      <Link
        to={`/user-panel/moje-aplikacje`}
        className={
          pathname === '/user-panel/moje-aplikacje' ? styles.active : styles.hoverEffect
        }
      >
        <li className='nav-item text-white fs-5 my-2'>
          <FaRegAddressCard className='ms-3' />
          <span className='ms-2'>Moje aplikacje</span>
        </li>
      </Link>
      <Link
        to={`/user-panel/dokumenty`}
        className={pathname === '/user-panel/dokumenty' ? styles.active : styles.hoverEffect}
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
          pathname === '/user-panel/profil-pracodawcy' ? styles.active : styles.hoverEffect
        }
      >
        <li className='nav-item text-white fs-5 my-2'>
          <FaRegAddressCard className='ms-3' />
          <span className='ms-2'>Profil pracodawcy</span>
        </li>
      </Link>
      <Link
        to={`/user-panel/moje-oferty`}
        className={pathname === '/user-panel/moje-oferty' ? styles.active : styles.hoverEffect}
      >
        <li className='nav-item text-white fs-5 my-2'>
          <FaList className='ms-3' />
          <span className='ms-2'>Moje oferty</span>
        </li>
      </Link>
      <Link
        to={`/user-panel/aplikacje`}
        className={pathname === '/user-panel/aplikacje' ? styles.active : styles.hoverEffect}
      >
        <li className='nav-item text-white fs-5 my-2'>
          <MdWork className='ms-3' />
          <span className='ms-2'>Otrzymane aplikacje</span>
        </li>
      </Link>
    </>
  );

  return (
    <div className={`col-auto col-md-3 col-lg-2 min-vh-100 gx-0 d-flex flex-column ${styles.sidebar}`}>
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
      <h3 className='text-white text-center fs-5 ml-2'>
        {user?.profile ? user.profile.first_name + ' ' + user.profile.last_name : ''}
      </h3>
      <hr className='text-secondary' />
      <ul className='nav nav-pills flex-column'>
        <Link
          to={`/user-panel/konto`}
          className={pathname === '/user-panel/konto' ? styles.active : styles.hoverEffect}
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
        <hr className='text-secondary' />
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
