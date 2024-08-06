import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../css/Tank.css";
import { MdDelete } from "react-icons/md";
const initValue = {
  serialNumber: "",
  invoiceNumber: "",
  product: "",
  klQty: "",
  Value: "",
  productAmount: "",
  vatPercent: "",
  vatlst: "",
  totalAmount: "",
};

export default function Petrol_Invoice_Feeding() {
  const [feedings, setFeedings] = useState([]);
  const [saveData, setSaveData] = useState(initValue);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [petrolInvoice, setPetrolInvoice] = useState([]);

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
        vat: finalProduct[0].vat,
        cess: finalProduct[0].cess,
        tcs: finalProduct[0].tcs,
      }));
    }
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaveData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const calculateValues = (formData, filterData) => {
    const { klQty, vatPercent } = formData;
    const { rate, taxamount, cess, tcs } = filterData;

    const Value = (klQty * rate).toFixed(1);
    const productAmount = (parseFloat(Value) + parseFloat(taxamount) * parseFloat(saveData.klQty)).toFixed(
      1
    );
    const vatlst = (productAmount  * (vatPercent / 100)).toFixed(1);
    const totalAmount = (
      parseFloat(productAmount) +
      parseFloat(vatlst) +
      parseFloat(cess) * saveData.klQty +
      parseFloat(tcs)
    ).toFixed(1);
console.log("total amount",totalAmount);

    return {
      Value: parseFloat(Value),
      productAmount: parseFloat(productAmount),
      vatlst: parseFloat(vatlst),
      totalAmount: parseFloat(totalAmount),
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
    };
    console.log("fiii", finalData);
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

  const totalSum = petrolInvoice.reduce((accumulator, item) => {
    return accumulator + (item.totalAmount || 0); // Default to 0 if totalAmount is undefined or null
  }, 0);
console.log("ttt",totalSum);

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <>
      <div className="tankMainDiv shadow-lg  bg-body-tertiary rounded">
        <h2 className=" text-xl font-bold mb-1">Petrol Invoice Feeding</h2>
        <div>
          <table className="table">
            <thead>
              <tr className="">
                <th className="">S.No.</th>
                <th className="">Invoice No.</th>
                <th className="">Product</th>
                <th className="">KL/Qty</th>

                <th className="">Rate/Unit</th>

                <th className="">(Value)</th>

                <th className="">Taxable Amount</th>

                <th className="">Product Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bigFontWeight">
                  <input
                    name="serialNumber"
                    value={
                      petrolInvoice.length >= 0
                        ? petrolInvoice.length + 1
                        : saveData.serialNumber
                    }
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
                    className="form-control bigFontWeight"
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
                    value={filterData.taxamount * saveData.klQty || ""}
                    className="form-control bigFontWeight"
                    disabled
                  />
                </td>

                <td className="bigFontWeight">
                  <textarea
                    type="text"
                    name="productAmount"
                    className="form-control bigFontWeight resize-x h-6"
                    // value={saveData.productAmount}
                    value={filterData.taxamount * saveData.klQty + saveData.Value}
                    onChange={handleChange}
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br></br>
          <table className="table">
            <thead>
              <tr className="">
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
                    name="vatPercent"
                    className="form-control bigFontWeight"
                    value={saveData.vatPercent}
                    onChange={handleChange}
                  />
                </td>
                <td className="bigFontWeight">
                  <input
                    type="text"
                    name="vatlst"
                    className="form-control bigFontWeight"
                    value={saveData.vatPercent ? saveData.vatlst : ""}
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

          <div className="text-right">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg text-white text-sm tracking-wider font-medium border border-current outline-none bg-gradient-to-tr hover:bg-gradient-to-tl from-blue-700 to-blue-300"
              onClick={handleSubmit}
            >
              ADD
            </button>
          </div>
        </div>
        <br />
        <h2 className=" text-xl font-bold mb-1">Petrol Invoice Feeding Data ${totalSum}</h2>

        <div className="relative">
          <div
            className="overflow-x-auto scroll-mx-5"
            ref={topScrollRef}
            onScroll={() => handleScroll(topScrollRef, tableScrollRef)}
            style={{ height: "1.5rem" }}
          >
            <div style={{ width: "200%" }}></div>
          </div>
          {/* <div
            className="border-2  overflow-x-auto scroll-mx-5"
            ref={tableScrollRef}
            onScroll={() => handleScroll(tableScrollRef, topScrollRef)}
          > */}
            <table className="table">
              <thead className="whitespace-nowrap">
                <tr className="">
                  <th className="border-2 border-gray-900">S.No.</th>
                  <th className="border-2 border-gray-900">Invoice No.</th>
                  <th className="border-2 border-gray-900">Product</th>
                  <th className="border-2 border-gray-900">KL/Qty</th>

                  <th className="border-2 border-gray-900">Rate/Unit</th>

                  <th className="border-2 border-gray-900">(Value)</th>

                  <th className="border-2 border-gray-900">Taxable Amount</th>

                  <th className="border-2 border-gray-900">Product Amount</th>

                  <th className="border-2 border-gray-900">VAT %</th>
                  <th className="border-2 border-gray-900">VAT/LST</th>

                  <th className="border-2 border-gray-900">CESS</th>
                  <th className="border-2 border-gray-900">TCS</th>

                  <th className="border-2 border-gray-900">T. AMT</th>
                  <th className="border-2 border-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {petrolInvoice.length > 0 &&
                  petrolInvoice.map((item, index) => (
                    <tr key={index}>
                      <td border-2 border-gray-900>{item.serialNumber}</td>
                      <td border-2 border-gray-900>{item.invoiceNumber}</td>
                      <td border-2 border-gray-900>{item.ProductName}</td>
                      <td border-2 border-gray-900>{item.klQty}</td>

                      <td border-2 border-gray-900>{item.rate}</td>

                      <td border-2 border-gray-900>{item.Value}</td>

                      <td border-2 border-gray-900>{item.taxamount}</td>

                      <td border-2 border-gray-900>{item.productAmount}</td>

                      <td border-2 border-gray-900>{item.vatPercent}</td>
                      <td border-2 border-gray-900>{item.vatlst}</td>

                      <td border-2 border-gray-900>{item.cess}</td>

                      <td border-2 border-gray-900>{item.tcs}</td>

                      <td border-2 border-gray-900>{item.totalAmount}</td>
                      <td border-2 border-gray-900>
                        {" "}
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
              </tbody>
            </table>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}