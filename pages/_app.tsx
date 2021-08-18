import App from 'next/app'
import React, { FunctionComponent, Fragment } from 'react'
import { AuthContextProvider } from '../lib/context/AuthContext'
import './../styles/reset.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { ModalsContext, ModalsOpenContextProvider } from '../lib/context/ModalsOpenContext'

const ContextProvider: FunctionComponent = ({ children }) => {
    return (
        <Fragment>
            <AuthContextProvider>
                <ModalsOpenContextProvider>{children}</ModalsOpenContextProvider>
            </AuthContextProvider>
        </Fragment>
    )
}

class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <ContextProvider>
                <Component {...pageProps} />
            </ContextProvider>
        )
    }
}

export default MyApp
