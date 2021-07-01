const state = {
    logs: []
}

const mutations = {
    addError: (state, log) => {
        state.logs.push(log)
    },
    clearErrors: (state) => {
        state.logs.splice(0)
    }
}

const actions = {
    addErrorLog({ commit }, log) {
        commit('addError', log)
    },
    clearErrorLog({ commit }) {
        commit('clearErrors')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}