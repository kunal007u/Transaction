import React from "react";
import _ from 'lodash';
import { Field } from 'formik'
import { FormControl, FormHelperText } from '@mui/material'

const FormikFileUpload = ({ field: { ...fields }, form: { touched, errors }, ...props }): React.ReactNode => {
  const { className, hasObject = false, controlClassName, onChange, label, ...rest } = props;
  const error = Boolean(_.get(touched, fields?.name) && _.get(errors, fields?.name));
  const getError = () => {
    let errorString = errors;
    fields?.name?.split('.').map((name) => (errorString = errorString[name]));
    return errorString;
  };
  return (
    <FormControl fullWidth className={controlClassName}>
      <Field
        variant="outlined"
        name="uploader"
        className={className}
        title={label}
        type={"file"}
        onChange={onChange}
        style={{
          display: "flex",
          color: error ? "red" : "var(--main-color)"
        }}
        {...props}
        {...rest}
      />
      {error && <FormHelperText error className='formik-input-error'>{error && (hasObject ? getError() : errors[fields?.name])}</FormHelperText>}{' '}
    </FormControl>
  );
};

export default FormikFileUpload;
