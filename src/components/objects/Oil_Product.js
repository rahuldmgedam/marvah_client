import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function Tank({dbpath1}) {
  
    const [oilproduct, setOilproduct] = useState([]);
    
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
    const [PCSPerCase, setPCSPerCase] = useState('');
    const [volume1, setPVolume1] = useState('');
    const [volume2, setPVolume2] = useState('');
    const [type, setType] = useState('');

    // const loadOilProducts = async () => {
    //   const result = await axios.get(dbpath1+"getOilProducts.php");
    //   setOilproduct(result.data.phpresult);
    //   console.log(result.data.phpresult); 
    //   let i=0;
    //  /*  var elements = document.getElementsByClassName("ratehsd");
    //   for ( i = 0; i < elements.length; i++) {
    //       elements[i].value = dayStartRate[0]['hsd'];
    //   } */
    //   for(i=0;i<result.data.phpresult.length;i++)
    //   {
    //     try
    //     {
    //       console.log(i);
    //     document.getElementById('mrp'+result.data.phpresult[i]['product_id']).value = result.data.phpresult[i]['product_mrp'];
    //     document.getElementById('pcs'+result.data.phpresult[i]['product_id']).value = result.data.phpresult[i]['product_pcs_per_caserwt_oil_products'];
    //     }
    //     catch{
    //       console.log('catched expection');
    //     }
    //   }
    // }

    const navigate = useNavigate();

    // const onAdd = () =>{
        
    //     if (product.length === 0) {
    //         alert("Product Name has been left blank!");
    //       }   else if (grdae.length === 0) {
    //         alert("grade has has been left blank!");
    //       }   else if (color.length === 0) {
    //         alert("Colour has been left blank!");
    //       }   else if (mrp.length === 0) {
    //         alert("MRP has been left blank!");
    //       }  else if (volume1.length === 0) {
    //         alert("Volume has been left blank!");
    //       }  else if (volume2.length === 0) {
    //         alert("Volume has been left blank!");
    //       }  else if (PCSPerCase.length === 0) {
    //         alert("PCS per case has been left blank!");
    //       }  else if (type.length === 0) {
    //         alert("Type has been left blank!");
    //       }   else {
    //         const url = dbpath1+'addOilProduct.php';
    //         let fData = new FormData();
            
    //         fData.append('product', product);
    //         fData.append('grdae', grdae);
    //         fData.append('color', color);
    //         fData.append('mrp', mrp);
    //         fData.append('volume', volume1+" "+volume2);
    //         fData.append('PCSPerCase', PCSPerCase);
    //         fData.append('type', type);
    //         axios.post(url, fData)
    //           .then(response => {alert(response.data); window.location.reload();})
    //           .catch(error => {
    //             console.log(error.toJSON());
    //       });
            
    //     }
    // }

  //   const onDelete = async (index) => {
  //     let query="DELETE FROM `rwt_oil_products` WHERE product_id = "+index+";";
    
  //     /* alert(query); */
  //     const url = dbpath1+'delTank.php';
  //     let fData = new FormData();
  //     fData.append('query', query);
      
  //     axios.post(url, fData)
  //         .then(response =>{ alert(response.data); window.location.reload();})
  //         .catch(error => {
  //         console.log(error.toJSON());
  //         });
  // }

//   const onSave = async (index) => {
//     let query="UPDATE `rwt_oil_products` SET `product_pcs_per_caserwt_oil_products` = '"+ document.getElementById('pcs'+index).value+"', `product_mrp` = '"+document.getElementById('mrp'+index).value+"' WHERE `product_id` = '"+index+"';";
  
//     /* alert(query); */
//     const url = dbpath1+'delTank.php';
//     let fData = new FormData();
//     fData.append('query', query);
    
//     axios.post(url, fData)
//         .then(response =>{ alert(response.data);/*  window.location.reload(); */})
//         .catch(error => {
//         console.log(error.toJSON());
//         });
// }
  
    // useEffect(() => {
    //    loadOilProducts();
      
    //   }, []); 
      const datecache = Cookies.get('dateCookies');

      function convertDateFormat(inputDate) {
        // Split the string into an array [yyyy, mm, dd]
        let parts = inputDate.split('-');
    
        // Rearrange the array and join it back to a string
        return parts[2] + '-' + parts[1] + '-' + parts[0];
    }
    return (

    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>   
      
            <h2 className='mt-3 text-center'>Add Index - Create Oil</h2>
            <span style={{fontSize:'22px'}}> Date :
               {/* {convertDateFormat(datecache)} */}
               </span>
            <div>
                <br></br>
                <table class="table">
                    <thead>
                        <tr className='table-secondary'>                            
                            <th className='tablebg'>Product Name</th>
                            <th className='tablebg'>Grade</th>
                            <th className='tablebg'>Colour</th>
                            <th className='tablebg'>MRP</th>
                            <th className='tablebg'>Volume Per PCS</th>
                            <th className='tablebg'>PCS Per Case</th>
                            <th className='tablebg'>Type</th>
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                        <td scope="row">    
                                <input type="text" class="form-control editableInput bigFontWeight" placeholder="Product Name" onChange={(e) => setProduct(e.target.value)} />
                            </td>
                            <td scope="row">
                                <input type="text" class="form-control editableInput bigFontWeight" placeholder="Grade" onChange={(e) => setGrdae(e.target.value)} />
                            </td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="Color" onChange={(e) => setColor(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="MRP" onChange={(e) => setMrp(e.target.value)} /></td>
                            <td style={{display:'flex'}}>
                             <input type="text" class="form-control editableInput bigFontWeight" style={{width:'120px'}} placeholder="Volume" onChange={(e) => setPVolume1(e.target.value)} />
                            <select class="form-select editableInput bigFontWeight" style={{width:'100px'}} aria-label="Default select example" value={volume2} onChange={(e) => setPVolume2(e.target.value)} /* value={machine}  onChange={(e) => setMachine(e.target.value)}*/>
                                    <option selected>- select -</option>
                                            <option value="ML">ML </option>
                                            <option value="LTR">LTR </option>
          
                                </select>  
                            </td>

                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="PCS Per Case" onChange={(e) => setPCSPerCase(e.target.value)} /></td>
                            <td style={{display:'flex'}}>
                            <select class="form-select editableInput bigFontWeight" style={{width:'100px'}} aria-label="Default select example" value={type} onChange={(e) => setType(e.target.value)} /* value={machine}  onChange={(e) => setMachine(e.target.value)}*/>
                                    <option selected>- select -</option>
                                            <option value="Bottle">Bottle </option>
                                            <option value="Pouches">Pouches </option>
          
                                </select>  
                            </td>
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
                            <th className='tablebg'>Product Name</th>
                            <th className='tablebg'>Grade</th>
                            <th className='tablebg'>Colour</th>
                            <th className='tablebg'>MRP</th>
                            <th className='tablebg'>Volume Per PCS</th>
                            <th className='tablebg'>PCS Per Case</th>
                            <th className='tablebg'>Type</th>
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {oilproduct.map((res)=>
                                <tr className='hovereffect'>
                                    <td>{res.product_name}</td>
                                    <td>{res.product_grade}</td>   
                                    <td>{res.product_colour}</td>
                                    <td>{/* {res.product_mrp} */}<input type="text" class="form-control editableInput bigFontWeight" placeholder="loading.." id={'mrp'+res.product_id} style={{width:'180px'}}/></td>
                                    <td>{res.product_volume_per_pcs}</td>
                                    <td>{/* {res.product_pcs_per_caserwt_oil_products} */}<input type="text" class="form-control editableInput bigFontWeight" placeholder="loading.." id={'pcs'+res.product_id} style={{width:'180px'}}/></td>
                                    <td>{res.type}</td>
                                    <td style={{width:'250px'}}>
                                       {/*  <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Edit</button> &nbsp;
                                        <button type="button" id={" tank"+   res.tank_no} class="btn btn-primary">Close</button> &nbsp;
                                      
                                      <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Open</button> &nbsp; */}
                                          <button type="button" id={"tank"+res.product_id} class="btn btn-success " 
                                          
                                          // onClick={() => onSave(res.product_id)}
                                          >Save</button> &nbsp;&nbsp;
    
                                        <button type="button" id={"tank"+res.product_id} class="btn btn-danger "
                                        //  onClick={() => onDelete(res.product_id)}
                                         >Delete</button>
                                    </td>
                                </tr>   
                            )}

<tr>
                                   {/*  <td>MAK 4T PLUS</td>
                                    <td>20W 40</td>   
                                    <td>RED</td>
                                    <td>397</td>
                                    <td>900 ML</td>
                                    <td style={{width:'250px'}}>
                                         <button type="button"  class="btn btn-primary">Edit</button> &nbsp;
                                        
                                        <button type="button"  class="btn btn-primary">Delete</button>
                                    </td>*/}
                                    
                                </tr>    
                    </tbody>
                </table>    
            </div>      
        </div>
    </>
  )
}
