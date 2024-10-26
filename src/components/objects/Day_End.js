
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

const DayEndReport = () => {

   const [msRate,setMsRate] = useState(0);
   const [speedRate,setSpeedRate] = useState(0);
   const [hsdRate,setHsdRate] = useState(0);


   const fetchAllRates = () => {
    axios
      .get("https://marvah-server.onrender.com/ms")
      .then((res) => {
        // console.log("res ms", res.data[0]);
        setMsRate(res.data[res.data.length - 2].reading);

      })
      .catch((error) => {
        console.log(error.message);
      });

      axios
      .get("https://marvah-server.onrender.com/speed")
      .then((res) => {
        // console.log("res ms", res.data[0]);
        setSpeedRate(res.data[res.data.length - 2].reading);

      })
      .catch((error) => {
        console.log(error.message);
      });

      axios
      .get("https://marvah-server.onrender.com/hsd")
      .then((res) => {
        // console.log("res ms", res.data[0]);
        setHsdRate(res.data[res.data.length - 2].reading);

      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(()=>{
    fetchAllRates()
  },[]);

  // console.log("msRate",msRate,speedRate,hsdRate);

  function getTodaysDate() {
    const today = new Date();
    //  console.log(today)
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = today.getDate().toString().padStart(2, "0");

    return `${day}-${month}-${year}`;
  }
  getTodaysDate();

  //5.handloan
  const [handloan,setHandloan] = useState([]);

  
  function formatDateString(dateString) {
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()); // Get last two digits of the year

    return `${day}-${month}-${year}`;
  }

  const handleDateConversion = (data) => {
    return data.map(item => ({
      ...item,
      date: formatDateString(item.date)
    }));
  };

  const fetchHandloan = () => {
    axios
      .get("https://marvah-server.onrender.com/handloan")
      .then((res) => {
        const formattedData = handleDateConversion(res.data);
        // setDependency(!dependency)
        setHandloan(formattedData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // console.log("handloan",handloan)

  useEffect(()=>{
    fetchHandloan()
  },[])

  // 6.advances
const [advances,setAdvances] = useState([]);
  const fetchAdvances = () => {
    axios
      .get("https://marvah-server.onrender.com/advances")
      .then((res) => {
        const formattedData = handleDateConversion(res.data);
        // setDependency(!dependency)
        setAdvances(formattedData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // console.log("advances",advances)

  useEffect(()=>{
    fetchHandloan();
    fetchAdvances()
  },[])

//   const today = new Date();
// const formattedToday = today.toLocaleDateString('en-GB').split('/').reverse().join('-');

// // Calculate total amount for today's date
// const totalAmountForToday = advances
//   .filter(transaction => {
//     const transactionDate = new Date(transaction.date).toLocaleDateString('en-GB').split('/').reverse().join('-');
//     return transactionDate === formattedToday;
//   })
//   .reduce((total, transaction) => total + transaction.amount, 0);

// console.log("Total amount for today's date:", totalAmountForToday);
const totalAdvanceAmount =  advances.reduce((total, transaction) => total + transaction.amount, 0);

// advances.reduce((total, transaction) => total + transaction.amount, advances[0]?.amount ?? 0);
  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-center tracking-wide  text-2xl font-bold mb-4">
        DAY END
      </h2>

<div className="text-2xl ">
  DATE : {getTodaysDate()}
</div>
      <div className="flex justify-between text-black w-[90%] ml-4">
        {/* Left Table */}
        <table className="w-1/2 border-r border-gray-700">
          <thead className="font-bold">
            <tr className="bg-green-700 text-lg">
              <th className="py-2 text-center"></th>

              <th className="py-2 text-left">Particulars</th>
              <th className="py-2 text-center">Rate</th>
              <th className="py-2 text-center">Litres</th>
              <th className="py-2 text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">1.</td>
              <td className="py-2 border-b border-gray-700 text-left">MS:</td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                  value={msRate}
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">2.</td>
              <td className="py-2 border-b border-gray-700 text-left">
                SPEED:-
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                  value={speedRate}
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>{" "}
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">3.</td>
              <td className="py-2 border-b border-gray-700  text-left">HSD:</td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                  value={hsdRate}
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">4.</td>
              <td className="py-2 border-b border-gray-700  text-left">OILS</td>
              <td className="py-2 border-b border-gray-700 text-center"></td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>{" "}
              <td className="py-2 border-b border-gray-700 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">5.</td>
              <td className="py-2 border-b border-gray-700  text-left uppercase">
              Handloan (Credit In) <br />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <span>
               
                </span>
              </td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 border-blue-500 text-center"
                  type="number"
                  value={handloan[0]?.amount}
                />
              </td>{" "}
              <td className="py-2 border-b border-gray-700 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">6.</td>
              <td className="py-2 border-b border-gray-700  text-left uppercase">
                Advances 
              </td>
              <td className="py-2 border-b border-gray-700 text-center"></td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 border-blue-500 text-center"
                  type="number"
                  // // value={
                  // [0]?.amount}
                  value={totalAdvanceAmount}
            
                />
              </td>{" "}
              <td className="py-2 border-b border-gray-700 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 border-t border-gray-700 font-bold text-center">
                TOTAL
              </td>
              <td className="py-2 border-t border-gray-700 font-bold text-center"></td>
              <td className="py-2 border-t border-gray-700 font-bold text-center"></td>
              <td className="py-2 border-t border-gray-700 font-bold text-center"></td>

              <td className="py-2 border-t border-gray-700 font-bold text-center">
                <input
                  className="w-24 border-4 border-blue-500"
                  type="number"
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Right Table */}
        <table className="w-1/2 border-r border-gray-700">
          <thead className="font-bold">
            <tr className="bg-red-700 text-lg">
              <th className="py-2 text-center"></th>

              <th className="py-2 text-left">Particulars</th>
              <th className="py-2 text-center">Acc. No.</th>
              <th></th>
              {/* <th className="py-2 text-center">Litres</th> */}
              <th className="py-2 text-center">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">1.</td>
              <td className="py-2 border-b border-gray-700 text-left">       BANK DEPOSIT</td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                {/* <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                /> */}
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">2.</td>
              <td className="py-2 border-b border-gray-700 text-left">
              TOTAL POS CARD
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                {/* <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                /> */}
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                {/* <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                /> */}
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>{" "}
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">3.</td>
              <td className="py-2 border-b border-gray-700  text-left">  TOTAL PETRO CARD</td>
              <td className="py-2 border-b border-gray-700 text-center">
                {/* <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                /> */}
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                {/* <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                /> */}
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">4.</td>
              <td className="py-2 border-b border-gray-700  text-left">  CREDIT SALE</td>
              <td className="py-2 border-b border-gray-700 text-center"></td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                />
              </td>{" "}
              <td className="py-2 border-b border-gray-700 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">5.</td>
              <td className="py-2 border-b border-gray-700  text-left uppercase">
              Handloan (Debit out)  <br />

              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <span>
               
                </span>
              </td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 border-blue-500 text-center"
                  type="number"
                  value={handloan[1]?.amount}
                />
              </td>{" "}
              <td className="py-2 border-b border-gray-700 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">6.</td>
              <td className="py-2 border-b border-gray-700  text-left uppercase">
              Other Expenses
              </td>
              <td className="py-2 border-b border-gray-700 text-center"></td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 border-blue-500"
                  type="number"
                />
              </td>{" "}
              <td className="py-2 border-b border-gray-700 text-center"></td>
            </tr>
            <tr>
              <td className="py-2 border-t border-gray-700 font-bold text-center">
                TOTAL
              </td>
              <td className="py-2 border-t border-gray-700 font-bold text-center"></td>
              <td className="py-2 border-t border-gray-700 font-bold text-center"></td>
              <td className="py-2 border-t border-gray-700 font-bold text-center"></td>

              <td className="py-2 border-t border-gray-700 font-bold text-center">
                <input
                  className="w-24 border-4 border-blue-500"
                  type="number"
                />
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default DayEndReport;
