export default function (state, action) {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                loading: false,
                    isAuth: true,
                    user: payload.user
            }
            case 'LOGOUT':
                return {
                    ...state,
                    loading: false,
                        isAuth: false,
                        user: null
                }
                case "USER":
                    return {
                        ...state,
                        loading: false,
                            user: {
                                ...payload
                            }
                    }
                    case "ONBOARD":
                        return {
                            ...state,
                            isAuth: true,
                                loading: false,
                                user: {
                                    ...state.user,
                                    ...payload
                                }
                        }
                        case "LOADING_BEGIN":
                            return {
                                ...state,
                                loading: true
                            }
                            case "LOADING_END":
                                return {
                                    ...state,
                                    loading: false
                                }
                                default:
                                    return state
    }
}