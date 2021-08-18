export const setWithExpiry = (key: string, value: any, ttl: number) => {
    const now = new Date()
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value: value,
        expiry: now.getTime() + ttl * 1000, // ttl is in seconds
    }
    localStorage.setItem(key, JSON.stringify(item))
}

export const getWithExpiry = (key: string) => {
    return localStorage.getItem(key)
}
