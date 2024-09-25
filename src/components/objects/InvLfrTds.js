import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const InvLfrTds = () => {
  const [petrolInvoice, setPetrolInvoice] = useState([]);

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

  useEffect(() => {
    handleFetchData();
  }, []);

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

     const navigate = useNavigate();

  const handleUpdate = (data) => {
    console.log("data for updation", data);
    navigate("/Petrol_Invoice_Feeding", {state:{data}})
    
  };
  const InvTotSum = petrolInvoice.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0
  );

  const totInvoiceAmt = petrolInvoice.reduce((accumulator, item) => {
    return accumulator + (item.totalAmount || 0); // Default to 0 if totalAmount is undefined or null
  }, 0);

  const productAmountSumTds = petrolInvoice.reduce((accumulator, item) => {
    return accumulator + (item.productAmount || 0); // Default to 0 if productAmount is undefined or null
  }, 0);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = String(today.getFullYear()).slice(-2); // Get last two digits of the year

    return `${day}-${month}-${year}`;
  };
  return (
    <>
      {/* 1. invoice feed start  */}
      <div className="lfr-tds-inv">
        <h1 className="font-bold text-2xl text-center mb-4 mt-4">
          INVOICE/LFR/TDS Report
        </h1>
        <div className="text-2xl  font-bold"> Date : {getCurrentDate()} </div>

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
                <th className="border-2 border-gray-900">Invoice No.</th>
                <th className="border-2 border-gray-900">Product</th>
                <th className="border-2 border-gray-900">KL/Qty</th>
                <th className="border-2 border-gray-900">x</th>
                <th className="border-2 px-2 border-gray-900">Rate/Unit</th>
                <th className="border-2 border-gray-900">=</th>
                <th className="border-2 px-2 border-gray-900">Value</th>
                <th className="border-2 border-gray-900">+</th>
                <th className="border-2 border-gray-900 w-16">
                  Taxable Amount
                </th>
                <th className="border-2 border-gray-900">=</th>
                <th className="border-2 border-gray-900">Product Amount</th>
                <th className="border-2 border-gray-900">x</th>
                <th className="border-2 border-gray-900">VAT %</th>
                <th className="border-2 border-gray-900">=</th>
                <th className="border-2 border-gray-900">VAT/LST</th>
                <th className="border-2 border-gray-900">+</th>
                <th className="border-2 border-gray-900">CESS</th>
                <th className="border-2 border-gray-900">+</th>
                <th className="border-2 border-gray-900">TCS</th>
                <th className="border-2 border-gray-900">=</th>
                <th className="border-2 border-gray-900">T Amount</th>
                <th className="border-2 border-gray-900">T inv Amount</th>
                <th className="border-2 border-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {petrolInvoice.length > 0 &&
                petrolInvoice.map((item, index, array) => {
                  // Check if this is the first product for this invoice
                  const isFirstRowOfInvoice =
                    index === 0 ||
                    item.invoiceNumber !== array[index - 1].invoiceNumber;

                  return (
                    <tr key={index} className="text-center">
                      {/* SR NO and INVOICE NO Merging */}
                      {isFirstRowOfInvoice && (
                        <>
                          {/* S.No */}
                          <td
                            rowSpan={
                              array.filter(
                                (rowItem) =>
                                  rowItem.invoiceNumber === item.invoiceNumber
                              ).length
                            }
                            className="border-2 border-gray-900"
                          >
                            {item.serialNumber}
                          </td>

                          {/* Invoice No */}
                          <td
                            rowSpan={
                              array.filter(
                                (rowItem) =>
                                  rowItem.invoiceNumber === item.invoiceNumber
                              ).length
                            }
                            className="border-2 border-gray-900"
                          >
                            {item.invoiceNumber}
                          </td>
                        </>
                      )}

                      {/* Product Name */}
                      <td className="border-2 border-gray-900">
                        {item.ProductName}
                      </td>

                      {/* KL/Qty */}
                      <td className="border-2 border-gray-900">{item.klQty}</td>
                      <td className="border-2 border-gray-900 w-[1%]">x</td>

                      {/* Rate per Unit */}
                      <td className="border-2 border-gray-900">{item.rate}</td>
                      <td className="border-2 border-gray-900 w-[1%]">=</td>

                      {/* Value */}
                      <td className="border-2 border-gray-900">{item.Value}</td>
                      <td className="border-2 border-gray-900 w-[1%]">+</td>

                      {/* Taxable Amount */}
                      <td className="border-2 border-gray-900 w-16">
                        {item.taxamount}
                      </td>
                      <td className="border-2 border-gray-900 w-[1%]">=</td>

                      {/* Product Amount */}
                      <td className="border-2 border-gray-900">
                        {item.productAmount}
                      </td>
                      <td className="border-2 border-gray-900 w-[1%]">x</td>

                      {/* VAT % */}
                      <td className="border-2 border-gray-900 w-[12]">
                        {item.vat}
                      </td>
                      <td className="border-2 border-gray-900 w-[1%]">=</td>

                      {/* VAT/LST */}
                      <td className="border-2 border-gray-900">
                        {item.vatlst.toFixed()}
                      </td>
                      <td className="border-2 border-gray-900 w-[1%]">+</td>

                      {/* CESS */}
                      <td className="border-2 border-gray-900">{item.cess}</td>
                      <td className="border-2 border-gray-900 w-[1%]">+</td>

                      {/* TCS */}
                      <td className="border-2 border-gray-900">{item.tcs}</td>
                      <td className="border-2 border-gray-900 w-[1%]">=</td>

                      {/* Total Amount */}
                      <td className="border-2 border-gray-900">
                        {item.totalAmount}
                      </td>

                      {/* Total Invoice Amount */}
                      <td className="border-2 border-gray-900">
                        {InvTotSum.toFixed(2)}
                      </td>

                      {/* Action */}
                      <td className="border-2 border-gray-900 flex">
                      <button
                          onClick={() => handleUpdate(item)}
                          type="button"
                          className="w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white"
                        >
                          <MdEdit color="green" size={25} />
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
            </tbody>
          </table>

          <div className="flex justify-between mt-2">
            <div></div>

            <div
              className="text-center mr-16 font-bold border-gray-900"
              colSpan={4}
            >
              T. Invoice Amt:{" "}
              <span className="border-2 p-2 border-gray-900">
                {" "}
                {totInvoiceAmt.toFixed(2)}{" "}
              </span>
            </div>
          </div>
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


          <table className="">
            <thead className="">
              <tr className="text-center uppercase">
                <th className="border-2 border-gray-900">S.No.</th>
                <th className="border-2 border-gray-900">Invoice No.</th>
                <th className="border-2 border-gray-900">Product</th>
                <th className="border-2 border-gray-900">KL/Qty</th>
                <th className="border-2 border-gray-900">
                  Value <br />
                  (A)
                </th>
                <th className="border-2 border-gray-900 w-[1%] text">+</th>
                <th className="border-2 border-gray-900">
                  Taxable Amt. <br />
                  (B)
                </th>
                <th className="border-2 border-gray-900 w-[1%] text">=</th>
                <th className="border-2 border-gray-900">
                  Product amt. <br />
                  (C)
                </th>
                <th className="border-2 border-gray-900">x</th>
                <th className="border-2 border-gray-900">tds(%)</th>
                <th className="border-2 border-gray-900">Act. tds payable</th>
                <th className="border-2 border-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {petrolInvoice.length > 0 &&
                petrolInvoice.map((item, index, array) => {
                  const isFirstRowOfInvoice =
                    index === 0 ||
                    item.invoiceNumber !== array[index - 1].invoiceNumber;

                  return (
                    <tr key={index} className="text-center">
                      {/* S.No. and Invoice No. merging */}
                      {isFirstRowOfInvoice && (
                        <>
                          {/* S.No */}
                          <td
                            rowSpan={
                              array.filter(
                                (rowItem) =>
                                  rowItem.invoiceNumber === item.invoiceNumber
                              ).length
                            }
                            className="border-2 border-gray-900"
                          >
                            {item.serialNumber}
                          </td>

                          {/* Invoice No */}
                          <td
                            rowSpan={
                              array.filter(
                                (rowItem) =>
                                  rowItem.invoiceNumber === item.invoiceNumber
                              ).length
                            }
                            className="border-2 border-gray-900"
                          >
                            {item.invoiceNumber}
                          </td>
                        </>
                      )}

                      {/* Product */}
                      <td className="border-2 border-gray-900">
                        {item.ProductName}
                      </td>
                      <td className="border-2 border-gray-900">{item.klQty}</td>
                      <td className="border-2 border-gray-900">{item.Value}</td>
                      <td className="border-2 border-gray-900 w-[1%]">+</td>
                      <td className="border-2 border-gray-900">
                        {item.taxamount}
                      </td>
                      <td className="border-2 border-gray-900 w-[1%]">=</td>
                      <td className="border-2 border-gray-900">
                        {item.productAmount}
                      </td>
                      <td className="border-2 border-gray-900">x</td>
                      <td className="border-2 border-gray-900">{item.tds}</td>
                      <td className="border-2 border-gray-900">
                        {(item.productAmount * item.tds).toFixed(2)}
                      </td>

                      {/* Action Button */}
                      <td className="border-2 border-gray-900">
                        <button
                          onClick={() => handleUpdate(item)}
                          type="button"
                          className="w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white"
                        >
                          <MdEdit color="green" size={25} />
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

              {/* Total Amount Row */}
              <tr>
                <td colSpan={7}></td>
                <td className="text-center font-bold border-2 border-gray-900">
                  Tot. <br /> Amt:
                </td>
                <td className="border-2 border-gray-900 text-center w-[2%]">
                  {productAmountSumTds.toFixed(2)}
                </td>
              </tr>

              {/* TDS Input Row */}
              <tr>
                <td colSpan={7}></td>
                <td className="text-center font-bold border-2 border-gray-900">
                  TDS <br />
                  (194Q)
                </td>
                <td className="border-2 border-gray-900">
                  <input
                    type="text"
                    name="tds"
                    className="p-2 rounded-md text-center"
                    value={0.001}
                    // value={petrolInvoice[0].tds} // You can uncomment this based on how TDS is being used
                  />
                </td>
              </tr>

              {/* TDS Payable Row */}
              <tr>
                <td colSpan={7}></td>
                <td className="font-bold border-2 border-gray-900">
                  tds payable
                </td>
                <td className="border-2 border-gray-900">
                  <input
                    type="text"
                    name="tdsPayable"
                    className="p-2 rounded-md text-center"
                    value={(productAmountSumTds * 0.001).toFixed(2)} // Example value
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


          <table className="">
            <thead className="">
              <tr className="text-center uppercase px-2 py-1">
                <th className="border-2 border-gray-900 px-2 py-1">SR.No.</th>
                <th className="border-2 border-gray-900 px-2 py-1">
                  Invoice No.
                </th>
                <th className="border-2 border-gray-900 px-2 py-1">Product</th>
                <th className="border-2 border-gray-900 px-2 py-1">KL/Qty</th>
                <th className="border-2 border-gray-900 w-[1%]">x</th>
                <th className="border-2 border-gray-900">LFR Per Kl</th>
                <th className="border-2 border-gray-900 w-8">=</th>
                <th className="border-2 border-gray-900">
                  Taxable <br /> Amount
                </th>
                <th className="border-2 border-gray-900 w-[1%]">+</th>
                <th className="border-2 border-gray-900">CGST</th>
                <th className="border-2 border-gray-900 w-8">%</th>
                <th className="border-2 border-gray-900">Tot CGST</th>
                <th className="border-2 border-gray-900 w-8">+</th>
                <th className="border-2 border-gray-900">SGST</th>
                <th className="border-2 border-gray-900 w-8">%</th>
                <th className="border-2 border-gray-900">Tot SGST</th>
                <th className="border-2 border-gray-900">Total LFR value</th>
                <th className="border-2 border-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {petrolInvoice.length > 0 &&
                petrolInvoice.map((item, index, array) => {
                  const total = item.klQty * item.lfrPerKl;
                  const totCgst = total * item.cgst;
                  const totSgst = total * item.sgst;
                  const totalLfrValue = total + totCgst + totSgst;

                  // Check if this is the first row of the invoice
                  const isFirstRowOfInvoice =
                    index === 0 ||
                    item.invoiceNumber !== array[index - 1].invoiceNumber;

                  return (
                    <tr key={index} className="text-center">
                      {/* S.No. and Invoice No. merging */}
                      {isFirstRowOfInvoice && (
                        <>
                          {/* S.No */}
                          <td
                            rowSpan={
                              array.filter(
                                (rowItem) =>
                                  rowItem.invoiceNumber === item.invoiceNumber
                              ).length
                            }
                            className="border-2 border-gray-900"
                          >
                            {item.serialNumber}
                          </td>

                          {/* Invoice No */}
                          <td
                            rowSpan={
                              array.filter(
                                (rowItem) =>
                                  rowItem.invoiceNumber === item.invoiceNumber
                              ).length
                            }
                            className="border-2 border-gray-900"
                          >
                            {item.invoiceNumber}
                          </td>
                        </>
                      )}

                      {/* Product Details */}
                      <td className="border-2 border-gray-900">
                        {item.ProductName}
                      </td>
                      <td className="border-2 border-gray-900 w-[4%]">
                        {item.klQty}
                      </td>
                      <td className="border-2 border-gray-900 font-bold w-[1%]">
                        x
                      </td>
                      <td className="border-2 border-gray-900">
                        {item.lfrPerKl}
                      </td>
                      <td className="border-2 border-gray-900 font-bold w-[1%]">
                        =
                      </td>
                      <td className="border-2 border-gray-900">
                        {total.toFixed(2)}
                      </td>
                      <td className="border-2 border-gray-900 w-[1%] font-bold">
                        +
                      </td>
                      <td className="border-2 border-gray-900">{item.cgst}</td>
                      <td className="border-2 border-gray-900 w-8">%</td>
                      <td className="border-2 border-gray-900">
                        {totCgst.toFixed(2)}
                      </td>
                      <td className="border-2 border-gray-900 w-8">+</td>
                      <td className="border-2 border-gray-900">{item.sgst}</td>
                      <td className="border-2 border-gray-900 w-8">%</td>
                      <td className="border-2 border-gray-900">
                        {totSgst.toFixed(2)}
                      </td>
                      <td className="border-2 border-gray-900">
                        {totalLfrValue.toFixed(2)}
                      </td>

                      {/* Action Button */}
                      <td className="border-2 border-gray-900">
                      <button
                          onClick={() => handleDelete(item._id)}
                          type="button"
                          className="w-10 h-10 inline-flex items-center justify-center rounded border-none outline-none shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] bg-white"
                        >
                          <MdEdit color="green" size={25} />
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

              {/* Total Amount Row */}
              {petrolInvoice.length > 0 && (
                <tr>
                  <td colSpan={7} className="text-right font-bold">
                    TOTAL
                  </td>

                  <td className="border-2 border-gray-900  text-center">
                    {petrolInvoice
                      .reduce(
                        (sum, item) => sum + item.klQty * item.lfrPerKl,
                        0
                      )
                      .toFixed(2)}
                  </td>

                  <td colSpan={3} className="border-2 border-gray-900"></td>
                  <td className="border-2 text-center border-gray-900">
                    {petrolInvoice
                      .reduce(
                        (sum, item) =>
                          sum + item.klQty * item.lfrPerKl * item.cgst,
                        0
                      )
                      .toFixed(2)}
                  </td>

                  <td colSpan={3} className="border-2 border-gray-900"></td>
                  <td className="border-2 text-center border-gray-900">
                    {petrolInvoice
                      .reduce(
                        (sum, item) =>
                          sum + item.klQty * item.lfrPerKl * item.sgst,
                        0
                      )
                      .toFixed(2)}
                  </td>

                  <td className="border-2 text-center border-gray-900">
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

              <tr>
                <td colSpan={7} className="text-right font-bold">
                  TDS(LFR)%:
                </td>

                <td className="border-2 border-gray-900 text-center">{0.1}</td>
              </tr>

              {petrolInvoice.length > 0 && (
                <tr>
                  <td colSpan={7} className="text-right font-bold">
                    LFR payable:
                  </td>

                  <td className="border-2 border-gray-900  text-center">
                    {petrolInvoice.reduce(
                      (sum, item) => sum + item.klQty * item.lfrPerKl,
                      0
                    ) * (0.1).toFixed(2)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* 3. lfr end */}
    </>
  );
};

export default InvLfrTds;
