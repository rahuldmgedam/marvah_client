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
//   const [showHistory, setShowHistory] = useState(false);

//   const [amountInWords, setAmountInWords] = useState("");

//   const navigate = useNavigate();

//   const [dependency, setDependency] = useState(false);

//   const [ddmmyy, setDdmmyy] = useState("");

//   const [todaysTransactions, setTodaysTransactions] = useState([]);

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
//       .get("https://marvah-server.onrender.com/handloan")
//       .then((res) => {
//         const formattedData = handleDateConversion(res.data);
//         // setDependency(!dependency)
//         setHandloan(formattedData);
//         console.log("resssss", handloan);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   console.log("handloan", handloan);

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
//       .post("https://marvah-server.onrender.com/handloan/create", {
//         ...newTransaction,
//       })
//       .then((res) => {
//         if (res.data.success) {
//           alert(res.data.msg);
//           fetchClient();
//           fetchHandloan();
//           setHandloan([]);
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
//       .get("https://marvah-server.onrender.com/handloan")
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

//   // const numberToWords = (num) => {
//   //   const a = [
//   //     "",
//   //     "One",
//   //     "Two",
//   //     "Three",
//   //     "Four",
//   //     "Five",
//   //     "Six",
//   //     "Seven",
//   //     "Eight",
//   //     "Nine",
//   //     "Ten",
//   //     "Eleven",
//   //     "Twelve",
//   //     "Thirteen",
//   //     "Fourteen",
//   //     "Fifteen",
//   //     "Sixteen",
//   //     "Seventeen",
//   //     "Eighteen",
//   //     "Nineteen",
//   //   ];
//   //   const b = [
//   //     "",
//   //     "",
//   //     "Twenty",
//   //     "Thirty",
//   //     "Forty",
//   //     "Fifty",
//   //     "Sixty",
//   //     "Seventy",
//   //     "Eighty",
//   //     "Ninety",
//   //   ];

//   //   if (num === 0) return "Zero";
//   //   if (num < 20) return a[num];
//   //   if (num < 100) return b[Math.floor(num / 10)] + " " + a[num % 10];
//   //   if (num < 1000)
//   //     return (
//   //       a[Math.floor(num / 100)] +
//   //       " Hundred " +
//   //       numberToWords(num % 100)
//   //     );

//   //   return num.toString(); // For larger numbers, a more complex function is needed.
//   // };
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
//       <div className=" shadow-lg p-3 bg-body-tertiary rounded bigFontWeight">
//         <h2 className="mb-1 p-2 text-3xl fixed ml-[29%] font-bold uppercase text-center">
//           Handloans
//         </h2>
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
//         </div>
//         <table className="w-[90%]">
//           <thead className="px-2 py-3 w-[100%]">
//             <tr className="bg-[#7blfa2] w-[100%] border-2  text-center">
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
//                   <option value="Debit-Out">Debit-out</option>
//                   <option value="Credit-In">Credit-In </option>
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
//           <span className="text-center p-2 font-bold">
//             Amount in Words &nbsp;&nbsp;&nbsp;&nbsp;
//           </span>
//           <input
//             type="text"
//             className="form-control editableInput bigFontWeight w-96 ml-4"
//             value={amountInWords}
//             readOnly
//           />
//         </td>
//         <h2 className="text-center text-xl font-bold mt-2 mb-2">
//           Today's Transactions
//         </h2>

//         <table className="w-[90%] border-2">
//           <thead className="">
//             <tr className=" text-center  border-2 border-grey-200">
//               {/* <th className="tablebg">Sr No.</th> */}
//               <th className=" px-1 py-2">Party Name</th>
//               <th className="py-2 w-32">Debit-Out</th>
//               <th className="py-2">Credit-In</th>
//               <th className="py-2">Narration</th>
//             </tr>
//           </thead>
//           <tbody>
//             {todaysTransactions.map(
//               (transaction, index) =>
//                 todaysDate === transaction.date && (
//                   <tr className="hovereffect text-center" key={index}>
//                     {/* <td>{index + 1}</td> */}
//                     <td className="p-2 border-2 border-grey-200">
//                       {transaction.party_name}
//                     </td>
//                     <td className="p-2 border-2 border-grey-200">
//                       {transaction.voucher_type === "Debit-Out"
//                         ? transaction.amount
//                         : "-"}
//                     </td>
//                     <td className="p-2 border-2 border-grey-200">
//                       {transaction.voucher_type === "Credit-In"
//                         ? transaction.amount
//                         : "-"}
//                     </td>
//                     <td className="p-2 border-2 border-grey-200">
//                       {transaction.narration}
//                     </td>
//                   </tr>
//                 )
//             )}

