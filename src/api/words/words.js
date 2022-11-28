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

