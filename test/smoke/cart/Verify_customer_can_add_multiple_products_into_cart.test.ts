const { I } = inject()
import { scenario } from '../../../configuration/runner/domainController'
import { condition } from '../../../pages/exploresPage'
import { Pages } from '../../../pages/pageController'
import locationFilter from '../../../resources/location'
import ProductController from '../../../resources/productDetail/productsController'
import { ApiController } from '../../../modules/api/apiController'
import { accountInfo, signUpUser } from '../../../modules/api/declaration/response'
Feature('ETE - Customer - Cart')

const loginPage = new Pages(I).getLoginPage()
const homepage = new Pages(I).getHomePage()
const exploresPage = new Pages(I).getExploresPage()
scenario('Verify customer can add multiple products into cart', async ({ I, current }) => {
  await I.amOnPage(current.domainUrl)
  process.env.BASE_URL = current.domainUrl
  const language = new locationFilter(current.domainUrl).getLanguageObject()
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
  await homepage.selectMenuOnHeader('explore')

  /*** Verify explore page after click */
  await exploresPage.canSeeElementsInExplorerPage(language.category)
  /*** Select random product in explorer page*/
  await exploresPage.getProductDetail(current.domainUrl)
  await exploresPage.verifyProductDetailIsDisplayingOnExplorePage()
})
