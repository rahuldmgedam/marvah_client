import React from 'react'

const Sales = () =>  {

    const [machineReadings, setMachineReadings] = useState([]);
    const [hsdReadings, setHsdReadings] = useState([]);

  const [ms1Readings, setMs1Readings] = useState([]);
  const [ms1Rate, setMs1Rate] = useState(0);
  const [ms1RateAllDays, setMs1RateAllDays] = useState([]);



    const [ms2Readings, setMs2Readings] = useState([]);

    const [ms2RateAllDays, setMs2RateAllDays] = useState([]);
    const [hsdRateAllDays, setHsdRateAllDays] = useState([]);
  
    const [ms2Rate, setMs2Rate] = useState(0);
    const [hsdRate, setHsdRate] = useState(0);
  
  
    const [ms1Data,setMs1Data] = useState([]);

    const fetchMs1 = ()=>{
      axios.get('http://localhost:3001/api/ms1')
      .then(response => {
        setMs1Data(response.data);

    })

    useEffect(()=>{
      fetchMs1();
    },[])

    const fetchMachineReadings = async () => {
        try {
          const res = await axios.get("https://marvah-server.onrender.com/reading");
          const allReadings = res.data.MeterReadingData;
          setMachineReadings(allReadings);
          setMs1Readings(
            allReadings.filter((item) => item.nozzleProduct.includes("MS-1"))
          );
          setMs2Readings(
            allReadings.filter((item) => item.nozzleProduct.includes("MS-2"))
          );
          setHsdReadings(
            allReadings.filter((item) => item.nozzleProduct.includes("HSD"))
          );
        } catch (error) {
          console.error(error);
        }
      };
      console.log(machineReadings)
    
      useEffect(() => {
        fetchMachineReadings();
      }, []);
    

    const fetchAllDAyStartReading = () => {
        axios
          .get("https://marvah-server.onrender.com/ms")
          .then((res) => {
            setMs1RateAllDays(res.data);
            setMs1Rate(ms1RateAllDays[ms1RateAllDays.length - 1].reading);
          })
          .catch((error) => {
            console.log(error.message);
          });
    
        axios
          .get("https://marvah-server.onrender.com/speed")
          .then((res) => {
            setMs2RateAllDays(res.data);
            setMs2Rate(ms2RateAllDays[ms2RateAllDays.length - 1].reading);
          })
          .catch((error) => {
            console.log(error.message);
          });
    
        axios
          .get("https://marvah-server.onrender.com/hsd")
          .then((res) => {
            setHsdRateAllDays(res.data);
            setHsdRate(hsdRateAllDays[hsdRateAllDays.length - 1].reading);
          })
          .catch((error) => {
            console.log(error.message);
          });
      };

      useEffect(() => {
        fetchAllDAyStartReading();
      }, [ms1Readings,ms2Readings,hsdReadings]);
    
      
  const petrolData = [
    { srNo: 1, date: "01-05-2024", rate: 103.96, ms: 1510, totalAmt: 156979.60 },
    { srNo: 2, date: "02-05-2024", rate: 103.96, ms: 1520, totalAmt: 158019.20 },
    { srNo: 3, date: "03-05-2024", rate: 103.96, ms: 1502, totalAmt: 156092.92 },
    // ... Add remaining data for Petrol
  ];

  const speedData = [
    { srNo: 1, date: "01-05-2024", rate: 106.00, spd: 108, totalAmt: 11448.00 },
    { srNo: 2, date: "02-05-2024", rate: 106.00, spd: 124, totalAmt: 13144.00 },
    { srNo: 3, date: "03-05-2024", rate: 106.00, spd: 116, totalAmt: 12297.36 },
    // ... Add remaining data for Speed
  ];

  const dieselData = [
    { srNo: 1, date: "01-05-2024", rate: 90.53, sale: 1130, total: 102298.90 },
    { srNo: 2, date: "02-05-2024", rate: 90.53, sale: 1108, total: 100488.24 },
    { srNo: 3, date: "03-05-2024", rate: 90.53, sale: 1520, total: 137605.60 },
    // ... Add remaining data for Diesel
  ];

  return (
    <div className="container mx-auto my-8">
      <div className="flex overflow-x-auto space-x-8">
        {/* Petrol Table */}
        <table className="min-w-max bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-left" colSpan="5">Monthly Petrol Sales Figures - MAY-24</th>
            </tr>
            <tr>
              <th className="px-4 py-2 border">Sr. No.</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Rate</th>
              <th className="px-4 py-2 border">MS</th>
              <th className="px-4 py-2 border">Total Amt</th>
            </tr>
          </thead>
          <tbody>
            {petrolData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{row.srNo}</td>
                <td className="px-4 py-2 border">{row.date}</td>
                <td className="px-4 py-2 border">{row.rate}</td>
                <td className="px-4 py-2 border">{row.ms}</td>
                <td className="px-4 py-2 border">{row.totalAmt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Speed Table */}
        <table className="min-w-max bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-left" colSpan="5">Monthly Speed Sales Figures - MAY-24</th>
            </tr>
            <tr>
              <th className="px-4 py-2 border">Sr. No.</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Rate</th>
              <th className="px-4 py-2 border">SPD</th>
              <th className="px-4 py-2 border">Total Amt</th>
            </tr>
          </thead>
          <tbody>
            {speedData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{row.srNo}</td>
                <td className="px-4 py-2 border">{row.date}</td>
                <td className="px-4 py-2 border">{row.rate}</td>
                <td className="px-4 py-2 border">{row.spd}</td>
                <td className="px-4 py-2 border">{row.totalAmt}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Diesel Table */}
        <table className="min-w-max bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-left" colSpan="5">Monthly Diesel Sales Figures - MAY-24</th>
            </tr>
            <tr>
              <th className="px-4 py-2 border">Sr. No.</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Rate</th>
              <th className="px-4 py-2 border">Sale</th>
              <th className="px-4 py-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {dieselData.map((row, index) => (
              <tr key={index} className="text-center">
                <td className="px-4 py-2 border">{row.srNo}</td>
                <td className="px-4 py-2 border">{row.date}</td>
                <td className="px-4 py-2 border">{row.rate}</td>
                <td className="px-4 py-2 border">{row.sale}</td>
                <td className="px-4 py-2 border">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales