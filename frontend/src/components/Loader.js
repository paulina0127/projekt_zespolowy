import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner 
    animation="border" 
    variant="primary" 
    role="status" 
    style={{
      height: '100px',
      width: '100px',
      margin: 'auto',
      display: 'block'
    }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  )
}

export default Loader;