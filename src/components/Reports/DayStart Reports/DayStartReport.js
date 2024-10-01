

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const DayStartReport = () => {
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

//   // Function to detect rate change between consecutive dates
//   function isRateChanged(index) {
//     if (index === 0) return false; // no previous day to compare for the first entry
//     const current = filteredData[index]?.reading;
//     const previous = filteredData[index - 1]?.reading;
//     return current !== previous;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl text-white bg-[#3A1078] p-3 uppercase font-bold text-center mb-3">
//         Reports
//       </h1>

//       <h1 className="text-2xl uppercase font-bold text-center mb-3">
//         Day Start Report
//       </h1>

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
//                   <option value="Between Dates">Between Dates</option>
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

//       <div className="p-4 rounded shadow-md">
//         <table className="w-[50%] ml-[20%]">
//           <thead>
//             <tr className="bg-gray-600 uppercase text-white text-center">
//               <th className="p-2 border-2 border-gray-300 text-center">Date</th>
//               <th className="p-2 border">{product}</th>
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
//               filteredData.map((item, index) => (
//                 <tr
//                   key={index}
//                   className={
//                     isRateChanged(index)
//                       ? "bg-red-200"
//                       : ""
//                   }
//                 >
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {formatDate(item?.date) || "--"}
//                   </td>
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {item?.reading || "--"}
//                   </td>
//                 </tr>
//               ))
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

// export default DayStartReport;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const DayStartReport = () => {
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
//       dataToFilter = mergeAllData(msData, speedData, hsdData);
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
//         Day Start Report
//       </h1>

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
//               filteredData.map((item, index) => (
//                 <tr key={index}>
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {formatDate(item?.date) || "--"}
//                   </td>
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {item?.ms || "--"}
//                   </td>
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {item?.speed || "--"}
//                   </td>
//                   <td className="border-2 border-gray-300 text-center p-2 w-[20]">
//                     {item?.hsd || "--"}
//                   </td>
//                 </tr>
//               ))
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

// export default DayStartReport;

import axios from "axios";
import React, { useEffect, useState } from "react";

const DayStartReport = () => {
  const [product, setProduct] = useState("ALL");
  const [dateType, setDateType] = useState("Day");
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [filteredData, setFilteredData] = useState([]);

  const [msData, setMsData] = useState([]);
  const [speedData, setSpeedData] = useState([]);
  const [hsdData, setHsdData] = useState([]);

  const handleFetchData = () => {
    axios
      .get("https://marvah-server.onrender.com/ms")
      .then((res) => {
        setMsData(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    axios
      .get("https://marvah-server.onrender.com/speed")
      .then((res) => {
        setSpeedData(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });

    axios
      .get("https://marvah-server.onrender.com/hsd")
      .then((res) => {
        setHsdData(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  const handleShowClick = () => {
    let dataToFilter = [];

    if (product === "MS") {
      dataToFilter = msData;
    } else if (product === "Speed") {
      dataToFilter = speedData;
    } else if (product === "HSD") {
      dataToFilter = hsdData;
    } else {
      dataToFilter = mergeAllData(msData, speedData, hsdData);
    }

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl text-white bg-[#3A1078] p-3 uppercase font-bold text-center mb-3">
        Reports
      </h1>

      <h1 className="text-2xl uppercase font-bold text-center mb-3">
        Day Start Report
      </h1>

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
                  {product === "ALL" || product === "MS" ? (
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item?.ms || "--"}
                    </td>
                  ) : (
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">--</td>
                  )}
                  {product === "ALL" || product === "Speed" ? (
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item?.speed || "--"}
                    </td>
                  ) : (
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">--</td>
                  )}
                  {product === "ALL" || product === "HSD" ? (
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item?.hsd || "--"}
                    </td>
                  ) : (
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">--</td>
                  )}
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

export default DayStartReport;
