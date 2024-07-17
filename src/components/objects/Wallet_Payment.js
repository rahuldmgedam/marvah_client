import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function Wallet_Payment({dbpath1}) {
  
    const [wallet, setWallet] = useState([]);
    const [tHistory, setTHistory] = useState([]);
    
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
    const [name, setName] = useState('');
    const [nTrans, setNTrans] = useState('');
    const [amount, setAmonut] = useState('');

//     const loadWallet = async () => {


//       let query="select * from rwt_wallet where status = 'Active'";
             
//       /*    alert(query); */
//          const url = dbpath1 + 'getDynamic.php';
//          let fData = new FormData();

//          fData.append('query', query);

//              const response = await axios.post(url, fData);
             
//              if (response && response.data) {
                 
//                  if (response.data.phpresult) {
//                      setWallet(response.data.phpresult); 
//                      console.log(response.data.phpresult);
//                  }
//              }

             
//       let i=0;
//      /*  var elements = document.getElementsByClassName("ratehsd");
//       for ( i = 0; i < elements.length; i++) {
//           elements[i].value = dayStartRate[0]['hsd'];
//       } */
//       for(i=0;i<response.data.phpresult.length;i++)
//       {
//         try
//         {
//           console.log(i);
//           document.getElementById('mrp'+response.data.phpresult[i]['id']).value = response.data.phpresult[i]['amount'];
//           document.getElementById('pcs'+response.data.phpresult[i]['id']).value = response.data.phpresult[i]['pcs_per_box'];
//         }
//         catch{
//           console.log('catched expection');
//         }
//       }
//     }

//     const loadTHistory = async () => {


//       let query="select * from rwt_wallet_transactions where date='"+datecache+"'";
             
//          //alert(query);
//          const url = dbpath1 + 'getDynamic.php';
//          let fData = new FormData();

//          fData.append('query', query);

//              const response = await axios.post(url, fData);
             
//              if (response && response.data) {
                 
//                  if (response.data.phpresult) {
//                      setTHistory(response.data.phpresult); 
//                      console.log("we"+response.data.phpresult);
//                  }
//              }
//           }

//     const navigate = useNavigate();

//     const onAdd = () =>{
        
//       if (name.length === 0) {
//         alert("Wallet Name has been left blank!");
//       }   else if (nTrans.length === 0) {
//         alert("Number of Transaction has been left blank!");
//       }   else if (amount.length === 0) {
//         alert("Amount has been left blank!");
//       }else {
  
//         let query="INSERT INTO `rwt_wallet_transactions` (`id`, `name`, `no_of_trans`, `amount`, `date`) VALUES (NULL, '"+name+"', '"+nTrans+"', '"+amount+"', '"+datecache+"');";
//         /*  alert(q ery); */   
//          const url = dbpath1+'delTank.php';
//          let fData = new FormData();
//          fData.append('query', query);
//          axios.post(url, fData)
//          .then(response => {alert(response.data);  window.location.reload();})
//              .catch(error => {
//              console.log(error.toJSON());
//       });
//     }
//     }

//     const loadWalletValue = async () => {

//       let query="select sum(amount) as asum from rwt_wallet_transactions where date = '"+datecache+"';";
             
//          /* alert(query); */
//          const url = dbpath1 + 'getDynamic.php';
//          let fData = new FormData();
  
//          fData.append('query', query);
  
//              const response = await axios.post(url, fData);
             
//              if (response && response.data) {
                 
//                  if (response.data.phpresult) {
//                      document.getElementById('wallet').innerHTML = response.data.phpresult[0]['asum']; 
//                      console.log(response.data.phpresult);
//                  }
//              }
      
//     }
  

//     const onDelete = async (index) => {
//       let query="DELETE FROM `rwt_wallet_transactions` WHERE id = "+index+";";
    
//       //alert(query);
//       const url = dbpath1+'delTank.php';
//       let fData = new FormData();
//       fData.append('query', query);
      
//       axios.post(url, fData)
//           .then(response =>{ alert(response.data); window.location.reload();})  
//           .catch(error => {
//           console.log(error.toJSON());
//           });
//   }

//   const onSave = async (index) => {
//     let query="UPDATE `rwt_oil_pouches` SET `pcs_per_box` = '"+ document.getElementById('pcs'+index).value+"', `amount` = '"+document.getElementById('mrp'+index).value+"' WHERE `id` = '"+index+"';";
  
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
    //    loadWallet();
    //    loadTHistory();
    //    loadWalletValue();
    //   }, []); 
    //   const datecache = Cookies.get('dateCookies');

    //   function convertDateFormat(inputDate) {
    //     // Split the string into an array [yyyy, mm, dd]
    //     let parts = inputDate.split('-');
    
    //     // Rearrange the array and join it back to a string
    //     return parts[2] + '-' + parts[1] + '-' + parts[0];
    // }
    return (

    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>   
      
            <h2 className='mt-3 text-center'>Wallet Payment</h2>
            <span style={{fontSize:'22px'}}> Date :
                 {/* {convertDateFormat(datecache)} */}
                 </span>
            <div>
                <br></br>
                <table class="table" style={{width:'930px'}}>
                    <thead>  
                        <tr className='table-secondary'>                            
                            <th className='tablebg'>Wallet Name</th>
                            <th className='tablebg'>Number Of Trans</th>
                            <th className='tablebg'>Amount</th>
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                        <td scope="row">    
                         
                           <select  class="form-select editableInput bigFontWeight" aria-label="Default select example" value={name}  onChange={(e) =>{ setName(e.target.value);  /*  getTotalAmount1(e.target.value); *//*  setSelectedValues(e.target.value); */}}>
                                      <option selected>- select -</option>
                                        
                                      {wallet.map((rest) => (  
                                          <option value={rest.name}>{rest.name}</option>
                                      ))}
                                </select> 
                           
                            </td>
                            <td scope="row">    
                                <input type="text" class="form-control editableInput bigFontWeight" placeholder="Number of Trans" onChange={(e) => setNTrans(e.target.value)} />
                            </td>
                           
                           <td scope="row">    
                                <input type="text" class="form-control editableInput bigFontWeight" placeholder="Amount" onChange={(e) => setAmonut(e.target.value)} />
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
                             <th className='tablebg'>Sr No</th> 
                                      
                            <th className='tablebg'>Wallet Name</th>
                            <th className='tablebg'>Total Transactions</th>
                            <th className='tablebg'>Amount</th>
                            <th className='tablebg'>Date</th>
                            <th className='tablebg' style={{width:'150px'}}>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                       
                      

                    {tHistory.map((res,index)=>
                                <tr className='hovereffect' key={index}>
                                   <td>{index+1}</td>
                                    <td>{res.name}</td>
                                    <td>{res.no_of_trans}</td>
                                    <td>{res.amount }</td>
                                    <td>
                                        {/* {convertDateFormat(res.date)} */}
                                        
                                            </td>
                                   
                                    <td>
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.id} class="btn btn-danger" 
                                        // onClick={() => onDelete(res.id)}
                                        >Delete</button> &nbsp;&nbsp; 
                                           </td>
                                </tr>
                            )}
                    </tbody>
                </table>    
                <div style={{marginLeft:'550px'}}><span>Total Amount : <span id='wallet'>0</span></span></div>
            
            </div>      
        </div>
    </>
  )
}
