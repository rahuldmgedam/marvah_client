// import { useState, useEffect } from "react";
// import axios from "axios";

// function StaffSalary() {
//   const [staffAverage, setStaffData] = useState([]);
//   const [newStaff, setNewStaff] = useState({
//     staffName: "",
//     ms: "",
//     sp: "",
//     holidays: "",
//     workingDays: "",
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [error, setError] = useState('');

//   // Fetch all staff data when the component loads
//   useEffect(() => {
//     axios.get("/api/staff")
//       .then((response) => setStaffData(response.data))
//       .catch((error) => console.error("Error fetching staff data:", error));
//   }, []);

//   // Handle input change for new data
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewStaff({ ...newStaff, [name]: value });
//   };

//   // Handle Add or Update
//   const handleAddOrUpdateStaff = () => {
//     const { ms, sp, workingDays } = newStaff;
//     const total = ms && sp ? parseFloat(ms) + parseFloat(sp) : 0;
//     const average = workingDays && parseInt(workingDays) !== 0
//       ? (total / parseInt(workingDays)).toFixed(2)
//       : "N/A";

//     // Calculate Total Salary
//     const salary = (ms && sp) ? (parseFloat(ms) * 0.50 + parseFloat(sp) * 0.60).toFixed(2) : "N/A";

//     // Validation check
//     if (!newStaff.staffName || !newStaff.ms || !newStaff.sp || !newStaff.holidays || !newStaff.workingDays) {
//       setError('All fields are required.');
//       return;
//     }

//     setError(''); // Clear any previous error message

//     if (isEditing) {
//       // Update staff on backend
//       axios.put(`/api/staff/${editingId}`, { ...newStaff, total, average, salary })
//         .then((response) => {
//           const updatedStaffData = staffAverage.map((staff) =>
//             staff._id === editingId ? response.data : staff
//           );
//           setStaffData(updatedStaffData);
//           setIsEditing(false);
//           setEditingId(null);
//           setNewStaff({
//             staffName: "",
//             ms: "",
//             sp: "",
//             holidays: "",
//             workingDays: "",
//           });
//         });
//     } else {
//       // Add new staff to backend
//       axios.post("/api/staff", { ...newStaff, total, average, salary })
//         .then((response) => {
//           setStaffData([...staffAverage, response.data]);
//           setNewStaff({
//             staffName: "",
//             ms: "",
//             sp: "",
//             holidays: "",
//             workingDays: "",
//           });
//         });
//     }
//   };

//   const handleEdit = (id) => {
//     const staffToEdit = staffAverage.find((staff) => staff._id === id); // Use _id instead of index
//     setIsEditing(true);
//     setEditingId(id); // Save the MongoDB _id
//     setNewStaff(staffToEdit);
//   };

//   const handleDelete = (id) => {
//     setDeleteId(id); // Save the MongoDB _id
//     setShowDeleteModal(true);
//   };

//   const handleDeleteConfirm = () => {
//     axios.delete(`/api/staff/${deleteId}`)
//       .then(() => {
//         const updatedStaffData = staffAverage.filter(
//           (staff) => staff._id !== deleteId
//         );
//         setStaffData(updatedStaffData);
//         setShowDeleteModal(false);
//       });
//   };

//   const handleDeleteCancel = () => {
//     setShowDeleteModal(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">
//       <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 uppercase">
//         Staff Average Salary
//       </h1>

