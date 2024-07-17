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
  const [banks, setBanks] = useState([]);

  const [date, setDate] = useState('');
  const [bankName, setBankName] = useState('');
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
  const fetchData = async () => {
 
  let query="SELECT * FROM `rwt_bank_statement` WHERE `bank_name` LIKE '%"+bankName+"%' AND `date` LIKE '%"+date+"%'";
         alert(query);
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


  useEffect(() => {
    loadBanks();
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
        <h2 className='mt-3 text-center'>Bank Statement</h2>
        <b style={{ fontSize: '22px' }}> Date: {convertDateFormat(datecache)}</b>
        <br /> <br /> <br />
        <div style={{ display: 'flex', width: '600px', gap: '20px', marginLeft: '260px' }}>
          
        <select  class="form-select editableInput bigFontWeight" aria-label="Default select example" value={bankName}  onChange={(e) =>{ setBankName(e.target.value); /*  setSelectedValues(e.target.value); */}}>
           <option selected>- select -</option>

           {banks.map((rest) => (  
               <option value={rest.name}>{rest.name} - {rest.account_no} - {rest.head_name} </option>
           ))}
        </select>  

          <input
            type='month'
            id='date5'
            className='form-control editableInput bigFontWeight'
            placeholder='date'
            onChange={(e) => setDate(e.target.value)}
          />
          <button type='button' className='btn btn-primary' onClick={(e) =>{ fetchData(); }}>
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
                <th  className='css_border' style={{ width: '120px' }}>Date</th>
                <th  className='css_border' style={{ width: '120px' }}>Party Name</th>
                <th  className='css_border' style={{ width: '120px' }}>Slip No</th>
                <th  className='css_border' style={{ width: '120px' }}>AMT</th>
                <th  className='css_border' style={{ width: '120px' }}>Product</th>
                <th  className='css_border' style={{ width: '120px' }}>Rate</th>
                <th  className='css_border' style={{ width: '120px' }}>Quantity</th>
               </tr>
              {data.map((res) => (
                <tr key={res.date}>
                  <td  className='css_border'>{convertDateFormat(res.date)}</td>
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
