import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function Add_Petro_Card({dbpath1}) {
  
    const [Wallet, setWallet] = useState([]);
    
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

    const [bankName, setBankName] = useState('');

    // const loadWallet = async () => {


    //   let query="select * from rwt_wallet";
             
    //   /*    alert(query); */
    //      const url = dbpath1 + 'getDynamic.php';
    //      let fData = new FormData();

    //      fData.append('query', query);

    //          const response = await axios.post(url, fData);
             
    //          if (response && response.data) {
                 
    //              if (response.data.phpresult) {
    //                  setWallet(response.data.phpresult); 
    //                  console.log(response.data.phpresult);
    //              }
    //          }

             
    //   let i=0;
    //  /*  var elements = document.getElementsByClassName("ratehsd");
    //   for ( i = 0; i < elements.length; i++) {
    //       elements[i].value = dayStartRate[0]['hsd'];
    //   } */
    //   for(i=0;i<response.data.phpresult.length;i++)
    //   {
    //     try
    //     {
    //       console.log(i);
    //     document.getElementById('mrp'+response.data.phpresult[i]['id']).value = response.data.phpresult[i]['amount'];
    //     document.getElementById('pcs'+response.data.phpresult[i]['id']).value = response.data.phpresult[i]['pcs_per_box'];
    //     }
    //     catch{
    //       console.log('catched expection');
    //     }
    //   }
    // }

    const navigate = useNavigate();

    // const onAdd = () =>{
        
    //   if (bankName.length === 0) {
    //     alert("Bank Name has been left blank!");
    //   }   else {
  
    //     let query=("INSERT INTO `rwt_wallet` (`id`, `name`, `status`, `date`) VALUES (NULL, '"+bankName+"', 'Active', '"+datecache+"');");
    //     /*  alert(query); */   
    //      const url = dbpath1+'delTank.php';
    //      let fData = new FormData();
    //      fData.append('query', query);
         
    //      axios.post(url, fData)
    //      .then(response => {alert(response.data);  window.location.reload();})
    //          .catch(error => {
    //          console.log(error.toJSON());
    //   });
    // }
    // }

  //   const onDelete = async (index) => {
  //     let query="DELETE FROM `rwt_wallet` WHERE id = "+index+";";
    
  //     //alert(query);
  //     const url = dbpath1+'delTank.php';
  //     let fData = new FormData();
  //     fData.append('query', query);
      
  //     axios.post(url, fData)
  //         .then(response =>{ alert(response.data); window.location.reload();})  
  //         .catch(error => {
  //         console.log(error.toJSON());
  //         });
  // }

//   const setStatus = async (index,pstatus) => {
//     let query="UPDATE `rwt_wallet` SET `status` = '"+pstatus+"' WHERE `id` = '"+index+"';";
  
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
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>   
      
            <h2 className='mt-3 text-center'>Add Wallet</h2>
            <span style={{fontSize:'22px'}}> Date :
               {/* {convertDateFormat(datecache)} */}
               </span>
            <div>
                <br></br>
                <table class="table">
                    <thead>
                        <tr className='table-secondary'>                            
                            <th style={{width:'300px'}} class="col ">Bank Name</th>
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                            <td scope="row">    
                                <input type="text" class="form-control editableInput bigFontWeight" placeholder="Bank Name" onChange={(e) => setBankName(e.target.value)} />
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
                                      
                            <th className='tablebg'>Card Name</th>
                            <th className='tablebg'>Status</th>
                            <th className='tablebg' style={{width:'350px'}}>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                    {Wallet.map((res,index)=> 
                                <tr className='hovereffect'>
                                   <td scope="row">    
                                    {index+1}
                                    </td>  
                                    <td scope="row">    
                                   {res.name}
                                    </td>  
                                    <td>{res.status}</td>

                                    <td style={{width:'180px'}}>
                                       {/*  <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Edit</button> &nbsp;
                                        <button type="button" id={"tank"+   res.tank_no} class="btn btn-primary">Close</button> &nbsp;
                                          <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Open</button> &nbsp; */}
                                        <button type="button" id={"tank"+res.id} class="btn btn-danger "
                                        //  onClick={() => onDelete(res.id)}
                                         >Delete</button>&nbsp;
                                        <button type="button" id={"tank"+res.id} class="btn btn-info "
                                        //  onClick={() => setStatus(res.id,'Active')}
                                         >Open</button>&nbsp;
                                        <button type="button" id={"tank"+res.id} class="btn btn-warning " 
                                        // onClick={() => setStatus(res.id,'Closed')}
                                        >Close</button>
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
