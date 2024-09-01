// import React from 'react'
// import '../css/Tank.css'
// import '../css/DayStart.css'
// import axios from 'axios';
// import  {useState, useEffect} from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { get } from 'react-hook-form';
// import { useForm } from 'react-hook-form';

// export default function Tank({dbpath1, setDate}) {

//   const isUserLoggedIn = Cookies.get('dateCookies');

//   const setCookies = (e) => {

//     Cookies.set('dateCookies', e);

//   }

//   const [amsToday, setamsToday] = useState('');
//   const [bspeedToday, setbspeedToday] = useState('');
//   const [hsdToday, sethsdToday] = useState('');

//   const [lastDayData, setLastDayData] = useState([]);
//   const [HandloansIncoming, setHandloansIncoming] = useState([]);
//   const [HandloansExpense, setHandloansExpense] = useState([]);
//   const [otherExpenses, setOtherExpenses] = useState([]);
//   const [Advances, setAdvances] = useState([]);

//   const [conditionType, setConditionType] = useState('');

//   const [amsLast, setamsLast] = useState('');
//   const [bspeedLast, setbspeedLast] = useState('');
//   const [hsdLast, sethsdLast] = useState('');

//   const [amsDifference, setamsDifference] = useState('0');
//   const [bspeedDifference, setbspeedDifference] = useState('0');
//   const [hsdDifference, sethsdDifference] = useState('0');

//  const getData = () => {}

// const getDayStartData = async (dateSelected, adjust) => {

//   let query = "SELECT * FROM rwt_day_start WHERE date='"+dateSelected+"';";

//   /* alert(query); */
//   const url = dbpath1 + 'getDynamic.php';
//   let fData = new FormData();
//   fData.append('query', query);

//   try {

//       const response = await axios.post(url, fData);

//       if (response && response.data) {
//           if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
//               // Data is available

//               console.log(response.data.phpresult);
//               setamsToday(response.data.phpresult[0]['ms']);
//               setbspeedToday(response.data.phpresult[0]['speed']);
//               sethsdToday(response.data.phpresult[0]['hsd'])
//               setamsDifference(response.data.phpresult[0]['msdiff']);
//               if(response.data.phpresult[0]['msdiff']>=0)
//               {
//                 document.getElementById('diffms').style.color = 'green';
//               }
//               else{
//                 document.getElementById('diffms').style.color = 'red';
//               }
//               setbspeedDifference(response.data.phpresult[0]['speeddiff']);
//               if(response.data.phpresult[0]['speeddiff']>=0)
//               {
//                 document.getElementById('diffspeed').style.color = 'green';
//               }
//               else{
//                 document.getElementById('diffspeed').style.color = 'red';
//               }
//               sethsdDifference(response.data.phpresult[0]['hsddiff']);
//               if(response.data.phpresult[0]['hsddiff']>=0)
//               {
//                 document.getElementById('diffhsd').style.color = 'green';
//               }
//               else{
//                 document.getElementById('diffhsd').style.color = 'red';
//               }
//             //  adjustDate(dateSelected,-1);

//           } else {
//               setamsToday("");
//               setbspeedToday("");
//               sethsdToday("")
//               setamsDifference(0);
//               setbspeedDifference(0);
//               sethsdDifference(0);
//               // adjustDate(dateSelected,-1);

//               // Data is not available

//           }
//       }
//   } catch (error) {
//       console.log("Please Select Proper Input");
//   }
// }

//   const boxes = document.querySelectorAll('.inputDivPrice');

//   // Attach the event listener to each box
//   boxes.forEach(function(box) {
//       box.addEventListener('click', function(event) {
//           // First, remove 'active' class from all boxes
//           boxes.forEach(b => b.classList.remove('active'));

//           // Then, add the 'active' class to the clicked box
//           event.currentTarget.classList.add('active');

//           // Stop the event from bubbling up to the document
//           event.stopPropagation();
//       });
//   });

