const { I } = inject()
import { Pages } from '../../../pages/pageController'
import { scenario } from '../../../configuration/runner/domainController'
import { ApiController } from '../../../modules/api/apiController'
import { accountInfo, signUpUser } from '../../../modules/api/declaration/response'
import locationFilter from '../../../resources/location'

Feature('As user, I can see the login page after redirected URL successfully')

const loginPage = new Pages(I).getLoginPage()

scenario('ETE: Customer: Home - Verify customer can login successfully', async ({ I, current }) => {
  /***
   * Filter languages depend on url access
   */
  await I.amOnPage(current.domainUrl)
  process.env.BASE_URL = current.domainUrl
  const language: object = new locationFilter(current.domainUrl).getLanguageObject()
  const userObject = await I.generateUserObject('VISA')
  const apiController = new ApiController(I, current.domainUrl)

  /**
   * Create user account by api
   */
  const email: string = userObject.profile.email
  const pwd: string = userObject.profile.password
  const firstName: string = userObject.profile.first_name
  const lastName: string = userObject.profile.last_name
  const country: string = userObject.profile.country
  const locale: string = userObject.profile.locale

  const responseSignUpUser: signUpUser = await (await apiController.getAccountApi()).createNewAccount(email, firstName, lastName, pwd, country, locale)

  const accessToken = await (await apiController.getAccountApi()).login(email, pwd)
  await I.assertEqual(accessToken.status, 201, 'Cannot login with credential is created')

  /**
   * Use account to login on FE
   */
  await loginPage.shouldBeDisplayedAfterRedirected(current.domainUrl, language)
  await loginPage.fillInLoginForm(email, pwd)
  await loginPage.clickLoginButton()
  await I.waitForNavigation({ waitUntil: 'domcontentloaded' })

  // /**
  //  * Verify home page after login successfully
  //  */
  const homepage = new Pages(I).getHomePage()
  await homepage.amOnHomePage()
  await homepage.canSeeElementsOnHeader()
})
