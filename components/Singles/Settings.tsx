import React, { FunctionComponent, Fragment, useContext, useRef, useState, useEffect } from 'react'
import { styled } from '@linaria/react'
import { linariaTheme } from '../../lib/theme/styled-theme'
import useOnClickOutside from './../../lib/hooks/useOnClickOutside'
import { ModalsContext } from '../../lib/context/ModalsOpenContext'
import { getUser } from './../../lib/api/auth/auth'
import Loader from 'react-loader-spinner'

interface ISettings {}

const Settings: FunctionComponent<ISettings> = ({}) => {
    const containerRef = useRef(null)
    const streamKeyRef = useRef(null)
    const ingestServerRef = useRef(null)
    const [loading, setLoading] = useState(true)
    const { modalsOpen, setModalsOpen, removeModal } = useContext(ModalsContext)
    const [streamKey, setStreamKey] = useState('')
    const [ingestServer, setIngestServer] = useState('')

    useOnClickOutside(containerRef, () => removeModal('settings'))

    useEffect(() => {
        fetchUserInfo()
    }, [])

    const fetchUserInfo = async () => {
        const userInfo = await getUser()
        console.log(userInfo)
        const _streamKey = userInfo.UserAttributes[2].Value.defaultChannelDetails.streamKey.value
        const _ingestServer = userInfo.UserAttributes[2].Value.defaultChannelDetails.channel.ingestEndpoint
        setIngestServer(_ingestServer)
        setStreamKey(_streamKey)
        setLoading(false)
    }

    return (
        <Dimmer>
            {!loading ? (
                <Container ref={containerRef}>
                    <h1>Click to copy the String</h1>
                    <Row onClick={() => navigator.clipboard.writeText(`rtmps://${ingestServer}`)}>
                        <h2>Ingest Server</h2>
                        <p ref={ingestServerRef}>{`rtmps://${ingestServer}`}</p>
                    </Row>
                    <Row onClick={() => navigator.clipboard.writeText(streamKey)}>
                        <h2>Stream Key</h2>
                        <p ref={streamKeyRef}>{streamKey}</p>
                    </Row>
                </Container>
            ) : (
                <Loader type='BallTriangle' color='#00BFFF' height={100} width={100} />
            )}
        </Dimmer>
    )
}

const Row = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1rem;
    background: ${linariaTheme.colors.backgroundDark};
    margin-bottom: 1rem;
    border-radius: 6px;
    box-shadow: 0px 0px 4px 2px black;
`

const Dimmer = styled.div`
    height: 100vh;
    width: 100vw;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
`

const Container = styled.div`
    width: 800px;
    padding: 2rem;
    background: ${linariaTheme.colors.background};
    border-radius: 8px;
    box-shadow: 0px 0px 12px 3px ${linariaTheme.colors.blue};

    h1 {
        font-weight: 700;
        font-size: 20px;
        text-align: center;
        margin-bottom: 2rem;
    }

    h2 {
        font-weight: 700;
        font-size: 20px;
        min-width: 180px;
    }
`

export default Settings
