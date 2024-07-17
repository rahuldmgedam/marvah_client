import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function AddMode({dbpath1}) {
  
    const [Staff, setStaff] = useState([]);
    
    const [modeName, setModeName] = useState('');
    const [narration, setnarration] = useState('');
    const [status, setStatus] = useState('');
    const [istatus, setIStatus] = useState('');

    function convertDateFormat(inputDate) {
        // Split the string into an array [yyyy, mm, dd]
        let parts = inputDate.split('-');
    
        // Rearrange the array and join it back to a string
        return parts[2] + '-' + parts[1] + '-' + parts[0];
    }

    const loadMode = async () => {
        let query="select * from rwt_mode";
             
       
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

    // const onAdd = () =>{
    //     if (modeName.length === 0) {
    //         alert("Mode Name has been left blank!");
    //       }     else {
      
    //         let query="INSERT INTO `rwt_mode` (`id`, `name`, `narration`) VALUES (NULL, '"+modeName+"', '"+narration+"');";
    //         /*  alert(query); */
    //          const url = dbpath1+'delTank.php';
    //          let fData = new FormData();
    //          fData.append('query', query);
             
    //          axios.post(url, fData)
    //          .then(response => {alert(response.data);  window.location.reload();})
    //              .catch(error => {
    //              console.log(error.toJSON());
    //       });
    //     }
    // }

    // const onDelete = async (index) => {
    //     let query="DELETE FROM `rwt_mode` WHERE id = "+index+";";
    //     /* alert(query); */
    //     const url = dbpath1+'delTank.php';
    //     let fData = new FormData();
    //     fData.append('query', query);
        
    //     axios.post(url, fData)
    //     .then(response => {alert(response.data);  window.location.reload();})
    //         .catch(error => {
    //         console.log(error.toJSON());
    //         });
    // }

    // const onSave = async (index,pstatus) => {
    //     let query="UPDATE rwt_staff SET status = '"+pstatus+"' where staff_id = '"+index+"'";
    //     /* alert(query); */
    //     const url = dbpath1+'delTank.php';
    //     let fData = new FormData();
    //     fData.append('query', query);
        
    //     axios.post(url, fData)
    //         .then(response =>{window.location.reload();})
    //         .catch(error => {
    //         console.log(error.toJSON());
    //     });
    // }   

    // useEffect(() => {
    //     loadMode();
    //   }, []); 
      const datecache = Cookies.get('dateCookies');
    return (
    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>   
       
            <h2 className='mt-3 text-center'>Add Mode</h2>
            <span style={{fontSize:'22px'}}> Date :
                 {/* {convertDateFormat(datecache) */}
                 </span>
            <div>
                <br></br>
                <table class="table" style={{width:'800px'}}>
                    <thead>
                        <tr className='table-secondary'>
                            <th className='tablebg'>Mode Name</th>
                            <th className='tablebg'>Narration</th>
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                            <td><input type="text"class="form-control editableInput bigFontWeight" placeholder="Mode Name" onChange={(e) => setModeName(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="Narration" onChange={(e) => setnarration(e.target.value)} /></td>
                            <td><button type="button" class="btn btn-primary" 
                            // onClick={onAdd}
                            >Save</button></td>
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
                        <th className='tablebg'>Mode Name</th>
                            <th className='tablebg'>Narration</th>
                            {/* <th className='tablebg'>Status</th> */}
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Staff.map((res,index)=>
                                <tr className='hovereffect' key={index}>
                                   
                                    <td>{res.name}</td>
                                    <td>{res.narration}</td>
                                   
                                   
                                    <td style={{width:'300px'}}>
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.id} class="btn btn-danger"
                                        //  onClick={() => onDelete(res.id)}
                                         >Delete</button> &nbsp;&nbsp; 
                                       {/*  <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.staff_id} class="btn btn-primary" onClick={() => onSave(res.staff_id, "active")}>Open</button>  &nbsp;&nbsp;
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.staff_id} class="btn btn-primary" onClick={() => onSave(res.staff_id, "closed")}>Close</button>
                                  */}   </td>
                                </tr>
                            )}
                    </tbody>
                </table>    
            </div>      
        </div>
    </>
  )
}
