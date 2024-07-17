import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function AddStaff({dbpath1}) {
  
    const [Staff, setStaff] = useState([]);
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState('');
    const [istatus, setIStatus] = useState('');

    function convertDateFormat(inputDate) {
        // Split the string into an array [yyyy, mm, dd]
        let parts = inputDate.split('-');
    
        // Rearrange the array and join it back to a string
        return parts[2] + '-' + parts[1] + '-' + parts[0];
    }

    const loadStaff = async () => {
        let query="select * from rwt_staff";
             
       
        /*    alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       setStaff(response.data.phpresult); 
                       const initialStatus = {};
                       response.data.phpresult.forEach(st => {
                        initialStatus[st.staff_id] = st.status;
                       
                      });
                      console.log(initialStatus);

                      setIStatus(initialStatus);

                     /*   console.log(response.data.phpresult); */
                   }
               }
      }
      
      

    const navigate = useNavigate();

    const onAdd = () =>{
        if (firstName.length === 0) {
            alert("Bank Name has been left blank!");
          }   else if (lastName.length === 0) {
            alert("Head Name has been left blank!");
          }   else {
      
            let query="INSERT INTO `rwt_staff` (`staff_id`, `first_name`, `last_name`, `status`) VALUES (NULL, '"+firstName+"', '"+lastName+"', 'active');";
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
        let query="DELETE FROM `rwt_staff` WHERE staff_id = "+index+";";
        /* alert(query); */
        const url = dbpath1+'delTank.php';
        let fData = new FormData();
        fData.append('query', query);
        
        axios.post(url, fData)
        .then(response => {alert(response.data);  window.location.reload();})
            .catch(error => {
            console.log(error.toJSON());
            });
    }

    const onSave = async (index,pstatus) => {
        let query="UPDATE `rwt_staff` SET `status` = '"+pstatus+"' WHERE `staff_id` = "+index+";";
        /* alert(query); */
        const url = dbpath1+'delTank.php';
        let fData = new FormData();
        fData.append('query', query);
        
        axios.post(url, fData)
        .then(response => {alert(response.data);  window.location.reload();})
            .catch(error => {
            console.log(error.toJSON());
            });
    }   

    useEffect(() => {
        loadStaff();
      }, []); 
      const datecache = Cookies.get('dateCookies');
    return (
    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>   
       
            <h2 className='mt-3 text-center'>Add Staff</h2>
            <span style={{fontSize:'22px'}}> Date : {convertDateFormat(datecache)}</span>
            <div>
                <br></br>
                <table class="table" style={{width:'800px'}}>
                    <thead>
                        <tr className='table-secondary'>
                            <th className='tablebg'>First Name</th>
                            <th className='tablebg'>Last Name</th>
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                          
                            <td><input type="text" class="form-control editableInput bigFontWeight " placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight " placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} /></td>
                            <td><button type="button" class="btn btn-primary" onClick={onAdd}>Save</button></td>
                        </tr>
                        
                    </tbody>
                </table>    
            </div>
            <br></br>
            <div>
                <br></br>
                <table class="table" style={{width:'1100px'}}>
                    <thead>
                        <tr className='table-secondary'>
                        <th className='tablebg'>First Name</th>
                            <th className='tablebg'>Last Name</th>
                            <th className='tablebg'>Status</th>
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Staff.map((res,index)=>
                                <tr className='hovereffect' key={index}>
                                   
                                    <td>{res.first_name}</td>
                                    <td>{res.last_name}</td>
                                    <td style={{width:'300px'}}>{/* <input type='text' class="form-control editableInput bigFontWeight " id={"status"+res.staff_id}   value={istatus[res.staff_id]}  onChange={(e) =>{ setIStatus({...istatus, [res.staff_id]:e.target.value}); }} />  */}
                                    {res.status}
                                   </td>
                                   
                                    <td style={{width:'300px'}}>
                                        
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.staff_id} class="btn btn-danger" onClick={() => onDelete(res.staff_id)}>Delete</button> &nbsp;&nbsp; 
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.staff_id} class="btn btn-info" onClick={() => onSave(res.staff_id, "active")}>Open</button>  &nbsp;&nbsp;
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.staff_id} class="btn btn-warning" onClick={() => onSave(res.staff_id, "closed")}>Close</button>
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
