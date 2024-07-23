// import React from "react";
// import "../css/Tank.css";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

// export default function Client({ dbpath1 }) {
//   const [clients, setClients] = useState([]);

//   const [party_name, setParty_name] = useState("");
//   const [contact_no, setContact_no] = useState(0);
//   const [remarks, setRemarks] = useState("");
//   const [party_id, setParty_id] = useState("");

//   const [amount, setAmount] = useState("");
//   const [product, setproduct] = useState("");
//   const [nozzles_in_mpd, setnozzles_in_mpd] = useState("");

//   const [inputDispensingUnitNo, setInputDispensingUnitNo] = useState({});
//   const [inputMake, setInputMake] = useState({});
//   const [inputSerialNo, setInputSerialNo] = useState({});
//   const [inputConnectedTanks, setInputConnectedTanks] = useState({});
//   const [inputProduct, setInputProduct] = useState({});
//   const [inputNozzlesInMpd, setInputNozzlesInMpd] = useState({});

//   const navigate = useNavigate();

//   //rahuls code 16th july
//   const [clientData,setClientData] = useState({})

//   const handleClientChange = (e)=>{
//     const {name,value} = e.target
//         e.preventDefault();
//         setClientData({...clientData,[name]:value});
//   }

//   const fetchClient = () => {
//     axios
//       .get("http://localhost:4000/client/")
//       .then((res) => {
//         console.log(" client res", res.data);
//         setClients(res.data);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   useEffect(() => {
//     fetchClient();
//   }, []);

//   const createClient = ()=>{
//     axios.post("http://localhost:4000/client/",{
//   }
//     )

// }
//   return (
//     <>
//       <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
//         <h2 className="mt-3 bg-blue-400 text-white p-3 text-2xl uppercase text-center">
//           Handloan Client
//         </h2>
//         <span style={{ fontSize: "22px" }}>
//           {" "}
//           Date :{/* {convertDateFormat(datecache)} */}
//         </span>
//         <div>
//           <br></br>
//           <table class="table" style={{ width: "900px" }}>
//             <thead>
//               <tr className="table-secondary">
//                 <th className="tablebg">Party Name</th>
//                 <th className="tablebg">Contact no.</th>
//                 <th className="tablebg">Remarks</th>
//                 {/*  <th className='tablebg'>Amount</th> */}

//                 <th className="tablebg">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td scope="row">
//                   <input
//                     type="text"
//                     class="form-control editableInput bigFontWeight"
//                     placeholder="Name"
//                     onChange={(e) => setParty_name(e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     class="form-control editableInput bigFontWeight"
//                     placeholder="Contact No."
//                     onChange={(e) => setContact_no(e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control editableInput bigFontWeight"
//                     placeholder="Remarks"
//                     onChange={(e) => setRemarks(e.target.value)}
//                   />
//                 </td>
//                 {/* <td><input type="text" class="form-control editableInput bigFontWeight" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} /></td>
//                  */}
//                 <td>
//                   <button
//                     type="button"
//                     class="btn font-bold btn-primary"
//                     //  onClick={onAdd}
//                   >
//                     SAVE
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <br></br>
//         <div>
//           <br></br>
//           <table class="table">
//             <thead>
//               <tr className="table-secondary">
//                 <th className="tablebg">Party Name</th>
//                 <th className="tablebg">Contact no.</th>
//                 <th className="tablebg">Remarks</th>
//                 {/*  <th className='tablebg'>Amount</th>
//                  */}
//                 <th className="tablebg">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {clients.map((res, index) => (
//                 <tr className="hovereffect" key={index}>
//                   <td>{res.party_name}</td>
//                   <td>{res.contact_no}</td>
//                   <td>{res.remarks}</td>

//                   {/* <td>{res.amount}</td>  */}
//                   <td style={{ width: "150px" }}>
//                     {/* <button type="button" id={"tank"+res.machine_id} class="btn btn-primary " onClick={() => onSave(res.machine_id)}>Save</button> &nbsp;
//                      */}{" "}
//                     {/* <button type="button" id={"tank"+res.machine_id} class="btn btn-primary">Close</button> &nbsp;
//                                         <button type="button" id={"tank"+res.machine_id} class="btn btn-primary">Open</button> &nbsp; */}
//                     <button
//                       type="button"

