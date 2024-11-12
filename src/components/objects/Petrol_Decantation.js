// till 10 nov rahul

// import React, { useState, useEffect } from "react";
// import "../css/Tank.css";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const init = {
//   invoiceNumber: "",
//   mskl: "",
//   speedkl: "",
//   hsdkl: "",
//   totalkl: "",
//   tank1: "",
//   tank2: "",
//   tank3: "",
//   tanktotalkl: "",
// };

// export default function Client() {
//   const [decantation, setDecantation] = useState(init);
//   const [data, setData] = useState([]);
//   const [petrolInvoice, setPetrolInvoice] = useState([]);
//   const [ms, setMs] = useState("");
//   const [hsd, sethsd] = useState("");
//   const [speed, setSpeed] = useState("");
//   const [selectedInvoice, setSelectedInvoice] = useState("");
//   const [tankName, setTankName] = useState([]);
//   const [tank, setTank] = useState([]);
//   const [tank1Decantaion, setTank1Decantation] = useState("");
//   const [tank2Decantaion, setTank2Decantation] = useState("");
//   const [tank3Decantaion, setTank3Decantation] = useState("");
//   const [editRowId, setEditRowId] = useState(null);
//   const [editedRow, setEditedRow] = useState({
//     tank1: "",
//     tank2: "",
//     tank3: "",
//     tanktotalkl: 0,
//   });

//   const handleEdit = (id, row) => {
//     setEditRowId(id);
//     setEditedRow({
//       tank1: row.tank1,
//       tank2: row.tank2,
//       tank3: row.tank3,
//       tanktotalkl: row.tanktotalkl,
//     });
//   };

//   const handleSave = (id) => {
//     const updatedData = data.map((item) =>
//       item._id === id
//         ? {
//           ...item,
//           tank1: editedRow.tank1,
//           tank2: editedRow.tank2,
//           tank3: editedRow.tank3,
//           tanktotalkl:
//             parseInt(editedRow.tank1) +
//             parseInt(editedRow.tank2) +
//             parseInt(editedRow.tank3),
//         }
//         : item
//     );
//     setData(updatedData);
//     setEditRowId(null);
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedRow((prevRow) => ({ ...prevRow, [name]: value }));
//   };

//   const fetchTankName = async () => {
//     try {
//       const response = await axios.get(
//         "https://marvah-server.onrender.com/tank"
//       );
//       const data = await response.data.map((item) => item.product);
//       setTankName(data);
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const totalkl =
//       Number(decantation.mskl) +
//       Number(decantation.speedkl) +
//       Number(decantation.hsdkl);
//     const tanktotalkl =
//       Number(decantation.tank1) +
//       Number(decantation.tank2) +
//       Number(decantation.tank3);
//     setDecantation((prevFormData) => ({
//       ...prevFormData,
//       totalkl,
//       tanktotalkl,
//     }));
//     fetchTankName();
//   }, [
//     decantation.mskl,
//     decantation.hsdkl,
//     decantation.speedkl,
//     decantation.tank1,
//     decantation.tank2,
//     decantation.tank3,
//   ]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "invoice") {
//       setSelectedInvoice(value);
//     }
//     setDecantation((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = () => {
//     const formattedData = {
//       ...decantation,
//       mskl: ms ? ms : 0,
//       hsdkl: hsd ? hsd : 0,
//       speedkl: speed ? speed : 0,
//       totalkl: Number(decantation.totalkl),
//       tank1: Number(tank1Decantaion),
//       tank2: Number(tank2Decantaion),
//       tank3: Number(tank3Decantaion),
//       tanktotalkl: Number(tank1Decantaion) + Number(tank2Decantaion) + Number(tank3Decantaion),

//     };
//     console.log("data", formattedData);

