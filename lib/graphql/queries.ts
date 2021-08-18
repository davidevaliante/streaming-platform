import AquaClient from './client'

const aquaClient = new AquaClient()

const query = /* GraphQL */ `
    query ($last: Int = 25) {
        posts(imit: $last) {
            title
            PageContent {
                ... on ComponentTextText {
                    text
                }
            }
        }
    }
`
