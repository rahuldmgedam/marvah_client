import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Add_Oil_Pouches({ dbpath1 }) {
  const [oilproduct, setOilproduct] = useState([]);

  const [dispensing_unit_no, setdispensing_unit_no] = useState("");
  const [make, setmake] = useState("");
  const [serial_no, setserial_no] = useState("");
  const [connected_tanks, setconnected_tanks] = useState("");
  const [nozzles_in_mpd, setnozzles_in_mpd] = useState("");
  const [product, setProduct] = useState("");
  const [sr, setSr] = useState("");
  const [grdae, setGrdae] = useState("");
  const [color, setColor] = useState("");
  const [mrp, setMrp] = useState("");
  const [volume, setPVolume] = useState("");
  const [volume1, setPVolume1] = useState("");
  const [volume2, setPVolume2] = useState("");
  const [PCSPerCase, setPCSPerCase] = useState("");

  // const loadOilProducts = async () => {

  //   let query="select * from rwt_oil_pouches";

  //   /*    alert(query); */
  //      const url = dbpath1 + 'getDynamic.php';
  //      let fData = new FormData();

  //      fData.append('query', query);

  //          const response = await axios.post(url, fData);

  //          if (response && response.data) {

  //              if (response.data.phpresult) {
  //                  setOilproduct(response.data.phpresult);
  //                  console.log(response.data.phpresult);
  //              }
  //          }

  //   let i=0;
  //  /*  var elements = document.getElementsByClassName("ratehsd");
  //   for ( i = 0; i < elements.length; i++) {
  //       elements[i].value = dayStartRate[0]['hsd'];
  //   } */
  //   for(i=0;i<response.data.phpresult.length;i++)
  //   {
  //     try
  //     {
  //       console.log(i);
  //     document.getElementById('mrp'+response.data.phpresult[i]['id']).value = response.data.phpresult[i]['amount'];
  //     document.getElementById('pcs'+response.data.phpresult[i]['id']).value = response.data.phpresult[i]['pcs_per_box'];
  //     }
  //     catch{
  //       console.log('catched expection');
  //     }
  //   }
  // }

  const navigate = useNavigate();

  //   const onAdd = () =>{

  //     if (product.length === 0) {
  //       alert("Product Name has been left blank!");
  //     }   else if (mrp.length === 0) {
  //       alert("MRP has been left blank!");
  //     }   else if (volume1.length === 0) {
  //       alert("Volume vale has been left blank!");
  //     }  else if (volume2.length === 0) {
  //       alert("Volume Size has been left blank!");
  //     }  else if (PCSPerCase.length === 0) {
  //       alert("PCS Per Case has been left blank!");
  //     }  else {

  //       let query="INSERT INTO `rwt_oil_pouches` (`id`, `name`, `size`, `pcs_per_box`, `amount`) VALUES (NULL, '"+product+"', '"+volume1+" "+volume2+"', '"+PCSPerCase+"', '"+mrp+"');";
  //       /*  alert(query); */
  //        const url = dbpath1+'delTank.php';
  //        let fData = new FormData();
  //        fData.append('query', query);

  //        axios.post(url, fData)
  //        .then(response => {alert(response.data);  window.location.reload();})
  //            .catch(error => {
  //            console.log(error.toJSON());
  //     });
  //   }
  // }

  //   const onDelete = async (index) => {
  //     let query="DELETE FROM `rwt_oil_pouches` WHERE id = "+index+";";

  //     alert(query);
  //     const url = dbpath1+'delTank.php';
  //     let fData = new FormData();
  //     fData.append('query', query);

  //     axios.post(url, fData)
  //         .then(response =>{ alert(response.data); window.location.reload();})
  //         .catch(error => {
  //         console.log(error.toJSON());
  //         });
  // }

  //   const onSave = async (index) => {
  //     let query="UPDATE `rwt_oil_pouches` SET `pcs_per_box` = '"+ document.getElementById('pcs'+index).value+"', `amount` = '"+document.getElementById('mrp'+index).value+"' WHERE `id` = '"+index+"';";

  //     /* alert(query); */
  //     const url = dbpath1+'delTank.php';
  //     let fData = new FormData();
  //     fData.append('query', query);

  //     axios.post(url, fData)
  //         .then(response =>{ alert(response.data);/*  window.location.reload(); */})
  //         .catch(error => {
  //         console.log(error.toJSON());
  //         });
  // }

  // useEffect(() => {
  //    loadOilProducts();

  //   }, []);
  //   const datecache = Cookies.get('dateCookies');

  //   function convertDateFormat(inputDate) {
  //     // Split the string into an array [yyyy, mm, dd]
  //     let parts = inputDate.split('-');

  //     // Rearrange the array and join it back to a string
  //     return parts[2] + '-' + parts[1] + '-' + parts[0];
  // }
  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center">Add Oil Pouches</h2>
        <span style={{ fontSize: "22px" }}>
          {" "}
          Date :{/* {convertDateFormat(datecache)} */}
        </span>
        <div>
          <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Product Name</th>
                <th className="tablebg">MRP</th>
                <th className="tablebg">Volume Per PCS</th>
                <th className="tablebg">PCS Per Case</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Product Name"
                    onChange={(e) => setProduct(e.target.value)}
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
                    style={{ width: "150px" }}
                    placeholder="Volume"
                    onChange={(e) => setPVolume1(e.target.value)}
                  />
                  <select
                    class="form-select editableInput bigFontWeight"
                    style={{ width: "100px" }}
                    aria-label="Default select example"
                    value={volume}
                    onChange={(e) =>
                      setPVolume2(e.target.value)
                    } /* value={machine}  onChange={(e) => setMachine(e.target.value)}*/
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
                    onChange={(e) => setPCSPerCase(e.target.value)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    // onClick={onAdd}
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
                <th className="tablebg">Product Name</th>
                <th className="tablebg">MRP</th>
                <th className="tablebg">Volume Per PCS</th>
                <th className="tablebg">PCS Per Case</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {oilproduct.map((res) => (
                <tr className="hovereffect">
                  <td>{res.name}</td>

                  <td>
                    {/* {res.product_mrp} */}
                    <input
                      type="text"
                      class="form-control editableInput bigFontWeight"
                      placeholder="loading.."
                      id={"mrp" + res.id}
                      style={{ width: "180px" }}
                    />
                  </td>
                  <td>{res.size}</td>
                  <td>
                    {/* {res.product_pcs_per_caserwt_oil_products} */}
                    <input
                      type="text"
                      class="form-control editableInput bigFontWeight"
                      placeholder="loading.."
                      id={"pcs" + res.id}
                      style={{ width: "180px" }}
                    />
                  </td>
                  <td style={{ width: "250px" }}>
                    {/*  <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Edit</button> &nbsp;
                                        <button type="button" id={"tank"+   res.tank_no} class="btn btn-primary">Close</button> &nbsp;
                                      
                                      <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Open</button> &nbsp; */}
                    <button
                      type="button"
                      id={"tank" + res.id}
                      class="btn btn-success "
                      //  onClick={() => onSave(res.id)}
                    >
                      Save
                    </button>{" "}
                    &nbsp;&nbsp;
                    <button
                      type="button"
                      id={"tank" + res.id}
                      class="btn btn-danger "
                      //  onClick={() => onDelete(res.id)}
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
