import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Sale_Fuels() {
  const [machineReadings, setMachineReadings] = useState([]);

  const [ms1Readings, setMs1Readings] = useState([]);
  const [ms2Readings, setMs2Readings] = useState([]);
  const [hsdReadings, setHsdReadings] = useState([]);

  const [closing, setClosing] = useState(0);
  const [sale, setSale] = useState(0);
  const [testing, setTesting] = useState(0);
  const [saleAct, setSaleAct] = useState(0);
  const [rate, setRate] = useState(0);
  const [amount, setAmount] = useState(0);

  const navigate = useNavigate();

  function getTodaysDate() {
    const today = new Date();

    // Extract day, month, and year
    const day = String(today.getDate());
    // .padStart(0, '0');
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = today.getFullYear(); // Full year

    return `${day}-${month}-${year}`;
  }

  const todaysDate = getTodaysDate();

  // console.log("ms2Readings", ms2Readings);
  const fetchMachineReadings = async () => {
    try {
      const res = await axios.get("http://localhost:4000/reading");
      console.log(res.data.MeterReadingData);
      const allReadings = res.data.MeterReadingData;

      setMachineReadings(allReadings);
      setMs1Readings(
        allReadings.filter((item) => item.nozzleProduct.includes("MS-1"))
      );
      setMs2Readings(
        allReadings.filter((item) => item.nozzleProduct.includes("MS-2"))
      );
      setHsdReadings(
        allReadings.filter((item) => item.nozzleProduct.includes("HSD"))
      );

      // setHsdReadings(
      //   allReadings.filter((item) => item.nozzleProduct === "HSD")
      // );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMachineReadings();
  }, []);


  const renderTable = (data, title) => (
    <div>
      <h3>{title}</h3>
      <table className="">
        <thead className="bg-purple-700">
          <tr>
            {/* <th className="tablebg">sideNo</th> */}
            <th className="tablebg">nozzleNo</th>
            <th className="tablebg">nozzleProduct</th>
            <th className="tablebg">opening</th>
            <th className="tablebg">closing</th>

            <th className="tablebg">Sale</th>
            <th className="tablebg">Testing</th>
            <th className="tablebg">A. sale</th>
            <th className="tablebg">Rate</th>
            <th className="tablebg">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {/* <td>
                <input value={item.sideNo} />
              </td> */}
              <td className="">
                <input value={item.nozzleNo} />
              </td>
              <td>
                <input value={item.nozzleProduct} />
              </td>
              <td>
                <input value={item.opMeterReading} />
              </td>

              <td>
                <input value={closing} />
              </td>
              <td>
                <input value={sale} />
              </td>
              <td>
                <input value={testing} />
              </td>
              <td>
                <input value={saleAct} />
              </td>
              <td>
                <input value={rate} />
              </td>
              <td>
                <input value={amount} />
              </td>
            </tr>
          ))}
          <tr>
            <th className="tablebg"></th>
            <th className="tablebg"> </th>
            <th className="tablebg">Total (=)</th>
            <th className="tablebg">
              <span id="saletotalspeed">4325</span> (-)
            </th>
            <th className="tablebg">
              <span id="testingtotalspeed">0</span> (=)
            </th>
            <th className="tablebg">
              <span id="asaletotalspeed">0</span> (x)
            </th>
            <th className="tablebg">
              <span id="ratetotalspeed">
                {/* {dayStartRate[0]['speed']} */}
              </span>{" "}
              (=)
            </th>
            <th className="tablebg">
              <span id="amounttotalspeed">0.00</span>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const handleSave = async () => {
    // const tableData = ms1Readings.map((item) => ({
    //   sideNo: item.sideNo,
    //   nozzleProduct: item.nozzleProduct,
    //   opMeterReading: item.opMeterReading,
    //   closing,
    //   sale,
    //   testing,
    //   saleAct,
    //   rate,
    //   amount,
    // }));

    console.log("ms1Readings : ", ms1Readings);

    // console.log("tableData",tableData)
    try {
      await axios.post("http://localhost:4000/fuelsales/create", {
        ms1Readings,
      });
      alert("Data saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving data.");
    }
  };



  


  const [fuelSales, setFuelSales] = useState([]);
  const fetchFuelSales = () => {
    try {
      axios.get("http://localhost:4000/fuelsales").then((res) => {
        setFuelSales(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log("fuelSales:",fuelSales)

  useState(() => {
    fetchFuelSales();
  }, []);


   const [ ms1RateAllDays,setMs1RateAllDays] = useState([]);
   const [ ms2RateAllDays,setMs2RateAllDays] = useState([]);
   const [ hsdRateAllDays,setHsdRateAllDays] = useState([]);

  const [ms1Rate,setMs1Rate] = useState(0);
  const [ms2Rate,setMs2Rate] = useState(0);
  const [hsdRate,setHsdRate] = useState(0);

  const fetchAllDAyStartReading = () => {

    axios
      .get("http://localhost:4000/ms")
      .then((res) => {
        setMs1RateAllDays(res.data)
        setMs1Rate(ms1RateAllDays[ms1RateAllDays.length-1].reading)
         console.log("ms1RateAllDays", ms1RateAllDays[ms1RateAllDays.length-1].reading);

    

      })
      .catch((error) => {
        console.log(error.message);
      });


      axios
      .get("http://localhost:4000/speed")
      .then((res) => {
        setMs2RateAllDays(res.data)
        setMs2Rate(ms2RateAllDays[ms2RateAllDays.length-1].reading)
 
      })
      .catch((error) => {
        console.log(error.message);
      });

      axios
      .get("http://localhost:4000/hsd")
      .then((res) => {
        setHsdRateAllDays(res.data)
        // console.log(hsdRateAllDays[hsdRateAllDays.length-1].reading)
        setHsdRate(hsdRateAllDays[hsdRateAllDays.length-1].reading)
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  // console.log("ms1Rate", ms1Rate);
  // console.log("ms2Rate", ms2Rate);
  // console.log("hsdRate", hsdRate);


  useEffect(() => {
    fetchAllDAyStartReading();
 
  }, []);

  // const calculateTotal = (field) => {
  //   return fuelSales.reduce((total, item) => total + (item[field] || 0), 0);
  // };
  return (
    <>
   
   <div>
        <h2>Totals</h2>
        {/* <p>Total Op Meter Reading: {calculateTotal('opMeterReading')}</p>
        <p>Total Op Meter Reading: {calculateTotal('saleAct')}</p> */}
      </div>

      <main className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h1 className="mt-1  uppercase font-bold text-center text-3xl text-blue-800 px-3 py-1">
          Fuel sales
        </h1>
        <span style={{ fontSize: "22px" }}>Date :{todaysDate}</span>

        {/* //ms-1 start */}
        <section className="ms-1">
          <h4 className="bg-slate-700 text-xl text-white p-2  mb-3 rounded-md  uppercase text-center font-bold">
            product name : ms-1
          </h4>

          <table class="table">
            <div>
              <table className="">
                <thead className="py-2">
                  <tr className="text-center font-bold py-2">
                    <th className="tablebg">side</th>
                    <th className="tablebg">nozzleId</th>
                    <th className="tablebg">opening</th>

                    <th className="tablebg">closing</th>

                    <th className="tablebg">Sale</th>
                    <th className="tablebg">Testing</th>
                    <th className="tablebg">Actual sale</th>
                    <th className="tablebg">Rate</th>
                    <th className="tablebg">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {ms1Readings.map((item) => (
                    <tr
                      key={item._id}
                      className="font-bold border-2 border-slate-300"
                    >
                      <td>
                        <input
                          className="text-center w-20"
                          value={item.sideNo}
                        />
                      </td>
                      <td>
                        <input
                          className="text-center w-32"
                          value={item.nozzleProduct}
                        />
                      </td>
                      <td>
                        <input
                          className="text-center w-32"
                          value={item.opMeterReading}
                        />
                      </td>

                      <td className=" text-white">
                        <input
                          value={item.closing}
                          className="text-center bg-blue-600 w-32"
                          onChange={(e) => item.closing = e.target.value}
                        />
                      </td>
                      <td>
                        <input
                          value={item.sale}
                          className="text-center w-32"
                          onChange={(e) => item.sale = e.target.value}
                        />
                      </td>
                      <td>
                        <input
                          className="bg-blue-700 text-white w-32"
                          value={item.testing}
                          onChange={(e)=> item.testing = e.target.value}
                        />
                      </td>
                      <td>
                        <input
                          value={item.saleAct}
                          onChange={(e) =>item.testing = e.target.value}
                          className="text-center w-32"
                        />
                      </td>
                      <td>
                        <input
                          value={item.rate}
                          className="text-center w-32"
                          onChange={(e) => (item.rate = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="text-center w-40"
                          value={item.amount}
                          onChange={(e) => (item.amount = e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                  <br />
                  <tr>
                    <th className="tablebg"></th>
                    <th className="tablebg"> </th>
                    <th className="tablebg"> </th>

                    <th className="tablebg">Total (=)</th>
                    <th className="tablebg">
                      <span id="saletotalspeed">4325</span> (-)
                    </th>
                    <th className="tablebg">
                      <span id="testingtotalspeed">0</span> (=)
                    </th>
                    <th className="tablebg">
                      <span id="asaletotalspeed">0</span> (x)
                    </th>
                    <th className="tablebg">
                      <span id="ratetotalspeed">
                      </span>{" "}
                      (=)
                    </th>
                    <th className="tablebg">
                      <span id="amounttotalspeed">0.00</span>
                    </th>
                  </tr>
                  <button onClick={handleSave} className="bg-blue-600 flex justify-end mt-3 text-white px-3 py-1  rounded-lg">
                    Save
                  </button>
                </tbody>
              </table>
            </div>
     
          </table>
        </section>

   
          {/* ms-1 end */}
 {/* /////////////////////////////////////////////////////////////     */}
          {/* ms-2 start */}
          <section className="ms-2">
          <h4 className="bg-slate-700 text-xl text-white p-2  mb-3 rounded-md  uppercase text-center font-bold">
            product name : ms-2(Speed)
          </h4>

          <table class="table">
            <div>
              <table className="">
                <thead className="py-2">
                  <tr className="text-center font-bold py-2">
                    <th className="tablebg">side</th>
                    <th className="tablebg">nozzleId</th>
                    <th className="tablebg">opening</th>

                    <th className="tablebg">closing</th>

                    <th className="tablebg">Sale</th>
                    <th className="tablebg">Testing</th>
                    <th className="tablebg">Actual sale</th>
                    <th className="tablebg">Rate</th>
                    <th className="tablebg">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {ms2Readings.map((item) => (
                    <tr
                      key={item._id}
                      className="font-bold border-2 border-slate-300"
                    >
                      <td>
                        <input
                          className="text-center w-20"
                          value={item.sideNo}
                        />
                      </td>
                      <td>
                        <input
                          className="text-center w-32"
                          value={item.nozzleProduct}
                        />
                      </td>
                      <td>
                        <input
                          className="text-center w-32"
                          value={item.opMeterReading}
                        />
                      </td>

                      <td className=" text-white">
                        <input
                          value={item.closing}
                          className="text-center bg-blue-600 w-32"
                          onChange={(e) => (item.closing = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          value={item.sale}
                          className="text-center w-32"
                          onChange={(e) => (item.sale = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="bg-blue-700 text-white w-32"
                          value={item.testing}
                          onChange={(e) => (item.testing = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          value={item.saleAct}
                          onChange={(e) => (item.saleAct = e.target.value)}
                          className="text-center w-32"
                        />
                      </td>
                      <td>
                        <input
                          value={item.rate}
                          className="text-center w-32"
                          onChange={(e) => (item.rate = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="text-center w-40"
                          value={item.amount}
                          onChange={(e) => (item.amount = e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                  <br />
                  <tr>
                    <th className="tablebg"></th>
                    <th className="tablebg"> </th>
                    <th className="tablebg"> </th>

                    <th className="tablebg">Total (=)</th>
                    <th className="tablebg">
                      <span id="saletotalspeed">4325</span> (-)
                    </th>
                    <th className="tablebg">
                      <span id="testingtotalspeed">0</span> (=)
                    </th>
                    <th className="tablebg">
                      <span id="asaletotalspeed">0</span> (x)
                    </th>
                    <th className="tablebg">
                      <span id="ratetotalspeed">
                      </span>{" "}
                      (=)
                    </th>
                    <th className="tablebg">
                      <span id="amounttotalspeed">0.00</span>
                    </th>
                  </tr>
                  <button className="bg-blue-600 mt-3 text-white px-3 py-1 rounded-lg">
                    Save
                  </button>
                </tbody>
              </table>
            </div>
   
          </table>
        </section>
        {/* ms-2 end */}
   
 {/* /////////////////////////////////////////////////////////////     */}

        {/* hsd -start  */}
        <section className="hsd">
          <h4 className="bg-slate-700 text-xl text-white p-2  mb-3 rounded-md  uppercase text-center font-bold">
            product name : HSD
          </h4>

          <table class="table">
            <div>
              <table className="">
                <thead className="py-2">
                  <tr className="text-center font-bold py-2">
                    <th className="tablebg">side</th>
                    <th className="tablebg">nozzleId</th>
                    <th className="tablebg">opening</th>

                    <th className="tablebg">closing</th>

                    <th className="tablebg">Sale</th>
                    <th className="tablebg">Testing</th>
                    <th className="tablebg">Actual sale</th>
                    <th className="tablebg">Rate</th>
                    <th className="tablebg">Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {hsdReadings.map((item) => (
                    <tr
                      key={item._id}
                      className="font-bold border-2 border-slate-300"
                    >
                      <td>
                        <input
                          className="text-center w-20"
                          value={item.sideNo}
                        />
                      </td>
                      <td>
                        <input
                          className="text-center w-32"
                          value={item.nozzleProduct}
                        />
                      </td>
                      <td>
                        <input
                          className="text-center w-32"
                          value={item.opMeterReading}
                        />
                      </td>

                      <td className=" text-white">
                        <input
                          value={item.closing}
                          className="text-center bg-blue-600 w-32"
                          onChange={(e) => (item.closing = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          value={item.sale}
                          className="text-center w-32"
                          onChange={(e) => (item.sale = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="bg-blue-700 text-white w-32"
                          value={item.testing}
                          onChange={(e) => (item.testing = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          value={item.saleAct}
                          onChange={(e) => (item.saleAct = e.target.value)}
                          className="text-center w-32"
                        />
                      </td>
                      <td>
                        <input
                          value={item.rate}
                          className="text-center w-32"
                          onChange={(e) => (item.rate = e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          className="text-center w-40"
                          value={item.amount}
                          onChange={(e) => (item.amount = e.target.value)}
                        />
                      </td>
                    </tr>
                  ))}
                  <br />
                  <tr>
                    <th className="tablebg"></th>
                    <th className="tablebg"> </th>
                    <th className="tablebg"> </th>

                    <th className="tablebg">Total (=)</th>
                    <th className="tablebg">
                      <span id="saletotalspeed">4325</span> (-)
                    </th>
                    <th className="tablebg">
                      <span id="testingtotalspeed">0</span> (=)
                    </th>
                    <th className="tablebg">
                      <span id="asaletotalspeed">0</span> (x)
                    </th>
                    <th className="tablebg">
                      <span id="ratetotalspeed">
                      </span>{" "}
                      (=)
                    </th>
                    <th className="tablebg">
                      <span id="amounttotalspeed">0.00</span>
                    </th>
                  </tr>
                  <button className="bg-blue-600 mt-3 text-white px-3 py-1 rounded-lg">
                    Save
                  </button>
                </tbody>
              </table>
            </div>
   
          </table>
        </section>
        {/* hsd -end  */}
      </main>
    </>
  );
}
