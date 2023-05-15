import { FaFile, FaPlus } from 'react-icons/fa';
import UserPanelLayout from '../../hocs/UserPanelLayout';
import styles from './Attachement.module.css';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { validateFile } from '../../validators/validators';
import { Formik, Form } from 'formik';
import { TextField, FileField, SelectField } from '../formHelpers';
import { createFile } from '../../actions/candidateActions';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import styles2 from '../offers/Offer.module.css';
import { Link } from 'react-router-dom';

const Attachement = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const files = useSelector((state) => state.userProfileDetails.filesList);
  const profile = useSelector((state) => state.auth.user.profile.id);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  return (
    <UserPanelLayout>
      <Modal
        show={showModal}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header className='bg-warning'>
          <Modal.Title>Dodaj nowy plik</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
              type: '',
              path: null,
            }}
            validationSchema={validateFile}
            onSubmit={(values, { resetForm }) => {
              const { name, type, path } = values;
              dispatch(createFile(profile, values));
              // resetForm({ values: '' });
            }}
          >
            {({ values }) => (
              <Form id='form'>
                <TextField label='Nazwa' name='name' type='text' />
                <SelectField
                  label='Rodzaj pliku*'
                  name='type'
                  options={[
                    { label: 'CV', value: 'CV' },
                    { label: 'Certyfikat', value: 'Certyfikat' },
                    { label: 'Referencje', value: 'Referencje' },
                    { label: 'Dyplom', value: 'Dyplom' },
                    { label: 'List motywacyjny', value: 'List motywacyjny' },
                    { label: 'Inny', value: 'Inny' },
                  ]}
                  defaultOption='Wybierz rodzaj pliku'
                />
                <FileField
                  name='path'
                  type='file'
                  accept='.pdf, .doc, .docx, .jpg, .png'
                  hidden={false}
                />
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer className='justify-content-center'>
          <Button onClick={handleShowModal} variant='secondary'>
            Anuluj
          </Button>
          <Button type='submit' form='form' variant='warning'>
            Zapisz
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='container'>
        <div className='row'>
          <h2 className={styles['doc-h2']}>Dokumenty</h2>
          <button
            className={classNames('align-self-end', styles['doc-btn'])}
            onClick={handleShowModal}
          >
            <FaPlus size='3rem' color='#242424' />
          </button>
        </div>
        <div className='row d-flex flex-column'>
          {files?.results.map((file) => (
            <li className={styles2['job-card']}>
              <div className={styles2['job-card__info']}>
                <div
                  className='d-md-flex align-items-center gap-2'
                  key={file.id}
                >
                  <div>{file.name}</div>
                  <div>{file.type}</div>
                  <div>
                    <Link to={file.path}>
                      <button
                        type='button'
                        className={`btn btn-secondary mx-2`}
                      >
                        Wyświetl
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
    </UserPanelLayout>
  );
};

export default Attachement;
