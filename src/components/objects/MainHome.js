


import axios from "axios";
import React, { useEffect, useState } from "react";
import New from "../objects/New"

//import { TankModel } from "../../../../marwa_backend/models/tank.model";

const MainHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tank, setTank] = useState([]);
  const [editTank, setEditTank] = useState({});

  const [machineOpen, setMachineOpen] = useState(false);
  const [machine, setMachine] = useState([]);
  const [editMachine, setEditMachine] = useState({});

  const fetchTank = () => {
    axios
      .get("http://localhost:4000/tank")
      .then((res) => {
          console.log("tank:", res.data);
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

  const handleMachineEdit = (props) => {
    setEditMachine(props);
    setMachineOpen(true);
  };

  const handleEditMachineChange = (e) => {
    setEditMachine({ ...editMachine, [e.target.name]: e.target.value });
    console.log(editMachine);
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
  //console.log("editMachine.product", editMachine.product);
  const handleEditMachineSubmit = () => {
  //  console.log("edir", editTank);
    axios
      .patch(
        `http://localhost:4000/machine/update/${editMachine._id}`,
        editMachine
      )
      .then((res) => {
        console.log("res machine update", res.data);
        setMachineOpen(false);
        fetchMachine();
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
                <th class="px-4 py-2 text-center text-md font-bold text-white uppercase tracking-wider">
                  TANK NO
                </th>
                <th class="px-4 py-2 text-center text-md font-bold text-white uppercase tracking-wider">
                  PRODUCT
                </th>
                <th class="px-4 py-2 text-center text-md font-bold text-white uppercase tracking-wider">
                  CAPACITY(in Ltr)
                </th>
                <th class="px-4 py-2 text-center text-md font-bold text-white uppercase tracking-wider">
                  NO.OF NOZZLES
                </th>
                <th class="px-4 py-2 text-center text-md font-bold text-white uppercase tracking-wider">
                  opening Stock
                </th>
                <th class="px-4 py-2 text-center text-md font-bold text-white uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody class="bg-slate-100 divide-y divide-gray-200 whitespace-nowrap">
              {tank.length > 0 &&
                tank.map((item) => (
                  <tr key={item._id}>
                    <td class=" py-2 text-md text-center text-gray-800 font-bold">
                      {item.tankNo}
                    </td>
                    <td class="px-2 py-2 text-md text-center text-gray-800 font-bold">
                      {item.product}
                    </td>
                    <td class="px-2 py-2 text-md text-center text-gray-800 font-bold">
                      {item.capacity}
                    </td>
                    <td class="px-2 py-2 text-md  text-gray-800 text-center font-bold">
                      {item.nozzels}
                    </td>
                    <td class="text-md bg-blue-500  text-gray-800 text-center font-bold">
                      {item.opStock}
                    </td>
                    <td class="px-2 py-2 text-md text-center text-gray-800 font-extrabold">
                      <button
                        class="bg-blue-500 text-white rounded-md px-3 py-1 mr-4"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      {/* <button class="bg-red-500 text-white rounded-md px-3 py-1 mr-4">
                        Delete
                      </button> */}
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

                
                <div>
                  <labe class="text-gray-800 text-sm mb-2 block uppercase">
                  opStock
                  </labe>
                  <input
                    onChange={handleEditChange}
                    type="number"
                    name="opStock"
                    value={editTank.opStock}
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
      
      <New />
      {/* 2. machine modal start */}

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
                  value={editMachine.machineNo}
                  onChange={(e) => handleEditMachineChange(e)}
                  type="number"
                  name="machineNo"
                  class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                />
              </div>

              <div>
                <labe class="text-gray-800 text-sm mb-2 block">MAKE</labe>
                <input
                  value={editMachine.make}
                  name="product"
                  onChange={(e) => handleEditMachineChange(e)}
                  type="text"
                  class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                />
              </div>

              <div>
                <labe class="text-gray-800 text-sm mb-2 block">SERIAL NO</labe>
                <input
                  value={editMachine.serialNo}
                  name="serialNo"
                  onChange={(e) => handleEditMachineChange(e)}
                  type="text"
                  class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                />
              </div>

              <div>
                <labe class="text-gray-800 text-sm mb-2 block">
                  CONNECTERD TANKS
                </labe>
                <input
                  onChange={(e) => handleEditMachineChange(e)}
                  type="number"
                  name="connectedTank"
                  value={editMachine.connectedTank}
                  class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                />
              </div>

              <div>
                <labe class="text-gray-800 text-sm mb-2 block">PRODUCT</labe>
                <input
                  onChange={(e) => handleEditMachineChange(e)}
                  type="text"
                  name="product"
                  value={editMachine.product}
                  class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                />
              </div>

              <div>
                <labe class="text-gray-800 text-sm mb-2 block">
                  NOZZLES IN MPD
                </labe>
                <input
                  onChange={(e) => handleEditMachineChange(e)}
                  type="number"
                  name="nozzels"
                  value={editMachine.nozzlesInMPD}
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
                  onClick={handleEditMachineSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </>
  );
};
export default MainHome;