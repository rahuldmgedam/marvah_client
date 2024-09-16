import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../css/Tank.css";
import { MdAdd, MdDelete } from "react-icons/md";
const initValue = {
  serialNumber: "",
  invoiceNumber: "",
  product: "",
  klQty: "",
  Value: "",
  taxamount: "",
  productAmount: "",
  vatPercent: "",
  vat: "",
  vatlst: "",
  totalAmount: "",
  productAmountSumTds: "",
  tds: "",
  TotPayableTds: "",
  lfrPerKl: "", //indiv prod
  cgst: "",
  sgst: "",
  tdsLfr: "",
  lfrTotal: "", //indiv prod
  lfrPerKlSumTds: "", //lfrTotal + cgst + sgst of both ms,hsd
  totInvoiceAmt: "",
  total:"",
  totCgst:"",
  totSgst:"",
  totalLfrValue:"",
};

export default function Petrol_Invoice_Feeding() {
  const [feedings, setFeedings] = useState([]);
  const [saveData, setSaveData] = useState(initValue);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [petrolInvoice, setPetrolInvoice] = useState([]);
  const [productAmtSum, setProductAmtSum] = useState(0);
  const [invFeedingData, setInvFeedingData] = useState([]);
  const [productAmtSumTds, setProductAmtSumTds] = useState(0);
  const handleSelect = (e) => {
    const finalProduct = data?.filter(
      (item) => item.ProductName === e.target.value
    );
    if (finalProduct.length > 0) {
      setFilterData(finalProduct[0]);
      setSaveData((prevFormData) => ({
        ...prevFormData,
        product: e.target.value,
        rate: finalProduct[0].rate,
        taxamount: finalProduct[0].taxamount,
        vatPercent: finalProduct[0].vatPercent,
        vat: finalProduct[0].vat,
        cess: finalProduct[0].cess,
        tcs: finalProduct[0].tcs,
        tds: finalProduct[0].tds,
        lfrPerKl: finalProduct[0].lfrPerKl,
        cgst: finalProduct[0].cgst,
        sgst: finalProduct[0].sgst,
        tdsLfr: finalProduct[0].tdsLfr,

      }));
    }
  };
  console.log("saveData", saveData);

  const fetchPetrol = () => {
    axios
      .get("http://localhost:4000/petrol")
      .then((res) => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchPetrol();
  }, []);

  const fetchPetrolInvFeeding = () => {
    axios
      .get("http://localhost:4000/petrolInvoiceFeeding")
      .then((res) => {
        if (res.data) {
          setInvFeedingData(res.data.petrolInvoice);
      
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  console.log("invFeedingData", invFeedingData);
  useEffect(() => {
    fetchPetrolInvFeeding();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaveData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // console.log("tds", saveData.tds);
  const calculateValues = (formData, filterData) => {
    const { klQty, vatPercent, vat } = formData;
    const { rate, taxamount, cess, tcs } = filterData;

    const Value = (klQty * rate).toFixed(1);
    const productAmount = (
      parseFloat(Value) +
      parseFloat(taxamount) * parseFloat(saveData.klQty)
    ).toFixed(1);
    // const vatlst = (productAmount * (vatPercent / 100)).toFixed(1);
    const vatlst = productAmount;

    const totalAmount = (
      parseFloat(productAmount) +
      parseFloat(vatlst) +
      parseFloat(cess) * saveData.klQty +
      parseFloat(tcs)
    ).toFixed(1);
    console.log("total amount", totalAmount);

    return {
      Value: parseFloat(Value),
      productAmount: parseFloat(productAmount),
      vatlst: parseFloat(vatlst * vat),
      totalAmount:
        parseFloat(productAmount) +
        parseFloat(vatlst * vat) +
        parseFloat(cess * klQty),
      taxamount: parseFloat(taxamount * klQty),
      cess: parseFloat(cess * klQty),
    };
  };

  useEffect(() => {
    if (saveData.klQty && filterData.rate) {
      const calculatedValues = calculateValues(saveData, filterData);
      setSaveData((prevFormData) => ({
        ...prevFormData,
        ...calculatedValues,
      }));
    }
  }, [saveData.klQty, saveData.vatPercent, filterData]);



  const handleSubmit = () => {
    // Calculate total product amount
    const productAmountSumTds = petrolInvoice.reduce((accumulator, item) => {
      return accumulator + (item.productAmount || 0); // Default to 0 if productAmount is undefined or null
    }, 0);

    const TotPayableTds = productAmountSumTds * saveData.tds;
    const calculatedValues = calculateValues(saveData, filterData);

    const finalData = {
      ...saveData,
      ...filterData,
      ...calculatedValues,
      serialNumber: petrolInvoice.length + 1,
      klQty: parseFloat(saveData.klQty),
      vatPercent: parseFloat(saveData.vatPercent),
      Value: parseFloat(calculatedValues.Value),
      productAmount: parseFloat(calculatedValues.productAmount),
      vatlst: parseFloat(calculatedValues.vatlst),
      totalAmount: parseFloat(calculatedValues.totalAmount),
      productAmountSumTds: parseFloat(productAmountSumTds), // Add Total Product Amount here
      totInvoiceAmt: parseFloat(totInvoiceAmt),
      TotPayableTds: parseFloat(TotPayableTds),
      lfrTotal: parseFloat(saveData.lfrTotal),
    };

    console.log("Final Data:", finalData);

    axios
      .post("http://localhost:4000/petrolInvoiceFeeding/create", finalData)
      .then((res) => {
        alert(res.data.msg);
        handleFetchData();
        setSaveData(initValue); // Reset the form
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleFetchData = () => {
    axios
      .get("http://localhost:4000/petrolInvoiceFeeding")
      .then((res) => {
        setPetrolInvoice(res.data.petrolInvoice);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const topScrollRef = useRef(null);
  const tableScrollRef = useRef(null);

  const handleScroll = (sourceRef, targetRef) => {
    if (sourceRef.current && targetRef.current) {
      targetRef.current.scrollLeft = sourceRef.current.scrollLeft;
    }
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(
      `http://localhost:4000/petrolInvoiceFeeding/delete/${id}`
    );
    if (res.data.success) {
      alert(res.data.message);
      handleFetchData();
    }
  };

  // Calculate the total product amount
  const productAmountSumTds = petrolInvoice.reduce((accumulator, item) => {
    return accumulator + (item.productAmount || 0); // Default to 0 if productAmount is undefined or null
  }, 0);

  const totInvoiceAmt = invFeedingData.reduce((accumulator, item) => {
    return accumulator + (item.totalAmount || 0); // Default to 0 if totalAmount is undefined or null
  }, 0);

  // console.log("Total Product Amount:", productAmountSumTds);
  console.log("totInvoiceAmt", totInvoiceAmt);

  useEffect(() => {
    handleFetchData();
  }, []);

  const [srNo, setSrNo] = useState(0);
  const handleSrNo = () => {
    if (petrolInvoice) {
    }
    setSrNo(
      petrolInvoice.length >= 0
        ? petrolInvoice.length + 1
        : saveData.serialNumber
    );
  };

  useEffect(() => {
    handleSrNo();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const addHandler = (item) => {
    // Calculate total sum values for posting
    const totalSum = petrolInvoice.reduce(
      (sum, inv) => sum + inv.klQty * inv.lfrPerKl,
      0
    );
    const totalCgstSum = petrolInvoice.reduce(
      (sum, inv) => sum + inv.klQty * inv.lfrPerKl * inv.cgst,
      0
    );
    const totalSgstSum = petrolInvoice.reduce(
      (sum, inv) => sum + inv.klQty * inv.lfrPerKl * inv.sgst,
      0
    );
    const totalLfrValueSum = petrolInvoice.reduce((sum, inv) => {
      const total = inv.klQty * inv.lfrPerKl;
      const totCgst = total * inv.cgst;
      const totSgst = total * inv.sgst;
      return sum + total + totCgst + totSgst;
    }, 0);

    // Data to send in POST request
    const finalData = {
      serialNumber: item.serialNumber,
      productName: item.ProductName,
      klQty: item.klQty,
      lfrPerKl: item.lfrPerKl,
      cgst: item.cgst,
      sgst: item.sgst,
      total: totalSum.toFixed(2),
      totalCgst: totalCgstSum.toFixed(2),
      totalSgst: totalSgstSum.toFixed(2),
      totalLfrValue: totalLfrValueSum.toFixed(2),
    };

    // POST the data
    axios
      .post("http://localhost:4000/petrolInvoiceFeeding/create", finalData)
      .then((res) => {
        alert(res.data.msg);
        handleFetchData(); // Fetch the updated data
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className="tankMainDiv shadow-lg  bg-body-tertiary rounded">
        <h2 className="font-bold mb-4 mt-4 text-2xl text-center uppercase">
          Petrol Invoice Feeding
        </h2>
        <div>
          <table className="table text-center">
            <thead>
              <tr className="bg-[#008b8b]  text-center">
                <th className="">S.No.</th>
                <th className="">Invoice No.</th>
                <th className="">Product</th>
                <th className="">KL/Qty</th>

                <th className="">Rate</th>

                <th className="">Value</th>

                <th className="">Taxable Amount</th>

                <th className="">Product Amount</th>
                {/* <th className="">TDS %</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bigFontWeight">
                  <input
                    name="serialNumber"
                    // value={saveData.serialNumber}
                    value={srNo}
                    type="text"
                    className="form-control bigFontWeight editableInput"
                    onChange={handleChange}
                  />
                </td>
                <td className="bigFontWeight">
                  <textarea
                    type="text"
                    name="invoiceNumber"
                    value={saveData.invoiceNumber}
                    className="form-control bigFontWeight editableInput resize-x w-[150px]  h-6"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <select
                    style={{ width: "120px" }}
                    name="product"
                    className="form-select editableInput bigFontWeight"
                    aria-label="Default select example"
                    onChange={(e) => handleSelect(e)}
                  >
                    <option>- Product -</option>
                    {data &&
                      data.map((rest, index) => (
                        <option key={index} value={rest.ProductName}>
                          {rest.ProductName}
                        </option>
                      ))}
                  </select>
                </td>
                <td className="bigFontWeight">
                  <input
                    type="text"
                    name="klQty"
                    value={saveData.klQty}
                    className="editableInput form-control bigFontWeight"
                    onChange={handleChange}
                  />
                </td>

                <td className="bigFontWeight">
                  <input
                    type="text"
                    name="rate"
                    className="form-control bigFontWeight"
                    // value={filterData.rate || ""}
                    value={filterData.rate || ""}
                    disabled
                  />
                </td>

                <td className="bigFontWeight">
                  <textarea
                    type="text"
                    name="Value"
                    className="form-control bigFontWeight resize-x h-6"
                    value={saveData.Value}
                    disabled
                  />
                </td>

                <td>
                  <input
                    type="text"
                    name="taxamount"
                    // value={filterData.taxamount * saveData.klQty || ""}
                    // value={filterData.taxamount*9|| ""}
                    value={saveData.taxamount}
                    className="form-control bigFontWeight"
                    disabled
                  />
                </td>

                <td className="bigFontWeight">
                  <textarea
                    type="text"
                    name="productAmount"
                    className="form-control bigFontWeight resize-x h-6"
                    value={saveData.productAmount}
                    onChange={handleChange}
                    disabled
                  />
                </td>
                {/* <td>
                  <input
                    type="number"
                    value={(saveData.tds = 0.01)}
                    onChange={handleChange}
                    className="border-4 border-blue-500 w-16 rounded-md p-2"
                    // onChange={(e)=>setSaveData.tds(e.target.value)}
                  />
                </td> */}
              </tr>
            </tbody>
          </table>
          <br />
          <table className="table">
            <thead>
              <tr className="text-center">
                <th className="">(=)</th>
                <th className="">VAT %</th>
                <th className="">VAT/LST</th>
                <th className="">(+)</th>
                <th className="">CESS</th>
                <th className="">(+)</th>
                <th className="">TCS</th>
                <th className="">(=)</th>
                <th className="">T. AMT</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bigFontWeight">(=)</td>
                <td className="bigFontWeight">
                  <input
                    type="text"
                    name="vat"
                    className="form-control bigFontWeight"
                    value={saveData.vat}
                    onChange={handleChange}
                  />
                </td>
                <td className="bigFontWeight">
                  <input
                    type="text"
                    name="vatlst"
                    className="form-control bigFontWeight"
                    value={saveData.vatlst || ""}
                    // value={saveData.vatPercent ? saveData.vatlst : ""}
                    disabled
                  />
                </td>
                <td className="bigFontWeight">(+)</td>
                <td className="bigFontWeight">
                  <input
                    type="text"
                    value={filterData.cess * saveData.klQty || ""}
                    className="form-control bigFontWeight"
                    disabled
                  />
                </td>
                <td className="bigFontWeight">(+)</td>
                <td className="bigFontWeight">
                  <input
                    type="text"
                    value={filterData.tcs || ""}
                    className="form-control bigFontWeight"
                    disabled
                  />
                </td>
                <td className="bigFontWeight">(=)</td>
                <td className="bigFontWeight">
                  <input
                    type="text"
                    name="totalAmount"
                    className="form-control bigFontWeight"
                    value={saveData.totalAmount}
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <br />
          <table className="table">
            <thead>
              <tr className="text-center uppercase">
                <th className="">TDS(%)</th>
                <th className="uppercase">lfr rate</th>
                <th className="">cgst</th>
                <th className="">sgst</th>
                <th className="">tds(Lfr)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bigFontWeight">
                  <input
                    type="text"
                    name="tds"
                    className="form-control bigFontWeight"
                    value={saveData.tds}
                    onChange={handleChange}
                  />
                </td>
                <td className="bigFontWeight">
                  <input
                    type="text"
                    name="lfrPerKl"
                    className="form-control bigFontWeight"
                    value={saveData.lfrPerKl}
                    disabled
                  />
                </td>
                <td className="bigFontWeight">
                  <input
                    type="text"
                    name="cgst"
                    className="form-control bigFontWeight"
                    value={saveData.cgst}
                    disabled
                  />
                </td>
                <td className="bigFontWeight">
                  <input
                    type="text"
                    name="sgst"
                    className="form-control bigFontWeight"
                    value={saveData.sgst}
                    disabled
                  />
                </td>
                <td className="bigFontWeight">
                  <input
                    type="text"
                    name="tdsLfr"
                    className="form-control bigFontWeight"
                    value={saveData.tdsLfr}
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-right">
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-500 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-300"
              onClick={handleSubmit}
            >
              ADD
            </button>
          </div>
        </div>
        <br />
        {/* 1. invoice feed start  */}
        <h2 className=" text-xl font-bold mb-1 text-center uppercase">
          Invoice entry{" "}
        </h2>

        <div className="relative">
          <div
            className="overflow-x-auto scroll-mx-5"
            ref={topScrollRef}
            onScroll={() => handleScroll(topScrollRef, tableScrollRef)}
            style={{ height: "1.5rem" }}
          >
            <div style={{ width: "200%" }}></div>
          </div>

          <table className="">
            <thead className="px-2">
              <tr className="text-center uppercase px-2">
                <th className="border-2 px-2 border-gray-900">S.No.</th>
                <th className="border-2 border-gray-900 w-28">Date</th>
                <th className="border-2 border-gray-900">Invoice No.</th>
                <th className="border-2 border-gray-900">Product</th>
                <th className="border-2 border-gray-900">KL/Qty</th>

                <th className="border-2 px-2 border-gray-900">Rate/Unit</th>

                <th className="border-2 px-2 border-gray-900">Value</th>

                <th className="border-2 border-gray-900 w-16">
                  Taxable Amount
                </th>

                <th className="border-2 border-gray-900">Product Amount</th>

                <th className="border-2 border-gray-900">VAT %</th>
                <th className="border-2 border-gray-900">VAT/LST</th>

                <th className="border-2 border-gray-900">CESS</th>
                <th className="border-2 border-gray-900">TCS</th>

                <th className="border-2 border-gray-900">T Amount</th>
                <th className="border-2 border-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {petrolInvoice.length > 0 &&
                petrolInvoice.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border-2 border-gray-900 ">
                      {item.serialNumber}
                    </td>
                    <td className="border-2 border-gray-900 w-32">
                      {formatDate(item.date)}
                    </td>
                    <td className="border-2 border-gray-900">
                      {item.invoiceNumber}
                    </td>
                    <td className="border-2 border-gray-900">
                      {item.ProductName}
                    </td>
                    <td className="border-2 border-gray-900">{item.klQty}</td>
                    <td className="border-2 border-gray-900">{item.rate}</td>
                    <td className="border-2 border-gray-900">{item.Value}</td>
                    <td className="border-2 border-gray-900 w-16">
                      {item.taxamount}
                    </td>
                    <td className="border-2 border-gray-900">
                      {item.productAmount}
                    </td>
                    <td className="border-2 border-gray-900 w-[12]">
                      {item.vatPercent}
                    </td>
                    <td className="border-2 border-gray-900">{item.vatlst}</td>
                    <td className="border-2 border-gray-900">{item.cess}</td>
                    <td className="border-2 border-gray-900">{item.tcs}</td>
                    <td className="border-2 border-gray-900">
                      {item.totalAmount}
                    </td>
                    <td className="border-2 border-gray-900">
                      <button
                        onClick={() => handleDelete(item._id)}
                        type="button"
                        class="w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white"
                      >
                        <MdDelete color="red" size={25} />
                      </button>
                    </td>
                  </tr>
                ))}

              <tr>
                <td colSpan={12}></td>

                <td
                  className="text-center font-bold border-2 border-gray-900"
                  colSpan={1}
                >
                  T. Invoice Amt:
                </td>
                <td className="border-2 border-gray-900">
                  {" "}
                  {totInvoiceAmt.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 1. invoice feed end  */}

        {/* 2. tds start  */}
        <h2 className=" text-xl font-bold mb-1 text-center uppercase">
          tds 194Q entry{" "}
        </h2>
        <div className="relative">
          <div
            className="overflow-x-auto scroll-mx-5"
            ref={topScrollRef}
            onScroll={() => handleScroll(topScrollRef, tableScrollRef)}
            style={{ height: "1.5rem" }}
          >
            {/* <div style={{ width: "200%" }}></div> */}
          </div>

          <table className="w-[100%]">
            <thead className="">
              <tr className="text-center uppercase">
                <th className="border-2 border-gray-900">S.No.</th>
                <th className="border-2 border-gray-900">Date</th>

                <th className="border-2 border-gray-900">Invoice No.</th>
                <th className="border-2 border-gray-900">Product</th>
                <th className="border-2 border-gray-900">KL/Qty</th>

                {/* <th className="border-2 border-gray-900">Rate/Unit</th> */}

                <th className="border-2 border-gray-900">Value</th>

                <th className="border-2 border-gray-900">Taxable Amount</th>

                <th className="border-2 border-gray-900">Product amount</th>
                <th className="border-2 border-gray-900">tds(%)</th>
                <th className="border-2 border-gray-900">Act. tds payable</th>

                <th className="border-2 border-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {petrolInvoice.length > 0 &&
                petrolInvoice.map((item, index) => (
                  <tr key={index} className="text-center">
                    <td className="border-2 border-gray-900">
                      {item.serialNumber}
                    </td>
                    <td className="border-2 border-gray-900 w-28">
                      {formatDate(item.date)}
                    </td>
                    <td className="border-2 border-gray-900">
                      {item.invoiceNumber}
                    </td>
                    <td className="border-2 border-gray-900">
                      {item.ProductName}
                    </td>
                    <td className="border-2 border-gray-900">{item.klQty}</td>
                    {/* <td className="border-2 border-gray-900">{item.rate}</td> */}
                    <td className="border-2 border-gray-900">{item.Value}</td>
                    <td className="border-2 border-gray-900 w-[16]">
                      {item.taxamount}
                    </td>
                    <td className="border-2 border-gray-900">
                      {item.productAmount}
                    </td>
                    <td className="border-2 border-gray-900">{item.tds}</td>
                    <td className="border-2 border-gray-900">
                      {/* {(item.productAmount * item.tds).toFixed(2)} */}
                    </td>

                    <td className="border-2 border-gray-900">
                      <button
                        onClick={() => handleDelete(item._id)}
                        type="button"
                        class="w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white"
                      >
                        <MdDelete color="red" size={25} />
                      </button>
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan={6}></td>
                <td className="text-center font-bold border-2 border-gray-900">
                  Tot. Amt:
                </td>
                <td className="border-2 border-gray-900">
                  <input
                    type="text"
                    className="p-2 rounded-md text-center"
                    value={(saveData.productAmountSumTds =
                      productAmountSumTds).toFixed(2)}
                  />
                </td>

                {/* <td colSpan={4}></td> */}
                <td className="text-center font-bold border-2 border-gray-900">
                  Total Payable Amount:
                </td>
                <td className="border-2 border-gray-900">
                  <input
                    type="text"
                    className="px-2 py-2 border-4 rounded-md text-center"
                    value={(saveData.TotPayableTds =
                      productAmountSumTds * 0.001).toFixed(2)}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={6}></td>
                <td className="text-center font-bold border-2 border-gray-900">
                  TDS(194Q)
                </td>
                <td className="border-2 border-gray-900">
                  <input
                    type="text"
                    className="p-2 rounded-md text-center"
                    value={saveData.tds}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 2. tds end */}
        <br />
        {/* 3. lfr feeding Start */}
        <h2 className=" text-xl font-bold mb-1 text-center uppercase">
          lfr 194i entry{" "}
        </h2>
        <div className="relative">
          <div
            className="overflow-x-auto scroll-mx-5"
            ref={topScrollRef}
            onScroll={() => handleScroll(topScrollRef, tableScrollRef)}
            style={{ height: "1.5rem" }}
          >
            <div style={{ width: "200%" }}></div>
          </div>

          <table className="w-[100%]">
            <thead className="">
              <tr className="text-center uppercase px-2 py-1">
                <th className="border-2 border-gray-900 px-2 py-1">SR.No.</th>
                <th className="border-2 border-gray-900 px-2 py-1">Date</th>
                <th className="border-2 border-gray-900 px-2 py-1">
                  Invoice No.
                </th>
                <th className="border-2 border-gray-900 px-2 py-1">Product</th>
                <th className="border-2 border-gray-900 px-2 py-1">KL/Qty</th>
                <th className="border-2 border-gray-900">LFR Per Kl</th>
                <th className="border-2 border-gray-900">Total</th>
                <th className="border-2 border-gray-900">CGST</th>
                <th className="border-2 border-gray-900">Tot CGST</th>
                <th className="border-2 border-gray-900">SGST</th>
                <th className="border-2 border-gray-900">Tot SGST</th>
                <th className="border-2 border-gray-900">Total LFR value</th>
                <th className="border-2 border-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {petrolInvoice.length > 0 &&
                petrolInvoice.map((item, index) => {
                  const total = item.klQty * item.lfrPerKl;
                  const totCgst = total * item.cgst;
                  const totSgst = total * item.sgst;
                  const totalLfrValue = total + totCgst + totSgst;

                  return (
                    <tr key={index} className="text-center">
                      <td className="border-2 border-gray-900">
                        {item.serialNumber}
                      </td>
                      <td className="border-2 border-gray-900">
                        {formatDate(item.date)}
                      </td>
                      <td className="border-2 border-gray-900">
                        {item.invoiceNumber}
                      </td>
                      <td className="border-2 border-gray-900">
                        {item.ProductName}
                      </td>
                      <td className="border-2 border-gray-900">{item.klQty}</td>
                      <td className="border-2 border-gray-900">
                        {item.lfrPerKl}
                      </td>
                      <td className="border-2 border-gray-900">
                        {total.toFixed(2)}
                      </td>
                      <td className="border-2 border-gray-900">{item.cgst}</td>
                      <td className="border-2 border-gray-900">
                        {totCgst.toFixed(2)}
                      </td>
                      <td className="border-2 border-gray-900">{item.sgst}</td>
                      <td className="border-2 border-gray-900">
                        {totSgst.toFixed(2)}
                      </td>
                      <td className="border-2 border-gray-900">
                        {totalLfrValue.toFixed(2)}
                      </td>
                      <td className="border-2 border-gray-900">
                        <button
                          onClick={() => handleDelete(item._id)}
                          type="button"
                          className="w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white"
                        >
                          <MdDelete color="red" size={25} />
                        </button>

                        {/* Add Button */}
                        <button
                          onClick={() => addHandler(item)}
                          type="button"
                          className="ml-2 w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-green-500"
                        >
                          <MdAdd color="white" size={25} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {/* Calculate the sum of totals */}
              {petrolInvoice.length > 0 && (
                <tr>
                  <td colSpan={6} className="text-right font-bold">
                    Total:
                  </td>

                  {/* Sum of Total */}
                  <td className="border-2 border-gray-900">
                    {petrolInvoice
                      .reduce(
                        (sum, item) => sum + item.klQty * item.lfrPerKl,
                        0
                      )
                      .toFixed(2)}
                  </td>

                  {/* Sum of CGST */}
                  <td className="border-2 border-gray-900"></td>
                  <td className="border-2 border-gray-900">
                    {petrolInvoice
                      .reduce(
                        (sum, item) =>
                          sum + item.klQty * item.lfrPerKl * item.cgst,
                        0
                      )
                      .toFixed(2)}
                  </td>

                  {/* Sum of SGST */}
                  <td className="border-2 border-gray-900"></td>
                  <td className="border-2 border-gray-900">
                    {petrolInvoice
                      .reduce(
                        (sum, item) =>
                          sum + item.klQty * item.lfrPerKl * item.sgst,
                        0
                      )
                      .toFixed(2)}
                  </td>

                  {/* Sum of Total LFR Value */}
                  <td className="border-2 border-gray-900">
                    {petrolInvoice
                      .reduce((sum, item) => {
                        const total = item.klQty * item.lfrPerKl;
                        const totCgst = total * item.cgst;
                        const totSgst = total * item.sgst;
                        return sum + total + totCgst + totSgst;
                      }, 0)
                      .toFixed(2)}
                  </td>

                  <td className="border-2 border-gray-900"></td>
                </tr>
              )}
            </tbody>
          </table>

          {/* <table className="w-[100%]">
            <thead className="">
              <tr className="text-center uppercase px-2 py-1">
                <th className="border-2 border-gray-900 px-2 py-1">SR.No.</th>
                <th className="border-2 border-gray-900 px-2 py-1">Date</th>
                <th className="border-2 border-gray-900 px-2 py-1">
                  Invoice No.
                </th>
                <th className="border-2 border-gray-900 px-2 py-1">Product</th>
                <th className="border-2 border-gray-900 px-2 py-1">KL/Qty</th>
                <th className="border-2 border-gray-900">LFR Per Kl</th>
                <th className="border-2 border-gray-900">Total</th>
                <th className="border-2 border-gray-900">CGST</th>
                <th className="border-2 border-gray-900">Tot CGST</th>
                <th className="border-2 border-gray-900">SGST</th>
                <th className="border-2 border-gray-900">Tot SGST</th>
                <th className="border-2 border-gray-900">Total LFR value</th>
                <th className="border-2 border-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {petrolInvoice.length > 0 &&
                petrolInvoice.map((item, index) => {
                  const total = item.klQty * item.lfrPerKl;
                  const totCgst = total * item.cgst;
                  const totSgst = total * item.sgst;
                  const totalLfrValue = total + totCgst + totSgst;

                  return (
                    <tr key={index} className="text-center">
                      <td className="border-2 border-gray-900">
                        {item.serialNumber}
                      </td>
                      <td className="border-2 border-gray-900">
                        {formatDate(item.date)}
                      </td>
                      <td className="border-2 border-gray-900">
                        {item.invoiceNumber}
                      </td>
                      <td className="border-2 border-gray-900">
                        {item.ProductName}
                      </td>
                      <td className="border-2 border-gray-900">{item.klQty}</td>
                      <td className="border-2 border-gray-900">
                        {item.lfrPerKl}
                      </td>
                      <td className="border-2 border-gray-900">
                        {total.toFixed(2)}
                      </td>
                      <td className="border-2 border-gray-900">{item.cgst}</td>
                      <td className="border-2 border-gray-900">
                        {totCgst.toFixed(2)}
                      </td>
                      <td className="border-2 border-gray-900">{item.sgst}</td>
                      <td className="border-2 border-gray-900">
                        {totSgst.toFixed(2)}
                      </td>
                      <td className="border-2 border-gray-900">
                        {totalLfrValue.toFixed(2)}
                      </td>
                      <td className="border-2 border-gray-900">
                        <button
                          onClick={() => addHandler(item)}
                          type="button"
                          className="ml-2 w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-green-500"
                        >
                          <MdAdd color="white" size={25} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          type="button"
                          className="w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white"
                        >
                          <MdDelete color="red" size={25} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {petrolInvoice.length > 0 && (
                <tr>
                  <td colSpan={6} className="text-right font-bold">
                    Total:
                  </td>

                  <td className="border-2 border-gray-900">
                    {petrolInvoice
                      .reduce(
                        (sum, item) => sum + item.klQty * item.lfrPerKl,
                        0
                      )
                      .toFixed(2)}
                  </td>

                  <td className="border-2 border-gray-900"></td>
                  <td className="border-2 border-gray-900">
                    {petrolInvoice
                      .reduce(
                        (sum, item) =>
                          sum + item.klQty * item.lfrPerKl * item.cgst,
                        0
                      )
                      .toFixed(2)}
                  </td>

                  <td className="border-2 border-gray-900"></td>
                  <td className="border-2 border-gray-900">
                    {petrolInvoice
                      .reduce(
                        (sum, item) =>
                          sum + item.klQty * item.lfrPerKl * item.sgst,
                        0
                      )
                      .toFixed(2)}
                  </td>

                  <td className="border-2 border-gray-900">
                    {petrolInvoice
                      .reduce((sum, item) => {
                        const total = item.klQty * item.lfrPerKl;
                        const totCgst = total * item.cgst;
                        const totSgst = total * item.sgst;
                        return sum + total + totCgst + totSgst;
                      }, 0)
                      .toFixed(2)}
                  </td>

                  <td className="border-2 border-gray-900"></td>
                </tr>
              )}
            </tbody>
          </table> */}
        </div>
        {/* 3. lfr end */}
      </div>
    </>
  );
}
