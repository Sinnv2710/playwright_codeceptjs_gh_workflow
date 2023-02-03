/// <reference types='codeceptjs' />
type PlaywrightHelper = import('codeceptjs-configure/lib/helpers/playwright.helper.js');
type ChaiWrapper = import('codeceptjs-chai');
type FakerHelper = import('./helpers/fragments/faker_helper');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends Playwright, GraphQL, REST, PlaywrightHelper, ChaiWrapper, FakerHelper {}
  interface I extends WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
