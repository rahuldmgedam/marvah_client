import React from 'react'
import './css/Sidebar.css'
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import logo from './images/petrol.jpg'
    export default function Sidebar() {

        const navigate = useNavigate();
        const isUserLoggedIn = Cookies.get('userLoggedIn');

        useEffect(() => {
            if (isUserLoggedIn !== 'true') {
                navigate('/');
            }
            else
            {
    
            }
        }, [isUserLoggedIn]);  

        const onLogout = () => {
            Cookies.set('userLoggedIn', 'false');
            navigate('/');
        }

        

    return (
        <>
            <div class='sideMainDiv'>
                <div>
                    <img class='imgClass' src={logo} />   
                </div>
                <div className='sideInfo'>
                    <center><h5>Marwah Company</h5></center>
                    Current Date : dd-mm-yy<br></br>
                    Last Entry Date : dd-mm-yy
                </div>
                <div class='sideBtn'>  
                </div>
                <div>   
                    <button class="btn sideDrop1 btn-secondary  " type="button" >
                     <Link to={"/day_start"}>
                     Home
                     </Link>
                      
                    </button>
                </div>
                <div>
                <div class="btn-group">
                        <button class="btn dropdown-to  sideDrop1 btn-secondary  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Reports
                        </button>
                        <ul class="dropdown-menu sideDrop1List">
                        {/* <li><Link class="dropdown-item" to="/mainhome">Add Tank Record</Link></li> 
                        <li><Link class="dropdown-item" to="/machineLayout"> Add Make Record</Link></li> */}
                            <li><Link class="dropdown-item" to="/PetrolReport">Petrol/HSD Report</Link></li>
                            <li><Link class="dropdown-item" to="/CreditClientReport">Credit Report</Link></li> 
                            <li><Link class="dropdown-item" to="/ExpensesReport">Expenses Report</Link></li> 
                            <li><Link class="dropdown-item" to="/BankStatements">Bank Statements Report</Link></li> 
                            <li><Link class="dropdown-item" to="/CardsReport">Cards Report</Link></li> 
                            <li><Link class="dropdown-item" to="/AdvancesHandloanReport">Advances / Handloan Report</Link></li> 
                            <li><Link class="dropdown-item" to="/OilReports">Oil Report</Link></li> 
                            <li><Link class="dropdown-item" to="">Fuel Sales Report</Link></li> 

                        </ul>
                    </div>
                </div>
                
                <div>
                    <div class="btn-group">
                        <button class="btn dropdown-to  sideDrop1 btn-secondary  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Add Account
                        </button>
                        <ul class="dropdown-menu sideDrop1List">
                        <li><Link class="dropdown-item" to="/mainhome">Add Tank Record</Link></li> 
                        <li><Link class="dropdown-item" to="/machineLayout"> Add Make Record</Link></li>
                            {/* <li><Link class="dropdown-item" to="/Tanks">Add Tanks</Link></li> 
                            <li><Link class="dropdown-item" to="/Machine">Add Machines</Link></li> */}
                            <li><Link class="dropdown-item" to="/Nozzles">Add Nozzles</Link></li>
                            <li><Link class="dropdown-item" to="/Add_Bank">Add Banks</Link></li>
                            <li><Link class="dropdown-item" to="/add_client2" >Add Client</Link></li>
                            <li><Link class="dropdown-item" to="/add_Credit" >Add Credit</Link></li>
                            <li><Link class="dropdown-item" to="/add_client" >Add Handloan Client</Link></li>
                            <li><Link class="dropdown-item" to="/add_staff" >Add Staff</Link></li>
                            <li><Link class="dropdown-item" to="/Oil_Products" >Add Oil Product</Link></li>
                            <li><Link class="dropdown-item" to="/Add_Oil_Pouches" >Add Oil Pouches</Link></li>
                            <li><Link class="dropdown-item" to="/Petrol_Products" >Add Petrol Product</Link></li>
                            <li><Link class="dropdown-item" to="/add_payments_mode" >Add Payments Mode</Link></li>      
                            <li><Link class="dropdown-item" to="/Add_Petro_Card" >Add Petro Card</Link></li>                            
                            <li><Link class="dropdown-item" to="/Add_Wallet" >Add Wallet</Link></li>      
                            <li><Link class="dropdown-item" to="/Add_Expenses_Topic" >Add Expenses Topic</Link></li>      
                        </ul>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <div>
                    <button className='bg-green-600 px-4 py-2 rounded-lg ml-16 text-center text-white font-bold uppercase' type="button" onClick={onLogout} >
                     admin login
                    </button>
                </div>

                <div>
                <h2 className='mt-6 ml-10 text-md text-white font-bold'>Designed & Developed  by </h2>
                 <h2 className=' ml-6 p-1 text-white  text-md font-bold '> Royals Webtech Pvt. Ltd. ©️2024</h2>
                </div>
                <br>
                </br>
                {/* <footer className='ml-4 p-2 rounded-lg bg-gray-100 text-black font-bold mr-4'>Designed & Developed by Royals Webtech Pvt. Ltd. ©️2024</footer>   */}

            </div>  

        </>
    )
    }   
