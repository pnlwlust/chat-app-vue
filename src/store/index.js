import {createStore} from 'vuex'
import getters from './getters'

/*
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.default
    console.log(modules)
    console.log(modulePath)
    return modules
}, {})
*/
// https://webpack.js.org/guides/dependency-management
const modules = {};
function importAll(r) {
    r.keys().forEach((key) => {
        const moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1')
        modules[moduleName] = r(key).default
    });
    console.log(modules)
}
const moduleFiles = require.context('./modules/', true, /\.js$/);
importAll(moduleFiles);
// At build-time cache will be populated with all required modules.
const store = createStore({
    modules,
    getters
})

export default store