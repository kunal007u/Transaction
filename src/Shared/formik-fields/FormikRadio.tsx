/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import _ from 'lodash';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useFormikContext } from 'formik';

export interface IFormikRadioOption {
    disabled?: boolean;
    value?: any;
    label?: string;
    checked?: boolean;
}
const FormikRadio = ({ field: { ...fields }, form: { touched, errors }, ...props }): React.ReactNode => {
    const { id, label, options, disabled, isSmartHistory = false, className, row = true, size, ...rest } = props;
    const error = Boolean(_.get(touched, fields?.name) && _.get(errors, fields?.name));
    const { setFieldValue, values } = useFormikContext();

    return (
        <FormControl id={id} fullWidth disabled={disabled}>
            {label && <FormLabel>{label}</FormLabel>}
            <RadioGroup row={row} {...fields} {...rest} className={`${className}`}>
                {
                    options.map((option: IFormikRadioOption) => (
                        <FormControlLabel
                            key={option?.value}
                            value={option?.value}
                            label={option?.label}
                            control={<Radio disabled={option?.disabled} size={size} color={"warning"} />}
                            checked={option?.value === values?.[fields?.name]}
                        />
                    ))
                }
            </RadioGroup>
            {error && <FormHelperText error className='formik-input-error'>{error && errors[fields?.name]}</FormHelperText>}
        </FormControl>
    );
};
export default FormikRadio;
