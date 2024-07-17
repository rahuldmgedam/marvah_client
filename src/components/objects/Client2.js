import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';

export default function Client2({dbpath1}) {
  
    const [clients, setClients] = useState([]);
    
    const [ party_name, setParty_name] = useState('');
    const [contact_no, setContact_no] = useState('');
    const [remarks, setRemarks] = useState('');
    const [amount, setAmount] = useState('');
    const [product, setproduct] = useState('');
    const [nozzles_in_mpd, setnozzles_in_mpd] = useState('');

    const [inputDispensingUnitNo, setInputDispensingUnitNo] = useState({});
const [inputMake, setInputMake] = useState({});
const [inputSerialNo, setInputSerialNo] = useState({});
const [inputConnectedTanks, setInputConnectedTanks] = useState({});
const [inputProduct, setInputProduct] = useState({});
const [inputNozzlesInMpd, setInputNozzlesInMpd] = useState({});


// const loadClients = async () => {
//   let query="SELECT * FROM `rwt_client`;";
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
//                     }
//                 }
//             } catch (error) {
//                 console.log("Please Select Proper Input");
//             }


//         }

    const navigate = useNavigate();
    const datecache = Cookies.get('dateCookies');
    // const onAdd = () =>{
        
    //     if (party_name.length === 0) {
    //         alert("Party Name has been left blank!");
    //       }   else if (contact_no.length === 0) {
    //         alert("Contact No has been left blank!");
    //       }   else if (remarks.length === 0) {
    //         alert("Remarks has been left blank!");
    //       }  else {
    //         {
        
    //           const url = dbpath1+'delTank.php';
  
    //           var query = "INSERT INTO `rwt_client` (`client_id`, `party_name`, `contact_no`, `remarks`, `amount`) VALUES (NULL, '"+party_name+"', '"+contact_no+"', '"+remarks+"', '"+0+"');";
  
    //           let fData = new FormData();
    //           fData.append('query', query);
    //           axios.post(url, fData)
    //             .then(response =>{ alert(response.data); window.location.reload();})
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

    //   function convertDateFormat(inputDate) {
    //     // Split the string into an array [yyyy, mm, dd]
    //     let parts = inputDate.split('-');
    
    //     // Rearrange the array and join it back to a string
    //     return parts[2] + '-' + parts[1] + '-' + parts[0];
    // }
    

    // const onSave = async (index) => {
    //     let query="UPDATE pupc_machines SET dispensing_unit_no = '"+document.getElementById("inputDispensingUnitNo"+index).value+"', make = '"+document.getElementById("inputMake"+index).value+"', serial_no = '"+document.getElementById("inputSerialNo"+index).value+"', connected_tanks = '"+document.getElementById("inputConnectedTanks"+index).value+"', product = '"+document.getElementById("inputProduct"+index).value+"', nozzles_in_mpd = '"+document.getElementById("inputNozzlesInMpd"+index).value+"' WHERE machine_id = "+index;
    //     /* alert(query); */
    //     const url = dbpath1+'delTank.php';
    //     let fData = new FormData();
    //     fData.append('query', query);
        
    //     axios.post(url, fData)
    //         .then(response => alert(response.data))
    //         .catch(error => {
    //         console.log(error.toJSON());
    //         });
    // }

//     const onDelete = async (index) => {
//       let query="DELETE FROM `rwt_client` WHERE client_id = "+index+";";
    
//       /* alert(query); */
//       const url = dbpath1+'delTank.php';
//       let fData = new FormData();
//       fData.append('query', query);
      
//       axios.post(url, fData)
//           .then(response =>{ alert(response.data); window.location.reload();})
//           .catch(error => {
//           console.log(error.toJSON());
//           });
//   }
    return (

    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>   
      
            <h2 className='mt-3 text-center'>Add Client</h2>
            <span style={{fontSize:'22px'}}> Date :
                 {/* {convertDateFormat(datecache)} */}
                 </span>
            <div>
                <br></br>
                <table class="table" style={{width:'900px'}}>
                    <thead>
                        <tr className='table-secondary'>
                            <th className='tablebg'>Party Name</th>
                            <th className='tablebg'>Contact no.</th>
                            <th className='tablebg'>Remarks</th>
                           {/*  <th className='tablebg'>Amount</th> */}
                            
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                            <td scope="row">
                                <input type="text" class="form-control  editableInput bigFontWeight" placeholder="Name" onChange={(e) => setParty_name(e.target.value)} />
                            </td>
                            <td><input type="text" class="form-control  editableInput bigFontWeight" placeholder="Contact No." onChange={(e) => setContact_no(e.target.value)} /></td>
                            <td><input type="text" class="form-control  editableInput bigFontWeight" placeholder="Remarks" onChange={(e) => setRemarks(e.target.value)} /></td>
                            {/* <td><input type="text" class="form-control  editableInput bigFontWeight" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} /></td>
                            */}
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
                            <th className='tablebg'>Party Name</th>
                            <th className='tablebg'>Contact no.</th>
                            <th className='tablebg'>Remarks</th>
                           {/*  <th className='tablebg'>Amount</th>
                             */}
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {clients.map((res,index)=>
                                <tr className='hovereffect' key={index}>
                                     <td>{res.party_name}</td>    
                                     <td>{res.contact_no}</td>  
                                    <td>{res.remarks}</td>
                                    
                                    {/* <td>{res.amount}</td>  */}
                                    <td style={{width:'150px'}}>
                                    {/* <button type="button" id={"tank"+res.machine_id} class="btn btn-primary " onClick={() => onSave(res.machine_id)}>Save</button> &nbsp;
                                     */}    {/* <button type="button" id={"tank"+res.machine_id} class="btn btn-primary">Close</button> &nbsp;
                                        <button type="button" id={"tank"+res.machine_id} class="btn btn-primary">Open</button> &nbsp; */}
                                        <button type="button" id={"tank"+res.client_id} class="btn btn-danger "
                                        //  onClick={() => onDelete(res.client_id)}
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
