// import React from 'react';

// const SalesReportTable = () => {
//   const petrolData = [
//     { srNo: 1, date: "01-05-2024", rate: 103.96, ms: 1510, totalAmt: 156979.60 },
//     { srNo: 2, date: "02-05-2024", rate: 103.96, ms: 1520, totalAmt: 158019.20 },
//     { srNo: 3, date: "03-05-2024", rate: 103.96, ms: 1520, totalAmt: 158019.20 },
//     { srNo: 4, date: "04-05-2024", rate: 103.96, ms: 2936, totalAmt: 305719.60 },
//     { srNo: 5, date: "05-05-2024", rate: 103.96, ms: 2936, totalAmt: 304911.68 },
//     { srNo: 6, date: "06-05-2024", rate: 103.96, ms: 3648, totalAmt: 378348.16 },
//     { srNo: 7, date: "07-05-2024", rate: 103.96, ms: 3636, totalAmt: 377034.56 },
//     { srNo: 8, date: "08-05-2024", rate: 103.96, ms: 3812, totalAmt: 396747.52 },
//     { srNo: 9, date: "09-05-2024", rate: 103.96, ms: 3812, totalAmt: 397647.52 },
//     { srNo: 10, date: "10-05-2024", rate: 103.96, ms: 3628, totalAmt: 376321.04 },
//     { srNo: 11, date: "11-05-2024", rate: 103.96, ms: 3455, totalAmt: 359241.76 },
//     { srNo: 12, date: "12-05-2024", rate: 103.96, ms: 3626, totalAmt: 376041.76 },
//     { srNo: 13, date: "13-05-2024", rate: 103.96, ms: 4017, totalAmt: 418542.96 },
//     { srNo: 14, date: "14-05-2024", rate: 103.96, ms: 3918, totalAmt: 408399.28 },
//     { srNo: 15, date: "15-05-2024", rate: 103.96, ms: 4181, totalAmt: 434675.76 },
//     { srNo: 16, date: "16-05-2024", rate: 103.96, ms: 4181, totalAmt: 434675.84 },
//     { srNo: 17, date: "17-05-2024", rate: 103.96, ms: 4486, totalAmt: 466634.56 },
//     { srNo: 18, date: "18-05-2024", rate: 103.96, ms: 4187, totalAmt: 434760.72 },
//     { srNo: 19, date: "19-05-2024", rate: 103.96, ms: 2840, totalAmt: 295246.40 },
//     { srNo: 20, date: "20-05-2024", rate: 103.96, ms: 8580, totalAmt: 891806.08 },
//     { srNo: 21, date: "21-05-2024", rate: 103.96, ms: 2987, totalAmt: 310787.52 },
//     { srNo: 22, date: "22-05-2024", rate: 103.96, ms: 1613, totalAmt: 167740.48 },
//     { srNo: 23, date: "23-05-2024", rate: 103.96, ms: 2652, totalAmt: 275519.52 },
//     { srNo: 24, date: "24-05-2024", rate: 103.96, ms: 4317, totalAmt: 448795.32 },
//     { srNo: 25, date: "25-05-2024", rate: 103.96, ms: 4132, totalAmt: 429419.52 },
//     { srNo: 26, date: "26-05-2024", rate: 103.96, ms: 3975, totalAmt: 413241.00 },
//     { srNo: 27, date: "27-05-2024", rate: 103.96, ms: 3985, totalAmt: 414280.60 },
//     { srNo: 28, date: "28-05-2024", rate: 103.96, ms: 3690, totalAmt: 384279.84 },
//     { srNo: 29, date: "29-05-2024", rate: 103.96, ms: 2827, totalAmt: 293889.72 },
//     { srNo: 30, date: "30-05-2024", rate: 103.96, ms: 4070, totalAmt: 423117.20 },
//     { srNo: 31, date: "31-05-2024", rate: 103.96, ms: 4375, totalAmt: 454825.00 },
//   ];

