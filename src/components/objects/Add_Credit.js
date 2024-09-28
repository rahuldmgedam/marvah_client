import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { createPetroCard, editHandler, getPetroCard, statusPetroCard } from '../../servises/opretions/card';
import toast from 'react-hot-toast';
import {createCredit, getCreditData}  from '../../servises/opretions/credit';


export default function Add_Credit() {

    const [credit, setCredit] = useState([]);
    const [showEditBtn, setShowEditBtn] = useState(false)
    const [banks, setBanks] = useState([]);
    const [formData, setFormData] = useState({
        clientName: '',
        mobileNo: '',
        bankAccNo: '',
        bankName : '',
    })

    const changeHandler = (e) => {
        const { name, value } = e.target

        setFormData((pre) => ({
            ...pre,
            [name]: value
        }))
    }

    const editClickHandler = (data) => {
        console.log("data : ", data)
        setFormData((pre) => ({
            ...pre,
            clientName: data.clientName,
            mobileNo: data.mobileNo,
            bankAccNo: data.bankAccNo,
            id : data?._id
        }))

        setShowEditBtn(true);
    }
    console.log("formData for Edit ", formData);

    const editCanselhandler = () => {
        setShowEditBtn(false)
        setFormData((pre) => ({
            ...pre,
            clientName: '',
            mobileNo: '',
            bankAccNo: '',
            bankName : '',
            id : '',
        }))
    }

    async function editCardHandler() {
        await editHandler(formData);
        editCanselhandler()
        getCardData()
    }

    const getCardData = async () => {
        const data = await getCreditData();
        if (data.length) {
            setCredit(data);
        }
    }

    useEffect(() => {
        if (!credit.length) {
            getCardData()
        }
    }, [])

    const submitHandler = async () => {
        // e.preventDefault();

        console.log("FormData : ", formData);
        const res = await createCredit(formData);
        console.log("res : ", res);
        setCredit(res?.creditData);
        setFormData({
            clientName: '',
            mobileNo: '',
            bankAccNo: '',
            bankName : '',
        })
    }

    const statusPetroCardData = async (id, S) => {
        const res = await statusPetroCard(id, S);
        getCardData()
    }

    return (
        <>
            <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>

                <h2 className='mt-3 text-center'>Add Credit</h2>
                <span style={{ fontSize: '22px' }}> Date :
                    {new Date().toLocaleDateString()}
                    {/* {convertDateFormat(datecache)} */}
                </span>
                <div>
                    <br></br>
                    <table class="table">
                        <thead>
                            <tr className='table-secondary'>
                                {/* <th className='tablebg'>Category</th> */}
                                <th className='tablebg'>Client Name</th>
                                <th className='tablebg'>Mobile No.</th>
                                <th className='tablebg'>Bank Name</th>
                                <th className='tablebg'>Accout No.</th>
                                <th className='tablebg'>Action</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {/* <form onSubmit={submitHandler}> */}
                            <tr>
                                <td scope="row">
                                    <input name='clientName' value={formData?.clientName} type="text" class="form-control editableInput bigFontWeight" onChange={changeHandler} />
                                </td>
                                <td scope="row">
                                    <input name='mobileNo' value={formData?.mobileNo} type="number" class="form-control editableInput bigFontWeight" onChange={changeHandler} />
                                </td>
                                <td scope="row">
                                    <input name='bankName' value={formData?.bankName} type="text" class="form-control editableInput bigFontWeight" onChange={changeHandler} />
                                </td>
                                <td scope="row">
                                    <input name='bankAccNo' value={formData?.bankAccNo} type="number" class="form-control editableInput bigFontWeight" onChange={changeHandler} />
                                </td>
                                <td scope="row">
                                    {showEditBtn ?
                                        (<div className=' flex gap-3'>
                                            <button onClick={editCardHandler} className=' py-2 px-3 bg-blue-600 hover:bg-blue-500 rounded text-white'>Edit</button>
                                            <button onClick={editCanselhandler} className=' py-2 px-3 bg-blue-600 hover:bg-blue-500 rounded text-white'>Cancel</button>
                                        </div>) :
                                        (<button onClick={submitHandler} className=' py-2 px-3 bg-blue-600 hover:bg-blue-500 rounded text-white'>Add</button>)}
                                </td>

                            </tr>
                            {/* </form> */}
                        </tbody>
                    </table>
                </div>
                <br></br>
                <div>
                    <br></br>
                    <table class="table">
                        <thead>
                            <tr className='table-secondary'>
                                <th className='tablebg text-center' style={{ width: '50px' }} >Sr. No.</th>
                                <th className='tablebg text-center'>Date</th>
                                <th className='tablebg text-center'>Client Name</th>
                                <th className='tablebg text-center'>Mobile Number</th>
                                <th className='tablebg text-center'>Bank Name</th>
                                <th className='tablebg text-center'>Bank Accout Number</th>
                                <th className='tablebg text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {credit?.map((res, index) =>
                                <tr key={index} className='hovereffect'>
                                    <td scope="row" className=' text-center'>
                                        {index + 1}
                                    </td>
                                    <td scope="row" className=' text-center'>
                                        {new Date(res?.date).toLocaleDateString()}
                                    </td>
                                    <td scope="row" className=' text-center'>
                                        {res?.clientName}
                                    </td>
                                    <td scope="row" className=' text-center'>
                                        {res?.mobileNo}
                                    </td>
                                    <td scope="row" className=' text-center'>
                                        {res?.bankName}
                                    </td>
                                    
                                    <td scope="row" className=' text-center'>
                                        {res?.bankAccNo}
                                    </td>
                                    <td className=' flex text-center gap-3 justify-center'>
                                        <button onClick={() => {res?.status !== "Open" ? (statusPetroCardData(res._id, "Open")) : (toast.error("Alredy Open")) }} className=' text-white rounded bg-blue-600 hover:bg-blue-500 px-3 py-2'>Open</button>
                                        <button onClick={() => {res?.status !== "Close" ? (statusPetroCardData(res._id, "Close")) : (toast.error("Alredy Close")) }} className=' text-white rounded bg-red-600 hover:bg-red-500 px-3 py-2'>Close</button>
                                        <button className=' text-white rounded bg-yellow-600 hover:bg-yellow-500 px-3 py-2' onClick={() => editClickHandler(res)}>Edit</button>
                                    </td>

                                </tr>
                            )}


                            {/*   <tr>
                                    <td>1</td>
                                   
                                    <td>BPCL 202725</td>
                                    <td>202725</td>
                                    <td>261</td>
                                    <td>Open</td>
                                    <td style={{width:'200px'}}>
                                        
                                        
                                        <button type="button"  class="btn btn-primary">Delete</button> &nbsp;
                                        <button type="button"  class="btn btn-primary">Close</button> &nbsp;
                                        <button type="button"  class="btn btn-primary">Open</button>
                                    </td>
                                    
                                </tr>    

                                <tr>
                                    <td>2</td>
                                   
                                    <td>HDFC</td>
                                    <td>48074538</td>
                                    <td>Batch No</td>
                                    <td>Open</td>
                                    <td style={{width:'200px'}}>
                                         
                                        
                                        <button type="button"  class="btn btn-primary">Delete</button> &nbsp;
                                        <button type="button"  class="btn btn-primary">Close</button> &nbsp;
                                        <button type="button"  class="btn btn-primary">Open</button>
                                    </td>
                                    
                                </tr>     */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
