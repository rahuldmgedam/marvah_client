// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const Oil_Godown = () => {
//   const [oilProductData, setOilProductData] = useState([]);

//   const fetchPurchaseOil = async () => {
//     try {
//       const res = await axios.get("https://marvah-server.onrender.com/purchaseoil");
//       setOilProductData(res.data);
//       // toast.success("fetched oils")
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchPurchaseOil();
//   }, []);
//   const localDate = new Date().toLocaleDateString();

//   return (
//     <div>
//       <div className="">
//         <h2 className="mb-2 text-2xl text-green-500 uppercase text-center">
//           Godown stock
//         </h2>
//         <div className="mb-4">
//           <label className="font-bold">Date: {localDate}</label> <br />
//         </div>
//         <table className="bg-white border border-gray-700">
//           <thead className="">
//             <tr className="bg-[#3A1078] text-white  uppercase text-sm">
//               <th className="py-1 px-2 text-center">
//                 Sr. <br /> No
//               </th>
//               <th className="py-1 px-2 text-center">
//                 Product <br /> Name
//               </th>
//               <th className="py-1 px-2 text-center">Grade</th>
//               <th className="py-1 px-2 text-center">Colour</th>
//               <th className="py-1 px-2 text-center">
//                 Volume. <br /> per PCS
//               </th>
//               <th className="py-1 px-2 text-center border-r">MRP </th>
//               <th className="py-1 px-2 text-center border-r">
//                 Opening <br />
//                 Stock <br />
//                 (+)
//               </th>
//               <th className="py-1 px-2 text-center">
//                 Invoice <br />
//                 Stock <br />
//                 (+)
//               </th>
//               <th className="py-1 px-2 text-center">
//                 Total
//                 <br /> Opening <br />
//                 stock (=)
//               </th>
//               <th className="py-1 px-2 text-center">
//                 outward <br /> Retail <br />
//                 (-)
//               </th>
//               <th className="py-1 px-2 text-center">
//                 balance <br /> stock <br />
//                 (=)
//               </th>{" "}
//               <th className="py-1 px-2 text-center">
//                 balance <br /> stock <br />
//                 amt(=)
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
//                 <td className="px-1 border-r">
//                   <input
//                     className="w-32 text-center"
//                     type="text"
//                     value={item.productName}
//                     readOnly
//                   />
//                 </td>
//                 <td className=" px-1 border-r">
//                   <input
//                     className="w-24 text-center"
//                     type="text"
//                     value={item.grade}
//                     readOnly
//                   />
//                 </td>
//                 <td className=" px-1 border-r">
//                   <input
//                     className="w-20 text-center"
//                     type="text"
//                     value={item.colour}
//                     readOnly
//                   />
//                 </td>
//                 <td className="text-center">
//                   <input
//                     className="w-16 text-center"
//                     type="number"
//                     value={item.volumePerPieces}
//                     readOnly
//                   />
//                 </td>
//                 <td className=" px-2 border-r">
//                   <input
//                     className="w-16 text-center"
//                     type="number"
//                     value={item.mrp}
//                     readOnly
//                   />
//                 </td>

//                 <td className="text-center">
//                   <input
//                     className="w-12 text-center border-4 border-blue-600"
//                     type="number"
//                     value={item.opStock}
//                   />
//                 </td>
//                 {/* //here item.invStock - item.totalPCS */}
//                 <td className="px-2 text-center">
//                   <input
//                     className="w-12 text-center"
//                     type="number"
//                     value={item.invStock}
//                     readOnly
//                   />
//                 </td>
//                 <td className="text-center px-2">
//                   <input
//                     className="w-12 text-center "
//                     type="number"
//                     value={item.totOpStock}
//                   />
//                 </td>
//                 <td className="px-2 text-center">
//                   <input
//                     className="w-12  border-4 border-blue-600"
//                     type="number"
//                     value={item.outRetail}
//                     readOnly
//                   />
//                 </td>
//                 <td className="px-2 text-center">
//                   <input
//                     className="w-12"
//                     type="number"
//                     value={item.balStock}
//                     readOnly
//                   />
//                 </td>
//                 <td className="px-2 text-center">
//                   <input
//                     className="w-24"
//                     type="number"
//                     value={item.balStockAmt}
//                     readOnly
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Oil_Godown;

