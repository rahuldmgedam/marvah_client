// import React, { useEffect, useState } from "react";
// import "../css/PurchaseOil.css"; // Assume you have some basic CSS for styling
// import axios from "axios";

// const PurchaseOil = () => {
//   const init = {
//     invoiceNo: "",
//     totalAmount: "",
//     stockInCases: [
//       {
//         srNo: 1,
//         productName: "",
//         grade: "",
//         colour: "",
//         mrp: 0,
//         volumePerPieces: 0,
//         volumeType: "",
//         pcsPerCase: 0,
//         purchaseTCases: 0,
//         totalPCS: 0,
//       },
//       {
//         srNo: 2,
//         productName: "",
//         grade: "",
//         colour: "",
//         mrp: 0,
//         volumePerPieces: 0,
//         volumeType: "",
//         pcsPerCase: 0,
//         purchaseTCases: 0,
//         totalPCS: 0,
//       },
//       {
//         srNo: 3,
//         productName: "",
//         grade: "",
//         colour: "",
//         mrp: 0,
//         volumePerPieces: 0,
//         volumeType: "",
//         pcsPerCase: 0,
//         purchaseTCases: 0,
//         totalPCS: 0,
//       },
//     ],
//     stockInLiters: [
//       {
//         srNo: 1,
//         volumePerPieces: 0,
//         volumeType: "",
//         totalPCS: 0,
//         totalLtrs: 0,
//         ratePerUnit: 0,
//         taxableValue: 0,
//       },
//       {
//         srNo: 2,
//         volumePerPieces: 0,
//         volumeType: "",
//         totalPCS: 0,
//         totalLtrs: 0,
//         ratePerUnit: 0,
//         taxableValue: 0,
//       },
//       {
//         srNo: 3,
//         volumePerPieces: 0,
//         volumeType: "",
//         totalPCS: 0,
//         totalLtrs: 0,
//         ratePerUnit: 0,
//         taxableValue: 0,
//       },
//     ],
//     taxDetails: {
//       srNo: 1,
//       taxableValue: 0,
//       discount: 0,
//       balanceAmt: 0,
//       cgst: 0,
//       sgst: 0,
//       tcs: 0,
//       totalAmt: 0,
//       totalPCS: 0,
//       landingPrice: 0,
//     },
//     reports: [
//       {
//         srNo: 1,
//         productName: "",
//         volumePerPieces: 0,
//         mrp: 0,
//         landingPrice: 0,
//         difference: 0,
//       },
//       {
//         srNo: 2,
//         productName: "",
//         volumePerPieces: 0,
//         mrp: 0,
//         landingPrice: 0,
//         difference: 0,
//       },
//       {
//         srNo: 3,
//         productName: "",
//         volumePerPieces: 0,
//         mrp: 0,
//         landingPrice: 0,
//         difference: 0,
//       },
//     ],
//   };

//   const [purchaseformData, setPurchaseformData] = useState(init);
//   const [oilProductData, setOilProductData] = useState([]);
//   const [purchaseOilDate, setPurchaseOilDate] = useState("");

//   const [invoiceNo, setInvoiceNo] = useState(0);
//   const [totInvAmt, setTotInvAmt] = useState(0);
//    const [otherDiscount, setOtherDiscount] = useState(0);
//    const [totalAmt2,setTotAmt2] = useState(0);
//    const [totInvAmtAct, setTotInvAmtAct] = useState(0);

//   const fetchOil = async () => {
//     try {
//       const res = await axios.get("https://marvah-server.onrender.com/addoil");
//       setOilProductData(res.data.allOils);
//       setPurchaseformData(oilProductData);
//       // toast.success("fetched oils")
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log("oilProductData", oilProductData);

//   useEffect(() => {
//     fetchOil();
//   }, []);

//   const handleChange = (e, index, field) => {
//     const value = Number(e.target.value);
//     const updatedData = [...oilProductData];
//     updatedData[index][field] = value;

//     if (field === "purchaseTCases" || field === "pcsPerCase") {
//       // Calculate Total PCS
//       updatedData[index].totalPCS =
//         updatedData[index].pcsPerCase * updatedData[index].purchaseTCases;
//     }

//     if (field === "ratePerUnit") {
//       const totalLiters = calculateTotalLiters(
//         updatedData[index].volumePerPieces,
//         updatedData[index].totalPCS
//       );
//       updatedData[index].taxableValue = (totalLiters * value).toFixed(2);
//     }

//     // Recalculate balanceAmt when discount is updated
//     if (field === "discount") {
//       updatedData[index].balanceAmt = (
//         updatedData[index].taxableValue - value
//       ).toFixed(2);
//     }

//     // Recalculate totalAmt and landingPrice when cgst, sgst, tcs, or discount is updated
//     if (["cgst", "sgst", "tcs", "discount"].includes(field)) {
//       const balanceAmt =
//         updatedData[index].taxableValue - updatedData[index].discount;
//       const totalAmt = (
//         balanceAmt +
//         updatedData[index].cgst +
//         updatedData[index].sgst +
//         updatedData[index].tcs
//       ).toFixed(2);

//       updatedData[index].balanceAmt = balanceAmt.toFixed(2);
//       updatedData[index].totalAmt = totalAmt;

//       // Calculate landingPrice as totalAmt / totalPcs
//       updatedData[index].landingPrice =
//         updatedData[index].totalPCS > 0
//           ? (totalAmt / updatedData[index].totalPCS).toFixed(2)
//           : 0; // To handle division by zero

//       // Recalculate difference as mrp - landingPrice
//       updatedData[index].difference = (
//         updatedData[index].mrp - updatedData[index].landingPrice
//       ).toFixed(2);
//     }
//     setOilProductData(updatedData);
//   };

//   console.log(oilProductData);

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   // Submit purchaseformData to your backend API
//   //   console.log("oilProductData::",oilProductData);
//   // };

//   // Handling form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://marvah-server.onrender.com/purchaseoil/create",
//         {
//           oilProductData// Sending oilProductData as the payload
//         }
//       );

//       // Handle the successful response
//       console.log("Response from server:", response.data);
//     } catch (error) {
//       console.error("There was an error submitting the data:", error);
//     }
//   };

//   const calculateTotalLiters = (volumePerPieces, totalPCS) => {
//     // Convert volume to liters if it's in ML
//     const volumeInLiters = volumePerPieces / 1000;
//     return (volumeInLiters * totalPCS).toFixed(1);
//   };

//   // console.log(totInvAmt);
//   const localDate = new Date().toLocaleDateString();

