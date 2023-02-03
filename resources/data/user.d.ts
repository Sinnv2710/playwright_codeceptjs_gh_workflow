export interface USER {
  profile?: {
    first_name: string
    last_name: string
    email: string
    password: string
    new_password: string
    dob: string
    phone_number: string
    country: string
    locale: string
  }
  shipping_info?: {
    receiver_name: string
    city: string
    state: string
    street_address: string
    unit_no: string
    postal_code: string
    delivery_note: string
  }
  billing_info?: {
    receiver_name: string
    city: string
    state: string
    street_address: string
    unit_no: string
    postal_code: string
    delivery_note: string
  }
  credit_card_information?: {
    card_number: string
    name_holder: string
    date_expire: string
    cvv: string
  }
}
