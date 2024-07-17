// ./src/MachineReadings.js
import axios from "axios";
import React, { useEffect, useState } from "react";

// const machineReadings = [
//   { sideNo: 3, nozzleNo: 1, nozzleProduct: 'N4 MS-1', tank: 1, opMeterReading: 3 },
//   { sideNo: 3, nozzleNo: 2, nozzleProduct: 'N2 MS-2(SP)', tank: 2, opMeterReading: 3 },
//   { sideNo: 4, nozzleNo: 3, nozzleProduct: 'N3 MS-1', tank: 1, opMeterReading: 4 },
//   { sideNo: 4, nozzleNo: 4, nozzleProduct: 'N1 MS-2(SP)', tank: 2, opMeterReading: 4 },

//   { sideNo: 5, nozzleNo: 1, nozzleProduct: 'N4 MS-1', tank: 1, opMeterReading: 5 },
//   { sideNo: 5, nozzleNo: 2, nozzleProduct: 'N2 MS-2 (SP)', tank: 2, opMeterReading: 5 },
//   { sideNo: 6, nozzleNo: 3, nozzleProduct: 'N3 MS-1', tank: 1, opMeterReading: 6 },
//   { sideNo: 6, nozzleNo: 4, nozzleProduct: 'N1 MS-2(SP)', tank: 2, opMeterReading: 6 },

// ];
// http://localhost:4000/reading

const MachineReadings = () => {
  const [machineReadings, setMachineReadings] = useState([]);

  const fetchmachineReadings = async () => {
    try {
      const res = await axios.get("http://localhost:4000/reading");
      console.log("machineReadings", res.data.MeterReadingData);
      //   setmachine(res.machine.machine);
      setMachineReadings(res.data.MeterReadingData);
      //  toast.success(res.data.message)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchmachineReadings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4 uppercase">
        Machine Wise Meter Reading (Diesel Point) GILBARCO-93260208
      </h1>
      <table className="min-w-full bg-white">
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
          {machineReadings.map((reading, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b">{reading.sideNo}</td>
              <td className="py-2 px-4 border-b">{reading.nozzleNo}</td>
              <td className="py-2 px-4 border-b">{reading.nozzleProduct}</td>
              <td className="py-2 px-4 border-b">{reading.tank}</td>
              <td className="py-2 px-4 border-b">
                {reading.opMeterReading || "N/A"}
              </td>
              <td className="py-2 px-4 border-b">
                <div>
                  <button className="bg-green-400">edit</button>
                  <button className="bg-red-400">delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineReadings;
