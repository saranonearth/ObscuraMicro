import {
    createContext
} from 'react'

const Store = createContext({
    user: null,
    isAuth: false,
    loading: true
})

export default Store;