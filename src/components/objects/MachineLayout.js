import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MachineReadings from "./MachineReadings";
import ReadingComponent from "./ReadingComponent";

const MachineLayout = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const [machineOpen, setMachineOpen] = useState(false);
  const [machineLayout, setMachineLayout] = useState([]);
  const [editMachineLayout, setEditMachineLayout] = useState({});


  const fetchMachineLayout = () => {
    axios
      .get("http://localhost:4000/machinelayout/")
      .then((res) => {
        console.log("res", res.data);
        setMachineLayout(res.data.machine);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchMachineLayout();
  }, []);

  const closeModal = () => {
    console.log("click close");
    setMachineOpen(false);
  };

  const handleMachineLayoutEdit = (props) => {
    setEditMachineLayout(props);
    setMachineOpen(true);
  };

  const handleMachineLayoutChange = (e) => {
    const { name, value } = e.target;
    setEditMachineLayout({ ...editMachineLayout, [name]: value });
    console.log("handleMachineLayoutChange", editMachineLayout);
  };

const handleMachineLayoutSubmit = ()=>{
  axios
      .patch(
        `http://localhost:4000/machinelayout/update/${editMachineLayout._id}`,
        editMachineLayout
      )
      .then((res) => {
        console.log("res machine update", res.data);

        setMachineOpen(false);
        toast.success(`machine Layout data updated`);
        console.log("handleMachineLayoutSubmit",res.data)
        fetchMachineLayout();
      })
      .catch((error) => {
        console.log(error.message);
      });
}

  return (
    <>
      <h1 className="font-bold text-lg p-3 mb-4 text-white rounded- bg-green-900 text-center w-full">
        ALL MACHINES LAYOUT RECORD
      </h1>
      {/* 3 machines layout start */}
      <section>
        {/* modal start */}
        {machineOpen && (
          <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
              <div className="flex items-center">
                <h3 className="text-blue-600 text-xl font-bold flex-1">
                  Edit Machine Layout
                </h3>
                <svg
                  onClick={closeModal}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
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

              <form className="space-y-4 mt-8">
                <div>
                  <labe className="text-gray-800 text-sm mb-2 block">
                    MACHINE & SERIAL
                  </labe>
                  <input
                    value={editMachineLayout.machineAndSerial}
                    onChange={(e) => handleMachineLayoutChange(e)}
                    type="text"
                    name="machineAndSerial"
                    className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  />
                </div>

                <div>
                  <labe className="text-gray-800 text-sm mb-2 block">MPD NAME</labe>
                  <input
                    value={editMachineLayout.mpdName}
                    name="mpdName"
                    onChange={(e) => handleMachineLayoutChange(e)}
                    type="text"
                    className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  />
                </div>

                <div>
                  <labe className="text-gray-800 text-sm mb-2 block">
                    NO OF NOZZLES
                  </labe>
                  <input
           value={editMachineLayout.nozzles}
           onChange={(e) => handleMachineLayoutChange(e)}
                    type="number"
                    name="nozzles"
                    className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  />
                </div>

                <div>
                  <labe className="text-gray-800 text-sm mb-2 block">PRODUCT</labe>
                  <input
                    type="text"
                    name="product"
                    value={editMachineLayout.product}
                    onChange={(e) => handleMachineLayoutChange(e)}
                    className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  />
                </div>

                <div className="flex justify-end gap-4 !mt-8">
                  <button
                    onClick={closeModal}
                    type="button"
                    className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700"
                     onClick={handleMachineLayoutSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* modal end */}

        <section className="storage-cont">
          <div className="font-sans overflow-x-auto">
            <table className="min-w-full divide-y divide-black-200 border-2 mb-7">
              <thead className="bg-gray-800 whitespace-nowrap">
                <tr>
                  <th className="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                    SR NO
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                    MACHINE & SERIAL
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                    MPD NAME
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                    NO.OF NOZZLES
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                    PRODUCT
                  </th>
                  <th className="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                {machineLayout.length > 0 &&
                  machineLayout.map((item, index) => (
                    <tr key={item._id}>
                      <td className="px-4 py-4 text-sm text-center text-gray-800 font-bold">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 text-sm text-center text-gray-800 font-bold">
                        {item.machineAndSerial}
                      </td>
                      <td className="px-4 py-4 text-sm text-center text-gray-800 font-bold">
                        {item.mpdName}
                      </td>
                      <td className="px-4 py-4 text-sm  text-gray-800 text-center font-bold">
                        {item.nozzles}
                      </td>
                      <td className="px-4 py-4 text-sm  text-gray-800 text-center font-bold">
                        {item.product}
                      </td>
                      <td className="px-4 py-4 text-sm text-center text-gray-800 font-extrabold">
                        <button
                          className="bg-blue-500 text-white rounded-md px-3 py-1 mr-4"
                          onClick={() => handleMachineLayoutEdit(item)}
                        >
                          Edit
                        </button>
                        <button className="bg-red-500 text-white rounded-md px-3 py-1 mr-4">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
      {/* 3 machines layout end */}

{/* <MachineReadings/> */}
<ReadingComponent/>









      {/* machine 1 wise meter reading start */}
      {/* <section>
<section className="storage-cont">
        <div className="font-sans overflow-x-auto">
          <table className="min-w-full divide-y divide-black-200 border-2 mb-7">
            <thead className="bg-gray-800 whitespace-nowrap">
              <tr>
                <th className="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                  SR NO
                </th>
                <th className="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                  MACHINE & SERIAL
                </th>
                <th className="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                  MPD NAME
                </th>
                <th className="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                  NO.OF NOZZLES
                </th>
                <th className="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                  PRODUCT
                </th>
                <th className="px-4 py-4 text-center text-sm font-bold text-white uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200 whitespace-nowrap">
              {machineLayout.length > 0 &&
                machineLayout.map((item,index) => (
                  <tr key={item._id}>
                    <td className="px-4 py-4 text-sm text-center text-gray-800 font-bold">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 text-sm text-center text-gray-800 font-bold">
                      {item.machineAndSerial}
                    </td>
                    <td className="px-4 py-4 text-sm text-center text-gray-800 font-bold">
                      {item.mpdName}
                    </td>
                    <td className="px-4 py-4 text-sm  text-gray-800 text-center font-bold">
                      {item.nozzles}
                    </td>
                    <td className="px-4 py-4 text-sm  text-gray-800 text-center font-bold">
                      {item.product}
                    </td>
                    <td className="px-4 py-4 text-sm text-center text-gray-800 font-extrabold">
                      <button
                        className="bg-blue-500 text-white rounded-md px-3 py-1 mr-4"
                         onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button className="bg-red-500 text-white rounded-md px-3 py-1 mr-4">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {isOpen && (
          <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
              <div className="flex items-center">
                <h3 className="text-blue-600 text-xl font-bold flex-1">
                  Edit Machine Layout
                </h3>
                <svg
                   onClick={closeModal}
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
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

              <form className="space-y-4 mt-8">
                <div>
                  <labe className="text-gray-800 text-sm mb-2 block">MACHINE & SERIAL</labe>
                  <input
                    // value={editTank.tankNo}
                    // onChange={(e) => handleEditChange(e)}
                    type="number"
                   
                    name="tankNo"
                    className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  />
                </div>

                <div>
                  <labe className="text-gray-800 text-sm mb-2 block">MPD NAME</labe>
                  <input
                    // value={editTank.product}
                    name="product"
                    // onChange={handleEditChange}
                    type="text"
                    className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  />
                </div>

                <div>
                  <labe className="text-gray-800 text-sm mb-2 block">
                NO OF NOZZLES
                  </labe>
                  <input
                    // value={editTank.capacity}
                    // onChange={handleEditChange}
                    type="number"
                    name="capacity"
                    className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  />
                </div>

                <div>
                  <labe className="text-gray-800 text-sm mb-2 block">
                    PRODUCT
                  </labe>
                  <input
                    // onChange={handleEditChange}
                    type="number"
                    name="nozzels"
                    // value={editTank.nozzels}
                    className="px-4 py-3 bg-gray-100 w-full text-gray-800 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
                  />
                </div>

                <div className="flex justify-end gap-4 !mt-8">
                  <button
                     onClick={closeModal}
                    type="button"
                    className="px-6 py-3 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-6 py-3 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700"
                    // onClick={handleEditSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
</section> */}
      {/* machine 1 wise meter reading enddd */}
    </>
  );
};

export default MachineLayout;
