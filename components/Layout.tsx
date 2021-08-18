import React, { FunctionComponent, Fragment, useState, useContext } from 'react'
import { styled } from '@linaria/react'
import { linariaTheme } from '../lib/theme/styled-theme'
import Settings from './Singles/Settings'
import { ModalsContext } from './../lib/context/ModalsOpenContext'

interface ILayout {}

const Layout: FunctionComponent<ILayout> = ({ children }) => {
    const { modalsOpen } = useContext(ModalsContext)

    return (
        <Wrapper>
            {children}
            {modalsOpen.includes('settings') && <Settings />}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    min-height: 100vh;
    position: relative;
    background-color: ${linariaTheme.colors.background};
`

export default Layout
