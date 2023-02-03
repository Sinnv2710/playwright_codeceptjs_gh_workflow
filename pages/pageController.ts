import Cart from './cartPage'
import Login from './loginPage'
import Checkout from './checkoutPage'
import Evaluation from './evaluationPage'
import Explores from './exploresPage'
import Home from './homePage'
import Plans from './planPage'
import Records from './recordsPage'

export class Pages {
  I: CodeceptJS.I

  constructor(I: CodeceptJS.I) {
    this.I = I
  }

  getLoginPage() {
    return new Login(this.I)
  }

  getCartPage() {
    return new Cart(this.I)
  }

  getCheckoutPage() {
    return new Checkout(this.I)
  }

  getEvaluationPage() {
    return new Evaluation(this.I)
  }

  getExploresPage() {
    return new Explores(this.I)
  }

  getHomePage() {
    return new Home(this.I)
  }

  getPlanPage() {
    return new Plans(this.I)
  }

  getRecordPage() {
    return new Records(this.I)
  }
}
