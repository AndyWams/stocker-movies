import http from './httpService'
import jwt_decode from 'jwt-decode'

const apiEndpoint = '/auth'
const tokenKey = 'token'

export const Login = async (email, password) => {
  const { data: jwt } = await http.post(apiEndpoint, { email, password })
  localStorage.setItem(tokenKey, jwt)
}

export const LoginWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt)
}

export const Logout = () => {
  localStorage.removeItem(tokenKey)
}

export const GetJwt = () => {
  return localStorage.getItem(tokenKey)
}
export const GetCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey)
    return jwt_decode(jwt)
  } catch (ex) {
    return null
  }
}
http.setJwt(GetJwt())

const auth = {
  Login,
  Logout,
  LoginWithJwt,
  GetJwt,
  GetCurrentUser,
}
export default auth
