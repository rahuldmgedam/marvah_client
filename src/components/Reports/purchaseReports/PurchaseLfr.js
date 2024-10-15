// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const PurchaseLfr = () => {
//   const [product, setProduct] = useState("MS");
//   const [dateType, setDateType] = useState("Day");
//   const [selectedDate, setSelectedDate] = useState(Date.now());
//   const [petrolInvoice, setPetrolInvoice] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   const handleFetchData = () => {
//     axios
//       .get("https://marvah-server.onrender.com/petrolInvoiceFeeding")
//       .then((res) => {
//         setPetrolInvoice(res.data.petrolInvoice);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   useEffect(() => {
//     handleFetchData();
//   }, []);

//   const handleShowClick = () => {
//     const filtered = petrolInvoice.filter((item) => {
//       const itemDate = new Date(item?.date);
//       const selected = new Date(selectedDate);

//       let isDateMatch = false;

//       if (dateType === "Day") {
//         isDateMatch =
//           itemDate.getDate() === selected.getDate() &&
//           itemDate.getMonth() === selected.getMonth() &&
//           itemDate.getFullYear() === selected.getFullYear();
//       } else if (dateType === "Month") {
//         isDateMatch =
//           itemDate.getMonth() === selected.getMonth() &&
//           itemDate.getFullYear() === selected.getFullYear();
//       } else if (dateType === "Year") {
//         isDateMatch = itemDate.getFullYear() === selected.getFullYear();
//       }

//       const isProductMatch = product === "ALL" || item?.ProductName === product;

//       return isDateMatch && isProductMatch;
//     });

//     setFilteredData(filtered);
//   };

//   function formatDate(dateString) {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
//     const year = date.getFullYear();

//     return `${day}-${month}-${year}`;
//   }

//   // Function to group and sum totalLfrValue by invoiceNumber and date

//   function sumTotalLfrValueByInvoice(petrolInvoices) {
//     // Group the totalLfrValue by invoiceNumber
//     return petrolInvoices.reduce((acc, item) => {
//       const invoiceNumber = item.invoiceNumber;
  
//       // If the invoice number doesn't exist in the accumulator, initialize it
//       if (!acc[invoiceNumber]) {
//         acc[invoiceNumber] = 0;
//       }
  
//       // Add the totalLfrValue for this invoice to the accumulator
//       acc[invoiceNumber] += parseFloat(item.totalLfrValue || 0);
  
//       return acc;
//     }, {});
//   }
  
//   const groupedTotals = sumTotalLfrValueByInvoice(filteredData);


//   return (
//     <div className="p-6">
//       <h1 className="text-3xl text-white bg-[#3A1078] p-3 uppercase font-bold text-center mb-3">
//         Reports
//       </h1>

//       <h1 className="text-2xl uppercase font-bold text-center mb-3">
//         LFR FEEDING FOR TDS (194 I )
//       </h1>

//       <table className=" mb-4 w-[100%]">
//         <tbody>
//           <tr className="bg-[#008b8b] ">
//             {/* Select Product */}
//             <td className="p-2">
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="product"
//                   className=" font-bold mb-1 text-white p-2"
//                 >
//                   Select Product
//                 </label>
//                 <select
//                   id="product"
//                   value={product}
//                   onChange={(e) => setProduct(e.target.value)}
//                   className="border rounded p-2 w-28"
//                 >
//                   <option value="ALL">ALL</option>
//                   <option value="MS">MS</option>
//                   <option value="MS-2">MS-2</option>
//                   <option value="HSD">HSD</option>
//                 </select>
//               </div>
//             </td>

//             {/* Select Date Type */}
//             <td className="p-2">
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="dateType"
//                   className="text-white font-bold mb-1 p-2"
//                 >
//                   Date Type
//                 </label>
//                 <select
//                   id="dateType"
//                   value={dateType}
//                   onChange={(e) => setDateType(e.target.value)}
//                   className="border rounded p-2 w-40"
//                 >
//                   <option value="Day">Day</option>
//                   <option value="Month">Month</option>
//                   <option value="Year">Year</option>
//                   <option value="Between Dates">Between Dates</option>
//                 </select>
//               </div>
//             </td>

