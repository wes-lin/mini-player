import axios from 'axios'

axios.defaults.timeout = 50000
axios.defaults.baseURL = 'https://api.github.com'

axios.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.error(error)
})

export default axios