import { Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../components/Sidebar'

const UserPanelLayout = ({ children }) => {

  return (
    <Container fluid className='main-panel'>
      <Row>
        <Sidebar />
        <Col md={10} className='content'>
          { children }
        </Col>
      </Row>
    </Container>
  )
}

export default UserPanelLayout
