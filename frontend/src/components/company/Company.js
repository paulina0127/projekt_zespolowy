import { Link } from 'react-router-dom';
import placeholder from '../../images/placeholder.png';

const Company = ({ company }) => {
  return (
    <div className='container shadow p-3 bg-white rounded-4 m-3'>
      <div className='row'>
        <Link to={`/pracodawca/${company.id}`}>
          <h3 className='fw-bold' style={{ color: 'var(--yellow)' }}>
            {company.name}
          </h3>
        </Link>
        <p>{company.location.city}</p>
        <div className='col' style={{ height: '200px', width: '200px' }}>
          <img
            className='rounded-4'
            src={company.image ? company.image : placeholder}
            alt='Company logo'
            style={{ height: '100%', width: '100%', objectFit: 'contain' }}
          />{' '}
        </div>
      </div>
    </div>
  );
};

export default Company;
