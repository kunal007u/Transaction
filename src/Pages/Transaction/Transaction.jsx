import { Field, Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import DialogForm from "../../Shared/Components/DialogForm";
import AddUpdateTransaction from "../Transaction/AddUpdateTransaction";
import FormikInput from "../../Shared/formik-fields/FormikInput";
import CustomShortingMuiTable from "../../Components/CustomShortingMuiTable";
import FormikDatePicker from "../../Shared/formik-fields/FormikDatePicker";
// import axios from "axios";

const transactions = [
  {
    id: 1,
    type: "credit",
    amount: 100,
    date: "2022-01-01",
    balance: 100,
    status: "pending",
  },
  {
    id: 2,
    type: "debit",
    amount: 50,
    date: "2022-01-02",
    balance: 50,
    status: "completed",
  },
  {
    id: 3,
    type: "credit",
    amount: 200,
    date: "2022-01-03",
    balance: 250,
    status: "pending",
  },
  // Add more transactions as needed
];

const Transaction = () => {
  const [trans, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://3.6.59.40/admin/transaction_history/?limit=10&page=1",
          {
            method: "GET",
            headers: {
              Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJmY21fdG9rZW4iOiJzdHJpbmciLCJleHAiOjE3MTU2MDEwNjksImlhdCI6MTcxNDczNzA2OX0.Dh7Kf9Y2UOJdsn31qSRt1_Y_U-Y-7dDWywmTw-nlAoE`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const columns = [
    { id: "id", label: "ID", width: 100, className: "text-center" },
    { id: "type", label: "Type", width: 200, className: "text-center" },
    { id: "amount", label: "Amount", width: 200, className: "text-center" },
    { id: "date", label: "Date", width: 250, className: "text-center" },
    { id: "balance", label: "Balance", width: 200, className: "text-center" },
    { id: "status", label: "Status", width: 100, className: "text-center" },
    // { id: "actions", label: "Action", width: 100, className: "text-center" },
  ];

  const [isAccountVisible, setAccountVisible] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [refRow, setRefRow] = useState(null);

  const mapResponseToColumns = (res) => {
    return {
      id: res.id,
      type: res.type,
      amount: res.amount,
      date: res.date,
      balance: res.balance,
      status: res.status,
    };
  };

  const customResponse = transactions?.map(mapResponseToColumns);

  const handleInfo = (e, res) => {
    console.log(res);
  };

  const handleAddTransaction = () => {
    console.log("Add Transaction");
    setOpenDialog(true);
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="flex gap-10 container mx-auto">
        <div className="transation_left_side w-[70%] mt-2">
          <div className="transaction_title flex justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
            <button
              className="group relative p-2 overflow-hidden rounded bg-transparent border-2 border-r-2 border-blue-200 text-lg font-bold text-blue-400"
              onClick={handleAddTransaction}
            >
              Initiate Transaction
            </button>
          </div>
          <div className="transaction_table mt-5 white-box">
            <div className="add-users w-full flex justify-between mb-3 items-center">
              <Formik
                initialValues={{ startDate: "", endDate: "" }}
                onSubmit={handleSubmit}
              >
                {({ resetForm, values, setFieldValue }) => {
                  return (
                    <div className="flex gap-1 items-center ">
                      {/* <Field
                        type="text"
                        name="search"
                        placeholder="Search"
                        className="input-field"
                        value={values?.search}
                        onChange={(e) => {
                          setFieldValue("search", e.target.value);
                        }}
                        component={FormikInput}
                      /> */}
                      <Field
                        label="Start Date"
                        name="startDate"
                        id="startDate"
                        value={values?.startDate}
                        maxDate={new Date()}
                        onChange={(value) => {
                          setFieldValue("startDate", value);
                          if (!values?.endDate) setFieldValue("endDate", value);
                        }}
                        component={FormikDatePicker}
                      />
                      <Field
                        label="End Date"
                        name="endDate"
                        id="endDate"
                        value={values?.endDate}
                        minDate={values?.startDate}
                        maxDate={new Date()}
                        onChange={(value) => {
                          if (!values?.startDate)
                            setFieldValue("startDate", value);
                          setFieldValue("endDate", value);
                        }}
                        component={FormikDatePicker}
                      />

                      <button
                        type="submit"
                        className="middle none center rounded-lg bg-[#3b6ebb] py-3 px-6 font-sans text-xs font-bold uppercase text-white"
                      >
                        Search
                      </button>

                      <button
                        className="middle none center mr-4 rounded-lg bg-[#3b6ebb] py-3 px-6 font-sans text-xs font-bold uppercase text-white"
                        onClick={() => {
                          resetForm();
                        }}
                      >
                        clear
                      </button>
                    </div>
                  );
                }}
              </Formik>
            </div>

            <CustomShortingMuiTable
              columns={columns}
              rows={customResponse}
              background
              isInfoAction
              isLoading={false}
              onInfo={handleInfo}
            />
          </div>
        </div>
        <div className="transaction_right_side w-[30%] mt-2">
          <div className="transaction_card bg-[#f7f7f7] container mx-auto p-3">
            <div className="transaction_card_title flex items-center justify-between mb-2">
              <p className="text-[17px] font-semibold">My Balance</p>
              <h1 className="font-bold text-gray-700 text-2xl">$3000</h1>
            </div>
            <hr />
            <div className="transaction_card_body">
              <div className="transaction_card_title flex items-center justify-between mt-6">
                <p className="text-[16px] font-normal">Account Holder Name</p>
                <h1 className="font-medium capitalize">alexandra daddario</h1>
              </div>
              <div className="transaction_card_title flex items-center justify-between mt-3">
                <p className="text-[16px] font-normal">IFSC Code</p>
                <h1 className="font-medium capitalize">SBIN0001537</h1>
              </div>
              <div className="transaction_card_title flex items-center justify-between mt-3">
                <p className="text-[16px] font-normal">Account Number</p>
                <div className="flex gap-2 justify-between">
                  <h1 className="font-medium capitalize">
                    {isAccountVisible
                      ? "424 2424242 424242"
                      : "4242 XXXXXXXXXXX"}
                  </h1>
                  <button onClick={() => setAccountVisible(!isAccountVisible)}>
                    {isAccountVisible ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              <div className="transaction_card_title flex items-center justify-between mt-3">
                <p className="text-[16px] font-normal">Branch Name</p>
                <h1 className="font-medium capitalize">Los Angeles</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogForm
        scroll="body"
        maxWidth="md"
        title="Add transaction"
        openDialog={openDialog}
        handleDialogClose={() => {
          setOpenDialog(false), setRefRow(null);
        }}
        className="dialog-form"
        bodyContent={
          <AddUpdateTransaction
            setOpenDialog={setOpenDialog}
            setRefRow={setRefRow}
            refRow={refRow}
          />
        }
      />
    </>
  );
};

export default Transaction;
