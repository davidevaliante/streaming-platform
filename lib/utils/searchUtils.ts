import { SearchIndex } from 'algoliasearch'
import delay from 'lodash/delay'
import { websiteCountryCode } from '../../website-config'
import { AlgoliaSearchResult } from '../../graphql/schema'

export const initializeAlgoliaSearchIndex = (onAlgoliaClientInitialized: (index: SearchIndex) => void) => {
    import('algoliasearch').then((algoliasearch) => {
        // TODO change to env variables
        const client = algoliasearch.default('92GGCDET16', 'fcbd92dd892fe6dc9b67fce3bf44fa04')
        const index = client.initIndex('entities')
        onAlgoliaClientInitialized(index)
    })
}

export const algoliaSearch = (
    searchString: string,
    searchIndex: SearchIndex,
    previousSearchId: number | undefined,
    onSearchResults: (results: AlgoliaSearchResult[]) => void,
    onNewSearchTimerCreated: (newTimerId: number) => void,
) => {
    clearTimeout(previousSearchId)
    console.log(searchString)
    const newTimer = delay(async () => {
        const results = await searchIndex.search(searchString, {
            filters: `country:${websiteCountryCode}`,
        })

        const searchResults: AlgoliaSearchResult[] = results.hits.map((obj: any) => {
            return {
                name: obj.name,
                type: obj.type,
                slug: obj.slug,
                country: obj.country,
                link: obj.link,
                image: obj.image,
                bonuses: obj.link,
                rating: obj.rating,
                mainBonus: {
                    link: obj.link,
                },
            }
        })
        onSearchResults(searchResults)
    }, 400)
    onNewSearchTimerCreated(newTimer)
}
