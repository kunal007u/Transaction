import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      bank_name: "",
      account_number: "",
      account_holder_name: "",
      ifsc_code: "",
      branch_name: "",
      branch_address: "",
      phone: "",
      accountType: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      bank_name: Yup.string().required("Required"),
      account_number: Yup.string().required("Required"),
      account_holder_name: Yup.string().required("Required"),
      ifsc_code: Yup.string().required("Required"),
      branch_name: Yup.string().required("Required"),
      branch_address: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      accountType: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const response = await fetch("YOUR_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data?.data?.message);
        navigate("/transaction");
      } else {
        toast.error("Failed to register");
      }
    },
  });

  // Add form fields for the new values in the form here

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-3">
            <div>
              <label htmlFor="firstName" className="sr-only">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label htmlFor="bank_name" className="sr-only">
                Bank Name
              </label>
              <input
                id="bank_name"
                name="bank_name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Bank Name"
                value={formik.values.bank_name}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label htmlFor="account_number" className="sr-only">
                Account Number
              </label>
              <input
                id="account_number"
                name="account_number"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Account Number"
                value={formik.values.account_number}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label htmlFor="account_holder_name" className="sr-only">
                Account Holder Name
              </label>
              <input
                id="account_holder_name"
                name="account_holder_name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Account Holder Name"
                value={formik.values.account_holder_name}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label htmlFor="ifsc_code" className="sr-only">
                IFSC Code
              </label>
              <input
                id="ifsc_code"
                name="ifsc_code"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="IFSC Code"
                value={formik.values.ifsc_code}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label htmlFor="branch_name" className="sr-only">
                Branch Name
              </label>
              <input
                id="branch_name"
                name="branch_name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Branch Name"
                value={formik.values.branch_name}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label htmlFor="branch_address" className="sr-only">
                Branch Address
              </label>
              <input
                id="branch_address"
                name="branch_address"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Branch Address"
                value={formik.values.branch_address}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label htmlFor="accountType" className="sr-only">
                Account Type
              </label>
              <select
                id="accountType"
                name="accountType"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={formik.values.accountType}
                onChange={formik.handleChange}
              >
                <option value="">Select account type</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
            <p className="mt-2">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