//   // Remove the 'active' class from all boxes when clicking outside
//   document.addEventListener('click', function() {
//       boxes.forEach(box => box.classList.remove('active'));
//   });

//   //   document.getElementById('savebtn').style.backgroundColor = 'red';
//   //   let temp=    parseFloat(value) - parseFloat(amsLast);
//   //   setamsDifference(temp.toFixed(2));
//   //   if(temp>=0)
//   //   {
//   //     document.getElementById('diffms').style.color = 'green';
//   //   }
//   //   else{
//   //     document.getElementById('diffms').style.color = 'red';
//   //   }
//   // }

//   // const calcbspeedDifference = (value) => {
//   //   document.getElementById('savebtn').style.backgroundColor = 'red';
//   //   let temp=    parseFloat(value) - parseFloat(bspeedLast);
//   //   setbspeedDifference(temp.toFixed(2));

//   //   if(temp>=0)
//   //   {
//   //     document.getElementById('diffspeed').style.color = 'green';
//   //   }
//   //   else{
//   //     document.getElementById('diffspeed').style.color = 'red';
//   //   }
//   // }

//   // const calchsdDifference = (value) => {
//   //   document.getElementById('savebtn').style.backgroundColor = 'red';
//   //   let temp= parseFloat(value) - parseFloat(hsdLast);
//   //   sethsdDifference(temp.toFixed(2));
//   //   if(temp>=0)
//   //   {
//   //     document.getElementById('diffhsd').style.color = 'green';
//   //   }
//   //   else{
//   //     document.getElementById('diffhsd').style.color = 'red';
//   //   }
//   // }

//   // const onOkay = () => {
//   //   document.getElementById('savepop').style.marginLeft = '-5000px';
//   // }

//   // const onAdd = async () =>{

//   //   if (amsToday.length === 0) {
//   //     alert("A-MS been left blank!");
//   //   }   else if (bspeedToday.length === 0) {
//   //     alert("B-Speed has been left blank!");
//   //   }   else if (hsdToday.length === 0) {
//   //     alert("C-HSD has been left blank!");
//   //   }   else if (amsDifference.length === 0) {
//   //     alert("Difference Not Calculated");
//   //   } else if (bspeedDifference.length === 0) {
//   //     alert("Difference Not Calculated");
//   //   }else if (hsdDifference.length === 0) {
//   //     alert("Difference Not Calculated");
//   //   }  else{

//   //   let query = "SELECT * FROM rwt_day_start WHERE date='"+datecache+"';";

//   //   /* alert(query); */
//   //   const url = dbpath1 + 'getDynamic.php';
//   //   let fData = new FormData();
//   //   fData.append('query', query);

//   //       const response = await axios.post(url, fData);

//   //       if (response && response.data) {
//   //           if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
//   //               // Data is available
//   //               let query="UPDATE `rwt_day_start` SET `ms` = '"+amsToday+"', `speed` = '"+bspeedToday+"', `hsd` = '"+hsdToday+"', `msdiff` = '"+amsDifference+"', `speeddiff` = '"+bspeedDifference+"', `hsddiff` = '"+hsdDifference+"' WHERE `date` = '"+datecache+"';";

//   //               const url = dbpath1+'delTank.php';
//   //               let fData = new FormData();
//   //               fData.append('query', query);

//   //               axios.post(url, fData)
//   //                   .then(response => {/* alert(response.data);  *//*  window.location.reload(); */})
//   //                   .catch(error => {
//   //                   console.log(error.toJSON());
//   //            });

//   //           } else {

//   //               // Data is not available

//   //                 let query="INSERT INTO `rwt_day_start` (`day_start_id`, `date`, `ms`, `speed`, `hsd`, `msdiff`, `speeddiff`, `hsddiff`) VALUES (NULL,'"+datecache+"',"+amsToday+","+bspeedToday+","+hsdToday+","+amsDifference+","+bspeedDifference+","+hsdDifference+");";

