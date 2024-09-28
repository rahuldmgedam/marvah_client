import axios from "axios";
import toast from "react-hot-toast";
import { walletEndpoints } from "../api";
import { apiConnector } from "../apiConnector";


const {CREATE_WALLET_API,
    GET_WALLET_DATA_API,
    DELETE_WALLET_API,
    STATUS_WALLET_API,
    CREATE_WALLET_TRAN_API,
    GET_WALLET_TRANS_DATA_API,
    DELETE_WALLET_TRANS_API,
} = walletEndpoints


export const CreateWallet = async (data) => {
    const toastId = toast.loading("Loading...")
    try{
        console.log("CREATE_WALLET_API ", CREATE_WALLET_API)
        const res = await apiConnector("POST" , CREATE_WALLET_API, {bankName : data});

        console.log("res ", res);
    }
    catch(error) {
        console.log("Error" , error);
    }
    toast.dismiss(toastId);
}

export const getWalletData = async () => {
    const toastId = toast.loading("Loading...")
    let response = {};
    try{
        console.log("GET_WALLET_DATA_API ", GET_WALLET_DATA_API)
        const res = await apiConnector("GET",GET_WALLET_DATA_API);

        console.log("res GET_WALLET_DATA_API", res?.data?.walletData);
        response = res?.data?.walletData;
    }
    catch(error) {
        console.log("Error ", error);
    }

    toast.dismiss(toastId);
    return response;
}

export const deleteWallet = async (id) => {
    const toastId = toast.loading("Loading...");
    try{
        const res = await apiConnector("POST",DELETE_WALLET_API, {walletId : id});

        console.log("res ", res);
    }
    catch(error) {
        console.log("Error ", error);
    }

    toast.dismiss(toastId);
}

export const statusWallet = async (Id, status) => {
    let result = {};
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PATCH", STATUS_WALLET_API, {Id, status});

        console.log("STATUS_WALLET_API ... response", response);
        result = response?.data?.data;
        console.log("result : ", result)

        toast.success(`Wallet Status ${status} Saved`)
    }
    catch (error) {
        console.log("Error : ", error)
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const createWalletTran = async (data) => {
    const toastId = toast.loading("Loading...")
    try{
        const res = await apiConnector("POST", CREATE_WALLET_TRAN_API, data)

        console.log("res CREATE_WALLET_TRAN_API ", res);
    }
    catch (error) {
        console.log("Error : ", error)
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
}

export const getWalletTrans = async() => {
    const toastId = toast.loading("Loading...")
    let response = {};
    try{
        const res = await apiConnector("GET", GET_WALLET_TRANS_DATA_API);
        console.log("res GET_WALLET_TRANS_DATA_API", res?.data?.walletTransData);
        response = res?.data?.walletTransData;
    }
    catch (error) {
        console.log("Error : ", error)
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return response;
}

export const deleteWalletTran = async (id) => {
    const toastId = toast.loading("Loading...")
    let response = {};
    try{
        const res = await apiConnector("POST", DELETE_WALLET_TRANS_API, {tranId : id});
        console.log("res DELETE_WALLET_TRANS_API", res?.data);
        // response = res?.data?.walletTransData;
    }
    catch (error) {
        console.log("Error : ", error)
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
    return response;
}