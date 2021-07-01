const getters = {
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    errorLogs: state => state.errorLog.logs,
    isLoggedIn: state => state.user.isLoggedIn,
    recentChats: state => state.chat.recentChats,
    chatHistory: state => state.chat.chatHistory,
    contactProfile: state => state.chat.contactProfile,
    profile: state => state.chat.profile
}
export default getters