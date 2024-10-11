// import axios from 'axios';
// import React, { useState, useEffect } from 'react';

// function AdvanceReport() {
//     const [advances, setAdvances] = useState([]); // State for all hand loans (renamed from Isadvance)
//     const [selectedAdvance, setSelectedAdvance] = useState(''); // State for selected hand loan (corrected)
//     const [transactions, setTransactions] = useState([]); // State for transaction data
//     const [showTransactions, setShowTransactions] = useState(false); // State to show/hide transactions

//     // Fetch data from the API for advances
//     const fetchAdvanceReport = () => {
//         axios
//             .get('https://marvah-server.onrender.com/advances')
//             .then((res) => {
//                 console.log('Advance Data', res.data);
//                 setAdvances(res.data); // Set the state with fetched data
//                 setSelectedAdvance(res.data[0]?.party_name || ''); // Default to the first advance
//             })
//             .catch((error) => {
//                 console.log(error.message);
//             });
//     };

//     // Fetch data for the second table (transactions) from another API
//     const fetchTransactions = () => {
//         axios
//             .get('https://marvah-server.onrender.com/client')
//             .then((res) => {
//                 console.log('Transactions Data', res.data);
//                 setTransactions(res.data); // Set the state with fetched data
//             })
//             .catch((error) => {
//                 console.log(error.message);
//             });
//     };

//     useEffect(() => {
//         fetchAdvanceReport(); // Fetch advances on component mount
//         fetchTransactions(); // Fetch transactions on component mount
//     }, []);

//     // Handle selection of advance
//     const handleSelectChange = (event) => {
//         setSelectedAdvance(event.target.value); // Set the selected advance
//         setShowTransactions(false); // Hide transactions when changing the selected advance
//     };

//     // Handle show button click to display transactions
//     const handleShowTransactions = () => {
//         setShowTransactions(true); // Set show transactions to true when clicking show button
//     };

//     return (
//         <div className='relative mx-auto px-4 container w-full'>
//             <div>
//                 <h1 className='font-bold text-center my-8 text-2xl'>Advance Report</h1>
//             </div>

//             {/* First table: Advance selection */}
//             <div>
//                 <table className='w-full border-collapse border border-gray-300'>
//                     <thead>
//                         <tr className='border border-gray-300'>
//                             <th className='p-2 border border-gray-300'>Advance Name</th>
//                             <th className='p-2 border border-gray-300'>Advance Date Type</th>
//                             <th className='p-2 border border-gray-300'>Select Date</th>
//                             <th className='p-2 border border-gray-300'>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr className='border border-gray-300'>
//                             <td className='p-2 border border-gray-300'>
//                                 <select
//                                     value={selectedAdvance}
//                                     onChange={handleSelectChange}
//                                     className='p-2 border border-gray-300'
//                                 >
//                                     {advances.map((item, index) => (
//                                         <option key={index} value={item.party_name}>
//                                             {item.party_name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </td>
//                             <td>
//                                 <select>
//                                     <option value="year">Year</option>
//                                     <option value="month">Month</option>
//                                     <option value="day">Day</option>
//                                 </select>
//                             </td>
//                             <td>
//                                 <input type='date' />
//                             </td>
//                             <td>
//                                 <button
//                                     className='bg-blue-800 focus:outline-none text-white px-4 py-2 rounded'
//                                     onClick={handleShowTransactions}
//                                 >
//                                     Show
//                                 </button>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>

//             {/* Second table: Transaction details */}
//             {showTransactions && (
//                 <div className='mt-8'>
//                     <h2 className='font-bold text-lg mb-4'>Transaction Details</h2>
//                     <table className='w-full border-collapse border border-gray-300'>
//                         <thead>
//                             <tr className='border border-gray-300'>
//                                 <th className='p-2 border border-gray-300'>Sr. No</th>
//                                 <th className='p-2 border border-gray-300'>Date</th>
//                                 <th className='p-2 border border-gray-300'>Name</th>
//                                 <th className='p-2 border border-gray-300'>Narration</th>
//                                 <th className='p-2 border border-gray-300'>Voucher Type</th>
//                                 <th className='p-2 border border-gray-300'>Amount</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {transactions.length > 0 ? (
//                                 advances.map((item, index) => (
//                                     <tr key={index} className='border border-gray-300'>
//                                         <td className='p-2 border border-gray-300'>{index + 1}</td>
//                                         <td className='p-2 border border-gray-300'>{item.date}</td>
//                                         <td className='p-2 border border-gray-300'>{item.party_name}</td>
//                                         <td className='p-2 border border-gray-300'>{item.narration}</td>
//                                         <td className='p-2 border border-gray-300'>{item.voucher_type}</td>
//                                         <td className='p-2 border border-gray-300'>{item.amount}</td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan='6' className='p-2 text-center'>
//                                         No transaction data available.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default AdvanceReport;


