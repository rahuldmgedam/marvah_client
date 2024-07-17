import React from 'react';
import '../css/Print.css';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useReactToPrint } from 'react-to-print';

export default function PetrolReport5({ dbpath1, date2 }) {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const [dataDate, setDataDate] = useState([]);
  const [dataDate1, setDataDate1] = useState([]);

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

  const fetchDataDate = async () => {
   
    let query="SELECT date, rate, product_name, COUNT(*) AS date_count FROM sale_fuels where product_name='MS' GROUP BY date;";
        //  alert(query); 
        const url = dbpath1 + 'getDynamic.php';
        let fData = new FormData();
        fData.append('query', query);
  
        const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       setDataDate(response.data.phpresult); 
                       console.log(response.data.phpresult);
                   }
               }
    };

    const fetchDataDate1 = async () => {
   
      let query="SELECT date, rate, product_name, COUNT(*) AS date_count FROM sale_fuels where product_name='SPEED' GROUP BY date;";
          //  alert(query); 
          const url = dbpath1 + 'getDynamic.php';
          let fData = new FormData();
          fData.append('query', query);
    
          const response = await axios.post(url, fData);
                 
                 if (response && response.data) {
                     
                     if (response.data.phpresult) {
                         setDataDate1(response.data.phpresult); 
                         console.log(response.data.phpresult);
                     }
                 }
      };



    const fetchDate = async (date_p,index) => {
     // alert(date_p)
      let query="SELECT * FROM sale_fuels where date = '"+date_p+"' AND product_name = 'MS';";
     alert(query); 
      const url = dbpath1 + 'getDynamic.php';
      let fData = new FormData();
      fData.append('query', query);

      const response = await axios.post(url, fData);
             
             if (response && response.data) {
                 
                 if (response.data.phpresult) {
                     
                 }
             }
     
    }

  const fetchDataMS = async () => {
   
  let query="SELECT * FROM `rwt_variation` WHERE `id` > 4 AND `date` LIKE '%"+date+"%' AND `product` LIKE 'MS' ";
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

  const fetchDataMS1 = async () => {
   
    let query="SELECT sum(receipt) as sumr FROM `rwt_variation` WHERE `id` > 4 AND `date` LIKE '%"+date+"%' AND `product` LIKE 'MS' ";
        /*    alert(query); */
        const url = dbpath1 + 'getDynamic.php';
        let fData = new FormData();
        fData.append('query', query);
  
        const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       document.getElementById('recms').innerHTML = response.data.phpresult[0]['sumr'];
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

    const fetchDataSpeed1 = async () => {
   
      let query="SELECT sum(receipt) as sumr  FROM `rwt_variation` WHERE `id` > 4 AND `date` LIKE '%"+date+"%' AND `product` LIKE 'SPEED' ";
          /*    alert(query); */
          const url = dbpath1 + 'getDynamic.php';
          let fData = new FormData();
          fData.append('query', query);
    
          const response = await axios.post(url, fData);
                 
                 if (response && response.data) {
                     
                     if (response.data.phpresult) {
                      document.getElementById('recspeed').innerHTML = response.data.phpresult[0]['sumr'];
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

        const fetchDataHSD1 = async () => {
   
          let query="SELECT sum(receipt) as sumr  FROM `rwt_variation` WHERE `id` > 4 AND `date` LIKE '%"+date+"%' AND `product` LIKE 'HSD' ";
              /*    alert(query); */
              const url = dbpath1 + 'getDynamic.php';
              let fData = new FormData();
              fData.append('query', query);
        
              const response = await axios.post(url, fData);
                     
                     if (response && response.data) {
                         
                         if (response.data.phpresult) {
                          document.getElementById('rechsd').innerHTML = response.data.phpresult[0]['sumr'];
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

            const fetchDataPouches1 = async () => {
   
              let query="SELECT sum(receipt) as sumr  FROM `rwt_variation` WHERE `id` > 4 AND `date` LIKE '%"+date+"%' AND `product` LIKE 'Pouches' ";
                  /*    alert(query); */
                  const url = dbpath1 + 'getDynamic.php';
                  let fData = new FormData();
                  fData.append('query', query);
            
                  const response = await axios.post(url, fData);
                         
                         if (response && response.data) {
                             
                             if (response.data.phpresult) {
                              document.getElementById('recpouches').innerHTML = response.data.phpresult[0]['sumr'];
                           console.log(response.data.phpresult);
                             }
                         }
              };

            

  useEffect(() => {

    //fetchDataDate();

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
          <button type='button' className='btn btn-primary' onClick={(e) =>{fetchDataDate();}}>
            Fetch
          </button>
        </div>
        <br /> <br /> <br />
        <div id='printtoPdf'>
            
          <div ref={componentRef}>
          <br />
          <center><b>Actual Sales Report with Rate - {date}</b><br /><br />
            <table>
              <tr>
              <th  className='css_border' style={{ width: '50px' }}>Sr No</th>
                <th  className='css_border' style={{ width: '120px' }}>Date</th>
                <th  className='css_border' style={{ width: '120px' }}>Rate</th>
                <th  className='css_border' style={{ width: '120px' }}>MS-1</th>
                <th  className='css_border' style={{ width: '120px' }}>MS-2</th>
                <th  className='css_border' style={{ width: '120px' }}>Total Sales</th>
                <th  className='css_border' style={{ width: '120px' }}>Total Amount</th>
              </tr>
              {dataDate.map((res, index) => (
              <tr key={index}>
                <td className='css_border'>{index + 1}</td>
                <td className='css_border'>{convertDateFormat(res.date)}</td>
                <td className='css_border' id={'MS' + index}>
               
                  {fetchDate(res.date, index)}
                  
                </td>
                <td className='css_border'>{res.total_stk}</td>
                <td className='css_border'>{res.asale}</td>
                <td className='css_border'>{res.bal_stk}</td>
                <td className='css_border'>{res.actual_bal_stk}</td>
              </tr>
            ))}

              
                <tr >
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border' id="recms"></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  
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
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border' id="recspeed"></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
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
                  <td  className='css_border'></td>
                  <td  className='css_border' ></td>
                  <td  className='css_border' id="rechsd"></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
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
                  <td  className='css_border'></td>
                  <td  className='css_border' ></td>
                  <td  className='css_border' id="recpouches"></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
                  <td  className='css_border'></td>
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
