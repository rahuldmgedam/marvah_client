import toast from "react-hot-toast";
import { cardEndpoint } from "../api";
import { apiConnector } from "../apiConnector";


const { CREATE_PETROCARD_API, GET_PETROCARD_DATA_API, STATUS_PETROCARD_API, EDIT_PETROCARD_API, GET_OPEN_PETROCARD_DATA_API, CREATE_PETROCARD_TRAN_API, GET_PETROCARD_TRAN_API, EDIT_PETROCARD_TRAN_API, } = cardEndpoint;


export const createPetroCard = async (data) => {
    let result = {};
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_PETROCARD_API, { data });

        console.log("CREATE_PETROCARD_API ... response", response);
        result = response?.data;
        console.log("result : ", result)

        toast.success("PetroCard Added")
    }
    catch (error) {
        console.log("Error : ", error)
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const getPetroCard = async () => {
    let result = {};
    // const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", GET_PETROCARD_DATA_API);

        console.log("GET_PETROCARD_DATA_API ... response", response);
        result = response?.data?.data;
        console.log("result : ", result)
    }
    catch (error) {
        console.log("Error : ", error)
        toast.error(error?.response?.data?.message);
    }
    // toast.dismiss(toastId);
    return result;
}

export const getOpenPetroCardData = async () => {
    let result = {};
    // const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", GET_OPEN_PETROCARD_DATA_API);

        console.log("GET_OPEN_PETROCARD_DATA_API ... response", response);
        result = response?.data?.data;
        console.log("result : ", result)
    }
    catch (error) {
        console.log("Error : ", error)
        toast.error(error?.response?.data?.message);
    }
    // toast.dismiss(toastId)
    return result;
}

export const statusPetroCard = async (Id, status) => {
    let result = {};
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PATCH", STATUS_PETROCARD_API, {Id, status});

        console.log("STATUS_PETROCARD_API ... response", response);
        result = response?.data?.data;
        console.log("result : ", result)

        toast.success(`Petro Card Status ${status} Saved`)
    }
    catch (error) {
        console.log("Error : ", error)
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const editHandler = async (data) => {
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("PATCH", EDIT_PETROCARD_API, data)
        console.log("response ", response);

        toast.success("Petrocard Data Updated");
    }
    catch(error) {
        console.log("Error : ", error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
}

export const createPetroCardTran = async (data) => {
    const toastId = toast.loading("Loading...");
    try{
        const res = await apiConnector("POST", CREATE_PETROCARD_TRAN_API, data)
        console.log("res ", res)

        toast.success("Petrocard Transaction Saved")
    }
    catch(error) {
        console.log("Error : ", error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
}

export const getPetroCardTran = async () => {
    // const toastId = toast.loading("Loading...");
    let response ;
    try{
        const res = await apiConnector("GET", GET_PETROCARD_TRAN_API);
        console.log("res of transaction : ", res);
        response = res?.data?.transactionData
    }
    catch(error) {
        console.log("Error : ", error);
        toast.error(error?.response?.data?.message);
    }
    // toast.dismiss(toastId)
    return response
}

export const editPetroCardTran = async (data) => {
    let response ;
    const toastId = toast.loading("Loading...");
    try{
        const res = await apiConnector("PATCH", EDIT_PETROCARD_TRAN_API, data);
        console.log("res of transaction edit : ", res);
        response = res?.data

        toast.success("Transaction Updated")
    }
    catch(error) {
        console.log("Error : ", error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return response
}