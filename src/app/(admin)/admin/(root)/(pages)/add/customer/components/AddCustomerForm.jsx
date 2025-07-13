"use client"

import HtmlInput from "@/app/assets/smallComponents/HtmlInput";
import { admins_api, cpe_api, cpe_countries_images } from "@/constants/_api";
import { AddMoneyIcon, AddUserIcon, AdminIcon, BaccalaureateIcon, CoinsIcon, DestinationIcon, EducationIcon, EmergencyIcon, FileIcon, FlagIcon, FolderIcon, HouseIcon, IdentityIdIcon, InvoiceIcon, LegalIcon, MadCurrencyIcon, MaleIcon, PassportIcon, PhoneIcon, SchoolIcon, StudyIcon, TranslateIcon, UserAccountIcon, UserIcon, UserPhotoIcon, UsersIcon } from "@/constants/Icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/react";
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton";
import { CountriesSelector } from "./CountriesSelector";
import { useCountryAndCityContext } from "../context/CountryAndCityContext";
import { CitiesSelector } from "./CitiesSelector";
import createToast from "@/app/assets/components/toast";
import { useCookies } from "react-cookie";
import Title from "@/app/assets/components/Title";
import { customer_sponsor_position, family_links, genders_list, is_with_translation, registeration_semesters, student_accommodations, study_degrees } from "@/constants/constants";
import { packages } from "@/constants/packages";
import { app_images_routes } from "@/constants/routes";
import admins_roles from "@/constants/admins_roles";
import { add_customer_steps } from "@/constants/add_customer_steps";
import { university_documents } from "@/constants/university_documents";
import { visa_documents } from "@/constants/visa_documents";
import { calculateFileSize } from "@/constants/functions";



const required_inputs = [
    "first_name",
    "last_name",
    "gender",
    "phone_number",
    "birthday",
    "address",

    "emergency_full_name",
    "emergency_phone_number",
    "emergency_family_link",

    "identity_id",
    "passport_id",

    "username",
    "password",
    "email",

    "visa_email",
    "visa_password",

    "country_destination_to_study_at",
    "departement_to_study",
    "study_degree",
    "registeration_semester",
    "is_with_accommodation",

    "baccalaureate_point",
    "baccalaureate_english_point",
    // "bachelor_point",
    // "master_point",

    "package_id",
    "package_price",
    "invoice_amount",
    "is_with_translation",
    "first_invoice",
    "customer_contract",

    "sponsor_full_name",
    "sponsor_position",
    // "sponsor_position_text",
    "sponsor_monthly_passive_income",
    "sponsor_account_budget",
    "sponsor_student_account_budget",

    "customer_photo",

    "visa_documents",
    // "responsable_employee",
]


export default function AddCustomerForm() {

    const [loading, setLoading] = useState(true)
    const [isBtnLoading, setIsBtnLoading] = useState(false)

    const [countries, setCountries] = useState()
    const [departements, setDepartements] = useState()
    const [isDepertementsLoading, setIsDepertementsLoading] = useState(false)
    const [studyDegrees, setStudyDegrees] = useState()
    const [registerationSemesters, setRegisterationSemesters] = useState()
    const [studentAccommodation, setStudentAccommodation] = useState()
    const [translation, setTranslation] = useState()

    const [selectedPackages, setSelectedPackages] = useState()
    const [genders, setGenders] = useState()
    const [familyLinks, setFamilyLinks] = useState()
    const [sponsorPosition, setSponsorPosition] = useState()
    const [isSponsorPositionNameInputVisible, setIsSponsorPositionNameInputVisible] = useState(false)

    // Study degrees 
    const [isbachelorDegreeInputVisible, setIsbachelorDegreeInputVisible] = useState(false)
    const [isMasterDegreeInputVisible, setIsMasterDegreeInputVisible] = useState(false)


    const { countryAndCity, setCountryAndCity } = useCountryAndCityContext()


    const [adminData, setAdminData] = useCookies(['admin_data'])
    var [admin_Data, setAdmin_Data] = useState()
    const [employees, setEmployees] = useState()
    const [chosenVisaDocuments, setChosenVisaDocuments] = useState()
    const [defaultChosenVisaDocuments, setDefaultChosenVisaDocuments] = useState()

    const [empotyInputs, setEmpotyInputs] = useState({})

    // Data to backend 
    // const [customerDetails, setCustomerDetails] = useState({
    //     // Personal information
    //     // first_name: '',
    //     // last_name: '',
    //     // gender: '',
    //     birthday: {},
    //     // phone_number: '',
    //     country: countryAndCity.country,
    //     city: countryAndCity.city,
    //     // address: '',

    //     // Account details 
    //     // username: '',
    //     // email: '',
    //     // password: '',

    //     // // Ligal information
    //     // identity_id: '',
    //     // passport_id: '',

    //     // // Education information
    //     // baccalaureate_point: '',
    //     // baccalaureate_english_point: '',


    //     // // Study destination
    //     // country_destination_to_study_at: '',
    //     // departement_to_study: '',
    //     // study_degree: '',
    //     // registeration_semester: '',
    //     // is_with_accommodation: '',


    //     // Sponsor details 
    //     sponsor: {
    //         sponsor_full_name: '',
    //         sponsor_position: '',
    //         sponsor_account_budget: '',
    //         sponsor_student_account_budget: '',
    //         sponsor_monthly_passive_income: '',
    //     },


    //     // Emergency details
    //     emergency: {
    //         full_name: '',
    //         phone_number: '',
    //         family_link: '',
    //     },

    //     // emergency_full_name:""

    //     // // Media
    //     // customer_photo: '',
    //     // first_invoice: '',


    //     // admin_id: '',

    //     // responsable_employee: '',

    // })
    const [customerDetails, setCustomerDetails] = useState({})



    // Fetch all the departements, or for a specific country 
    const fetchDepartements = async (country_id = '') => {
        setIsDepertementsLoading(true)
        try {
            const { data: response } = await axios.get(`${cpe_api}?target=departements&country=${country_id}`)

            const all_departements = []
            console.log('Selected country id is :', country_id)
            console.log('All departements', response)

            for (let i = 0; i < response.length; i++) {
                const departement = response[i]
                all_departements.push({
                    id: departement.id,
                    text: departement.name,
                    startContent: <p className="bg-red-500 h-4 w-4 rounded-xl flex items-center justify-center">{i + 1}</p>,
                })

            }
            setDepartements(all_departements)
        } catch (error) {
            console.log(error.message);

        } finally {
            setIsDepertementsLoading(false)
        }
    }




    // Set admin cookies into state 
    useEffect(() => {
        setAdmin_Data(adminData.admin_data)
    }, [])






    useEffect(() => {
        setCustomerDetails({ ...customerDetails, country: countryAndCity.country, city: countryAndCity.city, admin_id: adminData.admin_data._id })
    }, [countryAndCity])



    // If the admin is "employee" 
    useEffect(() => {
        console.log(adminData.admin_data)

        if (adminData?.admin_data?.role == 'employee') {
            setCustomerDetails({ ...customerDetails, responsable_employee: adminData.admin_data._id })

        }
    }, [])




    useEffect(() => {
        var { role, _id, avatar } = adminData.admin_data
        // Fetch all countries 
        const fetchData = async () => {
            setLoading(true)
            try {
                const { data: response } = await axios.get(`${cpe_api}?target=countries`);
                const all_countries = []
                // console.log(response)

                for (let i = 0; i < response.length; i++) {
                    const { id, name, flag } = response[i]
                    all_countries.push({
                        id,
                        text: name,
                        startContent: <Avatar radius="lg" size="sm" src={`${cpe_countries_images}/${flag}`} />,
                    })

                }
                setCountries(all_countries)
            } catch (error) {
                console.log(error.message)

            } finally {
                setLoading(false);
            }
        }

        fetchData()


        // Get all employees 
        if (role != 'employee') {
            // console.log('role is not employee')
            async function getEmployees() {
                try {
                    const response = await fetch(`${admins_api}/employees`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ admin_id: _id }),
                        cache: 'no-cache',
                        credentials: 'include'
                    })

                    const result = await response.json()

                    var all_employees = []

                    // Push the current admin as an option 
                    for (let i = 0; i < Object.values(admins_roles).length; i++) {
                        const element = Object.values(admins_roles)[i]
                        if (element.key == role && element.visible) {
                            all_employees.push({
                                id: _id,
                                text: 'Me',
                                startContent: <Avatar radius="lg" size="sm" src={`${app_images_routes.adminAvatars}/${avatar}`} />,
                            })
                        }
                    }


                    for (let i = 0; i < result.employees.length; i++) {
                        const employee = result.employees[i]
                        all_employees.push({
                            id: employee._id,
                            text: employee.full_name,
                            startContent: <Avatar radius="lg" size="sm" src={`${app_images_routes.adminAvatars}/${employee.avatar}`} />,
                        })
                    }





                    setEmployees(all_employees)

                } catch (error) {
                    console.log(error.message);

                }
            }
            getEmployees()

        }



        // Set study degree into the state 
        const all_study_degrees = []
        for (let i = 0; i < study_degrees.length; i++) {
            const degree = study_degrees[i]
            all_study_degrees.push({
                id: degree.key,
                text: degree.name.en,
            })

        }
        setStudyDegrees(all_study_degrees)



        // Set packages into the state 
        const all_packages = []
        for (let i = 0; i < packages.length; i++) {
            const this_package = packages[i]
            all_packages.push({
                id: this_package.key,
                text: this_package.name.en,
            })

        }
        setSelectedPackages(all_packages)




        // Set genders into the state 
        const all_genders = []
        for (let i = 0; i < genders_list.length; i++) {
            const this_gender = genders_list[i]
            all_genders.push({
                id: this_gender.key,
                text: this_gender.name.en,
            })

        }
        setGenders(all_genders)




        // Set genders into the state 
        const all_family_links = []
        for (let i = 0; i < family_links.length; i++) {
            const this_family_link = family_links[i]
            all_family_links.push({
                id: this_family_link.key,
                text: this_family_link.name.en,
            })
        }
        setFamilyLinks(all_family_links)




        // Set registeration semester into the state 
        const all_registeration_semesters = []
        for (let i = 0; i < registeration_semesters.length; i++) {
            const this_registeration_semester = registeration_semesters[i]
            all_registeration_semesters.push({
                id: this_registeration_semester.key,
                text: this_registeration_semester.name.en,
            })
        }
        setRegisterationSemesters(all_registeration_semesters)





        // Set sponsor position into the state 
        const all_sponsor_positions = []
        for (let i = 0; i < customer_sponsor_position.length; i++) {
            const this_sponsor_position = customer_sponsor_position[i]
            all_sponsor_positions.push({
                id: this_sponsor_position.key,
                text: this_sponsor_position.name.en,
            })
        }
        setSponsorPosition(all_sponsor_positions)





        // Set visa documents into the state 
        const all_visa_documents = []
        const default_visa_documents = []
        for (let i = 0; i < visa_documents.length; i++) {
            const this_document = visa_documents[i]
            all_visa_documents.push({
                id: this_document.key,
                text: this_document.names.en,
            })

            // Set default selected document 
            if (this_document.isSelected) {
                default_visa_documents.push(this_document.key)
            }
        }
        setChosenVisaDocuments(all_visa_documents)
        setDefaultChosenVisaDocuments(default_visa_documents)
        setCustomerDetails({ ...customerDetails, visa_documents: default_visa_documents })



        // Set student accommodation into the state 
        const all_student_accommodations = []

        for (let i = 0; i < student_accommodations.length; i++) {
            const accommodation = student_accommodations[i]
            all_student_accommodations.push({
                id: accommodation.key,
                text: accommodation.name.en,
            })
        }
        setStudentAccommodation(all_student_accommodations)



        // Set is with translation into the state 
        const all_translation_values = []

        for (let i = 0; i < is_with_translation.length; i++) {
            const accommodation = is_with_translation[i]
            all_translation_values.push({
                id: accommodation.key,
                text: accommodation.name.en,
            })
        }
        setTranslation(all_translation_values)

    }, [])



    // Set the admin state when the user changes the inputs values 

    function setCustomerDetailsState(e, target) {
        var value = e.target.value

        // This one is for the multiple select inputs 
        if (target == 'departement_to_study' || target == 'visa_documents') {
            // If there is value, then separate them into array using ","
            if (value) {
                value = value.split(',')
            } else {
                value = []
            }
        }

        // If the target is country_destination_to_study_at, then get the selected country's departements
        if (target == 'country_destination_to_study_at') {
            fetchDepartements(value)
        }


        // // If the target is for the sponsor 
        // if (target.includes('sponsor')) {

        //     // Destract the sponsor existing details from the state 
        //     var sponsor_details = {
        //         ...customerDetails.sponsor
        //     }


        //     // If the target is sponsor_position
        //     if (target == 'sponsor_position') {
        //         // if value is other, then show input to put the position name 
        //         if (value == 'other') {
        //             //Show input to write position name 
        //             setIsSponsorPositionNameInputVisible(true)
        //             value = ''
        //         } else {
        //             setIsSponsorPositionNameInputVisible(false)
        //         }
        //     }


        //     // If the target is sponsor_position_text, then change the sponsor_position into this value
        //     if (target == 'sponsor_position_text') {
        //         // Set sponsor_position as the object key for this value 
        //         target = 'sponsor_position'
        //         sponsor_details.sponsor_position = value
        //     }


        //     // Set the target and the value into the object 
        //     sponsor_details[target] = value

        //     // Change target name and value 
        //     target = 'sponsor'
        //     value = sponsor_details
        // }


        // // If the target is for the emergency contact
        // if (target.includes('emergency')) {

        //     // Destract the sponsor existing details from the state 
        //     var emergency_details = {
        //         ...customerDetails.emergency
        //     }


        //     // If the target is emergency_full_name
        //     if (target == 'emergency_full_name') {
        //         target = 'full_name'
        //         // emergency_details.full_name = value
        //         emergency_details[target] = value
        //     }


        //     // If the target is emergency_phone_number
        //     if (target == 'emergency_phone_number') {
        //         target = 'phone_number'
        //         emergency_details[target] = value
        //     }


        //     // If the target is emergency_family_link
        //     if (target == 'emergency_family_link') {
        //         target = 'family_link'
        //         emergency_details[target] = value
        //     }


        //     // Set the target and the value into the object 
        //     emergency_details[target] = value

        //     // Change target name and value 
        //     target = 'emergency'
        //     value = emergency_details
        // }


        setCustomerDetails(prevState => { return { ...prevState, [target]: value } })
    }



    // Set the study degree state, and when they choose eather master or phd, let them choose the previous degree point
    function setCustomerStudyDegreeState(e, target) {
        var value = e.target.value


        // Remove the inputs 
        setIsbachelorDegreeInputVisible(false)
        setIsMasterDegreeInputVisible(false)


        if (value == 'master') {
            setIsbachelorDegreeInputVisible(true)

            setCustomerDetails(prevState => { return { ...prevState, bachelor_point: '' } })


            if (customerDetails.hasOwnProperty('master_point')) { // Check if the key exists in the state
                const newState = { ...customerDetails };  // Create a copy of the current state
                delete newState.master_point;           // Remove the key-value pair
                setCustomerDetails(newState);             // Update the state with the modified object
            }
        } else if (value == 'phd') {
            setIsbachelorDegreeInputVisible(true)
            setIsMasterDegreeInputVisible(true)

            if (!customerDetails.hasOwnProperty('bachelor_point')) {
                setCustomerDetails(prevState => { return { ...prevState, bachelor_point: '' } })
            }

            setCustomerDetails(prevState => { return { ...prevState, master_point: '' } })

        } else {

            if (customerDetails.hasOwnProperty('master_point')) { // Check if the key exists in the state
                delete customerDetails.master_point;           // Remove the key-value pair
            }

            if (customerDetails.hasOwnProperty('bachelor_point')) { // Check if the key exists in the state
                delete customerDetails.bachelor_point;           // Remove the key-value pair
            }

            console.log(customerDetails)
            setCustomerDetails(customerDetails)

        }

        setCustomerDetails(prevState => { return { ...prevState, [target]: value } })
    }


    function setStateForDatePicker(e, target) {
        var day = e.day
        var month = e.month
        var year = e.year
        var this_birthday = {
            day,
            month,
            year,
        }
        setCustomerDetails(prevState => { return { ...prevState, [target]: this_birthday } })
    }


    function setImage(files, target) {
        if (files) {
            console.log(files, target)
            setCustomerDetails(prevState => { return { ...prevState, [target]: files } })
        }
    }


    async function addNewCustomer() {

        const formData = new FormData()

        var invalids = {}



        // var isAllFilled = Object.values(customerDetails).every(value => {
        //     return value
        // })

        // isAllFilled = true
        // Check sponsor Object, is all it's data are filled 
        // var isSponsorDataAllFilled = Object.values(customerDetails.sponsor).every(value => {
        //     return value
        // })


        // Get the valid inputs in the state
        const entred_inputs = Object.keys(customerDetails)


        console.log('entred_inputs', customerDetails)
        // console.log('required_inputs', required_inputs)

        // Check if all required inputs are valid 
        required_inputs.map(input => {
            if (!entred_inputs.includes(input)) {
                invalids[input] = "Please check this input"
            }
        })



        // return


        // console.log(isAllFilled, isSponsorDataAllFilled)


        if (Object.keys(invalids).length == 0) {
            // if (Object.keys(invalids).length == 0 && isSponsorDataAllFilled) {

            for (let i = 0; i < Object.keys(customerDetails).length; i++) {
                const key = Object.keys(customerDetails)[i]
                var value = customerDetails[key]



                if (key == 'birthday' || key == 'departement_to_study' || key == 'visa_documents' || key == 'sponsor' || key == 'emergency') {
                    value = JSON.stringify(value)
                }


                if (key == 'customer_photo' || key == 'first_invoice' || key == 'customer_contract') {
                    for (let i = 0; i < value.length; i++) {
                        const file = value[i].file
                        // console.log(file)
                        formData.append(key, file)
                    }
                }





                formData.append(key, value)
            }






            try {
                setIsBtnLoading(true)

                const config = { headers: { 'Content-Type': 'multipart/form-data' } }
                const response = await axios.post(`${admins_api}/addNewCustomer`, formData, config)
                const { err, msg, data } = response.data

                if (err) {
                    const content = msg
                    createToast(content, true)
                } else {
                    console.log(response.data)
                    const content = msg
                    createToast(content, true)
                }
            } catch (error) {
                console.log(error)
                const content = ['Something went wrong!', 'Please try again!']
                createToast(content, true)

            } finally {
                setIsBtnLoading(false)
            }




        } else {
            // const content = ['All inputs are required', 'Make sure to fill all inputs below']
            // createToast(content, true)
            // console.log(customerDetails)




            // Get all empty inputs 
            const invalid_inputs = {}


            // Set errors for invalid values 
            Object.keys(invalids).forEach(inputName => {
                const errorText = invalids[inputName]

                invalid_inputs[inputName] = {
                    invalid: true,
                    message: errorText
                }
            })


            // Set all errors 
            setEmpotyInputs(invalid_inputs)


            console.log('invalid_inputs', invalid_inputs)

        }


    }






    return (
        <>
            {/* // employees && employees.length > 0 && */}
            <div className="flex flex-col gap-[50px]">


                {/* Customer personal information  */}
                <div className="flex gap-5">
                    <div className="flex flex-col gap-5 flex-1">
                        <div className="flex flex-col gap-5">

                            <SectionTitle _key={'Student_personal_information'} />


                            {/* For typing inputs  */}
                            <div className="grid grid-cols-2 gap-2 gap-y-5">
                                <HtmlInput
                                    type="name"
                                    placeholder={{ label: "First name", placeholder: 'Ayoub' }}
                                    onChange={(e) => setCustomerDetailsState(e, 'first_name')}
                                    errorText={empotyInputs?.first_name?.message}
                                />

                                <HtmlInput
                                    type="name"
                                    placeholder={{ label: "Last name", placeholder: 'Farahi' }}
                                    onChange={(e) => setCustomerDetailsState(e, 'last_name')}
                                    errorText={empotyInputs?.last_name?.message}

                                />

                                {
                                    genders &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{ name: 'Gender', placeholder: 'Select gender', data: genders, icon: <MaleIcon /> }}
                                        onChange={(e) => setCustomerDetailsState(e, 'gender')}
                                        inputValue={customerDetails?.gender}
                                        errorText={empotyInputs?.gender?.message}

                                    />
                                }

                                <HtmlInput
                                    type="text" // Number
                                    placeholder={{ text: 'Phone number', placeholder: "07008833838", icon: <PhoneIcon /> }}
                                    onChange={(e) => setCustomerDetailsState(e, 'phone_number')}
                                    errorText={empotyInputs?.phone_number?.message}

                                />


                                <HtmlInput
                                    type="date_picker"
                                    placeholder={{ text: 'Student birthday' }}
                                    onChange={(e) => setStateForDatePicker(e, 'birthday')}
                                    errorText={empotyInputs?.birthday?.message}

                                />


                                <HtmlInput
                                    type="text"
                                    placeholder={{ text: "Address", placeholder: "Student address", icon: <UsersIcon /> }}
                                    onChange={(e) => setCustomerDetailsState(e, 'address')}
                                    errorText={empotyInputs?.address?.message}

                                />


                                <CountriesSelector />


                                <CitiesSelector />



                            </div>
                        </div>
                    </div>
                </div>




                {/* Customer emergency contact information  */}
                <div className="flex gap-5">
                    <div className="flex flex-col gap-5 flex-1">
                        <div className="flex flex-col gap-5">

                            <SectionTitle _key={'student_emergency_contact'} />



                            {/* For typing inputs  */}
                            <div className="grid grid-cols-2 gap-2 gap-y-5">
                                <HtmlInput
                                    type="name"
                                    placeholder="Full name"
                                    onChange={(e) => setCustomerDetailsState(e, 'emergency_full_name')}
                                    errorText={empotyInputs?.emergency_full_name?.message}

                                />

                                <HtmlInput
                                    type="text"
                                    placeholder={{ text: 'Phone number', placeholder: "07008833838", icon: <PhoneIcon /> }}
                                    onChange={(e) => setCustomerDetailsState(e, 'emergency_phone_number')}
                                    errorText={empotyInputs?.emergency_phone_number?.message}

                                />

                                {
                                    familyLinks &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{ name: 'Family link', placeholder: 'Select link', data: familyLinks, icon: <MaleIcon /> }}
                                        onChange={(e) => setCustomerDetailsState(e, 'emergency_family_link')}
                                        inputValue={customerDetails?.emergency_family_link}
                                        errorText={empotyInputs?.emergency_family_link?.message}

                                    />
                                }

                            </div>
                        </div>
                    </div>
                </div>




                {/* Ligal information */}
                <div className="flex gap-5">

                    <div className="flex flex-col gap-5 flex-1">
                        <div className="flex flex-col gap-5">


                            <SectionTitle _key={'ligal_information'} />


                            {/* For typing inputs  */}
                            <div className="grid grid-cols-2 gap-2 gap-y-5">
                                <HtmlInput
                                    type="text"
                                    placeholder={{ text: "Personal card identity ID", placeholder: "Student ID", icon: <IdentityIdIcon /> }}
                                    onChange={(e) => setCustomerDetailsState(e, 'identity_id')}
                                    errorText={empotyInputs?.identity_id?.message}

                                />

                                <HtmlInput
                                    type="text"
                                    placeholder={{ text: "Personal passport ID", placeholder: "Passport ID", icon: <PassportIcon /> }}
                                    onChange={(e) => setCustomerDetailsState(e, 'passport_id')}
                                    errorText={empotyInputs?.passport_id?.message}

                                />
                            </div>
                        </div>
                    </div>
                </div>



                {/* student account details  */}
                <div className="flex gap-5">

                    <div className="flex flex-col gap-5 flex-1">
                        <div className="flex flex-col gap-5">


                            <SectionTitle _key={'student_account_details'} />


                            {/* For typing inputs  */}
                            <div className="grid grid-cols-2 gap-2 gap-y-5">
                                <HtmlInput
                                    type="username"
                                    placeholder={`Username (Set first_name-last_name-4_passport)`}
                                    onChange={(e) => setCustomerDetailsState(e, 'username')}
                                    errorText={empotyInputs?.username?.message}

                                />
                                <HtmlInput
                                    type="password"
                                    placeholder="Student account password"
                                    onChange={(e) => setCustomerDetailsState(e, 'password')}
                                    errorText={empotyInputs?.password?.message}

                                />
                                <HtmlInput
                                    type="email"
                                    placeholder="Student email"
                                    onChange={(e) => setCustomerDetailsState(e, 'email')}
                                    errorText={empotyInputs?.email?.message}

                                />
                            </div>
                        </div>
                    </div>
                </div>



                {/* student visa account details  */}
                <div className="flex gap-5">

                    <div className="flex flex-col gap-5 flex-1">
                        <div className="flex flex-col gap-5">


                            <SectionTitle _key={'student_university_account_details'} />

                            {/* For typing inputs  */}
                            <div className="grid grid-cols-2 gap-2 gap-y-5">
                                <HtmlInput
                                    type="email"
                                    placeholder="Student email"
                                    onChange={(e) => setCustomerDetailsState(e, 'visa_email')}
                                    errorText={empotyInputs?.visa_email?.message}

                                />
                                <HtmlInput
                                    type="password"
                                    placeholder="Student password"
                                    onChange={(e) => setCustomerDetailsState(e, 'visa_password')}
                                    errorText={empotyInputs?.visa_password?.message}

                                />
                            </div>
                        </div>
                    </div>
                </div>






                {/* Study destination */}
                <div className="flex gap-5">

                    <div className="flex flex-col gap-5 flex-1">
                        <div className="flex flex-col gap-5">

                            <SectionTitle _key={'study_destination'} />


                            {/* For typing inputs  */}
                            <div className="grid grid-cols-2 gap-2 gap-y-5">
                                {
                                    countries &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{ name: 'Country destination to study at', placeholder: 'Select country', data: countries, icon: <FlagIcon /> }}
                                        onChange={(e) => setCustomerDetailsState(e, 'country_destination_to_study_at')}
                                        inputValue={customerDetails?.country_destination_to_study_at}
                                        errorText={empotyInputs?.country_destination_to_study_at?.message}

                                    />
                                }


                                {
                                    <HtmlInput
                                        type="select"
                                        placeholder={{ name: 'Specialty to study', placeholder: 'Select Specialty', data: departements || [], icon: <FlagIcon />, isMultiple: true, isLoaderVisible: isDepertementsLoading }}
                                        onChange={(e) => setCustomerDetailsState(e, 'departement_to_study')}
                                        inputValue={customerDetails?.departement_to_study || []}
                                        errorText={empotyInputs?.departement_to_study?.message}

                                    />
                                }


                                {
                                    studyDegrees &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{ name: 'Study degree', placeholder: 'Select degree', data: studyDegrees, defaultSelectedKeys: ['bachelor'], icon: <StudyIcon /> }}
                                        onChange={(e) => setCustomerStudyDegreeState(e, 'study_degree')}
                                        inputValue={customerDetails?.study_degree}
                                        errorText={empotyInputs?.study_degree?.message}

                                    />
                                }



                                {
                                    registerationSemesters &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{ name: 'Registration semister', placeholder: 'Select semister', data: registerationSemesters, defaultSelectedKeys: ['bachelor'], icon: <StudyIcon /> }}
                                        onChange={(e) => setCustomerDetailsState(e, 'registeration_semester')}
                                        inputValue={customerDetails?.registeration_semester}
                                        errorText={empotyInputs?.registeration_semester?.message}

                                    />
                                }




                                {
                                    studentAccommodation &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{ name: 'Is with accommodation', placeholder: 'Select type', data: studentAccommodation, icon: <HouseIcon /> }}
                                        onChange={(e) => setCustomerDetailsState(e, 'is_with_accommodation')}
                                        inputValue={customerDetails?.is_with_accommodation}
                                        errorText={empotyInputs?.is_with_accommodation?.message}

                                    />
                                }

                            </div>




                        </div>
                    </div>
                </div>



                {/* Student education information  */}
                <div className="flex gap-5">

                    <div className="flex flex-col gap-5 flex-1">
                        <div className="flex flex-col gap-5">

                            <SectionTitle _key={'student_education_information'} />

                            {/* For typing inputs  */}
                            <div className="grid grid-cols-2 gap-2 gap-y-5">
                                <HtmlInput
                                    type="text"
                                    placeholder={{ text: "Baccalaureate point", placeholder: "Student Baccalaureate point", icon: <BaccalaureateIcon /> }}
                                    onChange={(e) => setCustomerDetailsState(e, 'baccalaureate_point')}
                                    errorText={empotyInputs?.baccalaureate_point?.message}

                                />

                                <HtmlInput
                                    type="text"
                                    placeholder={{ text: "Baccalaureate english point", placeholder: "Student Baccalaureate english point", icon: <TranslateIcon /> }}
                                    onChange={(e) => setCustomerDetailsState(e, 'baccalaureate_english_point')}
                                    errorText={empotyInputs?.baccalaureate_english_point?.message}

                                />


                                {/* If the user selected study degree "master", then show this input  */}
                                {
                                    isbachelorDegreeInputVisible &&
                                    <HtmlInput
                                        type="text"
                                        placeholder={{ text: "bachelor point", placeholder: "Student bachelor point", icon: <BaccalaureateIcon /> }}
                                        onChange={(e) => setCustomerDetailsState(e, 'bachelor_point')}
                                        errorText={empotyInputs?.bachelor_point?.message}

                                    />
                                }



                                {/* If the user selected study degree "phd", then show this input  */}
                                {
                                    isMasterDegreeInputVisible &&
                                    <HtmlInput
                                        type="text"
                                        placeholder={{ text: "Master point", placeholder: "Student Master point", icon: <BaccalaureateIcon /> }}
                                        onChange={(e) => setCustomerDetailsState(e, 'master_point')}
                                        errorText={empotyInputs?.master_point?.message}

                                    />
                                }

                            </div>

                        </div>
                    </div>
                </div>




                {/* Package */}
                <div className="flex gap-5">

                    <div className="flex flex-col gap-5 flex-1">
                        <div className="flex flex-col gap-5">

                            <SectionTitle _key={'selected_package'} />


                            {/* For typing inputs  */}
                            <div className="grid grid-cols-2 gap-2 gap-y-5">
                                {
                                    selectedPackages &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{ name: 'Package', placeholder: 'Select package', data: selectedPackages, icon: <FolderIcon /> }}
                                        onChange={(e) => setCustomerDetailsState(e, 'package_id')}
                                        inputValue={customerDetails?.package_id}
                                        errorText={empotyInputs?.package_id?.message}

                                    />
                                }

                                <HtmlInput
                                    type="text"
                                    placeholder={{ text: "Package price", placeholder: "Set Package price", icon: <MadCurrencyIcon /> }}
                                    onChange={(e) => setCustomerDetailsState(e, 'package_price')}
                                    errorText={empotyInputs?.package_price?.message}

                                />



                                <HtmlInput
                                    type="text"
                                    placeholder={{ text: "First invoice amount", placeholder: "Set invoice amount", icon: <MadCurrencyIcon /> }}
                                    onChange={(e) => setCustomerDetailsState(e, 'invoice_amount')}
                                    errorText={empotyInputs?.invoice_amount?.message}

                                />




                                {
                                    translation &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{ name: 'Translation', placeholder: 'With files translation', data: translation, icon: <TranslateIcon /> }}
                                        onChange={(e) => setCustomerDetailsState(e, 'is_with_translation')}
                                        inputValue={customerDetails?.is_with_translation}
                                        errorText={empotyInputs?.is_with_translation?.message}

                                    />
                                }



                                <div className="flex flex-col gap-2">

                                    <HtmlInput
                                        type="customized_file"
                                        // supported_format="image"
                                        placeholder={{ placeholder: 'First payment', icon: <InvoiceIcon />, fileType: 'image' }}
                                        onChange={(files) => setImage(files, 'first_invoice', false)}
                                        errorText={empotyInputs?.first_invoice?.message}

                                    />

                                    {
                                        customerDetails?.first_invoice &&
                                        <FilePreview file={customerDetails?.first_invoice[0]} />
                                    }

                                </div>





                                <div className="flex flex-col gap-2">

                                    <HtmlInput
                                        type="customized_file"
                                        // supported_format="image"
                                        placeholder={{ placeholder: 'Student contract', icon: <FileIcon /> }}
                                        onChange={(files) => setImage(files, 'customer_contract', false)}
                                        errorText={empotyInputs?.customer_contract?.message}

                                    />

                                    {
                                        customerDetails?.customer_contract &&
                                        <FilePreview file={customerDetails?.customer_contract[0]} />
                                    }


                                </div>




                            </div>
                        </div>
                    </div>
                </div>





                {/* Customer sponsor */}
                <div className="flex gap-5">

                    <div className="flex flex-col gap-5 flex-1">
                        <div className="flex flex-col gap-5">


                            <SectionTitle _key={'the_student_sponsor'} />


                            {/* For typing inputs  */}
                            <div className="grid grid-cols-2 gap-2 gap-y-5">

                                <HtmlInput
                                    type="name"
                                    placeholder="Full name"
                                    onChange={(e) => setCustomerDetailsState(e, 'sponsor_full_name')}
                                    errorText={empotyInputs?.sponsor_full_name?.message}

                                />


                                {
                                    sponsorPosition &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{ name: 'Sponsor position', placeholder: 'Select position', data: sponsorPosition, icon: <MaleIcon /> }}
                                        onChange={(e) => setCustomerDetailsState(e, 'sponsor_position')}
                                        // inputValue={customerDetails?.sponsor.sponsor_position}
                                        inputValue={customerDetails?.sponsor_position}
                                        errorText={empotyInputs?.sponsor_position?.message}

                                    />
                                }


                                {
                                    isSponsorPositionNameInputVisible &&
                                    <HtmlInput
                                        type="text"
                                        placeholder={{ text: "Sponsor position name", placeholder: "Write position name", icon: <UsersIcon /> }}
                                        onChange={(e) => setCustomerDetailsState(e, 'sponsor_position_text')}
                                        inputValue={customerDetails?.sponsor_position_text}
                                        errorText={empotyInputs?.sponsor_position_text?.message}

                                    />
                                }



                                <HtmlInput
                                    type="number"
                                    placeholder={{ text: 'Monthly passive income', placeholder: "15000", icon: <MadCurrencyIcon /> }}
                                    onChange={(e) => setCustomerDetailsState(e, 'sponsor_monthly_passive_income')}
                                    errorText={empotyInputs?.sponsor_monthly_passive_income?.message}

                                />


                                <HtmlInput
                                    type="number"
                                    placeholder={{ text: 'Minimum sponsor account budget', placeholder: "15000", icon: <MadCurrencyIcon /> }}
                                    onChange={(e) => setCustomerDetailsState(e, 'sponsor_account_budget')}
                                    errorText={empotyInputs?.sponsor_account_budget?.message}

                                />



                                <HtmlInput
                                    type="number"
                                    placeholder={{ text: 'Minimum student account budget', placeholder: "15000", icon: <MadCurrencyIcon /> }}
                                    onChange={(e) => setCustomerDetailsState(e, 'sponsor_student_account_budget')}
                                    errorText={empotyInputs?.sponsor_student_account_budget?.message}

                                />

                            </div>

                        </div>
                    </div>
                </div>





                {/* Media */}
                <div className="flex gap-5">

                    <div className="flex flex-col gap-5 flex-1">
                        <div className="flex flex-col gap-5">

                            <SectionTitle _key={'media'} />


                            {/* For typing inputs  */}
                            <div className="grid grid-cols-2 gap-2 gap-y-5">




                                <div className="flex flex-col gap-2">

                                    <HtmlInput
                                        type="customized_file"
                                        supported_format="image"
                                        placeholder={{ placeholder: 'Student photo', icon: <UserPhotoIcon />, fileType: 'image' }}
                                        // onChange={(e) => setImage(e, 'customer_photo')}
                                        onChange={(files) => setImage(files, 'customer_photo', false)}
                                        errorText={empotyInputs?.customer_photo?.message}


                                    />

                                    {
                                        customerDetails?.customer_photo &&
                                        <FilePreview file={customerDetails?.customer_photo[0]} />
                                    }
                                </div>


                                {/* <HtmlInput
                                type="customized_file"
                                supported_format="image"
                                placeholder={{ placeholder: 'First payment', icon: <UserPhotoIcon />, fileType: 'image' }}
                                onChange={(e) => setImage(e, 'first_invoice')}
                            /> */}

                            </div>
                        </div>
                    </div>
                </div>





                {/* University documents */}
                <div className="flex gap-5">

                    <div className="flex flex-col gap-5 flex-1">
                        <div className="flex flex-col gap-5">


                            <Title
                                icon={<FileIcon />}
                                title={"Documents"}
                                text={'Here you insert the requested documents'}
                                titleColor="text-own_primary-1"
                            />




                            {/* For typing inputs  */}
                            <div className="grid grid-cols-2 gap-2 gap-y-5">

                                {
                                    chosenVisaDocuments && defaultChosenVisaDocuments &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{ name: 'Visa documents', placeholder: 'Select documents', data: chosenVisaDocuments || [], defaultSelectedKeys: defaultChosenVisaDocuments, icon: <FileIcon />, isMultiple: true }}
                                        // onChange={(e) => console.log(e, 'visa_documents')}
                                        onChange={(e) => setCustomerDetailsState(e, 'visa_documents')}
                                        errorText={empotyInputs?.visa_documents?.message}

                                    />
                                }

                            </div>

                        </div>
                    </div>
                </div>




                {
                    employees && employees.length > 0 &&
                    <>
                        {/* Responsable employee */}
                        <div className="flex gap-5">

                            <div className="flex flex-col gap-5 flex-1">
                                <div className="flex flex-col gap-5">
                                    <Title
                                        icon={<AdminIcon />}
                                        title="Responsable"
                                        text="Here you enter the student's responsable employee"
                                        titleColor="text-own_primary-1"
                                    />

                                    {/* For typing inputs  */}
                                    <div className="grid  gap-2 gap-y-5">
                                        <HtmlInput
                                            type="select"
                                            placeholder={{ name: 'Responsable employee', placeholder: 'Select employee', data: employees, icon: <AdminIcon /> }}
                                            onChange={(e) => setCustomerDetailsState(e, 'responsable_employee')}
                                            inputValue={customerDetails?.responsable_employee}
                                            errorText={empotyInputs?.responsable_employee?.message}

                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }











                <HtmlActionHandlerButton
                    isLoaderVisible={isBtnLoading}
                    text="Add new student"
                    icon={<AddUserIcon />}
                    onClick={addNewCustomer}
                />

            </div >

            {/* {
                !employees || employees.length == 0 &&
                <p>There is no employees to </p>
            } */}
        </>
    )
}






