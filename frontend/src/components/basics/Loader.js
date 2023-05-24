import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation='border'
      variant='warning'
      role='status'
      style={{
        height: '50px',
        width: '50px',
        margin: 'auto',
        display: 'block',
        marginTop: '1.5rem',
        marginBottom: '1.5rem',
      }}
    >
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  )
}
export default Loader
