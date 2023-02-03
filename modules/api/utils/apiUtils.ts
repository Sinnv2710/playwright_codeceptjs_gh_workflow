let { I } = inject()

/**
 * This function will required parameter. If not have will throw error
 * @param {*} params is a parameter that you required
 *
 * ```js
 * // example
 * async getQuoteId(token = isRequired('token')){}
 * ```
 */
export function isRequired(params: string): string {
  throw new Error(`${params} is required`)
}

/**
 * This function will check status code equal 200 and return some message (If that you need)
 * @param {number} statusCode is a status that you need to check equal 200
 * @param {number} expectedStatusCode (default = 200) is a status that you excepted
 * @param {string} message (default = null) is a message that you need to show if status equal 200
 * @param {string} messageColor (default = green) is a message color
 *
 * ```js
 * // example
 * statusCodeShouldBe(response.status, 401)
 * // or
 * statusCodeShouldBe(response.status, 401, 'Your status equal 401', 'b}lue')
 * ```
 */
export function statusCodeShouldBe(statusCode, expectedStatusCode = 200, errorObject) {
  if (statusCode !== expectedStatusCode) {
    throw new Error(`${statusCode} is not equal ${expectedStatusCode} with error message: ${errorObject.data.error.message}`)
  }
}

/**
 * This function will stop a test execution.
 * @param {number} delayInSec is a delay duration in second.
 */
export function setSleep(delayInSec) {
  const delay = delayInSec * 1000
  return new Promise((resolve) => setTimeout(resolve, delay))
}

/**
 * This function will check type of parameter is boolean or not
 * @param {*} params is a params that need to check
 * @returns {boolean} true or false
 */
export function isBoolean(params) {
  if (params === true) return true
  else return false
}
