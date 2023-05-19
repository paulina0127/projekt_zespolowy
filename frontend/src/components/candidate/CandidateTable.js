import { Row, Col } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import styles from './CandidateInfo.module.css'

const CandidateTable = ({ title, handleShowAddModal, th_list, children }) => {
  return (
    <div className={styles['table-wrapper']}>
      <div className={styles['table-title']}>
        <Row>
          <Col sm={6} md={6}>
            <h2>{title}</h2>
          </Col>
          <Col sm={6}>
            <button className={styles['doc-btn']} onClick={handleShowAddModal} title="Dodaj">
              <FaPlus />
            </button>			
          </Col>
        </Row>
      </div>
      <table className='table table-striped table-hover '>
        <thead>
          <tr className='table-dark'>
            {th_list.map((name, index) => <th key={index}>{name}</th>)}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
    </table>
  </div>
  )
}

export default CandidateTable