// om old code

// import React from 'react'
// import '../css/Tank.css'
// import axios from 'axios';
// import  {useState, useEffect} from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// export default function Oil_Purchase({dbpath1}) {

//     const [Invoices, setInvoices] = useState([]);
//     const [oil_godown, set_oil_godown] = useState([]);
//     const [oil_godown_history, set_oil_godown_history] = useState([]);
//     const [invoiceNo, setInvoiceNo] = useState('');
//     const [product, setProduct] = useState('');
//     const [sr, setSr] = useState('');
//     const [grdae, setGrdae] = useState('');
//     const [color, setColor] = useState('');
//     const [mrp, setMrp] = useState('');
//     const [volume, setPVolume] = useState('');
//     const [pcs, setPcs] = useState('');
//     const [cases, setCases] = useState('');
//     const [tcases, setTcases] = useState('');
//     const [tpcs, setTpcs] = useState('');
//     const [tltrs, setTltrs] = useState('');
//     const [ratePerUnit, setRatePerUnit] = useState('');
//     const [taxableValue, setTaxableValue] = useState('');
//     const [discount, setDiscount] = useState('');
//     const [balance, setBalance] = useState('');
//     const [cgst, setCGST] = useState('');
//     const [sgst, setSgst] = useState('');
//     const [tCS, setTCS] = useState('');
//     const [total, setTotal] = useState('');
//     const [lPrice, setlPrice] = useState('');
//     const [allTotalAmount, setAllTotalAmount] = useState('');
//     const [oDiscount, setODiscount] = useState('');
//     const [tInvoiceAmount, setTInvoiceAmount] = useState('');
//     const [Differnce, setDiffernce] = useState('');

//     const loadOilGodown = async () => {
//         let query="SELECT * FROM `rwt_oil_godown` where topstoack>0;";
//         /*
//             alert(query); */
//             const url = dbpath1 + 'getDynamic.php';
//             let fData = new FormData();

//             fData.append('query', query);

//             try {
//                 const response = await axios.post(url, fData);

//                 if (response && response.data) {

//                     if (response.data.phpresult) {
//                         set_oil_godown(response.data.phpresult);
//                         console.log(response.data.phpresult);
//                         essenstials(response.data.phpresult);
//                     }
//                 }
//             } catch (error) {
//                 console.log("Please Select Proper Input");
//             }
//     }

//     const loadTHistory = async () => {
//         let query="SELECT * FROM `rwt_oil_godown_trans` where date='"+datecache+"' AND mode='Godown';";
//         /*
//             alert(query); */
//             const url = dbpath1 + 'getDynamic.php';
//             let fData = new FormData();

//             fData.append('query', query);

//             try {
//                 const response = await axios.post(url, fData);

//                 if (response && response.data) {

//                     if (response.data.phpresult) {
//                         set_oil_godown_history(response.data.phpresult);
//                         console.log("th"+response.data.phpresult);

//                     }
//                 }
//             } catch (error) {
//                 console.log("Please Select Proper Input");
//             }
//     }

//     const essenstials =  (data) => {
//         for (let i = 0; i < data.length; i++) {
//             // aggregatedMRP += parseFloat(Oil_Purchase_Not_Settled[i].mrp);
//             //const selectedProduct = oilproduct.find(product => product.product_id === Oil_Purchase_Not_Settled[i].product_id);
//            // console.log(selectedProduct.product_colour);
//            document.getElementById("bs"+data[i].id).value = data[i].topstoack;
//            document.getElementById("bsa"+data[i].id).value = data[i].topstoack*data[i].product_mrp;

//         }
//     }

//     const navigate = useNavigate();

//     const calc =(value, index )=>{
//         const selectedProduct = oil_godown.find(product => product.id ===index);

//         document.getElementById("bs"+index).value = selectedProduct.topstoack - value;
//         document.getElementById("bsa"+index).value = (selectedProduct.topstoack - value)* selectedProduct.product_mrp;
//     }

//     const onDelete = async (index) => {
//         let query="DELETE FROM `pupc_add_tank` WHERE tank_no = "+index+";";
//         alert(query);
//         const result = await axios.get(dbpath1+"dynamicQuery.php?query="+query);

//         console.log(result.data.phpresult);
//     }

