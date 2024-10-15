import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PurchasetdsMain = () => {
  const [product, setProduct] = useState("ALL");
  const [dateType, setDateType] = useState("Day");
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [petrolInvoice, setPetrolInvoice] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [endDate, setEndDate] = useState('')

  const handleFetchData = () => {
    axios
      .get("https://marvah-server.onrender.com/petrolInvoiceFeeding")
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

  const handleShowClick = () => {
    const filtered = petrolInvoice.filter((item) => {
      // const itemDate = new Date(item.date);
      // const selected = new Date(selectedDate);

      const itemDate = new Date(item.date); // Keep itemDate as a Date object
      itemDate.setHours(0, 0, 0, 0); // Set hours to start of the day
  
      const selected = new Date(selectedDate); // Keep selectedDate as a Date object
      selected.setHours(0, 0, 0, 0); // Set hours to start of the day

      let isDateMatch = false;

      if (dateType === "Day") {
        isDateMatch =
          itemDate.getDate() === selected.getDate() &&
          itemDate.getMonth() === selected.getMonth() &&
          itemDate.getFullYear() === selected.getFullYear();
      } else if (dateType === "Month") {
        isDateMatch =
          itemDate.getMonth() === selected.getMonth() &&
          itemDate.getFullYear() === selected.getFullYear();
      } else if (dateType === "Year") {
        isDateMatch = itemDate.getFullYear() === selected.getFullYear();
      } else if (dateType === "Between") {
        const end = new Date(endDate); // Keep endDate as a Date object
        end.setHours(23, 59, 59, 999); // Set endDate to end of the day
        isDateMatch = isDateBetween(itemDate, selected, end);
      }

      const isProductMatch = product === "ALL" || item.ProductName === product;

      return isDateMatch && isProductMatch;
    });

    setFilteredData(filtered);
  };
  function isDateBetween(date, startDate, endDate) {
    
    return date >= startDate && date <= endDate;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const productAmountSum = filteredData?.reduce(
    (sum, item) => sum + (item.productAmount || 0),
    0
  );

  // console.log("productAmountSum", totalInvAmtSumGrand);

  const totalInvAmtSumGrand = filteredData.reduce(
    (sum, item) => sum + (item.productAmount || 0),
    0
  );
  console.log("totalInvAmtSumGrand", totalInvAmtSumGrand);
    
const navigate =   useNavigate();
  return (
    <div className="p-6">
      <h1 className="text-2xl uppercase font-bold text-center mb-3">
        PURCHASE/TDS REPORT
      </h1>
      <div className="flex justify-between w-[100%] mb-4">
        <div></div>
        <div className="flex gap-6">
        <button
          className="bg-blue-500 px-2 py-1 rounded-md text-white"
          onClick={() => navigate('/purchasetds')}
          >
            Purchase Invoice
          </button>
          <button
          className="bg-blue-500 px-2 py-1 rounded-md text-white"
          onClick={() => navigate('/purchaselfr')}
          >
            Purchase LFR
          </button>
          <button
            className="bg-blue-500 px-2 py-1 rounded-md text-white"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
      <table className="ml-6 mb-4 w-[100%]">
        <thead className="bg-[#008b8b] text-white">
          <tr className="border border-gray-400">
            <th className="p-2 border border-gray-400">Select Product</th>
            <th className="p-2 border border-gray-400">Select Date Type</th>
            <th className="p-2 border border-gray-400">Select Date</th>
            <th className="p-2 border border-gray-400">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            {/* Select Product */}
            <td className="p-2">
              <div className="flex flex-col">
                <select
                  id="product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="border rounded p-2 w-full"
                >
                  <option value="ALL">ALL</option>
                  <option value="MS">MS</option>
                  <option value="MS-2">MS-2</option>
                  <option value="HSD">HSD</option>
                </select>
              </div>
            </td>

            {/* Select Date Type */}
            <td className="p-2">
              <div className="flex flex-col">
                <select
                  id="dateType"
                  value={dateType}
                  onChange={(e) => setDateType(e.target.value)}
                  className="border rounded p-2 w-full"
                >
                  <option value="Day">Day</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                  <option value="Between">Between Dates</option>
                </select>
              </div>
            </td>

            {dateType === 'Between' ? (
              <td className="p-2 flex items-center gap-6">
                <input  
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded p-2 w-full"
                />
                <input  
                type="date"
                className="border rounded p-2 w-full"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                />
              </td>
            ) : (
              
              <td className="p-2">
              <div className="flex flex-col">
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
            </td>
            )}

            {/* Select Date */}

            {/* Show Button */}
            <td className="p-2">
              <div className="flex flex-col justify-end">
                <button
                  onClick={handleShowClick}
                  className="bg-blue-800 text-white font-bold p-2 rounded hover:bg-blue-600"
                >
                  Show
                </button>
              </div>
            </td>
          </tr>

          {/* Optional Second Row for Additional Inputs */}
          <tr className="">
            {/* Placeholder for Additional Inputs or Info */}
            <td className="p-2" colSpan="4">
              {/* Additional content or empty space for flexibility */}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Report Table */}
      <div className=" p-4 rounded shadow-md">
        <table className="">
          <thead>
            <tr className="bg-gray-600 uppercase text-white text-center">
              <th className="p-2 border-2 border-gray-300 text-center">
                SR. <br /> NO.
              </th>
              <th className="p-2 border-2 border-gray-300 text-center">DATE</th>
              <th className="p-2 border">
                Invoice <br /> No.
              </th>
              <th className="p-2 border-2 border-gray-300 text-center">
                Product
              </th>
              <th className="p-2 border">
                Qty. <br /> (in KL)
              </th>
              <th className="p-2 border">
                A. TOT. <br /> VALUE
              </th>
              <th className="p-2 border">
                DLY/TAX CHARGES
              </th>
              <th className="p-2 border">
                A. VALUE
              </th>
              <th className="p-2 border">
                0.10%
              </th>
              <th className="p-2 border">
                ACT. TDS AMOUNT
              </th>
              <th className="p-2 border">
                TOTAL TDS AMOUNT
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td
                  className="border-2 border-gray-300 text-center p-2"
                  colSpan="10"
                >
                  No data available for the selected criteria.
                </td>
              </tr>
            ) : (
              filteredData.map((item, index, array) => {
                const isFirstRowOfInvoice =
                  index === 0 ||
                  item.invoiceNumber !== array[index - 1].invoiceNumber;

                return (
                  <tr key={index} className="">
                    {isFirstRowOfInvoice && (
                      <td
                        rowSpan={
                          array.filter(
                            (rowItem) =>
                              rowItem.invoiceNumber === item.invoiceNumber
                          ).length
                        }
                        className="border-2 border-gray-300 text-center p-2"
                      >
                        <div className="flex flex-col">
                          <span>{item.serialNumber}</span>
                        </div>
                      </td>
                    )}
                    {isFirstRowOfInvoice && (
                      <td
                        rowSpan={
                          array.filter(
                            (rowItem) =>
                              rowItem.invoiceNumber === item.invoiceNumber
                          ).length
                        }
                        className="border-2 border-gray-300 text-center p-2"
                      >
                        <div className="flex flex-col">
                          <span>{formatDate(item.date) || "--"}</span>
                        </div>
                      </td>
                    )}
                    {isFirstRowOfInvoice && (
                      <td
                        rowSpan={
                          array.filter(
                            (rowItem) =>
                              rowItem.invoiceNumber === item.invoiceNumber
                          ).length
                        }
                        className="border-2 border-gray-300 text-center p-2"
                      >
                        <div className="flex flex-col">
                          <span>{item.invoiceNumber}</span>
                        </div>
                      </td>
                    )}
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item.ProductName || "--"}
                    </td>
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item.klQty || "--"}
                    </td>
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item.Value || "--"}
                    </td>
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                        {item.taxamount || "--"}
                    </td>
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                        {item.productAmount || "--"}
                    </td>
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                        {item.tds || "--"}
                    </td>
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                        {(item.productAmount * item.tds).toFixed(2)}
                    </td>
                    {isFirstRowOfInvoice && (
                        <td rowSpan={array.filter((rowItem) => rowItem.invoiceNumber === item.invoiceNumber).length} className="border-2 border-gray-300 text-center p-2 w-[20]">
                            {(totalInvAmtSumGrand).toFixed(2) * item.tds}
                        </td>
                    )}
                  </tr>
                );
              })
            )}

            {/* Total Sum Row */}
            {filteredData.length > 0 && (
              <tr hidden className="bg-gray-100 font-bold">
                <td
                  colSpan="4"
                  className="border-2 border-gray-300  p-2 text-center"
                >
                  Total:
                </td>
                <td className="border-2 border-gray-300 text-center p-2">
                  {filteredData?.reduce(
                    (sum, item) => sum + +(item.klQty || 0),
                    0
                  )}
                </td>
                <td className="border-2 border-gray-300 text-center p-2">
                  {(filteredData?.reduce(
                    (sum, item) => sum + (item.productAmount || 0),
                    0
                  )).toFixed(2)}
                </td>
                <td className="border-2 border-gray-300 text-center p-2">
                  {(filteredData?.reduce(
                    (sum, item) => sum + (item.vatlst || 0),
                    0
                  )).toFixed(2)}
                </td>
                <td className="border-2 border-gray-300 text-center p-2">
                  {(filteredData.reduce(
                    (sum, item) => sum + (item.cess || 0),
                    0
                  )).toFixed(2)}
                </td>
                <td className="border-2 border-gray-300 text-center p-2">
                  {(filteredData.reduce((sum, item) => sum + (item.tcs || 0), 0)).toFixed(2)}
                </td>
                <td className="border-2 border-gray-300 text-center p-2">
                {(totalInvAmtSumGrand).toFixed(2)}
                </td>
                <td className="border-2 border-gray-300 text-center p-2">
                {1193885}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Print Button */}
      <div className="mt-4">
        <button className="bg-purple-500 text-white font-bold p-2 rounded hover:bg-purple-600">
          Print
        </button>
      </div>
    </div>
  );
};

export default PurchasetdsMain;