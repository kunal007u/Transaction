import React from "react";
import _ from "lodash";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import DateIcon from "@mui/icons-material/DateRange";
import { DateUTCToLocalDateString } from "../../utils/dateFormat";

const FormikDatePicker = ({
    field: { ...fields },
    form: { touched, errors },
    ...props
}) => {
    const {
        onChange,
        value,
        sx,
        views = ["year", "month", "day"],
        inputFormat = "DD-MMM-YYYY",
        readOnly = true,
        getDateString = DateUTCToLocalDateString,
        hasObject,
        ...rest
    } = props;
    const error = Boolean(
        _.get(touched, fields.name) && _.get(errors, fields.name)
    );

    const getError = () => {
        let errorString = errors;
        if (hasObject)
            fields?.name?.split(".").map((name) => (errorString = errorString[name]));
        return errorString;
    };

    const handleChange = (newValue) => {
        if (newValue) {
            newValue = new Date(newValue);
            newValue = new Date(
                `${newValue?.toDateString()} ${new Date()?.toTimeString()}`
            );
        }
        onChange(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
                {...fields}
                {...rest}
                value={value}
                onChange={handleChange}
                views={views}
                inputFormat={inputFormat}
                disableMaskedInput
                components={{
                    OpenPickerIcon: DateIcon,
                }}
                PopperProps={{
                    className: "DatePickerWrapper",
                }}
                renderInput={(params) =>
                    readOnly ? (
                        <TextField
                            {...params}
                            error={error}
                            helperText={
                                error && (hasObject ? getError() : errors[fields?.name])
                            }
                            autoComplete="off"
                            value={value ? getDateString(value) : ""}
                            className="date-picker-control"
                            inputProps={{ readOnly: true }}
                            InputLabelProps={{
                                shrink: !!value,
                            }}
                            sx={sx}
                        />
                    ) : (
                        <TextField
                            {...params}
                            error={error || params?.error}
                            helperText={
                                error && (hasObject ? getError() : errors[fields?.name])
                            }
                            autoComplete="off"
                            value={value}
                            className="date-picker-control"
                            InputLabelProps={{
                                shrink: !!value,
                            }}
                            sx={sx}
                        />
                    )
                }
            />
        </LocalizationProvider>
    );
};
export default FormikDatePicker;
