import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'

export const NavLinkItem = ({ to, pathname, icon, label }) => {
  return (
    <Link
      to={to}
      className={pathname === to ? styles.active : styles.hoverEffect}
    >
      <li className='nav-item text-white fs-5 my-2'>
        {icon && <span className='ms-3'>{icon}</span>}
        <span className='ms-2'>{label}</span>
      </li>
    </Link>
  )
}

export const SubMenuLinkItem = ({ to, pathname, icon, label }) => {
  return (
    <Link
      to={to}
      className={pathname === to ? styles.active : styles.hoverEffect}
    >
      <li className='nav-item text-white fs-5 my-2'>
        {icon && <span className='ms-5'>{icon}</span>}
        <span className='ms-2'>{label}</span>
      </li>
    </Link>
  )
}