//   const [purchaseOilData,setPurchaseOilData] = useState([])
//   const fetchPurchaseOil = async () => {
//     try {
//       const res = await axios.get("https://marvah-server.onrender.com/purchaseoil");
//       const dataWithCalculatedFields = res.data.map((item) => ({
//         ...item,
//         opStock: item.opStock || 0, // Initialize opStock if not already set
//         outRetail: item.outRetail || 0, // Initialize outRetail if not already set
//         totOpStock: item.opStock + item.invStock,
//         balStock: item.opStock + item.invStock - item.outRetail,
//         balStockAmt: (item.opStock + item.invStock - item.outRetail) * item.mrp,
//       }));
//       setPurchaseOilData(dataWithCalculatedFields);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchPurchaseOil();
//   }, [])

//   return (
//     <>

//     <form onSubmit={handleSubmit} className="">
//       <h1 className="text-green-500 text-center uppercase text-3xl font-semibold">
//         Purchase Oil
//       </h1>
//       <div>
//         <label className="font-bold">
//           Date: {localDate}
//         </label>
//         <input
//           type="text"
//           // value={purchaseOilDate}
//           name=""
//           id=""
//         />
//       </div>
//       <div>
//         <label className="uppercase font-bold">Invoice No :</label>
//         <input
//           className="ml-6 w-48 mt-4 mb-1 border-4 border-blue-600"
//           type="number"
//            value={invoiceNo}
//            onChange={(e)=>setInvoiceNo(e.target.value)}
//         />
//         <label className="uppercase font-bold ml-4">Total Amount :</label>
//         <input
//           className=" ml-7 w-48 border-4 border-blue-600"
//           type="number"
//           value={totInvAmt}
//           onChange={(e) => setTotInvAmt(e.target.value)}
//         />
//       </div>
//       <div></div>

//       <div className="flex gap-4">
//         {/* Stock in Cases start */}
//         <div className="overflow-x-auto">
//           <h2 className="mb-2 text-2xl text-green-500">Stock in Cases</h2>

//           <table className="bg-white border border-gray-700">
//             <thead className="">
//               <tr className="bg-[#3A1078] text-white  uppercase text-sm">
//                 <th className="py-1 px-2 text-center border-r">
//                   Sr. <br /> No
//                 </th>
//                 <th className="py-1 px-2 text-center border-r">
//                   Product <br /> Name
//                 </th>
//                 <th className="py-1 px-2 text-center border-r">Grade</th>
//                 <th className="py-1 px-2 text-center border-r">Colour</th>

//                 <th className="py-1 px-2 text-center border-r">MRP </th>
//                 <th className="py-1 px-2 text-center border-r">
//                   Volume. <br /> per PCS
//                 </th>
//                 <th className="py-1 px-2 text-center border-r">
//                   Vol. <br />
//                   Type
//                 </th>

//                 <th className="py-1 px-2">
//                   Pieces <br />
//                   perCase
//                 </th>
//                 <th className="py-1 px-2 ">
//                   Pur.
//                   <br /> T.Cases
//                 </th>
//                 <th className="py-1 px-2 text-left">
//                   Total <br /> PCS
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="text-md">
//               {oilProductData.map((item, index) => (
//                 <tr key={index} className="border-b border-gray-300">
//                   <td className="px-1 border-r">
//                     <input
//                       className="w-8 text-center"
//                       type="number"
//                       value={item.srNo}
//                       readOnly
//                     />
//                   </td>
//                   <td className="px-1 border-r">
//                     <input
//                       className="w-28 text-center"
//                       type="text"
//                       value={item.productName}
//                       readOnly
//                     />
//                   </td>
//                   <td className=" px-1 border-r">
//                     <input
//                       className="w-20 text-center"
//                       type="text"
//                       value={item.grade}
//                       readOnly
//                     />
//                   </td>
//                   <td className=" px-1 border-r">
//                     <input
//                       className="w-20 text-center"
//                       type="text"
//                       value={item.colour}
//                       readOnly
//                     />
//                   </td>
//                   <td className=" px-2 border-r">
//                     <input
//                       className="w-12 text-center"
//                       type="number"
//                       value={item.mrp}
//                       readOnly
//                     />
//                   </td>
//                   <td className="px-2">
//                     <input
//                       className="w-12 text-center"
//                       type="number"
//                       value={item.volumePerPieces}
//                       readOnly
//                     />
//                   </td>
//                   <td className=" px-1">
//                     <input
//                       className="w-8 text-center"
//                       type="text"
//                       value={item.volumeType}
//                       readOnly
//                     />
//                   </td>
//                   <td className="px-2">
//                     <input
//                       className="w-12 text-center"
//                       type="number"
//                       value={item.pcsPerCase}
//                       onChange={(e) => handleChange(e, index, "pcsPerCase")}
//                       readOnly
//                     />
//                   </td>
//                   <td className=" px-2">
//                     <input
//                       className="w-12 text-center border-4 border-blue-600"
//                       type="number"
//                       value={item.purchaseTCases}
//                       onChange={(e) => handleChange(e, index, "purchaseTCases")}
//                     />
//                   </td>
//                   <td className="px-2">
//                     <input
//                       className="w-12"
//                       type="number"
//                       value={item.totalPCS}
//                       readOnly
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {/* Stock in Cases end */}

//         {/* Stock in Liters start */}
//         <div className="overflow-x-auto">
//           <h2 className="mb-2 text-2xl text-green-500">Stock in Litres</h2>

//           <table className="bg-white border border-gray-700">
//             <thead className="">
//               <tr className="bg-[#3A1078] text-white  uppercase text-sm">
//                 {/* <th className="py-1 px-2 text-center border-r">
//                   Sr. <br /> No
//                 </th> */}
//                 <th className="py-1 px-2 text-center border-r">
//                   Volume. <br /> per PCS
//                 </th>
//                 <th className="py-1 px-2 text-center border-r">
//                   Vol. <br /> Type
//                 </th>

//                 <th className="py-1 px-2 text-center border-r">
//                   Total <br /> PCS
//                 </th>
//                 <th className="py-1 px-2 text-center border-r">
//                   Total <br />
//                   Litrs{" "}
//                 </th>
//                 <th className="py-1 px-2 text-center border-r">
//                   Perunit
//                   <br /> Price
//                 </th>
//                 <th className="py-1 px-2 text-center border-r">
//                   Taxable. <br />
//                   Value
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="text-md">
//               {oilProductData.map((item, index) => (
//                 <tr key={index} className="border-b border-gray-300">
//                   {/* <td className="px-1 border-r">
//                     <input
//                       className="w-8 text-center"
//                       type="number"
//                       value={item.srNo}
//                       readOnly
//                     />
//                   </td> */}

