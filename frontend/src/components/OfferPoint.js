import styles from './OfferPoint.module.css'

const OfferPoint = ({icon, name, text}) => {
  return (
    <div className="col d-flex align-items-start">
      <span className={styles.iconbg}>
        {icon}
      </span>
      <div>
        <p className='text-muted mb-2'>{name}</p>
        <h5 className="fw-bold fs-6">{text}</h5>
      </div>
    </div>
  );
};

export default OfferPoint;
