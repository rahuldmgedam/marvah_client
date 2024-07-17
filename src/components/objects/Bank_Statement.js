import React, { Component } from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function BankStatement({ dbpath1 }) {
  const [Statement, setStatemnet] = useState([]);
  const [banks, setBanks] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState("");
  const [inarrration, setInarration] = useState("");

  const [date, setDate] = useState("");
  const [bankName, setBankName] = useState("");
  const [cheque, setCheque] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [check, setCheck] = useState("");
  const [totalAmountVal, setTotalAmountVal] = useState(null);

  //     const loadSatement = async () => {
  //         let query="select * from rwt_bank_statement where statemnt_id != 0";

  //         /*    alert(query); */
  //            const url = dbpath1 + 'getDynamic.php';
  //            let fData = new FormData();

  //            fData.append('query', query);

  //                const response = await axios.post(url, fData);

  //                if (response && response.data) {

  //                    if (response.data.phpresult) {
  //                         setStatemnet(response.data.phpresult);
  //                        const initialNarration = {};
  //                         response.data.phpresult.forEach(st => {
  //                         initialNarration[st.statemnt_id] = st.narration;

  //                       });
  //                       console.log(initialNarration);
  //                       setTimeout(function() {
  //                         loadCheckBoxes(response.data.phpresult);
  //                     }, 200  );
  //                       setInarration(initialNarration);

  //                      /*   console.log(response.data.phpresult); */
  //                    }
  //                }
  //       }

  //       function loadCheckBoxes(boxesdata){
  //         let i;
  //         for(i=0;i<boxesdata.length;i++)
  //         {
  //             if(boxesdata[i]['check']==='1')
  //             {

  //                 let check = "check"+boxesdata[i]['statemnt_id'];

  //                 document.getElementById(check).checked = true;
  //             }
  //         }

  //       }

  //       const loadBanks = async () => {
  //         let query="select * from rwt_bank_account WHERE account_status='active'";

  //         /*    alert(query); */
  //            const url = dbpath1 + 'getDynamic.php';
  //            let fData = new FormData();

  //            fData.append('query', query);

  //                const response = await axios.post(url, fData);

  //                if (response && response.data) {

  //                    if (response.data.phpresult) {
  //                        setBanks(response.data.phpresult);
  //                        console.log(response.data.phpresult);
  //                    }
  //                }
  //       }

  //     const navigate = useNavigate();

  //     const  onSearch = async () =>{
  //           {
  //             let query="select * from rwt_bank_statement where statemnt_id != 0 AND bank_id = '"+bankName+"' AND date LIKE '"+date+"-%'";

  //               /*  alert(query); */
  //                const url = dbpath1 + 'getDynamic.php';
  //                let fData = new FormData();

  //                fData.append('query', query);

  //                    const response = await axios.post(url, fData);

  //                    if (response && response.data) {

  //                        if (response.data.phpresult) {
  //                             setStatemnet(response.data.phpresult);
  //                            const initialNarration = {};
  //                             response.data.phpresult.forEach(st => {
  //                             initialNarration[st.statemnt_id] = st.narration;

  //                           });
  //                           console.log(initialNarration);
  //                           setTimeout(function() {
  //                             loadCheckBoxes(response.data.phpresult);
  //                         }, 200  );
  //                           setInarration(initialNarration);

  //                          /*   console.log(response.data.phpresult); */
  //                        }
  //                    }

  //         }
  //     }

  //     const getTotalAmount = async () => {
  //             const selectedProduct = banks.find(product => product.bank_account_id === bankName);
  //             let query = "SELECT * FROM `rwt_bank_statement` where bank_id = '"+bankName+"' ORDER BY statemnt_id DESC LIMIT 1;";

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
  //                 /* alert("7 + "+query1); */
  //             const url1 = dbpath1 + 'getDynamic.php';
  //         let fData1 = new FormData();

  //         fData1.append('query', query1);
  //         const response1 = await axios.post(url1, fData1);

  //             const fetchedAmount1 = response1.data.phpresult[0]['starting_amount'];
  //             alert( response1.data.phpresult[0]['starting_amount']);
  //             console.log(fetchedAmount1);  // Using fetched value directly

  //             // Any operations you want to do with fetchedAmount
  //             // ...

  //             // Finally, if you want, you can set it to state.
  //             setTotalAmountVal(fetchedAmount1);
  //             }
  //         } catch (error) {
  //             console.error("Error fetching data:", error);
  //         }
  //     }

  //     const getTotalAmount1 = async (bname) => {
  //         const selectedProduct = banks.find(product => product.bank_account_id === bankName);
  //         let query = "SELECT * FROM `rwt_bank_statement` where bank_id = '"+bname+"' ORDER BY statemnt_id DESC LIMIT 1;";

  //         const url = dbpath1 + 'getDynamic.php';
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
  //         else
  //         {
  //             let query1 = "SELECT * FROM `rwt_bank_account` where bank_id = '"+bankName+"' ;";
  //                 alert(query1);
  //                 const url1 = dbpath1 + 'getDynamic.php';
  //             let fData1 = new FormData();

  //             fData1.append('query', query1);
  //             const response = await axios.post(url1, fData1);

  //                 const fetchedAmount1 = response.data.phpresult[0]['starting_amount'];
  //                 console.log(fetchedAmount1);  // Using fetched value directly

  //                 // Any operations you want to do with fetchedAmount
  //                 // ...

  //                 // Finally, if you want, you can set it to state.
  //                 setTotalAmountVal(fetchedAmount1);

  //         }
  //     } catch (error) {
  //         console.error("Error fetching data:", error);
  //     }
  // }

  //       useEffect(() => {
  //         const getTotalAmount = async () => {
  //             const selectedProduct = banks.find(product => product.bank_account_id === bankName);
  //             let query = "SELECT * FROM `rwt_bank_statement` where bank_id = '"+bankName+"' ORDER BY statemnt_id DESC LIMIT 1;";

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
  //             .then(response =>{alert('Success!!')})
  //             .catch(error => {
  //             console.log(error.toJSON());
  //             });
  //     }

  //         const showNarration = (pnarration) => {

  //             document.getElementById('shownarration').innerHTML =pnarration;
  //         }

  //     useEffect(() => {

  //         loadBanks();
  //         let currentDate = new Date();
  //         let year = currentDate.getFullYear();
  //         let month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed in JS, so add 1; padStart ensures it's two digits
  //         let formattedDate = `${year}-${month}`;
  //         setDate(formattedDate );
  //       //  getTotalAmount();
  //       }, []);
  //       const datecache = Cookies.get('dateCookies');

  class ScrollableTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        tableData: [], // Initialize with your data
      };
    }
  }

  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center">Bank Statement</h2>
        <span style={{ fontSize: "22px" }}>
          {" "}
          Date :
           {/* {convertDateFormat(datecache)} */}
        </span>
        <div>
          <br></br>
          <table class="table" style={{ width: "700px" }}>
            <thead>
              <tr className="table-secondary">
                {/*   <th className='tablebg'>Date</th> */}
                <th className="tablebg">Bank-Particualr</th>
                <th className="tablebg">Month</th>

                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/*  <td><input type="date" class="form-control" placeholder="Date" onChange={(e) => setDate(e.target.value)} /></td> */}
                <td scope="row">
                  <select
                    class="form-select editableInput bigFontWeight"
                    aria-label="Default select example"
                    value={bankName}
                    // onChange={(e) => {
                    //   setBankName(e.target.value);
                    //   getTotalAmount1(
                    //     e.target.value
                    //   ); /*  setSelectedValues(e.target.value); */
                    // }}
                  >
                    <option selected>- select -</option>

                    {banks.map((rest) => (
                      <option value={rest.bank_account_id}>
                        {rest.name} - {rest.account_no}{" "}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="month"
                    class="form-control editableInput bigFontWeight"
                    placeholder="instruments"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                  />
                </td>
                {/*   <td scope="row">
                                <select  class="form-select" aria-label="Default select example" value={type}  onChange={(e) =>{ setType(e.target.value);}}>
                                    <option selected>- select -</option>
                                       
                                
                                        <option value="Debit">Debit</option>
                                        <option value="Credit">Credit</option>
                                  
                                </select>  
                            </td>
                            <td><input type="text" class="form-control" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} /></td>
                            <td><input type="text" class="form-control" placeholder="Narration" onChange={(e) => setNarration(e.target.value)} /></td> */}
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    // onClick={onSearch}
                  >
                    Search
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <span id="" style={{ fontSize: "20px" }}>
          Narration :{" "}
        </span>
        <span id="shownarration" style={{ fontSize: "20px" }}></span>
        <br></br>
        <div>
          <br></br>
          <table class="table table-container">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Sr</th>
                <th className="tablebg">Date</th>
                <th className="tablebg">Bank-Particualr</th>
                <th className="tablebg">instruments</th>
                <th className="tablebg">
                  Debit<br></br> (outward)
                </th>
                <th className="tablebg">
                  Credit<br></br> (inward)
                </th>
                <th className="tablebg">Balance</th>

                <th className="tablebg">Narration</th>
                <th className="tablebg">Check</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody id="scrollable-body">
              {Statement.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {/* {convertDateFormat(res.date)} */}
                    </td>
                  <td>
                    {res.bank_name} - {res.acc_no} - {res.particualrs}
                  </td>
                  <td>{res.instruments}</td>
                  <td>{res.dr_amount}</td>
                  <td>{res.cr_amount}</td>
                  <td>{res.total_amount}</td>

                  <td style={{ width: "200px" }}>
                    <input
                      style={{ border: "1px solid" }}
                      type="text"
                      class="form-control editableInput bigFontWeight"
                      id={"status" + res.statemnt_id}
                      value={inarrration[res.statemnt_id]}
                    //   onClick={(e) => {
                    //     showNarration(e.target.value);
                    //   }}
                    //   onChange={(e) => {
                    //     showNarration(e.target.value);
                    //     setInarration({
                    //       ...inarrration,
                    //       [res.statemnt_id]: e.target.value,
                    //     });
                    //   }}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      style={{
                        width: "20px",
                        height: "20px",
                        border: "1px solid ",
                      }}
                      type="checkbox"
                      id={"check" + res.statemnt_id}
                      value="0"
                      class="form-check-input editableInput bigFontWeight"
                    />{" "}
                  </td>

                  <td style={{ width: "120px" }}>
                    <button
                      type="button"
                      style={{ height: "30px", paddingTop: "2px" }}
                      id={"data" + res.statemnt_id}
                      class="btn btn-success"
                    //   onClick={() => onSave(res.statemnt_id)}
                    >
                      Save
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
