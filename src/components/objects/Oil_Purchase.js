// import React, { useState } from 'react';
// import '../css/PurchaseOil.css'; // Assume you have some basic CSS for styling

// const PurchaseOil = () => {
//   const [formData, setFormData] = useState({
//     invoiceNo: '',
//     totalAmount: '',
//     stockInCases: [
//       { srNo: 1, productName: 'MAK 4T PLI', grade: 'SL 20W40', colour: 'RED', mrp: 397, volumePerPCS: 900, pcsPerCase: 12, purchaseTCases: 0, totalPCS: 0 },
//       { srNo: 2, productName: 'MAK 4T PLI', grade: 'SL 20W40', colour: 'RED', mrp: 422, volumePerPCS: 1, pcsPerCase: 12, purchaseTCases: 0, totalPCS: 0 },
//       { srNo: 3, productName: 'MAK HONC', grade: 'JASO', colour: 'GREEN', mrp: 288, volumePerPCS: 800, pcsPerCase: 12, purchaseTCases: 0, totalPCS: 0 }
//     ],
//     stockInLiters: [
//       { srNo: 1, volumePerPCS: 900, totalPCS: 0, totalLtrs: 0, ratePerUnit: 0, taxableValue: 0 },
//       { srNo: 2, volumePerPCS: 1, totalPCS: 0, totalLtrs: 0, ratePerUnit: 0, taxableValue: 0 },
//       { srNo: 3, volumePerPCS: 800, totalPCS: 0, totalLtrs: 0, ratePerUnit: 0, taxableValue: 0 }
//     ],
//     taxDetails: { srNo: 1, taxableValue: 0, discount: 0, balanceAmt: 0, cgst: 0, sgst: 0, tcs: 0, totalAmt: 0, totalPcs: 0, landingPrice: 0 },
//     reports: [
//       { srNo: 1, productName: 'MAK 4T PLI', volumePerPCS: 900, mrp: 397, landingPrice: 0, difference: 0 },
//       { srNo: 2, productName: 'MAK 4T PLI', volumePerPCS: 1, mrp: 422, landingPrice: 0, difference: 0 },
//       { srNo: 3, productName: 'MAK HONC', volumePerPCS: 800, mrp: 288, landingPrice: 0, difference: 0 }
//     ]
//   });

//   const handleChange = (e, section, index, field) => {
//     const value = e.target.value;
//     const updatedFormData = { ...formData };
//     if (section === 'stockInCases' || section === 'stockInLiters' || section === 'reports') {
//       updatedFormData[section][index][field] = value;
//     } else {
//       updatedFormData[section][field] = value;
//     }
//     setFormData(updatedFormData);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Submit formData to your backend API
//     console.log(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Purchase Oil</h1>
//       <div>
//         <label>Date: {new Date().toLocaleDateString()}</label>
//       </div>
//       <div>
//         <label>Invoice No</label>
//         <input
//           type="text"
//           value={formData.invoiceNo}
//           onChange={(e) => handleChange(e, 'formData', null, 'invoiceNo')}
//         />
//       </div>
//       <div>
//         <label>Total Amount</label>
//         <input
//           type="number"
//           value={formData.totalAmount}
//           onChange={(e) => handleChange(e, 'formData', null, 'totalAmount')}
//         />
//       </div>

//       <h2>Stock in Cases</h2>
//       {formData.stockInCases.map((item, index) => (
//         <div key={index}>
//           <input type="number" value={item.srNo} readOnly />
//           <input type="text" value={item.productName} readOnly />
//           <input type="text" value={item.grade} readOnly />
//           <input type="text" value={item.colour} readOnly />
//           <input type="number" value={item.mrp} readOnly />
//           <input type="number" value={item.volumePerPCS} readOnly />
//           <input type="number" value={item.pcsPerCase} readOnly />
//           <input
//             type="number"
//             value={item.purchaseTCases}
//             onChange={(e) => handleChange(e, 'stockInCases', index, 'purchaseTCases')}
//           />
//           <input
//             type="number"
//             value={item.totalPCS}
//             onChange={(e) => handleChange(e, 'stockInCases', index, 'totalPCS')}
//           />
//         </div>
//       ))}

