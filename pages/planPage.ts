import { basePage } from './basePage'

const { I } = inject()

class Plans extends basePage {
    I: CodeceptJS.I

    constructor(I: CodeceptJS.I) {
        super()
        this.I = I
        
    }
}
export default Plans