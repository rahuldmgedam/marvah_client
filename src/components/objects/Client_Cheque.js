import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { set } from 'react-hook-form';
import { useForm } from 'react-hook-form';

export default function Handloans({dbpath1}) {
  
    const [tanks, setTanks] = useState([]);
    const [nozzles, setNozzles] = useState([]);
    const [machinen, setMachinen] = useState([]);

    const [clients, setClients] = useState([]);
    const [bills, setBills] = useState([]);
    const [productData, setProductData] = useState([]);
    const [history, setHistory] = useState([]);
    const [thistory, setTHistory] = useState([]);
    
    const [nozzle_name, setNozzle_name] = useState('');
    
    const [machine, setMachine] = useState('');
    const [smachine, setSMachine] = useState('');
    const [side, setSide] = useState('');
    const [nozzle_no, setNozzle_no] = useState('');
    const [op_meter_reading, setOp_meter_reading] = useState('');

    const [particular, setParticular] = useState('');
    const [partyname, setPartyname] = useState('');
    const [date, setdate] = useState('');
    const [billNo, setBillNo] = useState('');
    const [productName, setProductName] = useState('');
    const [amount, setAmount] = useState('0');
    const [rate, setRate] = useState('0');
    const [quantity, setQuantity] = useState('');
    const [vechicalNo, setVehicleNo] = useState('');
    const [product, setProduct] = useState('');
    const [amountInWord, setAmountInWord] = useState('');
    const [outstanding, setOutsatnding] = useState('0');
    const [TOutstanding, setTOutstanding] = useState('0');
    const [balance, setBalance] = useState('0');
    const [tgiven, setTgiven] = useState('');
    const [trecived, setTrecived] = useState('');
    const [totalCredit, settotalCredit] = useState('');
    const [billingDate, setBillingDate] = useState('');
    const [recvAmount, setRecvAmount] = useState('');
    const [cheqNo, setCheqNo] = useState('');
    const [cheqDate, setCheqDate] = useState('');
    const [remark, setRemark] = useState('');
    const [bankName, setBankName] = useState('');


    


    const loadNozzles = async () => {
    /*   const result = await axios.get(dbpath1+"getNozzles.php");
      setNozzles(result.data.phpresult);
      console.log(result.data.phpresult); 
     */}

    const loadClients = async () => {
      let query="SELECT * FROM `rwt_client` ;";
      /*  
          alert(query); */
          const url = dbpath1 + 'getDynamic.php';
          let fData = new FormData();
    
          fData.append('query', query);
    
          try {
              const response = await axios.post(url, fData);
              
              if (response && response.data) {
                  
                  if (response.data.phpresult) {
                      setClients(response.data.phpresult); 
                      console.log(response.data.phpresult);
                  }
              }
          } catch (error) {
              console.log("Please Select Proper Input");
          }
      }

      const loadBills = async (val) => {
        let query="SELECT * FROM `rwt_generated_bills` where paid_status = 'unpaid' AND client_name	= '"+val+"';";
        /*  
            alert(query); */
            const url = dbpath1 + 'getDynamic.php';
            let fData = new FormData();
            fData.append('query', query);
      
            try {
                const response = await axios.post(url, fData);
                
                if (response && response.data) {
                    
                    if (response.data.phpresult) {
                        setBills(response.data.phpresult); 
                        console.log(response.data.phpresult);
                    }
                }
            } catch (error) {
                console.log("Please Select Proper Input");
            }
        }

      const loadProducts = async () => {
        let query="SELECT * FROM `rwt_petrol_product` ;";
        /*  
            alert(query); */
            const url = dbpath1 + 'getDynamic.php';
            let fData = new FormData();
      
            fData.append('query', query);
      
            try {
                const response = await axios.post(url, fData);
                
                if (response && response.data) {
                    
                    if (response.data.phpresult) {
                        setProductData(response.data.phpresult); 
                        console.log(response.data.phpresult);
                    }
                }
            } catch (error) {
                console.log("Please Select Proper Input");
            }
        }

      const loadMachine = async (value) => {
       
      }
  
    const navigate = useNavigate();

    const getBalance = async (value) => {
      let query="SELECT balance FROM rwt_handloan_transactions WHERE client_name = '"+value+"' ORDER BY transaction_id desc LIMIT 1 ;";
         
           /*  alert(query); */
            const url = dbpath1 + 'getDynamic.php';
            let fData = new FormData();
      
            fData.append('query', query);
      
            try {
                const response = await axios.post(url, fData);
                
                if (response && response.data) {
                    
                    if (response.data.phpresult) {
                         
                        console.log(response.data.phpresult);
                        setBalance(response.data.phpresult[0].balance);
                    }
                }
            } catch (error) {
                console.log("Please Select Proper Input");
            }
    }

    const onAdd = () =>{
          if (partyname.length === 0) {
            alert("Party Name has been left blank!");
          }   else if (billNo.length === 0) {
            alert("Bill No has been left blank!");
          }   else if (amount.length === 0) {
            alert("Amount has been left blank!");
          } else if (recvAmount.length === 0) {
            alert("Recived amount has been left blank!");
          }  else if (cheqNo.length === 0) {
            alert("Cheq No has been left blank!");
          }  else if (bankName.length === 0) {
            alert("Bank Name been left blank!");
          }  else if (remark.length === 0) {
            alert("Narration has been left blank!");
          }   else {

            let query="INSERT INTO `rwt_cheque_entry` (`cheque_entry_id`, `date`, `party_name`, `bill_amount`, `bill_no`, `billing_date`, `recived_amount`, `cheq_no`, `cheq_date`, `bank_name`, `narration`) VALUES (NULL, '"+datecache+"', '"+partyname+"', '"+amount+"', '"+billNo+"', '"+billingDate+"', '"+recvAmount+"', '"+cheqNo+"', '"+cheqDate+"', '"+bankName+"', '"+remark+"');";
            /*  alert(query); */
             const url = dbpath1+'delTank.php';
             let fData = new FormData();
             fData.append('query', query);
             
             axios.post(url, fData)
                 .then(response => {/* alert(response.data);  window.location.reload(); */})
                 .catch(error => {
                 console.log(error.toJSON());
          });

          let query2=" UPDATE `rwt_generated_bills` SET paid_status = 'paid' WHERE invoice_no = '"+billNo+"'";
         
             /* alert(query2); */
             const url2 = dbpath1+'delTank.php';
             let fData2 = new FormData();
             fData2.append('query', query2);
             
             axios.post(url2, fData2)
                 .then(response => {alert(response.data);  window.location.reload();})
                 .catch(error => {
                 console.log(error.toJSON());
          });
          //load();
          loadHistory();
        } 
    }

    const loadHistory = async (value) => {
      let query="SELECT * FROM rwt_handloan_transactions WHERE client_name = '"+value+"';";
         
      /* alert(query); */
      const url = dbpath1 + 'getDynamic.php';
      let fData = new FormData();

      fData.append('query', query);

      try {
          const response = await axios.post(url, fData);
          
          if (response && response.data) {
              
              if (response.data.phpresult) {
                  setHistory(response.data.phpresult);
                  console.log(response.data.phpresult);
                  setTrecived(response.data.phpresult.reduce((acc, row) => acc + parseInt(row.amount_rcvd), 0));
                  setTgiven(response.data.phpresult.reduce((acc, row) => acc + parseInt(row.amount_given), 0));
              }
          }
          
      } catch (error) {
          console.log("Please Select Proper Input");
      }
    }

    const todayHistory = async (value) => {
        let query="SELECT * FROM rwt_cheque_entry WHERE date = '"+datecache+"';";
           
        /* alert(query); */
        const url = dbpath1 + 'getDynamic.php';
        let fData = new FormData();
  
        fData.append('query', query);
  
        try {
            const response = await axios.post(url, fData);
            
            if (response && response.data) {
                
                if (response.data.phpresult) {
                    setTHistory(response.data.phpresult);
                    console.log(response.data.phpresult);
                    setTrecived(response.data.phpresult.reduce((acc, row) => acc + parseInt(row.amount_rcvd), 0));
                    setTgiven(response.data.phpresult.reduce((acc, row) => acc + parseInt(row.amount_given), 0));
                }
            }
            
        } catch (error) {
            console.log("Please Select Proper Input");
        }
      }

    const onDelete = async (index) => {
      let query="DELETE FROM `rwt_cheque_entry` WHERE cheque_entry_id = "+index+";";
    
    /*  alert(query); */ 
      const url = dbpath1+'delTank.php';
      let fData = new FormData();
      fData.append('query', query);
      
      axios.post(url, fData)
          .then(response => {alert(response.data);  window.location.reload();})
          .catch(error => {
          console.log(error.toJSON());
          });
  } 


function numberToWords(num) {
    let amountInWordTemp = convertToWords(num);
    setAmountInWord(amountInWordTemp);
}

function convertToWords(num) {
    const belowTwenty = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (num === 0) return '';
    if (num < 20) return belowTwenty[num - 1];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + belowTwenty[num % 10 - 1] : '');
    if (num < 1000) return belowTwenty[Math.floor(num / 100) - 1] + ' hundred' + (num % 100 ? ' and ' + convertToWords(num % 100) : '');
    if (num < 100000) return convertToWords(Math.floor(num / 1000)) + ' thousand' + (num % 1000 ? ' ' + convertToWords(num % 1000) : '');
    if (num < 10000000) return convertToWords(Math.floor(num / 100000)) + ' lakh' + (num % 100000 ? ' ' + convertToWords(num % 100000) : '');
    if (num < 1000000000) return convertToWords(Math.floor(num / 10000000)) + ' crore' + (num % 10000000 ? ' ' + convertToWords(num % 10000000) : '');

    return 'Number too large';
}