//       <h2>Stock in Liters</h2>
//       {formData.stockInLiters.map((item, index) => (
//         <div key={index}>
//           <input type="number" value={item.srNo} readOnly />
//           <input type="number" value={item.volumePerPCS} readOnly />
//           <input
//             type="number"
//             value={item.totalPCS}
//             onChange={(e) => handleChange(e, 'stockInLiters', index, 'totalPCS')}
//           />
//           <input type="number" value={item.totalLtrs} readOnly />
//           <input
//             type="number"
//             value={item.ratePerUnit}
//             onChange={(e) => handleChange(e, 'stockInLiters', index, 'ratePerUnit')}
//           />
//           <input type="number" value={item.taxableValue} readOnly />
//         </div>
//       ))}

//       <h2>Tax Details</h2>
//       <div>
//         <input type="number" value={formData.taxDetails.srNo} readOnly />
//         <input type="number" value={formData.taxDetails.taxableValue} readOnly />
//         <input
//           type="number"
//           value={formData.taxDetails.discount}
//           onChange={(e) => handleChange(e, 'taxDetails', null, 'discount')}
//         />
//         <input type="number" value={formData.taxDetails.balanceAmt} readOnly />
//         <input
//           type="number"
//           value={formData.taxDetails.cgst}
//           onChange={(e) => handleChange(e, 'taxDetails', null, 'cgst')}
//         />
//         <input
//           type="number"
//           value={formData.taxDetails.sgst}
//           onChange={(e) => handleChange(e, 'taxDetails', null, 'sgst')}
//         />
//         <input
//           type="number"
//           value={formData.taxDetails.tcs}
//           onChange={(e) => handleChange(e, 'taxDetails', null, 'tcs')}
//         />
//         <input type="number" value={formData.taxDetails.totalAmt} readOnly />
//         <input type="number" value={formData.taxDetails.totalPcs} readOnly />
//         <input type="number" value={formData.taxDetails.landingPrice} readOnly />
//       </div>

//       <h2>Reports</h2>
//       {formData.reports.map((item, index) => (
//         <div key={index}>
//           <input type="number" value={item.srNo} readOnly />
//           <input type="text" value={item.productName} readOnly />
//           <input type="number" value={item.volumePerPCS} readOnly />
//           <input type="number" value={item.mrp} readOnly />
//           <input type="number" value={item.landingPrice} readOnly />
//           <input type="number" value={item.difference} readOnly />
//         </div>
//       ))}

//       <button type="submit">Add</button>
//     </form>
//   );
// };
// export default PurchaseOil;


import React, { useState } from 'react';
import '../css/PurchaseOil.css'; // Assume you have some basic CSS for styling

