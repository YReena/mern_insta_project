import * as api from '../api';
import {AUTH} from '../contants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
    try {

        const { data } = await api.signIn(formData);
         console.log(data);
        dispatch({ type: AUTH, payload: data })
        navigate("/");
    }
    catch (error) {
        console.log(error);
    }
}
export const signup = (formData, navigate) => async (dispatch) => {
    try {
         console.log("reena");
         const { data } = await api.signUp(formData);
         console.log(data);
         dispatch({ type: AUTH, payload: data })
         navigate("/");
    } 
    catch (error) {
        console.log(error);
    }
}