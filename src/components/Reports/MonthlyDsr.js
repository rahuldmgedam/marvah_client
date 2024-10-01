// import React, { useEffect, useState } from 'react';

// const monthlyDsr = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Replace with your GET method to fetch the data
//     fetch('https://marvah-server.onrender.com/variation/')  // Example API endpoint
//       .then(response => response.json())
//       .then(data => setData(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-300">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border-b">Date</th>
//             <th className="px-4 py-2 border-b">Opening Stock</th>
//             <th className="px-4 py-2 border-b">Receipt</th>
//             <th className="px-4 py-2 border-b">Total (2+3)</th>
//             <th className="px-4 py-2 border-b">Actual Sales</th>
//             <th className="px-4 py-2 border-b">Closing Stock</th>
//             <th className="px-4 py-2 border-b">Actual Dip Stock</th>
//             <th className="px-4 py-2 border-b">Variation +/-</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, index) => (
//             <tr key={index} className="text-center">
//               <td className="px-4 py-2 border-b">{row.date}</td>
//               <td className="px-4 py-2 border-b">{row.openingStock}</td>
//               <td className="px-4 py-2 border-b">{row.receipt}</td>
//               <td className="px-4 py-2 border-b">{row.total}</td>
//               <td className="px-4 py-2 border-b">{row.actualSales}</td>
//               <td className="px-4 py-2 border-b">{row.closingStock}</td>
//               <td className="px-4 py-2 border-b">{row.actualDipStock}</td>
//               <td className="px-4 py-2 border-b">{row.variation}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default monthlyDsr;

import React, { useEffect, useState } from 'react';

