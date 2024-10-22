

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
//       {/* <h1 className="text-3xl text-white bg-[#3A1078] p-3 uppercase font-bold text-center mb-3">
//         Reports
//       </h1> */}

//       <h1 className="text-2xl uppercase font-bold text-center mb-3">
//         Consolidated  Report
//       </h1>

//       <div className="flex justify-between w-[100%] mb-4">
//         <div></div>
//         <div className="flex">
//         <button
//             className="bg-blue-500 text-white px-2 mr-4 py-1 rounded-md"
//             onClick={() => navigate("/dayStartReport")}
//           >
//             DayStart Report
//           </button>
//             <button
//             className="bg-blue-500 text-white px-2 mr-12 py-1 rounded-md"
//             onClick={() => navigate("/Day_Start")}
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
  const [selectedEndDate, setSelectedEndDate] = useState('')
  const [msData, setMsData] = useState([]);
  const [speedData, setSpeedData] = useState([]);
  const [hsdData, setHsdData] = useState([]);
  const [mergedData, setMergedData] = useState([])
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
    if (product === "ALL") {
      setMergedData(mergeAllData(msData, speedData, hsdData));
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
      const startDate = new Date(selectedDate).setHours(0, 0, 0, 0)
      const endDate = new Date(selectedEndDate).setHours(23, 59, 59, 999)

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
      } else if (dateType === "between") {
        isDateMatch = isDateBetween(itemDate, startDate, endDate)
      }

      return isDateMatch;
    });

    setFilteredData(filtered);
  };

  const isDateBetween = (date, startDate, endDate) => {
    return date >= startDate && date <= endDate;
  }

  const mergeAllData = (msData, speedData, hsdData) => {
    const mergedData = [];
    const dateMap = {};

    // Populate msData
    msData.forEach((item) => {
      dateMap[item.date] = { date: item.date, ms: item.reading, speed: "", hsd: "" };
    });

    // Populate speedData
    speedData.forEach((item) => {
      if (!dateMap[item.date]) {
        dateMap[item.date] = { date: item.date, ms: "", speed: item.reading, hsd: "" };
      } else {
        dateMap[item.date].speed = item.reading;
      }
    });

    // Populate hsdData
    hsdData.forEach((item) => {
      if (!dateMap[item.date]) {
        dateMap[item.date] = { date: item.date, ms: "", speed: "", hsd: item.reading };
      } else {
        dateMap[item.date].hsd = item.reading;
      }
    });

    // Combine all entries into an array
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

  // Function to get previous day's data
  const getPreviousDayData = (currentData, index) => {
    if (index === 0) return null; // No previous data for the first record
    return currentData[index - 1];
  };

  const navigate = useNavigate();

  return (
    <div className="">
      <h1 className="text-3xl mt-8 uppercase font-bold text-center mb-3">
        Consolidated Report
      </h1>

      <div className="flex justify-between w-[100%] mb-2">
        <div></div>
        <div className="flex">
        <button
            className="bg-blue-500 text-white px-2 mr-4 py-1 rounded-md"
            onClick={() => navigate("/dayStartReport")}
          >
            Day Start Report
          </button>
          <button
            className="bg-blue-500 text-white px-2 mr-20 py-1 rounded-md"
            onClick={() => navigate("/Day_start")}
          >
            Back
          </button>
        </div>
      </div>

      {/* Filters */}
      <table className="mb-4 w-[90%] ml-10 px-16 border border-gray-400">
        <thead className="bg-[#008b8b]">
          <tr className="text-white">
            <th className="border border-gray-400 p-2">Select Product</th>
            <th className="border border-gray-400 p-2">Date Type</th>
            <th className="border border-gray-400 p-2">Select Date</th>
            <th className="border border-gray-400 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
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
                  <option value="Speed">Speed</option>
                  <option value="HSD">HSD</option>
                </select>
              </div>
            </td>

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
                  <option value="between">Between</option>
                </select>
              </div>
            </td>

            {dateType === 'between' ? (
              <td className="p-2 flex items-center gap-4">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border-2 rounded p-2 w-[50%]"
                />
                <input
                  type="date"
                  value={selectedEndDate}
                  onChange={(e) => setSelectedEndDate(e.target.value)}
                  className="border-2 rounded p-2 w-[50%]"
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
                    className="border-2 rounded p-2 w-full"
                  />
                </div>
              </td>
            )}

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
        </tbody>
      </table>

      {/* Data Table */}
      <div className="p-4 rounded shadow-md">
        <table className="w-[50%] ml-[20%]">
          <thead>
            <tr className="bg-gray-600 uppercase text-white text-center">
              <th className="p-2 border-2 border-gray-300 text-center">Date</th>
              {(product === 'ALL' || product === 'MS') && (
                <th className="p-2 border">MS</th>
              )}
              {(product === 'ALL' || product === 'Speed') && (
                <th className="p-2 border">Speed</th>
              )}
              {(product === 'ALL' || product === 'HSD') && (
                <th className="p-2 border">HSD</th>
              )}
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
              filteredData.map((item, index) => {
                const prevData = getPreviousDayData(filteredData, index);
                console.log(filteredData);

                // Check if the current item's values are different from the previous item's
                const msChanged = prevData && prevData.ms !== item.ms;
                const speedChanged = prevData && prevData.speed !== item.speed;
                const hsdChanged = prevData && prevData.hsd !== item.hsd;

                // Only render the row if any of the readings have changed
                const shouldRenderRow = msChanged || speedChanged || hsdChanged;

                return (
                  shouldRenderRow && (  // Check if we should render this row
                    <tr key={index}>
                      {/* Date Column - Show only when there is a change */}
                      <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                        {formatDate(item?.date) || "--"}
                      </td>

                      {/* MS Column - Only shown when 'MS' or 'ALL' is selected */}
                      {(product === 'MS' || product === 'ALL') && (
                        <td
                          className={`border-2 border-gray-300 text-center p-2 w-[20]`}
                        >
                          {item.ms || "--"}
                        </td>
                      )}

                      {/* Speed Column - Only shown when 'Speed' or 'ALL' is selected */}
                      {(product === 'Speed' || product === 'ALL') && (
                        <td
                          className={`border-2 border-gray-300 text-center p-2 w-[20]`}
                        >
                          {item.speed || "--"}
                        </td>
                      )}

                      {/* HSD Column - Only shown when 'HSD' or 'ALL' is selected */}
                      {(product === 'HSD' || product === 'ALL') && (
                        <td
                          className={`border-2 border-gray-300 text-center p-2 w-[20]`}
                        >
                          {item.hsd || "--"}
                        </td>
                      )}
                    </tr>
                  )
                );
              })
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