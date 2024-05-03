import React from "react";
import CustomForm from "../../Shared/Components/CustomForm/CustomForm";
import { addTransactionValidationSchema } from "../../Validation/addTransactionValidationSchema";
import FormikInput from "../../Shared/formik-fields/FormikInput";
import FormikSelect from "../../Shared/formik-fields/FormikSelect";
import CustomPhoneNumberInput from "../../Shared/formik-fields/CustomPhoneNumberInput"

const AddUpdateTransaction = ({ setOpenDialog, setRefRow, refRow }) => {
  const initialValues = {
    bank_name: "",
    account_number: "",
    account_holder_name: "",
    ifsc_code: "",
    branch_name: "",
    branch_address: "",
    phone: '',
    accountType: ''
  };

  const getData = () => initialValues || refRow;

  const handleSubmit = () => {
    // Add your logic here
    setOpenDialog(false);
  };

  const fields = [
    {
      name: "bank_name",
      type: "text",
      placeholder: "Bank Name",
      component: FormikInput,
    },
    {
      name: "account_number",
      type: "text",
      placeholder: "Account Number",
      component: FormikInput,
    },
    {
      name: "account_holder_name",
      type: "text",
      placeholder: "Account Holder Name",
      component: FormikInput,
    },
    {
      name: "ifsc_code",
      type: "text",
      placeholder: "IFSC Code",
      component: FormikInput,
    },
    {
      name: "branch_name",
      type: "text",
      placeholder: "Branch Name",
      component: FormikInput,
    },
    {
      name: "branch_address",
      type: "text",
      placeholder: "Branch Address",
      component: FormikInput,
    },
    {
      name: 'phone',
      type: 'tel',
      placeholder: 'Phone',
      component: CustomPhoneNumberInput,
      props: {
          country: 'in',
          inputProps: {
              name: 'phone',
              required: true,
          },
          disabled: refRow?.id > 0,
          value: refRow?.phone,
      },
      sm: 6
  },
  {
    name: 'accountType',
    type: 'select',
    placeholder: 'Account Type',
    component: FormikSelect,
    options: [
        { value: 'savings', label: 'Savings' },
        { value: 'current', label: 'Current' },
    ],
    sm: 6
},
  ];

  return (
    <div className="isolate bg-white w-full px-6 py-2 sm:py-3 lg:px-8">
    
      <CustomForm
        fields={fields}
        validationSchema={addTransactionValidationSchema}
        onSubmit={handleSubmit}
        initialValues={getData()}
        // loading={UserLoading}
      />
    </div>
  );
};

export default AddUpdateTransaction;
