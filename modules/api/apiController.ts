import { Endpoint } from './utils/api'
import accountApi from './controller/accountApi'
import { USER } from '../../resources/data/user'
import ProductApi from './controller/productApi'

export class ApiController {
  I: CodeceptJS.I
  endpoint: string

  constructor(I: CodeceptJS.I, endpoint: string) {
    ;(this.I = I), (this.endpoint = endpoint)
  }

  async getAccountApi() {
    return new accountApi(this.endpoint)
  }

  async getProductApi() {
    return new ProductApi(this.endpoint['endpoint'])
  }
}