//             {/* Select Date */}
//             <td className="p-2">
//               <div className="flex flex-col">
//                 <label htmlFor="date" className="text-white font-bold p-2 ">
//                   Select Date
//                 </label>
//                 <input
//                   type="date"
//                   id="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   className="border rounded p-2 w-48"
//                 />
//               </div>
//             </td>

//             {/* Show Button */}
//             <td className="p-2">
//               <div className="flex flex-col justify-end">
//                 <button
//                   onClick={handleShowClick}
//                   className="bg-blue-800 text-white font-bold p-2 rounded hover:bg-blue-600 mt-9"
//                 >
//                   Show
//                 </button>
//               </div>
//             </td>
//           </tr>

//           {/* Optional Second Row for Additional Inputs */}
//           <tr className="">
//             {/* Placeholder for Additional Inputs or Info */}
//             <td className="p-2" colSpan="4">
//               {/* Additional content or empty space for flexibility */}
//             </td>
//           </tr>
//         </tbody>
//       </table>

//       {/* Report Table */}
//       <div className=" p-4 rounded shadow-md">
//         <table className="">
//           <thead>
//             <tr className="bg-gray-600 uppercase text-white">
//               <th className="p-2 border-2 border-gray-300 text-center">
//                 SR. <br />
//                 NO.
//               </th>

//               <th className="p-2 border-2 border-gray-300 text-center">DATE</th>

//               <th className="p-2 border">
//                 Invoice <br /> No.
//               </th>
//               <th className="p-2 border-2 border-gray-300 text-center">
//                 {" "}
//                 Product
//               </th>

//               <th className="p-2 border">
//                 Qty. <br /> (in KL)
//               </th>
//               <th className="p-2 border">
//                 LFR PER <br />
//                 KL RATE
//               </th>
//               <th className="p-2 border">
//                 LFR TAXABLE <br />
//                 AMOUNT
//               </th>

//               <th className="p-2 border-2 border-gray-300 text-center">
//                 CGST(9%)
//               </th>
//               <th className="p-2 border-2 border-gray-300 text-center">
//                 SGST(9%)
//               </th>
//               <th className="p-2 border">
//                 TOT. LFR <br /> AMOUNT
//               </th>
//               <th className="p-2 border-2 border-gray-300 text-center">
//                 TOTAL
//               </th>
//             </tr>
//           </thead>


// {/* 
//           <tbody>
//             {filteredData.length === 0 ? (
//               <tr>
//                 <td
//                   className="border-2 border-gray-300 text-center p-2"
//                   colSpan="10"
//                 >
//                   No data available for the selected criteria.
//                 </td>
//               </tr>
//             ) : (
//               filteredData.map((item, index, array) => {
//                 const isFirstRowOfInvoice =
//                   index === 0 ||
//                   item?.invoiceNumber !== array[index - 1].invoiceNumber;

//                 return (
//                   <tr key={index} className="">
//                     {isFirstRowOfInvoice && (
//                       <td
//                         rowSpan={
//                           array.filter(
//                             (rowItem) =>
//                               rowItem.invoiceNumber === item?.invoiceNumber
//                           ).length
//                         }
//                         className="border-2 border-gray-300 text-center p-2"
//                       >
//                         <div className="flex flex-col">
//                           <span>{item?.serialNumber}</span>

//                         </div>
//                       </td>
//                     )}

                  
//                     {isFirstRowOfInvoice && (
//                       <td
//                         rowSpan={
//                           array.filter(
//                             (rowItem) =>
//                               rowItem.invoiceNumber === item?.invoiceNumber
//                           ).length
//                         }
//                         className="border-2 border-gray-300 text-center p-2"
//                       >
//                         <div className="flex flex-col">
//                           <span>{formatDate(item?.date) || "--"}</span>
//                         </div>
//                       </td>
//                     )}

                
//             {isFirstRowOfInvoice && (
//                       <td
//                         rowSpan={
//                           array.filter(
//                             (rowItem) =>
//                               rowItem.invoiceNumber === item?.invoiceNumber
//                           ).length
//                         }
//                         className="border-2 border-gray-300 text-center p-2"
//                       >
//                         <div className="flex flex-col">
                        
