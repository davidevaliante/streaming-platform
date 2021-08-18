export const validateEmail = (email: string) => {
    if (/^\w+([.\-+]?\w+)*@\w+([.\-+]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true
    }
    return false
}

// To check a password between 8 to 48 characters which contain at least one lowercase letter,
// one uppercase letter, one numeric digit, and one special character
export const validatePassword = (password: string) => {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,48}$/.test(password)) {
        return true
    }
    return false
}
