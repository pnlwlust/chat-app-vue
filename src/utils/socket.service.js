import io from "socket.io-client"
import store from "../store";
import {db} from "../db";

const socket = io('http://localhost:3000', {
    autoConnect: false
});
//for development
socket.onAny((event, ...args) => {
    console.log(event, args);
});
socket.on("users", (users) => {
    users.forEach((user) => {
        user.self = user.userID === socket.id;
        if(user.self) store.commit("user/updateProfile", user)
        // initState(user);
    });
    // put the current user first, and then sort by username
    const usersSorted = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
    });
    /*
        let userExceptMe = usersSorted.reduce(()=>{
            return true
        })
    */
    store.commit("chat/setActiveUsers", usersSorted)
});
socket.on("user-connected", (user) => {
    user.self = false;
    console.log("user connected")
    console.log(user)
    store.commit("chat/addActiveUsers", user)
    // initReactiveProperties(user);
});
socket.on("connect_error", (err) => {
    if (err.message === "invalid username") {
        console.log(err.message)
        this.usernameAlreadySelected = false;
    }
});
socket.on("new-msg", msg => {
        console.log("message received")
        console.log(msg)
        const rct = store.state.recentChats
        let recentChats = [msg]
        if(rct)
            rct.forEach((item) => {
                if(item.sender.username !== msg.sender.username) recentChats.push(item)
            })
        db.addMessageToUsername(msg.sender.username, msg)
        store.commit("chat/setRecentChats", recentChats)
        store.commit("chat/addToChatHistory", msg)
    // store.dispatch("addNewIncomingMessage", msg)
})

export default socket

export function connectWithUsername(username){
    socket.auth = {username}
    socket.connect()
}