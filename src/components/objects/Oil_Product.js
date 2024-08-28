import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
export default function Tank({ dbpath1 }) {
  const [srNo, setSrNo] = useState(0);
  const [opStock, setOpStock] = useState(0);

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
      srNo: srNo,
      opStock:opStock,
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
        <h2 className="mb-2 text-2xl leading-4 text-green-500 uppercase text-center">
          Add New Oil products
        </h2>
        <span style={{ fontSize: "22px" }}>
          {" "}
          Date :{new Date().toLocaleDateString()}
          {/* {convertDateFormat(datecache)} */}
        </span>
        <div>
          <br></br>
          <table className="bg-white border border-gray-700 w-[100%]">
            <thead>
              <tr className="bg-[#3A1078] text-white uppercase text-md text-center">
                <th className="py-1 px-2 text-center">Serial No</th>
                <th className="py-1 px-2 text-center">op Stock</th>

                <th className="py-1 px-2 text-center">Product Name</th>
                <th className="py-1 px-2 text-center">Grade</th>
                <th className="py-1 px-2 text-center">Colour</th>
                <th className="py-1 px-2 text-center">MRP</th>
                <th className="py-1 px-2 text-center">Vol. Per PCS</th>
                <th className="py-1 px-2 text-center">PCS Per Case</th>
                <th className="py-1 px-2 text-center">Type</th>
                {/* <th className="py-1 px-2 text-center">Action</th> */}
              </tr>
            </thead>
            <tbody className="text-md">
              <tr className="border-b border-gray-300 text-center">
                <td>
                  <input
                    type="number"
                    className="w-12 border-4 border-blue-500 text-center"
                    onChange={(e) => setSrNo(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="w-12 border-4 border-blue-500 text-center"
                    onChange={(e) => setOpStock(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="w-36  border-4 border-blue-500 text-center"
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    className="w-32 text-center  border-4 border-blue-500"
                    onChange={(e) => setGrade(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="w-24 text-center  border-4 border-blue-500"
                    onChange={(e) => setColour(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="w-24 text-center  border-4 border-blue-500"
                    onChange={(e) => setMrp(e.target.value)}
                  />
                </td>
                <td style={{ display: "flex" }}>
                  <input
                    type="text"
                    className="w-20 text-center  border-4 border-blue-500"
                    onChange={(e) => setVolumePerPieces(e.target.value)}
                  />
                  <select
                    className="w-24 text-center  border-4 border-blue-500"
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
                    className="w-24 text-center  border-4 border-blue-500"
                    onChange={(e) => setPcsPerCase(e.target.value)}
                  />
                </td>
                <td style={{ display: "flex" }}>
                  <select
                    className="w-24 text-center  border-4 border-blue-500"
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
            
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between mt-3 mr-4">
            <td></td>
            <td>
                  <button type="button" class="btn btn-primary" onClick={onAdd}>
                    ADD
                  </button>
                </td>
          </div>
        </div>
        <br></br>
        <div>
          <br></br>
          <h2 className="mb-6 text-2xl leading-4 text-green-500 uppercase text-center">
          Added New Oil Products
        </h2>
          {/* //added table on add */}
          <table className="text-center  w-[100%]">
            <thead className="">
              <tr className="bg-[#3A1078] text-white uppercase text-md">
                <th className="">Sr No</th>
                <th className="">Op. <br /> Stock</th>

                <th className="">Product Name</th>
                <th className="">Grade</th>
                <th className="">Colour</th>
                <th className="">MRP</th>
                <th className="">Vol. Per PCS</th>
                <th className=""> unit</th>
                <th className="">PCS Per <br /> Case</th>
                <th className="">Type</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              {oilProductData.map((res) => (
                <tr className="text-center">
                  <td>{res.srNo}</td>
                  <td>{res.opStock}</td>
                  <td>{res.productName}</td>
                  <td>{res.grade}</td>
                  <td>{res.colour}</td>
                  <td>
                    {res.mrp}
                  </td>

                  <td>
                    {res.volumePerPieces}
                  </td>
                  <td>{res.volumeType}</td>
                  <td>{res.pcsPerCase}</td>
                  <td>{res.pcsType}</td>

                  <td>
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