//     const onMoveRetail = async (index) => {
//         console.log(index);
//         var val = document.getElementById('odr'+index).value;
//         const selectedProduct = oil_godown.find(product => product.id ===index);
//         var temp_topstoack = selectedProduct.topstoack - val;
//         var temp_balStkAmount = temp_topstoack * selectedProduct.product_mrp;
//         var temp_retail_inward = val;
//         var temp_retail_op_stk = selectedProduct.retail_top_stk;
//         var temp_retail_top_stk = parseInt(temp_retail_op_stk)+parseInt(temp_retail_inward);

//         let query="UPDATE rwt_oil_godown SET topstoack = '"+temp_topstoack+"', balStkAmount = "+temp_balStkAmount+", retail_inward = "+temp_retail_inward+", retail_op_stk = "+temp_retail_op_stk+", retail_top_stk = "+temp_retail_top_stk+" WHERE id = "+index;
//           /*  alert(query); */
//            const url = dbpath1+'delTank.php';
//            let fData = new FormData();
//            fData.append('query', query);

//            axios.post(url, fData)
//                .then(response => alert(response.data))
//                .catch(error => {
//                console.log(error.toJSON());
//         });
//         loadOilGodown();
//     }

//     const setGodownData = (index) => {
//         var val = document.getElementById('odr'+index).value;
//         const selectedProduct = oil_godown.find(product => product.id ===index);

//         var temp_godownid = selectedProduct.id;
//         var temp_product_id = selectedProduct.product_id;
//         var temp_productname = selectedProduct.product_name;
//         var temp_grade = selectedProduct.product_grade;
//         var temp_product_colour = selectedProduct.product_colour;
//         var temp_godownproduct_volume_per_pcs = selectedProduct.product_volume_per_pcs;
//         var temp_product_mrp = selectedProduct.product_mrp;
//         var temp_purchasePrice = selectedProduct.purchasePrice;
//         var temp_opStock = selectedProduct.opStock;
//         var temp_reciept = selectedProduct.reciept;
//         var temp_topstoack = selectedProduct.topstoack;
//         var temp_type = selectedProduct.type;

//        let query="INSERT INTO `rwt_oil_godown_trans` (`id`, `godown_id`, `product_id`, `date`, `mode`, `qty`, `amount`, `discount`, `a_amount`, `product_name`, `product_grade`, `product_colour`, `product_mrp`, `product_volume_per_pcs`, `product_pcs_per_caserwt_oil_products`, `purchasePrice`, `opStock`, `reciept`, `topstoack`, `balStkAmount`, `retail_op_stk`, `retail_inward`, `retail_top_stk`, `type`) VALUES (NULL, '"+temp_godownid+"', '"+temp_product_id+"', '"+datecache+"', 'Godown', '"+document.getElementById('odr'+index).value+"', '"+document.getElementById('bs'+index).value+"', '"+0+"', '"+document.getElementById('bsa'+index).value+"', '"+temp_productname+"', '"+temp_grade+"', '"+temp_product_colour+"', '"+temp_godownproduct_volume_per_pcs+"', '"+temp_product_mrp+"', '"+temp_opStock+"', '"+temp_reciept+"', '"+temp_topstoack+"', '"+0+"', '"+0+"', '"+0+"', '"+0+"', '"+0+"', '"+0+"', '"+temp_type+"');";

//         /* alert(query); */
//            const url = dbpath1+'delTank.php';
//            let fData = new FormData();
//            fData.append('query', query);

//            axios.post(url, fData)
//                .then(response => alert(response.data))
//                .catch(error => {
//                console.log(error.toJSON());
//         });
//     }

//     const changeButton = () =>{

//     }

//     useEffect(() => {
//         loadOilGodown();
//         loadTHistory();
//       }, []);
//       const datecache = Cookies.get('dateCookies');

//     //   function convertDateFormat(inputDate) {
//     //     // Split the string into an array [yyyy, mm, dd]
//     //     let parts = inputDate.split('-');

//     //     // Rearrange the array and join it back to a string
//     //     return parts[2] + '-' + parts[1] + '-' + parts[0];
//     // }
//     return (
//     <>
//         <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>
//         <h2 className='mt-3 text-center'>Godown Stock</h2>

//         <span style={{fontSize:'22px'}}> Date : {datecache}</span>
//             <br></br>
//             <br></br>
//             <div>

