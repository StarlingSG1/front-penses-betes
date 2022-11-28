import axios from 'axios';

export async function getLanguages(token) {
    const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_LOCALURL}/language`,
        token
    );
        return response.data;
}

