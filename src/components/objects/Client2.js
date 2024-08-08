import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";

const init = {
  partyName : "",
  Number : "",
  Remark :"",
  Cheque_Amount : "",
  Cheque_Date : "",
  Cheque_number : "",
  DespositeDetails : "",
  Desposite_Bank : "",
  Desposite_Date : ""

}


export default function Client2() {
 const [clientData, setClientData] = useState([])
const [formData, setFormData] = useState(init)

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};


const handleSubmit = async() => {
  try {
    const res = await axios.post("http://localhost:4000/credit_client/create", formData)
    if(res.data){
     console.log(res.data);
     
    }
  } catch (error) {
    console.log(error.message);
    
  }
  
}

useEffect(()=>{
  const FetchData = async() => {
    try {
      const res = await axios.get("http://localhost:4000/credit_client")
      if(res.data){
       console.log(res.data.creditClient);
       setClientData(res.data.creditClient)
       
      }
    } catch (error) {
      console.log(error.message);
      
    }
    
  }
  FetchData()
},[])

  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center">Add Client</h2>
       
        <div>
          <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Party Name</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact no.</th>
             
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deposite Details</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cheque No.</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cheque Date</th>
               
               
              </tr>
            </thead>
            
            <tbody>
              <tr>
                {/* party_name */}
                <td scope="row">
                  <input
                  name="partyName"
                  value={formData.partyName}
                  onChange={handleChange}
                    type="text"
                    placeholder="partyName"
                    class="form-control  editableInput bigFontWeight"
                  />
                </td>
            
            {/* contact_no */}
                <td>
                  <input
                    type="text"
                    class="form-control  editableInput w-[130px] bigFontWeight"
                    name="Number"
                    value={formData.Number}
                    onChange={handleChange}
                     placeholder="Number"
                  />
                </td>
            
          
             
             {/* DespositeDetails */}
                <td>
                  <input
                    type="text"
                    class="form-control  editableInput bigFontWeight" 
                    name="DespositeDetails"
                    value={formData.DespositeDetails}
                    onChange={handleChange}
                  />
                </td>
              
              {/* Cheque_number */}
                <td>
                  <input
                    type="text"
                    class="form-control  editableInput bigFontWeight" 
                    name="Cheque_number"
                    value={formData.Cheque_number}
                    onChange={handleChange}
                  />
                </td>
              
              {/* Cheque_Date */}
                <td>
                  <input
                    type="date"
                    class="form-control  editableInput bigFontWeight"
                    name="Cheque_Date"
                    value={formData.Cheque_Date}
                    onChange={handleChange} 
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <table class="table">
            <thead>
              <tr className="table-secondary">
              
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cheque Amount</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deposite Bank</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deposite Date</th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Remarks</th>
               
              </tr>
            </thead>
            
            <tbody>
           <tr>
 
              {/* Cheque_Amount */}
                <td>
                  <input
                    type="text"
                    class="form-control  editableInput bigFontWeight" 
                    name="Cheque_Amount"
                    value={formData.Cheque_Amount}
                    onChange={handleChange} 
                  />
                </td>
              
              {/* Desposite_Bank */}
                <td>
                  <input
                    type="text"
                    class="form-control  editableInput bigFontWeight" 
                    name="Desposite_Bank"
                    value={formData.Desposite_Bank}
                    onChange={handleChange} 
                  />
                </td>

{/* Desposite_Date */}
                <td>
                  <input
                    type="date"
                    class="form-control  editableInput bigFontWeight" 
                    name="Desposite_Date"
                    value={formData.Desposite_Date}
                    onChange={handleChange} 
                  />
                </td>
                  {/* Remark */}
                  <td>
                  <input
                    type="text"
                    class="form-control  editableInput bigFontWeight"
                    name="Remark"
                    value={formData.Remark}
                    onChange={handleChange}
                  />
                </td>

              </tr>
            </tbody>
          </table>
        <div>
            </div>  <button type="button"
        class="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-blue-700 hover:bg-blue-800 active:bg-blue-700"onClick={handleSubmit}>ADD</button>
        </div>
        <br></br>
        <div>
          <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className=" text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Party Name</th>
                <th className=" text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact no.</th>
                <th className=" text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deposite Details</th>
                <th className=" text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cheque No.</th>
                <th className=" text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cheque Date</th>
                <th className=" text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cheque Amount</th>
                <th className=" text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deposite Bank</th>
                <th className=" text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Deposite Date</th>
                <th className=" text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Remarks</th>
                
                <th className="py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {clientData.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td>{res.partyName}</td>
                  <td>{res.Number}</td>
                  <td>{res.DespositeDetails}</td>
                  <td>{res.Cheque_number}</td>
                  <td>{res.Cheque_Date}</td>
                  <td>{res.Cheque_Amount}</td>
                  <td>{res.Desposite_Bank}</td>
                  <td>{res.Desposite_Date}</td>
                  <td>{res.Remark}</td>
                  <td style={{ width: "150px" }}>
                    <button
                      type="button"
                      id={"tank" + res.client_id}
                      class="btn btn-danger "
                  
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