function SectionTitle({ _key }) {
    var section = {}
    for (let i = 0; i < add_customer_steps.length; i++) {
        const this_key = add_customer_steps[i].key

        if (this_key == _key) {
            section = add_customer_steps[i]
        }
    }


    var { key, icon, title, description } = section

    return (
        <Title
            icon={icon}
            title={title.en}
            text={description.en}
            titleColor={'text-own_primary-1'}
        />
    )
}




function FilePreview({ file }) {

    return (
        <>
            {
                file &&
                <div className="flex items-center justify-between w-full dark:bg-dark-2 p-2 rounded-xl border-1">

                    <div className="flex items-center gap-3 w-full">
                        <span className="p-2 rounded-lg border-1">
                            <FileIcon special_size={25} />
                        </span>
                        <span className=" max-w-[100px] sm:max-w-[200px] lg:max-w-[500px]">
                            <p className="text-base font-medium  truncate">{file.fileName}</p>
                            <span className="flex items-center gap-1">
                                <p className="text-xs flex items-center gap-1">
                                    {file.extension}
                                </p>
                                <span className="h-1 w-1 rounded-full bg-dark-3" />
                                <p className="text-xs flex items-center gap-1">
                                    {calculateFileSize(file.size)}
                                </p>
                            </span>

                        </span>
                    </div>
                </div>
            }

        </>

    )
}