import React from 'react'
import '../css/Tank.css'
import '../css/DayStart.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { get } from 'react-hook-form';
import { useForm } from 'react-hook-form';

export default function Tank({dbpath1, setDate}) {
  
  const isUserLoggedIn = Cookies.get('dateCookies');

  const setCookies = (e) => {
  
    Cookies.set('dateCookies', e);
    
  }

  const [amsToday, setamsToday] = useState('');
  const [bspeedToday, setbspeedToday] = useState('');
  const [hsdToday, sethsdToday] = useState('');

  const [lastDayData, setLastDayData] = useState([]);
  const [HandloansIncoming, setHandloansIncoming] = useState([]);
  const [HandloansExpense, setHandloansExpense] = useState([]);
  const [otherExpenses, setOtherExpenses] = useState([]);
  const [Advances, setAdvances] = useState([]);
  

  const [conditionType, setConditionType] = useState('');

  const [amsLast, setamsLast] = useState('');
  const [bspeedLast, setbspeedLast] = useState('');
  const [hsdLast, sethsdLast] = useState('');

  const [amsDifference, setamsDifference] = useState('0');
  const [bspeedDifference, setbspeedDifference] = useState('0');
  const [hsdDifference, sethsdDifference] = useState('0');

//   const adjustDate = async (currentDate, adjustment) => {
//     // Parse the date string to a Date object
  
//     let dateParts = currentDate.split('-');
//     let year = parseInt(dateParts[0], 10);
//     let month = parseInt(dateParts[1], 10) - 1;  // JavaScript months are 0-based
//     let day = parseInt(dateParts[2], 10);

//     let dateObject = new Date(year, month, day);

//     // Adjust the date
//     dateObject.setDate(dateObject.getDate() + adjustment);

//     // Construct the adjusted date string in YYYY-MM-DD format
//     let adjustedYear = dateObject.getFullYear();
//     let adjustedMonth = (dateObject.getMonth() + 1).toString().padStart(2, '0');  // Convert 0-based month back to 1-based
//     let adjustedDay = dateObject.getDate().toString().padStart(2, '0');
//     let lastdate = `${adjustedYear}-${adjustedMonth}-${adjustedDay}`;
    

//               let query1 = "SELECT * FROM rwt_day_start WHERE date='"+lastdate+"';";
    
             
//               const url1 = dbpath1 + 'getDynamic.php';
//               let fData1 = new FormData();
//               fData1.append('query', query1);
                
//               try {
//                   const response1 = await axios.post(url1, fData1);
                  
//                   if (response1 && response1.data) {
//                       if (Array.isArray(response1.data.phpresult) && response1.data.phpresult.length > 0) {
//                           // Data is available
                        
//                           console.log(response1.data.phpresult);
//                           setamsLast(response1.data.phpresult[0].ms);
//                           setbspeedLast(response1.data.phpresult[0].speed);
//                           sethsdLast(response1.data.phpresult[0].hsd);
                         
//                       } else {
//                           // Data is not available
//                       }
//                   }
//               } catch (error) {
//                   console.log("Please Select Proper Input");
//               }

// }

// const loadOtherExpenses = async () => {

//   let query="select * from rwt_daily_expenses where date = '"+datecache+"';";
         
//      /* alert(query); */
//      const url = dbpath1 + 'getDynamic.php';
//      let fData = new FormData();

//      fData.append('query', query);

//          const response = await axios.post(url, fData);
         
//          if (response && response.data) {
             
//              if (response.data.phpresult) {
//                  setOtherExpenses(response.data.phpresult); 
//                  console.log(response.data.phpresult);
//              }
//          }
  
// }

// const loadHandloanIncoming = async (value) => {
//   let query="SELECT * FROM rwt_handloan_transactions WHERE date = '"+datecache+"' AND particular= 'Recived';";
     
//   /* alert(query); */
//   const url = dbpath1 + 'getDynamic.php';
//   let fData = new FormData();

//   fData.append('query', query);

//   try {
//       const response = await axios.post(url, fData);
      
//       if (response && response.data) {
          
//           if (response.data.phpresult) {
//               setHandloansIncoming(response.data.phpresult);
//             //  console.log(response.data.phpresult);
//                }
//       }
      
//   } catch (error) {
//       console.log("Please Select Proper Input");
//   }
// }

// const loadHandloanExpense= async (value) => {
//   let query="SELECT * FROM rwt_handloan_transactions WHERE date = '"+datecache+"' AND particular= 'Given';";
     
//   /* alert(query); */
//   const url = dbpath1 + 'getDynamic.php';
//   let fData = new FormData();

//   fData.append('query', query);

//   try {
//       const response = await axios.post(url, fData);
      
//       if (response && response.data) {
          
//           if (response.data.phpresult) {
//               setHandloansExpense(response.data.phpresult);
//             //  console.log(response.data.phpresult);
//                }
//       }
      
//   } catch (error) {
//       console.log("Please Select Proper Input");
//   }
// }

// useEffect(() => {
//   getDayStartData(datecache,-1);
//  }, []); 


 const getData = () => {}

const getDayStartData = async (dateSelected, adjust) => {
  
  
  let query = "SELECT * FROM rwt_day_start WHERE date='"+dateSelected+"';";
    
  /* alert(query); */
  const url = dbpath1 + 'getDynamic.php';
  let fData = new FormData();
  fData.append('query', query);
    
  try {

      const response = await axios.post(url, fData);
      
      if (response && response.data) {
          if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
              // Data is available
            
              console.log(response.data.phpresult);
              setamsToday(response.data.phpresult[0]['ms']);
              setbspeedToday(response.data.phpresult[0]['speed']);
              sethsdToday(response.data.phpresult[0]['hsd'])
              setamsDifference(response.data.phpresult[0]['msdiff']);
              if(response.data.phpresult[0]['msdiff']>=0)
              {
                document.getElementById('diffms').style.color = 'green';
              }
              else{
                document.getElementById('diffms').style.color = 'red';
              }
              setbspeedDifference(response.data.phpresult[0]['speeddiff']);
              if(response.data.phpresult[0]['speeddiff']>=0)
              {
                document.getElementById('diffspeed').style.color = 'green';
              }
              else{
                document.getElementById('diffspeed').style.color = 'red';
              }
              sethsdDifference(response.data.phpresult[0]['hsddiff']);
              if(response.data.phpresult[0]['hsddiff']>=0)
              {
                document.getElementById('diffhsd').style.color = 'green';
              }
              else{
                document.getElementById('diffhsd').style.color = 'red';
              }
            //  adjustDate(dateSelected,-1);

          } else {
              setamsToday("");
              setbspeedToday("");
              sethsdToday("")
              setamsDifference(0);
              setbspeedDifference(0);
              sethsdDifference(0);
              // adjustDate(dateSelected,-1);


              // Data is not available
            
          }
      }
  } catch (error) {
      console.log("Please Select Proper Input");
  }
}

  const boxes = document.querySelectorAll('.inputDivPrice');

  // Attach the event listener to each box
  boxes.forEach(function(box) {
      box.addEventListener('click', function(event) {
          // First, remove 'active' class from all boxes
          boxes.forEach(b => b.classList.remove('active'));
          
          // Then, add the 'active' class to the clicked box
          event.currentTarget.classList.add('active');
          
          // Stop the event from bubbling up to the document
          event.stopPropagation();
      }); 
  });
  
  // Remove the 'active' class from all boxes when clicking outside
  document.addEventListener('click', function() {
      boxes.forEach(box => box.classList.remove('active'));
  });

  // const calcamsDifference = (value) => {
  //   document.getElementById('savebtn').style.backgroundColor = 'red';
  //   let temp=    parseFloat(value) - parseFloat(amsLast);
  //   setamsDifference(temp.toFixed(2));
  //   if(temp>=0)
  //   {
  //     document.getElementById('diffms').style.color = 'green';
  //   }
  //   else{
  //     document.getElementById('diffms').style.color = 'red';
  //   }
  // }

  // const calcbspeedDifference = (value) => {
  //   document.getElementById('savebtn').style.backgroundColor = 'red';
  //   let temp=    parseFloat(value) - parseFloat(bspeedLast);
  //   setbspeedDifference(temp.toFixed(2));
   
  //   if(temp>=0)
  //   {
  //     document.getElementById('diffspeed').style.color = 'green';
  //   }
  //   else{
  //     document.getElementById('diffspeed').style.color = 'red';
  //   }
  // }

  // const calchsdDifference = (value) => {
  //   document.getElementById('savebtn').style.backgroundColor = 'red';
  //   let temp= parseFloat(value) - parseFloat(hsdLast);
  //   sethsdDifference(temp.toFixed(2));
  //   if(temp>=0)
  //   {
  //     document.getElementById('diffhsd').style.color = 'green';
  //   }
  //   else{
  //     document.getElementById('diffhsd').style.color = 'red';
  //   }
  // }

  // const onOkay = () => {
  //   document.getElementById('savepop').style.marginLeft = '-5000px';
  // }

  // const onAdd = async () =>{

  //   if (amsToday.length === 0) {
  //     alert("A-MS been left blank!");
  //   }   else if (bspeedToday.length === 0) {
  //     alert("B-Speed has been left blank!");
  //   }   else if (hsdToday.length === 0) {
  //     alert("C-HSD has been left blank!");
  //   }   else if (amsDifference.length === 0) {
  //     alert("Difference Not Calculated");
  //   } else if (bspeedDifference.length === 0) {
  //     alert("Difference Not Calculated");
  //   }else if (hsdDifference.length === 0) {
  //     alert("Difference Not Calculated");
  //   }  else{
    
  //   let query = "SELECT * FROM rwt_day_start WHERE date='"+datecache+"';";
    
  //   /* alert(query); */
  //   const url = dbpath1 + 'getDynamic.php';
  //   let fData = new FormData();
  //   fData.append('query', query);
      
   
  //       const response = await axios.post(url, fData);
        
  //       if (response && response.data) {
  //           if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
  //               // Data is available
  //               let query="UPDATE `rwt_day_start` SET `ms` = '"+amsToday+"', `speed` = '"+bspeedToday+"', `hsd` = '"+hsdToday+"', `msdiff` = '"+amsDifference+"', `speeddiff` = '"+bspeedDifference+"', `hsddiff` = '"+hsdDifference+"' WHERE `date` = '"+datecache+"';";
                   
  //               const url = dbpath1+'delTank.php';
  //               let fData = new FormData();
  //               fData.append('query', query);
                
  //               axios.post(url, fData)
  //                   .then(response => {/* alert(response.data);  *//*  window.location.reload(); */})
  //                   .catch(error => {
  //                   console.log(error.toJSON());
  //            });
               
  
  //           } else {
               
  
  //               // Data is not available
               
          
  //                 let query="INSERT INTO `rwt_day_start` (`day_start_id`, `date`, `ms`, `speed`, `hsd`, `msdiff`, `speeddiff`, `hsddiff`) VALUES (NULL,'"+datecache+"',"+amsToday+","+bspeedToday+","+hsdToday+","+amsDifference+","+bspeedDifference+","+hsdDifference+");";
                   
  //                  const url = dbpath1+'delTank.php';
  //                  let fData = new FormData();
  //                  fData.append('query', query);
                   
  //                  axios.post(url, fData)
  //                      .then(response => {/* alert(response.data); */  /* window.location.reload(); */})
  //                      .catch(error => {
  //                      console.log(error.toJSON());
  //               });
  //           }
  //       }
  //   }
  //   document.getElementById('savepop').style.marginLeft = '100px';
  //   document.getElementById('savepop').style.marginTop = '-400px';
  //   document.getElementById('savebtn').style.backgroundColor = 'green';
  //   } 
  //   function convertDateFormat(inputDate) {
  //     // Ensure inputDate is a valid string
  //     if (typeof inputDate !== 'string') {
  //       console.error('Invalid inputDate:', inputDate);
  //       return '';
  //     }
    
  //     // Split the string into an array [yyyy, mm, dd]
  //     let parts = inputDate.split('-');
    
  //     // Check if the split resulted in exactly 3 parts
  //     if (parts.length !== 3) {
  //       console.error('Invalid date format:', inputDate);
  //       return '';
  //     }
    
  //     // Rearrange the array and join it back to a string
  //     return parts[2] + '-' + parts[1] + '-' + parts[0];
  //   }
    
    // Example usage
    // const formattedDate = convertDateFormat('2023-06-26');
