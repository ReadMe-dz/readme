import Types from '../Types'

const auth = (store = {}, action) => {
    switch (action.type) {
        case Types.SIGN_IN: return {
            ...store,
            token: action.payload.token,
            user: action.payload.user
        }

        default: return {}
    }
}

export default auth