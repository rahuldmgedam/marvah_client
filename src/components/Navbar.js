// import React from "react";
// import "./css/Navbar.css";
// import logo from "./images/petrol.jpg";
// import { Link, useNavigate } from "react-router-dom";
// export default function Navbar() {
//   const navigate = useNavigate();

//   return (
//     <>
//       <div
//         className="position-sticky font-bold  navMainDiv shadow-lg rounded"
//         style={{
//           position: "sticky",
//           top: "0",
//           zIndex: "2",
//         }}
//       >
//         {/* Day Start */}
//         <button
//           class="btn navDrop1 btn-secondary"
//           type="button"
//           onClick={() => navigate("/Day_Start")}
//         >
//           <div class="dropdown-item">Day Start</div>
//         </button>

//         {/* Loans */}
//         <div class="btn-group">
//           <button
//             class="btn dropdown-to  navDrop1 btn-secondary  "
//             type="button"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             Loans
//           </button>
//           <ul class="dropdown-menu navDrop1List">
//             <li>
//               <Link class="dropdown-item" to="/handloans">
//                 Handloans{" "}
//               </Link>
//             </li>

//             <li>
//               <Link class="dropdown-item" to="/advances">
//                 Advances
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* petrol */}
//         <div class="btn-group">
//           <button
//             class="btn dropdown-to  navDrop1 btn-secondary  "
//             type="button"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             petrol
//           </button>
//           <ul class="dropdown-menu navDrop1List">
//             <li>
//               <Link class="dropdown-item" to="/Petrol_Invoice_Feeding">
//                 Invoice Feeding{" "}
//               </Link>
//             </li>

//             <li>
//               <Link class="dropdown-item" to="/Petrol_Decantation">
//                 Decantation
//               </Link>
//             </li>
//             <li>
//               <Link class="dropdown-item" to="/Fuel_Sales">
//                 Fuel Sales
//               </Link>
//             </li>
//             <li>
//               <Link class="dropdown-item" to="/Variation">
//                 Variation
//               </Link>
//             </li>
//             <li>
//               <Link class="dropdown-item" to="/invLfrTds">
//                 Invoice/LFR/TDS Report
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Oil */}
//         <div class="btn-group">
//           <button
//             class="btn dropdown-to  navDrop1 btn-secondary  "
//             type="button"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             Oil
//           </button>
//           <ul class="dropdown-menu navDrop1List">
//             <li>
//               <Link class="dropdown-item" to="/Oil_Purchase">
//                 Purchase
//               </Link>
//             </li>
//             <li>
//               <Link class="dropdown-item" to="/Oil_Godown">
//                 Godown
//               </Link>
//             </li>
//             <li>
//               <Link class="dropdown-item" to="/Oil_Retail">
//                 Retail Sales
//               </Link>
//             </li>
//             <li>
//               <Link class="dropdown-item" to="/Oil_Pouches">
//                 Pouches
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Credit */}
//         <div class="btn-group">
//           <button
//             class="btn dropdown-to  navDrop1 btn-secondary  "
//             type="button"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             Credit
//           </button>
//           <ul class="dropdown-menu navDrop1List">
//             <li>
//               <Link class="dropdown-item" to="/credit_client">
//                 Credit Client
//               </Link>
//             </li>
//             <li>
//               <Link class="dropdown-item" to="/Generate_Bills">
//                 Generate Bills
//               </Link>
//             </li>
//             <li>
//               <Link class="dropdown-item" to="/Client_Cheque">
//                 Cheque Entry
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Cards */}
//         <div class="btn-group">
//           <button
//             class="btn dropdown-to  navDrop1 btn-secondary  "
//             type="button"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             Cards
//           </button>
//           <ul class="dropdown-menu navDrop1List">
//             <li>
//               <Link class="dropdown-item" to="/Petro_Card">
//                 Petro Card
//               </Link>
//             </li>
//             <li>
//               <Link class="dropdown-item" to="/Wallet_Payment">
//                 Wallet Payment
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Bank Deposits */}
//         <div>
//           <button
//             onClick={() => navigate("/Bank_Deposits")}
//             class="btn navDrop1 btn-secondary"
//             type="button"
//             style={{ width: "130px" }}
//           >
//             <div class="dropdown-item">Bank Deposits</div>
//           </button>
//         </div>

//         {/* Statement */}
//         <div class="btn-group">
//           <button
//             class="btn dropdown-to  navDrop1 btn-secondary  "
//             type="button"
//             data-bs-toggle="dropdown"
//             aria-expanded="false"
//           >
//             Statement
//           </button>
//           <ul class="dropdown-menu navDrop1List">
//             <li>
//               <Link class="dropdown-item" to="/Statement_Entry">
//                 Statement Entry
//               </Link>
//             </li>
//             <li>
//               <Link class="dropdown-item" to="/Bank_Statement">
//                 Bank Statement
//               </Link>
//             </li>
//             <li>
//               <Link class="dropdown-item" to="/Staff_Salary">
//                 Staff Salary
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Expenses */}
//         <button
//           class="btn navDrop1 btn-secondary"
//           type="button"
//           style={{ width: "110px" }}
//         >
//           <Link class="dropdown-item" to="/Daily_Expenses">
//             Expenses
//           </Link>
//         </button>

