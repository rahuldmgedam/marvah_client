// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// const ConsoliFuelsales = () => {
//   const [handloans, setHandloans] = useState([]);
//  const [fuelSales,setFuelSales] = useState([])
//   const [selectedHandloan, setselectedFuelSales] = useState(""); 
//   const [selectedFuelSales, setSelectedFuelSales] = useState(""); 

//   const [selectedDate, setSelectedDate] = useState(""); // State for selected date
//   const [selectedEndDate, setselectedEndDate] = useState("");
//   const [selectedDateType, setSelectedDateType] = useState("year"); // State for selected date type
//   const [handLoanTransactions, setHandLoanTransactions] = useState([]); // State for handloan transaction data
//   const [showTransactions, setShowTransactions] = useState(false); // State to show/hide transactions

//   const navigate = useNavigate();

//   // Fetch handloan data from the API
//   const fetchFuelSales = () => {
//     axios
//       .get("https://marvah-server.onrender.com/fuelsales")
//       .then((res) => {
//         console.log("fuelSales Data", res.data.fuelSales);
//         setFuelSales(res.data.fuelSales); // Set handloan data
//         if (res.data.length > 0) {
//           setSelectedFuelSales(res.data[0]?.party_name || ""); // Default to first handloan
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching handloan report:", error.message);
//       });
//   };

//   // Fetch handloan client transactions data
//   const fetchHandloanClient = () => {
//     axios
//       .get("https://marvah-server.onrender.com/client")
//       .then((res) => {
//         console.log("Check Transactions", res.data);
//         setHandLoanTransactions(res.data); // Set transaction data
//       })
//       .catch((error) => {
//         console.error("Error fetching client transactions:", error.message);
//       });
//   };

//   useEffect(() => {
//     fetchFuelSales(); // Fetch handloan data on mount
//     fetchHandloanClient(); // Fetch transaction data on mount
//   }, []);

//   // Handle handloan selection change
//   const handleSelectChange = (event) => {
//     setSelectedFuelSales(event.target.value); // Set selected handloan
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



//   function formatDateToDDMMYYYY(dateString) {
//     const date = new Date(dateString); // Create a date object from the input
//     const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with 0
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (add 1 since months are 0-indexed)
//     const year = date.getFullYear(); // Get full year

//     return { day, month, year }; // Return an object with day, month, and year
//   }

//   return (
//     <>
//       <div className="relative mx-auto px-4 container w-full">
//         <div className="relative flex justify-center items-center">
//           <h1 className="font-bold text-center my-8 text-2xl">
//             Consolidated FuelSales Report
//           </h1>
//           <button
//             className="absolute right-10 top-8 bg-[#3B82F6] focus:outline-none text-white px-4 py-2 rounded"
//             onClick={() => navigate(-1)}
//           >
//             Back
//           </button>
//         </div>

//         {/* First table: Handloan selection */}
//         <div>
//           <table className="w-full border-collapse shadow-sm">
//             <thead>
//               <tr className="bg-[#008b8b] text-white">
//                 <th className="p-2 border-2 text-center">Select Product</th>
//                 <th className="p-2 border-2 text-center">Period Type</th>
//                 <th className="p-2 border-2 text-center">Select Date</th>
//                 <th className="p-2 border-2 text-center">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-b">
//                 <td className="p-4">
//                   <select
//                     // value={}
//                     onChange={handleSelectChange}
//                     className="w-full p-2 border-2 border-gray-400 rounded focus:outline-none"
//                   >
                
//                   </select>
//                 </td>
//                 <td className="p-4">
//                   <select
//                     value={selectedDateType}
//                     onChange={handleDateTypeChange} // Handle date type change
//                     className="p-2 w-full border-2 border-gray-400 rounded focus:outline-none"
//                   >
//                     <option value="year">Year</option>
//                     <option value="month">Month</option>
//                     <option value="day">Day</option>
//                     <option value="between">Between Dates</option>
//                   </select>
//                 </td>

//                 {selectedDateType === "between" ? (
//                   <td className="p-4 flex gap-8 justify-center items-center">
//                     <input
//                       type="date"
//                       value={selectedDate}
//                       onChange={(e) => setSelectedDate(e.target.value)} // Start date input
//                       className="p-2 border-2 border-gray-400 rounded focus:outline-none"
//                     />
//                     <input
//                       type="date"
//                       value={selectedEndDate}
//                       onChange={(e) => setselectedEndDate(e.target.value)} // End date input
//                       className="p-2 border-2 border-gray-400 rounded focus:outline-none"
//                     />
//                   </td>
//                 ) : (
//                   <td className="p-4 flex gap-8 justify-center items-center">
//                     <input
//                       type="date"
//                       onChange={handleDateChange} // Handle date change
//                       className="p-2 w-full border-2 cursor-pointer border-gray-400 rounded focus:outline-none"
//                     />
//                   </td>
//                 )}

//                 <td className="p-4 text-center">
//                   <button
//                     className="bg-[#16A34A] focus:outline-none text-white px-4 py-2 rounded "
//                     // onClick={}
//                   >
//                     Show
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

    
//       </div>
//     </>
//   );
// };

