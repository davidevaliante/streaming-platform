import React, { FunctionComponent, Fragment, useEffect, useState } from 'react'
import { styled } from '@linaria/react'

import { useRouter } from 'next/dist/client/router'
import Layout from '../../components/Layout'
import Channel from '../../components/Singles/Channel'
import FullpageLoader from '../../components/Loaders/FullPageLoader'

interface Iindex {}

const index: FunctionComponent<Iindex> = ({}) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const { channelName } = router.query

    useEffect(() => {
        console.log(channelName)
        if (channelName) setLoading(false)
    }, [channelName])

    useEffect(() => {
        getChannelInfo()
    }, [])

    const getChannelInfo = async () => {}

    if (loading && channelName == undefined) return <FullpageLoader />
    return (
        <Layout>
            <Container>
                {/* 
                // @ts-ignore */}
                <Channel channelName={channelName!} />
            </Container>
        </Layout>
    )
}

export const getServerSideProps = () => {
    return {
        props: {},
    }
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`

export default index
