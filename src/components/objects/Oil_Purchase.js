import React, { useEffect, useState } from "react";
import "../css/PurchaseOil.css"; // Assume you have some basic CSS for styling
import axios from "axios";

const PurchaseOil = () => {
  const init = {
    invoiceNo: "",
    totalAmount: "",
    stockInCases: [
      {
        srNo: 1,
        productName: "",
        grade: "",
        colour: "",
        mrp: 0,
        volumePerPieces: 0,
        volumeType: "",
        pcsPerCase: 0,
        purchaseTCases: 0,
        totalPCS: 0,
      },
      {
        srNo: 2,
        productName: "",
        grade: "",
        colour: "",
        mrp: 0,
        volumePerPieces: 0,
        volumeType: "",
        pcsPerCase: 0,
        purchaseTCases: 0,
        totalPCS: 0,
      },
      {
        srNo: 3,
        productName: "",
        grade: "",
        colour: "",
        mrp: 0,
        volumePerPieces: 0,
        volumeType: "",
        pcsPerCase: 0,
        purchaseTCases: 0,
        totalPCS: 0,
      },
    ],
    stockInLiters: [
      {
        srNo: 1,
        volumePerPieces: 0,
        volumeType: "",
        totalPCS: 0,
        totalLtrs: 0,
        ratePerUnit: 0,
        taxableValue: 0,
      },
      {
        srNo: 2,
        volumePerPieces: 0,
        volumeType: "",
        totalPCS: 0,
        totalLtrs: 0,
        ratePerUnit: 0,
        taxableValue: 0,
      },
      {
        srNo: 3,
        volumePerPieces: 0,
        volumeType: "",
        totalPCS: 0,
        totalLtrs: 0,
        ratePerUnit: 0,
        taxableValue: 0,
      },
    ],
    taxDetails: {
      srNo: 1,
      taxableValue: 0,
      discount: 0,
      balanceAmt: 0,
      cgst: 0,
      sgst: 0,
      tcs: 0,
      totalAmt: 0,
      totalPCS: 0,
      landingPrice: 0,
    },
    reports: [
      {
        srNo: 1,
        productName: "",
        volumePerPieces: 0,
        mrp: 0,
        landingPrice: 0,
        difference: 0,
      },
      {
        srNo: 2,
        productName: "",
        volumePerPieces: 0,
        mrp: 0,
        landingPrice: 0,
        difference: 0,
      },
      {
        srNo: 3,
        productName: "",
        volumePerPieces: 0,
        mrp: 0,
        landingPrice: 0,
        difference: 0,
      },
    ],
  };

  const [purchaseformData, setPurchaseformData] = useState(init);
  const [oilProductData, setOilProductData] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState(0);
  const [totInvAmt, setTotInvAmt] = useState(0);
  const [purchaseOilDate, setPurchaseOilDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [otherDiscount, setOtherDiscount] = useState(0);

  const fetchOil = async () => {
    try {
      const res = await axios.get("http://localhost:4000/addoil");
      setOilProductData(res.data.allOils);
      setPurchaseformData(oilProductData);
      // toast.success("fetched oils")
    } catch (error) {
      console.log(error);
    }
  };

  console.log("oilProductData", oilProductData);

  useEffect(() => {
    fetchOil();
  }, []);

  const handleChange = (e, index, field) => {
    const value = Number(e.target.value);
    const updatedData = [...oilProductData];
    updatedData[index][field] = value;

    if (field === "purchaseTCases" || field === "pcsPerCase") {
      // Calculate Total PCS
      updatedData[index].totalPCS =
        updatedData[index].pcsPerCase * updatedData[index].purchaseTCases;
    }

    if (field === "ratePerUnit") {
      const totalLiters = calculateTotalLiters(
        updatedData[index].volumePerPieces,
        updatedData[index].totalPCS
      );
      updatedData[index].taxableValue = (totalLiters * value).toFixed(2);
    }

    // Recalculate balanceAmt when discount is updated
    if (field === "discount") {
      updatedData[index].balanceAmt = (
        updatedData[index].taxableValue - value
      ).toFixed(2);
    }

    // Recalculate totalAmt and landingPrice when cgst, sgst, tcs, or discount is updated
    if (["cgst", "sgst", "tcs", "discount"].includes(field)) {
      const balanceAmt =
        updatedData[index].taxableValue - updatedData[index].discount;
      const totalAmt = (
        balanceAmt +
        updatedData[index].cgst +
        updatedData[index].sgst +
        updatedData[index].tcs
      ).toFixed(2);

      updatedData[index].balanceAmt = balanceAmt.toFixed(2);
      updatedData[index].totalAmt = totalAmt;

      // Calculate landingPrice as totalAmt / totalPcs
      updatedData[index].landingPrice =
        updatedData[index].totalPCS > 0
          ? (totalAmt / updatedData[index].totalPCS).toFixed(2)
          : 0; // To handle division by zero

      // Recalculate difference as mrp - landingPrice
      updatedData[index].difference = (
        updatedData[index].mrp - updatedData[index].landingPrice
      ).toFixed(2);
    }
    setOilProductData(updatedData);
  };

  console.log(oilProductData);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Submit purchaseformData to your backend API
  //   console.log("oilProductData::",oilProductData);
  // };

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/purchaseoil/create",
        {
          oilProductData// Sending oilProductData as the payload
        }
      );

      // Handle the successful response
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("There was an error submitting the data:", error);
    }
  };

  const calculateTotalLiters = (volumePerPieces, totalPCS) => {
    // Convert volume to liters if it's in ML
    const volumeInLiters = volumePerPieces / 1000;
    return (volumeInLiters * totalPCS).toFixed(1);
  };

  console.log(totInvAmt);
  const localDate = new Date().toLocaleDateString();

  const [purchaseOilData,setPurchaseOilData] = useState([])
  const fetchPurchaseOil = async () => {
    try {
      const res = await axios.get("http://localhost:4000/purchaseoil");
      const dataWithCalculatedFields = res.data.map((item) => ({
        ...item,
        opStock: item.opStock || 0, // Initialize opStock if not already set
        outRetail: item.outRetail || 0, // Initialize outRetail if not already set
        totOpStock: item.opStock + item.invStock,
        balStock: item.opStock + item.invStock - item.outRetail,
        balStockAmt: (item.opStock + item.invStock - item.outRetail) * item.mrp,
      }));
      setPurchaseOilData(dataWithCalculatedFields);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPurchaseOil();
  }, [])


  return (
    <>
    

    <form onSubmit={handleSubmit} className="">
      <h1 className="text-green-500 text-center uppercase text-3xl font-semibold">
        Purchase Oil
      </h1>
      <div>
        <label className="font-bold">
          Date: {loading ? localDate : setLoading(true)}{" "}
        </label>
        <input
          type="text"
          // value={purchaseOilDate}
          name=""
          id=""
        />
      </div>
      <div>
        <label className="uppercase font-bold">Invoice No :</label>
        <input
          className="ml-6 w-48 mt-4 mb-1 border-4 border-blue-600"
          type="number"
          value={invoiceNo}
          onChange={(e) => setInvoiceNo(e.target.value)}
        />
        <label className="uppercase font-bold ml-4">Total AMount :</label>
        <input
          className=" ml-7 w-48 border-4 border-blue-600"
          type="number"
          value={totInvAmt}
          onChange={(e) => setTotInvAmt(e.target.value)}
        />
      </div>
      <div></div>

      <div className="flex gap-4">
        {/* Stock in Cases start */}
        <div className="overflow-x-auto">
          <h2 className="mb-2 text-2xl text-green-500">Stock in Cases</h2>

          <table className="bg-white border border-gray-700">
            <thead className="">
              <tr className="bg-[#3A1078] text-white  uppercase text-sm">
                <th className="py-1 px-2 text-center border-r">
                  Sr. <br /> No
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Product <br /> Name
                </th>
                <th className="py-1 px-2 text-center border-r">Grade</th>
                <th className="py-1 px-2 text-center border-r">Colour</th>

                <th className="py-1 px-2 text-center border-r">MRP </th>
                <th className="py-1 px-2 text-center border-r">
                  Volume. <br /> per PCS
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Vol. <br />
                  Type
                </th>

                <th className="py-1 px-2">
                  Pieces <br />
                  perCase
                </th>
                <th className="py-1 px-2 ">
                  Pur.
                  <br /> T.Cases
                </th>
                <th className="py-1 px-2 text-left">
                  Total <br /> PCS
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
                      className="w-28 text-center"
                      type="text"
                      value={item.productName}
                      readOnly
                    />
                  </td>
                  <td className=" px-1 border-r">
                    <input
                      className="w-20 text-center"
                      type="text"
                      value={item.grade}
                      readOnly
                    />
                  </td>
                  <td className=" px-1 border-r">
                    <input
                      className="w-20 text-center"
                      type="text"
                      value={item.colour}
                      readOnly
                    />
                  </td>
                  <td className=" px-2 border-r">
                    <input
                      className="w-12 text-center"
                      type="number"
                      value={item.mrp}
                      readOnly
                    />
                  </td>
                  <td className="px-2">
                    <input
                      className="w-12 text-center"
                      type="number"
                      value={item.volumePerPieces}
                      readOnly
                    />
                  </td>
                  <td className=" px-1">
                    <input
                      className="w-8 text-center"
                      type="text"
                      value={item.volumeType}
                      readOnly
                    />
                  </td>
                  <td className="px-2">
                    <input
                      className="w-12 text-center"
                      type="number"
                      value={item.pcsPerCase}
                      onChange={(e) => handleChange(e, index, "pcsPerCase")}
                      readOnly
                    />
                  </td>
                  <td className=" px-2">
                    <input
                      className="w-12 text-center border-4 border-blue-600"
                      type="number"
                      value={item.purchaseTCases}
                      onChange={(e) => handleChange(e, index, "purchaseTCases")}
                    />
                  </td>
                  <td className="px-2">
                    <input
                      className="w-12"
                      type="number"
                      value={item.totalPCS}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Stock in Cases end */}

        {/* Stock in Liters start */}
        <div className="overflow-x-auto">
          <h2 className="mb-2 text-2xl text-green-500">Stock in Litres</h2>

          <table className="bg-white border border-gray-700">
            <thead className="">
              <tr className="bg-[#3A1078] text-white  uppercase text-sm">
                {/* <th className="py-1 px-2 text-center border-r">
                  Sr. <br /> No
                </th> */}
                <th className="py-1 px-2 text-center border-r">
                  Volume. <br /> per PCS
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Vol. <br /> Type
                </th>

                <th className="py-1 px-2 text-center border-r">
                  Total <br /> PCS
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Total <br />
                  Litrs{" "}
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Perunit
                  <br /> Price
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Taxable. <br />
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="text-md">
              {oilProductData.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  {/* <td className="px-1 border-r">
                    <input
                      className="w-8 text-center"
                      type="number"
                      value={item.srNo}
                      readOnly
                    />
                  </td> */}

                  <td className=" px-2 border-r">
                    <input
                      className="w-20 text-center"
                      type="number"
                      value={item.volumePerPieces}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      className="w-12 text-center"
                      type="text"
                      value={item.volumeType}
                      readOnly
                    />
                  </td>
                  <td className="px-2">
                    <input
                      className="w-12 text-center"
                      type="number"
                      value={item.totalPCS}
                      readOnly
                    />
                  </td>
                  <td className=" px-1">
                    <input
                      className="w-12 text-center"
                      type="text"
                      value={calculateTotalLiters(
                        item.volumePerPieces,
                        item.totalPCS
                      )}
                      readOnly
                    />
                  </td>
                  <td className=" px-1">
                    <input
                      className="w-20 text-center border-blue-600 border-4"
                      type="number"
                      value={item.ratePerUnit}
                      onChange={(e) => handleChange(e, index, "ratePerUnit")}
                    />
                  </td>
                  <td className=" px-1">
                    <input
                      className="w-20 text-center"
                      type="text"
                      value={item.taxableValue}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stock in Liters end */}
      </div>

      {/* Tax Detail start */}
      <div className="overflow-x-auto">
        <h2 className="mb-2 text-2xl text-green-500">Invoice Details</h2>

        <table className="bg-white border border-gray-700">
          <thead className="">
            <tr className="bg-[#3A1078] text-white  uppercase text-sm">
              <th className="py-1 px-2 text-center border-r">
                Sr. <br /> No
              </th>
              <th className="py-1 px-2 text-center border-r">
                Taxable <br />
                value
              </th>
              <th className="py-1 px-2 text-center border-r">
                Discount <br />
                (-)
              </th>
              <th className="py-1 px-2 text-center border-r">
                Balance <br />
                Amt (=)
              </th>

              <th className="py-1 px-2 text-center border-r">
                CGST <br /> (+)
              </th>
              <th className="py-1 px-2 text-center border-r">
                SGST <br />
                (+)
              </th>
              <th className="py-1 px-2 text-center border-r">
                TCS
                <br /> (+)
              </th>
              <th className="py-1 px-2 text-center border-r">
                Total <br />
                Amt (=)
              </th>
              <th className="py-1 px-2 text-center border-r">
                Total <br />
                Pcs ()
              </th>
              <th className="py-1 px-2 text-center border-r">
                Landing <br />
                Price
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

                <td className=" px-2 border-r">
                  <input
                    className="w-24 text-center"
                    type="number"
                    value={item.taxableValue}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className="w-20 text-center border-4 border-blue-600"
                    type="number"
                    value={item.discount}
                    onChange={(e) => handleChange(e, index, "discount")}
                  />
                </td>
                <td className="px-2">
                  <input
                    className="w-24 text-center"
                    type="number"
                    value={item.balanceAmt}
                    readOnly
                  />
                </td>
                <td className=" px-1">
                  <input
                    className="w-24 text-center border-4 border-blue-600"
                    type="number"
                    onChange={(e) => handleChange(e, index, "cgst")}
                    value={item.cgst}
                  />
                </td>
                <td className=" px-1">
                  <input
                    className="w-20 text-center border-blue-600 border-4"
                    type="number"
                    value={item.sgst}
                    onChange={(e) => handleChange(e, index, "sgst")}
                  />
                </td>
                <td className=" px-1">
                  <input
                    className="w-24 text-center border-4 border-blue-600"
                    onChange={(e) => handleChange(e, index, "tcs")}
                    type="number"
                    value={item.tcs}
                  />
                </td>
                <td className=" px-1">
                  <input
                    className="w-24 text-center"
                    type="number"
                    value={item.totalAmt}
                    readOnly
                  />
                </td>
                <td className=" px-1">
                  <input
                    className="w-16 text-center"
                    type="number"
                    value={item.totalPCS}
                    readOnly
                  />
                </td>
                <td className=" px-1">
                  <input
                    className="w-24 text-center"
                    type="number"
                    value={item.landingPrice}
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Tax Detail end */}
      <label className="uppercase font-bold ml-4">other Discount :</label>
      <input
        className=" ml-7 w-20 border-4 text-center border-blue-600"
        type="number"
        value={otherDiscount}
        onChange={(e) => setOtherDiscount(e.target.value)}
      />
      {/*Commission start */}

      <div className="overflow-x-auto">
        <h2 className="mb-2 text-2xl text-green-500">Difference</h2>

        <table className="bg-white border border-gray-700">
          <thead className="">
            <tr className="bg-[#3A1078] text-white  uppercase text-sm">
              <th className="py-1 px-2 text-center border-r">
                Sr <br /> No
              </th>
              <th className="py-1 px-2 text-center border-r">
                Product <br /> Name
              </th>
              <th className="py-1 px-2 text-center border-r">
                Volume <br /> per PCS
              </th>
              <th className="py-1 px-2 text-center border-r">
                Vol. <br /> Type
              </th>

              <th className="py-1 px-2 text-center border-r">
                MRP <br /> Price
              </th>
              <th className="py-1 px-2 text-center border-r">
                Landing <br />
                Price{" "}
              </th>
              <th className="py-1 px-2 text-center border-r">
            Difference
                <br /> Per PC
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

                <td className=" px-2 border-r">
                  <input
                    className="w-28 text-center"
                    type="text"
                    value={item.productName}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className="w-20 text-center"
                    type="number"
                    value={item.volumePerPieces}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className="w-12 text-center"
                    type="text"
                    value={item.volumeType}
                    readOnly
                  />
                </td>
                <td className="px-2">
                  <input
                    className="w-12 text-center"
                    type="number"
                    value={item.mrp}
                    readOnly
                  />
                </td>
                <td className=" px-1">
                  <input
                    className="w-12 text-center"
                    type="text"
                    value={item.landingPrice}
                    readOnly
                  />
                </td>
                <td className=" px-1">
                  <input
                    className="w-20 text-center"
                    type="number"
                    value={item.difference}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*Commission end */}
      <div className="flex justify-between">
        <button></button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="flex bg-blue-600 px-5 py-2 mr-64 font-bold rounded-lg text-white"
        >
          Add Data
        </button>
      </div>
    </form>
        
                {/* invoice report start */}
                <div className="overflow-x-auto mt-12">
          <h2 className="mb-2 text-2xl text-green-500">INVOICE REPORT</h2>

          <table className="bg-white border border-gray-700">
            <thead className="">
              <tr className="bg-[#3A1078] text-white  uppercase text-sm">
                <th className="py-1 px-2 text-center border-r">
                  Sr. <br /> No
                </th>
                <th className="py-1 px-2 text-center border-r">
                  Product <br /> Name
                </th>
                <th className="py-1 px-2 text-center border-r">Grade</th>
                <th className="py-1 px-2 text-center border-r">Colour</th>

                <th className="py-1 px-2 text-center border-r">    Volume. <br /> per PCS </th>
                <th className="py-1 px-2 text-center border-r">
              MRP
                </th>
     

                <th className="py-1 px-2">
                 Receipt
                  
                </th>
                <th className="py-1 px-2 text-center ">
                  Total <br />Stock
                  <br /> Amt
                </th>
           
              </tr>
            </thead>
            <tbody className="text-md">
              {purchaseOilData.map((item, index) => (
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
                      className="w-28 text-center"
                      type="text"
                      value={item.productName}
                      readOnly
                    />
                  </td>
                  <td className=" px-1 border-r">
                    <input
                      className="w-20 text-center"
                      type="text"
                      value={item.grade}
                      readOnly
                    />
                  </td>
                  <td className=" px-1 border-r">
                    <input
                      className="w-20 text-center"
                      type="text"
                      value={item.colour}
                      readOnly
                    />
                  </td>
                  <td className="px-2">
                    <input
                      className="w-16 text-center"
                      type="number"
                      value={item.volumePerPieces}
                      readOnly
                    />
                  </td>
                  <td className="px-2">
                    <input
                      className="w-12 text-center"
                      type="number"
                      value={item.mrp}
                      readOnly
                    />
                  </td>
         
                  <td className="px-2">
                    <input
                      className="w-12 text-center"
                      type="number"
                      value={item.totalPCS}
                      readOnly
                    />
                  </td>
                  <td className=" px-2">
                    <input
                      className="w-24 text-center"
                      type="number"
                      value={item.totStockAmt =(item.totalPCS*item.mrp)}
                    />
                  </td>
                
                </tr>
              ))}
            </tbody>
          </table>     

        </div>
        <div className="flex justify-around">
          <button></button>
        <button onClick={handleSubmit} className="px-5 py-2  bg-blue-500 font-bold rounded-lg">Stock to Godown</button>
        </div>
        {/* invoice report end */}


    </>
  );
};

export default PurchaseOil;
