// import axios from 'axios';

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function HandloansReport() {
//   const [handloans, setHandloans] = useState([]); // State for handloan data
//   const [selectedHandloan, setSelectedHandloan] = useState(''); // State for selected handloan
//   const [selectedDate, setSelectedDate] = useState(''); // State for selected date
//   const [selectedEndDate, setselectedEndDate] = useState('')
//   const [selectedDateType, setSelectedDateType] = useState('year'); // State for selected date type
//   const [handLoanTransactions, setHandLoanTransactions] = useState([]); // State for handloan transaction data
//   const [showTransactions, setShowTransactions] = useState(false); // State to show/hide transactions


//   const navigate = useNavigate()

//   // Fetch handloan data from the API
//   const fetchHandloanReport = () => {
//     axios
//       .get('https://marvah-server.onrender.com/handloan')
//       .then((res) => {
//         console.log('Handloan Data', res.data);
//         setHandloans(res.data); // Set handloan data
//         if (res.data.length > 0) {
//           setSelectedHandloan(res.data[0]?.party_name || ''); // Default to first handloan
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching handloan report:', error.message);
//       });
//   };

//   // Fetch handloan client transactions data
//   const fetchHandloanClient = () => {
//     axios
//       .get('https://marvah-server.onrender.com/client')
//       .then((res) => {
//         console.log('Check Transactions', res.data);
//         setHandLoanTransactions(res.data); // Set transaction data
//       })
//       .catch((error) => {
//         console.error('Error fetching client transactions:', error.message);
//       });
//   };

//   useEffect(() => {
//     fetchHandloanReport(); // Fetch handloan data on mount
//     fetchHandloanClient(); // Fetch transaction data on mount
//   }, []);

//   // Handle handloan selection change
//   const handleSelectChange = (event) => {
//     setSelectedHandloan(event.target.value); // Set selected handloan
//     setShowTransactions(false); // Hide transactions when changing handloan
//   };

//   // Handle date selection change
//   const handleDateChange = (event) => {
//     setSelectedDate(event.target.value); // Set selected date
//   };

//   // Handle date type selection change
//   const handleDateTypeChange = (event) => {
//     setSelectedDateType(event.target.value); // Set selected date type
//   };

//   // Handle show button click to display transactions
//   const handleShowTransactions = () => {
//     setShowTransactions(true); // Show transactions
//   };

//   function formatDateToDDMMYYYY(dateString) {
//     const date = new Date(dateString); // Create a date object from the input
//     const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with 0
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (add 1 since months are 0-indexed)
//     const year = date.getFullYear(); // Get full year

//     return { day, month, year }; // Return an object with day, month, and year
//   }

//   // Filter transactions based on the selected handloan, date, and date type
//   const filteredTransactions = handloans.filter((transaction) => {
//     const transactionDate = new Date(transaction.date);
//     const startDate = new Date(selectedDate); // start date for "between" filter
//     const endDate = new Date(selectedEndDate); // end date for "between" filter
//     const formattedTransactionDate = formatDateToDDMMYYYY(transaction.date);
//     const formattedSelectedDate = formatDateToDDMMYYYY(selectedDate);

//     switch (selectedDateType) {
//       case 'day':
//         return (
//           transaction.party_name === selectedHandloan &&
//           formattedTransactionDate.day === formattedSelectedDate.day &&
//           formattedTransactionDate.month === formattedSelectedDate.month &&
//           formattedTransactionDate.year === formattedSelectedDate.year
//         );
//       case 'month':
//         return (
//           transaction.party_name === selectedHandloan &&
//           formattedTransactionDate.month === formattedSelectedDate.month &&
//           formattedTransactionDate.year === formattedSelectedDate.year
//         );
//       case 'year':
//         return (
//           transaction.party_name === selectedHandloan &&
//           formattedTransactionDate.year === formattedSelectedDate.year
//         );
//       case 'between': // New case for "between" dates
//         return (
//           transaction.party_name === selectedHandloan &&
//           isDateBetween(transactionDate, startDate, endDate) // Check if within range
//         );
//       default:
//         return false; // Fallback in case of unexpected date type
//     }
//   });

//   const uniquePartyName = [...new Set(handloans.map(item => item.party_name))]

//   function isDateBetween(date, startDate, endDate) {
//     return date >= startDate && date <= endDate;
//   }





//   return (
//     <div className='relative mx-auto px-4 container w-full'>
//       <div className='relative flex justify-center items-center'>
//         <h1 className='font-bold text-center my-8 text-2xl'>Handloan Report</h1>
//         <button
//           className='absolute right-10 top-8 bg-[#3B82F6] focus:outline-none text-white px-4 py-2 rounded'
//           onClick={() => navigate(-1)}
//         >Back</button>
//       </div>

//       {/* First table: Handloan selection */}
//       <div>
//         <table className='w-full border-collapse shadow-sm'>
//           <thead>
//             <tr className='bg-[#008b8b] text-white'>
//               <th className='p-2 border-2 text-center'>Party Name</th>
//               <th className='p-2 border-2 text-center'>Period Type</th>
//               <th className='p-2 border-2 text-center'>Select Date</th>
//               <th className='p-2 border-2 text-center'>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className='border-b'>
//               <td className='p-4'>
//                 <select
//                   value={selectedHandloan}
//                   onChange={handleSelectChange}
//                   className='w-full p-2 border-2 border-gray-400 rounded focus:outline-none'
//                 >
//                   {/* {handloans.map((item, index) => (
//                     <option key={index} value={item.party_name}>
//                       {item.party_name}
//                     </option>
//                   ))} */}
//                   {uniquePartyName.map((party, index) => (
//                     <option key={index} value={party}>
//                       {party}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//               <td className='p-4'>
//                 <select
//                   value={selectedDateType}
//                   onChange={handleDateTypeChange} // Handle date type change
//                   className='p-2 w-full border-2 border-gray-400 rounded focus:outline-none'
//                 >
//                   <option value="year">Year</option>
//                   <option value="month">Month</option>
//                   <option value="day">Day</option>
//                   <option value="between">Between Dates</option>
//                 </select>
//               </td>

//               {selectedDateType === 'between' ? (
//                 <td className='p-4 flex gap-8 justify-center items-center'>
//                   <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)} // Start date input
//                     className="p-2 border-2 border-gray-400 rounded focus:outline-none"
//                   />
//                   <input
//                     type="date"
//                     value={selectedEndDate}
//                     onChange={(e) => setselectedEndDate(e.target.value)} // End date input
//                     className="p-2 border-2 border-gray-400 rounded focus:outline-none"
//                   />
//                 </td>

//               ) : (
//                 <td className='p-4 flex gap-8 justify-center items-center'>
//                   <input
//                     type='date'
//                     onChange={handleDateChange} // Handle date change
//                     className='p-2 w-full border-2 cursor-pointer border-gray-400 rounded focus:outline-none'
//                   />
//                 </td>
//               )}

//               <td className='p-4 text-center'>
//                 <button
//                   className='bg-[#16A34A] focus:outline-none text-white px-4 py-2 rounded '
//                   onClick={handleShowTransactions}
//                 >
//                   Show
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Second table: Transaction details */}
//       {showTransactions && (
//         <div className='mt-8'>
//           <h2 className='font-bold text-lg mb-4'>Transaction Details</h2>
//           <table className='w-full border-collapse'>
//             <thead>
//               <tr className='bg-[#008b8b] text-white'>
//                 <th className='p-2 border-2'>Sr. No</th>
//                 <th className='p-2 border-2'>Date</th>
//                 <th className='p-2 border-2'>Name</th>
//                 <th className='p-2 border-2'>Narration</th>
//                 <th className='p-2 border-2'>Voucher Type</th>
//                 <th className='p-2 border-2'>Dr. Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredTransactions.length > 0 ? (
//                 filteredTransactions.map((item, index) => (
//                   <tr key={index} className='border-b hover:bg-gray-200'>
//                     <td className='p-4'>{index + 1}</td>
//                     <td className='p-4'>{formatDateToDDMMYYYY(item.date).day} {formatDateToDDMMYYYY(item.date).month} {formatDateToDDMMYYYY(item.date).year}</td>
//                     <td className='p-4'>{item.party_name}</td>
//                     <td className='p-4'>{item.narration}</td>
//                     <td className='p-4'>{item.voucher_type}</td>
//                     <td className='p-4'>{item.amount}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan='6' className='p-4 text-center'>
//                     No transaction data available.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default HandloansReport;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HandloansReport() {
  const [handloans, setHandloans] = useState([]); // State for handloan data
  const [selectedHandloan, setSelectedHandloan] = useState('All'); // State for selected handloan
  const [selectedDate, setSelectedDate] = useState(''); // State for selected date
  const [selectedEndDate, setselectedEndDate] = useState('')
  const [selectedDateType, setSelectedDateType] = useState('year'); // State for selected date type
  const [handLoanTransactions, setHandLoanTransactions] = useState([]); // State for handloan transaction data
  const [showTransactions, setShowTransactions] = useState(false); // State to show/hide transactions
  const [displayedHandloans, setDisplayedHandloans] = useState([]);

  const navigate = useNavigate()

  // Fetch handloan data from the API
  const fetchHandloanReport = () => {
    axios
      .get('https://marvah-server.onrender.com/handloan')
      .then((res) => {
        console.log('Handloan Data', res.data);
        setHandloans(res.data); // Set handloan data
        if (res.data.length > 0) {
          // setSelectedHandloan(res.data[0]?.party_name || '');
          setSelectedHandloan('All')
        }
      })
      .catch((error) => {
        console.error('Error fetching handloan report:', error.message);
      });
  };

  // Fetch handloan client transactions data
  const fetchHandloanClient = () => {
    axios
      .get('https://marvah-server.onrender.com/client')
      .then((res) => {
        console.log('Check Transactions', res.data);
        setHandLoanTransactions(res.data); // Set transaction data
      })
      .catch((error) => {
        console.error('Error fetching client transactions:', error.message);
      });
  };

  useEffect(() => {
    fetchHandloanReport(); // Fetch handloan data on mount
    fetchHandloanClient(); // Fetch transaction data on mount
  }, []);

  // Handle handloan selection change
  const handleSelectChange = (event) => {
    setSelectedHandloan(event.target.value);
    setShowTransactions(false); 
  };

  // Handle date selection change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Set selected date
  };

  // Handle date type selection change
  const handleDateTypeChange = (event) => {
    setSelectedDateType(event.target.value); // Set selected date type
  };

  // Handle show button click to display transactions

  const handleShowTransactions = () => {
    setShowTransactions(true);
    const filterdHandloans = selectedHandloan === 'All' 
      ? handloans
      : handloans.filter(handloan => handloan.party_name === selectedHandloan);    
    setDisplayedHandloans(filterdHandloans);
  };

  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString); // Create a date object from the input
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with 0
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (add 1 since months are 0-indexed)
    const year = date.getFullYear(); // Get full year

    return { day, month, year }; // Return an object with day, month, and year
  }

  // Filter transactions based on the selected handloan, date, and date type
  // const filteredTransactions = handloans.filter((transaction) => {
  //   const transactionDate = new Date(transaction.date);
  //   const startDate = new Date(selectedDate); // start date for "between" filter
  //   const endDate = new Date(selectedEndDate); // end date for "between" filter
  //   const formattedTransactionDate = formatDateToDDMMYYYY(transaction.date);
  //   const formattedSelectedDate = formatDateToDDMMYYYY(selectedDate);

  //   switch (selectedDateType) {
  //     case 'day':
  //       return (
  //         transaction.party_name === selectedHandloan &&
  //         formattedTransactionDate.day === formattedSelectedDate.day &&
  //         formattedTransactionDate.month === formattedSelectedDate.month &&
  //         formattedTransactionDate.year === formattedSelectedDate.year
  //       );
  //     case 'month':
  //       return (
  //         transaction.party_name === selectedHandloan &&
  //         formattedTransactionDate.month === formattedSelectedDate.month &&
  //         formattedTransactionDate.year === formattedSelectedDate.year
  //       );
  //     case 'year':
  //       return (
  //         transaction.party_name === selectedHandloan &&
  //         formattedTransactionDate.year === formattedSelectedDate.year
  //       );
  //     case 'between': // New case for "between" dates
  //       return (
  //         transaction.party_name === selectedHandloan &&
  //         isDateBetween(transactionDate, startDate, endDate) // Check if within range
  //       );
  //     default:
  //       return false; // Fallback in case of unexpected date type
  //   }
  // });


  const filteredTransactions = handloans.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const startDate = new Date(selectedDate); // start date for "between" filter
    const endDate = new Date(selectedEndDate); // end date for "between" filter
    const formattedTransactionDate = formatDateToDDMMYYYY(transaction.date);
    const formattedSelectedDate = formatDateToDDMMYYYY(selectedDate);
  
    // Check if "All" is selected, bypass party_name filtering
    if (selectedHandloan === 'All') {
      switch (selectedDateType) {
        case 'day':
          return (
            formattedTransactionDate.day === formattedSelectedDate.day &&
            formattedTransactionDate.month === formattedSelectedDate.month &&
            formattedTransactionDate.year === formattedSelectedDate.year
          );
        case 'month':
          return (
            formattedTransactionDate.month === formattedSelectedDate.month &&
            formattedTransactionDate.year === formattedSelectedDate.year
          );
        case 'year':
          return (
            formattedTransactionDate.year === formattedSelectedDate.year
          );
        case 'between': // Check for date range
          return isDateBetween(transactionDate, startDate, endDate);
        default:
          return true; // Show all transactions if no specific filter is applied
      }
    } else {
      // Apply the filters if a specific party is selected
      switch (selectedDateType) {
        case 'day':
          return (
            transaction.party_name === selectedHandloan &&
            formattedTransactionDate.day === formattedSelectedDate.day &&
            formattedTransactionDate.month === formattedSelectedDate.month &&
            formattedTransactionDate.year === formattedSelectedDate.year
          );
        case 'month':
          return (
            transaction.party_name === selectedHandloan &&
            formattedTransactionDate.month === formattedSelectedDate.month &&
            formattedTransactionDate.year === formattedSelectedDate.year
          );
        case 'year':
          return (
            transaction.party_name === selectedHandloan &&
            formattedTransactionDate.year === formattedSelectedDate.year
          );
        case 'between':
          return (
            transaction.party_name === selectedHandloan &&
            isDateBetween(transactionDate, startDate, endDate)
          );
        default:
          return false;
      }
    }
  });
  

  const uniquePartyName = [ 'All'  ,...new Set(handloans.map(item => item.party_name))]

  function isDateBetween(date, startDate, endDate) {
    return date >= startDate && date <= endDate;
  }






  return (
    <div className='relative mx-auto px-4 container w-full'>
      <div className='relative flex justify-center items-center'>
        <h1 className='font-bold text-center my-8 text-2xl'>Handloan Report</h1>
        <button
          className='absolute right-10 top-8 bg-[#3B82F6] focus:outline-none text-white px-4 py-2 rounded'
          onClick={() => navigate(-1)}
        >Back</button>
      </div>

      {/* First table: Handloan selection */}
      <div>
        <table className='w-full border-collapse shadow-sm'>
          <thead>
            <tr className='bg-[#008b8b] text-white'>
              <th className='p-2 border-2 text-center'>Party Name</th>
              <th className='p-2 border-2 text-center'>Period Type</th>
              <th className='p-2 border-2 text-center'>Select Date</th>
              <th className='p-2 border-2 text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td className='p-4'>
                <select
                  value={selectedHandloan}
                  onChange={handleSelectChange}
                  className='w-full p-2 border-2 border-gray-400 rounded focus:outline-none'
                >
                  {uniquePartyName.map((party, index) => (
                    <option key={index} value={party}>
                      {party}
                    </option>
                    
                  ))}
                </select>
              </td>
              <td className='p-4'>
                <select
                  value={selectedDateType}
                  onChange={handleDateTypeChange} // Handle date type change
                  className='p-2 w-full border-2 border-gray-400 rounded focus:outline-none'
                >
                  <option value="year">Year</option>
                  <option value="month">Month</option>
                  <option value="day">Day</option>
                  <option value="between">Between Dates</option>
                </select>
              </td>

              {selectedDateType === 'between' ? (
                <td className='p-4 flex gap-8 justify-center items-center'>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)} // Start date input
                    className="p-2 border-2 border-gray-400 rounded focus:outline-none"
                  />
                  <input
                    type="date"
                    value={selectedEndDate}
                    onChange={(e) => setselectedEndDate(e.target.value)} // End date input
                    className="p-2 border-2 border-gray-400 rounded focus:outline-none"
                  />
                </td>

              ) : (
                <td className='p-4 flex gap-8 justify-center items-center'>
                  <input
                    type='date'
                    onChange={handleDateChange} // Handle date change
                    className='p-2 w-full border-2 cursor-pointer border-gray-400 rounded focus:outline-none'
                  />
                </td>
              )}

              <td className='p-4 text-center'>
                <button
                  className='bg-[#16A34A] focus:outline-none text-white px-4 py-2 rounded '
                  onClick={handleShowTransactions}
                >
                  Show
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Second table: Transaction details */}
      {showTransactions && (
        <div className='mt-8'>
          <h2 className='font-bold text-lg mb-4'>Transaction Details</h2>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-[#008b8b] text-white'>
                <th className='p-2 border-2'>Sr. No</th>
                <th className='p-2 border-2'>Date</th>
                <th className='p-2 border-2'>Name</th>
                <th className='p-2 border-2'>Narration</th>
                <th className='p-2 border-2'>Voucher Type</th>
                <th className='p-2 border-2'>Dr. Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((item, index) => (
                  <tr key={index} className='border-b hover:bg-gray-200'>
                    <td className='p-4'>{index + 1}</td>
                    <td className='p-4'>{formatDateToDDMMYYYY(item.date).day} {formatDateToDDMMYYYY(item.date).month} {formatDateToDDMMYYYY(item.date).year}</td>
                    <td className='p-4'>{item.party_name}</td>
                    <td className='p-4'>{item.narration}</td>
                    <td className='p-4'>{item.voucher_type}</td>
                    <td className='p-4'>{item.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6' className='p-4 text-center'>
                    No transaction data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HandloansReport;