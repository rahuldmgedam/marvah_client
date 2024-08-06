import React, { useEffect, useState } from 'react';
import '../css/Tank.css';
import axios from 'axios';
import { FaAngleDown } from "react-icons/fa6";


const init = {
    ProductName: "",
    rate: "",
    taxamount: "",
    vat: "",
    cess: "",
    tcs: "",
  }


export default function Client() {
  const [updateLoading, setUpdateLoading] = useState(false)
  const [formData, setFormData] = useState(init);
const [data, setData] = useState([])
const [model, setModel] = useState(false)
const [edit, setEdit] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };


  const handleAdd = () => {

    axios.post("http://localhost:4000/petrol/create", formData)
    .then((res)=> {
      if(res.data.state){
        alert(res.data.msg)
        setFormData(init)
        fetPetrol()
      }
    })
    .catch((error)=> {
        console.log(error.message)
    })
  };

  const fetPetrol = () => {
    console.log("data", formData);
    axios.get("http://localhost:4000/petrol")
    .then((res)=> {
      if(res.data){
       setData(res.data)
      }
    })
    .catch((error)=> {
        console.log(error.message)
    })
  };

  useEffect(()=> {
fetPetrol()
  },[])


const handleUpdate = (props) => {
  setEdit(props)
setModel(prev => !prev)
}

const handleChangeUpdate = (e) => {
  const { name, value } = e.target;
  setEdit((prevFormData) => ({
    ...prevFormData,
    [name]: value
  }));
}


const handleUpdatepetrol = async() => {
  setUpdateLoading(true)
 const res = await  axios.patch(`http://localhost:4000/petrol/update/${edit._id}`, edit) 
if(res.data.success){
alert(res.data.msg)
setUpdateLoading(false)
setModel(false)
fetPetrol()
}
}

