import React, { FunctionComponent, useRef, useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Input from '../components/Inputs/Input'
import { Inputs } from '../lib/translations/strings'
import PasswordInput from '../components/Inputs/PasswordInput'
import { styled } from '@linaria/react'
import { linariaTheme } from '../lib/theme/styled-theme'
import Button from '../components/Buttons/Button'
import useKeyPress from './../lib/hooks/useKeyPress'
import { validateEmail, validatePassword } from './../lib/utils/validation'
import { baseUrl } from '../website-config'
import { signUp } from '../lib/api/auth/auth'
import { setWithExpiry } from '../lib/utils/auth'
import Router from 'next/dist/client/router'

interface Isignup {}

enum FormErrors {
    EMAIL_NOT_VALID = 'EMAIL_NOT_VALID',
    PASSWORD_MISMATCH = 'PASSWORD_MISMATCH',
    PASSWORD_CONSTRAINTS = 'PASSWORD_CONSTRAINTS',
}

const signup: FunctionComponent<Isignup> = ({}) => {
    const formRef = useRef(null)
    const enterPressed = useKeyPress('Enter')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [formErrors, setFormErrors] = useState<FormErrors[]>([])

    const [loading, setLoading] = useState(false)

    // useEffect(() => {
    //     if (enterPressed) handleSubmit()
    // }, [enterPressed])

    const handleSubmit = (e?: any) => {
        setFormErrors([])
        if (e) e.preventDefault()
        setLoading(!loading)
        if (formIsValid()) attemptSignUp()
    }

    const attemptSignUp = async () => {
        console.log('attempting sign up')
        try {
            const signUpResponse = await signUp(email, password)
            setWithExpiry('session', signUpResponse, signUpResponse.ExpiresIn)
            console.log('sign up successfull')
            Router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const formIsValid = () => {
        const validationsErrors: FormErrors[] = []
        if (!validateEmail(email)) validationsErrors.push(FormErrors.EMAIL_NOT_VALID)
        if (!validatePassword(password)) validationsErrors.push(FormErrors.PASSWORD_CONSTRAINTS)
        if (password !== confirmPassword) validationsErrors.push(FormErrors.PASSWORD_MISMATCH)

        if (validationsErrors.length == 0) return true
        setFormErrors(validationsErrors)
        return false
    }

    return (
        <Layout>
            <FormContainer>
                <div>
                    <SignUpForm id='ign-up-form' onSubmit={handleSubmit} ref={formRef}>
                        <Input
                            onChange={(newValue) => setEmail(newValue.currentTarget.value)}
                            hasError={formErrors.includes(FormErrors.EMAIL_NOT_VALID)}
                            value={email}
                            placeholder={Inputs.emailPlaceholder}
                        />
                        <PasswordInput
                            onChange={(newValue) => setPassword(newValue.currentTarget.value)}
                            hasError={
                                formErrors.includes(FormErrors.PASSWORD_MISMATCH) ||
                                formErrors.includes(FormErrors.PASSWORD_CONSTRAINTS)
                            }
                            value={password}
                            placeholder={Inputs.passwordPlaceholder}
                        />
                        <PasswordInput
                            onChange={(newValue) => setConfirmPassword(newValue.currentTarget.value)}
                            hasError={
                                formErrors.includes(FormErrors.PASSWORD_MISMATCH) ||
                                formErrors.includes(FormErrors.PASSWORD_CONSTRAINTS)
                            }
                            value={confirmPassword}
                            placeholder={Inputs.passwordConfirmPlaceholder}
                        />
                        <Button type='submit' loading={loading}>
                            Sign Up
                        </Button>
                    </SignUpForm>

                    <SuggestionsBox>
                        <p>Your password must meet the following requirements:</p>
                        <ul>
                            <li>At least 8 characters</li>
                            <li>Include at least 1 number</li>
                            <li>Include at least 1 special character</li>
                            <li>Include uppercase and lowercase characters</li>
                        </ul>
                    </SuggestionsBox>
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

export default signup
