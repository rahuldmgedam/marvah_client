// import React, { useState, useEffect } from "react";
// import "../css/Tank.css";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// export default function Handloans({ dbpath1 }) {
//   const [advances, setAdvances] = useState([]);

//   const [clients, setClients] = useState([]);
//   const [partyname, setPartyname] = useState("");
//   const [voucher_type, setVoucher_type] = useState("");
//   const [amount, setAmount] = useState(0);
//   const [narration, setNarration] = useState("");
//   const [balance, setBalance] = useState("0");
//   const [partyId, setPartyId] = useState("");
//   const navigate = useNavigate();
//   const [dependency, setDependency] = useState(false);

//   const [ddmmyy, setDdmmyy] = useState("");

//   const [todaysTransactions, setTodaysTransactions] = useState([]);

//   const [showHistory, setShowHistory] = useState(false);

//   const todayDate = new Date();

//   const fetchClient = () => {
//     axios
//       .get("https://marvah-server.onrender.com/client")
//       .then((res) => {
//         console.log(" client res", res.data);
//         // setDependency(!dependency)
//         setClients(res.data);
//         setPartyId(res.data[0]._id);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   // console.log(" client res", partyId);

//   const fetchHandloan = () => {
//     axios
//       .get("https://marvah-server.onrender.com/advances")
//       .then((res) => {
//         const formattedData = handleDateConversion(res.data);
//         // setDependency(!dependency)
//         setAdvances(formattedData);
//         console.log("resssss", res.data);
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
//     // console.log("newTransaction", newTransaction);
//     axios
//       .post("https://marvah-server.onrender.com/advances/create", {
//         ...newTransaction,
//       })
//       .then((res) => {
//         if (res.data.success) {
//           alert(res.data.msg);
//           fetchClient();
//           fetchHandloan();
//           setAdvances([]);
//           setDependency(!dependency);
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
//     let day = String(today.getDate());
//     // .padStart(0, '0');
//     const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//     const year = today.getFullYear(); // Full year

//     if (
//       day == 1 ||
//       day == 2 ||
//       day == 3 ||
//       day == 4 ||
//       day == 5 ||
//       day == 6 ||
//       day == 7 ||
//       day == 8 ||
//       day == 9
//     ) {
//       day = "0" + day;
//     }

//     return `${day}-${month}-${year}`;
//   }

//   // Example usage
//   const todaysDate = getTodaysDate();
//   // console.log(
//   //   formatDateString("Wed Jul 24 2024 08:31:55 GMT+0530 (India Standard Time)")
//   // );

//   const fetchTodaysTransactions = () => {
//     // const todayDate = new Date().toISOString().slice(0, 10);
//     axios
//       .get("https://marvah-server.onrender.com/advances")
//       .then((res) => {
//         console.log(" today's transactions", res.data);
//         // setDependency(!dependency)

//         const formattedData = handleDateConversion(res.data);
//         setTodaysTransactions(formattedData);
//         setDdmmyy(res.data[10].date);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   console.log("ddmmyy", formatDateString(ddmmyy));

//   const handleDateConversion = (data) => {
//     return data.map((item) => ({
//       ...item,
//       date: formatDateString(item.date),
//     }));
//   };

//   useEffect(() => {
//     fetchClient();
//     fetchHandloan();
//     fetchTodaysTransactions();
//     // handleSave();
//   }, [dependency]);

//   const [amountInWords, setAmountInWords] = useState("");
//   const numberToWords = (num) => {
//     const a = [
//       "",
//       "One",
//       "Two",
//       "Three",
//       "Four",
//       "Five",
//       "Six",
//       "Seven",
//       "Eight",
//       "Nine",
//       "Ten",
//       "Eleven",
//       "Twelve",
//       "Thirteen",
//       "Fourteen",
//       "Fifteen",
//       "Sixteen",
//       "Seventeen",
//       "Eighteen",
//       "Nineteen",
//     ];
//     const b = [
//       "",
//       "",
//       "Twenty",
//       "Thirty",
//       "Forty",
//       "Fifty",
//       "Sixty",
//       "Seventy",
//       "Eighty",
//       "Ninety",
//     ];

