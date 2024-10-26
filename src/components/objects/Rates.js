import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment"; //

export default function Rates(){
      // State to manage the readings
      const [amsToday, setamsToday] = useState(0);
      const [bspeedToday, setbspeedToday] = useState(0);
      const [hsdToday, sethsdToday] = useState(0);
    
      const [amsLast, setamsLast] = useState(0);
      const [bspeedLast, setbspeedLast] = useState(0);
      const [hsdLast, sethsdLast] = useState(0);
    
      const [date, setDate] = useState(moment().format("DD-MM-YYYY")); // Current date
      const [differenceMS, setDifferenceMS] = useState(0);
      const [differenceSpeed, setDifferenceSpeed] = useState(0);
      const [differenceHSD, setDifferenceHSD] = useState(0);
    
      // Fetch the readings from the previous day (replace with your API call)
      const fetchLastDayReadings = () => {
        axios
          .get("http://localhost:4000/last-day-readings")
          .then((res) => {
            const data = res.data;
            setamsLast(data.ms);
            setbspeedLast(data.speed);
            sethsdLast(data.hsd);
          })
          .catch((error) => console.error(error));
      };
    
      // Calculate the difference when readings change
      useEffect(() => {
        setDifferenceMS(amsToday - amsLast);
        setDifferenceSpeed(bspeedToday - bspeedLast);
        setDifferenceHSD(hsdToday - hsdLast);
      }, [amsToday, bspeedToday, hsdToday, amsLast, bspeedLast, hsdLast]);
    
      // Fetch the previous day readings when the component mounts
      useEffect(() => {
        fetchLastDayReadings();
      }, []);
    
      // Handle saving the current day readings to the server
      const handleSave = () => {
        const dataToSave = {
          date,
          ms: amsToday,
          speed: bspeedToday,
          hsd: hsdToday,
        };
    
        axios
          .post("http://localhost:4000/save-readings", dataToSave)
          .then((res) => {
            alert("Readings saved successfully!");
          })
          .catch((error) => {
            console.error(error);
            alert("Error saving readings.");
          });
      };
    
      return (
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-4">Day Start</h1>
    
          <div className="flex justify-between mb-6">
            <div>
              <span className="font-semibold text-lg">READING DAY: </span>
              <input
                type="text"
                className="border border-red-500 p-2 rounded-md"
                value={date}
                readOnly
              />
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              RATES
            </button>
          </div>
    
          <div className="grid grid-cols-3 gap-6 text-center">
            {/* Tank-1 MS */}
            <div>
              <h4 className="text-red-600 font-bold text-xl">TANK-1-MS</h4>
              <div>
                <label className="block">Reading Day</label>
                <input
                  type="number"
                  className="border-2 border-blue-500 p-2 rounded-md text-xl"
                  value={amsToday}
                  onChange={(e) => setamsToday(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block">Last Day</label>
                <input
                  type="number"
                  className="border-2 border-gray-500 p-2 rounded-md text-xl"
                  value={amsLast}
                  readOnly
                />
              </div>
              <div>
                <label className="block">Difference MS</label>
                <input
                  type="number"
                  className={`border-2 p-2 rounded-md text-xl ${
                    differenceMS < 0 ? "border-red-500 text-red-500" : "border-green-500"
                  }`}
                  value={differenceMS}
                  readOnly
                />
              </div>
            </div>
    
            {/* Tank-2 Speed */}
            <div>
              <h4 className="text-red-600 font-bold text-xl">TANK-2-MS</h4>
              <div>
                <label className="block">Reading Day</label>
                <input
                  type="number"
                  className="border-2 border-blue-500 p-2 rounded-md text-xl"
                  value={bspeedToday}
                  onChange={(e) => setbspeedToday(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block">Last Day</label>
                <input
                  type="number"
                  className="border-2 border-gray-500 p-2 rounded-md text-xl"
                  value={bspeedLast}
                  readOnly
                />
              </div>
              <div>
                <label className="block">Difference Speed</label>
                <input
                  type="number"
                  className={`border-2 p-2 rounded-md text-xl ${
                    differenceSpeed < 0 ? "border-red-500 text-red-500" : "border-green-500"
                  }`}
                  value={differenceSpeed}
                  readOnly
                />
              </div>
            </div>
    
            {/* Tank-3 HSD */}
            <div>
              <h4 className="text-red-600 font-bold text-xl">TANK-3-HSD</h4>
              <div>
                <label className="block">Reading Day</label>
                <input
                  type="number"
                  className="border-2 border-blue-500 p-2 rounded-md text-xl"
                  value={hsdToday}
                  onChange={(e) => sethsdToday(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block">Last Day</label>
                <input
                  type="number"
                  className="border-2 border-gray-500 p-2 rounded-md text-xl"
                  value={hsdLast}
                  readOnly
                />
              </div>
              <div>
                <label className="block">Difference HSD</label>
                <input
                  type="number"
                  className={`border-2 p-2 rounded-md text-xl ${
                    differenceHSD < 0 ? "border-red-500 text-red-500" : "border-green-500"
                  }`}
                  value={differenceHSD}
                  readOnly
                />
              </div>
            </div>
          </div>
    
          <div className="flex justify-center mt-6">
            <button
              className="bg-green-500 text-white px-6 py-2 rounded-md"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      );
    }
    

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import moment from "moment"; // For formatting the current day

// export default function Rates() {
//   // State to manage the readings
//   const [amsToday, setamsToday] = useState(0);
//   const [bspeedToday, setbspeedToday] = useState(0);
//   const [hsdToday, sethsdToday] = useState(0);

//   const [amsLast, setamsLast] = useState(0);
//   const [bspeedLast, setbspeedLast] = useState(0);
//   const [hsdLast, sethsdLast] = useState(0);

//   const [date, setDate] = useState(moment().format("DD-MM-YYYY")); // Current date
//   const [differenceMS, setDifferenceMS] = useState(0);
//   const [differenceSpeed, setDifferenceSpeed] = useState(0);
//   const [differenceHSD, setDifferenceHSD] = useState(0);

//   // Fetch the readings from the previous day (replace with your API call)
//   const fetchLastDayReadings = () => {
//     axios
//       .get("https://your-api.com/last-day-readings")
//       .then((res) => {
//         const data = res.data;
//         setamsLast(data.ms);
//         setbspeedLast(data.speed);
//         sethsdLast(data.hsd);
//       })
//       .catch((error) => console.error(error));
//   };

//   // Calculate the difference when readings change
//   useEffect(() => {
//     setDifferenceMS(amsToday - amsLast);
//     setDifferenceSpeed(bspeedToday - bspeedLast);
//     setDifferenceHSD(hsdToday - hsdLast);
//   }, [amsToday, bspeedToday, hsdToday, amsLast, bspeedLast, hsdLast]);

//   // Fetch the previous day readings when the component mounts
//   useEffect(() => {
//     fetchLastDayReadings();
//   }, []);

//   // Handle saving the current day readings to the server
//   const handleSave = () => {
//     const dataToSave = {
//       date,
//       ms: amsToday,
//       speed: bspeedToday,
//       hsd: hsdToday,
//     };

//     axios
//       .post("https://your-api.com/save-readings", dataToSave)
//       .then((res) => {
//         alert("Readings saved successfully!");
//       })
//       .catch((error) => {
//         console.error(error);
//         alert("Error saving readings.");
//       });
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-4">Day Start</h1>

//       <div className="flex justify-between mb-6">
//         <div>
//           <span className="font-semibold text-lg">READING DAY: </span>
//           <input
//             type="text"
//             className="border border-red-500 p-2 rounded-md"
//             value={date}
//             readOnly
//           />
//         </div>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
//           RATES
//         </button>
//       </div>

//       <div className="grid grid-cols-3 gap-6 text-center">
//         {/* Tank-1 MS */}
//         <div>
//           <h4 className="text-red-600 font-bold text-xl">TANK-1-MS</h4>
//           <div>
//             <label className="block">Reading Day</label>
//             <input
//               type="number"
//               className="border-2 border-blue-500 p-2 rounded-md text-xl"
//               value={amsToday}
//               onChange={(e) => setamsToday(Number(e.target.value))}
//             />
//           </div>
//           <div>
//             <label className="block">Last Day</label>
//             <input
//               type="number"
//               className="border-2 border-gray-500 p-2 rounded-md text-xl"
//               value={amsLast}
//               readOnly
//             />
//           </div>
//           <div>
//             <label className="block">Difference MS</label>
//             <input
//               type="number"
//               className={`border-2 p-2 rounded-md text-xl ${
//                 differenceMS < 0 ? "border-red-500 text-red-500" : "border-green-500"
//               }`}
//               value={differenceMS}
//               readOnly
//             />
//           </div>
//         </div>

//         {/* Tank-2 Speed */}
//         <div>
//           <h4 className="text-red-600 font-bold text-xl">TANK-2-MS</h4>
//           <div>
//             <label className="block">Reading Day</label>
//             <input
//               type="number"
//               className="border-2 border-blue-500 p-2 rounded-md text-xl"
//               value={bspeedToday}
//               onChange={(e) => setbspeedToday(Number(e.target.value))}
//             />
//           </div>
//           <div>
//             <label className="block">Last Day</label>
//             <input
//               type="number"
//               className="border-2 border-gray-500 p-2 rounded-md text-xl"
//               value={bspeedLast}
//               readOnly
//             />
//           </div>
//           <div>
//             <label className="block">Difference Speed</label>
//             <input
//               type="number"
//               className={`border-2 p-2 rounded-md text-xl ${
//                 differenceSpeed < 0 ? "border-red-500 text-red-500" : "border-green-500"
//               }`}
//               value={differenceSpeed}
//               readOnly
//             />
//           </div>
//         </div>

//         {/* Tank-3 HSD */}
//         <div>
//           <h4 className="text-red-600 font-bold text-xl">TANK-3-HSD</h4>
//           <div>
//             <label className="block">Reading Day</label>
//             <input
//               type="number"
//               className="border-2 border-blue-500 p-2 rounded-md text-xl"
//               value={hsdToday}
//               onChange={(e) => sethsdToday(Number(e.target.value))}
//             />
//           </div>
//           <div>
//             <label className="block">Last Day</label>
//             <input
//               type="number"
//               className="border-2 border-gray-500 p-2 rounded-md text-xl"
//               value={hsdLast}
//               readOnly
//             />
//           </div>
//           <div>
//             <label className="block">Difference HSD</label>
//             <input
//               type="number"
//               className={`border-2 p-2 rounded-md text-xl ${
//                 differenceHSD < 0 ? "border-red-500 text-red-500" : "border-green-500"
//               }`}
//               value={differenceHSD}
//               readOnly
//             />
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-center mt-6">
//         <button
//           className="bg-green-500 text-white px-6 py-2 rounded-md"
//           onClick={handleSave}
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }
