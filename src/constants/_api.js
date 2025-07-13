

// export const cpe_api = 'http://localhost/cpe_agency/_api'
export const cpe = 'https://cpeedu.com'

export const cpe_api = 'https://cpeedu.com/_api'

// For countries 
export const cpe_countries_images = 'https://cpeedu.com/assets/admin/imgs/countries/flags'
export const cpe_countries_gallery = 'https://cpeedu.com/assets/admin/imgs/countries/gallery'


// For schools 
export const cpe_schools_logos = 'https://cpeedu.com/assets/admin/imgs/schools/logos'
export const cpe_schools_gallery = 'https://cpeedu.com/assets/admin/imgs/schools/gallery'


// For departements 
export const cpe_departements_logos = 'https://cpeedu.com/assets/admin/imgs/departements/logos'
export const cpe_departements_gallery = 'https://cpeedu.com/assets/admin/imgs/departements/gallery'








//############  BACKEND API ############ 
// export const backend_base_api = 'http://localhost:3001/api'
export const backend_url = process.env.NEXT_PUBLIC_BACKEND_URL

export const backend_base_api = backend_url + '/api'
// export const backend_url = 'http://localhost:3001'


//## ADMINS

// Admins api
export const admins_api = `${backend_base_api}/admins`

// Add admin
export const create_new_admin = `${backend_base_api}/admins/add`


// Invoices api
export const invoices_api = `${backend_base_api}/invoices`


// Customers api
export const customers_api = `${backend_base_api}/customers`


// steps api
export const steps_api = `${backend_base_api}/steps`


// Filter api
export const filter_api = `${backend_base_api}/filter`



// Documents api
export const documents_api = `${backend_base_api}/documents`


// export const get_world_wild_countries_api = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries'