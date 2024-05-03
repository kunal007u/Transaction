import React from 'react';
import _ from 'lodash';
import { Box, Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useFormikContext } from 'formik';

const FormikMultiSelect = ({ field: { ...fields }, form: { touched, errors }, ...props }): React.ReactNode => {
    const { id, defaultOption, sx, fullWidth = true, hasObject = false, className, ...rest } = props;
    const error = Boolean(_.get(touched, fields.name) && _.get(errors, fields.name));
    const getError = () => {
        let errorString = errors;
        fields?.name?.split('.').map((name) => (errorString = errorString[name]));
        return errorString;
    };

    const { setFieldValue,values } = useFormikContext();
    return (
        <>

            <FormControl fullWidth={fullWidth} className="select-field">
                <InputLabel title={props.label}>{props.label}</InputLabel>
                <Select
                    {...fields}
                    {...rest}
                    error={error}
                    multiple
                    MenuProps={{
                        PaperProps: {
                            className: 'select-wrapper',
                        },
                    }}
                    sx={sx}
                    id={id}
                    name={props?.name}
                    value={values?.[fields?.name] || props?.value}
                    onChange={(e) => {
                        setFieldValue(fields?.name, e.target.value);
                    }} 
                    renderValue={(selected: number[]) => {
                        const { options } = props;
                        // console.log("FormikMultiSelect ~ options:", options)
                        const value = options
                            .map((item) => {
                                if (selected.includes(item?.value)) {
                                    return item?.title;
                                }
                            })
                            .filter(Boolean);
                        return (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.length > 3 ? (
                                    <>
                                        {value.map(
                                            (item, index) =>
                                                index <= 0 && <Chip key={item} color="primary" size="small" label={item} />,
                                        )}
                                        <Chip
                                            key={selected.length}
                                            color="primary"
                                            size="small"
                                            label={`+${selected.length - 1}...`}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {value.map((item) => (
                                            <Chip key={item} size="small" color="primary" label={item} />
                                        ))}
                                    </>
                                )}
                            </Box>
                        );
                    }}
                >
                    {props?.options &&
                        props?.options.map((option) => {
                            return (
                                <MenuItem key={option.value} value={option.value} disabled={option?.disabled}>
                                    <div
                                        key={option.value}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            width: '100%',
                                        }}
                                    >
                                        {option.title}
                                        {values?.[fields?.name].includes(option.value) && <IoCheckmarkDoneOutline />}
                                    </div>
                                </MenuItem>

                            )
                        }
                        )}
                </Select>
            </FormControl >
                {error && <FormHelperText error>{error && (hasObject ? getError() : errors[fields?.name])}</FormHelperText>}
        </>

    );
};

export default FormikMultiSelect;