const PurchaseOil = () => {
  const [formData, setFormData] = useState({
    invoiceNo: '',
    totalAmount: '',
    stockInCases: [
      { srNo: 1, productName: 'MAK 4T PLI', grade: 'SL 20W40', colour: 'RED', mrp: 397, volumePerPCS: 900, pcsPerCase: 12, purchaseTCases: 0, totalPCS: 0 },
      { srNo: 2, productName: 'MAK 4T PLI', grade: 'SL 20W40', colour: 'RED', mrp: 422, volumePerPCS: 1, pcsPerCase: 12, purchaseTCases: 0, totalPCS: 0 },
      { srNo: 3, productName: 'MAK HONC', grade: 'JASO', colour: 'GREEN', mrp: 288, volumePerPCS: 800, pcsPerCase: 12, purchaseTCases: 0, totalPCS: 0 }
    ],
    stockInLiters: [
      { srNo: 1, volumePerPCS: 900, totalPCS: 0, totalLtrs: 0, ratePerUnit: 0, taxableValue: 0 },
      { srNo: 2, volumePerPCS: 1, totalPCS: 0, totalLtrs: 0, ratePerUnit: 0, taxableValue: 0 },
      { srNo: 3, volumePerPCS: 800, totalPCS: 0, totalLtrs: 0, ratePerUnit: 0, taxableValue: 0 }
    ],
    taxDetails: { srNo: 1, taxableValue: 0, discount: 0, balanceAmt: 0, cgst: 0, sgst: 0, tcs: 0, totalAmt: 0, totalPcs: 0, landingPrice: 0 },
    reports: [
      { srNo: 1, productName: 'MAK 4T PLI', volumePerPCS: 900, mrp: 397, landingPrice: 0, difference: 0 },
      { srNo: 2, productName: 'MAK 4T PLI', volumePerPCS: 1, mrp: 422, landingPrice: 0, difference: 0 },
      { srNo: 3, productName: 'MAK HONC', volumePerPCS: 800, mrp: 288, landingPrice: 0, difference: 0 }
    ]
  });

  const handleChange = (e, section, index, field) => {
    const value = e.target.value;
    const updatedFormData = { ...formData };
    if (section === 'stockInCases' || section === 'stockInLiters' || section === 'reports') {
      updatedFormData[section][index][field] = value;
    } else {
      updatedFormData[section][field] = value;
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit formData to your backend API
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Purchase Oil</h1>
      <div>
        <label>Date: {new Date().toLocaleDateString()}</label>
      </div>
      <div>
        <label>Invoice No</label>
        <input
          type="text"
          value={formData.invoiceNo}
          onChange={(e) => handleChange(e, 'formData', null, 'invoiceNo')}
        />
      </div>
      <div>
        <label>Total Amount</label>
        <input
          type="number"
          value={formData.totalAmount}
          onChange={(e) => handleChange(e, 'formData', null, 'totalAmount')}
        />
      </div>

      <h2>Stock in Cases</h2>
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Product Name</th>
            <th>Grade</th>
            <th>Colour</th>
            <th>MRP</th>
            <th>Volume Per PCS</th>
            <th>PCS Per Case</th>
            <th>Purchase T. Cases</th>
            <th>Total PCS</th>
          </tr>
        </thead>
        <tbody>
          {formData.stockInCases.map((item, index) => (
            <tr key={index}>
              <td><input type="number" value={item.srNo} readOnly /></td>
              <td><input type="text" value={item.productName} readOnly /></td>
              <td><input type="text" value={item.grade} readOnly /></td>
              <td><input type="text" value={item.colour} readOnly /></td>
              <td><input type="number" value={item.mrp} readOnly /></td>
              <td><input type="number" value={item.volumePerPCS} readOnly /></td>
              <td><input type="number" value={item.pcsPerCase} readOnly /></td>
              <td>
                <input
                  type="number"
                  value={item.purchaseTCases}
                  onChange={(e) => handleChange(e, 'stockInCases', index, 'purchaseTCases')}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.totalPCS}
                  onChange={(e) => handleChange(e, 'stockInCases', index, 'totalPCS')}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Stock in Liters</h2>
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Volume Per PCS</th>
            <th>Total PCS</th>
            <th>Total Liters</th>
            <th>Rate Per Unit</th>
            <th>Taxable Value</th>
          </tr>
        </thead>
        <tbody>
          {formData.stockInLiters.map((item, index) => (
            <tr key={index}>
              <td><input type="number" value={item.srNo} readOnly /></td>
              <td><input type="number" value={item.volumePerPCS} readOnly /></td>
              <td>
                <input
                  type="number"
                  value={item.totalPCS}
                  onChange={(e) => handleChange(e, 'stockInLiters', index, 'totalPCS')}
                />
              </td>
              <td><input type="number" value={item.totalLtrs} readOnly /></td>
              <td>
                <input
                  type="number"
                  value={item.ratePerUnit}
                  onChange={(e) => handleChange(e, 'stockInLiters', index, 'ratePerUnit')}
                />
              </td>
              <td><input type="number" value={item.taxableValue} readOnly /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Tax Details</h2>
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Taxable Value</th>
            <th>Discount</th>
            <th>Balance Amt</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>TCS</th>
            <th>Total Amt</th>
            <th>Total PCS</th>
            <th>Landing Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="number" value={formData.taxDetails.srNo} readOnly /></td>
            <td><input type="number" value={formData.taxDetails.taxableValue} readOnly /></td>
            <td>
              <input
                type="number"
                value={formData.taxDetails.discount}
                onChange={(e) => handleChange(e, 'taxDetails', null, 'discount')}
              />
            </td>
            <td><input type="number" value={formData.taxDetails.balanceAmt} readOnly /></td>
            <td>
              <input
                type="number"
                value={formData.taxDetails.cgst}
                onChange={(e) => handleChange(e, 'taxDetails', null, 'cgst')}
              />
            </td>
            <td>
              <input
                type="number"
                value={formData.taxDetails.sgst}
                onChange={(e) => handleChange(e, 'taxDetails', null, 'sgst')}
              />
            </td>
            <td>
              <input
                type="number"
                value={formData.taxDetails.tcs}
                onChange={(e) => handleChange(e, 'taxDetails', null, 'tcs')}
              />
            </td>
            <td><input type="number" value={formData.taxDetails.totalAmt} readOnly /></td>
            <td><input type="number" value={formData.taxDetails.totalPcs} readOnly /></td>
            <td><input type="number" value={formData.taxDetails.landingPrice} readOnly /></td>
          </tr>
        </tbody>
      </table>

      <h2>Reports</h2>
      <table>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Product Name</th>
            <th>Volume Per PCS</th>
            <th>MRP</th>
            <th>Landing Price</th>
            <th>Difference</th>
          </tr>
        </thead>
        <tbody>
          {formData.reports.map((item, index) => (
            <tr key={index}>
              <td><input type="number" value={item.srNo} readOnly /></td>
              <td><input type="text" value={item.productName} readOnly /></td>
              <td><input type="number" value={item.volumePerPCS} readOnly /></td>
              <td><input type="number" value={item.mrp} readOnly /></td>
              <td>
                <input
                  type="number"
                  value={item.landingPrice}
                  onChange={(e) => handleChange(e, 'reports', index, 'landingPrice')}
                />
              </td>
              <td><input type="number" value={item.difference} readOnly /></td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="submit">Add</button>
    </form>
  );
};

export default PurchaseOil;


//  old code om untill i see on 7th aug 24 wed
// import React from "react";
// import "../css/Tank.css";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// export default function Oil_Purchase({ dbpath1 }) {
//   const [oilproduct, setOilproduct] = useState([]);
//   const [Oil_Purchase_Not_Settled, setOil_Purchase_Not_Settled] = useState([]);
//   const [Invoices, setInvoices] = useState([]);
//   const [date, setDate] = useState("");
//   const [tempInvoiceTAmount, setTempInvoiceTAmount] = useState("0");
//   const [OtherDiscount, setOtherDiscount] = useState("0");
//   const [InvoiceTAmount, setInvoiceTAmount] = useState("");
//   const [product, setProduct] = useState("");
//   const [sr, setSr] = useState("");
//   const [grdae, setGrdae] = useState("");
//   const [color, setColor] = useState("");
//   const [volume, setPVolume] = useState("");
//   const [pcs, setPcs] = useState("");
//   const [gst, setGst] = useState("");

//   const [tpcs, setTpcs] = useState("");
//   const [tltrs, setTltrs] = useState(0.0);
//   const [taxableValue, setTaxableValue] = useState("");
//   const [balance, setBalance] = useState("");
//   const [cgst, setCGST] = useState("");
//   const [tCS, setTCS] = useState("");
//   const [total, setTotal] = useState("");
//   const [lPrice, setlPrice] = useState("");
//   const [Differnce, setDiffernce] = useState("");
//   const [type, setType] = useState("");
//   const [tHistory, setTHistory] = useState([]);

//   //rahul code
//   const [oilProductData, setOilProductData] = useState([]);
//   const [invoiceNo, setInvoiceNo] = useState("");
//   const [tamount, setTamount] = useState("");

//   // Stock In Cases :
//   const [productName, setProductName] = useState("");
//   const [grade, setGrade] = useState("");
//   const [colour, setColour] = useState("");
//   const [mrp, setMrp] = useState(0);
//   const [volumePerPieces, setVolumePerPieces] = useState(0);
//   const [volumeType, setVolumeType] = useState("");
//   const [pcsPerCase, setPcsPerCase] = useState(0);
//   const [pcsType, setPcsType] = useState("");

//   // purchase oil
//   const [purchaseTotalPcs, setPurchaseTotalPcs] = useState(0);

//   // Stock In Liters :
//   const [ratePerUnit,setRatePerUnit] = useState(0)
//   const fetchOil = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/addoil");
//       setOilProductData(res.data.allOils);
//       // toast.success("fetched oils")
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchOil();
//   }, []);
//   console.log("oilProductData", oilProductData);
//   return (
//     <>
//       <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
//         <h2 className="mt-3 text-center  text-3xl font-bold text-blue-900 uppercase">
//           Purchase Oil
//         </h2>
//         <span style={{ fontSize: "22px" }}>
//           {" "}
//           Date :{new Date().toLocaleDateString()}
//         </span>{" "}
//         <br></br>
//         <div>
//           <div></div>
//           <br></br>
//           <table class="table" style={{ width: "400px" }}>
//             <thead>
//               <tr className="table-secondary">
//                 <th className="tablebg">Invoice No</th>
//                 <th className="tablebg">Total Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td scope="row">
//                   <input
//                     type="text"
//                     class="form-control editableInput bigFontWeight"
//                     placeholder="Invoice No."
//                     value={invoiceNo}
//                     onChange={(e) => setInvoiceNo(e.target.value)}
//                   />
//                 </td>

//                 <td scope="row">
//                   <input
//                     type="text"
//                     class="form-control editableInput bigFontWeight"
//                     placeholder="Total Amount"
//                     value={InvoiceTAmount}
//                     onChange={(e) => {
//                       setTempInvoiceTAmount(e.target.value);
//                       setInvoiceTAmount(e.target.value);
//                     }}
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <br></br>
//           <h6>Stock In Cases :</h6>
//           <table class="table">
//             <thead>
//               <tr className="table-secondary">
//                 <th className="tablebg" style={{ width: "80px" }}>
//                   Sr no.
//                 </th>
//                 <th className="tablebg">Product Name</th>
//                 <th className="tablebg">Grade</th>
//                 <th className="tablebg">Colour</th>
//                 <th className="tablebg">MRP</th>
//                 <th className="tablebg">Volume Per PCS</th>
//                 <th className="tablebg">PCS Per Case</th>
//                 <th className="tablebg">Purchase T. Cases</th>
//                 <th className="tablebg">Total PCS (7x8)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {oilProductData.map((data) => (
//                 <tr>
//                   <td>
//                     <input
//                       type="text"
//                       class="form-control editableInput bigFontWeight"
//                       placeholder="Sr no."
//                       value={data.srNo}
//                     />
//                   </td>
//                   <td scope="row">
//                     <div className="input-group">
//                       <select
//                         className="w-40 px-3 py-2"
//                         id="inputGroupSelect01"
//                         value={data.productName}
//                         onChange={(e) => {
//                           setProductName(e.target.value);
//                           // setProductSelectValues(e.target.value);
//                         }}
//                       >
//                         <option value="product Name" selected>
//                           product Name
//                         </option>
//                         {oilProductData.map((rest) => (
//                           <option value={rest.productName}>
//                             {rest.productName}
//                           </option>
//                         ))}
//                       </select>
//                     </div>{" "}
//                   </td>
//                   <td scope="row">
//                     <input
//                       type="text"
//                       class="form-control bigFontWeight"
//                       id="idgrade"
//                       value={data.grade}
//                       disabled
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       class="form-control bigFontWeight"
//                       id="idcolor"
//                       value={data.colour}
//                       placeholder="Color"
//                       disabled
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       class="form-control bigFontWeight editableInput"
//                       id="idmrp"
//                       value={data.mrp}
//                       placeholder="MRP"
//                       onChange={(e) => setMrp(e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       class="form-control bigFontWeight"
//                       id="idvolume"
//                       value={data.volumePerPieces}
//                       placeholder="Volume"
//                       disabled
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       class="form-control bigFontWeight"
//                       id="idpcs"
//                       value={data.pcsPerCase}
//                       disabled
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       class="form-control editableInput bigFontWeight"
//                       id="idtcases"
//                       placeholder="Purchase t cases"
//                       value={purchaseTotalPcs}
//                       onChange={(e) => setPurchaseTotalPcs(e.target.value)}
//                     />
//                   </td>
//                   <td scope="row">
//                     <input
//                       type="text"
//                       class="form-control bigFontWeight"
//                       id="idtpcs"
//                       value={data.pcsPerCase * purchaseTotalPcs}
//                       onChange={(e) => e.target.value}
//                       placeholder="Total PCS"
//                       disabled
//                     />
//                   </td>
//                   {/* <td scope="row">
//                   <input type="text" class="form-control bigFontWeight" placeholder="Total Ltrs" onChange={(e) => setDiscount(e.target.value)} />
//               </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <br></br>
//           <h6 className="">Stock In Liters :</h6>
//           <table class="table">
//             <thead>
//               <tr className="table-secondary">
//                 <th className="tablebg">Sr No.</th>

//                 <th className="tablebg">Volume Per PCS</th>
//                 <th className="tablebg">Total PCS</th>
//                 <th className="tablebg">Total Ltrs</th>
//                 <th className="tablebg">Rate Per Unit</th>
//                 <th className="tablebg">Taxable Value (3x4)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {oilProductData.map((res) => (
//                 <tr className="text-center">
//                   <td>
//                     <input
//                       type="number"
//                       className="form-control w-20 center"
//                       value={res.srNo}
//                       disabled
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       class="form-control bigFontWeight"
//                       value={res.volumePerPieces}
//                       placeholder="Volume"
//                       onChange={(e) => setPVolume(e.target.value)}
//                       disabled
//                     />
//                   </td>
//                   <td scope="row">
//                     <input
//                       type="text"
//                       class="form-control bigFontWeight"
//                       value={tpcs}
//                       placeholder="Total PCS"
//                       onChange={(e) => setTpcs(e.target.value)}
//                       disabled
//                     />
//                   </td>
//                   <td scope="row">
//                     <input
//                       type="number"
//                       class="form-control bigFontWeight"
//                       value={tltrs}
//                       placeholder="Total Ltrs"
//                       onChange={(e) => {
//                         setTltrs(e.target.value);
//                       }}
//                       disabled
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="text"
//                       class="form-control editableInput bigFontWeight"
//                       placeholder="Rate"
//                       onChange={(e) => {
//                         // setRatePerUnit(e.target.value);
//                         // calcTaxablevalue(e.target.value);
//                       }}
//                     />
//                   </td>
//                   <td scope="row">
//                     <input
//                       type="text"
//                       class="form-control bigFontWeight"
//                       value={taxableValue}
//                       placeholder="Taxable Value"
//                       onChange={(e) => setTaxableValue(e.target.value)}
//                       disabled
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <br></br>
//           <h6>Tax Details :</h6>

//           <table class="table">
//             <thead>
//               <tr className="table-secondary">
//                 {/* <th className='tablebg' style={{width:'120px'}}>Rate Per Unit</th> */}
//                 <th className="tablebg">Taxable Value</th>
//                 <th className="tablebg">Discount (-) </th>
//                 <th className="tablebg">Balance AMT (=)</th>
//                 <th className="tablebg" style={{ width: "100px" }}>
//                   CGST (+)
//                 </th>
//                 <th className="tablebg" style={{ width: "100px" }}>
//                   SGST (+)
//                 </th>
//                 <th className="tablebg">TCS (+)</th>
//                 <th className="tablebg">Total AMT (=)</th>
//                 <th className="tablebg">Total PCS (÷)</th>
//                 <th className="tablebg">Landing Price</th>
//                 {/*  <th className='tablebg'>Differnce</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 {/* <td><input type="text" class="form-control bigFontWeight" placeholder="Rate" onChange={(e) => setRatePerUnit(e.target.value)} /></td> */}
//                 <td scope="row">
//                   <input
//                     type="text"
//                     value={taxableValue}
//                     class="form-control bigFontWeight"
//                     placeholder="Taxable Value"
//                     onChange={(e) => setTaxableValue(e.target.value)}
//                     disabled
//                   />
//                 </td>
//                 <td scope="row">
//                   <input
//                     type="text"
//                     class="form-control editableInput bigFontWeight"
//                     placeholder="Discount"
//                     onChange={(e) => {
//                       // setDiscount(e.target.value);
//                       // calcBalance(e.target.value);
//                     }}
//                   />
//                 </td>
//                 <td scope="row">
//                   <input
//                     type="text"
//                     value={balance}
//                     class="form-control bigFontWeight"
//                     placeholder="Balance"
//                     onChange={(e) => setBalance(e.target.value)}
//                     disabled
//                   />
//                 </td>
//                 <td scope="row">
//                   <select
//                     class="form-select editableInput bigFontWeight"
//                     aria-label="Default select example"
//                     value={gst}
//                     onChange={(e) => {
//                       setGst(e.target.value);
//                       // calcGST(e.target.value);
//                     }}
//                   >
//                     <option selected>- select -</option>
//                     <option value="1">1% </option>
//                     <option value="2">2% </option>
//                     <option value="3">3% </option>
//                     <option value="4">4% </option>
//                     <option value="5">5% </option>
//                     <option value="6">6% </option>
//                     <option value="7">7% </option>
//                     <option value="8">8% </option>
//                     <option value="9">9% </option>
//                     <option value="10">10% </option>
//                     <option value="11">11% </option>
//                     <option value="12">12% </option>
//                     <option value="13">13% </option>
//                     <option value="14">14% </option>
//                     <option value="15">15% </option>
//                     <option value="16">16% </option>
//                     <option value="17">17% </option>
//                     <option value="18">18% </option>
//                   </select>
//                 </td>
//                 <td>
//                   {" "}
//                   <select
//                     class="form-select bigFontWeight editableInput"
//                     aria-label="Default select example"
//                     value={gst}
//                     onChange={(e) => {
//                       setGst(e.target.value);
//                       // calcGST(e.target.value);
//                     }}
//                   >
//                     <option selected>- select -</option>

//                     <option value="1">1% </option>
//                     <option value="2">2% </option>
//                     <option value="3">3% </option>
//                     <option value="4">4% </option>
//                     <option value="5">5% </option>
//                     <option value="6">6% </option>
//                     <option value="7">7% </option>
//                     <option value="8">8% </option>
//                     <option value="9">9% </option>
//                     <option value="10">10% </option>
//                     <option value="11">11% </option>
//                     <option value="12">12% </option>
//                     <option value="13">13% </option>
//                     <option value="14">14% </option>
//                     <option value="15">15% </option>
//                     <option value="16">16% </option>
//                     <option value="17">17% </option>
//                     <option value="18">18% </option>
//                   </select>{" "}
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control editableInput bigFontWeight"
//                     placeholder="TCS"
//                     onChange={(e) => {
//                       setTCS(e.target.value);
//                       // calcTotalAmount(e.target.value);
//                     }}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     value={tamount}
//                     placeholder="Total Amount"
//                     onChange={(e) => setTamount(e.target.value)}
//                     disabled
//                   />
//                 </td>
//                 <td scope="row">
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     value={tpcs}
//                     placeholder="Total PCS"
//                     onChange={(e) => setTpcs(e.target.value)}
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     class="form-control bigFontWeight"
//                     value={lPrice}
//                     placeholder="Landing Price"
//                     onChange={(e) => setlPrice(e.target.value)}
//                     disabled
//                   />
//                 </td>
//                 {/* <td><input type="text" class="form-control bigFontWeight" placeholder="difference" onChange={(e) => setDiffernce(e.target.value)} /></td>
//                  */}
//               </tr>
//             </tbody>
//           </table>
//           <span style={{ marginLeft: "450px", color: "green" }}>
//             {cgst}
//             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//             {cgst}
//           </span>

//           <br></br>
//           <h6>Reports :</h6>

//           <table class="table" style={{ width: "900px" }}>
//             <thead>
//               <tr className="table-secondary">
//                 {/* <th className='tablebg' style={{width:'120px'}}>Rate Per Unit</th> */}

//                 <th className="tablebg">Product Name</th>
//                 <th className="tablebg">Volume Per PCS</th>
//                 <th className="tablebg">MRP</th>
//                 <th className="tablebg">Landing Price</th>
//                 <th className="tablebg">Differnce</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td scope="row">
//                   <input
//                     type="text"
//                     value={productName}
//                     class="form-control bigFontWeight"
//                     placeholder="Prodduct Name"
//                     onChange={(e) => setProductName(e.target.value)}
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={volume}
//                     class="form-control bigFontWeight"
//                     placeholder="Volume"
//                     onChange={(e) => setPVolume(e.target.value)}
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={mrp}
//                     class="form-control bigFontWeight"
//                     placeholder="MRP"
//                     onChange={(e) => setMrp(e.target.value)}
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={lPrice}
//                     class="form-control bigFontWeight"
//                     placeholder="Landing Price"
//                     onChange={(e) => setlPrice(e.target.value)}
//                     disabled
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     style={{ color: "red" }}
//                     value={Differnce}
//                     class="form-control bigFontWeight"
//                     placeholder="difference"
//                     onChange={(e) => setDiffernce(e.target.value)}
//                     disabled
//                   />{" "}
//                 </td>
//                 {/* <td><input type="text" class="form-control bigFontWeight" placeholder="Rate" onChange={(e) => setRatePerUnit(e.target.value)} /></td> */}
//               </tr>
//             </tbody>
//           </table>
//           <br></br>
//           {/*    <h6>Invoice Info :</h6>
//             <table class="table" style={{width:'900px'}}>
//                     <thead>
//                         <tr className='table-secondary'>
                    
//                         <th >Invoice No</th>
                     
//                         <th className='tablebg'>Total Amount</th>
//                             <th className='tablebg'>Other Discount</th>
//                             <th className='tablebg'>T. Invoice Amount</th>

                           
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr>
                       
//                              <td scope="row" >
//                                 <input type="text" class="form-control bigFontWeight" placeholder="Invoice No." value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
//                             </td>
//                              <td scope="row" >
//                                 <input type="text" class="form-control bigFontWeight" placeholder="Total Amount" value={tempInvoiceTAmount} onChange={(e) => setTempInvoiceTAmount(e.target.value)} />
//                             </td>
//                             <td ><input type="text" class="form-control bigFontWeight" placeholder="Other Discount" onChange={(e) => {setOtherDiscount(e.target.value); calcInvoiceTAmount(e.target.value)}} /></td>
                                
//                             <td scope="row" >
//                                 <input type="text" class="form-control bigFontWeight" value={InvoiceTAmount} placeholder="Invoice Amount" onChange={(e) => setInvoiceTAmount(e.target.value)} disabled/>
//                             </td>
                            
//                         </tr>
                        
//                     </tbody>
//                 </table>  */}
//           <center>
//             <button
//               type="button"
//               class="btn btn-primary"
//               //   onClick={() => {
//               //     onAdd();
//               //     timeoutFunc();
//               //   }}
//             >
//               Add
//             </button>
//           </center>
//         </div>
//         <br></br>
//         <div>
//           <br></br>
//           <h2 className="mt-3 text-center">Invoice Purchases</h2>
//           <br></br>
//           <table class="table">
//             <thead>
//               <tr className="table-secondary">
//                 {/* <th className='tablebg' style={{width:'120px'}}>Rate Per Unit</th> */}
//                 <th className="tablebg">Invoice No.</th>
//                 <th className="tablebg">Product Name</th>
//                 <th className="tablebg">Volume Per PCS</th>
//                 <th className="tablebg">Total PCS</th>
//                 <th className="tablebg">MRP</th>
//                 <th className="tablebg">Landing Price</th>
//                 <th className="tablebg">Differnce</th>
//               </tr>
//             </thead>

//             <tbody>
//               {/* <tr>    
//                             <th scope="row">A1</th>
//                             <td>MS-1</td>
//                             <td>Diesel Piont</td>
//                             <td>1</td>
//                             <td>2</td>
//                             <td>11254</td>
//                             <td style={{width:'150px'}}>
//                                 <button type="button" class="btn btn-primary">Edit</button> &nbsp;
//                                 <button type="button" class="btn btn-primary">Delete</button>
//                             </td>
//                         </tr>  */}
//               {tHistory.map((res, index) => (
//                 <tr className="hovereffect" key={index}>
//                   <td>{res.invoice_no}</td>
//                   <td>{res.product_name}</td>
//                   <td>{res.volume_per_pcs}</td>
//                   <td>{res.total_pcs}</td>

//                   <td>{res.mrp}</td>
//                   <td>{res.landingPrice}</td>
//                   <td /* style={{width:'250px'}} */>
//                     {/* <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Edit</button> &nbsp; 
//                                          <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Close</button> &nbsp;
//                                         <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Open</button> &nbsp;  */}
//                     <button
//                       type="button"
//                       id={"tank" + res.purchase_id}
//                       class="btn btn-danger"
//                       //   onClick={() => {
//                       //     onDelete(res.purchase_id);
//                       //     timeoutFunc();
//                       //   }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <center></center>
//           <center>
//             <button
//               type="button"
//               class="btn btn-warning"
//               //   onClick={onMoveToGodown}
//             >
//               Move to Godown
//             </button>
//           </center>
//         </div>
//       </div>
//     </>
//   );
// }