//                           <span> {item?.invoiceNumber}</span>
//                         </div>
//                       </td>
//                     )}

                  
//                     <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                       {item?.ProductName || "--"}
//                     </td>

//                     <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                       {item?.klQty || "--"}
//                     </td>

//                     <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                       {item?.lfrPerKl || "--"}
//                     </td>

//                     <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                       {(item?.lfrTaxAmt).toFixed(2) || "--"}
//                     </td>

//                     <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                       {(item?.cgst).toFixed(2) ||
//                         "--"}
//                     </td>

//                     <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                       {(item?.sgst).toFixed(2) ||
//                         "--"}
//                     </td>

//                     <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                       {(
//                       item?.totalLfrValue
//                       ).toFixed(2) || "--"}
//                     </td>

//                     <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                  
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody> */}

// <tbody>
//     {filteredData.length === 0 ? (
//       <tr>
//         <td className="border-2 border-gray-300 text-center p-2" colSpan="10">
//           No data available for the selected criteria.
//         </td>
//       </tr>
//     ) : (
//       filteredData.map((item, index, array) => {
//         // Check if this is the first product for this invoice
//         const isFirstRowOfInvoice =
//           index === 0 ||
//           item?.invoiceNumber !== array[index - 1].invoiceNumber;

//         // Calculate the sum for the current invoiceNumber

//         return (
//           <tr key={index} className="">
//             {/* Merged SR NO, DATE, and INVOICE NO */}
//             {isFirstRowOfInvoice && (
//               <td
//                 rowSpan={
//                   array.filter(
//                     (rowItem) => rowItem.invoiceNumber === item?.invoiceNumber
//                   ).length
//                 }
//                 className="border-2 border-gray-300 text-center p-2"
//               >
//                 <div className="flex flex-col">
//                   <span>{item?.serialNumber}</span>
//                 </div>
//               </td>
//             )}

//             {/* date */}
//             {isFirstRowOfInvoice && (
//               <td
//                 rowSpan={
//                   array.filter(
//                     (rowItem) => rowItem.invoiceNumber === item?.invoiceNumber
//                   ).length
//                 }
//                 className="border-2 border-gray-300 text-center p-2"
//               >
//                 <div className="flex flex-col">
//                   <span>{formatDate(item?.date) || "--"}</span>
//                 </div>
//               </td>
//             )}

//             {/* invoiceNumber */}
//             {isFirstRowOfInvoice && (
//               <td
//                 rowSpan={
//                   array.filter(
//                     (rowItem) => rowItem.invoiceNumber === item?.invoiceNumber
//                   ).length
//                 }
//                 className="border-2 border-gray-300 text-center p-2"
//               >
//                 <div className="flex flex-col">
//                   <span> {item?.invoiceNumber}</span>
//                 </div>
//               </td>
//             )}

//             {/* Product Name */}
//             <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//               {item?.ProductName || "--"}
//             </td>

//             {/* KL/Qty */}
//             <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//               {item?.klQty || "--"}
//             </td>

//             {/* LFR Rate per KL */}
//             <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//               {item?.lfrPerKl || "--"}
//             </td>

//             {/* Taxable Amount */}
//             <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//               {item?.lfrTaxAmt.toFixed(2) || "--"}
//             </td>

//             {/* CGST */}
//             <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//               {(item?.cgst).toFixed(2) || "--"}
//             </td>

//             {/* SGST */}
//             <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//               {(item?.sgst).toFixed(2) || "--"}
//             </td>

//             {/* Total LFR Amount */}
//             <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//               {(item?.totalLfrValue).toFixed(2) || "--"}
//             </td>

//             {/* Total LFR Amount Sum (For each invoice) */}
//             {isFirstRowOfInvoice && (
//               <td
//                 rowSpan={
//                   array.filter(
//                     (rowItem) => rowItem.invoiceNumber === item?.invoiceNumber
//                   ).length
//                 }
//                 className="border-2 border-gray-300 text-center p-2 w-[20]"
//               >
//                 {/* {totalLfrSum} */}
//               </td>
//             )}
//           </tr>
//         );
//       })
//     )}
//   </tbody>
//         </table>
//       </div>