//   //                  const url = dbpath1+'delTank.php';
//   //                  let fData = new FormData();
//   //                  fData.append('query', query);

//   //                  axios.post(url, fData)
//   //                      .then(response => {/* alert(response.data); */  /* window.location.reload(); */})
//   //                      .catch(error => {
//   //                      console.log(error.toJSON());
//   //               });
//   //           }
//   //       }
//   //   }
//   //   document.getElementById('savepop').style.marginLeft = '100px';
//   //   document.getElementById('savepop').style.marginTop = '-400px';
//   //   document.getElementById('savebtn').style.backgroundColor = 'green';
//   //   }
//   //   function convertDateFormat(inputDate) {
//   //     // Ensure inputDate is a valid string
//   //     if (typeof inputDate !== 'string') {
//   //       console.error('Invalid inputDate:', inputDate);
//   //       return '';
//   //     }

//   //     // Split the string into an array [yyyy, mm, dd]
//   //     let parts = inputDate.split('-');

//   //     // Check if the split resulted in exactly 3 parts
//   //     if (parts.length !== 3) {
//   //       console.error('Invalid date format:', inputDate);
//   //       return '';
//   //     }

//   //     // Rearrange the array and join it back to a string
//   //     return parts[2] + '-' + parts[1] + '-' + parts[0];
//   //   }

//     // Example usage
//     // const formattedDate = convertDateFormat('2023-06-26');
// //    console.log(formattedDate); // Output: 26-06-2023

//   //   function convertDateFormat(inputDate) {
//   //     // Split the string into an array [yyyy, mm, dd]
//   //     let parts = inputDate.split('-');

//   //     // Rearrange the array and join it back to a string
//   //     return parts[2] + '-' + parts[1] + '-' + parts[0];
//   // }

//   // const loadASaleMs = async () => {
//   //   let query="SELECT sum(asale) as asum FROM `sale_fuels` WHERE product_name = 'MS' AND date = '"+datecache+"'";

//   //      /* alert(query); */
//   //      const url = dbpath1 + 'getDynamic.php';
//   //      let fData = new FormData();

//   //      fData.append('query', query);

//   //          const response = await axios.post(url, fData);

//   //          if (response && response.data) {

//   //              if (response.data.phpresult) {
//   //                  document.getElementById('asale1').innerHTML = response.data.phpresult[0]['asum'];
//   //                  console.log(response.data.phpresult);
//   //              }
//   //          }
//   // }
//   // const loadASaleSpeed = async () => {
//   //   let query="SELECT sum(asale) as asum FROM `sale_fuels` WHERE product_name = 'SPEED' AND date = '"+datecache+"'";

//   //      /* alert(query); */
//   //      const url = dbpath1 + 'getDynamic.php';
//   //      let fData = new FormData();

//   //      fData.append('query', query);

//   //          const response = await axios.post(url, fData);

//   //          if (response && response.data) {

//   //              if (response.data.phpresult) {
//   //                  document.getElementById('asale2').innerHTML = response.data.phpresult[0]['asum'];
//   //                  console.log(response.data.phpresult);
//   //              }
//   //          }
//   // }
//   // const loadASaleHSD = async () => {
//   //   let query="SELECT sum(asale) as asum FROM `sale_fuels` WHERE product_name = 'HSD' AND date = '"+datecache+"'";

//   //      /* alert(query); */
//   //      const url = dbpath1 + 'getDynamic.php';
//   //      let fData = new FormData();

//   //      fData.append('query', query);

//   //          const response = await axios.post(url, fData);

//   //          if (response && response.data) {

//   //              if (response.data.phpresult) {
//   //                  document.getElementById('asale3').innerHTML = response.data.phpresult[0]['asum'];
//   //                  console.log(response.data.phpresult);
//   //              }
//   //          }
//   // }

//   // const loadSaleAmountMs = async () => {
//   //   let query="SELECT sum(amount) as asum FROM `sale_fuels` WHERE product_name = 'MS' AND date = '"+datecache+"'";

