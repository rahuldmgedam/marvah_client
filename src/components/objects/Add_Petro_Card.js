import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function Add_Petro_Card({dbpath1}) {
  
    const [petrocard, setpetrocard] = useState([]);
    const [banks, setBanks] = useState([]);


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

    const [category, setCategory] = useState('');
    const [machinename, setMachinename] = useState('');
    const [tid1, setTid1] = useState('');
    const [tid2, setTid2] = useState('');
    const [tid3, setTid3] = useState('');
    const [petrobatch, setpetrobatch] = useState('');
    const [bankName, setBankName] = useState('');


    // const loadBanks = async () => {
    //   let query="select * from rwt_bank_account WHERE account_status='active'";
           
    //   /*    alert(query); */
    //      const url = dbpath1 + 'getDynamic.php';
    //      let fData = new FormData();
  
    //      fData.append('query', query);
  
    //          const response = await axios.post(url, fData);
             
    //          if (response && response.data) {
                 
    //              if (response.data.phpresult) {
    //                  setBanks(response.data.phpresult); 
    //                  console.log(response.data.phpresult);
    //              }
    //          }
    // }

    // const loadPetroCard = async () => {

      

    //   let query="select * from rwt_petro_card sortby ORDER BY category ";
             
    //   /*    alert(query); */
    //      const url = dbpath1 + 'getDynamic.php';
    //      let fData = new FormData();

    //      fData.append('query', query);

    //          const response = await axios.post(url, fData);
             
    //          if (response && response.data) {
                 
    //              if (response.data.phpresult) {
    //                  setpetrocard(response.data.phpresult); 
    //                  console.log(response.data.phpresult);  
    //                 let i=0;
    //                  for(i=1;i<=response.data.phpresult.length;i++)
    //                  {
    //                    // alert('category'+i);
    //                    try
    //                    {
    //                       document.getElementById('category'+response.data.phpresult[(i-1)]['id']).value = response.data.phpresult[(i-1)]['category'];
    //                       document.getElementById('machinename'+response.data.phpresult[(i-1)]['id']).value = response.data.phpresult[(i-1)]['machinename'];
    //                       document.getElementById('tid1'+response.data.phpresult[(i-1)]['id']).value = response.data.phpresult[(i-1)]['tid1'];
    //                       document.getElementById('tid2'+response.data.phpresult[(i-1)]['id']).value = response.data.phpresult[(i-1)]['tid2'];
    //                       document.getElementById('tid3'+response.data.phpresult[(i-1)]['id']).value = response.data.phpresult[(i-1)]['tid3'];
    //                       document.getElementById('batchno'+response.data.phpresult[(i-1)]['id']).value = response.data.phpresult[(i-1)]['batch'];
    //                       document.getElementById('bank'+response.data.phpresult[(i-1)]['id']).value = response.data.phpresult[(i-1)]['bank'];
    //                    }
    //                    catch
    //                    {
    //                       console.log('error catched');
    //                    }    
    //                 }
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

//     const onAdd = () =>{
//       if (category.length === 0) {
//         alert("Category has been left blank!");
//       }   else if (machinename.length === 0) {
//         alert("Machine Name has been left blank!");
//       }   else if (petrobatch.length === 0) {
//         alert("Batch has been left blank!");
//       }
//       else if (bankName.length === 0) {
//         alert("Linked Bank has been left blank!");
//       }  else {
  
//         let query="INSERT INTO `rwt_petro_card` (`id`, `category`, `machinename`, `tid1`, `tid2`, `tid3`, `batch`, `bank`, `status`) VALUES (NULL, '"+category+"', '"+machinename+"', '"+tid1+"', '"+tid2+"', '"+tid3+"', '"+petrobatch+"', '"+bankName+"', 'Active');";
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
//     }
    

//     const onDelete = async (index) => {
//       let query="DELETE FROM `rwt_petro_card` WHERE id = "+index+";";
    
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

//   const setStatus = async (index,pstatus) => {
//     let query="UPDATE `rwt_petro_card` SET `status` = '"+pstatus+"' WHERE `id` = '"+index+"';";
  
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
//     let query="UPDATE `rwt_petro_card` SET `category` = '"+ document.getElementById('category'+index).value+"', `machinename` = '"+ document.getElementById('machinename'+index).value+"', `tid1` = '"+ document.getElementById('tid1'+index).value+"', `tid2` = '"+ document.getElementById('tid2'+index).value+"', `tid3` = '"+ document.getElementById('tid3'+index).value+"', `batch` = '"+ document.getElementById('batchno'+index).value+"', `bank` = '"+ document.getElementById('bank'+index).value+"' WHERE `id` = "+index+";";
  
//     /*   */
//     const url = dbpath1+'delTank.php';
//     let fData = new FormData();
//     fData.append('query', query);
    
//     axios.post(url, fData)
//         .then(response =>{ alert(response.data);/*  window.location.reload(); */})
//         .catch(error => {
//         console.log(error.toJSON());
//         });
// }
  
//     useEffect(() => {
//        loadPetroCard();
//        loadBanks();
      
//       }, [2000]); 
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
      
            <h2 className='mt-3 text-center'>Add Petro Card</h2>
            <span style={{fontSize:'22px'}}> Date :
                 {/* {convertDateFormat(datecache)} */}
                 </span>
            <div>
                <br></br>
                <table class="table">
                    <thead>
                        <tr className='table-secondary'>          
                        <th className='tablebg'>Category</th>                  
                              <th className='tablebg'>Machine Name</th>
                              <th className='tablebg'>Machine TID-1</th>
                              <th className='tablebg'>Machine TID-2</th>
                              <th className='tablebg'>Machine TID-3</th>
                              <th className='tablebg'>Batch Number</th>
                              <th className='tablebg'>Linked to bank</th>
                              <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>  
                       
                            <td scope="row">    
                                <input type="text" class="form-control editableInput bigFontWeight" placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
                            </td>  
                            <td scope="row">    
                                <input type="text" class="form-control editableInput bigFontWeight" placeholder="Machine Name" onChange={(e) => setMachinename(e.target.value)} />
                            </td>
                            <td scope="row">      
                                <input type="text" class="form-control editableInput bigFontWeight" placeholder="Machine TID-1" onChange={(e) => setTid1(e.target.value)} />
                            </td>
                            <td scope="row">    
                                <input type="text" class="form-control editableInput bigFontWeight" placeholder="Machine TID-2" onChange={(e) => setTid2(e.target.value)} />
                            </td>
                            <td scope="row">    
                                <input type="text" class="form-control editableInput bigFontWeight" placeholder="Machine TID-3" onChange={(e) => setTid3(e.target.value)} />
                            </td>
                            <td scope="row">    
                                <input type="text" class="form-control editableInput bigFontWeight" placeholder="Batch Number" onChange={(e) => setpetrobatch(e.target.value)} />
                           </td>
                           <td scope="row">    
                                <select style={{width:'270px'}} class="form-select editableInput bigFontWeight" aria-label="Default select example" value={bankName}  onChange={(e) =>{ setBankName(e.target.value);/*  getTotalAmount1(e.target.value); *//*  setSelectedValues(e.target.value); */}}>
                                      <option selected>- select -</option>
                                        
                                      {banks.map((rest) => (  
                                          <option value={rest.name+" "+rest.account_no}>{rest.name} - {rest.account_no} </option>
                                      ))}
                                  </select> 
                            </td>

                           <td><button type="button" class="btn btn-primary" 
                        //    onClick={onAdd}
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
                <th className='tablebg' style={{width:'50px'}} >Category</th> 
                            <th className='tablebg'>Sr No</th>           
                                            
                              <th className='tablebg'>Machine Name</th>
                              <th className='tablebg'>Machine TID-1</th>
                              <th className='tablebg'>Machine TID-2</th>
                              <th className='tablebg'>Machine TID-3</th>
                              <th className='tablebg'>Batch Number</th>
                              <th className='tablebg'>Linked to bank</th>
                             
                            <th className='tablebg'>Status</th>
                            <th className='tablebg' style={{width:'300px'}} >Action</th>

                        </tr>
                    </thead>
                    <tbody>
                       
                    {petrocard.map((res,index)=> 
                                <tr className='hovereffect'>
                                   <td scope="row">    
                                        <input type="text" id={'category'+res.id} class="form-control editableInput bigFontWeight" placeholder=""  />
                                    </td> 
                                    <td>{index+1}</td>  
                                    <td scope="row">    
                                        <input type="text" id={'machinename'+res.id} class="form-control editableInput bigFontWeight" placeholder=""  />
                                    </td>  
                                    <td scope="row">    
                                        <input type="text" id={'tid1'+res.id} class="form-control editableInput bigFontWeight" placeholder=""  />
                                    </td>  
                                    <td scope="row">    
                                        <input type="text" id={'tid2'+res.id} class="form-control editableInput bigFontWeight" placeholder=""  />
                                    </td>  
                                    <td scope="row">    
                                        <input type="text" id={'tid3'+res.id} class="form-control editableInput bigFontWeight" placeholder=""  />
                                    </td>  
                                    <td scope="row">    
                                        <input type="text" id={'batchno'+res.id} class="form-control editableInput bigFontWeight" placeholder=""  />
                                    </td>  
                                    <td scope="row">    
                                      <select style={{width:'100px'}} id={'bank'+res.id} class="form-select editableInput bigFontWeight" aria-label="Default select example"   /* onChange={(e) =>{ setBankName(e.target.value); *//*  getTotalAmount1(e.target.value); *//*  setSelectedValues(e.target.value); *//* }} */>
                                        <option selected>- select -</option>
                                        {banks.map((rest) => (  
                                            <option value={rest.name+" "+rest.account_no}>{rest.name} - {rest.account_no} </option>
                                        ))}
                                    </select> 
                                    </td>  
                                    <td>{res.status}</td>

                                    <td style={{width:'180px'}}>
                                       {/*  <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Edit</button> &nbsp;
                                        <button type="button" id={"tank"+   res.tank_no} class="btn btn-primary">Close</button> &nbsp;
                                          <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Open</button> &nbsp; */}
                                         <button type="button" id={"tank"+res.id} class="btn btn-success " 
                                        //  onClick={() => onSave(res.id)}
                                         >Save</button>&nbsp;
                                        <button type="button" id={"tank"+res.id} class="btn btn-danger "   
                                        // onClick={() => onDelete(res.id

                                        
                                        >Delete</button>&nbsp;
                                        <button type="button" id={"tank"+res.id} class="btn btn-info "     
                                        // onClick={() => setStatus(res.i
                                        // d,'Active')}
                                        >Open</button>&nbsp;
                                        <button type="button" id={"tank"+res.id} class="btn btn-warning "  
                                        // onClick={() => setStatus(res.i
                                        // d,'Closed')}
                                        >Close</button>
                                    </td>
                                </tr>   
                            )}


                              {/*   <tr>
                                    <td>1</td>
                                   
                                    <td>BPCL 202725</td>
                                    <td>202725</td>
                                    <td>261</td>
                                    <td>Open</td>
                                    <td style={{width:'200px'}}>
                                        
                                        
                                        <button type="button"  class="btn btn-primary">Delete</button> &nbsp;
                                        <button type="button"  class="btn btn-primary">Close</button> &nbsp;
                                        <button type="button"  class="btn btn-primary">Open</button>
                                    </td>
                                    
                                </tr>    

                                <tr>
                                    <td>2</td>
                                   
                                    <td>HDFC</td>
                                    <td>48074538</td>
                                    <td>Batch No</td>
                                    <td>Open</td>
                                    <td style={{width:'200px'}}>
                                         
                                        
                                        <button type="button"  class="btn btn-primary">Delete</button> &nbsp;
                                        <button type="button"  class="btn btn-primary">Close</button> &nbsp;
                                        <button type="button"  class="btn btn-primary">Open</button>
                                    </td>
                                    
                                </tr>     */}
                    </tbody>
                </table>    
            </div>      
        </div>
    </>
  )
}
