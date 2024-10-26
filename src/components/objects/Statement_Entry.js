import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { createBankTran, deleteBankTran, getBankData, getBankTranData } from "../../servises/opretions/bank";
export default function BankStatement({ dbpath1 }) {
  const [bankId, setBankId] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [edit, setEdit] = useState(false);
  const [amountInWord, setAmountInWord] = useState("");
  const [banks, setBanks] = useState([]);

  const [Statement, setStatemnet] = useState([]);
  const [modes, setModes] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("");
  const [inarrration, setInarration] = useState("");

  const [date, setDate] = useState("");
  const [bankName, setBankName] = useState("");
  const [cheque, setCheque] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedmode, setSelectedMode] = useState("");
  const [label1, setLabel1] = useState("Debit(In)/Credit(Out)");
  const [narration, setNarration] = useState("");
  const [bankInfo, setbankInfo] = useState("");
  const [check, setCheck] = useState("");
  const [totalAmountVal, setTotalAmountVal] = useState(null);


  const [formData, setFormData] = useState({
    date: new Date().toISOString().substr(0, 10),
    tranId: '',
    mode: '',
    BankId: '',
    chequeNo: '',
    amount: '',
    particulars: '',
    nerration: '',
    tranType: '',
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

  const getBankHandler = async () => {
    const res = await getBankData();
    console.log("res in deposits ", res)
    setBanks(res);
  }

  useEffect(() => {
    getBankHandler();
    getBankTranDataHandler();
  }, [])

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

  const formDataHandler = (data) => {
    console.log("data ", data);
    setFormData((pre) => ({
      ...pre,
      ["BankId"]: data?._id
    }));
    setAccountNo(data?.AccountNumber)
  }

  console.log("formdata ", formData);

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


  const createBankTranHandler = async () => {
    const res = await createBankTran(formData);
    setFormData((pre) => ({
      ...pre,
      // mode: '',
      chequeNo: '',
      amount: '',
      particulars: '',
      nerration: '',
    }))

    getBankTranDataHandler();
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

  const deleteBankTranHandler = async (id) => {
    const res = await deleteBankTran(id);

    getBankTranDataHandler();
  }


  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center text-3xl font-semibold">Bank Statement Entry</h2>

        <p> Date : {new Date().toLocaleDateString()}</p>

        <div>
          <div className=" flex gap-3 mb-2">
            <div className=" flex gap-2 ">
              {/* Transaction Type */}
              <select className=" form-control editableInput bigFontWeight rounded-md "
                name="tranType" value={formData?.tranType} onChange={handleChenge}>
                <option value="" disabled>Transaction Type</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdraw">Withdraw</option>
              </select>

              <select className=" form-control editableInput bigFontWeight rounded-md w-full" name="BankId" value={bankId}
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

            <div className=" flex gap-2">
              {/* <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/> */}
              <input
                className=" w-[9rem] form-control editableInput bigFontWeight pl-1 rounded-md"
                type="date"
                name="date"
                value={formData?.date}
                onChange={handleChenge}
              />
              <button className=" bg-blue-600 px-3 rounded py-1 text-white" onClick={nextHandler}>Next</button>
            </div>

          </div>

          <div>
            {
              // formData?.tranType === "Deposit" &&
              (
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
                          className={`form-control bigFontWeight ${formData?.mode === 'Cheque' ? "editableInput" : ""}`}
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
                          className={`form-control bigFontWeight ${formData?.mode === 'Cheque' ? "editableInput" : ""}`}
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
                              // onClick={editBankTranHandler}
                              >
                                Edit
                              </button>

                              <button type="button" className="btn btn-primary"
                              // onClick={canselEdit}
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
              )
            }
          </div>

          {/* <table class="table">
            <thead>

              <tr className="table-secondary">
                <th className="tablebg">Mode</th>
                <th className="tablebg">Bank-Particualr</th>
                <th className="tablebg">Narration</th>
                <th className="tablebg">Mode</th>
                <th className="tablebg" style={{ width: "200px" }}>
                  {label1}
                </th>
                <th className="tablebg">Amount</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select className=" form-control editableInput bigFontWeight rounded-md "
                    name="mode" value={formData?.mode} onChange={handleChenge}
                  >
                    <option value="" disabled> - Transaction Mode - </option>
                    <option value="Cheque" >Cheque</option>
                    <option value="Cash" >Cash</option>
                    <option value="Transfer">Transfer</option>
                  </select>
                </td>
                <td scope="row">
                  <select
                    class="form-select editableInput bigFontWeight"
                    aria-label="Default select example"
                    value={bankName}
                  
                  >
                    <option selected>- select -</option>

                    {banks.map((rest) => (
                      <option value={rest.bank_account_id}>
                        {rest.name} - {rest.account_no} - {rest.head_name}{" "}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Narration"
                    onChange={(e) => setNarration(e.target.value)}
                  />
                </td>

                <td style={{ display: "flex" }}>
                  <select
                    class="form-select editableInput bigFontWeight"
                    aria-label="Default select example"
                    value={selectedmode}
                    onChange={(e) => {
                      setSelectedMode(
                        e.target.value
                      ); 
                    }}
                  >
                    <option selected>- select -</option>

                    {modes.map((rest) => (
                      <option value={rest.name}>{rest.name}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder=""
                    onChange={(e) => setCheque(e.target.value)}
                  />
                </td>
                <td scope="row">
                  <select
                    class="form-select editableInput bigFontWeight"
                    aria-label="Default select example"
                    value={type}
                  
                  >
                    <option id="dropop1" selected>
                      - select -
                    </option>

                    <option value="Debit">Debit (outward)</option>
                    <option value="Credit">Credit (inward)</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </td>
                <td>
                  <button type="button" class="btn btn-primary"
                  
                  >
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table> */}
        </div>
        <div>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Sr</th>
                <th className="tablebg">Date</th>
                <th className="tablebg">Bank</th>
                <th className='tablebg'>Bank-Particualr</th>
                <th className="tablebg">Mode</th>
                <th className="tablebg">W. Amount</th>
                <th className="tablebg">D. Amount</th>
                <th className="tablebg">Balance</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {Statement.map((res, index) => (
                <tr className="hovereffect leading-3 " key={index}>
                  <td >{index + 1}</td>
                  <td >{new Date(res.date)?.toLocaleDateString()}</td>
                  <td >{res?.bank?.BankName} - {res?.bank?.AccountNumber}</td>
                  <td >{res.particulars}</td>
                  <td >{res.mode}</td>
                  <td >{res.tranType === "Withdraw" && res.amount}</td>
                  <td >{res.tranType === "Deposit" && res.amount}</td>
                  <td >{res?.totalAmount}</td>
                  {/*       <td> <input style={{width:'20px', height:'20px', border:'1px solid '}} type="checkbox" id={'check'+res.statemnt_id} value='0' class="form-check-input"/> </td>
                                    
                                        <td style={{width:'200px',}}><input style={{ border:'1px solid'}} type='text' class="form-control editableInput bigFontWeight" id={"status"+res.statemnt_id}   value={inarrration[res.statemnt_id]}    onChange={(e) =>{ setInarration({...inarrration, [res.statemnt_id]:e.target.value}); }}  /> 
                                    
                                    </td>
                                        */}
                  <td >
                    <button 
                    type="button"
                      className=" text-red-600 px-1 py- text-"
                      title="Delete"
                      // id={"data" + res.statemnt_id}
                      onClick={() => deleteBankTranHandler(res._id)}
                    >
                      Delete
                      {/* <TiDeleteOutline /> */}
                    </button>
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
