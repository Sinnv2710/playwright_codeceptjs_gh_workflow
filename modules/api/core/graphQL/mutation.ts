let { I } = inject()
class MutationObject {
  I: CodeceptJS.I

  /**
   * constructor
   * @param I
   */
  constructor(I: CodeceptJS.I) {
    this.I = I
  }

  /**
   * Mutation object of create user graphql
   * @returns {string}
   */
  userObjectRegister = `mutation registerPatient($input: RegisterPatientInput!) {
        registerPatient(input: $input) {
          sysId
          id
          email
          phoneNumber
          firstName
          lastName
          fullName
          country
          fbc
          fbp
          locale
          referralCode
          isReferredBy
          deliveryAddress
          billingAddress
          stripeCustomer
          identification
          stripeCustomerId
          fromPlatformEnv
          dob
          isAlreadyCheckout
          __typename
        }
      }`

  userObjectInfo = `query getPatientInfo {
        getPatientInfo {
          sysId
          id
          email
          phoneNumber
          firstName
          lastName
          fullName
          country
          fbc
          fbp
          locale
          referralCode
          isReferredBy
          deliveryAddress
          billingAddress
          stripeCustomer
          identification
          stripeCustomerId
          fromPlatformEnv
          dob
          isAlreadyCheckout
          __typename
        }
      }`
}

export default new MutationObject(I)
