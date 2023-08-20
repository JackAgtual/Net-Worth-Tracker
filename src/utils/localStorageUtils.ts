export default class LocalStorageController {
  static #userDataKey = 'user'

  static saveUser(username: string) {
    localStorage.setItem(this.#userDataKey, JSON.stringify({ username }))
  }

  static loadUser(): { username: string } | undefined {
    const storedData = localStorage.getItem(this.#userDataKey)
    if (!storedData) return undefined

    return JSON.parse(storedData)
  }

  static clearUser() {
    localStorage.removeItem(this.#userDataKey)
  }
}
