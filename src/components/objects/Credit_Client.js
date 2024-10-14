import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  creatCreditTran,
  deleteCreditTranData,
  getCreditData,
  getCreditTranData,
} from "../../servises/opretions/credit";
import {
  getHsdData,
  getMsData,
  getSpeedData,
} from "../../servises/opretions/fuel";
export default function Handloans({ dbpath1 }) {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  const [history, setHistory] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [thistory, setTHistory] = useState([]);
  const [amountInWord, setAmountInWord] = useState("");
  const [outstanding, setOutsatnding] = useState("0");
  const [TOutstanding, setTOutstanding] = useState("0");
  const [totalCredit, settotalCredit] = useState("");
  const [formData, setFormData] = useState({
    client: "",
    billNo: "",
    amount: "",
    productName: "",
    rate: "",
    quantity: "",
  });

  const handlchenges = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const getMsDataHandler = async () => {
    const data = await getMsData();
    console.log("data ", data);

    const l = data.length;
    setFormData((prevFormData) => ({
      ...prevFormData,
      rate: data[l - 1]?.reading, // Update the 'rate' field
    }));

    quantityHandler();
  };
  const getSpeedDataHandler = async () => {
    const data = await getSpeedData();
    console.log("data ", data);

    const l = data.length;
    setFormData((prevFormData) => ({
      ...prevFormData,
      rate: data[l - 1]?.reading, // Update the 'rate' field
    }));

    quantityHandler();
  };
  const getHsdDataHandler = async () => {
    const data = await getHsdData();
    console.log("data ", data);

    const l = data.length;
    setFormData((prevFormData) => ({
      ...prevFormData,
      rate: data[l - 1]?.reading, // Update the 'rate' field
    }));

    quantityHandler();
  };

  const quantityHandler = () => {
    const rate = formData?.rate;
    const amount = formData?.amount;

    if (rate && amount) {
      const quantity = amount / rate;
      const formattedQuantity = quantity.toFixed(2);

      setFormData((prev) => ({
        ...prev,
        quantity: formattedQuantity, // Update the 'quantity' field
      }));
    }
  };

  // Trigger data fetch based on productName changes
  useEffect(() => {
    if (formData?.productName === "ms") {
      getMsDataHandler();
    } else if (formData?.productName === "speed") {
      getSpeedDataHandler();
    } else if (formData?.productName === "hsd") {
      getHsdDataHandler();
    }
  }, [formData?.productName]);

  // Trigger quantity calculation when rate or amount changes
  useEffect(() => {
    if (formData?.rate && formData?.amount) {
      quantityHandler();
    }
  }, [formData?.rate, formData?.amount]);

  const getCreditDataHandler = async () => {
    const data = await getCreditData();
    setClients(data);
    console.log("CLients data ", data);
  };

  const getCreditTranDataHandler = async () => {
    const data = await getCreditTranData();
    console.log("data of getCreditTranData ", data);
    setTHistory(data);
  };

  useEffect(() => {
    getCreditDataHandler();
    getCreditTranDataHandler();
  }, []);

  const creatCreditTranHandler = async () => {
    const res = await creatCreditTran(formData);
    setFormData((pre) => ({
      ...pre,
      client: "",
      billNo: "",
      amount: "",
      productName: "",
      rate: "",
      quantity: "",
    }));

    setAmountInWord("");

    getCreditTranDataHandler();
  };

  const handleDelet = async (id) => {
    const res = await deleteCreditTranData(id);
    console.log("res ", res);

    getCreditTranDataHandler();
  };

  // const onDelete = async (index) => {
  //     let query = "DELETE FROM `rwt_credit_client` WHERE credit_client_id = " + index + ";";

  //     /*  alert(query); */
  //     const url = dbpath1 + 'delTank.php';
  //     let fData = new FormData();
  //     fData.append('query', query);

  //     axios.post(url, fData)
  //         .then(response => { alert(response.data); window.location.reload(); })
  //         .catch(error => {
  //             console.log(error.toJSON());
  //         });
  // }

  function numberToWords(num) {
    let amountInWordTemp = convertToWords(num);
    setAmountInWord(amountInWordTemp);
  }

  function convertToWords(num) {
    const belowTwenty = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ];
    const tens = [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];

    if (num === 0) return "";
    if (num < 20) return belowTwenty[num - 1];
    if (num < 100)
      return (
        tens[Math.floor(num / 10)] +
        (num % 10 ? " " + belowTwenty[(num % 10) - 1] : "")
      );
    if (num < 1000)
      return (
        belowTwenty[Math.floor(num / 100) - 1] +
        " hundred" +
        (num % 100 ? " and " + convertToWords(num % 100) : "")
      );
    if (num < 100000)
      return (
        convertToWords(Math.floor(num / 1000)) +
        " thousand" +
        (num % 1000 ? " " + convertToWords(num % 1000) : "")
      );
    if (num < 10000000)
      return (
        convertToWords(Math.floor(num / 100000)) +
        " lakh" +
        (num % 100000 ? " " + convertToWords(num % 100000) : "")
      );
    if (num < 1000000000)
      return (
        convertToWords(Math.floor(num / 10000000)) +
        " crore" +
        (num % 10000000 ? " " + convertToWords(num % 10000000) : "")
      );

    return "Number too large";
  }

  // Calculate the total amount whenever the transaction history (tHistory) changes
  useEffect(() => {
    let sum = 0;
    thistory.forEach((d) => {
      sum += d.amount;
    });
    setTotalAmount(sum); // Set the total amount after calculating
  }, [thistory]); // This effect runs whenever tHistory changes

  console.log("totalAmount ", totalAmount);

  console.log("formdata in credit ", formData);

  return (
    <>
      <div className="tankMainDiv shadow-lg px-3 mb-5 bg-body-tertiary rounded bigFontWeight">
      <div className='bg-white top-14  w-[100%] z-1 py-2 mb-12 fixed'>
                    <div className='w-[40%]  flex items-center justify-between gap-6'>
                    <span className='text-xl'> Date : {new Date().toLocaleDateString()} </span>
                    <h2 className='text-3xl'>Credit Client</h2>
                    </div>
                </div>
        <div>
          <br></br>
          <h5 className='flex items-center justify-end mr-8 gap-4 mt-10'> <span style={{  }}>Outstanding : {outstanding}</span> <span style={{  }}>Total Outstanding : </span> {TOutstanding}</h5>
          <br></br>
          <table className="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Party Name</th>
                <th className="tablebg">Bill No</th>
                <th className="tablebg">Amount</th>
                <th className="tablebg">Product Name</th>
                <th className="tablebg">Rate</th>
                <th className="tablebg">Quantity in Liter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select
                    className="form-select editableInput w-[12rem]"
                    value={formData?.clientName}
                    aria-label="Default select example"
                    name="client"
                    onChange={handlchenges}
                  >
                    <option value="">- Party Name -</option>
                    {clients?.map((client) => (
                      <option key={client._id} value={client._id}>
                        {client?.clientName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control editableInput bigFontWeight"
                    placeholder="Bill No"
                    onChange={handlchenges}
                    name="billNo"
                    value={formData?.billNo}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    className="form-control editableInput bigFontWeight"
                    name="amount" // Add the name attribute to match your form data key
                    placeholder="Amount"
                    value={formData?.amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((pre) => ({
                        ...pre,
                        [e.target.name]: value,
                      }));
                      numberToWords(value); // Call the function with the updated value
                    }}
                  />
                </td>

                <td scope="row">
                  <select
                    className="form-select editableInput"
                    name="productName"
                    value={formData?.productName}
                    aria-label="Default select example"
                    onChange={handlchenges}
                  >
                    <option value="" disabled>
                      - Product Name -
                    </option>
                    <option value="ms">MS </option>
                    <option value="speed">Speed </option>
                    <option value="hsd">HSD</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control  bigFontWeight"
                    value={formData?.rate}
                    placeholder="Rate"
                    onChange={handlchenges}
                    disabled
                  />
                </td>

                <td>
                  <input
                    type="text"
                    className="form-control bigFontWeight"
                    value={formData?.quantity}
                    name="quntity"
                    placeholder="Quantity"
                    onChange={handlchenges}
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="table relative left-[25rem] w-[48rem] ">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Amount in Word</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ width: "750px" }}>{amountInWord}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={creatCreditTranHandler}
                  >
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <br></br>
          Todays Transactions: <br></br>
          <br></br>
          <table className="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Sr.</th>
                <th className="tablebg">Name</th>
                <th className="tablebg">Bill No</th>
                <th className="tablebg">Amount</th>
                <th className="tablebg" style={{ width: "100px" }}>
                  Product Name
                </th>
                <th className="tablebg">Rate</th>
                <th className="tablebg">Qty</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {thistory?.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td>{index + 1}</td>
                  <td>{res?.client?.clientName}</td>
                  <td>{res.billNo}</td>
                  <td>{res.amount}</td>
                  <td>{res.productName}</td>
                  <td>{res.rate}</td>
                  <td>{res.quantity}</td>
                  <td style={{ width: "50px" }}>
                    <button
                      type="button"
                      style={{ height: "30px", paddingTop: "2px" }}
                      id={"data" + res.credit_client_id}
                      onClick={() => handleDelet(res._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {/* <tr>
                                  <td id="ddun">Haldirams</td>
                                      <td id="dmake">Recived</td>   
                                      <td id="dserial_no">0</td>
                                    <td id="dserial_no">5000</td>
                                    <td id="dproduct">12000</td>
                                    <td id="dnozzles_in_mpd">Cash</td>
                                 
                                </tr>   
                                <tr>
                                <td id="dconnected_tanks">15-10-2023</td>
                                      <td id="dmake">Given</td>   
                                    <td id="dserial_no">3000</td>
                                    <td id="dserial_no">0</td>
                                    <td id="dproduct">17000</td>
                                    <td id="dnozzles_in_mpd">Cash</td>
                                </tr>   
                                <tr>
                                <td id="dconnected_tanks">02-10-2023</td>
                                      <td id="dmake">Recived</td>   
                                      <td id="dserial_no">0</td>
                                    <td id="dserial_no">1000</td>
                                    
                                    <td id="dproduct">14000</td>
                                    <td id="dnozzles_in_mpd">Cash</td>
                                </tr>   
                                <tr>
                                <td id="dconnected_tanks">25-09-2023</td>
                                
                                      <td id="dmake">Given</td>   
                                    <td id="dserial_no">2000</td>
                                    <td id="dserial_no">0</td>
                                    <td id="dproduct">15000</td>
                                    <td id="dnozzles_in_mpd">Cheque</td>
                                 
                                </tr>    */}
              {/*    <tr>
                                  <td><b>Closing Balance</b></td>
                                  <td></td>
                                  
                                  <td><b>{tgiven}</b></td>
                                  <td><b>{trecived}</b></td>
                                  <td></td>
                                  <td></td>
                                </tr> */}
            </tbody>
          </table>
          <span>
            {" "}
            <span style={{ marginLeft: "400px" }}>
              Total Credit = <span>{totalAmount}</span>
            </span>{" "}
          </span>
        </div>
        <br></br>
      </div>
    </>
  );
}
