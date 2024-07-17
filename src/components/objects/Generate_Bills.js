import React from "react";
import "../css/Tank.css";
import wlogo from "./wahegurulogo.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useReactToPrint } from "react-to-print";
import Client from "./Client";
export default function Nozzles({ dbpath1 }) {
  const [fetchedData, setFetchedData] = useState([]);
  const [nozzles, setNozzles] = useState([]);
  const [Client, setClient] = useState([]);
  const [banks, setBanks] = useState([]);

  const [nozzle_name, setNozzle_name] = useState("");
  const [product, setProduct] = useState("");
  const [bankName, setBankName] = useState("");
  const [billNo, setBillNo] = useState("");
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [machine, setMachine] = useState("");
  const [smachine, setSMachine] = useState("");
  const [totalAmt, setTotalAmt] = useState([]);
  const [side, setSide] = useState("");
  const [amount, setAmount] = useState("");
  const [dateinBill, setDateinBill] = useState("");
  const [remark, setRemark] = useState("");
  const [billingDate, setBillingDate] = useState("");
  const [type, setType] = useState("");
  const [cheqNo, setCheqNo] = useState("");
  const [cheqDate, setCheqDate] = useState("");
  const [nozzle_no, setNozzle_no] = useState("");
  const [op_meter_reading, setOp_meter_reading] = useState("");
  const [totalAmountVal, setTotalAmountVal] = useState(null);

  //       const loadClients = async () => {
  //         let query="select * from rwt_client";
  //             /* alert(query); */
  //             const url = dbpath1 + 'getDynamic.php';
  //             let fData = new FormData();

  //             fData.append('query', query);

  //             try {
  //                 const response = await axios.post(url, fData);
  //                 if (response && response.data) {
  //                     if (response.data.phpresult) {
  //                         setClient(response.data.phpresult);
  //                         console.log(response.data.phpresult);
  //                     }
  //                 }
  //             } catch (error) {
  //                 console.log("Please Select Proper Input");
  //             }
  //       }

  //     const navigate = useNavigate();

  //     const onAdd = async () =>{
  //         if (billNo.length === 0) {
  //             alert("Bill No has been left blank!");
  //           }   else if (customerName.length === 0) {
  //             alert("Customer Name has been left blank!");
  //           }   else if (date.length === 0) {
  //             alert("Date has been left blank!");
  //           } else {

  //                 let query="select * from rwt_credit_client WHERE client_name='"+customerName+"' AND date LIKE '"+date   +"-%"+"'";

  //                /*  alert(query); */
  //                 const url = dbpath1 + 'getDynamic.php';
  //                 let fData = new FormData();

  //                 fData.append('query', query);

  //                 try {
  //                     const response = await axios.post(url, fData);

  //                     if (response && response.data) {

  //                         if (response.data.phpresult) {
  //                             setFetchedData(response.data.phpresult);
  //                             console.log(response.data.phpresult);
  //                         }
  //                     }
  //                 } catch (error) {
  //                     console.log("Please Select Proper Input");
  //                 }
  //           }
  //     }

  //     const getTaotalAmt = async (cn) =>{
  //         if (billNo.length === 0) {
  //             alert("Bill No has been left blank!");
  //           }   else if (customerName.length === 0) {
  //             alert("Customer Name has been left blank!");
  //           }   else {

  //                 let query="select sum(amount) as total from rwt_credit_client WHERE client_name='"+customerName+"' AND date LIKE '"+date +"-%"+"'";

  //              /*    alert(query); */
  //                 const url = dbpath1 + 'getDynamic.php';
  //                 let fData = new FormData();

  //                 fData.append('query', query);

  //                     const response = await axios.post(url, fData);

  //                     if (response && response.data) {

  //                         if (response.data.phpresult) {

  //                             let total = parseFloat(response.data.phpresult[0]['total']).toFixed(2);
  //                             document.getElementById('totalAmt').innerHTML = total;
  //                             setTotalAmt(total);
  //                             console.log(response.data.phpresult);
  //                             return total;
  //                         }
  //                     }

  //           }
  //     }

  //     const setInvoiceNo = async () =>{
  //         if (billNo.length === 0) {
  //             alert("Bill No has been left blank!");
  //           }   else if (customerName.length === 0) {
  //             alert("Customer Name has been left blank!");
  //           }   else {

  //                 let query="UPDATE rwt_credit_client SET invoice_no = '"+billNo+"' WHERE client_name='"+customerName+"' AND date LIKE '"+date +"-%"+"'";

  //                 /* alert(query); */
  //                 const url = dbpath1 + 'getDynamic.php';
  //                 let fData = new FormData();

  //                 fData.append('query', query);

  //                     const response = await axios.post(url, fData);

  //                     if (response && response.data) {

  //                         if (response.data.phpresult) {
  //                             setTotalAmt(response.data.phpresult);
  //                             let total = parseFloat(response.data.phpresult[0]['total']).toFixed(2);
  //                             document.getElementById('totalAmt').innerHTML = total;
  //                             console.log(response.data.phpresult);
  //                         }
  //                     }

  //           }
  //     }

  //     const setGeneratedBill = async () =>{
  //         if (billNo.length === 0) {
  //             alert("Bill No has been left blank!");
  //           }   else if (customerName.length === 0) {
  //             alert("Customer Name has been left blank!");
  //           }   else if (date.length === 0) {
  //             alert("Date has been left blank!");
  //           } else {

  //             let query="INSERT INTO `rwt_generated_bills` (`generated_bills_id`, `invoice_no`, `date`, `amount`, `client_name`, `month`, `paid_status`) VALUES (NULL, '"+billNo+"', '"+datecache+"', '"+totalAmt+"', '"+customerName+"', '"+date+"', 'unpaid');";
  //             /*  alert(query); */
  //              const url = dbpath1+'delTank.php';
  //              let fData = new FormData();
  //              fData.append('query', query);

  //              axios.post(url, fData)
  //                  .then(response => {alert(response.data); })
  //                  .catch(error => {
  //                  console.log(error.toJSON());
  //           });

  //           }
  //     }

  //     const onPayBill = () =>{
  //         if (bankName.length === 0) {
  //           alert("Bank Name has been left blank!");
  //         }   else if (type.length === 0) {
  //           alert("Type has been left blank!");
  //         }   else if (amount.length === 0) {
  //           alert("Amount has been left blank!");
  //         } else if (date.length === 0) {
  //           alert("Date has been left blank!");
  //         }  else {

  //           let query="INSERT INTO `rwt_cheque_entry` (`cheque_entry_id`, `date`, `party_name`, `bill_amount`, `bill_no`, `billing_date`, `recived_amount`, `cheq_no`, `cheq_date`, `bank_name`, `narration`) VALUES (NULL, '"+dateinBill+"', '"+customerName+"', '"+totalAmt+"', '"+billNo+"', '"+billingDate+"', '"+amount+"', '"+cheqNo+"', '"+cheqDate+"', '"+bankName+"', '"+remark+"');";
  //           /*  alert(query); */
  //            const url = dbpath1+'delTank.php';
  //            let fData = new FormData();
  //            fData.append('query', query);

  //            axios.post(url, fData)
  //                .then(response => {/* alert(response.data);  window.location.reload(); */})
  //                .catch(error => {
  //                console.log(error.toJSON());
  //         });

  //         let query2=" UPDATE `rwt_generated_bills` SET paid_status = 'paid' WHERE invoice_no = '"+billNo+"'";

  //            /* alert(query2); */
  //            const url2 = dbpath1+'delTank.php';
  //            let fData2 = new FormData();
  //            fData2.append('query', query2);

  //            axios.post(url2, fData2)
  //                .then(response => {alert(response.data);  window.location.reload();})
  //                .catch(error => {
  //                console.log(error.toJSON());
  //         });
  //         //load();
  //       //  loadHistory();
  //       }
  //   }

  //     function getMonthName(dateString) {
  //         const date = new Date(dateString + '-01');  // Append "-01" to make it a full date string
  //         const monthNames = ["January", "February", "March", "April", "May", "June",
  //                             "July", "August", "September", "October", "November", "December"];
  //         return monthNames[date.getMonth()];
  //     }

  //     const onDelete = async (index) => {
  //       let query="DELETE FROM `pupc_nozzles` WHERE nozzle_id = "+index+";";

  //       /* alert(query); */
  //       const url = dbpath1+'delTank.php';
  //       let fData = new FormData();
  //       fData.append('query', query);

  //       axios.post(url, fData)
  //           .then(response => alert(response.data))
  //           .catch(error => {
  //           console.log(error.toJSON());
  //           });
  //   }

  //   const processedNozzles = nozzles.reduce((acc, curr) => {
  //     const existingEntry = acc.find(entry => entry.machine === curr.machine);
  //     if (existingEntry) {
  //         existingEntry.rowspan += 1;
  //         existingEntry.entries.push(curr);
  //     } else {
  //         acc.push({
  //             machine: curr.machine,
  //             entries: [curr],
  //             rowspan: 1
  //         });
  //     }
  //     return acc;
  // }, []);

  // const getTotalAmount = async () => {
  //     let query = "SELECT * FROM `rwt_bank_statement` ORDER BY statemnt_id DESC LIMIT 1;";
  //     const url = dbpath1 + 'getDynamic.php';
  //     let fData = new FormData();

  //     fData.append('query', query);

  //     try {
  //         const response = await axios.post(url, fData);

  //         if (response && response.data && response.data.phpresult) {
  //             const fetchedAmount = response.data.phpresult[0]['total_amount'];
  //             console.log(fetchedAmount);  // Using fetched value directly

  //             // Any operations you want to do with fetchedAmount
  //             // ...

  //             // Finally, if you want, you can set it to state.
  //             setTotalAmountVal(fetchedAmount);
  //         }
  //     } catch (error) {
  //         console.error("Error fetching data:", error);
  //     }
  // }

  //   useEffect(() => {
  //     const getTotalAmount = async () => {
  //         let query = "SELECT * FROM `rwt_bank_statement` ORDER BY statemnt_id DESC LIMIT 1;";
  //         const url = dbpath1 + 'getDynamic.php';
  //         let fData = new FormData();

  //         fData.append('query', query);

  //         try {
  //             const response = await axios.post(url, fData);

  //             if (response && response.data && response.data.phpresult) {
  //                 const fetchedAmount = response.data.phpresult[0]['total_amount'];
  //                 console.log(fetchedAmount);  // Using fetched value directly

  //                 // Any operations you want to do with fetchedAmount
  //                 // ...

  //                 // Finally, if you want, you can set it to state.
  //                 setTotalAmountVal(fetchedAmount);
  //             }
  //         } catch (error) {
  //             console.error("Error fetching data:", error);
  //         }
  //     }

  //   //  getTotalAmount(); // This will call the async function
  // }, []);

  //   const displaySelectedProduct = async (index) => {
  //     let query="select * from rwt_credit_client WHERE client_name='"+customerName+"' AND date LIKE '"+2023-10-+"%"+"'";
  //    /*
  //     alert(query); */
  //     const url = dbpath1 + 'getDynamic.php';
  //     let fData = new FormData();
  //     fData.append('query', query);

  //     try {
  //         const response = await axios.post(url, fData);

  //         if (response && response.data) {

  //             if (response.data.phpresult) {
  //                 setSMachine(response.data.phpresult);
  //                 console.log(response.data.phpresult);
  //                 document.getElementById('ddun').innerHTML=response.data.phpresult[0]['dispensing_unit_no'];
  //                 document.getElementById('dmake').innerHTML=response.data.phpresult[0]['make'];
  //                 document.getElementById('dserial_no').innerHTML=response.data.phpresult[0]['serial_no'];
  //                 document.getElementById('dconnected_tanks').innerHTML=response.data.phpresult[0]['connected_tanks'];
  //                 document.getElementById('dproduct').innerHTML=response.data.phpresult[0]['product'];
  //                 document.getElementById('dnozzles_in_mpd').innerHTML=response.data.phpresult[0]['nozzles_in_mpd'];
  //             }
  //         }
  //     } catch (error) {
  //         console.log("Please Select Proper Input");
  //     }
  // }

  // const loadBanks = async () => {
  //     let query="select * from rwt_bank_account WHERE account_status='active'";

  //     /*    alert(query); */
  //        const url = dbpath1 + 'getDynamic.php';
  //        let fData = new FormData();

  //        fData.append('query', query);

  //            const response = await axios.post(url, fData);

  //            if (response && response.data) {

  //                if (response.data.phpresult) {
  //                    setBanks(response.data.phpresult);
  //                    console.log(response.data.phpresult);
  //                }
  //            }
  //   }

  //   const loadLastBill =async () => {
  //     let query="select invoice_no from rwt_generated_bills WHERE generated_bills_id=(select max(generated_bills_id) from rwt_generated_bills )";

  //        //alert(query);
  //        const url = dbpath1 + 'getDynamic.php';
  //        let fData = new FormData();

  //        fData.append('query', query);

  //            const response = await axios.post(url, fData);

  //            if (response && response.data) {

  //                if (response.data.phpresult) {
  //                    document.getElementById('lastbill').innerHTML=response.data.phpresult[0]['invoice_no'];
  //                    console.log(response.data.phpresult);
  //                }
  //            }
  //   }

  //     useEffect(() => {

  //         loadClients();
  //         loadBanks();
  //         loadLastBill();

  //         }, []);
  const datecache = Cookies.get("dateCookies");

  //   function convertDateFormat(inputDate) {
  //     // Split the string into an array [yyyy, mm, dd]
  //     let parts = inputDate.split('-');

  //     // Rearrange the array and join it back to a string
  //     return parts[2] + '-' + parts[1] + '-' + parts[0];
  // }

  /*  const printDiv = () => {
        const printableElement = document.getElementById('printableDiv').outerHTML;
        const newWindow = window.open('', '_blank');
        newWindow.document.write('<html><head><title>Print</title></head><body>');
        newWindow.document.write(printableElement);
        newWindow.document.write('</body></html>');
        newWindow.document.close();
        newWindow.print();
    } */
  const componentRef = React.useRef();

  const PrintButton = ({ targetRef }) => {
    const handlePrint = useReactToPrint({
      content: () => targetRef.current,
    });

    return (
      <button type="button" className="btn btn-primary" onClick={handlePrint}>
        Print
      </button>
    );
  };
  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center">Generate Bills </h2>
        <div>
          {/* <b style={{fontSize:'22px'}}> Date : {convertDateFormat(datecache)} </b> */}
          <b style={{ fontSize: "18px", marginLeft: "50px" }}>
            {" "}
            Last Bill : <span id="lastbill">Loading..</span>
          </b>
        </div>
        <div>
          <br></br>
          <table class="table" style={{ width: "1000px" }}>
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Bill No</th>

                <th className="tablebg">Client Name</th>
                <th className="tablebg">Month and Year</th>
                <th className="tablebg">Billing Date</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">
                  <input
                    type="text"
                    class="form-control bigFontWeight editableInput"
                    placeholder="Bill No"
                    onChange={(e) => setBillNo(e.target.value)}
                  />
                </td>
                <td>
                  <select
                    class="form-select bigFontWeight editableInput"
                    aria-label="Default  select example"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                    }}
                  >
                    <option selected>- Client -</option>
                    {Client.map((rest) => (
                      <option value={rest.product}>{rest.party_name}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="month"
                    class="form-control editableInput bigFontWeight"
                    placeholder="date"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    class="form-control editableInput bigFontWeight"
                    placeholder="date"
                    onChange={(e) => setDateinBill(e.target.value)}
                  />
                </td>

                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    // onClick={(e) => {
                    //   onAdd();
                    //   getTaotalAmt(e.target.value);
                    // }}
                  >
                    Generate Bill
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <br></br> <br></br>
          Generated Bill:
          <div
            id="printableDiv"
            ref={componentRef}
            style={{ width: "1000px", border: "1px solid black" }}
          >
            <div style={{ width: "1000px", height: "200px" }}>
              <br></br>
              <div style={{ display: "flex" }}>
                <img
                  style={{ width: "70px", height: "50px", marginLeft: "30px" }}
                  src={wlogo}
                ></img>
                <h2 style={{ marginLeft: "200px" }}>
                  <u>M/s. MARWAH & COMPAMNY</u>
                </h2>
              </div>
              <h5 style={{ marginLeft: "270px" }}>
                Opp. Law College Sq., Amravati Road, Nagpur-440 010
              </h5>
              <h5 style={{ marginLeft: "282px" }}>
                DEALERS BHARAT PETROLEUM CORPORATION LTD.
              </h5>
              <br></br>

              <div style={{ display: "flex" }}>
                <h6 style={{ marginLeft: "150px" }}>
                  VAT TIN No.: 2749063602V wef 03.04.2010
                </h6>
                <h6 style={{ marginLeft: "150px" }}>
                  Mob.: 9096069674/9764027164
                </h6>
              </div>
              <br></br>

              <h5>
                {" "}
                <table>
                  <tr>
                    <td>
                      <span style={{ marginLeft: "150px" }}>
                        {" "}
                        Bill No : {billNo}{" "}
                      </span>
                    </td>{" "}
                    <td>
                      <span style={{ marginLeft: "300px" }}>
                        For Month :
                         {/* {getMonthName(date)} */}
                      </span>
                    </td>
                  </tr>
                  <td>
                    <span style={{ marginLeft: "150px" }}>
                      {" "}
                      Customer Nmae : {customerName}
                    </span>
                  </td>{" "}
                  <td>
                    {" "}
                    <span style={{ marginLeft: "300px" }}>Date : </span>
                  </td>
                </table>
              </h5>
            </div>
            <br></br> <br></br>
            <div>
              <table style={{ marginLeft: "22px" }}>
                <br></br>
                <br></br>

                <tr>
                  <th style={{ border: "1px solid black", width: "70px" }}>
                    Sr No.
                  </th>
                  <th style={{ border: "1px solid black", width: "130px" }}>
                    Date
                  </th>
                  <th style={{ border: "1px solid black", width: "130px" }}>
                    Slip No.
                  </th>
                  <th style={{ border: "1px solid black", width: "120px" }}>
                    Vehicle No.
                  </th>
                  <th style={{ border: "1px solid black", width: "120px" }}>
                    Product
                  </th>
                  <th style={{ border: "1px solid black", width: "120px" }}>
                    Rate
                  </th>
                  <th style={{ border: "1px solid black", width: "130px" }}>
                    LTS
                  </th>
                  <th style={{ border: "1px solid black", width: "120px" }}>
                    Amount
                  </th>
                </tr>

                {fetchedData.map((res, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid black" }}>{index + 1}</td>
                    <td style={{ border: "1px solid black" }}></td>
                    <td style={{ border: "1px solid black" }}>{res.bill_no}</td>
                    <td style={{ border: "1px solid black" }}>
                      {res.vehicleno}
                    </td>
                    <td style={{ border: "1px solid black" }}>
                      {res.product_name}
                    </td>
                    <td style={{ border: "1px solid black" }}>{res.rate}</td>
                    <td style={{ border: "1px solid black" }}>{res.rate}</td>
                    <td style={{ border: "1px solid black" }}>{res.amount}</td>

                    {/*<td style={{width:'50px'}}>
                                       
                                        <button type="button" id={"tank"+res.tank_no} class="btn btn-primary" onClick={() => onMoveRetail(res.product_id)}>Move</button>
                                        </td> */}
                  </tr>
                ))}
                <tr className="">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td style={{ border: "1px solid black" }}>Total Amt</td>
                  <td id="totalAmt" style={{ border: "1px solid black" }}>
                    --
                  </td>

                  {/*<td style={{width:'50px'}}>
                                       
                                        <button type="button" id={"tank"+res.tank_no} class="btn btn-primary" onClick={() => onMoveRetail(res.product_id)}>Move</button>
                                        </td> */}
                </tr>
              </table>
            </div>
            <br></br>
            <br></br>
            <div
              style={{ width: "800px", height: "200px", marginLeft: "100px" }}
            >
              <table style={{ width: "800px" }}>
                <tr
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    width: "800px",
                  }}
                >
                  <td>
                    <center>
                      <b>Payment Details</b>{" "}
                    </center>
                  </td>
                </tr>
                <tr
                  style={{
                    border: "1px solid black",
                    padding: "20px",
                    width: "800px",
                  }}
                >
                  <td style={{ display: "flex", gap: "10px" }}>
                    <h6 style={{ width: "150px" }}>Bank Name : </h6>

                    {/* <select style={{width:'300px'}} class="form-select" aria-label="Default select example" value={bankName}  onChange={(e) =>{ setBankName(e.target.value);}}>
                                    <option selected>- select -</option>
                                       
                                    {banks.map((rest) => (  
                                        <option value={rest.name+" "+rest.account_no}>{rest.name} - {rest.account_no} </option>
                                    ))}
                                </select>   */}
                  </td>
                </tr>
                <tr
                  style={{
                    border: "1px solid black",
                    padding: "20px",
                    width: "800px",
                  }}
                >
                  <td style={{ display: "flex", gap: "10px" }}>
                    <h6 style={{ width: "150px" }}>Payment Mode : </h6>{" "}
                    {/* <select style={{width:'200px'}}  class="form-select" aria-label="Default select example" value={type}  onChange={(e) =>{ setType(e.target.value);}}>
                                    <option selected>- select -</option>
                                       
                                        <option value="Online">Online</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Cheque">Cheque</option>
                                  
                                </select>  */}
                    <td style={{}}>
                      <h6 style={{ width: "180px" }}></h6>
                      {/*  <input type="text" class="form-control bigFontWeight" placeholder="" onChange={(e) => setCheqNo(e.target.value)} /> */}
                    </td>
                  </td>
                </tr>
                <tr
                  style={{
                    border: "1px solid black",
                    padding: "20px",
                    width: "800px",
                  }}
                >
                  <td style={{ display: "flex", gap: "10px" }}>
                    <h6 style={{ width: "180px" }}>Payment Amount : </h6>{" "}
                    {/* <input type="text" class="form-control bigFontWeight" placeholder="Payment Amount" onChange={(e) => setAmount(e.target.value)} />*/}
                  </td>
                </tr>
                <tr
                  style={{
                    border: "1px solid black",
                    padding: "20px",
                    width: "800px",
                  }}
                >
                  <td style={{ display: "flex", gap: "10px" }}>
                    <h6 style={{ width: "150px" }}>Dated : </h6>{" "}
                    {/* <input type="date" style={{width:'200px'}} class="form-control bigFontWeight" placeholder="Payment Amount" onChange={(e) => setCheqDate(e.target.value)} /> */}
                  </td>
                </tr>
                <tr
                  style={{
                    border: "1px solid black",
                    padding: "20px",
                    width: "800px",
                  }}
                >
                  <td style={{ display: "flex", gap: "10px" }}>
                    <h6 style={{ width: "180px" }}>Remark : </h6>{" "}
                    {/* <input type="text" class="form-control bigFontWeight" placeholder="Remark" onChange={(e) => setRemark(e.target.value)} /> */}
                  </td>
                </tr>
              </table>
            </div>
            <br></br>
            <br></br>
          </div>
          <br></br>
        </div>
        <center>
          {" "}
          <PrintButton targetRef={componentRef} /> &nbsp;{" "}
          <button
            type="button"
            class="btn btn-success"
            // onClick={(e) => {
            //   /* onPayBill() */ setInvoiceNo();
            //   setGeneratedBill();
            // }}
          >
            Save
          </button>
        </center>

        <br></br>

        <br></br>
      </div>
    </>
  );
}