//     axios
//       .post(
//         "https://marvah-server.onrender.com/petroldecantation/create",
//         formattedData
//       )
//       .then((res) => {
//         if (res.data.state) {
//           alert(res.data.msg);
//           console.log("resss", res.data);
//           handleUpdateInvoice();
//           fetchData();
//           // setDecantation(init);
//           // setMs("");
//           // sethsd("");
//           // setSpeed("");
//         }
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   const handleUpdateInvoice = async () => {
//     try {
//       const res = axios.patch(
//         `https://marvah-server.onrender.com/petrolInvoiceFeeding/updateshow/${selectedInvoice}`
//       );
//       if (res.data.success) {
//         console.log(res.data.msg);
//         alert(res.data.message);
//         handleFetchData();
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const fetchData = () => {
//     axios
//       .get("https://marvah-server.onrender.com/petroldecantation")
//       .then((res) => {
//         if (res.data) {
//           console.log(res.data);
//           setData(res.data);
//         }
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   const handleDelete = async (id) => {
//     const response = await axios.delete(
//       `https://marvah-server.onrender.com/petroldecantation/delete/${id}`
//     );
//     if (response) {
//       if (response.data.success) {
//         alert(response.data.msg);
//         fetchData();
//       }
//     }
//   };

//   // const handleEdit = async (id, data) => {
//   //   console.log(id);

//   //   try {
//   //     const response = await axios.patch(https://marvah-server.onrender.com/petroldecantation/update/${id}, data)
//   //     if(response && response.data.success){
//   //       alert(response.data.msg);
//   //       fetchData(); // Refresh the data after editing
//   //     }
//   //   } catch (error) {
//   //     console.error("Error editing data:", error);
//   //     alert("Failed to edit the data. Please try again.");
//   //   }
//   // }

//   // const handleDelete = (deleteIndex) => {
//   //   const updateData = data.filter((_, index) => index !== deleteIndex)
//   //   setData(updateData)
//   // }
//   const handleFetchData = () => {
//     axios
//       .get("https://marvah-server.onrender.com/petrolInvoiceFeeding")
//       .then((res) => {
//         const allInvoices = res.data.petrolInvoice;
//         console.log("All Invoices: ", allInvoices);

//         const filteredInvoices = allInvoices.filter((invoice) => !invoice.show);
//         console.log("Filtered Invoices (show false): ", filteredInvoices);

//         const invoiceNumbers = [
//           ...new Set(filteredInvoices.map((invoice) => invoice.invoiceNumber)),
//         ];
//         console.log("Filtered Invoice Numbers: ", invoiceNumbers);

//         setPetrolInvoice(invoiceNumbers); // Set the state with the unique invoice numbers
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   useEffect(() => {
//     console.log("ms", ms);
//   }, [ms]);

//   const handleFilter = async (id) => {
//     console.log("id", id);
//     const res = await axios.get(
//       `https://marvah-server.onrender.com/petroldecantation/product/${id}`
//     );
//     console.log("ressss", res.data);
//     if (res.data) {
//       addProduct(res.data);
//     }
//   };

//   // const addProduct = (props) => {
//   //   setMs("");
//   //   setSpeed("");
//   //   sethsd("");
//   //   props.map((item) => {
//   //     console.log("map");
//   //     if (item.ProductName === "MS") {
//   //       setMs(Number(item.klQty));
//   //     }
//   //     if (item.ProductName === "HSD") {
//   //       sethsd(Number(item.klQty));
//   //     }
//   //     if (item.ProductName === "SPEED") {
//   //       setSpeed(Number(item.klQty));
//   //     }
//   //   });
//   // };
//   const addProduct = (props) => {
//     setMs("");
//     setSpeed("");
//     sethsd("");
//     props.map((item) => {
//       console.log("map");
//       if (item.ProductName === "TANK-1-MS") {
//         setMs(Number(item.klQty));
//       }
//       if (item.ProductName === "TANK-3-HSD") {
//         sethsd(Number(item.klQty));
//       }
//       if (item.ProductName === "TANK-2-MS") {
//         setSpeed(Number(item.klQty));
//       }
//     });
//   };

//   useEffect(() => {
//     handleFetchData();
//     fetchData();
//   }, []);

//   const getCurrentDate = () => {
//     const today = new Date();
//     const day = String(today.getDate()).padStart(2, "0");
//     const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
//     const year = String(today.getFullYear()).slice(-2); // Get last two digits of the year

//     return `${day}-${month}-${year}`;
//   };

//   const fetchTank = () => {
//     axios
//       .get("https://marvah-server.onrender.com/tank")
//       .then((res) => {
//         console.log("tank:", res.data);
//         setTank(res.data);
//       })
//       .catch((error) => {
//         console.log(error.message);
//       });
//   };

//   const fetchTanksName = () => { };

//   useEffect(() => {
//     fetchTank();
//   }, []);
//   // console.log("data", petrolInvoice);
//   return (
//     <>
//       <div className="relative w-[90%]">
//         {/* <span className="text-2xl font-bold"> Date : {getCurrentDate()} </span> */}
//         <div className="w-full mt-4 text-center">
//           <h2 className="text-2xl uppercase font-bold">Decantation Record</h2>
//         </div>

//         <div className="text-xl flex mt-4 justify-between gap-2 text-white rounded-md ">
//           <div>
//             {/* <Link to={"/Petrol_Products"} className="p-2 bg-green-600 rounded-md">
//               Add Index Form
//             </Link> */}
//           </div>
//           <div>
//             <Link
//               to={"/purchasedecantation"}
//               className="px-2 py-1 bg-blue-600 rounded-md mt-6"
//             >
//               Reports
//             </Link>
//           </div>
//         </div>
//         <div className="my-8">
//           <h1 className="font-bold text-center uppercase text-xl">
//             Purchase Record (Petrol/Diesel):
//           </h1>

//           <div>
//             <div></div>
//           </div>
//           <table className=" w-[80%] ml-40">
//             <thead>
//               <tr className="text-center text-xl mb-2 bg-[#008b8b] text-white">
//                 <th className="border-2 text-center border-gray-700">
//                   Invoice No
//                 </th>
//                 <th className="border-2 text-center border-gray-700">
//                   {tankName[0]}
//                 </th>
//                 <th className="border-2 text-center border-gray-700">
//                   {tankName[1]}
//                 </th>
//                 <th className="border-2 text-center border-gray-700">
//                   {tankName[2]}
//                 </th>
//                 <th className="border-2 text-center border-gray-700">
//                   Total (KL)
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="border-2 text-xl font-bold text-center border-gray-700">
//                 <td className="w-24 border-2 border-gray-700 text-cente">
//                   <select
//                     name="invoice"
//                     className="px-4 py-2  rounded-md"
//                     aria-label="Default select example"
//                     onChange={(e) => {
//                       handleChange(e);
//                       handleFilter(e.target.value);
//                     }}
//                   >
//                     <option>- Invoice -</option>
//                     {petrolInvoice &&
//                       petrolInvoice.map((invoiceNumber, index) => (
//                         <option key={index} value={invoiceNumber}>
//                           {invoiceNumber}
//                         </option>
//                       ))}
//                   </select>
//                 </td>
//                 <td className=" w-24 border-2 border-gray-700 text-center">
//                   <input
//                     className="p-2 w-24 text-center"
//                     placeholder="MS"
//                     type="text"
//                     name="mskl"
//                     value={ms ? ms : 0}
//                     onChange={handleChange}
//                     disabled
//                   />
//                 </td>

//                 <td className="w-24 border-2 border-gray-700 text-cente">
//                   <input
//                     type="text"
//                     className="p-2 w-24 text-center"
//                     placeholder="Speed"
//                     name="speedkl"
//                     value={speed ? speed : 0}
//                     onChange={handleChange}
//                     disabled
//                   />
//                 </td>
//                 <td className="w-24 border-2 border-gray-700 text-cente">
//                   <input
//                     type="text"
//                     className="p-2 w-24 text-center"
//                     placeholder="HSD"
//                     name="hsdkl"
//                     value={hsd ? hsd : 0}
//                     onChange={handleChange}
//                     disabled
//                   />
//                 </td>
//                 <td className="w-24 border-2 border-gray-700 text-cente">
//                   <input
//                     type="text"
//                     id="total1"
//                     className="p-2 w-24 text-center"
//                     value={ms + hsd + speed}
//                     placeholder="Total"
//                     name="totalkl"
//                     disabled
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           <div className="mt-8">
//             <h6 className="font-bold  uppercase text-xl mb-1 text-center">
//               {" "}
//               Tank Decantation
//             </h6>

//             <table className="text w-[80%] ml-40">
//               <thead>
//                 <tr className="border-2 font-bold text-xl text-center border-gray-700 bg-[#008b8b] text-white">
//                   <th className="border-2 text-center border-gray-700">
//                     Invoice Number
//                   </th>
//                   <th className="border-2 text-center border-gray-700">
//                     {/* Tank 1-15KL <br /> */}
//                     {tankName[0]}
//                   </th>
//                   <th className="border-2 text-center border-gray-700 ">
//                     {/* Tank 2-10KL <br></br> */}
//                     {tankName[1]}
//                   </th>
//                   <th className="border-2 text-center border-gray-700">
//                     {/* Tank 3-9KL <br></br> */}
//                     {tankName[2]}
//                   </th>
//                   <th className="border-2 text-center border-gray-700" id="">
//                     Total (KL)
//                   </th>
//                   <th className="border-2 text-center border-gray-700">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-2 font-bold text-xl text-center border-gray-700">
//                   <td>{decantation.invoice}</td>
//                   <td
//                     className="border-4 border-blue-600 rounded-xl"
//                     scope="row"
//                   >
//                     <input
//                       type="number"
//                       id="tank1Decantation"
//                       className="w-20"
//                       name="tank1Decantation"
//                       // value={ms ? ms : 0}
//                       value={tank1Decantaion}
//                       onChange={(e) => setTank1Decantation(e.target.value)}
//                     />
//                   </td>
//                   <td
//                     className="border-4 border-blue-600 rounded-xl"
//                     scope="row"
//                   >
//                     <input
//                       type="text"
//                       className="w-20"
//                       id="tank2Decantation"
//                       name="tank2Decantation"
//                       // value={speed ? speed : 0}
//                       value={tank2Decantaion}
//                       onChange={(e) => setTank2Decantation(e.target.value)}
//                     />
//                   </td>
//                   <td className="border-4 border-blue-600 rounded-xl">
//                     <input
//                       type="text"
//                       className="w-20"
//                       id="tank3Decantation"
//                       name="tank3Decantation"
//                       // value={hsd ? hsd : 0}
//                       value={tank3Decantaion}
//                       onChange={(e) => setTank3Decantation(e.target.value)}
//                     />
//                   </td>
//                   <td
//                     className="border-4 border-blue-600 rounded-xl"
//                     scope="row"
//                   >
//                     <input
//                       type="number"
//                       className="w-20"
//                       name="tanktotalkl"
//                       value={parseInt(tank1Decantaion) + parseInt(tank2Decantaion) + parseInt(tank3Decantaion)}
//                       placeholder="Total"
//                       disabled
//                     />
//                   </td>
//                   <td className=" rounded-lg px-2">
//                     <div className="flex items-center gap-2 justify-center">
//                       <button
//                         type="button"
//                         className="bg-green-600 font-bold text-white px-4 py-1 rounded focus:outline-none"
//                         onClick={handleSubmit}
//                       >
//                         SAVE
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="">

//           <h3 className="mt-3 text-center text-xl font-bold mb-1 uppercase">
//             Report
//           </h3>

//           <table class="w-[80%] bg-white ml-40">
//             <thead class="bg-gray-600 whitespace-nowrap">
//               <tr className="bg-[#008b8b] font-bold text-xl text-white">
//                 <th class=" text-center text-md  border-2 border-black text-white">
//                   Sr.
//                 </th>
//                 <th className="border-2 text-center border-gray-700">
//                   Invoice Number
//                 </th>
//                 <th class=" text-center text-md  border-2 border-black text-white">
//                   {tankName[0]}
//                 </th>
//                 <th class=" text-center text-md border-2 border-black text-white">
//                   {tankName[1]}
//                 </th>
//                 <th class=" text-center text-md  border-2 border-black text-white">
//                   {tankName[2]}
//                 </th>
//                 <th class=" text-center text-md  border-2 border-black text-white">
//                   TOTAL(KL)
//                 </th>
//                 <th class=" text-center text-md  border-2 border-black text-white">
//                   ACTION
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {data &&
//                 data.map((res, index) => (
//                   <tr className="font-bold text-xl" key={res._id}>
//                     <td className="border-2 text-center border-gray-700">
//                       {index + 1}
//                     </td>
//                     <td className="border-2 text-center border-gray-700">
//                       {res.invoice}
//                     </td>
//                     <td className="border-2 text-center border-gray-700">
//                       {editRowId === res._id ? (
//                         <input
//                           type="number"
//                           name="tank1"
//                           className="w-20"
//                           value={editedRow.tank1}
//                           onChange={handleInputChange}
//                         />
//                       ) : (
//                         res.tank1
//                       )}
//                     </td>
//                     <td className="border-2 text-center border-gray-700">
//                       {editRowId === res._id ? (
//                         <input
//                           type="number"
//                           name="tank2"
//                           className="w-20"
//                           value={editedRow.tank2}
//                           onChange={handleInputChange}
//                         />
//                       ) : (
//                         res.tank2
//                       )}
//                     </td>
//                     <td className="border-2 text-center border-gray-700">
//                       {editRowId === res._id ? (
//                         <input
//                           type="number"
//                           name="tank3"
//                           className="w-20"
//                           value={editedRow.tank3}
//                           onChange={handleInputChange}
//                         />
//                       ) : (
//                         res.tank3
//                       )}
//                     </td>
//                     <td className="border-2 text-center border-gray-700">
//                       {editRowId === res._id ? (
//                         parseInt(editedRow.tank1) +
//                         parseInt(editedRow.tank2) +
//                         parseInt(editedRow.tank3)
//                       ) : (
//                         res.tanktotalkl
//                       )}
//                     </td>
//                     <td className="border-2 text-center border-gray-700">
//                       {editRowId === res._id ? (
//                         <button
//                           onClick={() => handleSave(res._id)}
//                           className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-700"
//                         >
//                           Save
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleEdit(res._id, res)}
//                           className="bg-blue-600 text-white px-4 py-1 rounded focus:outline-none"
//                         >
//                           Edit
//                         </button>
//                       )}
//                       <button
//                         onClick={() => handleDelete(res._id)}
//                         className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700 ml-2"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>

//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import "../css/Tank.css";
import axios from "axios";
import { Link } from "react-router-dom";

const init = {
  invoiceNumber: "",
  mskl: "",
  speedkl: "",
  hsdkl: "",
  totalkl: "",
  tank1: "",
  tank2: "",
  tank3: "",
  tanktotalkl: "",
};

export default function Client() {
  const [decantation, setDecantation] = useState(init);
  const [data, setData] = useState([]);
  const [petrolInvoice, setPetrolInvoice] = useState([]);
  const [ms, setMs] = useState("");
  const [hsd, sethsd] = useState("");
  const [speed, setSpeed] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [tankName, setTankName] = useState([]);
  const [tank, setTank] = useState([]);
  const [tank1Decantaion, setTank1Decantaion] = useState("");
  const [tank2Decantaion, setTank2Decantaion] = useState("");
  const [tank3Decantaion, setTank3Decantaion] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    const totalKL =
      parseInt(tank1Decantaion || 0) +
      parseInt(tank2Decantaion || 0) +
      parseInt(tank3Decantaion || 0);

    const newData = {
      ...decantation,
      mskl: ms || 0,
      hsdkl: hsd || 0,
      speedkl: speed || 0,
      tank1: Number(tank1Decantaion),
      tank2: Number(tank2Decantaion),
      tank3: Number(tank3Decantaion),
      tanktotalkl: totalKL,
      totalkl: totalKL,
    };

    if (newData.totalkl === 0 || newData.tanktotalkl > 12) {
      alert("Enter a valid total KL (must be less than or equal to 12).");
      return;
    }
    try {
      const response = await axios.post(
        "https://marvah-server.onrender.com/petroldecantation/create",
          newData
      );

      if (response.data.state) {
        alert(response.data.msg);
        const createdData = response.data; // Get the saved data with its ID
        setData([...data, createdData]); // Add the new entry to the state
        fetchData();
      }
    } catch (error) {
      console.error("Error in Save:", error);
    }

    setIsEditing(true);
  };

  const handleUpdate = async () => {
    const totalKL =
      parseInt(tank1Decantaion || 0) +
      parseInt(tank2Decantaion || 0) +
      parseInt(tank3Decantaion || 0);

    const updatedData = {
      ...decantation,
      invoiceNumber: selectedInvoice,
      mskl: ms || 0,
      hsdkl: hsd || 0,
      speedkl: speed || 0,
      tank1: Number(tank1Decantaion),
      tank2: Number(tank2Decantaion),
      tank3: Number(tank3Decantaion),
      tanktotalkl: totalKL,
      totalkl: totalKL,
    };
    // console.log("selected Invoive", data[0]._id
    const filteredDataId = () => {
      return data[data.length -1]._id;
    };
    console.log("Data", filteredDataId());

    const id = filteredDataId();
    if (updatedData.totalkl === 0 || updatedData.tanktotalkl > 12) {
      alert("Enter a valid total KL (must be less than or equal to Total kl).");
      return;
    }
    try {
      const response = await axios.patch(
        `https://marvah-server.onrender.com/petroldecantation/update/${
          id || ""
        }`,
        updatedData
      );

      if (response.data) {
        alert("Decantation Data Upsated Succesfully");
        setIsEditing(false);
        handleFetchData();
        fetchData();
      }
    } catch (error) {
      console.error("Error in Update:", error);
    }
  };
  const fetchTankName = async () => {
    try {
      const response = await axios.get(
        "https://marvah-server.onrender.com/tank"
      );
      const data = await response.data.map((item) => item.product);
      setTankName(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const totalkl =
      Number(decantation.mskl) +
      Number(decantation.speedkl) +
      Number(decantation.hsdkl);
    const tanktotalkl =
      Number(decantation.tank1) +
      Number(decantation.tank2) +
      Number(decantation.tank3);
    setDecantation((prevFormData) => ({
      ...prevFormData,
      totalkl,
      tanktotalkl,
    }));
    fetchTankName();
  }, [
    decantation.mskl,
    decantation.hsdkl,
    decantation.speedkl,
    decantation.tank1,
    decantation.tank2,
    decantation.tank3,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "invoice") {
      setSelectedInvoice(value);
    }
    setDecantation((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const formattedData = {
      ...decantation,
      mskl: ms ? ms : 0,
      hsdkl: hsd ? hsd : 0,
      speedkl: speed ? speed : 0,
      totalkl: Number(decantation.totalkl),
      tank1: Number(tank1Decantaion),
      tank2: Number(tank2Decantaion),
      tank3: Number(tank3Decantaion),
      tanktotalkl:
        Number(tank1Decantaion) +
        Number(tank2Decantaion) +
        Number(tank3Decantaion),
    };
    console.log("data", formattedData);

    axios
      .post(
        "https://marvah-server.onrender.com/petroldecantation/create",
        formattedData
      )
      .then((res) => {
        if (res.data.state) {
          alert(res.data.msg);
          console.log("resss", res.data);
          handleUpdateInvoice();
          fetchData();
          // setDecantation(init);
          setMs("");
          sethsd("");
          setSpeed("");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleUpdateInvoice = async () => {
    try {
      const res = await axios.patch(
        `https://marvah-server.onrender.com/petrolInvoiceFeeding/updateshow/${selectedInvoice}`
      );
      if (res.data.success) {
        console.log(res.data.msg);
        alert(res.data.message);
        handleFetchData();
      }
    } catch (error) {
      console.error("Error in handleUpdateInvoice:", error.message);
    }
  };

  const fetchData = () => {
    axios
      .get("https://marvah-server.onrender.com/petroldecantation")
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setData(res.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleFetchData = () => {
    axios
      .get("https://marvah-server.onrender.com/petrolInvoiceFeeding")
      .then((res) => {
        const allInvoices = res.data.petrolInvoice;
        console.log("All Invoices: ", allInvoices);

        const filteredInvoices = allInvoices.filter((invoice) => !invoice.show);
        console.log("Filtered Invoices (show false): ", filteredInvoices);

        const invoiceNumbers = [
          ...new Set(filteredInvoices.map((invoice) => invoice.invoiceNumber)),
        ];
        console.log("Filtered Invoice Numbers: ", invoiceNumbers);

        setPetrolInvoice(invoiceNumbers); // Set the state with the unique invoice numbers
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    console.log("ms", ms);
  }, [ms]);

  const handleFilter = async (id) => {
    console.log("id", id);
    const res = await axios.get(
      `https://marvah-server.onrender.com/petroldecantation/product/${id}`
    );
    console.log("ressss", res.data);
    if (res.data) {
      addProduct(res.data);
    }
  };
  const addProduct = (props) => {
    setMs("");
    setSpeed("");
    sethsd("");
    props.map((item) => {
      console.log("map");
      if (item.ProductName === "TANK-1-MS") {
        setMs(Number(item.klQty));
      }
      if (item.ProductName === "TANK-3-HSD") {
        sethsd(Number(item.klQty));
      }
      if (item.ProductName === "TANK-2-MS") {
        setSpeed(Number(item.klQty));
      }
    });
  };

  const fetchTank = () => {
    axios
      .get("https://marvah-server.onrender.com/tank")
      .then((res) => {
        console.log("tank:", res.data);
        setTank(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    handleFetchData();
    fetchData();
    fetchTank();
  }, []);

  return (
    <>
      <div className="relative w-[90%]">
        {/* <span className="text-2xl font-bold"> Date : {getCurrentDate()} </span> */}
        <div className="w-full mt-4 text-center">
          <h2 className="text-2xl uppercase font-bold">Decantation Record</h2>
        </div>

        <div className="text-xl flex mt-4 justify-between gap-2 text-white rounded-md ">
          <div></div>
          <div>
            <Link
              to={"/purchasedecantation"}
              className="px-2 py-1 bg-blue-600 rounded-md mt-6"
            >
              Reports
            </Link>
          </div>
        </div>
        <div className="my-8">
          <h1 className="font-bold text-center uppercase text-xl">
            Purchase Record (Petrol/Diesel):
          </h1>

          <div>
            <div></div>
          </div>
          <table className=" w-[80%] ml-40">
            <thead>
              <tr className="text-center text-xl mb-2 bg-[#008b8b] text-white">
                <th className="border-2 text-center border-gray-700">
                  Invoice No
                </th>
                <th className="border-2 text-center border-gray-700">
                  {tankName[0]}
                </th>
                <th className="border-2 text-center border-gray-700">
                  {tankName[1]}
                </th>
                <th className="border-2 text-center border-gray-700">
                  {tankName[2]}
                </th>
                <th className="border-2 text-center border-gray-700">
                  Total (KL)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-2 text-xl font-bold text-center border-gray-700">
                <td className="w-24 border-2 border-gray-700 text-cente">
                  <select
                    name="invoice"
                    className="px-4 py-2  rounded-md"
                    aria-label="Default select example"
                    onChange={(e) => {
                      handleChange(e);
                      handleFilter(e.target.value);
                    }}
                  >
                    <option>- Invoice -</option>
                    {petrolInvoice &&
                      petrolInvoice.map((invoiceNumber, index) => (
                        <option key={index} value={invoiceNumber}>
                          {invoiceNumber}
                        </option>
                      ))}
                  </select>
                </td>
                <td className=" w-24 border-2 border-gray-700 text-center">
                  <input
                    className="p-2 w-24 text-center"
                    placeholder="MS"
                    type="text"
                    name="mskl"
                    value={ms ? ms : 0}
                    onChange={handleChange}
                    disabled
                  />
                </td>

                <td className="w-24 border-2 border-gray-700 text-cente">
                  <input
                    type="text"
                    className="p-2 w-24 text-center"
                    placeholder="Speed"
                    name="speedkl"
                    value={speed ? speed : 0}
                    onChange={handleChange}
                    disabled
                  />
                </td>
                <td className="w-24 border-2 border-gray-700 text-cente">
                  <input
                    type="text"
                    className="p-2 w-24 text-center"
                    placeholder="HSD"
                    name="hsdkl"
                    value={hsd ? hsd : 0}
                    onChange={handleChange}
                    disabled
                  />
                </td>
                <td className="w-24 border-2 border-gray-700 text-cente">
                  <input
                    type="text"
                    id="total1"
                    className="p-2 w-24 text-center"
                    value={ms + hsd + speed}
                    placeholder="Total"
                    name="totalkl"
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8">
            <h6 className="font-bold  uppercase text-xl mb-1 text-center">
              {" "}
              Tank Decantation
            </h6>

            <table className="text w-[80%] ml-40 mb-8">
              <thead>
                <tr className="border-2 font-bold text-xl text-center border-gray-700 bg-[#008b8b] text-white">
                  <th className="border-2 text-center border-gray-700">
                    Invoice Number
                  </th>
                  <th className="border-2 text-center border-gray-700">
                    Tank 1
                  </th>
                  <th className="border-2 text-center border-gray-700">
                    Tank 2
                  </th>
                  <th className="border-2 text-center border-gray-700">
                    Tank 3
                  </th>
                  <th className="border-2 text-center border-gray-700">
                    Total (KL)
                  </th>
                  <th className="border-2 text-center border-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-2 font-bold text-xl text-center border-gray-700">
                  <td>{decantation.invoice}</td>
                  <td>
                    <input
                      type="number"
                      className="w-20"
                      value={tank1Decantaion}
                      onChange={(e) => setTank1Decantaion(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="w-20"
                      value={tank2Decantaion}
                      onChange={(e) => setTank2Decantaion(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="w-20"
                      value={tank3Decantaion}
                      onChange={(e) => setTank3Decantaion(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="w-20"
                      value={
                        parseInt(tank1Decantaion || 0) +
                        parseInt(tank2Decantaion || 0) +
                        parseInt(tank3Decantaion || 0)
                      }
                      disabled
                    />
                  </td>
                  <td className="rounded-lg px-2">
                    {isEditing ? (
                      <button
                        type="button"
                        className="bg-blue-600 font-bold text-white px-4 py-1 rounded focus:outline-none"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="bg-green-600 font-bold text-white px-4 py-1 rounded focus:outline-none"
                        // className={`bg-green-600 font-bold text-white px-4 py-1 rounded focus:outline-none ${handleSave ? 'hidden': ' Save'}`}
                        onClick={handleSave}
                      >
                        Save
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="">
          <h3 className="mt-3 text-center text-xl font-bold mb-1 uppercase">
            Report
          </h3>

          <table class="w-[80%] bg-white ml-40">
            <thead class="bg-gray-600 whitespace-nowrap">
              <tr className="bg-[#008b8b] font-bold text-xl text-white">
                <th class=" text-center text-md  border-2 border-black text-white">
                  Sr.
                </th>
                <th className="border-2 text-center border-gray-700">
                  Invoice Number
                </th>
                <th class=" text-center text-md  border-2 border-black text-white">
                  {tankName[0]}
                </th>
                <th class=" text-center text-md border-2 border-black text-white">
                  {tankName[1]}
                </th>
                <th class=" text-center text-md  border-2 border-black text-white">
                  {tankName[2]}
                </th>
                <th class=" text-center text-md  border-2 border-black text-white">
                  TOTAL(KL)
                </th>
                {/* <th class=" text-center text-md  border-2 border-black text-white">
                  ACTION
                </th> */}
              </tr>
            </thead>
            <tbody>
              {data.map((res, index) => (
                <tr className="font-bold text-xl" key={index}>
                  <td className="border-2 text-center border-gray-700">
                    {index + 1}
                  </td>
                  <td className="border-2 text-center border-gray-700">
                    {res?.invoice}
                  </td>
                  <td className="border-2 text-center border-gray-700">
                    {res?.tank1}
                  </td>
                  <td className="border-2 text-center border-gray-700">
                    {res?.tank2}
                  </td>
                  <td className="border-2 text-center border-gray-700">
                    {res?.tank3}
                  </td>
                  <td className="border-2 text-center border-gray-700">
                    {res?.tanktotalkl}
                  </td>
                </tr>
              ))}
            </tbody>

            {/* <tbody>
              {data &&
                data.map((res, index) => (
                  <tr className="font-bold text-xl" key={res._id}>
                    <td className="border-2 text-center border-gray-700">
                      {index + 1}
                    </td>
                    <td className="border-2 text-center border-gray-700">
                      {res.invoice}
                    </td>
                    <td className="border-2 text-center border-gray-700">
                      {res.tank1}
                    </td>
                    <td className="border-2 text-center border-gray-700">
                      {res.tank2}
                    </td>
                    <td className="border-2 text-center border-gray-700">
                      {res.tank3}
                    </td>
                    <td className="border-2 text-center border-gray-700">
                      {res.tanktotalkl}
                    </td>

                  </tr>
                ))}
            </tbody> */}
          </table>
        </div>
      </div>
    </>
  );
}
