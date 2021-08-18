import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../lib/context/AuthContext'
import Layout from '../components/Layout'
import Button from '../components/Buttons/Button'
import FullpageLoader from '../components/Loaders/FullPageLoader'
import { getUser } from '../lib/api/auth/auth'
import { getWithExpiry } from '../lib/utils/auth'
import { useRouter } from 'next/dist/client/router'
import SignInSignUpChoice from '../components/Singles/SignInSignUpChoice'
import Navbar from '../components/Navbar'
import Channel from '../components/Singles/Channel'

interface Itest {}

const test: FunctionComponent<Itest> = ({}) => {
    const router = useRouter()
    const { signedIn, setSignedIn, checkedAuth, setCheckedAuth } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAccessTokenValidity()
    }, [])

    const checkAccessTokenValidity = async () => {
        try {
            const user = await getUser()
            if (user) {
                const accessToken = getWithExpiry('session')
                console.log(JSON.parse(accessToken!))
                setSignedIn(true)
                // setWithExpiry('session', session, 3600)
            }
        } catch (error) {
            if (error.message === 'Access Token Not Found' || error.message === 'Access Token Expired')
                setSignedIn(false)
        }

        setLoading(false)
    }

    const signOut = () => {
        localStorage.removeItem('session')
        setSignedIn(false)
    }

    if (loading) return <FullpageLoader />
    if (!signedIn) return <SignInSignUpChoice />
    return (
        <Layout>
            <Navbar />
            <Channel />
            <Button style={{ position: 'absolute', bottom: 0, right: 0 }} onClick={signOut}>
                Sign Out
            </Button>
        </Layout>
    )
}

export default test
