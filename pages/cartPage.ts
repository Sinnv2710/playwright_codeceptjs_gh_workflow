import { basePage } from './basePage'

const { I } = inject()

class Cart extends basePage {
    I: CodeceptJS.I

    constructor(I: CodeceptJS.I) {
        super()
        this.I = I
        
    }
}


export default Cart