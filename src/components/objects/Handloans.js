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

  const [ddmmyy , setDdmmyy]  = useState("")

  const [todaysTransactions, setTodaysTransactions] = useState([]);

  const todayDate = new Date();

  useEffect(() => {
    fetchClient();
    fetchHandloan();
    fetchTodaysTransactions();
  }, []);

  const fetchClient = () => {
    axios
      .get("http://localhost:4000/client")
      .then((res) => {
        console.log(" client res", res.data);
        setClients(res.data);
        setPartyId(res.data[0]._id);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  console.log(" client res", partyId);

  const fetchHandloan = () => {
    axios
      .get("http://localhost:4000/handloan")
      .then((res) => {
        const formattedData = handleDateConversion(res.data);

        setHandloan(formattedData);
        console.log(res.data);
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
    console.log("newTransaction", newTransaction);
    axios
      .post("http://localhost:4000/handloan/create", { ...newTransaction })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.msg);
          fetchClient();
          fetchHandloan();
          setHandloan([]);
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
    const day = String(today.getDate());
    // .padStart(0, '0');
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = today.getFullYear(); // Full year

    return `${day}-${month}-${year}`;
  }

  // Example usage
  const todaysDate = getTodaysDate();
  console.log(
    formatDateString("Wed Jul 24 2024 08:31:55 GMT+0530 (India Standard Time)")
  );

  const fetchTodaysTransactions = () => {
    const todayDate = new Date().toISOString().slice(0, 10);
    axios
      .get(`http://localhost:4000/handloan`)
      .then((res) => {
        console.log(" today's transactions", res.data);
        const formattedData = handleDateConversion(res.data);
        setTodaysTransactions(formattedData);
        setDdmmyy(res.data[10].date)
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  console.log("ddmmyy",formatDateString(ddmmyy))


  const handleDateConversion = (data) => {
    return data.map(item => ({
        ...item,
        date: formatDateString(item.date)
    }));
};

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
                  className="form-select editableInput bigFontWeight"
                  value={partyname}
                  aria-label="Default select example"
                  onChange={(e) => setPartyname(e.target.value)}
                >
                  <option selected>- Party Name -</option>
                  {clients.map((rest) => (
                    <option value={rest.party_name} key={rest._id}>
                      {rest.party_name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  className="form-select editableInput bigFontWeight"
                  aria-label="Default select example"
                  onChange={(e) => setVoucher_type(e.target.value)}
                >
                  <option selected>- Voucher Type -</option>
                  <option value="Given">Given</option>
                  <option value="Received">Received </option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control editableInput bigFontWeight bg-blue-300"
                  placeholder="Amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control editableInput bigFontWeight"
                  placeholder="Narration"
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
            <th className="tablebg">Sr No.</th>
              <th className="tablebg">Party Name</th>
              <th className="tablebg">Amount Given</th>
              <th className="tablebg">Amount Received</th>
              <th className="tablebg">Balance</th>
            </tr>
          </thead>
          <tbody>
            {todaysTransactions.map((transaction, index) => (
              <tr className="hovereffect" key={index}>
                <td>{index + 1}</td>
                <td>{transaction.party_name}</td>
                <td>
                  {transaction.voucher_type === "Given"
                    ? transaction.amount
                    : "-"}
                </td>
                <td>
                  {transaction.voucher_type === "Received"
                    ? transaction.amount
                    : "-"}
                </td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <table className="table">
          <thead>
            <tr className="table-secondary">
              <th className="tablebg">Party Name</th>
              <th className="tablebg">Amount Given</th>
              <th className="tablebg">Amount Received</th>
              <th className="tablebg">Balance</th>
            </tr>
          </thead>
          <tbody>
            {todaysTransactions.map((transaction, index) => (
              <tr className="hovereffect" key={index}>
                <td>{transaction.party_name}</td>
                <td>{transaction.voucher_type === "Given" ? transaction.amount : "-"}</td>
                <td>{transaction.voucher_type === "Received" ? transaction.amount : "-"}</td>
                <td>{balance}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
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
                    {client.voucher_type === "Given" ? client.amount : "-"}
                  </td>
                  <td>
                    {client.voucher_type === "Received" ? client.amount : "-"}
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

// import React, { useState, useEffect } from "react";
// import "../css/Tank.css";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// export default function Handloans({ dbpath1 }) {
//   const [handloan, setHandloan] = useState([]);
//   const [partyname, setPartyname] = useState("");
//   const [particular, setParticular] = useState("");
//   const [amount, setAmount] = useState("");
//   const [narration, setNarration] = useState("");
//   const [balance, setBalance] = useState("0");
//   const navigate = useNavigate();

//   // amount: 1500;
//   // narration: "diye mukesh ko";
//   // party_id: "669fa7df6e8e822b92ff7495";
//   // party_name: "muk";
//   // voucher_type: "Given";
//   // __v: 0;
//   // _id: "669fab15300a77a2bfe4f58c";

//   useEffect(() => {
//     fetchHandloan();
//   }, []);

//   const fetchHandloan = () => {
//     axios
//       .get("http://localhost:4000/handloan")
//       .then((res) => {
//         setHandloan(res.data);
//         console.log(res.data);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   // Get today's date in the required format
//   const getTodayDate = () => {
//     const today = new Date();
//     return today.toISOString().split("T")[0]; // format YYYY-MM-DD
//   };

//   const todayDate = getTodayDate();

//   // Filter transactions to only include those from today
//   // const todaysTransactions = handloan
//   //   .map((client) => ({
//   //     ...client,
//   //     transactions: client.transaction.filtr(
//   //       (transaction) => transaction.date.split("T")[0] === todayDate
//   //     ),
//   //   }))
//   //   .filter((client) => client.transactions.length > 0); // Only include clients with transactions today

//   return (
//     <>
//       <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
//         <h2 className="mt-3 mb-4 bg-blue-400 text-white p-2 text-2xl uppercase text-center">
//           Handloans/Advances
//         </h2>
//         <div className="flex justify-between mb-4 mt-3">
//           <span style={{ fontSize: "22px" }}> Date : {todayDate}</span>

//           <span className="font-bold">
//             Balance : <span className="bg-yellow-300"> {balance} </span>
//           </span>
//           <div>
//             <span>
//               <Link
//                 className="bg-violet-700 px-2 mr-3 py-1 rounded-md text-white"
//                 to={"/add_client"}
//               >
//                 Add Client
//               </Link>
//             </span>
//             <span>
//               <Link className=" px-2 bg-yellow-900 py-1 rounded-md text-white">
//                 History
//               </Link>
//             </span>
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
//                   className="form-select editableInput bigFontWeight"
//                   value={partyname}
//                   aria-label="Default select example"
//                   onChange={(e) => setPartyname(e.target.value)}
//                 >
//                   <option selected>- Party Name -</option>
//                   {handloan.map((rest) => (
//                     <option value={rest.party_name} key={rest._id}>
//                       {rest.party_name}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//               <td>
//                 <select
//                   className="form-select editableInput bigFontWeight"
//                   aria-label="Default select example"
//                   // value={particular}
//                   // onChange={(e) => setParticular(e.target.value)}
//                 >
//                   <option selected>- Voucher Type -</option>
//                   <option value="Given">Given</option>
//                   <option value="Recived">Recieved </option>
//                 </select>
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   className="form-control editableInput bigFontWeight bg-blue-300"
//                   placeholder="Amount"
//                   onChange={(e) => setAmount(e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   className="form-control editableInput bigFontWeight"
//                   placeholder="Narration"
//                   onChange={(e) => setNarration(e.target.value)}
//                 />
//               </td>
//               <td>
//                 <button type="button" className="btn btn-primary">
//                   SAVE
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <br />
//         <h2 className="bg-yellow-400 text-center p-2 font-bold">
//           Todays Transactions{" "}
//         </h2>{" "}
//         <br />
//         <table className="table">
//           <thead>
//             <tr className="table-secondary">
//               <th className="tablebg">Party Name</th>
//               <th className="tablebg">Amount Given</th>
//               <th className="tablebg">Amount Received</th>
//               <th className="tablebg">Balance</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* {todaysTransactions.map((client) =>
//               client.transactions.map((transaction, index) => (
//                 <tr className="hovereffect" key={index}>
//                   <td>{client.party_name}</td>
//                   <td>{transaction.amount_given}</td>
//                   <td>{transaction.amount_rcvd}</td>
//                   <td>{transaction.balance}</td>
//                 </tr>
//               ))
//             )} */}
//           </tbody>
//         </table>
//         <br />
//         <h2 className="bg-yellow-400 text-center px-1 py-2 font-bold">
//           Client Transaction History{" "}
//         </h2>{" "}
//         <br />
//         <span className="bg-red-100 px-2 py-1">
//           Party Name : {partyname}
//         </span>{" "}
//         <br />
//         <table className="table mt-3">
//           <thead>
//             <tr className="table-secondary">
//               <th className="tablebg">Date</th>
//               <th className="tablebg">Voucher-Type</th>
//               <th className="tablebg">Amount Given</th>
//               <th className="tablebg">Amount Received</th>
//               <th className="tablebg">Balance</th>
//               <th className="tablebg">Narration</th>
//             </tr>
//           </thead>
//           <tbody>
//             {handloan
//               .find((client) => client.party_name === partyname)
//               ?.transactions.map((transaction, index) => (
//                 <tr className="hovereffect" key={index}>
//                   <td>{transaction.date.split("T")[0]}</td>
//                   <td>{transaction.particular}</td>
//                   <td>{transaction.amount_given}</td>
//                   <td>{transaction.amount_rcvd}</td>
//                   <td>{transaction.balance}</td>
//                   <td>{transaction.narration}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import "../css/Tank.css";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Sidebar from "../Sidebar";
// import Navbar from "../Navbar";
// import Client from "./Client";

// export default function Handloans({ dbpath1 }) {
//   const [clients, setClients] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [thistory, setTHistory] = useState([]);
//   const [partyname, setPartyname] = useState("");
//   const [particular, setParticular] = useState("");
//   const [amount, setAmount] = useState("");
//   const [narration, setNarration] = useState("");
//   const [balance, setBalance] = useState("0");
//   const navigate = useNavigate();

//   const fetchHandloan = () => {
//     axios
//       .get("http://localhost:4000/handloan/")
//       .then((res) => {
//         console.log("handloan res", res.data);
//         setClients(res.data);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   useEffect(() => {
//     fetchHandloan();
//   }, []);

//   // Handle Partyname change to update history

//   const handlePartynameChange = (e) => {
//     const selectedParty = e.target.value;
//     setPartyname(selectedParty);

//     const client = clients.find(
//       (client) => client.party_name === selectedParty
//     );

//     if (client) {
//       setHistory(client.transactions);
//       setBalance(
//         client.transactions[client.transactions.length - 1]?.balance || 0
//       );
//     }
//     console.log(
//       "client.transactions[client.transactions.length - 1]",
//       client.transactions[client.transactions.length - 1]
//     );
//   };

//   return (
//     <>
//       <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
//         <h2 className="mt-3 mb-2 bg-blue-400 text-white p-2 text-2xl uppercase text-center">
//           Handloans/Advances
//         </h2>

//         <div className="flex justify-between mb-4 mt-3">
//           <span
//             className=" text-violet-700 font-bold"
//             n
//             style={{ fontSize: "22px" }}
//           >
//             {" "}
//             Date : {new Date().toLocaleDateString()}
//           </span>

//           <span className=" text-violet-700 font-bold">
//             Balance : {balance}
//           </span>

//           <div>
//             <span>
//               <Link
//                 className="bg-violet-700 px-2 mr-3 py-1 rounded-md text-white"
//                 to={"/add_client"}
//               >
//                 Add Client
//               </Link>
//             </span>
//             <span>
//               <Link
//                 className=" px-2 bg-yellow-900 py-1 rounded-md text-white"
//                 to={"/add_client"}
//               >
//                 History
//               </Link>
//             </span>
//           </div>
//         </div>

//         <div>
//           <table className="table">
//             <thead>
//               <tr className="table-secondary">
//                 <th className="tablebg">Party Name</th>
//                 <th className="tablebg">Voucher Type</th>
//                 <th className="tablebg">Amount</th>
//                 <th className="tablebg">Narration</th>
//                 <th className="tablebg">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>
//                   <select
//                     className="form-select editableInput bigFontWeight"
//                     value={partyname}
//                     onChange={handlePartynameChange}
//                   >
//                     <option selected>- Party Name -</option>
//                     {clients.map((client) => (
//                       <option key={client._id} value={client.party_name}>
//                         {client.party_name}
//                       </option>
//                     ))}
//                   </select>
//                 </td>

//                 <td>
//                   <select
//                     className="form-select editableInput bigFontWeight"
//                     value={particular}
//                     onChange={(e) => setParticular(e.target.value)}
//                   >
//                     <option selected>- Voucher Type -</option>
//                     <option value="Given">Given / Out</option>
//                     <option value="Received">Received / In</option>
//                   </select>
//                 </td>

//                 <td>
//                   <input
//                     type="text"
//                     className="form-control bg-blue-400 editableInput bigFontWeight"
//                     placeholder="Amount"
//                     onChange={(e) => setAmount(e.target.value)}
//                   />
//                 </td>

//                 <td>
//                   <input
//                     type="text"
//                     className="form-control editableInput bigFontWeight"
//                     placeholder="Narration"
//                     onChange={(e) => setNarration(e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <button type="button" className="btn btn-primary">
//                     SAVE
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <br />
//           Todays Transactions: <br />
//           <table className="table">
//             <thead>
//               <tr className="table-secondary">
//                 <th className="tablebg">Party Name</th>
//                 <th className="tablebg">Voucher Type - Given</th>
//                 <th className="tablebg">Voucher Type - Received</th>
//                 <th className="tablebg">Balance</th>
//                 {/* <th className="tablebg">Action</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((res, index) => (
//                 <tr className="hovereffect" key={index}>
//                   <td>{res.client_name}</td>
//                   <td>{res.amount_given}</td>
//                   <td>{res.amount_rcvd}</td>
//                   <td>{res.balance}</td>
//                   {/* <td style={{ width: "50px" }}>
//                     <button
//                       type="button"
//                       style={{ height: "30px", paddingTop: "2px" }}
//                       id={"tank" + res.transaction_id}
//                       className="btn btn-danger"
//                     >
//                       Delete
//                     </button>
//                   </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <br />
//           Client Transaction History: <br />
//           <span>Party Name : {partyname}</span> <br />
//           <table className="table">
//             <thead>
//               <tr className="table-secondary">
//                 <th className="tablebg">Date</th>
//                 <th className="tablebg">Particulars</th>
//                 <th className="tablebg">Amount Given</th>
//                 <th className="tablebg">Amount Received</th>
//                 <th className="tablebg">Balance</th>
//                 <th className="tablebg">Narration</th>
//               </tr>
//             </thead>
//             <tbody>
//               {history.map((transaction, index) => (
//                 <tr className="hovereffect" key={index}>
//                   <td>{new Date(transaction.date).toLocaleDateString()}</td>
//                   <td>{transaction.particular}</td>
//                   <td>{transaction.amount_given}</td>
//                   <td>{transaction.amount_rcvd}</td>
//                   <td>{transaction.balance}</td>
//                   <td>{transaction.narration}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <br />
//       </div>
//     </>
//   );
// }
