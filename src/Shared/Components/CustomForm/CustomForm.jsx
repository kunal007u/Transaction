

import { CircularProgress, FormHelperText, Grid, debounce } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import CustomProfilePicUpload from '../CustomProfilePicUpload';


const CustomForm= ({ fields, validationSchema, onSubmit, initialValues, loading }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values, setFieldTouched, errors, touched, }) => {
        const MIN_PHONE_NUMBER_LENGTH = 6;

        const debouncedOnChange = debounce((value, country, formattedValue, e) => {

          if (value && value.length >= MIN_PHONE_NUMBER_LENGTH) {
            setFieldValue('phone', `${e}`);
            setFieldTouched("phone", true, false);
          }
        }, 100);

        return (
          <Form className="mx-auto mt-1  sm:mt-1">
            <Grid container spacing={2}>

              {fields.map((field) => (
                <Grid item xs={field.xs || 12} sm={field.sm || 6} key={field.name}>
                  <label className="text-sm font-medium text-gray-700 tracking-wide">{field.placeholder}</label>
                  {(() => {
                    switch (field.type) {
                      case 'file':
                        if (field.name === 'audio') {
                          return (
                            // Return a different field for 'audio'
                            <Field
                              component={field.component}
                              name={field.name}
                              type={field.type}
                              onChange={field.onChange && field.onChange(setFieldValue)}
                              {...field.props}
                            />
                          );
                        } else {
                          return (
                            <>
                              <CustomProfilePicUpload profile_pic_url={values.profile_pic_url} onUploadClick={field.props?.onUploadClick} />
                              <Field
                                component={field.component}
                                name={field.name}
                                type={field.type}
                                onChange={field.onChange && field.onChange(setFieldValue)}
                                {...field.props}
                              />
                            </>
                          );
                        }
                      case 'radio':
                        return (
                          <>
                            <Field
                              component={field.component}
                              name={field.name}
                              type={field.type}
                              onChange={field.onChange && field.onChange(setFieldValue)}
                              {...field.props}
                            />
                          </>
                        );

                      case 'tel':
                        return (
                          <>
                            <Field
                              component={field.component}
                              name={field.name}
                              type={field.type}
                              onChange={(value, country, formattedValue, e) => {
                                debouncedOnChange(value, country, formattedValue, e); // Use the debounced onChange handler
                              }}
                              {...field.props}
                              
                              />
                              {errors.phone && touched.phone && <FormHelperText style={{ color: "red" }}>{String(errors?.phone)}</FormHelperText>}
                          </>

                        );

                      default:
                        return (
                          <Field
                            component={field.component}
                            name={field.name}
                            type={field.type}
                            {...field.props}
                          />
                        );
                    }
                  })()}
                </Grid>
              ))}
              <Grid item xs={12}>
                <button
                  className="middle none center rounded-lg bg-[#3b6ebb] py-3 px-6 font-sans text-xs font-bold uppercase text-white"
                  data-ripple-light="true"
                  disabled={loading}
                  type='submit'
                >
                  {loading ?
                    <CircularProgress
                      size={18}
                      sx={{
                        color: "black",
                      }}
                    /> : "Submit"
                  }
                </button>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  );
};

export default CustomForm;