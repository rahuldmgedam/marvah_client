import React from "react";
import "./css/Sidebar.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "./images/petrol.jpg";
import axios from "axios";
import { MdAccountCircle, MdAdminPanelSettings, MdDarkMode, MdDashboard, MdHome, MdReport } from "react-icons/md";
export default function Sidebar() {
  const [amsToday, setamsToday] = useState([]);
  const [amsLast, setamsLast] = useState(0);
 const [lastDate,setLastDate] = useState(0)
  const navigate = useNavigate();
  const fetchMs = () => {
    axios
      .get("https://marvah-server.onrender.com/ms")
      .then((res) => {
        // console.log("res ms", res.data[0]);
        setamsLast(res.data[res.data.length - 2].reading);
        setLastDate(res.data[res.data.length - 1].date)
        // const todayR = res.data.length;
        // console.log("todayR", res.data.length - 1);
        setamsToday(res.data[res.data.length - 1].reading);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchMs();
  }, []);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  const formattedDate = dd + "-" + mm + "-" + yyyy;

  function convertToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

// const formattedddmmyy = convertToDDMMYYYY("Tue Oct 01 2024 06:14:55 GMT+0000");
// console.log(formattedDate);  // Output: 01-10-2024

  console.log(convertToDDMMYYYY(lastDate));

  return (
    <>
      <div class="sideMainDiv text-white">
        <div>
          <img class="imgClass" src={logo} />
        </div>
        <div className="sideInfo uppercase">
          <center>
            <h5>Marwah Company</h5>
          </center>
          Current Date : {formattedDate}
          <br></br>
          Last Entry Date :  {(convertToDDMMYYYY(lastDate))}
        </div>

        <div className="flex gap-2 ml-6">
          <button>
            <MdHome className="" />
          </button>
          <button class="" type="button" onClick={() => navigate("/Day_Start")}>
            <div class="dropdown-item">Home</div>
          </button>
        </div>
        <div className="">
          <div className="btn-group flex gap-2 mt-6">
            <button className="ml-6">
                <MdReport/>
            </button>
            <button
              class="dropdown-to"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
       Reports
            </button>
            <ul class="dropdown-menu sideDrop1List">
              {/* <li><Link class="dropdown-item" to="/mainhome">Add Tank Record</Link></li> 
                        <li><Link class="dropdown-item" to="/machineLayout"> Add Make Record</Link></li> */}
              <li>
                <Link class="dropdown-item" to="/PetrolReport">
                  Petrol/HSD Report
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/CreditClientReport">
                  Credit Report
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/ExpensesReport">
                  Expenses Report
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/BankStatements">
                  Bank Statements Report
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/CardsReport">
                  Cards Report
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/AdvancesHandloanReport">
                  Advances / Handloan Report
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/OilReports">
                  Oil Report
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="">
                  Fuel Sales Report
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div>
        <div class="btn-group flex gap-2 mt-6">
        <button className="ml-6">
                <MdAccountCircle/>
            </button>
            <button
              class="dropdown-to"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Add Account
            </button>
            <ul class="dropdown-menu sideDrop1List">
              <li>
                <Link class="dropdown-item" to="/mainhome">
                  Add Tank Record
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/machineLayout">
                  {" "}
                  Add Make Record
                </Link>
              </li>
              {/* <li><Link class="dropdown-item" to="/Tanks">Add Tanks</Link></li> 
                            <li><Link class="dropdown-item" to="/Machine">Add Machines</Link></li> */}
              <li>
                <Link class="dropdown-item" to="/Nozzles">
                  Add Nozzles
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/Add_Bank">
                  Add Banks
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/add_client2">
                  Add Client
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/add_Credit">
                  Add Credit
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/add_client">
                  Add Handloan Client
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/add_staff">
                  Add Staff
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/Oil_Products">
                  Add Oil Product
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/Add_Oil_Pouches">
                  Add Oil Pouches
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/Petrol_Products">
                  Add Petrol Product
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/add_payments_mode">
                  Add Payments Mode
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/Add_Petro_Card">
                  Add Petro Card
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/Add_Wallet">
                  Add Wallet
                </Link>
              </li>
              <li>
                <Link class="dropdown-item" to="/Add_Expenses_Topic">
                  Add Expenses Topic
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div class="btn-group flex ml-6 gap-2 mt-6">
        <button className="ml-4">
                {/* <MdAdminPanelSettings/> */}
            </button>
          <button
            className="bg-green-600 px-4 py-2 rounded-lg ml-2 text-center text-white font-bold uppercase"
            type="button"
          >
            admin login
          </button>
        </div>

        <div className="mt-48">
          <h2 className="mt-6 ml-10 text-md text-white font-bold">
            Designed & Developed by{" "}
          </h2>
          <h2 className=" ml-6 p-1 text-white  text-md font-bold ">
            {" "}
            Royals Webtech Pvt. Ltd. ©️2024
          </h2>
        </div>
        <br></br>
        {/* <footer className='ml-4 p-2 rounded-lg bg-gray-100 text-black font-bold mr-4'>Designed & Developed by Royals Webtech Pvt. Ltd. ©️2024</footer>   */}
      </div>
    </>
  );
}