//                 <table class="table">
//                     <thead>
//                         <tr className='table-secondary'>

//                             <th className='tablebg'>Sr No</th>
//                             <th className='tablebg'>Products</th>
//                             {/* <th className='tablebg'>Grade </th> */}
//                             <th className='tablebg'>Colour</th>
//                             <th className='tablebg'>Volume/ Capacity</th>
//                             <th className='tablebg'>MRP</th>
//                             <th className='tablebg'>Purchase Price</th>
//                             <th className='tablebg'>Op Stk</th>
//                             <th className='tablebg'>Receipt (+)</th>
//                             <th className='tablebg'>T.Stk (=)</th>
//                             <th className='tablebg'>Outward<br /> Retail</th>
//                             <th className='tablebg'>Bal Stk</th>
//                             <th className='tablebg'>Bal Stk Amt</th>
//                             <th className='tablebg'>Action</th>

//                         </tr>
//                     </thead>
//                     <tbody>

//                          {oil_godown.map((res,index)=>
//                                 <tr  key={index}>
//                                      <th>{index+1}</th>
//                                      <td>{res.product_name}</td>

//                                   {/*   <td>{res.product_grade}</td> */}
//                                     <td>{res.product_colour}</td>
//                                     <td>{res.product_volume_per_pcs}</td>
//                                     <td>{res.product_mrp}</td>
//                                     <td>{res.purchasePrice}</td>
//                                     <td>{res.opStock}</td>
//                                     <td>{res.reciept}</td>
//                                     <td>{res.topstoack}</td>
//                                     <td><input  type="text" id={'odr'+res.id}  class="form-control  editableInput bigFontWeight" placeholder="Outwar D Retail" onChange={(e) => {calc(e.target.value, res.id); changeButton()}}  /></td>
//                                     <td><input id={'bs'+res.id} type="text" class="form-control  bigFontWeight" placeholder="Loading.." disabled /></td>
//                                     <td><input id={'bsa'+res.id} type="text" class="form-control  bigFontWeight" placeholder="Loading.." disabled /></td>
//                                     <td style={{width:'50px'}}>

//                                         <button type="button" id={"tank"+res.tank_no} class="btn btn-primary" onClick={() =>{ onMoveRetail(res.id); setGodownData(res.id); }}>Save</button>
//                                     </td>
//                                 </tr>
//                    )}

//                     </tbody>
//                 </table>
//                 <br></br>
//                 <b>Today History : </b>
//                 <table class="table">
//                     <thead>
//                         <tr className='table-secondary'>

//                             <th className='tablebg'>Sr No</th>
//                             <th className='tablebg'>Products</th>
//                             <th className='tablebg'>Grade </th>
//                             <th className='tablebg'>Colour</th>
//                             <th className='tablebg'>Volume/ Capacity</th>
//                             <th className='tablebg'>MRP</th>
//                             <th className='tablebg'>Purchase Price</th>

//                             <th className='tablebg'>Outward<br /> Retail</th>
//                             {/* <th className='tablebg'>Type</th> */}

//                         </tr>
//                     </thead>
//                     <tbody>

//                          {oil_godown_history.map((res,index)=>
//                                 <tr  key={index}>
//                                      <th>{index+1}</th>
//                                      <td>{res.product_name}</td>

//                                     <td>{res.product_grade}</td>
//                                     <td>{res.product_colour}</td>
//                                     <td>{res.product_volume_per_pcs}</td>
//                                     <td>{res.product_mrp}</td>
//                                     <td>{res.purchasePrice}</td>

//                                     <td>{res.qty}</td>
//                                    {/*  <td style={{width:'50px'}}>

//                                         <button type="button" id={"tank"+res.tank_no} class="btn btn-primary" onClick={() =>{ onMoveRetail(res.id); setGodownData(res.id); }}>Save</button>
//                                     </td> */}
//                                 </tr>
//                    )}

//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </>
//   )
// }

import axios from "axios";
import React, { useEffect, useState } from "react";

