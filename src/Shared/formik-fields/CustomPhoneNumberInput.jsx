import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import _ from 'lodash';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import "./custom.css"
import React from 'react';

const CustomPhoneNumberInput = ({ field: { ...fields }, form: { touched, errors }, ...props }) => {
    const { id, maxLength, isDefaultValue, multiline, className, allowZero = false, hasObject = false, controlClassName, ...rest } = props;

    return (
        <FormControl fullWidth className={controlClassName}>
            {props?.label && <InputLabel>{props?.label}</InputLabel>}
            {isDefaultValue ? (
                <OutlinedInput
                    {...fields}
                    {...rest}
                    id={id}
                    className={className}
                    autoComplete="off"
                    inputProps={{
                        maxLength: maxLength ? maxLength : 100,
                        shrink: fields?.value?.toString(),
                    }}
                />
            ) : (
                <PhoneInput 
                    {...fields}
                    {...rest}
                    value={
                        props.type === 'number' && !allowZero
                            ? fields?.value || ''
                            : fields?.value?.toString()?.trimStart()
                    }
                    inputProps={{
                        name: fields?.name,
                        maxLength: maxLength ? maxLength : 100,
                        shrink: fields?.value?.toString(),
                    }}
                />
                )}
        </FormControl>
    );
};

export default CustomPhoneNumberInput;
