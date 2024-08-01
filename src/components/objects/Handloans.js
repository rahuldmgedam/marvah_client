



// gagan till 30th july end
// import React, { useState, useEffect } from "react";
// import "../css/Tank.css";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// export default function Handloans({ dbpath1 }) {
//   const [handloan, setHandloan] = useState([]);

//   const [clients, setClients] = useState([]);
//   const [partyname, setPartyname] = useState("");
//   const [voucher_type, setVoucher_type] = useState("");
//   const [amount, setAmount] = useState(0);
//   const [narration, setNarration] = useState("");
//   const [balance, setBalance] = useState("0");
//   const [partyId, setPartyId] = useState("");
//   const navigate = useNavigate();

//   const [ddmmyy, setDdmmyy] = useState("")

//   const [todaysTransactions, setTodaysTransactions] = useState([]);

//   const todayDate = new Date();


//   const fetchClient = () => {
//     axios
//       .get("http://localhost:4000/client")
//       .then((res) => {
//         console.log(" client res", res.data);
//         setClients(res.data);
//         setPartyId(res.data[0]._id);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   console.log(" client res", partyId);

//   const fetchHandloan = () => {
//     axios
//       .get("http://localhost:4000/handloan")
//       .then((res) => {
//         const formattedData = handleDateConversion(res.data);

//         setHandloan(formattedData);
//         console.log(res.data);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };


//   const handleSave = () => {
//     const newTransaction = {
//       party_name: partyname,
//       voucher_type: voucher_type,
//       amount: amount,
//       narration: narration,
//       party_id: partyId,
//       // date: new Date().toISOString()
//     };
//     console.log("newTransaction", newTransaction);
//     axios
//       .post("http://localhost:4000/handloan/create", { ...newTransaction })
//       .then((res) => {
//         if (res.data.success) {
//           alert(res.data.msg);
//           fetchClient();
//           fetchHandloan();
//           setHandloan([]);
//           setPartyname("");
//           setVoucher_type("");
//           setAmount("");
//           setNarration("");
//         }
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };


//   function formatDateString(dateString) {
//     const date = new Date(dateString);

//     // Extract day, month, and year
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//     const year = String(date.getFullYear()); // Get last two digits of the year

//     return `${day}-${month}-${year}`;
//   }

//   function getTodaysDate() {
//     const today = new Date();

//     // Extract day, month, and year
//     const day = String(today.getDate());
//     // .padStart(0, '0');
//     const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//     const year = today.getFullYear(); // Full year

//     return `${day}-${month}-${year}`;
//   }

//   // Example usage
//   const todaysDate = getTodaysDate();

//   const fetchTodaysTransactions = () => {
//     const todayDate = new Date().toISOString().slice(0, 10);
//     axios
//       .get("http://localhost:4000/handloan")
//       .then((res) => {
//         console.log(" today's transactions", res.data);
//         const formattedData = handleDateConversion(res.data);
//         setTodaysTransactions(formattedData);
//         setDdmmyy(res.data[10].date)
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };




//   const handleDateConversion = (data) => {
//     return data.map(item => ({
//       ...item,
//       date: formatDateString(item.date)
//     }));
//   };

//   useEffect(() => {
//     fetchClient();
//     fetchHandloan();
//     fetchTodaysTransactions();
//   }, [ ]);

