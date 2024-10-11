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
        console.log("todayR", res.data.length - 1);
        setamsToday(res.data[res.data.length - 1].reading);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // console.log("typeof amsToday", typeof amsToday);
  const fetchSpeed = () => {
    axios
      .get("https://marvah-server.onrender.com/speed")
      .then((res) => {
        // console.log("res speed", res.data[0]);
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
        // console.log("res.data", res.data[0]);
        sethsdToday(res.data[res.data.length - 2].reading);
        // setDateStart(res.data[0].date);
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
  }, []);

  function getTodaysDate() {
    const today = new Date();
    //  console.log(today)
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

  // border red or green function

  const [differenceMs, setDifferenceMs] = useState(0);
  useEffect(() => {
    // Calculate the difference in milliseconds and convert to a number with 2 decimal places
    const differenceMS = amsToday - amsLast;
    setDifferenceMs(differenceMS);
  }, [amsToday, amsLast]);

  // Determine the border color based on the difference
  const borderColorMs = differenceMs > 0 ? "green" : "red";

  const [differenceSpeed, setDifferenceSpeed] = useState(0);
  useEffect(() => {
    // Calculate the difference in milliseconds and convert to a number with 2 decimal places
    const differenceSpeed = bspeedToday - bspeedLast;
    setDifferenceSpeed(differenceSpeed);
  }, [bspeedToday, bspeedLast]);

  // Determine the border color based on the difference
  const borderColorSpeed = differenceSpeed > 0 ? "green" : "red";

  const [differenceHsd, setDifferenceHsd] = useState(0);
  useEffect(() => {
    // Calculate the difference in milliseconds and convert to a number with 2 decimal places
    const differenceHsd = hsdToday - hsdLast;
    setDifferenceHsd(differenceHsd);
  }, [hsdToday, hsdLast]);

  const borderColorHsd = differenceHsd > 0 ? "green" : "red";
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

console.log((convertToDDMMYYYY(lastDate)))
  return (
    <>
      <div className="">
        <center>
          <b>
            <div className="tankMainDiv shadow-lg p-1 mt-24 bg-body-tertiary rounded bigFontWeight min-h-fit">
              <h1 className=" font-bold text-center text-3xl uppercase  border-violet-600 ">
                {" "}
                Day Start
              </h1>
              <br></br>

              <div className="flex justify-center gap-4 mt-5">
                <div>
                  <span className="text-xl ml-20 uppercase">
                    Reading Day :{" "}
                  </span>{" "}
                  <span className="mr-4">
                    <input
                      type="string"
                      className="px-2 py-2 border-3 border-red-600 rounded-md"
                      value={(convertToDDMMYYYY(lastDate))}

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
              <div className="flex justify-between w-[74%] mb-8">
                <div></div>

                <div>
                  <div
                    className="bg-blue-600 px-3 py-1  rounded-md text-white"
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
                      <h4 className="font-bold text-red-600 text-2xl">A-MS</h4>
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
                        B-SPEED{" "}
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
                        C-HSD{" "}
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
                        value={(amsToday - amsLast).toFixed(2)}
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
                        // value={bspeedDifference}
                        value={(bspeedToday - bspeedLast).toFixed(2)}
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
                            // value={hsdDifference}
                            value={(hsdToday - hsdLast).toFixed(2)}
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
