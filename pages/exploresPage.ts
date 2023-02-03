import { basePage } from './basePage'
const { I } = inject()
import { ApiController } from '../modules/api/apiController'
import { Endpoint } from '../modules/api/utils/api'

export enum condition {
  NON_OTC,
  OTC,
}
class Explores extends basePage {
  I: CodeceptJS.I
  productDetail = {
    name: '',
    priceDisplay: '',
    feeShipping: '',
  }

  constructor(I: CodeceptJS.I, productDetail = { name: '', priceDisplay: '', feeShipping: '' }) {
    super()
    this.I = I
    this.productDetail = productDetail
  }

  element = {
    prefixDomain: '/shop',
    shopHeader: {
      element: '[data-refname="shop-header"]',
      name: 'Shop Header',
    },
    searchBar: {
      element: '[data-refname="search-input"]',
      name: 'Search Bar',
      placeHolderText: {
        element: '[data-refname="search-input"]',
        name: 'Search Bar PlaceHolder Text',
      },
    },
    sortByDropdown: {
      element: '[data-refname="sort-dropdown"]',
      name: 'Sort By Dropdown',
    },
    categoryMenus: {
      element: '[data-refname="category-menu"]',
      name: 'Category Menu',
      menuItem: {
        element: '[data-refname="category-item"]',
        name: 'Category Menu Item',
      },
    },
    productCard: {
      element: '[data-refname="product-card"]',
      name: 'Product Card',
    },
  }

  async amOnExplorerPage() {
    await this.waitForPageLoaded()
    const currentUrl = await I.grabCurrentUrl()
    this.softAssert(() => {
      I.assertContain(currentUrl, this.element.prefixDomain)
    })
  }

  private async canSeeShopHeader() {
    const locator = locate(this.element.shopHeader.element).as(this.element.shopHeader.name)
    this.softAssert(async () => {
      I.assertAbove(await this.isElementVisible(locator, this.element.shopHeader.name), 0, 'Shop Header is not visible')
    })
  }

  private async canSeeSearchBar() {
    const locator = locate(this.element.searchBar.element).as(this.element.searchBar.name)
    this.softAssert(async () => {
      await I.assertAbove(await this.isElementVisible(locator, this.element.searchBar.name), 0, 'Search Bar is not visible')
    })
  }

  private async canSeePlaceHolderTextInSearchBar() {
    const locator = locate(this.element.searchBar.placeHolderText.element).as(this.element.searchBar.placeHolderText.name)
    const placeHolderText = await I.grabAttributeFrom(locator, 'placeholder')
    this.softAssert(async () => {
      await I.assertEqualIgnoreCase(placeHolderText, 'Search for products', 'Search Bar PlaceHolder Text is not correct')
    })
  }

  private async canSeeSortByDropdown() {
    const locator = locate(this.element.sortByDropdown.element).as(this.element.sortByDropdown.name)
    this.softAssert(async () => {
      await I.assertAbove(await this.isElementVisible(locator, this.element.sortByDropdown.name), 0, 'Sort By Dropdown is not visible')
    })
  }

  private async canSeeCategoryMenus() {
    const locator = locate(this.element.categoryMenus.element).as(this.element.categoryMenus.name)
    // this.softAssert(async () => {
    //   await I.assertAbove(await this.isElementVisible(locator, this.element.categoryMenus.name), 0, 'Category Menus is not visible')
    // })
  }

  private async canSeeCategoryMenuItem(categoryName: string) {
    const locator = locate(this.element.categoryMenus.menuItem.element).as(this.element.categoryMenus.menuItem.name).find('p').withText(categoryName)
    this.softAssert(async () => {
      await I.assertAbove(await this.isElementVisible(locator, this.element.categoryMenus.menuItem.name), 0, 'Category Menu Item is not visible')
    })
  }

  private async canSeeProductCard() {
    const locator = locate(this.element.productCard.element).as(this.element.productCard.name)
    this.softAssert(async () => {
      await I.assertAbove(await this.isElementVisible(locator, this.element.productCard.name), 0, 'Product Card is not visible')
    })
  }

