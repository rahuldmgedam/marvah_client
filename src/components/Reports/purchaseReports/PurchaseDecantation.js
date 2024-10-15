// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const PurchaseDecantation = () => {
//   const [product, setProduct] = useState("MS");
//   const [dateType, setDateType] = useState("Day");
//   const [selectedDate, setSelectedDate] = useState(Date.now());
//   const [petrolInvoice, setPetrolInvoice] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);

//   const handleFetchData = () => {
//     axios
//       .get("https://marvah-server.onrender.com/petroldecantation")
//       .then((res) => {
//         setPetrolInvoice(res.data);
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
//       const itemDate = new Date(item.date);
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

//       const isProductMatch = product === "ALL" || item.ProductName === product;

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

//   const navigate = useNavigate();

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl text-white bg-[#3A1078] p-3 uppercase font-bold text-center mb-3">
//         Reports
//       </h1>

//       <h1 className="text-2xl uppercase font-bold text-center mb-3">
//         Decantation report
//       </h1>

//       <div className="flex justify-between w-[100%] mb-4">
//             <div></div>
//             <div className="flex">
//               <button
//                 className="bg-blue-500 px-2 py-1 rounded-md"
//                 onClick={() => navigate(-1)}
//               >
//                 back
//               </button>
//             </div>
//           </div>

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
//       <div className=" p-4 ">
//         <div className="flex justify-between w-[70%]">
//           <div></div>
//           <div className="mr-20">
//           <div className="font-semibold border-collapse flex">
//               <div className="px-8 py-2 border-2 border-gray-300 text-center">
//                 15KL
//               </div>
//               <div className="px-8 py-2 border-2 border-gray-300 text-center">
//               10KL
//               </div>
//               <div className="px-8 py-2  border-2 border-gray-300 text-center">
//               9KL
//               </div>
              
//             </div>
//           <div className="font-semibold border-collapse text-white flex bg-gray-600">
//               <div className="px-8 py-2 border-2 border-gray-300 text-center">
//                 MS-1
//               </div>
//               <div className="px-7 py-2 border-2 border-gray-300 text-center">
//               MS-2
//               </div>
//               <div className="px-9 py-2  border-2 border-gray-300 text-center">
//               HSD
//               </div>
              
//             </div>
       
        
//           </div>
//         </div>

//         <table className="w-[70%]">
//   <thead className=" border-2 border-gray-300">
//     <tr className="bg-gray-600 uppercase border-2 border-gray-300 text-white text-center">
//       <th className="p-2 border-2 border-gray-300 text-center">SR NO.</th>
//       <th className="p-2 border-2 border-gray-300 text-center">DATE</th>
//       <th className="p-2 border">Invoice No.</th>
//       <th className="p-2 border">Tank1</th>
//       <th className="p-2 border">Tank2</th>
//       <th className="p-2 border">Tank3</th>
//       <th className="p-2 border bg-[#008b8b] text-white">Total</th>
//     </tr>
//   </thead>

//   <tbody>
//     {filteredData.length === 0 ? (
//       <tr>
//         <td className="border-2 border-gray-300 text-center p-2" colSpan="7">
//           No data available for the selected criteria.
//         </td>
//       </tr>
//     ) : (
//       filteredData.map((item, index) => (
//         <tr key={index} className="hovereffect font-semibold">
//           <td className="border-2 border-gray-300 text-center p-2 w-[8]">
//             {index + 1 || "--"}
//           </td>
//           <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//             {formatDate(item.date) || "--"}
//           </td>
//           <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//             {item.invoice || "--"}
//           </td>
//           <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//             {item.tank1 || "--"}
//           </td>
//           <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//             {item.tank2 || "--"}
//           </td>
//           <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//             {item.tank3 || "--"}
//           </td>
//           <td className="border-2 border-gray-300 text-center p-2 w-[20] bg-[#008b8b] text-whit">
//             {item.tanktotalkl || "--"}
//           </td>
//         </tr>
//       ))
//     )}

//     {/* Total Row */}
//     {filteredData.length > 0 && (
//       <>
//         <tr className="font-semibold bg-[#008b8b] text-white">
//           <td className="border-2 border-gray-300 text-center p-2" colSpan="3">
//             TOTAL
//           </td>
//           <td className="border-2 border-gray-300 text-center p-2">
//             {filteredData.reduce((sum, item) => sum + (+item.tank1 || 0), 0)}
//           </td>
//           <td className="border-2 border-gray-300 text-center p-2">
//             {filteredData.reduce((sum, item) => sum + (+item.tank2 || 0), 0)}
//           </td>
//           <td className="border-2 border-gray-300 text-center p-2">
//             {filteredData.reduce((sum, item) => sum + (+item.tank3 || 0), 0)}
//           </td>
//           <td className="bg-blue-500 text-center">
//           {filteredData.reduce(
//               (sum, item) =>
//                 sum +
//                 (+item.tank1 || 0) +
//                 (+item.tank2 || 0) +
//                 (+item.tank3 || 0),
//               0
//             )}
//           </td>
//         </tr>

//         {/* Grand Total Row */}
//         {/* <tr className="font-semibold bg-gray-200">
//           <td
//             className="border-2 border-gray-300 text-center p-2"
//             colSpan="3"
//           >
//             GRAND TOTAL
//           </td>
//           <td colSpan={3} className="border-2 border-gray-300 text-center p-2">
//             {filteredData.reduce(
//               (sum, item) =>
//                 sum +
//                 (+item.tank1 || 0) +
//                 (+item.tank2 || 0) +
//                 (+item.tank3 || 0),
//               0
//             )}
//           </td>
//         </tr> */}
//       </>
//     )}
//   </tbody>
// </table>

//         {/* <table className="w-[70%]">
//           <thead className=" border-2 border-gray-300">
//             <tr className="bg-gray-600 uppercase border-2 border-gray-300 text-white text-center">
//               <th className="p-2 border-2 border-gray-300 text-center">
//                 SR NO.
//               </th>
//               <th className="p-2 border-2 border-gray-300 text-center">DATE</th>
//               <th className="p-2 border">Invoice No.</th>
//               <th className="p-2 border">Tank1</th>
//               <th className="p-2 border">Tank2</th>
//               <th className="p-2 border">Tank3</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredData.length === 0 ? (
//               <tr>
//                 <td
//                   className="border-2 border-gray-300 text-center p-2"
//                   colSpan="7"
//                 >
//                   No data available for the selected criteria.
//                 </td>
//               </tr>
//             ) : (
//               filteredData.map((item, index) => (
//                 <tr key={index} className="hovereffect font-semibold">
//                   <td className="border-2 border-gray-300 text-center p-2 w-[8]">
//                     {index+1 || "--"}
//                   </td>
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {formatDate(item.date) || "--"}
//                   </td>
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {item.invoice || "--"}
//                   </td>
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {item.tank1 || "--"}
//                   </td>
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {item.tank2 || "--"}
//                   </td>
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {item.tank3 || "--"}
//                   </td>
//                 </tr>
//               ))
//             )}

//             {filteredData.length > 0 && (
//               <tr className="font-semibold">
//                 <td
//                   className="border-2 border-gray-300 text-center p-2"
//                   colSpan="3"
//                 >
//                   TOTAL
//                 </td>
//                 <td className="border-2 border-gray-300 text-center p-2">
//                   {filteredData
//                     .reduce((sum, item) => sum + (+item.tank1 || 0), 0)}
//                 </td>
//                 <td className="border-2 border-gray-300 text-center p-2">
//                   {filteredData
//                     .reduce((sum, item) => sum + (+item.tank2 || 0), 0)}
//                 </td>
//                 <td className="border-2 border-gray-300 text-center p-2">
//                   {filteredData
//                     .reduce((sum, item) => sum + (+item.tank3 || 0), 0)}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table> */}

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

// export default PurchaseDecantation;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PurchaseDecantation = () => {
  const [product, setProduct] = useState("ALL");
  const [dateType, setDateType] = useState("Day");
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [petrolInvoice, setPetrolInvoice] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [endDate, setEndDate] = useState('')

  const handleFetchData = () => {
    axios
      .get("https://marvah-server.onrender.com/petroldecantation")
      .then((res) => {
        setPetrolInvoice(res.data);
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
  
      const isProductMatch = product === "ALL" || item.ProductName === product;
  
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

  const navigate = useNavigate();


  return (
    <div className="p-6">

      <h1 className="text-2xl uppercase font-bold text-center my-3">
        Decantation report
      </h1>

      <div className="flex justify-between w-[100%] mb-4">
            <div></div>
            <div className="flex">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
                onClick={() => navigate("/Petrol_Decantation")}
              >
                back
              </button>
            </div>
          </div>

      <table className=" mb-4 w-[100%] shadow-sm">
      <thead className="border-2 bg-[#008b8b] text-white">
        <tr>
          <th className="border border-gray-500 p-2 text-left">Select Product</th>
          <th className="border border-gray-500 p-2 text-left" >Date Type</th>
          <th className="border border-gray-500 p-2 text-left">Select Date</th>
          <th className="border border-gray-500 p-2 text-left">Action</th>
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
                <td className="flex gap-6 justify-center p-2">
                <input 
                type="date"
                className="border rounded p-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                />
                <input 
                type="date"
                className="border rounded p-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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
      <div className=" p-4 ">
        <div className="flex justify-between w-[70%]">
          <div></div>
          <div className="mr-20">
          <div className="font-semibold border-collapse flex">
              <div className="px-8 py-2 border-2 border-gray-300 text-center">
                15KL
              </div>
              <div className="px-8 py-2 border-2 border-gray-300 text-center">
              10KL
              </div>
              <div className="px-8 py-2  border-2 border-gray-300 text-center">
              9KL
              </div>
              
            </div>
          <div className="font-semibold border-collapse text-white flex bg-gray-600">
              <div className="px-8 py-2 border-2 border-gray-300 text-center">
                MS-1
              </div>
              <div className="px-7 py-2 border-2 border-gray-300 text-center">
              MS-2
              </div>
              <div className="px-9 py-2  border-2 border-gray-300 text-center">
              HSD
              </div>
              
            </div>
       
        
          </div>
        </div>

        <table className="w-[70%]">
  <thead className=" border-2 border-gray-300">
    <tr className="bg-gray-600 uppercase border-2 border-gray-300 text-white text-center">
      <th className="p-2 border-2 border-gray-300 text-center">SR NO.</th>
      <th className="p-2 border-2 border-gray-300 text-center">DATE</th>
      <th className="p-2 border">Invoice No.</th>
      <th className="p-2 border">Tank1</th>
      <th className="p-2 border">Tank2</th>
      <th className="p-2 border">Tank3</th>
      <th className="p-2 border bg-[#008b8b] text-white">Total</th>
    </tr>
  </thead>

  <tbody>
    {filteredData.length === 0 ? (
      <tr>
        <td className="border-2 border-gray-300 text-center p-2" colSpan="7">
          No data available for the selected criteria.
        </td>
      </tr>
    ) : (
      filteredData.map((item, index) => (
        <tr key={index} className="hovereffect font-semibold">
          <td className="border-2 border-gray-300 text-center p-2 w-[8]">
            {index + 1 || "--"}
          </td>
          <td className="border-2 border-gray-300 text-center p-2 w-[20]">
            {formatDate(item.date) || "--"}
          </td>
          <td className="border-2 border-gray-300 text-center p-2 w-[20]">
            {item.invoice || "--"}
          </td>
          <td className="border-2 border-gray-300 text-center p-2 w-[20]">
            {item.tank1 || "--"}
          </td>
          <td className="border-2 border-gray-300 text-center p-2 w-[20]">
            {item.tank2 || "--"}
          </td>
          <td className="border-2 border-gray-300 text-center p-2 w-[20]">
            {item.tank3 || "--"}
          </td>
          <td className="border-2 border-gray-300 text-center p-2 w-[20] bg-[#008b8b] text-whit">
            {item.tanktotalkl || "--"}
          </td>
        </tr>
      ))
    )}

    {/* Total Row */}
    {filteredData.length > 0 && (
      <>
        <tr className="font-semibold bg-[#008b8b] text-white">
          <td className="border-2 border-gray-300 text-center p-2" colSpan="3">
            TOTAL
          </td>
          <td className="border-2 border-gray-300 text-center p-2">
            {filteredData.reduce((sum, item) => sum + (+item.tank1 || 0), 0)}
          </td>
          <td className="border-2 border-gray-300 text-center p-2">
            {filteredData.reduce((sum, item) => sum + (+item.tank2 || 0), 0)}
          </td>
          <td className="border-2 border-gray-300 text-center p-2">
            {filteredData.reduce((sum, item) => sum + (+item.tank3 || 0), 0)}
          </td>
          <td className="bg-blue-500 text-center">
          {filteredData.reduce(
              (sum, item) =>
                sum +
                (+item.tank1 || 0) +
                (+item.tank2 || 0) +
                (+item.tank3 || 0),
              0
            )}
          </td>
        </tr>

        {/* Grand Total Row */}
        {/* <tr className="font-semibold bg-gray-200">
          <td
            className="border-2 border-gray-300 text-center p-2"
            colSpan="3"
          >
            GRAND TOTAL
          </td>
          <td colSpan={3} className="border-2 border-gray-300 text-center p-2">
            {filteredData.reduce(
              (sum, item) =>
                sum +
                (+item.tank1 || 0) +
                (+item.tank2 || 0) +
                (+item.tank3 || 0),
              0
            )}
          </td>
        </tr> */}
      </>
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

export default PurchaseDecantation;