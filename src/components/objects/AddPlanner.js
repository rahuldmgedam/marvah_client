import axios from 'axios';
import React, { useState } from 'react';

function AddPlanner() {
    const [selectedOption, setSelectedOption] = useState('Policy');
    const [addFormData, setAddFormData] = useState({
        holderName: '',
        name: '',
    });

    const [addPlannerSavedData, setAddPlannerSaveData] = useState({
        policy: [],
        payment: [],
        loan: [],
    });

    const [currentEditIndex, setCurrentEditIndex] = useState(-1);

    const handleChange = (e) => {
        setAddFormData({ ...addFormData, [e.target.name]: e.target.value });
    };

    // const handleSave = async () => {
    //     const currentDate = new Date().toLocaleDateString("en-GB");
    //     const newEntry = { ...addFormData, category: selectedOption, date: currentDate };

    //     try {
    //         const response = await axios.post('http://localhost:4000/addPlanner/add/', newEntry);
    //         const savedEntry = response.data;

    //         setAddPlannerSaveData((prevData) => {
    //             const updatedData = { ...prevData };
    //             const currentData = updatedData[selectedOption.toLowerCase()];

    //             if (currentEditIndex !== -1) {
    //                 currentData[currentEditIndex] = savedEntry;
    //                 setCurrentEditIndex(-1);
    //             } else {
    //                 updatedData[selectedOption.toLowerCase()] = [savedEntry, ...currentData];
    //             }

    //             return updatedData;
    //         });

    //         // Reset form fields
    //         setAddFormData({ holderName: '', name: '' });
    //     } catch (error) {
    //         console.error('Error saving planner entry:', error);
    //     }
    // };


    const handleSave = async () => {
        const currentDate = new Date().toLocaleDateString("en-GB");
        const newEntry = { ...addFormData, category: selectedOption, date: currentDate };
    
        try {
            const response = await axios.post('http://localhost:4000/addPlanner/add/', newEntry);
            const savedEntry = response.data;
    
            setAddPlannerSaveData((prevData) => {
                const updatedData = { ...prevData };
                const currentData = updatedData[selectedOption.toLowerCase()];
    
                if (currentEditIndex !== -1) {
                    // Update existing entry
                    currentData[currentEditIndex] = savedEntry;
                    setCurrentEditIndex(-1);
                } else {
                    // Append new entry to the end of the array
                    updatedData[selectedOption.toLowerCase()] = [...currentData, savedEntry];
                }
    
                return updatedData;
            });
    
            // Reset form fields
            setAddFormData({ holderName: '', name: '' });
        } catch (error) {
            console.error('Error saving planner entry:', error);
        }
    };
    
    const handleEdit = (index) => {
        const itemToEdit = addPlannerSavedData[selectedOption.toLowerCase()][index];
        setAddFormData({ holderName: itemToEdit.holderName, name: itemToEdit.name });
        setCurrentEditIndex(index);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/addPlanner/delete/${id}`);
            setAddPlannerSaveData((prevData) => {
                const updatedData = { ...prevData };
                updatedData[selectedOption.toLowerCase()] = updatedData[selectedOption.toLowerCase()].filter(entry => entry._id !== id);
                return updatedData;
            });
        } catch (error) {
            console.error('Error deleting planner entry:', error);
        }
    };
    
    return (
        <div className='w-full relative px-8'>
            <div className='relative w-full'>
                <div className='flex items-center fixed p-4 top-16 bg-white z-10 w-full'>
                    <span className='text-black text-lg font-bold'>
                        Date: {new Date().toLocaleDateString("en-GB")}
                    </span>
                    <h1 className='text-3xl ml-80 font-bold'>Paying Account</h1>
                </div>
            </div>
            <div className='mt-24'>
                <div className="ml-2 w-[400px] relative">
                    <label className="block mb-2 font-bold">Select Category:</label>
                    <select
                        className="border-2 border-black rounded w-full p-2"
                        value={selectedOption}
                        onChange={(e) => setSelectedOption(e.target.value)}
                    >
                        <option value="Policy">Policy</option>
                        <option value="Payment">Payment</option>
                        <option value="Loan">Loan</option>
                    </select>
                </div>

                <div className="mt-4">
                    <h1 className="text-center text-2xl font-bold bg-[#008B8B] text-white p-2 my-4">
                        {selectedOption} Details
                    </h1>
                    <div className='space-y-4 w-full flex items-center gap-8'>
                        <div className='flex-1'>
                            <label className="font-bold">{selectedOption} Holder Name:</label>
                            <input
                                type="text"
                                name="holderName"
                                value={addFormData.holderName || ''}
                                onChange={handleChange}
                                className="border border-black rounded w-full p-2"
                            />
                        </div>
                        <div className='flex-1 m-0'>
                            <label className="font-bold">{selectedOption} Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={addFormData.name || ' '}
                                onChange={handleChange}
                                className="border border-black rounded w-full p-2"
                            />
                        </div>
                        <div className='relative'>
                            {currentEditIndex === -1 ? (
                                <button onClick={handleSave} className='bg-blue-700 px-10 py-2 text-right rounded-md text-white'>
                                    Save
                                </button>
                            ) : (
                                <button onClick={handleSave} className='bg-green-700 px-10 py-2 text-right rounded-md text-white'>
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <table className='w-full table-auto mt-4'>
                    <thead className='bg-[#008B8B]'>
                        <tr>
                            <th className='p-2 border text-white text-center'>Sr No</th>
                            <th className='p-2 border text-white text-center'>Date</th>
                            <th className='p-2 border text-white text-center'>{selectedOption} Holder Name</th>
                            <th className='p-2 border text-white text-center'>{selectedOption} Name</th>
                            <th className='p-2 border text-white text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addPlannerSavedData[selectedOption.toLowerCase()]?.map((data, index) => (
                            <tr key={index}>
                                <td className='p-2 border text-center'>{index + 1}</td>
                                <td className='p-2 border text-center'>{data.date}</td>
                                <td className='p-2 border text-center'>{data.holderName}</td>
                                <td className='p-2 border text-center'>{data.name}</td>
                                <td className='p-2 border text-center'>
                                    <button
                                        className='px-4 rounded-md bg-blue-700 mr-2 py-2 text-white'
                                        onClick={() => handleEdit(index)}
                                    >
                                        Edit
                                    </button>
                                    {/* <button className='px-4 rounded-md bg-blue-700 mr-2 py-2 text-white'>Open</button> */}
                                    {/* <button className='px-4 rounded-md bg-blue-700 mr-2 py-2 text-white'>Close</button> */}
                                    <button 
                                    className='px-4 rounded-md bg-red-700 mr-2 py-2 text-white'
                                    onClick={() => handleDelete(data._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AddPlanner;