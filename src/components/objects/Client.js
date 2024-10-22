
//gagan code

import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";


import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import EditClientModal from "./EditClientModal ";

export default function Client({ dbpath1 }) {
  const [clients, setClients] = useState([]);

  const [party_name, setParty_name] = useState("");
  const [returnrecieve, setReturnRecieve] = useState(0);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [party_id, setParty_id] = useState("");

  const [product, setproduct] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();
  const todayDate = new Date();

  //rahuls code 16th july
  const [clientData, setClientData] = useState({});

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setClientData({ ...clientData, [name]: value });
  };

  const fetchClient = () => {
    axios
      .get("https://marvah-server.onrender.com/client/")
      .then((res) => {
        console.log(" client res", res.data);
        setClients(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const createClient = async () => {
    await axios
      .post("https://marvah-server.onrender.com/client/create", {
        party_name,
        returnrecieve,
        amount,
        date,
      })
      .then((res) => {
        setproduct(res.data)
        fetchClient()
      });
    console.log("createClient", product);
  };

  useEffect(() => {
    fetchClient();
  }, []);

  function getTodaysDate() {
    const today = new Date();

    // Extract day, month, and year
    const day = String(today.getDate());
    // .padStart(0, '0');
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = today.getFullYear(); // Full year

    return `${day}-${month}-${year}`;
  }

  // Example usage
  const todaysDate = getTodaysDate();
  console.log(todaysDate); // Output: e.g., "24-07-2024"

  function formatDateString(dateString) {
    const date = new Date(dateString);

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = String(date.getFullYear()); // Get last two digits of the year

    return `${day}-${month}-${year}`;
  }

  // Example usage
  const inputDate = "2023-07-24T12:12:25.000Z";
  const formattedDate = formatDateString(inputDate);
  console.log(formattedDate); // Output: "24-07-23"

  const handleEditClick = (client) => {
    setClientData(client);
    setModalIsOpen(true);
  };




const handleUpdateClient = (e) => {
    e.preventDefault();
    axios.patch(`https://marvah-server.onrender.com/client/update/${clientData._id}`, clientData)
        .then((res) => {
            setClients(clients.map(client => client._id === res.data._id ? res.data : client));
            setModalIsOpen(false);
            console.log(res.data)
        })
        .catch((error) => {
            console.log(error.message);
        });
};

const handleOpenCloseClick = (id, isClosed) => {
    axios.patch(`https://marvah-server.onrender.com/client/update/${id}`, { isClosed })
        .then((res) => {
          if(res.data.success){
            fetchClient()
            alert(res.data.msg)
          }
            console.log(res.data)
        })
        .catch((error) => {
            console.log(error.message);
        });
};

  return (
    <>
      {/* //modal */}

      {/* //modal end */}

      <div className="tankMainDiv shadow-lg p-3bg-body-tertiary rounded bigFontWeight">
        <h2 className="  text-black p-3 text-2xl uppercase text-center">
          Handloan/Advances Client
        </h2>
        <span className="mt-5" style={{ fontSize: "22px" }}>
          {" "}
          Date :{todaysDate}
        </span>
        <div className="flex justify-between w-[90%]">
            <div></div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 px-2 py-1 rounded-md text-white"
                onClick={() => navigate("/handloans")}
              >
                Handloans
              </button>
              <button
                className="bg-blue-500 px-2 py-1 rounded-md text-white"
                onClick={() => navigate("/advances")}
              >
                Advances
              </button>
            </div>
          </div>
        <div>
          <br></br>

          <div className="flex center align-content-center justify-center items-center ">
            <table class=" border-blue-500 border-1 rounded-lg mr-10 text-center px-4 py-2 w-[60%] p-5">
              <thead>
                <div className="border-gray-400 rounded-sm p-2">
                  <h1 className="uppercase font-bold">
                    <span className=" bg-[#0077b7b]">
                      {/* Create new handloan/advances name */}
                    </span>
                  </h1>
                </div>
                <tr className="table-secondary p-2">
                  <th className="">Party Name:</th>
                </tr>
              </thead>
              <tbody>
                <tr className="client-input">
                  <td className="p-4">
                    <input
                      type="text"
                      class="form-control editableInput bigFontWeight"
                      placeholder="Name"
                      onChange={(e) => setParty_name(e.target.value)}
                    />
                  </td>
                </tr>
                <tr className="">
                  <button
                    type="button"
                    className="font-bold bg-blue-400 px-4 py-2 mb-3 rounded-md text-white"
                    onClick={createClient}
                  >
                    ADD
                  </button>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <br></br>
        <div>
          <br></br>

     
   
        <div>
            <table className="table">
                <thead>
                    <tr className="table-secondary text-center">
                        <th className="tablebg">Sr No</th>
                        <th className="tablebg">Date</th>
                        <th className="tablebg">Party Name</th>
                        <th className="tablebg">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client, index) => (
                        <tr className="hovereffect text-center" key={index}>
                            <td>{index + 1}</td>
                            <td>{formatDateString(client.date)}</td>
                            <td>{client.isClosed ? "(closed)" : ""}{client.party_name}</td>
                            <td style={{ width: "250px" }}>
                                <button
                                    type="button"
                                    onClick={() => handleEditClick(client)}
                                    className="bg-yellow-500 px-2 py-1 mr-3 text-white rounded-md uppercase"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleOpenCloseClick(client._id, false)}
                                    className="bg-blue-500 px-2 py-1 mr-3 text-white rounded-md uppercase"
                                >
                                    Open
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleOpenCloseClick(client._id, true)}
                                    className="bg-blue-500 px-2 py-1 text-white rounded-md uppercase"
                                >
                                    Close
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <EditClientModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                clientData={clientData}
                handleClientChange={handleClientChange}
                 handleUpdateClient={handleUpdateClient}
            />
        </div>




           {/* <table class="table">
            <thead>
              <tr className="table-secondary text-center">
                <th className="tablebg ">Sr No</th>

                <th className="tablebg">Date</th>
                <th className="tablebg">Party Name</th>

                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((res, index) => (
                <tr className="hovereffect text-center" key={index}>
                  <td>{index + 1}</td>
                  <td>{formatDateString(res.date)}</td>

                  <td>{res.party_name}</td>

                  <td style={{ width: "250px" }} className="">
                    <button
                      type="button"
                      onClick={handleClientChange}
                      class="bg-yellow-500 px-2 py-1 mr-3 text-white rounded-md uppercase"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      class="bg-blue-500 px-2 py-1 mr-3 text-white rounded-md uppercase"
                    >
                      open
                    </button>
                    <button
                      type="button"
                      class="bg-blue-500 px-2 py-1 text-white rounded-md uppercase"
                    >
                      close
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>  */}
        </div>
      </div>
    </>
  );
}