//     const convertHundreds = (n) => {
//       if (n < 20) return a[n];
//       if (n < 100) return b[Math.floor(n / 10)] + " " + a[n % 10];
//       return (
//         a[Math.floor(n / 100)] +
//         " Hundred " +
//         (n % 100 !== 0 ? convertHundreds(n % 100) : "")
//       );
//     };

//     if (num === 0) return "Zero";
//     if (num < 1000) return convertHundreds(num);

//     if (num < 100000) {
//       return (
//         convertHundreds(Math.floor(num / 1000)) +
//         " Thousand " +
//         (num % 1000 !== 0 ? convertHundreds(num % 1000) : "")
//       );
//     }

//     if (num < 10000000) {
//       return (
//         convertHundreds(Math.floor(num / 100000)) +
//         " Lakh " +
//         (num % 100000 !== 0
//           ? convertHundreds(Math.floor((num % 100000) / 1000)) +
//             " Thousand " +
//             convertHundreds(num % 1000)
//           : "")
//       );
//     }

//     return "Number out of range";
//   };
//   useEffect(() => {
//     setAmountInWords(numberToWords(amount)); // Convert amount to words whenever it changes
//   }, [amount]);

//   return (
//     <>
//       {" "}
//       <h2 className=" p-2 text-3xl fixed font-bold uppercase text-center ml-[30%]">
//         Advances
//       </h2>
//       <div className="tankMainDiv shadow-lg p-3 bg-body-tertiary rounded bigFontWeight">
//         <div className="flex justify-between mb-4 mt-3 w-[90%]">
//           <span className="text-2xl"> Date :{todaysDate}</span>
   
//           <div className="flex">
//             <Link 
//               className="bg-blue-500 px-2 mr-3 py-1 rounded-md text-white"
//               to={"/add_client"}
//             >
//               Add Client
//             </Link>
         
//             <span>
//               <div
//                 onClick={() => setShowHistory(!showHistory)}
//                 className="bg-blue-500 px-2 mr-3 py-1 rounded-md text-white"
//               >
//                 History
//               </div>
//             </span>
//           </div>
//           {/* <div className="flex">
//             <div>
        
//                 <Link
//                   className="bg-blue-500 px-2 mr-3 py-1 rounded-md text-white"
//                   to={"/add_client"}
//                 >
//                   Add Client
//                 </Link>
            
//             </div>

//             <div
//               onClick={() => setShowHistory(!showHistory)}
//               className="bg-blue-500 px-2 mr-3 py-1 rounded-md text-white"
//             >
//               History
//             </div>
//           </div> */}
//         </div>
//         <table className="w-[90%]">
//           <thead className="px-2 py-3 w-[100%]">
//             <tr className="bg-[#3A1078] w-[100%] text-white text-center">
//               <th className="px-2 py-2">Party Name</th>
//               <th className="">Voucher Type</th>
//               <th className="">Amount</th>
//               <th className="">Narration</th>
//               <th className="">Action</th>
//             </tr>
//           </thead>
//           <tbody className="">
//             <tr className="handloan-tr">
//               <td>
//                 <select
//                   className="form-select editableInput bigFontWeight w-48"
//                   value={partyname}
//                   onChange={(e) => setPartyname(e.target.value)}
//                 >
//                   <option selected>-Select Party -</option>
//                   {clients
//                     .sort((a, b) => {
//                       if (
//                         a.party_name.toLowerCase() < b.party_name.toLowerCase()
//                       ) {
//                         return -1;
//                       }
//                       if (
//                         a.party_name.toLowerCase() > b.party_name.toLowerCase()
//                       ) {
//                         return 1;
//                       }
//                       return 0;
//                     })
//                     .map((rest) => (
//                       <option value={rest.party_name} key={rest._id}>
//                         {rest.party_name}
//                       </option>
//                     ))}
//                 </select>
//               </td>
//               <td>
//                 <select
//                   className="form-select editableInput bigFontWeight w-48"
//                   aria-label="Default select example"
//                   value={voucher_type}
//                   onChange={(e) => setVoucher_type(e.target.value)}
//                 >
//                   <option selected> -</option>
//                   <option value="Debit-Out">Advance</option>
//                 </select>
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   className="form-control editableInput bigFontWeight bg-blue-300 w-48"
//                   value={amount || ""}
//                   onChange={(e) => setAmount(e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   className="form-control editableInput bigFontWeight w-96"
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
//         <td className="flex mt-3">
//           <span className="text-center bg-[#3A1078] p-2 text-white">
//             Amount in Words &nbsp;&nbsp;&nbsp;&nbsp;
//           </span>
//           <input
//             type="text"
//             className="form-control editableInput bigFontWeight w-96 ml-4"
//             value={amountInWords}
//             readOnly
//           />
//         </td>

