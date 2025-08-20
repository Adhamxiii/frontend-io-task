import axios from 'axios'


export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_STRAPI_URL })


// api.interceptors.request.use((config) => {
// const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN
// if (token) config.headers.Authorization = `Bearer ${token}`
// return config
// })


api.interceptors.response.use(
(res) => res,
(error) => {
const status = error?.response?.status
const message = error?.response?.data?.error?.message || error.message
return Promise.reject({ status, message })
}
)