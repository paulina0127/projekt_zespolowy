import { useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Image, Collapse } from 'react-bootstrap'
import {
  FaList,
  FaPowerOff,
  FaFingerprint,
  FaRegAddressCard,
  FaGraduationCap,
  FaLink,
  FaHammer,
  FaBriefcase,
  FaRegFileAlt,
  FaUserCog,
  FaArchive,
} from 'react-icons/fa'
import { TbCertificate } from 'react-icons/tb'
import { IoIosArrowDropdown } from 'react-icons/io'
import { MdWork, MdWorkHistory, MdOutlineAddCircleOutline } from 'react-icons/md'
import { logout } from '../../actions/authActions'
import { NavLinkItem, SubMenuLinkItem } from './NavLinkItems'
import placeholder from '../../images/placeholder.png'
import styles from './Sidebar.module.css'

const Sidebar = ({ logout, user }) => {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const profile = useSelector(state => state.auth.user?.profile)

  const candidateLinks = () => (
    <>
      <div className={`text-white fs-5 my-2 ${styles.candidateLinks}`}>
        <FaRegAddressCard className='ms-3' />
        <span
          onClick={() => setOpen(!open)}
          aria-controls='candidateSubMenu'
          aria-expanded={open}
          className='ms-2'
        >
          Profil kandydata <IoIosArrowDropdown />
        </span>
        <Collapse in={open}>
          <ul className='nav nav-pills flex-column' id='candidateSubMenu'>
          <SubMenuLinkItem
              to='/user-panel/dane-osobowe'
              pathname={pathname}
              icon={<FaFingerprint />}
              label='Dane osobowe'
            />
            {profile !== null && 
            <>
              <SubMenuLinkItem
                to='/user-panel/doświadczenie'
                pathname={pathname}
                icon={<FaBriefcase />}
                label='Doświadczenie'
              />
              <SubMenuLinkItem
                to='/user-panel/wykształcenie'
                pathname={pathname}
                icon={<FaGraduationCap />}
                label='Wykształcenie'
              />
              <SubMenuLinkItem
                to='/user-panel/umiejętności'
                pathname={pathname}
                icon={<FaHammer />}
                label='Umiejętności'
              />
              <SubMenuLinkItem
                to='/user-panel/kursy'
                pathname={pathname}
                icon={<TbCertificate />}
                label='Kursy'
              />
              <SubMenuLinkItem
                to='/user-panel/linki'
                pathname={pathname}
                icon={<FaLink />}
                label='Linki'
              />
            </>
            }
          </ul>
        </Collapse>
      </div>
      <NavLinkItem
        to='/user-panel/moje-aplikacje'
        pathname={pathname}
        icon={<MdWorkHistory />}
        label='Moje aplikacje'
      />
      {profile !== null && 
      <NavLinkItem
        to='/user-panel/dokumenty'
        pathname={pathname}
        icon={<FaRegFileAlt />}
        label='Dokumenty'
      />
      }
    </>
  );

  const companyLinks = () => (
    <>
      <NavLinkItem
        to='/user-panel/profil-pracodawcy'
        pathname={pathname}
        icon={<FaRegAddressCard />}
        label='Profil pracodawcy'
      />
      <NavLinkItem
        to='/user-panel/moje-oferty'
        pathname={pathname}
        icon={<FaList />}
        label='Moje oferty'
      />
      <NavLinkItem
        to='/user-panel/nowa-oferta'
        pathname={pathname}
        icon={<MdOutlineAddCircleOutline />}
        label='Nowa oferta'
      />
      <NavLinkItem
        to='/user-panel/aplikacje'
        pathname={pathname}
        icon={<MdWork />}
        label='Nowe aplikacje'
      />
      <NavLinkItem
        to='/user-panel/aplikacje-archiwum'
        pathname={pathname}
        icon={<FaArchive />}
        label='Archiwum aplikacji'
      />
    </>
  );

  return (
    <div
      className={`col-auto col-md-3 col-lg-2 min-vh-100 gx-0 d-flex flex-column ${styles.sidebar}`}
    >
      <Image
        className={styles['user-img']}
        src={user?.profile?.image ? user?.profile?.image : placeholder}
        alt='User pic'
        roundedCircle
      />
      <h3 className='text-white text-center fs-5 ml-2'>
        {user?.profile
          ? user?.type === 'Kandydat'
            ? user?.profile?.first_name + ' ' + user?.profile?.last_name
            : user?.type === 'Pracodawca'
            ? user?.profile?.name
            : ''
          : ''}
      </h3>
      <hr className='text-secondary' />
      <ul className='nav nav-pills flex-column'>
        <NavLinkItem
          to='/user-panel/konto'
          pathname={pathname}
          icon={<FaUserCog/>}
          label='Konto'
        />
        {user?.type === 'Kandydat'
          ? candidateLinks()
          : user?.type === 'Pracodawca'
          ? companyLinks()
          : null}
        <hr className='text-secondary' />
        <li className='nav-item text-white fs-5 my-2 align-self-center'>
          <button className={styles['logout-btn']} onClick={logout}>
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
