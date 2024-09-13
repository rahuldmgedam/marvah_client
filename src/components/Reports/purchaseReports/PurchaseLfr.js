// import React from 'react'

// const PurchaseLfr = () => {
//   return (
//     <div>PurchaseLfr</div>
//   )
// }

// export default PurchaseLfr
import axios from "axios";
import React, { useEffect, useState } from "react";

const PurchaseLfr = () => {
  const [product, setProduct] = useState("MS");
  const [dateType, setDateType] = useState("Day");
  const [selectedDate, setSelectedDate] = useState(Date.now());
  const [petrolInvoice, setPetrolInvoice] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fuelData = [
    {
        "_id": "66dacc7afd1863bd0621ae8c",
        "ProductName": "MS",
        "Value": "685110.6",
        "cess": 5120,
        "invoiceNumber": "33",
        "klQty": "9",
        "productAmount": 686442.6,
        "rate": 76123.4,
        "serialNumber": 3,
        "taxamount": 148,
        "tcs": 0,
        "totalAmount": 904133.2,
        "vat": 1,
        "vatlst": 171610.6,
        "vatPercent": 25,
        "date": "Fri Sep 06 2024 14:54:52 GMT+0530 (India Standard Time)",
        "show": false,
        "productAmountSumTds": 905374.3,
        "tds": "",
        "tdsAmount": 905.37,
        "totalProductAmt":905374.4
    },
    {
        "_id": "66dad75179e46abad51469a5",
        "ProductName": "HSD",
        "Value": "218487.7",
        "cess": 0,
        "invoiceNumber": "33",
        "klQty": "3",
        "productAmount": 218931.7,
        "rate": 72829.24,
        "serialNumber": 2,
        "taxamount": 148,
        "tcs": 0,
        "totalAmount": 264907.4,
        "vat": 1,
        "vatlst": 45975.7,
        "vatPercent": 21,
        "date": "Fri Sep 06 2024 15:04:53 GMT+0530 (India Standard Time)",
        "show": false,
        "productAmountSumTds": 686442.6,
        "tds": "",
        "tdsAmount": 905.37,
        "totalProductAmt":905374.4
    },
    {
        "_id": "66dfdbb4a8e22f0d686ce6aa",
        "ProductName": "MS",
        "Value": "685110.6",
        "cess": 5120,
        "invoiceNumber": "1423631150",
        "klQty": "9",
        "productAmount": 686442.6,
        "rate": 76123.4,
        "serialNumber": 3,
        "taxamount": 148,
        "tcs": 0,
        "totalAmount": 904133.2,
        "vat": 1,
        "vatlst": 171610.6,
        "vatPercent": 25,
        "date": "Tue Sep 10 2024 10:53:58 GMT+0530 (India Standard Time)",
        "show": false,
        "productAmountSumTds": 905374.3,
        "tdsAmount": 905.37,
        "totalProductAmt":905374.4
    },
    {
        "_id": "66dfdbeda8e22f0d686ce6ad",
        "ProductName": "HSD",
        "Value": "218487.7",
        "cess": 0,
        "invoiceNumber": "1423631150",
        "klQty": "3",
        "productAmount": 218931.7,
        "rate": 72829.24,
        "serialNumber": 4,
        "taxamount": 148,
        "tcs": 0,
        "totalAmount": 264907.4,
        "vat": 1,
        "vatlst": 45975.7,
        "vatPercent": 21,
        "date": "Tue Sep 10 2024 10:53:58 GMT+0530 (India Standard Time)",
        "show": false,
        "productAmountSumTds": 1591816.9,
        "tdsAmount": 905.37,
        "totalProductAmt":905374.4
    }
]


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
    const filtered = fuelData.filter((item) => {
      const itemDate = new Date(item.date);
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
  
      const isProductMatch = product === "ALL" || item.ProductName === product;
  
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

  return (
    <div className="p-6">
      <h1 className="text-2xl uppercase font-bold text-center mb-3">
        LFR FEEDING FOR TDS (194 I)
      </h1>


      <table className=" mb-4 w-[80%]">
  <tbody>
    <tr className="bg-[#008b8b] ">
      {/* Select Product */}
      <td className="p-2">
        <div className="flex flex-col">
          <label htmlFor="product" className=" font-bold mb-1 text-white p-2">
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
      <div className="bg-gray-100 p-4 rounded shadow-md">
        <table className="">
          <thead>
            <tr className="bg-gray-600 uppercase text-white">
              <th className="p-2 border-2 border-gray-300 text-center">
                SR. <br />
                NO.
              </th>
              <th className="p-2 border-2 border-gray-300 text-center">
                Product
              </th>

              <th className="p-2 border-2 border-gray-300 text-center">DATE</th>
              <th className="p-2 border">
                Invoice <br /> No.
              </th>
              <th className="p-2 border">Qty. <br /> (in KL)</th>
              <th className="p-2 border">
                LFR PER <br />KL RATE
              </th>
              <th className="p-2 border">
              LFR TAXABLE  <br />
               AMOUNT
              </th>
              <th className="p-2 border">
                TOT. LFR <br /> AMOUNT
              </th>
              <th className="p-2 border-2 border-gray-300 text-center">
                CGST(9%)
              </th>
              <th className="p-2 border-2 border-gray-300 text-center">
                SGST(9%)
              </th>
              <th className="p-2 border-2 border-gray-300 text-center">
                TOTAL
              </th>
            </tr>
          </thead>
          {/* <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="border-2 border-gray-300 text-center p-2 w-[8]">
                  {(index + 1)}
                </td>
                <td className="border-2 border-gray-300 text-center p-2 w-[12]">
                  {item.ProductName}
                </td>

                <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                  {formatDate(item.date)}
                </td>
                <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                  {item.invoiceNumber}
                </td>
                <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                  {item.klQty}
                </td>

                <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                  {item.productAmount}
                </td>
                <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                  {item.totalProductAmt}
                </td>
                <td className="border-2 border-gray-300 text-center p-2 w-[20]">
                  {item.tdsAmount}
                </td>
              </tr>
            ))}
          </tbody> */}
          <tbody>
  {filteredData.length === 0 ? (
    // Show this row if no data is found
    <tr>
      <td className="border-2 border-gray-300 text-center p-2" colSpan="10">
        No data available for the selected criteria.
      </td>
    </tr>
  ) : (
    // Map through filteredData and display rows
    filteredData.map((item, index) => (
      <tr key={index}>
        <td className="border-2 border-gray-300 text-center p-2 w-[8]">
          {index + 1}
        </td>
        <td className="border-2 border-gray-300 text-center p-2 w-[12]">
          {item.ProductName || "--"}
        </td>
        <td className="border-2 border-gray-300 text-center p-2 w-[20]">
          {formatDate(item.date) || "--"}
        </td>
        <td className="border-2 border-gray-300 text-center p-2 w-[20]">
          {item.invoiceNumber || "--"}
        </td>
        <td className="border-2 border-gray-300 text-center p-2 w-[20]">
          {item.klQty || "--"}
        </td>
        <td className="border-2 border-gray-300 text-center p-2 w-[20]">
          {item.productAmount || "--"}
        </td>
        <td className="border-2 border-gray-300 text-center p-2 w-[20]">
          {item.totalProductAmt || "--"}
        </td>
        <td className="border-2 border-gray-300 text-center p-2 w-[20]">
          {item.tdsAmount || "--"}
        </td>
        <td className="border-2 border-gray-300 text-center p-2 w-[20]">
          {item.tdsAmount || "--"}
        </td>
        <td className="border-2 border-gray-300 text-center p-2 w-[20]">
          {item.tdsAmount || "--"}
        </td>
        <td className="border-2 border-gray-300 text-center p-2 w-[20]">
          {item.tdsAmount || "--"}
        </td>
        
      </tr>
    ))
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


