import React, { FunctionComponent } from 'react'
import { styled } from '@linaria/react'
import Layout from './../Layout'
import { linariaTheme } from '../../lib/theme/styled-theme'
import { useRouter } from 'next/dist/client/router'

interface ISignInSignUpChoice {}

const SignInSignUpChoice: FunctionComponent<ISignInSignUpChoice> = ({}) => {
    const router = useRouter()

    return (
        <Layout>
            <FormWrapper>
                <CardContainer
                    onClick={() => router.push('/sign-in')}
                    hoverColor={linariaTheme.colors.green}
                    style={{ marginRight: '4rem' }}>
                    <h1>Sign in</h1>
                    <img width={100} height={100} src='/ico/sign-in.svg' />
                    <p>Sign in using the Email and Password you signed up with and start Streaming !</p>
                </CardContainer>
                <CardContainer onClick={() => router.push('/sign-up')} hoverColor={linariaTheme.colors.blue}>
                    <h1>Sign up</h1>
                    <img width={100} height={100} src='/ico/signup.svg' />
                    <p>Sign up by providing a valid Email and a password !</p>
                </CardContainer>
            </FormWrapper>
        </Layout>
    )
}

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`

const CardContainer = styled.div<{ hoverColor: string }>`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 300px;
    padding: 2rem;
    background: ${linariaTheme.colors.backgroundDark};
    border-radius: 8px;
    box-shadow: 0px 0px 15px 5px black;
    transition: box-shadow 0.3s ease;

    :hover {
        box-shadow: ${({ hoverColor }) => `0px 0px 15px 5px ${hoverColor}`};
    }

    img {
        margin: 1rem 0rem;
    }

    h1 {
        font-size: 20px;
        font-weight: 700;
        text-align: center;
    }

    p {
        margin-top: 1rem;
        text-align: center;
        line-height: 1.3rem;
        font-size: 12px;
    }
`

export default SignInSignUpChoice