//   const speedData = [
//     { srNo: 1, date: "01-05-2024", rate: 106.00, spd: 1016, totalAmt: 107696.00 },
//     { srNo: 2, date: "02-05-2024", rate: 106.00, spd: 1208, totalAmt: 128716.00 },
//     { srNo: 3, date: "03-05-2024", rate: 106.00, spd: 1208, totalAmt: 128716.00 },
//     { srNo: 4, date: "04-05-2024", rate: 106.00, spd: 1106, totalAmt: 117236.00 },
//     { srNo: 5, date: "05-05-2024", rate: 106.00, spd: 1106, totalAmt: 117236.00 },
//     { srNo: 6, date: "06-05-2024", rate: 106.00, spd: 232, totalAmt: 24544.00 },
//     { srNo: 7, date: "07-05-2024", rate: 106.00, spd: 212, totalAmt: 22472.00 },
//     { srNo: 8, date: "08-05-2024", rate: 106.00, spd: 16, totalAmt: 1696.00 },
//     { srNo: 9, date: "09-05-2024", rate: 106.00, spd: 16, totalAmt: 1696.00 },
//     { srNo: 10, date: "10-05-2024", rate: 106.00, spd: 110, totalAmt: 11660.00 },
//     { srNo: 11, date: "11-05-2024", rate: 106.00, spd: 216, totalAmt: 22896.00 },
//     { srNo: 12, date: "12-05-2024", rate: 106.00, spd: 0, totalAmt: 0.00 },
//     { srNo: 13, date: "13-05-2024", rate: 106.00, spd: 0, totalAmt: 0.00 },
//     { srNo: 14, date: "14-05-2024", rate: 106.00, spd: 0, totalAmt: 0.00 },
//     { srNo: 15, date: "15-05-2024", rate: 106.00, spd: 180, totalAmt: 19080.00 },
//     { srNo: 16, date: "16-05-2024", rate: 106.00, spd: 240, totalAmt: 25520.80 },
//     { srNo: 17, date: "17-05-2024", rate: 106.00, spd: 88, totalAmt: 9320.64 },
//     { srNo: 18, date: "18-05-2024", rate: 106.00, spd: 588, totalAmt: 62324.16 },
//     { srNo: 19, date: "19-05-2024", rate: 106.00, spd: 896, totalAmt: 94911.36 },
//     { srNo: 20, date: "20-05-2024", rate: 106.00, spd: 552, totalAmt: 58506.96 },
//     { srNo: 21, date: "21-05-2024", rate: 106.00, spd: 0, totalAmt: 0.00 },
//     { srNo: 22, date: "22-05-2024", rate: 106.00, spd: 284, totalAmt: 30144.64 },
//     { srNo: 23, date: "23-05-2024", rate: 106.00, spd: 0, totalAmt: 0.00 },
//     { srNo: 24, date: "24-05-2024", rate: 106.00, spd: 0, totalAmt: 0.00 },
//     { srNo: 25, date: "25-05-2024", rate: 106.00, spd: 56, totalAmt: 5936.96 },
//     { srNo: 26, date: "26-05-2024", rate: 106.00, spd: 110, totalAmt: 11660.00 },
//     { srNo: 27, date: "27-05-2024", rate: 106.00, spd: 60, totalAmt: 6360.00 },
//     { srNo: 28, date: "28-05-2024", rate: 106.00, spd: 260, totalAmt: 27560.00 },
//     { srNo: 29, date: "29-05-2024", rate: 106.00, spd: 1132, totalAmt: 119398.72 },
//     { srNo: 30, date: "30-05-2024", rate: 106.00, spd: 358, totalAmt: 37948.00 },
//     { srNo: 31, date: "31-05-2024", rate: 106.00, spd: 94, totalAmt: 9952.00 },
//   ];

