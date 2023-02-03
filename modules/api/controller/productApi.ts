import { productsEndpoint } from '../../../resources/contants/api'
import apiRequestModule from '../core/request'
import { Endpoint } from '../utils/api'
import { statusCodeShouldBe } from '../utils/apiUtils'

class ProductApi {
  private endpoint: Endpoint

  constructor(endpoint: Endpoint) {
    this.endpoint = endpoint
  }

  private filterDomain() {
    let urlDomain
    if (this.endpoint.NOAH_SG_EN) {
      urlDomain = this.endpoint.NOAH_SG_EN
    } else if (this.endpoint.NOAH_HK_EN) {
      urlDomain = this.endpoint.NOAH_HK_EN
    } else if (this.endpoint.NOAH_HK_ZH) {
      urlDomain = this.endpoint.NOAH_HK_ZH
    } else {
      urlDomain = this.endpoint.ZOEY_SG_EN
    }
    return urlDomain
  }

  /**
   * Fetch product list which is shown on the explorer page
   */
  public async fetchProductList(originObject = { origin: this.endpoint }) {
    let response
    const filtered = this.filterDomain()
    switch (filtered) {
      case this.endpoint.NOAH_SG_EN:
        response = await apiRequestModule.sendGet({ endpoint: productsEndpoint.sg_noah_, headers: (originObject = { origin: this.endpoint }) })
        break
      case this.endpoint.ZOEY_SG_EN:
        response = await apiRequestModule.sendGet({ endpoint: productsEndpoint.sg_zoey_, headers: (originObject = { origin: this.endpoint }) })
        break
      case this.endpoint.NOAH_HK_EN:
        response = await apiRequestModule.sendGet({ endpoint: productsEndpoint.hk_noah_en, headers: (originObject = { origin: this.endpoint }) })
        break
      case this.endpoint.NOAH_HK_ZH:
        response = await apiRequestModule.sendGet({ endpoint: productsEndpoint.hk_noah_zh, headers: (originObject = { origin: this.endpoint }) })
        break
      default:
        throw Error('Please input correct domain in the constructor')
        break
    }
    statusCodeShouldBe(response.status, 200, response)
    return response.data.pageProps.fetchedProducts
  }
}

export default ProductApi
