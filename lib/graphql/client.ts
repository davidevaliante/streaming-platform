import axios, { AxiosInstance } from 'axios'

class AquaClient {
    axios: AxiosInstance

    constructor(
        public baseURL: string = 'https://strapi-7mdb.onrender.com/graphql',
        public headers?: string,
    ) {
        this.axios = axios.create({ baseURL })
    }

    //@ts-ignore
    query({ query, variables }) {
        return this.axios.post('', {
            query,
            variables,
        })
    }

    //@ts-ignore
    mutation({ mutation, variables }) {
        return this.axios.post('', {
            query: mutation,
            variables,
        })
    }
}

export default AquaClient
