// import React from "react";
// import "../css/Tank.css";
// import "../css/DayStart.css";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";

// import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import { get } from "react-hook-form";
// export default function Tankd({ dbpath1, setDate }) {
//   const [amsToday, setamsToday] = useState([]);
//   const [bspeedToday, setbspeedToday] = useState([]);
//   const [hsdToday, sethsdToday] = useState([]);

//   const [amsLast, setamsLast] = useState(0);
//   const [bspeedLast, setbspeedLast] = useState(0);
//   const [hsdLast, sethsdLast] = useState(0);

//   const [selectedDate, setSelectedDate] = useState(""); // State to store selected date

//   const [tank, setTank] = useState([]);

//   const [tanksName,setTanksName] = useState([{
//     tank1:"",
//     tank2:"",
//     tank3:""
//   }]);



//   const saveMs = () => {
//     axios
//       .post("https://marvah-server.onrender.com/ms/create", {
//         reading: amsToday,
//       })
//       .then((res) => {
//         setamsToday(res.data.reading);
//         console.log(res.data.reading);
//       });

//     axios
//       .post("https://marvah-server.onrender.com/speed/create", {
//         reading: bspeedToday,
//       })
//       .then((res) => {
//         setbspeedToday(res.data.reading);
//         console.log(res.data.reading);
//       });

//     axios
//       .post("https://marvah-server.onrender.com/hsd/create", {
//         reading: hsdToday,
//       })
//       .then((res) => {
//         sethsdToday(res.data.reading);
//         console.log(res.data.reading);
//       });

//       alert("today's reading are saved")
//   };

//   const fetchMs = () => {
//     axios
//       .get("https://marvah-server.onrender.com/ms")
//       .then((res) => {
//         // console.log("res ms", res.data[0]);
//         setamsLast(res.data[res.data.length - 2].reading);

//         // const todayR = res.data.length;
//         // console.log("todayR", res.data.length - 1);
//         setamsToday(res.data[res.data.length - 1].reading);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   const fetchSpeed = () => {
//     axios
//       .get("https://marvah-server.onrender.com/speed")
//       .then((res) => {
//         setbspeedToday(res.data[res.data.length - 2].reading);
//         setbspeedLast(res.data[res.data.length - 1].reading);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   const fetchHsd = () => {
//     axios
//       .get("https://marvah-server.onrender.com/hsd")
//       .then((res) => {
//         sethsdToday(res.data[res.data.length - 2].reading);
//         sethsdLast(res.data[res.data.length - 1].reading);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   // console.log("dateStart", dateStart);

//   useEffect(() => {
//     fetchMs();
//     fetchSpeed();
//     fetchHsd();
//   }, []);

//   function getTodaysDate() {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
//     const day = today.getDate().toString().padStart(2, "0");

//     return `${day}-${month}-${year}`;
//   }
//   getTodaysDate();

//   // Utility function to format the date
//   function formatDate(dateString) {
//     const date = new Date(dateString);

//     const monthNames = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];

//     const month = monthNames[date.getMonth()]; // getMonth() returns a zero-based index
//     const day = date.getDate();

//     return `${month} ${day}`;
//   }

//   useEffect(() => {
//     formatDate();
//     getTodaysDate();
//   }, []);


//   const [differenceMs, setDifferenceMs] = useState(0);
//   useEffect(() => {
//     const differenceMS = amsToday - amsLast;
//     setDifferenceMs(differenceMS);
//   }, [amsToday, amsLast]);

//   const borderColorMs = differenceMs >= 0 ? "green" : "red";

//   const [differenceSpeed, setDifferenceSpeed] = useState(0);
//   useEffect(() => {
//     // Calculate the difference in milliseconds and convert to a number with 2 decimal places
//     const differenceSpeed = bspeedToday - bspeedLast;
//     setDifferenceSpeed(differenceSpeed);
//   }, [bspeedToday, bspeedLast]);

//   const borderColorSpeed = differenceSpeed >= 0 ? "green" : "red";

//   const [differenceHsd, setDifferenceHsd] = useState(0);
//   useEffect(() => {
//     // Calculate the difference in milliseconds and convert to a number with 2 decimal places
//     const differenceHsd = hsdToday - hsdLast;
//     setDifferenceHsd(differenceHsd);
//   }, [hsdToday, hsdLast]);

