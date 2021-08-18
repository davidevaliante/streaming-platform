import React, { FunctionComponent, Fragment, HtmlHTMLAttributes } from 'react'
import { styled } from '@linaria/react'
import { linariaTheme } from '../../lib/theme/styled-theme'

interface IInput {
    value: string
    hasError?: boolean
}

const Input: FunctionComponent<IInput & HtmlHTMLAttributes<HTMLInputElement>> = ({ hasError, ...rest }) => {
    return <StyledInput placeholder='hello' {...rest} hasError={hasError} autoComplete='username' />
}

const StyledInput = styled.input<{ hasError?: boolean }>`
    all: unset;
    margin: 0.5rem 0rem;
    box-sizing: border-box;
    background: white;
    padding: 0.7rem 1rem;
    color: black;
    border-radius: 25rem;
    border: ${({ hasError }) => (hasError ? `2px solid red` : `2px solid ${linariaTheme.colors.background}`)};
    transition: border 0.4s ease;

    :focus {
        border: ${({ hasError }) => (hasError ? `2px solid red` : `2px solid ${linariaTheme.colors.primary}`)};
    }

    ::placeholder {
        color: grey;
    }
`

export default Input
