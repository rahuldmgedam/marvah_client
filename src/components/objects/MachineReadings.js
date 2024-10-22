


// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const MachineReadings = () => {
//   const [machineReadings, setMachineReadings] = useState([]);
//   const [id, setId] = useState(null);
//   const [opMeterReading, setOpMeterReading] = useState(0);

// const [render, setRender] = useState(false)

//   const fetchMachineReadings = async () => {
//     try {
//       const res = await axios.get("https://marvah-server.onrender.com/reading");
//       console.log("machineReadings", res.data.MeterReadingData);
//       setMachineReadings(res.data.MeterReadingData);
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   const filterReadingsBySide = (start, end) => {
//     return machineReadings.filter(
//       (reading) => reading.sideNo >= start && reading.sideNo <= end
//     );
//   };

//   // testing
//   const handleSave = async () => {
//     setId(null);
//     try {
//       const res = await axios.patch(`https://marvah-server.onrender.com/reading/updatereading/${id}`, { opMeterReading });
//       alert(res.data.message)
//       setRender(prev => !prev)
//       setOpMeterReading(0)
//       console.log("response", res)
//     } catch (error) {
//       console.log(error);
//     }


//     console.log("dataaaaa", opMeterReading, id)
//   }

 

//   useEffect(() => {
//     fetchMachineReadings();
//     // handleSave()
//   }, [render]);


//   const renderTable = (readings) => (
//     <table className="min-w-full bg-white shadow-lg">
//       <thead>
//         <tr className="bg-blue-400 text-white uppercase text-center">
//           <th className="py-2 px-4 border-b">Side No</th>
//           <th className="py-2 px-4 border-b">Nozzle No</th>
//           <th className="py-2 px-4 border-b">Nozzle & Product</th>
//           <th className="py-2 px-4 border-b">Tank</th>
//           <th className="py-2 px-4 border-b">Op. Meter Reading</th>
//           <th className="py-2 px-4 border-b">ACTION</th>
//         </tr>
//       </thead>
//       <tbody>
//         {
//           readings.map((reading) => (
//             <tr key={reading._id} className="text-center">
//               <td className="py-2 px-4 border-b font-bold"><span>Side - </span>{reading.sideNo}</td>
//               <td className="py-2 px-4 border-b font-bold">{reading.nozzleNo}</td>
//               <td className="py-2 px-4 border-b font-bold">{reading.nozzleProduct}</td>
//               <td className="py-2 px-4 border-b font-bold">{reading.tank}</td>
//               <td className="py-2 px-4 border-b font-bold">
//                 {id === reading._id ? (
//                   <input type="number" className="border-2 outline-none bg-blue-500 text-white border-blue-900 px-1" onChange={(e) => (setOpMeterReading(e.target.value))} />
//                 ) : (
//                   reading.opMeterReading || "N/A"
//                 )}
//               </td>
//               <td className="py-2 px-4 border-b">
//                 <div className="">
//                   {id !== reading._id ? (
//                     <button className="bg-blue-500 px-2 mr-1 rounded-md text-white font-semibold" onClick={() => setId(reading._id)}>Edit</button>
//                   ) : (
//                     <button className="bg-green-500 px-2 mr-1 rounded-md text-white font-semibold" onClick={() => (handleSave())}>Save</button>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           ))
//         }
//       </tbody>
//     </table>
//   );

//   return (<>
//    <div className="p-4 w-[90%] border-1 border-gray-400 bg-white shadow-lg">
//       <h1 className="text-xl font-bold mb-3 uppercase  flex justify-center">
//         Make Wise Meter Record (Diesel Point) GILBARCO-93260208
//       </h1>
//       {renderTable(filterReadingsBySide(1, 2))}

//       <h1 className="text-xl font-bold mb-3 mt-10 uppercase flex justify-center">
//       Make Wise Meter Record (Middle MPD) TOKHIEM-M1551108
//       </h1>
//       {renderTable(filterReadingsBySide(3, 4))}

//       <h1 className="text-xl font-bold mb-3 mt-10 uppercase flex justify-center">
//       Make Wise Meter Record (Auto Point MPD) TOKHIEM-M1601049
//       </h1>
//       {renderTable(filterReadingsBySide(5, 6))}
//     </div>
//   </>
   
//   );
// };

// export default MachineReadings;

import axios from "axios";
import React, { useEffect, useState } from "react";

const MachineReadings = () => {
  const [machineReadings, setMachineReadings] = useState([]);
  const [id, setId] = useState(null);
  const [opMeterReading, setOpMeterReading] = useState(0);
  const [render, setRender] = useState(false)
  const [machineProduct, setMachineProduct] = useState([])

  const fetchMachineProduct = async () => {
    try {
      const response = await axios.get('https://marvah-server.onrender.com/tank')
      const data = await response.data
      setMachineProduct(data)
      console.log(machineProduct, data);

    } catch (error) {
      console.log(error.message)

    }
  }

  const fetchMachineReadings = async () => {
    try {
      const res = await axios.get("https://marvah-server.onrender.com/reading");
      console.log("machineReadings", res.data.MeterReadingData);
      setMachineReadings(res.data.MeterReadingData);
    } catch (error) {
      console.log(error);
    }
  };


  const filterReadingsBySide = (start, end) => {
    return machineReadings.filter(
      (reading) => reading.sideNo >= start && reading.sideNo <= end
    );
  };

  // testing
  const handleSave = async () => {
    setId(null);
    try {
      const res = await axios.patch(`https://marvah-server.onrender.com/reading/updatereading/${id}, { opMeterReading }`);
      alert(res.data.message)
      setRender(prev => !prev)
      setOpMeterReading(0)
      console.log("response", res)
    } catch (error) {
      console.log(error);
    }


    console.log("dataaaaa", opMeterReading, id)
  }



  useEffect(() => {
    fetchMachineReadings();
    fetchMachineProduct();
    // handleSave()
  }, [render]);


  const renderTable = (readings) => (
    <table className="min-w-full bg-white shadow-lg">
      <thead>
        <tr className="bg-blue-400 text-white uppercase text-center">
          <th className="py-2 px-4 border-b">Side No</th>
          <th className="py-2 px-4 border-b">Nozzle No</th>
          <th className="py-2 px-4 border-b">Nozzle & Product</th>
          <th className="py-2 px-4 border-b">Tank</th>
          <th className="py-2 px-4 border-b">Op. Meter Reading</th>
          <th className="py-2 px-4 border-b">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {
          readings.map((reading) => {
            // Find the corresponding tank based on tankNo
            const tank = machineProduct.find(t => t.tankNo === reading.tank)

            return (
              <tr key={reading._id} className="text-center">
                <td className="py-2 px-4 border-b font-bold">
                  <span>Side - </span>{reading.sideNo}
                </td>
                <td className="py-2 px-4 border-b font-bold">{reading.nozzleNo}</td>
                <td className="py-2 px-4 border-b font-bold">
                  {/* Replace with tank's product */}
                  {tank ? tank.product : "N/A"}
                </td>
                <td className="py-2 px-4 border-b font-bold">
                  {/* Replace with tank's tankNo */}
                  {tank ? tank.tankNo : "N/A"}
                </td>
                <td className="py-2 px-4 border-b font-bold">
                  {id === reading._id ? (
                    <input
                      type="number"
                      className="border-2 outline-none bg-blue-500 text-white border-blue-900 px-1"
                      onChange={(e) => setOpMeterReading(e.target.value)}
                    />
                  ) : (
                    reading.opMeterReading || "N/A"
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <div>
                    {id !== reading._id ? (
                      <button
                        className="bg-blue-500 px-2 mr-1 rounded-md text-white font-semibold"
                        onClick={() => setId(reading._id)}>
                        Edit
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 px-2 mr-1 rounded-md text-white font-semibold"
                        onClick={handleSave}>
                        Save
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );

  return (<>
    <div className="p-4 w-[90%] border-1 border-gray-400 bg-white shadow-lg">
      <h1 className="text-xl font-bold mb-3 uppercase  flex justify-center">
        Make Wise Meter Record (Diesel Point) GILBARCO-93260208
      </h1>
      {renderTable(filterReadingsBySide(1, 2))}

      <h1 className="text-xl font-bold mb-3 mt-10 uppercase flex justify-center">
        Make Wise Meter Record (Middle MPD) TOKHIEM-M1551108
      </h1>
      {renderTable(filterReadingsBySide(3, 4))}

      <h1 className="text-xl font-bold mb-3 mt-10 uppercase flex justify-center">
        Make Wise Meter Record (Auto Point MPD) TOKHIEM-M1601049
      </h1>
      {renderTable(filterReadingsBySide(5, 6))}
    </div>
  </>

  );
};

export default MachineReadings;