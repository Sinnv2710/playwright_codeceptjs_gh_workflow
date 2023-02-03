import { basePage } from './basePage'

const { I } = inject()

class Records extends basePage {
  I: CodeceptJS.I

  constructor(I: CodeceptJS.I) {
    super()
    this.I = I
  }
}
export default Records
