import React from 'react'
import { styled } from '@linaria/react'
import Loader from 'react-loader-spinner'
import { linariaTheme } from '../../lib/theme/styled-theme'

const FullpageLoader = () => (
    <LoaderWrapper>
        <Loader type='BallTriangle' color='#00BFFF' height={100} width={100} />
    </LoaderWrapper>
)

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: ${linariaTheme.colors.background};
`

export default FullpageLoader
