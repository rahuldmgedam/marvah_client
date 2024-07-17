import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function BankStatement({ dbpath1 }) {
  const [Statement, setStatemnet] = useState([]);
  const [banks, setBanks] = useState([]);
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

  // const loadSatement = async (bankid) => {
  //     let query="select * from rwt_bank_statement where statemnt_id != 0 AND bank_id = "+bankid+" AND date= '"+datecache+"' ORDER BY date";

  //         /*    alert(query); */
  //     const url = dbpath1 + 'getDynamic.php';
  //     let fData = new FormData();

  //     fData.append('query', query);

  //         const response = await axios.post(url, fData);

  //         if (response && response.data) {

  //             if (response.data.phpresult) {
  //                     setStatemnet(response.data.phpresult);
  //                 const initialNarration = {};
  //                     response.data.phpresult.forEach(st => {
  //                     initialNarration[st.statemnt_id] = st.narration;

  //                 });
  //                 console.log(initialNarration);
  //                 /*  setTimeout(function() {
  //                     loadCheckBoxes(response.data.phpresult);
  //                 }, 200  );  */
  //                 setInarration(initialNarration);

  //                 /*   console.log(response.data.phpresult); */
  //             }
  //         }
  // }

  /*    function loadCheckBoxes(boxesdata){
            let i;
            for(i=0;i<boxesdata.length;i++)
            {
                if(boxesdata[i]['check']==='1')
                {
                    
                    let check = "check"+boxesdata[i]['statemnt_id'];
                
                    document.getElementById(check).checked = true;
                }
            }


        } */

  //     const loadBanks = async () => {
  //         let query="select * from rwt_bank_account WHERE account_status='active'";

  //         /*    alert(query); */
  //         const url = dbpath1 + 'getDynamic.php';
  //         let fData = new FormData();

  //         fData.append('query', query);

  //             const response = await axios.post(url, fData);

  //             if (response && response.data) {

  //                 if (response.data.phpresult) {
  //                     setBanks(response.data.phpresult);
  //                     console.log(response.data.phpresult);
  //                 }
  //             }
  //     }

  //     const loadmode = async () => {
  //         let query="select * from rwt_mode";

  //         /*    alert(query); */
  //         const url = dbpath1 + 'getDynamic.php';
  //         let fData = new FormData();

  //         fData.append('query', query);

  //             const response = await axios.post(url, fData);

  //             if (response && response.data) {

  //                 if (response.data.phpresult) {
  //                     setModes(response.data.phpresult);
  //                     console.log(response.data.phpresult);
  //                 }
  //             }
  //     }

  //     const navigate = useNavigate();

  //     const onAdd = () =>{
  //         if (date.length === 0) {
  //             alert("Date has been left blank!");
  //         }
  //     else if (type.length === 0) {
  //             alert("Debit/Credit has been left blank!");
  //         }   else if (amount.length === 0) {
  //             alert("Amount has been left blank!");
  //         }  else if (bankName.length === 0) {
  //             alert("Bank has been left blank!");
  //         }   else {

  //             let dra;
  //             let cra;
  //             let tamt;

  //             if(type==='Debit')
  //             {

  //                 dra=amount;
  //                 cra='';
  //                 tamt = parseFloat(totalAmountVal)-parseFloat(amount);
  //             alert(" tamt = "+parseFloat(totalAmountVal)+"-"+parseFloat(amount));
  //             }
  //             if(type==='Credit')
  //             {

  //                 cra=amount;
  //                 dra='';
  //                 tamt = parseFloat(totalAmountVal)+parseFloat(amount);
  //                 alert(" tamt = "+parseFloat(totalAmountVal)+"+"+parseFloat(amount));
  //             }

  //             const selectedProduct = banks.find(product => product.bank_account_id === bankName);

  //             let query="INSERT INTO `rwt_bank_statement` (`statemnt_id`, `date`, `particualrs`, `bank_name`, `bank_id`, `acc_no`, `instruments`, `dr_amount`, `cr_amount`, `total_amount`, `check`, `narration`) VALUES (NULL, '"+date+"', '"+selectedProduct.head_name+"', '"+selectedProduct.name+"', '" +bankName+"', '" +selectedProduct.account_no+"', '"+selectedmode+" - "+cheque+"', '"+dra+"', '"+cra+"', '"+tamt.toFixed(2)  +"', '0', '"+narration+"');";
  //             alert(query);
  //             const url = dbpath1+'delTank.php';
  //             let fData = new FormData();
  //             fData.append('query', query);

  //             axios.post(url, fData)
  //             .then(response => {alert(response.data);  window.location.reload();})
  //                 .catch(error => {
  //                 console.log(error.toJSON());
  //         });
  //         }
  //     }

  //     const getTotalAmount = async () => {
  //             const selectedProduct = banks.find(product => product.bank_account_id === bankName);
  //             let query = "SELECT * FROM `rwt_bank_statement` where bank_id = '"+bankName+"' ORDER BY statemnt_id DESC LIMIT 1;";
  //         /*    alert("3 + "+query); */
  //             const url = dbpath1 + 'getDynamic.php';
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
  //             else
  //             {
  //                 let query1 = "SELECT * FROM `rwt_bank_account` where bank_account_id = '"+bankName+"' ;";
  //             /*   alert("2 + "+query1); */
  //                 const url1 = dbpath1 + 'getDynamic.php';
  //                 let fData1 = new FormData();

  //                 fData1.append('query', query1);
  //                 const response = await axios.post(url1, fData1);

  //                 const fetchedAmount1 = response.data.phpresult[0]['starting_amount'];
  //                 console.log(fetchedAmount1);

  //                 setTotalAmountVal(fetchedAmount1);
  //             }
  //         } catch (error) {
  //             console.error("Error fetching data:", error);
  //         }
  //     }

  //     const getTotalAmount1 = async (bname) => {
  //         const selectedProduct = banks.find(product => product.bank_account_id === bankName);
  //         let query = "SELECT * FROM `rwt_bank_statement` where bank_id = '"+bname+"' ORDER BY statemnt_id DESC LIMIT 1;";
  //     /*   alert("1 + "+query); */
  //         const url = dbpath1 + 'getDynamic.php';
  //         let fData = new FormData();

  //     fData.append('query', query);

  //     {
  //         const response = await axios.post(url, fData);
  //         console.log("length "+response.data.phpresult.length);
  //         console.log(response.data.phpresult.length);
  //         let length = response.data.phpresult.length;
  //         if (length>0) {
  //             const fetchedAmount = response.data.phpresult[0]['total_amount'];
  //             console.log(fetchedAmount);  // Using fetched value directly
  //         /*   alert("1");
  //             alert("4 + "+query); */
  //             // Any operations you want to do with fetchedAmount
  //             // ...

  //             // Finally, if you want, you can set it to state.
  //             setTotalAmountVal(fetchedAmount);
  //         }
  //         else
  //         {
  //         /*    alert("elsecheck"); */
  //             let query1 = "SELECT * FROM `rwt_bank_account` where bank_account_id = '"+bname+"' ;";
  //         /*   alert("5 + "+query1); */
  //             const url1 = dbpath1 + 'getDynamic.php';
  //             let fData1 = new FormData();

  //             fData1.append('query', query1);
  //             const response1 = await axios.post(url1, fData1);

  //             /* alert( response1.data.phpresult[0]['starting_amount']); */

  //             const fetchedAmount1 = response1.data.phpresult[0]['starting_amount'];
  //             console.log(fetchedAmount1);
  //             setTotalAmountVal(fetchedAmount1);
  //         }
  //     }
  // }

  //     useEffect(() => {
  //         const getTotalAmount = async () => {
  //             const selectedProduct = banks.find(product => product.bank_account_id === bankName);
  //             let query = "SELECT * FROM `rwt_bank_statement` where bank_id = '"+bankName+"' ORDER BY statemnt_id DESC LIMIT 1;";
  //         /*  alert("6 + "+query); */
  //             const url = dbpath1 + 'getDynamic.php';
  //             let fData = new FormData();

  //             fData.append('query', query);

  //             try {
  //                 const response = await axios.post(url, fData);

  //                 if (response && response.data && response.data.phpresult) {
  //                     const fetchedAmount = response.data.phpresult[0]['total_amount'];
  //                     console.log(fetchedAmount);  // Using fetched value directly

  //                     // Any operations you want to do with fetchedAmount
  //                     // ...

  //                     // Finally, if you want, you can set it to state.
  //                     setTotalAmountVal(fetchedAmount);
  //                 }
  //                 else
  //                 {
  //                     let query1 = "SELECT * FROM `rwt_bank_account` where bank_account_id = '"+bankName+"' ;";
  //                     /* alert("7 + "+query1); */
  //                 const url1 = dbpath1 + 'getDynamic.php';
  //             let fData1 = new FormData();

  //             fData1.append('query', query1);
  //             const response1 = await axios.post(url1, fData1);

  //                 const fetchedAmount1 = response1.data.phpresult[0]['starting_amount'];
  //                 alert( response1.data.phpresult[0]['starting_amount']);
  //                 console.log(fetchedAmount1);  // Using fetched value directly

  //                 // Any operations you want to do with fetchedAmount
  //                 // ...

  //                 // Finally, if you want, you can set it to state.
  //                 setTotalAmountVal(fetchedAmount1);
  //                 }
  //             } catch (error) {
  //                 console.error("Error fetching data:", error);
  //             }
  //         }

  //         getTotalAmount(); // This will call the async function
  //     }, []);

  //     function convertDateFormat(inputDate) {
  //         // Split the string into an array [yyyy, mm, dd]
  //         let parts = inputDate.split('-');

  //         // Rearrange the array and join it back to a string
  //         return parts[2] + '-' + parts[1] + '-' + parts[0];
  //     }

  //     const onDelete = async (index) => {
  //         let query="DELETE FROM `rwt_bank_statement` WHERE statemnt_id = "+index+";";
  //         /* alert(query); */
  //         const url = dbpath1+'delTank.php';
  //         let fData = new FormData();
  //         fData.append('query', query);

  //         axios.post(url, fData)
  //         .then(response => {alert(response.data);  window.location.reload();})
  //             .catch(error => {
  //             console.log(error.toJSON());
  //             });
  //     }

  //     const onSave = async (index,pstatus) => {

  //         let check = "check"+index;
  //         let cstatus=0;
  //         if(document.getElementById(check).checked === true)
  //         {
  //             cstatus=1;
  //         }
  //         let query="UPDATE rwt_bank_statement SET `check` = '"+cstatus+"', `narration` = '"+document.getElementById('status'+index).value+"' WHERE statemnt_id = "+index+";";
  //         /* alert(query); */
  //         const url = dbpath1+'delTank.php';
  //         let fData = new FormData();
  //         fData.append('query', query);

  //         axios.post(url, fData)
  //             .then(response =>{window.location.reload();})
  //             .catch(error => {
  //             console.log(error.toJSON());
  //             });
  //     }

  //     const showBank = (bankName) => {
  //         const selectedProduct = banks.find(product => product.bank_account_id === bankName);
  //         document.getElementById('showbname').innerHTML =selectedProduct.name;
  //     }

  //     const disabledropop1 = () => {
  //         document.getElementById('dropop1').disabled = true;
  //     }

  //     useEffect(() => {
  //         //loadSatement();
  //         loadBanks();
  //         loadmode();
  //     //  getTotalAmount();
  //     }, []);
  const datecache = Cookies.get("dateCookies");
  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center">Bank Statement Entry</h2>
        <h3 id="showbname" className="mt-3 text-center">
          - select bank first -
        </h3>
        {/*  <b> Date : {convertDateFormat(datecache)}</b> */}

        <div>
          <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Date</th>
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
                  <input
                    type="date"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Date"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </td>
                <td scope="row">
                  <select
                    class="form-select editableInput bigFontWeight"
                    aria-label="Default select example"
                    value={bankName}
                    // onChange={(e) => {
                    //   setBankName(e.target.value);
                    //   loadSatement(e.target.value);
                    //   showBank(e.target.value);
                    //   getTotalAmount1(
                    //     e.target.value
                    //   ); /*  setSelectedValues(e.target.value); */
                    // }}
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
                      ); /*  setSelectedValues(e.target.value); */
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
                    // onChange={(e) => {
                    //   setType(e.target.value);
                    //   setLabel1(e.target.value);
                    //   disabledropop1(); /*  setSelectedValues(e.target.value); */
                    // }}
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
                //    onClick={onAdd}
                   >
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br></br>
        <div>
          <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Sr</th>
                <th className="tablebg">Date</th>
                {/*  <th className='tablebg'>Bank-Particualr</th> */}
                <th className="tablebg">Mode</th>
                <th className="tablebg">
                  Debit<br></br> (outward)
                </th>
                <th className="tablebg">
                  Credit<br></br> (inward)
                </th>
                <th className="tablebg">Balance</th>
                {/*   <th className='tablebg'>Check</th>
                                <th className='tablebg'>Narration</th> */}
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {Statement.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td>{index + 1}</td>
                  <td>{res.date}</td>
                  {/*    <td>{res.bank_name} - {res.acc_no} - {res.particualrs}</td> */}
                  <td>{res.instruments}</td>
                  <td>{res.dr_amount}</td>
                  <td>{res.cr_amount}</td>
                  <td>{res.total_amount}</td>
                  {/*       <td> <input style={{width:'20px', height:'20px', border:'1px solid '}} type="checkbox" id={'check'+res.statemnt_id} value='0' class="form-check-input"/> </td>
                                    
                                        <td style={{width:'200px',}}><input style={{ border:'1px solid'}} type='text' class="form-control editableInput bigFontWeight" id={"status"+res.statemnt_id}   value={inarrration[res.statemnt_id]}    onChange={(e) =>{ setInarration({...inarrration, [res.statemnt_id]:e.target.value}); }}  /> 
                                    
                                    </td>
                                        */}
                  <td style={{ width: "120px" }}>
                    <button
                      type="button"
                      style={{ height: "30px", paddingTop: "2px" }}
                      id={"data" + res.statemnt_id}
                      class="btn btn-danger"
                    //   onClick={() => 
                    //     onDelete(res.statemnt_id)}
                    >
                      Delete
                    </button>{" "}
                    &nbsp;&nbsp;
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