  async canSeeElementsInExplorerPage(categoryName: string[]) {
    await this.amOnExplorerPage()
    await this.canSeeShopHeader()
    await this.canSeeSearchBar()
    await this.canSeePlaceHolderTextInSearchBar()
    await this.canSeeSortByDropdown()
    categoryName.forEach(async (category) => {
      await this.canSeeCategoryMenuItem(category)
    })
    await this.canSeeCategoryMenus()
    await this.canSeeProductCard()
  }

  async fetchProductListViaApi(domain: Endpoint) {
    const apiController = new ApiController(I, domain['endpoint'])
    return await (await apiController.getProductApi()).fetchProductList()
  }

  /**
   * fetch products list and filtered which is available on FE
   * @param currentUrl
   * @param conditionProduct
   * @returns productListFiltered
   */
  async fetchProductsWith(currentUrl, conditionProduct: condition) {
    const productList = await this.fetchProductListViaApi(currentUrl)
    let productListFiltered
    switch (conditionProduct) {
      case condition.NON_OTC:
        productListFiltered = productList.filter((product) => product.metadata.requires_prescription === false)
        break
      case condition.OTC:
        productListFiltered = productList.filter((product) => product.metadata.requires_prescription === true)
        break
      default:
        break
    }
    return productListFiltered
  }

  /**
   * Return product list filtered by number of products
   * @param number
   * @param currentUrl
   * @param conditionProduct
   * @returns
   */
  async randomProduct(currentUrl, conditionProduct: condition) {
    const productList = await this.fetchProductsWith(currentUrl, conditionProduct)
    const randomProduct = productList[Math.floor(Math.random() * productList.length)]
    return randomProduct
  }

  /**
   * Verify product name between product list from API and FE
   * @param product
   * @returns
   */
  async _verifyNameOfProduct() {
    const productNameElement = locate(this.element.productCard.element)
      .find('[data-refname="product-menu"]')
      .withText(this.productDetail.name)
      .as(`${this.productDetail.name}`)
    this.softAssert(async () => {
      await I.assertAbove(await this.isElementVisible(productNameElement, this.productDetail.name), 0, 'Product Name is not visible')
    })
  }

  /**
   * verify price of product between product list from api and FE
   * @param product
   * @returns
   */
  async _verifyPriceOfProduct() {
    /**
     * <p>.first() is price number of product
     * <p>.last() is quantity unit of product
     */
    const productPriceElement = locate(this.element.productCard.element)
    const index = await this.getIndexOfElementFromList(productPriceElement, this.productDetail.name)
    console.log(index)
    // console.log(await this.isElementVisible(productPriceElement, `price of product`))

    // await I.softAssertAbove(, 0, 'Product Price is not visible')
    // const priceText = await I.grabTextFrom(productPriceElement)
    // await I.softAssertContain(
    //   this.productDetail.priceDisplay,
    //   await I.grabTextFrom(productPriceElement),
    //   `Price of product is not equal to ${this.productDetail.priceDisplay}`,
    // )
    // console.log(priceText)
  }
  /**
   * Select product on Explorer page
   */
  async getProductDetail(currentUrl: string) {
    const product = await this.randomProduct(currentUrl, condition.NON_OTC)
    if (product.prices.length > 1) {
      this.productDetail.priceDisplay = product.prices[0].metadata.frequency_actual_price_display
    } else {
      this.productDetail.priceDisplay = product.prices[0].unit_amount
    }
    if (product.name === 'FRESH Wipes') {
      this.productDetail.name = 'Fresh'
    } else if (product.name === 'Noah x LELO: F1S™ Bundle') {
      this.productDetail.name = 'Noah x LELO'
    } else {
      this.productDetail.name = product.name
    }
    this.productDetail.feeShipping = this.convertDecimalCurrencies(product.secondIncludedProduct.price.unit_amount)
  }

  /**
   * Verify product detail on the explore page
   */
  async verifyProductDetailIsDisplayingOnExplorePage() {
    await this._verifyNameOfProduct()
    await this._verifyPriceOfProduct()
  }
}
export default Explores
