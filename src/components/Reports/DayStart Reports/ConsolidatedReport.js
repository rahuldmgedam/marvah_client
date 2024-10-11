// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const ConsolidatedReport = () => {
//   const [product, setProduct] = useState("ALL");
//   const [dateType, setDateType] = useState("Day");
//   const [selectedDate, setSelectedDate] = useState(Date.now());
//   const [filteredData, setFilteredData] = useState([]);

//   const [msData, setMsData] = useState([]);
//   const [speedData, setSpeedData] = useState([]);
//   const [hsdData, setHsdData] = useState([]);

//   const handleFetchData = () => {
//     axios
//       .get("https://marvah-server.onrender.com/ms")
//       .then((res) => {
//         setMsData(res.data);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });

//     axios
//       .get("https://marvah-server.onrender.com/speed")
//       .then((res) => {
//         setSpeedData(res.data);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });

//     axios
//       .get("https://marvah-server.onrender.com/hsd")
//       .then((res) => {
//         setHsdData(res.data);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   useEffect(() => {
//     handleFetchData();
//   }, []);

//   const handleShowClick = () => {
//     let dataToFilter = [];

//     if (product === "MS") {
//       dataToFilter = msData;
//     } else if (product === "Speed") {
//       dataToFilter = speedData;
//     } else if (product === "HSD") {
//       dataToFilter = hsdData;
//     } else {
//       // If "ALL" is selected, combine all data
//       dataToFilter = [...msData, ...speedData, ...hsdData];
//     }

//     const filtered = dataToFilter.filter((item) => {
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

//       return isDateMatch;
//     });

//     setFilteredData(filtered);
//   };

//   function formatDate(dateString) {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();

//     return `${day}-${month}-${year}`;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl text-white bg-[#3A1078] p-3 uppercase font-bold text-center mb-3">
//         Reports
//       </h1>

//       <h1 className="text-2xl uppercase font-bold text-center mb-3">
//         consolidated Report
//       </h1>

//       <table className="mb-4 w-[100%]">
//         <tbody>
//           <tr className="bg-[#008b8b]">
//             {/* Select Product */}
//             <td className="p-2">
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="product"
//                   className="font-bold mb-1 text-white p-2"
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
//                   <option value="Speed">Speed</option>
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
//                 <label htmlFor="date" className="text-white font-bold p-2">
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
//         </tbody>
//       </table>

//       {/* Report Table */}
//       {/* <table className="w-[30%] ml-[40%] p-4">
//         <tr className="bg-gray-600 p-4 text-center font-bold uppercase">
//           {" "}
//           Rates{" "}
//         </tr>
//       </table> */}
//       <div className="px-4 rounded shadow-md">
//         <table className="w-[50%] ml-[20%]">
//           <tr></tr>
//           <thead>
//             <tr className="bg-gray-600 uppercase text-white text-center">
//               <th className="p-2 border-2 border-gray-300 text-center">Date</th>
//               <th className="p-2 border">{product}</th>
//               {/* <th className="p-2 border">Speed</th>
//               <th className="p-2 border">HSD</th> */}
//             </tr>
//           </thead>

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
//               filteredData.map((item, index) => (
//                 <tr key={index} className="hovereffect">
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {formatDate(item?.date) || "--"}
//                   </td>
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {item?.reading || "--"}
//                   </td>
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {/* {item?.reading || "--"} */}
//                   </td>
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {/* {item?.reading || "--"} */}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
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

