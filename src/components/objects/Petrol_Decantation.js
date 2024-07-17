import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function Client({dbpath1}) {
  
    const [clients, setClients] = useState([]);
    const [ProductData, setProductData] = useState([]);



    const loadProductData = async () => {
        let query="SELECT * FROM `rwt_petrol_product`;";
        /*  
            alert(query); */
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

    const [ date, setDate] = useState('');
    const [ invoiceNo, setInvoiceNo] = useState('');
    const [ ms, setMS] = useState('');
    const [ hsd, setHsd] = useState('');
    const [ total, setTotal] = useState('');
    const [ tank1, serTank1] = useState('');
    const [ tank2, setTank2] = useState('');
    const [ tank3, setTank3] = useState('');
    const [ ms_value, setms_value] = useState('');
    const [ hsd_value, sethsd_value] = useState('');
    const [ inv, setinv] = useState('');
    const [ lfr_taxable_amt, setlfr_taxable_amt] = useState('');
    const [ cgst, setcgst] = useState('');
    const [ sgst, setsgst] = useState('');
    const [ totallfr, settotallfr] = useState('');
   
    const [ totalp, setTotalp] = useState('');
    const [ totald, setTotald] = useState('');
  

const loadClients = async () => {
  let query="SELECT * FROM `rwt_petrol_decantation` where date = '"+datecache+"';";
        
            /* alert(query);  */
            const url = dbpath1 + 'getDynamic.php';
            let fData = new FormData();

            fData.append('query', query);

            try {
                const response = await axios.post(url, fData);
                
                if (response && response.data) {
                    
                    if (response.data.phpresult) {
                        setClients(response.data.phpresult); 
                        console.log(response.data.phpresult);
                    }
                }
            } catch (error) {
                console.log("Please Select Proper Input");
            }

}

    const setInvoiceNoCache = () => {
        Cookies.set('petrolInoviceNo', invoiceNo);
    }

    const navigate = useNavigate();

    const onAdd = () =>{
        
        var val1 = document.getElementById('total1').value;
        var val2 = document.getElementById('total2').value;

        if (invoiceNo.length === 0) {
            alert("Invoice No. has been left blank!");
        }
        else if (invoiceNo.length === 0) {
           alert("Invoice No. has been left blank!");
        }
        else if(val1 != val2)
        {
            alert("Decantation Error : Total Mismatch!");
         }
               else {
            {

                CalculateLFR();
                setInvoiceNoCache();
        
              const url = dbpath1+'delTank.php';
  
              var query = "INSERT INTO `rwt_petrol_decantation` (`decantation_id`, `date`, `invoiceNo`, `ms`, `hsd`, `total`, `tank1`, `tank2`, `tank3`) VALUES (NULL, '"+date+"', '"+invoiceNo+"', '"+ms+"', '"+hsd+"', '"+totalp+"', '"+tank1+"', '"+tank2+"', '"+tank3+"');";
  
              let fData = new FormData();
              fData.append('query', query);
              axios.post(url, fData)
                .then(response => { alert(response.data); window.location.reload();})
                .catch(error => {
                  console.log(error.toJSON()); 
            }); 
          }
          loadClients();
            
        }
    }

    useEffect(() => {
       loadClients();
       loadProductData();
       setDate(datecache);
      }, []); 

    

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

    const onDelete = async (index) => {
      let query="DELETE FROM `rwt_petrol_decantation` WHERE decantation_id = "+index+";";
    
      /* alert(query); */
      const url = dbpath1+'delTank.php';
      let fData = new FormData();
      fData.append('query', query);
      
      axios.post(url, fData)
          .then(response => alert(response.data))
          .catch(error => {
          console.log(error.toJSON());
          });

        loadClients();
  }

  const addDecant = (value) => {
        setTotald(parseInt(document.getElementById('tank1').value)+parseInt(document.getElementById('tank2').value)+parseInt(document.getElementById('tank3').value));
  }

  const addPurchase = (value) => {
        setTotalp(parseInt(ms) + parseInt(value));
  }

  const CalculateLFR = () => {
    const selectedProduct1 = ProductData.find(product1 => product1.product_name ==="MS");
    const selectedProduct2 = ProductData.find(product1 => product1.product_name ==="HSD");

    setms_value(selectedProduct1.lfr_rate);
    sethsd_value(selectedProduct2.lfr_rate);

    let inv_temp = ms+" + "+hsd;

    setinv(ms+" + "+hsd);

    let lfr_taxable_amt_temp_1 = selectedProduct1.lfr_rate * ms;
    let lfr_taxable_amt_temp_2 = selectedProduct2.lfr_rate * hsd;

    let lfr_taxable_amt_temp = parseFloat(lfr_taxable_amt_temp_1) + parseFloat(lfr_taxable_amt_temp_2);

    setlfr_taxable_amt(lfr_taxable_amt_temp);
    
    let gstrate = selectedProduct1.gst_rate;

    let gstval_temp = parseFloat((parseFloat(lfr_taxable_amt_temp)/100)*gstrate);

    setcgst(gstval_temp.toFixed(2));
    setsgst(gstval_temp);

    let totallfr_temp = parseFloat(lfr_taxable_amt_temp) + (parseFloat(gstval_temp)*2);

    settotallfr(totallfr_temp);

    const url = dbpath1+'delTank.php';
  
    var query = "INSERT INTO `rwt_petrol_lfr` (`lfr_id`, `date`, `invoice_no`, `MS`, `HSD`, `inv`, `lfr_taxable_amount`, `cgst`, `sgst`, `tottal`) VALUES (NULL, '"+date+"', '"+invoiceNo+"', '"+selectedProduct1.lfr_rate+"', '"+selectedProduct2.lfr_rate+"', '"+inv_temp+"', '"+lfr_taxable_amt_temp.toFixed(2)+"', '"+gstval_temp.toFixed(2)+"', '"+gstval_temp.toFixed(2)+"', '"+totallfr_temp.toFixed(2)+"');";
    let fData = new FormData();
    fData.append('query', query);
    axios.post(url, fData)
      .then(response => alert(response.data))
      .catch(error => {
        console.log(error.toJSON()); 
    }); 
   
  }

   
//   function convertDateFormat(inputDate) {
//     // Split the string into an array [yyyy, mm, dd]
//     let parts = inputDate.split('-');

//     // Rearrange the array and join it back to a string
//     return parts[2] + '-' + parts[1] + '-' + parts[0];
// }
  const datecache = Cookies.get('dateCookies');
    return (

    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight' >
        <span style={{fontSize:'22px'}}> Date : </span>   
            <h2 className='mt-3 text-center'>Petrol Decantation</h2>
            <div>
                <br></br>
                <h6>Purchase Record (Petrol/Diesel):</h6>
                <table class="table" >
                    <thead>
                        <tr className='table-secondary'>
                           
                            <th className='tablebg'
>Invoice No</th>
                            <th className='tablebg'
>MS (KL)</th>
                            <th className='tablebg'
>HSD (KL)</th>
                            <th className='tablebg'
>Total (KL)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                            <td><input type="text" class="form-control editableInput bigFontWeight"  placeholder="Invoice No" onChange={(e) => setInvoiceNo(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight"  placeholder="MS" onChange={(e) => setMS(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight"   placeholder="HSD" onChange={(e) =>{ setHsd(e.target.value); addPurchase((e.target.value)); } }/></td>
                            <td><input type="text" id='total1' class="form-control  bigFontWeight"  value={totalp} placeholder="Total" onChange={(e) => setTotal(e.target.value)} disabled/></td>
                            {/* <td><input type="text" class="form-control editableInput bigFontWeight"  placeholder="TCS" onChange={(e) => setTcs(e.target.value)} /></td>
                           
                            <td><button type="button" class="btn btn-primary" onClick={onAdd}>ADD</button></td> */}
                        </tr>   
                    </tbody>
                </table>    
                <br></br>
                <h6>Decantation Record:</h6>
                <table class="table" >
                    <thead>
                        <tr className='table-secondary'>
                            <th className='tablebg'
>Tank 1-15KL <br></br>MS-1</th>
                            <th className='tablebg'
>Tank 2-10KL <br></br>MS-2</th>
                            <th className='tablebg'
>Tank 3-9KL <br></br>HSD</th>
                            <th className='tablebg'
 id='total2'>Total (KL)</th>
                            <th className='tablebg'
>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                            <td scope="row">
                                <input type="text" id='tank1' class="form-control editableInput bigFontWeight"   placeholder="Tank1" onChange={(e) => {serTank1(e.target.value); addDecant(e.target.value);}} />
                            </td>
                            <td><input type="text" id='tank2' class="form-control editableInput bigFontWeight"  placeholder="Tank2" onChange={(e) =>{ setTank2(e.target.value); addDecant(e.target.value);;}} /></td>
                            <td><input type="text" id='tank3' class="form-control editableInput bigFontWeight"  placeholder="Tank3" onChange={(e) =>{ setTank3(e.target.value); addDecant(e.target.value);}} /></td>
                            <td><input type="text" class="form-control  bigFontWeight"  value={totald} placeholder="Total" onChange={(e) => setTotal(e.target.value)} disabled/></td>
                            
                           
                            <td><button type="button" style={{width:'150px'}} class="btn btn-primary"  onClick={(e) => { onAdd();  }}>ADD</button></td>
                        </tr>   
                    </tbody>
                </table>    
            </div>
            <br></br><br></br><br></br> <h3 className='mt-3 text-center'>Decantation Records</h3><br></br>
            <div>
                <h6>Purchase Record (Petrol/Diesel):</h6>
                <table class="table" style={{width:'900px'}}>
                    <thead>
                        <tr className='table-secondary'>
                            <th className='tablebg'
>Sr.</th>
                            <th className='tablebg'
>Invoice No</th>
                            <th className='tablebg'
>MS</th>
                            <th className='tablebg'
>HSD</th>
                            <th className='tablebg'
>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {clients.map((res,index)=>
                                <tr className='hovereffect' key={index}>
                                     <td>{index+1}</td>    
                                     <td>{res.invoiceNo}</td>  
                                    <td>{res.ms}</td>
                                    <td>{res.hsd}</td>
                                    <td>{res.total} </td>
                                </tr>
                            )}
                      
                    </tbody>
                </table>    
                <br></br>
                <h6>Decantation Record:</h6>
                <table class="table" >
                    <thead>
                        <tr className='table-secondary'>
                            <th className='tablebg'
>Sr.</th>
                            <th className='tablebg'
>Tank 1-15KL <br></br>MS-1</th>
                            <th className='tablebg'
>Tank 2-10KL <br></br>MS-2</th>
                            <th className='tablebg'
>Tank 3-9KL <br></br>HSD</th>
                            <th className='tablebg'
>Total</th>
                            <th className='tablebg'
>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                         
                        {clients.map((res,index)=>
                                <tr className='hovereffect' key={index}>
                                      <td>{index+1}</td>   
                                     <td>{res.tank1}</td>    
                                     <td>{res.tank2}</td>  
                                    <td>{res.tank3}</td>
                                    <td>{res.total}</td>
                                    <td style={{width:'150px'}}>
                                    {/* <button type="button" id={"tank"+res.machine_id} class="btn btn-primary " onClick={() => onSave(res.machine_id)}>Save</button> &nbsp;
                                     */}    {/* <button type="button" id={"tank"+res.machine_id} class="btn btn-primary">Close</button> &nbsp;
                                        <button type="button" id={"tank"+res.machine_id} class="btn btn-primary">Open</button> &nbsp; */}
                                        <button type="button " id={"tank"+res.decantation_id} class="btn btn-danger " onClick={() => onDelete(res.decantation_id)}>Delete</button>
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