const loadPrice = async (value) =>
{
 
    let query = "SELECT * FROM rwt_day_start WHERE date='"+datecache+"';";
    
  /* alert(query); */
  const url = dbpath1 + 'getDynamic.php';
  let fData = new FormData();
  fData.append('query', query);
    
  try {
      const response = await axios.post(url, fData);
      
      if (response && response.data) {
          if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
              // Data is available
            
              console.log(response.data.phpresult);
              setRate(response.data.phpresult[0][value]);
             
              let quantityTemp = parseFloat(amount) / parseFloat(response.data.phpresult[0][value]);
              setQuantity(quantityTemp.toFixed(2));

          } else {
            


              // Data is not available
            
          }
      }
  } catch (error) {
      console.log("Please Select Proper Input");
  }
}


const loadEssentials = async () => {
    let query="select sum(amount) as sum FROM `rwt_credit_client` WHERE date = '"+datecache+"';";
   /*  
    alert(query); */
    const url = dbpath1 + 'getDynamic.php';
    let fData = new FormData();
    fData.append('query', query);

    try {
        const response = await axios.post(url, fData);
        
        if (response && response.data) {
            
            if (response.data.phpresult) {
                setSMachine(response.data.phpresult); 
                settotalCredit(response.data.phpresult[0]['sum']);
                
            }
        }
    } catch (error) {
        console.log("Please Select Proper Input");
    }
}