//       <div className="mb-10">
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-[#008b8b] text-white uppercase text-sm leading-normal">
//               <th className="py-3 px-6 text-left">Staff Name</th>
//               <th className="py-3 px-6 text-left">Ms</th>
//               <th className="py-3 px-6 text-left">Spd</th>
//               <th className="py-3 px-6 text-left">Holidays</th>
//               <th className="py-3 px-6 text-left">Working Days</th>
//               <th className="py-3 px-6 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-900 text-sm font-light">
//             <tr className="border-b border-gray-300 hover:bg-gray-200 transition duration-300 ease-in-out">
//               <td className="py-3 px-6 border-r border-gray-200">
//                 <input
//                   type="text"
//                   name="staffName"
//                   value={newStaff.staffName}
//                   onChange={handleInputChange}
//                   placeholder="Staff Name"
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//                 />
//               </td>
//               <td className="py-3 px-6 border-r border-gray-200">
//                 <input
//                   type="text"
//                   name="ms"
//                   value={newStaff.ms}
//                   onChange={handleInputChange}
//                   placeholder="Ms"
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//                 />
//               </td>
//               <td className="py-3 px-6 border-r border-gray-200">
//                 <input
//                   type="text"
//                   name="sp"
//                   value={newStaff.sp}
//                   onChange={handleInputChange}
//                   placeholder="Sp"
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//                 />
//               </td>
//               <td className="py-3 px-6 border-r border-gray-200">
//                 <input
//                   type="text"
//                   name="holidays"
//                   value={newStaff.holidays}
//                   onChange={handleInputChange}
//                   placeholder="Holidays"
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//                 />
//               </td>
//               <td className="py-3 px-6 border-r border-gray-200">
//                 <input
//                   type="text"
//                   name="workingDays"
//                   value={newStaff.workingDays}
//                   onChange={handleInputChange}
//                   placeholder="Working Days"
//                   className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//                 />
//               </td>
//               <td className="py-3 px-6">
//                 <button
//                   onClick={handleAddOrUpdateStaff}
//                   className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out"
//                 >
//                   {isEditing ? "Update" : "Add"}
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Staff Data Table with Total and Average */}
//       <div>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-5">Staff List</h2>
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-gray-500 text-white uppercase text-sm leading-normal">
//               <th className="py-3 px-6 text-left">Staff Name</th>
//               <th className="py-3 px-6 text-left">Ms</th>
//               <th className="py-3 px-6 text-left">Spd</th>
//               <th className="py-3 px-6 text-left">Holidays</th>
//               <th className="py-3 px-6 text-left">Working Days</th>
//               <th className="py-3 px-6 text-left">Total</th>
//               <th className="py-3 px-6 text-left">Average</th>
//               <th className="py-3 px-6 text-left">Total Salary</th>
//               <th className="py-3 px-6 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-950 text-sm">
//             {staffAverage.map((staff) => (
//               <tr key={staff._id} className="border-b border-gray-300 hover:bg-gray-200 transition duration-300 ease-in-out">
//                 <td className="py-3 px-6">{staff.staffName}</td>
//                 <td className="py-3 px-6">{staff.ms}</td>
//                 <td className="py-3 px-6">{staff.sp}</td>
//                 <td className="py-3 px-6">{staff.holidays}</td>
//                 <td className="py-3 px-6">{staff.workingDays}</td>
//                 <td className="py-3 px-6">{staff.total}</td>
//                 <td className="py-3 px-6">{staff.average}</td>
//                 <td className="py-3 px-6">{staff.salary}</td> {/* Display Total Salary */}
//                 <td className="py-3 px-6">
//                   <button
//                     onClick={() => handleEdit(staff._id)}
//                     className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out mr-2"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(staff._id)}
//                     className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out"
//                   >
//                     Delete
//                   </button>
//                 </td>


//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-md">
//             <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this staff?</h2>
//             <div className="flex justify-end">
//               <button onClick={handleDeleteCancel} className="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded">Cancel</button>
//               <button onClick={handleDeleteConfirm} className="bg-red-500 text-white py-2 px-4 rounded">Delete</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StaffSalary;

import { useState, useEffect } from "react";
import axios from "axios";