const MonthlyDsr = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mocking the fetch call
    const fetchData = async () => {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            json: () => Promise.resolve([
              // Paste the JSON data here
              { "date": "1", "openingStock": "5024", "receipt": "3000", "total": "8024", "actualSales": "2964", "closingStock": "5055", "actualDipStock": "5068", "variation": "+13" },
              { "date": "2", "openingStock": "5068", "receipt": "3000", "total": "8068", "actualSales": "2249", "closingStock": "5819", "actualDipStock": "5835", "variation": "+16" },
              { "date": "3", "openingStock": "5835", "receipt": "0", "total": "5835", "actualSales": "2139", "closingStock": "3696", "actualDipStock": "3693", "variation": "-3" },
              { "date": "4", "openingStock": "3693", "receipt": "3000", "total": "6693", "actualSales": "2002", "closingStock": "4691", "actualDipStock": "4711", "variation": "+20" },
              { "date": "5", "openingStock": "4711", "receipt": "0", "total": "4711", "actualSales": "3601", "closingStock": "1110", "actualDipStock": "1109", "variation": "-1" },
              { "date": "6", "openingStock": "1109", "receipt": "5000", "total": "6109", "actualSales": "3101", "closingStock": "3008", "actualDipStock": "3022", "variation": "+14" },
              { "date": "7", "openingStock": "8972", "receipt": "6000", "total": "9072", "actualSales": "2654", "closingStock": "6418", "actualDipStock": "6432", "variation": "+14" },
              { "date": "8", "openingStock": "643", "receipt": "3000", "total": "643", "actualSales": "921", "closingStock": "171", "actualDipStock": "185", "variation": "+14" },
              { "date": "9", "openingStock": "7610", "receipt": "0", "total": "7610", "actualSales": "9203", "closingStock": "4407", "actualDipStock": "4405", "variation": "-2" },
              { "date": "10", "openingStock": "4405", "receipt": "3000", "total": "7405", "actualSales": "1793", "closingStock": "5612", "actualDipStock": "5635", "variation": "+23" },
              { "date": "11", "openingStock": "5685", "receipt": "3000", "total": "8685", "actualSales": "2698", "closingStock": "5937", "actualDipStock": "5947", "variation": "+10" },
              { "date": "12", "openingStock": "5947", "receipt": "0", "total": "5947", "actualSales": "1810", "closingStock": "4137", "actualDipStock": "4129", "variation": "-8" },
              { "date": "13", "openingStock": "4129", "receipt": "3000", "total": "7129", "actualSales": "2628", "closingStock": "4501", "actualDipStock": "4511", "variation": "+10" },
              { "date": "14", "openingStock": "4511", "receipt": "6000", "total": "10511", "actualSales": "2459", "closingStock": "8052", "actualDipStock": "8047", "variation": "-5" },
              { "date": "15", "openingStock": "8047", "receipt": "0", "total": "8047", "actualSales": "2282", "closingStock": "5765", "actualDipStock": "5755", "variation": "-6" },
              { "date": "16", "openingStock": "5759", "receipt": "3000", "total": "8759", "actualSales": "3277", "closingStock": "5082", "actualDipStock": "5093", "variation": "+11" },
              { "date": "17", "openingStock": "5093", "receipt": "3000", "total": "8093", "actualSales": "1435", "closingStock": "6658", "actualDipStock": "6658", "variation": "0" },
              { "date": "18", "openingStock": "6668", "receipt": "3000", "total": "9668", "actualSales": "3153", "closingStock": "6515", "actualDipStock": "6527", "variation": "+12" },
              { "date": "19", "openingStock": "6527", "receipt": "0", "total": "6527", "actualSales": "1303", "closingStock": "5224", "actualDipStock": "5220", "variation": "-4" },
              { "date": "20", "openingStock": "5220", "receipt": "3000", "total": "8220", "actualSales": "1932", "closingStock": "6288", "actualDipStock": "6307", "variation": "+19" },
              { "date": "21", "openingStock": "6307", "receipt": "0", "total": "6307", "actualSales": "2401", "closingStock": "3906", "actualDipStock": "3903", "variation": "-3" },
              { "date": "22", "openingStock": "3903", "receipt": "3000", "total": "6903", "actualSales": "2549", "closingStock": "4454", "actualDipStock": "4457", "variation": "+3" },
              { "date": "23", "openingStock": "4457", "receipt": "6000", "total": "10457", "actualSales": "1765", "closingStock": "8269", "actualDipStock": "8279", "variation": "+10" },
              { "date": "24", "openingStock": "8279", "receipt": "0", "total": "8279", "actualSales": "2643", "closingStock": "6076", "actualDipStock": "6073", "variation": "-3" },
              { "date": "25", "openingStock": "6073", "receipt": "3000", "total": "9073", "actualSales": "2647", "closingStock": "7026", "actualDipStock": "7028", "variation": "+2" },
              { "date": "26", "openingStock": "7028", "receipt": "0", "total": "7028", "actualSales": "1571", "closingStock": "5471", "actualDipStock": "5463", "variation": "-8" },
              { "date": "27", "openingStock": "5463", "receipt": "0", "total": "5463", "actualSales": "2210", "closingStock": "3253", "actualDipStock": "3253", "variation": "0" },
              { "date": "28", "openingStock": "3253", "receipt": "3000", "total": "6253", "actualSales": "1916", "closingStock": "4337", "actualDipStock": "4318", "variation": "-19" },
              { "date": "29", "openingStock": "65000", "receipt": "0", "total": "65000", "actualSales": "0", "closingStock": "65000", "actualDipStock": "65000", "variation": "0" },
              { "date": "30", "openingStock": "65000", "receipt": "0", "total": "65000", "actualSales": "0", "closingStock": "65000", "actualDipStock": "65000", "variation": "0" },
              { "date": "31", "openingStock": "65000", "receipt": "0", "total": "65000", "actualSales": "0", "closingStock": "65000", "actualDipStock": "65000", "variation": "0" },
              // Add more entries for each day up to day 31
            ])
          });
        }, 1000); // Simulate API delay
      });
      
      const data = await response.json();
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="overflow-x-auto">
                      <h1 className="text-center text-3xl mb-2">Variation Report</h1>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Date</th>
            <th className="px-4 py-2 border-b">Opening Stock</th>
            <th className="px-4 py-2 border-b">Receipt</th>
            <th className="px-4 py-2 border-b">Total (2+3)</th>
            <th className="px-4 py-2 border-b">Actual Sales</th>
            <th className="px-4 py-2 border-b">Closing Stock</th>
            <th className="px-4 py-2 border-b">Actual Dip Stock</th>
            <th className="px-4 py-2 border-b">Variation +/-</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border-b">{row.date}</td>
              <td className="px-4 py-2 border-b">{row.openingStock}</td>
              <td className="px-4 py-2 border-b">{row.receipt}</td>
              <td className="px-4 py-2 border-b">{row.total}</td>
              <td className="px-4 py-2 border-b">{row.actualSales}</td>
              <td className="px-4 py-2 border-b">{row.closingStock}</td>
              <td className="px-4 py-2 border-b">{row.actualDipStock}</td>
              <td className="px-4 py-2 border-b">{row.variation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyDsr;