//   //      /* alert(query); */
//   //      const url = dbpath1 + 'getDynamic.php';
//   //      let fData = new FormData();

//   //      fData.append('query', query);

//   //          const response = await axios.post(url, fData);

//   //          if (response && response.data) {

//   //              if (response.data.phpresult) {
//   //                  document.getElementById('saleamount1').innerHTML = response.data.phpresult[0]['asum'];
//   //                  console.log(response.data.phpresult);
//   //              }
//   //          }
//   // }
//   // const loadSaleAmountSpeed = async () => {
//   //   let query="SELECT sum(amount) as asum FROM `sale_fuels` WHERE product_name = 'SPEED' AND date = '"+datecache+"'";

//   //      /* alert(query); */
//   //      const url = dbpath1 + 'getDynamic.php';
//   //      let fData = new FormData();

//   //      fData.append('query', query);

//   //          const response = await axios.post(url, fData);

//   //          if (response && response.data) {

//   //              if (response.data.phpresult) {
//   //                  document.getElementById('saleamount2').innerHTML = response.data.phpresult[0]['asum'];
//   //                  console.log(response.data.phpresult);
//   //              }
//   //          }
//   // }
//   // const loadSaleAmountHSD = async () => {
//   //   let query="SELECT sum(amount) as asum FROM `sale_fuels` WHERE product_name = 'HSD' AND date = '"+datecache+"'";

//   //      /* alert(query); */
//   //      const url = dbpath1 + 'getDynamic.php';
//   //      let fData = new FormData();

//   //      fData.append('query', query);

//   //          const response = await axios.post(url, fData);

//   //          if (response && response.data) {

//   //              if (response.data.phpresult) {
//   //                  document.getElementById('saleamount3').innerHTML = response.data.phpresult[0]['asum'];
//   //                  console.log(response.data.phpresult);
//   //              }
//   //          }
//   // }

//   // const loadDeposit = async () => {
//   //   let query="SELECT sum(cr_amount) as asum FROM rwt_bank_statement WHERE instruments = 'By Cash' AND date = '"+datecache+"'";

//   //      /* alert(query); */
//   //      const url = dbpath1 + 'getDynamic.php';
//   //      let fData = new FormData();

//   //      fData.append('query', query);

//   //          const response = await axios.post(url, fData);

//   //          if (response && response.data) {

//   //              if (response.data.phpresult) {
//   //                  document.getElementById('depositamount').innerHTML = response.data.phpresult[0]['asum'];
//   //                  console.log(response.data.phpresult);
//   //              }
//   //          }
//   // }

//   // const loadPetroCardValue = async () => {

//   //   let query="select sum(amount) as asum from petro_card_transaction where date = '"+datecache+"';";

//   //      /* alert(query); */
//   //      const url = dbpath1 + 'getDynamic.php';
//   //      let fData = new FormData();

//   //      fData.append('query', query);

//   //          const response = await axios.post(url, fData);

//   //          if (response && response.data) {

//   //              if (response.data.phpresult) {
//   //                  document.getElementById('petrocard').innerHTML = response.data.phpresult[0]['asum'];
//   //                  console.log(response.data.phpresult);
//   //              }
//   //          }

//   // }

//   // const loadWalletValue = async () => {

//   //   let query="select sum(amount) as asum from rwt_wallet_transactions where date = '"+datecache+"';";

//   //      /* alert(query); */
//   //      const url = dbpath1 + 'getDynamic.php';
//   //      let fData = new FormData();

//   //      fData.append('query', query);

//   //          const response = await axios.post(url, fData);

//   //          if (response && response.data) {

//   //              if (response.data.phpresult) {
//   //                  document.getElementById('wallet').innerHTML = response.data.phpresult[0]['asum'];
//   //                  console.log(response.data.phpresult);
//   //              }
//   //          }

//   // }

//   // const loadCreditSale = async (value) => {
//   //   let query="SELECT sum(amount) as asum FROM rwt_credit_client WHERE date = '"+datecache+"';";

