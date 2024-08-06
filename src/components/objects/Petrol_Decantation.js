import React, { useState, useEffect } from "react";
import "../css/Tank.css";
import axios from "axios";

const init = {
  invoiceNumber: "",
  mskl: "",
  speedkl: "",
  hsdkl: "",
  totalkl: "",
  tank1: "",
  tank2: "",
  tank3: "",
  tanktotalkl: "",
};

export default function Client() {
  const [decantation, setDecantation] = useState(init);
  const [data, setData] = useState([]);
  const [petrolInvoice, setPetrolInvoice] = useState([]);
  const [ms, setMs] = useState("");
  const [hsd, sethsd] = useState("");
  const [speed, setSpeed] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState("");
  
  useEffect(() => {
    const totalkl =
      Number(decantation.mskl) +
      Number(decantation.speedkl) +
      Number(decantation.hsdkl);
    const tanktotalkl =
      Number(decantation.tank1) +
      Number(decantation.tank2) +
      Number(decantation.tank3);
    setDecantation((prevFormData) => ({
      ...prevFormData,
      totalkl,
      tanktotalkl,
    }));
  }, [
    decantation.mskl,
    decantation.hsdkl,
    decantation.speedkl,
    decantation.tank1,
    decantation.tank2,
    decantation.tank3,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "invoice") {
     
      setSelectedInvoice(value); 
    }
    setDecantation((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const formattedData = {
      ...decantation,
      mskl: ms ? ms : 0,
      hsdkl: hsd ? hsd : 0,
      speedkl: speed ? speed : 0,
      totalkl: Number(decantation.totalkl),
      tank1: Number(decantation.tank1),
      tank2: Number(decantation.tank2),
      tank3: Number(decantation.tank3),
      tanktotalkl: Number(decantation.tanktotalkl),
    };
    console.log("data",formattedData);

    axios
      .post("http://localhost:4000/petroldecantation/create", formattedData)
      .then((res) => {
        if (res.data.state) {
          alert(res.data.msg);
          console.log("resss",res.data);
          handleUpdateInvoice()
          fetchData();
          setDecantation(init);
          setMs("")
          sethsd("")
      
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleUpdateInvoice = async()=> {
 try {
  const res = axios.patch(`http://localhost:4000/petrolInvoiceFeeding/updateshow/${selectedInvoice}`)
    if(res.data.success){
      console.log(res.data.msg);
      alert(res.data.message)
      handleFetchData()
    }
 } catch (error) {
  console.log(error.message);
 }
  
  }

  const fetchData = () => {
    axios
      .get("http://localhost:4000/petroldecantation")
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setData(res.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleDelete = async (id) => {
   
    const response = await axios.delete(
      `http://localhost:4000/petroldecantation/delete/${id}`
    );
    if (response) {
      if (response.data.success) {
        alert(response.data.msg);
        fetchData();
      }
    }
  };

  const handleFetchData = () => {
    axios
      .get("http://localhost:4000/petrolInvoiceFeeding")
      .then((res) => {
        const allInvoices = res.data.petrolInvoice;
        console.log("All Invoices: ", allInvoices);
  
        const filteredInvoices = allInvoices.filter((invoice) => !invoice.show);
        console.log("Filtered Invoices (show false): ", filteredInvoices);
  
        const invoiceNumbers = [
          ...new Set(filteredInvoices.map((invoice) => invoice.invoiceNumber)),
        ];
        console.log("Filtered Invoice Numbers: ", invoiceNumbers);
  
        setPetrolInvoice(invoiceNumbers); // Set the state with the unique invoice numbers
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
  

  useEffect(() => {
    console.log("ms", ms);
  }, [ms]);

  const handleFilter = async (id) => {
    console.log("id", id);
    const res = await axios.get(
      `http://localhost:4000/petroldecantation/product/${id}`
    );
    console.log("ressss", res.data);
    if (res.data) {
      addProduct(res.data);
    }
  };

  const addProduct = (props) => {
    setMs("");
    setSpeed("");
    sethsd("");
    props.map((item) => {
      console.log("map");
      if (item.ProductName === "MS") {
        setMs(Number(item.klQty));
      }
      if (item.ProductName === "HSD") {
        sethsd(Number(item.klQty));
      }
      if (item.ProductName === "SPEED") {
        setSpeed(Number(item.klQty));
      }
    });
  };

  useEffect(() => {
    handleFetchData();
    fetchData();
  }, []);

  console.log("data", petrolInvoice);
  return (
    <>
      <div className="">
        <span style={{ fontSize: "22px" }}> Date : </span>
        <h2 className=" text-center text-blue-600 uppercase text-xl font-bold">Petrol Decantation</h2>
        <div>
        
          <h6 className="text-md font-semibold">Purchase Record (Petrol/Diesel):</h6>
        
          <table className="table">
            <thead>
              <tr className="table-secondary">
                <th className="">Invoice No</th>
                <th className="">MS (KL)</th>
                <th className="">Speed (KL)</th>
                <th className="">HSD (KL)</th>
                <th className="">Total (KL)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                 
                  <select
                    style={{ width: "120px" }}
                    name="invoice"
                    className="form-select editableInput bigFontWeight"
                    aria-label="Default select example"
                    onChange={(e) => {
                      handleChange(e);
                      handleFilter(e.target.value);
                    }}
                  >
                    <option>- Invoice -</option>
                    {petrolInvoice &&
                      petrolInvoice.map((invoiceNumber, index) => (
                        <option key={index} value={ invoiceNumber}>
                          {invoiceNumber}
                        </option>
                      ))}
                  </select>
                </td>
                <td>
                  <input
                    className="form-control editableInput "
                    placeholder="MS"
                    type="text"
                    name="mskl"
                    value={ms ? ms : 0}
                    onChange={handleChange}
                    disabled
                  />
                </td>

                <td>
                  <input
                    type="text"
                    className="form-control editableInput "
                    placeholder="Speed"
                    name="speedkl"
                    value={speed ? speed : 0}
                    onChange={handleChange}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control editableInput "
                    placeholder="HSD"
                    name="hsdkl"
                    value={hsd ? hsd : 0}
                    onChange={handleChange}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="total1"
                    className="form-control "
                    value={ms + hsd + speed}
                    placeholder="Total"
                    name="totalkl"
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <br></br>
          <h6>Decantation Record:</h6>
      
          <table className="table">
            <thead>
              <tr className="table-secondary">
                <th className="">
                  {/* Tank 1-15KL <br /> */}
                  MS-1
                </th>
                <th className="">
                  {/* Tank 2-10KL <br></br> */}
                  Speed
                </th>
                <th className="">
                  {/* Tank 3-9KL <br></br> */}
                  HSD
                </th>
                <th className="" id="">
                  Total (KL)
                </th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">
                  <input
                    type="text"
                    id="tank1"
                    className="form-control editableInput "
                    placeholder="Tank1"
                    name="tank1"
                    value={decantation.tank1}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="tank2"
                    className="form-control editableInput "
                    placeholder="Tank2"
                    name="tank2"
                    value={decantation.tank2}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="tank3"
                    className="form-control editableInput "
                    placeholder="Tank3"
                    name="tank3"
                    value={decantation.tank3}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control "
                    name="tanktotalkl"
                    value={decantation.tanktotalkl}
                    placeholder="Total"
                    disabled
                  />
                </td>
                <td>
                  <button
                    type="button"
                    style={{ width: "120px" }}
                    className="btn btn-primary"
                    onClick={handleSubmit}
                  >
                    ADD
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
        
        
        <br></br>
        <div>
          <h6 className="text-lg font-bold mb-1 text-center ">Purchase Record (Petrol/Diesel):</h6>
         
          <div class="font-[sans-serif] overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-600 whitespace-nowrap">
          <tr>
            <th class=" text-center text-sm  border-2 border-black text-white">
             Sr.
            </th>
            <th class=" text-center text-sm  border-2 border-black text-white">
            Invoice No
            </th>
            <th class=" text-center text-sm border-2 border-black text-white">
            MS
            </th>
            <th class=" text-center text-sm  border-2 border-black text-white">
             SPEED
            </th>
            <th class=" text-center text-sm  border-2 border-black text-white">
              TOTAL
            </th>
          </tr>
        </thead>

        <tbody>
              {data &&
                data.map((res, index) => (
                  <tr className="" key={index}>
                    <td className="border-2 text-center border-gray-700">{index + 1}</td>
                    <td className="border-2 border-gray-700 text-center">{res.invoice}</td>
                    <td className="border-2 text-center border-gray-700">{res.mskl}</td>
                    <td className="border-2 text-center border-gray-700">{res.hsdkl}</td>
                    <td className="border-2 text-center border-gray-700">{res.totalkl} </td>
                  </tr>
                ))}
            </tbody>
      </table>

    </div>
          <br></br>
          <h3 className="mt-3 text-center text-xl font-semibold mb-1">Decantation Records</h3>
       




          <table class="min-w-full bg-white">
        <thead class="bg-gray-600 whitespace-nowrap">
          <tr>
            <th class=" text-center text-sm  border-2 border-black text-white">
             Sr.
            </th>
            <th class=" text-center text-sm  border-2 border-black text-white">
            MS
            </th>
            <th class=" text-center text-sm border-2 border-black text-white">
            SPEED
            </th>
            <th class=" text-center text-sm  border-2 border-black text-white">
             HSD
            </th>
            <th class=" text-center text-sm  border-2 border-black text-white">
              TOTAL
            </th>
            <th class=" text-center text-sm  border-2 border-black text-white">
             ACTION 
            </th>
          </tr>
        </thead>

        <tbody>
              {data &&
                data.map((res, index) => (
                  <tr className="" key={index}>
                    <td className="border-2 text-center border-gray-700">{index + 1}</td>
                    <td className="border-2 border-gray-700 text-center">{res.tank1}</td>
                    <td className="border-2 text-center border-gray-700">{res.tank2}</td>
                    <td className="border-2 text-center border-gray-700">{res.tank3}</td>
                    <td className="border-2 text-center border-gray-700">{res.tanktotalkl} </td>
                    <td className="border-2 text-center border-gray-700"><button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(res._id)}
                    >
                      Delete
                    </button></td>
                  </tr>
                ))}
            </tbody>
      </table>
          
        </div>
      </div>
    </>
  );
}