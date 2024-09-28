import { fuelEndpoints } from "../api";
import { apiConnector } from "../apiConnector"


const {GET_MS_DATA_API, GET_SPEED_DATA_API, GET_HSD_DATA_API} = fuelEndpoints

export const getMsData = async() => {
    let response ;
    try{
        const res = await apiConnector("GET", GET_MS_DATA_API)
        console.log("Res of GET_MS_DATA_API ", res.data);
        response = res.data
    }
    catch(error) {
        console.log("Error ", error)
    }
    return response;
}
export const getSpeedData = async() => {
    let response ;
    try{
        const res = await apiConnector("GET", GET_SPEED_DATA_API)
        console.log("Res of GET_SPEED_DATA_API ", res.data);
        response = res.data
    }
    catch(error) {
        console.log("Error ", error)
    }
    return response;
}

export const getHsdData = async() => {
    let response ;
    try{
        const res = await apiConnector("GET", GET_HSD_DATA_API)
        console.log("Res of GET_HSD_DATA_API ", res.data);
        response = res.data
    }
    catch(error) {
        console.log("Error ", error)
    }
    return response;
}