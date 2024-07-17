import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Sale_Fuels({ dbpath1 }) {
  const [banks, setBanks] = useState([]);
  const [Staff, setStaff] = useState([]);
  const [nozzlesms, setNozzlesMs] = useState([]);
  const [nozzlesspeed, setNozzlesSpeed] = useState([]);
  const [nozzleshsd, setNozzlesHsd] = useState([]);
  const [dayStartRate, setDayStartRate] = useState([]);

  const [tHistoryMS, setTHistoryMS] = useState([]);
  const [tHistorySpeed, setTHistorySpeed] = useState([]);
  const [tHistoryHSD, setTHistoryHSD] = useState([]);

  const [flagMS, setflagMS] = useState([0]);
  const [flagSpeed, setflagSpeed] = useState([0]);
  const [flagHSD, setflagHSD] = useState([0]);

  const [bankName, setBankName] = useState("");
  const [month, setMonth] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [narration, setNarration] = useState("");
  let fi = 0;

  const [amounts, setAmounts] = useState({});

  // function convertDateFormat(inputDate) {
  //     // Split the string into an array [yyyy, mm, dd]
  //     let parts = inputDate.split('-');

  //     // Rearrange the array and join it back to a string
  //     return parts[2] + '-' + parts[1] + '-' + parts[0];
  // }

  // const getDataMS = async () => {

  //     let query="select * from sale_fuels where date = '"+datecache+"' AND product_name = 'MS'";
  //     //alert(query);
  //    const url = dbpath1 + 'getDynamic.php';
  //    let fData = new FormData();

  //    fData.append('query', query);

  //    try {
  //        const response = await axios.post(url, fData);

  //        if (response && response.data) {

  //            if (response.data.phpresult) {

  //                console.log(response.data.phpresult);

  //                let query1="SELECT * FROM `pupc_nozzles` WHERE product = 'MS'";

  //                /*    alert(query); */
  //                   const url1 = dbpath1 + 'getDynamic.php';
  //                   let fData1 = new FormData();

  //                   fData1.append('query', query1);

  //                       const response1 = await axios.post(url1, fData1);

  //                       if (response1 && response1.data) {

  //                           if (response1.data.phpresult) {

  //                               console.log(response1.data.phpresult);

  //                               var d1;
  //                                 try{
  //                                     d1 = response.data.phpresult[0]['date'];
  //                                 }
  //                                 catch
  //                                 {
  //                                     d1=calcDays();
  //                                 }
  //                               // alert(d1);

  //                                if(d1===datecache)
  //                                {
  //                                     //same day data
  //                                     console.log('Today');
  //                                     setflagMS(1);
  //                                     loadTHistoryMS(response1.data.phpresult);
  //                                }
  //                                else if(d1===calcDays())
  //                                {
  //                                 console.log('yESTRDAY');
  //                                     //last day data
  //                                     setflagMS(2);
  //                                    loadYHistoryMS(response1.data.phpresult);

  //                                }
  //                                else{
  //                                 alert('Data not available');
  //                                }
  //                           }
  //                       }

  //            }
  //        }
  //    } catch (error) {
  //        console.log("Please Select Proper Input");
  //    }

  //  }

  //  const loadTHistoryMS = async (msdata) => {

  //     let query=" SELECT * FROM `sale_fuels` where date='"+datecache+"' AND product_name='MS';";

  //         /* alert(query); */
  //         const url = dbpath1 + 'getDynamic.php';
  //         let fData = new FormData();

  //         fData.append('query', query);

  //         try {
  //             const response = await axios.post(url, fData);
  //             let i=0;
  //             if (response && response.data) {

  //                 if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
  //                     setTHistoryMS(response.data.phpresult);
  //                     console.log( response.data.phpresult);
  //                     console.log('TH MS'+msdata.length);
  //                     for(i=0;i<=msdata.length;i++)
  //                     {
  //                         console.log(i+' - '+response.data.phpresult[i]['closing']);
  //                         document.getElementById("openingms"+(i+1)).value = response.data.phpresult[i]['opening'];
  //                         document.getElementById("closingms"+(i+1)).value = response.data.phpresult[i]['closing'];
  //                         document.getElementById("salems"+(i+1)).value = response.data.phpresult[i]['sale'];
  //                         document.getElementById("testingms"+(i+1)).value = response.data.phpresult[i]['testing'];
  //                         document.getElementById("asalems"+(i+1)).value = response.data.phpresult[i]['asale'];
  //                         var elements = document.getElementsByClassName("ratems");
  //                         let j = 0;
  //                         for ( j = 0; j < elements.length; j++) {
  //                             elements[j].value = response.data.phpresult[i]['rate'];
  //                         }
  //                         document.getElementById("amountms"+(i+1)).value = response.data.phpresult[i]['amount'];

  //                     }
  //                 }

  //             }

  //         } catch (error) {
  //             console.log("Please Select Proper Input");
  //         }
  // }

  // function calcDays(inputDate, daysToAdd) {
  //     // Parse the input date string into a Date object
  //     let date = new Date(datecache);

  //     // Add or subtract the specified number of days
  //     date.setDate(date.getDate() - 1);

  //     // Return the new date in standard JavaScript date format
  //     return date.toISOString().split('T')[0];
  //   }

  // const loadYHistoryMS = async (msdata) => {

  //     let query=" SELECT * FROM `sale_fuels` where date='"+calcDays()+"' AND product_name='MS';";

  //         //alert(query);

  //         const url = dbpath1 + 'getDynamic.php';
  //         let fData = new FormData();

  //         fData.append('query', query);

  //         try {
  //             const response = await axios.post(url, fData);
  //             let i=0;
  //             if (response && response.data) {

  //                 if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
  //                     setTHistoryMS(response.data.phpresult);
  //                     console.log( response.data.phpresult);
  //                   //  console.log('TH MS'+msdata.length);
  //                     for(i=0;i<=msdata.length;i++)
  //                     {
  //                        // console.log(i+' - '+response.data.phpresult[i]['closing']);
  //                         document.getElementById("openingms"+(i+1)).value = response.data.phpresult[i]['closing'];
  //                     }
  //                 }

  //             }

  //         } catch (error) {
  //             console.log("Please Select Proper Input");
  //         }
  // }

  // const loadNozzlesMs = async () => {
  //     let query="SELECT * FROM `pupc_nozzles` WHERE product = 'MS'";

  //     /*    alert(query); */
  //        const url = dbpath1 + 'getDynamic.php';
  //        let fData = new FormData();

  //        fData.append('query', query);

  //            const response = await axios.post(url, fData);

  //            if (response && response.data) {

  //                if (response.data.phpresult) {
  //                    setNozzlesMs(response.data.phpresult);
  //                    console.log(response.data.phpresult);
  //                }
  //            }
  //   }

  //   const getDataSpeed = async () => {

  //     let query="select * from sale_fuels where date = '"+datecache+"' AND product_name = 'SPEED'";  //alert(query);
  //    const url = dbpath1 + 'getDynamic.php';
  //    let fData = new FormData();

  //    fData.append('query', query);

  //    try {
  //        const response = await axios.post(url, fData);

  //        if (response && response.data) {

  //            if (response.data.phpresult) {

  //                console.log(response.data.phpresult);

  //                let query1="SELECT * FROM `pupc_nozzles` WHERE product = 'SPEED'";

  //                /*    alert(query); */
  //                   const url1 = dbpath1 + 'getDynamic.php';
  //                   let fData1 = new FormData();

  //                   fData1.append('query', query1);

  //                       const response1 = await axios.post(url1, fData1);

  //                       if (response1 && response1.data) {

  //                           if (response1.data.phpresult) {

  //                               console.log(response1.data.phpresult);

  //                               var d1;
  //                                 try{
  //                                     d1 = response.data.phpresult[0]['date'];
  //                                 }
  //                                 catch
  //                                 {
  //                                     d1=calcDays();
  //                                 }
  //                               // alert(d1);

  //                                if(d1===datecache)
  //                                {
  //                                     //same day data
  //                                     console.log('Today');
  //                                     setflagSpeed(1);
  //                                     loadTHistorySpeed(response1.data.phpresult);
  //                                }
  //                                else if(d1===calcDays())
  //                                {
  //                                 console.log('yESTRDAY');
  //                                     //last day data
  //                                     setflagSpeed(2);
  //                                    loadYHistorySpeed(response1.data.phpresult);

  //                                }
  //                                else{
  //                                 alert('Data not available');
  //                                }
  //                           }
  //                       }

  //            }
  //        }
  //    } catch (error) {
  //        console.log("Please Select Proper Input");
  //    }

  //  }

  //  const loadTHistorySpeed = async (msdata) => {

  //     let query=" SELECT * FROM `sale_fuels` where date='"+datecache+"' AND product_name='SPEED' ORDER BY `nozzle` ASC;";

  //       //  alert(query);
  //         const url = dbpath1 + 'getDynamic.php';
  //         let fData = new FormData();

  //         fData.append('query', query);

  //         try {
  //             const response = await axios.post(url, fData);
  //             let i=0;
  //             if (response && response.data) {

  //                 if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
  //                     setTHistorySpeed(response.data.phpresult);
  //                     console.log( response.data.phpresult);
  //                     console.log('TH MS'+msdata.length);
  //                     for(i=0;i<=msdata.length;i++)
  //                     {
  //                         console.log(i+' - '+response.data.phpresult[i]['opening']);
  //                         document.getElementById("openingspeed"+(i+1)).value = response.data.phpresult[i]['opening'];
  //                         document.getElementById("closingspeed"+(i+1)).value = response.data.phpresult[i]['closing'];
  //                         document.getElementById("salespeed"+(i+1)).value = response.data.phpresult[i]['sale'];
  //                         document.getElementById("testingspeed"+(i+1)).value = response.data.phpresult[i]['testing'];
  //                         document.getElementById("asalespeed"+(i+1)).value = response.data.phpresult[i]['asale'];
  //                         var elements = document.getElementsByClassName("ratespeed");
  //                         let j = 0;
  //                         for ( j = 0; j < elements.length; j++) {
  //                             elements[j].value = response.data.phpresult[i]['rate'];
  //                         }
  //                         document.getElementById("amountspeed"+(i+1)).value = response.data.phpresult[i]['amount'];

  //                     }
  //                 }

  //             }

  //         } catch (error) {
  //             console.log("Please Select Proper Input");
  //         }
  // }

  // const loadYHistorySpeed = async (msdata) => {

  //     let query=" SELECT * FROM `sale_fuels` where date='"+calcDays()+"' AND product_name='SPEED' ORDER BY `nozzle` ASC;";

  //         //alert(query);

  //         const url = dbpath1 + 'getDynamic.php';
  //         let fData = new FormData();

  //         fData.append('query', query);

  //         try {
  //             const response = await axios.post(url, fData);
  //             let i=0;
  //             if (response && response.data) {

  //                 if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
  //                     setTHistorySpeed(response.data.phpresult);
  //                     console.log( response.data.phpresult);
  //                   //  console.log('TH MS'+msdata.length);
  //                     for(i=0;i<=msdata.length;i++)
  //                     {
  //                        // console.log(i+' - '+response.data.phpresult[i]['closing']);
  //                         document.getElementById("openingspeed"+(i+1)).value = response.data.phpresult[i]['closing'];
  //                     }
  //                 }

  //             }

  //         } catch (error) {
  //             console.log("Please Select Proper Input");
  //         }
  // }

  //   const loadNozzlesSpeed = async () => {
  //     let query="SELECT * FROM `pupc_nozzles` WHERE product = 'SPEED'";

  //       /*  alert(query); */
  //        const url = dbpath1 + 'getDynamic.php';
  //        let fData = new FormData();

  //        fData.append('query', query);

  //            const response = await axios.post(url, fData);

  //            if (response && response.data) {

  //                if (response.data.phpresult) {
  //                    setNozzlesSpeed(response.data.phpresult);
  //                    console.log(response.data.phpresult);
  //                }
  //            }
  //   }

  //   const getDataHSD = async () => {
  //   // alert('getdatahsdcallled')
  //     let query="select * from sale_fuels where date = '"+datecache+"' AND product_name = 'HSD'"; //alert(query);
  //    //alert(query)
  //     const url = dbpath1 + 'getDynamic.php';
  //    let fData = new FormData();

  //    fData.append('query', query);

  //    try {
  //        const response = await axios.post(url, fData);

  //        if (response && response.data) {

  //            if (response.data.phpresult) {

  //                console.log(response.data.phpresult);

  //                let query1="SELECT * FROM `pupc_nozzles` WHERE product = 'HSD'";

  //                /*    alert(query); */
  //                   const url1 = dbpath1 + 'getDynamic.php';
  //                   let fData1 = new FormData();

  //                   fData1.append('query', query1);

  //                       const response1 = await axios.post(url1, fData1);

  //                       if (response1 && response1.data) {

  //                           if (response1.data.phpresult) {

  //                               console.log(response1.data.phpresult);
  //                               var d1;
  //                                 try{
  //                                     d1 = response.data.phpresult[0]['date'];
  //                                 }
  //                                 catch
  //                                 {
  //                                     d1=calcDays();
  //                                 }

  //                                if(d1===datecache)
  //                                {
  //                                     //same day data
  //                                    // alert('Todayh');
  //                                     setflagHSD(1);
  //                                     loadTHistoryHSD(response1.data.phpresult);
  //                                }
  //                                else if(d1===calcDays())
  //                                {
  //                                // alert('yESTRDAYh');
  //                                     //last day dataa
  //                                     setflagHSD(2);
  //                                    loadYHistoryHSD(response1.data.phpresult);

  //                                }
  //                                else{
  //                                 alert('Data not available');
  //                                }
  //                           }
  //                       }

  //            }
  //        }
  //    } catch (error) {
  //       alert(error)
  //    }

  //  }

  //  const loadTHistoryHSD = async (msdata) => {

  //     let query=" SELECT * FROM `sale_fuels` where date='"+datecache+"' AND product_name='HSD' ORDER BY `nozzle` ASC;";

  //         /* alert(query); */

  //         const url = dbpath1 + 'getDynamic.php';
  //         let fData = new FormData();

  //         fData.append('query', query);

  //         try {
  //             const response = await axios.post(url, fData);
  //             let i=0;
  //             if (response && response.data) {
  //                 //alert('2');
  //                 if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0 ) {
  //                     fi=0;

  //                     setTHistoryHSD(response.data.phpresult);
  //                     console.log( response.data.phpresult);
  //                     console.log('TH MS'+msdata.length);
  //                     for(i=0;i<=msdata.length;i++)
  //                     {

  //                         document.getElementById("nozzleshsd"+(i+1)).innerHTML = response.data.phpresult[i]['nozzle'];
  //                         document.getElementById("openinghsd"+(i+1)).value = response.data.phpresult[i]['opening'];
  //                         document.getElementById("closinghsd"+(i+1)).value = response.data.phpresult[i]['closing'];
  //                         document.getElementById("salehsd"+(i+1)).value = response.data.phpresult[i]['sale'];
  //                         document.getElementById("testinghsd"+(i+1)).value = response.data.phpresult[i]['testing'];
  //                         document.getElementById("asalehsd"+(i+1)).value = response.data.phpresult[i]['asale'];
  //                         var elements = document.getElementsByClassName("ratehsd");
  //                         let j = 0;
  //                         for ( j = 0; j < elements.length; j++) {
  //                             elements[j].value = response.data.phpresult[i]['rate'];
  //                         }
  //                         document.getElementById("amounthsd"+(i+1)).value = response.data.phpresult[i]['amount'];

  //                         //

  //                     }

  //                   //  calcTotalhsd();

  //                   //  console.log('fired')

  //                 }

  //             }

  //         } catch (error) {
  //             console.log(error);
  //         }
  // }

  // const loadYHistoryHSD = async (msdata) => {

  //     let query=" SELECT * FROM `sale_fuels` where date='"+calcDays()+"' AND product_name='HSD' ORDER BY `nozzle` ASC;";

  //         //alert(query);

  //         const url = dbpath1 + 'getDynamic.php';
  //         let fData = new FormData();

  //         fData.append('query', query);

  //         try {
  //             const response = await axios.post(url, fData);
  //             let i=0;
  //             if (response && response.data) {

  //                 if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
  //                     setTHistoryHSD(response.data.phpresult);
  //                     console.log( response.data.phpresult);
  //                   //  console.log('TH MS'+msdata.length);
  //                     for(i=0;i<=msdata.length;i++)
  //                     {
  //                        // console.log(i+' - '+response.data.phpresult[i]['closing']);
  //                         document.getElementById("openinghsd"+(i+1)).value = response.data.phpresult[i]['closing'];
  //                     }
  //                 }

  //             }

  //         } catch (error) {
  //             console.log("Please Select Proper Input");
  //         }
  // }
  //   const loadNozzlesHsd = async () => {
  //     let query="SELECT * FROM `pupc_nozzles` WHERE product = 'HSD'";

  //     /*    alert(query); */
  //        const url = dbpath1 + 'getDynamic.php';
  //        let fData = new FormData();

  //        fData.append('query', query);

  //            const response = await axios.post(url, fData);

  //            if (response && response.data) {

  //                if (response.data.phpresult) {
  //                    setNozzlesHsd(response.data.phpresult);
  //                    console.log(response.data.phpresult);
  //                }
  //            }
  //   }

  // const getTotalAmount1 = () => {
  //     return Object.values(amounts).reduce((acc, curr) => acc + curr, 0);
  // };

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

  //   const loadStaff = async () => {
  //     let query="select * from rwt_staff WHERE status='active'";

  //     /*    alert(query); */
  //        const url = dbpath1 + 'getDynamic.php';
  //        let fData = new FormData();

  //        fData.append('query', query);

  //            const response = await axios.post(url, fData);

  //            if (response && response.data) {

  //                if (response.data.phpresult) {
  //                    setStaff(response.data.phpresult);
  //                    console.log(response.data.phpresult);
  //                }
  //            }
  //   }

  const [totalAmountVal, setTotalAmountVal] = useState(null);
  const navigate = useNavigate();

  // const onAdd = (index) =>{

  //     let sname = document.getElementById('sname'+index).innerHTML;
  //     let cheqNo = document.getElementById('chno'+index).value;
  //     let amount = document.getElementById('amt'+index).value;

  //    /*  alert (sname+" - "+cheqNo+" - "+amount) */
  //     if (('chno'+index).length === 0) {
  //         alert("Cheque No has been left blank!");
  //       }   else if (('amt'+index).length === 0) {
  //         alert("Amount has been left blank!");
  //       }   else {

  //         let temptotal = parseFloat(totalAmountVal) - parseFloat(amount);

  //         const selectedProduct = banks.find(product => product.bank_account_id === bankName);

  //         let query="INSERT INTO `rwt_bank_statement` (`statemnt_id`, `date`, `particualrs`, `bank_name`, `bank_id`, `acc_no`, `instruments`, `dr_amount`, `cr_amount`, `total_amount`, `check`, `narration`) VALUES (NULL, '"+datecache+"', ' TO: "+selectedProduct.head_name+"', '"+selectedProduct.name+"', '"+selectedProduct.bank_account_id+"', '"+selectedProduct.account_no+"', '"+cheqNo+"', '"+amount+"', ' ', '"+temptotal.toFixed(2)+"','0', '"+"Salary - "+sname+" - "+narration+"');";
  //         /*  alert(query); */
  //          const url = dbpath1+'delTank.php';
  //          let fData = new FormData();
  //          fData.append('query', query);

  //          axios.post(url, fData)
  //          .then(response => {alert(response.data); getTotalAmount(); })
  //              .catch(error => {
  //              console.log(error.toJSON());
  //       });
  //     }
  // }

  // const onDelete = async (index) => {
  //     let query="DELETE FROM `rwt_bank_account` WHERE bank_account_id = "+index+";";
  //     /* alert(query); */
  //     const url = dbpath1+'delTank.php';
  //     let fData = new FormData();
  //     fData.append('query', query);

  //     axios.post(url, fData)
  //     .then(response => {alert(response.data);  window.location.reload();})
  //         .catch(error => {
  //         console.log(error.toJSON());
  //         });
  // }

  // const setSelectedValues = (index) =>  {

  //     const selectedProduct = banks.find(product => product.bank_account_id === index);

  //     console.log(selectedProduct);

  //     if (!selectedProduct) {
  //         console.error("Invalid product index");
  //         return;
  //     }

  //    /*  setGrdae(selectedProduct.product_grade); */

  //     setAccountNo(selectedProduct.account_no);
  //   }
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

  // const getMS = async () => {

  //     let query = "select * from sale_fuels where product_name = 'MS' AND date = '"+datecache+"' AND id = (select max(id) from sale_fuels where product_name = 'MS' AND date = '"+datecache+"')";
  //     //alert(query);
  //     const url = dbpath1 + 'getDynamic.php';
  //     let fData = new FormData();

  //     fData.append('query', query);

  //     try {
  //         const response = await axios.post(url, fData);

  //         if (response && response.data && response.data.phpresult) {
  //             let i=0;
  //             for(i=0;i<nozzlesms.length;i++)
  //            {
  //                 //alert(i);
  //            }
  //         }
  //         else
  //         {
  //             setTotalAmountVal(0);
  //         }
  //     } catch (error) {
  //         console.error("Error fetching data:", error);
  //     }
  // }

  // const loadPrice = async (value) =>
  // {

  //     let query = "SELECT * FROM rwt_day_start WHERE date='"+datecache+"';";

  // /*     alert(query); */
  //   const url = dbpath1 + 'getDynamic.php';
  //   let fData = new FormData();
  //   fData.append('query', query);

  //   try {
  //       const response = await axios.post(url, fData);

  //       if (response && response.data) {
  //           if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
  //               // Data is available

  //               console.log(response.data.phpresult);
  //               setDayStartRate(response.data.phpresult);

  //               document.getElementsById('ratems').value = response.data.phpresult[0]['ms'];

  //           } else {

  //               // Data is not available

  //           }
  //       }
  //   } catch (error) {
  //       console.log("Please Select Proper Input");
  //   }
  // }

  //   useEffect(() => {
  //     const getTotalAmount = async () => {

  //         let query = "SELECT * FROM `rwt_bank_statement` where bank_id = '"+bankName+"' ORDER BY statemnt_id DESC LIMIT 1;";

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
  //             else
  //             {
  //                 setTotalAmountVal(0);
  //             }
  //         } catch (error) {
  //             console.error("Error fetching data:", error);
  //         }
  //     }

  //     getTotalAmount(); // This will call the async function
  // }, []);

  // const calculateSale = (value, nname ,product) => {
  //    /*  alert("opening"+product+nname); */
  //     let opening = document.getElementById("opening"+product+nname).value;

  //     let closing = document.getElementById("closing"+product+nname).value;

  //     let setval;

  //     setval = parseInt(closing) - parseInt(opening);

  //     if(parseInt(setval)<0)
  //     {
  //         document.getElementById("sale"+product+nname).style.color = 'red';
  //     }
  //     else{
  //         document.getElementById("sale"+product+nname).style.color = 'black';
  //     }
  //     document.getElementById("sale"+product+nname).value = setval;
  // }

  // const calculateASale = (value, nname ,product) => {
  //    /*   alert("rate"+product+nname); */
  //      let sale = document.getElementById("sale"+product+nname).value;
  //      let testing = document.getElementById("testing"+product+nname).value;
  //      let rate = document.getElementById("rate"+product).value;

  //      let setval,setamt;

  //      setval = parseInt(sale) - parseInt(testing);

  //      if(parseInt(setval)<0)
  //      {
  //          document.getElementById("asale"+product+nname).style.color = 'red';
  //      }
  //      else{
  //          document.getElementById("asale"+product+nname).style.color = 'black';
  //      }

  //      document.getElementById("asale"+product+nname).value = setval;

  //      /* alert(rate); */

  //      setamt = parseInt(setval) * parseFloat(rate);

  //      document.getElementById("amount"+product+nname).value = setamt.toFixed(2);

  //  }

  //  const calcTotalMs = async (index) => {

  //     let query = "SELECT * FROM rwt_day_start WHERE date='"+datecache+"';";
  //     const url = dbpath1 + 'getDynamic.php';
  //     let fData = new FormData();
  //     fData.append('query', query);
  //     const response = await axios.post(url, fData);
  //     if (response && response.data) {
  //        if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {

  //            let query1="SELECT * FROM `pupc_nozzles` WHERE product = 'MS'";
  //            const url1 = dbpath1 + 'getDynamic.php';
  //            let fData1 = new FormData();
  //            fData1.append('query', query1);
  //            const response1 = await axios.post(url1, fData1);
  //            if (response1.data.phpresult) {

  //     let i=0;
  //     let sum=0;
  //     let sum1=0;
  //     let sum2=0;
  //     let sum3=0;
  //     let sum4=0;
  //     for(i=0;i<response1.data.phpresult.length;i++)
  //     {
  //         sum = parseInt(document.getElementById("salems"+(i+1)).value)+parseInt(sum);
  //         document.getElementById("saletotalms").innerHTML= sum;
  //     }

  //     for(i=0;i<response1.data.phpresult.length;i++)
  //     {
  //         sum1 = parseInt(document.getElementById("testingms"+(i+1)).value)+parseInt(sum1);
  //         document.getElementById("testingtotalms").innerHTML= sum1;
  //     }

  //     for(i=0;i<response1.data.phpresult.length;i++)
  //     {
  //         sum2 = parseInt(document.getElementById("asalems"+(i+1)).value)+parseInt(sum2);
  //         document.getElementById("asaletotalms").innerHTML= sum2;
  //     }

  //     var elements = document.getElementsByClassName("ratems");
  //     for ( i = 0; i < elements.length; i++) {
  //         elements[i].value = response.data.phpresult[0]['ms'];
  //     }
  //     document.getElementById("ratetotalms").innerHTML= response.data.phpresult[0]['ms'];

  //     for(i=0;i<response1.data.phpresult.length;i++)
  //     {
  //         sum4 = parseInt(document.getElementById("amountms"+(i+1)).value)+parseInt(sum4);
  //         document.getElementById("amounttotalms").innerHTML= sum4;
  //     }
  // }}}
  //   }

  //   const calcTotalspeed = async (index) => {

  //     let query = "SELECT * FROM rwt_day_start WHERE date='"+datecache+"';";
  //     const url = dbpath1 + 'getDynamic.php';
  //     let fData = new FormData();
  //     fData.append('query', query);
  //     const response = await axios.post(url, fData);
  //     if (response && response.data) {
  //        if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {

  //            let query1="SELECT * FROM `pupc_nozzles` WHERE product = 'SPEED'";
  //            const url1 = dbpath1 + 'getDynamic.php';
  //            let fData1 = new FormData();
  //            fData1.append('query', query1);
  //            const response1 = await axios.post(url1, fData1);
  //            if (response1.data.phpresult) {

  //     let i=0;
  //     let sum=0;
  //     let sum1=0;
  //     let sum2=0;
  //     let sum3=0;
  //     let sum4=0;
  //     for(i=0;i<response1.data.phpresult.length;i++)
  //     {
  //         sum = parseInt(document.getElementById("salespeed"+(i+1)).value)+parseInt(sum);
  //         document.getElementById("saletotalspeed").innerHTML= sum;
  //     }

  //     for(i=0;i<response1.data.phpresult.length;i++)
  //     {
  //         sum1 = parseInt(document.getElementById("testingspeed"+(i+1)).value)+parseInt(sum1);
  //         document.getElementById("testingtotalspeed").innerHTML= sum1;
  //     }

  //     for(i=0;i<response1.data.phpresult.length;i++)
  //     {
  //         sum2 = parseInt(document.getElementById("asalespeed"+(i+1)).value)+parseInt(sum2);
  //         document.getElementById("asaletotalspeed").innerHTML= sum2;
  //     }

  //     var elements = document.getElementsByClassName("ratespeed");
  //     for ( i = 0; i < elements.length; i++) {
  //         elements[i].value = response.data.phpresult[0]['speed'];
  //     }
  //     document.getElementById("ratetotalspeed").innerHTML= response.data.phpresult[0]['speed'];

  //     for(i=0;i<response1.data.phpresult.length;i++)
  //     {
  //         sum4 = parseInt(document.getElementById("amountspeed"+(i+1)).value)+parseInt(sum4);
  //         document.getElementById("amounttotalspeed").innerHTML= sum4;
  //     }
  // }}}
  //   }

  //   const calcTotalhsd = async (index) => {

  //      let query = "SELECT * FROM rwt_day_start WHERE date='"+datecache+"';";
  //      const url = dbpath1 + 'getDynamic.php';
  //      let fData = new FormData();
  //      fData.append('query', query);
  //      const response = await axios.post(url, fData);
  //      if (response && response.data) {
  //         if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {

  //             let query1="SELECT * FROM `pupc_nozzles` WHERE product = 'HSD'";
  //             const url1 = dbpath1 + 'getDynamic.php';
  //             let fData1 = new FormData();
  //             fData1.append('query', query1);
  //             const response1 = await axios.post(url1, fData1);
  //             if (response1.data.phpresult) {

  //         let i=0;
  //         let sum=0;
  //         let sum1=0;
  //         let sum2=0;
  //         let sum3=0;
  //         let sum4=0;
  //         for(i=0;i<response1.data.phpresult.length;i++)
  //         {
  //             sum = parseInt(document.getElementById("salehsd"+(i+1)).value)+parseInt(sum);
  //             //alert(sum);
  //             document.getElementById("saletotalhsd").innerHTML= sum;
  //         }
  //       //  alert(2);
  //         for(i=0;i<response1.data.phpresult.length;i++)
  //         {
  //             sum1 = parseInt(document.getElementById("testinghsd"+(i+1)).value)+parseInt(sum1);
  //             //alert(sum1);
  //             document.getElementById("testingtotalhsd").innerHTML= sum1;
  //         }

  //         for(i=0;i<response1.data.phpresult.length;i++)
  //         {
  //             sum2 = parseInt(document.getElementById("asalehsd"+(i+1)).value)+parseInt(sum2);
  //             document.getElementById("asaletotalhsd").innerHTML= sum2;
  //         }

  //         var elements = document.getElementsByClassName("ratehsd");
  //         for ( i = 0; i < elements.length; i++) {
  //             elements[i].value = response.data.phpresult[0]['hsd'];
  //         }

  //         document.getElementById("ratetotalhsd").innerHTML= response.data.phpresult[0]['hsd'];

  //         for(i=0;i<response1.data.phpresult.length;i++)
  //         {
  //             sum4 = parseInt(document.getElementById("amounthsd"+(i+1)).value)+parseInt(sum4);
  //             document.getElementById("amounttotalhsd").innerHTML= sum4;
  //         }
  //     }}}
  //   }

  //   const onSaveMS = () =>{
  //     let i=0;
  //     for(i=0;i<nozzlesms.length;i++)
  //     {
  //         let query="UPDATE `pupc_nozzles` SET `op_meter_reading` = '"+ document.getElementById("closingms"+(i+1)).value +"' WHERE `nozzle_name` = '"+nozzlesms[i].nozzle_name+"'";
  //        // alert("UPDATE `pupc_nozzles` SET `op_meter_reading` = '"+ document.getElementById("closingms"+nozzlesms[i].nozzle_name).value +"' WHERE `nozzle_name` = '"+nozzlesms[i].nozzle_name+"'");
  //         /* alert(query); */
  //          const url = dbpath1+'delTank.php';
  //         let fData = new FormData();
  //         fData.append('query', query);

  //         axios.post(url, fData)
  //         .then(response => {/*  window.location.reload(); */})
  //             .catch(error => {
  //             console.log(error.toJSON());
  //             });
  //     }
  //   }

  //   const onSavespeed = () =>{
  //     let i=0;
  //     for(i=0;i<nozzlesspeed.length;i++)
  //     {
  //         let query="UPDATE `pupc_nozzles` SET `op_meter_reading` = '"+ document.getElementById("closingspeed"+(i+1)).value +"' WHERE `nozzle_name` = '"+nozzlesspeed[i].nozzle_name+"'";
  //        // alert("UPDATE `pupc_nozzles` SET `op_meter_reading` = '"+ document.getElementById("closingspeed"+nozzlesspeed[i].nozzle_name).value +"' WHERE `nozzle_name` = '"+nozzlesspeed[i].nozzle_name+"'");
  //         /* alert(query); */
  //          const url = dbpath1+'delTank.php';
  //         let fData = new FormData();
  //         fData.append('query', query);

  //         axios.post(url, fData)
  //         .then(response => {/*  window.location.reload(); */})
  //             .catch(error => {
  //             console.log(error.toJSON());
  //             });
  //     }
  //   }

  //   const onSavehsd = () =>{
  //     let i=0;
  //     for(i=0;i<nozzleshsd.length;i++)
  //     {
  //         let query="UPDATE `pupc_nozzles` SET `op_meter_reading` = '"+ document.getElementById("closinghsd"+(i+1)).value +"' WHERE `nozzle_name` = '"+nozzleshsd[i].nozzle_name+"'";
  //        // alert("UPDATE `pupc_nozzles` SET `op_meter_reading` = '"+ document.getElementById("closinghsd"+nozzleshsd[i].nozzle_name).value +"' WHERE `nozzle_name` = '"+nozzleshsd[i].nozzle_name+"'");
  //         /* alert(query); */
  //          const url = dbpath1+'delTank.php';
  //         let fData = new FormData();
  //         fData.append('query', query);

  //         axios.post(url, fData)
  //         .then(response => {/*  window.location.reload(); */})
  //             .catch(error => {
  //             console.log(error.toJSON());
  //             });
  //     }
  //   }

  //   const onSaveMsUpdate = () =>{
  //     let i = 0, temp, temp2,  flag = 0;

  //     for (i = 0; i < nozzlesms.length; i++) {
  //       // Get the input element by its ID
  //       temp = document.getElementById("closingms" + (i + 1));
  //       temp2 = document.getElementById("testingms" + (i + 1));

  //       // Check if the element exists
  //       if (temp) {
  //         // Check if the value is empty or not a number
  //         if (parseInt(temp.value.trim()) === '' || isNaN(parseInt(temp.value.trim())) || parseInt(temp2.value.trim()) === '' || isNaN(parseInt(temp2.value.trim()))) {
  //           flag = 1;
  //           break;
  //         } else {
  //        //   alert('passed');
  //           // If you want to do something when the value is not empty, you can add code here
  //         }
  //       } else {
  //         flag = 1;
  //         break;
  //       }
  //     }

  //     if(flag==0)
  //     {
  //          if(flagMS === 2)
  //         {
  //             for(i=0;i<nozzlesms.length;i++)
  //             {
  //                 let query="INSERT INTO `sale_fuels` (`id`, `date`, `product_name`, `nozzle`, `opening`, `closing`, `sale`, `testing`, `asale`, `rate`, `amount`) VALUES (NULL, '"+datecache+"', '"+"MS"+"', '"+nozzlesms[i].nozzle_name+"', '"+document.getElementById("openingms"+(i+1)).value+"', '"+document.getElementById("closingms"+(i+1)).value+"', '"+document.getElementById("salems"+(i+1)).value+"', '"+document.getElementById("testingms"+(i+1)).value+"', '"+document.getElementById("asalems"+(i+1)).value+"', '"+document.getElementById("ratems").value+"', '"+document.getElementById("amountms"+(i+1)).value+"');";
  //                //alert(query);
  //                 const url = dbpath1+'delTank.php';
  //                 let fData = new FormData();
  //                 fData.append('query', query);

  //                 axios.post(url, fData)
  //                 .then(response => { window.location.reload();})
  //                     .catch(error => {
  //                     console.log(error.toJSON());
  //                     });
  //             }
  //         }
  //         else if(flagMS === 1)
  //         {

  //             for(i=0;i<nozzlesms.length;i++)
  //             {
  //                 let query="UPDATE `sale_fuels` SET `opening` = '"+document.getElementById("openingms"+(i+1)).value+"', `closing` = '"+document.getElementById("closingms"+(i+1)).value+"', `sale` = '"+document.getElementById("salems"+(i+1)).value+"', `testing` = '"+document.getElementById("testingms"+(i+1)).value+"', `asale` = '"+document.getElementById("asalems"+(i+1)).value+"', `rate` = '"+document.getElementById("ratems").value+"', `amount` = '"+document.getElementById("amountms"+(i+1)).value+"' WHERE date = '"+datecache+"' AND  product_name = 'MS' AND nozzle = '"+document.getElementById('nozzlesms'+(i+1)).innerHTML+"';";
  //              //alert(query);
  //                 const url = dbpath1+'delTank.php';
  //                 let fData = new FormData();
  //                 fData.append('query', query);

  //                 axios.post(url, fData)
  //                 .then(response => { window.location.reload();})
  //                     .catch(error => {
  //                     console.log(error.toJSON());
  //                     });
  //             }
  //         }
  //         onSaveMS();
  //     }
  //     else{
  //         alert('Some Fields are empty')
  //     }
  //   }

  //   const onSavespeedUpdate = (index) =>{
  //     let i = 0, temp, temp2,  flag = 0;

  //         for (i = 0; i < nozzlesspeed.length; i++) {
  //           // Get the input element by its ID
  //           temp = document.getElementById("closingspeed" + (i + 1));
  //           temp2 = document.getElementById("testingspeed" + (i + 1));

  //           // Check if the element exists
  //           if (temp) {
  //             // Check if the value is empty or not a number
  //             if (parseInt(temp.value.trim()) === '' || isNaN(parseInt(temp.value.trim())) || parseInt(temp2.value.trim()) === '' || isNaN(parseInt(temp2.value.trim()))) {
  //               flag = 1;
  //               break;
  //             } else {
  //            //   alert('passed');
  //               // If you want to do something when the value is not empty, you can add code here
  //             }
  //           } else {
  //             flag = 1;
  //             break;
  //           }
  //         }

  //         if(flag==0)
  //         {
  //              if(flagSpeed === 2)
  //             {
  //                 for(i=0;i<nozzlesspeed.length;i++)
  //                 {
  //                     let query="INSERT INTO `sale_fuels` (`id`, `date`, `product_name`, `nozzle`, `opening`, `closing`, `sale`, `testing`, `asale`, `rate`, `amount`) VALUES (NULL, '"+datecache+"', '"+"SPEED"+"', '"+nozzlesspeed[i].nozzle_name+"', '"+document.getElementById("openingspeed"+(i+1)).value+"', '"+document.getElementById("closingspeed"+(i+1)).value+"', '"+document.getElementById("salespeed"+(i+1)).value+"', '"+document.getElementById("testingspeed"+(i+1)).value+"', '"+document.getElementById("asalespeed"+(i+1)).value+"', '"+document.getElementById("ratespeed").value+"', '"+document.getElementById("amountspeed"+(i+1)).value+"');";
  //                      //alert(query);
  //                     const url = dbpath1+'delTank.php';
  //                     let fData = new FormData();
  //                     fData.append('query', query);

  //                     axios.post(url, fData)
  //                     .then(response => { window.location.reload();})
  //                         .catch(error => {
  //                         console.log(error.toJSON());
  //                         });
  //                 }
  //             }
  //             else if(flagSpeed === 1)
  //             {

  //                 for(i=0;i<nozzlesspeed.length;i++)
  //                 {
  //                     let query="UPDATE `sale_fuels` SET `opening` = '"+document.getElementById("openingspeed"+(i+1)).value+"', `closing` = '"+document.getElementById("closingspeed"+(i+1)).value+"', `sale` = '"+document.getElementById("salespeed"+(i+1)).value+"', `testing` = '"+document.getElementById("testingspeed"+(i+1)).value+"', `asale` = '"+document.getElementById("asalespeed"+(i+1)).value+"', `rate` = '"+document.getElementById("ratespeed").value+"', `amount` = '"+document.getElementById("amountspeed"+(i+1)).value+"' WHERE date = '"+datecache+"' AND  product_name = 'SPEED' AND nozzle = '"+document.getElementById('nozzlesspeed'+(i+1)).innerHTML+"';";
  //                  //alert(query);
  //                     const url = dbpath1+'delTank.php';
  //                     let fData = new FormData();
  //                     fData.append('query', query);

  //                     axios.post(url, fData)
  //                     .then(response => { window.location.reload();})
  //                         .catch(error => {
  //                         console.log(error.toJSON());
  //                         });
  //                 }
  //             }
  //             onSavespeed();
  //         }
  //         else{
  //             alert('Some Fields are empty')
  //         }
  // }

  //     const onSavehsdUpdate = () =>{
  //         let i = 0, temp, temp2,  flag = 0;

  //         for (i = 0; i < nozzleshsd.length; i++) {
  //           // Get the input element by its ID
  //           temp = document.getElementById("closinghsd" + (i + 1));
  //           temp2 = document.getElementById("testinghsd" + (i + 1));

  //           // Check if the element exists
  //           if (temp) {
  //             // Check if the value is empty or not a number
  //             if (parseInt(temp.value.trim()) === '' || isNaN(parseInt(temp.value.trim())) || parseInt(temp2.value.trim()) === '' || isNaN(parseInt(temp2.value.trim()))) {
  //               flag = 1;
  //               break;
  //             } else {
  //            //   alert('passed');
  //               // If you want to do something when the value is not empty, you can add code here
  //             }
  //           } else {
  //             flag = 1;
  //             break;
  //           }
  //         }

  //         if(flag==0)
  //         {
  //              if(flagHSD === 2)
  //             {
  //                 for(i=0;i<nozzleshsd.length;i++)
  //                 {
  //                     let query="INSERT INTO `sale_fuels` (`id`, `date`, `product_name`, `nozzle`, `opening`, `closing`, `sale`, `testing`, `asale`, `rate`, `amount`) VALUES (NULL, '"+datecache+"', '"+"HSD"+"', '"+nozzleshsd[i].nozzle_name+"', '"+document.getElementById("openinghsd"+(i+1)).value+"', '"+document.getElementById("closinghsd"+(i+1)).value+"', '"+document.getElementById("salehsd"+(i+1)).value+"', '"+document.getElementById("testinghsd"+(i+1)).value+"', '"+document.getElementById("asalehsd"+(i+1)).value+"', '"+document.getElementById("ratehsd").value+"', '"+document.getElementById("amounthsd"+(i+1)).value+"');";

  //                      //alert(query);
  //                     const url = dbpath1+'delTank.php';
  //                     let fData = new FormData();
  //                     fData.append('query', query);

  //                     axios.post(url, fData)
  //                     .then(response => { window.location.reload();})
  //                         .catch(error => {
  //                         console.log(error.toJSON());
  //                         });
  //                 }
  //             }
  //             else if(flagHSD === 1)
  //             {

  //                 for(i=0;i<nozzleshsd.length;i++)
  //                 {
  //                     let query="UPDATE `sale_fuels` SET `opening` = '"+document.getElementById("openinghsd"+(i+1)).value+"', `closing` = '"+document.getElementById("closinghsd"+(i+1)).value+"', `sale` = '"+document.getElementById("salehsd"+(i+1)).value+"', `testing` = '"+document.getElementById("testinghsd"+(i+1)).value+"', `asale` = '"+document.getElementById("asalehsd"+(i+1)).value+"', `rate` = '"+document.getElementById("ratehsd").value+"', `amount` = '"+document.getElementById("amounthsd"+(i+1)).value+"' WHERE date = '"+datecache+"' AND  product_name = 'HSD' AND nozzle = '"+document.getElementById('nozzleshsd'+(i+1)).innerHTML+"';";
  //                  //alert(query);
  //                     const url = dbpath1+'delTank.php';
  //                     let fData = new FormData();
  //                     fData.append('query', query);

  //                     axios.post(url, fData)
  //                     .then(response => { window.location.reload();})
  //                         .catch(error => {
  //                         console.log(error.toJSON());
  //                         });
  //                 }
  //             }
  //             onSavehsd();
  //         }
  //         else{
  //             alert('Some Fields are empty')
  //         }
  //    }

  //   const markSaved = (name) => {
  //     let btn = document.getElementById(name);
  //     btn.innerHTML = 'Saved';
  //     btn.style.backgroundColor = 'red';
  //   }

  // useEffect(() => {

  //     loadPrice();
  //     loadBanks();
  //     loadStaff();

  //     getMS();

  //     loadNozzlesMs();
  //     loadNozzlesSpeed();
  //     loadNozzlesHsd();

  //     getDataMS();
  //     getDataSpeed();
  //     getDataHSD();

  //   }, []);

  //   useEffect(() => {
  //     // Function to run after 5 seconds
  //     const runAfter5Seconds = () => {
  //         calcTotalhsd();
  //         calcTotalspeed();
  //         calcTotalMs();
  //     };

  //     // Set a timeout to run the function after 5 seconds
  //     const timeoutId = setTimeout(runAfter5Seconds, 4000);

  //     // Clean up the timeout to avoid memory leaks
  //     return () => clearTimeout(timeoutId);
  //   }, []);
  //   const datecache = Cookies.get('dateCookies');
  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center">Sale Fuels</h2>
        <span style={{ fontSize: "22px" }}>
          {" "}
          Date :{/* {convertDateFormat(datecache)} */}
        </span>
        <div>
          <br></br>
          <h4>Product Name : MS</h4>

          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Nozzles</th>
                <th className="tablebg">Opening </th>
                <th className="tablebg">Closing</th>
                <th className="tablebg">Sale</th>
                <th className="tablebg">Testing</th>
                <th className="tablebg">A.sale</th>
                <th className="tablebg">Rate</th>
                <th className="tablebg">Amount</th>
              </tr>
            </thead>
            <tbody>
              {nozzlesms.map((res, index) => (
                <tr className="bigFontWeight" key={index}>
                  <td id={"nozzlesms" + (index + 1)}>{res.nozzle_name}</td>
                  <td>
                    <input
                      type="text"
                      id={"openingms" + (index + 1)}
                      class="form-control bigFontWeight"
                      placeholder="Loading.."
                      disabled
                    />
                  </td>
                  {/*  <td><input type="text" id={"amt"+res.staff_id} class="form-control" placeholder="Amount"  onChange={(e) => {
                                        const updatedAmounts = { ...amounts };
                                        updatedAmounts[res.staff_id] = parseFloat(e.target.value) || 0;
                                        setAmounts(updatedAmounts);
                                    }}   style={{width:'250px'}}    /></td> */}
                  <td>
                    <input
                      type="text"
                      id={"closingms" + (index + 1)}
                      class="form-control editableInput bigFontWeight"
                      placeholder=""
                      //    onChange={(e)=> {calculateSale(e.target.value,(index+1),"ms"); calcTotalMs((index+1));}}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id={"salems" + (index + 1)}
                      class="form-control bigFontWeight"
                      placeholder=""
                      //    onChange={(e)=> {setNarration(e.target.value)}}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id={"testingms" + (index + 1)}
                      class="form-control editableInput bigFontWeight"
                      placeholder=""
                      //    onChange={(e)=> {calculateASale(e.target.value,(index+1),"ms"); calcTotalMs(index+1);}}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      id={"asalems" + (index + 1)}
                      class="form-control bigFontWeight"
                      placeholder=""
                      onChange={(e) => {
                        setNarration(e.target.value);
                      }}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id="ratems"
                      className="form-control bigFontWeight ratems"
                      placeholder=""
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      id={"amountms" + (index + 1)}
                      class="form-control bigFontWeight"
                      placeholder=""
                      onChange={(e) => {
                        setNarration(e.target.value);
                      }}
                      disabled
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <th className="tablebg"></th>
                <th className="tablebg"> </th>
                <th className="tablebg">Total (=)</th>
                <th className="tablebg">
                  <span id="saletotalms">0</span> (-)
                </th>
                <th className="tablebg">
                  <span id="testingtotalms">0</span> (=)
                </th>
                <th className="tablebg">
                  <span id="asaletotalms">0</span> (x)
                </th>
                <th className="tablebg">
                  <span id="ratetotalms">{/* {dayStartRate[0]['ms']} */}</span>{" "}
                  (=)
                </th>
                <th className="tablebg">
                  <span id="amounttotalms">0.00</span>
                </th>
              </tr>
            </tbody>
          </table>

          <button
            type="button"
            style={{
              height: "35px",
              width: "90px",
              fontSize: "20px",
              paddingTop: "1px",
              marginTop: "12px",
              marginLeft: "90%",
              backgroundColor: "green",
            }}
            /* id={"data"+res.staff_id} */ class="btn btn-primary"
            id="button1"
            // onClick={() => {
            //   onSaveMsUpdate();
            //   markSaved("button1");
            // }}
          >
            Save
          </button>
        </div>
        <br></br>
        <div style={{ borderTop: "2px solid red" }}>
          <br></br>
          <h4>Product Name : SPEED</h4>

          <table class="table">
            <thead>
              <tr>
                <th className="tablebg">Nozzles</th>
                <th className="tablebg">Opening </th>
                <th className="tablebg">Closing</th>
                <th className="tablebg">Sale</th>
                <th className="tablebg">Testing</th>
                <th className="tablebg">A.sale</th>
                <th className="tablebg">Rate</th>
                <th className="tablebg">Amount</th>
              </tr>
            </thead>
            <tbody>
              {nozzlesspeed.map((res, index) => (
                <tr key={index} style={{ fontWeight: "700" }}>
                  <td id={"nozzlesspeed" + (index + 1)}>{res.nozzle_name}</td>
                  <td>
                    <input
                      type="text"
                      className="bigFontWeight form-control"
                      id={"openingspeed" + (index + 1)}
                      placeholder="Loading.."
                      disabled
                    />
                  </td>

                  <td>
                    <input
                      class="form-control editableInput bigFontWeight"
                      type="text"
                      id={"closingspeed" + (index + 1)}
                      placeholder=""
                    //   onChange={(e) => {
                    //     calculateSale(e.target.value, index + 1, "speed");
                    //     calcTotalspeed(index + 1);
                    //   }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control bigFontWeight"
                      id={"salespeed" + (index + 1)}
                      placeholder=""
                      onChange={(e) => {
                        setNarration(e.target.value);
                      }}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      class="form-control editableInput bigFontWeight"
                      type="text"
                      id={"testingspeed" + (index + 1)}
                      placeholder=""
                    //   onChange={(e) => {
                    //     calculateASale(e.target.value, index + 1, "speed");
                    //     calcTotalspeed(index + 1);
                    //   }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control bigFontWeight"
                      type="text"
                      id={"asalespeed" + (index + 1)}
                      placeholder=""
                      onChange={(e) => {
                        setNarration(e.target.value);
                      }}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      class="form-control bigFontWeight ratespeed"
                      type="text"
                      id="ratespeed"
                      placeholder=""
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      class="form-control bigFontWeight"
                      type="text"
                      id={"amountspeed" + (index + 1)}
                      placeholder=""
                      onChange={(e) => {
                        setNarration(e.target.value);
                      }}
                      disabled
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <th className="tablebg"></th>
                <th className="tablebg"> </th>
                <th className="tablebg">Total (=)</th>
                <th className="tablebg">
                  <span id="saletotalspeed">0</span> (-)
                </th>
                <th className="tablebg">
                  <span id="testingtotalspeed">0</span> (=)
                </th>
                <th className="tablebg">
                  <span id="asaletotalspeed">0</span> (x)
                </th>
                <th className="tablebg">
                  <span id="ratetotalspeed">
                    {/* {dayStartRate[0]['speed']} */}
                  </span>{" "}
                  (=)
                </th>
                <th className="tablebg">
                  <span id="amounttotalspeed">0.00</span>
                </th>
              </tr>
            </tbody>
          </table>

          <button
            type="button"
            style={{
              height: "35px",
              width: "90px",
              fontSize: "20px",
              paddingTop: "1px",
              marginTop: "12px",
              marginLeft: "90%",
              backgroundColor: "green",
            }}
            /* id={"data"+res.staff_id} */ class="btn btn-primary"
            id="button2"
            // onClick={() => {
            //   onSavespeedUpdate();
            //   markSaved("button2");
            // }}
          >
            Save
          </button>
        </div>

        <br></br>

        <div style={{ borderTop: "2px solid red" }}>
          <br></br>
          <h4>Product Name : HSD</h4>

          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Nozzles</th>
                <th className="tablebg">Opening </th>
                <th className="tablebg">Closing</th>
                <th className="tablebg">Sale</th>
                <th className="tablebg">Testing</th>
                <th className="tablebg">A.sale</th>
                <th className="tablebg">Rate</th>
                <th className="tablebg">Amount</th>
              </tr>
            </thead>
            <tbody>
              {nozzleshsd.map((res, index) => (
                <tr key={index}>
                  <td className="bigFontWeight" id={"nozzleshsd" + (index + 1)}>
                    {res.nozzle_name}
                  </td>
                  <td>
                    <input
                      class="form-control bigFontWeight"
                      type="text"
                      id={"openinghsd" + (index + 1)}
                      placeholder="Loading.."
                      disabled
                    />
                  </td>
                  {/*  <td><input type="text" id={"amt"+res.staff_id}  placeholder="Amount"  onChange={(e) => {
                                        const updatedAmounts = { ...amounts };
                                        updatedAmounts[res.staff_id] = parseFloat(e.target.value) || 0;
                                        setAmounts(updatedAmounts);
                                    }}   style={{width:'250px'}}    /></td> */}
                  <td>
                    <input
                      class="form-control editableInput bigFontWeight"
                      type="text"
                      id={"closinghsd" + (index + 1)}
                      placeholder=""
                    //   onChange={(e) => {
                    //     calculateSale(e.target.value, index + 1, "hsd");
                    //     calculateASale(e.target.value, index + 1, "hsd");
                    //     calcTotalhsd(index + 1);
                    //   }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control bigFontWeight"
                      type="text"
                      id={"salehsd" + (index + 1)}
                      placeholder=""
                      onChange={(e) => {
                        setNarration(e.target.value);
                      }}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      class="form-control editableInput bigFontWeight"
                      type="text"
                      id={"testinghsd" + (index + 1)}
                      placeholder=""
                    //   onChange={(e) => {
                    //     calculateASale(e.target.value, index + 1, "hsd");
                    //     calcTotalhsd(index + 1);
                    //   }}
                    />
                  </td>
                  <td>
                    <input
                      class="form-control bigFontWeight"
                      type="text"
                      id={"asalehsd" + (index + 1)}
                      placeholder=""
                      onChange={(e) => {
                        setNarration(e.target.value);
                      }}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      class="form-control bigFontWeight"
                      type="text"
                      id="ratehsd"
                      className="form-control ratehsd"
                      placeholder=""
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      class="form-control bigFontWeight"
                      type="text"
                      id={"amounthsd" + (index + 1)}
                      placeholder=""
                      onChange={(e) => {
                        setNarration(e.target.value);
                      }}
                      disabled
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <th className="tablebg"></th>
                <th className="tablebg"> </th>
                <th className="tablebg">Total (=)</th>
                <th className="tablebg">
                  <span id="saletotalhsd">0</span> (-)
                </th>
                <th className="tablebg">
                  <span id="testingtotalhsd">0</span> (=)
                </th>
                <th className="tablebg">
                  <span id="asaletotalhsd">0</span> (x)
                </th>
                <th className="tablebg">
                  <span id="ratetotalhsd">
                    {/* {dayStartRate[0]['hsd']} */}
                  </span>{" "}
                  (=)
                </th>
                <th className="tablebg">
                  <span id="amounttotalhsd">0.00</span>
                </th>
              </tr>
            </tbody>
          </table>

          <button
            type="button"
            style={{
              height: "35px",
              width: "90px",
              fontSize: "20px",
              paddingTop: "1px",
              marginTop: "12px",
              marginLeft: "90%",
              backgroundColor: "green",
            }}
            /* id={"data"+res.staff_id} */ class="btn btn-primary"
            // onClick={() => {
            //   onSavehsdUpdate();
            // }}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
