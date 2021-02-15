import { axiosWithAuth, axiosWithoutAuth } from "../utils/axios";


export const signup = async ({
    first_name, 
    last_name,
    email,
    password,
    role }) => {
   
        try {
            const result = await axiosWithoutAuth().post('/auth/signup', 
        {
            first_name,
            last_name,
            email,
            password,
            role
        });
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}


export const login = async ({email, password }) => {
    try {
        const result = await axiosWithoutAuth().post('/auth/login', 
        {
            email,
            password
        });
        console.log(result.data);
    } catch (error) {
        console.log(error);
    }
}

export const logout = async () => {
    try {
        await axiosWithAuth().get('/auth/logout');
    } catch( error) {
        console.log(error);
    }
}