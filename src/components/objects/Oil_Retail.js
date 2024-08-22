
import React, { useEffect, useState } from "react";
import axios from "axios";

const Retail_Stock_Sale = () => {
  const [oilProductData, setOilProductData] = useState([]);

  const fetchPurchaseOil = async () => {
    try {
      const res = await axios.get("http://localhost:4000/purchaseoil");
      const dataWithCalculatedFields = res.data.map((item) => ({
        ...item,
        opStock: item.opStock , // Initialize opStock if not already set
        invardStock: item.invardStock, // Initialize invardStock if not already set
        qtySale: item.qtySale, // Initialize qtySale if not already set
        discountAmt: item.discountAmt, // Initialize discountAmt if not already set
        totOpStock: item.opStock + item.invardStock,
        balStock: item.opStock + item.invardStock - item.qtySale,
        saleAmt: (item.qtySale * item.mrp),
        actualSaleAmt: (item.qtySale * item.mrp) - item.discountAmt,
      }));
      setOilProductData(dataWithCalculatedFields);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPurchaseOil();
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedData = [...oilProductData];
    updatedData[index][field] = Number(value);

    // Recalculate dependent fields
    updatedData[index].totOpStock = updatedData[index].opStock + updatedData[index].invardStock;
    updatedData[index].balStock = updatedData[index].totOpStock - updatedData[index].qtySale;
    updatedData[index].saleAmt = updatedData[index].qtySale * updatedData[index].mrp;
    updatedData[index].actualSaleAmt = updatedData[index].saleAmt - updatedData[index].discountAmt;

    setOilProductData(updatedData);
  };

  const saveRetailStockAndSales = async () => {
    try {
      await axios.post("http://localhost:4000/retailoil/create", oilProductData);
      alert("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data!");
    }
  };

  return (
    <div>
      <div className="">
        <h2 className="mb-2 text-2xl text-green-500 uppercase text-center">
          Retail Stock/Sale Record
        </h2>
        <table className="bg-white border border-gray-700">
          <thead className="">
            <tr className="bg-[#3A1078] text-white uppercase text-sm">
              {/* Table Headers */}
              <th className="py-1 px-2 text-center">
                Sr. <br /> No
              </th>
              <th className="py-1 px-2 text-center">
                Product <br /> Name
              </th>
              <th className="py-1 px-2 text-center">Grade</th>
              <th className="py-1 px-2 text-center">Colour</th>
              <th className="py-1 px-2 text-center">
                Volume <br /> (per PCS)
              </th>
              <th className="py-1 px-2 text-center">MRP</th>
              <th className="py-1 px-2 text-center">
                Opening <br /> Stock (+)
              </th>
              <th className="py-1 px-2 text-center">
                Inward <br /> Stock (+)
              </th>
              <th className="py-1 px-2 text-center">
                Total <br /> Op Stock (=)
              </th>
              <th className="py-1 px-2 text-center">
                Quantity <br /> Sale (-)
              </th>
              <th className="py-1 px-2 text-center">
                Balance <br /> Stock (=)
              </th>
              <th className="py-1 px-2 text-center">
                Sale <br /> Amt (-)
              </th>
              <th className="py-1 px-2 text-center">
                Discount <br /> Amt (-)
              </th>
              <th className="py-1 px-2 text-center">
                Actual <br /> Sale Amt (=)
              </th>
            </tr>
          </thead>
          <tbody className="text-md">
            {oilProductData.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-1 border-r">
                  <input
                    className="w-8 text-center"
                    type="number"
                    value={item.srNo}
                    readOnly
                  />
                </td>
                <td className="px-1 border-r">
                  <input
                    className="w-32 text-center"
                    type="text"
                    value={item.productName}
                    readOnly
                  />
                </td>
                <td className="px-1 border-r">
                  <input
                    className="w-24 text-center"
                    type="text"
                    value={item.grade}
                    readOnly
                  />
                </td>
                <td className="px-1 border-r">
                  <input
                    className="w-20 text-center"
                    type="text"
                    value={item.colour}
                    readOnly
                  />
                </td>
                <td className="text-center px-1 border-r">
                  <input
                    className="w-16 text-center"
                    type="text"
                    value={item.volumePerPieces}
                    readOnly
                  />
                </td>
                <td className="text-center px-1 border-r">
                  <input
                    className="w-16 text-center"
                    type="number"
                    value={item.mrp}
                    readOnly
                  />
                </td>
                <td className="text-center px-1 border-r">
                  <input
                    className="w-12 text-center border-4 border-blue-500"
                    type="number"
                    value={item.opStock}
                    onChange={(e) =>
                      handleInputChange(index, "opStock", e.target.value)
                    }
                  />
                </td>
                <td className="text-center px-1 border-r">
                  <input
                    className="w-12 text-center border-4 border-blue-500"
                    type="number"
                    value={item.invardStock}
                    onChange={(e) =>
                      handleInputChange(index, "invardStock", e.target.value)
                    }
                  />
                </td>
                <td className="text-center px-1 border-r">
                  <input
                    className="w-12 text-center"
                    type="number"
                    value={item.totOpStock}
                    readOnly
                  />
                </td>
                <td className="text-center px-1 border-r">
                  <input
                    className="w-12 text-center border-4 border-blue-500"
                    type="number"
                    value={item.qtySale}
                    onChange={(e) =>
                      handleInputChange(index, "qtySale", e.target.value)
                    }
                  />
                </td>
                <td className="text-center px-1 border-r">
                  <input
                    className="w-12 text-center"
                    type="number"
                    value={item.balStock}
                    readOnly
                  />
                </td>
                <td className="text-center px-1 border-r">
                  <input
                    className="w-24 text-center"
                    type="number"
                    value={item.saleAmt}
                    readOnly
                  />
                </td>
                <td className="text-center px-1 border-r">
                  <input
                    className="w-16 text-center border-4 border-blue-500"
                    type="number"
                    value={item.discountAmt}
                    onChange={(e) =>
                      handleInputChange(index, "discountAmt", e.target.value)
                    }
                  />
                </td>
                <td className="text-center px-1 border-r">
                  <input
                    className="w-24 text-center"
                    type="number"
                    value={item.actualSaleAmt}
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-around">
        <button></button>
        <button onClick={saveRetailStockAndSales}  className="px-4 py-2 bg-blue-500 rounded-lg mt-3 font-bold">
          Save Retail Stock & Sales Record
        </button>
      </div>
    </div>
  );
};

export default Retail_Stock_Sale;


