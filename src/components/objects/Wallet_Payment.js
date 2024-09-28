import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { createWalletTran, deleteWalletTran, getWalletData, getWalletTrans } from '../../servises/opretions/wallet';
import { toWords } from 'number-to-words';
export default function Wallet_Payment({ dbpath1 }) {

    const [wallet, setWallet] = useState([]);
    const [tHistory, setTHistory] = useState([]);
    const [name, setName] = useState('');
    const [noOfTran, setNTrans] = useState('');
    const [amount, setAmonut] = useState('');

    const [formData, setformData] = useState({
        walletId: '',
        noOfTran: '',
        amount: '',
    })

    console.log("FormData ", formData);

    const handleChenge = (e) => {
        const { name, value } = e.target

        setformData((pre) => ({
            ...pre,
            [name]: value
        }))
    }

    const createWalletTranHandler = async () => {
        const data = await createWalletTran(formData);
        getWalletTransHandler()

        setformData((pre) => ({
            ...pre,
            walletId: '',
            noOfTran: '',
            amount: '',
        }))
    }

    const getWalletDataHandler = async () => {
        const data = await getWalletData();
        // console.log("data ", data);
        setWallet(data);
    }

    const deleteWalletTranHandler = async (tranId) => {
        const data = await deleteWalletTran(tranId);
        getWalletTransHandler()
    }

    const getWalletTransHandler = async () => {
        const data = await getWalletTrans();
        setTHistory(data);
    }

    useEffect(() => {
        getWalletDataHandler();
        getWalletTransHandler();
    }, [])


    const numberToWords = (num) => {
        const ones = [
            '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
            'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
            'seventeen', 'eighteen', 'nineteen'
        ];

        const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

        const getWordForThreeDigitNumber = (n) => {
            if (n === 0) return '';
            let word = '';
            if (n > 99) {
                word += ones[Math.floor(n / 100)] + ' hundred ';
                n = n % 100;
            }
            if (n > 19) {
                word += tens[Math.floor(n / 10)] + ' ';
                n = n % 10;
            }
            if (n > 0) {
                word += ones[n] + ' ';
            }
            return word.trim();
        };

        const convertToIndianNumberingWords = (n) => {
            if (n === 0) return 'zero';

            let result = '';
            const crore = Math.floor(n / 10000000);
            const lakh = Math.floor((n % 10000000) / 100000);
            const thousand = Math.floor((n % 100000) / 1000);
            const hundred = Math.floor((n % 1000) / 100);

            const remainder = n % 100;

            if (crore > 0) {
                result += getWordForThreeDigitNumber(crore) + ' crore, ';
            }
            if (lakh > 0) {
                result += getWordForThreeDigitNumber(lakh) + ' lakh, ';
            }
            if (thousand > 0) {
                result += getWordForThreeDigitNumber(thousand) + ' thousand, ';
            }
            if (hundred > 0) {
                result += ones[hundred] + ' hundred, ';
            }
            if (remainder > 0) {
                result += getWordForThreeDigitNumber(remainder);
            }

            return result.trim();
        };

        return convertToIndianNumberingWords(num);
    };




    return (
        <>
            <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>

                <h2 className='mt-3 text-center'>Wallet Payment</h2>
                <span style={{ fontSize: '22px' }}> Date :
                    {new Date().toLocaleDateString()}
                </span>
                <div>
                    <br></br>
                    <table class="table" >
                        <thead>
                            <tr className='table-secondary'>
                                <th className='tablebg'>Wallet Name</th>
                                <th className='tablebg'>Number Of Trans</th>
                                <th className='tablebg'>Amount</th>
                                <th className='tablebg'>Amount</th>
                                <th className='tablebg'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td scope="row" >
                                    <select name='walletId' class="form-select editableInput bigFontWeight" aria-label="Default select example" value={formData?.walletId} onChange={(e) => setformData((pre) => ({
                                        ...pre,
                                        [e.target.name]: e.target.value
                                    }))}>
                                        <option selected>- select -</option>
                                        {wallet?.map((rest) => (
                                            <option value={rest._id}>{rest.bankName}</option>
                                        ))}
                                    </select>
                                </td>
                                <td scope="row" className=' w-[20%]'>
                                    <input type="text" name='noOfTran' value={formData?.noOfTran} class="form-control editableInput bigFontWeight" placeholder="Number of Trans" onChange={handleChenge} />
                                </td>
                                <td scope="row" className=' w-[20%]'>
                                    <input type="text" name='amount' value={formData?.amount} class="form-control editableInput bigFontWeight" placeholder="Amount" onChange={handleChenge} />
                                </td>
                                <td scope="row" className=' w-[25%]'>
                                    <input
                                        type="text"
                                        name="amount"
                                        // value={formData?.amount ? toWords(Number(formData?.amount)) : ""}
                                        value={formData?.amount ? numberToWords(Number(formData?.amount)) : ""}
                                        className="form-control editableInput bigFontWeight w-full capitalize"
                                        placeholder="Amount"
                                    />
                                </td>
                                <td ><button type="button" class="btn btn-primary"
                                    onClick={createWalletTranHandler}
                                >ADD</button></td>
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

                                <th className='tablebg'>Wallet Name</th>
                                <th className='tablebg'>Total Transactions</th>
                                <th className='tablebg'>Amount</th>
                                <th className='tablebg'>Date</th>
                                <th className='tablebg' style={{ width: '150px' }}>Action</th>

                            </tr>
                        </thead>
                        <tbody>

                            {tHistory?.map((res, index) =>
                                <tr className='hovereffect' key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {new Date(res?.date).toLocaleDateString()}
                                    </td>
                                    <td>{res.wallet?.bankName}</td>
                                    <td>{res?.noOfTran}</td>
                                    <td>{res.amount}</td>
                                    <td>
                                        <button type="button" style={{ height: '30px', paddingTop: '2px' }} id={"data" + res.id} class="btn btn-danger"
                                            onClick={() => deleteWalletTranHandler(res._id)}
                                        >Delete</button> &nbsp;&nbsp;
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div style={{ marginLeft: '550px' }}><span>Total Amount : <span id='wallet'>0</span></span></div>
                </div>
            </div>
        </>
    )
}
