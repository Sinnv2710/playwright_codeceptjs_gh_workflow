const { I } = inject()
const tryTo = codeceptjs.container.plugins('tryTo')
import { assert, expect } from 'chai'
let resultArray = new Array()
export class basePage {
  click(locator) {
    I.waitForElement(locator, 5) // 5 seconds
    I.click(locator)
  }

  selectOption(locator, text) {
    I.waitForElement(locator, 5) // 5 seconds
    I.selectOption(locator, text)
  }
  this
  fillField(locator, text) {
    I.waitForElement(locator, 5) // 5 seconds
    I.click(locator)
    I.fillField(locator, text)
  }

  async findElement(locator: CodeceptJS.LocatorOrString, name: string) {
    const element: CodeceptJS.LocatorOrString = locate(locator).as(name)
    return this.softAssert(async () => {
      I.assertAbove(await this.isElementVisible(element, name), 0)
    })
  }

  async getTextFrom(locator: CodeceptJS.LocatorOrString, name: string) {
    const element: CodeceptJS.LocatorOrString = locate(locator).as(name)
    return await I.grabTextFrom(element)
  }

  async waitForPageLoaded() {
    const element = '#__next'
    // await I.waitForNavigation())
    await I.waitForElement(element)
  }

  async getOriginURL() {
    const currentOriginUrl: string = await I.executeScript(() => {
      return document.location.origin
    })
    return currentOriginUrl
  }

  async isElementVisible(locator: CodeceptJS.LocatorOrString, name: string) {
    const element: CodeceptJS.LocatorOrString = locate(locator).as(name)
    const elementVisibleNum: number = await I.grabNumberOfVisibleElements(element)
    return await elementVisibleNum
  }

  convertDecimalCurrencies(value: string) {
    const decimalValue = parseFloat(value)
    return (decimalValue / 100).toFixed(2)
  }

  async getIndexOfElementFromList(element: CodeceptJS.LocatorOrString, text: string): Promise<number> {
    let index: number
    const elementList: CodeceptJS.LocatorOrString = locate(element).as('elementList')
    const elementListLength: number = await I.grabNumberOfVisibleElements(elementList)
    for (let i = 1; i < elementListLength; i++) {
      const locator = locate('[data-refname="product-menu"]').inside(element).at(i).as(`Product index : ${i}`)
      const elementText: string = await I.grabTextFrom(locator)
      if (elementText === text) {
        index = i
        break
      }
    }
    return index
  }

  async softAssert(functionName: () => void) {
    const result = await tryTo(() => {
      functionName()
    })
    resultArray.push(result)
    return result
  }

  async _validateAllAssert() {
    return assert.isTrue(
      resultArray.every((result) => result === true),
      'All test cases are passed',
    )
  }
}
