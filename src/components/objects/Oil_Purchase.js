import React from "react";
import "../css/Tank.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function Oil_Purchase({ dbpath1 }) {
  const [oilproduct, setOilproduct] = useState([]);
  const [Oil_Purchase_Not_Settled, setOil_Purchase_Not_Settled] = useState([]);
  const [Invoices, setInvoices] = useState([]);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState("");
  const [tempInvoiceTAmount, setTempInvoiceTAmount] = useState("0");
  const [OtherDiscount, setOtherDiscount] = useState("0");
  const [InvoiceTAmount, setInvoiceTAmount] = useState("");
  const [product, setProduct] = useState("");
  const [productName, setProductName] = useState("");
  const [sr, setSr] = useState("");
  const [grdae, setGrdae] = useState("");
  const [color, setColor] = useState("");
  const [mrp, setMrp] = useState("");
  const [volume, setPVolume] = useState("");
  const [pcs, setPcs] = useState("");
  const [gst, setGst] = useState("");
  const [cases, setCases] = useState("");
  const [tcases, setTcases] = useState("");
  const [tpcs, setTpcs] = useState("");
  const [tltrs, setTltrs] = useState(0.0);
  const [ratePerUnit, setRatePerUnit] = useState("");
  const [taxableValue, setTaxableValue] = useState("");
  const [discount, setDiscount] = useState(0);
  const [balance, setBalance] = useState("");
  const [tamount, setTamount] = useState("");
  const [cgst, setCGST] = useState("");
  const [sgst, setSgst] = useState("");
  const [tCS, setTCS] = useState("");
  const [total, setTotal] = useState("");
  const [lPrice, setlPrice] = useState("");
  const [allTotalAmount, setAllTotalAmount] = useState("");
  const [oDiscount, setODiscount] = useState(0);
  const [tInvoiceAmount, setTInvoiceAmount] = useState("");
  const [Differnce, setDiffernce] = useState("");
  const [type, setType] = useState("");
  const [tHistory, setTHistory] = useState([]);

  const f_ltrs = 0;

  // const loadNozzles = async () => {
  //   /* const result = await axios.get(dbpath1+"getNozzles.php");
  //   setNozzles(result.data.phpresult);
  //   console.log(result.data.phpresult);  */
  // }

  // const loadOilProducts = async () => {
  //     const result = await axios.get(dbpath1+"getOilProducts.php");
  //     setOilproduct(result.data.phpresult);
  //     console.log(result.data.phpresult);
  //   }

  //   const loadTHistory = async () => {
  //     let query="SELECT * FROM `rwt_oil_purchase` WHERE date ='"+datecache+"';";
  //     /*
  //         alert(query); */
  //         const url = dbpath1 + 'getDynamic.php';
  //         let fData = new FormData();

  //         fData.append('query', query);

  //         try {
  //             const response = await axios.post(url, fData);

  //             if (response && response.data) {

  //                 if (response.data.phpresult) {
  //                     setTHistory(response.data.phpresult);
  //                     console.log(response.data.phpresult);

  //                 }
  //             }
  //         } catch (error) {
  //             console.log("Please Select Proper Input");
  //         }
  //   }

  const setProductSelectValues = (index) => {
    const selectedProduct = oilproduct.find(
      (product) => product.product_id === index
    );

    if (!selectedProduct) {
      console.error("Invalid product index");
      return;
    }

    /*  setGrdae(selectedProduct.product_grade); */
    setProductName(selectedProduct.product_name);
    setGrdae(selectedProduct.product_grade);
    setColor(selectedProduct.product_colour);
    setMrp(selectedProduct.product_mrp);
    setPVolume(selectedProduct.product_volume_per_pcs);
    setPcs(selectedProduct.product_pcs_per_caserwt_oil_products);
    setType(selectedProduct.type);
  };

  const calcTPcs = (tcases) => {
    let ftpcs;
    ftpcs = tcases * pcs;
    setTpcs(ftpcs);
    totalLiters(ftpcs);
  };

  function convertToLiters(inputVolume) {
    const match = inputVolume.match(/(\d+(\.\d+)?)\s?(ML|LTR)/i);

    if (!match) {
      throw new Error("Invalid input format");
    }

    const baseValue = parseFloat(match[1]);
    const unit = match[3].toUpperCase();

    switch (unit) {
      case "ML":
        return baseValue / 1000; // Convert milliliters to liters
      case "LTR":
        return baseValue; // value is already in liters
      default:
        throw new Error("Unsupported unit");
    }
  }

  function totalLiters(index) {
    let tpcs1 = pcs * index;
    setTpcs(tpcs1);
    const litersValue = convertToLiters(volume);
    const valueInLiters = litersValue * tpcs1;
    const newValue = parseFloat(valueInLiters.toFixed(2));
    setTltrs(newValue.toFixed(2));
    console.log("Expected Value: ", newValue);
  }

  const calcTaxablevalue = (value) => {
    let temp = tltrs * value;
    setTaxableValue(temp.toFixed(2));
  };

  const navigate = useNavigate();

  // const onAdd = () =>{
  //       if (cgst === 0 || tamount === 0 || balance === 0 || taxableValue === 0 || tltrs === 0 || tpcs === 0 || gst === 0 || pcs === 0 || volume === 0 || mrp === 0 || color === 0 || grdae === 0 || sr === 0 || productName === 0 || product === 0 || InvoiceTAmount === 0 || OtherDiscount === 0 || tempInvoiceTAmount === 0 || date === 0 || tCS === 0 || lPrice === 0 || Differnce === 0) {
  //         alert("Some values has been left blank!");
  //        /* alert(cgst +"=== 0 ||"+ tamount +"=== 0 ||"+ balance +"=== 0 ||"+ taxableValue +"=== 0 ||"+ tltrs +"=== 0 ||"+ tpcs +"=== 0 ||"+ gst +"=== 0 ||"+ pcs +"=== 0 ||"+ volume +"=== 0 ||"+ mrp +"=== 0 ||"+ color +"=== 0 ||"+ grdae +"=== 0 ||"+ sr +"=== 0 ||"+ productName +"=== 0 ||"+ product +"=== 0 ||"+ InvoiceTAmount +"=== 0 ||"+ OtherDiscount +"=== 0 ||"+ tempInvoiceTAmount +"=== 0 ||"+ date +"=== 0 ||"+ tCS +"=== 0 ||"+ lPrice +"=== 0 ||"+ Differnce+" === 0");
  //       */ }   else {

  //         const url = dbpath1+'delTank.php';

  //         var query = "INSERT INTO `rwt_oil_purchase` (`purchase_id`, `invoice_no`, `date`, `totalAmount`, `otherDiscount`, `totalInvoiceAmount`, `srNo`, `product_id`, `product_name`, `grade`, `colour`, `mrp`, `volume_per_pcs`, `total_cases`, `total_pcs`, `total_liters`, `rate_per_unit`, `taxable_value`, `discount`, `balance`, `cgst`, `sgst`, `tcs`, `totalAmountCalculated`, `landingPrice`, `difference`, `type`, `move_status`) VALUES (NULL, '"+invoiceNo+"', '"+date+"', '"+tempInvoiceTAmount+"', '"+OtherDiscount+"', '"+InvoiceTAmount+"', '"+sr+"', '"+product+"', '"+productName+"', '"+grdae+"', '"+color+"', '"+mrp+"', '"+volume+"', '"+tcases+"', '"+tpcs+"', '"+tltrs+"', '"+ratePerUnit+"', '"+taxableValue+"', '"+discount+"', '"+balance+"', '"+cgst+"', '"+sgst+"', '"+tCS+"', '"+tamount+"', '"+lPrice+"', '"+Differnce+"', '"+type+"', '"+0+"');";

  //         let fData = new FormData();
  //         fData.append('query', query);
  //         axios.post(url, fData)
  //           .then(response =>{ alert(response.data); setCacheData(); window.location.reload();})
  //           .catch(error => {
  //             console.log(error.toJSON());
  //       });
  //     }
  //     loadOilPurchases();
  // }

  const setCacheData = () => {
    Cookies.set("oilInvoiceNo", invoiceNo);
    Cookies.set("oilTotalAmount", InvoiceTAmount);
  };

  const getCacheData = () => {
    let ino = Cookies.get("oilInvoiceNo");
    setInvoiceNo(ino);
    let tam = Cookies.get("oilTotalAmount");
    setAllTotalAmount(tam);
    setInvoiceTAmount(tam);
    setTempInvoiceTAmount(tam);
  };

  const calcBalance = (disc) => {
    let temp = taxableValue - disc;
    setBalance(temp.toFixed(2));
  };

  const calcTotalAmount = (value) => {
    let temp = balance / 100;
    let temp2 = temp * (gst * 2);

    let temp3 = parseFloat(temp2) + parseFloat(balance); /* +parseInt(value) */
    setTamount(temp3.toFixed(2));

    let temp4 = temp3 / tpcs;
    setlPrice(temp4.toFixed(2));

    let temp5 = mrp - temp4;
    setDiffernce(temp5.toFixed(2));
  };

  const calcGST = (value) => {
    let temp = balance / 100;
    let temp2 = temp * value;

    setCGST(temp2.toFixed(2));
  };

  const calcInvoiceTAmount = (value) => {
    let temp = tempInvoiceTAmount - value;

    setInvoiceTAmount(temp);
  };
  /* const onMoveToGodown = () => {
        
    
        // Loop through each item in the Oil_Purchase_Not_Settled array
        for (let i = 0; i < Oil_Purchase_Not_Settled.length; i++) {
           // aggregatedMRP += parseFloat(Oil_Purchase_Not_Settled[i].mrp);
           const selectedProduct = oilproduct.find(product => product.product_id === Oil_Purchase_Not_Settled[i].product_id);
          // console.log(selectedProduct.product_colour);
           var tempPurchasePrice = Oil_Purchase_Not_Settled[i].rate_per_unit;
           var tempopstck = selectedProduct.topstoack;
           var tempreceipt = Oil_Purchase_Not_Settled[i].total_pcs;
           var temptopstoack = parseInt(tempopstck)+parseInt(tempreceipt);
           var tempbalstkamount = temptopstoack*selectedProduct.product_mrp;
           var tempproductid = selectedProduct.product_id;
           var temppurchaseid= Oil_Purchase_Not_Settled[i].purchase_id;


           let query="UPDATE rwt_oil_products SET purchasePrice = '"+tempPurchasePrice+"', opStock = "+tempopstck+", reciept = "+tempreceipt+", topstoack = "+temptopstoack+", balStkAmount = "+tempbalstkamount+" WHERE product_id = "+tempproductid;
           //alert(query);
           const url = dbpath1+'delTank.php';
           let fData = new FormData();
           fData.append('query', query);
           
           axios.post(url, fData)
               .then()
               .catch(error => {
               console.log(error.toJSON());
               });
   

           let query1="UPDATE rwt_oil_purchase SET move_status = "+1+" WHERE purchase_id = "+temppurchaseid;
            //alert(query1); 
           const url1 = dbpath1+'delTank.php';
           let fData1 = new FormData();
           fData1.append('query', query1);
           
           axios.post(url1, fData1)
               .then()
               .catch(error => {
               console.log(error.toJSON());
               });

        } */

  //     const onMoveToGodown = () => {

  //         // Loop through each item in the Oil_Purchase_Not_Settled array
  //         for (let i = 0; i < Oil_Purchase_Not_Settled.length; i++) {
  //            // aggregatedMRP += parseFloat(Oil_Purchase_Not_Settled[i].mrp);
  //            const selectedProduct = oilproduct.find(product => product.product_id === Oil_Purchase_Not_Settled[i].product_id);
  //           // console.log(selectedProduct.product_colour);
  //            var tempPurchasePrice = Oil_Purchase_Not_Settled[i].rate_per_unit;
  //            var tempopstck = 0;
  //            var tempreceipt = Oil_Purchase_Not_Settled[i].total_pcs;
  //            var temptopstoack = parseInt(tempopstck)+parseInt(tempreceipt);
  //            var tempbalstkamount = temptopstoack*selectedProduct.product_mrp;
  //            var tempproductid = selectedProduct.product_id;
  //            var temppurchaseid= Oil_Purchase_Not_Settled[i].purchase_id;

  //            var tempproductname = selectedProduct.product_name;
  //            var tempproductgrade = selectedProduct.product_grade;
  //            var tempproductcolor = selectedProduct.product_colour;
  //            var tempproductmrp = selectedProduct.product_mrp;
  //            var tempproductvpp = selectedProduct.product_volume_per_pcs;
  //            var tempproductppcs = selectedProduct.product_pcs_per_caserwt_oil_products;
  //            var tempproductpp = selectedProduct.purchasePrice;
  //            var tempproducttype = selectedProduct.type;

  //            let query="INSERT INTO `rwt_oil_godown` (`id`,`product_id`, `product_name`, `product_grade`, `product_colour`, `product_mrp`, `product_volume_per_pcs`, `product_pcs_per_caserwt_oil_products`, `purchasePrice`, `opStock`, `reciept`, `topstoack`, `balStkAmount`, `retail_op_stk`, `retail_inward`, `retail_top_stk`, `type`) VALUES (NULL, '"+tempproductid+"', '"+tempproductname+"', '"+tempproductgrade+"', '"+tempproductcolor+"', '"+tempproductmrp+"', '"+tempproductvpp+"', '"+tempproductppcs+"', '"+tempproductpp+"', '"+tempopstck+"', '"+tempreceipt+"', '"+temptopstoack+"', '"+tempbalstkamount+"', '0', '0', '0','"+tempproducttype+"');";
  //            //alert(query);
  //            const url = dbpath1+'delTank.php';
  //            let fData = new FormData();
  //            fData.append('query', query);

  //            axios.post(url, fData)
  //                .then(response => alert("Moved to godown Successfully"))
  //                .catch(error => {
  //                console.log(error.toJSON());
  //                });

  //            let query1="UPDATE rwt_oil_purchase SET move_status = "+1+" WHERE purchase_id = "+temppurchaseid;
  //             //alert(query1);
  //            const url1 = dbpath1+'delTank.php';
  //            let fData1 = new FormData();
  //            fData1.append('query', query1);

  //            axios.post(url1, fData1)
  //                .then()
  //                .catch(error => {
  //                console.log(error.toJSON());
  //                });

  //         }

  //     // TODO: Further operations or API calls can be made here, if necessary
  // };

  // const onDelete = async (index) => {
  //     let query="DELETE FROM `rwt_oil_purchase` WHERE purchase_id = "+index+";";
  //     /* alert(query); */
  //     const url = dbpath1+'delTank.php';
  //     let fData = new FormData();
  //     fData.append('query', query);

  //     axios.post(url, fData)
  //       .then(response => {alert(response.data);  window.location.reload();})
  //       .catch(error => {
  //       console.log(error.toJSON());
  //       });
  // }

  // const timeoutFunc = () => {
  //     const timeoutId = setTimeout(() => {
  //         loadOilPurchases();
  //     }, 5000 );
  // }

  // useEffect(() => {

  //     loadOilProducts();
  //     loadOilPurchases();
  //     setDate(datecache);
  //     loadTHistory();

  //     getCacheData();
  //   }, []);
  const datecache = Cookies.get("dateCookies");
  //   function convertDateFormat(inputDate) {
  //     // Split the string into an array [yyyy, mm, dd]
  //     let parts = inputDate.split('-');

  //     // Rearrange the array and join it back to a string
  //     return parts[2] + '-' + parts[1] + '-' + parts[0];
  // }
  return (
    <>
      <div className="tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight">
        <h2 className="mt-3 text-center">Purchase / Add Oil</h2>
        <span style={{ fontSize: "22px" }}> Date :
             {/* {datecache} */}
             </span> <br></br>
        <div>
          <div></div>
          <br></br>
          <table class="table" style={{ width: "400px" }}>
            <thead>
              <tr className="table-secondary">
                {/*  <th className='tablebg'>Volume Per PCS</th>
                        <th className='tablebg'>Total PCS</th> */}
                <th className="tablebg">Invoice No</th>
                {/* <th className='tablebg'>Date</th> */}
                <th className="tablebg">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/*  <td>
                                
                                <input type="text" class="form-control bigFontWeight" placeholder="Volume" onChange={(e) => setPVolume(e.target.value)} /> 

                            </td>
                            <td scope="row">
                                <input type="text" class="form-control bigFontWeight" placeholder="Total PCS" onChange={(e) => setTpcs(e.target.value)} />
                            </td> */}
                <td scope="row">
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Invoice No."
                    value={invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}
                  />
                </td>
                {/* <td><input type="date" value={datecache} class="form-control bigFontWeight"  onChange={(e) => setDate(e.target.value)} /></td>
                 */}
                <td scope="row">
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Total Amount"
                    value={InvoiceTAmount}
                    onChange={(e) => {
                      setTempInvoiceTAmount(e.target.value);
                      setInvoiceTAmount(e.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br></br>
          <h6>Stock In Cases :</h6>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                <th className="tablebg" style={{ width: "80px" }}>
                  Sr no.
                </th>
                <th className="tablebg">Product Name</th>
                <th className="tablebg">Grade</th>
                <th className="tablebg">Colour</th>
                <th className="tablebg">MRP</th>
                <th className="tablebg">Volume Per PCS</th>
                <th className="tablebg">PCS Per Case</th>
                <th className="tablebg">Purchase T. Cases</th>
                <th className="tablebg">Total PCS (7x8)</th>
                {/* <th className='tablebg'>Total Ltrs</th>
                 */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Sr no."
                    onChange={(e) => setSr(e.target.value)}
                  />
                </td>
                <td scope="row">
                  <div className="input-group mb-3">
                    <select
                      className="form-select editableInput bigFontWeight"
                      id="inputGroupSelect01"
                      value={product}
                      onChange={(e) => {
                        setProduct(e.target.value);
                        setProductSelectValues(e.target.value);
                      }}
                    >
                      <option value="">Choose...</option>
                      {oilproduct.map((rest) => (
                        <option value={rest.product_id}>
                          {rest.product_name} {rest.product_grade}{" "}
                          {rest.product_volume_per_pcs}
                        </option>
                      ))}
                    </select>
                  </div>{" "}
                </td>
                <td scope="row">
                  <input
                    type="text"
                    class="form-control bigFontWeight"
                    id="idgrade"
                    value={grdae}
                    placeholder="Grade"
                    onChange={(e) => setGrdae(e.target.value)}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control bigFontWeight"
                    id="idcolor"
                    value={color}
                    placeholder="Color"
                    onChange={(e) => setColor(e.target.value)}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control bigFontWeight editableInput"
                    id="idmrp"
                    value={mrp}
                    placeholder="MRP"
                    onChange={(e) => setMrp(e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control bigFontWeight"
                    id="idvolume"
                    value={volume}
                    placeholder="Volume"
                    onChange={(e) => setPVolume(e.target.value)}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control bigFontWeight"
                    id="idpcs"
                    value={pcs}
                    placeholder="Pcs"
                    onChange={(e) => setPcs(e.target.value)}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    id="idtcases"
                    placeholder="Purchase t cases"
                    onChange={(e) => {
                      setTcases(e.target.value);
                      totalLiters(e.target.value);
                    }}
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    class="form-control bigFontWeight"
                    id="idtpcs"
                    value={tpcs}
                    placeholder="Total PCS"
                    onChange={(e) => setTpcs(e.target.value)}
                    disabled
                  />
                </td>
                {/* <td scope="row">
                                <input type="text" class="form-control bigFontWeight" placeholder="Total Ltrs" onChange={(e) => setDiscount(e.target.value)} />
                            </td> */}
              </tr>
            </tbody>
          </table>
          <br></br>
          <h6>Stock In Liters :</h6>
          <table class="table" style={{ width: "900px" }}>
            <thead>
              <tr className="table-secondary">
                {/*  <th className='tablebg' style={{width:'80px'}}>Sr no.</th> */}
                <th className="tablebg">Volume Per PCS</th>
                <th className="tablebg">Total PCS</th>
                <th className="tablebg">Total Ltrs</th>
                <th className="tablebg">Rate Per Unit</th>
                <th className="tablebg">Taxable Value (3x4)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>
                                
                                <input type="text" class="form-control bigFontWeight" placeholder="Sr no." onChange={(e) => setSr(e.target.value)} /> 

                            </td> */}
                <td>
                  <input
                    type="text"
                    class="form-control bigFontWeight"
                    value={volume}
                    placeholder="Volume"
                    onChange={(e) => setPVolume(e.target.value)}
                    disabled
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    class="form-control bigFontWeight"
                    value={tpcs}
                    placeholder="Total PCS"
                    onChange={(e) => setTpcs(e.target.value)}
                    disabled
                  />
                </td>
                <td scope="row">
                  <input
                    type="number"
                    class="form-control bigFontWeight"
                    value={tltrs}
                    placeholder="Total Ltrs"
                    onChange={(e) => {
                      setTltrs(e.target.value);
                    }}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Rate"
                    onChange={(e) => {
                      setRatePerUnit(e.target.value);
                      calcTaxablevalue(e.target.value);
                    }}
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    class="form-control bigFontWeight"
                    value={taxableValue}
                    placeholder="Taxable Value"
                    onChange={(e) => setTaxableValue(e.target.value)}
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br></br>
          <h6>Tax Details :</h6>

          <table class="table">
            <thead>
              <tr className="table-secondary">
                {/* <th className='tablebg' style={{width:'120px'}}>Rate Per Unit</th> */}
                <th className="tablebg">Taxable Value</th>
                <th className="tablebg">Discount (-) </th>
                <th className="tablebg">Balance AMT (=)</th>
                <th className="tablebg" style={{ width: "100px" }}>
                  CGST (+)
                </th>
                <th className="tablebg" style={{ width: "100px" }}>
                  SGST (+)
                </th>
                <th className="tablebg">TCS (+)</th>
                <th className="tablebg">Total AMT (=)</th>
                <th className="tablebg">Total PCS (÷)</th>
                <th className="tablebg">Landing Price</th>
                {/*  <th className='tablebg'>Differnce</th> */}
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td><input type="text" class="form-control bigFontWeight" placeholder="Rate" onChange={(e) => setRatePerUnit(e.target.value)} /></td> */}
                <td scope="row">
                  <input
                    type="text"
                    value={taxableValue}
                    class="form-control bigFontWeight"
                    placeholder="Taxable Value"
                    onChange={(e) => setTaxableValue(e.target.value)}
                    disabled
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="Discount"
                    onChange={(e) => {
                      setDiscount(e.target.value);
                      calcBalance(e.target.value);
                    }}
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    value={balance}
                    class="form-control bigFontWeight"
                    placeholder="Balance"
                    onChange={(e) => setBalance(e.target.value)}
                    disabled
                  />
                </td>
                <td scope="row">
                  <select
                    class="form-select editableInput bigFontWeight"
                    aria-label="Default select example"
                    value={gst}
                    onChange={(e) => {
                      setGst(e.target.value);
                      calcGST(e.target.value);
                    }}
                  >
                    <option selected>- select -</option>
                    <option value="1">1% </option>
                    <option value="2">2% </option>
                    <option value="3">3% </option>
                    <option value="4">4% </option>
                    <option value="5">5% </option>
                    <option value="6">6% </option>
                    <option value="7">7% </option>
                    <option value="8">8% </option>
                    <option value="9">9% </option>
                    <option value="10">10% </option>
                    <option value="11">11% </option>
                    <option value="12">12% </option>
                    <option value="13">13% </option>
                    <option value="14">14% </option>
                    <option value="15">15% </option>
                    <option value="16">16% </option>
                    <option value="17">17% </option>
                    <option value="18">18% </option>
                  </select>
                </td>
                <td>
                  {" "}
                  <select
                    class="form-select bigFontWeight editableInput"
                    aria-label="Default select example"
                    value={gst}
                    onChange={(e) => {
                      setGst(e.target.value);
                      calcGST(e.target.value);
                    }}
                  >
                    <option selected>- select -</option>

                    <option value="1">1% </option>
                    <option value="2">2% </option>
                    <option value="3">3% </option>
                    <option value="4">4% </option>
                    <option value="5">5% </option>
                    <option value="6">6% </option>
                    <option value="7">7% </option>
                    <option value="8">8% </option>
                    <option value="9">9% </option>
                    <option value="10">10% </option>
                    <option value="11">11% </option>
                    <option value="12">12% </option>
                    <option value="13">13% </option>
                    <option value="14">14% </option>
                    <option value="15">15% </option>
                    <option value="16">16% </option>
                    <option value="17">17% </option>
                    <option value="18">18% </option>
                  </select>{" "}
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control editableInput bigFontWeight"
                    placeholder="TCS"
                    onChange={(e) => {
                      setTCS(e.target.value);
                      calcTotalAmount(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control bigFontWeight"
                    value={tamount}
                    placeholder="Total Amount"
                    onChange={(e) => setTamount(e.target.value)}
                    disabled
                  />
                </td>
                <td scope="row">
                  <input
                    type="text"
                    class="form-control bigFontWeight"
                    value={tpcs}
                    placeholder="Total PCS"
                    onChange={(e) => setTpcs(e.target.value)}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control bigFontWeight"
                    value={lPrice}
                    placeholder="Landing Price"
                    onChange={(e) => setlPrice(e.target.value)}
                    disabled
                  />
                </td>
                {/* <td><input type="text" class="form-control bigFontWeight" placeholder="difference" onChange={(e) => setDiffernce(e.target.value)} /></td>
                 */}
              </tr>
            </tbody>
          </table>
          <span style={{ marginLeft: "450px", color: "green" }}>
            {cgst}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {cgst}
          </span>

          <br></br>
          <h6>Reports :</h6>

          <table class="table" style={{ width: "900px" }}>
            <thead>
              <tr className="table-secondary">
                {/* <th className='tablebg' style={{width:'120px'}}>Rate Per Unit</th> */}

                <th className="tablebg">Product Name</th>
                <th className="tablebg">Volume Per PCS</th>
                <th className="tablebg">MRP</th>
                <th className="tablebg">Landing Price</th>
                <th className="tablebg">Differnce</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">
                  <input
                    type="text"
                    value={productName}
                    class="form-control bigFontWeight"
                    placeholder="Prodduct Name"
                    onChange={(e) => setProductName(e.target.value)}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={volume}
                    class="form-control bigFontWeight"
                    placeholder="Volume"
                    onChange={(e) => setPVolume(e.target.value)}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={mrp}
                    class="form-control bigFontWeight"
                    placeholder="MRP"
                    onChange={(e) => setMrp(e.target.value)}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={lPrice}
                    class="form-control bigFontWeight"
                    placeholder="Landing Price"
                    onChange={(e) => setlPrice(e.target.value)}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    style={{ color: "red" }}
                    value={Differnce}
                    class="form-control bigFontWeight"
                    placeholder="difference"
                    onChange={(e) => setDiffernce(e.target.value)}
                    disabled
                  />{" "}
                </td>
                {/* <td><input type="text" class="form-control bigFontWeight" placeholder="Rate" onChange={(e) => setRatePerUnit(e.target.value)} /></td> */}
              </tr>
            </tbody>
          </table>
          <br></br>
          {/*    <h6>Invoice Info :</h6>
            <table class="table" style={{width:'900px'}}>
                    <thead>
                        <tr className='table-secondary'>
                    
                        <th >Invoice No</th>
                     
                        <th className='tablebg'>Total Amount</th>
                            <th className='tablebg'>Other Discount</th>
                            <th className='tablebg'>T. Invoice Amount</th>

                           
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                       
                             <td scope="row" >
                                <input type="text" class="form-control bigFontWeight" placeholder="Invoice No." value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
                            </td>
                             <td scope="row" >
                                <input type="text" class="form-control bigFontWeight" placeholder="Total Amount" value={tempInvoiceTAmount} onChange={(e) => setTempInvoiceTAmount(e.target.value)} />
                            </td>
                            <td ><input type="text" class="form-control bigFontWeight" placeholder="Other Discount" onChange={(e) => {setOtherDiscount(e.target.value); calcInvoiceTAmount(e.target.value)}} /></td>
                                
                            <td scope="row" >
                                <input type="text" class="form-control bigFontWeight" value={InvoiceTAmount} placeholder="Invoice Amount" onChange={(e) => setInvoiceTAmount(e.target.value)} disabled/>
                            </td>
                            
                        </tr>
                        
                    </tbody>
                </table>  */}
          <center>
            <button
              type="button"
              class="btn btn-primary"
            //   onClick={() => {
            //     onAdd();
            //     timeoutFunc();
            //   }}
            >
              Add
            </button>
          </center>
        </div>
        <br></br>
        <div>
          <br></br>
          <h2 className="mt-3 text-center">Invoice Purchases</h2>
          <br></br>
          <table class="table">
            <thead>
              <tr className="table-secondary">
                {/* <th className='tablebg' style={{width:'120px'}}>Rate Per Unit</th> */}
                <th className="tablebg">Invoice No.</th>
                <th className="tablebg">Product Name</th>
                <th className="tablebg">Volume Per PCS</th>
                <th className="tablebg">Total PCS</th>
                <th className="tablebg">MRP</th>
                <th className="tablebg">Landing Price</th>
                <th className="tablebg">Differnce</th>
              </tr>
            </thead>

            <tbody>
              {/* <tr>    
                            <th scope="row">A1</th>
                            <td>MS-1</td>
                            <td>Diesel Piont</td>
                            <td>1</td>
                            <td>2</td>
                            <td>11254</td>
                            <td style={{width:'150px'}}>
                                <button type="button" class="btn btn-primary">Edit</button> &nbsp;
                                <button type="button" class="btn btn-primary">Delete</button>
                            </td>
                        </tr>  */}
              {tHistory.map((res, index) => (
                <tr className="hovereffect" key={index}>
                  <td>{res.invoice_no}</td>
                  <td>{res.product_name}</td>
                  <td>{res.volume_per_pcs}</td>
                  <td>{res.total_pcs}</td>

                  <td>{res.mrp}</td>
                  <td>{res.landingPrice}</td>
                  <td /* style={{width:'250px'}} */>
                    {/* <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Edit</button> &nbsp; 
                                         <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Close</button> &nbsp;
                                        <button type="button" id={"tank"+res.tank_no} class="btn btn-primary">Open</button> &nbsp;  */}
                    <button
                      type="button"
                      id={"tank" + res.purchase_id}
                      class="btn btn-danger"
                    //   onClick={() => {
                    //     onDelete(res.purchase_id);
                    //     timeoutFunc();
                    //   }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <center></center>
          <center>
            <button
              type="button"
              class="btn btn-warning"
            //   onClick={onMoveToGodown}
            >
              Move to Godown
            </button>
          </center>
        </div>
      </div>
    </>
  );
}