const handleDelete = async(id) => {
  
  const res = await  axios.delete(`http://localhost:4000/petrol/delete/${id}`) 
 if(res.data.success){
 alert(res.data.msg)
 fetPetrol()
 }
}



  return (
    <>
      <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>
       
        <h2 className='mt-3 text-center'>Add Index - Create Petrol / HSD Invoice</h2>
        <div>
          <br></br>
          <table className="table">
            <thead>
              <tr className='table-secondary'>
                <th className=''>Product</th>
                <th className=''>Rate/PerUnit</th>
                <th className=''>Taxable Amount per unit</th>
                <th className=''>VAT/LST %</th>
                <th className=''>CESS per unit</th>
                <th className=''>TCS per unit</th>
               
                <th className=''>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td scope="row">
  <select
    name="ProductName"
    value={formData.ProductName}
    onChange={handleChange}
    className="form-control editableInput w-[90px]"
  >
 
    <option value="">product</option>
    <option value="MS">MS</option>
    <option value="SPEED">SPEED</option>
    <option value="HSD">HSD</option>
    
  </select>
</td>
                <td>
                  <input
                    type="text"
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    className="form-control editableInput "
                 
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="taxamount"
                    value={formData.taxamount}
                    onChange={handleChange}
                    className="form-control editableInput "
                  
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="vat"
                    value={formData.vat}
                    onChange={handleChange}
                    className="form-control editableInput "
               
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="cess"
                    value={formData.cess}
                    onChange={handleChange}
                    className="form-control editableInput "
                   
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="tcs"
                    value={formData.tcs}
                    onChange={handleChange}
                    className="form-control editableInput "
                   
                  />
                </td>
               
               
               
                <td>
                
                    <button type="button"
        class="px-3 py-1.5 rounded-lg text-white text-sm tracking-wider  border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-300"  onClick={handleAdd}>ADD</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br></br>
        <div>
          <br></br>
          <div class="overflow-x-auto font-[sans-serif]">
      <table class="min-w-full bg-white">
        <thead class=" whitespace-nowrap bg-slate-300">
          <tr>
           
            <th class="p-0 text-center text-sm border-2 border-black ">
           PRODUCT
            </th>
            <th class="p-0 text-center text-sm border-2 border-black">
              RATE/UNIT
            </th>
            <th class="p-0 text-center text-sm border-2 border-black ">
              TAXABLE AMOUNT
            </th>
            <th class="p-0 text-center text-sm border-2 border-black ">
              VAT/LST
            </th>
            <th class="p-0 text-center text-sm border-2 border-black ">
              CESS
            </th>
            <th class="p-0 text-center text-sm border-2 border-black ">
              TCS
            </th>
          
            <th class="p-0 text-center text-sm border-2 border-black">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody class="whitespace-nowrap">
         {data && data.map((item)=>  <tr class="">
            
            <td class="border-2 text-center text-sm  border-gray-500">
              {item.ProductName}
            </td>
            <td class="border-2 text-sm text-center border-gray-500" >
              {item.rate}
            </td>
            <td class="border-2 text-center text-sm border-gray-500">
             {item.taxamount}
            </td>
            <td class="border-2 text-sm text-center border-gray-500">
              {item.vat}
            </td>
            <td class="border-2 text-sm text-center border-gray-500">
              {item.cess}
            </td>
            <td class="border-2 text-sm text-center border-gray-500">
              {item.tcs}
            </td>
        
            <td class="border-2 text-center border-gray-500">
             
               <button type="button"
        class="px-1 py-1 rounded-lg text-white text-sm tracking-wider  border border-current outline-none bg-green-700 hover:bg-green-800 active:bg-green-700" onClick={()=>handleUpdate(item)}>EDIT</button>
             
               <button type="button"
        class="px-1 py-1 rounded-lg text-white text-sm tracking-wider  border border-current outline-none bg-red-700 hover:bg-red-800 active:bg-red-700" onClick={() => handleDelete(item._id)}>Delete</button>
            </td>
          </tr>)}
         
        </tbody>
      </table>
    </div>
        </div>
      </div>

{
  model && <div
  class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
  <div class="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
      <div class="flex items-center">
          <h3 class="text-blue-600 text-xl font-bold flex-1">Update</h3>
          <svg onClick={()=> setModel(false)} xmlns="http://www.w3.org/2000/svg" class="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
              viewBox="0 0 320.591 320.591">
              <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"></path>
              <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"></path>
          </svg>
      </div>

      <form class="space-y-4 mt-8">
     <div className='flex gap-2'> <div>
        <labe class="mb-2 text-sm block">Product</labe>
        <input type='text' name='ProductName' value={edit.ProductName}  onChange={handleChangeUpdate}
          class="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>

      <div>
        <labe class="mb-2 text-sm block">Rate/PerUnit</labe>
        <input type='text' name='rate' value={edit.rate} onChange={handleChangeUpdate}
          class="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      </div>

      <div className='flex gap-2'> <div>
        <labe class="mb-2 text-sm block">Taxable Amount</labe>
        <input type='text' value={edit.taxamount} name='taxamount' onChange={handleChangeUpdate}
          class="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>

      <div>
        <labe class="mb-2 text-sm block">VAT/LST</labe>
        <input type='text' value={edit.vat} name='vat'  onChange={handleChangeUpdate}
          class="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      </div>
      <div className='flex gap-2'> <div>
        <labe class="mb-2 text-sm block">CESS</labe>
        <input type='text' value={edit.cess} name='cess' onChange={handleChangeUpdate}
          class="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>

      <div>
        <labe class="mb-2 text-sm block">TCS</labe>
        <input type='text' value={edit.tcs} name='tcs' onChange={handleChangeUpdate}
          class="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      </div>
      <div className='flex gap-2'> 
    
      </div>
     <div className='text-center  '>
   {!updateLoading ?   <button type="button"
        class="px-5 py-2 inline-flex items-center rounded-lg text-white text-base tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333] active:bg-black" onClick={handleUpdatepetrol}>
      
        UPDATE
      </button> :  <button type="button"
        class="px-5 py-2 inline-flex items-center rounded-lg text-white text-base tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333] active:bg-black">
        Loading
        <svg xmlns="http://www.w3.org/2000/svg" width="18px" fill="#fff" class="ml-2 inline animate-spin"
          viewBox="0 0 24 24">
          <path
            d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"
            data-original="#000000" />
        </svg>
      </button>} 
     </div>
         
      </form>
  </div>
</div>
  
 
}


    </>
  );
}