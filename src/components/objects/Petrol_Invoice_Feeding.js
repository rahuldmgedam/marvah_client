import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function Petrol_Invoice_Feeding({dbpath1}) {
  
    const [tanks, setTanks] = useState([]);
    const [feedings, setFeedings] = useState([]);
    const [machinen, setMachinen] = useState([]);
    const [ProductData, setProductData] = useState([]);
    
    const [nozzle_name, setNozzle_name] = useState('');
    
    const [machine, setMachine] = useState('');
    const [smachine, setSMachine] = useState('');
    const [side, setSide] = useState('');
    const [nozzle_no, setNozzle_no] = useState('');
    const [op_meter_reading, setOp_meter_reading] = useState('');

    const [sr, setSr] = useState('');
    const [date, setDate] = useState('');
    const [invoice_no, setInvoiceNo] = useState('');
    const [product, setProduct] = useState('');
    const [Qty, setQty] = useState('');
    const [rate, setRate] = useState('');
    const [value, setValue] = useState('');
    const [taxable_amount, setTaxableAmount] = useState('');
    const [ProductAmt, setProductAmt] = useState('');
    const [vat, setVat] = useState('');
    const [vatlst, setVatlst] = useState('');
    const [cess, setCess] = useState('');
    const [tcs, setTCS] = useState('');
    const [tamount, setTamount] = useState('');
    const [productName, setProductName] = useState('');

    const loadProductData = async () => {
        let query="SELECT * FROM `rwt_petrol_product`;";
         
           /*  alert(query); */
            const url = dbpath1 + 'getDynamic.php';
            let fData = new FormData();

            fData.append('query', query);

            try {
                const response = await axios.post(url, fData);
                
                if (response && response.data) {
                    
                    if (response.data.phpresult) {
                        setProductData(response.data.phpresult); 
                        console.log(response.data.phpresult);
                        
                    }
                }
            } catch (error) {
                console.log("Please Select Proper Input");
            } 
    }

    // const loadInvoiceFeeding = async () => {
    //     let query="SELECT * FROM `rwt_petrol_invoice_feeding` where date ='"+datecache+"';;";
    //     /*  
    //         alert(query); */
    //         const url = dbpath1 + 'getDynamic.php';
    //         let fData = new FormData();

    //         fData.append('query', query);

    //         try {
    //             const response = await axios.post(url, fData);
                
    //             if (response && response.data) {
                    
    //                 if (response.data.phpresult) {
    //                     setFeedings(response.data.phpresult); 
    //                     console.log(response.data.phpresult);
                        
    //                 }
    //             }
    //         } catch (error) {
    //             console.log("Please Select Proper Input");
    //         } 
    //   }

    //   const loadtamount = async () => {
    //     let query="SELECT sum(total_amount) as ftamount FROM `rwt_petrol_invoice_feeding` where date ='"+datecache+"';";
    //         /* alert(query); */
    //         const url = dbpath1 + 'getDynamic.php';
    //         let fData = new FormData();

    //         fData.append('query', query);

    //         try {
    //             const response = await axios.post(url, fData);
                
    //             if (response && response.data) {
                    
    //                 if (response.data.phpresult) {
    //                     document.getElementById('tamountid').innerHTML = response.data.phpresult[0]['ftamount'];
    //                     console.log(response.data.phpresult[0]['ftamount']);
                        
    //                 }
    //             }
    //         } catch (error) {
    //             console.log("Please Select Proper Input");
    //         } 
    //   }

    //   const loadMachine = async () => {
    //     const result1 = await axios.get(dbpath1+"getMachine.php");
    //     setMachinen(result1.data.phpresult);
    //     console.log(result1.data.phpresult); 
    //   }
  
    const navigate = useNavigate();

    // const onAdd = () =>{
      
    //           const url = dbpath1+'delTank.php';
  
    //           var query = "INSERT INTO `rwt_petrol_invoice_feeding` (`feeding_id`, `sno`, `date`, `invoice_no`, `product`, `quantity`, `rate`, `value`, `taxable_value`, `product_amount`, `vat`, `vatlst`, `cess`, `tcs`, `total_amount`) VALUES (NULL, '"+sr+"', '"+datecache+"', '"+invoice_no+"', '"+productName+"', '"+Qty+"', '"+rate+"', '"+value+"', '"+taxable_amount+"', '"+ProductAmt+"', '"+vat+"', '"+vatlst+"', '"+cess+"', '"+tcs+"', '"+tamount+"');";
  
    //           let fData = new FormData();
    //           fData.append('query', query);
    //           axios.post(url, fData)
    //             .then(response =>{ alert(response.data); window.location.reload(); setCacheData();})
    //             .catch(error => {
    //               console.log(error.toJSON()); 
    //         }); 
        
    // }

//     const onDelete = async (index) => {
//       let query="DELETE FROM `rwt_petrol_invoice_feeding` WHERE feeding_id = "+index+";";
    
//       /* alert(query); */
//       const url = dbpath1+'delTank.php';
//       let fData = new FormData();
//       fData.append('query', query);
      
//       axios.post(url, fData)
//           .then(response =>{ alert(response.data); window.location.reload();})
//           .catch(error => {
//           console.log(error.toJSON());
//           });
        
//     //   loadInvoiceFeeding();
      
//   }

//   const calc = (qty) => {
//     const selectedProduct = ProductData.find(product1 => product1.product_id ===product);
//     let temp1 = selectedProduct.rate;
//     setProductName(selectedProduct.product_name);
//     setRate(selectedProduct.rate);
//     let temp2 = qty * selectedProduct.rate;
//     setValue(temp2.toFixed(2));
//     setTaxableAmount(selectedProduct.t_amount*qty);
//     let temp3  = temp2+(selectedProduct.t_amount*qty);
//     setProductAmt(temp3.toFixed(2));
//     setVat(selectedProduct.vat);
//     let temp4 = parseFloat(((temp3/100)*selectedProduct.vat)+temp3.toFixed(2));
//     setVatlst(temp4.toFixed(2));
//     let temp5 = selectedProduct.cess*qty;
//     setCess(temp5.toFixed(2));
//     setTCS(selectedProduct.tcs);
//     let temp6 = parseFloat(temp3.toFixed(2)) + parseFloat(temp4.toFixed(2)) + parseFloat(temp5.toFixed(2));
//     setTamount(temp6.toFixed(2));

// } 

 
// function convertDateFormat(inputDate) {
//     // Split the string into an array [yyyy, mm, dd]
//     let parts = inputDate.split('-');

//     // Rearrange the array and join it back to a string
//     return parts[2] + '-' + parts[1] + '-' + parts[0];
// }

//   const displaySelectedProduct = async (index) => {
//     let query="select * FROM `pupc_machines` WHERE dispensing_unit_no = '"+index+"';";
//    /*  
//     alert(query); */
//     const url = dbpath1 + 'getDynamic.php';
//     let fData = new FormData();
//     fData.append('query', query);

//     try {
//         const response = await axios.post(url, fData);
        
//         if (response && response.data) {
            
//             if (response.data.phpresult) {
//                 setSMachine(response.data.phpresult); 
//                 console.log(response.data.phpresult);
//                 document.getElementById('ddun').innerHTML=response.data.phpresult[0]['dispensing_unit_no'];
//                 document.getElementById('dmake').innerHTML=response.data.phpresult[0]['make'];
//                 document.getElementById('dserial_no').innerHTML=response.data.phpresult[0]['serial_no'];
//                 document.getElementById('dconnected_tanks').innerHTML=response.data.phpresult[0]['connected_tanks'];
//                 document.getElementById('dproduct').innerHTML=response.data.phpresult[0]['product'];
//                 document.getElementById('dnozzles_in_mpd').innerHTML=response.data.phpresult[0]['nozzles_in_mpd'];
//             }
//         }
//     } catch (error) {
//         console.log("Please Select Proper Input");
//     }
// }

// const getCacheData = () => {
   
//     const ino = Cookies.get('petrolInoviceNo');
//     setInvoiceNo(ino);
// }

// const setCacheData = () => {
    
//     Cookies.set('petrolInoviceNo', invoice_no);
//     Cookies.set('userLoggedIn', 'true');
// }

//     useEffect(() => {
//         loadProductData();
//         loadInvoiceFeeding();
//         loadMachine();
//         loadtamount();
//         setDate(datecache);

//         getCacheData();
        
//       }, []); 
//       const datecache = Cookies.get('dateCookies');
    return (
    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded'>  
        <span style={{fontSize:'22px'}}> Date : </span>
        <h2 className='mt-3 text-center'>Petrol Invoice Feeding</h2>
            <div>
                <br></br>
                <table class="table">
                    <thead>
                        <tr className='table-secondary'>
                           
                            <th className='tablebg' >S.No.</th>
                            {/* <th className='tablebg' >Date</th> */}
                            <th className='tablebg' >Invoice No.</th>
                            <th className='tablebg' >Product</th>
                            <th className='tablebg' >KL/Qty</th>
                            <th className='tablebg' >(X)</th>
                            <th className='tablebg' >Rate/Unit</th>
                            <th className='tablebg' >(=)</th>
                            <th className='tablebg' >(Value)</th>
                            <th className='tablebg' >(+)</th>
                            <th className='tablebg' >Taxable Amount</th>
                            <th className='tablebg' >(=)</th>
                            <th className='tablebg' >Product Amount</th>
                        </tr>   
                    </thead>
                    <tbody>
                        <tr>    
                            <td className='bigFontWeight' >
                                <input type="text" class="form-control bigFontWeight editableInput" placeholder="S.No." onChange={(e) =>  setSr(e.target.value)} />
                            </td>
                         {/*    <td className='bigFontWeight' >
                                <input type="Date" value={datecache} class="form-control bigFontWeight" placeholder="S.No." onChange={(e) => setDate(e.target.value)} />
                            </td> */}
                            <td className='bigFontWeight' >
                                <input type="text" class="form-control bigFontWeight editableInput" value={invoice_no} placeholder="Invoice no" onChange={(e) => setInvoiceNo(e.target.value)} />
                            </td>
                            <td >
                            
                                <select style={{width:'120px'}} class="form-select editableInput bigFontWeight" aria-label="Default select example" value={product} /* onChange={displaySelectedProduct(product)} */ onChange={(e) => setProduct(e.target.value)}>
                                <option selected>- Product -</option>
                                    {ProductData.map((rest) => (
                                        <option value={rest.product_id}>{rest.product_name}</option>
                                    ))}
                                </select>
                               
                            </td>
                            <td className='bigFontWeight' >
                                <input type="text" class=" editableInput form-control bigFontWeight"  placeholder="KL/Qty" 
                                 />
                            </td>
                            <td className='bigFontWeight' >
                               (X)
                            </td>
                            <td className='bigFontWeight' >
                                <input type="text" class="form-control bigFontWeight" value={rate} placeholder="Rate/Unit" onChange={(e) => setNozzle_name(e.target.value)} disabled/>
                            </td>
                            <td className='bigFontWeight' >
                                (=)
                            </td>
                            <td className='bigFontWeight' >
                                <input type="text" class="form-control bigFontWeight" value={value} placeholder="Value" onChange={(e) => setNozzle_name(e.target.value)} disabled/>
                            </td>
                            <td className='bigFontWeight' >(+)</td>
                            <td><input type="text" class="form-control bigFontWeight" value={taxable_amount} placeholder="Taxable amount" onChange={(e) => setNozzle_no(e.target.value)} disabled/></td>
                            <td className='bigFontWeight' >(=)</td>
                             <td className='bigFontWeight' >
                                <input type="text" class="form-control bigFontWeight" value={ProductAmt} placeholder="Amount" onChange={(e) => setNozzle_name(e.target.value)} disabled/>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>  
                <br></br>
                <table class="table">
                    <thead>
                        <tr className='table-secondary'>
                            <th className='tablebg' >(=)</th>
                            <th className='tablebg' >VAt %</th>
                            <th className='tablebg' >VAT/LST</th>
                            <th className='tablebg' >(+)</th>
                            <th className='tablebg' >CESS</th>
                            <th className='tablebg' >(+)</th>
                            <th className='tablebg' >TCS</th>
                            <th className='tablebg' >(=)</th>
                            <th className='tablebg' >T. AMT</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                                <tr>
                                <td className='bigFontWeight' >
                                (=)
                            </td>
                            <td className='bigFontWeight' >
                                <input type="text" class="form-control bigFontWeight" value={vat} placeholder="VAT %" onChange={(e) => setNozzle_name(e.target.value)} disabled/>
                            </td>
                            <td className='bigFontWeight' > 
                                <input type="text" class="form-control bigFontWeight" value={vatlst} placeholder="VAT/LST" onChange={(e) => setNozzle_name(e.target.value)} disabled/>
                            </td>
                            <td className='bigFontWeight' >
                                (+)
                            </td>
                            <td className='bigFontWeight' >
                                <input type="text" class="form-control bigFontWeight" value={cess} placeholder="CESS" onChange={(e) => setNozzle_name(e.target.value)} disabled/>
                            </td>
                            <td className='bigFontWeight' >
                                (+)
                            </td>
                            
                            <td className='bigFontWeight' >
                                <input type="text" class="form-control bigFontWeight" value={tcs} placeholder="TCS" onChange={(e) => setNozzle_name(e.target.value)} disabled/>
                            </td>
                            <td className='bigFontWeight' >
                                (=)
                                 
                            </td>
                            <td className='bigFontWeight' >
                                <input type="text" class="form-control bigFontWeight" value={tamount} placeholder="T Amount" onChange={(e) => setNozzle_name(e.target.value)} disabled/>
                            </td>   
                        </tr>
                    </tbody>
                </table>    
                <center><button type="button" class="btn btn-primary " >Add</button></center>
            </div>
            <br></br>
            <div>
                <br></br>
                <table class="table">
                    <thead>
                        <tr className='table-secondary'>
                           
                            <th className='tablebg' >S.No.</th>
                            {/* <th className='tablebg' >Date</th> */}
                            <th className='tablebg' >Invoice No.</th>
                            <th className='tablebg' >Product</th>
                            <th className='tablebg' >KL/Qty</th>
                            <th className='tablebg' >(X)</th>
                            <th className='tablebg' >Rate/Unit</th>
                            <th className='tablebg' >(=)</th>
                            <th className='tablebg' >(Value)</th>
                            <th className='tablebg' >(+)</th>
                            <th className='tablebg' >Taxable Amount</th>
                            <th className='tablebg' >(=)</th>
                            <th className='tablebg' >Product Amount</th>
                        </tr>   
                    </thead>
                    <tbody>
                    {feedings.map((res,index)=>
                        <tr className='hovereffect'>    
                            <td className='bigFontWeight' >
                                {res.sno}
                            </td>
                          {/*   <td className='bigFontWeight' >
                                {res.date}
                            </td> */}
                            <td className='bigFontWeight' >
                                {res.invoice_no}
                            </td>
                            <td className='bigFontWeight' >
                                {res.product}
                               
                            </td>
                            <td className='bigFontWeight' >
                                {res.quantity}
                            </td>
                            <td className='bigFontWeight' >
                               (X)
                            </td>
                            <td className='bigFontWeight' >
                                {res.rate}
                            </td>
                            <td className='bigFontWeight' >
                                (=)
                            </td>
                            <td className='bigFontWeight' >
                                {res.value}
                            </td>
                            <td className='bigFontWeight' >(+)</td>
                            <td className='bigFontWeight'  >{res.taxable_value}</td>
                            <td className='bigFontWeight' >(=)</td>
                             <td className='bigFontWeight' >
                             {res.rate}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>  
                <br></br>
                <table class="table">
                    <thead>

                        <tr className='table-secondary'>
                            <th className='tablebg' >(=)</th>
                            <th className='tablebg' >VAt %</th>
                            <th className='tablebg' >VAT/LST</th>
                            <th className='tablebg' >(+)</th>
                            <th className='tablebg' >CESS</th>
                            <th className='tablebg' >(+)</th>
                            <th className='tablebg' >TCS</th>
                            <th className='tablebg' >(=)</th>
                            <th className='tablebg' >T. AMT</th>
                            <th className='tablebg' >Action</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                    {feedings.map((res,index)=>
                                <tr className='hovereffect'>
                                <td className='bigFontWeight' >
                                (=)
                            </td>
                            <td className='bigFontWeight' >
                            {res.vat}
                            </td>
                            <td className='bigFontWeight' > 
                            {res.vatlst}
                            </td>
                            <td className='bigFontWeight' >
                                (+) 
                            </td>
                            <td className='bigFontWeight' >
                            {res.cess}
                            </td>
                            <td className='bigFontWeight' >
                                (+)
                            </td>
                            
                            <td className='bigFontWeight' >
                            {res.tcs}
                            </td>
                            <td className='bigFontWeight' >
                                (=)
                                 
                            </td>
                            <td className='bigFontWeight' >
                                {res.total_amount}
                            </td>
                           <td><button type="button" id={"tank"+res.feeding_id} class="btn btn-danger">Delete</button>
                                  </td>
                                </tr>   
                    )}
                    </tbody>
                
                </table>   
                <span className='bigFontWeight'  style={{marginLeft:'800px'}}> Total : <span id='tamountid'>00</span></span>
            </div>      
        </div>
    </>
  )
}