//   const borderColorHsd = differenceHsd >= 0 ? "green" : "red";
//   const navigate = useNavigate();


//   const [lastDate,setLastDate] = useState(0)
//   const fetchMsd = () => {
//     axios
//       .get("https://marvah-server.onrender.com/ms")
//       .then((res) => {
//         // console.log("res ms", res.data[0]);
//         // setamsLast(res.data[res.data.length - 2].reading);
//         setLastDate(res.data[res.data.length - 1].date)
//         // const todayR = res.data.length;
//         // console.log("todayR", res.data.length - 1);
//         // setamsToday(res.data[res.data.length - 1].reading);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   useEffect(() => {
//     fetchMsd();
//   }, []);

//   function convertToDDMMYYYY(dateString) {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//     const year = date.getFullYear();

//     return `${day}-${month}-${year}`;
// }




//   console.log("selectedDate",selectedDate)


// const fetchDataForDate = (date) => {
//   console.log(formatToDateString(date))
//   axios
//     .get(`https://marvah-server.onrender.com/ms?date=${formatToDateString(date)}`)
//     .then((res) => {
//       setamsToday(res.data.reading);
//       setamsLast(res.data.previousReading);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });

//   axios
//     .get(`https://marvah-server.onrender.com/speed?date=${formatToDateString(date)}`)
//     .then((res) => {
//       setbspeedToday(res.data.reading);
//       setbspeedLast(res.data.previousReading);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });

//   axios
//     .get(`https://marvah-server.onrender.com/hsd?date=${formatToDateString(date)}`)
//     .then((res) => {
//       sethsdToday(res.data.reading);
//       sethsdLast(res.data.previousReading);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };


// function formatToDateString(dateStr) {
//   const date = new Date(dateStr); // Create a Date object from the string

//   const options = {
//     weekday: 'short', // Abbreviated weekday name (e.g., "Tue")
//     year: 'numeric',
//     month: 'short', // Abbreviated month name (e.g., "Oct")
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     timeZoneName: 'short', // Time zone abbreviation
//   };

//   const formattedDate = date.toLocaleString('en-GB', options); // Convert to string with specified options
//   return `${formattedDate} GMT+0000 (Coordinated Universal Time)`; // Add the desired time zone information
// }

// // Handle date selection
// const handleDateChange = (e) => {
//   const selectedDate = e.target.value;
//   setSelectedDate((selectedDate));
//   fetchDataForDate(formatToDateString(selectedDate)); // Fetch readings for the selected date
// };

// const fetchTank = () => {
//   axios
//     .get("https://marvah-server.onrender.com/tank")
//     .then((res) => {
//       console.log("tank:", res.data);
//       setTank(res.data);
//       setTanksName()

//     })
//     .catch((error) => {
//       console.log(error.message);
//     });

// };

// const fetchTanksName = ()=>{
//   setTanksName()
// }

// useEffect(() => {
//   fetchTank();

// }, []);  

// console.log("tan1kData",)

//   return (
//     <>
//       <div className="">
//         <center>
//           <b>
//             <div className="tankMainDiv fixed shadow-lg p-1 bg-body-tertiary rounded bigFontWeight min-h-fit">
//               <h1 className=" font-bold fixed ml-[33%] text-center text-3xl uppercase  border-violet-600 ">
//                 {" "}
//                 Day Start
//               </h1>
//               <br></br>

//               <div className="flex justify-center mt-10 gap-4">
//                 <div>
//                   <span className="text-xl ml-20 uppercase font-semibold">
//                     Reading Day :{" "}
//                   </span>{" "}
//                   <span className="mr-4">
//                     <input
//                       // type="date"
//                       type="string"
//                       className="px-2 py-2 border-3 border-red-600 rounded-md"
//                       value={(convertToDDMMYYYY(lastDate))}
//                       // value={selectedDate}
//                       // onChange={handleDateChange} // Trigger fetching data on date change
//                       // onChange={}
//                     />
//                   </span>
//                 </div>
//                 <div className="text-2xl mr-96">
//                   <button className=" px-4 cursor-none rounded-md text-white py-2 text-2xl uppercase bg-blue-700 border-b-4">
//                     Rates
//                   </button>
//                 </div>
//                 <div></div>
//               </div>
//               {/* report div */}
//               <div className="flex justify-between w-[74%]">
//                 <div></div>

