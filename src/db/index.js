
const DB_NAME = "CHAT_APP_XX"
const ltg = {
    getItem: (key) => {
        const item = window.localStorage.getItem(DB_NAME)
        console.log(`**********Get db for key '${key}'********`)
        if(item){
            console.log(JSON.parse(item)[key])
            return JSON.parse(item)[key]
        }
        return {}
    },
    setItem: (key, value) => {
        const item = window.localStorage.getItem(DB_NAME)
        let data = {}
        if(item) { data = JSON.parse(item) }
        data[key] = value
        return window.localStorage.setItem(DB_NAME, JSON.stringify(data))
    },
    removeItem: (key) => {
        const item = window.localStorage.getItem(DB_NAME)
        item[key] = ''
        return ltg.setItem(DB_NAME, item)
    }
}

const username = (ltg.getItem('profile') && ltg.getItem('profile').username) || ''
const CHAT_KEY_NAME = "msg_" + username;
export const db = {

    getProfile: () => {
     return ltg.getItem('profile')
    },
    setProfile: (profile) => {
        ltg.setItem('profile', profile)
    },
    setProfileForUsername: (username, profile) => {
        const data = db.getDataByUsername(username)
        if(!data.profile){
            data["profile"] = profile
            return ltg.setItem(CHAT_KEY_NAME, data)
        }
    },
    getAllMessages : () =>{
        const messages = ltg.getItem(CHAT_KEY_NAME)
        return messages || []
    },
    getDataByUsername: (username) => {
        const data = ltg.getItem(CHAT_KEY_NAME)
        if(data) return data[username] || {}
        return {}
    },
    getMessagesByUsername : (username) =>{
        const data = db.getDataByUsername(username)
        if(data) return data['messages'] || []
        return []
    },
    addMessageToUsername : (username, message) =>{
        const data = db.getDataByUsername(username)
        data['message']? data['messages'].push(message): data['message'] = [message]
        console.log("adding to db")
        console.log(data)
        return ltg.setItem(CHAT_KEY_NAME, data)
    },
    removeMessageByUsername : (username) =>{
        const data = {}
        data[username] = []
        return ltg.setItem(CHAT_KEY_NAME, data)
    },
    getSessionId: () => {
        return ltg.getItem("sessionId")
    },
    setSessionId: (sessionId) => {
    return ltg.setItem("sessionId", sessionId)
}
}