//             {/* Calculate and display the total sum */}
//             <tr className="font-bold text-center ">
//               <td className="">Total</td>
//               <td className="p-2 border-2 border-grey-200">
//                 {todaysTransactions
//                   .filter(
//                     (transaction) =>
//                       transaction.voucher_type === "Debit-Out" &&
//                       todaysDate === transaction.date
//                   )
//                   .reduce(
//                     (total, transaction) => total + transaction.amount,
//                     0
//                   )}
//               </td>
//               <td className="p-2 border-2 border-grey-200">
//                 {todaysTransactions
//                   .filter(
//                     (transaction) =>
//                       transaction.voucher_type === "Credit-In" &&
//                       todaysDate === transaction.date
//                   )
//                   .reduce(
//                     (total, transaction) => total + transaction.amount,
//                     0
//                   )}
//               </td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>

//         {/* Client's Transaction History */}
//         {showHistory && (
//           <>
//             <div>
//               <h2 className="text-center text-xl p-2 font-bold">
//                 Client's Transaction History
//               </h2>
//               <h1 className=" px-2 py-1 text-xl ">Party Name : {partyname}</h1>

//               <table className="w-[90%] border-2">
//                 <thead className="items-center p-2">
//                   <tr className=" text-center p-2 border-2 border-grey-200">
//                     <th className="items-center p-2">Sr No.</th>
//                     <th className="items-center">Date</th>
//                     <th className="">Debit-Out</th>
//                     <th className="">Credit-In</th>
//                     <th className="">Narration</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {handloan
//                     .filter((client) => client.party_name === partyname)
//                     .map((client, index) => (
//                       <tr className="hovereffect text-center" key={index}>
//                         <td className="p-2 border-2 border-grey-200 w-20">
//                           {index + 1}
//                         </td>
//                         <td className="p-2 border-2 border-grey-200 w-32">
//                           {client?.date}
//                         </td>
//                         <td className="p-2 border-2 border-grey-200 w-24">
//                           {client.voucher_type === "Debit-Out"
//                             ? client.amount
//                             : "-"}
//                         </td>
//                         <td className="p-2 border-2 border-grey-200 w-24">
//                           {client.voucher_type === "Credit-In"
//                             ? client.amount
//                             : "-"}
//                         </td>
//                         <td className="p-2 border-2 border-grey-200">
//                           {client.narration}
//                         </td>
//                       </tr>
//                     ))}

//                   {/* Total Row */}
//                   <tr className="font-bold text-center">
//                     <td colSpan={2} className="text-center">
//                       Total
//                     </td>

//                     <td className="p-2 border-2 border-grey-200">
//                       {handloan
//                         .filter(
//                           (client) =>
//                             client.party_name === partyname &&
//                             client.voucher_type === "Debit-Out"
//                         )
//                         .reduce((total, client) => total + client.amount, 0)}
//                     </td>
//                     <td className="p-2 border-2 border-grey-200">
//                       {handloan
//                         .filter(
//                           (client) =>
//                             client.party_name === partyname &&
//                             client.voucher_type === "Credit-In"
//                         )
//                         .reduce((total, client) => total + client.amount, 0)}
//                     </td>
//                     <td></td>
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
  const [handloan, setHandloan] = useState([]);

  const [clients, setClients] = useState([]);
  const [partyname, setPartyname] = useState("");
  const [voucher_type, setVoucher_type] = useState("");
  const [amount, setAmount] = useState(0);
  const [narration, setNarration] = useState("");
  const [balance, setBalance] = useState("0");
  const [partyId, setPartyId] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const [amountInWords, setAmountInWords] = useState("");

  const navigate = useNavigate();

  const [dependency, setDependency] = useState(false);

  const [ddmmyy, setDdmmyy] = useState("");

  const [todaysTransactions, setTodaysTransactions] = useState([]);

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
      .get("https://marvah-server.onrender.com/handloan")
      .then((res) => {
        const formattedData = handleDateConversion(res.data);
        // setDependency(!dependency)
        setHandloan(formattedData);
        console.log("resssss", handloan);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  console.log("handloan", handloan);

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
      .post("https://marvah-server.onrender.com/handloan/create", {
        ...newTransaction,
      })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.msg);
          setAmountInWords("")
          fetchClient();
          fetchHandloan();
          setHandloan([]);
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

    return `${day}-${month}-${year}`  ;
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
      .get("https://marvah-server.onrender.com/handloan")
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


  //   const a = [
  //     "",
  //     "One",
  //     "Two",
  //     "Three",
  //     "Four",
  //     "Five",
  //     "Six",
  //     "Seven",
  //     "Eight",
  //     "Nine",
  //     "Ten",
  //     "Eleven",
  //     "Twelve",
  //     "Thirteen",
  //     "Fourteen",
  //     "Fifteen",
  //     "Sixteen",
  //     "Seventeen",
  //     "Eighteen",
  //     "Nineteen",
  //   ];
  //   const b = [
  //     "",
  //     "",
  //     "Twenty",
  //     "Thirty",
  //     "Forty",
  //     "Fifty",
  //     "Sixty",
  //     "Seventy",
  //     "Eighty",
  //     "Ninety",
  //   ];

  //   if (num === 0) return "Zero";
  //   if (num < 20) return a[num];
  //   if (num < 100) return b[Math.floor(num / 10)] + " " + a[num % 10];
  //   if (num < 1000)
  //     return (
  //       a[Math.floor(num / 100)] +
  //       " Hundred " +
  //       numberToWords(num % 100)
  //     );

  //   return num.toString(); // For larger numbers, a more complex function is needed.
  // };
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
  return (
    <>
      <div className=" ml-6 shadow-lg p-3 bg-body-tertiary rounded bigFontWeight">
        {/* <h2 className="mb-1 p-2 text-3xl fixed ml-[29%] font-bold uppercase text-center">
          Handloans
        </h2> */}
        <div className="fixed -mt-4 z-1 bg-white w-[84%]">
        <div className="flex  justify-between mb-4 mt-3 w-[90%]">
          <span className="text-2xl"> Date :{todaysDate}</span>
          <span className="text-3xl font-bold uppercase ml-8">  Handloans</span>

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
                onClick={() => navigate('/handloanReports')}
                className="bg-blue-500 px-2 mr-3 py-1 cursor-pointer rounded-md text-white"
              >
                Reports
              </div>
            </span>
          </div>
        </div>
        </div>
  
        <table className="w-[90%] ml-4 mt-16">
          <thead className="px-2 py-3 w-[100%]">
            <tr className="bg-[#7blfa2] w-[100%] border-2  text-center">
              <th className="px-2 py-2">Party Name</th>
              <th className="">Voucher Type</th>
              <th className="">Amount</th>
              <th className="">Narration</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="handloan-tr">
              <td>
                <select
                  className="form-select editableInput bigFontWeight w-48"
                  value={partyname}
                  onChange={(e) => setPartyname(e.target.value)}
                >
                  <option selected>-Select Party -</option>
                  {clients
                    .sort((a, b) => {
                      if (
                        a.party_name.toLowerCase() < b.party_name.toLowerCase()
                      ) {
                        return -1;
                      }
                      if (
                        a.party_name.toLowerCase() > b.party_name.toLowerCase()
                      ) {
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
              <td>
                <select
                  className="form-select editableInput bigFontWeight w-48"
                  aria-label="Default select example"
                  value={voucher_type}
                  onChange={(e) => setVoucher_type(e.target.value)}
                >
                  <option selected> -</option>
                  <option value="Debit-Out">Debit-out</option>
                  <option value="Credit-In">Credit-In </option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control editableInput bigFontWeight bg-blue-300 w-48"
                  value={amount || ""}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control editableInput bigFontWeight w-96"
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

        <td className="flex mt-3">
          <span className="text-center p-2 font-bold">
            Amount in Words &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <input
            type="text"
            className="form-control border-[#3232FE] border-5 editableInput bigFontWeight w-96 ml-4"
            value={amountInWords}
            readOnly
          />
        </td>
        <h2 className="text-center text-xl font-bold mt-2 mb-2">
          Today's Transactions
        </h2>

        <table className="w-[90%] border-2">
          <thead className="">
            <tr className=" text-center  border-2 border-grey-200">
              {/* <th className="tablebg">Sr No.</th> */}
              <th className=" px-1 py-2">Party Name</th>
              <th className="py-2">Credit-In</th>
              <th className="py-2 w-32">Debit-Out</th>
          
              <th className="py-2">Narration</th>
            </tr>
          </thead>
          <tbody>
            {todaysTransactions.map(
              (transaction, index) =>
                todaysDate === transaction.date && (
                  <tr className="hovereffect text-center" key={index}>
                    {/* <td>{index + 1}</td> */}
                    <td className="p-2 border-2 border-grey-200">
                      {transaction.party_name}
                    </td>
                    <td className="p-2 border-2 border-grey-200">
                      {transaction.voucher_type === "Credit-In"
                        ? transaction.amount
                        : "-"}
                    </td>
                    <td className="p-2 border-2 border-grey-200">
                      {transaction.voucher_type === "Debit-Out"
                        ? transaction.amount
                        : "-"}
                    </td>
                 
                    <td className="p-2 border-2 border-grey-200">
                      {transaction.narration}
                    </td>
                  </tr>
                )
            )}

            {/* Calculate and display the total sum */}
            <tr className="font-bold text-center ">
              <td className="">Total</td>
              <td className="p-2 border-2 border-grey-200">
                {todaysTransactions
                  .filter(
                    (transaction) =>
                      transaction.voucher_type === "Credit-In" &&
                      todaysDate === transaction.date
                  )
                  .reduce(
                    (total, transaction) => total + transaction.amount,
                    0
                  )}
              </td>
              <td className="p-2 border-2 border-grey-200">
                {todaysTransactions
                  .filter(
                    (transaction) =>
                      transaction.voucher_type === "Debit-Out" &&
                      todaysDate === transaction.date
                  )
                  .reduce(
                    (total, transaction) => total + transaction.amount,
                    0
                  )}
              </td>
       
              <td></td>
            </tr>
          </tbody>
        </table>

        {/* Client's Transaction History */}
        {/* {showHistory && (
          <>
            <div>
              <h2 className="text-center text-xl p-2 font-bold">
                Client's Transaction History
              </h2>
              <h1 className=" px-2 py-1 text-xl ">Party Name : {partyname}</h1>

              <table className="w-[90%] border-2">
                <thead className="items-center p-2">
                  <tr className=" text-center p-2 border-2 border-grey-200">
                    <th className="items-center p-2">Sr No.</th>
                    <th className="items-center">Date</th>
                    <th className="">Credit-In</th>
                    <th className="">Debit-Out</th>
              
                    <th className="">Narration</th>
                  </tr>
                </thead>
                <tbody>
                  {handloan
                    .filter((client) => client.party_name === partyname)
                    .map((client, index) => (
                      <tr className="hovereffect text-center" key={index}>
                        <td className="p-2 border-2 border-grey-200 w-20">
                          {index + 1}
                        </td>
                        <td className="p-2 border-2 border-grey-200 w-32">
                          {client?.date}
                        </td>
                        <td className="p-2 border-2 border-grey-200 w-24">
                          {client.voucher_type === "Credit-In"
                            ? client.amount
                            : "-"}
                        </td>
                        <td className="p-2 border-2 border-grey-200 w-24">
                          {client.voucher_type === "Debit-Out"
                            ? client.amount
                            : "-"}
                        </td>
                    
                        <td className="p-2 border-2 border-grey-200">
                          {client.narration}
                        </td>
                      </tr>
                    ))}

                  <tr className="font-bold text-center">
                    <td colSpan={2} className="text-center">
                      Total
                    </td>
                    <td className="p-2 border-2 border-grey-200">
                      {handloan
                        .filter(
                          (client) =>
                            client.party_name === partyname &&
                            client.voucher_type === "Credit-In"
                        )
                        .reduce((total, client) => total + client.amount, 0)}
                    </td>
                    <td className="p-2 border-2 border-grey-200">
                      {handloan
                        .filter(
                          (client) =>
                            client.party_name === partyname &&
                            client.voucher_type === "Debit-Out"
                        )
                        .reduce((total, client) => total + client.amount, 0)}
                    </td>
            
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )} */}
        
        {showHistory && (
  <>
    <div>
      <h2 className="text-center text-xl p-2 font-bold">
        Client's Transaction History
      </h2>
      <h1 className=" px-2 py-1 text-xl ">Party Name : {partyname}</h1>

      <table className="w-[90%] border-2">
        <thead className="items-center p-2">
          <tr className=" text-center p-2 border-2 border-grey-200">
            <th className="items-center p-2">Sr No.</th>
            <th className="items-center">Date</th>
            <th className="">Credit-In</th>
            <th className="">Debit-Out</th>
            <th className="">Narration</th>
          </tr>
        </thead>
        <tbody>
          {handloan
            .filter((client) => client.party_name === partyname)
            .map((client, index) => (
              <tr className="hovereffect text-center" key={index}>
                <td className="p-2 border-2 border-grey-200 w-20">
                  {index + 1}
                </td>
                <td className="p-2 border-2 border-grey-200 w-32">
                  {client?.date}
                </td>
                <td className="p-2 border-2 border-grey-200 w-24">
                  {client.voucher_type === "Credit-In"
                    ? client.amount
                    : "-"}
                </td>
                <td className="p-2 border-2 border-grey-200 w-24">
                  {client.voucher_type === "Debit-Out"
                    ? client.amount
                    : "-"}
                </td>
                <td className="p-2 border-2 border-grey-200">
                  {client.narration}
                </td>
              </tr>
            ))}

          {/* Calculate Total Credit and Total Debit */}
          {(() => {
            const totalCredit = handloan
              .filter(
                (client) =>
                  client.party_name === partyname &&
                  client.voucher_type === "Credit-In"
              )
              .reduce((total, client) => total + client.amount, 0);

            const totalDebit = handloan
              .filter(
                (client) =>
                  client.party_name === partyname &&
                  client.voucher_type === "Debit-Out"
              )
              .reduce((total, client) => total + client.amount, 0);

            const balanceDifference = totalCredit - totalDebit;

            return (
              <>
                {/* Total Row */}
                <tr className="font-bold text-center">
                  <td colSpan={2} className="text-center">
                    Total
                  </td>
                  <td className="p-2 border-2 border-grey-200">
                    {totalCredit}
                  </td>
                  <td className="p-2 border-2 border-grey-200">
                    {totalDebit}
                  </td>
                  <td></td>
                </tr>

                {/* Conditional Balance Difference Row */}
                {totalCredit > totalDebit ? (
                  <tr className="font-bold text-center">
                    <td className="p-2 border-2 border-grey-200" colSpan={2}>Balance Difference</td>
                    <td className="p-2 border-2 border-grey-200">
                      {balanceDifference}
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                ) : (
                  <tr className="font-bold text-center">
                    <td className="p-2 border-2 border-grey-200" colSpan={2}>Balance Difference</td>
                    <td></td>
                    <td className="p-2 border-2 border-grey-200">
                      {Math.abs(balanceDifference)}
                    </td>
                    <td></td>
                  </tr>
                )}
              </>
            );
          })()}
        </tbody>
      </table>
    </div>
  </>
)}

      </div>
    </>
  );
}