//                 <div>
//                   <div
//                     className="bg-blue-600 px-4 py-2  rounded-md text-white"
//                     type="button"
//                     onClick={() => navigate("/dayStartReport")}
//                   >
//                     Rate Reports
//                   </div>
//                 </div>
//               </div>

//               <div className="form-input">
//                 <div
//                   className="container"
//                   style={{ padding: "150px", paddingTop: "5px" }}
//                 >
//                   <div className="row">
//                     <div className="col-4">
//                       <h4 className="font-bold text-red-600 text-2xl">ms{}</h4>
//                       <br></br>
//                       Reading Day
//                       <input
//                         type="number"
//                         className="form-control border-blue-500 inputDivPrice text-center text-2xl"
//                         value={amsToday}
//                         id="amsToday"
//                         name="amsToday"
//                         // onChange={(e)=>diffChangeHandler(e)}

//                         onChange={(e) => {
//                           setamsToday(e.target.value);
//                         }}
//                         aria-describedby="emailHelp"
//                       />
//                     </div>
//                     <div className="col-4">
//                       <h4
//                         className="font-bold text-red-600 text-2xl"
//                         style={{ color: "red" }}
//                       >
//                         B-SPEED
//                       </h4>{" "}
//                       <br></br>
//                       Reading Day
//                       <input
//                         type="number"
//                         class="form-control inputDivPrice text-center text-2xl"
//                         value={bspeedToday}
//                         onChange={(e) => {
//                           setbspeedToday(e.target.value);
//                         }}
//                         aria-describedby="emailHelp"
//                       />
//                     </div>
//                     <div className="col-4">
//                       <h4
//                         className="font-bold text-red-600 text-2xl"
//                         style={{ color: "red" }}
//                       >
//                         C-HSD{" "}
//                       </h4>{" "}
//                       <br></br>
//                       Reading Day
//                       <input
//                         type="number"
//                         class="form-control inputDivPrice text-center text-2xl"
//                         value={hsdToday}
//                         onChange={(e) => {
//                           sethsdToday(e.target.value);
//                         }}
//                         aria-describedby="emailHelp"
//                       />
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-4">
//                       Last Day<br></br>
//                       <input
//                         type="number"
//                         class="form-control inputDivPrice text-center text-2xl"
//                         // value={amsToday}
//                         value={amsLast}
//                         aria-describedby="emailHelp"
//                         disabled
//                       />
//                     </div>
//                     <div className="col-4">
//                       Last Day
//                       <input
//                         type="number"
//                         class="form-control inputDivPrice text-center text-2xl"
//                         value={bspeedLast}
//                         id="bspeedLast"
//                         aria-describedby="emailHelp"
//                         disabled
//                       />
//                     </div>
//                     <div className="col-4">
//                       Last Day
//                       <input
//                         type="number"
//                         class="form-control inputDivPrice text-center text-2xl"
//                         value={hsdLast}
//                         id="hsdLast"
//                         aria-describedby="emailHelp"
//                         disabled
//                       />
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col-4">
//                       <br />
//                       Difference MS
//                       <input
//                         type="number"
//                         style={{ borderColor: borderColorMs }}
//                         name="msdiff"
//                         class="form-control inputDivPrice text-center text-2xl"
//                         // value={(amsToday - amsLast).toFixed(2)}
//                         value={differenceMs}
//                         // onChange={(e)=>diffChangeHandler(e)}
//                         // value={amsDifference}
//                         // value={104.33}
//                         disabled
//                       />
//                     </div>
//                     <div className="col-4">
//                       <br></br>
//                       Difference Speed
//                       <input
//                         type="number"
//                         name="speeddiff"
//                         class="form-control inputDivPrice text-center text-2xl"
//                         style={{ borderColor: borderColorSpeed }}
//                         value={differenceSpeed}
//                         // value={(bspeedToday - bspeedLast).toFixed(2)}
//                         id="diffspeed"
//                         aria-describedby="emailHelp"
//                         disabled
//                       />
//                     </div>
//                     <div className="col-4">
//                       <br />
//                       <div className="flex">
//                         <div>
//                           Difference HSD
//                           <input
//                             type="number"
//                             name="hsddiff"
//                             class="form-control inputDivPrice text-center text-2xl"
//                             style={{ borderColor: borderColorHsd }}
//                             value={differenceHsd}
//                             // value={(hsdToday - hsdLast).toFixed(2)}
//                             id="diffhsd"
//                             aria-describedby="emailHelp"
//                             disabled
//                           />
//                         </div>

