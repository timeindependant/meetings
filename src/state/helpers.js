export async function fetchAsync (func) {
  const response = await func()
  if (response.ok) {
    return response.json()
  }
  throw new Error(response)
}

export async function requestAsync (func) {
  const response = await func()
  return response
}
