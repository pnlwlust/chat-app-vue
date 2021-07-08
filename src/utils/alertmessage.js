import {ElMessage} from "element-plus";

export default (msg) => {
    ElMessage({
        message: msg,
        type: 'error',
        duration: 10 * 1000
    })
}