// export default ConsoliFuelsales;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ConsoliFuelsales = () => {
  const [handloans, setHandloans] = useState([]);
  const [fuelSales, setFuelSales] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(""); // Updated to reflect product selection
  const [selectedDate, setSelectedDate] = useState(""); // State for selected date
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedDateType, setSelectedDateType] = useState("year"); // State for selected date type
  const [filteredFuelSales, setFilteredFuelSales] = useState([]); // State for filtered data

  const navigate = useNavigate();

  // Fetch fuel sales data from the API
  const fetchFuelSales = () => {
    axios
      .get("https://marvah-server.onrender.com/fuelsales")
      .then((res) => {
        console.log("Fuel Sales Data", res.data.fuelSales);
        setFuelSales(res.data.fuelSales);
      })
      .catch((error) => {
        console.error("Error fetching fuel sales report:", error.message);
      });
  };

  useEffect(() => {
    fetchFuelSales(); // Fetch fuel sales data on mount
  }, []);

  // Handle product selection change
  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value); // Set selected product
  };

  // Handle date selection change
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value); // Set selected date
  };

  // Handle end date change for the "between" date type
  const handleEndDateChange = (event) => {
    setSelectedEndDate(event.target.value);
  };

  // Handle date type selection change
  const handleDateTypeChange = (event) => {
    setSelectedDateType(event.target.value); // Set selected date type
  };

  // Filter data based on selected product and date range
  const handleFilterData = () => {
    let filteredData = fuelSales;

    // Filter by product
    if (selectedProduct) {
      filteredData = filteredData.filter(
        (sale) => sale.nozzleProduct.toLowerCase().includes(selectedProduct.toLowerCase())
      );
    }

    // Filter by date or date range
    if (selectedDateType === "between" && selectedDate && selectedEndDate) {
      filteredData = filteredData.filter((sale) => {
        const saleDate = new Date(sale.date);
        return saleDate >= new Date(selectedDate) && saleDate <= new Date(selectedEndDate);
      });
    } else if (selectedDate) {
      filteredData = filteredData.filter((sale) => {
        const saleDate = new Date(sale.date);
        const selectedDateObj = new Date(selectedDate);
        switch (selectedDateType) {
          case "year":
            return saleDate.getFullYear() === selectedDateObj.getFullYear();
          case "month":
            return (
              saleDate.getFullYear() === selectedDateObj.getFullYear() &&
              saleDate.getMonth() === selectedDateObj.getMonth()
            );
          case "day":
            return (
              saleDate.getFullYear() === selectedDateObj.getFullYear() &&
              saleDate.getMonth() === selectedDateObj.getMonth() &&
              saleDate.getDate() === selectedDateObj.getDate()
            );
          default:
            return true;
        }
      });
    }

    setFilteredFuelSales(filteredData);
  };

  return (
    <>
      <div className="relative mx-auto px-4 container w-full">
        <div className="relative flex justify-center items-center">
          <h1 className="font-bold text-center my-8 text-2xl">
            Consolidated Fuel Sales Report
          </h1>
          <button
            className="absolute right-10 top-8 bg-[#3B82F6] focus:outline-none text-white px-4 py-2 rounded"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>

        {/* Table for Product Selection */}
        <div>
          <table className="w-full border-collapse shadow-sm">
            <thead>
              <tr className="bg-[#008b8b] text-white">
                <th className="p-2 border-2 text-center">Select Product</th>
                <th className="p-2 border-2 text-center">Period Type</th>
                <th className="p-2 border-2 text-center">Select Date</th>
                <th className="p-2 border-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-4">
                  <select
                    value={selectedProduct}
                    onChange={handleProductChange}
                    className="w-full p-2 border-2 border-gray-400 rounded focus:outline-none"
                  >
                    <option value="">Select Product</option>
                    <option value="MS">MS-1</option>
                    <option value="Speed">MS-2</option>
                    <option value="HSD">HSD</option>
                  </select>
                </td>
                <td className="p-4">
                  <select
                    value={selectedDateType}
                    onChange={handleDateTypeChange} // Handle date type change
                    className="p-2 w-full border-2 border-gray-400 rounded focus:outline-none"
                  >
                    <option value="year">Year</option>
                    <option value="month">Month</option>
                    <option value="day">Day</option>
                    <option value="between">Between Dates</option>
                  </select>
                </td>

                {selectedDateType === "between" ? (
                  <td className="p-4 flex gap-8 justify-center items-center">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="p-2 border-2 border-gray-400 rounded focus:outline-none"
                    />
                    <input
                      type="date"
                      value={selectedEndDate}
                      onChange={handleEndDateChange}
                      className="p-2 border-2 border-gray-400 rounded focus:outline-none"
                    />
                  </td>
                ) : (
                  <td className="p-4 flex gap-8 justify-center items-center">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      className="p-2 w-full border-2 cursor-pointer border-gray-400 rounded focus:outline-none"
                    />
                  </td>
                )}

                <td className="p-4 text-center">
                  <button
                    className="bg-[#16A34A] focus:outline-none text-white px-4 py-2 rounded"
                    onClick={handleFilterData}
                  >
                    Show
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Display filtered report */}
        {filteredFuelSales.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold mb-4">Filtered Fuel Sales Report</h2>
            <table className="w-full border-collapse shadow-sm">
              <thead>
                <tr className="bg-[#008b8b] text-white">
                  <th className="p-2 border-2 text-center">Product</th>
                  <th className="p-2 border-2 text-center">Date</th>
                  <th className="p-2 border-2 text-center">Sale</th>
                  <th className="p-2 border-2 text-center">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredFuelSales.map((sale) => (
                  <tr key={sale._id} className="border-b">
                    <td className="p-2 text-center">{sale.nozzleProduct}</td>
                    <td className="p-2 text-center">{new Date(sale.date).toLocaleDateString()}</td>
                    <td className="p-2 text-center">{sale.sale}</td>
                    <td className="p-2 text-center">{sale.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ConsoliFuelsales;

