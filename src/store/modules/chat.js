
const state = {
    chatHistory: [
        {
            _id: 1,
            author: 'Bodii',
            avatar: '../assets/images/male-profile-80.png',
            isSelf: true,
            createdTime: new Date(),
            text: 'k xa ta halkhabar'
        },{
            _id: 2,
            author: 'aaluu',
            avatar: '../assets/images/female-profile-80.png',
            isSelf: false,
            createdTime: new Date(),
            text: 'mero sab thik xa'
        }
    ],
    contactProfile: {},
    profile: {name: "profile name", avatar: "../assets/images/logo.png"},
    recentChats:[{id:1, name:'person name', avatar:'../assets/images/male-profile-80.png', alt:'contacts profile avatar'},
        {id:1, name:'person one', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'how are you'},
        {id:2, name:'person two', avatar:'../assets/images/male-profile-80.png', alt:'contacts profile avatar', lastmsg:'this is a nice place'},
        {id:3, name:'person three', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'what a day'},
        {id:4, name:'person four', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'I am goint out'},
        {id:5, name:'person fivw', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'its raining'},
        {id:6, name:'person six', avatar:'../assets/images/female-profile-80.png', alt:'contacts profile avatar', lastmsg:'are you coming today?'}
    ]
}

const mutations = {
    setChatHistory: (state, chatHistory) => {
        state.chatHistory = chatHistory
    },
    setRecentChats: (state, recentChats) => {
        state.recentChats = recentChats
    },
    setProfile: (state, profile) => {
        state.profile = profile
    },
    setContactProfile: (state, profile) => {
        state.contactProfile = profile
    },
    addToChatHistory: (state, msg) => {
    state.chatHistory.push(msg)
},
}

const actions = {
    fetchRecentChats({ commit }) {
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
        commit('setRecentChats',[])
    },
    fetchChatHistory({ commit }, item) {
        commit('setContactProfile',item)
        commit('setChatHistory',[])
    },
    fetchProfile({ commit }) {
        commit('profile',[])
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
