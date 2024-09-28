import axios from "axios";
import React, { useEffect, useState } from "react";

const PurchaseLfr = () => {
  const [product, setProduct] = useState("MS");
  const [dateType, setDateType] = useState("Day");
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [petrolInvoice, setPetrolInvoice] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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

  const handleShowClick = () => {
    const filtered = petrolInvoice.filter((item) => {
      const itemDate = new Date(item?.date);
      const selected = new Date(selectedDate);

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
      }

      const isProductMatch = product === "ALL" || item?.ProductName === product;

      return isDateMatch && isProductMatch;
    });

    setFilteredData(filtered);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  // Function to group and sum totalLfrValue by invoiceNumber and date

  function sumTotalLfrValueByInvoice(petrolInvoices) {
    // Group the totalLfrValue by invoiceNumber
    return petrolInvoices.reduce((acc, item) => {
      const invoiceNumber = item.invoiceNumber;
  
      // If the invoice number doesn't exist in the accumulator, initialize it
      if (!acc[invoiceNumber]) {
        acc[invoiceNumber] = 0;
      }
  
      // Add the totalLfrValue for this invoice to the accumulator
      acc[invoiceNumber] += parseFloat(item.totalLfrValue || 0);
  
      return acc;
    }, {});
  }
  
  const groupedTotals = sumTotalLfrValueByInvoice(filteredData);


  return (
    <div className="p-6">
      <h1 className="text-3xl text-white bg-[#3A1078] p-3 uppercase font-bold text-center mb-3">
        Reports
      </h1>

      <h1 className="text-2xl uppercase font-bold text-center mb-3">
        LFR FEEDING FOR TDS (194 I )
      </h1>

      <table className=" mb-4 w-[100%]">
        <tbody>
          <tr className="bg-[#008b8b] ">
            {/* Select Product */}
            <td className="p-2">
              <div className="flex flex-col">
                <label
                  htmlFor="product"
                  className=" font-bold mb-1 text-white p-2"
                >
                  Select Product
                </label>
                <select
                  id="product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="border rounded p-2 w-28"
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
                <label
                  htmlFor="dateType"
                  className="text-white font-bold mb-1 p-2"
                >
                  Date Type
                </label>
                <select
                  id="dateType"
                  value={dateType}
                  onChange={(e) => setDateType(e.target.value)}
                  className="border rounded p-2 w-40"
                >
                  <option value="Day">Day</option>
                  <option value="Month">Month</option>
                  <option value="Year">Year</option>
                  <option value="Between Dates">Between Dates</option>
                </select>
              </div>
            </td>

            {/* Select Date */}
            <td className="p-2">
              <div className="flex flex-col">
                <label htmlFor="date" className="text-white font-bold p-2 ">
                  Select Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border rounded p-2 w-48"
                />
              </div>
            </td>

            {/* Show Button */}
            <td className="p-2">
              <div className="flex flex-col justify-end">
                <button
                  onClick={handleShowClick}
                  className="bg-blue-800 text-white font-bold p-2 rounded hover:bg-blue-600 mt-9"
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
            <tr className="bg-gray-600 uppercase text-white">
              <th className="p-2 border-2 border-gray-300 text-center">
                SR. <br />
                NO.
              </th>

              <th className="p-2 border-2 border-gray-300 text-center">DATE</th>

              <th className="p-2 border">
                Invoice <br /> No.
              </th>
              <th className="p-2 border-2 border-gray-300 text-center">
                {" "}
                Product
              </th>

              <th className="p-2 border">
                Qty. <br /> (in KL)
              </th>
              <th className="p-2 border">
                LFR PER <br />
                KL RATE
              </th>
              <th className="p-2 border">
                LFR TAXABLE <br />
                AMOUNT
              </th>

              <th className="p-2 border-2 border-gray-300 text-center">
                CGST(9%)
              </th>
              <th className="p-2 border-2 border-gray-300 text-center">
                SGST(9%)
              </th>
              <th className="p-2 border">
                TOT. LFR <br /> AMOUNT
              </th>
              <th className="p-2 border-2 border-gray-300 text-center">
                TOTAL
              </th>
            </tr>
          </thead>


{/* 
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
                  item?.invoiceNumber !== array[index - 1].invoiceNumber;

                return (
                  <tr key={index} className="">
                    {isFirstRowOfInvoice && (
                      <td
                        rowSpan={
                          array.filter(
                            (rowItem) =>
                              rowItem.invoiceNumber === item?.invoiceNumber
                          ).length
                        }
                        className="border-2 border-gray-300 text-center p-2"
                      >
                        <div className="flex flex-col">
                          <span>{item?.serialNumber}</span>

                        </div>
                      </td>
                    )}

                  
                    {isFirstRowOfInvoice && (
                      <td
                        rowSpan={
                          array.filter(
                            (rowItem) =>
                              rowItem.invoiceNumber === item?.invoiceNumber
                          ).length
                        }
                        className="border-2 border-gray-300 text-center p-2"
                      >
                        <div className="flex flex-col">
                          <span>{formatDate(item?.date) || "--"}</span>
                        </div>
                      </td>
                    )}

                
            {isFirstRowOfInvoice && (
                      <td
                        rowSpan={
                          array.filter(
                            (rowItem) =>
                              rowItem.invoiceNumber === item?.invoiceNumber
                          ).length
                        }
                        className="border-2 border-gray-300 text-center p-2"
                      >
                        <div className="flex flex-col">
                        
                          <span> {item?.invoiceNumber}</span>
                        </div>
                      </td>
                    )}

                  
                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item?.ProductName || "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item?.klQty || "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {item?.lfrPerKl || "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {(item?.lfrTaxAmt).toFixed(2) || "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {(item?.cgst).toFixed(2) ||
                        "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {(item?.sgst).toFixed(2) ||
                        "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                      {(
                      item?.totalLfrValue
                      ).toFixed(2) || "--"}
                    </td>

                    <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                  
                    </td>
                  </tr>
                );
              })
            )}
          </tbody> */}

<tbody>
    {filteredData.length === 0 ? (
      <tr>
        <td className="border-2 border-gray-300 text-center p-2" colSpan="10">
          No data available for the selected criteria.
        </td>
      </tr>
    ) : (
      filteredData.map((item, index, array) => {
        // Check if this is the first product for this invoice
        const isFirstRowOfInvoice =
          index === 0 ||
          item?.invoiceNumber !== array[index - 1].invoiceNumber;

        // Calculate the sum for the current invoiceNumber

        return (
          <tr key={index} className="">
            {/* Merged SR NO, DATE, and INVOICE NO */}
            {isFirstRowOfInvoice && (
              <td
                rowSpan={
                  array.filter(
                    (rowItem) => rowItem.invoiceNumber === item?.invoiceNumber
                  ).length
                }
                className="border-2 border-gray-300 text-center p-2"
              >
                <div className="flex flex-col">
                  <span>{item?.serialNumber}</span>
                </div>
              </td>
            )}

            {/* date */}
            {isFirstRowOfInvoice && (
              <td
                rowSpan={
                  array.filter(
                    (rowItem) => rowItem.invoiceNumber === item?.invoiceNumber
                  ).length
                }
                className="border-2 border-gray-300 text-center p-2"
              >
                <div className="flex flex-col">
                  <span>{formatDate(item?.date) || "--"}</span>
                </div>
              </td>
            )}

            {/* invoiceNumber */}
            {isFirstRowOfInvoice && (
              <td
                rowSpan={
                  array.filter(
                    (rowItem) => rowItem.invoiceNumber === item?.invoiceNumber
                  ).length
                }
                className="border-2 border-gray-300 text-center p-2"
              >
                <div className="flex flex-col">
                  <span> {item?.invoiceNumber}</span>
                </div>
              </td>
            )}

            {/* Product Name */}
            <td className="border-2 border-gray-300 text-center p-2 w-[20]">
              {item?.ProductName || "--"}
            </td>

            {/* KL/Qty */}
            <td className="border-2 border-gray-300 text-center p-2 w-[20]">
              {item?.klQty || "--"}
            </td>

            {/* LFR Rate per KL */}
            <td className="border-2 border-gray-300 text-center p-2 w-[20]">
              {item?.lfrPerKl || "--"}
            </td>

            {/* Taxable Amount */}
            <td className="border-2 border-gray-300 text-center p-2 w-[20]">
              {item?.lfrTaxAmt.toFixed(2) || "--"}
            </td>

            {/* CGST */}
            <td className="border-2 border-gray-300 text-center p-2 w-[20]">
              {(item?.cgst).toFixed(2) || "--"}
            </td>

            {/* SGST */}
            <td className="border-2 border-gray-300 text-center p-2 w-[20]">
              {(item?.sgst).toFixed(2) || "--"}
            </td>

            {/* Total LFR Amount */}
            <td className="border-2 border-gray-300 text-center p-2 w-[20]">
              {(item?.totalLfrValue).toFixed(2) || "--"}
            </td>

            {/* Total LFR Amount Sum (For each invoice) */}
            {isFirstRowOfInvoice && (
              <td
                rowSpan={
                  array.filter(
                    (rowItem) => rowItem.invoiceNumber === item?.invoiceNumber
                  ).length
                }
                className="border-2 border-gray-300 text-center p-2 w-[20]"
              >
                {/* {totalLfrSum} */}
              </td>
            )}
          </tr>
        );
      })
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

export default PurchaseLfr;