//   return (
//     <>
//       <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
//         <h2 className="mt-3 mb-4 bg-blue-400 text-white p-2 text-2xl uppercase text-center">
//           Handloans/Advances
//         </h2>
//         <div className="flex justify-between mb-4 mt-3">
//           <span style={{ fontSize: "22px" }}> Date :{todaysDate}</span>
//           {/* <span className="font-bold">
//             Balance : <span className="bg-yellow-300"> {balance} </span>
//           </span> */}
//           <div>
//             <span>
//               <Link
//                 className="bg-violet-700 px-2 mr-3 py-1 rounded-md text-white"
//                 to={"/add_client"}
//               >
//                 Add Client
//               </Link>
//             </span>
//             {/* <span>
//               <Link className=" px-2 bg-yellow-900 py-1 rounded-md text-white">
//                 History
//               </Link>
//             </span> */}
//           </div>
//         </div>
//         <table className="table">
//           <thead>
//             <tr className="table-secondary">
//               <th className="tablebg">Party Name</th>
//               <th className="tablebg">Voucher Type</th>
//               <th className="tablebg">Amount</th>
//               <th className="tablebg">Narration</th>
//               <th className="tablebg">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="handloan-tr">
//               <td>
//                 <select
//                   className="form-select editableInput bigFontWeight w-48"
//                   value={partyname}
//                   aria-label="Default select example"
//                   onChange={(e) => setPartyname(e.target.value)}
//                 >
//                   <option selected>- Party Name -</option>
//                   {clients.sort((a, b) => {
//                     if (a.party_name.toLowerCase() < b.party_name.toLowerCase()) {
//                       return -1;
//                     }
//                     if (a.party_name.toLowerCase() > b.party_name.toLowerCase()) {
//                       return 1;
//                     }
//                     return 0;
//                   }).map((rest) => (
//                     <option value={rest.party_name} key={rest._id}>
//                       {rest.party_name}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//               <td>
//                 <select
//                   className="form-select editableInput bigFontWeight w-48"
//                   aria-label="Default select example"
//                   value={voucher_type}
//                   onChange={(e) => setVoucher_type(e.target.value)}
//                 >
//                   <option selected>- Voucher Type -</option>
//                   <option value="Given / Expenses">Given / Expenses</option>
//                   <option value="Received / Income">Received / Income </option>
//                 </select>
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   className="form-control editableInput bigFontWeight bg-blue-300 w-48"
//                   placeholder="Amount"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   className="form-control editableInput bigFontWeight w-96"
//                   placeholder="Narration"
//                   value={narration}
//                   onChange={(e) => setNarration(e.target.value)}
//                 />
//               </td>
//               <td>
//                 <button
//                   onClick={handleSave}
//                   type="button"
//                   className="btn btn-primary"
//                 >
//                   SAVE
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <br />

//         <h2 className="bg-red-200 text-center p-2 font-bold">
//           Today's Transactions
//         </h2>
//         <br />

//         <table className="table">
//           <thead>
//             <tr className="table-secondary">
//               {/* <th className="tablebg">Sr No.</th> */}
//               <th className="tablebg">Party Name</th>
//               <th className="tablebg">Amount Given</th>
//               <th className="tablebg">Amount Received</th>
//               <th className="tablebg">Narration</th>
//             </tr>
//           </thead>
//           <tbody>

//             {
//               todaysTransactions.map((transaction, index) => (

//                 (todaysDate === transaction.date) && (<tr className="hovereffect" key={index}>
//                   {/* <td>{index + 1}</td> */}
//                   <td>{transaction.party_name}</td>
//                   <td>
//                     {transaction.voucher_type === "Given / Expenses"
//                       ? transaction.amount
//                       : "-"}
//                   </td>
//                   <td>
//                     {transaction.voucher_type === "Received / Income"
//                       ? transaction.amount
//                       : "-"}
//                   </td>
//                   <td>{transaction.narration}</td>
//                 </tr>)



//               ))
//             }
//           </tbody>
//         </table>