//         <h2 className="text-center text-green-500 text-xl p-2 font-bold">
//           Today's Transactions
//         </h2>
//         <br />

//         {/* <table className="w-[90%] border-2">
//           <thead className="">
//             <tr className="bg-[#3A1078] text-center text-white  border-2 border-grey-200">
//               <th className="bg-[#3A1078] px-1 py-2">Party Name</th>
//               <th className="py-2 w-32">Advances</th>
     
//               <th className="py-2">Narration</th>
//             </tr>
//           </thead>
//           <tbody>

//             {
//               todaysTransactions.map((transaction, index) => (

//                 (todaysDate === transaction.date) && (<tr className="hovereffect text-center" key={index}>
//                   <td className="p-2 border-2 border-grey-200">{transaction.party_name}</td>
//                   <td className="p-2 border-2 border-grey-200">
//                     {transaction.voucher_type === "Debit-Out"
//                       ? transaction.amount
//                       : "-"}
//                   </td>
           
//                   <td className="p-2 border-2 border-grey-200">{transaction.narration}</td>
//                 </tr>)



//               ))
//             }
//           </tbody>
//         </table> */}
//         <table className="w-[90%] border-2">
//           <thead className="">
//             <tr className="bg-[#3A1078] text-center text-white border-2 border-grey-200">
//               <th className="bg-[#3A1078] px-1 py-2">Party Name</th>
//               <th className="py-2 w-32">Advances</th>
//               <th className="py-2">Narration</th>
//             </tr>
//           </thead>
//           <tbody>
//             {todaysTransactions
//               .filter((transaction) => todaysDate === transaction.date)
//               .map((transaction, index) => (
//                 <tr className="hovereffect text-center" key={index}>
//                   <td className="p-2 border-2 border-grey-200">
//                     {transaction.party_name}
//                   </td>
//                   <td className="p-2 border-2 border-grey-200">
//                     {transaction.voucher_type === "Debit-Out"
//                       ? transaction.amount
//                       : "-"}
//                   </td>
//                   <td className="p-2 border-2 border-grey-200">
//                     {transaction.narration}
//                   </td>
//                 </tr>
//               ))}
//             {/* Total Advances Row */}
//             <tr className="font-bold text-center bg-green-500 text-white">
//               <td className="p-2 border-2 border-grey-200">Total Advances</td>
//               <td className="p-2 border-2 border-grey-200">
//                 {todaysTransactions
//                   .filter(
//                     (transaction) =>
//                       todaysDate === transaction.date &&
//                       transaction.voucher_type === "Debit-Out"
//                   )
//                   .reduce(
//                     (total, transaction) => total + transaction.amount,
//                     0
//                   )}
//               </td>
//               <td className="p-2 border-2 border-grey-200"></td>
//             </tr>
//           </tbody>
//         </table>
//         {/* Client's Transaction History */}

//         {showHistory && (
//           <>
//             <div>
//               <h2 className="text-center  text-xl p-2 font-bold">
//                 Client's Transaction History
//               </h2>

