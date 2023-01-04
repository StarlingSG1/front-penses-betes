import axios from 'axios';
import getFormattedToken from "../../helpers/getFormattedToken";

export async function getWordsForUser() {
    const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_LOCALURL}/words`,
        getFormattedToken()
    );
    return response.data;
}

export async function createWord(payload) {
    const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LOCALURL}/words/create`,
        payload,
        getFormattedToken()
    );
    return response.data;
}

export async function deleteWord(payload) {
    const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LOCALURL}/words/delete`,
        payload, getFormattedToken()

    );
    return response.data;
}

export async function updateWord(payload) {
    const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LOCALURL}/words/update`,
        payload, getFormattedToken()
    );
    return response.data;
}