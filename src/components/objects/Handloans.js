import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import Client from "./Client";
export default function Handloans({ dbpath1 }) {
  const [tanks, setTanks] = useState([]);
  const [nozzles, setNozzles] = useState([]);
  const [machinen, setMachinen] = useState([]);

  const [clients, setClients] = useState([]);
  const [history, setHistory] = useState([]);
  const [thistory, setTHistory] = useState([]);

  const [nozzle_name, setNozzle_name] = useState("");
  const [product, setProduct] = useState("");
  const [machine, setMachine] = useState("");
  const [smachine, setSMachine] = useState("");
  const [side, setSide] = useState("");
  const [nozzle_no, setNozzle_no] = useState("");
  const [op_meter_reading, setOp_meter_reading] = useState("");

  const [particular, setParticular] = useState("");
  const [partyname, setPartyname] = useState("");
  const [date, setdate] = useState("");
  const [amount, setAmount] = useState("");
  const [narration, setNarration] = useState("");
  const [balance, setBalance] = useState("0");
  const [tgiven, setTgiven] = useState("");
  const [trecived, setTrecived] = useState("");





  const navigate = useNavigate();

  useEffect(() => {}, []);


  //rahul code 16th july
const [handloan,setHandloan] = useState([])

  const fetchHandloan = () => {
    axios
      .get("http://localhost:4000/handloan/")
      .then((res) => {
        console.log(" handloan res", res.data);
        setHandloan(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchHandloan();
  }, []);

  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 mb-2 bg-blue-400 text-white p-2 text-2xl uppercase text-center">
          Handloans/Advances
        </h2>
      

        <div className="flex justify-between">
        <span style={{ fontSize: "22px" }}> Date : {}</span>
          <Link className="bg-violet-700 px-2 py-1 rounded-md text-white" to={"/add_client"}>
            {" "}
            Add Client
          </Link>
        </div>

        {/* <div>
<Route
          path="/add_client"
          element={
            <>
              <div style={{ display: "flex" }}>
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Navbar />
                  <Client  />
                </div>
              </div>
            </>
          }
        />
</div> */}

        <div>
          <h4>
            
            <span style={{ marginLeft: "800px", marginTop: "10px" }}>
              Balance :
            </span>
            {balance}
          </h4>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Party Name</th>
                <th className="tablebg">Voucher Type</th>

                <th className="tablebg">Amount</th>

                <th className="tablebg">Narration</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <select
                    class="form-select  editableInput bigFontWeight"
                    value={partyname}
                    aria-label="Default select example"
                    onChange={(e) => {
                      setPartyname(e.target.value);
                    }}
                  >
                    <option selected>- Party Name -</option>
                    {handloan.map((rest) => (
                      <option value={rest.party_name}>
                        {rest.party_name}
                      </option>
                    ))}
                  </select>
                </td>

                <td scope="row">
                  <select
                    class="form-select  editableInput bigFontWeight"
                    aria-label="Default select example"
                    value={particular}
                    onChange={(e) => setParticular(e.target.value)}
                  >
                    <option selected>- Voucher Type -</option>
                    <option value="Given">Given / Out</option>
                    <option value="Recived">Recived / In</option>
                  </select>
                </td>

                {/*  <td>
                            
                                <select class="form-select  editableInput bigFontWeight" aria-label="Default select example" value={product} /* onChange={displaySelectedProduct(product)} onChange={(e) => setProduct(e.target.value)}>
                                <option selected>- Product -</option>
                                    {tanks.map((rest) => (
                                        <option value={rest.product}>{rest.product}</option>
                                    ))}
                                </select>
                               
                            </td> */}

                <td>
                  <input
                    type="text"
                    class="form-control  editableInput bigFontWeight"
                    placeholder="Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </td>

                <td>
                  <input
                    type="text"
                    class="form-control  editableInput bigFontWeight"
                    placeholder="Narration"
                    onChange={(e) => setNarration(e.target.value)}
                  />
                </td>
                <td>
                  <button type="button" class="btn btn-primary">
                    SAVE{" "}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <br></br>
          Todays Transactions: <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Party Name</th>
                <th className="tablebg">Voucher Type - Given</th>
                <th className="tablebg">Voucher Type - Recived</th>
                <th className="tablebg">Balance</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {thistory.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td>{res.client_name}</td>
                  <td>{res.amount_given}</td>
                  <td>{res.amount_rcvd}</td>
                  <td>{res.balance}</td>
                  <td style={{ width: "50px" }}>
                    <button
                      type="button"
                      style={{ height: "30px", paddingTop: "2px" }}
                      id={"tank" + res.transaction_id}
                      class="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {/* <tr>
                                  <td id="ddun">Haldirams</td>
                                      <td id="dmake">Recived</td>   
                                      <td id="dserial_no">0</td>
                                    <td id="dserial_no">5000</td>
                                    <td id="dproduct">12000</td>
                                    <td id="dnozzles_in_mpd">Cash</td>
                                 
                                </tr>   
                                <tr>
                                <td id="dconnected_tanks">15-10-2023</td>
                                      <td id="dmake">Given</td>   
                                    <td id="dserial_no">3000</td>
                                    <td id="dserial_no">0</td>
                                    <td id="dproduct">17000</td>
                                    <td id="dnozzles_in_mpd">Cash</td>
                                </tr>   
                                <tr>
                                <td id="dconnected_tanks">02-10-2023</td>
                                      <td id="dmake">Recived</td>   
                                      <td id="dserial_no">0</td>
                                    <td id="dserial_no">1000</td>
                                    
                                    <td id="dproduct">14000</td>
                                    <td id="dnozzles_in_mpd">Cash</td>
                                </tr>   
                                <tr>
                                <td id="dconnected_tanks">25-09-2023</td>
                                
                                      <td id="dmake">Given</td>   
                                    <td id="dserial_no">2000</td>
                                    <td id="dserial_no">0</td>
                                    <td id="dproduct">15000</td>
                                    <td id="dnozzles_in_mpd">Cheque</td>
                                 
                                </tr>    */}
              {/*    <tr>
                                  <td><b>Closing Balance</b></td>
                                  <td></td>
                                  
                                  <td><b>{tgiven}</b></td>
                                  <td><b>{trecived}</b></td>
                                  <td></td>
                                  <td></td>
                                </tr> */}
            </tbody>
          </table>
          <br></br>
          Client Transaction History: <br></br>
          <span>Party Name : {partyname}</span> <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Date</th>
                <th className="tablebg">Particulars</th>
                <th className="tablebg">Amount Given</th>

                <th className="tablebg">Amount Rcvd </th>
                <th className="tablebg">balanceC</th>
                <th className="tablebg">Narration</th>
              </tr>
            </thead>
            <tbody>
              {history.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td>{res.date}</td>

                  <td>{res.particular}</td>

                  <td>{res.amount_given}</td>
                  <td>{res.amount_rcvd}</td>
                  <td>{res.balance}</td>
                  <td>{res.narration}</td>

                  {/*   <td style={{width:'50px'}}>
                                       
                                        <button type="button" id={"tank"+res.tank_no} class="btn btn-primary" onClick={() => onMoveRetail(res.product_id)}>Move</button>
                                    </td> */}
                </tr>
              ))}

              {/*
                                 <tr>
                                  <td id="ddun">Haldirams</td>
                                      <td id="dmake">Recived</td>   
                                      <td id="dserial_no">0</td>
                                    <td id="dserial_no">5000</td>
                                    <td id="dproduct">12000</td>
                                    <td id="dnozzles_in_mpd">Cash</td>
                                 
                                </tr>   
                                <tr>
                                <td id="dconnected_tanks">15-10-2023</td>
                                      <td id="dmake">Given</td>   
                                    <td id="dserial_no">3000</td>
                                    <td id="dserial_no">0</td>
                                    <td id="dproduct">17000</td>
                                    <td id="dnozzles_in_mpd">Cash</td>
                                </tr>   
                                <tr>
                                <td id="dconnected_tanks">02-10-2023</td>
                                      <td id="dmake">Recived</td>   
                                      <td id="dserial_no">0</td>
                                    <td id="dserial_no">1000</td>
                                    
                                    <td id="dproduct">14000</td>
                                    <td id="dnozzles_in_mpd">Cash</td>
                                </tr>   
                                <tr>
                                <td id="dconnected_tanks">25-09-2023</td>
                                
                                      <td id="dmake">Given</td>   
                                    <td id="dserial_no">2000</td>
                                    <td id="dserial_no">0</td>
                                    <td id="dproduct">15000</td>
                                    <td id="dnozzles_in_mpd">Cheque</td>
                                 
                                </tr>    
                                <tr>
                                  <td><b>Closing Balance</b></td>
                                  <td></td>
                                  
                                  <td><b>{tgiven}</b></td>
                                  <td><b>{trecived}</b></td>
                                  <td></td>
                                  <td></td>
                                </tr> */}
            </tbody>
          </table>
        </div>
        <br></br>
      </div>
    </>
  );
}
