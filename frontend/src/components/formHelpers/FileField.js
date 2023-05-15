import { ErrorMessage, useField } from 'formik';
import { useState } from 'react';

const FileField = ({ label, accept, ...props }) => {
  const [field, meta] = useField(props);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onChange = (e) => {
    field.onChange({
      target: {
        name: field.name,
        value: e.target.files[0],
      },
    });
  };

  return (
    <div className='form-group mb-3'>
      <label htmlFor={field.name} className='mx-2 my-2 text-muted'>
        {label}
      </label>
      <input
        id={field.name}
        accept={accept}
        className={`form-control rounded-pill border-2 shadow-sm px-4 ${
          meta.touched && meta.error && 'is-invalid'
        }`}
        onChange={onChange}
        hidden
        {...props}
      />
      <ErrorMessage
        component='div'
        name={field.name}
        className='error mt-2 text-danger'
      />
    </div>
  );
};

export default FileField;
