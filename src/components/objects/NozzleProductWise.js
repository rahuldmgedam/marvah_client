// import React, { useState } from 'react';
// import Modal from './Modal'; // Ensure you have the Modal component in your project


 
    

// const NozzleProductWise = ({ data, onUpdate }) => {
//   const [selectedTank, setSelectedTank] = useState(null);

//   const handleEdit = (tank) => {
//     setSelectedTank(tank);
//   };

//   const handleSave = (updatedTank) => {
//     // Update the tank data in your state or API
//     onUpdate(updatedTank);
//     setSelectedTank(null); // Close the modal after saving
//   };

//   const handleCloseModal = () => {
//     setSelectedTank(null);
//   };

//   const handleDelete = (tankId) => {
//     // Implement delete logic here
//     console.log(`Deleting tank with ID ${tankId}`);
//   };

//   return (
//     <div className='mt-[73px]'>
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">Product Wise Grouping</h1>

//         {data.map((tank, index) => (
//           <div key={index} className="mb-4">
//             <h2 className="text-lg font-bold mb-2">{tank.name}</h2>
//             <table className="w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr>
//                   <th className="border border-gray-300 px-2 py-1">SR NO</th>
//                   <th className="border border-gray-300 px-2 py-1">Nozzle</th>
//                   <th className="border border-gray-300 px-2 py-1">Opening Reading</th>
//                   <th className="border border-gray-300 px-2 py-1">Closing Reading</th>
//                   <th className="border border-gray-300 px-2 py-1">Sale</th>
//                   <th className="border border-gray-300 px-2 py-1">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tank.nozzles.map((row, idx) => (
//                   <tr key={idx}>
//                     <td className="border border-gray-300 px-2 py-1">{row.srNo}</td>
//                     <td className="border border-gray-300 px-2 py-1">{row.nozzle}</td>
//                     <td className="border border-gray-300 px-2 py-1">{row.openingReading}</td>
//                     <td className="border border-gray-300 px-2 py-1">{row.closingReading}</td>
//                     <td className="border border-gray-300 px-2 py-1">{row.sale}</td>
//                     <td className="border border-gray-300 px-2 py-1">
//                       <button
//                         className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
//                         onClick={() => handleEdit(row)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-2 py-1 rounded"
//                         onClick={() => handleDelete(row.id)} // Replace with your tank ID or unique identifier
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>

//       {selectedTank && (
//         <Modal
//           tank={selectedTank}
//           onSave={handleSave}
//           onClose={handleCloseModal}
//         />
//       )}
//     </div>
//   );
// };

// export default NozzleProductWise;















import axios from 'axios'
import React, { useEffect, useState } from 'react'

function NozzleProductWise() {


  const data1 = [
    { srNo: 1, nozzle: 'B2 - MS-1', openingReading: '', closingReading: '', sale: '' },
    { srNo: 2, nozzle: 'A2 - MS-1', openingReading: '', closingReading: '', sale: '' },
    { srNo: 3, nozzle: 'A3 - MS-1', openingReading: '', closingReading: '', sale: '' },
    { srNo: 4, nozzle: 'N2 - MS-1', openingReading: '', closingReading: '', sale: '' },
    { srNo: 5, nozzle: 'N3 - MS-1', openingReading: '', closingReading: '', sale: '' },
  ];

  const data2 = [
    { srNo: 1, nozzle: 'B3 - MS-2 (SP)', openingReading: '', closingReading: '', sale: '' },
    { srNo: 2, nozzle: 'A3 - MS-2 (SP)', openingReading: '', closingReading: '', sale: '' },
    { srNo: 3, nozzle: 'N1 - MS-2 (SP)', openingReading: '', closingReading: '', sale: '' },
    { srNo: 4, nozzle: 'N2 - MS-2 (SP)', openingReading: '', closingReading: '', sale: '' },
    { srNo: 5, nozzle: 'N3 - MS-2 (SP)', openingReading: '', closingReading: '', sale: '' },
  ];

  const data3 = [
    { srNo: 1, nozzle: 'B1 - HSD', openingReading: '', closingReading: '', sale: '' },
    { srNo: 2, nozzle: 'A1 - HSD', openingReading: '', closingReading: '', sale: '' },
  ];

  return (
    <div className='mt-[73px]'>
      {/* here i  am mapping API's data Array */}
      
       <div className="p-4">
      <h1 className="text-2xl p-3  font-bold  bg-green-700 text-white uppercase text-center">Layout Product Wise </h1>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Tank - I</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className='text-center bg-blue-300'>
              <th className="border border-gray-300 px-2 py-1">SR NO</th>
              <th className="border border-gray-300 px-2 py-1">Nozzle</th>
              <th className="border border-gray-300 px-2 py-1">Opening Reading</th>
              <th className="border border-gray-300 px-2 py-1">Closing Reading</th>
              <th className="border border-gray-300 px-2 py-1">Sale</th>
              <th className="border border-gray-300 px-2 py-1">Action</th>

            </tr>
          </thead>
          <tbody>
            {data1.map((row, index) => (
              <tr key={index} className='text-center'>
                <td className="border border-gray-300 px-2 py-1">{row.srNo}</td>
                <td className="border border-gray-300 px-2 py-1">{row.nozzle}</td>
                <td className="border border-gray-300 px-2 py-1">{row.openingReading}</td>
                <td className="border border-gray-300 px-2 py-1">{row.closingReading}</td>
                <td className="border border-gray-300 px-2 py-1">{row.sale}</td>
                <td className="border border-gray-300 px-2 py-1">
                       <button
                        className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
                        // onClick={() => handleEdit(row)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        // onClick={() => handleDelete(row.id)} // Replace with your tank ID or unique identifier
                      >
                        Delete
                      </button>
                      </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Tank - II</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className='text-center  bg-blue-300'>
              <th className="border border-gray-300 px-2 py-1">SR NO</th>
              <th className="border border-gray-300 px-2 py-1">Nozzle</th>
              <th className="border border-gray-300 px-2 py-1">Opening Reading</th>
              <th className="border border-gray-300 px-2 py-1">Closing Reading</th>
              <th className="border border-gray-300 px-2 py-1">Sale</th>
            </tr>
          </thead>
          <tbody>
            {data2.map((row, index) => (
              <tr key={index} className='text-center'>
                <td className="border border-gray-300 px-2 py-1">{row.srNo}</td>
                <td className="border border-gray-300 px-2 py-1">{row.nozzle}</td>
                <td className="border border-gray-300 px-2 py-1">{row.openingReading}</td>
                <td className="border border-gray-300 px-2 py-1">{row.closingReading}</td>
                <td className="border border-gray-300 px-2 py-1">{row.sale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Tank - HSD</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className='text-center  bg-blue-300'>
              <th className="border border-gray-300 px-2 py-1">SR NO</th>
              <th className="border border-gray-300 px-2 py-1">Nozzle</th>
              <th className="border border-gray-300 px-2 py-1">Opening Reading</th>
              <th className="border border-gray-300 px-2 py-1">Closing Reading</th>
              <th className="border border-gray-300 px-2 py-1">Sale</th>
            </tr>
          </thead>
          <tbody>
            {data3.map((row, index) => (
              <tr key={index} className='text-center'>
                <td className="border border-gray-300 px-2 py-1">{row.srNo}</td>
                <td className="border border-gray-300 px-2 py-1">{row.nozzle}</td>
                <td className="border border-gray-300 px-2 py-1">{row.openingReading}</td>
                <td className="border border-gray-300 px-2 py-1">{row.closingReading}</td>
                <td className="border border-gray-300 px-2 py-1">{row.sale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default NozzleProductWise