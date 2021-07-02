import Cookies from 'js-cookie'

const key = 'XYW-CHAT-APP'

export default {

    getJwtToken:() =>{ return Cookies.get(key) },
    setJwtToken : (token)=> { return Cookies.set(key, token) },
    clearJwtToken: () => { return Cookies.remove(key) }
}

export const localStrg = {

    getJwtToken : () =>{ return localStorage.getItem(key)},
    setJwtToken : (token) =>{ return localStorage.setItem(key, token)},
    clearJwtToken : () =>{ return localStorage.removeItem(key)},
}