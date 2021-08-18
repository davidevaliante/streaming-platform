import React, { FunctionComponent, Fragment } from 'react'
import { styled } from '@linaria/react'
import { linariaTheme } from '../lib/theme/styled-theme'
import NavbarProfileDropdown from './Menus/NavbarProfileDropdown'

interface INavbar {}

const Navbar: FunctionComponent<INavbar> = ({}) => {
    return (
        <NavbarContainer>
            <NavbarProfileDropdown />
        </NavbarContainer>
    )
}

const NavbarContainer = styled.div`
    display: flex;
    background: ${linariaTheme.colors.backgroundDark};
    min-height: 66px;
    padding: 1rem;
    justify-content: flex-end;
    align-items: center;
`

export default Navbar
