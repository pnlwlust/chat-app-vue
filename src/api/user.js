import callApi from '../config/axios.config.js'

export function login(data) {
/*
    return request({
        url: '/users/login',
        method: 'post',
        data
    })
*/
    return data
}

export function register(data) {
        return callApi({
            url: '/users/register',
            method: 'post',
            data
        })
}

export function getUserProfile(token) {
    return callApi({
        url: '/users/profile',
        method: 'get',
        params: { token }
    })
}
export function getUserDetails(token) {
    return callApi({
        url: '/users/details',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return callApi({
        url: '/users/logout',
        method: 'post'
    })
}