const Oil_Godown = () => {
  const [oilProductData, setOilProductData] = useState([]);

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
      setOilProductData(dataWithCalculatedFields);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPurchaseOil();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...oilProductData];
    updatedData[index][field] = Number(value);

    // Recalculate dependent fields
    updatedData[index].totOpStock =
      updatedData[index].opStock + updatedData[index].invStock;
    updatedData[index].balStock =
      updatedData[index].totOpStock - updatedData[index].outRetail;
    updatedData[index].balStockAmt =
      updatedData[index].balStock * updatedData[index].mrp;

    setOilProductData(updatedData);
  };

  const localDate = new Date().toLocaleDateString();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const handleSaveStock = async () => {
    try {
      await axios.post("https://marvah-server.onrender.com/godownoil/create", oilProductData);
      alert("Stock record saved successfully!");
    } catch (error) {
      console.error("Error saving stock record:", error);
      alert("Failed to save stock record.");
    }
  };

  return (
    <>
      <div>
        <div className="">
          <h2 className="mb-2 text-2xl font-bold uppercase text-center">
            Godown stock
          </h2>
          <div className="mb-4">
            <label className="font-bold text-2xl">
              Date :{localDate}
              {/* {formatDate(oilProductData[0].purchaseOilDate)} */}
            </label>{" "}
            <br />
          </div>
          <table className="bg-white border border-gray-700">
            <thead className="">
              <tr className="bg-[#3A1078] text-white  uppercase text-sm">
                <th className="py-1 px-2 text-center">
                  Sr. <br /> No
                </th>
                <th className="py-1 px-2 text-center">
                  Product <br /> Name
                </th>
                <th className="py-1 px-2 text-center">Grade</th>
                <th className="py-1 px-2 text-center">Colour</th>
                <th className="py-1 px-2 text-center">
                  Volume. <br /> per PCS
                </th>
                <th className="py-1 px-2 text-center border-r">MRP </th>
                <th className="py-1 px-2 text-center border-r">
                  Opening <br />
                  Stk (Pcs) <br />
                  (+)
                </th>
                <th className="py-1 px-2 text-center">
                  Invoice <br />
                  Stk   (Pcs)<br />
                 (+)
                </th>
                <th className="py-1 px-2 text-center">
                  Tot. Open
                  <br /> stk (Pcs) <br />
                 (=)
                </th>
                <th className="py-1 px-2 text-center">
                  outward <br />to Retail <br />
                  (-)
                </th>
                <th className="py-1 px-2 text-center">
                  balance <br /> stock <br />
                  (=)
                </th>{" "}
                <th className="py-1 px-2 text-center">
                  balance <br /> stock <br />
                  amt(=)
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
                      className="w-32 text-center"
                      type="text"
                      value={item.productName}
                      readOnly
                    />
                  </td>
                  <td className=" px-1 border-r">
                    <input
                      className="w-24 text-center"
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
                  <td className="text-center">
                    <input
                      className="w-16 text-center"
                      type="number"
                      value={item.volumePerPieces}
                      readOnly
                    />
                  </td>
                  <td className=" px-2 border-r">
                    <input
                      className="w-16 text-center"
                      type="number"
                      value={item.mrp}
                      readOnly
                    />
                  </td>

                  <td className="text-center">
                    <input
                      className="w-12 text-center"
                      type="number"
                      value={item.opStock}
                      readOnly
                    />
                  </td>
                  <td className="px-2 text-center">
                    <input
                      className="w-12 text-center"
                      type="number"
                      value={(item.invStock = item.totalPCS)}
                      readOnly
                    />
                  </td>
                  <td className="text-center px-2">
                    <input
                      className="w-12 text-center "
                      type="number"
                      value={item.totOpStock}
                      readOnly
                    />
                  </td>
                  <td className="px-2 text-center">
                    <input
                      className="w-12  border-4 border-blue-600"
                      type="number"
                      value={item.outRetail}
                      onChange={(e) =>
                        handleInputChange(index, "outRetail", e.target.value)
                      }
                    />
                  </td>
                  <td className="px-2 text-center">
                    <input
                      className="w-12"
                      type="number"
                      value={item.balStock}
                      readOnly
                    />
                  </td>
                  <td className="px-2 text-center">
                    <input
                      className="w-24"
                      type="number"
                      value={item.balStockAmt}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-around">
        <button></button>
        <button onClick={handleSaveStock} className="px-4 py-2 bg-blue-500 rounded-lg mt-3 font-bold">
          Save Stock to Retail
        </button>
      </div>
    </>
  );
};

export default Oil_Godown;
