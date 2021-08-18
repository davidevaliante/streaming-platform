export const injectCDN = (s: string, size: 'small_' | 'medium_' | 'large_' | 'thumbnail_' | '' = ''): string => {
    const baseUrl = 'https://spike-images.s3.eu-central-1.amazonaws.com/'
    // const cloudFrontRoot = `https://dzyz6pzqu8wfo.cloudfront.net/${size}`

    const cloudFrontRoot = `https://images.spikeslot.com/${size}`

    return s?.split(baseUrl).join(cloudFrontRoot)
}
