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
  const [machines, setmachines] = useState([]);
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
   
  let query="SELECT * FROM `petro_card_transaction` WHERE `date` LIKE '%"+date+"%'";
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

  const loadmachines = async () => {
    let query="select * from rwt_petro_card";
         
       /* alert(query); */
       const url = dbpath1 + 'getDynamic.php';
       let fData = new FormData();

       fData.append('query', query);

           const response = await axios.post(url, fData);
           
           if (response && response.data) {
               
               if (response.data.phpresult) {
                   setmachines(response.data.phpresult); 
                   console.log(response.data.phpresult);
               }
           }
  }


  const machineName = (index) => {
    const selectedProduct = machines.find(product => product.id === index);
    console.log(selectedProduct);
    return selectedProduct.machinename;
  }

  useEffect(() => {
    loadmachines();

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
        <h2 className='mt-3 text-center'>Cards Report</h2>
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
          <button type='button' className='btn btn-primary' onClick={(e) =>{ fetchData();}}>
            Fetch
          </button>
        </div>
        <br /> <br /> <br />
        <div id='printtoPdf'>
            
          <div ref={componentRef}>
          <br />
          <center><b>Petro Cards Report - Montlhy</b><br /><br />
            <table>
              <tr>
                <th  className='css_border' style={{ width: '120px' }}>Date</th>
                <th  className='css_border' style={{ width: '120px' }}>PC Machine</th>
                <th  className='css_border' style={{ width: '120px' }}>TID-1</th>
                <th  className='css_border' style={{ width: '120px' }}>TID-2</th>
                <th  className='css_border' style={{ width: '120px' }}>TID-3</th>
                <th  className='css_border' style={{ width: '120px' }}>Batch No</th>
                <th  className='css_border' style={{ width: '120px' }}>Amount</th>
               </tr>
              {data.map((res) => (
                <tr key={res.date}>
                  <td  className='css_border'>{convertDateFormat(res.date)}</td>
                  <td  className='css_border'>{machineName(res.machine_name)}</td>
                  <td  className='css_border'>{res.tid1}</td>
                  <td  className='css_border'>{res.tid2}</td>
                  <td  className='css_border'>{res.tid3}</td>
                  <td  className='css_border'>{res.batch}</td>
                  <td  className='css_border'>{res.amount}</td>
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
