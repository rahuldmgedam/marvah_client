import React from 'react'
import '../css/Tank.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function AddStaff({dbpath1}) {
  
    const [Staff, setStaff] = useState([]);
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState('');
    const [istatus, setIStatus] = useState('');
    const [pouches, setPouches] = useState([]);
    const [selectedPouches, setselectedPouches] = useState('');
    const [pid, setPid] = useState('');

    const [oil_godown, set_oil_godown] = useState([]);
    const [tHistory, setTHistory] = useState([]);


    const getData = async (index) => {
       
        let query="select date from rwt_oil_pouches_retail where id = (select max(id) from rwt_oil_pouches_retail where product_id = '"+index+"')";
        //alert(query);
       const url = dbpath1 + 'getDynamic.php';
       let fData = new FormData();
       
       fData.append('query', query);

       try {
           const response = await axios.post(url, fData);
           
           if (response && response.data) {
               
               if (response.data.phpresult) {
                   setTHistory(response.data.phpresult); 
                   console.log(response.data.phpresult);

                 
                   var d1 = response.data.phpresult[0]['date'];
                  // alert(d1);

                   if(d1===datecache)
                   {
                        //same day data
                        loadTHistory(index);
                   }
                   else
                   {
                        //last day data
                        loadYHistory(index);

                   }
               }
           } 
       } catch (error) {
           console.log("Please Select Proper Input");
       }

        
     }

     const addToTransac = async (index, pid) => {
       
        let query="INSERT INTO `rwt_oil_godown_trans` (`id`, `godown_id`, `product_id`, `date`, `mode`, `qty`, `amount`, `discount`, `a_amount`, `product_name`, `product_grade`, `product_colour`, `product_mrp`, `product_volume_per_pcs`, `product_pcs_per_caserwt_oil_products`, `purchasePrice`, `opStock`, `reciept`, `topstoack`, `balStkAmount`, `retail_op_stk`, `retail_inward`, `retail_top_stk`, `type`) VALUES (NULL, '"+selectedPouches+"', '"+pid+"', '"+datecache+"', 'pouches', '"+document.getElementById('totalsalestotalr1').value+"', '"+document.getElementById('amount').value+"', '"+0+"', '"+document.getElementById('amount').value+"', '"+0+"', '"+0+"', '"+0+"', '"+document.getElementById('rate').value+"', '"+0+"', 'no data for ppc', 'no data for pp', '"+0+"', '"+0+"', '"+0+"', '"+0+"', '"+document.getElementById('openstktotalr1').value+"', '"+document.getElementById('stkrecordtotalr1').value+"', '"+document.getElementById('totalstktotalr1').value+"', 'Pouches');";
       /*  alert(query); */
           const url = dbpath1+'delTank.php';
           let fData = new FormData();
           fData.append('query', query);

           axios.post(url, fData)
               .then(response =>{})
               .catch(error => {
               console.log(error.toJSON());
        });

    }

    const loadTHistory = async (index) => {

        let query=" SELECT * FROM `rwt_oil_pouches_retail` where id=(select max(id) from `rwt_oil_pouches_retail` where date='"+datecache+"' AND product_id='"+index+"');";
         
            /* alert(query); */
            const url = dbpath1 + 'getDynamic.php';
            let fData = new FormData();

            fData.append('query', query);

            try {
                const response = await axios.post(url, fData);
                let i=0;
                if (response && response.data) {
                    
                    if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
                        setTHistory(response.data.phpresult); 
                        console.log(response.data.phpresult);
                        
                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("openstk"+i).value = response.data.phpresult[0]['os'+i];
                        }

                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("stkrecord"+i).value = response.data.phpresult[0]['sr'+i];
                        }

                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("totalstk"+i).value = response.data.phpresult[0]['ts'+i];
                            document.getElementById("totalstk"+i+"r").value = response.data.phpresult[0]['ts'+i];
                      
                        }

                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("morningsale"+i).value = response.data.phpresult[0]['ms'+i];
                        }

                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("eveningsale"+i).value = response.data.phpresult[0]['es'+i];
                        }

                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("totalsales"+i).value = response.data.phpresult[0]['tsa'+i];
                        }

                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("totalbalstk"+i).value = response.data.phpresult[0]['tbs'+i];
                            document.getElementById("totalsales"+i+"r").value = response.data.phpresult[0]['tbs'+i];
                        }
                        
                        document.getElementById("openstktotal").value = response.data.phpresult[0]['tos'];
                        document.getElementById("stkrecordtotal").value = response.data.phpresult[0]['tsr'];
                        document.getElementById("totalstktotal").value = response.data.phpresult[0]['tts'];
                        document.getElementById("morningsaletotal").value = response.data.phpresult[0]['tms'];
                        document.getElementById("eveningsaletotal").value = response.data.phpresult[0]['tes'];
                        document.getElementById("totalsalestotal").value = response.data.phpresult[0]['ttsa'];
                        document.getElementById("totalstktotalr").value = response.data.phpresult[0]['tts'];
                        document.getElementById("totalsalestotalr").value = response.data.phpresult[0]['ttsa'];
                        document.getElementById("totalbalstktotal").value = response.data.phpresult[0]['ttbs'];

                        document.getElementById("openstktotalr1").value = response.data.phpresult[0]['tos'];
                        document.getElementById("stkrecordtotalr1").value = response.data.phpresult[0]['tsr'];
                        document.getElementById("totalstktotalr1").value = response.data.phpresult[0]['tts'];
                        document.getElementById("totalsalestotalr2").value = response.data.phpresult[0]['ttsa'] ;
                        document.getElementById("totalbalstktotalr1").value = response.data.phpresult[0]['ttbs'];

                        document.getElementById("totalsalestotalr1").value = response.data.phpresult[0]['ttsa'] ;
                        document.getElementById("rate").value = response.data.phpresult[0]['rate'];
                        document.getElementById("amount").value = response.data.phpresult[0]['amount'];
                        
                    }
                  
                }
                
            } catch (error) {
                console.log("Please Select Proper Input");
            }
    }

    function calcDays(inputDate, daysToAdd) {
        // Parse the input date string into a Date object
        let date = new Date(datecache);
      
        // Add or subtract the specified number of days
        date.setDate(date.getDate() - 1);
      
        // Return the new date in standard JavaScript date format
        return date.toISOString().split('T')[0];
      }

    const loadYHistory = async (index) => {

        let query=" SELECT * FROM `rwt_oil_pouches_retail` where id=(select max(id) from `rwt_oil_pouches_retail` where date='"+calcDays()+"' AND product_id='"+index+"');";
         
            /* alert(query); */
            const url = dbpath1 + 'getDynamic.php';
            let fData = new FormData();

            fData.append('query', query);

            try {
                const response = await axios.post(url, fData);
                let i=0;
                if (response && response.data) {
                    
                    if (Array.isArray(response.data.phpresult) && response.data.phpresult.length > 0) {
                        setTHistory(response.data.phpresult); 
                        console.log(response.data.phpresult);
                        
                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("openstk"+i).value = response.data.phpresult[0]['tbs'+i];
                        }

                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("stkrecord"+i).value = 0;
                        }

                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("totalstk"+i).value = 0;
                            document.getElementById("totalstk"+i+"r").value = 0;
                      
                        }

                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("morningsale"+i).value = 0;
                        }

                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("eveningsale"+i).value = 0;
                        }

                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("totalsales"+i).value = 0;
                        }

                        for(i=1;i<=6;i++)
                        {
                            document.getElementById("totalbalstk"+i).value = 0;
                            document.getElementById("totalsales"+i+"r").value = 0;
                        }
                        
                        document.getElementById("openstktotal").value = response.data.phpresult[0]['ttbs'];;
                        document.getElementById("stkrecordtotal").value = 0;
                        document.getElementById("totalstktotal").value = 0;
                        document.getElementById("morningsaletotal").value = 0;
                        document.getElementById("eveningsaletotal").value = 0;
                        document.getElementById("totalsalestotal").value = 0
                        document.getElementById("totalstktotalr").value = 0;
                        document.getElementById("totalsalestotalr").value = 0
                        document.getElementById("totalbalstktotal").value = 0

                        document.getElementById("openstktotalr1").value = response.data.phpresult[0]['ttbs'];;
                        document.getElementById("stkrecordtotalr1").value = 0;
                        document.getElementById("totalstktotalr1").value = 0;
                        document.getElementById("totalsalestotalr2").value = 0
                        document.getElementById("totalbalstktotalr1").value = 0;

                        document.getElementById("totalsalestotalr1").value = 0
                       // document.getElementById("rate").value = 0;
                        document.getElementById("amount").value = 0;
                        
                    }
                  
                }
                
            } catch (error) {
                console.log("Please Select Proper Input");
            }
    }

    const loadOilGodown = async () => {
        let query="SELECT * FROM `rwt_oil_godown` where retail_top_stk>0 AND type='Pouches';";
        /*  
            alert(query); */
            const url = dbpath1 + 'getDynamic.php';
            let fData = new FormData();

            fData.append('query', query);

            try {
                const response = await axios.post(url, fData);
                
                if (response && response.data) {
                    
                    if (response.data.phpresult) {
                        set_oil_godown(response.data.phpresult); 
                        console.log(response.data.phpresult);
                    }
                }
            } catch (error) {
                console.log("Please Select Proper Input");
            }
    }

    const loadStaff = async () => {
        let query="select * from rwt_staff";
             
        /*    alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       setStaff(response.data.phpresult); 
                       const initialStatus = {};
                       response.data.phpresult.forEach(st => {
                        initialStatus[st.staff_id] = st.status;
                       
                      });
                      console.log(initialStatus);

                      setIStatus(initialStatus);

                     /*   console.log(response.data.phpresult); */
                   }
               }
      }

      const loadRate = (index) => {
        const selectedProduct = oil_godown.find(product => product.id === index);
    
    
        if (!selectedProduct) {
            console.error("Invalid product index");
            return;
        }

        setPid(selectedPouches.product_id);
        document.getElementById('rate').value   = selectedProduct.product_mrp;    
        //document.getElementById('rate1').value = selectedProduct.product_mrp;  
        document.getElementById('rate2').value = selectedProduct.product_mrp;  
        document.getElementById('v1').value = selectedProduct.product_volume_per_pcs;    
      }

      const loadPouches= async () => {
        let query="select * from rwt_oil_pouches";
             
        /*    alert(query); */
           const url = dbpath1 + 'getDynamic.php';
           let fData = new FormData();

           fData.append('query', query);

               const response = await axios.post(url, fData);
               
               if (response && response.data) {
                   
                   if (response.data.phpresult) {
                       setPouches(response.data.phpresult);
                       console.log(response.data.phpresult);
                   }
               }
      }
      
      

    const navigate = useNavigate();

    const onAdd = () =>{
        if (document.getElementById("totalbalstktotalr1").value === 0 && document.getElementById("totalsalestotalr2").value === 0 && document.getElementById("totalstktotalr1").value === 0 && document.getElementById("stkrecordtotalr1").value === 0 && document.getElementById("openstktotalr1").value) {
            alert("Kindly fill all data!");
        }   /* else if (lastName.length === 0) {
            alert("Head Name has been left blank!");
          } */   else {
      
            let query="INSERT INTO `rwt_oil_pouches_retail` (`id`, `product_id`, `date`, `os1`, `os2`, `os3`, `os4`, `os5`, `os6`, `sr1`, `sr2`, `sr3`, `sr4`, `sr5`, `sr6`, `ts1`, `ts2`, `ts3`, `ts4`, `ts5`, `ts6`, `ms1`, `ms2`, `ms3`, `ms4`, `ms5`, `ms6`, `es1`, `es2`, `es3`, `es4`, `es5`, `es6`, `tsa1`, `tsa2`, `tsa3`, `tsa4`, `tsa5`, `tsa6`, `tbs1`, `tbs2`, `tbs3`, `tbs4`, `tbs5`, `tbs6`, `tos`, `tsr`, `tts`, `tms`, `tes`, `ttsa`, `ttbs`, `rate`, `amount`) VALUES (NULL,'"+selectedPouches+"','"+datecache+"', '"+document.getElementById('openstk1').value+"', '"+document.getElementById('openstk2').value+"', '"+document.getElementById('openstk3').value+"', '"+document.getElementById('openstk4').value+"', '"+document.getElementById('openstk5').value+"', '"+document.getElementById('openstk6').value+"', '"+document.getElementById('stkrecord1').value+"', '"+document.getElementById('stkrecord2').value+"', '"+document.getElementById('stkrecord3').value+"', '"+document.getElementById('stkrecord4').value+"', '"+document.getElementById('stkrecord5').value+"', '"+document.getElementById('stkrecord6').value+"', '"+document.getElementById('totalstk1').value+"', '"+document.getElementById('totalstk2').value+"', '"+document.getElementById('totalstk3').value+"', '"+document.getElementById('totalstk4').value+"', '"+document.getElementById('totalstk5').value+"', '"+document.getElementById('totalstk6').value+"', '"+document.getElementById('morningsale1').value+"', '"+document.getElementById('morningsale2').value+"', '"+document.getElementById('morningsale3').value+"', '"+document.getElementById('morningsale4').value+"', '"+document.getElementById('morningsale5').value+"', '"+document.getElementById('morningsale6').value+"', '"+document.getElementById('eveningsale1').value+"', '"+document.getElementById('eveningsale2').value+"', '"+document.getElementById('eveningsale3').value+"', '"+document.getElementById('eveningsale4').value+"', '"+document.getElementById('eveningsale5').value+"', '"+document.getElementById('eveningsale6').value+"', '"+document.getElementById('totalsales1').value+"', '"+document.getElementById('totalsales2').value+"', '"+document.getElementById('totalsales3').value+"', '"+document.getElementById('totalsales4').value+"', '"+document.getElementById('totalsales5').value+"', '"+document.getElementById('totalsales6').value+"', '"+document.getElementById('totalbalstk1').value+"', '"+document.getElementById('totalbalstk2').value+"', '"+document.getElementById('totalbalstk3').value+"', '"+document.getElementById('totalbalstk4').value+"', '"+document.getElementById('totalbalstk5').value+"', '"+document.getElementById('totalbalstk6').value+"', '"+document.getElementById('openstktotal').value+"', '"+document.getElementById('stkrecordtotal').value+"', '"+document.getElementById('totalstktotal').value+"', '"+document.getElementById('morningsaletotal').value+"', '"+document.getElementById('eveningsaletotal').value+"', '"+document.getElementById('totalsalestotal').value+"', '"+document.getElementById('totalbalstktotal').value+"', '"+document.getElementById('rate').value+"', '"+document.getElementById('amount').value+"');";
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
    }

    const calcTotal =() => {
        let i=0;
        let openstktotal = 0;

        for(i=1;i<=6;i++)
        {
            openstktotal = parseInt(document.getElementById('openstk'+i).value) + parseInt(openstktotal) ;
        }
        document.getElementById('openstktotal').value = openstktotal;
        document.getElementById('openstktotalr1').value = openstktotal;

        let stkrecordtotal = 0;
        for(i=1;i<=6;i++)
        {
            stkrecordtotal = parseInt(document.getElementById('stkrecord'+i).value) + parseInt(stkrecordtotal) ;
        }
        document.getElementById('stkrecordtotal').value = stkrecordtotal;
        document.getElementById('stkrecordtotalr1').value = stkrecordtotal;
        
        let totalstktotal = 0;  
        let temp1=0;
        for(i=1;i<=6;i++)
        {
            temp1 = parseInt(document.getElementById('openstk'+i).value) +  parseInt(document.getElementById('stkrecord'+i).value) ;
            document.getElementById('totalstk'+i).value = temp1;
            document.getElementById('totalstk'+i+'r').value = temp1;
            totalstktotal = parseInt(temp1) + parseInt(totalstktotal) ;

        }

        document.getElementById('totalstktotal').value = totalstktotal;
        document.getElementById('totalstktotalr').value = totalstktotal;
        document.getElementById('totalstktotalr1').value = totalstktotal;
        

        let morningsaletotal = 0;
        for(i=1;i<=6;i++)
        {
            morningsaletotal = parseInt(document.getElementById('morningsale'+i).value) + parseInt(morningsaletotal) ;
        }
        document.getElementById('morningsaletotal').value = morningsaletotal;

        let eveningsaletotal = 0;
        for(i=1;i<=6;i++)
        {
            eveningsaletotal = parseInt(document.getElementById('eveningsale'+i).value) + parseInt(eveningsaletotal) ;
        }
        document.getElementById('eveningsaletotal').value = eveningsaletotal;


        let totalsalestotal = 0;  
        let totalbalstktotal = 0;
        let temp2=0;
        let temp3=0;
        for(i=1;i<=6;i++)
        {
            temp2 = parseInt(document.getElementById('morningsale'+i).value) +  parseInt(document.getElementById('eveningsale'+i).value) ;
            document.getElementById('totalsales'+i).value = temp2;
            document.getElementById('totalsales'+i+'r').value = temp2;
            totalsalestotal = parseInt(temp2) + parseInt(totalsalestotal) ;

            temp3 = parseInt(document.getElementById('totalstk'+i).value) -  parseInt(document.getElementById('totalsales'+i).value) ;
            document.getElementById('totalbalstk'+i).value = temp3;
            totalbalstktotal = parseInt(temp3) + parseInt(totalbalstktotal) ;
        }

        document.getElementById('totalsalestotal').value = totalsalestotal;
        document.getElementById('totalsalestotalr').value = totalsalestotal;
        document.getElementById('totalsalestotalr1').value = totalsalestotal;
        document.getElementById('totalbalstktotal').value = totalbalstktotal;

        document.getElementById('totalsalestotalr2').value = totalsalestotal;
        document.getElementById('totalbalstktotalr1').value = totalbalstktotal;



        var trate = document.getElementById('rate').value;
        var tsales = document.getElementById('totalsalestotalr1').value
        var tamount = parseFloat(trate) * parseFloat(tsales);
        document.getElementById('amount').value = tamount.toFixed(2);
      
    }

    const onDelete = async (index) => {
        let query="DELETE FROM `rwt_staff` WHERE staff_id = "+index+";";
        /* alert(query); */
        const url = dbpath1+'delTank.php';
        let fData = new FormData();
        fData.append('query', query);
        
        axios.post(url, fData)
        .then(response => {alert(response.data);  window.location.reload();})
            .catch(error => {
            console.log(error.toJSON());
            });
    }

    const onSave = async (index,pstatus) => {
        let query="UPDATE rwt_staff SET status = '"+pstatus+"' where staff_id = '"+index+"'";
        /* alert(query); */
        const url = dbpath1+'delTank.php';
        let fData = new FormData();
        fData.append('query', query);
        
        axios.post(url, fData)
            .then(response =>{window.location.reload();})
            .catch(error => {
            console.log(error.toJSON());
            });
    }   

    const onSale = async (index) => {
        console.log(index);
        

        let query="UPDATE rwt_oil_godown SET retail_top_stk = '"+document.getElementById("totalbalstktotalr1").value+"' WHERE id = "+selectedPouches;
       /*  alert(query); */
           const url = dbpath1+'delTank.php';
           let fData = new FormData();
           fData.append('query', query);

           axios.post(url, fData)
               .then(response =>{ alert(response.data); window.location.reload();})
               .catch(error => {
               console.log(error.toJSON());
        });
        loadOilGodown();
    }

    const setZeros = () =>{
        let i=0;
        for(i=1;i<=6;i++)
        {
            document.getElementById('morningsale'+i).value = 0;
            document.getElementById('eveningsale'+i).value = 0;
            document.getElementById('openstk'+i).value = 0;
            document.getElementById('stkrecord'+i).value = 0;
        }
    }

    /* const editGodown = () => {

        let query1="select * rwt_oil_godown where product_id = '"+index+"'";
        //alert(query);
        const url1 = dbpath1+'delTank.php';
        let fData1 = new FormData();
        fData1.append('query', query1);
        
        axios.post(url1, fData1)
            .then(response =>{window.location.reload();})
            .catch(error => {
            console.log(error.toJSON());
        });

        var tavail = document.getElementById("totalsalestotalr2").value;
        var tsales = document.getElementById("totalsalestotalr2").value;

        let query="UPDATE rwt_oil_godown SET retail_top_stk = '"+pstatus+"' where staff_id = '"+index+"'";
        //alert(query);
        const url = dbpath1+'delTank.php';
        let fData = new FormData();
        fData.append('query', query);
        
        axios.post(url, fData)
            .then(response =>{window.location.reload();})
            .catch(error => {
            console.log(error.toJSON());
            });
    } */

    // useEffect(() => {
    //     loadStaff();
    //     setZeros();
    //     loadTHistory();
    //     loadOilGodown();
    //   }, []); 
      const datecache = Cookies.get('dateCookies');

    //   function convertDateFormat(inputDate) {
    //     // Split the string into an array [yyyy, mm, dd]
    //     let parts = inputDate.split('-');
    
    //     // Rearrange the array and join it back to a string
    //     return parts[2] + '-' + parts[1] + '-' + parts[0];
    // }
    return (
    <>
        <div className='tankMainDiv shadow-lg p-3 mb-5 bg-body-tertiary rounded bigFontWeight' >   
       
            <h2 className='mt-3 text-center'>Oil Pouches</h2>
            <span style={{fontSize:'22px'}}> Date :
                 {/* {convertDateFormat(datecache)} */}
                 </span>
            <div>
                <br></br>
                <table class="table" style={{width:'1000px'}}>
                    <thead>
                        <tr className='table-secondary' >
                            
                            <th className='tablebg' style={{display:'flex', gap:'20px'}}>Product: <select style={{width:'300px'}} class="form-select editableInput bigFontWeights" aria-label="Default select example" value={selectedPouches}  onChange={(e) =>{ setselectedPouches(e.target.value); loadRate(e.target.value); getData(e.target.value);/*  getTotalAmount1(e.target.value); *//*  setSelectedValues(e.target.value); */}}>
                                    <option selected>- select -</option>
                                    


                                    {oil_godown.map((rest) => (  
                                        <option value={rest.id}>{rest.product_name} - {rest.product_volume_per_pcs} - {rest.product_mrp} </option>
                                    ))}
                                </select>  
                                
                                &nbsp;Volume:  <input style={{width:'170px'}} type="text" id="v1" class="form-control bigFontWeight" placeholder="" disabled/>
                               &nbsp; Rate:  <input style={{width:'170px'}} type="text" id="rate2" class="form-control bigFontWeight" placeholder="" disabled/></th>
                            
                        </tr>
                    </thead>
                   
                </table>    
            </div>
            <br></br>
            <div>
                <br></br>
                Stock Record
                <table class="table" style={{width:'1100px'}}>
                    <thead>
                        <tr className='table-secondary'>
                        <th s className='tablebg'>Mtr No</th>
                            <th className='tablebg'>1</th>
                            <th className='tablebg'>2</th>
                            <th className='tablebg'>3</th>
                            <th className='tablebg'>4</th>
                            <th className='tablebg'>5</th>
                            <th className='tablebg'>6</th>
                            <th className='tablebg'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Open Stk</td>
                            <td><input type="text" id="openstk1" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="openstk2" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="openstk3" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="openstk4" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="openstk5" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="openstk6" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="openstktotal" class="form-control  bigFontWeight"  placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                        </tr>
                        <tr>
                            <td>Stk Recived</td>
                            <td><input type="text" id="stkrecord1" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="stkrecord2" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="stkrecord3" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="stkrecord4" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="stkrecord5" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="stkrecord6" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="stkrecordtotal" class="form-control  bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                        </tr>
                        <tr>
                            <td>Total Stk</td>
                            <td><input type="text" id='totalstk1' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id='totalstk2' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id='totalstk3' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id='totalstk4' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id='totalstk5' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id='totalstk6' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id='totalstktotal' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                        </tr>
                  {/*   {Staff.map((res,index)=>
                                <tr className='hovereffect' key={index}>
                                   
                                    <td>{res.first_name}</td>
                                    <td>{res.last_name}</td>
                                    <td style={{width:'300px'}}> */}{/* <input type='text' class="form-control bigFontWeight" id={"status"+res.staff_id}   value={istatus[res.staff_id]}  onChange={(e) =>{ setIStatus({...istatus, [res.staff_id]:e.target.value}); }} />  */}
                                    {/*   {res.status}
                                 </td>
                                   
                                    <td style={{width:'300px'}}>
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.staff_id} class="btn btn-primary" onClick={() => onDelete(res.staff_id)}>Delete</button> &nbsp;&nbsp; 
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.staff_id} class="btn btn-primary" onClick={() => onSave(res.staff_id, "active")}>Open</button>  &nbsp;&nbsp;
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.staff_id} class="btn btn-primary" onClick={() => onSave(res.staff_id, "closed")}>Close</button>
                                    </td>
                                </tr>
                            )} */}
                    </tbody>
                </table> 
                <br></br>
                Sale Record
                <table class="table" style={{width:'1100px'}}>
                    <thead>
                        <tr className='table-secondary'>
                        <th s className='tablebg'>Mtr No</th>
                            <th className='tablebg'>1</th>
                            <th className='tablebg'>2</th>
                            <th className='tablebg'>3</th>
                            <th className='tablebg'>4</th>
                            <th className='tablebg'>5</th>
                            <th className='tablebg'>6</th>
                            <th className='tablebg'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Morning Sale</td>
                            <td><input type="text" id="morningsale1" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="morningsale2" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="morningsale3" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="morningsale4" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="morningsale5" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="morningsale6" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="morningsaletotal" class="form-control  bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                        </tr>
                        <tr>
                            <td>Evening Sale</td>
                            <td><input type="text" id="eveningsale1" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="eveningsale2" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="eveningsale3" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="eveningsale4" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="eveningsale5" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="eveningsale6" class="form-control editableInput bigFontWeight" placeholder="" onChange={(e) => calcTotal()}/> </td>
                            <td><input type="text" id="eveningsaletotal" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                        </tr>
                        <tr>
                            <td>Total Sales</td>
                            <td><input type="text" id="totalsales1" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalsales2" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalsales3" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalsales4" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalsales5" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalsales6" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalsalestotal" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                        </tr>
               
                    </tbody>
                </table>    
                <br></br>
                Bal Stock   
                <table class="table" style={{width:'1100px'}}>
                    <thead>
                        <tr className='table-secondary'>
                        <th s className='tablebg'>Mtr No</th>
                            <th className='tablebg'>1</th>
                            <th className='tablebg'>2</th>
                            <th className='tablebg'>3</th>
                            <th className='tablebg'>4</th>
                            <th className='tablebg'>5</th>
                            <th className='tablebg'>6</th>
                            <th className='tablebg'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Stk</td>
                            <td><input type="text" id='totalstk1r' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id='totalstk2r' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id='totalstk3r' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id='totalstk4r' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id='totalstk5r' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id='totalstk6r' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id='totalstktotalr' class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                        </tr>
                        <tr>
                            <td>Total Sales</td>
                            <td><input type="text" id="totalsales1r" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalsales2r" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalsales3r" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalsales4r" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalsales5r" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalsales6r" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalsalestotalr" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                        </tr>
                        <tr>
                            <td>Total Bal Stk</td>
                            <td><input type="text" id="totalbalstk1" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalbalstk2" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalbalstk3" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalbalstk4" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalbalstk5" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalbalstk6" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                            <td><input type="text" id="totalbalstktotal" class="form-control bigFontWeight" placeholder="" onChange={(e) => calcTotal()} disabled/> </td>
                        </tr>
                  {/*   {Staff.map((res,index)=>
                                <tr className='hovereffect' key={index}>
                                   
                                    <td>{res.first_name}</td>
                                    <td>{res.last_name}</td>
                                    <td style={{width:'300px'}}> */}{/* <input type='text' class="form-control bigFontWeight" id={"status"+res.staff_id}   value={istatus[res.staff_id]}  onChange={(e) =>{ setIStatus({...istatus, [res.staff_id]:e.target.value}); }} />  */}
                                    {/*   {res.status}
                                 </td>
                                   
                                    <td style={{width:'300px'}}>
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.staff_id} class="btn btn-primary" onClick={() => onDelete(res.staff_id)}>Delete</button> &nbsp;&nbsp; 
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.staff_id} class="btn btn-primary" onClick={() => onSave(res.staff_id, "active")}>Open</button>  &nbsp;&nbsp;
                                        <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"+res.staff_id} class="btn btn-primary" onClick={() => onSave(res.staff_id, "closed")}>Close</button>
                                    </td>
                                </tr>
                            )} */}
                    </tbody>
                </table>  
                <br></br>
                <div style={{display:'flex', gap:'100px'}}>
                <table class="table" style={{width:'500px'}}>
                    <thead>
                        <tr className='table-secondary'>
                        <th s className='tablebg'>Total Sale</th>
                        <th className='tablebg'>X</th>
                            <th className='tablebg'>Rate</th>
                            <th className='tablebg'>=</th>
                            <th className='tablebg'>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            
                            <td><input type="text" id="totalsalestotalr1" class="form-control bigFontWeight" placeholder="" disabled/> </td>
                            <td> X </td>
                            <td><input type="text" id="rate" class="form-control bigFontWeight" placeholder="" disabled/> </td>
                            <td> = </td>
                            <td><input type="text" id="amount" class="form-control bigFontWeight" placeholder="" disabled/> </td>
                               </tr>
                      
               
                    </tbody>
                </table>  
                <table class="table" style={{width:'500px'}}>
                    <thead>
                        <tr className='table-secondary'>
                            <th colSpan='2' className='tablebg'>Oil Pouches</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th> Open Stk. </th>
                            <td><input type="text" id="openstktotalr1" class="form-control bigFontWeight" placeholder="" disabled/> </td>
                           
                        </tr>
                        <tr>
                            <th> Stk. RECD. </th>
                            <td><input type="text" id="stkrecordtotalr1" class="form-control bigFontWeight" placeholder="" disabled/> </td>
                            
                        </tr>
                        <tr>
                            <th> Total Stk. </th>
                            <td><input type="text" id="totalstktotalr1" class="form-control bigFontWeight" placeholder="" disabled/> </td>
                            
                        </tr>
                        <tr>
                            <th> Total Sale </th>
                            <td><input type="text" id="totalsalestotalr2" class="form-control bigFontWeight" placeholder="" disabled/> </td>
                            
                        </tr>
                        <tr>
                            <th> Bal Stk. </th>
                            <td><input type="text" id="totalbalstktotalr1" class="form-control bigFontWeight" placeholder="" disabled/> </td>
                            
                        </tr>
                      
               
                    </tbody>
                </table>  
                </div>
            </div>      
           <center> <button type="button" style={{height:'30px', paddingTop:'2px'}} id={"data"} class="btn btn-success" onClick={() =>{ onAdd(); onSale(); addToTransac();/*  editGodown(); */}}>Save</button>  </center> &nbsp;&nbsp;
                                       
        </div>
    </>
  )
}
