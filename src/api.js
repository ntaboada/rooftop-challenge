
import fetch from 'node-fetch' 

const ROOFTOP_BASE_URL = 'https://rooftop-career-switch.herokuapp.com';

const GET_TOKEN_URL = (email) => `${ROOFTOP_BASE_URL}/token?email=${email}`;

const GET_BLOCKS_URL = (token) => `${ROOFTOP_BASE_URL}/blocks?token=${token}`;

const CHECK_URL = (token) => `${ROOFTOP_BASE_URL}/check?token=${token}`;

let API_TOKEN = null;

const getUserToken = async (email) => {
    const tokenResponse = await api(GET_TOKEN_URL(email), "GET");
    const token = tokenResponse?.token;
    API_TOKEN = token;
    return token;
}

const getBlocks = async (token) => {
    const blocksResponse = await api(GET_BLOCKS_URL(token), "GET");
    return blocksResponse?.data;
}

const checkBlocks = async (block1, block2, token) => {
    const requestBody = {
        blocks: [ block1, block2 ]
    };
    const checkResponse = await api(CHECK_URL(token || API_TOKEN), "POST", requestBody);
    return checkResponse?.message;
}

const verifyEncodedBlocks = async (encodedBlocks) => {
    const requestBody = {
        encoded: encodedBlocks
    };
    const checkResponse = await api(CHECK_URL(API_TOKEN), "POST", requestBody);
    return checkResponse?.message;
}

const api = async (url, method, body = null) => {
    const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const res = await response.json();
    return res;
}


const apiMethods = {
    getUserToken,
    getBlocks,
    checkBlocks,
    verifyEncodedBlocks
};

export default apiMethods;