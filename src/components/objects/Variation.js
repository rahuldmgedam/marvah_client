// gagan 5th aug
// import React, { useState, useEffect } from "react";
// import "../css/Tank.css";
// import axios from "axios";
// import toast from "react-hot-toast";

// export default function Variation() {
//   // State variables
//   const [totalVariation, setTotalVariation] = useState([]); // Store total variation data
//   const [openStocks, setOpenStocks] = useState([]); // Store open stock data

//   const [msTank1, setMsTank1] = useState(null);
//   const [speedTank2, setSpeedTank2] = useState(null);
//   const [hsdTank3, setHsdTank3] = useState(null);

//   const [receipts, setReceipts] = useState([10000,5000]); // Store receipt data

//   const [actualBalances, setActualBalances] = useState([null, null, null]); // Store actual balance data
//   const [currentDate, setCurrentDate] = useState(""); // Store current date

//   const [invNo,setInvNo] = useState(0);

//   // Sales data for different products
//   const Ms = { actualSale: 4326 };
//   const Ms2 = { actualSale: 2047 };
//   const HSD = { actualSale: 2269 };

//   const allReceipts = () => {
//     setReceipts(...receipts);
//   };

//   // Fetch total variation data on component mount
//   useEffect(() => {
//     axios
//       .get("https://marvah-server.onrender.com/variation")
//       .then((response) => {
//         setTotalVariation(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the variations!", error);
//       });
//   }, []);

//   // console.log(
//   //   "msTank1",
//   //   msTank1,
//   //   "speedTank2",
//   //   speedTank2,
//   //   "hsdTank3",
//   //   hsdTank3
//   // );

//   const fetchReceipts = () => {
//     axios
//       .get("https://marvah-server.onrender.com/petroldecantation")
//       .then((response) => {
//         // setReceipts(response?.data);
//         setMsTank1(response.data[0]?.tank1 * 1000);
//         setSpeedTank2(response.data[0]?.tank2 * 1000);
//         setHsdTank3(response.data[0]?.tank3 * 1000);
//         setInvNo(response.data?.[0] )
//       });
//   };

//   useEffect(() => {
//     fetchReceipts();
//   }, []);
//   // console.log("fetchReceipts", receipts);

//   // Fetch open stock data and set current date on component mount
//   useEffect(() => {
//     axios
//       .get("https://marvah-server.onrender.com/tank")
//       .then((response) => {
//         setOpenStocks(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching open stocks!", error);
//       });

//     // Set the current date
//     const today = new Date();
//     const date =
//       (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
//       "/" +
//       (today.getMonth() + 1 < 10
//         ? "0" + (today.getMonth() + 1)
//         : today.getMonth() + 1) +
//       "/" +
//       today.getFullYear();
//     setCurrentDate(date);
//   }, []);

//   // Handle change in actual balance input
//   const handleActualBalanceChange = (e, index) => {
//     const newBalances = [...actualBalances];
//     newBalances[index] = e.target.value;
//     setActualBalances(newBalances);
//   };

//   // Calculate total stock
//   const calculateTotalStock = (receipt, openStock) => {
//     return receipt + openStock;
//   };

//   // Calculate variation
//   const calculateVariation = (actualBalance, balanceStock) => {
//     return actualBalance - balanceStock;
//   };

//   // Handle save button click
//   const handleSave = () => {
//     // Prepare data to save
//     const dataToSave = openStocks.map((item, index) => {
//       const receipt = receipts[index] || 0;
//       const actualSale =
//         index === 0
//           ? Ms.actualSale
//           : index === 1
//           ? Ms2.actualSale
//           : HSD.actualSale;
//       const totalStock = calculateTotalStock(receipt, item.opStock);
//       const balanceStock = totalStock - actualSale;
//       const actualBalance = actualBalances[index];
//       const variationValue = calculateVariation(actualBalance, balanceStock);
//       const tVariation =
//         totalVariation[totalVariation.length - 3 + index]?.tVariation +
//         variationValue;

