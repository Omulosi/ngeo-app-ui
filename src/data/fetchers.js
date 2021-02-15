import { axiosWithAuth } from "../utils/axios";


export const getUser = async (url) => {
    try {
        let result = await axiosWithAuth().get(url);
        debugger;
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetcher = async (url) => {
    try {
        let result = await axiosWithAuth().get(url);
        debugger;
        return result.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}