//    console.log(formattedDate); // Output: 26-06-2023
    
  //   function convertDateFormat(inputDate) {
  //     // Split the string into an array [yyyy, mm, dd]
  //     let parts = inputDate.split('-');
  
  //     // Rearrange the array and join it back to a string
  //     return parts[2] + '-' + parts[1] + '-' + parts[0];
  // }

  // const loadASaleMs = async () => {
  //   let query="SELECT sum(asale) as asum FROM `sale_fuels` WHERE product_name = 'MS' AND date = '"+datecache+"'";
         
  //      /* alert(query); */
  //      const url = dbpath1 + 'getDynamic.php';
  //      let fData = new FormData();

  //      fData.append('query', query);

  //          const response = await axios.post(url, fData);
           
  //          if (response && response.data) {
               
  //              if (response.data.phpresult) {
  //                  document.getElementById('asale1').innerHTML = response.data.phpresult[0]['asum'];
  //                  console.log(response.data.phpresult);
  //              }
  //          }
  // }
  // const loadASaleSpeed = async () => {
  //   let query="SELECT sum(asale) as asum FROM `sale_fuels` WHERE product_name = 'SPEED' AND date = '"+datecache+"'";
         
  //      /* alert(query); */
  //      const url = dbpath1 + 'getDynamic.php';
  //      let fData = new FormData();

  //      fData.append('query', query);

  //          const response = await axios.post(url, fData);
           
  //          if (response && response.data) {
               
  //              if (response.data.phpresult) {
  //                  document.getElementById('asale2').innerHTML = response.data.phpresult[0]['asum'];
  //                  console.log(response.data.phpresult);
  //              }
  //          }
  // }
  // const loadASaleHSD = async () => {
  //   let query="SELECT sum(asale) as asum FROM `sale_fuels` WHERE product_name = 'HSD' AND date = '"+datecache+"'";
         
  //      /* alert(query); */
  //      const url = dbpath1 + 'getDynamic.php';
  //      let fData = new FormData();

  //      fData.append('query', query);

  //          const response = await axios.post(url, fData);
           
  //          if (response && response.data) {
               
  //              if (response.data.phpresult) {
  //                  document.getElementById('asale3').innerHTML = response.data.phpresult[0]['asum'];
  //                  console.log(response.data.phpresult);
  //              }
  //          }
  // }

  // const loadSaleAmountMs = async () => {
  //   let query="SELECT sum(amount) as asum FROM `sale_fuels` WHERE product_name = 'MS' AND date = '"+datecache+"'";
         
  //      /* alert(query); */
  //      const url = dbpath1 + 'getDynamic.php';
  //      let fData = new FormData();

  //      fData.append('query', query);

  //          const response = await axios.post(url, fData);
           
  //          if (response && response.data) {
               
  //              if (response.data.phpresult) {
  //                  document.getElementById('saleamount1').innerHTML = response.data.phpresult[0]['asum'];
  //                  console.log(response.data.phpresult);
  //              }
  //          }
  // }
  // const loadSaleAmountSpeed = async () => {
  //   let query="SELECT sum(amount) as asum FROM `sale_fuels` WHERE product_name = 'SPEED' AND date = '"+datecache+"'";
         
  //      /* alert(query); */
  //      const url = dbpath1 + 'getDynamic.php';
  //      let fData = new FormData();

  //      fData.append('query', query);

  //          const response = await axios.post(url, fData);
           
  //          if (response && response.data) {
               
  //              if (response.data.phpresult) {
  //                  document.getElementById('saleamount2').innerHTML = response.data.phpresult[0]['asum'];
  //                  console.log(response.data.phpresult);
  //              }
  //          }
  // }
  // const loadSaleAmountHSD = async () => {
  //   let query="SELECT sum(amount) as asum FROM `sale_fuels` WHERE product_name = 'HSD' AND date = '"+datecache+"'";
         
  //      /* alert(query); */
  //      const url = dbpath1 + 'getDynamic.php';
  //      let fData = new FormData();

  //      fData.append('query', query);

  //          const response = await axios.post(url, fData);
           
  //          if (response && response.data) {
               
  //              if (response.data.phpresult) {
  //                  document.getElementById('saleamount3').innerHTML = response.data.phpresult[0]['asum'];
  //                  console.log(response.data.phpresult);
  //              }
  //          }
  // }

  // const loadDeposit = async () => {
  //   let query="SELECT sum(cr_amount) as asum FROM rwt_bank_statement WHERE instruments = 'By Cash' AND date = '"+datecache+"'";
         
  //      /* alert(query); */
  //      const url = dbpath1 + 'getDynamic.php';
  //      let fData = new FormData();

  //      fData.append('query', query);

  //          const response = await axios.post(url, fData);
           
  //          if (response && response.data) {
               
  //              if (response.data.phpresult) {
  //                  document.getElementById('depositamount').innerHTML = response.data.phpresult[0]['asum'];
  //                  console.log(response.data.phpresult);
  //              }
  //          }
  // }

  // const loadPetroCardValue = async () => {

  //   let query="select sum(amount) as asum from petro_card_transaction where date = '"+datecache+"';";
           
  //      /* alert(query); */
  //      const url = dbpath1 + 'getDynamic.php';
  //      let fData = new FormData();

  //      fData.append('query', query);

  //          const response = await axios.post(url, fData);
           
  //          if (response && response.data) {
               
  //              if (response.data.phpresult) {
  //                  document.getElementById('petrocard').innerHTML = response.data.phpresult[0]['asum']; 
  //                  console.log(response.data.phpresult);
  //              }
  //          }
    
  // }

  // const loadWalletValue = async () => {

  //   let query="select sum(amount) as asum from rwt_wallet_transactions where date = '"+datecache+"';";
           
  //      /* alert(query); */
  //      const url = dbpath1 + 'getDynamic.php';
  //      let fData = new FormData();

  //      fData.append('query', query);

  //          const response = await axios.post(url, fData);
           
  //          if (response && response.data) {
               
  //              if (response.data.phpresult) {
  //                  document.getElementById('wallet').innerHTML = response.data.phpresult[0]['asum']; 
  //                  console.log(response.data.phpresult);
  //              }
  //          }
    
  // }

  // const loadCreditSale = async (value) => {
  //   let query="SELECT sum(amount) as asum FROM rwt_credit_client WHERE date = '"+datecache+"';";
       
  //   /* alert(query); */
  //   const url = dbpath1 + 'getDynamic.php';
  //   let fData = new FormData();

  //   fData.append('query', query);

  //   try {
  //       const response = await axios.post(url, fData);
        
  //       if (response && response.data) {
            
  //           if (response.data.phpresult) {
  //             document.getElementById('creditsale').innerHTML = response.data.phpresult[0]['asum']; 
  //           }
  //       }
        
  //   } catch (error) {
  //       console.log("Please Select Proper Input");
  //   }
  // }


  // const loadAdvanceReceipt = async () => {
  //   let query="SELECT sum(cr_amount) as asum FROM rwt_bank_statement WHERE instruments = 'By Cash' AND date = '"+datecache+"'";
         
  //      /* alert(query); */  
  //      const url = dbpath1 + 'getDynamic.php';
  //      let fData = new FormData();

  //      fData.append('query', query);

  //          const response = await axios.post(url, fData);
           
  //          if (response && response.data) {
               
  //              if (response.data.phpresult) {
  //                  document.getElementById('depositamount').innerHTML = response.data.phpresult[0]['asum'];
  //                  console.log(response.data.phpresult);
  //              }
  //          }
  // }

  // const loadAdvances = async () => {
  //   let query="SELECT * FROM rwt_advances_transaction WHERE date = '"+datecache+"'";
         
  //      /* alert(query); */  
  //      const url = dbpath1 + 'getDynamic.php';
  //      let fData = new FormData();

  //      fData.append('query', query);

  //          const response = await axios.post(url, fData);
           
  //          if (response && response.data) {
               
  //              if (response.data.phpresult) {
  //                  setAdvances(response.data.phpresult);
  //                  console.log(response.data.phpresult);
  //              }
  //          }
  // }

  // const totalIncome = () => {
    
  // }

  // useEffect(() => {
       
  //   loadSaleAmountMs();
  //   loadSaleAmountSpeed();
  //   loadSaleAmountHSD();

  //   loadASaleMs();
  //   loadASaleSpeed();
  //   loadASaleHSD();

  //   loadDeposit();

  //   loadAdvanceReceipt();
  //   loadHandloanIncoming();
  //   loadHandloanExpense();
  //   loadPetroCardValue();
  //   loadWalletValue();
  //   loadCreditSale();
  //   loadOtherExpenses();
  //   loadAdvances();

  //   setTimeout(totalIncome, 4000);

  // }, []); 
  const datecache = Cookies.get('dateCookies');
    return (

    <>
    

      <b>
        

        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>   
            <h2 className='mt-3 text-center'> DAY BOOK</h2>
            <b style={{fontSize:'20px'}}> Date :
               {/* {convertDateFormat(datecache)} */}
               </b>
            <table class="table">
              <thead>
                <tr class="table-dark" >
                  
                  <th  colspan="2"><center>INCOMING</center></th>
                  <th  colspan="2"><center>EXPENSES</center></th>
                  
                </tr>
              </thead>
              <tbody>
                <tr  >
                  
                  <td style={{backgroundColor:'green', color:'white'}}>Particulars</td>
                  <td style={{backgroundColor:'green', color:'white'}}>Amount</td>
                  <td style={{backgroundColor:'red', color:'white'}}>Particulars</td>
                  <td style={{backgroundColor:'red', color:'white'}}>Amount</td>
                  
                </tr>
                <tr>
                  
                  <td >A-MS:- <span id='asale1'>Loading..</span></td>
                  <td id='saleamount1'>Loading..</td>
                  <td >BANK DEPOSIT</td>
                  <td id='depositamount'>Loading..</td>
                </tr>
                <tr>
                  
                  <td >B-SPEED :- <span id='asale2'>Loading..</span></td>
                  <td id='saleamount2'>Loading..</td>
                  <td >TOTAL POS CARD</td>
                  <td id="wallet">Loading..</td>
                </tr> 
                <tr>
                  
                  <td >B-HSD :- <span id='asale3'>Loading..</span> </td>
                  <td id='saleamount3'>Loading..</td>
                  <td >TOTAL PETRO CARD</td>
                  <td id="petrocard">Loading..</td>
                </tr> 
                <tr>
                  
                  <td colSpan={2}>{/* CREDIT RECEIPT */}
                 
                  </td>
                  <td >CREDIT SALE</td>
                  <td id='creditsale'>Loading..</td>
                </tr> 
                <tr>
                  
                  <td colSpan={2}>
                    
                  Handloan Recived
                  <table class="table">
                    <tbody>
                      {HandloansIncoming.map((res,index)=>
                                <tr key={index}>
                                    <td>{res.client_name}</td>
                                    <td>{res.amount_rcvd}</td>
                                </tr>
                      )}
                    </tbody>
                  </table>
                  Advances
                  <table class="table">
                    <tbody>
                      {Advances.map((res,index)=>
                                <tr key={index}>
                                  <td>{res.client_name}</td> 
                                  <td>{res.amount}</td>
                                </tr>
                      )}
                    </tbody>
                  </table>
                  
                  
                  </td>
                  <td colspan='2'  >Handloan Given
                  <table class="table">
                  
                  <tbody>
                    {HandloansExpense.map((res,index)=>
                              <tr key={index}>
                               
                                  <td>{res.client_name}</td>
                                  <td>{res.amount_given}</td>
                                 
                              </tr>
                    )}
                  </tbody>
                </table>

                Other Expenses
                <table class="table">
                  
                  <tbody>
                    {otherExpenses.map((res,index)=>
                              <tr key={index}>
                               
                                <td>{res.name}</td>
                                <td>{res.amount}</td>
                                 
                              </tr>
                    )}
                  </tbody>
                </table>
                </td>
                </tr> 
               <tr>
                  
                 {/*  <td ></td>
                  <td ></td>
                  <td ></td>
                  <td ></td> */}
                </tr> 
                <tr>
                  
                  <td >TOTAL</td>
                  <td ><span id="totalIncome">Loading..</span></td>
                  <td >TOTAL</td>
                  <td ><span id="totalExpenses">Loading..</span></td>
                </tr> 
                {/*  <tr>
                  
                  <td >Particulars</td>
                  <td >Amount</td>
                  <td >Particulars</td>
                  <td >Amount</td>
                </tr> */}
              </tbody>
            </table>
        </div>
        </b>  
       
    </>
  )
}
