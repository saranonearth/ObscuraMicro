export default function (state, action) {
    const {
        type,
        payload
    } = action;
    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                isAuth: true,
                    user: payload.user
            }
            case 'LOGOUT':
                return {
                    ...state,
                    isAuth: false,
                        user: null
                }
                case "USER":
                    return {
                        ...state,
                        user: {
                            ...payload
                        }
                    }
                    case "ONBOARD":
                        return {
                            ...state,
                            isAuth: true,
                                user: {
                                    ...state.user,
                                    ...payload
                                }
                        }
                        default:
                            return state
    }
}