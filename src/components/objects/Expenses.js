import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function Expenses({dbpath1}) {
  
    const [THistory, setTHistory] = useState([]);
    const [petrocard, setpetrocard] = useState([]);
    const [expensename, setExpensename] = useState([]);

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
    const [PCSPerCase, setPCSPerCase] = useState('');
    const [icrad, setICard] = useState('');

    
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');
    const [narration, setNarration] = useState('');
    const [tamount, setTAmount] = useState('');

    const loadExpenseName = async () => {

      

      let query="select * from rwt_expense_name where status = 'Active' ORDER BY name ";
             
      /*    alert(query); */
         const url = dbpath1 + 'getDynamic.php';
         let fData = new FormData();

         fData.append('query', query);

             const response = await axios.post(url, fData);
             
             if (response && response.data) {
                 
                 if (response.data.phpresult) {
                     setExpensename(response.data.phpresult); 
                     console.log("werwer"+response.data.phpresult);  
                   
                 }
             }}

    const loadTHistory = async () => {

      let query="select * from rwt_daily_expenses where date = '"+datecache+"';";
             
         /* alert(query); */
         const url = dbpath1 + 'getDynamic.php';
         let fData = new FormData();

         fData.append('query', query);

             const response = await axios.post(url, fData);
             
             if (response && response.data) {
                 
                 if (response.data.phpresult) {
                     setTHistory(response.data.phpresult); 
                     console.log(response.data.phpresult);
                 }
             }
      
    }

    const loadTAmount = async () => {

        let query="select sum(amount) as ta from rwt_daily_expenses where date = '"+datecache+"';";
               
           /* alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();
  
           fData.append('query', query);
  
               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       setTAmount(response.data.phpresult[0]['ta']); 
                       console.log(response.data.phpresult);
                   }
               }
      }
  
    const navigate = useNavigate();

    const onAdd = () =>{

     
      if (name.length === 0) {
        alert("Expense name has been left blank!");
      }   else if (amount.length === 0) {
        alert("Amount has been left blank!");
      }  else {
  
        let query="INSERT INTO `rwt_daily_expenses` (`id`, `name`, `amount`, `narration`, `date`) VALUES (NULL, '"+name+"', '"+amount+"', '"+narration+"','"+datecache+"');";
         /*  alert(query); */   
         const url = dbpath1+'delTank.php';
         let fData = new FormData();
         fData.append('query', query);
         
         axios.post(url, fData)
         .then(response => {alert(response.data);  window.location.reload(); upDateBatchNo(icrad)})
             .catch(error => {
             console.log(error.toJSON());

      });


    }
    }

    const upDateBatchNo = async (index) => {
        var temp = parseInt(document.getElementById('currentb').value)+1;
        let query="UPDATE `rwt_petro_card` SET `batch` = '"+temp+"' WHERE id = "+index+";";
      
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

    const setICardInfo = async (index) => {
      const selectedProduct = petrocard.find(product => product.id === index);
      document.getElementById('tid1').value = selectedProduct.tid1;
      document.getElementById('tid2').value = selectedProduct.tid2;
      document.getElementById('tid3').value = selectedProduct.tid3;
      document.getElementById('lastb').value = selectedProduct.batch-1;
      document.getElementById('currentb').value = selectedProduct.batch;
    }

    const onDelete = async (index) => {
      let query="DELETE FROM `rwt_daily_expenses` WHERE id = "+index+";";
    
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

  const getPCData = (index) =>{
    try
    {
        const selectedProduct = petrocard.find(product => product.id === index);
        //console.log("dwdwd"+selectedProduct);
        return(selectedProduct.machinename);    
    }
    catch
    {

    }
  }

  const onSave = async (index) => {
    let query="UPDATE `rwt_oil_pouches` SET `pcs_per_box` = '"+ document.getElementById('pcs'+index).value+"', `amount` = '"+document.getElementById('mrp'+index).value+"' WHERE `id` = '"+index+"';";
  
    //alert(query);
    const url = dbpath1+'delTank.php';
    let fData = new FormData();
    fData.append('query', query);
    
    axios.post(url, fData)
        .then(response =>{ alert(response.data);/*  window.location.reload(); */})
        .catch(error => {
        console.log(error.toJSON());
        });
}
  
    useEffect(() => {
       loadTHistory();
       loadExpenseName();
       loadTAmount();
      }, []); 
      const datecache = Cookies.get('dateCookies');
      function convertDateFormat(inputDate) {
        // Ensure inputDate is a valid string and use '-' as delimiter
        if (typeof inputDate !== 'string') {
          console.error('Invalid inputDate:', inputDate);
          return '';
        }
      
        // Split the string into an array [yyyy, mm, dd]
        let parts = inputDate.split('-');
      
        if (parts.length !== 3) {
          console.error('Invalid date format:', inputDate);
          return '';
        }
      
        // Rearrange the array and join it back to a string
        return parts[2] + '-' + parts[1] + '-' + parts[0];
      }
      
      // Example usage
      const formattedDate = convertDateFormat('2023-06-26');
      console.log(formattedDate); // Output: 26-06-2023
      
    //   function convertDateFormat(inputDate) {
    //     // Split the string into an array [yyyy, mm, dd]
    //     let parts = inputDate.split('');
    
    //     // Rearrange the array and join it back to a string
    //     return parts[2] + '-' + parts[1] + '-' + parts[0];
    // }
    return (

    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>   
      
            <h2 className='mt-3 text-center'>Daily Expenses</h2>
            <span style={{fontSize:'22px'}}> Date : {convertDateFormat(datecache)}</span>
            <div>
                <br></br>
                <table class="table">
                    <thead>  
                        <tr className='table-secondary'>                            
                            <th className='tablebg'>Expense Name</th>
                            <th className='tablebg'>Amount</th>
                            <th className='tablebg' style={{width:'600px'}}>Narration</th>
                            <th className='tablebg' style={{width:'150px'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                        <td scope="row">    
                                 <select style={{width:''}} class="form-select editableInput bigFontWeight" aria-label="Default select example" value={name}  onChange={(e) =>{ setName(e.target.value);  /*  getTotalAmount1(e.target.value); *//*  setSelectedValues(e.target.value); */}}>
                                      <option selected>- select -</option>
                                        
                                      {expensename.map((rest) => (  
                                          <option value={rest.name}>{rest.name} </option>
                                      ))}
                                  </select> 
                           
                            </td>
                          
                            <td scope="row">    
                            <input type="text" class="form-control editableInput bigFontWeight" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
                               </td>
                               <td scope="row">    
                            <input type="text" class="form-control editableInput bigFontWeight" placeholder="Narration" onChange={(e) => setNarration(e.target.value)} />
                               </td>
                            <td><button type="button" class="btn btn-primary" onClick={onAdd}>ADD</button></td>
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
                            <th className='tablebg'>Name</th>
                            <th className='tablebg'>Amount</th>
                            <th className='tablebg'>Narration</th>
                        
                            <th className='tablebg'>Action</th>
                           {/*  <th className='tablebg'>Action</th> */}
                        </tr>
                    </thead>
                    <tbody>
                       
                    {THistory.map((res,index)=>
                                <tr className='hovereffect' key={index}>
                              
                                    <td>{res.name}</td>
                                 
                                    <td>{res.amount}</td>
                                   
                                    <td style={{width:'600px'}}>{res.narration}</td>
                                    <td>
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.id} class="btn btn-success" onClick={() => onDelete(res.id)}>Delete</button> &nbsp;&nbsp; 
                                   </td>
                                </tr>
                            )}

                                

                              
                    </tbody>
                </table>    
                <span style={{marginLeft:'82px'}}>Amount : {tamount}</span>
            </div>      
        </div>
    </>
  )
}
