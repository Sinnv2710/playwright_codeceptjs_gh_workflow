export const registerAPI = {
  prefixEmail: 'autoui',
  suffixEmail: '@gmail.com',
  prefixFirstName: 'Automation ',
  prefixLastName: 'Patient ',
}

export const accountEndpointObject = {
  createUser: `${process.env.GOOGLE_API}${process.env.CREATE_USER}?key=${process.env.GOOGLE_KEY}`,
  verifyPassword: `${process.env.GOOGLE_API}${process.env.VERIFY_PASSWORD}?key=${process.env.GOOGLE_KEY}`,
  getAccountInfo: `${process.env.GOOGLE_API}${process.env.GET_ACCOUNT_INFO}?key=${process.env.GOOGLE_KEY}`,
}

export const patientEndpointObject = {
  registerPatient: `${process.env.PATIENT_API}/registerPatient`,
}

export const productsEndpoint = {
  sg_noah_: `https://noah-staging-sg.vercel.app/_next/data/${process.env.SG_NOAH_DATA_KEY}/en/shop.json`,
  sg_zoey_: `https://noah-staging-sg.vercel.app/_next/data/${process.env.SG_ZOEY_DATA_KEY}/en/shop.json`,
  hk_noah_en: `https://noah-staging-hk.vercel.app/_next/data/${process.env.HK_NOAH_DATA_KEY}/en/shop.json`,
  hk_noah_zh: `https://noah-staging-hk.vercel.app/_next/data/${process.env.HK_NOAH_DATA_KEY}/zh/shop.json`,
}
