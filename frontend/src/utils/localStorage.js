export const loadState = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? undefined
  } catch {
    return undefined
  }
}

export const saveState = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state))
}
