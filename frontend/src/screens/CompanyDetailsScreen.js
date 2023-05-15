import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

import { FiCheckCircle } from 'react-icons/fi'
import { GiReceiveMoney } from 'react-icons/gi'
import {
  IoBarChart,
  IoCalendarOutline,
  IoConstruct,
  IoDocumentsOutline,
  IoInvertMode,
  IoLocationOutline,
} from 'react-icons/io5'
import {
  MdWorkHistory,
  MdOutlineNumbers,
  MdOutlineLocalPhone,
  MdOutlineAlternateEmail,
} from 'react-icons/md'
import { GrTextAlignFull } from 'react-icons/gr'
import { SiPolywork } from 'react-icons/si'
import { TbWorldWww } from 'react-icons/tb'
import { OfferPoint } from '../components/offers'

import styles from './OfferDetailsScreen.module.css'

const CompanyDetailsScreen = () => {
  return (
    <>
      <>
        <div className='container px-4 py-5 bg-white border shadow rounded my-3'>
          <div className='d-md-flex align-items-center pb-2 border-bottom'>
            <Link>
              <img
                src={require('../images/kot.jpg')}
                alt='Company pic'
                className={styles.brandImg}
              />
            </Link>
            <div>
              <h2>Pracodawca</h2>
              {/*Tu może być link z lokalizacją na Google Maps na podstawie https://developers.google.com/maps/documentation/urls/get-started - czyli np.
              https://www.google.com/maps/@?api=1&map_action=map&Olsztyn itd */}
              <Link>
                <p className='text-primary'>
                  <strong>
                    Olsztyn
                    <IoLocationOutline />
                  </strong>
                </p>
              </Link>
            </div>
          </div>
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-2 g-4 py-5 mb-4 pb-0'>
            <OfferPoint
              text='4076210711'
              name='Nip'
              icon={<MdOutlineNumbers />}
            />
            <Link>
              <OfferPoint
                text='https://pracodawca.pl'
                name='Strona internetowa'
                icon={<TbWorldWww />}
              />
            </Link>
            <OfferPoint
              text='Armii Krajowej 23,  11-111 Olsztyn'
              name='Lokalizacja: '
              icon={<IoLocationOutline />}
            />
            <OfferPoint
              text='999999999'
              name='Numer telefonu'
              icon={<MdOutlineLocalPhone />}
            />
            <OfferPoint
              text='email@pracodawca.pl'
              name='Email'
              icon={<MdOutlineAlternateEmail />}
            />
            {/* dla symetrii XD data zarejstrowania konta, ale może być bez*/}
            <OfferPoint
              text='2023-05-15'
              name='Zarejestrowano'
              icon={<IoCalendarOutline />}
            />
          </div>
          <div className='row row-cols-12'>
            <OfferPoint
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
              name='Opis firmy'
              icon={<GrTextAlignFull />}
            />
          </div>
        </div>
        <div className='container px-4 py-5 bg-white border shadow rounded my-3'>
          <h2 className='pb-2 border-bottom'>Nasze oferty</h2>
          <ul className='list-group list-group-flush'></ul>
        </div>
        {/*nie wiem dlaczego, ale nie ma footer */}
      </>
    </>
  )
}

export default CompanyDetailsScreen
