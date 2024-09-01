
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Tank.css";
import { useNavigate } from "react-router-dom";

export default function Sale_Fuels() {
  const [machineReadings, setMachineReadings] = useState([]);
  const [hsdReadings, setHsdReadings] = useState([]);

  const [rates, setRates] = useState({ ms1Rate: 0, ms2Rate: 0, hsdRate: 0 });

  const navigate = useNavigate();

  const fetchMachineReadings = async () => {
    try {
      const res = await axios.get("http://localhost:4000/reading");
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMachineReadings();
  }, []);


  // ms1 data

  const [ms1Readings, setMs1Readings] = useState([]);
  const [ms1Rate, setMs1Rate] = useState(0);
  const [ms1RateAllDays, setMs1RateAllDays] = useState([]);


  const [totals, setTotals] = useState({
    saleTotal: 0,
    testingTotal: 0,
    saleActTotal: 0,
    amountTotal: 0,
  });

  useEffect(() => {
    let saleTotal = 0,
      testingTotal = 0,
      saleActTotal = 0,
      amountTotal = 0;

    ms1Readings.forEach((item) => {
      const sale = (item.closing || 0) - (item.opMeterReading || 0);
      const saleAct = sale - (item.testing || 0);
      const amount = saleAct * rates.ms1Rate;
      saleTotal += sale;
      testingTotal += item.testing || 0;
      saleActTotal += saleAct;
      amountTotal += amount;
    });

    setTotals({ saleTotal, testingTotal, saleActTotal, amountTotal });
  }, [ms1Readings, rates]);

  const handleSave = async () => {
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


  // ms2 speed
  const [ms2Readings, setMs2Readings] = useState([]);

  const [ms2RateAllDays, setMs2RateAllDays] = useState([]);
  const [hsdRateAllDays, setHsdRateAllDays] = useState([]);

  const [ms2Rate, setMs2Rate] = useState(0);
  const [hsdRate, setHsdRate] = useState(0);



  const [totals2, setTotals2] = useState({
    saleTotal2: 0,
    testingTotal2: 0,
    saleActTotal2: 0,
    amountTotal2: 0,
  });

  useEffect(() => {
    let saleTotal2 = 0,
      testingTotal2 = 0,
      saleActTotal2 = 0,
      amountTotal2 = 0;

    ms2Readings.forEach((item2) => {
      const sale2 = (item2.closing || 0) - (item2.opMeterReading || 0);
      const saleAct2 = sale2 - (item2.testing || 0);
      const amount2 = saleAct2 * rates.ms2Rate;
      saleTotal2 += sale2;
      testingTotal2 += item2.testing || 0;
      saleActTotal2 += saleAct2;
      amountTotal2 += amount2;
    });

    setTotals2({ saleTotal2, testingTotal2, saleActTotal2, amountTotal2 });
  }, [ms2Readings, rates]);

  const handleSave2 = async () => {
    try {
      await axios.post("http://localhost:4000/fuelsales/create", {
        ms2Readings,
      });
      alert("Data saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving data.");
    }
  };


  // hsd speed
  // const [hsdReadings, setMs2Readings] = useState([]);

  // const [ms2RateAllDays, setMs2RateAllDays] = useState([]);
  // const [hsdRateAllDays, setHsdRateAllDays] = useState([]);

  // const [ms2Rate, setMs2Rate] = useState(0);
  // const [hsdRate, setHsdRate] = useState(0);



  const [totals3, setTotals3] = useState({
    saleTotal3: 0,
    testingTotal3: 0,
    saleActTotal3: 0,
    amountTotal3: 0,
  });

  useEffect(() => {
    let saleTotal3 = 0,
      testingTotal3 = 0,
      saleActTotal3 = 0,
      amountTotal3 = 0;

    hsdReadings.forEach((item3) => {
      const sale3 = (item3.closing || 0) - (item3.opMeterReading || 0);
      const saleAct3 = sale3 - (item3.testing || 0);
      const amount3 = saleAct3 * rates.hsdRate;
      saleTotal3 += sale3;
      testingTotal3 += item3.testing || 0;
      saleActTotal3 += saleAct3;
      amountTotal3 += amount3;
    });

    setTotals3({ saleTotal3, testingTotal3, saleActTotal3, amountTotal3 });
  }, [hsdReadings, rates]);

  const handleSave3 = async () => {
    try {
      await axios.post("http://localhost:4000/fuelsales/create", {
       ms1Readings: hsdReadings,
      });
      alert("Data saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving data.");
    }
  };


  const fetchAllDAyStartReading = () => {
    axios
      .get("http://localhost:4000/ms")
      .then((res) => {
        setMs1RateAllDays(res.data);
        setMs1Rate(ms1RateAllDays[ms1RateAllDays.length - 1].reading);
      })
      .catch((error) => {
        console.log(error.message);
      });

    axios
      .get("http://localhost:4000/speed")
      .then((res) => {
        setMs2RateAllDays(res.data);
        setMs2Rate(ms2RateAllDays[ms2RateAllDays.length - 1].reading);
      })
      .catch((error) => {
        console.log(error.message);
      });

    axios
      .get("http://localhost:4000/hsd")
      .then((res) => {
        setHsdRateAllDays(res.data);
        setHsdRate(hsdRateAllDays[hsdRateAllDays.length - 1].reading);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchAllDAyStartReading();
  }, [ms1Readings,ms2Readings,hsdReadings]);

  return (
    <main className="tankMainDiv shadow-lg p-1 mb-5 bg-body-tertiary rounded bigFontWeight">
      <div className="relative">
        <h1 className="tracking-wide uppercase font-bold text-center text-3xl px-3 py-1">
          Fuel Sales
        </h1>
        <h1 className="flex items-start font-bold font-2xl text-black">
          Date: {new Date().toLocaleDateString()}
        </h1>
      </div>
      {/* ms1 start */}
      <section className="ms-1">
        <div className="flex justify-center">
          <div className="block text-2xl justify-center tracking-wider text-blue-600 p-2 rounded-md uppercase font-bold">
            ms-1
          </div>
        </div>
        <table className="w-[100%]">
  <thead className="tablebg py-2">
    <tr className="text-center font-bold py-2">
      <th>Nozzle ID</th>
      <th>Side</th>
      <th>Opening</th>
      <th>Closing</th>
      <th>Sale</th>
      <th>Testing</th>
      <th>Actual Sale</th>
      <th>Rate</th>
      <th></th>
      <th>T Amount</th>
    </tr>
  </thead>
  <tbody>
    {ms1Readings.map((item, index) => (
      <tr
        key={item._id}
        className="font-bold border-2 border-slate-300"
      >
        <td>
          <input
            className="text-center w-32"
            value={item.nozzleProduct}
            readOnly
          />
        </td>
        <td>
          <input
            className="text-center w-20"
            value={item.sideNo}
            readOnly
          />
        </td>
        <td>
          <input
            className="text-center w-32"
            value={item.opMeterReading}
            readOnly
          />
        </td>
        <td>
          <input
            type="number"
            value={item.closing || ""}
            className="text-center bg-blue-600 w-32"
            onChange={(e) => {
              const newClosing = parseFloat(e.target.value) || 0;
              const updatedReadings = [...ms1Readings];
              updatedReadings[index].closing = newClosing;

              // Calculate the sale if both closing and opMeterReading are present
              if (newClosing && item.opMeterReading !== undefined) {
                updatedReadings[index].sale =
                  newClosing - item.opMeterReading;
              } else {
                updatedReadings[index].sale = ""; // Set sale as empty string initially
              }

              setMs1Readings(updatedReadings);
            }}
          />
        </td>
        <td>
          <input
            value={item.sale !== undefined ? item.sale : ""}
            className="text-center w-32"
            readOnly
          />
        </td>

        <td>
          <input
            className="bg-blue-700 text-center text-white w-32"
            value={item.testing || ""}
            type="number"
            onChange={(e) => {
              const newTesting = parseFloat(e.target.value) || 0;
              const updatedReadings = [...ms1Readings];
              updatedReadings[index].testing = newTesting;
              setMs1Readings(updatedReadings);
            }}
          />
        </td>

        <td>
          <input
            value={
              item.closing == null ||
              item.opMeterReading == null ||
              item.testing == null
                ? ""
                : (item.closing || 0) -
                  (item.opMeterReading || 0) -
                  (item.testing || 0)
            }
            className="text-center w-32"
            readOnly
          />
        </td>

        <td>
          <input
            disabled
            style={{ display: "none" }}
            value={(item.rate = ms1Rate)}
            className="text-center w-32 bg-rose-500"
            readOnly
          />
        </td>
        <td>
          <input
            style={{ display: "none" }}
            className="text-center w-40"
            value={(item.saleActTotal = totals.saleActTotal)}
            readOnly
          />
        </td>
        <td>
          <input
            hidden
            className="text-center w-40"
            value={(item.totalAmount = totals.saleActTotal * ms1Rate)}
            readOnly
          />
        </td>
      </tr>
    ))}
    <tr className="tablebg">
      <th className="text-center" colSpan="4">
        Total
      </th>
      <th className="text-center">
        {totals.saleTotal === 0 ? "" : totals.saleTotal}
      </th>
      <th className="text-center">
        {totals.testingTotal === 0 ? "" : totals.testingTotal}
      </th>
      <th className="text-center">
        {totals.saleActTotal === 0 ? "" : totals.saleActTotal}
      </th>
      <th className="text-center">{ms1Rate}</th>
      <th className="text-center"></th>
      <th className="text-center">
        {totals.saleActTotal === 0 ? "" : totals.saleActTotal * ms1Rate}
      </th>
    </tr>
  </tbody>
</table>

        {/* <table className="w-[100%]">
          <thead className="tablebg py-2">
            <tr className="text-center font-bold py-2">
              <th>Nozzle ID</th>
              <th>Side</th>
              <th>Opening</th>
              <th>Closing</th>
              <th>Sale</th>
              <th>Testing</th>
              <th>Actual Sale</th>
              <th>Rate</th>
              <th></th>
              <th>T Amount</th>
            </tr>
          </thead>
          <tbody>
            {ms1Readings.map((item, index) => (
              <tr
                key={item._id}
                className="font-bold border-2 border-slate-300"
              >
                <td>
                  <input
                    className="text-center w-32"
                    value={item.nozzleProduct}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className="text-center w-20"
                    value={item.sideNo}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className="text-center w-32"
                    value={item.opMeterReading}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.closing || ""}
                    className="text-center bg-blue-600 w-32"
                    onChange={(e) => {
                      const newClosing = parseFloat(e.target.value) || 0;
                      const updatedReadings = [...ms1Readings];
                      updatedReadings[index].closing = newClosing;

                      // Calculate the sale if both closing and opMeterReading are present
                      if (newClosing && item.opMeterReading !== undefined) {
                        updatedReadings[index].sale =
                          newClosing - item.opMeterReading;
                      } else {
                        updatedReadings[index].sale = ""; // Set sale as empty string initially
                      }

                      setMs1Readings(updatedReadings);
                    }}
                  />
                </td>
                <td>
                  <input
                    value={item.sale !== undefined ? item.sale : ""}
                    className="text-center w-32"
                    readOnly
                  />
                </td>

                <td>
                  <input
                    className="bg-blue-700 text-center text-white w-32"
                    value={item.testing || ""}
                    type="number"
                    onChange={(e) => {
                      const newTesting = parseFloat(e.target.value) || 0;
                      const updatedReadings = [...ms1Readings];
                      updatedReadings[index].testing = newTesting;
                      setMs1Readings(updatedReadings);
                    }}
                  />
                </td>

                <td>
                  <input
                    value={
                      item.closing == null ||
                      item.opMeterReading == null ||
                      item.testing == null
                        ? ""
                        : (item.closing || 0) -
                          (item.opMeterReading || 0) -
                          (item.testing || 0)
                    }
                    className="text-center w-32"
                    readOnly
                  />
                </td>

                <td>
                  <input
                    disabled
                    style={{ display: "none" }}
                    value={(item.rate = ms1Rate)}
                    className="text-center w-32 bg-rose-500"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    style={{ display: "none" }}
                    className="text-center w-40"
                    value={(item.saleActTotal = totals.saleActTotal)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    hidden
                    className="text-center w-40"
                    value={(item.totalAmount = totals.saleActTotal * ms1Rate)}
                    readOnly
                  />
                </td>
              </tr>
            ))}
            <tr className="tablebg">
              <th className="text-center" colSpan="4">
                Total
              </th>
              <th className="text-center">{totals.saleTotal}</th>
              <th className="text-center">{totals.testingTotal}</th>
              <th className="text-center">{totals.saleActTotal}</th>
              <th className="text-center">{ms1Rate}</th>
              <th className="text-center"></th>
              <th className="text-center">{totals.saleActTotal * ms1Rate}</th>
            </tr>
          </tbody>
        </table> */}
        <div className="flex justify-between">
          <button>

          </button>
          <button
            className="bg-blue-600 px-3 tracking-wide mr-2 my-2 py-2 rounded-md text-white font-bold"
            onClick={handleSave}
          >
            Save 
          </button>
        </div>
      </section>
            {/* ms1 end */}

               {/* ms2 start */}
      <section className="ms-2">
        <div className="flex justify-center mb-2">
          <div className="block text-2xl justify-center tracking-wider text-blue-600 p-2 rounded-md uppercase font-bold">
            ms-2
          </div>
        </div>
        <table className="w-[100%]">
          <thead className="tablebg py-2">
            <tr className="text-center font-bold py-2">
              <th>Nozzle ID</th>
              <th>Side</th>
              <th>Opening</th>
              <th>Closing</th>
              <th>Sale</th>
              <th>Testing</th>
              <th>Actual Sale</th>
              <th>Rate</th>
              <th></th>
              <th>T Amount</th>
            </tr>
          </thead>
          <tbody>
            {ms2Readings.map((item2, index) => (
              <tr
                key={item2._id}
                className="font-bold border-2 border-slate-300"
              >
                <td>
                  <input
                    className="text-center w-32"
                    value={item2.nozzleProduct}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className="text-center w-20"
                    value={item2.sideNo}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className="text-center w-32"
                    value={item2.opMeterReading}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item2.closing || ""}
                    className="text-center bg-blue-600 w-32"
                    onChange={(e) => {
                      const newClosing = parseFloat(e.target.value) || 0;
                      const updatedReadings = [...ms2Readings];
                      updatedReadings[index].closing = newClosing;

                      // Calculate the sale if both closing and opMeterReading are present
                      if (newClosing && item2.opMeterReading !== undefined) {
                        updatedReadings[index].sale2 =
                          newClosing - item2.opMeterReading;
                      } else {
                        updatedReadings[index].sale2 = ""; // Set sale as empty string initially
                      }

                      setMs2Readings(updatedReadings);
                    }}
                  />
                </td>
                <td>
                  <input
                    value={item2.sale2 !== undefined ? item2.sale2: ""}
                    className="text-center w-32"
                    readOnly
                  />
                </td>

                <td>
                  <input
                    className="bg-blue-700 text-center text-white w-32"
                    value={item2.testing || ""}
                    type="number"
                    onChange={(e) => {
                      const newTesting = parseFloat(e.target.value) || 0;
                      const updatedReadings = [...ms2Readings];
                      updatedReadings[index].testing = newTesting;
                      setMs2Readings(updatedReadings);
                    }}
                  />
                </td>

                <td>
                  <input
                    value={
                      item2.closing == null ||
                      item2.opMeterReading == null ||
                      item2.testing == null
                        ? ""
                        : (item2.closing || 0) -
                          (item2.opMeterReading || 0) -
                          (item2.testing || 0)
                    }
                    className="text-center w-32"
                    readOnly
                  />
                </td>

                <td>
                  <input
                    disabled
                    style={{ display: "none" }}
                    value={(item2.rate = ms2Rate)}
                    className="text-center w-32 bg-rose-500"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    style={{ display: "none" }}
                    className="text-center w-40"
                    value={(item2.saleActTotal2 = totals2.saleActTotal2)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    hidden
                    className="text-center w-40"
                    value={(item2.totalAmount = totals2.saleActTotal2 * ms2Rate)}
                    readOnly
                  />
                </td>
              </tr>
            ))}
            <tr className="tablebg">
              <th className="text-center" colSpan="4">
                Total
              </th>
              <th className="text-center">{totals2.saleTotal2}</th>
              <th className="text-center">{totals2.testingTotal2}</th>
              <th className="text-center">{totals2.saleActTotal2}</th>
              <th className="text-center">{ms2Rate}</th>
              <th className="text-center"></th>
              <th className="text-center">{totals2.saleActTotal2 * ms2Rate}</th>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between">
          <button></button>
        <button
            className="bg-blue-600 px-3 tracking-wide mr-2 my-2 py-2 rounded-md text-white font-bold"
            onClick={handleSave}
          >
            Save 
          </button>
        </div>
      </section>
            {/* ms2 end */}

                   {/* hsd start */}
      <section className="ms-2">
          <div className="flex justify-center">
          <div className="block text-2xl justify-center tracking-wider text-blue-600 p-2 rounded-md uppercase font-bold">
            HSD
          </div>
        </div>
        <table className="w-[100%]">
          <thead className="tablebg py-2">
            <tr className="text-center font-bold py-2">
              <th>Nozzle ID</th>
              <th>Side</th>
              <th>Opening</th>
              <th>Closing</th>
              <th>Sale</th>
              <th>Testing</th>
              <th>Actual Sale</th>
              <th>Rate</th>
              <th></th>
              <th>T Amount</th>
            </tr>
          </thead>
          <tbody>
            {hsdReadings.map((item2, index) => (
              <tr
                key={item2._id}
                className="font-bold border-2 border-slate-300"
              >
                <td>
                  <input
                    className="text-center w-32"
                    value={item2.nozzleProduct}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className="text-center w-20"
                    value={item2.sideNo}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    className="text-center w-32"
                    value={item2.opMeterReading}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item2.closing || ""}
                    className="text-center bg-blue-600 w-32"
                    onChange={(e) => {
                      const newClosing = parseFloat(e.target.value) || 0;
                      const updatedReadings = [...hsdReadings];
                      updatedReadings[index].closing = newClosing;

                      // Calculate the sale if both closing and opMeterReading are present
                      if (newClosing && item2.opMeterReading !== undefined) {
                        updatedReadings[index].sale3 =
                          newClosing - item2.opMeterReading;
                      } else {
                        updatedReadings[index].sale3 = ""; // Set sale as empty string initially
                      }

                      setHsdReadings(updatedReadings);
                    }}
                  />
                </td>
                <td>
                  <input
                    value={item2.sale3 !== undefined ? item2.sale3: ""}
                    className="text-center w-32"
                    readOnly
                  />
                </td>

                <td>
                  <input
                    className="bg-blue-700 text-center text-white w-32"
                    value={item2.testing || ""}
                    type="number"
                    onChange={(e) => {
                      const newTesting = parseFloat(e.target.value) || 0;
                      const updatedReadings = [...hsdReadings];
                      updatedReadings[index].testing = newTesting;
                      setHsdReadings(updatedReadings);
                    }}
                  />
                </td>

                <td>
                  <input
                    value={
                      item2.closing == null ||
                      item2.opMeterReading == null ||
                      item2.testing == null
                        ? ""
                        : (item2.closing || 0) -
                          (item2.opMeterReading || 0) -
                          (item2.testing || 0)
                    }
                    className="text-center w-32"
                    readOnly
                  />
                </td>

                <td>
                  <input
                    disabled
                    style={{ display: "none" }}
                    value={(item2.rate = ms2Rate)}
                    className="text-center w-32 bg-rose-500"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    style={{ display: "none" }}
                    className="text-center w-40"
                    value={(item2.saleActTotal2 = totals2.saleActTotal2)}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    hidden
                    className="text-center w-40"
                    value={(item2.totalAmount = totals2.saleActTotal2 * ms2Rate)}
                    readOnly
                  />
                </td>
              </tr>
            ))}
            <tr className="tablebg">
              <th className="text-center" colSpan="4">
                Total
              </th>
              <th className="text-center">{totals3.saleTotal3}</th>
              <th className="text-center">{totals3.testingTotal3}</th>
              <th className="text-center">{totals3.saleActTotal3}</th>
              <th className="text-center">{hsdRate}</th>
              <th className="text-center"></th>
              <th className="text-center">{totals3.saleActTotal3 * hsdRate}</th>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-between">
          <button></button>
        <button
            className="bg-blue-600 px-3 tracking-wide mr-2 my-2 py-2 rounded-md text-white font-bold"
            onClick={handleSave}
          >
            Save 
          </button>
        </div>
      </section>
            {/* hsd end */}
    </main>
  );
}
