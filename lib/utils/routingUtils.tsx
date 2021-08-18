import Link from 'next/link'
import { styled } from '@linaria/react'

export interface NavbarPage {
    label: string
    route: string
}

export const NavbarLink = styled.a`
    all: unset;
    cursor: pointer;
    font-size: 85%;
    border-radius: 4px;
    padding: 0.5rem;
    transition: background 0.2s ease-in;
    color: white;
    font-weight: 400;
`

export const navbarPagesToLinks = (pages: NavbarPage[]) =>
    pages.map((page) => (
        <Link passHref href={page.route} key={page.route}>
            <NavbarLink>{page.label}</NavbarLink>
        </Link>
    ))
