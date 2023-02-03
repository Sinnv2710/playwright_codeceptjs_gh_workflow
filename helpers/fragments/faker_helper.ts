import faker from '@faker-js/faker'
import locationFilter from '../../resources/location'
import examples from 'libphonenumber-js/examples.mobile.json'
import { getExampleNumber } from 'libphonenumber-js'
import moment from 'moment'
import { creditCardInfo, creditProvider } from '../../resources/contants/common'
import { USER } from '../../resources/data/user'
import { PatientPayload } from '../../modules/api/utils/api'

class FakerHelper extends Helper {
  // Variables
  state: string
  firstName: string
  lastName: string
  city: string
  streetAddress: string
  unitNo: number
  postalCode: string
  deliveryNote: string
  country: string
  dob: string
  email: string

  constructor(config: any) {
    super(config)
    this.helpers
    this.state
  }

  protected async detectLanguage(): Promise<void> {
    const language = new locationFilter(`${process.env.BASE_URL}`).getLanguageFromURL().toUpperCase()
    return language === 'EN' ? faker.setLocale('en_US') : faker.setLocale('zh_CN')
  }

  private async generateFirstName(): Promise<string> {
    this.firstName = faker.name.firstName()
    return this.firstName
  }

  private async generateLastName(): Promise<string> {
    this.lastName = faker.name.lastName()
    return this.lastName
  }

  private async generateReceiverName(): Promise<string> {
    const receiverName = `Auto UI ${this.firstName} ${this.lastName}`
    return receiverName
  }

  private async generateCity(): Promise<string> {
    this.city = faker.address.city()
    return this.city
  }

  private async generateStreetAddress(): Promise<string> {
    this.streetAddress = faker.address.streetAddress()
    return this.streetAddress
  }

  private async generateUnitNo(): Promise<number> {
    this.unitNo = faker.datatype.number()
    return this.unitNo
  }

  private async generatePhoneNumber(): Promise<string> {
    const localeFaker = faker.locale === 'en_US' ? true : false
    const numberObject = localeFaker ? getExampleNumber('SG', examples) : getExampleNumber('HK', examples)
    return `${numberObject.countryCallingCode}${numberObject.nationalNumber}`
  }

  private async getRandomDate(from: Date, to: Date) {
    const fromTime = from.getTime()
    const toTime = to.getTime()
    return new Date(fromTime + Math.random() * (toTime - fromTime))
  }

  private async generateDoB(): Promise<string> {
    const random = await this.getRandomDate(new Date('1/1/1950'), new Date('1/12/2005'))
    this.dob = moment(random).format('DD/MM/YYYY')
    return this.dob
  }

  private async generateState(): Promise<string> {
    this.state = faker.address.state()
    return this.state
  }

  private async generateZipCodeByState(): Promise<string> {
    this.postalCode = faker.address.zipCodeByState(this.state)
    return this.postalCode
  }

  private async generateDeliveryNote(): Promise<string> {
    this.deliveryNote = faker.random.words()
    return this.deliveryNote
  }

  private async generateCountry(): Promise<string> {
    const language = new locationFilter(`${process.env.BASE_URL}`).getLanguageFromURL().toUpperCase()
    this.country = language === 'EN' ? 'sg' : 'hk'
    return this.country
  }

  private async generateEmail(): Promise<string> {
    this.email = `auto.${faker.internet.email()}`
    return this.email
  }

  /**
   * @param [creditProvider = string] : VISA | MASTERCARD | AMERICAN_EXPRESS | DISCOVER | DINERCLUB | JCB | UNIONPAY
   */
  private getCreditCardNumber(provider?: creditProvider) {
    let card: number
    switch (provider) {
      case 'VISA':
        card = creditCardInfo.VISA.normal
        break
      case 'MASTERCARD':
        card = creditCardInfo.MASTERCARD.normal
        break
      case 'AMERICAN_EXPRESS':
        card = creditCardInfo.AMERICAN_EXPRESS.normal_1
        break
      case 'DISCOVER':
        card = creditCardInfo.DISCOVER.normal_1
        break
      case 'DINERSCLUB':
        card = creditCardInfo.DINERSCLUB.normal
        break
      case 'JCB':
        card = creditCardInfo.JCB
        break
      case 'UNIONPAY':
        card = creditCardInfo.UNIONPAY
        break
      default:
        throw new Error('Please input the parameter of Credit Card Provider first !!!')
    }
    return card
  }

  /**
   * @param [creditProvider = string] : VISA | MASTERCARD | AMERICAN_EXPRESS | DISCOVER | DINERCLUB | JCB | UNIONPAY
   */
  private async generateCreditCardObject(creditProvider?: creditProvider): Promise<any> {
    const creditCardNumber = this.getCreditCardNumber(creditProvider)
    return {
      card_number: `${creditCardNumber}`,
      name_holder: `auto.ui ${this.firstName} ${this.lastName}`,
      month_expire: ('0' + faker.date.future().getMonth()).slice(-2),
      year_expire: faker.date.future().getFullYear(),
      cvv: faker.finance.creditCardCVV(),
    }
  }

  private async generateShippingInfo(): Promise<any> {
    return {
      receiver_name: `${await this.generateReceiverName()}`,
      city: `${this.city}`,
      state: `${this.state}`,
      street_address: `${this.streetAddress}`,
      unit_no: `${this.unitNo}`,
      postal_code: `${this.postalCode}`,
      delivery_note: `${this.deliveryNote}`,
    }
  }

  private async generateBillingInfo(): Promise<any> {
    return {
      receiver_name: `${await this.generateReceiverName()}`,
      city: `${await this.generateCity()}`,
      state: `${await this.generateState()}`,
      street_address: `${await this.generateStreetAddress()}`,
      unit_no: `${await this.generateUnitNo()}`,
      postal_code: `${await this.generateZipCodeByState()}`,
      delivery_note: `${await this.generateDeliveryNote()}`,
    }
  }

  private async generateUserInfo(): Promise<any> {
    return {
      first_name: await this.generateFirstName(),
      last_name: await this.generateLastName(),
      email: await this.generateEmail(),
      password: `Password@123`,
      new_password: `Password@123abc`,
      dob: await this.generateDoB(),
      phone_number: await this.generatePhoneNumber(),
      country: await this.generateCountry(),
      locale: 'en',
    }
  }

  /**
   * Generate User object data for test case
   * ```js
   * I.generateUserObject('VISA')
   * I.generateUserObject('MASTERCARD')
   * I.generateUserObject('AMERICAN_EXPRESS')
   * I.generateUserObject('JCB')
   * ```
   * @param [creditCardType = string] VISA | MASTERCARD | AMERICAN_EXPRESS | DISCOVER | DINERCLUB | JCB | UNIONPAY
   */
  public async generateUserObject(creditCardType: creditProvider): Promise<USER> {
    await this.detectLanguage()
    return {
      profile: await this.generateUserInfo(),
      billing_info: await this.generateBillingInfo(),
      shipping_info: await this.generateShippingInfo(),
      credit_card_information: await this.generateCreditCardObject(creditCardType),
    }
  }

  /**
   * Generate Patient object data when register patient
   * ```js
   * I.gene
   */
  public async generatePatientObject(): Promise<PatientPayload> {
    return {
      data: {
        firstName: `${this.firstName}`,
        lastName: `${this.lastName}`,
        email: await this.email,
        fullname: `${this.firstName} ${this.lastName}`,
      },
    }
  }
}
export = FakerHelper
