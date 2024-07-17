import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function Variartion({dbpath1}) {
  
    const [banks, setBanks] = useState([]);
    const [Staff, setStaff] = useState([]);
    const [nozzlesms, setNozzlesMs] = useState([]);
    const [nozzlesspeed, setNozzlesSpeed] = useState([]);
    const [nozzleshsd, setNozzlesHsd] = useState([]);
    const [dayStartRate, setDayStartRate] = useState([]);

    const [bankName, setBankName] = useState('');
    const [month, setMonth] = useState('');
    const [accountNo, setAccountNo] = useState('');
    const [narration, setNarration] = useState('');
    const [dateFlag, setDateFlag] = useState(0);

    const [htvariation1, sethtvariation1] = useState('');
    const [htvariation2, sethtvariation2] = useState('');
    const [htvariation3, sethtvariation3] = useState('');
    const [htvariation4, sethtvariation4] = useState('');

    const [amounts, setAmounts] = useState({});
 
    // function convertDateFormat(inputDate) {
    //     // Split the string into an array [yyyy, mm, dd]
    //     let parts = inputDate.split('-');
    
    //     // Rearrange the array and join it back to a string
    //     return parts[2] + '-' + parts[1] + '-' + parts[0];
    // }

    
    const getdate = async () => {

        let i=0;
        for(i=1;i<=4;i++)
        {
            document.getElementById('open'+i).value=0;
        }
        for(i=1;i<=4;i++)
        {
            document.getElementById('rec'+i).value=0;
        }
        for(i=1;i<=4;i++)
        {
            document.getElementById('tstk'+i).value=0;
        }
        for(i=1;i<=4;i++)
        {
            document.getElementById('asale'+i).value=0;
        }
        for(i=1;i<=4;i++)
        {
            document.getElementById('balstk'+i).value=0;
        }
       
        for(i=1;i<=4;i++)
        {
            document.getElementById('variation'+i).value=0;
        }
        for(i=1;i<=4;i++)
        {
            document.getElementById('tvariation'+i).value=0;
        }


        let query="SELECT * FROM `rwt_variation` WHERE date = '"+datecache+"'";

        /*    alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);
                let dt;
                let tempflag=0;
               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                    try
                    {
                        dt =  response.data.phpresult[0]['date'];
                    }
                    catch 
                    {
                        dt =  calcDays();
                    }
                  
                    if(dt===datecache)
                    {
                        setDateFlag(1);
                        tempflag=1;
                    }
                   // alert(tempflag);
                    
                    loadBanks(tempflag);
                    loadStaff(tempflag);
                    loadNozzlesMs(tempflag);
                    loadNozzlesSpeed(tempflag);
                    loadNozzlesHsd(tempflag);

                    //---------------
                    if(tempflag == 1)
                    {
                        loadTodayMS();
                        loadTodaySpeed();
                        loadTodayHsd();
                        loadTodayPouches();
                    }
                    else
                    {
                        loadPrice(tempflag); 

                        loadASaleMs(tempflag);
                        loadASaleSpeed(tempflag);
                        loadASaleHsd(tempflag);
                        loadASalePouches(tempflag);
    
                        //---------------
                        loadReceiptMS(tempflag);
                        loadReceiptSpeed(tempflag);
                        loadReceiptHsd(tempflag);
                        loadReceiptPouches(tempflag);
    
                        //-----------
                        loadOpenStkMs(tempflag);
                        loadOpenStkSpeed(tempflag);
                        loadOpenStkHsd(tempflag);
                        loadOpenStkPouches(tempflag);
                    }
                  

               }
      }


      const loadTodayMS = async () => {
        let query="SELECT * FROM `rwt_variation` where product = 'MS' AND date = '"+datecache+"'";
             
            /*alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
            if (response && response.data) {
                   
                document.getElementById('open1').value =  response.data.phpresult[0]['open_stk'];
                document.getElementById('rec1').value =  response.data.phpresult[0]['receipt'];
                document.getElementById('tstk1').value =  response.data.phpresult[0]['total_stk'];
                document.getElementById('asale1').value =  response.data.phpresult[0]['asale'];
                document.getElementById('balstk1').value =  response.data.phpresult[0]['bal_stk'];
                document.getElementById('abalstk1').value =  response.data.phpresult[0]['actual_bal_stk'];
                document.getElementById('variation1').value =  response.data.phpresult[0]['variation'];
                document.getElementById('tvariation1').value =  response.data.phpresult[0]['t_variation'];
                if( response.data.phpresult[0]['t_variation']<0)
                {
                    document.getElementById('tvariation1').style.color = 'red';
                }
                else{
                    document.getElementById('tvariation1').style.color = 'black';
                }
                if(response.data.phpresult[0]['variation']<0)
                {
                    document.getElementById('variation1').style.color = 'red';
                }
                else{
                    document.getElementById('variation1').style.color = 'black';
                }
                console.log(response.data.phpresult);
                

            }
      }

      const loadTodaySpeed = async () => {
        let query="SELECT * FROM `rwt_variation` where product = 'SPEED' AND date = '"+datecache+"'";
             
            /*alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
            if (response && response.data) {
                   
                document.getElementById('open2').value =  response.data.phpresult[0]['open_stk'];
                document.getElementById('rec2').value =  response.data.phpresult[0]['receipt'];
                document.getElementById('tstk2').value =  response.data.phpresult[0]['total_stk'];
                document.getElementById('asale2').value =  response.data.phpresult[0]['asale'];
                document.getElementById('balstk2').value =  response.data.phpresult[0]['bal_stk'];
                document.getElementById('abalstk2').value =  response.data.phpresult[0]['actual_bal_stk'];
                document.getElementById('variation2').value =  response.data.phpresult[0]['variation'];
                document.getElementById('tvariation2').value =  response.data.phpresult[0]['t_variation'];
                if( response.data.phpresult[0]['t_variation']<0)
                {
                    document.getElementById('tvariation2').style.color = 'red';
                }
                else{
                    document.getElementById('tvariation2').style.color = 'black';
                }
                if(response.data.phpresult[0]['variation']<0)
                {
                    document.getElementById('variation2').style.color = 'red';
                }
                else{
                    document.getElementById('variation2').style.color = 'black';
                }
                console.log(response.data.phpresult);
                

            }
      }

      const loadTodayHsd = async () => {
        let query="SELECT * FROM `rwt_variation` where product = 'HSD' AND date = '"+datecache+"'";
             
            /*alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
            if (response && response.data) {
                   
                document.getElementById('open3').value =  response.data.phpresult[0]['open_stk'];
                document.getElementById('rec3').value =  response.data.phpresult[0]['receipt'];
                document.getElementById('tstk3').value =  response.data.phpresult[0]['total_stk'];
                document.getElementById('asale3').value =  response.data.phpresult[0]['asale'];
                document.getElementById('balstk3').value =  response.data.phpresult[0]['bal_stk'];
                document.getElementById('abalstk3').value =  response.data.phpresult[0]['actual_bal_stk'];
                document.getElementById('variation3').value =  response.data.phpresult[0]['variation'];
                document.getElementById('tvariation3').value =  response.data.phpresult[0]['t_variation'];
                if( response.data.phpresult[0]['t_variation']<0)
                {
                    document.getElementById('tvariation3').style.color = 'red';
                }
                else{
                    document.getElementById('tvariation3').style.color = 'black';
                }
                if(response.data.phpresult[0]['variation']<0)
                {
                    document.getElementById('variation3').style.color = 'red';
                }
                else{
                    document.getElementById('variation3').style.color = 'black';
                }
                console.log(response.data.phpresult);
                

            }
      }

      const loadTodayPouches = async () => {
        let query="SELECT * FROM `rwt_variation` where product = 'Pouches' AND date = '"+datecache+"'";
             
            /*alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
            if (response && response.data) {
                   
                document.getElementById('open4').value =  response.data.phpresult[0]['open_stk'];
                document.getElementById('rec4').value =  response.data.phpresult[0]['receipt'];
                document.getElementById('tstk4').value =  response.data.phpresult[0]['total_stk'];
                document.getElementById('asale4').value =  response.data.phpresult[0]['asale'];
                document.getElementById('balstk4').value =  response.data.phpresult[0]['bal_stk'];
                document.getElementById('abalstk4').value =  response.data.phpresult[0]['actual_bal_stk'];
                document.getElementById('variation4').value =  response.data.phpresult[0]['variation'];
                document.getElementById('tvariation4').value =  response.data.phpresult[0]['t_variation'];
                if( response.data.phpresult[0]['t_variation']<0)
                {
                    document.getElementById('tvariation4').style.color = 'red';
                }
                else{
                    document.getElementById('tvariation4').style.color = 'black';
                }
                if(response.data.phpresult[0]['variation']<0)
                {
                    document.getElementById('variation4').style.color = 'red';
                }
                else{
                    document.getElementById('variation4').style.color = 'black';
                }
                console.log(response.data.phpresult);
                

            }
      }

    const loadNozzlesMs = async () => {
        let query="SELECT * FROM `pupc_nozzles` WHERE product = 'MS'";
             
        /*    alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       setNozzlesMs(response.data.phpresult); 
                       console.log(response.data.phpresult);
                   }
               }
      }

      const loadNozzlesSpeed = async () => {
        let query="SELECT * FROM `pupc_nozzles` WHERE product = 'SPEED'";
             
          /*  alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       setNozzlesSpeed(response.data.phpresult); 
                       console.log(response.data.phpresult);
                   }
               }
      }

      const loadNozzlesHsd = async () => {
        let query="SELECT * FROM `pupc_nozzles` WHERE product = 'HSD'";
             
        /*    alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       setNozzlesHsd(response.data.phpresult); 
                       console.log(response.data.phpresult);
                   }
               }
      }

      const loadASaleMs = async () => {
        let query="SELECT sum(asale) as asum FROM `sale_fuels` WHERE product_name = 'MS' AND date = '"+datecache+"'";
             
           /* alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       document.getElementById('asale1').value = response.data.phpresult[0]['asum'];
                       console.log(response.data.phpresult);
                   }
               }
      }

      const loadASaleSpeed = async () => {
        let query="SELECT sum(asale) as asum FROM `sale_fuels` WHERE product_name = 'SPEED' AND date = '"+datecache+"'";
             
           /* alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       document.getElementById('asale2').value = response.data.phpresult[0]['asum'];
                       console.log(response.data.phpresult);
                   }
               }
      }

      const loadASaleHsd = async () => {
        let query="SELECT sum(asale) as asum FROM `sale_fuels` WHERE product_name = 'HSD' AND date = '"+datecache+"'";
             
          /*  alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       document.getElementById('asale3').value = response.data.phpresult[0]['asum'];
                       console.log(response.data.phpresult);
                   }
               }
      }

      const loadASalePouches = async () => {
        let query="SELECT ttsa FROM `rwt_oil_pouches_retail` WHERE date = '"+datecache+"' AND id = (select max(id) from `rwt_oil_pouches_retail`)";
              
           /* alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       document.getElementById('asale4').value = response.data.phpresult[0]['ttsa'];
                       console.log(response.data.phpresult);
                   }
               }
      }

      const loadReceiptMS = async () => {
        let query="SELECT sum(tank1) as asum FROM `rwt_petrol_decantation` WHERE date = '"+datecache+"'";
             
          /*  alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       document.getElementById('rec1').value = (response.data.phpresult[0]['asum']*1000);
                       console.log(response.data.phpresult);
                   }
               }
      }

      const loadReceiptSpeed = async () => {
        let query="SELECT sum(tank2) as asum FROM `rwt_petrol_decantation` WHERE date = '"+datecache+"'";
             
         /*   alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       document.getElementById('rec2').value = (response.data.phpresult[0]['asum']*1000);
                       console.log(response.data.phpresult);
                   }
               }
      }

      const loadReceiptHsd = async () => {
        let query="SELECT sum(tank3) as asum FROM `rwt_petrol_decantation` WHERE date = '"+datecache+"'";
             
          /*  alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       document.getElementById('rec3').value =(response.data.phpresult[0]['asum']*1000);
                       console.log(response.data.phpresult);
                   }
               }
      }

      const loadReceiptPouches = async () => {
        let query="SELECT sum(total_pcs) as asum FROM `rwt_oil_purchase` WHERE date = '"+datecache+"' AND type='Pouches'";
             
           /* alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
                if (response && response.data) {
                   
                    if (response.data.phpresult) {
                        const asumValue = response.data.phpresult[0]['asum'];

                        if (asumValue === null || asumValue === undefined || asumValue === '') {
                            
                            document.getElementById('rec4').value = 0;
                        } else {
                            
                            document.getElementById('rec4').value = asumValue;
                        }
                        console.log(response.data.phpresult);
                    }
                }
      }

      const loadOpenStkMs = async () => {
        let query="SELECT * FROM `rwt_variation` WHERE date = '"+calcDays()+"' and product='MS'";
             
           /* alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

           const response = await axios.post(url, fData);

           if (response && response.data) {

               if (response.data.phpresult) {
                   document.getElementById('open1').value =(response.data.phpresult[0]['actual_bal_stk']);
                   sethtvariation1(response.data.phpresult[0]['t_variation'])
                   console.log(response.data.phpresult);
               }
               
           }
           
            let opnstk = document.getElementById('open1').value;
            let rec1 = document.getElementById('rec1').value;
            let totalstk = parseInt(opnstk) + parseInt(rec1);

            document.getElementById('tstk1').value = parseInt(totalstk);

            let balStk = document.getElementById('asale1').value;

            document.getElementById('balstk1').value = parseInt(totalstk) - parseInt(balStk);

            
      }

      const loadOpenStkSpeed = async () => {
        let query="SELECT * FROM `rwt_variation` WHERE date = '"+calcDays()+"' and product='SPEED'";
             
           /* alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

           const response = await axios.post(url, fData);

           if (response && response.data) {

               if (response.data.phpresult) {
                   document.getElementById('open2').value =(response.data.phpresult[0]['actual_bal_stk']);
                   sethtvariation2(response.data.phpresult[0]['t_variation'])
                   console.log(response.data.phpresult);
               }
           }

           
           let opnstk = document.getElementById('open2').value;
           let rec1 = document.getElementById('rec2').value;
           let totalstk = parseInt(opnstk) + parseInt(rec1);

           document.getElementById('tstk2').value = parseInt(totalstk);

           let balStk = document.getElementById('asale2').value;

            document.getElementById('balstk2').value = parseInt(totalstk) - parseInt(balStk);
           
      }

      const loadOpenStkHsd = async () => {
        let query="SELECT * FROM `rwt_variation` WHERE date = '"+calcDays()+"' and product='HSD'";
             
           /* alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

           const response = await axios.post(url, fData);

           if (response && response.data) {

               if (response.data.phpresult) {
                   document.getElementById('open3').value =(response.data.phpresult[0]['actual_bal_stk']);
                   sethtvariation3(response.data.phpresult[0]['t_variation'])
                   console.log(response.data.phpresult);
               }
               
           }

           
           let opnstk = document.getElementById('open3').value;
           let rec1 = document.getElementById('rec3').value;
           let totalstk = parseInt(opnstk) + parseInt(rec1);

           document.getElementById('tstk3').value = parseInt(totalstk);

           let balStk = document.getElementById('asale3').value;

            document.getElementById('balstk3').value = parseInt(totalstk) - parseInt(balStk);
           
      }


      const loadOpenStkPouches = async () => {
        let query="SELECT * FROM `rwt_variation` WHERE date = '"+calcDays()+"' and product='Pouches'";
             
           /* alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

           const response = await axios.post(url, fData);

           if (response && response.data) {

               if (response.data.phpresult) {
                   document.getElementById('open4').value =(response.data.phpresult[0]['actual_bal_stk']);
                   sethtvariation4(response.data.phpresult[0]['t_variation'])
                   console.log(response.data.phpresult);
               }
               
           }

           
           let opnstk = document.getElementById('open4').value;
           let rec1 = document.getElementById('rec4').value;
           let totalstk = parseInt(opnstk) + parseInt(rec1);

           document.getElementById('tstk4').value = parseInt(totalstk);

           let balStk = document.getElementById('asale4').value;

            document.getElementById('balstk4').value = parseInt(totalstk) - parseInt(balStk);
           
      }


      function calcDays(inputDate, daysToAdd) {
        // Parse the input date string into a Date object
        let date = new Date(datecache);
      
        // Add or subtract the specified number of days
        date.setDate(date.getDate() - 1);
      
        // Return the new date in standard JavaScript date format
        return date.toISOString().split('T')[0];
      }

    const getTotalAmount1 = () => {
        return Object.values(amounts).reduce((acc, curr) => acc + curr, 0);
    };
    

    const calcVariationMS = () => {

        let balstk1 = document.getElementById('balstk1').value;
        let abalstk1 = document.getElementById('abalstk1').value;

        let variation1 = parseInt(abalstk1) - parseInt(balstk1);

        document.getElementById('variation1').value = variation1;
        if(variation1<0)
        {
            document.getElementById('variation1').style.color = 'red';
        }
        else{
            document.getElementById('variation1').style.color = 'black';
        }
       
        let tvariation1 = parseInt(variation1) + parseInt(htvariation1);
        
        document.getElementById('tvariation1').value = tvariation1;
        if(tvariation1<0)
        {
            document.getElementById('tvariation1').style.color = 'red';
        }
        else{
            document.getElementById('tvariation1').style.color = 'black';
        }
    }

    const calcVariationSpeed = () => {

        let balstk1 = document.getElementById('balstk2').value;
        let abalstk1 = document.getElementById('abalstk2').value;

        let variation1 = parseInt(abalstk1) - parseInt(balstk1);

        document.getElementById('variation2').value = variation1;
        if(variation1<0)
        {
            document.getElementById('variation2').style.color = 'red';
        }
        else{
            document.getElementById('variation2').style.color = 'black';
        }
        
        let tvariation1 = parseInt(variation1) + parseInt(htvariation2);
        
        document.getElementById('tvariation2').value = tvariation1;
        if(tvariation1<0)
        {
            document.getElementById('tvariation2').style.color = 'red';
        }
        else{
            document.getElementById('tvariation2').style.color = 'black';
        }
    }

    const calcVariationHsd = () => {

        let balstk1 = document.getElementById('balstk3').value;
        let abalstk1 = document.getElementById('abalstk3').value;

        let variation1 = parseInt(abalstk1) - parseInt(balstk1);

        document.getElementById('variation3').value = variation1;
        if(variation1<0)
        {
            document.getElementById('variation3').style.color = 'red';
        }
        else{
            document.getElementById('variation3').style.color = 'black';
        }
    
        let tvariation1 = parseInt(variation1) + parseInt(htvariation3);
        
        document.getElementById('tvariation3').value = tvariation1;
        if(tvariation1<0)
        {
            document.getElementById('tvariation3').style.color = 'red';
        }
        else{
            document.getElementById('tvariation3').style.color = 'black';
        }
    }

    const calcVariationPouches = () => {

        let balstk1 = document.getElementById('balstk4').value;
        let abalstk1 = document.getElementById('abalstk4').value;

        let variation1 = parseInt(abalstk1) - parseInt(balstk1);

        document.getElementById('variation4').value = variation1;
        if(variation1<0)
        {
            document.getElementById('variation4').style.color = 'red';
        }
        else{
            document.getElementById('variation4').style.color = 'black';
        }
       
        let tvariation1 = parseInt(variation1) + parseInt(htvariation4);
        document.getElementById('tvariation4').value = tvariation1;
        if(tvariation1<0)
        {
            document.getElementById('tvariation4').style.color = 'red';
        }
        else{
            document.getElementById('tvariation4').style.color = 'black';
        }
    }

    const loadBanks = async () => {
        let query="select * from rwt_bank_account WHERE account_status='active'";
             
        /*    alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       setBanks(response.data.phpresult); 
                       console.log(response.data.phpresult);
                   }
               }
      }
      
      const loadStaff = async () => {
        let query="select * from rwt_staff WHERE status='active'";
             
        /*    alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       setStaff(response.data.phpresult); 
                       console.log(response.data.phpresult);
                   }
               }
      }
      
      const [totalAmountVal, setTotalAmountVal] = useState(null);
    const navigate = useNavigate();

    const onAdd = (index) =>{

        let sname = document.getElementById('sname'+index).innerHTML;
        let cheqNo = document.getElementById('chno'+index).value;
        let amount = document.getElementById('amt'+index).value;

        alert (sname+" - "+cheqNo+" - "+amount)
        if (('chno'+index).length === 0) {
            alert("Cheque No has been left blank!");
          }   else if (('amt'+index).length === 0) {
            alert("Amount has been left blank!");
          }   else {
            
            
            let temptotal = parseFloat(totalAmountVal) - parseFloat(amount);

            const selectedProduct = banks.find(product => product.bank_account_id === bankName);

            let query="INSERT INTO `rwt_bank_statement` (`statemnt_id`, `date`, `particualrs`, `bank_name`, `bank_id`, `acc_no`, `instruments`, `dr_amount`, `cr_amount`, `total_amount`, `check`, `narration`) VALUES (NULL, '"+datecache+"', ' TO: "+selectedProduct.head_name+"', '"+selectedProduct.name+"', '"+selectedProduct.bank_account_id+"', '"+selectedProduct.account_no+"', '"+cheqNo+"', '"+amount+"', ' ', '"+temptotal.toFixed(2)+"','0', '"+"Salary - "+sname+" - "+narration+"');";
            /*  alert(query); */
             const url = dbpath1+'delTank.php';
             let fData = new FormData();
             fData.append('query', query);
                
             axios.post(url, fData)
             .then(response => {alert(response.data); getTotalAmount(); })
                 .catch(error => {
                 console.log(error.toJSON());
          });
        }
    }



    const onDelete = async (index) => {
        let query="DELETE FROM `rwt_bank_account` WHERE bank_account_id = "+index+";";
        /* alert(query); */
        const url = dbpath1+'delTank.php';
        let fData = new FormData();
        fData.append('query', query);
        
        axios.post(url, fData)
        .then(response => {alert(response.data);  window.location.reload();})
            .catch(error => {
            console.log(error.toJSON());
            });
    }

   

    const setSelectedValues = (index) =>  {

        const selectedProduct = banks.find(product => product.bank_account_id === index);
        
        console.log(selectedProduct);
    
        if (!selectedProduct) {
            console.error("Invalid product index");
            return;
        }
    
       /*  setGrdae(selectedProduct.product_grade); */
      
        setAccountNo(selectedProduct.account_no);
      }
      const getTotalAmoun1 = async (bname) => {
        
        let query = "SELECT * FROM `rwt_bank_statement` where bank_id = '"+bname+"' ORDER BY statemnt_id DESC LIMIT 1;";
       
        const url = dbpath1 + 'getDynamic.php';
    let fData = new FormData();

    fData.append('query', query);

    try {
        const response = await axios.post(url, fData);
        
        if (response && response.data && response.data.phpresult) {
            const fetchedAmount = response.data.phpresult[0]['total_amount'];
            console.log(fetchedAmount);  // Using fetched value directly
           
            // Any operations you want to do with fetchedAmount
            // ...

            // Finally, if you want, you can set it to state.
            setTotalAmountVal(fetchedAmount);
        }
        else
        {
            setTotalAmountVal(0);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const getTotalAmount = async () => {
          
    let query = "SELECT * FROM `rwt_bank_statement` where bank_id = '"+bankName+"' ORDER BY statemnt_id DESC LIMIT 1;";
 
    const url = dbpath1 + 'getDynamic.php';
    let fData = new FormData();

    fData.append('query', query);

    try {
        const response = await axios.post(url, fData);
        
        if (response && response.data && response.data.phpresult) {
            const fetchedAmount = response.data.phpresult[0]['total_amount'];
            console.log(fetchedAmount);  // Using fetched value directly
           
            // Any operations you want to do with fetchedAmount
            // ...

            // Finally, if you want, you can set it to state.
            setTotalAmountVal(fetchedAmount);
        }
        else
        {
            setTotalAmountVal(0);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const loadPrice = async (value) =>
{
 
    let query = "SELECT * FROM rwt_day_start WHERE date='"+datecache+"';";
    
/*     alert(query); */
  const url = dbpath1 + 'getDynamic.php';
  let fData = new FormData();
  fData.append('query', query);
    
  try {
      const response = await axios.post(url, fData);
      
      if (response && response.data) {
          if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
              // Data is available
            
              console.log(response.data.phpresult);
              setDayStartRate(response.data.phpresult);

              document.getElementsById('ratems').value = response.data.phpresult[0]['ms'];

             
            

          } else {
            


              // Data is not available
            
          }
      }
  } catch (error) {
      console.log("Please Select Proper Input");
  }
}

      useEffect(() => {
        const getTotalAmount = async () => {
          
            let query = "SELECT * FROM `rwt_bank_statement` where bank_id = '"+bankName+"' ORDER BY statemnt_id DESC LIMIT 1;";
         
            const url = dbpath1 + 'getDynamic.php';
            let fData = new FormData();
    
            fData.append('query', query);
    
            try {
                const response = await axios.post(url, fData);
                
                if (response && response.data && response.data.phpresult) {
                    const fetchedAmount = response.data.phpresult[0]['total_amount'];
                    console.log(fetchedAmount);  // Using fetched value directly
                   
                    // Any operations you want to do with fetchedAmount
                    // ...
    
                    // Finally, if you want, you can set it to state.
                    setTotalAmountVal(fetchedAmount);
                }
                else
                {
                    setTotalAmountVal(0);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    
        getTotalAmount(); // This will call the async function
    }, []);
    
    const calculateSale = (value, nname ,product) => {
       /*  alert("opening"+product+nname); */
        let opening = document.getElementById("opening"+product+nname).value;
        let closing = document.getElementById("closing"+product+nname).value;

        let setval;

        setval = parseInt(closing) - parseInt(opening);

        if(parseInt(setval)<0)
        {
            document.getElementById("sale"+product+nname).style.color = 'red';
        }
        else{
            document.getElementById("sale"+product+nname).style.color = 'black';
        }
        document.getElementById("sale"+product+nname).value = setval;
    }

    const calculateASale = (value, nname ,product) => {
       /*   alert("rate"+product+nname); */
         let sale = document.getElementById("sale"+product+nname).value;
         let testing = document.getElementById("testing"+product+nname).value;
         let rate = document.getElementById("rate"+product).value;
 
         let setval,setamt;
 
         setval = parseInt(sale) - parseInt(testing);
 
         if(parseInt(setval)<0)
         {
             document.getElementById("asale"+product+nname).style.color = 'red';
         }
         else{
             document.getElementById("asale"+product+nname).style.color = 'black';
         }

         document.getElementById("asale"+product+nname).value = setval;

         /* alert(rate); */

         setamt = parseInt(setval) * parseFloat(rate);

       

         document.getElementById("amount"+product+nname).value = setamt.toFixed(2);

     }

     const calcTotalMs = () => {
        let i=0;
        let sum=0;
        let sum1=0;
        let sum2=0;
        let sum3=0;
        let sum4=0;
        for(i=0;i<nozzlesms.length;i++)
        {   
            sum = parseInt(document.getElementById("salems"+nozzlesms[i].nozzle_name).value)+parseInt(sum);
            document.getElementById("saletotalms").innerHTML= sum;
        }
       
        for(i=0;i<nozzlesms.length;i++)
        {
            sum1 = parseInt(document.getElementById("testingms"+nozzlesms[i].nozzle_name).value)+parseInt(sum1);
            document.getElementById("testingtotalms").innerHTML= sum1;
        }

        for(i=0;i<nozzlesms.length;i++)
        {
            sum2 = parseInt(document.getElementById("asalems"+nozzlesms[i].nozzle_name).value)+parseInt(sum2);
            document.getElementById("asaletotalms").innerHTML= sum2;
        }

        var elements = document.getElementsByClassName("ratems");
        for ( i = 0; i < elements.length; i++) {
            elements[i].value = dayStartRate[0]['ms'];
        }
        document.getElementById("ratetotalms").innerHTML= dayStartRate[0]['ms'];

        for(i=0;i<nozzlesms.length;i++)
        {
            sum4 = parseInt(document.getElementById("amountms"+nozzlesms[i].nozzle_name).value)+parseInt(sum4);
            document.getElementById("amounttotalms").innerHTML= sum4;
        }
      }

      const onSaveMS = async (index) => {

        if(dateFlag==1)
        {
            let query = "UPDATE `rwt_variation` SET `open_stk` = '"+document.getElementById("open1").value+"', `receipt` = '"+document.getElementById("rec1").value+"', `total_stk` = '"+document.getElementById("tstk1").value+"', `asale` = '"+document.getElementById("asale1").value+"', `bal_stk` = '"+document.getElementById("balstk1").value+"', `actual_bal_stk` = '"+document.getElementById("abalstk1").value+"', `variation` = '"+document.getElementById("variation1").value+"', `t_variation` = '"+document.getElementById("tvariation1").value+"' WHERE date = '"+datecache+"' AND product = 'MS';";
        
            /* alert(query); */
            const url = dbpath1+'delTank.php';
            let fData = new FormData();
            fData.append('query', query);
            
            axios.post(url, fData)
                .then(response =>{ alert(response.data); window.location.reload();})  
                .catch(error => {
                console.log(error.toJSON());
                });
        }
        else
        {
            let query = "INSERT INTO `rwt_variation` (`id`, `date`, `product`, `open_stk`, `receipt`, `total_stk`, `asale`, `bal_stk`, `actual_bal_stk`, `variation`, `t_variation`) VALUES (NULL, '"+datecache+"', 'MS', '"+document.getElementById("open1").value+"', '"+document.getElementById("rec1").value+"', '"+document.getElementById("tstk1").value+"', '"+document.getElementById("asale1").value+"', '"+document.getElementById("balstk1").value+"', '"+document.getElementById("abalstk1").value+"', '"+document.getElementById("variation1").value+"', '"+document.getElementById("tvariation1").value+"');";
        
            /* alert(query); */
            const url = dbpath1+'delTank.php';
            let fData = new FormData();
            fData.append('query', query);
            
            axios.post(url, fData)
                .then(response =>{ alert(response.data); window.location.reload();})  
                .catch(error => {
                console.log(error.toJSON());
                });
            }
        }

        const onSaveSPEED = async (index) => {
           

                if(dateFlag==1)
                {
                    let query = "UPDATE `rwt_variation` SET `open_stk` = '"+document.getElementById("open2").value+"', `receipt` = '"+document.getElementById("rec2").value+"', `total_stk` = '"+document.getElementById("tstk2").value+"', `asale` = '"+document.getElementById("asale2").value+"', `bal_stk` = '"+document.getElementById("balstk2").value+"', `actual_bal_stk` = '"+document.getElementById("abalstk2").value+"', `variation` = '"+document.getElementById("variation2").value+"', `t_variation` = '"+document.getElementById("tvariation2").value+"' WHERE date = '"+datecache+"' AND product = 'SPEED';";
                
                    /* alert(query); */
                    const url = dbpath1+'delTank.php';
                    let fData = new FormData();
                    fData.append('query', query);
                    
                    axios.post(url, fData)
                        .then(response =>{ alert(response.data); window.location.reload();})  
                        .catch(error => {
                        console.log(error.toJSON());
                        });
                }
                else
                {
                    let query = "INSERT INTO `rwt_variation` (`id`, `date`, `product`, `open_stk`, `receipt`, `total_stk`, `asale`, `bal_stk`, `actual_bal_stk`, `variation`, `t_variation`) VALUES (NULL, '"+datecache+"', 'SPEED', '"+document.getElementById("open2").value+"', '"+document.getElementById("rec2").value+"', '"+document.getElementById("tstk2").value+"', '"+document.getElementById("asale2").value+"', '"+document.getElementById("balstk2").value+"', '"+document.getElementById("abalstk2").value+"', '"+document.getElementById("variation2").value+"', '"+document.getElementById("tvariation2").value+"');";
           
                    /* alert(query); */
                    const url = dbpath1+'delTank.php';
                    let fData = new FormData();
                    fData.append('query', query);
                    
                    axios.post(url, fData)
                        .then(response =>{ alert(response.data); window.location.reload();})  
                        .catch(error => {
                        console.log(error.toJSON());
                        });
                    }
            }

            const onSaveHSD = async (index) => {
                  
       
             


                    if(dateFlag==1)
                    {
                        let query = "UPDATE `rwt_variation` SET `open_stk` = '"+document.getElementById("open3").value+"', `receipt` = '"+document.getElementById("rec3").value+"', `total_stk` = '"+document.getElementById("tstk3").value+"', `asale` = '"+document.getElementById("asale3").value+"', `bal_stk` = '"+document.getElementById("balstk3").value+"', `actual_bal_stk` = '"+document.getElementById("abalstk3").value+"', `variation` = '"+document.getElementById("variation3").value+"', `t_variation` = '"+document.getElementById("tvariation3").value+"' WHERE date = '"+datecache+"' AND product = 'SPEED';";
                    
                        /* alert(query); */
                        const url = dbpath1+'delTank.php';
                        let fData = new FormData();
                        fData.append('query', query);
                        
                        axios.post(url, fData)
                            .then(response =>{ alert(response.data); window.location.reload();})  
                            .catch(error => {
                            console.log(error.toJSON());
                            });
                    }
                    else
                    {
                        let query = "INSERT INTO `rwt_variation` (`id`, `date`, `product`, `open_stk`, `receipt`, `total_stk`, `asale`, `bal_stk`, `actual_bal_stk`, `variation`, `t_variation`) VALUES (NULL, '"+datecache+"', 'HSD', '"+document.getElementById("open3").value+"', '"+document.getElementById("rec3").value+"', '"+document.getElementById("tstk3").value+"', '"+document.getElementById("asale3").value+"', '"+document.getElementById("balstk3").value+"', '"+document.getElementById("abalstk3").value+"', '"+document.getElementById("variation3").value+"', '"+document.getElementById("tvariation3").value+"');";
     
                        /* alert(query); */
                        const url = dbpath1+'delTank.php';
                        let fData = new FormData();
                        fData.append('query', query);
                        
                        axios.post(url, fData)
                            .then(response =>{ alert(response.data); window.location.reload();})  
                            .catch(error => {
                            console.log(error.toJSON());
                            });
                        }
                }


                const onSavePouches = async (index) => {
                  
                   
                    if(dateFlag==1)
                    {
                        let query = "UPDATE `rwt_variation` SET `open_stk` = '"+document.getElementById("open4").value+"', `receipt` = '"+document.getElementById("rec4").value+"', `total_stk` = '"+document.getElementById("tstk4").value+"', `asale` = '"+document.getElementById("asale4").value+"', `bal_stk` = '"+document.getElementById("balstk4").value+"', `actual_bal_stk` = '"+document.getElementById("abalstk4").value+"', `variation` = '"+document.getElementById("variation4").value+"', `t_variation` = '"+document.getElementById("tvariation4").value+"' WHERE date = '"+datecache+"' AND product = 'MS';";
                    
                        /* alert(query); */
                        const url = dbpath1+'delTank.php';
                        let fData = new FormData();
                        fData.append('query', query);
                        
                        axios.post(url, fData)
                            .then(response =>{ alert(response.data); window.location.reload();})  
                            .catch(error => {
                            console.log(error.toJSON());
                            });
                    }
                    else
                    {
                        let query = "INSERT INTO `rwt_variation` (`id`, `date`, `product`, `open_stk`, `receipt`, `total_stk`, `asale`, `bal_stk`, `actual_bal_stk`, `variation`, `t_variation`) VALUES (NULL, '"+datecache+"', 'Pouches', '"+document.getElementById("open4").value+"', '"+document.getElementById("rec4").value+"', '"+document.getElementById("tstk4").value+"', '"+document.getElementById("asale4").value+"', '"+document.getElementById("balstk4").value+"', '"+document.getElementById("abalstk4").value+"', '"+document.getElementById("variation4").value+"', '"+document.getElementById("tvariation4").value+"');";
                 
                        /* alert(query); */
                        const url = dbpath1+'delTank.php';
                        let fData = new FormData();
                        fData.append('query', query);
                        
                        axios.post(url, fData)
                            .then(response =>{ alert(response.data); window.location.reload();})  
                            .catch(error => {
                            console.log(error.toJSON());
                            });
                        }
                            }
     
    
      const onSaveMsUpdate = () =>{
        let i=0;
        for(i=0;i<nozzlesms.length;i++)
        {
            let query="INSERT INTO `sale_fuels` (`id`, `date`, `product_name`, `nozzle`, `opening`, `closing`, `sale`, `testing`, `asale`, `rate`, `amount`) VALUES (NULL, '"+datecache+"', '"+"MS"+"', '"+nozzlesms[i].nozzle_name+"', '"+document.getElementById("open1"+nozzlesms[i].nozzle_name).value+"', '"+document.getElementById("closingms"+nozzlesms[i].nozzle_name).value+"', '"+document.getElementById("salems"+nozzlesms[i].nozzle_name).value+"', '"+document.getElementById("testingms"+nozzlesms[i].nozzle_name).value+"', '"+document.getElementById("asalems"+nozzlesms[i].nozzle_name).value+"', '"+document.getElementById("ratems").value+"', '"+document.getElementById("amountms"+nozzlesms[i].nozzle_name).value+"');";
            alert(query);
             const url = dbpath1+'delTank.php';
            let fData = new FormData();
            fData.append('query', query);
            
            axios.post(url, fData)
            .then(response => { window.location.reload();})
                .catch(error => {
                console.log(error.toJSON());
                }); 
        }
      }

     const onClickBtn = () => {
        let flag=0;
        let i=0;
       
        for(i=1;i<=4;i++)
        {
            if(document.getElementById('abalstk'+i).value.trim()=='')
            {
                flag=1;
                break;
            }
            
        }
        if(flag==0)
        {
            onSaveMS();  onSaveSPEED(); onSaveHSD(); onSavePouches();
        }
        else
        {
            alert('Some fields are empty!!')
        }
        
     }

    
    useEffect(() => {
      //  getdate();

      }, []);
      const datecache = Cookies.get('dateCookies');
    return (
    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>   
       
            <h2 className='mt-3 text-center'>Variation</h2>
            <span style={{fontSize:'22px'}}> Date : </span>
            <div>
                <br></br>
                    
         
                <table class="table" >
                    <thead>
                        <tr className='table-secondary'>
                            <th className='tablebg' >Product</th>
                            <th className='tablebg' >Open. STK </th>
                            <th className='tablebg' >Receipt(+)</th>
                            <th className='tablebg' >Total Stk(=)</th>
                            <th className='tablebg' >A. Sale(-)</th>
                            <th className='tablebg' >Bal. STK(=)</th>
                            <th className='tablebg' >Actual Bal. Stk(-)	</th>
                            <th className='tablebg' >Variation (=)</th>
                            <th className='tablebg' >T.Variationv (-/+)</th>
                        </tr>
                    </thead>
                    <tbody>
                       {/*  {nozzlesms.map((res,index)=>
                                    <tr  key={index}>
                                    
                                    <td id={"nozzles"+res.nozzle_name}>{res.nozzle_name}</td>
                                    <td><input type="text" id={"openingms"+res.nozzle_name} value={res.op_meter_reading} class="form-control" placeholder="Loading.."   disabled/></td> */}
                                                                {/*  <td><input type="text" id={"amt"+res.staff_id} class="form-control" placeholder="Amount"  onChange={(e) => {
                                        const updatedAmounts = { ...amounts };
                                        updatedAmounts[res.staff_id] = parseFloat(e.target.value) || 0;
                                        setAmounts(updatedAmounts);
                                    }}   style={{width:'250px'}}    /></td> */}
                                 {/*   <td ><input type="text" id={"closingms"+res.nozzle_name} class="form-control" placeholder="" onChange={(e)=> {calculateSale(e.target.value,res.nozzle_name,"ms"); calcTotalMs();}}     /></td>
                                   <td ><input type="text" id={"salems"+res.nozzle_name} class="form-control" placeholder="" onChange={(e)=> {setNarration(e.target.value)}}     disabled /></td>
                                   <td ><input type="text" id={"testingms"+res.nozzle_name} class="form-control" placeholder="" onChange={(e)=> {calculateASale(e.target.value,res.nozzle_name,"ms"); calcTotalMs();}}     /></td>
                                   <td><input type="text" id={"asalems"+res.nozzle_name} class="form-control" placeholder="" onChange={(e)=> {setNarration(e.target.value)}}    disabled /></td>
                                   <td><input type="text" id="ratems"  className="form-control ratems" placeholder=""    disabled /></td>
                                   <td><input type="text" id={"amountms"+res.nozzle_name} class="form-control" placeholder="" onChange={(e)=> {setNarration(e.target.value)}}    disabled /></td>
                                   
                                </tr>   
                            )} */}
                          {/*   <tr>
                                <th className='tablebg'></th>
                                <th className='tablebg'> </th>
                                <th className='tablebg'>Total (=)</th>
                                <th className='tablebg'><span id="saletotalms">0</span> (-)</th>
                                <th className='tablebg'><span id="testingtotalms">0</span > (=)</th>
                                <th className='tablebg'><span id="asaletotalms">0</span> (x)</th>
                                <th className='tablebg'><span id="ratetotalms"></span> (=)</th>
                                <th className='tablebg'><span id="amounttotalms">0.00</span></th>
                        </tr> */}

                                <tr>
                                    
                                    <td className='bigFontWeight' >MS</td>
                                    <td><input type="text" class="form-control bigFontWeight" id='open1' placeholder="Loading.."    disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='rec1' placeholder="Loading.."   disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='tstk1' placeholder="Loading.."    disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='asale1' placeholder="Loading.."    disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='balstk1' placeholder="Loading.."    disabled/></td> 
                                    <td><input id='abalstk1' type="text" class="form-control bigFontWeight editableInput" placeholder="Actual Bal Stk."  onChange={(e) => calcVariationMS()}   /></td> 
                                    <td><input type="text" style={{width:'112px'}}  class="form-control bigFontWeight" id='variation1' placeholder="Loading.."    disabled/></td> 
                                    <td><input type="text" style={{width:'112px'}}  class="form-control bigFontWeight" id='tvariation1' placeholder="Loading.."    disabled/></td> 
                                    
                                </tr>   

                                <tr>
                                    
                                    <td className='bigFontWeight' >SPEED</td>
                                    <td><input type="text" class="form-control bigFontWeight" id='open2' placeholder="Loading.."    disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='rec2' placeholder="Loading.."   disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='tstk2' placeholder="Loading.."   disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='asale2' placeholder="Loading.."    disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='balstk2' placeholder="Loading.."    disabled /></td> 
                                    <td><input id='abalstk2' type="text" class="form-control bigFontWeight editableInput" placeholder="Actual Bal Stk."  onChange={(e) => calcVariationSpeed()}    /></td> 
                                    <td><input type="text" style={{width:'112px'}}  class="form-control bigFontWeight" id='variation2' placeholder="Loading.."   disabled/></td> 
                                    <td><input type="text" style={{width:'112px'}} class="form-control bigFontWeight" id='tvariation2' placeholder="Loading.."   disabled/></td> 
                                    
                                </tr>   

                                <tr>
                                    
                                    <td className='bigFontWeight' >HSD</td>
                                    <td><input type="text" class="form-control bigFontWeight" id='open3' placeholder="Loading.."  disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='rec3' placeholder="Loading.."   disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='tstk3' placeholder="Loading.."    disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='asale3' placeholder="Loading.."   disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='balstk3' placeholder="Loading.."    disabled/></td> 
                                    <td><input id='abalstk3' type="text" class="form-control bigFontWeight editableInput" placeholder="Actual Bal Stk."  onChange={(e) => calcVariationHsd()}    /></td> 
                                    <td><input type="text" style={{width:'112px'}}  class="form-control bigFontWeight" id='variation3' placeholder="Loading.."    disabled/></td> 
                                    <td><input type="text" style={{width:'112px'}}  class="form-control bigFontWeight" id='tvariation3' placeholder="Loading.."   disabled/></td> 
                                    
                                </tr>   
                               
                                <tr>
                                    
                                    <td className='bigFontWeight' >Pouches</td>
                                    <td><input type="text" class="form-control bigFontWeight" id='open4' placeholder="Loading.."   disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='rec4' placeholder="Loading.."   disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='tstk4' placeholder="Loading.."   disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='asale4' placeholder="Loading.."   disabled/></td> 
                                    <td><input type="text" class="form-control bigFontWeight" id='balstk4' placeholder="Loading.."   disabled/></td> 
                                    <td><input id='abalstk4' type="text" class="form-control bigFontWeight editableInput" placeholder="Actual Bal Stk."  onChange={(e) => calcVariationPouches()}   /></td> 
                                    <td><input type="text" style={{width:'112px'}} class="form-control bigFontWeight" id='variation4' placeholder="Loading.."    disabled/></td> 
                                    <td><input type="text" style={{width:'112px'}}  class="form-control bigFontWeight" id='tvariation4' placeholder="Loading.."   disabled/></td> 
                                    
                                </tr>   
                    </tbody>
                </table>        
                                
               <button type="button" style={{height:'30px', paddingTop:'2px', marginLeft:'90%'}} /* id={"data"+res.staff_id} */ class="btn btn-primary" onClick={() =>{ onClickBtn();  /* onSaveMsUpdate(); onSaveHsdUpdate(); onSaveSpeedUpdate(); */}}>Save</button>
                 

            </div>    
            <br></br><br></br>
            
        </div>
    </>
  )
}


