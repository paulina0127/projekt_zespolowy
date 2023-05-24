import { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Loader, Message } from '../basics'
import { RESET_MESSAGES } from '../../constants/authConst'
import ChangePasswordForm from './ChangePasswordForm'
import ChangeEmailForm from './ChangeEmailForm'
import DeleteAccountForm from './DeleteAccountForm'
import UserPanelLayout from '../../hocs/UserPanelLayout'
import styles from '../company/CompanyProfileForm.module.css'

const AccountManagement = () => {
  const dispatch = useDispatch()
  const { 
    loading, 
    success_password, 
    success_email, 
    error,
   } = useSelector((state) => state.auth)
  
  useEffect(() => {
    return () => {
      dispatch({ type: RESET_MESSAGES })
    }
  }, [dispatch])

  return (
    <UserPanelLayout>
      <div className='container text-center mt-5 mb-5'>
        {loading && <Loader />}
        {success_password && <Message variant='success'>Pomyślnie zmieniono hasło</Message>}
        {success_email && <Message variant='success'>Pomyślnie zmieniono adres e-mail</Message>}
        {error && <Message variant='danger'>Podano niepoprawne aktualne hasło</Message>}
        <Row className='align-items-center justify-content-center'>
          <Col>
            <ChangeEmailForm />
          </Col>
          <Col>
            <ChangePasswordForm />
          </Col>
          <DeleteAccountForm />
        </Row>
      </div>
    </UserPanelLayout>
  )
}

export default AccountManagement