//                   <td className=" px-2 border-r">
//                     <input
//                       className="w-20 text-center"
//                       type="number"
//                       value={item.volumePerPieces}
//                       readOnly
//                     />
//                   </td>
//                   <td>
//                     <input
//                       className="w-12 text-center"
//                       type="text"
//                       value={item.volumeType}
//                       readOnly
//                     />
//                   </td>
//                   <td className="px-2">
//                     <input
//                       className="w-12 text-center"
//                       type="number"
//                       value={item.totalPCS}
//                       readOnly
//                     />
//                   </td>
//                   <td className=" px-1">
//                     <input
//                       className="w-12 text-center"
//                       type="text"
//                       value={calculateTotalLiters(
//                         item.volumePerPieces,
//                         item.totalPCS
//                       )}
//                       readOnly
//                     />
//                   </td>
//                   <td className=" px-1">
//                     <input
//                       className="w-20 text-center border-blue-600 border-4"
//                       type="number"
//                       value={item.ratePerUnit}
//                       onChange={(e) => handleChange(e, index, "ratePerUnit")}
//                     />
//                   </td>
//                   <td className=" px-1">
//                     <input
//                       className="w-20 text-center"
//                       type="text"
//                       value={item.taxableValue}
//                       readOnly
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Stock in Liters end */}
//       </div>

//       {/* Invoice start */}
//       <div className="overflow-x-auto">
//         <h2 className="mb-2 text-2xl text-green-500">Invoice Details</h2>

//         <table className="bg-white border border-gray-700">
//           <thead className="">
//             <tr className="bg-[#3A1078] text-white  uppercase text-sm">
//               <th className="py-1 px-2 text-center border-r">
//                 Sr. <br /> No
//               </th>
//               <th className="py-1 px-2 text-center border-r">
//                 Taxable <br />
//                 value
//               </th>
//               <th className="py-1 px-2 text-center border-r">
//                 Discount <br />
//                 (-)
//               </th>
//               <th className="py-1 px-2 text-center border-r">
//                 Balance <br />
//                 Amt (=)
//               </th>

//               <th className="py-1 px-2 text-center border-r">
//                 CGST <br /> (+)
//               </th>
//               <th className="py-1 px-2 text-center border-r">
//                 SGST <br />
//                 (+)
//               </th>
//               <th className="py-1 px-2 text-center border-r">
//                 TCS
//                 <br /> (+)
//               </th>
//               <th className="py-1 px-2 text-center border-r">
//                 Total <br />
//                 Amt (=)
//               </th>
//               <th className="py-1 px-2 text-center border-r">
//                 Total <br />
//                 Pcs ()
//               </th>
//               <th className="py-1 px-2 text-center border-r">
//                 Landing <br />
//                 Price
//               </th>
//             </tr>
//           </thead>
//           <tbody className="text-md">
//             {oilProductData.map((item, index) => (
//               <tr key={index} className="border-b border-gray-300">
//                 <td className="px-1 border-r">
//                   <input
//                     className="w-8 text-center"
//                     type="number"
//                     value={item.srNo}
//                     readOnly
//                   />
//                 </td>

//                 <td className=" px-2 border-r">
//                   <input
//                     className="w-24 text-center"
//                     type="number"
//                     value={item.taxableValue}
//                     readOnly
//                   />
//                 </td>
//                 <td>
//                   <input
//                     className="w-20 text-center border-4 border-blue-600"
//                     type="number"
//                     value={item.discount}
//                     onChange={(e) => handleChange(e, index, "discount")}
//                   />
//                 </td>
//                 <td className="px-2">
//                   <input
//                     className="w-24 text-center"
//                     type="number"
//                     value={item.balanceAmt}
//                     readOnly
//                   />
//                 </td>
//                 <td className=" px-1">
//                   <input
//                     className="w-24 text-center border-4 border-blue-600"
//                     type="number"
//                     onChange={(e) => handleChange(e, index, "cgst")}
//                     value={item.cgst}
//                   />
//                 </td>
//                 <td className=" px-1">
//                   <input
//                     className="w-20 text-center border-blue-600 border-4"
//                     type="number"
//                     value={item.sgst}
//                     onChange={(e) => handleChange(e, index, "sgst")}
//                   />
//                 </td>
//                 <td className=" px-1">
//                   <input
//                     className="w-24 text-center border-4 border-blue-600"
//                     onChange={(e) => handleChange(e, index, "tcs")}
//                     type="number"
//                     value={item.tcs}
//                   />
//                 </td>
//                 <td className=" px-1">
//                   <input
//                     className="w-24 text-center"
//                     type="number"
//                     value={item.totalAmt}
//                     readOnly
//                   />
//                 </td>
//                 <td className=" px-1">
//                   <input
//                     className="w-16 text-center"
//                     type="number"
//                     value={item.totalPCS}
//                     readOnly
//                   />
//                 </td>
//                 <td className=" px-1">
//                   <input
//                     className="w-24 text-center"
//                     type="number"
//                     value={item.landingPrice}
//                     readOnly
//                   />
//                 </td>
//               </tr>
//             ))}
//          <tr>
//         <td className="px-1 py-2 text-right" colSpan={7}>
//           <strong>Total Amount2:</strong>
//         </td>
//         <td className="px-1">
//           <input
//             className="w-24 text-center"
//             type="number"
//             value={totalAmt2}
//             readOnly
//           />
//         </td>
//         <td colSpan={2}></td>
//       </tr>
//       <tr>
//         <td className="px-1 py-2 text-right" colSpan={7}>
//           <strong>Other discount:</strong>
//         </td>
//         <td className="px-1">
//           <input
//             className="w-24 text-center  border-4 border-blue-600"
//             type="number"
//             value={otherDiscount}
//             readOnly
//           />
//         </td>
//         <td colSpan={2}></td>
//       </tr>
//       <tr>
//         <td className="px-1 py-2 text-right" colSpan={7}>
//           <strong>Total Invoice Amount:</strong>
//         </td>
//         <td className="px-1">
//           <input
//             className="w-24 text-center"
//             type="number"
//             readOnly
//           />
//         </td>
//         <td colSpan={2}></td>
//       </tr>
//           </tbody>
//         </table>
//       </div>
//       {/* Invoice end */}

//       {/*Commission start */}

//       <div className="overflow-x-auto">
//         <h2 className="mb-2 text-2xl text-green-500">Difference</h2>

//         <table className="bg-white border border-gray-700">
//           <thead className="">
//             <tr className="bg-[#3A1078] text-white  uppercase text-sm">
//               <th className="py-1 px-2 text-center border-r">
//                 Sr <br /> No
//               </th>
//               <th className="py-1 px-2 text-center border-r">
//                 Product <br /> Name
//               </th>
//               <th className="py-1 px-2 text-center border-r">
//                 Volume <br /> per PCS
//               </th>
//               <th className="py-1 px-2 text-center border-r">
//                 Vol. <br /> Type
//               </th>

//               <th className="py-1 px-2 text-center border-r">
//                 MRP <br /> Price
//               </th>
//               <th className="py-1 px-2 text-center border-r">
//                 Landing <br />
//                 Price{" "}
//               </th>
//               <th className="py-1 px-2 text-center border-r">
//             Difference
//                 <br /> Per PC
//               </th>
//             </tr>
//           </thead>
//           <tbody className="text-md">
//             {oilProductData.map((item, index) => (
//               <tr key={index} className="border-b border-gray-300">
//                 <td className="px-1 border-r">
//                   <input
//                     className="w-8 text-center"
//                     type="number"
//                     value={item.srNo}
//                     readOnly
//                   />
//                 </td>

//                 <td className=" px-2 border-r">
//                   <input
//                     className="w-28 text-center"
//                     type="text"
//                     value={item.productName}
//                     readOnly
//                   />
//                 </td>
//                 <td>
//                   <input
//                     className="w-20 text-center"
//                     type="number"
//                     value={item.volumePerPieces}
//                     readOnly
//                   />
//                 </td>
//                 <td>
//                   <input
//                     className="w-12 text-center"
//                     type="text"
//                     value={item.volumeType}
//                     readOnly
//                   />
//                 </td>
//                 <td className="px-2">
//                   <input
//                     className="w-12 text-center"
//                     type="number"
//                     value={item.mrp}
//                     readOnly
//                   />
//                 </td>
//                 <td className=" px-1">
//                   <input
//                     className="w-12 text-center"
//                     type="text"
//                     value={item.landingPrice}
//                     readOnly
//                   />
//                 </td>
//                 <td className=" px-1">
//                   <input
//                     className="w-20 text-center"
//                     type="number"
//                     value={item.difference}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/*Commission end */}
//       {/* <div className="flex justify-between">
//         <button></button>
//         <button
//           type="submit"
//           onClick={handleSubmit}
//           className="flex bg-blue-600 px-5 py-2 mr-64 font-bold rounded-lg text-white"
//         >
//           Add Data
//         </button>
//       </div> */}
//     </form>

//                 {/* invoice report start */}
//                 <div className="overflow-x-auto mt-12">
//           <h2 className="mb-2 text-2xl text-green-500">INVOICE REPORT</h2>

//           <table className="bg-white border border-gray-700">
//             <thead className="">
//               <tr className="bg-[#3A1078] text-white  uppercase text-sm">
//                 <th className="py-1 px-2 text-center border-r">
//                   Sr. <br /> No
//                 </th>
//                 <th className="py-1 px-2 text-center border-r">
//                   Product <br /> Name
//                 </th>
//                 <th className="py-1 px-2 text-center border-r">Grade</th>
//                 <th className="py-1 px-2 text-center border-r">Colour</th>

//                 <th className="py-1 px-2 text-center border-r">    Volume. <br /> per PCS </th>
//                 <th className="py-1 px-2 text-center border-r">
//               MRP
//                 </th>

//                 <th className="py-1 px-2">
//                  Receipt

//                 </th>
//                 <th className="py-1 px-2 text-center ">
//                   Total <br />Stock
//                   <br /> Amt
//                 </th>

//               </tr>
//             </thead>
//             <tbody className="text-md">
//               {purchaseOilData.map((item, index) => (
//                 <tr key={index} className="border-b border-gray-300">
//                   <td className="px-1 border-r">
//                     <input
//                       className="w-8 text-center"
//                       type="number"
//                       value={item.srNo}
//                       readOnly
//                     />
//                   </td>
//                   <td className="px-1 border-r">
//                     <input
//                       className="w-28 text-center"
//                       type="text"
//                       value={item.productName}
//                       readOnly
//                     />
//                   </td>
//                   <td className=" px-1 border-r">
//                     <input
//                       className="w-20 text-center"
//                       type="text"
//                       value={item.grade}
//                       readOnly
//                     />
//                   </td>
//                   <td className=" px-1 border-r">
//                     <input
//                       className="w-20 text-center"
//                       type="text"
//                       value={item.colour}
//                       readOnly
//                     />
//                   </td>
//                   <td className="px-2">
//                     <input
//                       className="w-16 text-center"
//                       type="number"
//                       value={item.volumePerPieces}
//                       readOnly
//                     />
//                   </td>
//                   <td className="px-2">
//                     <input
//                       className="w-12 text-center"
//                       type="number"
//                       value={item.mrp}
//                       readOnly
//                     />
//                   </td>

//                   <td className="px-2">
//                     <input
//                       className="w-12 text-center"
//                       type="number"
//                       value={item.totalPCS}
//                       readOnly
//                     />
//                   </td>
//                   <td className=" px-2">
//                     <input
//                       className="w-24 text-center"
//                       type="number"
//                       value={item.totStockAmt =(item.totalPCS*item.mrp)}
//                     />
//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>

//         </div>
//         <div className="flex justify-around">
//           <button></button>
//         <button onClick={handleSubmit} className="px-5 py-2  bg-blue-500 font-bold rounded-lg">Stock to Godown</button>
//         </div>
//         {/* invoice report end */}

//     </>
//   );
// };

// export default PurchaseOil;

// copy untill 21 sept

import React, { useEffect, useState } from "react";
import "../css/PurchaseOil.css"; // Assume you have some basic CSS for styling
import axios from "axios";

const PurchaseOil = () => {
  const [oilProductData, setOilProductData] = useState([]);
  const [purchaseOilDate, setPurchaseOilDate] = useState("");

  const [invoiceNo, setInvoiceNo] = useState(0);
  const [totInvAmt, setTotInvAmt] = useState(0);
  const [otherDiscount, setOtherDiscount] = useState(0);
  const [totalAmt2, setTotAmt2] = useState(0);
  const [totInvAmtAct, setTotInvAmtAct] = useState(0);

  const [totStockAmt2,setTotStockAmt2] = useState(0);

  console.log("totStockAmt2",totStockAmt2)
  const fetchOil = async () => {
    try {
      const res = await axios.get("https://marvah-server.onrender.com/addoil");
      setOilProductData(res.data.allOils);
      // setPurchaseformData(oilProductData);
      // toast.success("fetched oils")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOil();
  }, []);


  const handleChange = (e, index, field) => {
    const value = Number(e.target.value);
    const updatedData = [...oilProductData];
    updatedData[index][field] = value;

    if (field === "purchaseTCases" || field === "pcsPerCase") {
      // Calculate Total PCS
      updatedData[index].totalPCS =
        updatedData[index].pcsPerCase * updatedData[index].purchaseTCases;
    }

    if (field === "ratePerUnit") {
      const totalLiters = calculateTotalLiters(
        updatedData[index].volumePerPieces,
        updatedData[index].totalPCS,
        updatedData[index].volumeType // Pass volumeType for conversion
      );
      updatedData[index].taxableValue = (totalLiters * value).toFixed(2);
    }

    // Recalculate balanceAmt when discount is updated
    if (field === "discount") {
      updatedData[index].balanceAmt = (
        updatedData[index].taxableValue - value
      ).toFixed(2);
    }

    // Recalculate totalAmt and landingPrice when cgst, sgst, tcs, or discount is updated
    if (["cgst", "sgst", "tcs", "discount"].includes(field)) {
      const balanceAmt =
        updatedData[index].taxableValue - updatedData[index].discount;
      const totalAmt = (
        balanceAmt +
        updatedData[index].cgst +
        updatedData[index].sgst +
        updatedData[index].tcs
      ).toFixed(2);

      updatedData[index].balanceAmt = balanceAmt.toFixed(2);
      updatedData[index].totalAmt = totalAmt;

      // Calculate landingPrice as totalAmt / totalPCS
      updatedData[index].landingPrice =
        updatedData[index].totalPCS > 0
          ? (totalAmt / updatedData[index].totalPCS).toFixed(2)
          : 0; // To handle division by zero

      // Recalculate difference as mrp - landingPrice
      updatedData[index].difference = (
        updatedData[index].mrp - updatedData[index].landingPrice
      ).toFixed(2);
    }

    const calculateTotalStockAmt = () => {
      return oilProductData.reduce(
        (acc, item) => acc + (item.totStockAmt || 0),
        0
      );
    };
     // Recalculate the total stock amount for the item
  if (field === "totalPCS" || field === "mrp") {
    updatedData[index].totStockAmt = updatedData[index].totalPCS * updatedData[index].mrp;
  }

  setOilProductData(updatedData);
  setTotStockAmt2(calculateTotalStockAmt());

    // Update the state with the new oilProductData
    setOilProductData(updatedData);

    // Calculate the total amount (totAmt2) after updating oilProductData
    const newTotalAmt2 = updatedData.reduce(
      (acc, item) => acc + parseFloat(item.totalAmt || 0),
      0
    );
    setTotAmt2(newTotalAmt2);
  };


  console.log(oilProductData);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const a = { invoiceNo, totInvAmt, totInvAmtAct,totStockAmt2 };
      oilProductData.push(a);
      const response = await axios.post(
        "https://marvah-server.onrender.com/purchaseoil/create",
        {
          oilProductData, // Sending oilProductData as the payload
        }
      );
      alert(response.data.message);
 
    } catch (error) {
      console.error("There was an error submitting the data:", error);
    }
  };

  const calculateTotalLiters = (volumePerPieces, totalPCS) => {
    // Convert volume to liters if it's in ML
    const volumeInLiters = volumePerPieces / 1000;
    return (volumeInLiters * totalPCS).toFixed(1);
  };

  // console.log(totInvAmt);
  const localDate = new Date().toLocaleDateString();

  const [purchaseOilData, setPurchaseOilData] = useState([]);
  const fetchPurchaseOil = async () => {
    try {
      const res = await axios.get("https://marvah-server.onrender.com/purchaseoil");
      const dataWithCalculatedFields = res.data.map((item) => ({
        ...item,
        opStock: item.opStock || 0, // Initialize opStock if not already set
        outRetail: item.outRetail || 0, // Initialize outRetail if not already set
        totOpStock: item.opStock + item.invStock,
        balStock: item.opStock + item.invStock - item.outRetail,
        balStockAmt: (item.opStock + item.invStock - item.outRetail) * item.mrp,
      }));
      setPurchaseOilData(dataWithCalculatedFields);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPurchaseOil();
  }, []);

  const formattedDate = new Date(
    oilProductData[0]?.createdAt
  ).toLocaleDateString("en-GB");

  return (
    <>
      <form onSubmit={handleSubmit} className="">
        <h1 className="text-green-500 text-center uppercase text-3xl font-semibold">
          Purchase Oil
        </h1>
        <div>
          <label className="font-bold text-xl">
            Date : {formattedDate}
            {/* // */}
          </label>
          {/* <input
          type="text"
          // value={purchaseOilDate}
          name=""
          id=""
        /> */}
        </div>
        <h2 className="mb-2 text-xl text-center font-bold uppercase">Oil invoice / purchase</h2>

        <div>
          {/* {oilProductData} */}
          <label className="uppercase font-bold">Invoice Number :</label>
          <input
            className="ml-3 w-48 mt-4 mb-1 border-4 border-blue-600"
            type="number"
            value={(oilProductData.invoiceNo = invoiceNo)}
            onChange={(e) => setInvoiceNo(e.target.value)}
          />
          <br />
          <label className="uppercase font-bold">Invoice Amount :</label>
          <input
            className=" ml-2 w-48 border-4 border-blue-600"
            type="number"
            value={(oilProductData.totInvAmt = totInvAmt)}
            onChange={(e) => setTotInvAmt(e.target.value)}
          />
        </div>
        <div></div>

        <div className="flex gap-4">
          {/* Stock in Cases start */}
          <div className="overflow-x-auto">
          <h2 className="mb-2 mt-4 text-xl font-bold uppercase text-center">stock in pieces</h2>

            <table className="bg-white border border-gray-700">
              <thead className="">
                <tr className="bg-[#3A1078] text-white  uppercase text-sm">
                  <th className="py-1 px-2 text-center border-r">
                    Sr. <br /> No
                  </th>
                  <th className="py-1 px-2 text-center border-r">
                    Product <br /> Name
                  </th>
                  <th className="py-1 px-2 text-center border-r">Grade</th>
                  <th className="py-1 px-2 text-center border-r">Colour</th>

                  <th className="py-1 px-2 text-center border-r">MRP </th>
                  <th className="py-1 px-2 text-center border-r">
                    Volume. <br /> per PCS
                  </th>
                  <th className="py-1 px-2 text-center border-r">
                    Vol. <br />
                    Type
                  </th>

                  <th className="py-1 px-2">
                    Pieces <br />
                    perCase
                  </th>
                  <th className="py-1 px-2 ">
                    Pur.
                    <br /> T.Cases
                  </th>
                  <th className="py-1 px-2 text-left">
                    Total <br /> PCS
                  </th>
                </tr>
              </thead>
              <tbody className="text-md">
                {oilProductData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="px-1 border-r">
                      <input
                        className="w-8 text-center"
                        type="number"
                        value={item.srNo}
                        readOnly
                      />
                    </td>
                    <td className="px-1 border-r">
                      <input
                        className="w-28 text-center"
                        type="text"
                        value={item.productName}
                        readOnly
                      />
                    </td>
                    <td className=" px-1 border-r">
                      <input
                        className="w-20 text-center"
                        type="text"
                        value={item.grade}
                        readOnly
                      />
                    </td>
                    <td className=" px-1 border-r">
                      <input
                        className="w-20 text-center"
                        type="text"
                        value={item.colour}
                        readOnly
                      />
                    </td>
                    <td className=" px-2 border-r">
                      <input
                        className="w-12 text-center"
                        type="number"
                        value={item.mrp}
                        readOnly
                      />
                    </td>
                    <td className="px-2">
                      <input
                        className="w-12 text-center"
                        type="number"
                        value={item.volumePerPieces}
                        readOnly
                      />
                    </td>
                    <td className=" px-1">
                      <input
                        className="w-8 text-center"
                        type="text"
                        value={item.volumeType}
                        readOnly
                      />
                    </td>
                    <td className="px-2">
                      <input
                        className="w-12 text-center"
                        type="number"
                        value={item.pcsPerCase}
                        onChange={(e) => handleChange(e, index, "pcsPerCase")}
                        readOnly
                      />
                    </td>
                    <td className=" px-2">
                      <input
                        className="w-12 text-center border-4 border-blue-600"
                        type="number"
                        value={item.purchaseTCases}
                        onChange={(e) =>
                          handleChange(e, index, "purchaseTCases")
                        }
                      />
                    </td>
                    <td className="px-2">
                      <input
                        className="w-12 bg-green-500"
                        type="number"
                        value={item.totalPCS}
                        readOnly
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Stock in Cases end */}

          {/* Stock in Liters start */}
          <div className="overflow-x-auto">
            <h2 className="mb-2 text-xl mt-4 text-center font-bold uppercase">Stock in Litres</h2>

            <table className="bg-white border border-gray-700">
              <thead className="">
                <tr className="bg-[#3A1078] text-white  uppercase text-sm">
                  {/* <th className="py-1 px-2 text-center border-r">
                  Sr. <br /> No
                </th> */}
                  <th className="py-1 px-2 text-center border-r">
                    Volume. <br /> per PCS
                  </th>
                  <th className="py-1 px-2 text-center border-r">
                    Vol. <br /> Type
                  </th>

                  <th className="py-1 px-2 text-center border-r">
                    Total <br /> PCS
                  </th>
                  <th className="py-1 px-2 text-center border-r">
                    Total <br />
                    Litrs{" "}
                  </th>
                  <th className="py-1 px-2 text-center border-r">
                    Perunit
                    <br /> Price
                  </th>
                  <th className="py-1 px-2 text-center border-r">
                    Taxable. <br />
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="text-md">
                {oilProductData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    {/* <td className="px-1 border-r">
                    <input
                      className="w-8 text-center"
                      type="number"
                      value={item.srNo}
                      readOnly
                    />
                  </td> */}

                    <td className=" px-2 border-r">
                      <input
                        className="w-20 text-center"
                        type="number"
                        value={item.volumePerPieces}
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        className="w-12 text-center"
                        type="text"
                        value={item.volumeType}
                        readOnly
                      />
                    </td>
                    <td className="px-2">
                      <input
                        className="w-12 text-center"
                        type="number"
                        value={item.totalPCS}
                        readOnly
                      />
                    </td>
                    <td className=" px-1">
                      <input
                        className="w-12 text-center"
                        type="text"
                        value={calculateTotalLiters(
                          item.volumePerPieces,
                          item.totalPCS
                        )}
                        readOnly
                      />
                    </td>
                    <td className=" px-1">
                      <input
                        className="w-20 text-center border-blue-600 border-4"
                        type="number"
                        value={item.ratePerUnit}
                        onChange={(e) => handleChange(e, index, "ratePerUnit")}
                      />
                    </td>
                    <td className=" px-1">
                      <input
                        className="w-20 text-center bg-green-500"
                        type="text"
                        value={item.taxableValue}
                        readOnly
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stock in Liters end */}
        </div>

        {/* Invoice start */}
        <div className="overflow-x-auto mt-6">
  <h2 className="mb-2 mt-8 text-2xl text-center font-bold"></h2>

  <table className="bg-white border border-gray-700">
    <thead>
      <tr className="bg-[#3A1078] text-white uppercase text-sm">
        <th className="py-1 px-2 text-center border-r">
          Sr. <br /> No
        </th>
        <th className="py-1 px-2 text-center border-r">
          Taxable <br /> value
        </th>
        <th className="py-1 px-2 text-center border-r">
          Discount <br /> (-)
        </th>
        <th className="py-1 px-2 text-center border-r">
          Balance <br /> Amt (=)
        </th>
        <th className="py-1 px-2 text-center border-r">
          CGST <br /> (+)
        </th>
        <th className="py-1 px-2 text-center border-r">
          SGST <br /> (+)
        </th>
        <th className="py-1 px-2 text-center border-r">
          TCS <br /> (+)
        </th>
        <th className="py-1 px-2 text-center border-r">
          Total <br /> Amt (=)
        </th>
        <th className="py-1 px-2 text-center border-r">
          Total <br /> Pcs ()
        </th>
        <th className="py-1 px-2 text-center border-r">
          Landing <br /> Price
        </th>
      </tr>
    </thead>
    <tbody className="text-md">
      {oilProductData.map((item, index) => (
        <tr key={index} className="border-b border-gray-300">
          <td className="px-1 border-r">
            <input
              className="w-8 text-center"
              type="number"
              value={item.srNo}
              readOnly
            />
          </td>

          <td className=" px-2 border-r">
            <input
              className="w-24 text-center"
              type="number"
              value={item.taxableValue}
              readOnly
            />
          </td>
          <td>
            <input
              className="w-20 text-center border-4 border-blue-600"
              type="number"
              value={item.discount}
              onChange={(e) => handleChange(e, index, "discount")}
            />
          </td>
          <td className="px-2">
            <input
              className="w-24 text-center"
              type="number"
              value={item.balanceAmt}
              readOnly
            />
          </td>
          <td className=" px-1">
            <input
              className="w-24 text-center border-4 border-blue-600"
              type="number"
              onChange={(e) => handleChange(e, index, "cgst")}
              value={item.cgst}
            />
          </td>
          <td className=" px-1">
            <input
              className="w-20 text-center border-blue-600 border-4"
              type="number"
              value={item.sgst}
              onChange={(e) => handleChange(e, index, "sgst")}
            />
          </td>
          <td className=" px-1">
            <input
              className="w-24 text-center border-4 border-blue-600"
              onChange={(e) => handleChange(e, index, "tcs")}
              type="number"
              value={item.tcs}
            />
          </td>
          <td className=" px-1">
            <input
              className="w-24 text-center bg-green-500"
              type="number"
              value={item.totalAmt}
              readOnly
            />
          </td>
          <td className=" px-1">
            <input
              className="w-16 text-center"
              type="number"
              value={item.totalPCS}
              readOnly
            />
          </td>
          <td className=" px-1">
            <input
              className="w-24 text-center"
              type="number"
              value={item.landingPrice}
              readOnly
            />
          </td>
        </tr>
      ))}
      <tr>
        <td className="px-1 py-2 text-right" colSpan={4}>
          <strong></strong>
        </td>
        <td className="px-1">
          <input
            className="w-24 text-center"
            type="number"
            value={oilProductData.reduce((sum, item) => sum + item.cgst, 0)}
            readOnly
          />
        </td>
        <td className="px-1">
          <input
            className="w-24 text-center"
            type="number"
            value={oilProductData.reduce((sum, item) => sum + item.sgst, 0)}
            readOnly
          />
        </td>
        <td colSpan={4}></td>
      </tr>
      <tr>
        <td className="px-1 py-2 text-right" colSpan={7}>
          <strong>Purchase Amount:</strong>
        </td>
        <td className="px-1">
          <input
            className="w-24 text-center border-4 bg-green-500 border-green-500"
            type="number"
            value={totalAmt2}
            readOnly
          />
        </td>
        <td colSpan={2}></td>
      </tr>
      <tr>
        <td className="px-1 py-2 text-right" colSpan={7}>
          <strong>Other discount:</strong>
        </td>
        <td className="px-1">
          <input
            className="w-24 text-center border-4 border-blue-600"
            type="number"
            value={otherDiscount}
            onChange={(e) => {
              const newDiscount = Number(e.target.value);
              setOtherDiscount(newDiscount);
              setTotInvAmtAct(totalAmt2 - newDiscount);
            }}
          />
        </td>
        <td colSpan={2}></td>
      </tr>
      <tr>
        <td className="px-1 py-2 text-right" colSpan={7}>
          <strong>Total Invoice Amount:</strong>
        </td>
        <td className="px-1">
          <input
            className="w-24 text-center"
            value={totInvAmtAct}
            type="number"
            readOnly
          />
        </td>
        <td colSpan={2}></td>
      </tr>
    </tbody>
  </table>
</div>

        {/* <div className="overflow-x-auto">
          <h2 className="mb-2 text-2xl text-green-500">Invoice Details</h2>

          <table className="bg-white border border-gray-700">
            <thead className="">
              <tr className="bg-[#3A1078] text-white  uppercase text-sm">
                <th className="py-1 px-2 text-center border-r">
                  Sr. <br /> No
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Taxable <br />
                  value
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Discount <br />
                  (-)
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Balance <br />
                  Amt (=)
                </th>

                <th className="py-1 px-2 text-center border-r">
                  CGST <br /> (+)
                </th>
                <th className="py-1 px-2 text-center border-r">
                  SGST <br />
                  (+)
                </th>
                <th className="py-1 px-2 text-center border-r">
                  TCS
                  <br /> (+)
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Total <br />
                  Amt (=)
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Total <br />
                  Pcs ()
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Landing <br />
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="text-md">
              {oilProductData.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-1 border-r">
                    <input
                      className="w-8 text-center"
                      type="number"
                      value={item.srNo}
                      readOnly
                    />
                  </td>

                  <td className=" px-2 border-r">
                    <input
                      className="w-24 text-center"
                      type="number"
                      value={item.taxableValue}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      className="w-20 text-center border-4 border-blue-600"
                      type="number"
                      value={item.discount}
                      onChange={(e) => handleChange(e, index, "discount")}
                    />
                  </td>
                  <td className="px-2">
                    <input
                      className="w-24 text-center"
                      type="number"
                      value={item.balanceAmt}
                      readOnly
                    />
                  </td>
                  <td className=" px-1">
                    <input
                      className="w-24 text-center border-4 border-blue-600"
                      type="number"
                      onChange={(e) => handleChange(e, index, "cgst")}
                      value={item.cgst}
                    />
                  </td>
                  <td className=" px-1">
                    <input
                      className="w-20 text-center border-blue-600 border-4"
                      type="number"
                      value={item.sgst}
                      onChange={(e) => handleChange(e, index, "sgst")}
                    />
                  </td>
                  <td className=" px-1">
                    <input
                      className="w-24 text-center border-4 border-blue-600"
                      onChange={(e) => handleChange(e, index, "tcs")}
                      type="number"
                      value={item.tcs}
                    />
                  </td>
                  <td className=" px-1">
                    <input
                      className="w-24 text-center"
                      type="number"
                      value={item.totalAmt}
                      readOnly
                    />
                  </td>
                  <td className=" px-1">
                    <input
                      className="w-16 text-center"
                      type="number"
                      value={item.totalPCS}
                      readOnly
                    />
                  </td>
                  <td className=" px-1">
                    <input
                      className="w-24 text-center"
                      type="number"
                      value={item.landingPrice}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td className="px-1 py-2 text-right" colSpan={7}>
                  <strong>Total Amount2:</strong>
                </td>
                <td className="px-1">
                  <input
                    className="w-24 text-center"
                    type="number"
                    value={totalAmt2}
                    readOnly
                  />
                </td>
                <td colSpan={2}></td>
              </tr>
              <tr>
                <td className="px-1 py-2 text-right" colSpan={7}>
                  <strong>Other discount:</strong>
                </td>
                <td className="px-1">
                  <input
                    className="w-24 text-center  border-4 border-blue-600"
                    type="number"
                    value={otherDiscount}
                    onChange={(e) => {
                      const newDiscount = Number(e.target.value);
                      setOtherDiscount(newDiscount);
                      setTotInvAmtAct(totalAmt2 - newDiscount);
                    }}
                  />
                </td>
                <td colSpan={2}></td>
              </tr>
              <tr>
                <td className="px-1 py-2 text-right" colSpan={7}>
                  <strong>Total Invoice Amount:</strong>
                </td>
                <td className="px-1">
                  <input
                    className="w-24 text-center"
                    value={totInvAmtAct}
                    type="number"
                    readOnly
                  />
                </td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </table>
        </div> */}
        {/* Invoice end */}

        {/*Commission start */}

        <div className="overflow-x-auto">
          <h2 className="mb-2 text-xl font-bold uppercase ml-48">Difference</h2>

          <table className="bg-white border border-gray-700">
            <thead className="">
              <tr className="bg-[#3A1078] text-white  uppercase text-sm">
                <th className="py-1 px-2 text-center border-r">
                  Sr <br /> No
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Product <br /> Name
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Volume <br /> per PCS
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Vol. <br /> Type
                </th>

                <th className="py-1 px-2 text-center border-r">
                  MRP <br /> Price
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Landing <br />
                  Price{" "}
                </th>
                <th className="py-1 px-2 text-center text-white border-r">
                  Difference
                  <br /> Per PC
                </th>
              </tr>
            </thead>
            <tbody className="text-md">
              {oilProductData.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-1 border-r">
                    <input
                      className="w-8 text-center"
                      type="number"
                      value={item.srNo}
                      readOnly
                    />
                  </td>

                  <td className=" px-2 border-r">
                    <input
                      className="w-28 text-center"
                      type="text"
                      value={item.productName}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      className="w-20 text-center"
                      type="number"
                      value={item.volumePerPieces}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      className="w-12 text-center"
                      type="text"
                      value={item.volumeType}
                      readOnly
                    />
                  </td>
                  <td className="px-2">
                    <input
                      className="w-12 text-center"
                      type="number"
                      value={item.mrp}
                      readOnly
                    />
                  </td>
                  <td className=" px-1">
                    <input
                      className="w-12 text-center"
                      type="text"
                      value={item.landingPrice}
                      readOnly
                    />
                  </td>
                  <td className=" bg-green-500 px-1">
                    <input
                      className="w-20 text-center font-bold text-white bg-green-500"
                      type="number"
                      value={item.difference}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/*Commission end */}
  
      </form>

      {/* invoice report start */}
      <div className="overflow-x-auto mt-12">
  <form action="">
    <h2 className="mb-2 text-xl font-bold ml-40">AFTER FEEDING INVOICE REPORT</h2>
    <div>
      <span className="font-bold text-lg">Date: {formattedDate}</span>
      <br />

      <label className="uppercase font-bold">Invoice Number : </label>
      <input
        className="w-40 ml-4 mb-1 border-4 border-blue-600"
        type="number"
        value={(oilProductData.invoiceNo = invoiceNo)}
        onChange={(e) => setInvoiceNo(e.target.value)}
      />
      <br />
      <label className="uppercase font-bold">Invoice Amount : </label>
      <input
        className="w-40 ml-3 border-4 border-blue-600"
        type="number"
        value={totInvAmtAct}
        readOnly
      />
      <br />
    </div>
    <table className="bg-white border border-gray-700">
      <thead>
        <tr className="bg-[#3A1078] text-white uppercase text-sm">
          <th className="py-1 px-2 text-center border-r">
            Sr. <br /> No
          </th>
          <th className="py-1 px-2 text-center border-r">
            Product <br /> Name
          </th>
          <th className="py-1 px-2 text-center border-r">Grade</th>
          <th className="py-1 px-2 text-center border-r">Colour</th>
          <th className="py-1 px-2 text-center border-r">
            Volume. <br /> per PCS
          </th>
          <th className="py-1 px-2 text-center border-r">MRP</th>
          <th className="py-1 px-2">Receipt</th>
          <th className="py-1 px-2 text-center">
            Total <br /> Stock <br /> Amt
          </th>
        </tr>
      </thead>
      <tbody className="text-md">
        {oilProductData.map((item, index) => (
          <tr key={index} className="border-b border-gray-300">
            <td className="px-1 border-r">
              <input
                className="w-8 text-center"
                type="number"
                value={item.srNo}
                readOnly
              />
            </td>
            <td className="px-1 border-r">
              <input
                className="w-28 text-center"
                type="text"
                value={item.productName}
                readOnly
              />
            </td>
            <td className="px-1 border-r">
              <input
                className="w-20 text-center"
                type="text"
                value={item.grade}
                readOnly
              />
            </td>
            <td className="px-1 border-r">
              <input
                className="w-20 text-center"
                type="text"
                value={item.colour}
                readOnly
              />
            </td>
            <td className="px-2">
              <input
                className="w-16 text-center"
                type="number"
                value={item.volumePerPieces}
                readOnly
              />
            </td>
            <td className="px-2">
              <input
                className="w-12 text-center"
                type="number"
                value={item.mrp}
                readOnly
              />
            </td>
            <td className="px-2">
              <input
                className="w-12 text-center"
                type="number"
                value={item.totalPCS}
                readOnly
              />
            </td>
            <td className="px-2 bg-green-500">
              <input
                className="w-24 text-center bg-green-500"
                type="number"
                value={(item.totStockAmt = item.totalPCS * item.mrp)}
                readOnly
              />
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={7} className="text-right font-bold px-2">
            Total Stock Amount:
          </td>
          <td className="px-2 bg-green-500">
            <input
              className="w-24 text-center font-bold bg-green-500"
              type="number"
              value={oilProductData.reduce((sum, item) => sum + item.totStockAmt, 0)}
              readOnly
            />
          </td>
        </tr>
      </tbody>
    </table>
  </form>
</div>

      {/* <div className="overflow-x-auto mt-12">
        <form action="">
        <h2 className="mb-2 text-2xl text-green-500"> AFTER FEEDING INVOICE REPORT</h2>
          <div>
         <span className="font-bold text-lg">Date : {formattedDate} </span>  
         <br />
      
          <label className="uppercase font-bold">Invoice No :</label>
          <input
            className=" w-40 mb-1 border-4 border-blue-600"
            type="number"
            value={(oilProductData.invoiceNo = invoiceNo)}
            onChange={(e) => setInvoiceNo(e.target.value)}
          />
          <br />
          <label className="uppercase font-bold">Invoice Amount :</label>
          <input
            className=" w-28 border-4 border-blue-600"
            type="number"
            value={totInvAmtAct}
            readOnly
            // onChange={(e) => setTotInvAmt(e.target.value)}
          /> <br />

          </div>
        <table className="bg-white border border-gray-700">
          <thead className="">
            <tr className="bg-[#3A1078] text-white  uppercase text-sm">
              <th className="py-1 px-2 text-center border-r">
                Sr. <br /> No
              </th>
              <th className="py-1 px-2 text-center border-r">
                Product <br /> Name
              </th>
              <th className="py-1 px-2 text-center border-r">Grade</th>
              <th className="py-1 px-2 text-center border-r">Colour</th>

              <th className="py-1 px-2 text-center border-r">
                {" "}
                Volume. <br /> per PCS{" "}
              </th>
              <th className="py-1 px-2 text-center border-r">MRP</th>

              <th className="py-1 px-2">Receipt</th>
              <th className="py-1 px-2 text-center ">
                Total <br />
                Stock
                <br /> Amt
              </th>
            </tr>
          </thead>
          <tbody className="text-md">
            {oilProductData.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-1 border-r">
                  <input
                    className="w-8 text-center"
                    type="number"
                    value={item.srNo}
                    readOnly
                  />
                </td>
                <td className="px-1 border-r">
                  <input
                    className="w-28 text-center"
                    type="text"
                    value={item.productName}
                    readOnly
                  />
                </td>
                <td className=" px-1 border-r">
                  <input
                    className="w-20 text-center"
                    type="text"
                    value={item.grade}
                    readOnly
                  />
                </td>
                <td className=" px-1 border-r">
                  <input
                    className="w-20 text-center"
                    type="text"
                    value={item.colour}
                    readOnly
                  />
                </td>
                <td className="px-2">
                  <input
                    className="w-16 text-center"
                    type="number"
                    value={item.volumePerPieces}
                    readOnly
                  />
                </td>
                <td className="px-2">
                  <input
                    className="w-12 text-center"
                    type="number"
                    value={item.mrp}
                    readOnly
                  />
                </td>

                <td className="px-2">
                  <input
                    className="w-12 text-center"
                    type="number"
                    value={item.totalPCS}
                    readOnly
                  />
                </td>
                <td className=" px-2">
                  <input
                    className="w-24 text-center"
                    type="number"
                    value={(item.totStockAmt = item.totalPCS * item.mrp)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </form>
      </div> */}
      <div className="flex justify-around">
        <button></button>
        <button
          onClick={handleSubmit}
          className="px-5 py-2 text-white uppercase  bg-blue-500 font-bold rounded-lg"
        >
         Save  Stock to Godown
        </button>
      </div>
      {/* invoice report end */}
    </>
  );
};

export default PurchaseOil;
