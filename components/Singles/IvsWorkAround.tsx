import React, { FunctionComponent, useEffect, useRef } from 'react'
import { styled } from '@linaria/react'

export interface IAmazonIVSWorkaround {
    streamUrl: string
}

const AmazonIVSWorkaround: FunctionComponent<IAmazonIVSWorkaround> = ({ streamUrl }) => {
    useEffect(() => {
        const script = document.createElement('script')

        script.src = 'https://player.live-video.net/1.0.0/amazon-ivs-player.min.js'
        script.async = true

        document.body.appendChild(script)

        script.onload = () => {
            // @ts-ignore
            if (IVSPlayer.isPlayerSupported) {
                // @ts-ignore
                const player = IVSPlayer.create()
                player.attachHTMLVideoElement(document.getElementById('video-player'))
                player.load(streamUrl)
                player.play()
            }
        }

        return () => {
            document.body.removeChild(script)
        }
    }, [])

    return (
        <StyleProvider>
            <video id='video-player' height={700} playsInline autoPlay controls />
        </StyleProvider>
    )
}

const StyleProvider = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    video {
        height: 700;
    }
`

export default AmazonIVSWorkaround
