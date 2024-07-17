import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Tank({ dbpath1 }) {
  const [banks, setBanks] = useState([]);

  const [bankName, setBankName] = useState("");
  const [headName, setHeadName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [balance, setBalance] = useState("");

  const loadBanks = async () => {
    let query = "select * from rwt_bank_account WHERE account_status='active'";

    /*    alert(query); */
    const url = dbpath1 + "getDynamic.php";
    let fData = new FormData();

    fData.append("query", query);

    const response = await axios.post(url, fData);

    if (response && response.data) {
      if (response.data.phpresult) {
        setBanks(response.data.phpresult);
        console.log(response.data.phpresult);
      }
    }
  };

  const navigate = useNavigate();

  const onAdd = () => {
    if (bankName.length === 0) {
      alert("Bank Name has been left blank!");
    } else if (headName.length === 0) {
      alert("Head Name has been left blank!");
    } else if (accountNo.length === 0) {
      alert("Account Number has been left blank!");
    } else {
      let query =
        "INSERT INTO `rwt_bank_account` (`bank_account_id`, `name`, `head_name`, `account_no`, `account_status`, `starting_amount`) VALUES (NULL, '" +
        bankName +
        "', '" +
        headName +
        "', '" +
        accountNo +
        "', 'active', '" +
        balance +
        "');";
      /*  alert(query); */
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
    }
  };

  const onDelete = async (index) => {
    let query =
      "DELETE FROM `rwt_bank_account` WHERE bank_account_id = " + index + ";";
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

  // function convertDateFormat(inputDate) {
  //     // Split the string into an array [yyyy, mm, dd]
  //     let parts = inputDate.split('-');

  //     // Rearrange the array and join it back to a string
  //     return parts[2] + '-' + parts[1] + '-' + parts[0];
  // }

  // useEffect(() => {
  //     loadBanks();
  //   }, []);
  const datecache = Cookies.get("dateCookies");
  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center">Add Bank Account</h2>
        <span style={{ fontSize: "22px" }}>
          {" "}
          Date :{/* {convertDateFormat(datecache)} */}
        </span>
        <div>
          <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Bank Name</th>
                <th className="tablebg">Bank Head Name</th>
                <th className="tablebg">Account No</th>
                <th className="tablebg">Balance</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">
                  <select
                    class="form-select editableInput bigFontWeight"
                    aria-label="Default select example"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  >
                    <option selected>- select -</option>

                    <option value="HDFC Bank">HDFC Bank </option>

                    <option value="Shikshak Sahakari Bank">
                      Shikshak Sahakari Bank{" "}
                    </option>

                    <option value="Bank of Baroda">Bank of Baroda </option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeights"
                    placeholder="Head Name"
                    onChange={(e) => setHeadName(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeights"
                    placeholder="Account Number"
                    onChange={(e) => setAccountNo(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeights"
                    placeholder="Balance"
                    onChange={(e) => setBalance(e.target.value)}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-primary"
                    //  onClick={onAdd}
                  >
                    Save
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
                <th className="tablebg">Bank Name</th>
                <th className="tablebg">Bank Head Name</th>
                <th className="tablebg">Account No</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {banks.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td>{res.name}</td>
                  <td>{res.head_name}</td>
                  <td>{res.account_no}</td>

                  <td style={{ width: "50px" }}>
                    <button
                      type="button"
                      style={{ height: "30px", paddingTop: "2px" }}
                      id={"data" + res.bank_account_id}
                      class="btn btn-danger"
                      onClick={() => onDelete(res.bank_account_id)}
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
