const getters = {
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    errorLogs: state => state.errorLog.logs,
    isLoggedIn: state => state.user.isLoggedIn,
    recentChats: state => state.chat.recentChats,
    allContacts: state => state.chat.allContacts,
    activeUsers: state => state.chat.activeUsers,
    chatHistory: state => state.chat.chatHistory,
    receiverProfile: state => state.chat.receiverProfile,
    profile: state => state.user.profile
}
export default getters