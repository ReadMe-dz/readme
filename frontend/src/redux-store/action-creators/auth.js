import Types from '../Types'

export const signin = (token, user) => ({ type: Types.SIGN_IN, payload: { token, user } })