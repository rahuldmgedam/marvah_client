import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Tank from "./components/objects/Tank";
import Login from "./components/login/Login";
import Machine from "./components/objects/Machine";
import Nozzles from "./components/objects/Nozzles";
import Oil_Purchase from "./components/objects/Oil_Purchase";
import Oil_Godown from "./components/objects/Oil_Godown";
import Oil_Products from "./components/objects/Oil_Product";
import Oil_Retail from "./components/objects/Oil_Retail";
import Client from "./components/objects/Client";
import Client2 from "./components/objects/Client2";
import Petrol_Decantation from "./components/objects/Petrol_Decantation";
import Petrol_Invoice_Feeding from "./components/objects/Petrol_Invoice_Feeding";
import Petrol_Products from "./components/objects/Petrol_Products";
import Staff_Salary from "./components/objects/Staff_Salary";
import Bank_Statement from "./components/objects/Bank_Statement";
import Bank_Deposits from "./components/objects/Bank_Deposits";
import Statement_Entry from "./components/objects/Statement_Entry";
import Add_Oil_Pouches from "./components/objects/Add_Oil_Pouches";
import Add_Mode from "./components/objects/Add_Mode";
import Variation from "./components/objects/Variation";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Handloans from "./components/objects/Handloans";
import Advances from "./components/objects/Advances";
import Day_Start from "./components/objects/Day_Start";
import Credit_Client from "./components/objects/Credit_Client";
import Client_Cheque from "./components/objects/Client_Cheque";
import Generate_Bills from "./components/objects/Generate_Bills";
import Add_Bank from "./components/objects/Add_Bank";
import Add_Staff from "./components/objects/Add_Staff";
import Oil_Pouches from "./components/objects/Oil_Pouches";
import Sale_Fuels from "./components/objects/Sale_Fuels";
import Variartion from "./components/objects/Variation";
import Add_Wallet from "./components/objects/Add_Wallet";
import Add_Petro_Card from "./components/objects/Add_Petro_Card";
import Petro_Card from "./components/objects/Petro_Card";
import Wallet_Payment from "./components/objects/Wallet_Payment";
import Add_Expenses_Topic from "./components/objects/Add_Expenses_Topic";
import Expenses from "./components/objects/Expenses";
import Day_End from "./components/objects/Day_End";

import PetrolReport from "./components/Reports/PetrolReport";
import PetrolReport1 from "./components/Reports/PetrolReport1";
import PetrolReport2 from "./components/Reports/PetrolReport2";
import PetrolReport3 from "./components/Reports/PetrolReport3";
import PetrolReport4 from "./components/Reports/PetrolReport4";
import PetrolReport5 from "./components/Reports/PetrolReport5";
import PetrolReport6 from "./components/Reports/PetrolReport6";

import CreditClientReport from "./components/Reports/CreditClientReport";
import CreditReport1 from "./components/Reports/CreditReport1";
import CreditReport2 from "./components/Reports/CreditReport2";
import CreditReport3 from "./components/Reports/CreditReport3";
import CreditReport4 from "./components/Reports/CreditReport4";

import ExpensesReport from "./components/Reports/ExpensesReport";
import ExpensesReport1 from "./components/Reports/ExpensesReport1";
import ExpensesReport2 from "./components/Reports/ExpensesReport2";
import ExpensesReport3 from "./components/Reports/ExpensesReport3";

import AdvancesHandloanReport from "./components/Reports/AdvancesHandloanReport";
import AdvancesHandloanReport1 from "./components/Reports/AdvancesHandloanReport1";
import AdvancesHandloanReport2 from "./components/Reports/AdvancesHandloanReport2";
import AdvancesHandloanReport3 from "./components/Reports/AdvancesHandloanReport3";

import BankStatements from "./components/Reports/BankStatements";
import BankStatements1 from "./components/Reports/BankStatements1";
import BankStatements2 from "./components/Reports/BankStatements2";
import BankStatements3 from "./components/Reports/BankStatements3";

