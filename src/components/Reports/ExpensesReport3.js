import React from 'react';
import '../css/Print.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useReactToPrint } from 'react-to-print';

export default function CreditReport1({ dbpath1, date2 }) {
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
   
  let query="SELECT * FROM `rwt_credit_client` WHERE `date` LIKE '%"+date+"%'";
      /*    alert(query); */
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
   
    let query="SELECT * FROM `rwt_variation` WHERE `id` > 4 AND `date` LIKE '%"+date+"%' AND `product` LIKE 'SPEED' ";
        /*    alert(query); */
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
   
        let query="SELECT * FROM `rwt_variation` WHERE `id` > 4 AND `date` LIKE '%"+date+"%' AND `product` LIKE 'HSD' ";
            /*    alert(query); */
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

        const fetchDataPouches = async () => {
   
            let query="SELECT * FROM `rwt_variation` WHERE `id` > 4 AND `date` LIKE '%"+date+"%' AND `product` LIKE 'Pouches' ";
                /*    alert(query); */
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
        <h2 className='mt-3 text-center'>Credit Report</h2>
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
          <button type='button' className='btn btn-primary' onClick={(e) =>{ fetchDataMS(); fetchDataHSD(); fetchDataPouches(); fetchDataSpeed();}}>
            Fetch
          </button>
        </div>
        <br /> <br /> <br />
        <div id='printtoPdf'>
            
          <div ref={componentRef}>
          <br />
          <center><b>Credit Bill Per Day - Montlhy</b><br /><br />
            <table>
              <tr>
                <th  className='css_border' style={{ width: '50px' }}>Date</th>
                <th  className='css_border' style={{ width: '120px' }}>Party Name</th>
                <th  className='css_border' style={{ width: '120px' }}>Slip No</th>
                <th  className='css_border' style={{ width: '120px' }}>AMT</th>
                <th  className='css_border' style={{ width: '120px' }}>Product</th>
                <th  className='css_border' style={{ width: '120px' }}>Rate</th>
                <th  className='css_border' style={{ width: '120px' }}>Quantity</th>
               </tr>
              {data.map((res) => (
                <tr key={res.date}>
                  <td  className='css_border'>{onlyDate(res.date)}</td>
                  <td  className='css_border'>{res.client_name}</td>
                  <td  className='css_border'>{res.bill_no}</td>
                  <td  className='css_border'>{res.amount}</td>
                  <td  className='css_border'>{res.product_name}</td>
                  <td  className='css_border'>{res.rate}</td>
                  <td  className='css_border'>{res.quantity}</td>
                </tr>
              ))}
            </table>
            </center>
          </div>
        </div>
        <br/>
        <center><PrintButton targetRef={componentRef} /></center>
       

        <br /> <br /> <br />
       
      </div>
    </>
  );
}