const loadTOutstanding = async () => {

    let dateParts = datecache.split('-');
    let year = parseInt(dateParts[0], 10);
    let month = parseInt(dateParts[1], 10);  // JavaScript months are 0-based
    let day = parseInt(dateParts[2], 10);
    let halfdate=year+"-"+month+"-"+"%";

    let query="select sum(amount) as sum FROM `rwt_credit_client` WHERE date LIKE '"+halfdate+"';";
   
   /*  alert(query);  */
    const url = dbpath1 + 'getDynamic.php';
    let fData = new FormData();
    fData.append('query', query);

    try {
        const response = await axios.post(url, fData);
        
        if (response && response.data) {
            
            if (response.data.phpresult) {
                console.log(response.data.phpresult[0]['sum'])
                setTOutstanding(response.data.phpresult[0]['sum']);
                
            }
        }
    } catch (error) {
        console.log("Please Select Proper Input");
    }
}

const setSelectedValues = (index) =>  {
    const selectedProduct = bills.find(product => product.invoice_no === index);


    if (!selectedProduct) {
        console.error("Invalid product index");
        return;
    }

   /*  setGrdae(selectedProduct.product_grade); */
    //setBillingDate(convertDateFormat(selectedProduct.date));
    setAmount(selectedProduct.amount);
  }

