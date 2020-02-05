import {
    createContext
} from 'react'

const Store = createContext({
    user: null,
    isAuth: false,
    loading: false
})

export default Store;