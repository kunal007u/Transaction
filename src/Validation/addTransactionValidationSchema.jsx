import * as Yup from 'yup';

// Define validation schema with Yup
export const addTransactionValidationSchema = Yup.object().shape({
  bank_name: Yup.string()
    .required('Bank Name is required'),
  account_number: Yup.string()
    .required('Account Number is required')
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(9, 'Must be exactly 9 digits')
    .max(9, 'Must be exactly 9 digits'),
  account_holder_name: Yup.string()
    .required('Account Holder Name is required'),
  ifsc_code: Yup.string()
    .required('IFSC Code is required'),
  branch_name: Yup.string()
    .required('Branch Name is required'),
  branch_address: Yup.string()
    .required('Branch Address is required'),
  contact_number: Yup.string()
    .required('Contact Number is required')
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits'),
});