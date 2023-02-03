import Controller from '../../resources/data/dataController'
import { domainUrl } from '../../resources/data/domainUrl'
let accounts = new DataTable(['domainUrl'])

/***
 * Make dataTable to run
 * dataTable
 *          |domainUrl|
 */
new Controller('domainUrl').pushObjectToDatabase(domainUrl, accounts)

export const scenario = Data(accounts).Scenario