//         <br />
//         <h2 className="bg-red-200 text-center px-1 py-2 font-bold">
//           Client Transaction History
//         </h2>
//         <br />
//         <span className=" px-2 py-1">Party Name : {partyname}</span>
//         <br />
//         <table className="table mt-3">
//           <thead className="items-center">
//             <tr className="items-center">
//               <th className="items-center tablebg" >Sr No.</th>
//               <th className="items-center tablebg">Date</th>
//               <th className="tablebg">Voucher-Type</th>
//               <th className="tablebg">Amount Given</th>
//               <th className="tablebg">Amount Received</th>
//               {/* <th className="tablebg">Balance</th> */}
//               <th className="tablebg">Narration</th>
//             </tr>
//           </thead>
//           <tbody>
//             {handloan
//               .filter((client) => client.party_name === partyname)
//               .map((client, index) => (
//                 <tr className="hovereffect" key={index}>
//                   <td>{index + 1}</td>
//                   <td>{client?.date}</td>
//                   <td>{client.voucher_type}</td>
//                   <td>
//                     {client.voucher_type === "Given / Expenses" ? client.amount : "-"}
//                   </td>
//                   <td>
//                     {client.voucher_type === "Received / Income" ? client.amount : "-"}
//                   </td>
//                   {/* <td>{balance}</td> */}
//                   <td>{client.narration}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import "../css/Tank.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Handloans({ dbpath1 }) {
  const [handloan, setHandloan] = useState([]);

  const [clients, setClients] = useState([]);
  const [partyname, setPartyname] = useState("");
  const [voucher_type, setVoucher_type] = useState("");
  const [amount, setAmount] = useState(0);
  const [narration, setNarration] = useState("");
  const [balance, setBalance] = useState("0");
  const [partyId, setPartyId] = useState("");
  const navigate = useNavigate();
  const [dependency,setDependency] = useState(false)

  const [ddmmyy, setDdmmyy] = useState("")

  const [todaysTransactions, setTodaysTransactions] = useState([]);

  const todayDate = new Date();


  const fetchClient = () => {
    axios
      .get("http://localhost:4000/client")
      .then((res) => {
        console.log(" client res", res.data);
        // setDependency(!dependency)
        setClients(res.data);
        setPartyId(res.data[0]._id);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // console.log(" client res", partyId);

  const fetchHandloan = () => {
    axios
      .get("http://localhost:4000/handloan")
      .then((res) => {
        const formattedData = handleDateConversion(res.data);
        // setDependency(!dependency)
        setHandloan(formattedData);
        console.log("resssss",res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  const handleSave = () => {
    const newTransaction = {
      party_name: partyname,
      voucher_type: voucher_type,
      amount: amount,
      narration: narration,
      party_id: partyId,
      // date: new Date().toISOString()
    };
    // console.log("newTransaction", newTransaction);
    axios
      .post("http://localhost:4000/handloan/create", { ...newTransaction })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.msg);
          fetchClient();
          fetchHandloan();
          setHandloan([]);
          setDependency(!dependency)
          setPartyname("");
          setVoucher_type("");
          setAmount("");
          setNarration("");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  function formatDateString(dateString) {
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()); // Get last two digits of the year

    return `${day}-${month}-${year}`;
  }

  function getTodaysDate() {
    const today = new Date();

    // Extract day, month, and year
    let day = String(today.getDate());
    // .padStart(0, '0');
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = today.getFullYear(); // Full year

    if (day==1 || day==2 || day==3 || day==4 || day==5 || day==6 || day==7 || day==8 || day==9 ) {
      day = "0"+day
    }

    return `${day}-${month}-${year}`;
  }

  // Example usage
  const todaysDate = getTodaysDate();
  // console.log(
  //   formatDateString("Wed Jul 24 2024 08:31:55 GMT+0530 (India Standard Time)")
  // );

  const fetchTodaysTransactions = () => {
    // const todayDate = new Date().toISOString().slice(0, 10);
    axios
      .get("http://localhost:4000/handloan")
      .then((res) => {
        console.log(" today's transactions", res.data);
        // setDependency(!dependency)

        const formattedData = handleDateConversion(res.data);
        setTodaysTransactions(formattedData);
        setDdmmyy(res.data[10].date)
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  console.log("ddmmyy", formatDateString(ddmmyy))


  const handleDateConversion = (data) => {
    return data.map(item => ({
      ...item,
      date: formatDateString(item.date)
    }));
  };

  useEffect(() => {
    fetchClient();
    fetchHandloan();
    fetchTodaysTransactions();
    // handleSave();
  }, [dependency]);

  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 mb-4 bg-blue-400 text-white p-2 text-2xl uppercase text-center">
          Handloans/Advances
        </h2>
        <div className="flex justify-between mb-4 mt-3">
          <span style={{ fontSize: "22px" }}> Date :{todaysDate}</span>
          {/* <span className="font-bold">
            Balance : <span className="bg-yellow-300"> {balance} </span>
          </span> */}
          <div>
            <span>
              <Link
                className="bg-violet-700 px-2 mr-3 py-1 rounded-md text-white"
                to={"/add_client"}
              >
                Add Client
              </Link>
            </span>
            {/* <span>
              <Link className=" px-2 bg-yellow-900 py-1 rounded-md text-white">
                History
              </Link>
            </span> */}
          </div>
        </div>
        <table className="table">
          <thead>
            <tr className="table-secondary">
              <th className="tablebg">Party Name</th>
              <th className="tablebg">Voucher Type</th>
              <th className="tablebg">Amount</th>
              <th className="tablebg">Narration</th>
              <th className="tablebg">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="handloan-tr">
              <td>
                <select
                  className="form-select editableInput bigFontWeight w-48"
                  value={partyname}
                  aria-label="Default select example"
                  onChange={(e) => setPartyname(e.target.value)}
                >
                  <option selected>- Party Name -</option>
                  {clients.sort((a, b) => {
                    if (a.party_name.toLowerCase() < b.party_name.toLowerCase()) {
                      return -1;
                    }
                    if (a.party_name.toLowerCase() > b.party_name.toLowerCase()) {
                      return 1;
                    }
                    return 0;
                  }).map((rest) => (
                    <option value={rest.party_name} key={rest._id}>
                      {rest.party_name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  className="form-select editableInput bigFontWeight w-48"
                  aria-label="Default select example"
                  value={voucher_type}
                  onChange={(e) => setVoucher_type(e.target.value)}
                >
                  <option selected>- Voucher Type -</option>
                  <option value="Given / Expenses">Given / Expenses</option>
                  <option value="Received / Income">Received / Income </option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control editableInput bigFontWeight bg-blue-300 w-48"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control editableInput bigFontWeight w-96"
                  placeholder="Narration"
                  value={narration}
                  onChange={(e) => setNarration(e.target.value)}
                />
              </td>
              <td>
                <button
                  onClick={handleSave}
                  type="button"
                  className="btn btn-primary"
                >
                  SAVE
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <h2 className="bg-red-200 text-center p-2 font-bold">
          Today's Transactions
        </h2>
        <br />

        <table className="table">
          <thead>
            <tr className="table-secondary">
              {/* <th className="tablebg">Sr No.</th> */}
              <th className="tablebg">Party Name</th>
              <th className="tablebg">Amount Given</th>
              <th className="tablebg">Amount Received</th>
              <th className="tablebg">Narration</th>
            </tr>
          </thead>
          <tbody>

            {
              todaysTransactions.map((transaction, index) => (

                (todaysDate === transaction.date) && (<tr className="hovereffect" key={index}>
                  {/* <td>{index + 1}</td> */}
                  <td>{transaction.party_name}</td>
                  <td>
                    {transaction.voucher_type === "Given / Expenses"
                      ? transaction.amount
                      : "-"}
                  </td>
                  <td>
                    {transaction.voucher_type === "Received / Income"
                      ? transaction.amount
                      : "-"}
                  </td>
                  <td>{transaction.narration}</td>
                </tr>)



              ))
            }
          </tbody>
        </table>

        <br />
        <h2 className="bg-red-200 text-center px-1 py-2 font-bold">
          Client Transaction History
        </h2>
        <br />
        <span className=" px-2 py-1">Party Name : {partyname}</span>
        <br />
        <table className="table mt-3">
          <thead className="items-center">
            <tr className="items-center">
              <th className="items-center tablebg" >Sr No.</th>
              <th className="items-center tablebg">Date</th>
              <th className="tablebg">Voucher-Type</th>
              <th className="tablebg">Amount Given</th>
              <th className="tablebg">Amount Received</th>
              {/* <th className="tablebg">Balance</th> */}
              <th className="tablebg">Narration</th>
            </tr>
          </thead>
          <tbody>
            {handloan
              .filter((client) => client.party_name === partyname)
              .map((client, index) => (
                <tr className="hovereffect" key={index}>
                  <td>{index + 1}</td>
                  <td>{client?.date}</td>
                  <td>{client.voucher_type}</td>
                  <td>
                    {client.voucher_type === "Given / Expenses" ? client.amount : "-"}
                  </td>
                  <td>
                    {client.voucher_type === "Received / Income" ? client.amount : "-"}
                  </td>
                  {/* <td>{balance}</td> */}
                  <td>{client.narration}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}