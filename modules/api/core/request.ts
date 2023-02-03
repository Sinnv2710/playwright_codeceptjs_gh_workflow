import { UserPayload } from '../utils/api'
import { isRequired, statusCodeShouldBe } from '../utils/apiUtils'
let { I } = inject()
class apiRequestModule {
  /**
   * Send GET request to REST API
   *
   * ```js
   * I.sendGet('/api/users.json');
   * ```
   * @param endpoint - String
   * @param [headers = {}] - the headers object to be sent. By default it is sent as an empty object
   * @returns response
   */
  public async sendGet({ endpoint = isRequired('endpoint'), headers = {} }): Promise<void> {
    const response = await I.sendGetRequest(endpoint, headers)
    statusCodeShouldBe(response.status, 200, 'The response status is 200')
    return response
  }

  /**
   * Sends POST request to API.
   *
   * ```js
   * I.sendPost('/api/users.json', { "email": "user@user.com" });
   *
   * // To mask the payload in logs
   * I.sendPost('/api/users.json', secret({ "email": "user@user.com" }));
   *
   * ```
   * @param [payload = {}] - the payload to be sent. By default it is sent as an empty object
   * @param [headers = {}] - the headers object to be sent. By default it is sent as an empty object
   * @returns response
   */
  public async sendPost(endpoint = isRequired('endpoint'), payload: object, headers: object): Promise<any> {
    return await I.sendPostRequest(endpoint, payload, headers)
  }

  /**
   * Sends PUT request to API.
   *
   * ```js
   * I.sendPut('/api/users.json', { "email": "user@user.com" });
   *
   * // To mask the payload in logs
   * I.sendPut('/api/users.json', secret({ "email": "user@user.com" }));
   *
   * ```
   * @param [payload = {}] - the payload to be sent. By default it is sent as an empty object
   * @param [headers = {}] - the headers object to be sent. By default it is sent as an empty object
   * @returns response
   */
  public async sendPut({ endpoint, headers = isRequired('headers'), payload = isRequired('payload') }): Promise<void> {
    const response = await I.sendPutRequest(endpoint, headers, payload)
    statusCodeShouldBe(response.status, 200, 'The response status is 200')
    return response
  }

  /**
   * Sends DELETE request to API.
   *
   * ```js
   * I.sendDelete('/api/users/1');
   * ```
   * @param [headers = {}] - the headers object to be sent. By default it is sent as an empty object
   * @returns response
   */
  public async sendDelete({ endpoint, headers = isRequired('headers') }): Promise<void> {
    const response = await I.sendDeleteRequest(endpoint, headers)
    statusCodeShouldBe(response.status, 200, 'The response status is 200')
    return response
  }
}

export default new apiRequestModule()
