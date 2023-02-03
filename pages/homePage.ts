import { basePage } from './basePage'

const { I } = inject()

class Home extends basePage {
  I: CodeceptJS.I

  element = {
    menu_bar: {
      locator: `div[data-refname="menu-bar"]`,
      name: `Menu Bar on Header`,
      menusHeader: {
        home: {
          locator: 'div[data-refname="menu-item"]:nth-of-type(1)',
          name: `Home menu on Header`,
        },
        explore: {
          locator: `div[data-refname="menu-item"]:nth-of-type(2)`,
          name: `Explore menu on Header`,
        },
        plan: {
          locator: `div[data-refname="menu-item"]:nth-of-type(3)`,
          name: `Plan menu on Header`,
        },
        earn: {
          locator: `div[data-refname="menu-item"]:nth-of-type(4)`,
          name: `Earn menu on Header`,
        },
        record: {
          locator: `div[data-refname="menu-item"]:nth-of-type(5)`,
          name: `Record menu on Header`,
        },
        logo: {
          locator: `a#logoWrapper`,
          name: `Logo on Header`,
        },
      },
    },
    cartIcon: {
      locator: `button[data-refname="cart-icon"]`,
      name: `Cart icon on Header`,
    },
    profile_user_modal: {
      locator: `[data-refname="profile-dropdown"]`,
      name: `Profile User modal on Header`,
    },
  }

  constructor(I: CodeceptJS.I) {
    super()
    this.I = I
  }

  async amOnHomePage() {
    this.waitForPageLoaded()
    const currentUrl = await I.grabCurrentUrl()
    this.softAssert(async () => {
      await I.assertContain(currentUrl, '/home', 'Current URL is Home Page')
    })
  }

  async canSeeElementsOnHeader() {
    await this._canSeeMenuBar()
    await this._canSeeCartIcon()
  }

  async _canSeeMenuBar() {
    const menuBar = locate(this.element.menu_bar.locator).as(this.element.menu_bar.name)
    this.softAssert(async () => {
      await I.assertAbove(await this.isElementVisible(menuBar, this.element.menu_bar.name), 0, 'Menu Bar on Header')
    })
  }

  async _canSeeCartIcon() {
    const cartIcon = locate(this.element.cartIcon.locator).as(this.element.cartIcon.name)
    this.softAssert(async () => {
      await I.assertAbove(await this.isElementVisible(cartIcon, this.element.cartIcon.name), 0, 'Cart Icon on Header')
    })
  }

  async selectMenuOnHeader(menu: 'home' | 'explore' | 'plan' | 'records' | 'earn' | 'logo' | 'cart' | 'account') {
    let element: CodeceptJS.LocatorOrString
    switch (menu) {
      case 'home':
        element = locate(this.element.menu_bar.menusHeader.home.locator).as(this.element.menu_bar.menusHeader.home.name)
        this.click(element)
        break
      case 'explore':
        element = locate(this.element.menu_bar.menusHeader.explore.locator).as(this.element.menu_bar.menusHeader.explore.name)
        this.click(element)
        break
      case 'plan':
        element = locate(this.element.menu_bar.menusHeader.plan.locator).as(this.element.menu_bar.menusHeader.plan.name)
        this.click(element)
        break
      case 'earn':
        element = locate(this.element.menu_bar.menusHeader.earn.locator).as(this.element.menu_bar.menusHeader.earn.name)
        this.click(element)
        break
      case 'records':
        element = locate(this.element.menu_bar.menusHeader.record.locator).as(this.element.menu_bar.menusHeader.record.name)
        this.click(element)
        break
      case 'logo':
        element = locate(this.element.menu_bar.menusHeader.logo.locator).as(this.element.menu_bar.menusHeader.logo.name)
        this.click(element)
        break
      case 'cart':
        element = locate(this.element.cartIcon.locator).as(this.element.cartIcon.name)
        this.click(element)
        break
      case 'account':
        element = locate(this.element.profile_user_modal.locator).as(this.element.profile_user_modal.name)
        this.click(element)
        break
      default:
        throw new Error('Not Found Menu on Header')
        break
    }
    I.waitForNavigation({ waitUntil: 'domcontentloaded' })
  }
}
export default Home
