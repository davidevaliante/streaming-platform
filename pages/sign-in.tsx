import React, { FunctionComponent, useRef, useEffect, useState, useContext } from 'react'
import Layout from '../components/Layout'
import Input from '../components/Inputs/Input'
import { Inputs } from '../lib/translations/strings'
import PasswordInput from '../components/Inputs/PasswordInput'
import { styled } from '@linaria/react'
import { linariaTheme } from '../lib/theme/styled-theme'
import Button from '../components/Buttons/Button'
import useKeyPress from './../lib/hooks/useKeyPress'
import { validateEmail, validatePassword } from './../lib/utils/validation'
import { signIn, signUp } from '../lib/api/auth/auth'
import { getWithExpiry, setWithExpiry } from '../lib/utils/auth'
import { getUser } from './../lib/api/auth/auth'
import FullpageLoader from '../components/Loaders/FullPageLoader'
import { AuthContext } from '../lib/context/AuthContext'
import { useRouter } from 'next/dist/client/router'

interface Isignup {}

enum FormErrors {
    EMAIL_NOT_VALID = 'EMAIL_NOT_VALID',
    PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
    PASSWORD_CONSTRAINTS = 'PASSWORD_CONSTRAINTS',
}

const signin: FunctionComponent<Isignup> = ({}) => {
    const { signedIn, setSignedIn } = useContext(AuthContext)
    const router = useRouter()
    useEffect(() => {
        if (signedIn) router.push('/')
    }, [signedIn])

    const formRef = useRef(null)
    const enterPressed = useKeyPress('Enter')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [formErrors, setFormErrors] = useState<FormErrors[]>([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkAccessTokenValidity()
    }, [])

    const checkAccessTokenValidity = async () => {
        try {
            const session = await getUser()
            if (session) {
                const accessToken = getWithExpiry('session')
                console.log(JSON.parse(accessToken!))

                setSignedIn(true)

                // setWithExpiry('session', session, 3600)
            }
        } catch (error) {
            console.log(error.message)
            if (error.message === 'Access Token Expired') {
                try {
                } catch (refreshError) {}
            }
        }

        setLoading(false)
    }

    const handleSubmit = (e?: any) => {
        console.log('handle submit')
        setFormErrors([])
        if (e) e.preventDefault()
        setLoading(!loading)
        if (formIsValid()) attemptSignIn()
    }

    const attemptSignIn = async () => {
        console.log('attempting sign up')
        try {
            const signUpResponse = await signIn(email, password)
            setWithExpiry('session', signUpResponse, signUpResponse.ExpiresIn)
            setSignedIn(true)
            // console.log('sign up successfull')
            // console.log(signUpResponse)
        } catch (error) {
            console.log(error)
        }
    }

    const formIsValid = () => {
        const validationsErrors: FormErrors[] = []
        if (!validateEmail(email)) validationsErrors.push(FormErrors.EMAIL_NOT_VALID)
        if (!validatePassword(password)) validationsErrors.push(FormErrors.PASSWORD_CONSTRAINTS)

        if (validationsErrors.length == 0) return true
        setFormErrors(validationsErrors)
        return false
    }

    if (loading) return <FullpageLoader />
    if (signedIn)
        return (
            <Layout>
                <h1>User is already signed in</h1>
            </Layout>
        )
    return (
        <Layout>
            <FormContainer>
                <div>
                    <SignUpForm id='sign-in-form' onSubmit={handleSubmit} ref={formRef}>
                        <Input
                            id='email-login'
                            onChange={(newValue) => setEmail(newValue.currentTarget.value)}
                            hasError={formErrors.includes(FormErrors.EMAIL_NOT_VALID)}
                            value={email}
                            placeholder={Inputs.emailPlaceholder}
                        />
                        <PasswordInput
                            id='password-login'
                            onChange={(newValue) => setPassword(newValue.currentTarget.value)}
                            hasError={
                                formErrors.includes(FormErrors.PASSWORD_MISMATCH) ||
                                formErrors.includes(FormErrors.PASSWORD_CONSTRAINTS)
                            }
                            currentPassword
                            value={password}
                            placeholder={Inputs.passwordPlaceholder}
                        />
                        <Button type='submit' loading={loading}>
                            Sign In
                        </Button>
                    </SignUpForm>
                </div>
            </FormContainer>
        </Layout>
    )
}

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`

const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    padding: 3rem;
    background: ${linariaTheme.colors.backgroundDark};
    border-radius: 8px;
    box-shadow: 0px 0px 15px 5px black;
`

const SuggestionsBox = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    padding: 1rem 3rem;
    margin-top: 2rem;
    background: ${linariaTheme.colors.backgroundDark};
    border-radius: 8px;
    box-shadow: 0px 0px 5px 1px black;

    font-size: 12px;

    p {
        font-size: 14px;
        margin-bottom: 1rem;
    }

    ul {
        list-style-type: circle;
        list-style-position: inside;

        li {
            margin: 0.5rem 0rem;
        }
    }
`

export default signin
