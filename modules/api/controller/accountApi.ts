import { accountInfo } from './../declaration/response.d'
import graphQlModule from '../core/graphQL'
import inputsObject from '../core/graphQL/input'
import mutationObject from '../core/graphQL/mutation'
import restModule from '../core/request'
import { statusCodeShouldBe } from '../utils/apiUtils'

class accountApi {
  public endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  private detectEndpoint() {
    if (this.endpoint.includes('hk')) {
      this.endpoint = process.env.AUTHENTICATION_ENDPOINT_HK
    } else {
      this.endpoint = process.env.AUTHENTICATION_ENDPOINT_SG
    }
    return this.endpoint
  }

  public async login(email: string, password: string) {
    const endpoint = this.detectEndpoint()
    const payload = { email: `${email}`, password: `${password}` }
    const response = await restModule.sendPost(`${process.env.AUTHENTICATION_ENDPOINT}`, payload, { origin: `${process.env.HOST}` })
    return response
  }

  /**
   * create new account
   * @param email
   * @param firstName
   * @param lastName
   * @param password
   * @param country
   * @param locale
   * @returns
   */
  public async createNewAccount(email: string, firstName: string, lastName: string, password: string, country: string, locale: string) {
    const payload = await inputsObject.inputCreateUser(email, firstName, lastName, password, country, locale)
    const response = await graphQlModule.requestGraphQL(mutationObject.userObjectRegister, payload, 'POST')
    return response
  }

  /**
   * get account accountInfo
   *
   */
  public async getAccountInfo(accessToken: string = '') {
    const response = await graphQlModule.queryGraphQL({ query: mutationObject.userObjectInfo, input: '{}', token: accessToken })
    return response
  }
}

export default accountApi