//   const dieselData = [
//     { srNo: 1, date: "01-05-2024", rate: 90.53, sale: 1130, total: 102298.90 },
//     { srNo: 2, date: "02-05-2024", rate: 90.53, sale: 1108, total: 100488.24 },
//     { srNo: 3, date: "03-05-2024", rate: 90.53, sale: 1520, total: 137605.60 },
//     { srNo: 4, date: "04-05-2024", rate: 90.53, sale: 1578, total: 142857.84 },
//     { srNo: 5, date: "05-05-2024", rate: 90.53, sale: 1584, total: 143430.72 },
//     { srNo: 6, date: "06-05-2024", rate: 90.53, sale: 1496, total: 135469.28 },
//     { srNo: 7, date: "07-05-2024", rate: 90.53, sale: 1236, total: 111914.76 },
//     { srNo: 8, date: "08-05-2024", rate: 90.53, sale: 1242, total: 112454.46 },
//     { srNo: 9, date: "09-05-2024", rate: 90.53, sale: 1316, total: 119144.48 },
//     { srNo: 10, date: "10-05-2024", rate: 90.53, sale: 1389, total: 125973.57 },
//     { srNo: 11, date: "11-05-2024", rate: 90.53, sale: 1405, total: 127589.65 },
//     { srNo: 12, date: "12-05-2024", rate: 90.53, sale: 1246, total: 113565.38 },
//     { srNo: 13, date: "13-05-2024", rate: 90.53, sale: 1187, total: 107506.11 },
//     { srNo: 14, date: "14-05-2024", rate: 90.53, sale: 1287, total: 116751.18 },
//     { srNo: 15, date: "15-05-2024", rate: 90.53, sale: 1178, total: 106601.69 },
//     { srNo: 16, date: "16-05-2024", rate: 90.53, sale: 1190, total: 107730.70 },
//     { srNo: 17, date: "17-05-2024", rate: 90.53, sale: 1435, total: 129905.25 },
//     { srNo: 18, date: "18-05-2024", rate: 90.53, sale: 1435, total: 129905.35 },
//     { srNo: 19, date: "19-05-2024", rate: 90.53, sale: 1358, total: 122914.74 },
//     { srNo: 20, date: "20-05-2024", rate: 90.53, sale: 1384, total: 125319.52 },
//     { srNo: 21, date: "21-05-2024", rate: 90.53, sale: 1137, total: 102967.61 },
//     { srNo: 22, date: "22-05-2024", rate: 90.53, sale: 1332, total: 120608.68 },
//     { srNo: 23, date: "23-05-2024", rate: 90.53, sale: 1366, total: 123662.98 },
//     { srNo: 24, date: "24-05-2024", rate: 90.53, sale: 1418, total: 128421.54 },
//     { srNo: 25, date: "25-05-2024", rate: 90.53, sale: 1586, total: 143611.58 },
//     { srNo: 26, date: "26-05-2024", rate: 90.53, sale: 1465, total: 132685.45 },
//     { srNo: 27, date: "27-05-2024", rate: 90.53, sale: 1757, total: 159061.21 },
//     { srNo: 28, date: "28-05-2024", rate: 90.53, sale: 1449, total: 131022.42 },
//     { srNo: 29, date: "29-05-2024", rate: 90.53, sale: 1481, total: 134092.93 },
//     { srNo: 30, date: "30-05-2024", rate: 90.53, sale: 1465, total: 132685.45 },
//     { srNo: 31, date: "31-05-2024", rate: 90.53, sale: 1333, total: 120672.49 },
//   ];

//   return (
//     <div className="container flex w-[100%] mx-auto my-8">
//       <div className="overflow-x-auto w-[33.33%] mt-4">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className='text-center'>
//               {/* <th className="px-4 py-2 border">Monthly Petrol Sales Figures - MAY-24</th> */}
//               <th className="px-4 py-2 border">Sr. No.</th>
//               <th className="px-4 py-2 border">Date</th>
//               <th className="px-4 py-2 border">Rate</th>
//               <th className="px-4 py-2 border">MS</th>
//               <th className="px-4 py-2 border">Total Amt</th>
//             </tr>
//           </thead>
//           <tbody>
//             {petrolData.map((row, index) => (
//               <tr key={index} className="text-center">
//                 {/* <td className="px-4 py-2 border"></td> */}
//                 <td className="px-4 py-2 border">{row.srNo}</td>
//                 <td className="px-4 py-2 border">{row.date}</td>
//                 <td className="px-4 py-2 border">{row.rate}</td>
//                 <td className="px-4 py-2 border">{row.ms}</td>
//                 <td className="px-4 py-2 border">{row.totalAmt}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="overflow-x-auto  w-[33.33%] mt-4">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               {/* <th className="px-4 py-2 border">Monthly Speed Sales Figures - MAY-24</th> */}
//               <th className="px-4 py-2 border">Sr. No.</th>
//               <th className="px-4 py-2 border">Date</th>
//               <th className="px-4 py-2 border">Rate</th>
//               <th className="px-4 py-2 border">SPD</th>
//               <th className="px-4 py-2 border">Total Amt</th>
//             </tr>
//           </thead>
//           <tbody>
//             {speedData.map((row, index) => (
//               <tr key={index} className="text-center">
//                 {/* <td className="px-4 py-2 border"></td> */}
//                 <td className="px-4 py-2 border">{row.srNo}</td>
//                 <td className="px-4 py-2 border">{row.date}</td>
//                 <td className="px-4 py-2 border">{row.rate}</td>
//                 <td className="px-4 py-2 border">{row.spd}</td>
//                 <td className="px-4 py-2 border">{row.totalAmt}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="overflow-x-auto  w-[33.33%] mt-4">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr>
//               {/* <th className="px-4 py-2 border">Monthly Diesel Sales Figures - MAY-24</th> */}
//               <th className="px-4 py-2 border">Sr. No.</th>
//               <th className="px-4 py-2 border">Date</th>
//               <th className="px-4 py-2 border">Rate</th>
//               <th className="px-4 py-2 border">Sale</th>
//               <th className="px-4 py-2 border">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dieselData.map((row, index) => (
//               <tr key={index} className="text-center">
//                 {/* <td className="px-4 py-2 border"></td> */}
//                 <td className="px-4 py-2 border">{row.srNo}</td>
//                 <td className="px-4 py-2 border">{row.date}</td>
//                 <td className="px-4 py-2 border">{row.rate}</td>
//                 <td className="px-4 py-2 border">{row.sale}</td>
//                 <td className="px-4 py-2 border">{row.total}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SalesReportTable;

