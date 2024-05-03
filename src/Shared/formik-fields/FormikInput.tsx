import { FilledInput, FormControl, FormHelperText, InputLabel, TextField } from '@mui/material';
import _ from 'lodash';
import React from 'react';
import { useFormik, useFormikContext } from 'formik';

const FormikInput = ({ field: { ...fields }, form: { touched, errors }, ...props }): React.ReactNode => {
    const {
        id,
        maxLength,
        isDefaultValue,
        multiline,
        className,
        allowZero = false,
        hasObject = false,
        controlClassName,
        ...rest
    } = props;
    const error = Boolean(_.get(touched, fields?.name) && _.get(errors, fields?.name));
    const getError = () => {
        let errorString = errors;
        fields?.name?.split('.').map((name) => (errorString = errorString[name]));
        return errorString;
    };

    const {setFieldValue} = useFormikContext();

    return (
        <FormControl fullWidth className={controlClassName}>
            {props?.label && <InputLabel>{props?.label}</InputLabel>}
            {isDefaultValue ? (
                <FilledInput
                    {...fields}
                    {...rest}
                    id={id}
                    className="input-field w-[150px]"
                    multiline={multiline}
                    error={error}
                    autoComplete="off"
                    // inputProps={{
                    //     maxLength: maxLength ? maxLength : false,
                    //     shrink: fields?.value?.toString(),
                    // }}
                    onChange={(e) => setFieldValue(fields?.name, e.target.value)}
                    inputProps={maxLength ? { maxLength, shrink: fields?.value?.toString() } : { shrink: fields?.value?.toString() }}
                />
            ) : (
                <FilledInput
                    {...fields}
                    {...rest}
                    id={id}
                    className="input-field"
                    value={
                        props.type === 'number' && !allowZero
                            ? fields?.value || ''
                            : fields?.value?.toString()?.trimStart()
                    }
                    multiline={multiline}
                    error={error}
                    autoComplete="off"
                    inputProps={maxLength ? { maxLength, shrink: fields?.value?.toString() } : { shrink: fields?.value?.toString() }}
                    // inputProps={{
                    //     maxLength: maxLength ? maxLength : 100,
                    //     shrink: fields?.value?.toString(),
                    // }}
                />
            )}
            {error && <FormHelperText error className='formik-input-error'>{error && (hasObject ? getError() : errors[fields?.name])}</FormHelperText>}{' '}
        </FormControl>
    );
};

export default FormikInput;