const loadOutstanding = async (name) => {

    let dateParts = datecache.split('-');
    let year = parseInt(dateParts[0], 10);
    let month = parseInt(dateParts[1], 10);  // JavaScript months are 0-based
    let day = parseInt(dateParts[2], 10);
    let halfdate=year+"-"+month+"-"+"%";

    let query="select sum(amount) as sum FROM `rwt_credit_client` WHERE date LIKE '"+halfdate+"' AND `client_name` LIKE '"+name+"';";

  /*    alert(query);   */
    const url = dbpath1 + 'getDynamic.php';
    let fData = new FormData();
    fData.append('query', query);

    try {
        const response = await axios.post(url, fData);
        
        if (response && response.data) {
            
            if (response.data.phpresult) {
                console.log(response.data.phpresult[0]['sum'])
                setOutsatnding(response.data.phpresult[0]['sum']);
                
            }
        }
    } catch (error) {
        console.log("Please Select Proper Input");
    }
}
    useEffect(() => {
      
        loadClients();
       // loadTOutstanding();
        loadMachine();
        todayHistory();  
        loadEssentials();
        setdate(datecache);
      }, []); 
      const datecache = Cookies.get('dateCookies');

    //   function convertDateFormat(inputDate) {
    //     // Split the string into an array [yyyy, mm, dd]
    //     let parts = inputDate.split('-');
    
    //     // Rearrange the array and join it back to a string
    //     return parts[2] + '-' + parts[1] + '-' + parts[0];
    // }
    return (
    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight'>   
       
            <h2 className='mt-3 text-center'>Cheque Entry</h2>
            <span style={{fontSize:'22px'}}> Date : 
                {/* {convertDateFormat(datecache)} */}
                </span>
            <div>
                <br></br>
              <h5> <span style={{marginLeft:'600px', marginTop:'10px'}}>Outstanding : {outstanding}</span> <span style={{marginLeft:'50px', marginTop:'10px'}}>Total Outstanding : </span> {TOutstanding}</h5>
                <br></br>
                <table class="table" >
                    <thead>
                        <tr className='table-secondary'>
                        
                        <th className='tablebg'>Party Name</th>
                        <th className='tablebg'>Bill No</th> 
                        <th className='tablebg'>Billing Date</th> 
                       
                            <th className='tablebg'>Bill Amount</th>
                       
                           <th className='tablebg'>Cheq No.</th>
                         
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>   
                       
                        <td>
                            
                            <select class="form-select  editableInput bigFontWeight" value={partyname}  aria-label="Default select example" style={{width:'250px'}} onChange={(e) => {setPartyname(e.target.value); loadBills(e.target.value); getBalance(e.target.value); loadOutstanding(e.target.value)}}>
                            <option selected>- Party Name -</option>
                            {clients.map((rest) => (  
                                <option value={rest.party_name}>{rest.party_name} </option>
                            ))}
                            </select>
                           
                        </td> 

                        <td>
                            
                            <select class="form-select editableInput bigFontWeight" value={billNo}  aria-label="Default select example" onChange={(e) =>{ setBillNo(e.target.value); setSelectedValues(e.target.value);}}>
                            <option selected>- Bills -</option>
                            {bills.map((rest) => (  
                                <option value={rest.invoice_no}>{rest.invoice_no} </option>
                            ))}
                                
                              
                            </select>
                           
                        </td> 
                        
                        <td><input type="text" class="form-control bigFontWeight" value={billingDate}  placeholder="Billing Date" onChange={(e) =>{ setBillingDate(e.target.value); }} disabled/></td>
                        <td><input type="text" class="form-control bigFontWeight" value={amount}  placeholder="Bill Amount" onChange={(e) =>{ setAmount(e.target.value); }} disabled/></td>
                        <td><input type="text" class="form-control bigFontWeight editableInput"  placeholder="Cheq No   " onChange={(e) =>{ setCheqNo(e.target.value); }} /></td>
                     
                        
                        
                        
                           
                       

                           
                        </tr>
                        
                    </tbody>
                </table>  
             
                <table class="table" >
                    <thead>
                        <tr className='table-secondary'>
                        
                        <th className='tablebg'>Amount</th>
                        <th className='tablebg'>Cheque Date</th> 
                        <th className='tablebg'>Bank Name</th> 
                       
                            <th className='tablebg'>Status</th>
                       
                           <th className='tablebg'>Cheq No.</th>
                         
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>   
                       
                       <td><input type="text" class="form-control editableInput  bigFontWeight"   placeholder="Cheq Amount" onChange={(e) =>{ setRecvAmount(e.target.value); }} /></td>
                       <td><input type="date" class="form-control editableInput bigFontWeight bigFontWeight"  placeholder="Cheque Date" onChange={(e) =>{ setCheqDate(e.target.value); }} /></td>
                        <td><input type="text" class="form-control editableInput bigFontWeight bigFontWeight"  placeholder="Bank Name" onChange={(e) =>{ setBankName(e.target.value); }} /></td>
                        <td scope="row">
                                <select  class="form-select editableInput bigFontWeight" aria-label="Default select example" value={remark}  onChange={(e) =>{ setRemark(e.target.value);/*  setSelectedValues(e.target.value); */}}>
                                    <option selected>- select -</option>
                                       
                                
                                        <option value="Recived">Recived</option>
                                        <option value="Pending">Pending</option>
                                  
                                </select>  
                            </td>
                        <td><button type="button" class="btn btn-primary" onClick={onAdd}>Save</button></td>
                        
                        
                        </tr>
                        
                    </tbody>
                </table> 
                <br></br>
                Todays Transactions: <br></br><br></br>
                
                <table class="table">
                    <thead>
                    <tr className='table-secondary'>
                    <th className='tablebg'>Sr</th>
                        <th className='tablebg'>Party Name</th>
                        <th className='tablebg'>Bill No</th> 
                        <th className='tablebg'>Billing Date</th> 
                       
                            <th className='tablebg'>Bill Amount</th>
                           <th className='tablebg'>Recv Amount</th>
                           <th className='tablebg'>Cheq No.\UTR No.</th>
                            <th className='tablebg' style={{width:'150px'}}>Cheq Date</th>
                            <th className='tablebg'>Bank Name</th>
                            <th className='tablebg'>Narration</th>
                            <th className='tablebg'>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                       
                    {thistory.map((res,index)=>
                                <tr className='hovereffect' key={index}>
                                    <td>{index+1}</td>   
                                    <td>{res.party_name}</td>
                                    <td>{res.bill_no}</td>
                                    <td>{res.billing_date}</td>
                                    <td>{res.bill_amount}</td>
                                    <td>{res.recived_amount}</td>
                                    <td>{res.cheq_no}</td>
                                    <td>{res.cheq_date}</td>
                                    <td>{res.bank_name}</td>
                                    <td>{res.narration}</td>
                                    <td style={{width:'50px'}}>
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.cheque_entry_id} class="btn btn-danger" onClick={() => onDelete(res.cheque_entry_id)}>Delete</button>
                                    </td>
                                </tr>
                            )}
                        
                                {/* <tr>
                                  <td id="ddun">Haldirams</td>
                                      <td id="dmake">Recived</td>   
                                      <td id="dserial_no">0</td>
                                    <td id="dserial_no">5000</td>
                                    <td id="dproduct">12000</td>
                                    <td id="dnozzles_in_mpd">Cash</td>
                                 
                                </tr>   
                                <tr>
                                <td id="dconnected_tanks">15-10-2023</td>
                                      <td id="dmake">Given</td>   
                                    <td id="dserial_no">3000</td>
                                    <td id="dserial_no">0</td>
                                    <td id="dproduct">17000</td>
                                    <td id="dnozzles_in_mpd">Cash</td>
                                </tr>   
                                <tr>
                                <td id="dconnected_tanks">02-10-2023</td>
                                      <td id="dmake">Recived</td>   
                                      <td id="dserial_no">0</td>
                                    <td id="dserial_no">1000</td>
                                    
                                    <td id="dproduct">14000</td>
                                    <td id="dnozzles_in_mpd">Cash</td>
                                </tr>   
                                <tr>
                                <td id="dconnected_tanks">25-09-2023</td>
                                
                                      <td id="dmake">Given</td>   
                                    <td id="dserial_no">2000</td>
                                    <td id="dserial_no">0</td>
                                    <td id="dproduct">15000</td>
                                    <td id="dnozzles_in_mpd">Cheque</td>
                                 
                                </tr>    */}
                             {/*    <tr>
                                  <td><b>Closing Balance</b></td>
                                  <td></td>
                                  
                                  <td><b>{tgiven}</b></td>
                                  <td><b>{trecived}</b></td>
                                  <td></td>
                                  <td></td>
                                </tr> */}
                            
                    </tbody>
                    
                </table>    
                
           {/*   <b>   <span style={{marginLeft:'300px'}}>Total Credit = <span>{totalCredit}</span></span> </b> */}
                   
            </div>
            <br></br>
            
        </div>
    </>
  )
}