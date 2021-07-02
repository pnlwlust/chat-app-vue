import callApi from '../config/axios.config.js'

export function login(data) {
    console.log("Inside login api call")
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

export function getUserProfile() {
    return callApi({
        url: '/users/profile',
        method: 'get'
    })
}
export function getUserDetails() {
    return callApi({
        url: '/users/details',
        method: 'get'
    })
}

export function logout() {
    return callApi({
        url: '/users/logout',
        method: 'post'
    })
}