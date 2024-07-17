import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function CreditClientReport({dbpath1}) {
  
    const [oilproduct, setOilproduct] = useState([]);
    const [data, setData] = useState([]);
    const [ dispensing_unit_no, setdispensing_unit_no] = useState('');
    const [make, setmake] = useState('');
    const [serial_no, setserial_no] = useState('');
    const [connected_tanks, setconnected_tanks] = useState('');
    const [nozzles_in_mpd, setnozzles_in_mpd] = useState(''); 
    const [product, setProduct] = useState('');
    const [sr, setSr] = useState('');
    const [grdae, setGrdae] = useState('');
    const [color, setColor] = useState('');
    const [mrp, setMrp] = useState('');
    const [volume, setPVolume] = useState('');
    const [volume1, setPVolume1] = useState('');
    const [volume2, setPVolume2] = useState('');
    const [type, settype] = useState('date');
    const [PCSPerCase, setPCSPerCase] = useState('');
    
    
    const report1 = () =>
    {
      navigate('/expensesreport1');
    }

    const report2 = () =>
    {
      navigate('/petrolreport2');
    }

    const report3 = () =>
    {
      alert(3)
    }

    const report4 = () =>
    {
      
    }

    const report5 = () =>
    {
      
    }

    const report6 = () =>
    {
      
    }

    const report7 = () =>
    {
      
    }

   

    const loadOilProducts = async () => {

      let query="select * from rwt_oil_pouches";
      /*    alert(query); */
      const url = dbpath1 + 'getDynamic.php';
      let fData = new FormData();
      fData.append('query', query);

      const response = await axios.post(url, fData);
             
             if (response && response.data) {
                 
                 if (response.data.phpresult) {
                     setOilproduct(response.data.phpresult); 
                     console.log(response.data.phpresult);
                 }
             }

             
      let i=0;
     /*  var elements = document.getElementsByClassName("ratehsd");
      for ( i = 0; i < elements.length; i++) {
          elements[i].value = dayStartRate[0]['hsd'];
      } */
      for(i=0;i<response.data.phpresult.length;i++)
      {
        try
        {
          console.log(i);
        document.getElementById('mrp'+response.data.phpresult[i]['id']).value = response.data.phpresult[i]['amount'];
        document.getElementById('pcs'+response.data.phpresult[i]['id']).value = response.data.phpresult[i]['pcs_per_box'];
        }
        catch{
          console.log('catched expection');
        }
      }
    }

    const navigate = useNavigate();

    const onAdd = () =>{
        
      if (product.length === 0) {
        alert("Product Name has been left blank!");
      }   else if (mrp.length === 0) {
        alert("MRP has been left blank!");
      }   else if (volume1.length === 0) {
        alert("Volume vale has been left blank!");
      }  else if (volume2.length === 0) {
        alert("Volume Size has been left blank!");
      }  else if (PCSPerCase.length === 0) {
        alert("PCS Per Case has been left blank!");
      }  else {
  
        let query="INSERT INTO `rwt_oil_pouches` (`id`, `name`, `size`, `pcs_per_box`, `amount`) VALUES (NULL, '"+product+"', '"+volume1+" "+volume2+"', '"+PCSPerCase+"', '"+mrp+"');";
        /*  alert(query); */   
         const url = dbpath1+'delTank.php';
         let fData = new FormData();
         fData.append('query', query);
         
         axios.post(url, fData)
         .then(response => {alert(response.data);  window.location.reload();})
             .catch(error => {
             console.log(error.toJSON());
      });
    }
  }

    const onDelete = async (index) => {
      let query="DELETE FROM `rwt_oil_pouches` WHERE id = "+index+";";
    
      alert(query);
      const url = dbpath1+'delTank.php';
      let fData = new FormData();
      fData.append('query', query);
      
      axios.post(url, fData)
          .then(response =>{ alert(response.data); window.location.reload();})  
          .catch(error => {
          console.log(error.toJSON());
          });
  }

  const onSave = async (index) => {
    let query="UPDATE `rwt_oil_pouches` SET `pcs_per_box` = '"+ document.getElementById('pcs'+index).value+"', `amount` = '"+document.getElementById('mrp'+index).value+"' WHERE `id` = '"+index+"';";
  
    /* alert(query); */
    const url = dbpath1+'delTank.php';
    let fData = new FormData();
    fData.append('query', query);
    
    axios.post(url, fData)
        .then(response =>{ alert(response.data);/*  window.location.reload(); */})
        .catch(error => {
        console.log(error.toJSON());
        });
}
  
    // useEffect(() => {
    //    loadOilProducts();
      
    //   }, []); 
      const datecache = Cookies.get('dateCookies');

    //   function convertDateFormat(inputDate) {
    //     // Split the string into an array [yyyy, mm, dd]
    //     let parts = inputDate.split('-');
    
    //     // Rearrange the array and join it back to a string
    //     return parts[2] + '-' + parts[1] + '-' + parts[0];
    // }

    return (
    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5  bg-body-tertiary rounded bigFontWeight'>   
            <h2 className='mt-3 text-center'>Expenses Report</h2>
            <span style={{fontSize:'22px'}}> Date :
               {/* {convertDateFormat(datecache)} */}
               </span>
            <div>
                <br></br><br></br>
                <table class="table" style={{width:'700px', marginLeft:'20%'}}>
                    <thead>
                        <tr className='table-secondary'> 
                            <th className='tablebg'>Type</th>                           
                          {/*   <th className='tablebg'>Date</th> */}
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td> {/* <select class="form-select" value={value}  aria-label="Default select example" onChange={(e) => {settype(e.target.value);  }}>
                                <option selected>- Select -</option>
                                
                                        <option value='date'>Day Wise Sales Report </option>
                                        <option value='month'>Month </option>
                                        
                                        
                            </select> */} 
                            Expenses Report (Monthly)
                            </td>
                            <td><button type="button" class="btn btn-primary"
                            // onClick={report1}
                            >Generate Report</button></td>
                        </tr>   
                     {/*    <tr>
                            <td> 
                              Company Register Wise DSR Sales Report
                            </td>
                            <td><button type="button" class="btn btn-primary" onClick={report2}>Generate Report</button></td>
                        </tr>   
                        <tr>
                            <td> 
                              Meter Wise Report
                            </td>
                            <td><button type="button" class="btn btn-primary" onClick={report3}>Generate Report</button></td>
                        </tr>   
                        <tr>
                            <td> 
                              Monthly DSR/ Meter Wise/ Variation Report
                            </td>
                            <td><button type="button" class="btn btn-primary" onClick={report4}>Generate Report</button></td>
                        </tr>   
                        <tr>
                            <td> 
                              Actual Sales Report With Rate & Amount
                            </td>
                            <td><button type="button" class="btn btn-primary" onClick={report5}>Generate Report</button></td>
                        </tr>   
                        <tr>
                            <td> 
                              Product Wise Detail Report (Monthly)
                            </td>
                            <td><button type="button" class="btn btn-primary" onClick={report6}>Generate Report</button></td>
                        </tr>   
                        <tr>
                            <td> 
                              Product Wise Report (Monthly)
                            </td>
                            <td><button type="button" class="btn btn-primary" onClick={report7}>Generate Report</button></td>
                        </tr>    */}

                    </tbody>
                </table>    
            </div>
            <br></br><br></br>
           {/*  <div>
                <br></br>
                <table>
                    <th>
                        <td>SrNo</td>
                        <td>Date</td>
                        <td>Rate</td>
                        <td>MS-1</td>
                        <td>MS-2</td>
                        <td>Total Sales</td>
                        <td>Total Amount</td>
                    </th>
                    {oilproduct.map((res)=> 
                        <tr>
                            <td>{res.name}</td>
                            <td>{res.size}</td>
                        </tr>   
                    )}
                </table>
            </div>       */}
        </div>
    </>
  )
}
