import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function Tank({dbpath1}) {
  
    const [machines, setMachines] = useState([]);
    
    const [ dispensing_unit_no, setdispensing_unit_no] = useState('');
    const [make, setmake] = useState('');
    const [serial_no, setserial_no] = useState('');
    const [connected_tanks, setconnected_tanks] = useState('');
    const [product, setproduct] = useState('');
    const [nozzles_in_mpd, setnozzles_in_mpd] = useState('');

    const [inputDispensingUnitNo, setInputDispensingUnitNo] = useState({});
const [inputMake, setInputMake] = useState({});
const [inputSerialNo, setInputSerialNo] = useState({});
const [inputConnectedTanks, setInputConnectedTanks] = useState({});
const [inputProduct, setInputProduct] = useState({});
const [inputNozzlesInMpd, setInputNozzlesInMpd] = useState({});


// const loadMachines = async () => {
//   const result = await axios.get(dbpath1 + "getMachine.php");
//   setMachines(result.data.phpresult);

//   // Other initial state settings
//   const initialDispensingUnitNo = {};
//   const initialMake = {};
//   const initialSerialNo = {};
//   const initialConnectedTanks = {};
//   const initialProduct = {};
//   const initialNozzlesInMpd = {};

//   result.data.phpresult.forEach(machines => {
//       initialDispensingUnitNo[machines.machine_id] = machines.dispensing_unit_no;
//       initialMake[machines.machine_id] = machines.make;
//       initialSerialNo[machines.machine_id] = machines.serial_no;
//       initialConnectedTanks[machines.machine_id] = machines.connected_tanks;
//       initialProduct[machines.machine_id] = machines.product;
//       initialNozzlesInMpd[machines.machine_id] = machines.nozzles_in_mpd;
//   });

//   setInputDispensingUnitNo(initialDispensingUnitNo);
//   setInputMake(initialMake);
//   setInputSerialNo(initialSerialNo);
//   setInputConnectedTanks(initialConnectedTanks);
//   setInputProduct(initialProduct);
//   setInputNozzlesInMpd(initialNozzlesInMpd);
// }

    const navigate = useNavigate();

    const onAdd = () =>{
        
        if (dispensing_unit_no.length === 0) {
            alert("Dispensing Unit No has been left blank!");
          }   else if (make.length === 0) {
            alert("Make has been left blank!");
          }   else if (serial_no.length === 0) {
            alert("Serial No has been left blank!");
          }   else if (connected_tanks.length === 0) {
            alert("Connected Tanks has been left blank!");
          }  else if (product.length === 0) {
            alert("Product has been left blank!");
          }  else if (nozzles_in_mpd.length === 0) {
            alert("Nozzles in MPD has been left blank!");
          }  else {
            const url = dbpath1+'addMachine.php';
            let fData = new FormData();
            
            fData.append('dispensing_unit_no', dispensing_unit_no);
            fData.append('make', make);
            fData.append('serial_no', serial_no);
            fData.append('connected_tanks', connected_tanks);
            fData.append('product', product);
            fData.append('nozzles_in_mpd', nozzles_in_mpd);
            axios.post(url, fData)
              .then(response => { alert(response.data); window.location.reload();})
              .catch(error => {
                console.log(error.toJSON());
          });
            
        }
    }

    // useEffect(() => {
    //     loadMachines();
    //   }, []); 

      const onDelete = async (index) => {
        let query="DELETE FROM `pupc_machines` WHERE machine_id = "+index+";";
        alert(query);
        /* alert(query); */
        const url = dbpath1+'delTank.php';
        let fData = new FormData();
        fData.append('query', query);
        
        axios.post(url, fData)
            .then(response => { alert(response.data); window.location.reload();})
            .catch(error => {
            console.log(error.toJSON());
            });
    }

    const onSave = async (index) => {
        let query="UPDATE pupc_machines SET dispensing_unit_no = '"+document.getElementById("inputDispensingUnitNo"+index).value+"', make = '"+document.getElementById("inputMake"+index).value+"', serial_no = '"+document.getElementById("inputSerialNo"+index).value+"', connected_tanks = '"+document.getElementById("inputConnectedTanks"+index).value+"', product = '"+document.getElementById("inputProduct"+index).value+"', nozzles_in_mpd = '"+document.getElementById("inputNozzlesInMpd"+index).value+"' WHERE machine_id = "+index;
        /* alert(query); */
        const url = dbpath1+'delTank.php';
        let fData = new FormData();
        fData.append('query', query);
        
        axios.post(url, fData)
            .then(response => alert(response.data))
            .catch(error => {
            console.log(error.toJSON());
            });
    }
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
      
            <h2 className='mt-3 text-center'> Create Machine</h2>
            <span style={{fontSize:'22px'}}> Date :
               {/* {convertDateFormat(datecache)} */}
               </span>
            <div>
                <br></br>
                <table class="table">
                    <thead>
                        <tr className='table-secondary'>
                            <th className='tablebg'>Dispensing Unit No.</th>
                            <th className='tablebg'>Make</th>
                            <th className='tablebg'>Serial No.</th>
                            <th className='tablebg'>Connected Tanks</th>
                            <th className='tablebg'>Product</th>
                            <th className='tablebg'>Nozzles in MPD</th>
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>    
                            <td scope="row">
                                <input type="text   " class="form-control editableInput bigFontWeight" placeholder="Dispensing Unit No." onChange={(e) => setdispensing_unit_no(e.target.value)} />
                            </td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="Make" onChange={(e) => setmake(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="Serial No." onChange={(e) => setserial_no(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="Connected Tank" onChange={(e) => setconnected_tanks(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="Product" onChange={(e) => setproduct(e.target.value)} /></td>
                            <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="Nozzles in MPD" onChange={(e) => setnozzles_in_mpd(e.target.value)} /></td>
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
                            <th className='tablebg'>Dispensing Unit No.</th>
                            <th className='tablebg'>Make</th>
                            <th className='tablebg'>Serial No.</th>
                            <th className='tablebg'>Connected Tanks</th>
                            <th className='tablebg'>Product</th>
                            <th className='tablebg'>Nozzles in MPD</th>
                            <th className='tablebg'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {machines.map((res)=>
                                <tr>
                                    <td>
    <input
      type="text"
      id={"inputDispensingUnitNo" + res.machine_id}
      className="form-control editableInput bigFontWeight"
      value={inputDispensingUnitNo[res.machine_id]}
      onChange={(e) => {
        setInputDispensingUnitNo({
          ...inputDispensingUnitNo,
          [res.machine_id]: e.target.value
        });
      }}
    />
</td>
<td>
    <input
      type="text"
      id={"inputMake" + res.machine_id}
      className="form-control editableInput bigFontWeight"
      value={inputMake[res.machine_id]}
      onChange={(e) => {
        setInputMake({
          ...inputMake,
          [res.machine_id]: e.target.value
        });
      }}
    />
</td>
<td>
    <input
      type="text"
      id={"inputSerialNo" + res.machine_id}
      className="form-control editableInput bigFontWeight"
      value={inputSerialNo[res.machine_id]}
      onChange={(e) => {
        setInputSerialNo({
          ...inputSerialNo,
          [res.machine_id]: e.target.value
        });
      }}
    />
</td>
<td>
    <input
      type="text"
      id={"inputConnectedTanks" + res.machine_id}
      className="form-control editableInput bigFontWeight"
      value={inputConnectedTanks[res.machine_id]}
      onChange={(e) => {
        setInputConnectedTanks({
          ...inputConnectedTanks,
          [res.machine_id]: e.target.value
        });
      }}
    />
</td>
<td>
    <input
      type="text"
      id={"inputProduct" + res.machine_id}
      className="form-control editableInput bigFontWeight"
      value={inputProduct[res.machine_id]}
      onChange={(e) => {
        setInputProduct({
          ...inputProduct,
          [res.machine_id]: e.target.value
        });
      }}
    />
</td>
<td>
    <input
      type="text"
      id={"inputNozzlesInMpd" + res.machine_id}
      className="form-control editableInput bigFontWeight"
      value={inputNozzlesInMpd[res.machine_id]}
      onChange={(e) => {
        setInputNozzlesInMpd({
          ...inputNozzlesInMpd,
          [res.machine_id]: e.target.value
        });
      }}
    />
</td>

                                    <td style={{width:'250px'}}>
                                    <button type="button" id={"tank"+res.machine_id} class="btn btn-success " onClick={() => onSave(res.machine_id)}>Save</button> &nbsp;
                                        {/* <button type="button" id={"tank"+res.machine_id} class="btn btn-primary">Close</button> &nbsp;
                                        <button type="button" id={"tank"+res.machine_id} class="btn btn-primary">Open</button> &nbsp; */}
                                        <button type="button" id={"tank"+res.machine_id} class="btn btn-danger " onClick={() => onDelete(res.machine_id)}>Delete</button>
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
