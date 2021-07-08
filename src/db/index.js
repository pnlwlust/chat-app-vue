
const DB_NAME = "CHAT_APP_XX"
const ltg = {
    getItem: (key) => {
        const item = window.localStorage.getItem(DB_NAME)
        console.log(`**********Get db for key '${key}'********`)
        if(item){
            console.log(JSON.parse(item)[key])
            return JSON.parse(item)[key]
        }
        return ''
    },
    setItem: (key, value) => {
        const data = ltg.getItem(DB_NAME) || {}
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
    getAllMessages : () =>{
        const messages = ltg.getItem(CHAT_KEY_NAME)
        return messages || []
    },
    getMessagesByUsername : (username) =>{
        const messages = ltg.getItem(CHAT_KEY_NAME)
        if(messages) return messages[username]
        return []
    },
    addMessageToUsername : (username, message) =>{
        const messages = db.getMessagesByUsername(username)
        messages.push(message)
        const data = {}
        data[username] = messages
        console.log("adding to db")
        console.log(data)
        return ltg.setItem(CHAT_KEY_NAME, data)
    },
    removeMessageByUsername : (username) =>{
        const data = {}
        data[username] = []
        return ltg.setItem(CHAT_KEY_NAME, data)
    },
}