//                       class="bg-blue-500 px-2 py-1 text-white rounded-md "
//                       // onClick={() => onDelete(res.client_id)}
//                     >
//                       Edit
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

//gagan code

import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Client({ dbpath1 }) {
  const [clients, setClients] = useState([]);

  const [party_name, setParty_name] = useState("");
  const [returnrecieve, setReturnRecieve] = useState(0);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [party_id, setParty_id] = useState("");

  const [product, setproduct] = useState("");
  const [nozzles_in_mpd, setnozzles_in_mpd] = useState("");

  const [inputDispensingUnitNo, setInputDispensingUnitNo] = useState({});
  const [inputMake, setInputMake] = useState({});
  const [inputSerialNo, setInputSerialNo] = useState({});
  const [inputConnectedTanks, setInputConnectedTanks] = useState({});
  const [inputProduct, setInputProduct] = useState({});
  const [inputNozzlesInMpd, setInputNozzlesInMpd] = useState({});

  const navigate = useNavigate();
  const todayDate = new Date();

  //rahuls code 16th july
  const [clientData, setClientData] = useState({});

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setClientData({ ...clientData, [name]: value });
  };

  const fetchClient = () => {
    axios
      .get("http://localhost:4000/client/")
      .then((res) => {
        console.log(" client res", res.data);
        setClients(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const createClient = async () => {
    await axios.post("http://localhost:4000/client/createclient", {
      party_name,
      returnrecieve,
      amount,
      date,
    });
  };

  useEffect(() => {
    fetchClient();
  }, [createClient]);

  const formateDate = (date) => {
    const parts = date.split("-");
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      {/* //modal */}

      {/* //modal end */}

      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 mb-3 bg-blue-400 text-white p-3 text-2xl uppercase text-center">
          Handloan Client
        </h2>
        <span className="mt-5" style={{ fontSize: "22px" }}>
          {" "}
          Date :{todayDate.getDate()}/{todayDate.getMonth()}/
          {todayDate.getFullYear()}
        </span>
        <div>
          <br></br>
       
       <div className="flex center align-content-center justify-center items-center ">
       <table class=" border-blue-500 border-1 rounded-lg mr-10 text-center px-4 py-2 w-[60%] p-5">
            <thead>
              <div className="border-gray-400 rounded-sm p-2">
                <h1 className="uppercase font-bold">
                <span className=" bg-[#0077b7b]">
                Create new handloan name
                  </span> 
                </h1>
              </div>
              <tr className="table-secondary p-2">
                <th className="">Party Name:</th>
              </tr>
            </thead>
            <tbody>
              <tr className="client-input">
                <td className="p-4">
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Name"
                    onChange={(e) => setParty_name(e.target.value)}
                  />
                </td>
              </tr>
              <tr className="">
                <button
                  type="button"
                  className="font-bold bg-blue-400 px-4 py-2 mb-3 rounded-md text-white"
                  onClick={createClient}
                >
                  ADD
                </button>
              </tr>
            </tbody>
          </table>
       </div>
          
        </div>
        <br></br>
        <div>
          <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary text-center">
                <th className="tablebg ">Sr No</th>

                <th className="tablebg">Date</th>
                <th className="tablebg">Party Name</th>

                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((res, index) => (
                <tr className="hovereffect text-center" key={index}>
                  <td>{index + 1}</td>
                  <td>{formateDate(res.date)}</td>

                  <td>{res.party_name}</td>

                  <td style={{ width: "250px" }} className="">
                    <button
                      type="button"
                      class="bg-yellow-500 px-2 py-1 mr-3 text-white rounded-md uppercase"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      class="bg-blue-500 px-2 py-1 mr-3 text-white rounded-md uppercase"
                    >
                      open
                    </button>
                    <button
                      type="button"
                      class="bg-blue-500 px-2 py-1 text-white rounded-md uppercase"
                    >
                      close
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