//   //   /* alert(query); */
//   //   const url = dbpath1 + 'getDynamic.php';
//   //   let fData = new FormData();

//   //   fData.append('query', query);

//   //   try {
//   //       const response = await axios.post(url, fData);

//   //       if (response && response.data) {

//   //           if (response.data.phpresult) {
//   //             document.getElementById('creditsale').innerHTML = response.data.phpresult[0]['asum'];
//   //           }
//   //       }

//   //   } catch (error) {
//   //       console.log("Please Select Proper Input");
//   //   }
//   // }

//   // const loadAdvanceReceipt = async () => {
//   //   let query="SELECT sum(cr_amount) as asum FROM rwt_bank_statement WHERE instruments = 'By Cash' AND date = '"+datecache+"'";

//   //      /* alert(query); */
//   //      const url = dbpath1 + 'getDynamic.php';
//   //      let fData = new FormData();

//   //      fData.append('query', query);

//   //          const response = await axios.post(url, fData);

//   //          if (response && response.data) {

//   //              if (response.data.phpresult) {
//   //                  document.getElementById('depositamount').innerHTML = response.data.phpresult[0]['asum'];
//   //                  console.log(response.data.phpresult);
//   //              }
//   //          }
//   // }

//   // const loadAdvances = async () => {
//   //   let query="SELECT * FROM rwt_advances_transaction WHERE date = '"+datecache+"'";

//   //      /* alert(query); */
//   //      const url = dbpath1 + 'getDynamic.php';
//   //      let fData = new FormData();

//   //      fData.append('query', query);

//   //          const response = await axios.post(url, fData);

//   //          if (response && response.data) {

//   //              if (response.data.phpresult) {
//   //                  setAdvances(response.data.phpresult);
//   //                  console.log(response.data.phpresult);
//   //              }
//   //          }
//   // }

//   // const totalIncome = () => {

//   // }

//   // useEffect(() => {

//   //   loadSaleAmountMs();
//   //   loadSaleAmountSpeed();
//   //   loadSaleAmountHSD();

//   //   loadASaleMs();
//   //   loadASaleSpeed();
//   //   loadASaleHSD();

//   //   loadDeposit();

//   //   loadAdvanceReceipt();
//   //   loadHandloanIncoming();
//   //   loadHandloanExpense();
//   //   loadPetroCardValue();
//   //   loadWalletValue();
//   //   loadCreditSale();
//   //   loadOtherExpenses();
//   //   loadAdvances();

//   //   setTimeout(totalIncome, 4000);

//   // }, []);
//   const datecache = Cookies.get('dateCookies');
//     return (

//     <>

//       <b>

//         <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>
//             <h2 className='mt-3 text-center text-green-500 text-xl'> DAY END</h2>
//             <b style={{fontSize:'20px'}}> Date :
//                {/* {convertDateFormat(datecache)} */}
//                </b>
//             <table class="table">
//               <thead>

//               </thead>
//               <tbody>
//                 <tr  >

//                   <td style={{backgroundColor:'green', color:'white'}}>Particulars</td>
//                   <td style={{backgroundColor:'green', color:'white'}}>Amount</td>
//                   <td style={{backgroundColor:'red', color:'white'}}>Particulars</td>
//                   <td style={{backgroundColor:'red', color:'white'}}>Amount</td>

//                 </tr>
//                 <tr>

//                   <td >A-MS:- <span id='asale1'>Loading..</span></td>
//                   <td id='saleamount1'>Loading..</td>
//                   <td >BANK DEPOSIT</td>
//                   <td id='depositamount'>Loading..</td>
//                 </tr>
//                 <tr>

//                   <td >B-SPEED :- <span id='asale2'>Loading..</span></td>
//                   <td id='saleamount2'>Loading..</td>
//                   <td >TOTAL POS CARD</td>
//                   <td id="wallet">Loading..</td>
//                 </tr>
//                 <tr>