import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdvanceReport() {
  const [advances, setAdvances] = useState([]); // State for all advances
  const [selectedAdvance, setSelectedAdvance] = useState(''); // State for selected advance
  const [transactions, setTransactions] = useState([]); // State for transaction data
  const [selectedDate, setSelectedDate] = useState(''); // State for selected date
  const [selectedEndDate, setselectedEndDate] = useState('')
  const [selectedDateType, setSelectedDateType] = useState('year'); // State for selected date type
  // const [filteredTransactions, setFilteredTransactions] = useState([]); // State for filtered transactions
  const [showTransactions, setShowTransactions] = useState(false); // State to show/hide transactions
  const [advanceTransaction, setAdvanceTransaction] = useState([])

  const navigate = useNavigate()

  // Fetch data from the API for advances
  const fetchAdvanceReport = () => {
    axios
      .get('https://marvah-server.onrender.com/advances')
      .then((res) => {
        console.log('Advance Data', res.data);
        setAdvances(res.data); // Set the state with fetched data
        setAdvanceTransaction(res.data); // Default to the first advance
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // Fetch data for the second table (transactions) from another API
  const fetchTransactions = () => {
    axios
      .get('https://marvah-server.onrender.com/client')
      .then((res) => {
        console.log('Transactions Data', res.data);
        setTransactions(res.data); // Set the state with fetched data
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchAdvanceReport(); // Fetch advances on component mount
    fetchTransactions(); // Fetch transactions on component mount
  }, []);

  // Handle selection of advance
  const handleSelectChange = (event) => {
    setSelectedAdvance(event.target.value); // Set the selected advance
    setShowTransactions(false); // Hide transactions when changing the selected advance
  };

  // Handle date selection change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Set the selected date
  };

  // Handle date type selection change
  const handleDateTypeChange = (event) => {
    setSelectedDateType(event.target.value); // Set the selected date type
  };

  // Handle show button click to display transactions
  const handleShowTransactions = () => {
    // const formattedSelectedDate = formatDateToDDMMYYYY(selectedDate);

    // const filtered = advances.filter((transaction) => {
    //   const formattedTransactionDate = formatDateToDDMMYYYY(transaction.date);
    //   switch (selectedDateType) {
    //     case 'day':
    //       return (
    //         transaction.party_name === selectedAdvance &&
    //         formattedTransactionDate.day === formattedSelectedDate.day &&
    //         formattedTransactionDate.month === formattedSelectedDate.month &&
    //         formattedTransactionDate.year === formattedSelectedDate.year
    //       );
    //     case 'month':
    //       return (
    //         transaction.party_name === selectedAdvance &&
    //         formattedTransactionDate.month === formattedSelectedDate.month &&
    //         formattedTransactionDate.year === formattedSelectedDate.year
    //       );
    //     case 'year':
    //       return (
    //         transaction.party_name === selectedAdvance &&
    //         formattedTransactionDate.year === formattedSelectedDate.year
    //       );
    //     default:
    //       return false; // Fallback in case of unexpected date type
    //   }
    // });

    // setFilteredTransactions(filtered); // Set the filtered transactions
    setShowTransactions(true); // Show transactions
  }

  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's 0-indexed
    const year = date.getFullYear();

    return { day, month, year };
  }
  const filteredTransactions = advances.filter((item) => {
    const transactionDate = new Date(item.date); // Ensure the correct property name 'date'
    const startDate = new Date(selectedDate);
    const endDate = new Date(selectedEndDate);

    const formattedTransactionDate = formatDateToDDMMYYYY(item.date); // Format transaction date
    const formattedSelectedDate = formatDateToDDMMYYYY(selectedDate); // Format selected start date

    switch (selectedDateType) {
      case 'day':
        return (
          item.party_name === selectedAdvance &&
          formattedTransactionDate.day === formattedSelectedDate.day &&
          formattedTransactionDate.month === formattedSelectedDate.month &&
          formattedTransactionDate.year === formattedSelectedDate.year
        );
      case 'month':
        return (
          item.party_name === selectedAdvance &&
          formattedTransactionDate.month === formattedSelectedDate.month &&
          formattedTransactionDate.year === formattedSelectedDate.year
        );
      case 'year':
        return (
          item.party_name === selectedAdvance &&
          formattedTransactionDate.year === formattedSelectedDate.year
        );
      case 'between':
        return (
          item.party_name === selectedAdvance &&
          isDateBetween(transactionDate, startDate, endDate)
        );
      default:
        return false;
    }
  });
  function isDateBetween(date, startDate, endDate) {
    return date >= startDate && date <= endDate;
  }

  const uniqueAdvancePartyName = [...new Set(advances.map(item => item.party_name))]



  return (
    <div className='relative mx-auto px-4 container w-full'>
      <div className='relative flex justify-center items-center'>
        <h1 className='font-bold text-center my-8 text-2xl'>Advance Report</h1>
        <button
          className='absolute right-10 top-8 bg-[#3B82F6] focus:outline-none text-white px-4 py-2 rounded'
          onClick={() => navigate(-1)}
        >Back</button>
      </div>
      {/* First table: Advance selection */}
      <div>
        <table className='w-full border-collapse shadow-sm'>
          <thead>
            <tr className='bg-[#008b8b] text-white'>
              <th className='p-2 border-2 text-left'>Party Name</th>
              <th className='p-2 border-2 text-left'>Voucher Type</th> {/* Added Hand Loan Type */}
              <th className='p-2 border-2 text-left'>Period Type</th>
              <th className='p-2 border-2 text-left'>Select Date</th>
              <th className='p-2 border-2 text-left'>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border-b'>
              <td className='p-4'>
                <select
                  value={selectedAdvance}
                  onChange={handleSelectChange}
                  className='w-full p-2 border-2 border-gray-400 rounded focus:outline-none'
                >
                  {/* {advances.map((item, index) => (
                    <option key={index} value={item.party_name}>
                      {item.party_name}
                    </option>
                  ))} */}
                  {uniqueAdvancePartyName.map((party, index) => (
                    <option key={index} value={party}>
                      {party}
                    </option>
                  ))}
                </select>
              </td>
              <td className='p-4 border border-gray-300'>
                {/* <select className='w-full p-2 border-2 border-gray-400 rounded focus:outline-none'>
                  
                  <option value="personal">Personal Loan</option>
                  <option value="business">Business Loan</option>
                  <option value="home">Home Loan</option>
                </select> */}
                <h4 className='border-2 p-2 w-full rounded border-gray-400 focus:outline-none'>Advances</h4>
              </td>
              <td className='p-4'>
                <select
                  value={selectedDateType}
                  onChange={handleDateTypeChange} // Handle date type change
                  className='w-full p-2 border-2 border-gray-400 rounded focus:outline-none'
                >
                  <option value="year">Year</option>
                  <option value="month">Month</option>
                  <option value="day">Day</option>
                  <option value="between">Between Dates</option>
                </select>
              </td>

              {
                selectedDateType === 'between' ? (
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
                  <td>
                    <input
                      type='date'
                      onChange={handleDateChange} // Handle date change
                      className='w-full p-2 border-2 cursor-pointer border-gray-400 rounded focus:outline-none'
                    />
                  </td>
                )
              }

              <td className='text-center'>
                <button
                  className='bg-[#16A34A] focus:outline-none text-white  px-4 py-2 rounded'
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
          <table className='w-full border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-[#008b8b] text-white'>
                <th className='p-2 border'>Sr. No</th>
                <th className='p-2 border'>Date</th>
                <th className='p-2 border'>Name</th>
                <th className='p-2 border'>Narration</th>
                <th className='p-2 border'>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((item, index) => (
                  <tr key={index} className='border border-gray-300'>
                    <td className='p-4 border border-gray-300'>{index + 1}</td>
                    <td className='p-4 border border-gray-300'>{formatDateToDDMMYYYY(item.date).day} {formatDateToDDMMYYYY(item.date).month} {formatDateToDDMMYYYY(item.date).year}</td>
                    <td className='p-4 border border-gray-300'>{item.party_name}</td>
                    <td className='p-4 border border-gray-300'>{item.narration}</td>
                    <td className='p-4 border border-gray-300'>{item.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='6' className='p-2 text-center'>
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

export default AdvanceReport;