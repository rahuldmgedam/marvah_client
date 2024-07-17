import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Wallet_Payment({ dbpath1 }) {
  const [THistory, setTHistory] = useState([]);
  const [petrocard, setpetrocard] = useState([]);

  const [dispensing_unit_no, setdispensing_unit_no] = useState("");
  const [make, setmake] = useState("");
  const [serial_no, setserial_no] = useState("");
  const [connected_tanks, setconnected_tanks] = useState("");
  const [nozzles_in_mpd, setnozzles_in_mpd] = useState("");
  const [product, setProduct] = useState("");
  const [sr, setSr] = useState("");
  const [grdae, setGrdae] = useState("");
  const [color, setColor] = useState("");
  const [mrp, setMrp] = useState("");
  const [amount, setAmount] = useState("");
  const [volume, setPVolume] = useState("");
  const [volume1, setPVolume1] = useState("");
  const [volume2, setPVolume2] = useState("");
  const [PCSPerCase, setPCSPerCase] = useState("");
  const [icrad, setICard] = useState("");

  //     const loadPetroCard = async () => {

  //       let query="select * from rwt_petro_card where status = 'Active' ORDER BY category ";

  //       /*    alert(query); */
  //          const url = dbpath1 + 'getDynamic.php';
  //          let fData = new FormData();

  //          fData.append('query', query);

  //              const response = await axios.post(url, fData);

  //              if (response && response.data) {

  //                  if (response.data.phpresult) {
  //                      setpetrocard(response.data.phpresult);
  //                      console.log(response.data.phpresult);

  //                  }
  //              }}

  //     const loadTHistory = async () => {

  //       let query="select * from petro_card_transaction where date = '"+datecache+"';";

  //          /* alert(query); */
  //          const url = dbpath1 + 'getDynamic.php';
  //          let fData = new FormData();

  //          fData.append('query', query);

  //              const response = await axios.post(url, fData);

  //              if (response && response.data) {

  //                  if (response.data.phpresult) {
  //                      setTHistory(response.data.phpresult);
  //                      console.log(response.data.phpresult);
  //                  }
  //              }

  //     }

  //     const loadPetroCardValue = async () => {

  //         let query="select sum(amount) as asum from petro_card_transaction where date = '"+datecache+"';";

  //            /* alert(query); */
  //            const url = dbpath1 + 'getDynamic.php';
  //            let fData = new FormData();

  //            fData.append('query', query);

  //                const response = await axios.post(url, fData);

  //                if (response && response.data) {

  //                    if (response.data.phpresult) {
  //                        document.getElementById('petrocard').innerHTML = response.data.phpresult[0]['asum'];
  //                        console.log(response.data.phpresult);
  //                    }
  //                }

  //       }

  //     const navigate = useNavigate();

  //     const onAdd = () =>{

  //       let ftid1 = document.getElementById('tid1').value;
  //       let ftid2 = document.getElementById('tid2').value;
  //       let ftid3 = document.getElementById('tid3').value;
  //       let currentb = document.getElementById('currentb').value;
  //       if (icrad.length === 0) {
  //         alert("Petro Card has been left blank!");
  //       }   else if (ftid1.length === 0) {
  //         alert("TID 1 has been left blank!");
  //       }   else if (currentb.length === 0) {
  //         alert("Current Batch hads been left blank!");
  //       } else if (amount.length === 0) {
  //         alert("Amount has been left blank!");
  //       } else {

  //         let query="INSERT INTO `petro_card_transaction` (`id`, `machine_name`, `batch`, `tid1`, `tid2`, `tid3`, `date`, `amount`) VALUES (NULL, '"+icrad+"', '"+currentb+"', '"+ftid1+"', '"+ftid2+"', '"+ftid3+"', '"+datecache+"', '"+amount+"');";
  //          /*  alert(query); */
  //          const url = dbpath1+'delTank.php';
  //          let fData = new FormData();
  //          fData.append('query', query);

  //          axios.post(url, fData)
  //          .then(response => {alert(response.data);  window.location.reload(); upDateBatchNo(icrad)})
  //              .catch(error => {
  //              console.log(error.toJSON());

  //       });

  //     }
  //     }

  //     const upDateBatchNo = async (index) => {
  //         var temp = parseInt(document.getElementById('currentb').value)+1;
  //         let query="UPDATE `rwt_petro_card` SET `batch` = '"+temp+"' WHERE id = "+index+";";

  //         alert(query);
  //         const url = dbpath1+'delTank.php';
  //         let fData = new FormData();
  //         fData.append('query', query);

  //         axios.post(url, fData)
  //             .then(response =>{ alert(response.data); window.location.reload();})
  //             .catch(error => {
  //             console.log(error.toJSON());
  //         });
  //     }

  //     const setICardInfo = async (index) => {
  //       const selectedProduct = petrocard.find(product => product.id === index);
  //       document.getElementById('tid1').value = selectedProduct.tid1;
  //       document.getElementById('tid2').value = selectedProduct.tid2;
  //       document.getElementById('tid3').value = selectedProduct.tid3;
  //       document.getElementById('lastb').value = selectedProduct.batch-1;
  //       document.getElementById('currentb').value = selectedProduct.batch;
  //     }

  //     const onDelete = async (index) => {
  //       let query="DELETE FROM `petro_card_transaction` WHERE id = "+index+";";

  //       alert(query);
  //       const url = dbpath1+'delTank.php';
  //       let fData = new FormData();
  //       fData.append('query', query);

  //       axios.post(url, fData)
  //           .then(response =>{ alert(response.data); window.location.reload();})
  //           .catch(error => {
  //           console.log(error.toJSON());
  //           });
  //   }

  //   const getPCData = (index) =>{
  //     try
  //     {
  //         const selectedProduct = petrocard.find(product => product.id === index);
  //         //console.log("dwdwd"+selectedProduct);
  //         return(selectedProduct.machinename);
  //     }
  //     catch
  //     {

  //     }
  //   }

  //   const onSave = async (index) => {
  //     let query="UPDATE `rwt_oil_pouches` SET `pcs_per_box` = '"+ document.getElementById('pcs'+index).value+"', `amount` = '"+document.getElementById('mrp'+index).value+"' WHERE `id` = '"+index+"';";

  //     //alert(query);
  //     const url = dbpath1+'delTank.php';
  //     let fData = new FormData();
  //     fData.append('query', query);

  //     axios.post(url, fData)
  //         .then(response =>{ alert(response.data);/*  window.location.reload(); */})
  //         .catch(error => {
  //         console.log(error.toJSON());
  //         });
  // }

  //     useEffect(() => {
  //        loadTHistory();
  //        loadPetroCard();
  //        loadPetroCardValue();
  //       }, []);
  //       const datecache = Cookies.get('dateCookies');

  //       function convertDateFormat(inputDate) {
  //         // Split the string into an array [yyyy, mm, dd]
  //         let parts = inputDate.split('-');

  //         // Rearrange the array and join it back to a string
  //         return parts[2] + '-' + parts[1] + '-' + parts[0];
  //     }
  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center">Petro Card</h2>
        <span style={{ fontSize: "22px" }}>
          {" "}
          Date : 
          {/* {convertDateFormat(datecache)} */}
        </span>
        <div>
          <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">PC Machine</th>
                <th className="tablebg">TID-1</th>
                <th className="tablebg">TID-2</th>
                <th className="tablebg">TID-3</th>
                <th className="tablebg">Last Bth</th>
                <th className="tablebg">Current Bth</th>
                <th className="tablebg">Amount</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">
                  <select
                    style={{ width: "270px" }}
                    class="form-select editableInput bigFontWeight"
                    aria-label="Default select example"
                    value={icrad}
                    // onChange={(e) => {
                    //   setICard(e.target.value);
                    //   setICardInfo(
                    //     e.target.value
                    //   ); /*  getTotalAmount1(e.target.value); */ /*  setSelectedValues(e.target.value); */
                    // }}
                  >
                    <option selected>- select -</option>

                    {petrocard.map((rest) => (
                      <option value={rest.id}>
                        {rest.batch - 1} - {rest.machinename} - {rest.tid1} -{" "}
                        {rest.tid2} - {rest.tid3}{" "}
                      </option>
                    ))}
                  </select>
                </td>
                <td scope="row">
                  <input
                    type="text"
                    id="tid1"
                    class="form-control bigFontWeight"
                    placeholder=""
                    disabled
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    id="tid2"
                    class="form-control bigFontWeight"
                    placeholder=""
                    disabled
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    id="tid3"
                    class="form-control bigFontWeight"
                    placeholder=""
                    disabled
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    id="lastb"
                    class="form-control bigFontWeight"
                    placeholder=""
                    disabled
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    id="currentb"
                    class="form-control bigFontWeight"
                    placeholder=""
                    disabled
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </td>
                <td>
                  <button type="button" class="btn btn-primary" 
                //   onClick={onAdd}
                  >
                    ADD
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
                <th className="tablebg">Sr.</th>
                <th className="tablebg">PC Machine</th>
                <th className="tablebg">TID-1</th>
                <th className="tablebg">TID-2</th>
                <th className="tablebg">TID-3</th>

                <th className="tablebg">Batch No</th>
                <th className="tablebg">Amount</th>
                {/*  <th className='tablebg'>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {THistory.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {/* {getPCData(res.machine_name)} */}
                    </td>

                  <td>{res.tid1}</td>
                  <td>{res.tid2}</td>
                  <td>{res.tid3}</td>
                  <td>{res.batch}</td>
                  <td>{res.amount}</td>

                  {/*  <td>
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.id} class="btn btn-primary" onClick={() => onDelete(res.id)}>Delete</button> &nbsp;&nbsp; 
                                           </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginLeft: "900px" }}>
            Total Amount : <span id="petrocard">0</span>
          </div>
        </div>
      </div>
    </>
  );
}
