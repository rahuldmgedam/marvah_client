// import React from "react";
// import "../css/Tank.css";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function Variartion() {
 
//     const [variation, setVariation] = useState([]);
//     const [tank,setTank] = useState([]);
//     const [ms1OpStock,setMs1OpStock] = useState(0) ;
//     const [ms2OpStock,setMs2OpStock] = useState(0) ;

//     const [hsdOpStock,setHsdOpStock] = useState(0) ;

//     useEffect(() => {
//       axios.get('https://marvah-server.onrender.com/variation')
//         .then(response => {
//           setVariation(response.data);
//         })
//         .catch(error => {
//           console.error("There was an error fetching the variations!", error);
//         });
//     }, []);



//     useEffect(() => {
//         axios.get('https://marvah-server.onrender.com/tank')
//           .then(response => {
//             setTank(response.data);
//           })
//           .catch(error => {
//             console.error("There was an error fetching the variations!", error);
//           });
//         //   setMs1OpStock(tank[0].opStock);
//         //   setMs2OpStock(tank[1].opStock)
//         //   setHsdOpStock(tank[2].opStock)
//       }, []);
  




//   return (
//     <>
//       <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
//         <h2 className="mt-3 text-center">Variation</h2>
//         <span style={{ fontSize: "22px" }}> Date : </span>
//         <div>
//           <br></br>
//           <table className="table">
//       <thead>
//         <tr className="table-secondary">
//           <th className="tablebg">Product</th>
//           <th className="tablebg">Open. STK</th>
//           <th className="tablebg">Receipt(+)</th>
//           <th className="tablebg">Total Stk(=)</th>
//           <th className="tablebg">A. Sale(-)</th>
//           <th className="tablebg">Bal. STK(=)</th>
//           <th className="tablebg">Actual Bal. Stk(-)</th>
//           <th className="tablebg">Variation (=)</th>
//           <th className="tablebg">T.Variationv (-/+)</th>
//         </tr>
//       </thead>
//       <tbody>
//         {variation.map((item, index) => (
             
//           <tr key={index}>
//             <td className="bigFontWeight">{item.product}</td>
//             <td>
//               <input
//                 type="text"
//                 className="form-control bigFontWeight"
//                 value={item.openStock}
//                 placeholder="Loading.."
//                 disabled
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 className="form-control bigFontWeight"
//                 value={item.receipt}
//                 placeholder="Loading.."
//                 disabled
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 className="form-control bigFontWeight"
//                 value={item.totalStock}
//                 placeholder="Loading.."
//                 disabled
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 className="form-control bigFontWeight"
//                 value={item.actualSale}
//                 placeholder="Loading.."
//                 disabled
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 className="form-control bigFontWeight"
//                 value={item.balanceStock}
//                 placeholder="Loading.."
//                 disabled
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 className="form-control bigFontWeight editableInput"
//                 value={item.actualBalance}
//                 placeholder="Actual Bal Stk."
//                 // Optional onChange handler for actualBalance
//                 // onChange={(e) => handleActualBalanceChange(e, index)}
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 className="form-control bigFontWeight"
//                 style={{ width: "112px" }}
//                 value={item.variation}
//                 placeholder="Loading.."
//                 disabled
//               />
//             </td>
//             <td>
//               <input
//                 type="text"
//                 className="form-control bigFontWeight"
//                 style={{ width: "112px" }}
//                 value={item.tVariation}
//                 placeholder="Loading.."
//                 disabled
//               />
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//           {/* <table class="table">
//             <thead>
//               <tr className="table-secondary">
//                 <th className="tablebg">Product</th>
//                 <th className="tablebg">Open. STK </th>
//                 <th className="tablebg">Receipt(+)</th>
//                 <th className="tablebg">Total Stk(=)</th>
//                 <th className="tablebg">A. Sale(-)</th>
//                 <th className="tablebg">Bal. STK(=)</th>
//                 <th className="tablebg">Actual Bal. Stk(-) </th>
//                 <th className="tablebg">Variation (=)</th>
//                 <th className="tablebg">T.Variationv (-/+)</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="bigFontWeight">MS</td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="open1"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="rec1"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="tstk1"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="asale1"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="balstk1"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     id="abalstk1"
//                     type="text"
//                     class="form-control bigFontWeight editableInput"
//                     placeholder="Actual Bal Stk."
//                     // onChange={(e) => calcVariationMS()}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "112px" }}
//                     class="form-control bigFontWeight"
//                     id="variation1"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "112px" }}
//                     class="form-control bigFontWeight"
//                     id="tvariation1"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//               </tr>

//               <tr>
//                 <td className="bigFontWeight">SPEED</td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="open2"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="rec2"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="tstk2"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="asale2"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="balstk2"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     id="abalstk2"
//                     type="text"
//                     class="form-control bigFontWeight editableInput"
//                     placeholder="Actual Bal Stk."
//                     // onChange={(e) => calcVariationSpeed()}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "112px" }}
//                     class="form-control bigFontWeight"
//                     id="variation2"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "112px" }}
//                     class="form-control bigFontWeight"
//                     id="tvariation2"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//               </tr>

//               <tr>
//                 <td className="bigFontWeight">HSD</td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="open3"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="rec3"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="tstk3"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="asale3"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="balstk3"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     id="abalstk3"
//                     type="text"
//                     class="form-control bigFontWeight editableInput"
//                     placeholder="Actual Bal Stk."
//                     // onChange={(e) => calcVariationHsd()}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "112px" }}
//                     class="form-control bigFontWeight"
//                     id="variation3"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "112px" }}
//                     class="form-control bigFontWeight"
//                     id="tvariation3"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//               </tr>

