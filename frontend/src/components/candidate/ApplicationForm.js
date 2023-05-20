import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { DropdownButton } from 'react-bootstrap';
import { FileCheckbox } from '../formHelpers';
import { Message } from '../basics';
import { createApplication } from '../../actions/candidateActions';
import { useState } from 'react';

const ApplicationForm = ({
  initialValues,
  filesList,
  handleCloseModal,
  applyMethod,
}) => {
  const [attachments, setAttachments] = useState([]);
  const [isAttachment, setIsAttachment] = useState(true);
  const dispatch = useDispatch();

  const handleCheckboxChange = (fileId) => {
    setAttachments((prevAttachments) => {
      if (prevAttachments.some((pattachment) => pattachment.file === fileId)) {
        return prevAttachments.filter(
          (pattachment) => pattachment.file !== fileId
        );
      } else {
        return [...prevAttachments, { file: fileId }];
      }
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        values.type = applyMethod;
        if (attachments.length > 0) {
          values.attachments = attachments;
        }
        if (applyMethod === 'Profil kandydata') {
          dispatch(createApplication(values));
        } else if (applyMethod === 'CV') {
          if (values.attachments === undefined) {
            setIsAttachment(false);
          } else {
            dispatch(createApplication(values));
          }
        }
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form>
          {!isAttachment && (
            <Message variant='danger'>
              Wybierz co najmniej 1. załącznik przy aplikowaniu CV
            </Message>
          )}
          <h4>Załączniki</h4>
          <DropdownButton variant='warning' title='Wybierz pliki'>
            {filesList.results.map((file) => (
              <FileCheckbox
                key={file.id}
                file={file}
                selectedFiles={attachments.map((attachment) => attachment.file)}
                setSelectedFiles={handleCheckboxChange}
              />
            ))}
          </DropdownButton>
          <hr className='text-secondary' />
          <div className='d-flex justify-content-center'>
            <button
              type='button'
              className='btn btn-outline-warning rounded-pill fw-bold shadow-sm mx-2 px-5'
              onClick={handleCloseModal}
            >
              Wróć
            </button>
            <button
              type='submit'
              className='btn btn-warning rounded-pill fw-bold shadow-sm px-5'
            >
              Aplikuję
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ApplicationForm;
