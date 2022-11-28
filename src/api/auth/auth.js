import axios from 'axios';

export async function loginUser(payload) {
    const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LOCALURL}/auth/login`,
        payload
    );
        return response.data;
}

export async function verifyToken() {
    const token = localStorage.getItem("penses-betes-token");
    if (!token) {
        return false;
    }
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_LOCALURL}/auth/me`, {token: token}
    );

    return response.data;
}   

export async function logout()  {
    localStorage.removeItem("penses-betes-token");
}

export async function registerUser(payload){
    const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LOCALURL}/auth/register`,
        payload
    );
    return response.data;
}