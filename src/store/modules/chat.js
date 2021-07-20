import {db} from "../../db";
import * as api from '../../api/chat.js'
import * as userApi from '../../api/user.js'

const state = {
    chatHistory:[],
    receiverProfile: {},
    senderProfile: {},
    recentChats: [],
    allContacts:[],
    activeUsers:[],
    chatSidebar:{
        activeTab:''
    }
}

const mutations = {
    setChatHistory: (state, chatHistory) => {
        state.chatHistory = chatHistory
    },
    setRecentChats: (state, recentChats) => {
        state.recentChats = recentChats
    },
    setAllContacts: (state, allContacts) => {
        state.allContacts = allContacts
    },
    setReceiverProfile: (state, profile) => {
        state.receiverProfile = profile
    },
    setSenderProfile: (state, profile) => {
        state.senderProfile = profile
    },
    addToChatHistory: (state, msg) => {
        console.log(msg)
        if(msg.sender)
            state.chatHistory.push(msg)
    },
    addActiveUsers: (state, data) => {
        state.activeUsers.push(data);
    },
    setActiveUsers: (state, data) => {
        state.activeUsers = data;
    }
}

const actions = {
    initRecentChats({ commit }) {
        console.log("Init recent chats")
        /*
                return new Promise(resolve => {
                    let accessedRoutes
                    if (roles.includes('admin')) {
                        accessedRoutes = asyncRoutes || []
                    } else {
                        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                    }
                    commit('SET_ROUTES', accessedRoutes)
                    resolve(accessedRoutes)
                })
        */
        const recentMsg = []
        const allMessages = db.getAllMessages()
        for(const item in allMessages){
            const profile = {}
            profile.username = item
            profile.msg = allMessages[item][0].msg
            recentMsg.push(profile)
        }

        console.log(recentMsg)
        commit('setRecentChats', recentMsg)
    },
    async fetchChatHistory({ commit }, item) {
        commit('setReceiverProfile',item.sender)
        console.log("Chat history from api for")
        console.log(item)
        const messages = await api.fetchChatHistory({userID: item.sender.userID})
        commit('setChatHistory', messages.chats)
    },
    async fetchAllContacts({ commit }) {
        try{
            console.log("Inside fetch all contacts")
            const response = await userApi.listContacts()
            commit('setAllContacts',response.users)
            return response
        }
        catch(error) {
            console.log(error)
        }
    },
    saveMessage({commit}, msg){
        db.addMessageToUsername(msg.receiver.username, msg)
        commit('addToChatHistory',msg)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
