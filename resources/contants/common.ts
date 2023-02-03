export const languagePrefixEN: object = {
  EN: 'EN',
  full: 'English',
}

export const languagePrefixHK: object = {
  ZH: 'ZH',
  full: '繁體中文',
}

export const product: object = {
  product: {
    CIALIS: {
      '5MG': 'Cialis 5mg',
      '20MG': 'Cialis 20mg',
    },
  },
}

export const creditCardInfo = {
  VISA: {
    normal: 4242424242424242,
    debit: 4000056655665556,
  },
  MASTERCARD: {
    normal: 5555555555554444,
    normal_2_series: 2223003122003222,
    debit: 5200828282828210,
    prepaid: 5105105105105100,
  },
  AMERICAN_EXPRESS: {
    normal_1: 378282246310005,
    normal_2: 371449635398431,
  },
  DISCOVER: {
    normal_1: 6011111111111117,
    normal_2: 6011000990139424,
  },
  DINERSCLUB: {
    normal: 3056930009020004,
    normal_14_digit: 36227206271667,
  },
  JCB: 3566002020360505,
  UNIONPAY: 6200000000000005,
}

export type creditProvider = 'VISA' | 'MASTERCARD' | 'AMERICAN_EXPRESS' | 'DISCOVER' | 'DINERSCLUB' | 'JCB' | 'UNIONPAY'
