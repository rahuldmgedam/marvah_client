import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const New = () => {
  const [data, setData] = useState([]);
  const [nozzleData, setNozzleData] = useState([]);

  const [machineOpen, setMachineOpen] = useState(false);
  const [machine, setMachine] = useState([]);
  const [editMachine, setEditMachine] = useState({});

  const fetchmachine = async () => {
    try {
      const res = await axios.get("http://localhost:4000/machine");
      console.log("fetchmachine", res.data);
      //   setmachine(res.machine.machine);
      setMachine(res.data.machine);
      //  toast.success(res.data.message)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchmachine();
  }, []);

  const closemMachineModal = () => {
    console.log("click close machine modal");
    setMachineOpen(false);
  };

  const handleMachineEdit = (props) => {
    setEditMachine(props);
    setMachineOpen(true);
  };

  const handleEditMachineChange = (e) => {
    const {name,value} = e.target;
    console.log("lay name",name,"lay value:",value)
    setEditMachine({ ...editMachine, [name]:value });
     console.log("newww",editMachine);
  console.log("editMachine.nozzleLayout.nozzlename",editMachine.nozzleLayout[0].nozzlename)
    };
  const handleEditMachineSubmit = () => {
    //console.log("edir", editTank);
    axios
      .patch(
        `http://localhost:4000/machine/update/${editMachine._id}`,
        editMachine
      )
      .then((res) => {
        console.log("res machine update", res.data);

        setMachineOpen(false);
        toast.success(`machine  data updated`);
        console.log("toast res.data",res.data.data.machineNo)
        fetchmachine();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const {nozzleLayout} = editMachine
  useEffect(()=>{
    setNozzleData(nozzleLayout)
  },[]);

  const handleEditNozzleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedNozzleLayout = editMachine.nozzleLayout.map((nozzle, i) => {
      if (i === index) {
        return { ...nozzle, [name]: value };
      }
      return nozzle;
    });

    setEditMachine({
      ...editMachine,
      nozzleLayout: updatedNozzleLayout
    });
  };

  return (
    <>
      {/* modal start */}
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
                  machine-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  machine-original="#000000"
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

              {/* <div>
                <labe class="text-gray-800 text-sm mb-2 block">
                 SIDES
                </labe>
                <input
                  onChange={(e) => handleEditMachineChange(e)}
                  type="number"
                  name="sides"
                  value={editMachine.sides[0]}
                  class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                />
              </div> */}

              <div>
                <div className="flex justify-around mb-2 uppercase">
                  <span>nozzlename</span>
                  <span>fueltype</span>
                </div>

                {nozzleLayout?.map((nozzleLayout, index) => {
                  return (
                    <>
                      <div key={index} className="flex gap-5 mb-2">
                        <div>
                          <input
                            type="text"
                            name="nozzlename"
                            value={nozzleLayout.nozzlename}
                            onChange={(e) => handleEditNozzleChange(index, e)}
                           
                         
                            class="px-4 py-3 bg-gray-100  text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                          
                            name="fuletype"
                            value={nozzleLayout.fuletype}
                            onChange={(e) => handleEditNozzleChange(index, e)}
                            class="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
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
      {/* modal end */}

      <div className="mt-[73px]">
        {/* here i  am mapping API's machine Array */}
        {machine.map((machine, index) => {
          return (
            <div className=" mb-11 ">
              <div className="flex">
                <div className="w-[90%] m-auto ">
                  <div className="flex font-bold border-2 ">
                    <div className="w-[40%] bg-slate-100 flex items-center justify-center py-2 ">
                      MACHINE DESCRIPTION
                    </div>
                    <div className="w-[20%] bg-slate-100 flex items-center justify-center border-r-2 border-l-2 py-2 ">
                      SIDES
                    </div>
                    <div className="w-[40%] bg-slate-100 flex items-center justify-center py-2 ">
                      NOZZLE LAYOUT
                    </div>
                  </div>
                  <div className="flex ">
                    <div className=" gap-2 w-[40%] bg-slate-100 ">
                      <div className="flex border-b-2 px-5 w-[100%]">
                        <div className="w-[60%] ">DESPENSING UNIT NO</div>
                        <div className="justify-start ">
                          {machine.machineNo}
                        </div>
                      </div>
                      <div className="flex border-b-2 px-5 w-[100%]">
                        <div className="w-[60%] ">MAKE</div>
                        <div className="justify-start ">{machine.make}</div>
                      </div>
                      <div className="flex border-b-2 px-5 w-[100%]">
                        <div className="w-[60%] ">SERIAL NO</div>
                        <div className="justify-start ">{machine.serialNo}</div>
                      </div>
                      <div className="flex border-b-2 px-5 w-[100%]">
                        <div className="w-[60%] ">CONNECTED TANK</div>
                        <div className="justify-start ">
                          {machine.connectedTank}
                        </div>
                      </div>
                      <div className="flex border-b-2 px-5 w-[100%]">
                        <div className="w-[60%] ">PRODUCT</div>
                        <div className="justify-start ">{machine.product}</div>
                      </div>
                      <div className="flex border-b-2 px-5 w-[100%]">
                        <div className="w-[60%] ">NOZZLES IN MPD</div>
                        <div className="justify-start ">
                          {machine.nozzlesInMPD}
                        </div>
                      </div>
                    </div>
                    <div className="w-[20%] ">
                      <div className="w-[100%] bg-slate-100 flex items-center justify-center h-[50%] border-2 border-t-0">
                        {machine.sides[0]}
                      </div>
                      <div className="w-[100%] bg-slate-100 flex items-center justify-center h-[50%] border-2 border-t-0">
                        {machine.sides[1]}
                      </div>
                    </div>
                    <div className=" gap-2 w-[40%] bg-slate-100  ">
                      {/* if number of nozzle will be 4 then it will execute */}
                      {machine.nozzleLayout.length === 4 &&
                        machine.nozzleLayout.map((nozzleLayout, index) => {
                          return (
                            <div
                              className="flex flex-col mt-[13px]"
                              key={index}
                            >
                              <div className="flex border-b-2 w-[100%] px-10 ">
                                <div className="w-[60%] ">
                                  {nozzleLayout.nozzlename}
                                </div>
                                <div className="justify-start ">
                                  {nozzleLayout.fuletype}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      {/* if number of nozzle will be 6 or 5 then it will execute */}
                      {(machine.nozzleLayout.length === 6 ||
                        machine.nozzleLayout.length === 5) &&
                        machine.nozzleLayout.map((nozzleLayout, index) => {
                          return (
                            <div className="flex border-b-2 w-[100%] px-10 ">
                              <div className="w-[60%] ">
                                {nozzleLayout.nozzlename}
                              </div>
                              <div className="justify-start ">
                                {nozzleLayout.fuletype}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="">
                  <table>
                    <tr key={index}>
                      <td className="px-4 py-4 flex text-sm text-gray-800 font-bold  tracking-widest ">
                        <button
                          class="text-white bg-green-800 px-2 py-2 rounded-md mr-4"
                          onClick={() => handleMachineEdit(machine)}
                        >
                          Edit
                        </button>
                        <button class="text-white bg-red-800 px-2 py-2 rounded-md">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default New;
