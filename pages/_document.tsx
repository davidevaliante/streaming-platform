import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { fontConfiguration, websiteLocale } from './../website-config'
import { linariaTheme } from './../lib/theme/styled-theme'

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang={websiteLocale}>
                <Head>
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />

                    <link rel='preload' as='style' href={fontConfiguration.fontUrl} />

                    <link rel='stylesheet' href={fontConfiguration.fontUrl} />
                    <link rel='shortcut icon' href='/icons/favicon.ico' />

                    <noscript>
                        <link rel='stylesheet' href={fontConfiguration.fontUrl} />
                    </noscript>

                    <meta name='theme-color' content={`${linariaTheme.colors.primary}`} />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
