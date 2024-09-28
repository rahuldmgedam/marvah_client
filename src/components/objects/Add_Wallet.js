import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { CreateWallet, deleteWallet, getWalletData, statusWallet } from '../../servises/opretions/wallet';
export default function Add_Petro_Card({ dbpath1 }) {

    const [Wallet, setWallet] = useState([]);
    const [bankName, setBankName] = useState('');
    const navigate = useNavigate();

    const CreateWalletHandler = async () => {
        const data = await CreateWallet(bankName);
        setBankName("");
        getWalletDataHandler();
    }
    
    const getWalletDataHandler = async () => {
        const data = await getWalletData();
        console.log("data222222222 ", data);
        setWallet(data);
    }

    

    const deleteWalletHandler = async (id) => {
        console.log("id ", id)
        const res = await deleteWallet(id);
        await getWalletDataHandler();
    }


    const WalletStatusHandler = async (id, status) => {
        const data = await statusWallet(id, status)
    }

    useEffect(() => {
        getWalletDataHandler();
    }, [])


    return (
        <>
            <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>

                <h2 className='mt-3 text-center'>Add Wallet</h2>
                <span style={{ fontSize: '22px' }}> Date :
                    {/* {convertDateFormat(datecache)} */}
                </span>
                <div>
                    <br></br>
                    <table class="table">
                        <thead>
                            <tr className='table-secondary'>
                                <th style={{ width: '300px' }} class="col ">Bank Name</th>
                                <th className='tablebg'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row">
                                    <input type="text" value={bankName} class="form-control editableInput bigFontWeight" placeholder="Bank Name" onChange={(e) => setBankName(e.target.value)} />
                                </td>

                                <td>
                                    <button type="button" class="btn btn-primary" onClick={CreateWalletHandler}>
                                        ADD
                                    </button>
                                </td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <br></br>
                <div>
                    <br></br>
                    <table class="table">
                        <thead>
                            <tr className='table-secondary'>
                                <th className='tablebg'>Sr No</th>
                                <th className='tablebg'>Date</th>
                                <th className='tablebg'>Bank Name</th>
                                <th className='tablebg'>Status</th>
                                <th className='tablebg' style={{ width: '350px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Wallet?.map((res, index) =>
                                <tr className='hovereffect'>
                                    <td scope="row">
                                        {index + 1}
                                    </td>
                                    <td scope="row">
                                        {new Date(res?.date).toLocaleDateString()}
                                    </td>
                                    <td scope="row">
                                        {res?.bankName}
                                    </td>
                                    <td>{res?.status}</td>

                                    <td style={{ width: '180px' }}>

                                        <button type="button" id={"tank" + res?._id} class={`btn btn-danger ${res?.transaction.length ? "bg-red-300 hover:bg-red-200" : ""} `}
                                            onClick={() => res?.transaction.length ? " ": deleteWalletHandler(res?._id)}
                                        >Delete</button>&nbsp;
                                        <button type="button" id={"tank" + res.id} class="btn btn-info "
                                            onClick={() => WalletStatusHandler(res?._id, "Open")}
                                        >Open</button>&nbsp;
                                        <button type="button" id={"tank" + res.id} class="btn btn-warning "
                                            onClick={() => WalletStatusHandler(res?._id, "Close")}
                                        >Close</button>
                                    </td>
                                </tr>
                            )}



                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