import axios from "axios";
import React, { useEffect, useState } from "react";

const MontlySales = () => {

    const [machineReadings, setMachineReadings] = useState([]);
    const [hsdReadings, setHsdReadings] = useState([]);

  const [ms1Readings, setMs1Readings] = useState([]);
  const [ms1Rate, setMs1Rate] = useState(0);
  const [ms1RateAllDays, setMs1RateAllDays] = useState([]);



    const [ms2Readings, setMs2Readings] = useState([]);

    const [ms2RateAllDays, setMs2RateAllDays] = useState([]);
    const [hsdRateAllDays, setHsdRateAllDays] = useState([]);
  
    const [ms2Rate, setMs2Rate] = useState(0);
    const [hsdRate, setHsdRate] = useState(0);
  
    const [init,setInit] = useState({})
  
    const [ms1Data,setMs1Data] = useState([]);
    const [ms2Data,setMs2Data] = useState([]);
    const [hsdData,setHsdData] = useState([]);

    const [fuelSaleMs1,setFuelSaleMs1] = useState([])

    const fetchFuelSales = ()=>{
      try {
        axios.get('http://localhost:4000/fuelsales')
        .then((res)=>{
          const formattedData = handleDateConversion(res.data.fuelSales);

          setFuelSaleMs1(formattedData)
        })
      } catch (error) {
        console.log(error)
      }
    
    }

    useEffect(()=>{
      fetchFuelSales();
    },[]);
    console.log("fuelSaleMs1",fuelSaleMs1)
    
    const fetchMs1 = ()=>{
      axios
        .get("http://localhost:4000/ms")
        .then((res) => {
          const formattedData = handleDateConversion(res.data);
          // setDependency(!dependency)
          setMs1Data(formattedData);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

      
    const fetchMs2 = ()=>{
      axios
        .get("http://localhost:4000/speed")
        .then((res) => {
          const formattedData = handleDateConversion(res.data);
          // setDependency(!dependency)
          setMs2Data(formattedData);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    const fetchHsd = ()=>{
      axios
        .get("http://localhost:4000/hsd")
        .then((res) => {
          const formattedData = handleDateConversion(res.data);
          // setDependency(!dependency)
          setHsdData(formattedData);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };

    useEffect(()=>{
      fetchMs1();
      fetchMs2()
  fetchHsd()
    },[])

    const fetchMachineReadings = async () => {
        try {
          const res = await axios.get("http://localhost:4000/reading");
          const allReadings = res.data.MeterReadingData;
          setMachineReadings(allReadings);
          setMs1Readings(
            allReadings.filter((item) => item.nozzleProduct.includes("MS-1"))
          );
          setMs2Readings(
            allReadings.filter((item) => item.nozzleProduct.includes("MS-2"))
          );
          setHsdReadings(
            allReadings.filter((item) => item.nozzleProduct.includes("HSD"))
          );
        } catch (error) {
          console.error(error);
        }
      };
      console.log(ms1Data)
    
      useEffect(() => {
        fetchMachineReadings();
      }, []);
    

    const fetchAllDAyStartReading = () => {
        axios
          .get("http://localhost:4000/ms")
          .then((res) => {
            setMs1RateAllDays(res.data);
            setMs1Rate(ms1RateAllDays[ms1RateAllDays.length - 1].reading);
          })
          .catch((error) => {
            console.log(error.message);
          });
    
        axios
          .get("http://localhost:4000/speed")
          .then((res) => {
            setMs2RateAllDays(res.data);
            setMs2Rate(ms2RateAllDays[ms2RateAllDays.length - 1].reading);
          })
          .catch((error) => {
            console.log(error.message);
          });
    
        axios
          .get("http://localhost:4000/hsd")
          .then((res) => {
            setHsdRateAllDays(res.data);
            setHsdRate(hsdRateAllDays[hsdRateAllDays.length - 1].reading);
          })
          .catch((error) => {
            console.log(error.message);
          });
      };

      useEffect(() => {
        fetchAllDAyStartReading();
      }, [ms1Readings,ms2Readings,hsdReadings]);
    
      
  const petrolData = [
    { srNo: 1, date: "01-05-2024", rate: 103.96, ms: 1510, totalAmt: 156979.60 },
    { srNo: 2, date: "02-05-2024", rate: 103.96, ms: 1520, totalAmt: 158019.20 },
    { srNo: 3, date: "03-05-2024", rate: 103.96, ms: 1502, totalAmt: 156092.92 },
    // ... Add remaining data for Petrol
  ];

  const speedData = [
    { srNo: 1, date: "01-05-2024", rate: 106.00, spd: 108, totalAmt: 11448.00 },
    { srNo: 2, date: "02-05-2024", rate: 106.00, spd: 124, totalAmt: 13144.00 },
    { srNo: 3, date: "03-05-2024", rate: 106.00, spd: 116, totalAmt: 12297.36 },
    // ... Add remaining data for Speed
  ];

  const dieselData = [
    { srNo: 1, date: "01-05-2024", rate: 90.53, sale: 1130, total: 102298.90 },
    { srNo: 2, date: "02-05-2024", rate: 90.53, sale: 1108, total: 100488.24 },
    { srNo: 3, date: "03-05-2024", rate: 90.53, sale: 1520, total: 137605.60 },
    // ... Add remaining data for Diesel
  ];
  
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


  return (
    <div className="container">
              <h1 className="text-center text-3xl mb-2">Actual Fuel sales (Monthly) (All Products)</h1>

      <div className="flex space-x-8">
        {/* Petrol Table */}
        <table className=" bg-white border border-gray-300">
       
          <thead>
            <tr>
              <th className="px-1 py-2 border text-center" colSpan="5">Fuel Actual Sales for Month - July-24</th>
            </tr>
            <tr>
              <th className="px-4 py-2 text-2xl border text-center" colSpan="5">MS</th>
            </tr>
            <tr>
              <th className="px-2 py-2 border text-center">Date</th>
              <th className="px-2 py-2 border">Rate</th>
              <th className="px-2 py-2 border">Act. Sale</th>
              <th className="px-2 py-2 border">Total Amt</th>
            </tr>
          </thead>
          <tbody>
            {fuelSaleMs1.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="px-1 border">{row.date}</td>
                <td className="px-1 border">{row.rate}</td>
                <td className="px-1 border">{row.saleActTotal}</td>
                <td className="px-1 border">{(row.rate*row.saleActTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Speed Table */}
        <table className="min-w-max bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-center" colSpan="5">Monthly Speed Sales Figures - July-24</th>
            </tr>
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Rate</th>
              <th className="px-4 py-2 border">SPD</th>
              <th className="px-4 py-2 border">Total Amt</th>
            </tr>
          </thead>
          <tbody>
            {ms2Data.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{row.date}</td>
                <td className="px-4 py-2 border">{row.reading}</td>
                <td className="px-4 py-2 border">{row.spd}</td>
                <td className="px-4 py-2 border">{row.totalAmt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Diesel Table */}
        <table className="min-w-max bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-center" colSpan="5">Monthly Diesel Sales Figures - MAY-24</th>
            </tr>
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Rate</th>
              <th className="px-4 py-2 border">Sale</th>
              <th className="px-4 py-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {hsdData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{row.date}</td>
                <td className="px-4 py-2 border">{row.rate}</td>
                <td className="px-4 py-2 border">{row.sale}</td>
                <td className="px-4 py-2 border">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MontlySales;
