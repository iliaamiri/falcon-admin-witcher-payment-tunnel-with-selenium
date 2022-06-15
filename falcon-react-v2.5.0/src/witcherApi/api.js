import axios from 'axios';
import querystring from 'querystring';
import { witcherApiServerAddress as apiServerAddress, witcherApiSecretKey as secretKey } from '../config.js';

// get this token bearer from localstorage or some shit.
const tokenBearer = localStorage.getItem("tokenBearer");


const AuthorizationHeaders = {
    'Authorization': `Bearer ${tokenBearer}`,
}

export const auth = {
    authenticate: () =>
        axios.post(`${apiServerAddress}/auth/token`, {secret: secretKey }, {headers: AuthorizationHeaders}),
    isAuthenticated: function () {
      return this.authenticate().then(res => res.data?.status)
    },
    login: (api_key) =>
        axios.post(`${apiServerAddress}/auth/login`, {api_key: api_key, secret: secretKey}),
    saveToken: (token) =>
        localStorage.setItem('tokenBearer', token),
    logout: () =>
        axios.post(`${apiServerAddress}/auth/logout`, {secret: secretKey}, {headers: AuthorizationHeaders}),
}

export const reports = {
    get: (params) =>
        axios.get(`${apiServerAddress}/reports?${querystring.stringify(params)}`, {headers: AuthorizationHeaders}),
}

export const statistics = {
    getTodayTotalIncome: () =>
        axios.get(`${apiServerAddress}/statistics/today/totalIncome`, {headers: AuthorizationHeaders}),
    getYesterdayTotalIncome: () =>
        axios.get(`${apiServerAddress}/statistics/yesterday/totalIncome`, {headers: AuthorizationHeaders}),
}

export default [
    auth,
    reports,
    statistics
];