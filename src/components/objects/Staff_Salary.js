import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function StaffSalary({ dbpath1 }) {
  const [banks, setBanks] = useState([]);
  const [Staff, setStaff] = useState([]);

  const [bankName, setBankName] = useState("");
  const [month, setMonth] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [narration, setNarration] = useState("");

  const [amounts, setAmounts] = useState({});

  //     function convertDateFormat(inputDate) {
  //         // Split the string into an array [yyyy, mm, dd]
  //         let parts = inputDate.split('-');

  //         // Rearrange the array and join it back to a string
  //         return parts[2] + '-' + parts[1] + '-' + parts[0];
  //     }

  //     const getTotalAmount1 = () => {
  //         return Object.values(amounts).reduce((acc, curr) => acc + curr, 0);
  //     };

  //     const loadBanks = async () => {
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

  //       const loadStaff = async () => {
  //         let query="select * from rwt_staff WHERE status='active'";

  //         /*    alert(query); */
  //            const url = dbpath1 + 'getDynamic.php';
  //            let fData = new FormData();

  //            fData.append('query', query);

  //                const response = await axios.post(url, fData);

  //                if (response && response.data) {

  //                    if (response.data.phpresult) {
  //                        setStaff(response.data.phpresult);
  //                        console.log(response.data.phpresult);
  //                    }
  //                }
  //       }

  //       const [totalAmountVal, setTotalAmountVal] = useState(null);
  //     const navigate = useNavigate();

  //     const onAdd = (index) =>{

  //         let sname = document.getElementById('sname'+index).innerHTML;
  //         let cheqNo = document.getElementById('chno'+index).value;
  //         let amount = document.getElementById('amt'+index).value;

  //         alert (sname+" - "+cheqNo+" - "+amount)
  //         if (('chno'+index).length === 0) {
  //             alert("Cheque No has been left blank!");
  //           }   else if (('amt'+index).length === 0) {
  //             alert("Amount has been left blank!");
  //           }   else {

  //             let temptotal = parseFloat(totalAmountVal) - parseFloat(amount);

  //             const selectedProduct = banks.find(product => product.bank_account_id === bankName);

  //             let query="INSERT INTO `rwt_bank_statement` (`statemnt_id`, `date`, `particualrs`, `bank_name`, `bank_id`, `acc_no`, `instruments`, `dr_amount`, `cr_amount`, `total_amount`, `check`, `narration`) VALUES (NULL, '"+datecache+"', ' TO: "+selectedProduct.head_name+"', '"+selectedProduct.name+"', '"+selectedProduct.bank_account_id+"', '"+selectedProduct.account_no+"', '"+cheqNo+"', '"+amount+"', ' ', '"+temptotal.toFixed(2)+"','0', '"+"Salary - "+sname+" - "+narration+"');";
  //              alert(query);
  //              const url = dbpath1+'delTank.php';
  //              let fData = new FormData();
  //              fData.append('query', query);

  //              axios.post(url, fData)
  //              .then(response => {alert(response.data); getTotalAmount(); })
  //                  .catch(error => {
  //                  console.log(error.toJSON());
  //           });
  //         }
  //     }

  //     const onDelete = async (index) => {
  //         let query="DELETE FROM `rwt_bank_account` WHERE bank_account_id = "+index+";";
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

  //     const setSelectedValues = (index) =>  {

  //         const selectedProduct = banks.find(product => product.bank_account_id === index);

  //         console.log(selectedProduct);

  //         if (!selectedProduct) {
  //             console.error("Invalid product index");
  //             return;
  //         }

  //        /*  setGrdae(selectedProduct.product_grade); */

  //         setAccountNo(selectedProduct.account_no);
  //       }
  //       const getTotalAmoun1 = async (bname) => {

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
  //             setTotalAmountVal(0);
  //         }
  //     } catch (error) {
  //         console.error("Error fetching data:", error);
  //     }
  // }

  // const getTotalAmount = async () => {

  //     let query = "SELECT * FROM `rwt_bank_statement` where bank_id = '"+bankName+"' ORDER BY statemnt_id DESC LIMIT 1;";

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
  //         else
  //         {
  //             setTotalAmountVal(0);
  //         }
  //     } catch (error) {
  //         console.error("Error fetching data:", error);
  //     }
  // }

  //       useEffect(() => {
  //         const getTotalAmount = async () => {

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
  //                     setTotalAmountVal(0);
  //                 }
  //             } catch (error) {
  //                 console.error("Error fetching data:", error);
  //             }
  //         }

  //         getTotalAmount(); // This will call the async function
  //     }, []);

  //     useEffect(() => {
  //         loadBanks();
  //         loadStaff();

  //       }, []);
  const datecache = Cookies.get("dateCookies");
  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded  bigFontWeight">
        <h2 className="mt-3 text-center">Staff Salary</h2>
        <span style={{ fontSize: "22px" }}>
          {" "}
          Date : 
          {/* {convertDateFormat(datecache)} */}
        </span>
        <div>
          <br></br>
          <table class="table" style={{ width: "900px" }}>
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Month</th>
                <th className="tablebg">Bank Name</th>
                <th className="tablebg">Account No</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="month"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Month"
                    onChange={(e) => setMonth(e.target.value)}
                  />
                </td>
                <td scope="row">
                  <select
                    class="form-select editableInput bigFontWeight"
                    aria-label="Default select example"
                    value={bankName}
                    // onChange={(e) => {
                    //   setBankName(e.target.value);
                    //   getTotalAmoun1(e.target.value);
                    //   setSelectedValues(e.target.value);
                    // }}
                  >
                    <option selected>- select -</option>

                    {banks.map((rest) => (
                      <option value={rest.bank_account_id}>{rest.name} </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control bigFontWeight"
                    value={accountNo}
                    placeholder="Account No"
                    onChange={(e) => setAccountNo(e.target.value)}
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br></br>
        <div>
          <br></br>
          <table class="table" style={{ width: "1100px" }}>
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Staff Name</th>
                <th className="tablebg">Cheque No</th>
                <th className="tablebg">Amount</th>
                <th className="tablebg">Narration</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {Staff.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td id={"sname" + res.staff_id}>
                    {res.first_name + " " + res.last_name}
                  </td>
                  <td>
                    <input
                      type="text"
                      id={"chno" + res.staff_id}
                      class="form-control editableInput bigFontWeight"
                      placeholder="Cheque No."
                      style={{ width: "250px" }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id={"amt" + res.staff_id}
                      class="form-control editableInput bigFontWeight"
                      placeholder="Amount"
                      onChange={(e) => {
                        const updatedAmounts = { ...amounts };
                        updatedAmounts[res.staff_id] =
                          parseFloat(e.target.value) || 0;
                        setAmounts(updatedAmounts);
                      }}
                      style={{ width: "250px" }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id={"nar" + res.staff_id}
                      class="form-control editableInput bigFontWeight"
                      placeholder="Narration"
                      onChange={(e) => {
                        setNarration(e.target.value);
                      }}
                      style={{ width: "250px" }}
                    />
                  </td>
                  <td style={{ width: "50px" }}>
                    <button
                      type="button"
                      style={{ height: "30px", paddingTop: "2px" }}
                      id={"data" + res.staff_id}
                      class="btn btn-success"
                    //   onClick={() => onAdd(res.staff_id)}
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginLeft: "490PX" }}>Total: 
            {/* {getTotalAmount1()} */}
            </div>
        </div>
      </div>
    </>
  );
}
