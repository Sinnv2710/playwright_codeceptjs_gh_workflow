let { I } = inject()

class InputObject {
  I: CodeceptJS.I

  /**
   * constructor
   * @param I
   */
  constructor(I: CodeceptJS.I) {
    this.I = I
  }

  /**
   * generate create user object for variable of graphQL
   * @param email
   * @param firstName
   * @param lastName
   * @param password
   * @param country
   * @param locale
   * @returns
   */
  async inputCreateUser(email: string, firstName: string, lastName: string, password: string, country: string, locale: string) {
    const createUser = `{
                          "input": {
                          "email": "${email}",
                          "firstName": "${firstName}",
                          "lastName": "${lastName}",
                          "password": "${password}",
                          "fromPlatformEnv": "noah",
                          "dob": null,
                          "country": "${country}",
                          "locale": "en",
                          "fbc": "",
                          "fbp": ""
                          }
                        }`
    return createUser
  }
}

export default new InputObject(I)