//       return {
//         product: item.product,
//         openStock: item.opStock,
//         receipt: receipt,
//         totalStock: totalStock,
//         actualSale: actualSale,
//         balanceStock: balanceStock,
//         actualBalance: actualBalance,
//         variation: variationValue,
//         tVariation: tVariation,
//       };
//     });

//     // Post data to the server
//     axios
//       .post("https://marvah-server.onrender.com/variation/create", dataToSave)
//       .then((response) => {
//         console.log(response.data);
//         if (response.statusText === "OK" || response.status === 200) {
//           toast.success(response.data);
//         }
//       })
//       .catch((error) => {
//         console.error("There was an error saving the data!", error);
//         if (error) {
//           toast.error("All fields are required");
//         }
//       });
//   };

//   return (
//     <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
//       <h2 className="mt-3 text-center text-blue-500 font-bold uppercase text-2xl">
//         Variation
//       </h2>
//       <span style={{ fontSize: "22px" }}> Date: {currentDate} </span>
//       <br />
//       <table className="table">
//         <thead>
//           <tr className="table-secondary">
//             <th className="tablebg">Product</th>
//             <th className="tablebg">Open. STK</th>
//             <th className="tablebg">Purchase(+)</th>
//             <th className="tablebg">Total Stk(=)</th>
//             <th className="tablebg">A. Sale(-)</th>
//             <th className="tablebg">Bal. STK(=)</th>
//             <th className="tablebg text-center">Actual Bal. Stk(-)</th>
//             <th className="tablebg text-center">Variation on date (=)</th>
//             <th className="tablebg text-center">Total.Variation (-/+)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {openStocks.map((item, index) => {
//             const receipt = receipts[index] || 0;
//             const totalStock = calculateTotalStock(receipt, item.opStock);
//             const balanceStock =
//               totalStock -
//               (index === 0
//                 ? Ms.actualSale
//                 : index === 1
//                 ? Ms2.actualSale
//                 : HSD.actualSale);
//             const actualBalance = actualBalances[index];
//             const variationValue = calculateVariation(
//               actualBalance,
//               balanceStock
//             );
//             const tVariation =
//               totalVariation[totalVariation.length - 3 + index]?.tVariation +
//               variationValue;
//             return (
//               <tr key={index}>
//                 <td className="bigFontWeight">{item.product}</td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control bigFontWeight"
//                     value={item.opStock}
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control bigFontWeight"
//                     value={receipt}
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control bigFontWeight"
//                     value={totalStock}
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control bigFontWeight"
//                     value={
//                       index === 0
//                         ? Ms.actualSale
//                         : index === 1
//                         ? Ms2.actualSale
//                         : HSD.actualSale
//                     }
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control bigFontWeight"
//                     value={balanceStock}
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control bigFontWeight editableInput"
//                     value={actualBalance}
//                     placeholder="Actual Bal Stk."
//                     onChange={(e) => handleActualBalanceChange(e, index)}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     // className="form-control bigFontWeight"
//                     className={`${
//                       (variationValue) >= 0
//                         ? "form-control bigFontWeight text-center"
//                         : "text-red-500 text-center"
//                     }`}
//                     style={{ width: "112px" }}
//                     value={variationValue}
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control bigFontWeight"
//                     style={{ width: "112px" }}
//                     value={tVariation}
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//       <button
//         type="button"
//         style={{ height: "30px", paddingTop: "2px", marginLeft: "90%" }}
//         className="btn btn-primary"
//         onClick={handleSave}
//       >
//         Save
//       </button>
//       <br />
//       <br />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "../css/Tank.css";
import axios from "axios";
import toast from "react-hot-toast";

