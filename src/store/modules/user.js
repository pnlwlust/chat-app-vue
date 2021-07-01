import * as api from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
    jwtToken: getToken(),
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
        console.log("Inside login action")
        console.log(userInfo)
           try{
            const response = await api.login({ username: username.trim(), password: password })
                const data = response
               const tkn = data.token || 12345
                commit('setJWT', tkn)
                commit('setLoggedIn')
                setToken(tkn)
                return response
            }
            catch(error) {
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
                reject(error)
            })
        })
    },
    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            api.getInfo(state.token).then(response => {

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
                removeToken()
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