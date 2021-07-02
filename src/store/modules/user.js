import * as api from '@/api/user'
import {resetRouter} from "../../router";
import  tokenService  from '../../utils/token.service'

const state = {
    jwtToken: tokenService.getJwtToken(),
    name: '',
    avatar: '',
    statusMessage: '',
    isLoggedIn: false
}

const mutations = {
    setJWT: (state, jwtToken) => {
        state.jwtToken = jwtToken
    },
    setName: (state, name) => {
        state.name = name
    },
    setAvatar: (state, avatar) => {
        state.avatar = avatar
    },
    setLoggedIn: (state) => {
        state.isLoggedIn = true
    },
    setLoggedOut: (state) => {
        state.isLoggedIn = false
    }
}

const actions = {
    // user login
    async login({ commit }, userInfo) {
        const { username, password } = userInfo
           try{
            const response = await api.login({ username: username.trim(), password: password })
                const data = response
               const token = data.token || 12345
                commit('setJWT', token)
                commit('setLoggedIn')
                tokenService.setJwtToken(token)
                return response
            }
            catch(error) {
                tokenService.clearJwtToken()
                console.log(error)
            }
    },

    register({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            api.register({...userInfo, username: userInfo.username.trim()})
                .then(response => {
                    console.log(response)
                    commit("statusMessage", "Successfully registered")
                    resolve()
                }).catch(error => {
                tokenService.clearJwtToken()
                reject(error)
            })
        })
    },
    // get user info
    getUserDetails({ commit}) {
        return new Promise((resolve, reject) => {
            api.getUserDetails().then(response => {

                const { data } = response
                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                const { name, avatar} = data

                commit('setName', name)
                commit('setAvatar', avatar)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    getUserProfile({commit}) {
        return new Promise((resolve, reject) => {
            api.getUserProfile().then(response => {

                const { data } = response
                if (!data) {
                    reject('Verification failed, please Login again.')
                }
                const { name, avatar} = data

                commit('setName', name)
                commit('setAvatar', avatar)
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    // user logout
    logout({ commit, state}) {
        return new Promise((resolve, reject) => {
            api.logout(state.token).then(() => {
                commit('setToken', '')
                tokenService.clearJwtToken()
                resetRouter()
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}