import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Nozzles({ dbpath1 }) {
  const [tanks, setTanks] = useState([]);
  const [nozzles, setNozzles] = useState([]);
  const [machinen, setMachinen] = useState([]);

  const [nozzle_name, setNozzle_name] = useState("");
  const [product, setProduct] = useState("");
  const [machine, setMachine] = useState("");
  const [smachine, setSMachine] = useState("");
  const [side, setSide] = useState("");
  const [nozzle_no, setNozzle_no] = useState("");
  const [op_meter_reading, setOp_meter_reading] = useState("");

  //   const loadNozzles = async () => {
  //     const result = await axios.get(dbpath1 + "getNozzles.php");
  //     setNozzles(result.data.phpresult);
  //     console.log(result.data.phpresult);
  //   };

  // const loadProduct = async () => {
  //     const result2 = await axios.get(dbpath1+"getTank.php");
  //     setTanks(result2.data.phpresult);
  //     console.log(result2.data.phpresult);
  //   }

  //   const loadMachine = async () => {
  //     const result1 = await axios.get(dbpath1 + "getMachine.php");
  //     setMachinen(result1.data.phpresult);
  //     console.log(result1.data.phpresult);
  //   };

  const navigate = useNavigate();

  //   const onAdd = () => {
  //     if (nozzle_name.length === 0) {
  //       alert("Tank name has been left blank!");
  //     } else if (product.length === 0) {
  //       alert("Product has been left blank!");
  //     } else if (machine.length === 0) {
  //       alert("Machine has been left blank!");
  //     } else if (side.length === 0) {
  //       alert("Side has been left blank!");
  //     } else if (nozzle_no.length === 0) {
  //       alert("Nozzles no has been left blank!");
  //     } else if (op_meter_reading.length === 0) {
  //       alert("op meter reading has been left blank!");
  //     } else {
  //       const url = dbpath1 + "addNozzles.php";
  //       let fData = new FormData();
  //       fData.append("nozzle_name", nozzle_name);
  //       fData.append("product", product);
  //       fData.append("machine", machine);
  //       fData.append("side", side);
  //       fData.append("nozzle_no", nozzle_no);
  //       fData.append("op_meter_reading", op_meter_reading);
  //       axios
  //         .post(url, fData)
  //         .then((response) => {
  //           updateSaleFuels();
  //           updateSaleFuelsYesterday();
  //           alert(response.data);
  //           window.location.reload();
  //         })
  //         .catch((error) => {
  //           console.log(error.toJSON());
  //         });
  //     }
  //   };
  //   function calcDays(inputDate, daysToAdd) {
  //     // Parse the input date string into a Date object
  //     let date = new Date(datecache);

  //     // Add or subtract the specified number of days
  //     date.setDate(date.getDate() - 1);

  //     // Return the new date in standard JavaScript date format
  //     return date.toISOString().split("T")[0];
  //   }
  //   const updateSaleFuels = async () => {
  //     let query1 =
  //       "INSERT INTO `sale_fuels` (`id`, `date`, `product_name`, `nozzle`, `opening`, `closing`, `sale`, `testing`, `asale`, `rate`, `amount`) VALUES (NULL, '" +
  //       datecache +
  //       "', '" +
  //       product +
  //       "', '" +
  //       nozzle_name +
  //       "', '" +
  //       op_meter_reading +
  //       "', '', '', '', '', '', '');";
  //     //alert(query1);
  //     const url1 = dbpath1 + "delTank.php";
  //     let fData1 = new FormData();
  //     fData1.append("query", query1);

  //     axios
  //       .post(url1, fData1)
  //       .then()
  //       .catch((error) => {
  //         console.log(error.toJSON());
  //       });
  //   };

  //   const updateSaleFuelsYesterday = async () => {
  //     let query1 =
  //       "INSERT INTO `sale_fuels` (`id`, `date`, `product_name`, `nozzle`, `opening`, `closing`, `sale`, `testing`, `asale`, `rate`, `amount`) VALUES (NULL, '" +
  //       calcDays() +
  //       "', '" +
  //       product +
  //       "', '" +
  //       nozzle_name +
  //       "', '', '" +
  //       op_meter_reading +
  //       "', '', '', '', '', '');";
  //     //alert(query1);
  //     const url1 = dbpath1 + "delTank.php";
  //     let fData1 = new FormData();
  //     fData1.append("query", query1);

  //     axios
  //       .post(url1, fData1)
  //       .then()
  //       .catch((error) => {
  //         console.log(error.toJSON());
  //       });
  //   };

  //   const onDelete = async (index) => {
  //     let query = "DELETE FROM `pupc_nozzles` WHERE nozzle_id = " + index + ";";

  //     /* alert(query); */
  //     const url = dbpath1 + "delTank.php";
  //     let fData = new FormData();
  //     fData.append("query", query);

  //     axios
  //       .post(url, fData)
  //       .then((response) => {
  //         alert(response.data);
  //         window.location.reload();
  //       })
  //       .catch((error) => {
  //         console.log(error.toJSON());
  //       });
  //   };

  const processedNozzles = nozzles.reduce((acc, curr) => {
    const existingEntry = acc.find((entry) => entry.machine === curr.machine);
    if (existingEntry) {
      existingEntry.rowspan += 1;
      existingEntry.entries.push(curr);
    } else {
      acc.push({
        machine: curr.machine,
        entries: [curr],
        rowspan: 1,
      });
    }
    return acc;
  }, []);

  const displaySelectedProduct = async (index) => {
    let query =
      "select * FROM `pupc_machines` WHERE dispensing_unit_no = '" +
      index +
      "';";
    /*  
    alert(query); */
    const url = dbpath1 + "getDynamic.php";
    let fData = new FormData();
    fData.append("query", query);

    try {
      const response = await axios.post(url, fData);

      if (response && response.data) {
        if (response.data.phpresult) {
          setSMachine(response.data.phpresult);
          console.log(response.data.phpresult);
          document.getElementById("ddun").innerHTML =
            response.data.phpresult[0]["dispensing_unit_no"];
          document.getElementById("dmake").innerHTML =
            response.data.phpresult[0]["make"];
          document.getElementById("dserial_no").innerHTML =
            response.data.phpresult[0]["serial_no"];
          document.getElementById("dconnected_tanks").innerHTML =
            response.data.phpresult[0]["connected_tanks"];
          document.getElementById("dproduct").innerHTML =
            response.data.phpresult[0]["product"];
          document.getElementById("dnozzles_in_mpd").innerHTML =
            response.data.phpresult[0]["nozzles_in_mpd"];
        }
      }
    } catch (error) {
      console.log("Please Select Proper Input");
    }
    //   function convertDateFormat(inputDate) {
    //     // Split the string into an array [yyyy, mm, dd]
    //     let parts = inputDate.split("-");

    //     // Rearrange the array and join it back to a string
    //     return parts[2] + "-" + parts[1] + "-" + parts[0];
    //   }

    // useEffect(() => {
    //     loadNozzles();
    //     loadProduct();
    //     loadMachine();
    //   }, []);
    const datecache = Cookies.get("dateCookies");
  };
  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center">Create Nozzels</h2>
        <span style={{ fontSize: "22px" }}>
          {" "}
          Date :{/* {convertDateFormat(datecache)} */}
        </span>
        <div>
          <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Nozzle Name</th>
                <th className="tablebg">Product</th>
                <th className="tablebg">Machine</th>
                <th className="tablebg">Side</th>
                <th className="tablebg">Nozzle No.</th>
                <th className="tablebg">OP. Meter Reading</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Nozzle Name"
                    onChange={(e) => setNozzle_name(e.target.value)}
                  />
                </td>
                <td>
                  <select
                    class="form-select editableInput bigFontWeights"
                    aria-label="Default select example"
                    value={product}
                    /* onChange={displaySelectedProduct(product)} */ onChange={(
                      e
                    ) => setProduct(e.target.value)}
                  >
                    <option selected>- Product -</option>
                    {tanks.map((rest) => (
                      <option value={rest.product}>{rest.product}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    class="form-select editableInput bigFontWeights"
                    aria-label="Default select example"
                    value={machine}
                    onChange={(e) => {
                      const value = e.target.value;
                      setMachine(value);
                      displaySelectedProduct(value);
                    }}
                  >
                    <option selected>- Machine -</option>
                    {machinen.map((rest) => (
                      <option value={rest.dispensing_unit_no}>
                        {rest.dispensing_unit_no}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Side"
                    onChange={(e) => setSide(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Nozzle no"
                    onChange={(e) => setNozzle_no(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="OP. Meter Reading"
                    onChange={(e) => setOp_meter_reading(e.target.value)}
                  />
                </td>
                <td>
                  <button type="button" class="btn btn-primary">
                    ADD
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          Selected Machine:
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Dispensing Unit No.</th>
                <th className="tablebg">Make</th>
                <th className="tablebg">Serial No.</th>
                <th className="tablebg">Connected Tanks</th>
                <th className="tablebg">Product</th>
                <th className="tablebg">Nozzles in MPD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td id="ddun"></td>
                <td id="dmake"></td>
                <td id="dserial_no"></td>
                <td id="dconnected_tanks"></td>
                <td id="dproduct"></td>
                <td id="dnozzles_in_mpd"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Dispensing Unit No</th>
                <th className="tablebg">Product</th>
                <th className="tablebg">Side</th>
                <th className="tablebg">Nozzle No & Name</th>
                <th className="tablebg">OP. Meter Reading</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {nozzles.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td>{res.machine}</td>
                  <td>{res.product}</td>
                  <td>(Side) {res.side}</td>
                  <td>
                    ({res.nozzle_no}) - {res.nozzle_name}
                  </td>
                  <td>{res.op_meter_reading}</td>
                  <td style={{ width: "250px" }}>
                    <button
                      type="button"
                      id={"tank" + res.nozzle_id}
                      class="btn btn-danger"

                      // onClick={() => onDelete(res.nozzle_id)}
                    >

                      Delete
                    </button>
                  </td>
                  {/*<td style={{width:'50px'}}>
                                       
                                        <button type="button" id={"tank"+res.tank_no} class="btn btn-primary" onClick={() => onMoveRetail(res.product_id)}>Move</button>
                                        </td> */}
                </tr>
              ))}

              {/*  {processedNozzles.map((machineEntry, machineIndex) => (
                            <React.Fragment key={machineIndex}>
                                <tr className='hovereffect'>
                                    <td rowSpan={machineEntry.rowspan}><b>{machineEntry.machine}</b></td>
                                    <td>{machineEntry.entries[0].product}</td>   
                                    <td>(Side) {machineEntry.entries[0].side}</td>  
                                    <td>({machineEntry.entries[0].nozzle_no}) - {machineEntry.entries[0].nozzle_name}</td>
                                    <td>{machineEntry.entries[0].op_meter_reading}</td>
                                    <td style={{width:'250px'}}>
                                        <button type="button" id={"tank"+machineEntry.entries[0].nozzle_id} class="btn btn-primary" onClick={() => onDelete(machineEntry.entries[0].nozzle_id)}>Delete</button>
                                    </td>
                                </tr>
                                {machineEntry.entries.slice(1).map((res, nozzleIndex) => (
                                    <tr className='hovereffect' key={nozzleIndex}>
                                        <td>{res.product}</td>   
                                        <td>(Side) {res.side}</td>  
                                        <td>({res.nozzle_no}) - {res.nozzle_name}</td>
                                        <td>{res.op_meter_reading}</td>
                                        <td style={{width:'250px'}}>
                                            <button type="button" id={"tank"+res.nozzle_id} class="btn btn-primary" onClick={() => onDelete(res.nozzle_id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}  */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
