import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
export default function Tank({ dbpath1 }) {
  const [srNo, setSrNo] = useState(0);
  const [oilProductData, setOilProductData] = useState([]);

  const [productName, setProductName] = useState("");
  const [grade, setGrade] = useState("");
  const [colour, setColour] = useState("");
  const [mrp, setMrp] = useState(0);
  const [volumePerPieces, setVolumePerPieces] = useState(0);
  const [volumeType, setVolumeType] = useState("");
  const [pcsPerCase, setPcsPerCase] = useState(0);
  const [pcsType, setPcsType] = useState("");

  const fetchOil = async () => {
    try {
      const res = await axios.get("http://localhost:4000/addoil");
      setOilProductData(res.data.allOils);
      // toast.success("fetched oils")
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = async () => {
    const newAddedOil = {
        srNo:srNo,
      productName: productName,
      grade: grade,
      colour: colour,
      mrp: mrp,
      volumePerPieces: volumePerPieces,
      volumeType: volumeType,
      pcsPerCase: pcsPerCase,
      pcsType: pcsType,
    };

    try {
      console.log(newAddedOil);
      const response = await axios.post(
        `http://localhost:4000/addoil/create`,
        newAddedOil
      );
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);

        fetchOil();
      }
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };

//   const editOil = async (id) => {
//     const EditAddedOil = {
//         productName: productName,
//         grade: grade,
//         colour: colour,
//         mrp: mrp,
//         volumePerPieces: volumePerPieces,
//         volumeType: volumeType,
//         pcsPerCase: pcsPerCase,
//         pcsType: pcsType,
//       };
//     try {
//       const res = await axios.patch(
//         `http://localhost:4000/addoil/update/${id}`,EditAddedOil
//       );

//       //   toast.success("Oil Data Updated");
//       console.log(res.data);
//       fetchOil();
//     } catch (error) {
//       console.log(error);
//     }
//   };

  const deleteOil = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/addoil/delete/${id}`
      );

      toast.success("Oil Deleted");
      console.log(res.data);
      fetchOil();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOil();
  }, []);
  console.log("oilProductData", oilProductData);
  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center">Add Index - Create Oil</h2>
        <span style={{ fontSize: "22px" }}>
          {" "}
          Date :{new Date().toLocaleDateString()}
          {/* {convertDateFormat(datecache)} */}
        </span>
        <div>
          <br></br>
          <table class="table">
            <thead>
              <tr className="text-center">
              <th className="tablebg">Serial No</th>
                <th className="tablebg">Product Name</th>
                <th className="tablebg">Grade</th>
                <th className="tablebg">Colour</th>
                <th className="tablebg">MRP</th>
                <th className="tablebg">Volume Per PCS</th>
                <th className="tablebg">PCS Per Case</th>
                <th className="tablebg">Type</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              <td scope="row">
                  <input
                    type="number"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Sr No"
                    onChange={(e) => setSrNo(e.target.value)}
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Product Name"
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Grade"
                    onChange={(e) => setGrade(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Color"
                    onChange={(e) => setColour(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="MRP"
                    onChange={(e) => setMrp(e.target.value)}
                  />
                </td>
                <td style={{ display: "flex" }}>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    style={{ width: "120px" }}
                    placeholder="Volume"
                    onChange={(e) => setVolumePerPieces(e.target.value)}
                  />
                  <select
                    class="form-select editableInput bigFontWeight"
                    style={{ width: "100px" }}
                    aria-label="Default select example"
                    value={volumeType}
                    onChange={(e) => setVolumeType(e.target.value)}
                  >
                    <option selected>- select -</option>
                    <option value="ML">ML </option>
                    <option value="LTR">LTR </option>
                  </select>
                </td>

                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="PCS Per Case"
                    onChange={(e) => setPcsPerCase(e.target.value)}
                  />
                </td>
                <td style={{ display: "flex" }}>
                  <select
                    class="form-select editableInput bigFontWeight"
                    style={{ width: "100px" }}
                    aria-label="Default select example"
                    value={pcsType}
                    onChange={(e) =>
                      setPcsType(e.target.value)
                    } /* value={machine}  onChange={(e) => setMachine(e.target.value)}*/
                  >
                    <option selected>- select -</option>
                    <option value="Bottle">Bottle </option>
                    <option value="Pouches">Pouches </option>
                  </select>
                </td>
                <td>
                  <button type="button" class="btn btn-primary" onClick={onAdd}>
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
          {/* //added table on add */}
          <table className="text-center">
            <thead>
              <tr className="table-secondary bg-violet-700">
              <th className="tablebg bg-violet-700">Sr No</th>

                <th className="tablebg">Product Name</th>
                <th className="tablebg">Grade</th>
                <th className="tablebg">Colour</th>
                <th className="tablebg">MRP</th>
                <th className="tablebg">Volume Per PCS</th>
                <th className="tablebg">volumeType</th>
                <th className="tablebg">PCS Per Case</th>
                <th className="tablebg">Type</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {oilProductData.map((res) => (
                <tr className="text-center">
                    <td>{res.srNo}</td>
                  <td>{res.productName}</td>
                  <td>{res.grade}</td>
                  <td>{res.colour}</td>
                  <td>
                    <input
                      type="text"
                      class="form-control editableInput bigFontWeight"
                      value={res.mrp}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      class="form-control editableInput bigFontWeight"
                      value={res.volumePerPieces}
                    />
                  </td>
                  <td>{res.volumeType}</td>
                  <td>{res.pcsPerCase}</td>
                  <td>{res.pcsType}</td>

                  <td >
                    {/* <button
                      type="button"
                      class="btn btn-success"
                    //   onClick={editOil(res._id)}
                    >
                      Edit
                    </button>{" "}
                    &nbsp;&nbsp; */}
                    <button
                      type="button"
                      class="btn btn-danger "
                      onClick={() => deleteOil(res._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              <tr>
                {/*  <td>MAK 4T PLUS</td>
                                    <td>20W 40</td>   
                                    <td>RED</td>
                                    <td>397</td>
                                    <td>900 ML</td>
                                    <td style={{width:'250px'}}>
                                         <button type="button"  class="btn btn-primary">Edit</button> &nbsp;
                                        
                                        <button type="button"  class="btn btn-primary">Delete</button>
                                    </td>*/}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
