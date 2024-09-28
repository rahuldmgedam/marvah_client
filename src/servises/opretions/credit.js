import toast from "react-hot-toast";
const { apiConnector } = require("../apiConnector");
const { creditEndpoints } = require("../api");


const {
    CREATE_CREDIT_API,
    GET_CREDIT_DATA_API,
    CREATE_CREDIT_TRAN_DATA_API,
    GET_CREDIT_TRAN_DATA_API,
    DELETE_CREDIT_TRAN_DATA_API,
} = creditEndpoints


export const createCredit = async(data) => {
    const toastId = toast.loading("Loading...");
    let response;
    try{
        const res = await apiConnector("POST", CREATE_CREDIT_API, data);

        // console.log("res data ", res);
        response = res.data
    }
    catch(error) {
        console.log("Error", error)
    }
    toast.dismiss(toastId);
    return response
}

export const getCreditData = async() => {
    const toastId = toast.loading("Loading...");
    let response;
    try{
        const res = await apiConnector("GET", GET_CREDIT_DATA_API);

        // console.log("res GET_CREDIT_DATA_API ", res?.data?.creditData);
        response = res?.data?.creditData
    }
    catch(error) {
        console.log("Error", error)
    }

    toast.dismiss(toastId);
    return response;
}

export const creatCreditTran = async (data) => {
    const toastId = toast.loading("Loading...")
    try{
        const res = await apiConnector("POST", CREATE_CREDIT_TRAN_DATA_API, data)

        console.log("res ", res);
        toast.success("Tracsaton Saved Successfully")
    }
    catch(error) {
        console.log("Error ",error);
    }
    toast.dismiss(toastId);
}

export const getCreditTranData = async () => {
    let response;
    try{
        const res = await apiConnector("GET", GET_CREDIT_TRAN_DATA_API);
        // console.log("res of GET_CREDIT_TRAN_DATA_API ", res?.data?.creditTran);
        response = res?.data?.creditTran
    }
    catch(error) {
        console.log("Error", error)
    }
    return response
}

export const deleteCreditTranData = async(data) => {
    try{
        const res = await apiConnector("POST", DELETE_CREDIT_TRAN_DATA_API, {id : data})
        console.log("res ", res)
    }
    catch(error) {
        console.log("Error ", error)
    }
}