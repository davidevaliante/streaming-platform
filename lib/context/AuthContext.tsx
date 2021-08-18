import React, { useState, createContext, useEffect, SetStateAction } from 'react'
import { FunctionComponent } from 'react'

interface AuthContextInterface {
    signedIn: boolean
    setSignedIn: (b: boolean) => void
    checkedAuth: boolean
    setCheckedAuth: (b: boolean) => void
    auth: any
    setAuth: (a: any) => void
    userInfo: any
    setUserInfo: (a: any) => void
    showSignIn: boolean
    setShowSignIn: (b: boolean) => void
    showSignUp: boolean
    setShowSignUp: (b: boolean) => void
    showSettings: boolean
    setShowSettings: (b: boolean) => void
}

// Create Context Object
export const AuthContext = createContext<AuthContextInterface>({
    signedIn: false,
    setSignedIn: () => {},
    checkedAuth: false,
    setCheckedAuth: () => {},
    auth: {},
    setAuth: () => {},
    userInfo: {},
    setUserInfo: () => {},
    showSignIn: false,
    setShowSignIn: () => {},
    showSignUp: false,
    setShowSignUp: () => {},
    showSettings: false,
    setShowSettings: () => {},
})

// Create a provider for components to consume and subscribe to changes
export const AuthContextProvider: FunctionComponent = (props: any) => {
    const [signedIn, _setSignedIn] = useState(false)
    const [checkedAuth, _setCheckedAuth] = useState(false)
    const [auth, _setAuth] = useState<any>({})
    const [userInfo, _setUserInfo] = useState<any>({})
    const [showSignIn, _setShowSignIn] = useState(false)
    const [showSignUp, _setShowSignUp] = useState(false)
    const [showSettings, _setShowSettings] = useState(false)

    const handleSetSignedIn = (b: boolean) => {
        _setSignedIn(b)
    }
    return (
        <AuthContext.Provider
            value={{
                signedIn,
                setSignedIn: (B) => handleSetSignedIn(B),
                checkedAuth,
                setCheckedAuth: _setCheckedAuth,
                auth,
                setAuth: _setAuth,
                userInfo,
                setUserInfo: _setUserInfo,
                showSignIn,
                setShowSignIn: _setShowSignIn,
                showSignUp,
                setShowSignUp: _setShowSignUp,
                showSettings,
                setShowSettings: _setShowSettings,
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}
