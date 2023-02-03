import { basePage } from './basePage'

const { I } = inject()

class Evaluation extends basePage {
    I: CodeceptJS.I

    constructor(I: CodeceptJS.I) {
        super()
        this.I = I
        
    }
}
export default Evaluation