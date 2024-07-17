import React from 'react'
import './css/Navbar.css'
import logo from './images/petrol.jpg'
import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() {

    
  return (
    <>
        <div className='position-sticky navMainDiv shadow-lg rounded' style={{position: '-webkit-sticky', position: 'sticky', top: '0', zIndex:'2'}}>
            <div>
                <button class="btn navDrop1 btn-secondary" type="button" >
                   <Link class="dropdown-item" to="/Day_Start">Day Start</Link>
                </button>
            </div>
            <div>
            <div class="btn-group">
                        <button class="btn dropdown-to  navDrop1 btn-secondary  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Advances
                        </button>
                        <ul class="dropdown-menu navDrop1List">
                            <li><Link class="dropdown-item" to="/Advances">Bank Income</Link></li> 
                            <li><Link class="dropdown-item" to="/Handloans">Handloans</Link></li>
                        </ul>
                    </div>
            </div>
            <div>
                    <div class="btn-group">
                        <button class="btn dropdown-to  navDrop1 btn-secondary  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Oil
                        </button>
                        <ul class="dropdown-menu navDrop1List">
                            <li><Link class="dropdown-item" to="/Oil_Purchase">Purchase</Link></li> 
                            <li><Link class="dropdown-item" to="/Oil_Godown">Godown</Link></li>
                            <li><Link class="dropdown-item" to="/Oil_Retail">Retail Sales</Link></li>
                            <li><Link class="dropdown-item" to="/Oil_Pouches">Pouches</Link></li>
                        </ul>
                    </div>
            </div>
            <div>
                    <div class="btn-group">
                        <button class="btn dropdown-to  navDrop1 btn-secondary  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            petrol
                        </button>
                        <ul class="dropdown-menu navDrop1List">
                            <li><Link class="dropdown-item" to="/Petrol_Decantation">Decantation</Link></li> 
                            <li><Link class="dropdown-item" to="/Petrol_Invoice_Feeding">Invoice Feeding   </Link></li>
                            <li><Link class="dropdown-item" to="/Fuel_Sales">Fuel Sales</Link></li>
                            <li><Link class="dropdown-item" to="/Variation">Variation</Link></li>
                        </ul>
                    </div>
            </div>
           
            <div>
                    <div class="btn-group">
                        <button class="btn dropdown-to  navDrop1 btn-secondary  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Credit
                        </button>
                        <ul class="dropdown-menu navDrop1List">
                           
                            <li><Link class="dropdown-item" to="/credit_client">Credit Client</Link></li>
                            <li><Link class="dropdown-item" to="/Generate_Bills">Generate Bills</Link></li> 
                            <li><Link class="dropdown-item" to="/Client_Cheque">Cheque Entry</Link></li> 
                        </ul>
                    </div>
            </div>
            <div class="btn-group">
                        <button class="btn dropdown-to  navDrop1 btn-secondary  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Cards
                        </button>
                        <ul class="dropdown-menu navDrop1List">
                            <li><Link class="dropdown-item" to="/Petro_Card">Petro Card</Link></li>
                            <li><Link class="dropdown-item" to="/Wallet_Payment">Wallet Payment</Link></li>
                        </ul>
                 
            </div>
            <div>
                <button class="btn navDrop1 btn-secondary" type="button" style={{width:'130px'}}>
                   <Link class="dropdown-item" to="/Bank_Deposits">Bank Deposits</Link>
                </button>
            </div>
            <div>
            <div class="btn-group">
                        <button class="btn dropdown-to  navDrop1 btn-secondary  " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Statement
                        </button>
                        <ul class="dropdown-menu navDrop1List">
                            <li><Link class="dropdown-item" to="/Statement_Entry">Statement Entry</Link></li> 
                            <li><Link class="dropdown-item" to="/Bank_Statement">Bank Statement</Link></li> 
                            <li><Link class="dropdown-item" to="/Staff_Salary">Staff Salary</Link></li> 
                        </ul>
                    </div>
            </div>
            
            <div>
                <button class="btn navDrop1 btn-secondary" type="button" style={{width:'110px'}}>
                   <Link class="dropdown-item" to="/Daily_Expenses">Expenses</Link>
                </button>
            </div>
            <div>
                <button class="btn navDrop1 btn-secondary" type="button" style={{width:'110px'}}>
                   <Link class="dropdown-item" to="/Day_End">Day End</Link>
                </button>
            </div>
            <div>
                
            </div>
        </div>
    </>
  )
}
