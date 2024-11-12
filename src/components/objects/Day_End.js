import axios from "axios";
// import moment from "moment";
import React, { useEffect, useState } from "react";

const DayEndReport = () => {
  const [msRate, setMsRate] = useState(0);
  const [speedRate, setSpeedRate] = useState(0);
  const [hsdRate, setHsdRate] = useState(0);

  const [handloanTodayTotal, setHandloanTodayTotal] = useState(0);
  const [todaysDebitOutTotal, setHandloanDebitOutTotal] = useState(0);

  const [fuelsaleData,setFuelSaledata] = useState([]);


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

  useEffect(() => {
    fetchAllRates();
  }, []);

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
  const [handloan, setHandloan] = useState([]);

  function formatDateString(dateString) {
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()); // Get last two digits of the year

    return `${day}-${month}-${year}`;
  }

  const handleDateConversion = (data) => {
    return data.map((item) => ({
      ...item,
      date: formatDateString(item.date),
    }));
  };

  function getTodaysDateString() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const fetchHandloan = () => {
    const today = new Date().toISOString().split("T")[0]; // Formats today's date as yyyy-MM-dd

    axios
      .get("https://marvah-server.onrender.com/handloan")
      .then((res) => {
        const todaysCreditInTotal = res.data
          .filter(
            (item) =>
              item.voucher_type === "Credit-In" &&
              new Date(item.date).toISOString().split("T")[0] === today // Compares date part only
          )
          .reduce((sum, item) => sum + item.amount, 0);

        setHandloanTodayTotal(todaysCreditInTotal);
      })
      .catch((error) => console.log(error.message));
  };

  const fetchHandloanDebitOutTotal = () => {
    const today = new Date().toISOString().split("T")[0]; // Formats today's date as yyyy-MM-dd

    axios
      .get("https://marvah-server.onrender.com/handloan")
      .then((res) => {
        const todaysDebitOutTotal = res.data
          .filter(
            (item) =>
              item.voucher_type === "Debit-Out" &&
              new Date(item.date).toISOString().split("T")[0] === today // Compares date part only
          )
          .reduce((sum, item) => sum + item.amount, 0);

        setHandloanDebitOutTotal(todaysDebitOutTotal);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchAllRates();
    fetchHandloan();
    fetchHandloanDebitOutTotal();
  }, []);

  // console.log(handloanTodayTotal, todaysDebitOutTotal);
  // 6.advances
  const [advances, setAdvances] = useState([]);
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

  // console.log("advances",advances);

  const [todaysAdvancesTotal, setTodaysAdvancesTotal] = useState(0);

  const fetchTodaysAdvancesTotal = () => {
    const today = new Date().toISOString().split("T")[0]; // Formats today's date as yyyy-MM-dd

    axios
      .get("https://marvah-server.onrender.com/advances")
      .then((res) => {
        const todaysTotal = res.data
          .filter(
            (item) => new Date(item.date).toISOString().split("T")[0] === today // Checks if date matches today
          )
          .reduce((sum, item) => sum + item.amount, 0); // Sums amounts for today's entries

        setTodaysAdvancesTotal(todaysTotal); // Sets total for today's advances
      })
      .catch((error) => console.log(error.message));
  };

  // Then call fetchTodaysAdvancesTotal in useEffect or wherever needed.

const fetchFuelSales = ()=>{

  try {
    axios.get("https://marvah-server.onrender.com/fuelsales").
    then((res)=>{
       setFuelSaledata(res.data.fuelSales)
    })
  } catch (error) {
    console.log(error);
  }

}

  useEffect(() => {
    fetchHandloan();
    fetchAdvances();
    fetchTodaysAdvancesTotal();
    fetchFuelSales();
    // getTodayFuelSales()
  }, []);
console.log("fuelsaleData",fuelsaleData);

function getTodayFuelSales(fuelSales) {
  // Get today's date in yyyy-mm-dd format
  const today = new Date();
  const todayDate = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

  // Initialize totals for each fuel type
  const salesTotals = {
    MS: { saleActTotal: 0, totalAmount: 0 },
    SP: { saleActTotal: 0, totalAmount: 0 },
    HSD: { saleActTotal: 0, totalAmount: 0 }
  };

  // Loop through each sale entry
  fuelSales.forEach((sale) => {
    // Extract date without time for comparison
    const saleDate = new Date(sale.date);
    const formattedSaleDate = saleDate.getFullYear() + '-' + String(saleDate.getMonth() + 1).padStart(2, '0') + '-' + String(saleDate.getDate()).padStart(2, '0');

    if (formattedSaleDate === todayDate) {
      // Determine the fuel type based on nozzleProduct
      if (sale.nozzleProduct.includes('MS') && !sale.nozzleProduct.includes('(SP)')) {
        salesTotals.MS.saleActTotal += sale.saleActTotal;
        salesTotals.MS.totalAmount += sale.totalAmount;
      } else if (sale.nozzleProduct.includes('(SP)')) {
        salesTotals.SP.saleActTotal += sale.saleActTotal;
        salesTotals.SP.totalAmount += sale.totalAmount;
      } else if (sale.nozzleProduct.includes('HSD')) {
        salesTotals.HSD.saleActTotal += sale.saleActTotal;
        salesTotals.HSD.totalAmount += sale.totalAmount;
      }
    }
  });

  return salesTotals;
}

// Example usage with your data





  const todayFuelSales = getTodayFuelSales(fuelsaleData);
  console.log("todayFuelSales", todayFuelSales);
  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-center tracking-wide  text-2xl font-bold mb-4">
        DAY END
      </h2>

      <div className="text-2xl ">DATE : {getTodaysDate()}</div>
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
                  value={fuelsaleData[0]?.saleActTotal}
                  
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                  value={fuelsaleData[0]?.totalAmount}
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
                  value={fuelsaleData[6]?.saleActTotal}
                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                  value={fuelsaleData[7]?.totalAmount}
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
                  value={fuelsaleData[13]?.saleActTotal}

                />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 text-center border-blue-500"
                  type="number"
                  value={fuelsaleData[13]?.totalAmount}

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
                <span></span>
              </td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 border-blue-500 text-center"
                  type="number"
                  value={handloanTodayTotal}
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
                  value={todaysAdvancesTotal}
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
              <td className="py-2 border-b border-gray-700 text-left">
                {" "}
                BANK DEPOSIT
              </td>
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
              <td className="py-2 border-b border-gray-700  text-left">
                {" "}
                TOTAL PETRO CARD
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
              </td>
            </tr>
            <tr>
              <td className="py-2 border-b border-gray-700 text-center">4.</td>
              <td className="py-2 border-b border-gray-700  text-left">
                {" "}
                CREDIT SALE
              </td>
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
                Handloan (Debit out) <br />
              </td>
              <td className="py-2 border-b border-gray-700 text-center">
                <span></span>
              </td>
              <td className="py-2 border-b border-gray-700 text-center"></td>{" "}
              <td className="py-2 border-b border-gray-700 text-center">
                <input
                  className="w-24 border-4 border-blue-500 text-center"
                  type="number"
                  value={todaysDebitOutTotal}
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