//               <h1 className=" px-2 py-1 text-xl ">Party Name : {partyname}</h1>
//               <table className="w-[90%] border-2">
//                 <thead className="items-center p-2">
//                   <tr className="bg-[#3A1078] hovereffect text-center p-2 text-white border-2 border-grey-200">
//                     <th className="items-center p-2">Sr No.</th>
//                     <th className="items-center">Date</th>
//                     {/* <th className="tablebg">Voucher-Type</th> */}
//                     <th className="">Advances</th>
//                     {/* <th className="">Credit-In</th> */}
//                     {/* <th className="tablebg">Balance</th> */}
//                     <th className="">Narration</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {advances
//                     .filter((client) => client.party_name === partyname)
//                     .map((client, index) => (
//                       <tr className="hovereffect text-center" key={index}>
//                         <td className="p-2 border-2 border-grey-200">
//                           {index + 1}
//                         </td>
//                         <td>{client?.date}</td>
//                         {/* <td>{client.voucher_type}</td> */}
//                         <td className="p-2 border-2 border-grey-200">
//                           {client.voucher_type === "Debit-Out"
//                             ? client.amount
//                             : "-"}
//                         </td>
//                         {/* <td className="p-2 border-2 border-grey-200">
//             {client.voucher_type === "Credit-In" ? client.amount : "-"}
//           </td> */}
//                         {/* <td>{balance}</td> */}
//                         <td className="p-2 border-2 border-grey-200">
//                           {client.narration}
//                         </td>
//                       </tr>
//                     ))}
//                   {/* Total Advances Row */}
//                   <tr className="font-bold text-center bg-green-500 text-white">
//                     <td className="p-2 border-2 border-grey-200" colSpan="2">
//                       Total Advances
//                     </td>
//                     <td className="p-2 border-2 border-grey-200">
//                       {advances
//                         .filter(
//                           (client) =>
//                             client.party_name === partyname &&
//                             client.voucher_type === "Debit-Out"
//                         )
//                         .reduce((total, client) => total + client.amount, 0)}
//                     </td>
//                     <td className="p-2 border-2 border-grey-200">-</td>
//                     {/* <td className="p-2 border-2 border-grey-200"></td> */}
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import "../css/Tank.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Handloans({ dbpath1 }) {
  const [advances, setAdvances] = useState([]);

  const [clients, setClients] = useState([]);
  const [partyname, setPartyname] = useState("");
  const [voucher_type, setVoucher_type] = useState("");
  const [amount, setAmount] = useState(0);
  const [narration, setNarration] = useState("");
  const [balance, setBalance] = useState("0");
  const [partyId, setPartyId] = useState("");
  const navigate = useNavigate();
  const [dependency, setDependency] = useState(false);

  const [ddmmyy, setDdmmyy] = useState("");

  const [todaysTransactions, setTodaysTransactions] = useState([]);

  const [showHistory, setShowHistory] = useState(false);

  const todayDate = new Date();

  const fetchClient = () => {
    axios
      .get("https://marvah-server.onrender.com/client")
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
      .get("https://marvah-server.onrender.com/advances")
      .then((res) => {
        const formattedData = handleDateConversion(res.data);
        // setDependency(!dependency)
        setAdvances(formattedData);
        console.log("resssss", res.data);
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
      .post("https://marvah-server.onrender.com/advances/create", {
        ...newTransaction,
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.msg);
          setAmountInWords("")
          fetchClient();
          fetchHandloan();
          setAdvances([]);

          setDependency(!dependency);
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

    if (
      day == 1 ||
      day == 2 ||
      day == 3 ||
      day == 4 ||
      day == 5 ||
      day == 6 ||
      day == 7 ||
      day == 8 ||
      day == 9
    ) {
      day = "0" + day;
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
      .get("https://marvah-server.onrender.com/advances")
      .then((res) => {
        console.log(" today's transactions", res.data);
        // setDependency(!dependency)

        const formattedData = handleDateConversion(res.data);
        setTodaysTransactions(formattedData);
        setDdmmyy(res.data[10].date);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  console.log("ddmmyy", formatDateString(ddmmyy));

  const handleDateConversion = (data) => {
    return data.map((item) => ({
      ...item,
      date: formatDateString(item.date),
    }));
  };

  useEffect(() => {
    fetchClient();
    fetchHandloan();
    fetchTodaysTransactions();
    // handleSave();
  }, [dependency]);

  const [amountInWords, setAmountInWords] = useState("");
  const numberToWords = (num) => {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    const convertHundreds = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + " " + a[n % 10];
      return (
        a[Math.floor(n / 100)] +
        " Hundred " +
        (n % 100 !== 0 ? convertHundreds(n % 100) : "")
      );
    };

    if (num === 0) return "Zero";
    if (num < 1000) return convertHundreds(num);

    if (num < 100000) {
      return (
        convertHundreds(Math.floor(num / 1000)) +
        " Thousand " +
        (num % 1000 !== 0 ? convertHundreds(num % 1000) : "")
      );
    }

    if (num < 10000000) {
      return (
        convertHundreds(Math.floor(num / 100000)) +
        " Lakh " +
        (num % 100000 !== 0
          ? convertHundreds(Math.floor((num % 100000) / 1000)) +
          " Thousand " +
          convertHundreds(num % 1000)
          : "")
      );
    }

    return "Number out of range";
  };
  useEffect(() => {
    setAmountInWords(numberToWords(amount)); // Convert amount to words whenever it changes
  }, [amount]);

  const todaysTotalAmount = todaysTransactions
  .filter(
    (transaction) =>
      todaysDate === transaction.date &&
      transaction.voucher_type === "Debit-Out"
  )
  .reduce((total, transaction) => total + transaction.amount, 0)

  return (
    <>
      {" "}
      {/* <h2 className="p-2 text-3xl fixed font-bold uppercase text-center ml-[30%]">
        Advances
      </h2> */}
      <div className="tankMainDiv shadow-lg p-3 bg-body-tertiary rounded bigFontWeight">
        {/* <div className="flex justify-between mb-4 mt-3 w-[90%]">
          <span className="text-2xl"> Date :{todaysDate}</span>

          <div className="flex">
            <Link
              className="bg-blue-500 px-2 mr-3 py-1 rounded-md text-white"
              to={"/add_client"}
            >
              Add Client
            </Link>

            <span>
              <div
                onClick={() => setShowHistory(!showHistory)}
                className="bg-blue-500 px-2 mr-3 py-1 rounded-md cursor-pointer text-white"
              >
                History
              </div>
            </span>
            <span>
              <div
                // onClick={() => setShowHistory(!showHistory)}
                onClick={() => navigate('/advanceReports')}
                className="bg-blue-500 px-2 mr-3 py-1 rounded-md cursor-pointer text-white"
              >
                Reports
              </div>
            </span>
          </div>
        </div> */}
      <div className="fixed ml-5 -mt-5 z-1 bg-white w-[84%]">
        <div className="flex  justify-between mb-4 mt-3 w-[90%]">
          <span className="text-2xl"> Date :{todaysDate}</span>
          <span className="text-3xl font-bold uppercase ml-8">  Advances</span>

          <div className="flex">
            <Link 
              className="bg-blue-500 px-2 mr-3 py-1 rounded-md text-white"
              to={"/add_client"}
            >
              Add Client
            </Link>
       
            <span>
              <div
                onClick={() => setShowHistory(!showHistory)}
                className="bg-blue-500 px-2 mr-3 py-1 cursor-pointer rounded-md text-white"
              >
                History
              </div>
            </span>
            <span>
              <div
                // onClick={() => setShowHistory(!showHistory)}
                onClick={() => navigate('/advanceReports')}
                className="bg-blue-500 px-2 mr-3 py-1 cursor-pointer rounded-md text-white"
              >
                Reports
              </div>
            </span>
          </div>
        </div>
        </div>
        <table className="w-[90%] ml-6 mt-20 border border-gray-300">
          
          <thead className="px-2 py-3 w-[100%]">
            <tr className="text-center border-b border-gray-300 text-black">
              <th className="px-2 py-2 border-r border-gray-300">Party Name</th>
              <th className="border-r border-gray-300">Voucher Type</th>
              <th className="border-r border-gray-300">Amount</th>
              <th className="border-r border-gray-300">Narration</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="text-center">
              <td className="border-r border-gray-300">
                <select
                  className="form-select editableInput border-5 border-blue-800 bigFontWeight w-48"
                  value={partyname}
                  onChange={(e) => setPartyname(e.target.value)}
                >
                  <option selected>-Select Party -</option>
                  {clients
                    .sort((a, b) => {
                      if (a.party_name.toLowerCase() < b.party_name.toLowerCase()) {
                        return -1;
                      }
                      if (a.party_name.toLowerCase() > b.party_name.toLowerCase()) {
                        return 1;
                      }
                      return 0;
                    })
                    .map((rest) => (
                      <option value={rest.party_name} key={rest._id}>
                        {rest.party_name}
                      </option>
                    ))}
                </select>
              </td>
              <td className="border-r border-gray-300">
                <select
                  className="form-select editableInput border-5 border-blue-800  bigFontWeight w-48"
                  aria-label="Default select example"
                  value={voucher_type}
                  onChange={(e) => setVoucher_type(e.target.value)}
                >
                  <option selected> -</option>
                  <option value="Debit-Out">Advance</option>
                </select>
              </td>
              <td className="border-r border-gray-300">
                <input
                  type="number"
                  className="form-control editableInput border-5 border-blue-800  bigFontWeight w-48"
                  value={amount || ""}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td className="border-r border-gray-300">
                <input
                  type="text"
                  className="form-control editableInput border-5 border-blue-800  bigFontWeight w-96"
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

        <td className="flex mt-3 ml-6">
          <span className="text-center p-2 text-black font-bold text-lg">Amount in Words</span>
          <input
            type="text"
            className="form-control editableInput border-5 border-blue-800  bigFontWeight w-96 ml-10"
            value={amountInWords}
            readOnly
          />
        </td>

        <h2 className="text-center text-xl p-2 font-bold">Today's Transactions</h2>
        <br />

        <table className="w-[90%] border border-gray-300 ml-6">
          <thead>
            <tr className="text-center border-b border-gray-300 text-black">
              <th className="px-1 py-2 border-r border-gray-300">Party Name</th>
              <th className="py-2 border-r border-gray-300 w-32">Advances</th>
              <th className="py-2">Narration</th>
            </tr>
          </thead>
          <tbody>
            {todaysTransactions
              .filter((transaction) => todaysDate === transaction.date)
              .map((transaction, index) => (
                <tr className="text-center" key={index}>
                  <td className="p-2 border-r border-gray-300">
                    {transaction.party_name}
                  </td>
                  <td className="p-2 border-r border-gray-300">
                    {transaction.voucher_type === "Debit-Out"
                      ? transaction.amount
                      : "-"}
                  </td>
                  <td className="p-2 border-r border-gray-300">
                    {transaction.narration}
                  </td>
                </tr>
              ))}

            {/* Total Advances Row */}
            <tr className="font-bold text-center text-black">
              <td className="p-2 border-r border-gray-300">Total Advances</td>
              <td className="p-2 border-r border-gray-300">
                {todaysTotalAmount}
              </td>
              <td className="p-2 border-gray-300"></td>
            </tr>
          </tbody>
        </table>

        {/* Client's Transaction History */}
        {showHistory && (
          <>
            <div>
              <h2 className="text-center text-xl p-2 font-bold">
                Client's Transaction History
              </h2>

              <h1 className="px-2 py-1 text-xl ml-4">Party Name : {partyname}</h1>
              <table className="w-[90%] border border-gray-300 ml-6">
                <thead className="items-center p-2">
                  <tr className="text-center p-2 text-black border-b border-gray-300">
                    <th className="p-2 border-r border-gray-300">Sr No.</th>
                    <th className="p-2 border-r border-gray-300">Date</th>
                    <th className="p-2 border-r border-gray-300">Advances</th>
                    <th className="p-2">Narration</th>
                  </tr>
                </thead>
                <tbody>
                  {advances
                    .filter((client) => client.party_name === partyname)
                    .map((client, index) => (
                      <tr className="text-center" key={index}>
                        <td className="p-2 border-r border-gray-300">
                          {index + 1}
                        </td>
                        <td className="border-r border-gray-300">{client?.date}</td>
                        <td className="p-2 border-r border-gray-300">
                          {client.voucher_type === "Debit-Out" ? client.amount : "-"}
                        </td>
                        <td className="p-2">{client.narration}</td>
                      </tr>
                    ))}

                  {/* Total Advances Row */}
                  <tr className="font-bold text-center text-black">
                    <td className="p-2 border-r border-gray-300" colSpan="2">
                      Total Advances
                    </td>
                    <td className="p-2 border-r border-gray-300">
                      {advances
                        .filter(
                          (client) =>
                            client.party_name === partyname &&
                            client.voucher_type === "Debit-Out"
                        )
                        .reduce((total, client) => total + client.amount, 0)}
                    </td>
                    <td className="p-2">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

    </>
  );
}