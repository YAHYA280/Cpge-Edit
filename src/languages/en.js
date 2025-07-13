// en.js (English translations)
import en_globals from './translate/en/global.json'
import en_errors from './translate/en/customerPages/MainPage/errors.json'
import en_inputs from './translate/en/inputs.json'


// Main page 
import en_stepsArea from './translate/en/customerPages/MainPage/stepsArea.json'

// Details page 
import en_accountDetails from './translate/en/customerPages/accountPage/accountDetails.json'

// Invoices page 
import en_invoicesPage from './translate/en/customerPages/invoicesPage/page.json'




const en = {
    global: {
        ...en_globals,
    },
    steps_area: {
        ...en_stepsArea,
        ...en_errors,
    },
    details_page: {
        ...en_accountDetails,
    },
    invoices_page: {
        ...en_invoicesPage,
    },
    inputs: {
        ...en_inputs,
    },
};

export default en;
