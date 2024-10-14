// import React, { useState, useEffect, useRef } from "react";
// import Petrol_Decantation from "../objects/Petrol_Decantation";

// import axios from "axios";
// import "../css/Tank.css";
// import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// const initValue = {
//   serialNumber: "",
//   invoiceNumber: "",
//   product: "",
//   klQty: "",
//   Value: "",
//   taxamount: "",
//   productAmount: "",
//   vatPercent: "",
//   vat: "",
//   vatlst: "",
//   totalAmount: "",
//   productAmountSumTds: "",
//   tds: "",
//   TotPayableTds: "",
//   lfrPerKl: "", //indiv prod
//   cgst: "",
//   sgst: "",
//   tdsLfr: "",
//   lfrTaxAmt: "", //indiv prod
//   lfrPerKlSumTds: "", //lfrTaxAmt + cgst + sgst of both ms,hsd
//   totInvoiceAmt: "",
//   total: "",
//   totCgst: "",
//   totSgst: "",
//   totalLfrValue: "",
// };

// export default function Petrol_Invoice_Feeding() {
//   const [feedings, setFeedings] = useState([]);
//   const [saveData, setSaveData] = useState(initValue);
//   const [data, setData] = useState([]);
//   const [filterData, setFilterData] = useState({});
//   const [petrolInvoice, setPetrolInvoice] = useState([]);
//   const [productAmtSum, setProductAmtSum] = useState(0);
//   const [invFeedingData, setInvFeedingData] = useState([]);
//   const [productAmtSumTds, setProductAmtSumTds] = useState(0);

//   const location = useLocation();
//   const values = location.state?.data || null;
//   console.log("values", values);

//   useEffect(() => {
//     if (values) {
//       setSaveData((prev) => ({
//         ...prev,
//         _id: values._id,
//         serialNumber: values?.serialNumber,
//         invoiceNumber: values?.invoiceNumber,
//         ProductName: values?.ProductName,
//         klQty: values?.klQty,
//         Value: values?.Value,
//         taxamount: values?.taxamount,
//         rate: values?.rate,
//         productAmount: parseInt(values?.productAmount),
//         vat: values?.vat,
//         vatlst: values?.vatlst,
//         cess: values?.cess,
//         tcs: values?.tcs,
//         totalAmount: values?.totalAmount,
//         tds: values?.tds,
//         lfrPerKl: values?.lfrPerKl,
//         cgst: values?.cgst,
//         tdsLfr: values?.tdsLfr,
//         sgst: values?.sgst,
//       }));
//       // setFilterData((prev)=>({
//       //   ...prev,
//       //   rate:parseInt(values?.rate),

//       // }))
//       // setData((prev)=>({
//       //   ...prev,
//       //   ProductName:values?.ProductName,

//       // }))
//     }
//   }, []);

//   console.log("saveData new", saveData);

//   const handleSelect = (e) => {
//     const finalProduct = data?.filter(
//       (item) => item.ProductName === e.target.value
//     );
//     if (finalProduct.length > 0) {
//       setFilterData(finalProduct[0]);
//       setSaveData((prevFormData) => ({
//         ...prevFormData,
//         product: e.target.value,
//         rate: finalProduct[0].rate,
//         taxamount: finalProduct[0].taxamount,
//         vatPercent: finalProduct[0].vatPercent,
//         vat: finalProduct[0].vat,
//         cess: finalProduct[0].cess,
//         tcs: finalProduct[0].tcs,
//         tds: finalProduct[0].tds,
//         lfrPerKl: finalProduct[0].lfrPerKl,
//         cgst: finalProduct[0].cgst,
//         sgst: finalProduct[0].sgst,
//         tdsLfr: finalProduct[0].tdsLfr,
//       }));
//     }
//   };
//   console.log("saveData", saveData);

//   const fetchPetrol = () => {
//     axios
//       .get("https://marvah-server.onrender.com/petrol")
//       .then((res) => {
//         if (res.data) {
//           setData(res.data);
//         }
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   useEffect(() => {
//     fetchPetrol();
//   }, []);

//   const fetchPetrolInvFeeding = () => {
//     axios
//       .get("https://marvah-server.onrender.com/petrolInvoiceFeeding")
//       .then((res) => {
//         if (res.data) {
//           setInvFeedingData(res.data.petrolInvoice);
//         }
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   console.log("invFeedingData", invFeedingData);
//   useEffect(() => {
//     fetchPetrolInvFeeding();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // setFormData({
//     //   ...formData,
//     //   [name]: value,
//     // });
//     setSaveData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   // console.log("tds", saveData.tds);
//   const calculateValues = (formData, filterData) => {
//     const { klQty, vat, lfrPerKl, tdsLfr, cgst, sgst } = formData;
//     const { rate, taxamount, cess, tcs } = filterData;

//     const Value = (klQty * rate).toFixed(1);
//     const productAmount = (
//       parseFloat(Value) +
//       parseFloat(taxamount) * parseFloat(saveData.klQty)
//     ).toFixed(1);
//     // const vatlst = (productAmount * (vatPercent / 100)).toFixed(1);
//     const vatlst = (productAmount);

//     const totalAmount = (
//       parseFloat(productAmount) +
//       parseFloat(vatlst) +
//       parseFloat(cess) * saveData.klQty +
//       parseFloat(tcs)
//     ).toFixed(1);
//     console.log("total amount", totalAmount);

//     return {
//       Value: parseFloat(Value),
//       productAmount: parseFloat(productAmount),
//       vatlst: parseFloat(vatlst * vat),
//       totalAmount:
//         parseFloat(productAmount) +
//         parseFloat(vatlst * vat) +
//         parseFloat(cess * klQty),
//       taxamount: parseFloat(taxamount * klQty),
//       cess: parseFloat(cess * klQty),
//       lfrTaxAmt: parseFloat(lfrPerKl * klQty),
//       totCgst: parseFloat(lfrPerKl * klQty * cgst),
//       totSgst: parseFloat(lfrPerKl * klQty * sgst),
//       totalLfrValue:
//         parseFloat(lfrPerKl * klQty) +
//         parseFloat(lfrPerKl * klQty * cgst) +
//         parseFloat(lfrPerKl * klQty * sgst),
//     };
//   };

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (saveData.klQty && filterData.rate) {
//       const calculatedValues = calculateValues(saveData, filterData);
//       setSaveData((prevFormData) => ({
//         ...prevFormData,
//         ...calculatedValues,
//       }));
//     }
//   }, [saveData.klQty, saveData.vatPercent, filterData]);

//   const handleSubmit = () => {
//     // Calculate total product amount
//     const productAmountSumTds = petrolInvoice.reduce((accumulator, item) => {
//       return accumulator + (item.productAmount || 0); // Default to 0 if productAmount is undefined or null
//     }, 0);

//     const TotPayableTds = productAmountSumTds * saveData.tds;
//     const calculatedValues = calculateValues(saveData, filterData);

//     const finalData = {
//       ...saveData,
//       ...filterData,
//       ...calculatedValues,
//       serialNumber: saveData.serialNumber,
//       klQty: parseFloat(saveData.klQty),
//       vatPercent: parseFloat(saveData.vatPercent),
//       Value: parseFloat(calculatedValues.Value),
//       productAmount: parseFloat(calculatedValues.productAmount),
//       vatlst: parseFloat(calculatedValues.vatlst),
//       totalAmount: parseFloat(calculatedValues.totalAmount),
//       productAmountSumTds: parseFloat(productAmountSumTds), // Add Total Product Amount here
//       totInvoiceAmt: parseFloat(totInvoiceAmt),
//       TotPayableTds: parseFloat(TotPayableTds),
//       lfrTaxAmt: parseFloat(saveData.lfrTaxAmt),
//       InvTotSum: parseFloat(InvTotSum),
//     };

//     // console.log("Final Data:", finalData);
//     console.log("filterData:", filterData);

//     axios
//       .post("https://marvah-server.onrender.com/petrolInvoiceFeeding/create", finalData)
//       .then((res) => {
//         alert(res.data.msg);
//         handleFetchData();
//         setSaveData(initValue); // Reset the form
//         // setShowDecantation(true);
//         navigate("/invLfrTds")

//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   const handleFetchData = () => {
//     axios
//       .get("https://marvah-server.onrender.com/petrolInvoiceFeeding")
//       .then((res) => {
//         setPetrolInvoice(res.data.petrolInvoice);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   const topScrollRef = useRef(null);
//   const tableScrollRef = useRef(null);

//   const handleScroll = (sourceRef, targetRef) => {
//     if (sourceRef.current && targetRef.current) {
//       targetRef.current.scrollLeft = sourceRef.current.scrollLeft;
//     }
//   };

//   const handleDelete = async (id) => {
//     const res = await axios.delete(
//       `https://marvah-server.onrender.com/petrolInvoiceFeeding/delete/${id}`
//     );
//     if (res.data.success) {
//       alert(res.data.message);
//       handleFetchData();
//     }
//   };

//   // Calculate the total product amount
//   const productAmountSumTds = petrolInvoice.reduce((accumulator, item) => {
//     return accumulator + (item.productAmount || 0); // Default to 0 if productAmount is undefined or null
//   }, 0);

//   const totInvoiceAmt = invFeedingData.reduce((accumulator, item) => {
//     return accumulator + (item.totalAmount || 0); // Default to 0 if totalAmount is undefined or null
//   }, 0);

//   // console.log("Total Product Amount:", productAmountSumTds);
//   console.log("totInvoiceAmt", totInvoiceAmt);

//   useEffect(() => {
//     handleFetchData();
//   }, []);

//   function formatDate(dateString) {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
//     const year = date.getFullYear();

//     return `${day}-${month}-${year}`;
//   }

//   const [formData, setFormData] = useState(petrolInvoice);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Handle change in form inputs
//   const handleChangeUpdate = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   // Handle form submission for update
//   const handleUpdate = async (id) => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Make PUT request to update petrol invoice feeding
//       const response = await axios.patch(
//         `https://marvah-server.onrender.com/petrolInvoiceFeeding/update/${id}`,
//         saveData
//       );

//       if (response.data.success) {
//         // Handle success: invoke a success callback or display a success message
//         alert(response.data.message);
//         // onSuccess(); // Call a success handler to refresh the list or update UI
//       }
//     } catch (error) {
//       console.error("Error updating invoice:", error);
//       setError("Failed to update the invoice. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [showDecantation, setShowDecantation] = useState(false);

//   const getCurrentDate = () => {
//     const today = new Date();
//     const day = String(today.getDate()).padStart(2, "0");
//     const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
//     const year = String(today.getFullYear()).slice(-2); // Get last two digits of the year

//     return `${day}-${month}-${year}`;
//   };

//   const InvTotSum = petrolInvoice.reduce(
//     (sum, item) => sum + (item.totalAmount || 0),
//     0
//   );

//   return (
//     <>
//       <div className="tankMainDiv shadow-lg  bg-body-tertiary rounded">
//         <h2 className="font-bold fixed w-[80%] mb-4 text-2xl text-center uppercase">
//           Petrol Invoice Feeding
//         </h2>
//         <div className="mb-2 flex justify-between mt-8 w-[90%] ml-4">
//           <div className="text-2xl  font-bold"> Date : {getCurrentDate()} </div>
//           <div className="text-xl flex gap-2 text-white  font-bold rounded-md">
//            <div>
//            {/* <Link to={"/Petrol_Products"} className="p-2 bg-green-600 rounded-md">
//               petrol Index Form
//             </Link> */}
//             </div>
//             <div>
//            <Link to={"/purchasetds"} className="p-2 bg-green-600 rounded-md">
//              Reports
//             </Link>
//             </div>
//           </div>
//         </div>

//         <div className="w-[90%] ml-4">
//           <form action="" onSubmit={(e) => e.preventDefault()}>
//             <table className="table text-center">
//               <thead>
//                 <tr className="bg-[#008b8b]  text-center">
//                   <th className="">S.No.</th>
//                   <th className="">Invoice No.</th>
//                   <th className="">Product</th>
//                   <th className="">KL/Qty</th>

//                   <th className="">Rate</th>

//                   <th className="">Value</th>

//                   <th className="">Taxable Amount</th>

//                   <th className="">Product Amount</th>
//                   {/* <th className="">TDS %</th> */}
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="bigFontWeight">
//                     <input
//                       name="serialNumber"
//                       // value={saveData.serialNumber}
//                       value={saveData.serialNumber}
//                       type="text"
//                       className="form-control bigFontWeight editableInput"
//                       onChange={handleChange}
//                     />
//                   </td>
//                   <td className="bigFontWeight">
//                     <textarea
//                       type="text"
//                       name="invoiceNumber"
//                       value={saveData.invoiceNumber}
//                       className="form-control bigFontWeight editableInput resize-x w-[150px]  h-6"
//                       onChange={handleChange}
//                     />
//                   </td>
//                   <td>
//                     <select
//                       style={{ width: "120px" }}
//                       name="product"
//                       className="form-select editableInput bigFontWeight"
//                       aria-label="Default select example"
//                       onChange={(e) => handleSelect(e)}
//                     >
//                       <option>- Product -</option>
//                       {data &&
//                         data.map((rest, index) => (
//                           <option key={index} value={rest.ProductName}>
//                             {rest.ProductName}
//                           </option>
//                         ))}
//                     </select>
//                   </td>
//                   <td className="bigFontWeight">
//                     <input
//                       type="text"
//                       name="klQty"
//                       value={saveData.klQty}
//                       className="editableInput form-control bigFontWeight"
//                       onChange={handleChange}
//                     />
//                   </td>

//                   <td className="bigFontWeight">
//                     <input
//                       type="text"
//                       name="rate"
//                       className="form-control bigFontWeight"
//                       // value={filterData.rate || ""}
//                       value={filterData.rate || ""}
//                       onChange={handleChange}
//                     />
//                   </td>

//                   <td className="bigFontWeight">
//                     <textarea
//                       type="text"
//                       name="Value"
//                       className="form-control bigFontWeight resize-x h-6"
//                       value={saveData.Value}
//                       disabled
//                     />
//                   </td>

//                   <td>
//                     <input
//                       type="text"
//                       name="taxamount"
//                       // value={filterData.taxamount * saveData.klQty || ""}
//                       // value={filterData.taxamount*9|| ""}
//                       value={saveData.taxamount}
//                       className="form-control bigFontWeight"
//                       disabled
//                     />
//                   </td>

//                   <td className="bigFontWeight">
//                     <textarea
//                       type="text"
//                       name="productAmount"
//                       className="form-control bigFontWeight resize-x h-6"
//                       value={saveData.productAmount}
//                       onChange={handleChange}
//                       disabled
//                     />
//                   </td>
//                   {/* <td>
//                   <input
//                     type="number"
//                     value={(saveData.tds = 0.01)}
//                     onChange={handleChange}
//                     className="border-4 border-blue-500 w-16 rounded-md p-2"
//                     // onChange={(e)=>setSaveData.tds(e.target.value)}
//                   />
//                 </td> */}
//                 </tr>
//               </tbody>
//             </table>
//             <br />
//             <table className="table">
//               <thead>
//                 <tr className="text-center">
//                   <th className="">(=)</th>
//                   <th className="">VAT %</th>
//                   <th className="">VAT/LST</th>
//                   <th className="">(+)</th>
//                   <th className="">CESS</th>
//                   <th className="">(+)</th>
//                   <th className="">TCS</th>
//                   <th className="">(=)</th>
//                   <th className="">T. AMT</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="bigFontWeight">(=)</td>
//                   <td className="bigFontWeight">
//                     <input
//                       type="text"
//                       name="vat"
//                       className="form-control bigFontWeight"
//                       value={saveData.vat}
//                       onChange={handleChange}
//                     />
//                   </td>
//                   <td className="bigFontWeight">
//                     <input
//                       type="text"
//                       name="vatlst"
//                       className="form-control bigFontWeight"
//                       value={saveData?.vatlst || "0"}
//                       // value={saveData.vatPercent ? saveData.vatlst : ""}
//                       disabled
//                     />
//                   </td>
//                   <td className="bigFontWeight">(+)</td>
//                   <td className="bigFontWeight">
//                     <input
//                       type="text"
//                       value={filterData.cess * saveData.klQty || "0"}
//                       className="form-control bigFontWeight"
//                       disabled
//                     />
//                   </td>
//                   <td className="bigFontWeight">(+)</td>
//                   <td className="bigFontWeight">
//                     <input
//                       type="text"
//                       value={filterData.tcs || "0"}
//                       className="form-control bigFontWeight"
//                       disabled
//                     />
//                   </td>
//                   <td className="bigFontWeight">(=)</td>
//                   <td className="bigFontWeight">
//                     <input
//                       type="text"
//                       name="totalAmount"
//                       className="form-control bigFontWeight"
//                       value={(saveData.totalAmount)}
//                       disabled
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             <br />
//             <table className="table">
//               <thead>
//                 <tr className="text-center uppercase">
//                   <th className="">TDS(%)</th>
//                   <th className="uppercase">lfr rate</th>
//                   <th className="">cgst</th>
//                   <th className="">sgst</th>
//                   <th className="">tds(Lfr)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="bigFontWeight">
//                     <input
//                       type="text"
//                       name="tds"
//                       className="form-control bigFontWeight"
//                       value={saveData.tds}
//                       onChange={handleChange}
//                     />
//                   </td>
//                   <td className="bigFontWeight">
//                     <input
//                       type="text"
//                       name="lfrPerKl"
//                       className="form-control bigFontWeight"
//                       value={saveData.lfrPerKl}
//                       disabled
//                     />
//                   </td>
//                   <td className="bigFontWeight">
//                     <input
//                       type="text"
//                       name="cgst"
//                       className="form-control bigFontWeight"
//                       value={saveData.cgst}
//                       disabled
//                     />
//                   </td>
//                   <td className="bigFontWeight">
//                     <input
//                       type="text"
//                       name="sgst"
//                       className="form-control bigFontWeight"
//                       value={saveData.sgst}
//                       disabled
//                     />
//                   </td>
//                   <td className="bigFontWeight">
//                     <input
//                       type="text"
//                       name="tdsLfr"
//                       className="form-control bigFontWeight"
//                       value={saveData.tdsLfr}
//                       disabled
//                     />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <div className="text-right">
//               {values ? (
//                 <button
//                   type="submit"
//                   className="px-5 py-2.5 bg-green-500 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-300"
//                   onClick={handleUpdate}
//                 >
//                   Edit
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="px-5 py-2.5 bg-blue-500 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-300"
//                   onClick={handleSubmit}
//                 >
                  
//                   SAVE
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//         <br />

//         {/* {showDecantation && (
//           <div>
//             <Petrol_Decantation />
//           </div>
//         )} */}

//         {/* 1. invoice feed start  */}
          
//           {!showDecantation && <>
//             <h2 className=" text-xl font-bold mb-1 mt-1 text-center uppercase">
//           Invoice entry{" "}
//         </h2>

//         <div className="relative">
//           <div
//             className="overflow-x-auto scroll-mx-5"
//             ref={topScrollRef}
//             onScroll={() => handleScroll(topScrollRef, tableScrollRef)}
//             style={{ height: "1.5rem" }}
//           >
//             <div style={{ width: "200%" }}></div>
//           </div>

//           <table className="w-[93%]">
//             <thead className="px-2">
//               <tr className="text-center uppercase px-2">
//                 <th className="border-2 px-2 border-gray-900">S.No.</th>
//                 <th className="border-2 border-gray-900">Invoice No.</th>
//                 <th className="border-2 border-gray-900">Product</th>
//                 <th className="border-2 border-gray-900">KL/Qty</th>
//                 <th className="border-2 border-gray-900">x</th>
//                 <th className="border-2 px-2 border-gray-900">Rate/Unit</th>
//                 <th className="border-2 border-gray-900">=</th>
//                 <th className="border-2 px-2 border-gray-900">Value</th>
//                 <th className="border-2 border-gray-900">+</th>
//                 <th className="border-2 border-gray-900 w-16">
//                   Taxable Amount
//                 </th>
//                 <th className="border-2 border-gray-900">=</th>
//                 <th className="border-2 border-gray-900">Product <br /> Amount</th>
//                 <th className="border-2 border-gray-900">x</th>
//                 <th className="border-2 border-gray-900">VAT %</th>
//                 <th className="border-2 border-gray-900">=</th>
//                 <th className="border-2 border-gray-900">VAT/LST</th>
//                 <th className="border-2 border-gray-900">+</th>
//                 <th className="border-2 border-gray-900">CESS</th>
//                 <th className="border-2 border-gray-900">+</th>
//                 <th className="border-2 border-gray-900">TCS</th>
//                 <th className="border-2 border-gray-900">=</th>
//                 <th className="border-2 border-gray-900">T Amount</th>
//                 {/* <th className="border-2 border-gray-900">T inv Amount</th> */}
//                 {/* <th className="border-2 border-gray-900">Action</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {petrolInvoice.length > 0 &&
//                 petrolInvoice.map((item, index, array) => {
//                   // Check if this is the first product for this invoice
//                   const isFirstRowOfInvoice =
//                     index === 0 ||
//                     item.invoiceNumber !== array[index - 1].invoiceNumber;

//                   return (
//                     <tr key={index} className="text-center">
//                       {/* SR NO and INVOICE NO Merging */}
//                       {isFirstRowOfInvoice && (
//                         <>
//                           {/* S.No */}
//                           <td
//                             rowSpan={
//                               array.filter(
//                                 (rowItem) =>
//                                   rowItem.invoiceNumber === item.invoiceNumber
//                               ).length
//                             }
//                             className="border-2 border-gray-900"
//                           >
//                             {item.serialNumber}
//                           </td>

//                           {/* Invoice No */}
//                           <td
//                             rowSpan={
//                               array.filter(
//                                 (rowItem) =>
//                                   rowItem.invoiceNumber === item.invoiceNumber
//                               ).length
//                             }
//                             className="border-2 border-gray-900"
//                           >
//                             {item.invoiceNumber}
//                           </td>
//                         </>
//                       )}

//                       {/* Product Name */}
//                       <td className="border-2 border-gray-900">
//                         {item.ProductName}
//                       </td>

//                       {/* KL/Qty */}
//                       <td className="border-2 border-gray-900">{item.klQty}</td>
//                       <td className="border-2 border-gray-900 w-[1%]">x</td>

//                       {/* Rate per Unit */}
//                       <td className="border-2 border-gray-900">{item.rate}</td>
//                       <td className="border-2 border-gray-900 w-[1%]">=</td>

//                       {/* Value */}
//                       <td className="border-2 border-gray-900">{item.Value}</td>
//                       <td className="border-2 border-gray-900 w-[1%]">+</td>

//                       {/* Taxable Amount */}
//                       <td className="border-2 border-gray-900 w-16">
//                         {item.taxamount}
//                       </td>
//                       <td className="border-2 border-gray-900 w-[1%]">=</td>

//                       {/* Product Amount */}
//                       <td className="border-2 border-gray-900">
//                         {item.productAmount}
//                       </td>
//                       <td className="border-2 border-gray-900 w-[1%]">x</td>

//                       {/* VAT % */}
//                       <td className="border-2 border-gray-900 w-[12]">
//                         {item.vat}
//                       </td>
//                       <td className="border-2 border-gray-900 w-[1%]">=</td>

//                       {/* VAT/LST */}
//                       <td className="border-2 border-gray-900">
//                         {item.vatlst.toFixed()}
//                       </td>
//                       <td className="border-2 border-gray-900 w-[1%]">+</td>

//                       {/* CESS */}
//                       <td className="border-2 border-gray-900">{item.cess}</td>
//                       <td className="border-2 border-gray-900 w-[1%]">+</td>

//                       {/* TCS */}
//                       <td className="border-2 border-gray-900">{item.tcs}</td>
//                       <td className="border-2 border-gray-900 w-[1%]">=</td>

//                       {/* Total Amount */}
//                       <td  className="border-2 border-gray-900">
//                         {(item.totalAmount)?.toFixed(2)}
//                       </td>

//                       {/* Total Invoice Amount */}
//                       <td hidden className="border-2 border-gray-900">
//                         {InvTotSum.toFixed(2)}
//                       </td>

                  
//                     </tr>
//                   );
//                 })}
//             </tbody>
//           </table>

//           <div className="flex justify-between mt-2 mb-4">
//             <div></div>

//             <div
//               className="text-center mr-16 font-bold border-gray-900"
//               colSpan={4}
//             >
//               T. Invoice Amt:{" "}
//               <span className="border-2 p-2 border-gray-900 mr-5">
//                 {" "}
//                 {totInvoiceAmt.toFixed(2)}{" "}
//               </span>
//             </div>
//           </div>
//         </div>
//           </>}
//         {showDecantation && (
//           <>
//             <div className="lfr-tds-inv">
//               <h2 className=" text-xl font-bold mb-1 text-center uppercase">
//                 Invoice entry{" "}
//               </h2>

//               <div className="relative">
//                 <div
//                   className="overflow-x-auto scroll-mx-5"
//                   ref={topScrollRef}
//                   onScroll={() => handleScroll(topScrollRef, tableScrollRef)}
//                   style={{ height: "1.5rem" }}
//                 >
//                   <div style={{ width: "200%" }}></div>
//                 </div>

//                 <table className="">
//                   <thead className="px-2">
//                     <tr className="text-center uppercase px-2">
//                       <th className="border-2 px-2 border-gray-900">S.No.</th>
//                       <th className="border-2 border-gray-900">Invoice No.</th>
//                       <th className="border-2 border-gray-900">Product</th>
//                       <th className="border-2 border-gray-900">KL/Qty</th>
//                       <th className="border-2 border-gray-900">x</th>

//                       <th className="border-2 px-2 border-gray-900">
//                         Rate/Unit
//                       </th>
//                       <th className="border-2 border-gray-900">=</th>

//                       <th className="border-2 px-2 border-gray-900">Value</th>
//                       <th className="border-2 border-gray-900">+</th>

//                       <th className="border-2 border-gray-900 w-16">
//                         Taxable Amount
//                       </th>
//                       <th className="border-2 border-gray-900">=</th>

//                       <th className="border-2 border-gray-900">
//                         Product Amount
//                       </th>
//                       <th className="border-2 border-gray-900">x</th>

//                       <th className="border-2 border-gray-900">VAT %</th>
//                       <th className="border-2 border-gray-900">=</th>

//                       <th className="border-2 border-gray-900">VAT/LST</th>
//                       <th className="border-2 border-gray-900">+</th>

//                       <th className="border-2 border-gray-900">CESS</th>
//                       <th className="border-2 border-gray-900">+</th>

//                       <th className="border-2 border-gray-900">TCS</th>
//                       <th className="border-2 border-gray-900">=</th>

//                       <th className="border-2 border-gray-900">T Amount</th>
//                       <th className="border-2 border-gray-900">T inv Amount</th>
//                       <th className="border-2 border-gray-900">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {petrolInvoice.length > 0 &&
//                       petrolInvoice.map((item, index) => (
//                         <tr key={index} className="text-center">
//                           <td className="border-2 border-gray-900 ">
//                             {item.serialNumber}
//                           </td>

//                           <td className="border-2 border-gray-900">
//                             {item.invoiceNumber}
//                           </td>
//                           <td className="border-2 border-gray-900">
//                             {item.ProductName}
//                           </td>
//                           <td className="border-2 border-gray-900">
//                             {item.klQty}
//                           </td>
//                           <td className="border-2 border-gray-900 w-[1%]">x</td>

//                           <td className="border-2 border-gray-900">
//                             {item.rate}
//                           </td>
//                           <td className="border-2 border-gray-900 w-[1%]">=</td>
//                           <td className="border-2 border-gray-900">
//                             {item.Value}
//                           </td>
//                           <td className="border-2 border-gray-900 w-[1%]">+</td>

//                           <td className="border-2 border-gray-900 w-16">
//                             {item.taxamount}
//                           </td>
//                           <td className="border-2 border-gray-900 w-[1%]">=</td>

//                           <td className="border-2 border-gray-900">
//                             {item.productAmount}
//                           </td>
//                           <td className="border-2 border-gray-900 w-[1%]">x</td>

//                           <td className="border-2 border-gray-900 w-[12]">
//                             {item.vat}
//                           </td>
//                           <td className="border-2 border-gray-900 w-[1%]">=</td>

//                           <td className="border-2 border-gray-900">
//                             {item.vatlst.toFixed()}
//                           </td>
//                           <td className="border-2 border-gray-900 w-[1%]">+</td>

//                           <td className="border-2 border-gray-900">
//                             {item.cess}
//                           </td>
//                           <td className="border-2 border-gray-900 w-[1%]">+</td>

//                           <td className="border-2 border-gray-900">
//                             {item.tcs}
//                           </td>
//                           <td className="border-2 border-gray-900 w-[1%]">=</td>

//                           <td className="border-2 border-gray-900">
//                             {item.totalAmount}
//                           </td>

//                           <td className="border-2 border-gray-900">
//                             {InvTotSum.toFixed(2)}
//                           </td>
//                           <td className="border-2 border-gray-900">
//                             <button
//                               onClick={() => handleDelete(item._id)}
//                               type="button"
//                               class="w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white"
//                             >
//                               <MdDelete color="red" size={25} />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//                 <div className="flex justify-between mt-2">
//                   <div></div>

//                   <div
//                     className="text-center mr-16 font-bold border-gray-900"
//                     colSpan={4}
//                   >
//                     T. Invoice Amt:{" "}
//                     <span className="border-2 p-2 border-gray-900">
//                       {" "}
//                       {totInvoiceAmt.toFixed(2)}{" "}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               {/* 1. invoice feed end  */}

//               {/* 2. tds start  */}
//               <h2 className=" text-xl font-bold mb-1 text-center uppercase">
//                 tds 194Q entry{" "}
//               </h2>
//               <div className="relative">
//                 <div
//                   className="overflow-x-auto scroll-mx-5"
//                   ref={topScrollRef}
//                   onScroll={() => handleScroll(topScrollRef, tableScrollRef)}
//                   style={{ height: "1.5rem" }}
//                 >
//                   {/* <div style={{ width: "200%" }}></div> */}
//                 </div>

//                 <table className="">
//                   <thead className="">
//                     <tr className="text-center uppercase">
//                       <th className="border-2 border-gray-900">S.No.</th>

//                       <th className="border-2 border-gray-900">Invoice No.</th>
//                       <th className="border-2 border-gray-900">Product</th>
//                       <th className="border-2 border-gray-900">KL/Qty</th>

//                       <th className="border-2 border-gray-900">
//                         Value <br />
//                         (A)
//                       </th>
//                       <th className="border-2 border-gray-900 w-[1%] text">
//                         +
//                       </th>

//                       <th className="border-2 border-gray-900">
//                         Taxable Amt. <br />
//                         (B)
//                       </th>
//                       <th className="border-2 border-gray-900 w-[1%] text">
//                         =
//                       </th>

//                       <th className="border-2 border-gray-900">
//                         Product amt. <br />
//                         (C)
//                       </th>
//                       <th className="border-2 border-gray-900">x</th>
//                       <th className="border-2 border-gray-900">tds(%)</th>
//                       <th className="border-2 border-gray-900">
//                         Act. tds payable
//                       </th>

//                       <th className="border-2 border-gray-900">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {petrolInvoice.length > 0 &&
//                       petrolInvoice.map((item, index) => (
//                         <tr key={index} className="text-center">
//                           <td className="border-2 border-gray-900">
//                             {item.serialNumber}
//                           </td>

//                           <td className="border-2 border-gray-900">
//                             {item.invoiceNumber}
//                           </td>
//                           <td className="border-2 border-gray-900">
//                             {item.ProductName}
//                           </td>
//                           <td className="border-2 border-gray-900">
//                             {item.klQty}
//                           </td>
//                           {/* <td className="border-2 border-gray-900">{item.rate}</td> */}
//                           <td className="border-2 border-gray-900">
//                             {item.Value}
//                           </td>
//                           <td className="border-2 border-gray-900 w-[1%]">+</td>

//                           <td className="border-2 border-gray-900 w-[16]">
//                             {item.taxamount}
//                           </td>
//                           <td className="border-2 border-gray-900 w-[1%]">=</td>

//                           <td className="border-2 border-gray-900">
//                             {item.productAmount}
//                           </td>
//                           <td className="border-2 border-gray-900">x</td>

//                           <td className="border-2 border-gray-900">
//                             {item.tds}
//                           </td>
//                           <td className="border-2 border-gray-900">
//                             {(item.productAmount * item.tds).toFixed(2)}
//                           </td>

//                           <td className="border-2 border-gray-900">
//                             <button
//                               onClick={() => handleDelete(item._id)}
//                               type="button"
//                               class="w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white"
//                             >
//                               <MdDelete color="red" size={25} />
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     <tr>
//                       <td colSpan={7}></td>
//                       <td className="text-center font-bold border-2 border-gray-900">
//                         Tot. <br /> Amt:
//                       </td>
//                       <td className="border-2 border-gray-900 text-center w-[2%]">
//                         {(saveData.productAmountSumTds =
//                           productAmountSumTds).toFixed(2)}
//                       </td>
//                     </tr>
//                     <tr>
//                       <td colSpan={7}></td>
//                       <td className="text-center font-bold border-2 border-gray-900">
//                         TDS <br />
//                         (194Q)
//                       </td>
//                       <td className="border-2">
//                         <input
//                           type="text"
//                           name="tds"
//                           className="p-2 rounded-md text-center"
//                           // value={petrolInvoice[0].tds}
//                         />
//                       </td>
//                     </tr>
//                     <tr>
//                       <td colSpan={7}></td>
//                       <td className="font-bold border-2 border-gray-900">
//                         tds payable
//                       </td>
//                       <td className="border-2 border-gray-900">
//                         <input
//                           type="text"
//                           name="tds"
//                           className="p-2 rounded-md text-center"
//                           value={(productAmountSumTds * 0.001).toFixed(2)}
//                         />
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//               {/* 2. tds end */}
//               <br />
//               {/* 3. lfr feeding Start */}
//               <h2 className=" text-xl font-bold mb-1 text-center uppercase">
//                 lfr 194i entry{" "}
//               </h2>
//               <div className="relative">
//                 <div
//                   className="overflow-x-auto scroll-mx-5"
//                   ref={topScrollRef}
//                   onScroll={() => handleScroll(topScrollRef, tableScrollRef)}
//                   style={{ height: "1.5rem" }}
//                 >
//                   <div style={{ width: "200%" }}></div>
//                 </div>

//                 <table className="">
//                   <thead className="">
//                     <tr className="text-center uppercase px-2 py-1">
//                       <th className="border-2 border-gray-900 px-2 py-1">
//                         SR.No.
//                       </th>
//                       <th className="border-2 border-gray-900 px-2 py-1">
//                         Invoice No.
//                       </th>
//                       <th className="border-2 border-gray-900 px-2 py-1">
//                         Product
//                       </th>
//                       <th className="border-2 border-gray-900 px-2 py-1">
//                         KL/Qty
//                       </th>
//                       <th className="border-2 border-gray-900 w-[1%]">x</th>

//                       <th className="border-2 border-gray-900">LFR Per Kl</th>
//                       <th className="border-2 border-gray-900 w-8">=</th>
//                       <th className="border-2 border-gray-900">Total</th>
//                       <th className="border-2 border-gray-900 w-[1%]">+</th>

//                       <th className="border-2 border-gray-900">CGST</th>
//                       <th className="border-2 border-gray-900 w-8">%</th>

//                       <th className="border-2 border-gray-900">Tot CGST</th>
//                       <th className="border-2 border-gray-900 w-8">+</th>
//                       <th className="border-2 border-gray-900">SGST</th>
//                       <th className="border-2 border-gray-900 w-8">%</th>

//                       <th className="border-2 border-gray-900">Tot SGST</th>
//                       <th className="border-2 border-gray-900">
//                         Total LFR value
//                       </th>
//                       <th className="border-2 border-gray-900">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {petrolInvoice.length > 0 &&
//                       petrolInvoice.map((item, index) => {
//                         const total = item.klQty * item.lfrPerKl;
//                         const totCgst = total * item.cgst;
//                         const totSgst = total * item.sgst;
//                         const totalLfrValue = total + totCgst + totSgst;

//                         return (
//                           <tr key={index} className="text-center">
//                             <td className="border-2 border-gray-900">
//                               {item.serialNumber}
//                             </td>

//                             <td className="border-2 border-gray-900">
//                               {item.invoiceNumber}
//                             </td>
//                             <td className="border-2 border-gray-900">
//                               {item.ProductName}
//                             </td>
//                             <td className="border-2 border-gray-900 w-[4%]">
//                               {item.klQty}
//                             </td>
//                             <td className="border-2 border-gray-900 font-bold w-[1%]">
//                               x
//                             </td>
//                             <td className="border-2 border-gray-900">
//                               {item.lfrPerKl}
//                             </td>
//                             <td className="border-2 border-gray-900 font-bold w-[1%]">
//                               =
//                             </td>
//                             <td className="border-2 border-gray-900">
//                               {total.toFixed(2)}
//                             </td>
//                             <td className="border-2 border-gray-900 w-[1%] font-bold">
//                               +
//                             </td>
//                             <td className="border-2 border-gray-900">
//                               {item.cgst}
//                             </td>
//                             <th className="border-2 border-gray-900 w-8">%</th>

//                             <td className="border-2 border-gray-900">
//                               {totCgst.toFixed(2)}
//                             </td>
//                             <th className="border-2 border-gray-900 w-8">+</th>

//                             <td className="border-2 border-gray-900">
//                               {item.sgst}
//                             </td>
//                             <th className="border-2 border-gray-900 w-8">%</th>

//                             <td className="border-2 border-gray-900">
//                               {totSgst.toFixed(2)}
//                             </td>
//                             <td className="border-2 border-gray-900">
//                               {totalLfrValue.toFixed(2)}
//                             </td>
//                             <td className="border-2 border-gray-900">
//                               <button
//                                 onClick={() => handleDelete(item._id)}
//                                 type="button"
//                                 className="w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white"
//                               >
//                                 <MdDelete color="red" size={25} />
//                               </button>

//                               {/* <button
//                   // onClick={() => addHandler(item)}
//                   type="button"
//                   className="ml-2 w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-green-500"
//                 >
//                   <MdAdd color="white" size={25} />
//                 </button> */}
//                             </td>
//                           </tr>
//                         );
//                       })}

//                     {petrolInvoice.length > 0 && (
//                       <tr>
//                         <td colSpan={7} className="text-right font-bold">
//                           Total:
//                         </td>

//                         <td className="border-2 border-gray-900">
//                           {petrolInvoice
//                             .reduce(
//                               (sum, item) => sum + item.klQty * item.lfrPerKl,
//                               0
//                             )
//                             .toFixed(2)}
//                         </td>

//                         <td
//                           colSpan={3}
//                           className="border-2 border-gray-900"
//                         ></td>
//                         <td className="border-2 text-center border-gray-900">
//                           {petrolInvoice
//                             .reduce(
//                               (sum, item) =>
//                                 sum + item.klQty * item.lfrPerKl * item.cgst,
//                               0
//                             )
//                             .toFixed(2)}
//                         </td>

//                         <td
//                           colSpan={3}
//                           className="border-2 border-gray-900"
//                         ></td>
//                         <td className="border-2 text-center border-gray-900">
//                           {petrolInvoice
//                             .reduce(
//                               (sum, item) =>
//                                 sum + item.klQty * item.lfrPerKl * item.sgst,
//                               0
//                             )
//                             .toFixed(2)}
//                         </td>

//                         <td className="border-2 text-center border-gray-900">
//                           {petrolInvoice
//                             .reduce((sum, item) => {
//                               const total = item.klQty * item.lfrPerKl;
//                               const totCgst = total * item.cgst;
//                               const totSgst = total * item.sgst;
//                               return sum + total + totCgst + totSgst;
//                             }, 0)
//                             .toFixed(2)}
//                         </td>

//                         <td className="border-2 border-gray-900"></td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </>
//         )}

//         {/* 3. lfr end */}
//       </div>
//     </>
//   );
// }


import React, { useState, useEffect, useRef } from "react";
import Petrol_Decantation from "../objects/Petrol_Decantation";

import axios from "axios";
import "../css/Tank.css";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
const initValue = {
  serialNumber: "",
  invoiceNumber: "",
  product: "",
  klQty: "",
  Value: "",
  taxamount: "",
  productAmount: "",
  vatPercent: "",
  vat: "",
  vatlst: "",
  totalAmount: "",
  productAmountSumTds: "",
  tds: "",
  TotPayableTds: "",
  lfrPerKl: "", //indiv prod
  cgst: "",
  sgst: "",
  tdsLfr: "",
  lfrTaxAmt: "", //indiv prod
  lfrPerKlSumTds: "", //lfrTaxAmt + cgst + sgst of both ms,hsd
  totInvoiceAmt: "",
  total: "",
  totCgst: "",
  totSgst: "",
  totalLfrValue: "",
};

export default function Petrol_Invoice_Feeding() {
  const [feedings, setFeedings] = useState([]);
  const [saveData, setSaveData] = useState(initValue);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [petrolInvoice, setPetrolInvoice] = useState([]);
  const [productAmtSum, setProductAmtSum] = useState(0);
  const [invFeedingData, setInvFeedingData] = useState([]);
  const [productAmtSumTds, setProductAmtSumTds] = useState(0);

  const location = useLocation();
  const values = location.state?.data || null;
  console.log("values", values);

  useEffect(() => {
    if (values) {
      setSaveData((prev) => ({
        ...prev,
        _id: values._id,
        serialNumber: values?.serialNumber,
        invoiceNumber: values?.invoiceNumber,
        ProductName: values?.ProductName,
        klQty: values?.klQty,
        Value: values?.Value,
        taxamount: values?.taxamount,
        rate: values?.rate,
        productAmount: parseInt(values?.productAmount),
        vat: values?.vat,
        vatlst: values?.vatlst,
        cess: values?.cess,
        tcs: values?.tcs,
        totalAmount: values?.totalAmount,
        tds: values?.tds,
        lfrPerKl: values?.lfrPerKl,
        cgst: values?.cgst,
        tdsLfr: values?.tdsLfr,
        sgst: values?.sgst,
      }));
      // setFilterData((prev)=>({
      //   ...prev,
      //   rate:parseInt(values?.rate),

      // }))
      // setData((prev)=>({
      //   ...prev,
      //   ProductName:values?.ProductName,

      // }))
    }
  }, []);

  console.log("saveData new", saveData);

  const handleSelect = (e) => {
    const finalProduct = data?.filter(
      (item) => item.ProductName === e.target.value
    );
    if (finalProduct.length > 0) {
      setFilterData(finalProduct[0]);
      setSaveData((prevFormData) => ({
        ...prevFormData,
        product: e.target.value,
        rate: finalProduct[0].rate,
        taxamount: finalProduct[0].taxamount,
        vatPercent: finalProduct[0].vatPercent,
        vat: finalProduct[0].vat,
        cess: finalProduct[0].cess,
        tcs: finalProduct[0].tcs,
        tds: finalProduct[0].tds,
        lfrPerKl: finalProduct[0].lfrPerKl,
        cgst: finalProduct[0].cgst,
        sgst: finalProduct[0].sgst,
        tdsLfr: finalProduct[0].tdsLfr,
      }));
    }
  };
  console.log("saveData", saveData);

  const fetchPetrol = () => {
    axios
      .get("https://marvah-server.onrender.com/petrol")
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchPetrol();
  }, []);

  const fetchPetrolInvFeeding = () => {
    axios
      .get("https://marvah-server.onrender.com/petrolInvoiceFeeding")
      .then((res) => {
        if (res.data) {
          setInvFeedingData(res.data.petrolInvoice);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  console.log("invFeedingData", invFeedingData);
  useEffect(() => {
    fetchPetrolInvFeeding();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
    setSaveData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // console.log("tds", saveData.tds);
  const calculateValues = (formData, filterData) => {
    const { klQty, vat, lfrPerKl, tdsLfr, cgst, sgst } = formData;
    const { rate, taxamount, cess, tcs } = filterData;

    const Value = (klQty * rate).toFixed(1);
    const productAmount = (
      parseFloat(Value) +
      parseFloat(taxamount) * parseFloat(saveData.klQty)
    ).toFixed(1);
    // const vatlst = (productAmount * (vatPercent / 100)).toFixed(1);
    const vatlst = (productAmount);

    const totalAmount = (
      parseFloat(productAmount) +
      parseFloat(vatlst) +
      parseFloat(cess) * saveData.klQty +
      parseFloat(tcs)
    ).toFixed(1);
    console.log("total amount", totalAmount);

    return {
      Value: parseFloat(Value),
      productAmount: parseFloat(productAmount),
      vatlst: parseFloat(vatlst * vat),
      totalAmount:
        parseFloat(productAmount) +
        parseFloat(vatlst * vat) +
        parseFloat(cess * klQty),
      taxamount: parseFloat(taxamount * klQty),
      cess: parseFloat(cess * klQty),
      lfrTaxAmt: parseFloat(lfrPerKl * klQty),
      totCgst: parseFloat(lfrPerKl * klQty * cgst),
      totSgst: parseFloat(lfrPerKl * klQty * sgst),
      totalLfrValue:
        parseFloat(lfrPerKl * klQty) +
        parseFloat(lfrPerKl * klQty * cgst) +
        parseFloat(lfrPerKl * klQty * sgst),
    };
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (saveData.klQty && filterData.rate) {
      const calculatedValues = calculateValues(saveData, filterData);
      setSaveData((prevFormData) => ({
        ...prevFormData,
        ...calculatedValues,
      }));
    }
  }, [saveData.klQty, saveData.vatPercent, filterData]);

  const handleSubmit = () => {
    // Calculate total product amount
    const productAmountSumTds = petrolInvoice.reduce((accumulator, item) => {
      return accumulator + (item.productAmount || 0); // Default to 0 if productAmount is undefined or null
    }, 0);

    const TotPayableTds = productAmountSumTds * saveData.tds;
    const calculatedValues = calculateValues(saveData, filterData);

    const finalData = {
      ...saveData,
      ...filterData,
      ...calculatedValues,
      serialNumber: saveData.serialNumber,
      klQty: parseFloat(saveData.klQty),
      vatPercent: parseFloat(saveData.vatPercent),
      Value: parseFloat(calculatedValues.Value),
      productAmount: parseFloat(calculatedValues.productAmount),
      vatlst: parseFloat(calculatedValues.vatlst),
      totalAmount: parseFloat(calculatedValues.totalAmount),
      productAmountSumTds: parseFloat(productAmountSumTds), // Add Total Product Amount here
      totInvoiceAmt: parseFloat(totInvoiceAmt),
      TotPayableTds: parseFloat(TotPayableTds),
      lfrTaxAmt: parseFloat(saveData.lfrTaxAmt),
      InvTotSum: parseFloat(InvTotSum),
    };

    // console.log("Final Data:", finalData);
    console.log("filterData:", filterData);

    axios
      .post("https://marvah-server.onrender.com/petrolInvoiceFeeding/create", finalData)
      .then((res) => {
        alert(res.data.msg);
        handleFetchData();
        setSaveData(initValue); // Reset the form
        // setShowDecantation(true);
        navigate("/invLfrTds")

      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleFetchData = () => {
    axios
      .get("https://marvah-server.onrender.com/petrolInvoiceFeeding")
      .then((res) => {
        setPetrolInvoice(res.data.petrolInvoice);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const topScrollRef = useRef(null);
  const tableScrollRef = useRef(null);

  const handleScroll = (sourceRef, targetRef) => {
    if (sourceRef.current && targetRef.current) {
      targetRef.current.scrollLeft = sourceRef.current.scrollLeft;
    }
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `https://marvah-server.onrender.com/petrolInvoiceFeeding/delete/${id}`
    );
    if (res.data.success) {
      alert(res.data.message);
      handleFetchData();
    }
  };

  // Calculate the total product amount
  const productAmountSumTds = petrolInvoice.reduce((accumulator, item) => {
    return accumulator + (item.productAmount || 0); // Default to 0 if productAmount is undefined or null
  }, 0);

  const totInvoiceAmt = invFeedingData.reduce((accumulator, item) => {
    return accumulator + (item.totalAmount || 0); // Default to 0 if totalAmount is undefined or null
  }, 0);

  // console.log("Total Product Amount:", productAmountSumTds);
  console.log("totInvoiceAmt", totInvoiceAmt);

  useEffect(() => {
    handleFetchData();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const [formData, setFormData] = useState(petrolInvoice);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle change in form inputs
  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for update
  const handleUpdate = async (id) => {
    setLoading(true);
    setError(null);

    try {
      // Make PUT request to update petrol invoice feeding
      const response = await axios.patch(
        `https://marvah-server.onrender.com/petrolInvoiceFeeding/update/${id}`,
        saveData
      );

      if (response.data.success) {
        // Handle success: invoke a success callback or display a success message
        alert(response.data.message);
        // onSuccess(); // Call a success handler to refresh the list or update UI
      }
    } catch (error) {
      console.error("Error updating invoice:", error);
      setError("Failed to update the invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const [showDecantation, setShowDecantation] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(today.getFullYear()).slice(-2); // Get last two digits of the year

    return `${day}-${month}-${year}`;
  };

  const InvTotSum = petrolInvoice.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0
  );

  return (
    <>
      <div className="tankMainDiv relative shadow-lg ml-4 bg-body-tertiary rounded">
        {/* <h2 className="font-bold  fixed items-center justify-center w-[80%]  mb-4 text-2xl text-center uppercase">
          Petrol Invoice Feeding
        </h2> */}
        <div className="bg-white z-10 top-10 p-4 fixed w-[80%] mt-2 flex justify-between ">
          <div className="text-2xl  font-bold"> Date : {getCurrentDate()} </div>
          <h2 className="font-bold  mb-4 text-2xl text-center uppercase">
            Petrol Invoice Feeding
          </h2>
          <div className="text-xl flex gap-2 text-white  font-bold rounded-md">
            <div>
              {/* <Link to={"/Petrol_Products"} className="p-2 bg-green-600 rounded-md">
              petrol Index Form
            </Link> */}
            </div>
            <div>
              <Link to={"/purchasetds"} className="relative p-2 bg-green-600 rounded-md  cursor-pointer">
                Reports
              </Link>
            </div>
          </div>
        </div>

        <div className="w-[90%] ml-4 mt-20">
          <form action="" onSubmit={(e) => e.preventDefault()}>
            <table className="table text-center">
              <thead>
                <tr className="bg-[#008b8b]  text-center">
                  <th className="">S.No.</th>
                  <th className="">Invoice No.</th>
                  <th className="">Product</th>
                  <th className="">KL/Qty</th>

                  <th className="">Rate</th>

                  <th className="">Value</th>

                  <th className="">Taxable Amount</th>

                  <th className="">Product Amount</th>
                  {/* <th className="">TDS %</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bigFontWeight">
                    <input
                      name="serialNumber"
                      // value={saveData.serialNumber}
                      value={saveData.serialNumber}
                      type="text"
                      className="form-control bigFontWeight editableInput"
                      onChange={handleChange}
                    />
                  </td>
                  <td className="bigFontWeight">
                    <textarea
                      type="text"
                      name="invoiceNumber"
                      value={saveData.invoiceNumber}
                      className="form-control bigFontWeight editableInput resize-x w-[150px]  h-6"
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <select
                      style={{ width: "120px" }}
                      name="product"
                      className="form-select editableInput bigFontWeight"
                      aria-label="Default select example"
                      onChange={(e) => handleSelect(e)}
                    >
                      <option>- Product -</option>
                      {data &&
                        data.map((rest, index) => (
                          <option key={index} value={rest.ProductName}>
                            {rest.ProductName}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="bigFontWeight">
                    <input
                      type="text"
                      name="klQty"
                      value={saveData.klQty}
                      className="editableInput form-control bigFontWeight"
                      onChange={handleChange}
                    />
                  </td>

                  <td className="bigFontWeight">
                    <input
                      type="text"
                      name="rate"
                      className="form-control bigFontWeight"
                      // value={filterData.rate || ""}
                      value={filterData.rate || ""}
                      onChange={handleChange}
                    />
                  </td>

                  <td className="bigFontWeight">
                    <textarea
                      type="text"
                      name="Value"
                      className="form-control bigFontWeight resize-x h-6"
                      value={saveData.Value}
                      disabled
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      name="taxamount"
                      // value={filterData.taxamount * saveData.klQty || ""}
                      // value={filterData.taxamount*9|| ""}
                      value={saveData.taxamount}
                      className="form-control bigFontWeight"
                      disabled
                    />
                  </td>

                  <td className="bigFontWeight">
                    <textarea
                      type="text"
                      name="productAmount"
                      className="form-control bigFontWeight resize-x h-6"
                      value={saveData.productAmount}
                      onChange={handleChange}
                      disabled
                    />
                  </td>
                  {/* <td>
                  <input
                    type="number"
                    value={(saveData.tds = 0.01)}
                    onChange={handleChange}
                    className="border-4 border-blue-500 w-16 rounded-md p-2"
                    // onChange={(e)=>setSaveData.tds(e.target.value)}
                  />
                </td> */}
                </tr>
              </tbody>
            </table>
            {/* <br /> */}
            <table className="table">
              <thead>
                <tr className="text-center">
                  <th className="">(=)</th>
                  <th className="">VAT %</th>
                  <th className="">VAT/LST</th>
                  <th className="">(+)</th>
                  <th className="">CESS</th>
                  <th className="">(+)</th>
                  <th className="">TCS</th>
                  <th className="">(=)</th>
                  <th className="">T. AMT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bigFontWeight">(=)</td>
                  <td className="bigFontWeight">
                    <input
                      type="text"
                      name="vat"
                      className="form-control bigFontWeight"
                      value={saveData.vat}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="bigFontWeight">
                    <input
                      type="text"
                      name="vatlst"
                      className="form-control bigFontWeight"
                      value={saveData?.vatlst || "0"}
                      // value={saveData.vatPercent ? saveData.vatlst : ""}
                      disabled
                    />
                  </td>
                  <td className="bigFontWeight">(+)</td>
                  <td className="bigFontWeight">
                    <input
                      type="text"
                      value={filterData.cess * saveData.klQty || "0"}
                      className="form-control bigFontWeight"
                      disabled
                    />
                  </td>
                  <td className="bigFontWeight">(+)</td>
                  <td className="bigFontWeight">
                    <input
                      type="text"
                      value={filterData.tcs || "0"}
                      className="form-control bigFontWeight"
                      disabled
                    />
                  </td>
                  <td className="bigFontWeight">(=)</td>
                  <td className="bigFontWeight">
                    <input
                      type="text"
                      name="totalAmount"
                      className="form-control bigFontWeight"
                      value={(saveData.totalAmount)}
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* <br /> */}
            <table className="table">
              <thead>
                <tr className="text-center uppercase">
                  <th className="">TDS(%)</th>
                  <th className="uppercase">lfr rate</th>
                  <th className="">cgst</th>
                  <th className="">sgst</th>
                  <th className="">tds(Lfr)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="bigFontWeight">
                    <input
                      type="text"
                      name="tds"
                      className="form-control bigFontWeight"
                      value={saveData.tds}
                      onChange={handleChange}
                    />
                  </td>
                  <td className="bigFontWeight">
                    <input
                      type="text"
                      name="lfrPerKl"
                      className="form-control bigFontWeight"
                      value={saveData.lfrPerKl}
                      disabled
                    />
                  </td>
                  <td className="bigFontWeight">
                    <input
                      type="text"
                      name="cgst"
                      className="form-control bigFontWeight"
                      value={saveData.cgst}
                      disabled
                    />
                  </td>
                  <td className="bigFontWeight">
                    <input
                      type="text"
                      name="sgst"
                      className="form-control bigFontWeight"
                      value={saveData.sgst}
                      disabled
                    />
                  </td>
                  <td className="bigFontWeight">
                    <input
                      type="text"
                      name="tdsLfr"
                      className="form-control bigFontWeight"
                      value={saveData.tdsLfr}
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-right">
              {values ? (
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-green-500 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-300"
                  onClick={handleUpdate}
                >
                  Edit
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-500 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-300"
                  onClick={handleSubmit}
                >

                  SAVE
                </button>
              )}
            </div>
          </form>
        </div>
        <br />

        {/* {showDecantation && (
          <div>
            <Petrol_Decantation />
          </div>
        )} */}

        {/* 1. invoice feed start  */}

        {!showDecantation && <>
          <h2 className=" text-xl font-bold mb-1 mt-1 text-center uppercase">
            Invoice entry{" "}
          </h2>

          <div className="relative">
            <div
              className="overflow-x-auto scroll-mx-5"
              ref={topScrollRef}
              onScroll={() => handleScroll(topScrollRef, tableScrollRef)}
              style={{ height: "1.5rem" }}
            >
              <div style={{ width: "200%" }}></div>
            </div>

            <table className="w-[93%]">
              <thead className="px-2">
                <tr className="text-center uppercase px-2">
                  <th className="border-2 px-2 border-gray-900">S.No.</th>
                  <th className="border-2 border-gray-900">Invoice No.</th>
                  <th className="border-2 border-gray-900">Product</th>
                  <th className="border-2 border-gray-900">KL/Qty</th>
                  <th className="border-2 border-gray-900">x</th>
                  <th className="border-2 px-2 border-gray-900">Rate/Unit</th>
                  <th className="border-2 border-gray-900">=</th>
                  <th className="border-2 px-2 border-gray-900">Value</th>
                  <th className="border-2 border-gray-900">+</th>
                  <th className="border-2 border-gray-900 w-16">
                    Taxable Amount
                  </th>
                  <th className="border-2 border-gray-900">=</th>
                  <th className="border-2 border-gray-900">Product <br /> Amount</th>
                  <th className="border-2 border-gray-900">x</th>
                  <th className="border-2 border-gray-900">VAT %</th>
                  <th className="border-2 border-gray-900">=</th>
                  <th className="border-2 border-gray-900">VAT/LST</th>
                  <th className="border-2 border-gray-900">+</th>
                  <th className="border-2 border-gray-900">CESS</th>
                  <th className="border-2 border-gray-900">+</th>
                  <th className="border-2 border-gray-900">TCS</th>
                  <th className="border-2 border-gray-900">=</th>
                  <th className="border-2 border-gray-900">T Amount</th>
                  <th className="border-2 border-gray-900">T Invoice Amnt:</th>
                  {/* <th className="border-2 border-gray-900">T inv Amount</th> */}
                  {/* <th className="border-2 border-gray-900">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {petrolInvoice.length > 0 &&
                  petrolInvoice.map((item, index, array) => {
                    // Check if this is the first product for this invoice
                    const isFirstRowOfInvoice =
                      index === 0 || item.invoiceNumber !== array[index - 1].invoiceNumber;

                    return (
                      <tr key={index} className="text-center">
                        {/* SR NO and INVOICE NO Merging */}
                        {isFirstRowOfInvoice && (
                          <>
                            {/* S.No */}
                            <td
                              rowSpan={
                                array.filter(
                                  (rowItem) => rowItem.invoiceNumber === item.invoiceNumber
                                ).length
                              }
                              className="border-2 border-gray-900"
                            >
                              {item.serialNumber}
                            </td>

                            {/* Invoice No */}
                            <td
                              rowSpan={
                                array.filter(
                                  (rowItem) => rowItem.invoiceNumber === item.invoiceNumber
                                ).length
                              }
                              className="border-2 border-gray-900"
                            >
                              {item.invoiceNumber}
                            </td>
                          </>
                        )}

                        {/* Product Name */}
                        <td className="border-2 border-gray-900">{item.ProductName}</td>

                        {/* KL/Qty */}
                        <td className="border-2 border-gray-900">{item.klQty}</td>
                        <td className="border-2 border-gray-900 w-[1%]">x</td>

                        {/* Rate per Unit */}
                        <td className="border-2 border-gray-900">{item.rate}</td>
                        <td className="border-2 border-gray-900 w-[1%]">=</td>

                        {/* Value */}
                        <td className="border-2 border-gray-900">{item.Value}</td>
                        <td className="border-2 border-gray-900 w-[1%]">+</td>

                        {/* Taxable Amount */}
                        <td className="border-2 border-gray-900 w-16">{item.taxamount}</td>
                        <td className="border-2 border-gray-900 w-[1%]">=</td>

                        {/* Product Amount */}
                        <td className="border-2 border-gray-900">{item.productAmount}</td>
                        <td className="border-2 border-gray-900 w-[1%]">x</td>

                        {/* VAT % */}
                        <td className="border-2 border-gray-900 w-[12]">{item.vat}</td>
                        <td className="border-2 border-gray-900 w-[1%]">=</td>

                        {/* VAT/LST */}
                        <td className="border-2 border-gray-900">{item.vatlst.toFixed()}</td>
                        <td className="border-2 border-gray-900 w-[1%]">+</td>

                        {/* CESS */}
                        <td className="border-2 border-gray-900">{item.cess}</td>
                        <td className="border-2 border-gray-900 w-[1%]">+</td>

                        {/* TCS */}
                        <td className="border-2 border-gray-900">{item.tcs}</td>
                        <td className="border-2 border-gray-900 w-[1%]">=</td>

                        {/* Total Amount */}
                        <td className="border-2 border-gray-900">
                          {item.totalAmount?.toFixed(2)}
                        </td>

                        {/* Display Total Invoice Amount only for the first row */}
                        {isFirstRowOfInvoice && (
                          <td className="border-2 border-gray-900" rowSpan={array.filter(
                            (rowItem) => rowItem.invoiceNumber === item.invoiceNumber
                          ).length}>
                            {totInvoiceAmt.toFixed(2)}
                          </td>
                        )}
                      </tr>
                    );
                  })}
              </tbody>

            </table>

            <div className="flex justify-between mt-2 mb-4">
              <div></div>

              {/* <div
                className="text-center mr-16 font-bold border-gray-900"
                colSpan={4}
              >
                T. Invoice Amt:{" "}
                <span className="border-2 p-2 border-gray-900 mr-5">
                  {" "}
                  {totInvoiceAmt.toFixed(2)}{" "}
                </span>
              </div> */}
            </div>
          </div>
        </>}
        {showDecantation && (
          <>
            <div className="lfr-tds-inv">
              <h2 className=" text-xl font-bold mb-1 text-center uppercase">
                Invoice entry{" "}
              </h2>

              <div className="relative">
                <div
                  className="overflow-x-auto scroll-mx-5"
                  ref={topScrollRef}
                  onScroll={() => handleScroll(topScrollRef, tableScrollRef)}
                  style={{ height: "1.5rem" }}
                >
                  <div style={{ width: "200%" }}></div>
                </div>

                <table className="">
                  <thead className="px-2">
                    <tr className="text-center uppercase px-2">
                      <th className="border-2 px-2 border-gray-900">S.No.</th>
                      <th className="border-2 border-gray-900">Invoice No.</th>
                      <th className="border-2 border-gray-900">Product</th>
                      <th className="border-2 border-gray-900">KL/Qty</th>
                      <th className="border-2 border-gray-900">x</th>

                      <th className="border-2 px-2 border-gray-900">
                        Rate/Unit
                      </th>
                      <th className="border-2 border-gray-900">=</th>

                      <th className="border-2 px-2 border-gray-900">Value</th>
                      <th className="border-2 border-gray-900">+</th>

                      <th className="border-2 border-gray-900 w-16">
                        Taxable Amount
                      </th>
                      <th className="border-2 border-gray-900">=</th>

                      <th className="border-2 border-gray-900">
                        Product Amount
                      </th>
                      <th className="border-2 border-gray-900">x</th>

                      <th className="border-2 border-gray-900">VAT %</th>
                      <th className="border-2 border-gray-900">=</th>

                      <th className="border-2 border-gray-900">VAT/LST</th>
                      <th className="border-2 border-gray-900">+</th>

                      <th className="border-2 border-gray-900">CESS</th>
                      <th className="border-2 border-gray-900">+</th>

                      <th className="border-2 border-gray-900">TCS</th>
                      <th className="border-2 border-gray-900">=</th>

                      <th className="border-2 border-gray-900">T Amount</th>
                      <th className="border-2 border-gray-900">T inv Amount</th>
                      <th className="border-2 border-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {petrolInvoice.length > 0 &&
                      petrolInvoice.map((item, index) => (
                        <tr key={index} className="text-center">
                          <td className="border-2 border-gray-900 ">
                            {item.serialNumber}
                          </td>

                          <td className="border-2 border-gray-900">
                            {item.invoiceNumber}
                          </td>
                          <td className="border-2 border-gray-900">
                            {item.ProductName}
                          </td>
                          <td className="border-2 border-gray-900">
                            {item.klQty}
                          </td>
                          <td className="border-2 border-gray-900 w-[1%]">x</td>

                          <td className="border-2 border-gray-900">
                            {item.rate}
                          </td>
                          <td className="border-2 border-gray-900 w-[1%]">=</td>
                          <td className="border-2 border-gray-900">
                            {item.Value}
                          </td>
                          <td className="border-2 border-gray-900 w-[1%]">+</td>

                          <td className="border-2 border-gray-900 w-16">
                            {item.taxamount}
                          </td>
                          <td className="border-2 border-gray-900 w-[1%]">=</td>

                          <td className="border-2 border-gray-900">
                            {item.productAmount}
                          </td>
                          <td className="border-2 border-gray-900 w-[1%]">x</td>

                          <td className="border-2 border-gray-900 w-[12]">
                            {item.vat}
                          </td>
                          <td className="border-2 border-gray-900 w-[1%]">=</td>

                          <td className="border-2 border-gray-900">
                            {item.vatlst.toFixed()}
                          </td>
                          <td className="border-2 border-gray-900 w-[1%]">+</td>

                          <td className="border-2 border-gray-900">
                            {item.cess}
                          </td>
                          <td className="border-2 border-gray-900 w-[1%]">+</td>

                          <td className="border-2 border-gray-900">
                            {item.tcs}
                          </td>
                          <td className="border-2 border-gray-900 w-[1%]">=</td>

                          <td className="border-2 border-gray-900">
                            {item.totalAmount}
                          </td>

                          <td className="border-2 border-gray-900">
                            {InvTotSum.toFixed(2)}
                          </td>
                          <td className="border-2 border-gray-900">
                            <button
                              onClick={() => handleDelete(item._id)}
                              type="button"
                              class="w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white"
                            >
                              <MdDelete color="red" size={25} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="flex justify-between mt-2">
                  <div></div>

                  <div
                    className="text-center mr-16 font-bold border-gray-900"
                    colSpan={4}
                  >
                    T. Invoice Amt:{" "}
                    <span className="border-2 p-2 border-gray-900">
                      {" "}
                      {totInvoiceAmt.toFixed(2)}{" "}
                    </span>
                  </div>
                </div>
              </div>
              {/* 1. invoice feed end  */}

              {/* 2. tds start  */}
              <h2 className=" text-xl font-bold mb-1 text-center uppercase">
                tds 194Q entry{" "}
              </h2>
              <div className="relative">
                <div
                  className="overflow-x-auto scroll-mx-5"
                  ref={topScrollRef}
                  onScroll={() => handleScroll(topScrollRef, tableScrollRef)}
                  style={{ height: "1.5rem" }}
                >
                  {/* <div style={{ width: "200%" }}></div> */}
                </div>

                <table className="">
                  <thead className="">
                    <tr className="text-center uppercase">
                      <th className="border-2 border-gray-900">S.No.</th>

                      <th className="border-2 border-gray-900">Invoice No.</th>
                      <th className="border-2 border-gray-900">Product</th>
                      <th className="border-2 border-gray-900">KL/Qty</th>

                      <th className="border-2 border-gray-900">
                        Value <br />
                        (A)
                      </th>
                      <th className="border-2 border-gray-900 w-[1%] text">
                        +
                      </th>

                      <th className="border-2 border-gray-900">
                        Taxable Amt. <br />
                        (B)
                      </th>
                      <th className="border-2 border-gray-900 w-[1%] text">
                        =
                      </th>

                      <th className="border-2 border-gray-900">
                        Product amt. <br />
                        (C)
                      </th>
                      <th className="border-2 border-gray-900">x</th>
                      <th className="border-2 border-gray-900">tds(%)</th>
                      <th className="border-2 border-gray-900">
                        Act. tds payable
                      </th>

                      <th className="border-2 border-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {petrolInvoice.length > 0 &&
                      petrolInvoice.map((item, index) => (
                        <tr key={index} className="text-center">
                          <td className="border-2 border-gray-900">
                            {item.serialNumber}
                          </td>

                          <td className="border-2 border-gray-900">
                            {item.invoiceNumber}
                          </td>
                          <td className="border-2 border-gray-900">
                            {item.ProductName}
                          </td>
                          <td className="border-2 border-gray-900">
                            {item.klQty}
                          </td>
                          {/* <td className="border-2 border-gray-900">{item.rate}</td> */}
                          <td className="border-2 border-gray-900">
                            {item.Value}
                          </td>
                          <td className="border-2 border-gray-900 w-[1%]">+</td>

                          <td className="border-2 border-gray-900 w-[16]">
                            {item.taxamount}
                          </td>
                          <td className="border-2 border-gray-900 w-[1%]">=</td>

                          <td className="border-2 border-gray-900">
                            {item.productAmount}
                          </td>
                          <td className="border-2 border-gray-900">x</td>

                          <td className="border-2 border-gray-900">
                            {item.tds}
                          </td>
                          <td className="border-2 border-gray-900">
                            {(item.productAmount * item.tds).toFixed(2)}
                          </td>

                          <td className="border-2 border-gray-900">
                            <button
                              onClick={() => handleDelete(item._id)}
                              type="button"
                              class="w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white"
                            >
                              <MdDelete color="red" size={25} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <td colSpan={7}></td>
                      <td className="text-center font-bold border-2 border-gray-900">
                        Tot. <br /> Amt:
                      </td>
                      <td className="border-2 border-gray-900 text-center w-[2%]">
                        {(saveData.productAmountSumTds =
                          productAmountSumTds).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={7}></td>
                      <td className="text-center font-bold border-2 border-gray-900">
                        TDS <br />
                        (194Q)
                      </td>
                      <td className="border-2">
                        <input
                          type="text"
                          name="tds"
                          className="p-2 rounded-md text-center"
                        // value={petrolInvoice[0].tds}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={7}></td>
                      <td className="font-bold border-2 border-gray-900">
                        tds payable
                      </td>
                      <td className="border-2 border-gray-900">
                        <input
                          type="text"
                          name="tds"
                          className="p-2 rounded-md text-center"
                          value={(productAmountSumTds * 0.001).toFixed(2)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* 2. tds end */}
              <br />
              {/* 3. lfr feeding Start */}
              <h2 className=" text-xl font-bold mb-1 text-center uppercase">
                lfr 194i entry{" "}
              </h2>
              <div className="relative">
                <div
                  className="overflow-x-auto scroll-mx-5"
                  ref={topScrollRef}
                  onScroll={() => handleScroll(topScrollRef, tableScrollRef)}
                  style={{ height: "1.5rem" }}
                >
                  <div style={{ width: "200%" }}></div>
                </div>

                <table className="">
                  <thead className="">
                    <tr className="text-center uppercase px-2 py-1">
                      <th className="border-2 border-gray-900 px-2 py-1">
                        SR.No.
                      </th>
                      <th className="border-2 border-gray-900 px-2 py-1">
                        Invoice No.
                      </th>
                      <th className="border-2 border-gray-900 px-2 py-1">
                        Product
                      </th>
                      <th className="border-2 border-gray-900 px-2 py-1">
                        KL/Qty
                      </th>
                      <th className="border-2 border-gray-900 w-[1%]">x</th>

                      <th className="border-2 border-gray-900">LFR Per Kl</th>
                      <th className="border-2 border-gray-900 w-8">=</th>
                      <th className="border-2 border-gray-900">Total</th>
                      <th className="border-2 border-gray-900 w-[1%]">+</th>

                      <th className="border-2 border-gray-900">CGST</th>
                      <th className="border-2 border-gray-900 w-8">%</th>

                      <th className="border-2 border-gray-900">Tot CGST</th>
                      <th className="border-2 border-gray-900 w-8">+</th>
                      <th className="border-2 border-gray-900">SGST</th>
                      <th className="border-2 border-gray-900 w-8">%</th>

                      <th className="border-2 border-gray-900">Tot SGST</th>
                      <th className="border-2 border-gray-900">
                        Total LFR value
                      </th>
                      <th className="border-2 border-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {petrolInvoice.length > 0 &&
                      petrolInvoice.map((item, index) => {
                        const total = item.klQty * item.lfrPerKl;
                        const totCgst = total * item.cgst;
                        const totSgst = total * item.sgst;
                        const totalLfrValue = total + totCgst + totSgst;

                        return (
                          <tr key={index} className="text-center">
                            <td className="border-2 border-gray-900">
                              {item.serialNumber}
                            </td>

                            <td className="border-2 border-gray-900">
                              {item.invoiceNumber}
                            </td>
                            <td className="border-2 border-gray-900">
                              {item.ProductName}
                            </td>
                            <td className="border-2 border-gray-900 w-[4%]">
                              {item.klQty}
                            </td>
                            <td className="border-2 border-gray-900 font-bold w-[1%]">
                              x
                            </td>
                            <td className="border-2 border-gray-900">
                              {item.lfrPerKl}
                            </td>
                            <td className="border-2 border-gray-900 font-bold w-[1%]">
                              =
                            </td>
                            <td className="border-2 border-gray-900">
                              {total.toFixed(2)}
                            </td>
                            <td className="border-2 border-gray-900 w-[1%] font-bold">
                              +
                            </td>
                            <td className="border-2 border-gray-900">
                              {item.cgst}
                            </td>
                            <th className="border-2 border-gray-900 w-8">%</th>

                            <td className="border-2 border-gray-900">
                              {totCgst.toFixed(2)}
                            </td>
                            <th className="border-2 border-gray-900 w-8">+</th>

                            <td className="border-2 border-gray-900">
                              {item.sgst}
                            </td>
                            <th className="border-2 border-gray-900 w-8">%</th>

                            <td className="border-2 border-gray-900">
                              {totSgst.toFixed(2)}
                            </td>
                            <td className="border-2 border-gray-900">
                              {totalLfrValue.toFixed(2)}
                            </td>
                            <td className="border-2 border-gray-900">
                              <button
                                onClick={() => handleDelete(item._id)}
                                type="button"
                                className="w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white"
                              >
                                <MdDelete color="red" size={25} />
                              </button>

                              {/* <button
                  // onClick={() => addHandler(item)}
                  type="button"
                  className="ml-2 w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-green-500"
                >
                  <MdAdd color="white" size={25} />
                </button> */}
                            </td>
                          </tr>
                        );
                      })}

                    {petrolInvoice.length > 0 && (
                      <tr>
                        <td colSpan={7} className="text-right font-bold">
                          Total:
                        </td>

                        <td className="border-2 border-gray-900">
                          {petrolInvoice
                            .reduce(
                              (sum, item) => sum + item.klQty * item.lfrPerKl,
                              0
                            )
                            .toFixed(2)}
                        </td>

                        <td
                          colSpan={3}
                          className="border-2 border-gray-900"
                        ></td>
                        <td className="border-2 text-center border-gray-900">
                          {petrolInvoice
                            .reduce(
                              (sum, item) =>
                                sum + item.klQty * item.lfrPerKl * item.cgst,
                              0
                            )
                            .toFixed(2)}
                        </td>

                        <td
                          colSpan={3}
                          className="border-2 border-gray-900"
                        ></td>
                        <td className="border-2 text-center border-gray-900">
                          {petrolInvoice
                            .reduce(
                              (sum, item) =>
                                sum + item.klQty * item.lfrPerKl * item.sgst,
                              0
                            )
                            .toFixed(2)}
                        </td>

                        <td className="border-2 text-center border-gray-900">
                          {petrolInvoice
                            .reduce((sum, item) => {
                              const total = item.klQty * item.lfrPerKl;
                              const totCgst = total * item.cgst;
                              const totSgst = total * item.sgst;
                              return sum + total + totCgst + totSgst;
                            }, 0)
                            .toFixed(2)}
                        </td>

                        <td className="border-2 border-gray-900"></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* 3. lfr end */}
      </div>
    </>
  );
}