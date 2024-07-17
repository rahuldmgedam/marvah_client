import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Tank({ dbpath1 }) {
  const [tanks, setTanks] = useState([]);

  const [tankNo, setTankNo] = useState("");
  const [product, setProduct] = useState("");
  const [capacity, setCapacity] = useState("");
  const [nozzles, setNozzles] = useState("");

  const [inputProducts, setInputProducts] = useState({});

  const [inputCapacities, setInputCapacities] = useState({});
  const [inputNozzles, setInputNozzles] = useState({});

  // const loadTank = async () => {
  //     const result = await axios.get(dbpath1 + "getTank.php");
  //     setTanks(result.data.phpresult);

  //     const initialInputProducts = {};
  //     const initialInputCapacities = {};
  //     const initialInputNozzles = {};

  //     result.data.phpresult.forEach(tank => {
  //       initialInputProducts[tank.tank_no] = tank.product;
  //       initialInputCapacities[tank.tank_no] = tank.capacity;
  //       initialInputNozzles[tank.tank_no] = tank.no_of_nozzles;
  //     });

  //     setInputProducts(initialInputProducts);
  //     setInputCapacities(initialInputCapacities);
  //     setInputNozzles(initialInputNozzles);

  //     console.log(result.data.phpresult);
  //   }

  function convertDateFormat(inputDate) {
    // Split the string into an array [yyyy, mm, dd]
    let parts = inputDate.split("-");

    // Rearrange the array and join it back to a string
    return parts[2] + "-" + parts[1] + "-" + parts[0];
  }

  const navigate = useNavigate();

  const onAdd = () => {
    if (tankNo.length === 0) {
      alert("Tank No. has been left blank!");
    } else if (product.length === 0) {
      alert("Product Name has been left blank!");
    } else if (capacity.length === 0) {
      alert("Capacity has been left blank!");
    } else if (nozzles.length === 0) {
      alert("Nozzles Count has been left blank!");
    } else {
      const url = dbpath1 + "addTank.php";
      let fData = new FormData();
      fData.append("tank_no", tankNo);
      fData.append("product", product);
      fData.append("capacity", capacity);
      fData.append("nozzles", nozzles);
      axios
        .post(url, fData)
        .then((response) => {
          alert(response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
    }
  };

  const onDelete = async (index) => {
    let query = "DELETE FROM `pupc_add_tank` WHERE tank_no = " + index + ";";
    /* alert(query); */
    const url = dbpath1 + "delTank.php";
    let fData = new FormData();
    fData.append("query", query);

    axios
      .post(url, fData)
      .then((response) => {
        alert(response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  const onSave = async (index) => {
    let query =
      "UPDATE pupc_add_tank SET product = '" +
      document.getElementById("inputProduct" + index).value +
      "', capacity = " +
      document.getElementById("inputCapacity" + index).value +
      ", no_of_nozzles = " +
      document.getElementById("inputNozzles" + index).value +
      " WHERE tank_no = " +
      index;
    /* alert(query); */
    const url = dbpath1 + "delTank.php";
    let fData = new FormData();
    fData.append("query", query);

    axios
      .post(url, fData)
      .then((response) => alert(response.data))
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  // useEffect(() => {
  //     loadTank();
  //   }, []);
  const datecache = Cookies.get("dateCookies");
  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center">Create Tanks</h2>
        <div>
          <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Tank No.</th>
                <th className="tablebg">Product</th>
                <th className="tablebg">Capacity</th>
                <th className="tablebg">Nozzles</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">
                  <input
                    type="number"
                    class="form-control editableInput bigFontWeight "
                    placeholder="Tank No."
                    onChange={(e) => setTankNo(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight "
                    placeholder="Product Name"
                    onChange={(e) => setProduct(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight "
                    placeholder="Capacity (Liters)"
                    onChange={(e) => setCapacity(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight "
                    placeholder="Nozzels Count"
                    onChange={(e) => setNozzles(e.target.value)}
                  />
                </td>
                <td>
                  <button type="button" class="btn btn-primary" 
                //   onClick={onAdd}
                  >
                    ADD
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br></br>
        <div>
          <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Tank No.</th>
                <th className="tablebg">Product</th>
                <th className="tablebg">Capacity</th>
                <th className="tablebg">Nozzles</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>    
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td style={{width:'350px'}}>
                                <button type="button" class="btn btn-primary">Edit</button> &nbsp;
                                <button type="button" class="btn btn-primary">Close</button> &nbsp;
                                <button type="button" class="btn btn-primary">Open</button> &nbsp;
                                <button type="button" class="btn btn-primary">Delete</button>
                            </td>
                        </tr> */}
              {tanks.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td className="tdbc1 p-3">{res.tank_no}</td>

                  <td className="tdbc1">
                    <input
                      type="text"
                      id={"inputProduct" + res.tank_no}
                      className="form-control editableInput bigFontWeight" // use className instead of class in JSX
                      placeholder="Product Name"
                      value={inputProducts[res.tank_no]}
                      onChange={(e) => {
                        setInputProducts({
                          ...inputProducts,
                          [res.tank_no]: e.target.value,
                        });
                      }}
                    />
                  </td>

                  <td className="tdbc1">
                    <input
                      type="text"
                      id={"inputCapacity" + res.tank_no}
                      className="form-control editableInput bigFontWeight"
                      placeholder="Capacity (Liters)"
                      value={inputCapacities[res.tank_no]}
                      onChange={(e) => {
                        setInputCapacities({
                          ...inputCapacities,
                          [res.tank_no]: e.target.value,
                        });
                      }}
                    />
                  </td>

                  <td className="tdbc1">
                    <input
                      type="text"
                      id={"inputNozzles" + res.tank_no}
                      className="form-control editableInput bigFontWeight"
                      placeholder="Nozzels Count"
                      value={inputNozzles[res.tank_no]}
                      onChange={(e) => {
                        setInputNozzles({
                          ...inputNozzles,
                          [res.tank_no]: e.target.value,
                        });
                      }}
                    />
                  </td>

                  <td className="tdbc1">
                    <button
                      type="button"
                      id={"tank" + res.tank_no}
                      class="btn btn-success "
                      onClick={() => onSave(res.tank_no)}
                    >
                      Save
                    </button>{" "}
                    &nbsp;
                    {/* <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Close</button> &nbsp;
                                        <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Open</button> &nbsp; */}
                    <button
                      type="button"
                      id={"tank" + res.tank_no}
                      class="btn btn-danger "
                      onClick={() => onDelete(res.tank_no)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
