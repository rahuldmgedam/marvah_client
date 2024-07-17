import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function Oil_Purchase({dbpath1}) {
  
    const [Invoices, setInvoices] = useState([]);
    const [oil_godown, set_oil_godown] = useState([]);
    
    const [history, set_history] = useState([]);
    const [invoiceNo, setInvoiceNo] = useState('');
    const [product, setProduct] = useState('');
    const [sr, setSr] = useState('');
    const [grdae, setGrdae] = useState('');
    const [color, setColor] = useState('');
    const [mrp, setMrp] = useState('');
    const [volume, setPVolume] = useState('');
    const [pcs, setPcs] = useState('');
    const [cases, setCases] = useState('');
    const [tcases, setTcases] = useState('');
    const [tpcs, setTpcs] = useState('');
    const [tltrs, setTltrs] = useState('');
    const [ratePerUnit, setRatePerUnit] = useState('');
    const [taxableValue, setTaxableValue] = useState('');
    const [discount, setDiscount] = useState('');
    const [balance, setBalance] = useState('');
    const [cgst, setCGST] = useState('');
    const [sgst, setSgst] = useState('');
    const [tCS, setTCS] = useState('');
    const [total, setTotal] = useState('');
    const [lPrice, setlPrice] = useState('');
    const [allTotalAmount, setAllTotalAmount] = useState('');
    const [oDiscount, setODiscount] = useState('');
    const [tInvoiceAmount, setTInvoiceAmount] = useState('');
    const [Differnce, setDiffernce] = useState('');

    const loadTHistory = async () => {
        let query="SELECT * FROM `rwt_oil_godown_trans` where date='"+datecache+"' AND mode='Retail';";
        /*  
            alert(query); */
            const url = dbpath1 + 'getDynamic.php';
            let fData = new FormData();

            fData.append('query', query);

            try {
                const response = await axios.post(url, fData);
                
                if (response && response.data) {
                    
                    if (response.data.phpresult) {
                        set_history(response.data.phpresult); 
                        console.log("th"+response.data.phpresult);
                        
                    }
                }
            } catch (error) {
                console.log("Please Select Proper Input");
            }
    }

    const loadOilGodown = async () => {
        let query="SELECT * FROM `rwt_oil_godown` where retail_top_stk>0 AND type='Bottle';";
        /*  
            alert(query); */
            const url = dbpath1 + 'getDynamic.php';
            let fData = new FormData();

            fData.append('query', query);

            try {
                const response = await axios.post(url, fData);
                
                if (response && response.data) {
                    
                    if (response.data.phpresult) {
                        set_oil_godown(response.data.phpresult); 
                        console.log(response.data.phpresult);
                        essenstials(response.data.phpresult);
                    }
                }
            } catch (error) {
                console.log("Please Select Proper Input");
            }
    }

    const essenstials =  (data) => {
        for (let i = 0; i < data.length; i++) {
            // aggregatedMRP += parseFloat(Oil_Purchase_Not_Settled[i].mrp);
            //const selectedProduct = oilproduct.find(product => product.product_id === Oil_Purchase_Not_Settled[i].product_id);
           // console.log(selectedProduct.product_colour);
           document.getElementById("bs"+data[i].id).value = data[i].retail_top_stk;
          
        }
    }

  
  
    const navigate = useNavigate();


    const calc =(sale, index )=>{
        const selectedProduct = oil_godown.find(product => product.id ===index);
        
        document.getElementById("bs"+index).value = selectedProduct.retail_top_stk - sale;
        document.getElementById("sa"+index).value = selectedProduct.product_mrp * sale;
        
        //document.getElementById("bsa"+index).value = (selectedProduct.topstoack - sale)* selectedProduct.product_mrp;
    }

    const calc1 =(discount, index )=>{
        const selectedProduct = oil_godown.find(product => product.id ===index);
        
       
        document.getElementById("aa"+index).value = (selectedProduct.product_mrp * document.getElementById("s"+index).value) - discount;
        
        //document.getElementById("bsa"+index).value = (selectedProduct.topstoack - sale)* selectedProduct.product_mrp;
    }

    const onDelete = async (index) => {
        let query="DELETE FROM `pupc_add_tank` WHERE tank_no = "+index+";";
        alert(query);
        const result = await axios.get(dbpath1+"dynamicQuery.php?query="+query); 
       
        console.log(result.data.phpresult); 
    }

    const onSale = async (index) => {
        console.log(index);
        let query="UPDATE rwt_oil_godown SET retail_top_stk = '"+document.getElementById("bs"+index).value+"' WHERE id = "+index;
        /* alert(query); */
           const url = dbpath1+'delTank.php';
           let fData = new FormData();
           fData.append('query', query);

           axios.post(url, fData)
               .then(response =>{ alert(response.data); window.location.reload();})
               .catch(error => {
               console.log(error.toJSON());
        });
        loadOilGodown();
    }

    const addToTransac = async (index, pid) => {
       
        
      
        let query="INSERT INTO `rwt_oil_godown_trans` (`id`, `godown_id`, `product_id`, `date`, `mode`, `qty`, `amount`, `discount`, `a_amount`, `product_name`, `product_grade`, `product_colour`, `product_mrp`, `product_volume_per_pcs`, `product_pcs_per_caserwt_oil_products`, `purchasePrice`, `opStock`, `reciept`, `topstoack`, `balStkAmount`, `retail_op_stk`, `retail_inward`, `retail_top_stk`, `retail_amount`,`quantity`,`type`) VALUES (NULL, '"+index+"', '"+pid+"', '"+datecache+"', 'retail', '"+document.getElementById('s'+index).value+"', '"+document.getElementById('sa'+index).value+"', '"+document.getElementById('d'+index).value+"', '"+document.getElementById('aa'+index).value+"', '"+document.getElementById('p'+index).innerHTML+"', '"+document.getElementById('g'+index).innerHTML+"', '"+document.getElementById('c'+index).innerHTML+"', '"+document.getElementById('m'+index).innerHTML+"', '"+document.getElementById('v'+index).innerHTML+"', 'no data for ppc', 'no data for pp', '"+document.getElementById('o'+index).innerHTML+"', '"+document.getElementById('i'+index).innerHTML+"', '"+document.getElementById('t'+index).innerHTML+"', '"+document.getElementById('bs'+index).value+"', '"+0+"', '"+0+"', '"+0+"', '"+document.getElementById('aa'+index).value+"', '"+document.getElementById('s'+index).value+"', 'Bottle');";
    /*     alert(query); */
            const url = dbpath1+'delTank.php';
            let fData = new FormData();
            fData.append('query', query);

            axios.post(url, fData)
                .then(response =>{})
                .catch(error => {
                console.log(error.toJSON());
        });

    }

    // function convertDateFormat(inputDate) {
    //     // Split the string into an array [yyyy, mm, dd]
    //     let parts = inputDate.split('-');
    
    //     // Rearrange the array and join it back to a string
    //     return parts[2] + '-' + parts[1] + '-' + parts[0];
    // }

    useEffect(() => {
        loadOilGodown();
        loadTHistory();
      }, []); 
      const datecache = Cookies.get('dateCookies');
    return (
    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'> 
        
           {/*  <h2 className='mt-3 text-center'>Oil Retail</h2>
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
                            <th className='tablebg'>T. Op. Stk</th>
                            <th className='tablebg'>Differnce</th>
                            <th className='tablebg'>Bal Stk</th>
                            <th className='tablebg'>Bal Stk Amt</th>
                            
                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                           
                            <td scope="row">
                                <select class="form-select" aria-label="Default select example" /* value={machine}  onChange={(e) => setMachine(e.target.value)}>
                                    <option selected>- Product -</option>
                                       
                                            <option >MAK 4T Plus (900ML)</option>
                                            <option >MAK 4T Plus (1 LTR)</option>
                                            <option >MAK HONDA (800ML)</option>
                                       
                                </select>  </td>
                            <td scope="row">
                                <input type="text" class="form-control bigFontWeight" placeholder="Grade" onChange={(e) => setGrdae(e.target.value)} disabled/>
                            </td>
                            <td><input type="text" class="form-control bigFontWeight" placeholder="Color" onChange={(e) => setColor(e.target.value)} disabled/></td>
                            <td><input type="text" class="form-control bigFontWeight" placeholder="MRP" onChange={(e) => setMrp(e.target.value)} disabled/></td>
                            <td>
                                
                                <input type="text" class="form-control bigFontWeight" placeholder="Volume" onChange={(e) => setPVolume(e.target.value)} disabled /> 

                            </td>
                            <td><input type="text" class="form-control bigFontWeight" placeholder="T. Op. St" onChange={(e) => setPcs(e.target.value)} disabled/></td>
                            <td><input type="text" class="form-control bigFontWeight" placeholder="Differnce" onChange={(e) => setTcases(e.target.value)} disabled/></td>
                            <td scope="row">
                                <input type="text" class="form-control bigFontWeight" placeholder="Bal Stk" onChange={(e) => setTpcs(e.target.value)} disabled/>
                            </td>
                            <td scope="row">
                                <input type="text" class="form-control bigFontWeight" placeholder="Bal Stk Amt" onChange={(e) => setDiscount(e.target.value)} disabled/>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>       

                <br></br>
                <center>
                    <div style={{display:'flex', gap:'14px', marginLeft:'35%'}}>
                        <input type="text" class="form-control bigFontWeight" placeholder="Stk to move" style={{width:'200px'}} onChange={(e) => setDiscount(e.target.value)}/>
                        <button type="button" class="btn btn-primary" onClick={onCalc}>Move to Sold</button>
                    </div>
                </center>
            </div> */}
            
            <div>
            <h2 className='mt-3 text-center'>Retail Sales / Stocks</h2>
            <span style={{fontSize:'22px'}}> Date :
                 {/* {convertDateFormat(datecache)} */}
                 </span> 
                <br></br>

                <table class="table">
                    <thead>
                        <tr className='table-secondary'>
                            <th className='tablebg'>Sr No</th>
                            <th className='tablebg'>Products</th>
                           {/*  <th className='tablebg'>Grade </th> */}
                        {/*     <th className='tablebg'>Colour</th> */}
                            <th className='tablebg'>Volume</th>
                            <th className='tablebg'>MRP</th>
                           {/*  <th className='tablebg'>Purchase Price</th>
                            <th className='tablebg'>Differnce</th> */}
                            <th className='tablebg'>Op Stk</th>
                            <th className='tablebg'>Inward</th>
                            <th className='tablebg'>T.Op. Stk</th>
                            
                            <th className='tablebg' >Sale</th>
                          
                            <th className='tablebg'>Bal Stk</th>
                            <th className='tablebg'>Sale amount</th>
                            <th className='tablebg' >Discount</th>
                            <th className='tablebg'>A. Amt</th>
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                          
                    {oil_godown.map((res,index)=>
                                <tr key={index}>
                                    <td >{index+1}</td>   
                                    <td id={'p'+res.id}>{res.product_name}</td>   
                                    <td id={'g'+res.id} style={{display:'none'}}>{res.product_grade}</td>
                                    <td id={'c'+res.id} style={{display:'none'}}>{res.product_colour}</td>
                                    <td id={'v'+res.id}>{res.product_volume_per_pcs}</td>
                                    <td id={'m'+res.id}>{res.product_mrp}</td>
                                    <td id={'o'+res.id}>{res.retail_op_stk} </td>
                                    <td id={'i'+res.id} style={{fontWeight:'700', color:'blue', }}>{res.retail_inward}  </td>
                                    <td  id={'t'+res.id} style={{fontWeight:'700', color:'red', }}>{res.retail_top_stk} </td>

                                    <td className='editableDiv' ><input  type="text" id={'s'+res.id}  class="form-control editableInput bigFontWeight " placeholder="Sale" onChange={(e) => calc(e.target.value,res.id)}  /></td>
                                    <td><input id={'bs'+res.id} type="text" class="form-control bigFontWeight" placeholder="Loading.." disabled /></td>
                                    <td><input id={'sa'+res.id} type="text" class="form-control bigFontWeight" placeholder="Loading.." disabled /></td>
                                    <td><input  type="text" id={'d'+res.id}  class="form-control editableInput bigFontWeight" placeholder="Discount" onChange={(e) => calc1(e.target.value, res.id)}  /></td>
                                    <td ><input  type="text" id={'aa'+res.id}  class="form-control bigFontWeight" placeholder="Loading.." disabled /></td>
                                    
                                    <td style={{width:'50px'}} >
                                        <button type="button" id={"tank"+res.tank_no} class="btn btn-primary" onClick={() =>{ onSale(res.id); addToTransac(res.id,res.product_id);}}> Save </button>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>    
              {/*   <center><button type="button" class="btn btn-primary" onClick={onCalc}>Move to Godown</button></center> */}
                        
              <br></br>  
                Today History : 
                <table class="table">
                    <thead>
                        <tr className='table-secondary'>
                            
                        <th className='tablebg'>Sr No</th>
                            <th className='tablebg'>Products</th>
                            <th className='tablebg'>Grade </th>
                            <th className='tablebg'>Colour</th>
                            <th className='tablebg'>Volume</th>
                            <th className='tablebg'>MRP</th>
                           {/*  <th className='tablebg'>Purchase Price</th>
                            <th className='tablebg'>Differnce</th> */}
                           
                            
                            <th className='tablebg' >Sale</th>
                          
                            <th className='tablebg'>Sale amount</th>
                            <th className='tablebg' >Discount</th>
                            <th className='tablebg'>A. Amt</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                         
                         
                         {history.map((res,index)=>
                                <tr  key={index}>
                                     <th>{index+1}</th>   
                                     <td>{res.product_name}</td>   
                                    
                                    <td>{res.product_grade}</td>
                                    <td>{res.product_colour}</td>
                                    <td>{res.product_volume_per_pcs}</td>
                                    <td>{res.product_mrp}</td>

                                    <td>{res.qty}</td>
                                    <td>{res.amount}</td>
                                    <td>{res.discount}</td>
                                    <td>{res.a_amount}</td>
                                   
                                   
                                   {/*  <td style={{width:'50px'}}>
                                       
                                        <button type="button" id={"tank"+res.tank_no} class="btn btn-primary" onClick={() =>{ onMoveRetail(res.id); setGodownData(res.id); }}>Save</button>
                                    </td> */}
                                </tr>
                   )}

                   

                    </tbody>
                </table>  
            
            </div>      
        </div>
    </>
  )
}
