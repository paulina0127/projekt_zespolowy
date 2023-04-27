import { Link } from "react-router-dom";
import styles from './Offer.module.css'

const Offer = ({offer}) => {
  return (
    <li className={styles["job-card"]}>
      <div className={styles["job-card__info"]}>
        <div className="d-md-flex align-items-center">
          <div className={styles["img-c"]}><img src="http://projects.lollypop.design/job-listing/photosnap.svg" alt="company pic"/></div>
          <div>
            <div className="d-flex align-items-center">
              <p>{offer.company.name}</p>
            </div>
              <Link to={`/oferta/${offer.id}`} style={{textDecoration: 'none'}}>
                <h6>{offer.position}</h6>
              </Link>
            <ul>
              <li>{offer.position_level}</li>
              <li>Wygasa: {offer.expiration_date.slice(0, 10)}</li>
              <li>{offer.location.city}</li>
            </ul>
          </div>
        </div>
      </div>
      <ul className={styles["offer-btn"]}>
        <Link to={`/oferty/${offer.id}`}>
        <button className='btn mx-2'>Szczegóły</button>
        </Link>
        <button className='btn' style={{backgroundColor: '#E7B822'}}>Aplikuj</button>
      </ul>
    </li>
  )
}

export default Offer