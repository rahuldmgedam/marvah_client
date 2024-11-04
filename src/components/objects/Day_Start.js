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
  const [inputTodaysDate,setInputTodaysDate] = useState();


  function getTodaysDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = today.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  
  console.log(getTodaysDate()); // Output: e.g., "30-10-2024"
  
  const [tank, setTank] = useState([]);


  const [isRed, setIsRed] = useState(false);
  const [tankName, setTankName] = useState([]);


  const saveMs = () => {
    axios
      .post("https://marvah-server.onrender.com/ms/create", {
        reading: amsToday,
      })
      .then((res) => {
        setamsToday(res.data.reading);
        // console.log(res.data.reading);
      });

    axios
      .post("https://marvah-server.onrender.com/speed/create", {
        reading: bspeedToday,
      })
      .then((res) => {
        setbspeedToday(res.data.reading);
        // console.log(res.data.reading);
      });

    axios
      .post("https://marvah-server.onrender.com/hsd/create", {
        reading: hsdToday,
      })
      .then((res) => {
        sethsdToday(res.data.reading);
        // console.log(res.data.reading);
      });
      
      alert("today's reading are saved");
      setIsRed(true);
  };


  // const fetchMs = (date) => {
  //   const formattedDate = new Date(date).toLocaleDateString("en-CA");
  
  //   // Fetch MS data
  //   axios
  //     .get("https://marvah-server.onrender.com/ms")
  //     .then((res) => {
  //       const entries = res.data.filter(
  //         (entry) => new Date(entry.date).toLocaleDateString("en-CA") === formattedDate
  //       );
  //       if (entries.length > 0) {
  //         setamsLast(entries[0].reading);
  //         setamsToday(entries[entries.length - 1].reading);
  //       } else {
  //         setamsLast(0);
  //         setamsToday(0);
  //       }
  //     })
  //     .catch((error) => console.log(error.message));
  
  //   // Fetch Speed data
  //   axios
  //     .get("https://marvah-server.onrender.com/speed")
  //     .then((res) => {
  //       const entries = res.data.filter(
  //         (entry) => new Date(entry.date).toLocaleDateString("en-CA") === formattedDate
  //       );
  //       if (entries.length > 0) {
  //         setbspeedLast(entries[0].reading);
  //         setbspeedToday(entries[entries.length - 1].reading);
  //       } else {
  //         setbspeedLast(0);
  //         setbspeedToday(0);
  //       }
  //     })
  //     .catch((error) => console.log(error.message));
  
  //   // Fetch HSD data
  //   axios
  //     .get("https://marvah-server.onrender.com/hsd")
  //     .then((res) => {
  //       const entries = res.data.filter(
  //         (entry) => new Date(entry.date).toLocaleDateString("en-CA") === formattedDate
  //       );
  //       if (entries.length > 0) {
  //         sethsdLast(entries[0].reading);
  //         sethsdToday(entries[entries.length - 1].reading);
  //       } else {
  //         sethsdLast(0);
  //         sethsdToday(0);
  //       }
  //     })
  //     .catch((error) => console.log(error.message));
  // };
  const fetchMs = (date) => {
    const selectedDate = new Date(date);
    const previousDate = new Date(selectedDate);
    previousDate.setDate(selectedDate.getDate() - 1);
  
    const selectedDateString = selectedDate.toLocaleDateString("en-CA");
    const previousDateString = previousDate.toLocaleDateString("en-CA");
  
    // Fetch AMS data
    axios
      .get("https://marvah-server.onrender.com/ms")
      .then((res) => {
        const selectedRecord = res.data.find(
          (entry) => new Date(entry.date).toLocaleDateString("en-CA") === selectedDateString
        );
        const previousRecord = res.data.find(
          (entry) => new Date(entry.date).toLocaleDateString("en-CA") === previousDateString
        );
  
        setamsToday(selectedRecord ? selectedRecord.reading : 0);
        setamsLast(previousRecord ? previousRecord.reading : 0);
      })
      .catch((error) => console.log(error.message));
  
    // Fetch Speed data
    axios
      .get("https://marvah-server.onrender.com/speed")
      .then((res) => {
        const selectedRecord = res.data.find(
          (entry) => new Date(entry.date).toLocaleDateString("en-CA") === selectedDateString
        );
        const previousRecord = res.data.find(
          (entry) => new Date(entry.date).toLocaleDateString("en-CA") === previousDateString
        );
  
        setbspeedToday(selectedRecord ? selectedRecord.reading : 0);
        setbspeedLast(previousRecord ? previousRecord.reading : 0);
      })
      .catch((error) => console.log(error.message));
  
    // Fetch HSD data
    axios
      .get("https://marvah-server.onrender.com/hsd")
      .then((res) => {
        const selectedRecord = res.data.find(
          (entry) => new Date(entry.date).toLocaleDateString("en-CA") === selectedDateString
        );
        const previousRecord = res.data.find(
          (entry) => new Date(entry.date).toLocaleDateString("en-CA") === previousDateString
        );
  
        sethsdToday(selectedRecord ? selectedRecord.reading : 0);
        sethsdLast(previousRecord ? previousRecord.reading : 0);
      })
      .catch((error) => console.log(error.message));
  };
  
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setInputTodaysDate(selectedDate);
    fetchMs(selectedDate);
  };
  
  // const handleDateChange = (e) => {
  //   const selectedDate = e.target.value;
  //   setInputTodaysDate(selectedDate);
  //   fetchMs(selectedDate);
  // };
  
  // const handleDateChange = (e) => {
  //   const selectedDate = new Date(e.target.value).toLocaleDateString("en-CA");
  //   setInputTodaysDate(selectedDate);
  //   fetchMs(selectedDate);
  //   console.log("selectedDate",selectedDate);

  // };

  console.log("inputTodaysDate",getTodaysDate(inputTodaysDate));


  // console.log("dateStart", dateStart);

  useEffect(() => {
    fetchMs();
  
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








// Handle date selection

const fetchTank = () => {
  axios
    .get("https://marvah-server.onrender.com/tank")
    .then((res) => {
      // console.log("tank:", res.data);
      const tanksData = res.data.map((tank) => tank.product);
      setTankName(tanksData);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

useEffect(() => {
  fetchTank();

}, []);
console.log("amsLast",amsLast);

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
                      value={(inputTodaysDate)} 
                     
                     onChange={handleDateChange}
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
                          {/* <button
                            type="button"
                            //onClick={onAdd}
                            className="bg-green-500 px-3 py-2 font-bold rounded-md text-white"
                          >
                            <span onClick={saveMs}>Save</span>
                          </button>  */}
                               <button
                             type="button"
                             //onClick={onAdd}
                            className={`${
                               isRed
                                ? "bg-red-500 px-3 py-2 font-bold rounded-md text-white"
                                : "bg-green-500 px-3 py-2 font-bold rounded-md text-white"
                             }`}
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

{/* import React from "react";
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

  const [tankName, setTankName] = useState([]);

  const [selectedDate, setSelectedDate] = useState(""); // State to store selected date

  const [isRed, setIsRed] = useState(false);
  const fetchTank = () => {
    axios
      .get("https://marvah-server.onrender.com/tank")
      .then((res) => {
        console.log("tank:", res.data);
        const tanksData = res.data.map((tank) => tank.product);
        setTankName(tanksData);
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
      });

    axios
      .post("https://marvah-server.onrender.com/speed/create", {
        reading: bspeedToday,
      })
      .then((res) => {
        setbspeedToday(res.data.reading);
        console.log("post bspeed today",bspeedToday);
      });

    axios
      .post("https://marvah-server.onrender.com/hsd/create", {
        reading: hsdToday,
      })
      .then((res) => {
        sethsdToday(res.data.reading);
      });

    alert("today's reading are saved");
    setIsRed(true);
  };

  const fetchMs = () => {
    axios
      .get("https://marvah-server.onrender.com/ms")
      .then((res) => {
        setamsLast(res.data[res.data.length - 2].reading);

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
        setbspeedToday(res.data[res.data.length - 1].reading);
        setbspeedLast(res.data[res.data.length - 2].reading);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchHsd = () => {
    axios
      .get("https://marvah-server.onrender.com/hsd")
      .then((res) => {
        sethsdToday(res.data[res.data.length - 1].reading);
        sethsdLast(res.data[res.data.length - 2].reading);
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

  useEffect(() => {
    // getTodaysDate();
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

  const [lastDate, setLastDate] = useState();

  // Handle date selection
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  };

  function convertToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }


  // Example usage:
  const formattedDate = convertToDDMMYYYY(lastDate);
  // console.log("lastDate ", lastDate); // Outputs: "25/10/2024"
  console.log("amsToday",amsToday);
  console.log("amsLast",amsLast);
  console.log("bspeedToday",bspeedToday);
  console.log("bspeedLast",bspeedLast)
  console.log("hsdToday",hsdToday);
  console.log("hsdLast",hsdLast)
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
                      // type="date"
                      type="string"
                      className="px-2 py-2 border-3 border-red-600 rounded-md"
                      value={(new Date().toLocaleDateString("en-GB"))}
                      onChange={(e) => setLastDate(e.target.value)}
                      // value={(selectedDate)}
                      // onChange={handleDateChange} // Trigger fetching data on date change
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
//                       <h4 className="font-bold text-red-600 text-2xl">
//                         {tankName[0]}
//                       </h4>
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
//                         {tankName[1]}
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
//                         {tankName[2]}
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
//                             className={`${
//                               isRed
//                                 ? "bg-red-500 px-3 py-2 font-bold rounded-md text-white"
//                                 : "bg-green-500 px-3 py-2 font-bold rounded-md text-white"
//                             }`}
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
// } */}



 