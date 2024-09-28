import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { createPetroCardTran, editPetroCardTran, getOpenPetroCardData, getPetroCard, getPetroCardTran } from "../../servises/opretions/card";


export default function Wallet_Payment({ dbpath1 }) {
  const [THistory, setTHistory] = useState([]);
  const [petrocard, setpetrocard] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showEditBtn, setShowEditBtn] = useState(false);
  // const [amount, setAmount] = useState("");
  const [machineNoId, setMachineNoId] = useState("");
  const [formData, setFormData] = useState({
    machineNo: '',
    cardId: '',
    lastBatchNo: '',
    currentBatchNo: '',
    amount: '',
  })

  const changeHandler = (e) => {
    const { name, value } = e.target

    setFormData((pre) => ({
      ...pre,
      [name]: value
    }))
  }

  const formDataHandler = (data) => {
    console.log("data", data);
    const batchNo = Number(data?.lastBatchNo);
    setFormData((pre) => ({
      ...pre,
      machineNo: data?.machineNo,
      cardId: data?.cardId,
      lastBatchNo: batchNo,
      id: data?._id,
      currentBatchNo: (batchNo + 1),
    }))
  }

  const AddHandler = async () => {
    await createPetroCardTran(formData)
    getPetroCardTranData();
    getCardData();
    setFormData((pre) => ({
      ...pre,
      machineNo: '',
      cardId: '',
      lastBatchNo: '',
      currentBatchNo: '',
      amount: '',
      id: '',
    }))
  }

  const editTranHandler = (data) => {
    console.log("data : nnn ", data);

    // Find the corresponding card in the petrocard array
    const selectedCard = petrocard.find(card => card._id === data.PetroCard._id);

    if (selectedCard) {
      setShowEditBtn(true);
      // Set the machineNoId and update formData
      setMachineNoId(selectedCard._id);
      // formDataHandler(selectedCard);

      // Update other form fields
      setFormData((pre) => ({
        ...pre,
        amount: data.amount,
        lastBatchNo : data.lastBatchNo,
        currentBatchNo: data?.currentBatchNo,
        cardId: data?.PetroCard?.cardId,
        machineNo: data?.PetroCard?.machineNo,
        id: data._id,
      }));
    }
  }
  const canselTranHandler = () => {
    setShowEditBtn(false);
    setMachineNoId("");
    setFormData((pre) => ({
      ...pre,
      machineNo: '',
      cardId: '',
      lastBatchNo: '',
      currentBatchNo: '',
      amount: '',
      id: '',
    }))
  }
  const editTransaction = async () => {
    console.log("FomrData for Edit Tran : ", formData);
    await editPetroCardTran(formData);
    canselTranHandler();
    getPetroCardTranData()
  }

  console.log("machineNoId : ", machineNoId)
  console.log("formData : ", formData)


  const getCardData = async () => {
    const data = await getOpenPetroCardData();
    if (data.length) {
      setpetrocard(data);
    }
  }


  const getPetroCardTranData = async () => {
    const data = await getPetroCardTran();
    if (data?.length) {
      setTHistory(data);

      const amount = data.reduce((acc, curr) => acc + curr.amount, 0);

      setTotalAmount(amount);
      console.log("Tamount ", amount)
    } else {
      setTotalAmount(0);
    }
  }

  console.log("totalAmount ", totalAmount)

  useEffect(() => {
    if (!petrocard.length) {
      getCardData()
    }
    if (!THistory?.length) {
      getPetroCardTranData();
    }
  }, [])

  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center">Petro Card</h2>
        <span style={{ fontSize: "22px" }}>
          {" "}
          Date : {new Date().toLocaleDateString()}
        </span>
        <div>
          <br></br>
          <table className="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">PC Machine No. / Id</th>
                <th className="tablebg">PC ID No.</th>
                <th className="tablebg">Last Bth</th>
                <th className="tablebg">Current Bth</th>
                <th className="tablebg">Amount</th>
                <th className="tablebg">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">
                  <select
                    style={{ width: "270px" }}
                    className="form-select editableInput bigFontWeight"
                    aria-label="Default select example"
                    value={machineNoId}
                    onChange={(e) => {
                      const selectedCard = petrocard.find(res => res._id === e.target.value);
                      setMachineNoId(e.target.value);
                      if (selectedCard) {
                        formDataHandler(selectedCard);
                      }
                    }}
                  >
                    <option value="" disabled>Select Petro Card -</option>
                    {petrocard.map((res) => (
                      <option key={res._id} value={res._id}>
                        {res.machineNo}-{res.cardId} -- {res.cardId}
                      </option>
                    ))}
                  </select>
                </td>
                <td scope="row">
                  <input
                    type="text"
                    id="lastb"
                    name="cardId"
                    value={formData?.cardId}
                    className="form-control bigFontWeight"
                    placeholder=""
                    disabled
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    id="lastb"
                    name="lastBatchNo"
                    value={formData?.lastBatchNo}
                    className="form-control bigFontWeight"
                    placeholder=""
                    disabled
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    id="currentb"
                    name="currentBatchNo"
                    value={formData?.currentBatchNo}
                    className="form-control bigFontWeight"
                    placeholder=""
                    disabled
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    className="form-control editableInput bigFontWeight"
                    name="amount"
                    value={formData?.amount}
                    placeholder="Amount"
                    onChange={changeHandler}
                  />
                </td>
                <td>
                  {
                    showEditBtn ?
                      (
                        <div className=" flex gap-2">
                          <button type="button" className="btn btn-primary" onClick={editTransaction}>
                            Edit
                          </button><button type="button" className="btn btn-primary" onClick={canselTranHandler}>
                            Cancel
                          </button>
                        </div>
                      ) :
                      (
                        <button type="button" className="btn btn-primary" onClick={AddHandler}>
                          Add
                        </button>
                      )
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br></br>
        <div>
          <br></br>
          <table className="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg">Sr. No.</th>
                <th className="tablebg">PC Machine No</th>
                <th className="tablebg">PC Machine Id</th>
                <th className="tablebg">Current Batch No.</th>
                <th className="tablebg">Amount</th>
                <th className="tablebg">Action</th>

                {/* <th className="tablebg">Batch No</th>
                <th className="tablebg">Amount</th> */}
                {/*  <th className='tablebg'>Action</th> */}
              </tr>
            </thead>
            <tbody>
              {THistory.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td>{index + 1}</td>
                  <td>{res.PetroCard?.machineNo} {res.PetroCard?.cardId}</td>
                  <td>{res.PetroCard?.cardId}</td>
                  <td>{res.currentBatchNo}</td>
                  <td>{res.amount}</td>
                  <td>
                    <div className=" flex gap-3">
                      <button type="button" style={{ height: '30px', paddingTop: '2px' }} id={"data" + res.id} className="btn btn-primary" onClick={() => editTranHandler(res)} >Edit</button>
                      <button type="button" style={{ height: '30px', paddingTop: '2px' }} id={"data" + res.id} className="btn btn-primary" >Delete</button>
                      {/* &nbsp;&nbsp; */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginLeft: "750px" }}>
            Total Amount : <span id="petrocard">{totalAmount}</span>
          </div>
        </div>
      </div>
    </>
  );
}
