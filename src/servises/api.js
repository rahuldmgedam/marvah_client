// const BASE_URL = process.env.REACT_APP_BASE_URL
const BASE_URL = "http://localhost:4000"
// const BASE_URL = "https://marvah-server.onrender.com"

export const cardEndpoint = {
    CREATE_PETROCARD_API : BASE_URL + `/petrocard/createPetroCard`,
    GET_PETROCARD_DATA_API : BASE_URL + `/petrocard/getPetroCardData`,
    GET_OPEN_PETROCARD_DATA_API : BASE_URL + `/petrocard/getOpenPetroCardData`,
    STATUS_PETROCARD_API : BASE_URL + `/petrocard/statusHandler`,
    EDIT_PETROCARD_API : BASE_URL + `/petrocard/editPetroCard`,
    CREATE_PETROCARD_TRAN_API : BASE_URL + `/petrocard/createPetroCardTran`,
    GET_PETROCARD_TRAN_API : BASE_URL + `/petrocard/getPetroCardTran`,
    EDIT_PETROCARD_TRAN_API : BASE_URL + `/petrocard/editPetroCardTran`,
}

export const walletEndpoints = {
    CREATE_WALLET_API : BASE_URL + `/wallet/createWallet`,
    GET_WALLET_DATA_API : BASE_URL + `/wallet/getWalletData`,
    DELETE_WALLET_API : BASE_URL + `/wallet/deleteWallet`,
    STATUS_WALLET_API : BASE_URL + `/wallet/statusHandler`,
    CREATE_WALLET_TRAN_API : BASE_URL + `/wallet/createWalletTran`,
    GET_WALLET_TRANS_DATA_API : BASE_URL + `/wallet/getWalletTrans`,
    DELETE_WALLET_TRANS_API : BASE_URL + `/wallet/deleteWalletTran`,
} 

export const creditEndpoints = {
    CREATE_CREDIT_API : BASE_URL + `/credit/createCredit`,
    GET_CREDIT_DATA_API : BASE_URL + `/credit/getCreditData`,
    CREATE_CREDIT_TRAN_DATA_API : BASE_URL + `/credit/creatCreditTran`,
    GET_CREDIT_TRAN_DATA_API : BASE_URL + `/credit/getCreditTranData`,
    DELETE_CREDIT_TRAN_DATA_API : BASE_URL + `/credit/deleteCreditTranData`,
}

export const fuelEndpoints = {
    GET_MS_DATA_API: BASE_URL + `/ms/`,
    GET_SPEED_DATA_API: BASE_URL + `/speed/`,
    GET_HSD_DATA_API: BASE_URL + `/hsd/`,
}

export const bankEndpoints = {
    CREATE_BANK_API : BASE_URL + "/bank/createBank",
    GET_BANK_DATA_API : BASE_URL + "/bank/getBankData",
    CHANGE_BANK_STATUS_API : BASE_URL + "/bank/changeStatus",
    DELETE_BANK_API : BASE_URL + "/bank/deleteBank",
    
    CREATE_BANK_TRAN_API : BASE_URL + "/bank/createBankTran",
    GET_BANK_TRAN_DATA_API: BASE_URL + "/bank/getBankTranData",
    DELETE_BANK_TRAN_API : BASE_URL + "/bank/deleteBankTran",
}