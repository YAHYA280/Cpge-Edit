// ar.js (Arabic translations)
import ar_globals from './translate/ar/global.json'
import ar_errors from './translate/ar/customerPages/MainPage/errors.json'
import ar_inputs from './translate/ar/inputs.json'


// Main page 
import ar_stepsArea from './translate/ar/customerPages/MainPage/stepsArea.json'

// Details page 
import ar_accountDetails from './translate/ar/customerPages/accountPage/accountDetails.json'

// Invoices page 
import ar_invoicesPage from './translate/ar/customerPages/invoicesPage/page.json'




const ar = {
    global: {
        ...ar_globals,
    },
    steps_area: {
        ...ar_stepsArea,
        ...ar_errors,
    },
    details_page: {
        ...ar_accountDetails,
    },
    invoices_page: {
        ...ar_invoicesPage,
    },
    inputs: {
        ...ar_inputs,
    },
}

export default ar
