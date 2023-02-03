export interface languageObject {
    loginBanner: string;
    registerLink: string;
    toastMessage: ToastMessage;
    shop: Shop;
    productField: ProductField;
    menu: Menu;
  }
  
  interface Menu {
    home: ToastMessage;
    explore: ToastMessage;
    plan: ToastMessage;
    records: ToastMessage;
  }
  
  interface ProductField {
    prescriptionOnly: ToastMessage;
    benefits: ToastMessage;
    howToUse: ToastMessage;
    goodToKnow: ToastMessage;
  }
  
  interface Shop {
    addToList: AddToList;
    buyNow: AddToList;
    learnMore: ToastMessage;
    addedToList: ToastMessage;
  }
  
  interface AddToList {
    noah: string;
    zoey: string;
    noahHk: string;
  }
  
  interface ToastMessage {
    noah: string;
    zoey: string;
  }