import CardsReport from "./components/Reports/CardsReport";
import CardsReport1 from "./components/Reports/CardsReport1";
import CardsReport2 from "./components/Reports/CardsReport2";
import CardsReport3 from "./components/Reports/CardsReport3";
import MainHome from "./components/objects/MainHome";
import MachineLayout from "./components/objects/MachineLayout";
import New from "./components/objects/New";
import { Toaster } from "react-hot-toast";
import MachineReadings from "./components/objects/MachineReadings";
import ReadingComponent from "./components/objects/ReadingComponent";
import NozzleProductWise from "./components/objects/NozzleProductWise";
import Footer from "./components/Footer";
import Add_Credit from "./components/objects/Add_Credit";
import MonthlyDsr from "./components/Reports/MonthlyDsr";
import MonthlySales from "./components/Reports/petrol reports/MontlySales";
import PurchaseTds from "./components/Reports/purchaseReports/PurchaseTds";
import PurchaseLfr from "./components/Reports/purchaseReports/PurchaseLfr";
import PurchaseDecantation from "./components/Reports/purchaseReports/PurchaseDecantation";
import InvLfrTds from "./components/objects/InvLfrTds";
import DayStartReport from "./components/Reports/DayStart Reports/DayStartReport";
import ConsolidatedReport from "./components/Reports/DayStart Reports/ConsolidatedReport";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Login />
            </>
          }
        />

        <Route
          path="/mainhome"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <MainHome />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/new"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <New />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/machinelayout"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <MachineLayout />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/machineReadings"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <MachineReadings />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/readingcomponent"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <ReadingComponent />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/nozzleproductwise"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <NozzleProductWise />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/new"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <New />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/machinelayout"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <MachineLayout />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/machineReadings"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <MachineReadings />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/readingcomponent"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <ReadingComponent />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/nozzleproductwise"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <NozzleProductWise />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/OilReports"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <ExpensesReport />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/OilReports1"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <ExpensesReport />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/OilReports2"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <ExpensesReport />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/OilReports3"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <ExpensesReport />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/ExpensesReport"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <ExpensesReport />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/ExpensesReport1"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <ExpensesReport1 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/ExpensesReport2"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <ExpensesReport2 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/ExpensesReport3"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <ExpensesReport3 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/AdvancesHandloanReport"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <AdvancesHandloanReport />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/AdvancesHandloanReport1"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <AdvancesHandloanReport1 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/AdvancesHandloanReport2"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <AdvancesHandloanReport2 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/AdvancesHandloanReport3"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <AdvancesHandloanReport3 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/BankStatements"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <BankStatements />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/BankStatements1"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <BankStatements1 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/BankStatements2"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <BankStatements2 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/BankStatements3"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <BankStatements3 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/CardsReport"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <CardsReport />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/CardsReport1"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <CardsReport1 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/CardsReport2"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <CardsReport2 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/CardsReport3"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <CardsReport3 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/creditreport1"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <CreditReport1 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/creditreport1"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <CreditReport1 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/creditreport1"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <CreditReport1 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/creditreport2"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <CreditReport2 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/creditreport3"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <CreditReport3 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/creditreport4"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <CreditReport4 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/CreditClientReport"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <CreditClientReport />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/PetrolReport1"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <PetrolReport1 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/PetrolReport2"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <PetrolReport2 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/PetrolReport3"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <PetrolReport3 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/PetrolReport4"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <PetrolReport4 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/PetrolReport5"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <PetrolReport5 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/PetrolReport6"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <PetrolReport6 />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Dashboard"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Dashboard />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/PetrolReport"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <PetrolReport />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/monthlydsr"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <MonthlyDsr />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Day_End"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Day_End />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Nozzles"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Nozzles />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/pouches_godown"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <pouches_godown />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/pouches_purchase"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <pouches_purchase />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Petro_Card"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Petro_Card />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Wallet_Payment"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Wallet_Payment />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Add_Wallet"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Add_Wallet />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Add_Petro_Card"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Add_Petro_Card />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Staff_Salary"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Staff_Salary />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Variation"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Variation />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Statement_Entry"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Statement_Entry />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Bank_Deposits"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Bank_Deposits />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Tanks"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Tank />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Day_Start"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div className="w-[20%]">
                  <Sidebar />
                </div>
                <div className="w-[80%]"> 
                  <Navbar />
                  <Day_Start/>
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Bank_Statement"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Bank_Statement />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/add_staff"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Add_Staff />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Machine"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Machine />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Client_Cheque"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Client_Cheque />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Oil_Pouches"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Oil_Pouches />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/add_payments_mode"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Add_Mode />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Fuel_Sales"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Sale_Fuels />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Oil_Purchase"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Oil_Purchase />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Generate_Bills"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Generate_Bills />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Add_Bank"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Add_Bank />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Petrol_Decantation"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Petrol_Decantation />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Petrol_Invoice_Feeding"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Petrol_Invoice_Feeding />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Oil_Godown"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Oil_Godown />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/add_client"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Client />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/add_client2"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Client2 />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/add_Credit"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Add_Credit />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/credit_client"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Credit_Client />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/handloans"
          element={
            <>
              <div className="" style={{ display: "flex" }}>
                <div className="">
                  <Sidebar />
                </div>
                <div className="">
                  <Navbar className="fixed"/>
                  <Handloans />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/advances"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Advances />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Daily_Expenses"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Expenses />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Oil_Retail"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Oil_Retail />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Oil_Products"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Oil_Products />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Petrol_Products"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  {/* <Navbar /> */}
                  <Petrol_Products />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/Add_Oil_Pouches"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Add_Oil_Pouches />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/Add_Expenses_Topic"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Add_Expenses_Topic />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/monthlysales"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <MonthlySales />
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/purchasetds"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div className="w-[100%]">
                  {/* <Navbar /> */}
                  <PurchaseTds />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/purchaselfr"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div className="w-[100%]">
                  {/* <Navbar /> */}
                  <PurchaseLfr />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/purchasedecantation"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div className="w-[100%]">
                  {/* <Navbar /> */}
                  <PurchaseDecantation />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/invLfrTds"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div className="w-[100%]">
                  <Navbar />
                  <InvLfrTds />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/dayStartReport"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div className="w-[100%]">
                  {/* <Navbar /> */}
                  <DayStartReport />
                </div>
              </div>
            </>
          }
        />

        <Route
          path="/consolidatedReport"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div className="w-[100%]">
                  {/* <Navbar /> */}
                  <ConsolidatedReport />
                </div>
              </div>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
