import { baseUrl } from '../../../website-config'
import { getWithExpiry } from '../../utils/auth'

export interface ISignUpResponse {
    AccessToken: string
    ExpiresIn: number
    IdToken: string
    RefreshToken: string
    TokenType: string
}

export interface AuthError {
    message: string
}

export const signUp = async (email: string, password: string): Promise<ISignUpResponse> => {
    const url = `${baseUrl}signUp`
    const options = {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            avatar: 'NO_AVATAR',
            bgColor: 'DEFAULT',
            channelType: 'STANDARD',
            channelLatencyMode: 'LOW',
        }),
    }

    const response = await fetch(url, options)
    if (response.status === 201) {
        const json = await response.json()

        return json.AuthenticationResult
    } else {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
}

export const signIn = async (email: string, password: string): Promise<any> => {
    const url = `${baseUrl}auth`
    const options = {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    }

    const response = await fetch(url, options)
    if (response.status === 200) {
        const json = await response.json()
        return json
    } else {
        throw new Error('Unable to signin')
    }
}

export const getUser = async (): Promise<any> => {
    const accessToken = getWithExpiry('session')
    // @ts-ignore
    console.log(JSON.parse(accessToken).value)
    if (accessToken && JSON.parse(accessToken).value) {
        if (JSON.parse(accessToken).value.AuthenticationResult) {
            const url = `${baseUrl}user?access_token=${encodeURIComponent(
                JSON.parse(accessToken).value.AuthenticationResult.AccessToken,
            )}`
            const response = await fetch(url)
            if (response.ok) {
                return response.json()
            } else throw new Error('Access token Expired')
        } else if (JSON.parse(accessToken).value.AccessToken) {
            const url = `${baseUrl}user?access_token=${encodeURIComponent(JSON.parse(accessToken).value.AccessToken)}`
            const response = await fetch(url)
            if (response.ok) {
                return response.json()
            } else throw new Error('Access token Expired')
        } else {
            throw new Error('Access Token Not Found')
        }
    } else {
        throw new Error('Access Token Not Found')
    }
}
