import Controller from '../../resources/data/dataController'
import { domainUrl } from '../../resources/data/domainUrl'
let accounts = new DataTable(['domainUrl'])

/***
 * Make dataTable to run
 * dataTable
 *          |domainUrl|
 *          |NOAH_SG_EN|
 *          |ZOEY_SG_EN|
 *          |NOAH_HK_EN|
 *          |NOAH_HK_ZH|
 */
new Controller('domainUrl').pushObjectToDatabase(domainUrl, accounts)

export const scenario = Data(accounts).Scenario