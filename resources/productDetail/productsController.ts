import { Endpoint } from '../../modules/api/utils/api'
import locationFilter from '../location'

class ProductController {
  I: CodeceptJS.I
  url: Endpoint
  protected NoahSg = require('./SG_NOAH_products.json')
  protected ZoeySg = require('./SG_ZOEY_products.json')
  protected NoahHk = require('./HK_NOAH_products.json')

  constructor(url: Endpoint) {
    this.url = url
  }

  private filterLocation(): string {
    const indexString = this.url.toString().lastIndexOf('-')
    return this.url.toString().slice(indexString + 1, indexString + 3)
  }

  /**
   * fetch product list from Domain URL
   */
  public getProductListFromDomain() {
    const domain = new locationFilter(this.url.toString()).getDomainFromURL()
    const language = this.filterLocation()
    let productList
    if (domain === 'noah' && language === 'sg') {
      productList = this.NoahSg
    } else if (domain === 'zoey' && language === 'sg') {
      productList = this.ZoeySg
    } else if (domain === 'noah' && language === 'hk') {
      productList = this.NoahHk
    } else {
      return new Error('Not Found product list from Domain')
    }
    return productList
  }
}

export default ProductController
