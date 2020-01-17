import Types from '../Types'

export const signin = (token, user) => ({ type: Types.SIGN_IN, payload: { token, user } })

export const signout = () => ({ type: Types.SIGN_OUT })

export const loaduser = (token, user) => ({ type: Types.LOAD_USER, payload: { token, user } })