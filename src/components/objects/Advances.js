import React, { useState, useEffect } from "react";
import "../css/Tank.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Handloans({ dbpath1 }) {
  const [handloan, setHandloan] = useState([]);

  const [clients, setClients] = useState([]);
  const [partyname, setPartyname] = useState("");
  const [voucher_type, setVoucher_type] = useState("");
  const [amount, setAmount] = useState(0);
  const [narration, setNarration] = useState("");
  const [balance, setBalance] = useState("0");
  const [partyId, setPartyId] = useState("");
  const navigate = useNavigate();
  const [dependency,setDependency] = useState(false)

  const [ddmmyy, setDdmmyy] = useState("")

  const [todaysTransactions, setTodaysTransactions] = useState([]);

  const todayDate = new Date();


  const fetchClient = () => {
    axios
      .get("http://localhost:4000/client")
      .then((res) => {
        console.log(" client res", res.data);
        // setDependency(!dependency)
        setClients(res.data);
        setPartyId(res.data[0]._id);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // console.log(" client res", partyId);

  const fetchHandloan = () => {
    axios
      .get("http://localhost:4000/advances")
      .then((res) => {
        const formattedData = handleDateConversion(res.data);
        // setDependency(!dependency)
        setHandloan(formattedData);
        console.log("resssss",res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  const handleSave = () => {
    const newTransaction = {
      party_name: partyname,
      voucher_type: voucher_type,
      amount: amount,
      narration: narration,
      party_id: partyId,
      // date: new Date().toISOString()
    };
    // console.log("newTransaction", newTransaction);
    axios
      .post("http://localhost:4000/advances/create", { ...newTransaction })
      .then((res) => {
        if (res.data.success) {
          alert(res.data.msg);
          fetchClient();
          fetchHandloan();
          setHandloan([]);
          setDependency(!dependency)
          setPartyname("");
          setVoucher_type("");
          setAmount("");
          setNarration("");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  function formatDateString(dateString) {
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()); // Get last two digits of the year

    return `${day}-${month}-${year}`;
  }

  function getTodaysDate() {
    const today = new Date();

    // Extract day, month, and year
    let day = String(today.getDate());
    // .padStart(0, '0');
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = today.getFullYear(); // Full year

    if (day==1 || day==2 || day==3 || day==4 || day==5 || day==6 || day==7 || day==8 || day==9 ) {
      day = "0"+day
    }

    return `${day}-${month}-${year}`;
  }

  // Example usage
  const todaysDate = getTodaysDate();
  // console.log(
  //   formatDateString("Wed Jul 24 2024 08:31:55 GMT+0530 (India Standard Time)")
  // );

  const fetchTodaysTransactions = () => {
    // const todayDate = new Date().toISOString().slice(0, 10);
    axios
      .get("http://localhost:4000/advances")
      .then((res) => {
        console.log(" today's transactions", res.data);
        // setDependency(!dependency)

        const formattedData = handleDateConversion(res.data);
        setTodaysTransactions(formattedData);
        setDdmmyy(res.data[10].date)
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  console.log("ddmmyy", formatDateString(ddmmyy))


  const handleDateConversion = (data) => {
    return data.map(item => ({
      ...item,
      date: formatDateString(item.date)
    }));
  };

  useEffect(() => {
    fetchClient();
    fetchHandloan();
    fetchTodaysTransactions();
    // handleSave();
  }, [dependency]);

  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 mb-4 p-2 text-3xl font-bold uppercase text-center">
          Advances
        </h2>
        <div className="flex justify-between mb-4 mt-3">
          <span className="text-2xl"> Date :{todaysDate}</span>
          {/* <span className="font-bold">
            Balance : <span className="bg-yellow-300"> {balance} </span>
          </span> */}
          <div>
            <span>
              <Link
                className="bg-green-700 px-2 mr-3 py-1 rounded-md text-white"
                to={"/add_client"}
              >
                Add Client
              </Link>
            </span>
            {/* <span>
              <Link className=" px-2 bg-yellow-900 py-1 rounded-md text-white">
                History
              </Link>
            </span> */}
          </div>
        </div>
        <table className="w-[100%]">
          <thead className="px-2 py-3 w-[100%]">
            <tr className="bg-[#3A1078] w-[100%] text-white text-center">
              <th className="px-2 py-2">Party Name</th>
              <th className="">Voucher Type</th>
              <th className="">Amount</th>
              <th className="">Narration</th>
              <th className="">Action</th>
            </tr>
          </thead>
          <tbody className="">
            <tr className="handloan-tr">
              <td>
                <select
                  className="form-select editableInput bigFontWeight w-48"
                  value={partyname}
                  onChange={(e) => setPartyname(e.target.value)}
                >
                  <option selected>-Select Party -</option>
                  {clients.sort((a, b) => {
                    if (a.party_name.toLowerCase() < b.party_name.toLowerCase()) {
                      return -1;
                    }
                    if (a.party_name.toLowerCase() > b.party_name.toLowerCase()) {
                      return 1;
                    }
                    return 0;
                  }).map((rest) => (
                    <option value={rest.party_name} key={rest._id}>
                      {rest.party_name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  className="form-select editableInput bigFontWeight w-48"
                  aria-label="Default select example"
                  value={voucher_type}
                  onChange={(e) => setVoucher_type(e.target.value)}
                >
                  <option selected> -</option>
                  <option value="Debit-Out">Advance</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  className="form-control editableInput bigFontWeight bg-blue-300 w-48"
                  value={amount || ""}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control editableInput bigFontWeight w-96"
                  value={narration}
                  onChange={(e) => setNarration(e.target.value)}
                />
              </td>
              <td>
                <button
                  onClick={handleSave}
                  type="button"
                  className="btn btn-primary"
                >
                  SAVE
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <h2 className="text-center text-green-500 text-xl p-2 font-bold">
          Today's Transactions
        </h2>
        <br />

        <table className="w-[90%] border-2">
          <thead className="">
            <tr className="bg-[#3A1078] text-center text-white  border-2 border-grey-200">
              {/* <th className="tablebg">Sr No.</th> */}
              <th className="bg-[#3A1078] px-1 py-2">Party Name</th>
              <th className="py-2 w-32">Advances</th>
     
              <th className="py-2">Narration</th>
            </tr>
          </thead>
          <tbody>

            {
              todaysTransactions.map((transaction, index) => (

                (todaysDate === transaction.date) && (<tr className="hovereffect text-center" key={index}>
                  {/* <td>{index + 1}</td> */}
                  <td className="p-2 border-2 border-grey-200">{transaction.party_name}</td>
                  <td className="p-2 border-2 border-grey-200">
                    {transaction.voucher_type === "Debit-Out"
                      ? transaction.amount
                      : "-"}
                  </td>
           
                  <td className="p-2 border-2 border-grey-200">{transaction.narration}</td>
                </tr>)



              ))
            }
          </tbody>
        </table>

        <br />
        <h2 className="text-center text-green-500 text-xl p-2 font-bold">
          Client's Transaction History
        </h2>
        <br />
        <h1 className=" px-2 py-1 text-xl ">Party Name : {partyname}</h1>
        <br />
        <table className="w-[90%] border-2">
          <thead className="items-center p-2">
          <tr className="bg-[#3A1078] hovereffect text-center p-2 text-white  border-2 border-grey-200">
          <th className="items-center p-2" >Sr No.</th>
              <th className="items-center">Date</th>
              {/* <th className="tablebg">Voucher-Type</th> */}
              <th className="">Debit- Out</th>
              <th className="">Credit-In</th>
              {/* <th className="tablebg">Balance</th> */}
              <th className="">Narration</th>
            </tr>
          </thead>
          <tbody>
            {handloan
              .filter((client) => client.party_name === partyname)
              .map((client, index) => (
                <tr className="hovereffect text-center" key={index}>
                  <td className="p-2 border-2 border-grey-200">{index + 1}</td>
                  <td>{client?.date}</td>
                  {/* <td>{client.voucher_type}</td> */}
                  <td className="p-2 border-2 border-grey-200">
                    {client.voucher_type === "Debit-Out" ? client.amount : "-"}
                  </td>
                  <td className="p-2 border-2 border-grey-200">
                    {client.voucher_type === "Credit-In" ? client.amount : "-"}
                  </td>
                  {/* <td>{balance}</td> */}
                  <td className="p-2 border-2 border-grey-200">{client.narration}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}



