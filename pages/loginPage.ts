import { Endpoint } from '../modules/api/utils/api'
import { basePage } from './basePage'
import { ApiController } from '../modules/api/apiController'
import { signUpUser } from '../modules/api/declaration/response'

const { I } = inject()
interface URL {
  hash: string
  host: string
  hostname: string
  href: string
  readonly origin: string
  password: string
  pathname: string
  port: string
  protocol: string
  search: string
  username: string
  toString(): string
}
interface ordinaryURL {
  NOAH_SG: 'https://noah-staging-sg.vercel.app'
  ZOEY_SG: URL
  NOAH_HK: URL
}
class Login extends basePage {
  URL: ordinaryURL
  I: CodeceptJS.I

  element = {
    loginBanner: { elementName: 'Login Banner', locator: 'h2.chakra-heading' },
    loginForm: { elementName: 'Login Form', locator: 'form.login-form' },
    emailField: { elementName: 'Email Field', locator: 'input#email' },
    passwordField: { elementName: 'Password Field', locator: 'input#password' },
    loginBtn: { elementName: 'Login Button', locator: 'button[type="submit"]' },
    forgotPasswordCTA: { elementName: 'Forgot Password CTA', locator: 'div.chakra-form-control p.chakra-text' },
  }

  constructor(I: CodeceptJS.I) {
    super()
    this.I = I
  }

  async _createAccount(email: string, password: string, domain: Endpoint, firstName: string, lastName: string, country: string, locale: string) {
    const getAccountApi = await new ApiController(I, domain['endpoint']).getAccountApi()
    const response: signUpUser = await getAccountApi.createNewAccount(email, firstName, lastName, password, country, locale)
    return response.idToken
  }

  async _registerPatient(email: string, password: string, domain: Endpoint, firstName: string, lastName: string, country: string, locale: string) {
    await this._createAccount(email, password, domain, firstName, lastName, country, locale)
    const responseCreateUser = await (await new ApiController(I, domain['endpoint']).getAccountApi()).login(email, password)
    const accessToken = responseCreateUser.data.accessToken
  }

  /**
   * Login as patient or doctor or ops admin on FE
   * @param accountType patient | doctor | ops
   */
  async loginAs(
    accountType: 'patient' | 'doctor' | 'ops',
    email: string,
    password: string,
    domain: Endpoint,
    firstName: string,
    lastName: string,
    country: string,
    locale: string,
  ): Promise<void> {
    switch (accountType) {
      case 'patient':
        this._registerPatient(email, password, domain, firstName, lastName, country, locale)
        break
      case 'doctor':
        break
      case 'ops':
        break
      default:
        throw new Error('Not found accountType to login')
    }
  }

  async shouldBeDisplayedAfterRedirected(url: ordinaryURL, textBanner) {
    this.waitForPageLoaded()
    const currentUrl = await this.getOriginURL()
    this.softAssert(async () => {
      await I.assertContain(url, currentUrl)
    })
    await this.findElement(this.element.loginBanner.locator, this.element.loginBanner.elementName)

    const loginBanner = textBanner.loginBanner
    const textOnDom = await this.getTextFrom(this.element.loginBanner.locator, this.element.loginBanner.elementName)
    this.softAssert(async () => {
      await I.assertEqualIgnoreCase(textOnDom.trim(), loginBanner.trim(), 'The Login logo is missing on Login page')
    })
  }

  async fillInLoginForm(email: string, pwd: string) {
    await this._fillEmailField(email)
    await this._fillPasswordField(pwd)
  }

  async clickLoginButton() {
    const loginBtn = locate(this.element.loginBtn.locator).as(this.element.loginBtn.elementName)
    await I.seeElementInDOM(loginBtn)
    await I.click(loginBtn)
  }

  async _fillEmailField(email: string) {
    const emailField = locate(this.element.emailField.locator).as(this.element.emailField.elementName)
    await I.clearField(emailField)
    return await I.fillField(emailField, email)
  }

  async _fillPasswordField(pwd: string) {
    const pwdField = locate(this.element.passwordField.locator).as(this.element.passwordField.elementName)
    await I.clearField(pwdField)
    return await I.fillField(pwdField, pwd)
  }

  async validateExample() {
    await this.softAssert(() => {
      I.amOnPage('https://github.com/webdriverio-boneyard/wdio-selenium-standalone-service')
    })
  }
}

export default Login
