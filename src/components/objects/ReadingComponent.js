import React, { useState } from 'react';
import ModalReading from './ModalReading';


const machinesData = [
  {
    serial: "GILBARCO-93260208",
    name: "DIESEL POINT",
    noOfNozzles: 6,
    product: "MS-1 / MS-2 / HSD",
    sides: [
      {
        sideNo: 1,
        nozzles: [
          { nozzleNo: 1, nozzleProduct: "HSD", tank: 3, opMeterReading: 123456 },
          { nozzleNo: 2, nozzleProduct: "MS-1", tank: 1, opMeterReading: null },
          { nozzleNo: 3, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
        ]
      },
      {
        sideNo: 2,
        nozzles: [
          { nozzleNo: 4, nozzleProduct: "HSD", tank: 3, opMeterReading: null },
          { nozzleNo: 5, nozzleProduct: "MS-1", tank: 1, opMeterReading: null },
          { nozzleNo: 6, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
        ]
      }
    ]
  },
  {
        serial: "TOKHIEM-M1551108",
        name: "MIDDLE MPD",
        noOfNozzles: 4,
        product: "MS-1 / MS-2 (Speed)",
        sides: [
          {
            sideNo: 3,
            nozzles: [
              { nozzleNo: 1, nozzleProduct: "MS-1", tank: 1, opMeterReading: null },
              { nozzleNo: 2, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
            ]
          },
          {
            sideNo: 4,
            nozzles: [
              { nozzleNo: 3, nozzleProduct: "MS-2 (SP)", tank: 1, opMeterReading: null },
              { nozzleNo: 4, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
            ]
          }
        ]
      },
      {
        serial: "TOKHIEM-M1601049",
        name: "AUTO POINT MPD",
        noOfNozzles: 4,
        product: "MS-1 / MS-2 (Speed)",
        sides: [
          {
            sideNo: 5,
            nozzles: [
              { nozzleNo: 1, nozzleProduct: "MS-1", tank: 1, opMeterReading: null },
              { nozzleNo: 2, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
            ]
          },
          {
            sideNo: 6,
            nozzles: [
              { nozzleNo: 3, nozzleProduct: "MS-2 (SP)", tank: 1, opMeterReading: null },
              { nozzleNo: 4, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
            ]
          }
        ]
      }

];

const Machine = ({ machine, onEdit, onDelete }) => {
  return (
    <div className="border p-4 rounded shadow-sm mb-4">
    <h2 className="text-xl font-bold mb-4">{machine.name} ({machine.serial})</h2>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-600 text-white">
        <tr className='text-lg font-medium text-center text-white'>
          <th className="px-4 py-2 text-left text-lg font-medium text-white uppercase tracking-wider">Side No</th>
          <th className="px-4 py-2 text-left text-lg font-medium text-white uppercase tracking-wider">Nozzle No</th>
          <th className="px-4 py-2 text-left text-lg font-medium text-white uppercase tracking-wider">Nozzle Product</th>
          <th className="px-4 py-2 text-left text-lg font-medium text-white uppercase tracking-wider">Tank</th>
          <th className="px-4 py-2 text-left text-lg font-medium text-white uppercase tracking-wider">Meter Reading</th>
          <th className="px-4 py-2 text-left text-lg font-medium text-white uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {machine.sides.map(side => (
          side.nozzles.map(nozzle => (
            <tr className='text-center' key={`${side.sideNo}-${nozzle.nozzleNo}`}>
              <td className="px-4 py-2 whitespace-nowrap">{side.sideNo}</td>
              <td className="px-4 py-2 whitespace-nowrap">{nozzle.nozzleNo}</td>
              <td className="px-4 py-2 whitespace-nowrap">{nozzle.nozzleProduct}</td>
              <td className="px-4 py-2 whitespace-nowrap">{nozzle.tank}</td>
              <td className="px-4 py-2 whitespace-nowrap">{nozzle.opMeterReading ?? 'N/A'}</td>
              <td className="px-4 py-2 whitespace-nowrap">
                <div className="flex">
                  <button
                    className="mr-2 bg-blue-500 text-white px-2 py-1 rounded"
                    // onClick={() => onEdit(machine.serial, side.sideNo)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    // onClick={() => onDelete(machine.serial, side.sideNo)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        ))}
      </tbody>
    </table>
  </div>
    
  );
};

const MachinesList = ({ machines, onEdit, onDelete }) => {
  return (
    <div>
      {machines.map(machine => (
        <Machine key={machine.serial} machine={machine} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

const ReadingComponent = () => {
  const [machines, setMachines] = useState(machinesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSide, setCurrentSide] = useState(null);

  const handleEdit = (serial, sideNo) => {
    const machine = machines.find(m => m.serial === serial);
    const side = machine.sides.find(s => s.sideNo === sideNo);
    setCurrentSide({ serial, ...side });
    setIsModalOpen(true);
  };

  const handleDelete = (serial, sideNo) => {
    const updatedMachines = machines.map(machine => {
      if (machine.serial === serial) {
        const updatedSides = machine.sides.filter(side => side.sideNo !== sideNo);
        return { ...machine, sides: updatedSides };
      }
      return machine;
    });
    setMachines(updatedMachines);
  };

  const handleSave = (updatedSide) => {
    const updatedMachines = machines.map(machine => {
      if (machine.serial === updatedSide.serial) {
        const updatedSides = machine.sides.map(side => side.sideNo === updatedSide.sideNo ? updatedSide : side);
        return { ...machine, sides: updatedSides };
      }
      return machine;
    });
    setMachines(updatedMachines);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2x text-center p-3 font-bold mb-4 bg-green-800 uppercase text-white">Machines Layout (Make) Wise</h1>
      <MachinesList machines={machines} onEdit={handleEdit} onDelete={handleDelete} />
      {isModalOpen && (
        <ModalReading side={currentSide} onClose={() => setIsModalOpen(false)} onSave={handleSave} />
      )}
    </div>
  );
};

export default ReadingComponent;


// import React from 'react';
// import 'tailwindcss/tailwind.css';

// const machinesData = [
//   {
//     serial: "GILBARCO-93260208",
//     name: "DIESEL POINT",
//     noOfNozzles: 6,
//     product: "MS-1 / MS-2 / HSD",
//     sides: [
//       {
//         sideNo: 1,
//         nozzles: [
//           { nozzleNo: 1, nozzleProduct: "HSD", tank: 3, opMeterReading: 123456 },
//           { nozzleNo: 2, nozzleProduct: "MS-1", tank: 1, opMeterReading: null },
//           { nozzleNo: 3, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
//         ]
//       },
//       {
//         sideNo: 2,
//         nozzles: [
//           { nozzleNo: 4, nozzleProduct: "HSD", tank: 3, opMeterReading: null },
//           { nozzleNo: 5, nozzleProduct: "MS-1", tank: 1, opMeterReading: null },
//           { nozzleNo: 6, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
//         ]
//       }
//     ]
//   },
//   {
//     serial: "TOKHIEM-M1551108",
//     name: "MIDDLE MPD",
//     noOfNozzles: 4,
//     product: "MS-1 / MS-2 (Speed)",
//     sides: [
//       {
//         sideNo: 3,
//         nozzles: [
//           { nozzleNo: 1, nozzleProduct: "MS-1", tank: 1, opMeterReading: null },
//           { nozzleNo: 2, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
//         ]
//       },
//       {
//         sideNo: 4,
//         nozzles: [
//           { nozzleNo: 3, nozzleProduct: "MS-2 (SP)", tank: 1, opMeterReading: null },
//           { nozzleNo: 4, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
//         ]
//       }
//     ]
//   },
//   {
//     serial: "TOKHIEM-M1601049",
//     name: "AUTO POINT MPD",
//     noOfNozzles: 4,
//     product: "MS-1 / MS-2 (Speed)",
//     sides: [
//       {
//         sideNo: 5,
//         nozzles: [
//           { nozzleNo: 1, nozzleProduct: "MS-1", tank: 1, opMeterReading: null },
//           { nozzleNo: 2, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
//         ]
//       },
//       {
//         sideNo: 6,
//         nozzles: [
//           { nozzleNo: 3, nozzleProduct: "MS-2 (SP)", tank: 1, opMeterReading: null },
//           { nozzleNo: 4, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
//         ]
//       }
//     ]
//   }
// ];

// const Machine = ({ machine }) => {
//   return (
//     <div className="mb-8">
//       <h2 className="text-xl font-semibold mb-2">{machine.name} ({machine.serial})</h2>
//       <p>No. of Nozzles: {machine.noOfNozzles}</p>
//       <p>Product: {machine.product}</p>
//       {machine.sides.map(side => (
//         <div key={side.sideNo} className="mb-4">
//           <h3 className="text-lg font-medium mb-2">Side {side.sideNo}</h3>
//           <table className="table-auto w-full border-collapse border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="border border-gray-200 px-4 py-2">Nozzle No</th>
//                 <th className="border border-gray-200 px-4 py-2">Nozzle Product</th>
//                 <th className="border border-gray-200 px-4 py-2">Tank</th>
//                 <th className="border border-gray-200 px-4 py-2">Meter Reading</th>
//               </tr>
//             </thead>
//             <tbody>
//               {side.nozzles.map(nozzle => (
//                 <tr key={nozzle.nozzleNo}>
//                   <td className="border border-gray-200 px-4 py-2">{nozzle.nozzleNo}</td>
//                   <td className="border border-gray-200 px-4 py-2">{nozzle.nozzleProduct}</td>
//                   <td className="border border-gray-200 px-4 py-2">{nozzle.tank}</td>
//                   <td className="border border-gray-200 px-4 py-2">{nozzle.opMeterReading ?? 'N/A'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// };

// const MachinesList = ({ machines }) => {
//   return (
//     <div>
//       {machines.map(machine => (
//         <Machine key={machine.serial} machine={machine} />
//       ))}
//     </div>
//   );
// };

// const ReadingComponent = () => {
//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Machines Layout</h1>
//       <MachinesList machines={machinesData} />
//     </div>
//   );
// };

// export default ReadingComponent;



// import React from 'react';
// const machinesData = [
//     {
//       serial: "GILBARCO-93260208",
//       name: "DIESEL POINT",
//       noOfNozzles: 6,
//       product: "MS-1 / MS-2 / HSD",
//       sides: [
//         {
//           sideNo: 1,
//           nozzles: [
//             { nozzleNo: 1, nozzleProduct: "HSD", tank: 3, opMeterReading: 123456 },
//             { nozzleNo: 2, nozzleProduct: "MS-1", tank: 1, opMeterReading: null },
//             { nozzleNo: 3, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
//           ]
//         },
//         {
//           sideNo: 2,
//           nozzles: [
//             { nozzleNo: 4, nozzleProduct: "HSD", tank: 3, opMeterReading: null },
//             { nozzleNo: 5, nozzleProduct: "MS-1", tank: 1, opMeterReading: null },
//             { nozzleNo: 6, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
//           ]
//         }
//       ]
//     },
//     {
//       serial: "TOKHIEM-M1551108",
//       name: "MIDDLE MPD",
//       noOfNozzles: 4,
//       product: "MS-1 / MS-2 (Speed)",
//       sides: [
//         {
//           sideNo: 3,
//           nozzles: [
//             { nozzleNo: 1, nozzleProduct: "MS-1", tank: 1, opMeterReading: null },
//             { nozzleNo: 2, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
//           ]
//         },
//         {
//           sideNo: 4,
//           nozzles: [
//             { nozzleNo: 3, nozzleProduct: "MS-2 (SP)", tank: 1, opMeterReading: null },
//             { nozzleNo: 4, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
//           ]
//         }
//       ]
//     },
//     {
//       serial: "TOKHIEM-M1601049",
//       name: "AUTO POINT MPD",
//       noOfNozzles: 4,
//       product: "MS-1 / MS-2 (Speed)",
//       sides: [
//         {
//           sideNo: 5,
//           nozzles: [
//             { nozzleNo: 1, nozzleProduct: "MS-1", tank: 1, opMeterReading: null },
//             { nozzleNo: 2, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
//           ]
//         },
//         {
//           sideNo: 6,
//           nozzles: [
//             { nozzleNo: 3, nozzleProduct: "MS-2 (SP)", tank: 1, opMeterReading: null },
//             { nozzleNo: 4, nozzleProduct: "MS-2 (SP)", tank: 2, opMeterReading: null }
//           ]
//         }
//       ]
//     }
//   ];
  
// const Machine = ({ machine }) => {
//   return (
//     <div>
//       <h2>{machine.name} ({machine.serial})</h2>
//       <p>No. of Nozzles: {machine.noOfNozzles}</p>
//       <p>Product: {machine.product}</p>
//       {machine.sides.map(side => (
//         <div key={side.sideNo}>
//           <h3>Side {side.sideNo}</h3>
//           <ul>
//             {side.nozzles.map(nozzle => (
//               <li key={nozzle.nozzleNo}>
//                 Nozzle {nozzle.nozzleNo}: {nozzle.nozzleProduct}, Tank: {nozzle.tank}, Meter Reading: {nozzle.opMeterReading ?? 'N/A'}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// const MachinesList = ({ machines }) => {
//   return (
//     <div>
//       {machines.map(machine => (
//         <Machine key={machine.serial} machine={machine} />
//       ))}
//     </div>
//   );
// };

// const ReadingComponent = () => {
//   return (
//     <div>
//       <h1>Machines Layout</h1>
//       <MachinesList machines={machinesData} />
//     </div>
//   );
// };

// export default ReadingComponent;
