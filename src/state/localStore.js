const TOKEN = 'TOKEN'

export function getToken () {
  return localStorage.getItem(TOKEN)
}

export function setToken (token) {
  localStorage.setItem(TOKEN, token)
}

export function deleteToken () {
  localStorage.removeItem(TOKEN)
}
