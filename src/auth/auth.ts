const key = "w4nTedpReonB0aRd1NgfrOnT3ND"

export const hasToken = () => localStorage.getItem(key) !== null

export const setToken = (token: string) => localStorage.setItem(key, token)

export const removeToken = () => localStorage.removeItem(key)

const auth = { hasToken, setToken, removeToken };

export default auth;