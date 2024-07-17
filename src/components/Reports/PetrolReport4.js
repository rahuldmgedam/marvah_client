import React from 'react';
import '../css/Print.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useReactToPrint } from 'react-to-print';

export default function PetrolReport4({ dbpath1, date2 }) {
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
   
  let query="SELECT * FROM `rwt_variation` WHERE `id` > 4 AND `date` LIKE '%"+date+"%' AND `product` LIKE 'MS' ";
         //alert(query);
      const url = dbpath1 + 'getDynamic.php';
      let fData = new FormData();
      fData.append('query', query);

      const response = await axios.post(url, fData);
             
             if (response && response.data) {
                 
                 if (response.data.phpresult) {
                     setData(response.data.phpresult); 
                     console.log(response.data.phpresult);
                     document.getElementById('openms').innerHTML = response.data.phpresult[0]['open_stk'];    
                     setTimeout(calcMS, 1000);
                 }
             }
  };

  const fetchDataMS1 = async () => {
   
    let query="SELECT sum(receipt) as sumr, sum(asale) as suma, sum(actual_bal_stk) as sumab   FROM `rwt_variation` WHERE `id` > 4 AND `date` LIKE '%"+date+"%' AND `product` LIKE 'MS' ";
        /*    alert(query); */
        const url = dbpath1 + 'getDynamic.php';
        let fData = new FormData();
        fData.append('query', query);
  
        const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       document.getElementById('recms').innerHTML = response.data.phpresult[0]['sumr'];
                       console.log(response.data.phpresult);
                       document.getElementById('asalems').innerHTML = response.data.phpresult[0]['suma'];
                       document.getElementById('abalms').innerHTML = response.data.phpresult[0]['sumab'];
                   }
               }
    };

    const calcMS = () => {
      let  openms_t = document.getElementById('openms').innerHTML;
      let  recms_t = document.getElementById('recms').innerHTML;
      let totalms_t = parseInt(openms_t)+parseInt(recms_t);
      document.getElementById('totalms').innerHTML = totalms_t;
      let  asalems_t = document.getElementById('asalems').innerHTML;
      let balms_t = parseInt(totalms_t)-parseInt(asalems_t);
      document.getElementById('balms').innerHTML = balms_t;
      let  abalms_t = document.getElementById('abalms').innerHTML;
      let varms_t = parseInt(abalms_t)-parseInt(balms_t);
      document.getElementById('varms').innerHTML = varms_t;
    }

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
                       document.getElementById('openspeed').innerHTML = response.data.phpresult[0]['open_stk'];    
                       setTimeout(calcSpeed, 1000);
                   }
               }
    };

    const fetchDataSpeed1 = async () => {
   
      let query="SELECT sum(receipt) as sumr, sum(asale) as suma, sum(actual_bal_stk) as sumab   FROM `rwt_variation` WHERE `id` > 4 AND `date` LIKE '%"+date+"%' AND `product` LIKE 'SPEED' ";
          /*    alert(query); */
          const url = dbpath1 + 'getDynamic.php';
          let fData = new FormData();
          fData.append('query', query);
    
          const response = await axios.post(url, fData);
                 
                 if (response && response.data) {
                     
                     if (response.data.phpresult) {
                      document.getElementById('recspeed').innerHTML = response.data.phpresult[0]['sumr'];
                      console.log(response.data.phpresult);
                      document.getElementById('asalespeed').innerHTML = response.data.phpresult[0]['suma'];
                      document.getElementById('abalspeed').innerHTML = response.data.phpresult[0]['sumab'];
                     }
                 }
      };

      const calcSpeed = () => {
        let  openspeed_t = document.getElementById('openspeed').innerHTML;
        let  recspeed_t = document.getElementById('recspeed').innerHTML;
        let totalspeed_t = parseInt(openspeed_t)+parseInt(recspeed_t);
        document.getElementById('totalspeed').innerHTML = totalspeed_t;
        let  asalespeed_t = document.getElementById('asalespeed').innerHTML;
        let balspeed_t = parseInt(totalspeed_t)-parseInt(asalespeed_t);
        document.getElementById('balspeed').innerHTML = balspeed_t;
        let  abalspeed_t = document.getElementById('abalspeed').innerHTML;
        let varspeed_t = parseInt(abalspeed_t)-parseInt(balspeed_t);
        document.getElementById('varspeed').innerHTML = varspeed_t;
      }

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
                           document.getElementById('openhsd').innerHTML = response.data.phpresult[0]['open_stk'];    
                           setTimeout(calcHSD, 1000);
                       }
                   }
        };

        const fetchDataHSD1 = async () => {
   
          let query="SELECT sum(receipt) as sumr, sum(asale) as suma, sum(actual_bal_stk) as sumab   FROM `rwt_variation` WHERE `id` > 4 AND `date` LIKE '%"+date+"%' AND `product` LIKE 'HSD' ";
              /*    alert(query); */
              const url = dbpath1 + 'getDynamic.php';
              let fData = new FormData();
              fData.append('query', query);
        
              const response = await axios.post(url, fData);
                     
                     if (response && response.data) {
                         
                         if (response.data.phpresult) {
                          document.getElementById('rechsd').innerHTML = response.data.phpresult[0]['sumr'];
                          console.log(response.data.phpresult);
                          document.getElementById('asalehsd').innerHTML = response.data.phpresult[0]['suma'];
                          document.getElementById('abalhsd').innerHTML = response.data.phpresult[0]['sumab'];
                         }
                     }
          };

          const calcHSD = () => {
            let  openhsd_t = document.getElementById('openhsd').innerHTML;
            let  rechsd_t = document.getElementById('rechsd').innerHTML;
            let totalhsd_t = parseInt(openhsd_t)+parseInt(rechsd_t);
            document.getElementById('totalhsd').innerHTML = totalhsd_t;
            let  asalehsd_t = document.getElementById('asalehsd').innerHTML;
            let balhsd_t = parseInt(totalhsd_t)-parseInt(asalehsd_t);
            document.getElementById('balhsd').innerHTML = balhsd_t;
            let  abalhsd_t = document.getElementById('abalhsd').innerHTML;
            let varhsd_t = parseInt(abalhsd_t)-parseInt(balhsd_t);
            document.getElementById('varhsd').innerHTML = varhsd_t;
          }

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
                               document.getElementById('openpouches').innerHTML = response.data.phpresult[0]['open_stk'];    
                               setTimeout(calcPouches, 1000);
                           }
                       }
            };

            const fetchDataPouches1 = async () => {
   
              let query="SELECT sum(receipt) as sumr, sum(asale) as suma, sum(actual_bal_stk) as sumab   FROM `rwt_variation` WHERE `id` > 4 AND `date` LIKE '%"+date+"%' AND `product` LIKE 'Pouches' ";
                  /*    alert(query); */
                  const url = dbpath1 + 'getDynamic.php';
                  let fData = new FormData();
                  fData.append('query', query);
            
                  const response = await axios.post(url, fData);
                         
                         if (response && response.data) {
                             
                             if (response.data.phpresult) {
                              document.getElementById('recpouches').innerHTML = response.data.phpresult[0]['sumr'];
                              console.log(response.data.phpresult);
                              document.getElementById('asalepouches').innerHTML = response.data.phpresult[0]['suma'];
                              document.getElementById('abalpouches').innerHTML = response.data.phpresult[0]['sumab'];
                             }
                         }
              };

              const calcPouches = () => {
                let  openpouches_t = document.getElementById('openpouches').innerHTML;
                let  recpouches_t = document.getElementById('recpouches').innerHTML;
                let totalpouches_t = parseInt(openpouches_t)+parseInt(recpouches_t);
                document.getElementById('totalpouches').innerHTML = totalpouches_t;
                let  asalepouches_t = document.getElementById('asalepouches').innerHTML;
                let balpouches_t = parseInt(totalpouches_t)-parseInt(asalepouches_t);
                document.getElementById('balpouches').innerHTML = balpouches_t;
                let  abalpouches_t = document.getElementById('abalpouches').innerHTML;
                let varpouches_t = parseInt(abalpouches_t)-parseInt(balpouches_t);
                document.getElementById('varpouches').innerHTML = varpouches_t;
              }

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
            type='month'
            id='date5'
            className='form-control editableInput bigFontWeight'
            placeholder='date'
            onChange={(e) => setDate(e.target.value)}
          />
          <button type='button' className='btn btn-primary' onClick={(e) =>{ fetchDataMS(); fetchDataHSD(); fetchDataPouches(); fetchDataSpeed(); fetchDataMS1(); fetchDataHSD1(); fetchDataPouches1(); fetchDataSpeed1();}}>
            Fetch
          </button>
        </div>
        <br /> <br /> <br />
        <div id='printtoPdf'>
            
          <div ref={componentRef}>
          <br />
          <center><b>Company Register Wise DSR Sales Report - MS</b><br /><br />
            <table>
              <tr>
                <th  className='css_border' style={{ width: '50px' }}>Date</th>
                <th  className='css_border' style={{ width: '120px' }}>Opening Stock</th>
                <th  className='css_border' style={{ width: '120px' }}>Receipt</th>
                <th  className='css_border' style={{ width: '120px' }}>Total</th>
                <th  className='css_border' style={{ width: '120px' }}>Actual Sales</th>
                <th  className='css_border' style={{ width: '120px' }}>Closing Stocks</th>
                <th  className='css_border' style={{ width: '120px' }}>Actual Dip Stock</th>
                <th  className='css_border' style={{ width: '120px' }}>Variation</th>
              </tr>
              {data.map((res) => (
                <tr key={res.date}>
                  <td  className='css_border'>{onlyDate(res.date)}</td>
                  <td  className='css_border'>{res.open_stk}</td>
                  <td  className='css_border'>{res.receipt}</td>
                  <td  className='css_border'>{res.total_stk}</td>
                  <td  className='css_border'>{res.asale}</td>
                  <td  className='css_border'>{res.bal_stk}</td>
                  <td  className='css_border'>{res.actual_bal_stk}</td>
                  <td  className='css_border'>{res.variation}</td>
                </tr>
              ))}
              
                <tr >
                  <td  className='css_border' ><b>Total</b></td>
                  <td  className='css_border' id="openms"></td>
                  <td  className='css_border' id="recms"></td>
                  <td  className='css_border' id="totalms"></td>
                  <td  className='css_border' id="asalems"></td>
                  <td  className='css_border' id="balms"></td>
                  <td  className='css_border' id="abalms"></td>
                  <td  className='css_border' id="varms"></td>
                </tr>
            </table>
            </center>
          </div>
        </div>
        <br/>
        <center><PrintButton targetRef={componentRef} /></center>
       

        <br /> <br /> <br />
        <div id='printtoPdf'>
            
          <div ref={componentRef1}>
          <br />
          <center><b>Company Register Wise DSR Sales Report - SPEED</b><br /><br />
            <table>
              <tr>
                <th  className='css_border' style={{ width: '50px' }}>Date</th>
                <th  className='css_border' style={{ width: '120px' }}>Opening Stock</th>
                <th  className='css_border' style={{ width: '120px' }}>Receipt</th>
                <th  className='css_border' style={{ width: '120px' }}>Total</th>
                <th  className='css_border' style={{ width: '120px' }}>Actual Sales</th>
                <th  className='css_border' style={{ width: '120px' }}>Closing Stocks</th>
                <th  className='css_border' style={{ width: '120px' }}>Actual Dip Stock</th>
                <th  className='css_border' style={{ width: '120px' }}>Variation</th>
              </tr>
              {data1.map((res) => (
                <tr key={res.date}>
                  <td  className='css_border'>{onlyDate(res.date)}</td>
                  <td  className='css_border'>{res.open_stk}</td>
                  <td  className='css_border'>{res.receipt}</td>
                  <td  className='css_border'>{res.total_stk}</td>
                  <td  className='css_border'>{res.asale}</td>
                  <td  className='css_border'>{res.bal_stk}</td>
                  <td  className='css_border'>{res.actual_bal_stk}</td>
                  <td  className='css_border'>{res.variation}</td>
                </tr>
              ))}
              <tr >
                  <td  className='css_border' ><b>Total</b></td>
                  <td  className='css_border' id="openspeed"></td>
                  <td  className='css_border' id="recspeed"></td>
                  <td  className='css_border' id="totalspeed"></td>
                  <td  className='css_border' id="asalespeed"></td>
                  <td  className='css_border' id="balspeed"></td>
                  <td  className='css_border' id="abalspeed"></td>
                  <td  className='css_border' id="varspeed"></td>
                </tr>
            </table>
            </center>
          </div>
        </div>
        <br/>
        <center><PrintButton targetRef={componentRef1} /></center>
       

        <br /> <br /> <br />
        <div id='printtoPdf'>
            
          <div ref={componentRef2}>
          <br />
          <center><b>Company Register Wise DSR Sales Report - HSD</b><br /><br />
            <table>
              <tr>
                <th  className='css_border' style={{ width: '50px' }}>Date</th>
                <th  className='css_border' style={{ width: '120px' }}>Opening Stock</th>
                <th  className='css_border' style={{ width: '120px' }}>Receipt</th>
                <th  className='css_border' style={{ width: '120px' }}>Total</th>
                <th  className='css_border' style={{ width: '120px' }}>Actual Sales</th>
                <th  className='css_border' style={{ width: '120px' }}>Closing Stocks</th>
                <th  className='css_border' style={{ width: '120px' }}>Actual Dip Stock</th>
                <th  className='css_border' style={{ width: '120px' }}>Variation</th>
              </tr>
              {data2.map((res) => (
                <tr key={res.date}>
                  <td  className='css_border'>{onlyDate(res.date)}</td>
                  <td  className='css_border'>{res.open_stk}</td>
                  <td  className='css_border'>{res.receipt}</td>
                  <td  className='css_border'>{res.total_stk}</td>
                  <td  className='css_border'>{res.asale}</td>
                  <td  className='css_border'>{res.bal_stk}</td>
                  <td  className='css_border'>{res.actual_bal_stk}</td>
                  <td  className='css_border'>{res.variation}</td>
                </tr>
              ))}
              <tr >
                  <td  className='css_border' ><b>Total</b></td>
                  <td  className='css_border' id="openhsd"></td>
                  <td  className='css_border' id="rechsd"></td>
                  <td  className='css_border' id="totalhsd"></td>
                  <td  className='css_border' id="asalehsd"></td>
                  <td  className='css_border' id="balhsd"></td>
                  <td  className='css_border' id="abalhsd"></td>
                  <td  className='css_border' id="varhsd"></td>
                </tr>
            </table>
            </center>
          </div>
        </div>
        <br/>
        <center><PrintButton targetRef={componentRef2} /></center>

        <br /> <br /> <br />
        <div id='printtoPdf'>
            
          <div ref={componentRef3}>
          <br />
          <center><b>Company Register Wise DSR Sales Report - Pouches</b><br /><br />
            <table>
              <tr className='css_border'>
                <th  className='css_border' style={{ width: '50px' }}>Date</th>
                <th  className='css_border' style={{ width: '120px' }}>Opening Stock</th>
                <th  className='css_border' style={{ width: '120px' }}>Receipt</th>
                <th  className='css_border' style={{ width: '120px' }}>Total</th>
                <th  className='css_border' style={{ width: '120px' }}>Actual Sales</th>
                <th  className='css_border' style={{ width: '120px' }}>Closing Stocks</th>
                <th  className='css_border' style={{ width: '120px' }}>Actual Dip Stock</th>
                <th  className='css_border' style={{ width: '120px' }}>Variation</th>
              </tr>
              {data3.map((res) => (
                <tr className='css_border' key={res.date}>
                  <td className='css_border'>{onlyDate(res.date)}</td>
                  <td className='css_border'>{res.open_stk}</td>
                  <td className='css_border'>{res.receipt}</td>
                  <td className='css_border'>{res.total_stk}</td>
                  <td className='css_border'>{res.asale}</td>
                  <td className='css_border'>{res.bal_stk}</td>
                  <td className='css_border'>{res.actual_bal_stk}</td>
                  <td className='css_border'>{res.variation}</td>
                </tr>
              ))}
              <tr >
                  <td  className='css_border' ><b>Total</b></td>
                  <td  className='css_border' id="openpouches"></td>
                  <td  className='css_border' id="recpouches"></td>
                  <td  className='css_border' id="totalpouches"></td>
                  <td  className='css_border' id="asalepouches"></td>
                  <td  className='css_border' id="balpouches"></td>
                  <td  className='css_border' id="abalpouches"></td>
                  <td  className='css_border' id="varpouches"></td>
                </tr>
            </table>
            </center>
          </div>
        </div>
        <br/>
        <center><PrintButton targetRef={componentRef3} /></center>
       
      </div>
    </>
  );
}