export default function Variation() {
  // State variables
  const [totalVariation, setTotalVariation] = useState([]); // Store total variation data
  const [openStocks, setOpenStocks] = useState([]); // Store open stock data

  const [msTank1Decant, setMsTank1Decant] = useState(null);
  const [speedTank2Decant, setSpeedTank2Decant] = useState(null);
  const [hsdTank3Decant, setHsdTank3Decant] = useState(null);

  const [receipts, setReceipts] = useState([msTank1Decant,speedTank2Decant,hsdTank3Decant]); // Store receipt data

  const [actualBalances, setActualBalances] = useState([null, null, null]); // Store actual balance data
  const [currentDate, setCurrentDate] = useState(""); // Store current date

  const [invoiceNumbers, setInvoiceNumbers] = useState([]);

  const [fuelSaleReadings,setFuelSaleReadings] = useState([])

  const fetchInvoiceNumbers = async () =>{
    try {
      const response = await axios.get('https://marvah-server.onrender.com/petrolInvoiceFeeding')
      if(response.data.success && response.data.petrolInvoice.length > 0){
        setInvoiceNumbers(response.data.petrolInvoice[0].invoiceNumber)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const fetchFuelSales =async ()=>{
    try {
      const response = await axios.get('https://marvah-server.onrender.com/fuelsales')
      if(response.data){
        setFuelSaleReadings(response.data.fuelSales)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // console.log(fuelSaleReadings);
  
   
  useEffect(() => {
    fetchFuelSales();
      
  }, []);



function getSaleActTotalsArray(data) {
    const totals = {
        MS1: null,
        MS2: null,
        HSD: null
    };

    data.forEach((item) => {
        const product = item.nozzleProduct;

        if (product.includes("MS-1") && totals.MS1 === null) {
            totals.MS1 = item.saleActTotal;
        } else if (product.includes("MS-2") && totals.MS2 === null) {
            totals.MS2 = item.saleActTotal;
        } else if (product.includes("HSD") && totals.HSD === null) {
            totals.HSD = item.saleActTotal;
        }
    });

    return [totals.MS1, totals.MS2, totals.HSD];
}

const saleActTotalsArray = getSaleActTotalsArray(fuelSaleReadings);

// console.log("SaleActTotal Array:", saleActTotalsArray);

  const [invNo,setInvNo] = useState(0);

  // Sales data for different products
  const Ms =  saleActTotalsArray[0];
  const Ms2 =  saleActTotalsArray[1] ;
  const HSD =  saleActTotalsArray[2];
// console.log(Ms,Ms2,HSD)
  const allReceipts = () => {
    setReceipts([msTank1Decant,speedTank2Decant,hsdTank3Decant]);
  };

  // Fetch total variation data on component mount
  useEffect(() => {
    axios
      .get("https://marvah-server.onrender.com/variation")
      .then((response) => {
        setTotalVariation(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the variations!", error);
      });
      fetchInvoiceNumbers();
      
  }, []);



  const fetchReceipts = () => {
    axios
      .get("https://marvah-server.onrender.com/petroldecantation")
      .then((response) => {
       
        setMsTank1Decant(response.data[0]?.tank1 * 1000);
        setSpeedTank2Decant(response.data[0]?.tank2 * 1000);
        setHsdTank3Decant(response.data[0]?.tank3 * 1000);
        setInvNo(response.data?.[0] );
        // setReceipts(11,22,33);

        // setReceipts(response?.data[0].mskl);
      });
  };
  useEffect(() => {
    fetchReceipts();
      allReceipts()
  }, []);
  // console.log("fetchReceipts", receipts);

  // Fetch open stock data and set current date on component mount
  useEffect(() => {
    axios
      .get("https://marvah-server.onrender.com/tank")
      .then((response) => {
        setOpenStocks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching open stocks!", error);
      });

    // Set the current date
    const today = new Date();
    const date =
      (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
      "/" +
      (today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    setCurrentDate(date);
  }, []);

  // Handle change in actual balance input
  const handleActualBalanceChange = (e, index) => {
    const newBalances = [...actualBalances];
    newBalances[index] = e.target.value;
    setActualBalances(newBalances);
  };

  // Calculate total stock
  const calculateTotalStock = (receipt, openStock) => {
    return receipt + openStock;
  };

  // Calculate variation
  const calculateVariation = (actualBalance, balanceStock) => {
    return actualBalance - balanceStock;
  };

  // console.log("calculateVariation",calculateVariation);
  // Handle save button click
  // const handleSave = () => {
  //   // Prepare data to save
  //   const dataToSave = openStocks.map((item, index) => {
  //     const receipt = receipts[index] || 0;
  //     const actualSale =
  //       index === 0
  //         ? Ms.actualSale
  //         : index === 1
  //         ? Ms2.actualSale
  //         : HSD.actualSale;
  //     const totalStock = calculateTotalStock(receipt, item.opStock);
  //     const balanceStock = totalStock - actualSale;
  //     const actualBalance = actualBalances[index];
  //     const variationValue = calculateVariation(actualBalance, balanceStock);
  //     const tVariation =
  //       totalVariation[totalVariation.length - 3 + index]?.tVariation +
  //       variationValue;

  //     return {
  //       product: item.product,
  //       openStock: item.opStock,
  //       receipt: receipt,
  //       totalStock: totalStock,
  //       actualSale: actualSale,
  //       balanceStock: balanceStock,
  //       actualBalance: actualBalance,
  //       variation: variationValue,
  //       tVariation: tVariation,
  //     };
  //   });

  //   // Post data to the server
  //   axios
  //     .post("https://marvah-server.onrender.com/variation/create", dataToSave)
  //     .then((response) => {
  //       console.log(response.data);
  //       if (response.statusText === "OK" || response.status === 200) {
  //         toast.success(response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("There was an error saving the data!", error);
  //       if (error) {
  //         toast.error("All fields are required");
  //       }
  //     });
  // };
  const handleSave = async () => {
    try {
      // Prepare data to save
      const dataToSave = openStocks.map((item, index) => {
        const receipt = receipts[index] || 0;
        const actualSale =
          index === 0
            ? Ms || 0
            : index === 1
            ? Ms2 || 0
            : HSD || 0;
        const totalStock = calculateTotalStock(receipt, item.opStock || 0);
        const balanceStock = totalStock - actualSale;
        const actualBalance = actualBalances[index] || 0;
        const variationValue = calculateVariation(actualBalance, balanceStock);
        const tVariation =
          (totalVariation[totalVariation.length - 3 + index]?.tVariation || 0) +
          variationValue;
  
        return {
          product: item.product,
          openStock: item.opStock || 0,
          receipt: receipt,
          totalStock: totalStock,
          actualSale: actualSale,
          balanceStock: balanceStock,
          actualBalance: actualBalance,
          variation: variationValue,
          tVariation: tVariation,
        };
      });
      // https://marvah-server.onrender.com
      // POST data to the server
      const response = await axios.post(
        "http://localhost:4000/variation/create",
        dataToSave
      );
  
      if (response.status === 201) {
        toast.success("Variation data saved successfully");
      } else {
        toast.error("Failed to save variation data");
      }
    } catch (error) {
      console.error("There was an error saving the data!", error);
      toast.error("All fields are required");
    }
  };
  
  console.log("allReceipts",allReceipts);
  console.log("receipts",receipts)
  
  
  return (
    <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
      <h2 className="mt-3 text-center text-blue-500 font-bold uppercase text-2xl">
        Variation
      </h2>
      <span style={{ fontSize: "22px" }}> Date: {currentDate} </span>
      <p className="text-xl">Invoice Number:- {invoiceNumbers}</p>
      <br />
      <table className="table">
        <thead>
          <tr className="text-center">
            <th className="tablebg">Product</th>
            <th className="tablebg">Open. <br /> STK</th>
            <th className="tablebg">Purchase <br />(+)</th>
            <th className="tablebg">Total Stk <br />(=)</th>
            <th className="tablebg">A. Sale <br />(-)</th>
            <th className="tablebg">Bal. STK <br />(=)</th>
            <th className="tablebg text-center">Actual Bal.Stk <br />(-)</th>
            <th className="tablebg text-center">Variation on date <br /> (=)</th>
            <th className="tablebg text-center">Total.Variation <br /> (-/+)</th>
          </tr>
        </thead>
        {/* <tbody>
          {openStocks?.map((item, index) => {
            const receipt = receipts[index] || 0;
            const totalStock = calculateTotalStock(receipt, item.opStock);
            const balanceStock =
              totalStock -
              (index === 0
                ? Ms.actualSale
                : index === 1
                ? Ms2.actualSale
                : HSD.actualSale);
            const actualBalance = actualBalances[index];
            const variationValue = calculateVariation(
              actualBalance,
              balanceStock
            );
            const tVariation =
              totalVariation[totalVariation.length - 3 + index]?.tVariation +
              variationValue;
            return (
              <tr key={index}>
                <td className="bigFontWeight">{item.product}</td>
                <td>
                  <input
                    type="text"
                    className="form-control bigFontWeight"
                    value={item.opStock}
                    placeholder="Loading.."
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control bigFontWeight"
                    value={receipt}
                    placeholder="Loading.."
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control bigFontWeight"
                    value={totalStock}
                    placeholder="Loading.."
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control bigFontWeight"
                    value={
                      index === 0
                        ? Ms
                        : index === 1
                        ? Ms2
                        : HSD
                    }
                    placeholder="Loading.."
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control bigFontWeight"
                    value={balanceStock}
                    placeholder="Loading.."
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control bigFontWeight editableInput"
                    value={actualBalance}
                    placeholder="Actual Bal Stk."
                    onChange={(e) => handleActualBalanceChange(e, index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    // className="form-control bigFontWeight"
                    className={`${
                      (variationValue) >= 0
                        ? "form-control bigFontWeight text-center"
                        : "text-red-500 text-center"
                    }`}
                    style={{ width: "112px" }}
                    value={variationValue}
                    placeholder="Loading.."
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control bigFontWeight"
                    style={{ width: "112px" }}
                    value={tVariation}
                    placeholder="Loading.."
                    disabled
                  />
                </td>
              </tr>
            );
          })}
        </tbody> */}
        <tbody>
  {openStocks?.map((item, index) => {
    const receipt = receipts[index] || 0;
    const totalStock = calculateTotalStock(receipt, item.opStock || 0);
    const actualSale = index === 0 ? Ms || 0 : index === 1 ? Ms2 || 0 : HSD || 0;
    const balanceStock = totalStock - actualSale;
    const actualBalance = actualBalances[index] || 0;
    const variationValue = calculateVariation(actualBalance, balanceStock);
    const tVariation =
      (totalVariation[totalVariation.length - 3 + index]?.tVariation || 0) +
      variationValue;

    return (
      <tr key={index}>
        <td className="bigFontWeight">{item.product}</td>
        <td>
          <input
            type="text"
            className="form-control bigFontWeight"
            value={item.opStock || 0}
            placeholder="Loading.."
            disabled
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control bigFontWeight"
            value={receipt}
            placeholder="Loading.."
            disabled
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control bigFontWeight"
            value={totalStock}
            placeholder="Loading.."
            disabled
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control bigFontWeight"
            value={actualSale}
            placeholder="Loading.."
            disabled
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control bigFontWeight"
            value={balanceStock}
            placeholder="Loading.."
            disabled
          />
        </td>
        <td>
          <input
            type="number"
            className="form-control bigFontWeight editableInput"
            value={actualBalance}
            placeholder="Actual Bal Stk."
            onChange={(e) => handleActualBalanceChange(e, index)}
          />
        </td>
        <td>
          <input
            type="text"
            className={`${
              variationValue >= 0
                ? "form-control bigFontWeight text-center"
                : "text-red-500 text-center"
            }`}
            style={{ width: "112px" }}
            value={variationValue}
            placeholder="Loading.."
            disabled
          />
        </td>
        <td>
          <input
            type="text"
            className="form-control bigFontWeight"
            style={{ width: "112px" }}
            value={tVariation}
            placeholder="Loading.."
            disabled
          />
        </td>
      </tr>
    );
  })}
</tbody>

      </table>
      <button
        type="button"
        style={{ height: "30px", marginLeft: "90%" }}
        className="bg-green-500 text-white px-3 py-1 rounded-md"
        onClick={handleSave}
      >
        Save
      </button>
      <br />
      <br />
    </div>
  );
}