// export default ConsolidatedReport;


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ConsolidatedReport =() => {
//   const [product, setProduct] = useState("ALL");
//   const [dateType, setDateType] = useState("Day");
//   const [selectedDate, setSelectedDate] = useState(Date.now());
//   const [filteredData, setFilteredData] = useState([]);

//   const [msData, setMsData] = useState([]);
//   const [speedData, setSpeedData] = useState([]);
//   const [hsdData, setHsdData] = useState([]);

//   // Fetch data based on the selected product
//   const handleFetchData = () => {
//     if (product === "ALL" || product === "MS") {
//       axios
//         .get("https://marvah-server.onrender.com/ms")
//         .then((res) => {
//           setMsData(res.data);
//         })
//         .catch((error) => {
//           console.log(error.message);
//         });
//     }

//     if (product === "ALL" || product === "Speed") {
//       axios
//         .get("https://marvah-server.onrender.com/speed")
//         .then((res) => {
//           setSpeedData(res.data);
//         })
//         .catch((error) => {
//           console.log(error.message);
//         });
//     }

//     if (product === "ALL" || product === "HSD") {
//       axios
//         .get("https://marvah-server.onrender.com/hsd")
//         .then((res) => {
//           setHsdData(res.data);
//         })
//         .catch((error) => {
//           console.log(error.message);
//         });
//     }
//   };

//   // Fetch data on component load or when product changes
//   useEffect(() => {
//     handleFetchData();
//   }, [product]); // Fetch new data when the product changes

//   const handleShowClick = () => {
//     let dataToFilter = [];

//     // Filter data based on the selected product
//     if (product === "MS") {
//       dataToFilter = msData;
//     } else if (product === "Speed") {
//       dataToFilter = speedData;
//     } else if (product === "HSD") {
//       dataToFilter = hsdData;
//     } else {
//       dataToFilter = mergeAllData(msData, speedData, hsdData);
//     }

//     // Filter by date and date type
//     const filtered = dataToFilter.filter((item) => {
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

//       return isDateMatch;
//     });

//     setFilteredData(filtered);
//   };

//   // Merges MS, Speed, and HSD data by date
//   const mergeAllData = (msData, speedData, hsdData) => {
//     const mergedData = [];

//     const dateMap = {};

//     msData.forEach((item) => {
//       dateMap[item.date] = { date: item.date, ms: item.reading, speed: "", hsd: "" };
//     });

//     speedData.forEach((item) => {
//       if (!dateMap[item.date]) {
//         dateMap[item.date] = { date: item.date, ms: "", speed: item.reading, hsd: "" };
//       } else {
//         dateMap[item.date].speed = item.reading;
//       }
//     });

//     hsdData.forEach((item) => {
//       if (!dateMap[item.date]) {
//         dateMap[item.date] = { date: item.date, ms: "", speed: "", hsd: item.reading };
//       } else {
//         dateMap[item.date].hsd = item.reading;
//       }
//     });

//     for (const date in dateMap) {
//       mergedData.push(dateMap[date]);
//     }

//     return mergedData;
//   };

//   // Format date to DD-MM-YYYY
//   function formatDate(dateString) {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0");
//     const year = date.getFullYear();

//     return `${day}-${month}-${year}`;
//   }

//   // Function to get previous day's data
//   const getPreviousDayData = (currentData, index) => {
//     if (index === 0) return null; // No previous data for the first record
//     return currentData[index - 1];
//   };

//   const navigate = useNavigate();

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl text-white bg-[#3A1078] p-3 uppercase font-bold text-center mb-3">
//         Reports
//       </h1>

//       <h1 className="text-2xl uppercase font-bold text-center mb-3">
//         Consolidated  Report
//       </h1>

//       <div className="flex justify-between w-[100%] mb-4">
//         <div></div>
//         <div className="flex">
//           <button
//             className="bg-blue-500 px-2 py-1 rounded-md"
//             onClick={() => navigate(-1)}
//           >
//             Back
//           </button>
//         </div>
//       </div>

//       {/* Filters */}
//       <table className="mb-4 w-[100%]">
//         <tbody>
//           <tr className="bg-[#008b8b]">
//             <td className="p-2">
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="product"
//                   className="font-bold mb-1 text-white p-2"
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
//                   <option value="Speed">Speed</option>
//                   <option value="HSD">HSD</option>
//                 </select>
//               </div>
//             </td>

//             <td className="p-2">
//               <div className="flex flex-col">
//                 <label htmlFor="dateType" className="text-white font-bold mb-1 p-2">
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
//                 </select>
//               </div>
//             </td>

//             <td className="p-2">
//               <div className="flex flex-col">
//                 <label htmlFor="date" className="text-white font-bold p-2">
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
//         </tbody>
//       </table>

//       {/* Data Table */}
//       <div className="p-4 rounded shadow-md">
//         <table className="w-[50%] ml-[20%]">
//           <thead>
//             <tr className="bg-gray-600 uppercase text-white text-center">
//               <th className="p-2 border-2 border-gray-300 text-center">Date</th>
//               <th className="p-2 border">MS</th>
//               <th className="p-2 border">Speed</th>
//               <th className="p-2 border">HSD</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredData.length === 0 ? (
//               <tr>
//                 <td
//                   className="border-2 border-gray-300 text-center p-2"
//                   colSpan="4"
//                 >
//                   No data available for the selected criteria.
//                 </td>
//               </tr>
//             ) : (
//               filteredData.map((item, index) => {
//                 const prevData = getPreviousDayData(filteredData, index);
//                 const msChanged = prevData && prevData.ms !== item.ms;
//                 const speedChanged = prevData && prevData.speed !== item.speed;
//                 const hsdChanged = prevData && prevData.hsd !== item.hsd;

//                 return (
//                   <tr key={index}>
//                     <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                       {formatDate(item?.date) || "--"}
//                     </td>
//                     <td
//                       className={`border-2 border-gray-300 text-center p-2 w-[20] ${
//                         msChanged ? "bg-pink-200" : ""
//                       }`}
//                     >
//                       {item?.ms || "--"}
//                     </td>
//                     <td
//                       className={`border-2 border-gray-300 text-center p-2 w-[20] ${
//                         speedChanged ? "bg-pink-200" : ""
//                       }`}
//                     >
//                       {item?.speed || "--"}
//                     </td>
//                     <td
//                       className={`border-2 border-gray-300 text-center p-2 w-[20] ${
//                         hsdChanged ? "bg-pink-200" : ""
//                       }`}
//                     >
//                       {item?.hsd || "--"}
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="mt-4">
//         <button className="bg-purple-500 text-white font-bold p-2 rounded hover:bg-purple-600">
//           Print
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ConsolidatedReport;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ConsolidatedReport = () => {
  const [product, setProduct] = useState("ALL");
  const [dateType, setDateType] = useState("Day");
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [filteredData, setFilteredData] = useState([]);

  const [msData, setMsData] = useState([]);
  const [speedData, setSpeedData] = useState([]);
  const [hsdData, setHsdData] = useState([]);

  // Fetch data based on the selected product
  const handleFetchData = () => {
    if (product === "ALL" || product === "MS") {
      axios
        .get("https://marvah-server.onrender.com/ms")
        .then((res) => {
          setMsData(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    if (product === "ALL" || product === "Speed") {
      axios
        .get("https://marvah-server.onrender.com/speed")
        .then((res) => {
          setSpeedData(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    if (product === "ALL" || product === "HSD") {
      axios
        .get("https://marvah-server.onrender.com/hsd")
        .then((res) => {
          setHsdData(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  // Fetch data on component load or when product changes
  useEffect(() => {
    handleFetchData();
  }, [product]); // Fetch new data when the product changes

  const handleShowClick = () => {
    let dataToFilter = [];

    // Filter data based on the selected product
    if (product === "MS") {
      dataToFilter = msData;
    } else if (product === "Speed") {
      dataToFilter = speedData;
    } else if (product === "HSD") {
      dataToFilter = hsdData;
    } else {
      dataToFilter = mergeAllData(msData, speedData, hsdData);
    }

    // Filter by date and date type
    const filtered = dataToFilter.filter((item) => {
      const itemDate = new Date(item?.date);
      const selected = new Date(selectedDate);

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
      }

      return isDateMatch;
    });

    setFilteredData(filtered);
  };

  // Merges MS, Speed, and HSD data by date
  const mergeAllData = (msData, speedData, hsdData) => {
    const mergedData = [];

    const dateMap = {};

    msData.forEach((item) => {
      dateMap[item.date] = { date: item.date, ms: item.reading, speed: "", hsd: "" };
    });

    speedData.forEach((item) => {
      if (!dateMap[item.date]) {
        dateMap[item.date] = { date: item.date, ms: "", speed: item.reading, hsd: "" };
      } else {
        dateMap[item.date].speed = item.reading;
      }
    });

    hsdData.forEach((item) => {
      if (!dateMap[item.date]) {
        dateMap[item.date] = { date: item.date, ms: "", speed: "", hsd: item.reading };
      } else {
        dateMap[item.date].hsd = item.reading;
      }
    });

    for (const date in dateMap) {
      mergedData.push(dateMap[date]);
    }

    return mergedData;
  };

  // Format date to DD-MM-YYYY
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-3xl text-white bg-[#3A1078] p-3 uppercase font-bold text-center mb-3">
        Reports
      </h1>

      <h1 className="text-2xl uppercase font-bold text-center mb-3">
        Consolidated Report
      </h1>

      <div className="flex justify-between w-[100%] mb-4">
        <div></div>
        <div className="flex">
          <button
            className="bg-blue-500 px-2 py-1 rounded-md"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>

      {/* Filters */}
      <table className="mb-4 w-[100%]">
        <tbody>
          <tr className="bg-[#008b8b]">
            <td className="p-2">
              <div className="flex flex-col">
                <label
                  htmlFor="product"
                  className="font-bold mb-1 text-white p-2"
                >
                  Select Product
                </label>
                <select
                  id="product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="border rounded p-2 w-28"
                >
                  <option value="ALL">ALL</option>
                  <option value="MS">MS</option>
                  <option value="Speed">Speed</option>
                  <option value="HSD">HSD</option>
                </select>
              </div>
            </td>

            <td className="p-2">
              <div className="flex flex-col">
                <label htmlFor="dateType" className="text-white font-bold mb-1 p-2">
                  Date Type
                </label>
                <select
                  id="dateType"
                  value={dateType}
                  onChange={(e) => setDateType(e.target.value)}
                  className="border rounded p-2 w-40"
                >
                  <option value="Day">Day</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                </select>
              </div>
            </td>

            <td className="p-2">
              <div className="flex flex-col">
                <label htmlFor="date" className="text-white font-bold p-2">
                  Select Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border rounded p-2 w-48"
                />
              </div>
            </td>

            <td className="p-2">
              <div className="flex flex-col justify-end">
                <button
                  onClick={handleShowClick}
                  className="bg-blue-800 text-white font-bold p-2 rounded hover:bg-blue-600 mt-9"
                >
                  Show
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Data Table */}
      <div className="p-4 rounded shadow-md">
        <table className="w-[50%] ml-[20%]">
          <thead>
            <tr className="bg-gray-600 uppercase text-white text-center">
              <th className="p-2 border-2 border-gray-300 text-center">Date</th>
              <th className="p-2 border">MS</th>
              <th className="p-2 border">Speed</th>
              <th className="p-2 border">HSD</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  className="border-2 border-gray-300 text-center p-2"
                  colSpan="4"
                >
                  No data available for the selected criteria.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                    {formatDate(item?.date) || "--"}
                  </td>
                  <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                    {item?.ms || "--"}
                  </td>
                  <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                    {item?.speed || "--"}
                  </td>
                  <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                    {item?.hsd || "--"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button className="bg-purple-500 text-white font-bold p-2 rounded hover:bg-purple-600">
          Print
        </button>
      </div>
    </div>
  );
};

export default ConsolidatedReport;
