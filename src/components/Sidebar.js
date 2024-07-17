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
                < i class="fa-solid fa-house"></i>
                </div>
                <div>   
                    <button class="btn sideDrop1 btn-secondary  " type="button" >
                        Home
                    </button>
                </div>
                <div>
                <div class="btn-group">
                        <button class="btn dropdown-to  sideDrop1 btn-secondary  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Reports
                        </button>
                        <ul class="dropdown-menu sideDrop1List">
                            <li><Link class="dropdown-item" to="/PetrolReport">Petrol/HSD Report</Link></li>
                            <li><Link class="dropdown-item" to="/CreditClientReport">Credit Report</Link></li> 
                            <li><Link class="dropdown-item" to="/ExpensesReport">Expenses Report</Link></li> 
                            <li><Link class="dropdown-item" to="/BankStatements">Bank Statements Report</Link></li> 
                            <li><Link class="dropdown-item" to="/CardsReport">Cards Report</Link></li> 
                            <li><Link class="dropdown-item" to="/AdvancesHandloanReport">Advances / Handloan Report</Link></li> 
                            <li><Link class="dropdown-item" to="/OilReports">Oil Report</Link></li> 
                        </ul>
                    </div>
                </div>
                
                <div>
                    <div class="btn-group">
                        <button class="btn dropdown-to  sideDrop1 btn-secondary  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Add Menu
                        </button>
                        <ul class="dropdown-menu sideDrop1List">
                            <li><Link class="dropdown-item" to="/Tanks">Add Tanks</Link></li> 
                            <li><Link class="dropdown-item" to="/Machine">Add Machines</Link></li>
                            <li><Link class="dropdown-item" to="/Nozzles">Add Nozzles</Link></li>
                            <li><Link class="dropdown-item" to="/Add_Bank">Add Banks</Link></li>
                            <li><Link class="dropdown-item" to="/add_client2" >Add Client</Link></li>
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
                    <button class="btn sideDrop1 bg-primary " type="button" onClick={onLogout} >
                        Log Out
                    </button>
                </div>
                <br></br>
            </div>    
        </>
    )
    }   
