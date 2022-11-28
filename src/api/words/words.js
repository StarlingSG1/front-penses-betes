import axios from 'axios';

export async function getWordsForUser(token) {
    const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LOCALURL}/words`,
        token
    );
        return response.data;
}

export async function createWord(payload) {
    const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LOCALURL}/words/create`,
        payload
    );
        return response.data;
}

export async function deleteWord(payload) {
    const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LOCALURL}/words/delete`,
        payload
    );
        return response.data;
}

export async function updateWord(payload) {
    const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LOCALURL}/words/update`,
        payload
    );
        return response.data;
}