//               <tr>
//                 <td className="bigFontWeight">Pouches</td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="open4"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="rec4"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="tstk4"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="asale4"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     id="balstk4"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     id="abalstk4"
//                     type="text"
//                     class="form-control bigFontWeight editableInput"
//                     placeholder="Actual Bal Stk."
//                     // onChange={(e) => calcVariationPouches()}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "112px" }}
//                     class="form-control bigFontWeight"
//                     id="variation4"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ width: "112px" }}
//                     class="form-control bigFontWeight"
//                     id="tvariation4"
//                     placeholder="Loading.."
//                     disabled
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </table> */}

//           <button
//             type="button"
//             style={{ height: "30px", paddingTop: "2px", marginLeft: "90%" }}
//             /* id={"data"+res.staff_id} */ class="btn btn-primary"
//             onClick={() => {
//             //   onClickBtn(); /* onSaveMsUpdate(); onSaveHsdUpdate(); onSaveSpeedUpdate(); */
//             }}
//           >
//             Save
//           </button>
//         </div>
//         <br></br>
//         <br></br>
//       </div>
//     </>
//   );
// }

// gagan 5th aug
import React, { useState, useEffect } from "react";
import "../css/Tank.css";
import axios from "axios";
import toast from "react-hot-toast";

export default function Variation() {
    // State variables
    const [totalVariation, setTotalVariation] = useState([]); // Store total variation data
    const [openStocks, setOpenStocks] = useState([]); // Store open stock data
    const [receipts, setReceipts] = useState([12, 0, 0]); // Store receipt data
    const [actualBalances, setActualBalances] = useState([null, null, null]); // Store actual balance data
    const [currentDate, setCurrentDate] = useState(''); // Store current date

    // Sales data for different products
    const Ms = { actualSale: 4326 };
    const Ms2 = { actualSale: 2047 };
    const HSD = { actualSale: 2269 };

    // Fetch total variation data on component mount
    useEffect(() => {
        axios.get('https://marvah-server.onrender.com/variation')
            .then(response => {
                setTotalVariation(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the variations!", error);
            });
    }, []);

    // Fetch open stock data and set current date on component mount
    useEffect(() => {
        axios.get('https://marvah-server.onrender.com/tank')
            .then(response => {
                setOpenStocks(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching open stocks!", error);
            });

        // Set the current date
        const today = new Date();
        const date = (today.getDate() < 10 ? ("0" + today.getDate()) : today.getDate()) + '/' +
            ((today.getMonth() + 1 < 10 ? ("0" + (today.getMonth() + 1)) : (today.getMonth() + 1))) + '/' +
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

    // Handle save button click
    const handleSave = () => {
        // Prepare data to save
        const dataToSave = openStocks.map((item, index) => {
            const receipt = receipts[index] || 0;
            const actualSale = index === 0 ? Ms.actualSale : index === 1 ? Ms2.actualSale : HSD.actualSale;
            const totalStock = calculateTotalStock(receipt, item.opStock);
            const balanceStock = totalStock - actualSale;
            const actualBalance = actualBalances[index];
            const variationValue = calculateVariation(actualBalance, balanceStock);
            const tVariation = totalVariation[totalVariation.length - 3 + index]?.tVariation + variationValue;

            return {
                product: item.product,
                openStock: item.opStock,
                receipt: receipt,
                totalStock: totalStock,
                actualSale: actualSale,
                balanceStock: balanceStock,
                actualBalance: actualBalance,
                variation: variationValue,
                tVariation: tVariation
            };
        });

        // Post data to the server
        axios.post('https://marvah-server.onrender.com/variation/create', dataToSave)
            .then(response => {
                console.log(response.data);
                if (response.statusText === "OK" || response.status === 200) {
                    toast.success(response.data);
                }
            })
            .catch(error => {
                console.error("There was an error saving the data!", error);
                if (error) {
                    toast.error("All fields are required");
                }
            });
    };

    return (
        <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
            <h2 className="mt-3 text-center text-blue-500 font-bold uppercase text-2xl">Variation</h2>
            <span style={{ fontSize: "22px" }}> Date: {currentDate} </span>
            <br />
            <table className="table">
                <thead>
                    <tr className="table-secondary">
                        <th className="tablebg">Product</th>
                        <th className="tablebg">Open. STK</th>
                        <th className="tablebg">Purchase(+)</th>
                        <th className="tablebg">Total Stk(=)</th>
                        <th className="tablebg">A. Sale(-)</th>
                        <th className="tablebg">Bal. STK(=)</th>
                        <th className="tablebg text-center">Actual Bal. Stk(-)</th>
                        <th className="tablebg text-center">Variation on date (=)</th>
                        <th className="tablebg text-center">Total.Variation (-/+)</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        openStocks.map((item, index) => {
                            const receipt = receipts[index] || 0;
                            const totalStock = calculateTotalStock(receipt, item.opStock);
                            const balanceStock = totalStock - (index === 0 ? Ms.actualSale : index === 1 ? Ms2.actualSale : HSD.actualSale);
                            const actualBalance = actualBalances[index];
                            const variationValue = calculateVariation(actualBalance, balanceStock);
                            const tVariation = totalVariation[totalVariation.length - 3 + index]?.tVariation + variationValue;
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
                                            value={index === 0 ? Ms.actualSale : index === 1 ? Ms2.actualSale : HSD.actualSale}
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
                                            className="form-control bigFontWeight"
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
                        })
                    }
                </tbody>
            </table>
            <button
                type="button"
                style={{ height: "30px", paddingTop: "2px", marginLeft: "90%" }}
                className="btn btn-primary"
                onClick={handleSave}
            >
                Save
            </button>
            <br />
            <br />
        </div>
    );
}