import React, { FunctionComponent, Fragment, useEffect, useState } from 'react'
import { styled } from '@linaria/react'
import { baseUrl } from '../../website-config'
import AmazonIVSWorkaround from './IvsWorkAround'

interface IChannel {}

const Channel: FunctionComponent<IChannel> = ({}) => {
    const [videoStream, setVideoStream] = useState('')

    useEffect(() => {
        getCurrentStreamInfo('test6')
    }, [])

    const getCurrentStreamInfo = async (username: string) => {
        try {
            const url = `${baseUrl}`

            const response = await fetch(url)
            if (response.status === 200) {
                const json = await response.json()
                const streams = json
                const currentStream = streams.filter((stream: any) => stream.username === username)
                const playbackUrl = currentStream[0].channel.channel.playbackUrl
                console.log(playbackUrl)
                setVideoStream(playbackUrl)
                return currentStream
            } else {
                throw new Error('Unable to get live streams.')
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return <Fragment>{videoStream && <AmazonIVSWorkaround streamUrl={videoStream} />}</Fragment>
}

export default Channel