//                   <td >B-HSD :- <span id='asale3'>Loading..</span> </td>
//                   <td id='saleamount3'>Loading..</td>
//                   <td >TOTAL PETRO CARD</td>
//                   <td id="petrocard">Loading..</td>
//                 </tr>
//                 <tr>

//                   <td colSpan={2}>{/* CREDIT RECEIPT */}

//                   </td>
//                   <td >CREDIT SALE</td>
//                   <td id='creditsale'>Loading..</td>
//                 </tr>
//                 <tr>

//                   <td colSpan={2}>

//                   Handloan Recived
//                   <table class="table">
//                     <tbody>
//                       {HandloansIncoming.map((res,index)=>
//                                 <tr key={index}>
//                                     <td>{res.client_name}</td>
//                                     <td>{res.amount_rcvd}</td>
//                                 </tr>
//                       )}
//                     </tbody>
//                   </table>
//                   Advances
//                   <table class="table">
//                     <tbody>
//                       {Advances.map((res,index)=>
//                                 <tr key={index}>
//                                   <td>{res.client_name}</td>
//                                   <td>{res.amount}</td>
//                                 </tr>
//                       )}
//                     </tbody>
//                   </table>

//                   </td>
//                   <td colspan='2'  >Handloan Given
//                   <table class="table">

//                   <tbody>
//                     {HandloansExpense.map((res,index)=>
//                               <tr key={index}>

//                                   <td>{res.client_name}</td>
//                                   <td>{res.amount_given}</td>

//                               </tr>
//                     )}
//                   </tbody>
//                 </table>

//                 Other Expenses
//                 <table class="table">

//                   <tbody>
//                     {otherExpenses.map((res,index)=>
//                               <tr key={index}>

//                                 <td>{res.name}</td>
//                                 <td>{res.amount}</td>

//                               </tr>
//                     )}
//                   </tbody>
//                 </table>
//                 </td>
//                 </tr>
//                <tr>

//                  {/*  <td ></td>
//                   <td ></td>
//                   <td ></td>
//                   <td ></td> */}
//                 </tr>
//                 <tr>

//                   <td >TOTAL</td>
//                   <td ><span id="totalIncome">Loading..</span></td>
//                   <td >TOTAL</td>
//                   <td ><span id="totalExpenses">Loading..</span></td>
//                 </tr>
//                 {/*  <tr>

//                   <td >Particulars</td>
//                   <td >Amount</td>
//                   <td >Particulars</td>
//                   <td >Amount</td>
//                 </tr> */}
//               </tbody>
//             </table>
//         </div>
//         </b>

//     </>
//   )
// }
import React from "react";

