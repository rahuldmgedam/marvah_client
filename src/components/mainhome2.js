import axios from "axios";
import React, { useEffect, useState } from "react";
//import { TankModel } from "../../../../marwa_backend/models/tank.model";

const MainHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [machineOpen, setMachineOpen] = useState(false);

  const [tank, setTank] = useState([]);
  const [machine, setMachine] = useState([]);
  const [editTank, setEditTank] = useState({});
  const fetchTank = () => {
    axios
      .get("http://localhost:4000/tank")
      .then((res) => {
        console.log("res", res.data);
        setTank(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const fetchMachine = () => {
    axios
      .get("http://localhost:4000/machine")
      .then((res) => {
        console.log("resmachine", res.data.machine);
        setMachine(res.data.machine);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    fetchTank();
    fetchMachine();
  }, []);

  const closeModal = () => {
    console.log("click close");
    setIsOpen(false);
  };

  const closemMachineModal = () => {
    console.log("click close machine modal");
    setMachineOpen(false);
  };

  const handleEdit = (props) => {
    setEditTank(props);
    setIsOpen(true);
  };

  const handleEditChange = (e) => {
    setEditTank({ ...editTank, [e.target.name]: e.target.value });
  };

  const handleMachineEdit = () => {
    setMachineOpen(true);
  };

  const handleEditSubmit = () => {
    console.log("edir", editTank);
    axios
      .patch(`http://localhost:4000/tank/update/${editTank._id}`, editTank)
      .then((res) => {
        console.log("res update", res.data);
        setIsOpen(false);
        fetchTank();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <h1 className="font-bold text-lg p-3 mb-4 text-white rounded- bg-green-900 text-center w-full">
        TANK RECORDS LAYOUT
      </h1>
      <section className="storage-cont">
        <div class="font-sans overflow-x-auto">
          <table class="min-w-full divide-y divide-black-200 border-2 mb-7">
            <thead class="bg-gray-800 whitespace-nowrap">
              <tr>
                <th class="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                  TANK NO
                </th>
                <th class="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                  PRODUCT
                </th>
                <th class="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                  CAPACITY
                </th>
                <th class="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                  NO.OF NOZZLES
                </th>
                <th class="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200 whitespace-nowrap">
              {tank.length > 0 &&
                tank.map((item) => (
                  <tr key={item._id}>
                    <td class="px-4 py-4 text-sm text-center text-gray-800 font-bold">
                      {item.tankNo}
                    </td>
                    <td class="px-4 py-4 text-sm text-center text-gray-800 font-bold">
                      {item.product}
                    </td>
                    <td class="px-4 py-4 text-sm text-center text-gray-800 font-bold">
                      {item.capacity}
                    </td>
                    <td class="px-4 py-4 text-sm  text-gray-800 text-center font-bold">
                      {item.nozzels}
                    </td>
                    <td class="px-4 py-4 text-sm text-center text-gray-800 font-extrabold">
                      <button
                        class="bg-blue-500 text-white rounded-md px-3 py-1 mr-4"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button class="bg-red-500 text-white rounded-md px-3 py-1 mr-4">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {isOpen && (
          <div class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
              <div class="flex items-center">
                <h3 class="text-blue-600 text-xl font-bold flex-1">
                  Edit Tank
                </h3>
                <svg
                  onClick={closeModal}
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                  viewBox="0 0 320.591 320.591"
                >
                  <path
                    d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                    data-original="#000000"
                  ></path>
                  <path
                    d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>

              <form class="space-y-4 mt-8">
                <div>
                  <labe class="text-gray-800 text-sm mb-2 block">TANK NO</labe>
                  <input
                    value={editTank.tankNo}
                    onChange={(e) => handleEditChange(e)}
                    type="number"
                    name="tankNo"
                    placeholder="Enter tank no"
                    class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  />
                </div>

                <div>
                  <labe class="text-gray-800 text-sm mb-2 block">PRODUCT</labe>
                  <input
                    value={editTank.product}
                    name="product"
                    onChange={handleEditChange}
                    type="text"
                    placeholder="Enter product "
                    class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  />
                </div>

                <div>
                  <labe class="text-gray-800 text-sm mb-2 block">
                    CAPACITY(in Ltr)
                  </labe>
                  <input
                    value={editTank.capacity}
                    onChange={handleEditChange}
                    type="number"
                    name="capacity"
                    placeholder="Enter quantity"
                    class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  />
                </div>

                <div>
                  <labe class="text-gray-800 text-sm mb-2 block">
                    NO OF NOZZLES
                  </labe>
                  <input
                    onChange={handleEditChange}
                    type="number"
                    name="nozzels"
                    value={editTank.nozzels}
                    placeholder="Enter nozzles no"
                    class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  />
                </div>

                <div class="flex justify-end gap-4 !mt-8">
                  <button
                    onClick={closeModal}
                    type="button"
                    class="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700"
                    onClick={handleEditSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>

      {machineOpen && (
        <div class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
            <div class="flex items-center">
              <h3 class="text-blue-600 text-xl font-bold flex-1">
                Edit Machine
              </h3>
              <svg
                onClick={closemMachineModal}
                xmlns="http://www.w3.org/2000/svg"
                class="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
                viewBox="0 0 320.591 320.591"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>

            <form class="space-y-4 mt-8">
              <div>
                <labe class="text-gray-800 text-sm mb-2 block">
                  DISPENSING UNIT NO
                </labe>
                <input
                  // value={editTank.tankNo}
                  onChange={(e) => handleEditChange(e)}
                  type="number"
                  name="tankNo"
                  class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                />
              </div>

              <div>
                <labe class="text-gray-800 text-sm mb-2 block">MAKE</labe>
                <input
                  // value={editTank.product}
                  name="product"
                  onChange={handleEditChange}
                  type="text"
                  class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                />
              </div>

              <div>
                <labe class="text-gray-800 text-sm mb-2 block">SERIAL NO</labe>
                <input
                  // value={editTank.capacity}
                  onChange={handleEditChange}
                  type="text"
                  class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                />
              </div>

              <div>
                <labe class="text-gray-800 text-sm mb-2 block">
                  CONNECTERD TANKS
                </labe>
                <input
                  onChange={handleEditChange}
                  type="number"
                  name="nozzels"
                  // value={editTank.nozzels}
                  class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                />
              </div>

              <div>
                <labe class="text-gray-800 text-sm mb-2 block">PRODUCT</labe>
                <input
                  onChange={handleEditChange}
                  type="text"
                  name="nozzels"
                  // value={editTank.nozzels}
                  class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                />
              </div>

              <div>
                <labe class="text-gray-800 text-sm mb-2 block">
                  NOZZLES IN MPD
                </labe>
                <input
                  onChange={handleEditChange}
                  type="number"
                  name="nozzels"
                  // value={editTank.nozzels}
                  class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                />
              </div>

              <div class="flex justify-end gap-4 !mt-8">
                <button
                  onClick={closemMachineModal}
                  type="button"
                  class="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700"
                  onClick={handleEditSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="machine-1">
        <div class="font-[sans-serif] overflow-x-auto">
          <table class="min-w-full bg-white border-1 border-gray-300">
            <thead class="bg-gray-800 whitespace-nowrap">
              <tr>
                <th class="text-sm absolute mt-4 ml-40 mr-0 font-large text-white  border-white-400 text-uppercase">
                  Machine - 1 Description
                  {/* <span className="text-lg font-bold  font-bold rounded-full bg-white"> 1st </span>  */}
                </th>
                <th class="p-4 text-center text-sm font-large text-white text-uppercase"></th>
                <th class="p-4 pr-4 text-sm font-large   text-white text-uppercase">
                  Side
                </th>
                <th class="p-6 absolute  ml-5 mr-0 text-center text-sm font-large text-white text-uppercase">
                  Nozzle Layout
                </th>
                <th class="p-4 text-center text-sm font-large text-white text-uppercase">
                  <td></td>
                  <td></td>
                </th>

                <th class="p-4 mr-4 font-bold text-sm font-large text-white">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody class="whitespace-nowrap">
              {/* {machine.length >0 &&
                machine.map((el)=>{
                    return <>
                     <tr key={el._id} class="even:bg-blue-50">
                <td class="p-4 text-sm font-bold  font-bold">DISPENSING UNIT NO</td>
                <td class="p-4 text-sm font-bold  font-bold">01 (DIESEL POINT) ={el.machineNo}</td>
                <td class="p-4 text-sm font-bold  font-bold">1 ={el.sides}</td>
                <td class="p-4 text-sm font-bold  font-bold">1 - A1  </td>
                <td class="p-4">
                 {el.nozzleLayout[0].A1}
                </td>
              </tr>}  */}

              <tr class="even:bg-blue-50">
                <td class="p-4 text-sm font-bold  font-bold  font-bold">
                  DISPENSING UNIT NO
                </td>
                <td class="p-4 text-sm font-bold  font-bold  font-bold">
                  01 (DIESEL POINT){" "}
                </td>
                <td class="p-4 text-sm font-bold  font-bold  font-bold">1 </td>
                <td class="p-4 text-sm font-bold  font-bold  font-bold">
                  1 - A1{" "}
                </td>
                <td class="p-4 font-bold">HSD</td>
                <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
                  <button
                    class="text-white bg-green-500 px-2 py-2 rounded-md mr-4"
                    onClick={() => handleMachineEdit()}
                  >
                    Edit
                  </button>
                  <button class="text-white bg-red-500 px-2 py-2 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>

              <tr class="even:bg-blue-50">
                <td class="p-4 text-sm font-bold  font-bold font-bold">MAKE</td>
                <td class="p-4 text-sm font-bold  font-bold font-bold">
                  GILBARCO
                </td>
                <td class="p-4 text-sm font-bold  font-bold font-bold">1</td>
                <td class="p-4 text-sm font-bold  font-bold font-bold">
                  2 - A2
                </td>
                <td class="p-4 font-bold">MS-1</td>
                <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
                  <button
                    class="bg-green-500 px-2 py-2 rounded-md mr-4 text-white"
                    onClick={() => handleMachineEdit()}
                  >
                    Edit
                  </button>
                  <button class="text-white bg-red-500 px-2 py-2 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>

              <tr class="even:bg-blue-50">
                <td class="p-4 text-sm font-bold  font-bold font-bold">
                  SERIAL NO
                </td>
                <td class="p-4 text-sm font-bold  font-bold font-bold">
                  93260208
                </td>
                <td class="p-4 text-sm font-bold  font-bold font-bold">1</td>
                <td class="p-4 text-sm font-bold  font-bold font-bold">
                  3 - A3
                </td>
                <td class="p-4 font-bold">MS-2 (SPEED)</td>
                <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
                  <button
                    class="bg-green-500 px-2 py-2 rounded-md mr-4 text-white"
                    onClick={() => handleMachineEdit()}
                  >
                    Edit
                  </button>
                  <button class="text-white bg-red-500 px-2 py-2 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>

              <tr class="even:bg-blue-50">
                <td class="p-4 text-sm font-bold  font-bold">
                  CONNECTED TANKS
                </td>
                <td class="p-4 text-sm font-bold  font-bold">ALL/3</td>
                <td class="p-4 text-sm font-bold  font-bold">2</td>
                <td class="p-4 text-sm font-bold  font-bold">4 - B1</td>
                <td class="p-4 font-bold"> HSD</td>
                <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
                  <button
                    class="bg-green-500 px-2 py-2 rounded-md mr-4 text-white"
                    onClick={() => handleMachineEdit()}
                  >
                    Edit
                  </button>
                  <button class="text-white bg-red-500 px-2 py-2 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>

              <tr class="even:bg-blue-50">
                <td class="p-4 text-sm font-bold  font-bold">PRODUCT</td>
                <td class="p-4 text-sm font-bold  font-bold">MS-1/MS-2/HSD</td>
                <td class="p-4 text-sm font-bold  font-bold">2</td>
                <td class="p-4 text-sm font-bold  font-bold">5 - B2</td>
                <td class="p-4 font-bold">MS-1</td>
                <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
                  <button
                    class="bg-green-500 px-2 py-2 rounded-md mr-4 text-white"
                    onClick={() => handleMachineEdit()}
                  >
                    Edit
                  </button>
                  <button class="text-white bg-red-500 px-2 py-2 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>

              <tr class="even:bg-blue-50">
                <td class="p-4 text-sm font-bold  font-bold">NOZZLES IN MPD</td>
                <td class="p-4 text-sm font-bold  font-bold">06</td>
                <td class="p-4 text-sm font-bold  font-bold">2</td>
                <td class="p-4 text-sm font-bold  font-bold">6 - B3</td>
                <td class="p-4 font-bold">MS-2 (SPEED)</td>
                <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
                  <button
                    class="bg-green-500 px-2 py-2 rounded-md mr-4 text-white"
                    onClick={() => handleMachineEdit()}
                  >
                    Edit
                  </button>
                  <button class="text-white bg-red-500 px-2 py-2 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
export default MainHome;

//       <section className="machine-1">
//         <div class="font-[sans-serif] overflow-x-auto">
//           <table class="min-w-full bg-white border-1 border-gray-300">
//             <thead class="bg-gray-800 whitespace-nowrap">
//               <tr>
//                 <th class="text-sm absolute mt-4 ml-40 mr-0 font-large text-white  border-white-400 text-uppercase">
//                   Machine - 1   Description
//                    {/* <span className="text-lg font-bold  font-bold rounded-full bg-white"> 1st </span>  */}
//                 </th>
//                 <th class="p-4 text-center text-sm font-large text-white text-uppercase">

//                 </th>
//                 <th class="p-4 pr-4 text-sm font-large   text-white text-uppercase">
//                   Side
//                 </th>
//                 <th class="p-6 absolute  ml-5 mr-0 text-center text-sm font-large text-white text-uppercase">
//                 Nozzle Layout
//                 </th>
//                 <th class="p-4 text-center text-sm font-large text-white text-uppercase">
//               <td></td>
//               <td></td>
//                 </th>

//                 <th class="p-4 mr-4 font-bold text-sm font-large text-white">
//                  ACTION
//                 </th>
//               </tr>
//             </thead>

//             <tbody class="whitespace-nowrap">
//                 {/* {machine.length >0 &&
//                 machine.map((el)=>{
//                     return <>
//                      <tr key={el._id} class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">DISPENSING UNIT NO</td>
//                 <td class="p-4 text-sm font-bold  font-bold">01 (DIESEL POINT) ={el.machineNo}</td>
//                 <td class="p-4 text-sm font-bold  font-bold">1 ={el.sides}</td>
//                 <td class="p-4 text-sm font-bold  font-bold">1 - A1  </td>
//                 <td class="p-4">
//                  {el.nozzleLayout[0].A1}
//                 </td>
//               </tr>} */}

//                    <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold  font-bold">DISPENSING UNIT NO</td>
//                 <td class="p-4 text-sm font-bold  font-bold  font-bold">01 (DIESEL POINT) </td>
//                 <td class="p-4 text-sm font-bold  font-bold  font-bold">1 </td>
//                 <td class="p-4 text-sm font-bold  font-bold  font-bold">1 - A1  </td>
//                 <td class="p-4 font-bold">
//                 HSD
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="text-white bg-green-500 px-2 py-2 rounded-md mr-4"
//                         onClick={() => handleMachineEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-white bg-red-500 px-2 py-2 rounded-md">Delete</button>
//                     </td>
//               </tr>

//                <tr  class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold font-bold">MAKE</td>
//                 <td class="p-4 text-sm font-bold  font-bold font-bold">GILBARCO</td>
//                 <td class="p-4 text-sm font-bold  font-bold font-bold">1</td>
//                 <td class="p-4 text-sm font-bold  font-bold font-bold">2 - A2</td>
//                 <td class="p-4 font-bold">
//                 MS-1
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="bg-green-500 px-2 py-2 rounded-md mr-4 text-white"
//                         onClick={() => handleMachineEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-white bg-red-500 px-2 py-2 rounded-md">Delete</button>
//                     </td>
//               </tr>

//               <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold font-bold">SERIAL NO</td>
//                 <td class="p-4 text-sm font-bold  font-bold font-bold">93260208</td>
//                 <td class="p-4 text-sm font-bold  font-bold font-bold">1</td>
//                 <td class="p-4 text-sm font-bold  font-bold font-bold">3 - A3</td>
//                 <td class="p-4 font-bold">
//                 MS-2 (SPEED)
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="bg-green-500 px-2 py-2 rounded-md mr-4 text-white"
//                         onClick={() => handleMachineEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-white bg-red-500 px-2 py-2 rounded-md">Delete</button>
//                     </td>
//               </tr>

//               <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">CONNECTED TANKS</td>
//                 <td class="p-4 text-sm font-bold  font-bold">ALL/3</td>
//                 <td class="p-4 text-sm font-bold  font-bold">2</td>
//                 <td class="p-4 text-sm font-bold  font-bold">4 - B1</td>
//                 <td class="p-4 font-bold">  HSD
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="bg-green-500 px-2 py-2 rounded-md mr-4 text-white"
//                         onClick={() => handleMachineEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-white bg-red-500 px-2 py-2 rounded-md">Delete</button>
//                     </td>
//               </tr>

//               <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">PRODUCT</td>
//                 <td class="p-4 text-sm font-bold  font-bold">MS-1/MS-2/HSD</td>
//                 <td class="p-4 text-sm font-bold  font-bold">2</td>
//                 <td class="p-4 text-sm font-bold  font-bold">5 - B2</td>
//                 <td class="p-4 font-bold">
//                  MS-1
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="bg-green-500 px-2 py-2 rounded-md mr-4 text-white"
//                         onClick={() => handleMachineEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-white bg-red-500 px-2 py-2 rounded-md">Delete</button>
//                     </td>
//               </tr>

//               <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">NOZZLES IN MPD</td>
//                 <td class="p-4 text-sm font-bold  font-bold">06</td>
//                 <td class="p-4 text-sm font-bold  font-bold">2</td>
//                 <td class="p-4 text-sm font-bold  font-bold">6 - B3</td>
//                 <td class="p-4 font-bold">
//                     MS-2 (SPEED)
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="bg-green-500 px-2 py-2 rounded-md mr-4 text-white"
//                         onClick={() => handleMachineEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-white bg-red-500 px-2 py-2 rounded-md">Delete</button>
//                     </td>
//               </tr>

//             </tbody>
//           </table>
//         </div>
//       </section>

//       <section className="machine-2">
//         <div class="font-[sans-serif] overflow-x-auto">
//           <table class="min-w-full bg-white border-1 border-gray-300">
//             <thead class="bg-gray-800 whitespace-nowrap">
//               <tr>
//                 <th class="text-sm absolute mt-4 ml-40 mr-0 font-large text-white  border-white-400 text-uppercase">
//                   Machine - 2   Description
//                    {/* <span className="text-lg font-bold  font-bold rounded-full bg-white"> 1st </span>  */}
//                 </th>
//                 <th class="p-4 text-center text-sm font-large text-white text-uppercase">

//                 </th>
//                 <th class="p-4 pr-4 text-sm font-large   text-white text-uppercase">
//                   Side
//                 </th>
//                 <th class="p-6 absolute  ml-5 mr-0 text-center text-sm font-large text-white text-uppercase">
//                 Nozzle Layout
//                 </th>
//                 <th class="p-4 text-center text-sm font-large text-white text-uppercase">
//               <td></td>
//               <td></td>
//                 </th>

//                 <th class="p-4 mr-4 font-bold text-sm font-large text-white">
//                  ACTION
//                 </th>
//               </tr>
//             </thead>

//             <tbody class="whitespace-nowrap">
//                 {/* {machine.length >0 &&
//                 machine.map((el)=>{
//                     return <>
//                      <tr key={el._id} class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">DISPENSING UNIT NO</td>
//                 <td class="p-4 text-sm font-bold  font-bold">01 (DIESEL POINT) ={el.machineNo}</td>
//                 <td class="p-4 text-sm font-bold  font-bold">1 ={el.sides}</td>
//                 <td class="p-4 text-sm font-bold  font-bold">1 - A1  </td>
//                 <td class="p-4">
//                  {el.nozzleLayout[0].A1}
//                 </td>
//               </tr>} */}

//                    <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">DISPENSING UNIT NO</td>
//                 <td class="p-4 text-sm font-bold  font-bold">02 (MIDDLE MPD) </td>
//                 <td class="p-4 text-sm font-bold  font-bold">3 </td>
//                 <td class="p-4 text-sm font-bold  font-bold">1 - N4  </td>
//                 <td class="p-4">
//                 MS-1
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="text-blue-600 mr-4"
//                         onClick={() => handleMachineEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-red-600">Delete</button>
//                     </td>
//               </tr>

//                <tr  class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">MAKE</td>
//                 <td class="p-4 text-sm font-bold  font-bold">TOKHIEM</td>
//                 <td class="p-4 text-sm font-bold  font-bold">3</td>
//                 <td class="p-4 text-sm font-bold  font-bold">2 - N2</td>
//                 <td class="p-4">
//                 MS-2(SPEED)
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="text-blue-600 mr-4"
//                         onClick={() => handleEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-red-600">Delete</button>
//                     </td>
//               </tr>

//               <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">SERIAL NO</td>
//                 <td class="p-4 text-sm font-bold  font-bold">M1551108</td>
//                 <td class="p-4 text-sm font-bold  font-bold"></td>
//                 <td class="p-4 text-sm font-bold  font-bold"></td>
//                 <td class="p-4">

//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="text-blue-600 mr-4"
//                         onClick={() => handleEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-red-600">Delete</button>
//                     </td>
//               </tr>

//               <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">CONNECTED TANKS</td>
//                 <td class="p-4 text-sm font-bold  font-bold">2</td>
//                 <td class="p-4 text-sm font-bold  font-bold">4</td>
//                 <td class="p-4 text-sm font-bold  font-bold">3 - N3</td>
//                 <td class="p-4 font-bold">
//                  MS-1
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="text-blue-600 mr-4"
//                         onClick={() => handleEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-red-600">Delete</button>
//                     </td>
//               </tr>

//               <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">PRODUCT</td>
//                 <td class="p-4 text-sm font-bold  font-bold">MS-1/MS-2</td>
//                 <td class="p-4 text-sm font-bold  font-bold">4</td>
//                 <td class="p-4 text-sm font-bold  font-bold">4-N1</td>
//                 <td class="p-4">
//                  MS-2(SPEED)
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="text-blue-600 mr-4"
//                         onClick={() => handleEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-red-600">Delete</button>
//                     </td>
//               </tr>

//               <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">NOZZLES IN MPD</td>
//                 <td class="p-4 text-sm font-bold  font-bold">4</td>
//                 <td class="p-4 text-sm font-bold  font-bold"></td>
//                 <td class="p-4 text-sm font-bold  font-bold"></td>
//                 <td class="p-4">

//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="text-blue-600 mr-4"
//                         onClick={() => handleEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-red-600">Delete</button>
//                     </td>
//               </tr>

//             </tbody>
//           </table>
//         </div>
//       </section>

//       <section className="machine-3">
//         <div class="font-[sans-serif] overflow-x-auto">
//           <table class="min-w-full bg-white border-1 border-gray-300">
//             <thead class="bg-gray-800 whitespace-nowrap">
//               <tr>
//                 <th class="text-sm absolute mt-4 ml-40 mr-0 font-large text-white  border-white-400 text-uppercase">
//                   Machine - 3   Description
//                    {/* <span className="text-lg font-bold  font-bold rounded-full bg-white"> 1st </span>  */}
//                 </th>
//                 <th class="p-4 text-center text-sm font-large text-white text-uppercase">

//                 </th>
//                 <th class="p-4 pr-4 text-sm font-large   text-white text-uppercase">
//                   Side
//                 </th>
//                 <th class="p-6 absolute  ml-5 mr-0 text-center text-sm font-large text-white text-uppercase">
//                 Nozzle Layout
//                 </th>
//                 <th class="p-4 text-center text-sm font-large text-white text-uppercase">
//               <td></td>
//               <td></td>
//                 </th>

//                 <th class="p-4 mr-4 font-bold text-sm font-large text-white">
//                  ACTION
//                 </th>
//               </tr>
//             </thead>

//             <tbody class="whitespace-nowrap">
//                 {/* {machine.length >0 &&
//                 machine.map((el)=>{
//                     return <>
//                      <tr key={el._id} class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">DISPENSING UNIT NO</td>
//                 <td class="p-4 text-sm font-bold  font-bold">01 (DIESEL POINT) ={el.machineNo}</td>
//                 <td class="p-4 text-sm font-bold  font-bold">1 ={el.sides}</td>
//                 <td class="p-4 text-sm font-bold  font-bold">1 - A1  </td>
//                 <td class="p-4">
//                  {el.nozzleLayout[0].A1}
//                 </td>
//               </tr>} */}

//                    <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">DISPENSING UNIT NO</td>
//                 <td class="p-4 text-sm font-bold  font-bold">03 (AUTO POINT) </td>
//                 <td class="p-4 text-sm font-bold  font-bold">5 </td>
//                 <td class="p-4 text-sm font-bold  font-bold">1 - N4  </td>
//                 <td class="p-4">
//                 MS-1
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="text-blue-600 mr-4"
//                         onClick={() => handleEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-red-600">Delete</button>
//                     </td>
//               </tr>

//                <tr  class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">MAKE</td>
//                 <td class="p-4 text-sm font-bold  font-bold">TOKHIEM</td>
//                 <td class="p-4 text-sm font-bold  font-bold">5</td>
//                 <td class="p-4 text-sm font-bold  font-bold">2 - N2</td>
//                 <td class="p-4">
//                 MS-2(SPEED)
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="text-blue-600 mr-4"
//                         onClick={() => handleEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-red-600">Delete</button>
//                     </td>
//               </tr>

//               <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">SERIAL NO</td>
//                 <td class="p-4 text-sm font-bold  font-bold">M10601049</td>
//                 <td class="p-4 text-sm font-bold  font-bold"></td>
//                 <td class="p-4 text-sm font-bold  font-bold"></td>
//                 <td class="p-4">

//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="text-blue-600 mr-4"
//                         onClick={() => handleEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-red-600">Delete</button>
//                     </td>
//               </tr>

//               <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">CONNECTED TANKS</td>
//                 <td class="p-4 text-sm font-bold  font-bold">2</td>
//                 <td class="p-4 text-sm font-bold  font-bold">6</td>
//                 <td class="p-4 text-sm font-bold  font-bold">3 -N3</td>
//                 <td class="p-4">
//                  MS-1
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="text-blue-600 mr-4"
//                         onClick={() => handleEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-red-600">Delete</button>
//                     </td>
//               </tr>

//               <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">PRODUCT</td>
//                 <td class="p-4 text-sm font-bold  font-bold">MS-1/MS-2</td>
//                 <td class="p-4 text-sm font-bold  font-bold">6</td>
//                 <td class="p-4 text-sm font-bold  font-bold">4 - N1</td>
//                 <td class="p-4">
//                  MS-2(SPEED)
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="text-blue-600 mr-4"
//                         onClick={() => handleEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-red-600">Delete</button>
//                     </td>
//               </tr>

//               <tr class="even:bg-blue-50">
//                 <td class="p-4 text-sm font-bold  font-bold">NOZZLES IN MPD</td>
//                 <td class="p-4 text-sm font-bold  font-bold">4</td>
//                 <td class="p-4 text-sm font-bold  font-bold"></td>
//                 <td class="p-4 text-sm font-bold  font-bold"></td>
//                 <td class="p-4">
//                     MS-2 (SPEED)
//                 </td>
//                 <td class="px-4 py-4 text-sm text-gray-800 font-extrabold">
//                       <button
//                         class="text-blue-600 mr-4"
//                         onClick={() => handleEdit()}
//                       >
//                         Edit
//                       </button>
//                       <button class="text-red-600">Delete</button>
//                     </td>
//               </tr>

//             </tbody>
//           </table>
//         </div>
//       </section>
//     </>
//   );
// };

// export default MainHome;
