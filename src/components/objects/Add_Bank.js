import React from "react";
import "../css/Tank.css";
import { useState, useEffect } from "react";
import { changeStatus, createBank, deleteBank, getBankData } from "../../servises/opretions/bank";
import toast from "react-hot-toast";


export default function Tank({ dbpath1 }) {
  const [banks, setBanks] = useState([]);
  // const navigate = useNavigate();

  // const [bankName, setBankName] = useState("");
  // const [headName, setHeadName] = useState("");
  // const [accountNo, setAccountNo] = useState("");
  // const [balance, setBalance] = useState("");

  const [formData, setFormData] = useState({
    BankName: '',
    AccountNumber: '',
    AccountName: '',
    BranchName: '',
    Amount: '',
    AccountType: '',
  })

  const chengeHandler = (e) => {
    const { name, value } = e.target

    setFormData((pre) => ({
      ...pre,
      [name]: value
    }))
  }

  const createBankHandler = async () => {
    const data = await createBank(formData);
    setFormData((pre) => ({
      ...pre,
      BankName: '',
      AccountNumber: '',
      AccountName: '',
      BranchName: '',
      Amount: '',
      AccountType: '',
    }))

    getBackDataHandler();
  }

  const getBackDataHandler = async () => {
    const data = await getBankData();
    console.log("data ", data);
    setBanks(data);
  }

  useEffect(() => {
    getBackDataHandler();
  }, [])

  const handleChangeStatus = async (id) => {
    const data = await changeStatus(id);
    toast.success(data?.message);
    getBackDataHandler();
  }

  const deleteBankHandler = async (id) => {
    const res = await deleteBank(id);
    getBackDataHandler();
  }


  console.log("FormData", formData);
  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center text-3xl">Add Bank Account</h2>
        <span style={{ fontSize: "22px" }}>
          {" "}
          Date : {new Date().toLocaleDateString()}
        </span>
        <div>
          <br></br>
          <table className="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Bank Name</th>
                <th className="tablebg">Account No</th>
                <th className="tablebg">Account Name</th>
                <th className="tablebg">Branch Name</th>
                <th className="tablebg">Total Amount</th>
                <th className="tablebg">Account Type</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control editableInput bigFontWeights"
                    placeholder="Bank Name"
                    name="BankName"
                    value={formData?.BankName}
                    onChange={chengeHandler}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    className="form-control editableInput bigFontWeights"
                    placeholder="Account Number"
                    name="AccountNumber"
                    value={formData?.AccountNumber}
                    onChange={chengeHandler}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control editableInput bigFontWeights"
                    placeholder="Account Name"
                    name="AccountName"
                    value={formData?.AccountName}
                    onChange={chengeHandler}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control editableInput bigFontWeights"
                    placeholder="Branch Name"
                    name="BranchName"
                    value={formData?.BranchName}
                    onChange={chengeHandler}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control editableInput bigFontWeights"
                    placeholder="Total Amount"
                    name="Amount"
                    value={formData?.Amount}
                    onChange={chengeHandler}
                  />
                </td>
                <td scope="row">
                  <select
                    className="form-select editableInput bigFontWeight"
                    aria-label="Default select example"
                    name="AccountType"
                    value={formData?.AccountType}
                    onChange={chengeHandler}
                  >
                    <option value={""} disabled selected>-Select Account Type-</option>

                    <option value="Saving">Saving </option>

                    <option value="Current">Current</option>
                  </select>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={createBankHandler}
                  >
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div>
          <table className="table">
            <thead>
              <tr className="table-secondary text-sm">
                <th className="tablebg">Bank Name</th>
                <th className="tablebg">Account No</th>
                <th className="tablebg">Account Name</th>
                <th className="tablebg">Branch Name</th>
                <th className="tablebg">Total Amount</th>
                <th className="tablebg">Account Type</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {banks?.map((res, index) => (
                <tr className="hovereffect leading-3" key={index}>
                  <td className="py-3">{res?.BankName}</td>
                  <td className="py-3">{res?.AccountNumber}</td>
                  <td className="py-3">{res?.AccountName}</td>
                  <td className="py-3">{res?.BranchName}</td>
                  <td className="py-3">{res?.Amount}</td>
                  <td className="py-3">{res?.AccountType}</td>

                  <td className=" w-[5%] flex gap-3 my-0 align-top">
                    {res?.status ?
                    (<button type="button" className="bg-blue-600 px-2 py-2 my-0 rounded text-white "
                      onClick={() => handleChangeStatus(res?._id)}
                    >Close</button>) :
                    (<button type="button" className="bg-blue-600 px-2 py-2 mt-0 rounded text-white "
                      onClick={() => handleChangeStatus(res?._id)}
                    >Open</button>)}

                    {res?.transaction.length <= 0 && 
                    <button
                      type="button"
                      className="py-2 bg-red-400 px-2 my-0 rounded"
                      id={"data" + res._id}
                      onClick={() => deleteBankHandler(res._id)}
                    >
                      Delete
                    </button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
