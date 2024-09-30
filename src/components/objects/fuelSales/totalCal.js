// import axios from "axios";
// import { useState } from "react";

// const totalCal = () => {
//   const [ms1Readings, setMs1Readings] = useState("");

//   const fetchMachineReadings = async () => {
//     try {
//       const res = await axios.get("https://marvah-server.onrender.com/reading");
//       console.log(res.data.MeterReadingData);
//       const allReadings = res.data.MeterReadingData;

//       setMachineReadings(allReadings);
//       setMs1Readings(
//         allReadings.filter((item) => item.nozzleProduct.includes("MS-1"))
//       );
//       //   setMs2Readings(
//       //     allReadings.filter((item) => item.nozzleProduct.includes("MS-2"))
//       //   );
//       //   setHsdReadings(
//       //     allReadings.filter((item) => item.nozzleProduct.includes("HSD"))
//       //   );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchMachineReadings();
//   }, []);
//   // Define state for totals
//   const [totals, setTotals] = useState({
//     saleTotal: 0,
//     testingTotal: 0,
//     saleActTotal: 0,
//     amountTotal: 0,
//   });

//   // Calculate totals whenever ms1Readings changes
//   useEffect(() => {
//     let saleTotal = 0;
//     let testingTotal = 0;
//     let saleActTotal = 0;
//     let amountTotal = 0;

//     ms1Readings.forEach((item) => {
//       const parsedOpMeterReading = parseFloat(item.opMeterReading) || 0;
//       const parsedClosing = parseFloat(item.closing) || 0;
//       const parsedTesting = parseFloat(item.testing) || 0;
//       const parsedRate = parseFloat(item.rate) || 0;

//       const sale = parsedClosing - parsedOpMeterReading;
//       const saleAct = sale - parsedTesting;
//       const amount = saleAct * parsedRate;

//       saleTotal += sale;
//       testingTotal += parsedTesting;
//       saleActTotal += saleAct;
//       amountTotal += amount;
//     });

//     setTotals({
//       saleTotal: saleTotal.toFixed(2),
//       testingTotal: testingTotal.toFixed(2),
//       saleActTotal: saleActTotal.toFixed(2),
//       amountTotal: amountTotal.toFixed(2),
//     });
//   }, [ms1Readings]);

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Nozzle Product</th>
//             <th>Side No</th>
//             <th>Opening Meter Reading</th>
//             <th>Closing</th>
//             <th>Sale</th>
//             <th>Testing</th>
//             <th>Sale Act</th>
//             <th>Rate</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ms1Readings.map((item, index) => {
//             const parsedOpMeterReading = parseFloat(item.opMeterReading) || 0;
//             const parsedClosing = parseFloat(item.closing) || 0;
//             const parsedTesting = parseFloat(item.testing) || 0;
//             const parsedRate = parseFloat(item.rate) || 0;

//             const sale = parsedClosing - parsedOpMeterReading;
//             const saleAct = sale - parsedTesting;
//             const amount = saleAct * parsedRate;

//             return (
//               <tr key={item._id}>
//                 <td>{item.nozzleProduct}</td>
//                 <td>{item.sideNo}</td>
//                 <td>{item.opMeterReading}</td>
//                 <td>
//                   <input
//                     type="number"
//                     value={parsedClosing}
//                     onChange={(e) => {
//                       const newClosing = parseFloat(e.target.value) || 0;
//                       item.closing = newClosing;
//                       ms1Readings[index] = { ...item };
//                       // Trigger re-calculation of totals
//                       setMs1Readings([...ms1Readings]);
//                     }}
//                   />
//                 </td>
//                 <td>{sale}</td>
//                 <td>
//                   <input
//                     type="number"
//                     value={parsedTesting}
//                     onChange={(e) => {
//                       const newTesting = parseFloat(e.target.value) || 0;
//                       item.testing = newTesting;
//                       ms1Readings[index] = { ...item };
//                       // Trigger re-calculation of totals
//                       setMs1Readings([...ms1Readings]);
//                     }}
//                   />
//                 </td>
//                 <td>{saleAct}</td>
//                 <td>
//                   <input
//                     type="number"
//                     value={parsedRate}
//                     onChange={(e) => {
//                       const newRate = parseFloat(e.target.value) || 0;
//                       item.rate = newRate;
//                       ms1Readings[index] = { ...item };
//                       // Trigger re-calculation of totals
//                       setMs1Readings([...ms1Readings]);
//                     }}
//                   />
//                 </td>
//                 <td>{amount}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//         <tfoot>
//           <tr>
//             <th colSpan="4">Total</th>
//             <th>{totals.saleTotal}</th>
//             <th>{totals.testingTotal}</th>
//             <th>{totals.saleActTotal}</th>
//             <th></th>
//             <th>{totals.amountTotal}</th>
//           </tr>
//         </tfoot>
//       </table>
//     </div>
//   );
// };

// export default totalCal;
