import { backend_base_api, backend_url, cpe_api } from "./_api";


const aws_files_url = process.env.NEXT_PUBLIC_AWS_FILES_URL



export const app_images_routes = {
    adminAvatars: `${aws_files_url}/images/adminAvatar`,
    customersPhotos: `${aws_files_url}/images/customersPhoto`,
    invoices: {
        customers: `${aws_files_url}/invoices/customers`,
        schools: `${aws_files_url}/invoices/schools`,
        admins: '',
        // file: `${aws_files_url}/invoices/customers/files`,
    },
    steps: {
        // photo: `${aws_files_url}/steps/images`,
        // file: `${aws_files_url}/steps/files`,
        step: `${aws_files_url}/steps`,
        // contracts: `${aws_files_url}/steps/customersContracts`,
        contracts: `${aws_files_url}/customersContracts`,
    },
    preAdmissionLetter: `${aws_files_url}/preAdmissionLetters`,
    admissionLetters: `${aws_files_url}/admissionLetters`,
    visa: `${aws_files_url}/visa`,
}


