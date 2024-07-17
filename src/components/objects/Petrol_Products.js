import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function Client({dbpath1}) {
  
    const [clients, setClients] = useState([]);
    
    const [ rate, setRate] = useState('');
    const [t_amount, setT_amount] = useState('');
    const [vat, setVat] = useState('');
    const [cess, setCess] = useState('');
    const [product, setproduct] = useState('');
    const [tcs, setTcs] = useState('');
    const [gst_rate, setGst_rate] = useState('');
    const [lfr_rate, setLfr_rate] = useState('');
  
 
    function convertDateFormat(inputDate) {
      // Split the string into an array [yyyy, mm, dd]
      let parts = inputDate.split('-');
  
      // Rearrange the array and join it back to a string
      return parts[2] + '-' + parts[1] + '-' + parts[0];
  }

// const loadClients = async () => {
//   let query="SELECT * FROM `rwt_petrol_product`;";
//         /*  
//             alert(query); */
//             const url = dbpath1 + 'getDynamic.php';
//             let fData = new FormData();

//             fData.append('query', query);

//             try {
//                 const response = await axios.post(url, fData);
                
//                 if (response && response.data) {

//                     if (response.data.phpresult) {
//                         setClients(response.data.phpresult); 
//                         console.log(response.data.phpresult);

//                         let i=0;
//                         /*  var elements = document.getElementsByClassName("ratehsd");
//                          for ( i = 0; i < elements.length; i++) {
//                              elements[i].value = dayStartRate[0]['hsd'];
//                          } */
//                          for(i=0;i<response.data.phpresult.length;i++)
//                          {
//                            console.log(i);
//                            document.getElementById('rate'+response.data.phpresult[i]['product_id']).value = response.data.phpresult[i]['rate'];
//                            document.getElementById('t_amount'+response.data.phpresult[i]['product_id']).value = response.data.phpresult[i]['t_amount'];
//                            document.getElementById('vat'+response.data.phpresult[i]['product_id']).value = response.data.phpresult[i]['vat'];
//                            document.getElementById('cess'+response.data.phpresult[i]['product_id']).value = response.data.phpresult[i]['cess'];
//                            document.getElementById('tcs'+response.data.phpresult[i]['product_id']).value = response.data.phpresult[i]['tcs'];
//                            document.getElementById('gst_rate'+response.data.phpresult[i]['product_id']).value = response.data.phpresult[i]['gst_rate'];
//                            document.getElementById('lfr_rate'+response.data.phpresult[i]['product_id']).value = response.data.phpresult[i]['lfr_rate'];
                           
                         
//                          }
//                     }



//                 }
//             } catch (error) {
//                 console.log("Please Select Proper Input");
//             }
//     }

    const navigate = useNavigate();

    // const onAdd = () =>{
        
    //     if (product.length === 0) {
    //         alert("Product Name Name has been left blank!");
    //       }   else if (rate.length === 0) {
    //         alert("Rate has been left blank!");
    //       }   else if (t_amount.length === 0) {
    //         alert("Taxable Amount has been left blank!");
    //       }   else if (vat.length === 0) {
    //         alert("VAT has been left blank!");
    //       }  else if (cess.length === 0) {
    //         alert("CESS has been left blank!");
    //       }  else if (tcs.length === 0) {
    //         alert("TCS has been left blank!");
    //       }   else {
    //         {
        
    //           const url = dbpath1+'delTank.php';
  
    //           var query = "INSERT INTO `rwt_petrol_product` (`product_id`, `product_name`, `t_amount`, `vat`, `cess`, `rate`, `tcs`,  `gst_rate`, `lfr_rate`) VALUES (NULL, '"+product+"', '"+t_amount+"', '"+vat+"', '"+cess+"', '"+rate+"', '"+tcs+"', '"+gst_rate+"', '"+lfr_rate+"');";
  
    //           let fData = new FormData();
    //           fData.append('query', query);
    //           axios.post(url, fData)
    //             .then(response => alert(response.data))
    //             .catch(error => {
    //               console.log(error.toJSON()); 
    //         }); 
    //       }
    //       loadClients();
            
    //     }
    // } 

    // useEffect(() => {
    //    loadClients();
    //   }, []); 

    

   /*  const onSave = async (index) => {
        let query="UPDATE pupc_machines SET dispensing_unit_no = '"+document.getElementById("inputDispensingUnitNo"+index).value+"', make = '"+document.getElementById("inputMake"+index).value+"', serial_no = '"+document.getElementById("inputSerialNo"+index).value+"', connected_tanks = '"+document.getElementById("inputConnectedTanks"+index).value+"', product = '"+document.getElementById("inputProduct"+index).value+"', nozzles_in_mpd = '"+document.getElementById("inputNozzlesInMpd"+index).value+"' WHERE machine_id = "+index;
        alert(query); 
        const url = dbpath1+'delTank.php';
        let fData = new FormData();
        fData.append('query', query);
        
        axios.post(url, fData)
            .then(response => alert(response.data))
            .catch(error => {
            console.log(error.toJSON());
            });
    } */

//     const onDelete = async (index) => {
//       let query="DELETE FROM `rwt_petrol_product` WHERE product_id = "+index+";";
    
//       /* alert(query); */
//       const url = dbpath1+'delTank.php';
//       let fData = new FormData();
//       fData.append('query', query);
      
//       axios.post(url, fData)
//           .then(response => alert(response.data))
//           .catch(error => {
//           console.log(error.toJSON());
//           });

//         loadClients();
//   }

//   const onSave = async (index) => {
//     let query="UPDATE `rwt_petrol_product` SET `rate` = '"+ document.getElementById('rate'+index).value+"', `t_amount` = '"+ document.getElementById('t_amount'+index).value+"', `vat` = '"+ document.getElementById('vat'+index).value+"', `cess` = '"+ document.getElementById('cess'+index).value+"', `tcs` = '"+ document.getElementById('tcs'+index).value+"', `gst_rate` = '"+ document.getElementById('gst_rate'+index).value+"', `lfr_rate` = '"+ document.getElementById('lfr_rate'+index).value+"' WHERE `product_id` = '"+index+"';";
  
//    /*  alert(query); */
//     const url = dbpath1+'delTank.php';
//     let fData = new FormData();
//     fData.append('query', query);
    
//     axios.post(url, fData)
//         .then(response => alert(response.data))
//         .catch(error => {
//         console.log(error.toJSON());
//         });

//       loadClients();
// }

  const datecache = Cookies.get('dateCookies');
    return (

    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>   
        <span style={{fontSize:'22px'}}> Date : 
          {/* {convertDateFormat(datecache)} */}
          </span>
            <h2 className='mt-3 text-center'>Add Index - Create Petrol / HSD</h2>
            <div>
                <br></br>
                <table class="table" >
                    <thead>
                        <tr className='table-secondary'>
                            <th className='tablebg'>Product</th>
                            <th className='tablebg'>RAte/Unit</th>
                            <th className='tablebg'>Taxable Amount</th>
                            <th className='tablebg'>VAT/LST</th>
                            <th className='tablebg'>CESS</th>
                            <th className='tablebg'>TCS</th>
                            <th className='tablebg'>GST Rate</th>
                            <th className='tablebg'>LFR Rate</th>
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                            <td scope="row">
                                <input type="text" class="form-control editableInput bigFontWeight" placeholder="Product Name" onChange={(e) => setproduct(e.target.value)} />
                            </td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="Rate/Unit" onChange={(e) => setRate(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="Taxabke Amount" onChange={(e) => setT_amount(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="VAT/LST" onChange={(e) => setVat(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="CESS" onChange={(e) => setCess(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="TCS" onChange={(e) => setTcs(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="GST Rate" onChange={(e) => setGst_rate(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="LFR Rate" onChange={(e) => setLfr_rate(e.target.value)} /></td>
                           
                            <td><button type="button" class="btn btn-primary" 
                            // onClick={onAdd}
                            >ADD</button></td>
                        </tr>   
                    </tbody>
                </table>    
            </div>
            <br></br>
            <div>
                <br></br>
                <table class="table">
                    <thead>
                    <tr className='table-secondary'>
                    <th className='tablebg'>Product</th>
                            <th className='tablebg'>Rate/Unit</th>
                            <th className='tablebg'>Taxable Amount</th>
                            <th className='tablebg'>VAT/LST</th>
                            <th className='tablebg'>CESS</th>
                            <th className='tablebg'>TCS</th>
                            <th className='tablebg'>GST %</th>
                            <th className='tablebg'>LFR Rate</th>
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {clients.map((res,index)=>
                                <tr className='' key={index}>
                                     <td>{res.product_name}</td>    
                                     <td>{/* {res.rate} */}<input type="text" class="form-control editableInput bigFontWeight" placeholder="loading.." id={'rate'+res.product_id} style={{width:'110px'}}/></td>
                                     <td>{/* {res.t_amount	} */} <input type="text" class="form-control editableInput bigFontWeight" placeholder="loading.." id={'t_amount'+res.product_id} style={{width:'110px'}}/></td>  
                                    <td>{/* {res.vat} */}<input type="text" class="form-control editableInput bigFontWeight" placeholder="loading.." id={'vat'+res.product_id} style={{width:'110px'}}/></td>
                                    
                                    <td>{/* {res.cess} */}<input type="text" class="form-control editableInput bigFontWeight" placeholder="loading.." id={'cess'+res.product_id} style={{width:'110px'}}/></td>
                                    
                                    <td>{/* {res.tcs} */}<input type="text" class="form-control editableInput bigFontWeight" placeholder="loading.." id={'tcs'+res.product_id} style={{width:'110px'}}/></td>
                                    <td>{/* {res.gst_rate} */}<input type="text" class="form-control editableInput bigFontWeight" placeholder="loading.." id={'gst_rate'+res.product_id} style={{width:'110px'}}/></td>
                                    <td>{/* {res.lfr_rate} */}<input type="text" class="form-control editableInput bigFontWeight" placeholder="loading.." id={'lfr_rate'+res.product_id} style={{width:'110px'}}/></td>
                                    <td style={{width:'150px', display:'flex'}}>
                                    {/* <button type="button" id={"tank"+res.machine_id} class="btn btn-primary " onClick={() => onSave(res.machine_id)}>Save</button> &nbsp;
                                     */}    {/* <button type="button" id={"tank"+res.machine_id} class="btn btn-primary">Close</button> &nbsp;
                                        <button type="button" id={"tank"+res.machine_id} class="btn btn-primary">Open</button> &nbsp; */}
                                         <button type="button" id={"tank"+res.product_id} class="btn btn-success "
                                          // onClick={() => onSave(res.product_id)}
                                          >Save</button> &nbsp;
                                        <button type="button" id={"tank"+res.product_id} class="btn btn-danger "
                                        //  onClick={() => onDelete(res.product_id)}
                                         >Delete</button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>    
            </div>      
        </div>
    </>
  )
}
