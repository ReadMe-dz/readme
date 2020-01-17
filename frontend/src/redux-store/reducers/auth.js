import Types from '../Types'

const auth = (store = {}, action) => {
    switch (action.type) {
        case Types.SIGN_IN: return {
            ...store,
            token: action.payload.token,
            user: action.payload.user
        }

        case Types.SIGN_OUT:
            return {
                ...store,
                token: null,
                user: null
            }

        case Types.LOAD_USER: return {
            ...store,
            token: action.payload.token,
            user: action.payload.user
        }

        default: return {}
    }
}

export default auth