const DayEndReport = () => {
  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-center text-green-400 text-xl font-bold mb-4">
        DAY END
      </h2>

      <div className="flex justify-between text-black">
        {/* Left Table */}
        <table className="w-1/2 border-r border-gray-700">
          <thead className="font-bold">
            <tr className="bg-green-700 text-lg">
              <th className="py-2 text-center"></th>

              <th className="py-2 text-left">Particulars</th>
              <th className="py-2 text-center">Rate</th>
              <th className="py-2 text-center">Litres</th>
              <th className="py-2 text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">1.</td>
              <td className="py-2 border-b border-gray-700 text-left">MS:</td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">2.</td>
              <td className="py-2 border-b border-gray-700 text-left">
                SPEED:-
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>{" "}
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">3.</td>
              <td className="py-2 border-b border-gray-700  text-left">HSD:</td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">4.</td>
              <td className="py-2 border-b border-gray-700  text-left">OILS</td>
              <td className="py-2 border-b border-gray-700 text-center"></td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>{" "}
              <td className="py-2 border-b border-gray-700 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">5.</td>
              <td className="py-2 border-b border-gray-700  text-left uppercase">
              Handloan (Credit In)
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <span>
               
                </span>
              </td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 border-blue-500"
                  type="number"
                />
              </td>{" "}
              <td className="py-2 border-b border-gray-700 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">6.</td>
              <td className="py-2 border-b border-gray-700  text-left uppercase">
                Advances
              </td>
              <td className="py-2 border-b border-gray-700 text-center"></td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 border-blue-500"
                  type="number"
                />
              </td>{" "}
              <td className="py-2 border-b border-gray-700 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 border-t border-gray-700 font-bold text-center">
                TOTAL
              </td>
              <td className="py-2 border-t border-gray-700 font-bold text-center"></td>
              <td className="py-2 border-t border-gray-700 font-bold text-center"></td>
              <td className="py-2 border-t border-gray-700 font-bold text-center"></td>

              <td className="py-2 border-t border-gray-700 font-bold text-center">
                <input
                  className="w-24 border-4 border-blue-500"
                  type="number"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Right Table */}
        <table className="w-1/2 border-r border-gray-700">
          <thead className="font-bold">
            <tr className="bg-red-700 text-lg">
              <th className="py-2 text-center"></th>

              <th className="py-2 text-left">Particulars</th>
              <th className="py-2 text-center">Acc. No.</th>
              <th></th>
              {/* <th className="py-2 text-center">Litres</th> */}
              <th className="py-2 text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">1.</td>
              <td className="py-2 border-b border-gray-700 text-left">       BANK DEPOSIT</td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                {/* <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                /> */}
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">2.</td>
              <td className="py-2 border-b border-gray-700 text-left">
              TOTAL POS CARD
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                {/* <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                /> */}
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                {/* <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                /> */}
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>{" "}
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">3.</td>
              <td className="py-2 border-b border-gray-700  text-left">  TOTAL PETRO CARD</td>
              <td className="py-2 border-b border-gray-700 text-center">
                {/* <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                /> */}
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                {/* <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                /> */}
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">4.</td>
              <td className="py-2 border-b border-gray-700  text-left">  CREDIT SALE</td>
              <td className="py-2 border-b border-gray-700 text-center"></td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>{" "}
              <td className="py-2 border-b border-gray-700 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">5.</td>
              <td className="py-2 border-b border-gray-700  text-left uppercase">
              Handloan (Debit out)
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <span>
               
                </span>
              </td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 border-blue-500"
                  type="number"
                />
              </td>{" "}
              <td className="py-2 border-b border-gray-700 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">6.</td>
              <td className="py-2 border-b border-gray-700  text-left uppercase">
              Other Expenses
              </td>
              <td className="py-2 border-b border-gray-700 text-center"></td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 border-blue-500"
                  type="number"
                />
              </td>{" "}
              <td className="py-2 border-b border-gray-700 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 border-t border-gray-700 font-bold text-center">
                TOTAL
              </td>
              <td className="py-2 border-t border-gray-700 font-bold text-center"></td>
              <td className="py-2 border-t border-gray-700 font-bold text-center"></td>
              <td className="py-2 border-t border-gray-700 font-bold text-center"></td>

              <td className="py-2 border-t border-gray-700 font-bold text-center">
                <input
                  className="w-24 border-4 border-blue-500"
                  type="number"
                />
              </td>
            </tr>
          </tbody>
        </table>
        {/* <table className="w-1/2">
          <thead>
            <tr className="bg-red-700 text-lg">
              <th className="py-2 text-center">Particulars</th>
              <th className="py-2 text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">
                BANK DEPOSIT
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                Loading..
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">
                TOTAL POS CARD
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                Loading..
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">
                TOTAL PETRO CARD
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                Loading..
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">
                CREDIT SALE
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                Loading..
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">
                Handloan Given
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                Loading..
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">
                Other Expenses
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                Loading..
              </td>
            </tr>
            <tr>
              <td className="py-2 border-t border-gray-700 font-bold text-center">
                TOTAL
              </td>
              <td className="py-2 border-t border-gray-700 font-bold text-center">
                Loading..
              </td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default DayEndReport;
