import React, { FunctionComponent, Fragment, HTMLProps, ButtonHTMLAttributes } from 'react'
import { styled } from '@linaria/react'
import { linariaTheme } from '../../lib/theme/styled-theme'
import Loader from 'react-loader-spinner'

interface IButton {
    background?: string
    p?: number
    m?: number
    rounded?: boolean
    loading?: boolean
}

const Button: FunctionComponent<IButton & ButtonHTMLAttributes<HTMLButtonElement>> = ({
    background = linariaTheme.colors.primary,
    p = 1,
    m = 1,
    rounded = true,
    loading = false,
    children,
    ...props
}) => {
    return (
        <StyledButton rounded={true} m={m} p={p} background={background} {...props}>
            {!loading ? children : <Loader type='Oval' color='white' height={26} width={26} />}
        </StyledButton>
    )
}

const StyledButton = styled.button<IButton & ButtonHTMLAttributes<HTMLButtonElement>>`
    all: unset;
    cursor: pointer;
    background: ${({ background }) => (background ? background : '')};
    color: white;
    padding: ${(props) => `${props.p}rem`};
    margin: ${(props) => `${props.p}rem`};
    border-radius: ${({ rounded }) => {
        if (rounded) return `45px`
        return ''
    }};
    text-align: center;
    font-weight: 700;
`

export default Button
