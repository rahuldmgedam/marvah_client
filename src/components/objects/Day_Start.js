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
  // const [hsdLast, sethsdLast] = useState(0);


  // const [hsdLast, sethsdLast] = useState(0);
  // const [hsdLast, sethsdLast] = useState(0);

  const [amsDifference, setamsDifference] = useState(0);
  const [bspeedDifference, setbspeedDifference] = useState(0);
  const [hsdDifference, sethsdDifference] = useState(0);

const [diffData,setDiffData] = useState({})

  const diffChangeHandler = (e)=>{
    const {name,value}  = e.target
         setDiffData({...diffData,[name]:value})
    //  e.preventDefault();
     
     console.log("diffHandler", e.target.value);
  }
  console.log("diffData",diffData);


  // const handleSpeedDiff =async () => {
  //   return await setbspeedDifference((bspeedToday - bspeedLast).toFixed(3));
  // };

  // const handleHsdDiff =async () => {

  //   return await sethsdDifference((hsdToday - hsdLast).toFixed(3));
  // };

//   useEffect(() => {
// ;
//     handleSpeedDiff();
//     handleHsdDiff();
//   }, []);
  // console.log("amsDifference", amsDifference);
  // console.log("amsDifference", bspeedDifference);

  const fetchMs = () => {
    axios
      .get("http://localhost:4000/ms")
      .then((res) => {
        // console.log("res ms", res.data[0]);
        setamsToday(res.data[0].reading);
        setamsLast(res.data[1].reading);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // console.log("typeof amsToday", typeof amsToday);
  const fetchSpeed = () => {
    axios
      .get("http://localhost:4000/speed")
      .then((res) => {
        // console.log("res speed", res.data[0]);
        setbspeedToday(res.data[0].reading);
        setbspeedLast(res.data[1].reading);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchHsd = () => {
    axios
      .get("http://localhost:4000/hsd")
      .then((res) => {
        // console.log("res.data", res.data[0]);
        sethsdToday(res.data[0].reading);
        // setDateStart(res.data[0].date);
        sethsdLast(res.data[1].reading);
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

  // border red or green function


const [differenceMs,setDifferenceMs] = useState(0);
  useEffect(() => {
      // Calculate the difference in milliseconds and convert to a number with 2 decimal places
      const differenceMS = ( amsToday -amsLast)
      setDifferenceMs(differenceMS);
  }, [amsToday, amsLast]);

  // Determine the border color based on the difference
  const borderColorMs = differenceMs > 0 ? 'green' : 'red';

  const [differenceSpeed,setDifferenceSpeed] = useState(0)
  useEffect(() => {
      // Calculate the difference in milliseconds and convert to a number with 2 decimal places
      const differenceSpeed = (bspeedToday -bspeedLast)
      setDifferenceSpeed(differenceSpeed);
  }, [bspeedToday, bspeedLast]);

  // Determine the border color based on the difference
  const borderColorSpeed = differenceSpeed > 0 ? 'green' : 'red';


  const [differenceHsd,setDifferenceHsd] = useState(0)
  useEffect(() => {
      // Calculate the difference in milliseconds and convert to a number with 2 decimal places
      const differenceHsd = (hsdToday -hsdLast)
      setDifferenceHsd(differenceHsd);
  }, [hsdToday, hsdLast]);

  // Determine the border color based on the difference
  const borderColorHsd = differenceHsd > 0 ? 'green' : 'red';
// console.log("borderColorSpeed",borderColorSpeed)
  return (
    <>
      <center>
        <b>
          <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
            <h1 className="mt-3 mb-7 mb-5 p-2 font-bold text-center bg-blue-400 text-white text-2xl uppercase  border-violet-600 "> Day Start</h1>
            <br></br>
            <div style={{ display: "flex" }}>
              <h5 style={{ marginLeft: "36%" }} className="mt-2">
                <span style={{ fontSize: "26px" }}> Reading Day : </span>
              </h5>
              <input
                // type="date"
                value={getTodaysDate()}
                style={{
                  width: "200px",
                  marginLeft: "20px",
                  border: "2px solid red",
                  fontSize: "22px",
                  fontWeight: "500",
                }}
                class="form-control"
                id="dateinput"
                // onChange={(e) => {
                //   setDate(e.target.value);
                //   setCookies(e.target.value);
                //   getDayStartData(e.target.value, -1);
                // }}
                pattern="\d{4}-\d{2}-\d{2}"
              ></input>
            </div>

            <div className="text-2xl mt-4">
              <button className=" px-4 cursor-none rounded-md text-white py-2 text-2xl uppercase bg-violet-700 border-b-4">
                Rate
              </button>
            </div>

            <div>
              <div
                className="container"
                style={{ padding: "150px", paddingTop: "50px" }}
              >
                <div className="row">
                  <div className="col-4">
                    <h4 style={{ color: "red" }}>A-MS</h4>
                    <br></br>
                    Reading Day
                    <input
                      type="number"
                      class="form-control border-blue-500 inputDivPrice"
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
                    <h4 style={{ color: "red" }}>B-SPEED </h4> <br></br>
                    Reading Day
                    <input
                      type="number"
                      class="form-control inputDivPrice"
                      value={bspeedToday}
                      onChange={(e) => {
                        setbspeedToday(e.target.value);
                      }}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="col-4">
                    <h4 style={{ color: "red" }}>C-HSD </h4> <br></br>
                    Reading Day
                    <input
                      type="number"
                      class="form-control inputDivPrice"
                      value={hsdToday}
                      onChange={(e) => {
                        sethsdToday(e.target.value);
                      }}
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  id="savebtn"
                  style={{
                    marginTop: "-75px",
                    marginLeft: "890px",
                    backgroundColor: "green",
                    color: "white",
                  }}
                  //onClick={onAdd}
                  class="btn"
                >
                  <span id="savebtn1">Save</span>
                </button>
                <div className="row">
                  <div className="col-4">
                    Last Day<br></br>
                    <input
                      type="number"
                      class="form-control inputDivPrice"
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
                      class="form-control inputDivPrice"
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
                      class="form-control inputDivPrice"
                      value={hsdLast}
                      id="hsdLast"
                      aria-describedby="emailHelp"
                      disabled
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <br></br>
                    Difference MS
                    <input
                      type="number"
                      style={{ borderColor: borderColorMs }}
                      name="msdiff"
                      class="form-control inputDivPrice"
                      value={(amsToday - amsLast).toFixed(2)}
                      //  onChange={(e)=>diffChangeHandler(e)}
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
                      class="form-control inputDivPrice"
                      style={{ borderColor: borderColorSpeed }}

                      // value={bspeedDifference}
                      value={(bspeedToday -bspeedLast).toFixed(2)}

                      id="diffspeed"
                      aria-describedby="emailHelp"
                      disabled
                    />
                  </div>
                  <div className="col-4">
                    <br></br>
                    Difference HSD
                    <input
                      type="number"
                      name="hsddiff"
                      class="form-control inputDivPrice"
                      style={{ borderColor: borderColorHsd }}

                      // value={hsdDifference}
                      value={(hsdToday -hsdLast).toFixed(2)}
                      id="diffhsd"
                      aria-describedby="emailHelp"
                      disabled
                    />
                  </div>

                  {/* <div className="savepop" id="savepop">
                    <div>
                      <br></br>
                      <h3>Saved ✅</h3>
                      <h5 style={{ marginTop: "20px", marginBottom: "20px" }}>
                        {" "}
                        Difference MS :
                        <span className="diffms">FSCC {amsDifference} </span>{" "}
                        <br></br>
                        Difference Speed :
                        <span className="diffspeed"> {bspeedDifference} </span>
                        <br></br>
                        Difference HSD :{" "}
                        <span className="diffhsd"> {hsdDifference} </span>{" "}
                        <br></br>{" "}
                      </h5>
                      <button
                        type="button"
                        id="savebtn"
                        style={{ backgroundColor: "green", color: "white" }}
                        // onClick={onOkay}
                        class="btn"
                      >
                        Okay
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </b>
      </center>
    </>
  );
}