function StaffSalary() {
  const [staffAverage, setStaffData] = useState([]);
  const [newStaff, setNewStaff] = useState({
    staffName: "",
    ms: "",
    sp: "",
    hsd: "",
    holidays: "",
    workingDays: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  // Fetch all staff data when the component loads
//   axios.get("https://marvah-server.onrender.com/staffSalary")

  useEffect(() => {
    axios.get("http://localhost:4000/staffSalary")
      .then((response) => setStaffData(response.data))
      .catch((error) => console.error("Error fetching staff data:", error));
  }, []);

  // Handle input change for new data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStaff({ ...newStaff, [name]: value });
  };

  // Handle Add or Update
  const handleAddOrUpdateStaff = () => {
    const { ms, sp,hsd, workingDays } = newStaff;
    const total = ms && sp && hsd ? parseFloat(ms) + parseFloat(sp) + parseFloat(hsd) : 0;
    const average = workingDays && parseInt(workingDays) !== 0
      ? (total / parseInt(workingDays)).toFixed(2)
      : "N/A";

    // Calculate Total Salary
    const salary = (ms && sp) ? (parseFloat(ms) * 0.50 + parseFloat(sp) * 0.60 + parseFloat(hsd) * 0.50).toFixed(2) : "N/A";

    // Validation check
    if (!newStaff.staffName || !newStaff.ms || !newStaff.sp || !newStaff.hsd || !newStaff.holidays || !newStaff.workingDays) {
      setError('All fields are required.');
      return;
    }

    setError(''); // Clear any previous error message

    if (isEditing) {
      // Update staff on backend
      axios.put(`http://localhost:4000/staffSalary/staffSalaryUpdate/${editingId}`, { ...newStaff, total, average, salary })
        .then((response) => {
          const updatedStaffData = staffAverage.map((staff) =>
            staff._id === editingId ? response.data : staff
          );
          setStaffData(updatedStaffData);
          setIsEditing(false);
          setEditingId(null);
          setNewStaff({
            staffName: "",
            ms: "",
            sp: "",
            hsd: "",
            holidays: "",
            workingDays: "",
          });
        });
    } else {
      // Add new staff to backend
      axios.post("http://localhost:4000/staffSalary/createStaffSalary", { ...newStaff, total, average, salary })
        .then((response) => {
          setStaffData([...staffAverage, response.data]);
          setNewStaff({
            staffName: "",
            ms: "",
            sp: "",
            hsd: "",
            holidays: "",
            workingDays: "",
          });
        });
    }
  };

  const handleEdit = (id) => {
    const staffToEdit = staffAverage.find((staff) => staff._id === id); // Use _id instead of index
    setIsEditing(true);
    setEditingId(id); // Save the MongoDB _id
    setNewStaff(staffToEdit);
  };

  const handleDelete = (id) => {
    setDeleteId(id); // Save the MongoDB _id
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    axios.delete(`http://localhost:4000/staffSalary/staffSalaryDelete/${deleteId}`)
      .then(() => {
        const updatedStaffData = staffAverage.filter(
          (staff) => staff._id !== deleteId
        );
        setStaffData(updatedStaffData);
        setShowDeleteModal(false);
      });
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="w-[100%] bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 uppercase">
        Staff Average Salary
      </h1>

      <div className="mb-10">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-[#008b8b] text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Staff Name</th>
              <th className="py-3 px-6 text-left">Ms</th>
              <th className="py-3 px-6 text-left">Spd</th>
              <th className="py-3 px-6 text-left">Hsd</th>
              <th className="py-3 px-6 text-left">Holidays</th>
              <th className="py-3 px-6 text-left">Working Days</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 text-sm font-light">
            <tr className="border-b border-gray-300 hover:bg-gray-200 transition duration-300 ease-in-out">
              <td className="py-3 px-6 border-r border-gray-200">
                <input
                  type="text"
                  name="staffName"
                  value={newStaff.staffName}
                  onChange={handleInputChange}
                  placeholder="Staff Name"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </td>
              <td className="py-3 px-6 border-r border-gray-200">
                <input
                  type="text"
                  name="ms"
                  value={newStaff.ms}
                  onChange={handleInputChange}
                  placeholder="Ms"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </td>
              <td className="py-3 px-6 border-r border-gray-200">
                <input
                  type="text"
                  name="sp"
                  value={newStaff.sp}
                  onChange={handleInputChange}
                  placeholder="Sp"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </td>
              <td className="py-3 px-6 border-r border-gray-200">
                <input
                  type="text"
                  name="hsd"
                  value={newStaff.hsd}
                  onChange={handleInputChange}
                  placeholder="Hsd"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </td>
              <td className="py-3 px-6 border-r border-gray-200">
                <input
                  type="text"
                  name="holidays"
                  value={newStaff.holidays}
                  onChange={handleInputChange}
                  placeholder="Holidays"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </td>
              <td className="py-3 px-6 border-r border-gray-200">
                <input
                  type="text"
                  name="workingDays"
                  value={newStaff.workingDays}
                  onChange={handleInputChange}
                  placeholder="Working Days"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </td>
              <td className="py-3 px-6">
                <button
                  onClick={handleAddOrUpdateStaff}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Staff Data Table with Total and Average */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">Staff List</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-500 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Staff Name</th>
              <th className="py-3 px-6 text-left">Ms</th>
              <th className="py-3 px-6 text-left">Spd</th>
              <th className="py-3 px-6 text-left">Hsd</th>
              <th className="py-3 px-6 text-left">Holidays</th>
              <th className="py-3 px-6 text-left">Working Days</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Average</th>
              <th className="py-3 px-6 text-left">Total Salary</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-950 text-sm">
            {staffAverage.map((staff) => (
              <tr key={staff._id} className="border-b border-gray-300 hover:bg-gray-200 transition duration-300 ease-in-out">
                <td className="py-3 px-6">{staff.staffName}</td>
                <td className="py-3 px-6">{staff.ms}</td>
                <td className="py-3 px-6">{staff.sp}</td>
                <td className="py-3 px-6">{staff.hsd}</td>
                <td className="py-3 px-6">{staff.holidays}</td>
                <td className="py-3 px-6">{staff.workingDays}</td>
                <td className="py-3 px-6">{staff.total}</td>
                <td className="py-3 px-6">{staff.average}</td>
                <td className="py-3 px-6">{staff.salary}</td> {/* Display Total Salary */}
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleEdit(staff._id)}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(staff._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out"
                  >
                    Delete
                  </button>
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this staff?</h2>
            <div className="flex justify-end">
              <button onClick={handleDeleteCancel} className="mr-2 bg-gray-300 text-gray-800 py-2 px-4 rounded">Cancel</button>
              <button onClick={handleDeleteConfirm} className="bg-red-500 text-white py-2 px-4 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StaffSalary;
