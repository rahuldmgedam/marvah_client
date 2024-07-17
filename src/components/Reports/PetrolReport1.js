import React from 'react';
import '../css/Print.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useReactToPrint } from 'react-to-print';

export default function PetrolReport1({ dbpath1, date2 }) {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

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
  const fetchDataMS = async () => {
   
  let query="SELECT * FROM `sale_fuels` WHERE `date` LIKE '"+date+"' AND `product_name` LIKE 'MS' ";
        // alert(query);
      const url = dbpath1 + 'getDynamic.php';
      let fData = new FormData();
      fData.append('query', query);

      const response = await axios.post(url, fData);
             
             if (response && response.data) {
                 
                 if (response.data.phpresult) {
                     setData(response.data.phpresult); 
                     console.log(response.data.phpresult);
                 }
             }
  };

  const fetchDataSpeed = async () => {
   
    let query="SELECT * FROM `sale_fuels` WHERE `date` LIKE '"+date+"' AND `product_name` LIKE 'SPEED' ";
          // alert(query);
        const url = dbpath1 + 'getDynamic.php';
        let fData = new FormData();
        fData.append('query', query);
  
        const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       setData1(response.data.phpresult); 
                       console.log(response.data.phpresult);
                   }
               }
    };

    const fetchDataHSD = async () => {
   
      let query="SELECT * FROM `sale_fuels` WHERE `date` LIKE '"+date+"' AND `product_name` LIKE 'HSD' ";
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

  const fetchDataMS1 = async () => {
   
    let query="SELECT sum(sale) as sale, sum(testing) as testing, sum(asale) as asale,rate,sum(amount) as amount FROM `sale_fuels` WHERE `date` LIKE '"+date+"' AND `product_name` LIKE 'MS' ";
      /*    alert(query); */
        const url = dbpath1 + 'getDynamic.php';
        let fData = new FormData();
        fData.append('query', query);
  
        const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       document.getElementById('sale').innerHTML = response.data.phpresult[0]['sale'];
                       document.getElementById('testing').innerHTML = response.data.phpresult[0]['testing'];
                       document.getElementById('asale').innerHTML = response.data.phpresult[0]['asale'];
                       document.getElementById('amount').innerHTML = response.data.phpresult[0]['amount'];
                       document.getElementById('rate').innerHTML = response.data.phpresult[0]['rate'];
                       console.log(response.data.phpresult);
                   }
               }
    };

    const fetchDataSpeed1 = async () => {
   
      let query="SELECT sum(sale) as sale, sum(testing) as testing, sum(asale) as asale,rate,sum(amount) as amount FROM `sale_fuels` WHERE `date` LIKE '"+date+"' AND `product_name` LIKE 'SPEED' ";
        /*    alert(query); */
          const url = dbpath1 + 'getDynamic.php';
          let fData = new FormData();
          fData.append('query', query);
    
          const response = await axios.post(url, fData);
                 
                 if (response && response.data) {
                     
                     if (response.data.phpresult) {
                         document.getElementById('sale1').innerHTML = response.data.phpresult[0]['sale'];
                         document.getElementById('testing1').innerHTML = response.data.phpresult[0]['testing'];
                         document.getElementById('asale1').innerHTML = response.data.phpresult[0]['asale'];
                         document.getElementById('amount1').innerHTML = response.data.phpresult[0]['amount'];
                         document.getElementById('rate1').innerHTML = response.data.phpresult[0]['rate'];
                         console.log(response.data.phpresult);
                     }
                 }
      };

      const fetchDataHSD1 = async () => {
   
        let query="SELECT sum(sale) as sale, sum(testing) as testing, sum(asale) as asale,rate,sum(amount) as amount FROM `sale_fuels` WHERE `date` LIKE '"+date+"' AND `product_name` LIKE 'HSD' ";
          /*    alert(query); */
            const url = dbpath1 + 'getDynamic.php';
            let fData = new FormData();
            fData.append('query', query);
      
            const response = await axios.post(url, fData);
                   
                   if (response && response.data) {
                       
                       if (response.data.phpresult) {
                           document.getElementById('sale2').innerHTML = response.data.phpresult[0]['sale'];
                           document.getElementById('testing2').innerHTML = response.data.phpresult[0]['testing'];
                           document.getElementById('asale2').innerHTML = response.data.phpresult[0]['asale'];
                           document.getElementById('amount2').innerHTML = response.data.phpresult[0]['amount'];
                           document.getElementById('rate2').innerHTML = response.data.phpresult[0]['rate'];
                           console.log(response.data.phpresult);
                       }
                   }
        };


  useEffect(() => {
  }, [date]);

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
            type='date'
            id='date5'
            className='form-control editableInput bigFontWeight'
            placeholder='date'
            onChange={(e) => setDate(e.target.value)}
          />
          <button type='button' className='btn btn-primary' onClick={(e) =>{ fetchDataMS();  fetchDataMS1(); fetchDataSpeed();  fetchDataSpeed1(); fetchDataHSD();  fetchDataHSD1();}}>
            Fetch
          </button>
        </div>
        <br /> <br /> <br />
        <div id='printtoPdf'>
          
          <div ref={componentRef}>
          <br />
          <center><b>Day wise sales report - {convertDateFormat(date)} </b><br /><br />
          <b>MS</b><br />
            <table>
              <tr>
                <th  className='css_border' style={{ width: '50px' }}>Nozzle</th>
                <th  className='css_border' style={{ width: '120px' }}>Opening</th>
                <th  className='css_border' style={{ width: '120px' }}>Closing</th>
                <th  className='css_border' style={{ width: '120px' }}>Sale</th>
              </tr>
              {data.map((res) => (
                <tr key={res.date}>
                  <td  className='css_border'>{res.nozzle}</td>
                  <td  className='css_border'>{res.opening}</td>
                  <td  className='css_border'>{res.closing}</td>
                  <td  className='css_border'>{res.asale}</td>
                </tr>
              ))}
              
                <tr >
                  <td  className='css_border' colSpan={3}>Total</td>
                  <td  className='css_border' id='sale'></td> 
                </tr>

                <tr >
                  <td  className='css_border' colSpan={3}>(-) Testing</td>
                  <td  className='css_border' id='testing'></td> 
                </tr>

                <tr >
                  <td  className='css_border' colSpan={3}>(=) Actual Sale</td>
                  <td  className='css_border' id='asale'></td> 
                </tr>

                <tr >
                  <td  className='css_border' colSpan={3}>(*) Rate</td>
                  <td  className='css_border' id='rate'></td> 
                </tr>

                <tr >
                  <td  className='css_border' colSpan={3}>(=) Amount</td>
                  <td  className='css_border' id='amount'></td> 
                </tr>
            </table>
            <br />
            <b>Speed</b><br />
            <table>
              <tr>
                <th  className='css_border' style={{ width: '50px' }}>Nozzle</th>
                <th  className='css_border' style={{ width: '120px' }}>Opening</th>
                <th  className='css_border' style={{ width: '120px' }}>Closing</th>
                <th  className='css_border' style={{ width: '120px' }}>Sale</th>
              </tr>
              {data1.map((res) => (
                <tr key={res.date}>
                  <td  className='css_border'>{res.nozzle}</td>
                  <td  className='css_border'>{res.opening}</td>
                  <td  className='css_border'>{res.closing}</td>
                  <td  className='css_border'>{res.asale}</td>
                </tr>
              ))}
              
                <tr >
                  <td  className='css_border' colSpan={3}>Total</td>
                  <td  className='css_border' id='sale1'></td> 
                </tr>

                <tr >
                  <td  className='css_border' colSpan={3}>(-) Testing</td>
                  <td  className='css_border' id='testing1'></td> 
                </tr>

                <tr >
                  <td  className='css_border' colSpan={3}>(=) Actual Sale</td>
                  <td  className='css_border' id='asale1'></td> 
                </tr>

                <tr >
                  <td  className='css_border' colSpan={3}>(*) Rate</td>
                  <td  className='css_border' id='rate1'></td> 
                </tr>

                <tr >
                  <td  className='css_border' colSpan={3}>(=) Amount</td>
                  <td  className='css_border' id='amount1'></td> 
                </tr>
            </table>
            <br />
            <b>HSD</b><br />
            <table>
              <tr>
                <th  className='css_border' style={{ width: '50px' }}>Nozzle</th>
                <th  className='css_border' style={{ width: '120px' }}>Opening</th>
                <th  className='css_border' style={{ width: '120px' }}>Closing</th>
                <th  className='css_border' style={{ width: '120px' }}>Sale</th>
              </tr>
              {data2.map((res) => (
                <tr key={res.date}>
                  <td  className='css_border'>{res.nozzle}</td>
                  <td  className='css_border'>{res.opening}</td>
                  <td  className='css_border'>{res.closing}</td>
                  <td  className='css_border'>{res.asale}</td>
                </tr>
              ))}
              
                <tr >
                  <td  className='css_border' colSpan={3}>Total</td>
                  <td  className='css_border' id='sale2'></td> 
                </tr>

                <tr >
                  <td  className='css_border' colSpan={3}>(-) Testing</td>
                  <td  className='css_border' id='testing2'></td> 
                </tr>

                <tr >
                  <td  className='css_border' colSpan={3}>(=) Actual Sale</td>
                  <td  className='css_border' id='asale2'></td> 
                </tr>

                <tr >
                  <td  className='css_border' colSpan={3}>(*) Rate</td>
                  <td  className='css_border' id='rate2'></td> 
                </tr>

                <tr >
                  <td  className='css_border' colSpan={3}>(=) Amount</td>
                  <td  className='css_border' id='amount2'></td> 
                </tr>
            </table>
            </center>
          </div>
        </div>
        <br/>
        <center><PrintButton targetRef={componentRef} /></center>
       

      </div>
    </>
  );
}
