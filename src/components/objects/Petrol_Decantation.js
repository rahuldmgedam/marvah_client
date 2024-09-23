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
    console.log("data", formattedData);

    axios
      .post("http://localhost:4000/petroldecantation/create", formattedData)
      .then((res) => {
        if (res.data.state) {
          alert(res.data.msg);
          console.log("resss", res.data);
          handleUpdateInvoice();
          fetchData();
          setDecantation(init);
          setMs("");
          sethsd("");
          setSpeed("")
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleUpdateInvoice = async () => {
    try {
      const res = axios.patch(
        `http://localhost:4000/petrolInvoiceFeeding/updateshow/${selectedInvoice}`
      );
      if (res.data.success) {
        console.log(res.data.msg);
        alert(res.data.message);
        handleFetchData();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(today.getFullYear()).slice(-2); // Get last two digits of the year

    return `${day}-${month}-${year}`;
  };

  console.log(getCurrentDate()); // Output example: 19-09-24

  console.log("data", petrolInvoice);
  return (
    <>
      <div className="">
        {/* <span className="text-2xl font-bold"> Date : {getCurrentDate()} </span> */}
        <h2 className="text-center text-2xl uppercase pt-20 font-bold mb-4">
           Decantation Record 
        </h2>
        <div className="mt-4">
          <h1 className="text-md font-bold text-center mt-6 mb-6 uppercase text-xl">
            Purchase Record (Petrol/Diesel):
          </h1>
          
          <div>
            <div>

            </div>
          </div>
          <table className="ml-[26%] w-[50%]">
            <thead>
              <tr className="text-center mb-2 bg-[#008b8b] text-white">
                <th className="border-2 text-center border-gray-700">Invoice No</th>
                <th className="border-2 text-center border-gray-700">MS-1 (KL)</th>
                <th className="border-2 text-center border-gray-700">MS-2(SP) (KL)</th>
                <th className="border-2 text-center border-gray-700">HSD (KL)</th>
                <th className="border-2 text-center border-gray-700">Total (KL)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-2 text-center border-gray-700">
                <td className="w-24 border-2 border-gray-700 text-cente">
                  <select
         
                    name="invoice"
                    className="px-4 py-2  rounded-md"
                    aria-label="Default select example"
                    onChange={(e) => {
                      handleChange(e);
                      handleFilter(e.target.value);
                    }}
                  >
                    <option>- Invoice -</option>
                    {petrolInvoice &&
                      petrolInvoice.map((invoiceNumber, index) => (
                        <option key={index} value={invoiceNumber}>
                          {invoiceNumber}
                        </option>
                      ))}
                  </select>
                </td>
                <td className=" w-24 border-2 border-gray-700 text-center">
                  <input
                    className="p-2 w-24 text-center"
                    placeholder="MS"
                    type="text"
                    name="mskl"
                    value={ms ? ms : 0}
                    onChange={handleChange}
                    disabled
                  />
                </td>

                <td className="w-24 border-2 border-gray-700 text-cente">
                  <input
                    type="text"
                    className="p-2 w-24 text-center"
                    placeholder="Speed"
                    name="speedkl"
                    value={speed ? speed : 0}
                    onChange={handleChange}
                    disabled
                  />
                </td>
                <td className="w-24 border-2 border-gray-700 text-cente">
                  <input
                    type="text"
                    className="p-2 w-24 text-center"
                    placeholder="HSD"
                    name="hsdkl"
                    value={hsd ? hsd : 0}
                    onChange={handleChange}
                    disabled
                  />
                </td>
                <td className="w-24 border-2 border-gray-700 text-cente">
                  <input
                    type="text"
                    id="total1"
                    className="p-2 w-24 text-center"
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
          <h6 className="font-bold  uppercase text-xl mb-1 text-center mt-4">Decantation</h6>

          <table className="text ml-[25%]  w-[51%]">
            <thead>
              <tr className="border-2 text-center border-gray-700 bg-[#008b8b] text-white">
                <th 
                className="border-2 text-center border-gray-700"
                >
                  {/* Tank 1-15KL <br /> */}
                  MS-1(KL)
                </th>
                <th className="border-2 text-center border-gray-700">
                  {/* Tank 2-10KL <br></br> */}
                  MS-2(KL)(SP)
                </th>
                <th className="border-2 text-center border-gray-700">
                  {/* Tank 3-9KL <br></br> */}
                  HSD(KL)
                </th>
                <th className="border-2 text-center border-gray-700" id="">
                  Total (KL)
                </th>
                <th className="border-2 text-center border-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-2 text-center border-gray-700">
                <td className="border-8 border-blue-600 rounded-xl" scope="row">
                  <input
                    type="text"
                    id="tank1"
                    className="w-20"
                    name="tank1"
                    value={decantation.tank1}
                    onChange={handleChange}
                  />
                </td>
                <td className="border-8 border-blue-600 rounded-xl" scope="row">
                  <input
                    type="text"
                    className="w-20"

                    id="tank2"
                    name="tank2"
                    value={decantation.tank2}
                    onChange={handleChange}
                  />
                </td>
                <td className="border-8 border-blue-600 rounded-xl">
                  <input
                    type="text"
                    className="w-20"

                    id="tank3"
                    name="tank3"
                    value={decantation.tank3}
                    onChange={handleChange}
                  />
                </td>
                <td className="border-8 border-blue-600 rounded-xl" scope="row">
                  <input
                    type="text"
                    className="w-20"

                    name="tanktotalkl"
                    value={decantation.tanktotalkl}
                    placeholder="Total"
                    disabled
                  />
                </td>
                <td className="bg-blue-600 border-8 border-blue-700 p-2 rounded-lg text-white">
                  <button
                    type="button"
                    className=""
                    onClick={handleSubmit}
                  >
                    SAVE
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <br></br>
        <div className="mt-6">
          {/* <h6 className="text-lg font-bold mb-1 text-center uppercase ">
            Purchase Record (Petrol/Diesel):
          </h6>

          <div class="font-[sans-serif] overflow-x-auto">
            <table class="min-w-full bg-white">
              <thead class="bg-gray-600 whitespace-nowrap">
                <tr>
                  <th class=" text-center text-md  border-2 border-black text-white">
                    Sr.
                  </th>
                  <th class=" text-center text-md  border-2 border-black text-white">
                    Invoice No
                  </th>
                  <th class=" text-center text-md border-2 border-black text-white">
                    MS-1
                  </th>
                  <th class=" text-center text-md  border-2 border-black text-white">
                    MS-2(SP)
                  </th>
                  <th class=" text-center text-md  border-2 border-black text-white">
                    HSD
                  </th>
                  <th class=" text-center text-md  border-2 border-black text-white">
                    TOTAL
                  </th>
                </tr>
              </thead>

              <tbody>
                {data &&
                  data.map((res, index) => (
                    <tr className="" key={index}>
                      <td className="border-2 text-center border-gray-700">
                        {index + 1}
                      </td>
                      <td className="border-2 border-gray-700 text-center">
                        {res.invoice}
                      </td>
                      <td className="border-2 text-center border-gray-700">
                        {res.mskl}
                      </td>
                      <td className="border-2 text-center border-gray-700">
                        {res.speedkl}
                      </td>
                      <td className="border-2 text-center border-gray-700">
                        {res.hsdkl}
                      </td>
                      <td className="border-2 text-center border-gray-700">
                        {res.totalkl}{" "}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div> */}
          <br></br>
          <h3 className="mt-3 text-center text-xl font-bold mb-1 uppercase">
            Report
          </h3>

          <table class="w-[51%] bg-white ml-[25%]">
            <thead class="bg-gray-600 whitespace-nowrap">
              <tr className="bg-[#008b8b] text-white">
                <th class=" text-center text-md  border-2 border-black text-white">
                  Sr.
                </th>
                <th class=" text-center text-md  border-2 border-black text-white">
                  MS-1(KL)
                </th>
                <th class=" text-center text-md border-2 border-black text-white">
                MS-2(KL)(SP)
                </th>
                <th class=" text-center text-md  border-2 border-black text-white">
                  HSD(KL)
                </th>
                <th class=" text-center text-md  border-2 border-black text-white">
                  TOTAL(KL)
                </th>
                <th class=" text-center text-md  border-2 border-black text-white">
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.map((res, index) => (
                  <tr className="" key={index}>
                    <td className="border-2 text-center border-gray-700">
                      {index + 1}
                    </td>
                    <td className="border-2 border-gray-700 text-center">
                      {res.tank1}
                    </td>
                    <td className="border-2 text-center border-gray-700">
                      {res.tank2}
                    </td>
                    <td className="border-2 text-center border-gray-700">
                      {res.tank3}
                    </td>
                    <td className="border-2 text-center border-gray-700">
                      {res.tanktotalkl}{" "}
                    </td>
                    <td className="border-2 text-center border-gray-700">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(res._id)}
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
