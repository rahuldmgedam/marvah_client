import React from 'react';
import '../css/Print.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useReactToPrint } from 'react-to-print';

export default function PetrolReport3({ dbpath1, date2 }) {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const [nozzlesms, setNozzlesMs] = useState([]);
  const [nozzlesspeed, setNozzlesSpeed] = useState([]);
  const [nozzleshsd, setNozzlesHsd] = useState([]);

  const [date, setDate] = useState('');
  const componentRef = React.useRef();
  const componentRef1 = React.useRef();
  const componentRef2 = React.useRef();
  const componentRef3 = React.useRef();


  const PrintButton = ({ targetRef }) => {
    const handlePrint = useReactToPrint({
      content: () => targetRef.current,
    });
  
    return <button type='button' className='btn btn-primary' onClick={handlePrint}>Print</button>;
  };


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


  const fetchDataSaleFuels = async () => {
   
    let query="SELECT * FROM `sale_fuels` WHERE `date` LIKE '%"+date+"%' AND `product_name` LIKE 'MS' ";
        //   alert(query);
        const url = dbpath1 + 'getDynamic.php';
        let fData = new FormData();
        fData.append('query', query);
  
        const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       setData1(response.data.phpresult); 
                      //console.log('111111111111111')
                       console.log(response.data.phpresult);

                       
                   }
               }
    };

    const fetchDataSaleFuels1 = async () => {
   
      let query="SELECT * FROM `sale_fuels` WHERE `date` LIKE '%"+date+"%' AND `product_name` LIKE 'SPEED' ";
            // alert(query);
          const url = dbpath1 + 'getDynamic.php';
          let fData = new FormData();
          fData.append('query', query);
    
          const response = await axios.post(url, fData);
                 
                 if (response && response.data) {
                     
                     if (response.data.phpresult) {
                         setData2(response.data.phpresult); 
                   
                         console.log(response.data.phpresult);
                     }
                 }
      };


      const fetchDataSaleFuels2 = async () => {
   
        let query="SELECT * FROM `sale_fuels` WHERE `date` LIKE '%"+date+"%' AND `product_name` LIKE 'HSD' ";
            //   alert(query);
            const url = dbpath1 + 'getDynamic.php';
            let fData = new FormData();
            fData.append('query', query);
      
            const response = await axios.post(url, fData);
                   
                   if (response && response.data) {
                       
                       if (response.data.phpresult) {
                           setData3(response.data.phpresult); 
                     
                           console.log(response.data.phpresult);
                       }
                   }
        };

        const getTotal = async () => {
   
          let query="SELECT * FROM `sale_fuels` WHERE `date` LIKE '%"+date+"%' GROUP BY nozzle";
              //   alert(query);
              const url = dbpath1 + 'getDynamic.php';
              let fData = new FormData();
              fData.append('query', query);
        
              const response = await axios.post(url, fData);
                     
                     if (response && response.data) {
                         
                         if (response.data.phpresult) {
                            
                             console.log(response.data.phpresult);

                              let i=0;
                              for(i=0;i<response.data.phpresult.length; i++)
                              {
                                  getSum(response.data.phpresult[i]['nozzle']);
                              }
                         }
                     }
          };



        const getSum = async (nozzlename) => {
          let query="SELECT nozzle, sum(sale) as asum FROM `sale_fuels` WHERE `date` LIKE '%"+date+"%' AND `nozzle` LIKE '"+nozzlename+"' ";
          //   alert(query);
          const url = dbpath1 + 'getDynamic.php';
          let fData = new FormData();
          fData.append('query', query);
    
          const response = await axios.post(url, fData);
                 
                 if (response && response.data) {
                     
                     if (response.data.phpresult) {
                          console.log(response.data.phpresult);

                         let i=0;
                         for(i=0;i<response.data.phpresult.length; i++)
                         {
                              document.getElementById(response.data.phpresult[i]['nozzle']+'id').innerHTML = response.data.phpresult[i]['asum'];
                           
                         }
                     }
                 }
        }


  useEffect(() => {

    //fetchDataSaleFuels();
    loadNozzlesMs();
    loadNozzlesSpeed();
    loadNozzlesHsd();

  }, []);

  const datecache = Cookies.get('dateCookies');

  function convertDateFormat(inputDate) {
    let parts = inputDate.split('-');
    return parts[2] + '-' + parts[1] + '-' + parts[0];
  }

  function onlyDate(inputDate) {
    let parts = inputDate.split('-');
    return parts[2];
  }

  return (
    <>
      <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
        <h2 className='mt-3 text-center'>Petrol Report</h2>
        <b style={{ fontSize: '22px' }}> Date: {convertDateFormat(datecache)}</b>
        <br /> <br /> <br />
        <div style={{ display: 'flex', width: '300px', gap: '20px', marginLeft: '410px' }}>
          <input
            type='month'
            id='date5'
            className='form-control editableInput bigFontWeight'
            placeholder='date'
            onChange={(e) => setDate(e.target.value)}
          />
          <button type='button' className='btn btn-primary' onClick={(e) =>{ fetchDataSaleFuels(); fetchDataSaleFuels1(); fetchDataSaleFuels2(); getTotal(); }}>
            Fetch
          </button>
        </div>
        <br /> <br /> <br />
        <div id='printtoPdf'>
            
          <div ref={componentRef} style={{display:'flex', gap:'40px'}}>
          <br />

          {nozzlesms.map((res) => (

          <center><b>Meter Wise Report - {res.nozzle_name}</b><br />
            <table>
              <tr>
                <th  className='css_border'>Date</th>
                <th  className='css_border' >OP. MTR. READ.</th>
                <th  className='css_border'>Sales</th>
              </tr>
              {data1
              .filter(item => item.nozzle === res.nozzle_name) // Filter only items with nozzle "A2"
              .map(item => (
                <tr key={item.id}>
                  <td className='css_border'>{onlyDate(item.date)}</td>
                  <td className='css_border'>{item.opening}</td>
                  <td className='css_border'>{item.sale}</td>
                </tr>
              ))}
              
                <tr >
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border' id={res.nozzle_name+'id'}></td>
                  
                </tr>
            </table>
            <br /><br />
            </center>
            
          ))}
          </div>
        </div>
        <br/>
        <center><PrintButton targetRef={componentRef} /></center>
       

        <br /> <br /> <br />
                
        <div ref={componentRef1} style={{display:'flex', gap:'40px'}}>
          <br />

          {nozzlesspeed.map((res) => (

          <center><b>Meter Wise Report - {res.nozzle_name}</b><br />
            <table>
              <tr>
                <th  className='css_border'>Date</th>
                <th  className='css_border' >OP. MTR. READ.</th>
                <th  className='css_border'>Sales</th>
              </tr>
              {data2
              .filter(item => item.nozzle === res.nozzle_name) // Filter only items with nozzle "A2"
              .map(item => (
                <tr key={item.id}>
                  <td className='css_border'>{onlyDate(item.date)}</td>
                  <td className='css_border'>{item.opening}</td>
                  <td className='css_border'>{item.sale}</td>
                </tr>
              ))}
              
                <tr >
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border' id={res.nozzle_name+'id'}></td>
                  
                </tr>
            </table>
            <br /><br />
            </center>
            
          ))}
          </div>
     
        <br/>
        <center><PrintButton targetRef={componentRef1} /></center>

        <br /> <br /> <br />
       
        <div ref={componentRef2} style={{display:'flex', gap:'40px'}}>
          <br />

          {nozzleshsd.map((res) => (

          <center><b>Meter Wise Report - {res.nozzle_name}</b><br />
            <table>
              <tr>
                <th  className='css_border'>Date</th>
                <th  className='css_border' >OP. MTR. READ.</th>
                <th  className='css_border'>Sales</th>
              </tr>
              {data3
              .filter(item => item.nozzle === res.nozzle_name) // Filter only items with nozzle "A2"
              .map(item => (
                <tr key={item.id}>
                  <td className='css_border'>{onlyDate(item.date)}</td>
                  <td className='css_border'>{item.opening}</td>
                  <td className='css_border'>{item.sale}</td>
                </tr>
              ))}
              
                <tr >
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border' id={res.nozzle_name+'id'}></td>
                  
                </tr>
            </table>
            <br /><br />
            </center>
            
          ))}
          </div>
     
        <br/>
        <center><PrintButton targetRef={componentRef2} /></center>
      </div>
    </>
  );
}
