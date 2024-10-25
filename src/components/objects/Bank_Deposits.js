import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { createBankTran, deleteBankTran, getBankData, getBankTranData, updateBankTran } from "../../servises/opretions/bank";
export default function BankDeposits({ dbpath1 }) {

  const [statement, setStatemnet] = useState([]);
  const [banks, setBanks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({});

  // const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [bankId, setBankId] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [amountInWord, setAmountInWord] = useState("");
  const [totalAmountVal, setTotalAmountVal] = useState(null);


  const [formData, setFormData] = useState({
    // date: new Date().toISOString().substr(0, 10),
    tranId: '',
    mode: '',
    BankId: '',
    chequeNo: '',
    amount: '',
    particulars: '',
    nerration: '',
  });

  const handleChenge = (e) => {
    const { name, value } = e.target;
    // if (name === "BankName") {
    //   setBankName(value);
    //   // setAccountNo()
    // }
    // else {
    // }
    setFormData((pre) => ({
      ...pre,
      [name]: value
    }))
  }

  const formDataHandler = (data) => {
    console.log("data ", data);
    setFormData((pre) => ({
      ...pre,
      ["BankId"]: data?._id
    }));
    setAccountNo(data?.AccountNumber)
  }

  console.log("formdata ", formData);


  // useEffect(() => {
  //   const date = new Date().toLocaleDateString();
  //   setDate(date);
  // }, [])
  const getBankHandler = async () => {
    const res = await getBankData();
    console.log("res in deposits ", res)
    setBanks(res);
  }

  const getBankTranDataHandler = async () => {
    const res = await getBankTranData();
    console.log("res in getBankTranData ", res?.bankTranData);
    if (res?.bankTranData) {
      setStatemnet(res?.bankTranData);
      const amount = res?.bankTranData?.reduce((acc, curr) => acc + curr.amount, 0);

      setTotalAmountVal(amount);
    }
  }

  useEffect(() => {
    getBankHandler();
    getBankTranDataHandler();
  }, [])

  const createBankTranHandler = async () => {
    const res = await createBankTran(formData);
    setFormData((pre) => ({
      ...pre,
      mode: '',
      chequeNo: '',
      amount: '',
      particulars: '',
      nerration: '',
    }))

    getBankTranDataHandler();
  }

  const deleteBankTranHandler = async (id) => {
    const res = await deleteBankTran(id);

    getBankTranDataHandler();
  }

  const editHandler = async (data) => {
    setEdit(true);
    setBankId(data?.bank?._id);
    setAccountNo(data?.bank?.AccountNumber);
    setFormData((pre) => ({
      ...pre,
      // date: new Date().toISOString().substr(0, 10),
      tranId : data?._id,
      mode: data?.mode,
      BankId: data?.bank?._id,
      chequeNo: data?.chequeNo,
      amount: data?.amount,
      particulars: data?.particulars,
      nerration: data?.nerration,
    }))

  }

  const editBankTranHandler = async () => {
    await updateBankTran(formData);
    setFormData((pre) => ({
      ...pre,
      tranId: '',
      mode: '',
      chequeNo: '',
      amount: '',
      particulars: '',
      nerration: '',
    }))
    
    setEdit(false);

    getBankTranDataHandler();
  }

  const canselEdit = () => {
    setEdit(false);
    setFormData((pre) => ({
      ...pre,
      tranId:'',
      mode: '',
      chequeNo: '',
      amount: '',
      particulars: '',
      nerration: '',
    }))
  }

  const nextHandler = async () => {
    let currentDate = new Date(formData.date); // Convert to Date object
    currentDate.setDate(currentDate.getDate() + 1); // Increment by one day

    const nextDate = currentDate.toISOString().split('T')[0]; // Convert back to 'YYYY-MM-DD' format
    console.log("nextDate ", nextDate);

    setFormData((pre) => ({
      ...pre,
      ["date"]: nextDate,
    }))
  };



  function numberToWords() {
    const num = formData?.amount;
    if (num === "") {
      setAmountInWord("");
    }
    else if (num) {
      let amountInWordTemp = convertToWords(num);
      setAmountInWord(amountInWordTemp);
    }

  }

  useEffect(() => {
    numberToWords();
  }, [formData?.amount])

  function convertToWords(num) {
    const belowTwenty = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (num === 0) return '';
    if (num < 20) return belowTwenty[num - 1];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + belowTwenty[num % 10 - 1] : '');
    if (num < 1000) return belowTwenty[Math.floor(num / 100) - 1] + ' hundred,' + (num % 100 ? ' and ' + convertToWords(num % 100) : '');
    if (num < 100000) return convertToWords(Math.floor(num / 1000)) + ' thousand,' + (num % 1000 ? ' ' + convertToWords(num % 1000) : '');
    if (num < 10000000) return convertToWords(Math.floor(num / 100000)) + ' lakh,' + (num % 100000 ? ' ' + convertToWords(num % 100000) : '');
    if (num < 1000000000) return convertToWords(Math.floor(num / 10000000)) + ' crore,' + (num % 10000000 ? ' ' + convertToWords(num % 10000000) : '');

    return 'Number too large';
  }

  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
      <div className="relative mb-4">
          <div className="fixed top-16 py-2 flex items-center bg-white z-10 w-full">
            <span style={{ fontSize: "22px" }}>

              Date : {new Date().toLocaleDateString()}
            </span>
            <h2 className="ml-60 text-center text-3xl">Bank Deposits</h2>
          </div>
        </div>
        <div>
          <br></br>

          <div className=" flex gap-3 mb-2">
            <div className=" flex gap-2">
              {/* <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/> */}
              {/* <input
                className=" w-[9rem] form-control editableInput bigFontWeight pl-1 rounded-md"
                type="date"
                name="date"
                value={formData?.date}
                onChange={handleChenge}
              />
              <button className=" bg-blue-600 px-3 rounded py-1 text-white" onClick={nextHandler}>Next</button> */}
            </div>

            <div className=" flex gap-2 ">
              <select className=" form-control editableInput bigFontWeight rounded-md " name="BankId" value={bankId}
                onChange={(e) => {
                  const bankData = banks?.find(res => res._id === e.target.value);
                  setBankId(e.target.value);
                  if (bankData) {
                    formDataHandler(bankData);
                  }
                }}
              >
                <option value="" disabled>     - Select Bank - </option>
                {
                  banks?.map((d) => (
                    <option key={d._id} value={d._id}>{d?.BankName}</option>
                  ))
                }
              </select>

              <input type="text" value={accountNo} className=" form-control editableInput bigFontWeight pl-2 rounded-md" placeholder="Account No. " />
            </div>

          </div>
          <table className="table">
            <thead>
              <tr className="table-secondary">
                {/*   <th className='tablebg'>Date</th> */}
                <th className="tablebg" >
                  <select className=" form-control editableInput bigFontWeight rounded-md " name="mode" value={formData?.mode} onChange={handleChenge}
                  >
                    <option value="" disabled> - Transaction Mode - </option>
                    <option value="Cheque" >Cheque</option>
                    <option value="Cash" >Cash</option>
                    <option value="Transfer">Transfer</option>
                    {/* {
                      banks?.map((d) => (
                        <option key={d._id} value={d._id}>{d?.BankName}</option>
                      ))
                    } */}
                  </select>
                </th>

                <th className="tablebg" >Amount</th>
                <th className="tablebg" >Bank-Particulars</th>
                <th className="tablebg">Neration</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* chequeNo */}
                <td>
                  <input
                    type="text"
                    className={`form-control bigFontWeight ${formData?.mode === 'Cheque' ? "editableInput" : ""}`}
                    placeholder="Cheque No."
                    name="chequeNo"
                    value={formData?.chequeNo}
                    onChange={handleChenge}
                  />
                </td>
                {/* amount */}
                <td>
                  <input
                    type="text"
                    className="form-control editableInput bigFontWeight"
                    placeholder="Amount"
                    name="amount"
                    value={formData?.amount}
                    onChange={handleChenge}
                  />
                </td>
                {/* particulars */}
                <td>
                  <input
                    type="text"
                    className={`form-control bigFontWeight ${formData?.mode == 'Cheque' ? "editableInput" : ""}`}
                    placeholder="Particulars"
                    name="particulars"
                    value={formData?.particulars}
                    onChange={handleChenge}
                  />
                </td>
                {/* nerration */}
                <td>
                  <input
                    type="text"
                    className={`form-control bigFontWeight ${formData?.mode == 'Cheque' ? "editableInput" : ""}`}
                    placeholder="Nerration"
                    name="nerration"
                    value={formData?.nerration}
                    onChange={handleChenge}
                  />
                </td>
                {/* Save */}
                <td>
                  {edit ?
                    (<>
                      <div className=" flex gap-2">
                        <button type="button" className="btn btn-primary"
                          onClick={editBankTranHandler}
                        >
                          Edit
                        </button>

                        <button type="button" className="btn btn-primary"
                          onClick={canselEdit}
                        >
                          Cansel
                        </button>
                      </div>
                    </>) :
                    (<>
                      <button type="button" className="btn btn-primary"
                        onClick={createBankTranHandler}
                      >
                        Save
                      </button>
                    </>)}
                </td>
              </tr>
              <tr>
                <td></td>
                {/* amount in word */}
                <td className="" colSpan="2">
                  <input
                    type="text"
                    className="form-control editableInput bigFontWeight"
                    placeholder="Amount in Word"
                    value={amountInWord}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br></br>
        <div>
          <br></br>
          <table className="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Sr</th>
                <th className="tablebg">Bank</th>
                <th className="tablebg">Acc. No.</th>
                <th className="tablebg">Mode</th>
                <th className="tablebg">Particulars</th>
                <th className="tablebg">Cheque</th>
                <th className="tablebg">Amount</th>
                <th className="tablebg">Nerration</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {statement.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td>{index + 1}</td>
                  <td>{res?.bank?.BankName}</td>
                  <td>{res?.bank?.AccountNumber}</td>
                  <td>{res?.mode}</td>
                  <td>{res?.particulars}</td>
                  <td>{res?.chequeNo}</td>
                  <td>{res?.amount}</td>
                  <td>{res?.nerration}</td>
                  <td style={{ width: "120px" }} className=" flex gap-2">
                    <button type="button" style={{ height: "30px", paddingTop: "2px" }} id={"data" + res.statemnt_id}
                      className="btn btn-primary" onClick={() => editHandler(res)}
                    > Edit </button>{" "}

                    <button type="button" style={{ height: "30px", paddingTop: "2px" }} id={"data" + res.statemnt_id}
                      className="btn btn-primary"
                      onClick={() => deleteBankTranHandler(res._id)}
                    > Delete </button>{" "}
                    &nbsp;&nbsp;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginLeft: "655px" }}> Total Amount : {totalAmountVal} </p>
        </div>
      </div>
    </>
  );
}
