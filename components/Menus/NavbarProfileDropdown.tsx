import React, { FunctionComponent, Fragment, useState, useRef, useContext } from 'react'
import { styled } from '@linaria/react'
import { linariaTheme } from '../../lib/theme/styled-theme'
import useOnClickOutside from './../../lib/hooks/useOnClickOutside'
import { useRouter } from 'next/dist/client/router'
import { ModalsContext } from '../../lib/context/ModalsOpenContext'

interface INavbarProfileDropdown {}

const NavbarProfileDropdown: FunctionComponent<INavbarProfileDropdown> = ({}) => {
    const menuRef = useRef(null)
    const router = useRouter()

    const { modalsOpen, setModalsOpen } = useContext(ModalsContext)

    const [menuOpen, setMenuOpen] = useState(false)

    useOnClickOutside(menuRef, () => setMenuOpen(false))

    const handleSettings = () => setModalsOpen([...modalsOpen, 'settings'])

    const handleChannelSwitch = () => router.push('/channel/test')

    return (
        <DropdownContainer ref={menuRef}>
            <img onClick={() => setMenuOpen(!menuOpen)} src='ico/my-account.svg' />
            {menuOpen && (
                <DropDown>
                    <DropDownItem onClick={() => handleSettings()}>
                        <p>Settings</p>
                        <img className='dropdown-icon' src={'/ico/settings.svg'} />
                    </DropDownItem>
                    <DropDownItem onClick={() => handleChannelSwitch()}>
                        <p>Channel</p>
                        <img className='dropdown-icon' src={'/ico/live-channel.svg'} />
                    </DropDownItem>
                </DropDown>
            )}
        </DropdownContainer>
    )
}

const DropDownItem = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.7rem;
    transition: color 0.2s ease;

    .dropdown-icon {
        width: 30px;
        height: 30px;
        margin-left: 1rem;
    }

    :hover {
        color: ${linariaTheme.colors.blue};
    }
`

const DropdownContainer = styled.div`
    display: inline-block;
    position: relative;
    cursor: pointer;

    :hover {
        display: block;
    }

    img {
        width: 50px;
        height: 50px;
    }
`

const DropDown = styled.div`
    position: absolute;
    padding: 1rem;
    background: ${linariaTheme.colors.backgroundDark};
    margin-left: -150px;
    box-shadow: 0px 0px 6px 1px black;
`

export default NavbarProfileDropdown
