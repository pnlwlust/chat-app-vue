import axios from 'axios'
import store from '@/store'
import  tokenService  from '../utils/token.service'
import {ElMessageBox, ElMessage} from "element-plus";
import alertmessage from "../utils/alertmessage";

// create an axios instance
const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url is passed when calling api
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
axiosInstance.interceptors.request.use(
    config => {
        console.log(tokenService.getJwtToken())
        config.headers['Authorization'] = 'Bearer ' + tokenService.getJwtToken()
        return config
    },
    error => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
axiosInstance.interceptors.response.use(
    response => {
        const res = response.data
        // if the custom code is not 20000, it is judged as an error.
        if (response.status == 200 || response.status == 201) {
            return res
        }
        ElMessage({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
        })

        // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
        if (response.status === 50008 || response.status === 50012 || response.status === 50014) {
            // to re-login
            ElMessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                confirmButtonText: 'Re-Login',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                store.dispatch('user/resetToken').then(() => {
                    location.reload()
                })
            })
        }
        return Promise.reject(new Error(res.message || 'Error'))
    },
    error => {
        console.log( error.response) // for debug
        const errorMsg = error.response && error.response.data.errors
        if(errorMsg){
            Object.entries(errorMsg).map(([value], index) => {
                console.log(index, value)
                alertmessage(value)
            })
        }
        // return Promise.reject(error)
    }
)

export default axiosInstance