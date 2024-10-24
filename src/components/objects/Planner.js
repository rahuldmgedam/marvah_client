import React, { useState } from 'react';

const Planner = () => {
    const [selectedOption, setSelectedOption] = useState('Policy');
    const [formData, setFormData] = useState({
        policyHolder: '',
        policyName: '',
        policyNo: '',
        policyStartDate: '',
        policyEndDate: '',
        policyAmount: '',
        loanAmount: '',
        bankName: '',
        accountNo: '',
        paymentDate: '',
        paymentMode: 'Cash',
        contactPerson: '',
        contactNo: '',
        dateMode: '',
        paymentNumber: '',
        paymentStartDate: '',
        paymentEndDate: '',
        paymentAmount: '',
        paymentHolderName: '',
        paymentName: '',
        loanHolderName: '',
        loanName: '',
        loanStartDate: '',
        loanEndDate: '',
        loanNumber: '',
    });
    const [savedData, setSavedData] = useState({
        Policy: [],
        Payments: [],
        Loans: [],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setSavedData((prevData) => ({
            ...prevData,
            [selectedOption]: [...prevData[selectedOption], { ...formData, category: selectedOption }],
        }));

        // Reset form data
        setFormData({
            policyHolder: '',
            policyName: '',
            policyNo: '',
            policyStartDate: '',
            policyEndDate: '',
            policyAmount: '',
            paymentsAmount: '',
            loanAmount: '',
            bankName: '',
            accountNo: '',
            paymentDate: '',
            paymentMode: 'Cash',
            contactPerson: '',
            contactNo: '',
            dateMode: '',
            paymentNumber: '',
            paymentStartDate: '',
            paymentEndDate: '',
            paymentAmount: '',
            paymentHolderName: '',
            paymentName: '',
            loanHolderName: '',
            loanName: '',
            loanStartDate: '',
            loanEndDate: '',
            loanNumber: '',
        });
    };

    return (
        <div className="p-6 w-full mx-auto relative">
            {/* Dropdown */}
            <div className="ml-2 mb-4 w-[400px]">
                <label className="block mb-2 font-bold">Select Category:</label>
                <select
                    className="border-2 border-black rounded w-full p-2"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="Policy">Policy</option>
                    <option value="Payments">Payments</option>
                    <option value="Loans">Loans</option>
                </select>
            </div>

            {/* Form Layout */}
            <div className="flex gap-6 container mx-auto">
                {selectedOption === 'Policy' && (
                    <div className="space-y-4 flex-1">
                        <h1 className="text-center text-2xl font-bold bg-[#008B8B] text-white p-2">Policy Details</h1>
                        <div>
                            <label className="font-bold">Policy Holder Name:</label>
                            <input
                                type="text"
                                name="policyHolder"
                                value={formData.policyHolder}
                                onChange={handleChange}
                                className="border border-black rounded w-full p-2"
                            />
                        </div>
                        <div>
                            <label className="font-bold">Policy Name:</label>
                            <input
                                type="text"
                                name="policyName"
                                value={formData.policyName}
                                onChange={handleChange}
                                className="border border-black rounded w-full p-2"
                            />
                        </div>
                        <div>
                            <label className="font-bold">Policy No:</label>
                            <input
                                type="text"
                                name="policyNo"
                                value={formData.policyNo}
                                onChange={handleChange}
                                className="border border-black rounded w-full p-2"
                            />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="font-bold">Policy Start Date:</label>
                                <input
                                    type="date"
                                    name="policyStartDate"
                                    value={formData.policyStartDate}
                                    onChange={handleChange}
                                    className="border border-black rounded w-full p-2"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="font-bold">Policy End Date:</label>
                                <input
                                    type="date"
                                    name="policyEndDate"
                                    value={formData.policyEndDate}
                                    onChange={handleChange}
                                    className="border border-black rounded w-full p-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-bold">Date Mode:</label>
                            <select
                                name="paymentMode"
                                value={formData.dateMode}
                                onChange={handleChange}
                                className="border border-black rounded w-full p-2"
                            >
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                                <option value="Contraly">Contraly</option>
                            </select>
                        </div>
                        <div>
                            <label className="font-bold">Policy Amount:</label>
                            <input
                                type="number"
                                name="policyAmount"
                                value={formData.policyAmount}
                                onChange={handleChange}
                                className="border border-black rounded w-full p-2"
                            />
                        </div>
                    </div>
                )}
                {selectedOption === 'Payments' && (
                    <div className="space-y-4 flex-1">
                        <h1 className="text-center text-2xl font-bold bg-[#008B8B] text-white p-2">Payments Details</h1>
                        <div>
                            <label className="font-bold">Payment Holder Name:</label>
                            <input
                                type="text"
                                name="paymentHolderName"
                                value={formData.paymentHolderName}
                                onChange={handleChange}
                                className="border border-black rounded w-full p-2"
                            />
                        </div>
                        <div>
                            <label className="font-bold">Payment Name:</label>
                            <input
                                type="text"
                                name="paymentName"
                                value={formData.paymentName}
                                onChange={handleChange}
                                className="border border-black rounded w-full p-2"
                            />
                        </div>
                        <div>
                            <label className="font-bold">Payment No:</label>
                            <input
                                type="number"
                                name="paymentNumber"
                                value={formData.paymentNumber}
                                onChange={handleChange}
                                className="border border-black rounded w-full p-2"
                            />
                        </div>
                        <div className='flex gap-4'>
                            <div>
                                <label className="font-bold">Payment Start Date:</label>
                                <input
                                    type="date"
                                    name="paymentStartDate"
                                    value={formData.paymentStartDate}
                                    onChange={handleChange}
                                    className="border border-black rounded w-full p-2"
                                />
                            </div>
                            <div>
                                <label className="font-bold">Payment End Date:</label>
                                <input
                                    type="date"
                                    name="paymentEndDate"
                                    value={formData.paymentEndDate}
                                    onChange={handleChange}
                                    className="border border-black rounded w-full p-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-bold">Date Mode:</label>
                            <select
                                name="dateMode"
                                value={formData.dateMode}
                                onChange={handleChange}
                                className="border border-black rounded w-full p-2"
                            >
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                                <option value="Contraly">Contraly</option>
                            </select>
                        </div>
                        <div>
                            <label className="font-bold">Payment Amount:</label>
                            <input
                                type="number"
                                name="paymentAmount"
                                value={formData.paymentAmount}
                                onChange={handleChange}
                                className="border border-black rounded w-full p-2"
                            />
                        </div>
                    </div>
                )}
                {selectedOption === 'Loans' && (
                    <div className="space-y-4 flex-1">
                        <h1 className="text-center text-2xl font-bold bg-[#008B8B] text-white p-2">Loans Details</h1>
                        <div>
                            <label className="font-bold">Loan Holder Name:</label>
                            <input
                                type="text"
                                name="loanHolderName"
                                value={formData.loanHolderName}
                                onChange={handleChange}
                                 className="border border-black rounded w-full p-2"
                            />
                        </div>
                        <div>
                            <label className="font-bold">Loan Name:</label>
                            <input
                                type="text"
                                name="loanName"
                                value={formData.loanName}
                                onChange={handleChange}
                                 className="border border-black rounded w-full p-2"
                            />
                        </div>
                        <div>
                            <label className="font-bold">Loan No:</label>
                            <input
                                type="number"
                                name="loanName"
                                value={formData.loanName}
                                onChange={handleChange}
                                 className="border border-black rounded w-full p-2"
                            />
                        </div>
                        <div className='flex gap-4'>
                            <div>
                                <label className="font-bold">Loan Start Date:</label>
                                <input
                                    type="date"
                                    name="loanStartDate"
                                    value={formData.loanStartDate}
                                    onChange={handleChange}
                                     className="border border-black rounded w-full p-2"
                                />
                            </div>
                            <div>
                                <label className="font-bold">Loan End Date:</label>
                                <input
                                    type="date"
                                    name="loanEndDate"
                                    value={formData.loanEndDate}
                                    onChange={handleChange}
                                     className="border border-black rounded w-full p-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="font-bold">Date Mode:</label>
                            <select
                                name="paymentMode"
                                value={formData.dateMode}
                                onChange={handleChange}
                                className="border border-black rounded w-full p-2"
                            >
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                                <option value="Contraly">Contraly</option>
                            </select>
                        </div>
                        <div>
                            <label className="font-bold">Loan Amount:</label>
                            <input
                                    type="number"
                                    name="loanAmount"
                                    value={formData.loanAmount}
                                    onChange={handleChange}
                                     className="border border-black rounded w-full p-2"
                                />
                        </div>
                    </div>
                )}

                {/* Bank Details */}
                <div className="space-y-4 flex-1">
                    <h1 className="text-center text-2xl font-bold bg-[#008B8B] text-white p-2">Bank Details</h1>
                    <div>
                        <label className="font-bold">Agent Name:</label>
                        <input
                            type="text"
                            name="contactPerson"
                            value={formData.contactPerson}
                            onChange={handleChange}
                            className="border border-black rounded w-full p-2"
                        />
                    </div>
                    <div>
                        <label className="font-bold">Contact Number:</label>
                        <input
                            type="number"
                            name="contactNo"
                            value={formData.contactNo}
                            onChange={handleChange}
                            className="border border-black rounded w-full p-2"
                        />
                    </div>
                    <div>
                        <label className="font-bold">Payment Mode:</label>
                        <select
                            name="paymentMode"
                            value={formData.paymentMode}
                            onChange={handleChange}
                            className="border border-black rounded w-full p-2"
                        >   
                            <option value="Cash">Cash</option>
                            <option value="ECS">ECS</option>
                            <option value="Online">Online</option>
                        </select>
                    </div>
                    {formData.paymentMode === 'Online' && (
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="font-bold">Bank Name:</label>
                                <input
                                    type="text"
                                    name="bankName"
                                    value={formData.bankName}
                                    onChange={handleChange}
                                    className="border border-black rounded w-full p-2"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="font-bold">Account No:</label>
                                <input
                                    type="text"
                                    name="accountNo"
                                    value={formData.accountNo}
                                    onChange={handleChange}
                                    className="border border-black rounded w-full p-2"
                                    required    
                                />
                            </div>
                        </div>
                    )}
                    <div>
                        <label className="font-bold">Payment Date:</label>
                        <input
                            type="date"
                            name="paymentDate"
                            value={formData.paymentDate}
                            onChange={handleChange}
                            className="border border-black rounded w-full p-2"
                        />
                    </div>
                    <div className="w-full relative text-right">
                        <button
                            className="mt-4 bg-blue-500 text-white py-2 px-8 rounded"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>



            {/* Display Saved Data */}
            <div className="mt-6">
                {selectedOption === 'Policy' && (
                    <>
                        <h3 className="text-lg font-bold mb-4">Saved Policy Data</h3>
                        <table className="table-auto w-full text-left border border-black mb-6">
                            <thead>
                                <tr className="bg-[#008B8B] text-white">
                                    <th className="p-2 border ">Policy Holder</th>
                                    <th className="p-2 border ">Policy Name</th>
                                    <th className="p-2 border ">Policy No</th>
                                    <th className="p-2 border ">Start Date</th>
                                    <th className="p-2 border ">End Date</th>
                                    <th className="p-2 border ">Policy Amount</th>
                                    <th className="p-2 border ">Agent Name</th>
                                    <th className="p-2 border ">Contact Number</th>
                                    <th className="p-2 border ">Bank Name</th>
                                    <th className="p-2 border ">Account No</th>
                                    <th className="p-2 border ">Payment Date</th>
                                    <th className="p-2 border ">Payment Mode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savedData.Policy.map((data, index) => (
                                    <tr key={index}>
                                        <td className="p-2 border border-black">{data.policyHolder}</td>
                                        <td className="p-2 border border-black">{data.policyName}</td>
                                        <td className="p-2 border border-black">{data.policyNo}</td>
                                        <td className="p-2 border border-black">{data.policyStartDate}</td>
                                        <td className="p-2 border border-black">{data.policyEndDate}</td>
                                        <td className="p-2 border border-black">{data.policyAmount}</td>
                                        <td className="p-2 border border-black">{data.contactPerson}</td>
                                        <td className="p-2 border border-black">{data.contactNo}</td>
                                        <td className="p-2 border border-black">{data.bankName}</td>
                                        <td className="p-2 border border-black">{data.accountNo}</td>
                                        <td className="p-2 border border-black">{data.paymentDate}</td>
                                        <td className="p-2 border border-black">{data.paymentMode}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
                {selectedOption === 'Payments' && (
                    <>
                        <h3 className="text-lg font-bold mb-4">Saved Policy Data</h3>
                        <table className="table-auto w-full text-left border border-black mb-6">
                            <thead>
                                <tr className="bg-[#008B8B] text-white">
                                    <th className="p-2 border ">Payments Holder</th>
                                    <th className="p-2 border ">Payments Name</th>
                                    <th className="p-2 border ">Payments No</th>
                                    <th className="p-2 border ">Start Date</th>
                                    <th className="p-2 border ">End Date</th>
                                    <th className="p-2 border ">Payments Amount</th>
                                    <th className="p-2 border ">Agent Name</th>
                                    <th className="p-2 border ">Contact Number</th>
                                    <th className="p-2 border ">Bank Name</th>
                                    <th className="p-2 border ">Account No</th>
                                    <th className="p-2 border ">Payment Date</th>
                                    <th className="p-2 border ">Payment Mode</th>
                                </tr>
                            </thead>
                            <tbody>
                                {savedData.Payments.map((data, index) => (
                                    <tr key={index}>
                                        <td className="p-2 border border-black">{data.paymentHolderName}</td>
                                        <td className="p-2 border border-black">{data.paymentName}</td>
                                        <td className="p-2 border border-black">{data.paymentNumber}</td>
                                        <td className="p-2 border border-black">{data.paymentStartDate}</td>
                                        <td className="p-2 border border-black">{data.paymentEndDate}</td>
                                        <td className="p-2 border border-black">{data.paymentAmount}</td>
                                        <td className="p-2 border border-black">{data.contactPerson}</td>
                                        <td className="p-2 border border-black">{data.contactNo}</td>
                                        <td className="p-2 border border-black">{data.bankName ? data.bankName : '-'}</td>
                                        <td className="p-2 border border-black">{data.accountNo ? data.accountNo : '-'}</td>
                                        <td className="p-2 border border-black">{data.paymentDate}</td>
                                        <td className="p-2 border border-black">{data.paymentMode}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
                {selectedOption === 'Loans' && (
                    <>
                    <h3 className="text-lg font-bold mb-4">Saved Loan Data</h3>
                    <table className="table-auto w-full text-left border border-black mb-6">
                        <thead>
                            <tr className="bg-[#008B8B] text-white">
                                <th className="p-2 border ">Loan Holder Name</th>
                                <th className="p-2 border ">Loan Name</th>
                                <th className="p-2 border ">Loan No</th>
                                <th className="p-2 border ">Loan Start Date</th>
                                <th className="p-2 border ">Loan End Date</th>
                                <th className="p-2 border ">Loan Amount</th>
                                <th className="p-2 border ">Agent Name</th>
                                <th className="p-2 border ">Contact Number</th>
                                <th className="p-2 border ">Bank Name</th>
                                <th className="p-2 border ">Account No</th>
                                <th className="p-2 border ">Payment Date</th>
                                <th className="p-2 border ">Payment Mode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {savedData.Payments.map((data, index) => (
                                <tr key={index}>
                                    <td className="p-2 border border-black">{data.loanHolderName}</td>
                                    <td className="p-2 border border-black">{data.loanName}</td>
                                    <td className="p-2 border border-black">{data.loanNumber}</td>
                                    <td className="p-2 border border-black">{data.loanStartDate}</td>
                                    <td className="p-2 border border-black">{data.loanEndDate}</td>
                                    <td className="p-2 border border-black">{data.loanAmount}</td>
                                    <td className="p-2 border border-black">{data.contactPerson}</td>
                                    <td className="p-2 border border-black">{data.contactNo}</td>
                                    <td className="p-2 border border-black">{data.bankName ? data.bankName : '-'}</td>
                                    <td className="p-2 border border-black">{data.accountNo ? data.accountNo : '-'}</td>
                                    <td className="p-2 border border-black">{data.paymentDate}</td>
                                    <td className="p-2 border border-black">{data.paymentMode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
                )}
            </div>
        </div>
    );
};

export default Planner;