import * as api from '@/api/user'
import {resetRouter} from "../../router";
import  tokenService  from '../../utils/token.service'
import {connectWithUsername} from "../../utils/socket.service";
import alertmessage from "../../utils/alertmessage";
import {db} from "../../db";

const state = {
    jwtToken: tokenService.getJwtToken(),
    statusMessage: '',
    isLoggedIn: false,
    profile: {userId:'', username:'', name: "profile name", avatar: "../assets/images/logo.png"},
}

const mutations = {
    setJWT: (state, jwtToken) => {
        state.jwtToken = jwtToken
    },
    setProfile: (state, profile) => {
        state.profile = profile
    },
    updateProfile: (state, data) => {
        state.profile = {...state.profile, ...data}
    },
    setUsername: (state, username) => {
        state.profile.username = username
    },
    setName: (state, name) => {
        state.profile.name = name
    },
    setAvatar: (state, avatar) => {
        state.profile.avatar = avatar
    },
    setLoggedIn: (state) => {
        state.isLoggedIn = true
    },
    setLoggedOut: (state) => {
        state.isLoggedIn = false
    },
    statusMessage: (msg) =>{
        state.statusMessage = msg;
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
            tokenService.setJwtToken(token)
            commit('setJWT', token)
            commit('setLoggedIn')
            commit("setUsername", response.username)
            commit("setName", response.name)
            db.setProfile(response)
            connectWithUsername(response.username)
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
                    alertmessage("Successfully registered")
                    commit('setJWT', response.token)
                    commit('setLoggedIn')
                    commit("setUsername", response.username)
                    // connectWithUsername(response.username)
                    resolve()
                }).catch(error => {
                alertmessage(error)
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
                commit('setProfile', data)
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