//                         <div>
//                           <br /> <br />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="">
//                       <div>
//                         {" "}
//                         <button></button>
//                       </div>
//                       {/* save div */}
//                       <div className="flex justify-between">
//                         <div>
//                           <button></button>
//                         </div>
//                         <div>
//                           {" "}
//                           <button
//                             type="button"
//                             //onClick={onAdd}
//                             className="bg-green-500 px-3 py-2 font-bold rounded-md text-white"
//                           >
//                             <span onClick={saveMs}>Save</span>
//                           </button>
//                         </div>{" "}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </b>
//         </center>
//       </div>
//     </>
//   );
// }

import React from "react";
import "../css/Tank.css";
import "../css/DayStart.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { get } from "react-hook-form";
export default function Tankd({ dbpath1, setDate }) {
  const [amsToday, setamsToday] = useState([]);
  const [bspeedToday, setbspeedToday] = useState([]);
  const [hsdToday, sethsdToday] = useState([]);

  const [amsLast, setamsLast] = useState(0);
  const [bspeedLast, setbspeedLast] = useState(0);
  const [hsdLast, sethsdLast] = useState(0);

  const [tankName, setTankName] = useState([])

  const [selectedDate, setSelectedDate] = useState(""); // State to store selected date

  const fetchTank = () => {
    axios
      .get("https://marvah-server.onrender.com/tank")
      .then((res) => {
        console.log("tank:", res.data);
        const tanksData = res.data.map((tank) => tank.product)
        setTankName(tanksData)
  
      })
      .catch((error) => {
        console.log(error.message);
      });
  
  };
  
  
  useEffect(() => {
    fetchTank();
  
  }, []);



  const saveMs = () => {
    axios
      .post("https://marvah-server.onrender.com/ms/create", {
        reading: amsToday,
      })
      .then((res) => {
        setamsToday(res.data.reading);
        console.log(res.data.reading);
      });

    axios
      .post("https://marvah-server.onrender.com/speed/create", {
        reading: bspeedToday,
      })
      .then((res) => {
        setbspeedToday(res.data.reading);
        console.log(res.data.reading);
      });

    axios
      .post("https://marvah-server.onrender.com/hsd/create", {
        reading: hsdToday,
      })
      .then((res) => {
        sethsdToday(res.data.reading);
        console.log(res.data.reading);
      });

      alert("today's reading are saved")
  };

  const fetchMs = () => {
    axios
      .get("https://marvah-server.onrender.com/ms")
      .then((res) => {
        // console.log("res ms", res.data[0]);
        setamsLast(res.data[res.data.length - 2].reading);

        // const todayR = res.data.length;
        // console.log("todayR", res.data.length - 1);
        setamsToday(res.data[res.data.length - 1].reading);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchSpeed = () => {
    axios
      .get("https://marvah-server.onrender.com/speed")
      .then((res) => {
        setbspeedToday(res.data[res.data.length - 2].reading);
        setbspeedLast(res.data[res.data.length - 1].reading);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchHsd = () => {
    axios
      .get("https://marvah-server.onrender.com/hsd")
      .then((res) => {
        sethsdToday(res.data[res.data.length - 2].reading);
        sethsdLast(res.data[res.data.length - 1].reading);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // console.log("dateStart", dateStart);

  useEffect(() => {
    fetchMs();
    fetchSpeed();
    fetchHsd();
  }, [saveMs]);

  function getTodaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = today.getDate().toString().padStart(2, "0");

    return `${day}-${month}-${year}`;
  }
  getTodaysDate();

  // Utility function to format the date
  function formatDate(dateString) {
    const date = new Date(dateString);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getMonth()]; // getMonth() returns a zero-based index
    const day = date.getDate();

    return `${month} ${day}`;
  }

  useEffect(() => {
    formatDate();
    getTodaysDate();
  }, []);


  const [differenceMs, setDifferenceMs] = useState(0);
  useEffect(() => {
    const differenceMS = amsToday - amsLast;
    setDifferenceMs(differenceMS);
  }, [amsToday, amsLast]);

  const borderColorMs = differenceMs >= 0 ? "green" : "red";

  const [differenceSpeed, setDifferenceSpeed] = useState(0);
  useEffect(() => {
    // Calculate the difference in milliseconds and convert to a number with 2 decimal places
    const differenceSpeed = bspeedToday - bspeedLast;
    setDifferenceSpeed(differenceSpeed);
  }, [bspeedToday, bspeedLast]);

  const borderColorSpeed = differenceSpeed >= 0 ? "green" : "red";

  const [differenceHsd, setDifferenceHsd] = useState(0);
  useEffect(() => {
    // Calculate the difference in milliseconds and convert to a number with 2 decimal places
    const differenceHsd = hsdToday - hsdLast;
    setDifferenceHsd(differenceHsd);
  }, [hsdToday, hsdLast]);

  const borderColorHsd = differenceHsd >= 0 ? "green" : "red";
  const navigate = useNavigate();


  const [lastDate,setLastDate] = useState(0)
  const fetchMsd = () => {
    axios
      .get("https://marvah-server.onrender.com/ms")
      .then((res) => {
        // console.log("res ms", res.data[0]);
        // setamsLast(res.data[res.data.length - 2].reading);
        setLastDate(res.data[res.data.length - 1].date)
        // const todayR = res.data.length;
        // console.log("todayR", res.data.length - 1);
        // setamsToday(res.data[res.data.length - 1].reading);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchMsd();
  }, []);

  function convertToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}






const fetchDataForDate = (date) => {
  console.log(formatToDateString(date))
  axios
    .get(`https://marvah-server.onrender.com/ms?date=${formatToDateString(date)}`)
    .then((res) => {
      setamsToday(res.data.reading);
      setamsLast(res.data.previousReading);
    })
    .catch((error) => {
      console.log(error.message);
    });

  axios
    .get(`https://marvah-server.onrender.com/speed?date=${formatToDateString(date)}`)
    .then((res) => {
      setbspeedToday(res.data.reading);
      setbspeedLast(res.data.previousReading);
    })
    .catch((error) => {
      console.log(error.message);
    });

  axios
    .get(`https://marvah-server.onrender.com/hsd?date=${formatToDateString(date)}`)
    .then((res) => {
      sethsdToday(res.data.reading);
      sethsdLast(res.data.previousReading);
    })
    .catch((error) => {
      console.log(error.message);
    });
};


function formatToDateString(dateStr) {
  const date = new Date(dateStr); // Create a Date object from the string

  const options = {
    weekday: 'short', // Abbreviated weekday name (e.g., "Tue")
    year: 'numeric',
    month: 'short', // Abbreviated month name (e.g., "Oct")
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short', // Time zone abbreviation
  };

  const formattedDate = date.toLocaleString('en-GB', options); // Convert to string with specified options
  return `${formattedDate} GMT+0000 (Coordinated Universal Time)`; // Add the desired time zone information
}

// Handle date selection
const handleDateChange = (e) => {
  const selectedDate = e.target.value;
  setSelectedDate((selectedDate));
  fetchDataForDate(formatToDateString(selectedDate)); // Fetch readings for the selected date
};
console.log("selectedDate",selectedDate)
  return (
    <>
      <div className="">
        <center>
          <b>
            <div className="tankMainDiv fixed shadow-lg p-1 bg-body-tertiary rounded bigFontWeight min-h-fit">
              <h1 className=" font-bold fixed ml-[33%] text-center text-3xl uppercase  border-violet-600 ">
                {" "}
                Day Start
              </h1>
              <br></br>

              <div className="flex justify-center mt-10 gap-4">
                <div>
                  <span className="text-xl ml-20 uppercase font-semibold">
                    Reading Day :{" "}
                  </span>{" "}
                  <span className="mr-4">
                    <input
                      type="date"
                      // type="string"
                      className="px-2 py-2 border-3 border-red-600 rounded-md"
                      // value={(convertToDDMMYYYY(lastDate))}
                      value={(selectedDate)}
                      onChange={handleDateChange} // Trigger fetching data on date change
                      // onChange={}
                    />
                  </span>
                </div>
                <div className="text-2xl mr-96">
                  <button className=" px-4 cursor-none rounded-md text-white py-2 text-2xl uppercase bg-blue-700 border-b-4">
                    Rates
                  </button>
                </div>
                <div></div>
              </div>
              {/* report div */}
              <div className="flex justify-between w-[74%]">
                <div></div>

                <div>
                  <div
                    className="bg-blue-600 px-4 py-2  rounded-md text-white"
                    type="button"
                    onClick={() => navigate("/dayStartReport")}
                  >
                    Rate Reports
                  </div>
                </div>
              </div>

              <div className="form-input">
                <div
                  className="container"
                  style={{ padding: "150px", paddingTop: "5px" }}
                >
                  <div className="row">
                    <div className="col-4">
                      <h4 className="font-bold text-red-600 text-2xl">{tankName[0]}</h4>
                      <br></br>
                      Reading Day
                      <input
                        type="number"
                        className="form-control border-blue-500 inputDivPrice text-center text-2xl"
                        value={amsToday}
                        id="amsToday"
                        name="amsToday"
                        // onChange={(e)=>diffChangeHandler(e)}

                        onChange={(e) => {
                          setamsToday(e.target.value);
                        }}
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="col-4">
                      <h4
                        className="font-bold text-red-600 text-2xl"
                        style={{ color: "red" }}
                      >
                        {tankName[1]}
                      </h4>{" "}
                      <br></br>
                      Reading Day
                      <input
                        type="number"
                        class="form-control inputDivPrice text-center text-2xl"
                        value={bspeedToday}
                        onChange={(e) => {
                          setbspeedToday(e.target.value);
                        }}
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="col-4">
                      <h4
                        className="font-bold text-red-600 text-2xl"
                        style={{ color: "red" }}
                      >
                        {tankName[2]}
                      </h4>{" "}
                      <br></br>
                      Reading Day
                      <input
                        type="number"
                        class="form-control inputDivPrice text-center text-2xl"
                        value={hsdToday}
                        onChange={(e) => {
                          sethsdToday(e.target.value);
                        }}
                        aria-describedby="emailHelp"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-4">
                      Last Day<br></br>
                      <input
                        type="number"
                        class="form-control inputDivPrice text-center text-2xl"
                        // value={amsToday}
                        value={amsLast}
                        aria-describedby="emailHelp"
                        disabled
                      />
                    </div>
                    <div className="col-4">
                      Last Day
                      <input
                        type="number"
                        class="form-control inputDivPrice text-center text-2xl"
                        value={bspeedLast}
                        id="bspeedLast"
                        aria-describedby="emailHelp"
                        disabled
                      />
                    </div>
                    <div className="col-4">
                      Last Day
                      <input
                        type="number"
                        class="form-control inputDivPrice text-center text-2xl"
                        value={hsdLast}
                        id="hsdLast"
                        aria-describedby="emailHelp"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <br />
                      Difference MS
                      <input
                        type="number"
                        style={{ borderColor: borderColorMs }}
                        name="msdiff"
                        class="form-control inputDivPrice text-center text-2xl"
                        // value={(amsToday - amsLast).toFixed(2)}
                        value={differenceMs}
                        // onChange={(e)=>diffChangeHandler(e)}
                        // value={amsDifference}
                        // value={104.33}
                        disabled
                      />
                    </div>
                    <div className="col-4">
                      <br></br>
                      Difference Speed
                      <input
                        type="number"
                        name="speeddiff"
                        class="form-control inputDivPrice text-center text-2xl"
                        style={{ borderColor: borderColorSpeed }}
                        value={differenceSpeed}
                        // value={(bspeedToday - bspeedLast).toFixed(2)}
                        id="diffspeed"
                        aria-describedby="emailHelp"
                        disabled
                      />
                    </div>
                    <div className="col-4">
                      <br />
                      <div className="flex">
                        <div>
                          Difference HSD
                          <input
                            type="number"
                            name="hsddiff"
                            class="form-control inputDivPrice text-center text-2xl"
                            style={{ borderColor: borderColorHsd }}
                            value={differenceHsd}
                            // value={(hsdToday - hsdLast).toFixed(2)}
                            id="diffhsd"
                            aria-describedby="emailHelp"
                            disabled
                          />
                        </div>

                        <div>
                          <br /> <br />
                        </div>
                      </div>
                    </div>
                    <div className="">
                      <div>
                        {" "}
                        <button></button>
                      </div>
                      {/* save div */}
                      <div className="flex justify-between">
                        <div>
                          <button></button>
                        </div>
                        <div>
                          {" "}
                          <button
                            type="button"
                            //onClick={onAdd}
                            className="bg-green-500 px-3 py-2 font-bold rounded-md text-white"
                          >
                            <span onClick={saveMs}>Save</span>
                          </button>
                        </div>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b>
        </center>
      </div>
    </>
  );
}