import toast from "react-hot-toast"
import { bankEndpoints } from "../api"
import { apiConnector } from "../apiConnector"


const {
    CREATE_BANK_API,
    GET_BANK_DATA_API,
    CHANGE_BANK_STATUS_API,
    DELETE_BANK_API,
    CREATE_BANK_TRAN_API,
    GET_BANK_TRAN_DATA_API,
    DELETE_BANK_TRAN_API,
} = bankEndpoints

export const createBank = async(data) => {
    const toastId = toast.loading("Loading...");
    try{
        const res = await apiConnector("POST",CREATE_BANK_API, data);

        console.log("Res on bank ", res);
    }
    catch(error) {
        console.log("Error", error)
    }

    toast.dismiss(toastId);
}

export const getBankData = async() => {
    const toastId = toast.loading("Loading...");
    let response ;
    try{
        const res = await apiConnector("GET",GET_BANK_DATA_API);
        response = res?.data?.bankData
        console.log("Res on bank data ", res);
    }
    catch(error) {
        console.log("Error", error)
    }

    toast.dismiss(toastId);
    return response
}


export const changeStatus = async(id) => {
    const toastId = toast.loading("Loading...");
    let response ;
    try{
        const res = await apiConnector("PATCH",`${CHANGE_BANK_STATUS_API}/${id}`);
        response = res?.data
        console.log("changeStatus ", res);
    }
    catch(error) {
        console.log("Error", error)
    }

    toast.dismiss(toastId);
    return response
}

export const deleteBank = async(id) => {
    const toastId = toast.loading("Loading...");
    let response ;
    try{
        const res = await apiConnector("DELETE",`${DELETE_BANK_API}/${id}`);
        response = res?.data
        console.log("deleteBank ", res);
    }
    catch(error) {
        console.log("Error", error)
    }

    toast.dismiss(toastId);
    return response
}


export const createBankTran = async (data) => {
    const toastId = toast.loading("Loading...");
    let response ;
    try{
        const res = await apiConnector("POST", CREATE_BANK_TRAN_API, data);
        response = res?.data
        console.log("deleteBank ", res);
    }
    catch(error) {
        console.log("Error", error)
    }

    toast.dismiss(toastId);
    return response
}

export const getBankTranData = async () => {
    const toastId = toast.loading("Loading...");
    let response ;
    try{
        const res = await apiConnector("GET", GET_BANK_TRAN_DATA_API);
        response = res?.data
        console.log("GET_BANK_TRAN_DATA_API RES ", res);
    }
    catch(error) {
        console.log("Error", error)
    }

    toast.dismiss(toastId);
    return response
}


export const deleteBankTran = async(id) => {
    const toastId = toast.loading("Loading...");
    let response ;
    try{
        const res = await apiConnector("DELETE",`${DELETE_BANK_TRAN_API}/${id}`);
        response = res?.data
        console.log("DELETE_BANK_TRAN_API ", res);
    }
    catch(error) {
        console.log("Error", error)
    }

    toast.dismiss(toastId);
    return response
}

