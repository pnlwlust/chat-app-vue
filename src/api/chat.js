import callApi from '../config/axios.config.js'

export function fetchChatHistory(query) {
    console.log(query)
    return callApi({
        url: '/chats/chat-history',
        method: 'get',
        params: {...query}
    })
}

export function fetchRecentChats(id) {
    return callApi({
        url: '/chats/recent-chat-list',
        method: 'get',
        params: { id }
    })
}

export function createChat(data) {
    return callApi({
        url: '/chats/create',
        method: 'post',
        data
    })
}

export function updateChat(data) {
    return callApi({
        url: '/chats/update',
        method: 'post',
        data
    })
}
