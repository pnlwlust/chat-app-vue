import {db} from "../../db";

const state = {
    chatHistory:[],
    receiverProfile: {},
    senderProfile: {},
    recentChats: [],
/*
    recentChats:[{id:1, username:'Bodii', name:'person name', avatar:'../assets/images/male-profile-80.png', alt:'contacts profile avatar'},
        {id:1,sender:'aaluu', name:'person one', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'how are you'},
        {id:2,sender:'three', name:'person two', avatar:'../assets/images/male-profile-80.png', alt:'contacts profile avatar', lastmsg:'this is a nice place'},
        {id:3,sender:'four',name:'person three', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'what a day'},
        {id:4,sender:'five',name:'person four', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'I am goint out'},
        {id:5,sender:'six',name:'person fivw', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'its raining'},
        {id:6,sender:'seven',name:'person six', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'are you coming today?'}
    ],
*/
    allContacts:[],
    activeUsers:[]
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
    fetchChatHistory({ commit }, item) {
        commit('setReceiverProfile',item.sender)
        console.log("Chat history from db for")
        console.log(item)
        const messages = db.getMessagesByUsername(item.username || item.sender.username)
        console.log(messages)
        commit('setChatHistory', messages)
    },
    fetchAllContacts({ commit }, item) {
        commit('setAllContacts',item)
    },
    saveMessage({commit}, msg){
        commit('addToChatHistory',msg)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
