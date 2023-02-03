let { I } = inject()
import { statusCodeShouldBe } from '../utils/apiUtils'

class GraphQLModule {
  /**
   * Send request to server
   * @param mutation - GraphQL mutation
   * @param input - GraphQL variables
   * @param method POST or PUT or DELETE
   * @returns {object} - response
   */
  public async requestGraphQL(mutation: Object, input: Object, method: 'POST' | 'PUT' | 'DELETE', token: string = '') {
    const response: any = await I.sendMutation(
      `${mutation}`,
      input,
      {},
      { method: method, origin: 'https://noah-staging-sg.vercel.app', authorization: `Bearer ${token}` },
    )
    statusCodeShouldBe(response.status, 200, 'The response status is not 2xx')
    return response.data
  }

  /**
   * Query GraphQL
   * @param query - GraphQL query
   * @param input - GraphQL variables
   * @returns {object} - response
   */
  public async queryGraphQL(options = { query: {}, input: '', token: '' }) {
    const response: any = await I.sendQuery(
      `${options.query}`,
      options.input,
      {},
      { method: 'POST', origin: 'https://noah-staging-sg.vercel.app', authorization: `Bearer ${options.token}` },
    )
    statusCodeShouldBe(response.status, 200, 'The response status is 200')
    return response.data
  }
}

export default new GraphQLModule()