//       {/* Print Button */}
//       <div className="mt-4">
//         <button className="bg-purple-500 text-white font-bold p-2 rounded hover:bg-purple-600">
//           Print
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PurchaseLfr;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PurchaseLfr = () => {
  const [product, setProduct] = useState("MS");
  const [dateType, setDateType] = useState("Day");
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [petrolInvoice, setPetrolInvoice] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [endDate, setEndDate] = useState('')

  const handleFetchData = () => {
    axios
      .get("https://marvah-server.onrender.com/petrolInvoiceFeeding")
      .then((res) => {
        setPetrolInvoice(res.data.petrolInvoice);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleShowClick = () => {
    const filtered = petrolInvoice.filter((item) => {
      // const itemDate = new Date(item?.date);
      // const selected = new Date(selectedDate);

      const itemDate = new Date(item.date); // Keep itemDate as a Date object
      itemDate.setHours(0, 0, 0, 0); // Set hours to start of the day

      const selected = new Date(selectedDate); // Keep selectedDate as a Date object
      selected.setHours(0, 0, 0, 0); // Set hours to start of the day

      let isDateMatch = false;

      if (dateType === "Day") {
        isDateMatch =
          itemDate.getDate() === selected.getDate() &&
          itemDate.getMonth() === selected.getMonth() &&
          itemDate.getFullYear() === selected.getFullYear();
      } else if (dateType === "Month") {
        isDateMatch =
          itemDate.getMonth() === selected.getMonth() &&
          itemDate.getFullYear() === selected.getFullYear();
      } else if (dateType === "Year") {
        isDateMatch = itemDate.getFullYear() === selected.getFullYear();
      } else if (dateType === "Between") {
        const end = new Date(endDate); // Keep endDate as a Date object
        end.setHours(23, 59, 59, 999); // Set endDate to end of the day
        isDateMatch = isDateBetween(itemDate, selected, end);
      }

      const isProductMatch = product === "ALL" || item?.ProductName === product;

      return isDateMatch && isProductMatch;
    });

    setFilteredData(filtered);
  };

  function isDateBetween(date, startDate, endDate) {

    return date >= startDate && date <= endDate;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  // Function to group and sum totalLfrValue by invoiceNumber and date

  function sumTotalLfrValueByInvoice(petrolInvoices) {
    // Group the totalLfrValue by invoiceNumber
    return petrolInvoices.reduce((acc, item) => {
      const invoiceNumber = item.invoiceNumber;

      // If the invoice number doesn't exist in the accumulator, initialize it
      if (!acc[invoiceNumber]) {
        acc[invoiceNumber] = 0;
      }

      // Add the totalLfrValue for this invoice to the accumulator
      acc[invoiceNumber] += parseFloat(item.totalLfrValue || 0);

      return acc;
    }, {});
  }

  const navigate = useNavigate()

  const groupedTotals = sumTotalLfrValueByInvoice(filteredData);


  const totalInvAmtSumGrand = filteredData.reduce((sum, item) => sum + (item.totalLfrValue || 0), 0)

  return (
    <div className="p-6">


      <h1 className="text-2xl uppercase font-bold text-center mb-3">
        LFR FEEDING FOR TDS (194 I )
      </h1>
      <div className="w-full text-right my-4">
      <button
          className="bg-blue-500 px-2 py-1 rounded-md text-white mr-4"
          onClick={() => navigate('/purchasetdsmain')}
          >
            Purchase Invoice
          </button>
        <button
          className="bg-blue-500 px-2 py-1 rounded-md text-white mr-4"
          onClick={() => navigate('/purchasetds')}
        >
          Purchase TDS
        </button>
        <button
          className="bg-blue-500 px-2 py-1 rounded-md text-white"
          onClick={() => navigate('/Petrol_Invoice_Feeding')}
        >Back</button>
      </div>
      <table className=" mb-4 w-[100%]">
        <thead className="bg-[#008b8b] text-white">
          <tr>
            <th className="p-2 border border-gray-400">Select Product</th>
            <th className="p-2 border border-gray-400">Select Date Type</th>
            <th className="p-2 border border-gray-400">Select Date</th>
            <th className="p-2 border border-gray-400">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            {/* Select Product */}
            <td className="p-2">
              <div className="flex flex-col">
                <select
                  id="product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="border rounded p-2 w-full"
                >
                  <option value="ALL">ALL</option>
                  <option value="MS">MS</option>
                  <option value="MS-2">MS-2</option>
                  <option value="HSD">HSD</option>
                </select>
              </div>
            </td>

            {/* Select Date Type */}
            <td className="p-2">
              <div className="flex flex-col">
                <select
                  id="dateType"
                  value={dateType}
                  onChange={(e) => setDateType(e.target.value)}
                  className="border rounded p-2 w-full"
                >
                  <option value="Day">Day</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                  <option value="Between">Between Dates</option>
                </select>
              </div>
            </td>
            {dateType === 'Between' ? (
              <td className="flex p-2 items-center gap-6">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border rounded p-2 w-full"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </td>
            ) : (
              <td className="p-2">
                <div className="flex flex-col">
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border rounded p-2 w-full"
                  />
                </div>
              </td>
            )}

            {/* Show Button */}
            <td className="p-2">
              <div className="flex flex-col justify-end">
                <button
                  onClick={handleShowClick}
                  className="bg-blue-800 text-white font-bold p-2 rounded hover:bg-blue-600"
                >
                  Show
                </button>
              </div>
            </td>
          </tr>

          {/* Optional Second Row for Additional Inputs */}
          <tr className="">
            {/* Placeholder for Additional Inputs or Info */}
            <td className="p-2" colSpan="4">
              {/* Additional content or empty space for flexibility */}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Report Table */}
      <div className=" p-4 rounded shadow-md">
        <table className="">
          <thead>
            <tr className="bg-gray-600 uppercase text-white">
              <th className="p-2 border-2 border-gray-300 text-center">
                SR. <br />
                NO.
              </th>

              <th className="p-2 border-2 border-gray-300 text-center">DATE</th>

              <th className="p-2 border">
                Invoice <br /> No.
              </th>
              <th className="p-2 border-2 border-gray-300 text-center">
                {" "}
                Product
              </th>

              <th className="p-2 border">
                Qty. <br /> (in KL)
              </th>
              <th className="p-2 border">
                LFR PER <br />
                KL RATE
              </th>
              <th className="p-2 border">
                LFR TAXABLE <br />
                AMOUNT
              </th>

              <th className="p-2 border-2 border-gray-300 text-center">
                CGST(9%)
              </th>
              <th className="p-2 border-2 border-gray-300 text-center">
                SGST(9%)
              </th>
              <th className="p-2 border">
                TOT. LFR <br /> AMOUNT
              </th>
              <th className="p-2 border-2 border-gray-300 text-center">
                TOTAL
              </th>
            </tr>
          </thead>


          {/* 
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  className="border-2 border-gray-300 text-center p-2"
                  colSpan="10"
                >
                  No data available for the selected criteria.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index, array) => {
                const isFirstRowOfInvoice =
                  index === 0 ||
                  item?.invoiceNumber !== array[index - 1].invoiceNumber;

                return (
                  <tr key={index} className="">
                    {isFirstRowOfInvoice && (
                      <td
                        rowSpan={
                          array.filter(
                            (rowItem) =>
                              rowItem.invoiceNumber === item?.invoiceNumber
                          ).length
                        }
                        className="border-2 border-gray-300 text-center p-2"
                      >
                        <div className="flex flex-col">
                          <span>{item?.serialNumber}</span>

                        </div>
                      </td>
                    )}

                  
                    {isFirstRowOfInvoice && (
                      <td
                        rowSpan={
                          array.filter(
                            (rowItem) =>
                              rowItem.invoiceNumber === item?.invoiceNumber
                          ).length
                        }
                        className="border-2 border-gray-300 text-center p-2"
                      >
                        <div className="flex flex-col">
                          <span>{formatDate(item?.date) || "--"}</span>
                        </div>
                      </td>
                    )}

                
            {isFirstRowOfInvoice && (
                      <td
                        rowSpan={
                          array.filter(
                            (rowItem) =>
                              rowItem.invoiceNumber === item?.invoiceNumber
                          ).length
                        }
                        className="border-2 border-gray-300 text-center p-2"
                      >
                        <div className="flex flex-col">
                        
                          <span> {item?.invoiceNumber}</span>
                        </div>
                      </td>
                    )}

                  
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item?.ProductName || "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item?.klQty || "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item?.lfrPerKl || "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {(item?.lfrTaxAmt).toFixed(2) || "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {(item?.cgst).toFixed(2) ||
                        "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {(item?.sgst).toFixed(2) ||
                        "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {(
                      item?.totalLfrValue
                      ).toFixed(2) || "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                  
                    </td>
                  </tr>
                );
              })
            )}
          </tbody> */}

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td className="border-2 border-gray-300 text-center p-2" colSpan="10">
                  No data available for the selected criteria.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index, array) => {
                // Check if this is the first product for this invoice
                const isFirstRowOfInvoice =
                  index === 0 ||
                  item?.invoiceNumber !== array[index - 1].invoiceNumber;

                // Calculate the sum for the current invoiceNumber

                return (
                  <tr key={index} className="">
                    {/* Merged SR NO, DATE, and INVOICE NO */}
                    {isFirstRowOfInvoice && (
                      <td
                        rowSpan={
                          array.filter(
                            (rowItem) => rowItem.invoiceNumber === item?.invoiceNumber
                          ).length
                        }
                        className="border-2 border-gray-300 text-center p-2"
                      >
                        <div className="flex flex-col">
                          <span>{item?.serialNumber}</span>
                        </div>
                      </td>
                    )}

                    {/* date */}
                    {isFirstRowOfInvoice && (
                      <td
                        rowSpan={
                          array.filter(
                            (rowItem) => rowItem.invoiceNumber === item?.invoiceNumber
                          ).length
                        }
                        className="border-2 border-gray-300 text-center p-2"
                      >
                        <div className="flex flex-col">
                          <span>{formatDate(item?.date) || "--"}</span>
                        </div>
                      </td>
                    )}

                    {/* invoiceNumber */}
                    {isFirstRowOfInvoice && (
                      <td
                        rowSpan={
                          array.filter(
                            (rowItem) => rowItem.invoiceNumber === item?.invoiceNumber
                          ).length
                        }
                        className="border-2 border-gray-300 text-center p-2"
                      >
                        <div className="flex flex-col">
                          <span> {item?.invoiceNumber}</span>
                        </div>
                      </td>
                    )}

                    {/* Product Name */}
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item?.ProductName || "--"}
                    </td>

                    {/* KL/Qty */}
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item?.klQty || "--"}
                    </td>

                    {/* LFR Rate per KL */}
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item?.lfrPerKl || "--"}
                    </td>

                    {/* Taxable Amount */}
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item?.lfrTaxAmt.toFixed(2) || "--"}
                    </td>

                    {/* CGST */}
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {(item?.totCgst).toFixed(2) || "--"}
                    </td>

                    {/* SGST */}
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {(item?.totSgst).toFixed(2) || "--"}
                    </td>

                    {/* Total LFR Amount */}
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {(item?.totalLfrValue).toFixed(2) || "--"}
                    </td>

                    {/* Total LFR Amount Sum (For each invoice) */}
                    {isFirstRowOfInvoice && (
                      <td
                        rowSpan={
                          array.filter(
                            (rowItem) => rowItem.invoiceNumber === item?.invoiceNumber
                          ).length
                        }
                        className="border-2 border-gray-300 text-center p-2 w-[20]"
                      >
                        {(totalInvAmtSumGrand).toFixed(2)}
                        {/* {totalLfrSum} */}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Print Button */}
      <div className="mt-4">
        <button className="bg-purple-500 text-white font-bold p-2 rounded hover:bg-purple-600">
          Print
        </button>
      </div>
    </div>
  );
};

export default PurchaseLfr;