import {AUTH_TOKEN_KEY, AUTH_USER_KEY} from '../data/constants';
import * as validate from 'validate.js';


import axios from 'axios';

export const getToken = (): string | undefined => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token && validate.isDefined(token)) {
        return token;
    }
    return;
};


type CallbackFunction = (data?: any) => void;
type ErrorCallback = (err: any) => void;
type EndCallback = (data?: any) => void;

export const handleError = (err: any = {}) => {
    console.log(err);
};


export const get = (
    url: string,
    callBack: CallbackFunction,
    errorCallBack?: ErrorCallback,
    endCallBack?: EndCallback
) => {
    console.log(`GET ${url}`)
    axios.get(url, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: 'application/json'
        }
    })
        .then((response) => response.data)
        .then(callBack)
        .catch(errorCallBack || handleError)
        .finally(endCallBack);
};

export const search = (
    url: string,
    data: any,
    callBack: CallbackFunction,
    errorCallBack?: ErrorCallback,
    endCallBack?: EndCallback
) => {
    console.log(`GET ${url}`)
    axios.get(url, {
        params: data,
        headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: 'application/json'
        }
    })
        .then((response) => response.data)
        .then(callBack)
        .catch(errorCallBack || handleError)
        .finally(endCallBack);
};


export const post = (
    url: string,
    data: any,
    callBack: CallbackFunction,
    errorCallBack?: ErrorCallback,
    endCallBack?: EndCallback
) => {

    axios.post(url, data, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.data)
        .then(callBack)
        .catch(errorCallBack || handleError)
        .finally(endCallBack);
};

export const postFile = (
    url: string,
    data: any,
    callBack: CallbackFunction,
    errorCallBack?: ErrorCallback,
    endCallBack?: EndCallback
) => {
    axios.post(url, data, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.data)
        .then(callBack)
        .catch(errorCallBack || handleError)
        .finally(endCallBack);
};

export const put = (
    url: string,
    data: any,
    callBack: CallbackFunction,
    errorCallBack?: ErrorCallback,
    endCallBack?: EndCallback
) => {
    axios.put(url, data, {
        headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.data)
        .then(callBack)
        .catch(errorCallBack || handleError)
        .finally(endCallBack);
};

export const del = (
    url: string,
    callBack: CallbackFunction,
    errorCallBack?: ErrorCallback,
    endCallBack?: EndCallback
) => {
    axios.delete(url, {
        headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: 'application/json'
        }
    })
        .then((response) => response.data)
        .then(callBack)
        .catch(errorCallBack || handleError)
        .finally(endCallBack);
};