//         {/* Day End */}
//         <button
//           class="btn navDrop1 btn-secondary"
//           type="button"
//           style={{ width: "110px" }}
//         >
//           <Link class="dropdown-item" to="/Day_End">
//             Day End
//           </Link>
//         </button>
//       </div>
//     </>
//   );
// }

import React, { useContext } from "react";
import "./css/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { DayStartContext } from "./contexts/DayStartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { dayStartRed } = useContext(DayStartContext); 
  return (
    <>
      <div
        className="font-bold  navMainDiv"
        style={{
          position: "sticky",
          top: "0",
          zIndex: "20",
        }}
      >
    
        {/* Day Start */}
        <button
        className={` ${dayStartRed ? "bg-red-500 p-2 uppercase" : "uppercase p-2"}`}
        type="button"
        onClick={() => navigate("/Day_Start")}
      >
        <div className="dropdown-item">Day Start</div>
      </button>
        {/* <button
          class="btn navDrop1 btn-secondary"
          type="button"
          onClick={() => navigate("/Day_Start")}
        >
          <div class="dropdown-item">Day Start</div>
        </button> */}

        {/* Loans */}
        <div class="btn-group">
          <button
            class="btn dropdown-to  navDrop1 btn-secondary  "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Loans
          </button>
          <ul class="dropdown-menu navDrop1List">
            <li>
              <Link class="dropdown-item" to="/handloans">
                Handloans{" "}
              </Link>
            </li>

            <li>
              <Link class="dropdown-item" to="/advances">
                Advances
              </Link>
            </li>
          </ul>
        </div>

        {/* petrol */}
        <div class="btn-group">
          <button
            class="btn dropdown-to  navDrop1 btn-secondary  "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            petrol
          </button>
          <ul class="dropdown-menu navDrop1List">
            <li>
              <Link class="dropdown-item" to="/Petrol_Invoice_Feeding">
                Invoice Feeding{" "}
              </Link>
            </li>

            <li>
              <Link class="dropdown-item" to="/Petrol_Decantation">
                Decantation
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="/Fuel_Sales">
                Fuel Sales
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="/Variation">
                Variation
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="/invLfrTds">
                Invoice/LFR/TDS Report
              </Link>
            </li>
          </ul>
        </div>

        {/* Oil */}
        <div class="btn-group">
          <button
            class="btn dropdown-to  navDrop1 btn-secondary  "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Oil
          </button>
          <ul class="dropdown-menu navDrop1List">
            <li>
              <Link class="dropdown-item" to="/Oil_Purchase">
                Purchase
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="/Oil_Godown">
                Godown
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="/Oil_Retail">
                Retail Sales
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="/Oil_Pouches">
                Pouches
              </Link>
            </li>
          </ul>
        </div>

        {/* Credit */}
        <div class="btn-group">
          <button
            class="btn dropdown-to  navDrop1 btn-secondary  "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Credit
          </button>
          <ul class="dropdown-menu navDrop1List">
            <li>
              <Link class="dropdown-item" to="/credit_client">
                Credit Client
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="/Generate_Bills">
                Generate Bills
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="/Client_Cheque">
                Cheque Entry
              </Link>
            </li>
          </ul>
        </div>

        {/* Cards */}
        <div class="btn-group">
          <button
            class="btn dropdown-to  navDrop1 btn-secondary  "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Cards
          </button>
          <ul class="dropdown-menu navDrop1List">
            <li>
              <Link class="dropdown-item" to="/Petro_Card">
                Petro Card
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="/Wallet_Payment">
                Wallet Payment
              </Link>
            </li>
          </ul>
        </div>

        {/* Bank Deposits */}
        <div>
          <button
            onClick={() => navigate("/Bank_Deposits")}
            class="btn navDrop1 btn-secondary"
            type="button"
            style={{ width: "130px" }}
          >
            <div class="dropdown-item">Bank Deposits</div>
          </button>
        </div>

        {/* Statement */}
        <div class="btn-group">
          <button
            class="btn dropdown-to  navDrop1 btn-secondary  "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Statement
          </button>
          <ul class="dropdown-menu navDrop1List">
            <li>
              <Link class="dropdown-item" to="/Statement_Entry">
                Statement Entry
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="/Bank_Statement">
                Bank Statement
              </Link>
            </li>
            <li>
              <Link class="dropdown-item" to="/StaffSalary">
                Staff Salary
              </Link>
            </li>
          </ul>
        </div>

        {/* Expenses */}
        {/* <button
          class="btn navDrop1 btn-secondary"
          type="button"
          style={{ width: "110px" }}
        >
          <Link class="dropdown-item" to="/Daily_Expenses">
            Expenses
          </Link>
        </button> */}
           <button
          class="btn navDrop1 btn-secondary"
          type="button"
          style={{ width: "110px" }}
        >
          <Link class="dropdown-item" to="/Daily_Expenses">
            Expenses
          </Link>
        </button>

        {/* Day End */}
        <button
          class="btn navDrop1 btn-secondary"
          type="button"
          style={{ width: "110px" }}
        >
          <Link class="dropdown-item" to="/Day_End">
            Day End
          </Link>
        </button>
        <button
          class="btn navDrop1 btn-secondary"
          type="button"
          style={{ width: "110px" }}
        >
          <Link class="dropdown-item" to="/planner">
            Planner
          </Link>
        </button>
      </div>
    </>
  );
}