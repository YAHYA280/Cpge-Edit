"use client"

import PageName from "@/app/(admin)/assets/components/PageName"
import NormalSkeleten from "@/app/assets/components/Skeleten"
import createToast from "@/app/assets/components/toast"
import HtmlInput from "@/app/assets/smallComponents/HtmlInput"
import { admins_api, cpe_api, cpe_countries_images, cpe_departements_logos } from "@/constants/_api"
import { AddMoneyIcon, AddUserIcon, BaccalaureateIcon, DestinationIcon, EducationIcon, FlagIcon, FolderIcon, HouseIcon, IdentityIdIcon, LegalIcon, MadCurrencyIcon, PassportIcon, PasswordIcon, PhoneIcon, SaveIcon, StudyIcon, TranslateIcon, UserAccountIcon, UserIcon, UsersIcon } from "@/constants/Icons"
import { app_images_routes } from "@/constants/routes"
import { Skeleton } from "@nextui-org/skeleton"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { CountriesSelector } from "../../../../../add/customer/components/CountriesSelector"
import { CitiesSelector } from "../../../../../add/customer/components/CitiesSelector"
import { useCountryAndCityContext } from "../../../../../add/customer/context/CountryAndCityContext"
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton"
import Title from "@/app/assets/components/Title"
import axios from "axios"
import { Avatar, Button } from "@nextui-org/react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { customer_sponsor_position, is_with_translation, registeration_semesters, student_accommodations, study_degrees } from "@/constants/constants"
import SkeletenTemplate from "./SkeletenTemplate"
import { CustomersBreadcrumb } from "../../../manageSteps/[customerId]/components/Breadcrumb"
import TopPage from "../../../components/TopPage"
import { packages } from "@/constants/packages"
import { removeEmptyValues } from "@/constants/functions"
import { visa_documents } from "@/constants/visa_documents"
import { university_documents } from "@/constants/university_documents"

export default function EditCustomerForm({ params }) {

    const [adminData, setAdminData] = useCookies('admin_data')
    // const { role, _id } = adminData.admin_data

    const [isLoading, setIsLoading] = useState(false)

    const [countries, setCountries] = useState()
    const [departements, setDepartements] = useState()
    const [isDepertementsLoading, setIsDepertementsLoading] = useState(true)

    // const [customerPassword, setCustomerPassword] = useState('')
    const [myPassword, setMyPassword] = useState()
    const [isDialogOpen, setIsDialogOpen] = useState(false)


    const [studyDegrees, setStudyDegrees] = useState()
    const [registerationSemesters, setRegisterationSemesters] = useState()
    const [studentAccommodation, setStudentAccommodation] = useState()
    const [translation, setTranslation] = useState()
    const [genders, setGenders] = useState()
    const [familyLinks, setFamilyLinks] = useState()
    const [sponsorPosition, setSponsorPosition] = useState()


    const [selectedPackages, setSelectedPackages] = useState()

    // The chosen country and city from the context api
    const { countryAndCity, setCountryAndCity } = useCountryAndCityContext()


    const [customer, setCustomer] = useState()
    const [birthdayState, setBirthdayState] = useState()

    const [dataToUpdate, setDataToUpdate] = useState()


    // Study degrees 
    const [isbachelorDegreeInputVisible, setIsbachelorDegreeInputVisible] = useState(false)
    const [isMasterDegreeInputVisible, setIsMasterDegreeInputVisible] = useState(false)

    // Visa documents 
    const [chosenVisaDocuments, setChosenVisaDocuments] = useState()
    const [selectedVisaDocuments, setSelectedVisaDocuments] = useState()


    // University documents 
    const [chosenUniversityDocuments, setChosenUniversityDocuments] = useState()
    const [selectedUniversityDocuments, setSelectedUniversityDocuments] = useState()


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
                    // startContent: <Avatar radius="lg" size="sm" src={`${cpe_departements_logos}/${departement.logo}`} />,
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



    // Get this customer data 
    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true)
            try {

                const response = await fetch(`${admins_api}/getSpecialcustomers`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ customer_id: params.customerId }),
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()

                console.log('result', result)


                // console.log(result)
                if (result.err) {
                    createToast(result.msg)
                } else {

                    var { birthday, departement_to_study, visa_documents, required_university_documents, ...restCustomerData } = result.customer
                    birthday = JSON.parse(birthday)


                    // Get the selected country to study at
                    const selected_country_destination_to_study_at = restCustomerData.country_destination_to_study_at

                    // Change departement_to_study from stringify to array 
                    departement_to_study = JSON.parse(departement_to_study)


                    // Change visa_documents from stringify to array 
                    visa_documents = JSON.parse(visa_documents)

                    // console.log('visa_documents', visa_documents)

                    // Change required_university_documents from stringify to array 
                    if (required_university_documents) {
                        required_university_documents = JSON.parse(required_university_documents || '[]')
                    }


                    // console.log('required_university_documents', required_university_documents)

                    setCustomer({ ...restCustomerData, birthday, departement_to_study, visa_documents, required_university_documents })
                    setBirthdayState(birthday)

                    console.log('restCustomerData', restCustomerData)


                    // Check the selected study degree 
                    if (restCustomerData.study_degree == 'master') {
                        setIsbachelorDegreeInputVisible(true)
                    }
                    else if (restCustomerData.study_degree == 'phd') {
                        setIsbachelorDegreeInputVisible(true)
                        setIsMasterDegreeInputVisible(true)
                    }



                    // Get specific country departements 
                    fetchDepartements(selected_country_destination_to_study_at)
                }
            } catch (error) {
                console.log(error)

            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])



    // Onchange country, insert it into datatoupdate object  
    useEffect(() => {
        setDataToUpdate(prevState => { return { ...prevState, country: countryAndCity.country } })
    }, [countryAndCity.country])



    // Onchange city, insert it into datatoupdate object  
    useEffect(() => {
        setDataToUpdate(prevState => { return { ...prevState, city: countryAndCity.city } })
    }, [countryAndCity.city])




    // Fetch countries 
    useEffect(() => {

        const fetchCountries = async () => {
            // setLoading(true);
            try {
                const { data: response } = await axios.get(`${cpe_api}?target=countries`);
                const all_countries = []
                // console.log(response)

                for (let i = 0; i < response.length; i++) {
                    const country = response[i]
                    all_countries.push({
                        id: country.id,
                        text: country.name,
                        startContent: <Avatar radius="lg" size="sm" src={`${cpe_countries_images}/${country.flag}`} />,
                    })

                }
                setCountries(all_countries)

            } catch (error) {
                console.log(error.message);

            } finally {
                // setLoading(false);
            }
        }




        fetchCountries()
        // fetchDepartements(country)

    }, [])


    // Set study degree into the state 
    useEffect(() => {
        const all_study_degrees = []
        for (let i = 0; i < study_degrees.length; i++) {
            const degree = study_degrees[i]
            all_study_degrees.push({
                id: degree.key,
                text: degree.name.en,
            })
        }
        setStudyDegrees(all_study_degrees)




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




        // Set visa documents into the state 
        const all_visa_documents = []
        // const default_visa_documents = []
        for (let i = 0; i < visa_documents.length; i++) {
            const this_document = visa_documents[i]
            all_visa_documents.push({
                id: this_document.key,
                text: this_document.names.en,
            })

            // // Set default selected document 
            // if (this_document.isSelected) {
            //     default_visa_documents.push(this_document.key)
            // }
        }
        setChosenVisaDocuments(all_visa_documents)
        // setDefaultChosenVisaDocuments(default_visa_documents)





        // Set university documents into the state 
        const all_university_documents = []
        // const default_university_documents = []
        for (let i = 0; i < university_documents.length; i++) {
            const this_document = university_documents[i]
            all_university_documents.push({
                id: this_document.key,
                text: this_document.names.en,
            })

            // // Set default selected document 
            // if (this_document.isSelected) {
            //     default_university_documents.push(this_document.key)
            // }
        }
        setChosenUniversityDocuments(all_university_documents)

    }, [])


    // Set the customer state when the user changes the inputs values 
    function setCustomerDetailsToUpdate(e, target) {
        var value = e.target.value

        // If the target is "departement_to_study" or "visa_documents"
        if (target == 'departement_to_study' || target == 'visa_documents' || target == 'required_university_documents') {
            value = value.split(',')
        }


        // If the target is country_destination_to_study_at, then get the selected country's departements
        if (target == 'country_destination_to_study_at') {
            fetchDepartements(value)
        }


        setDataToUpdate(prevState => { return { ...prevState, [target]: value } })

        // Update the value from customers object 
        setCustomer(prevState => { return { ...prevState, [target]: value } })
    }


    // Set the study degree state, and when they choose eather master or phd, let them choose the previous degree point
    function setCustomerStudyDegreeState(e, target) {
        var value = e.target.value


        // Remove the inputs 
        setIsbachelorDegreeInputVisible(false)
        setIsMasterDegreeInputVisible(false)


        if (value == 'master') {
            setIsbachelorDegreeInputVisible(true)
            // Set bachelor point as it is in the customer state 
            setDataToUpdate(prevState => { return { ...prevState, bachelor_point: customer.bachelor_point } })

            if (dataToUpdate.hasOwnProperty('master_point')) { // Check if the key exists in the state
                setDataToUpdate(prevState => { return { ...prevState, master_point: '' } })
            }


        } else if (value == 'phd') {
            setIsbachelorDegreeInputVisible(true)
            setIsMasterDegreeInputVisible(true)

            if (!dataToUpdate.hasOwnProperty('bachelor_point')) {
                setDataToUpdate(prevState => { return { ...prevState, bachelor_point: customer.bachelor_point } })
            }

            setDataToUpdate(prevState => { return { ...prevState, master_point: customer.master_point } })


        } else {

            if (dataToUpdate.hasOwnProperty('master_point')) { // Check if the key exists in the state
                delete dataToUpdate.master_point           // Remove the key-value pair
            }

            if (dataToUpdate.hasOwnProperty('bachelor_point')) { // Check if the key exists in the state
                delete dataToUpdate.bachelor_point           // Remove the key-value pair

            }


        }

        setCustomer(prevState => { return { ...prevState, [target]: value } })
        setDataToUpdate(prevState => { return { ...prevState, [target]: value } })

    }






    // Set state for birthday 
    function setStateForBirthday(e) {
        var day = e.day
        var month = e.month
        var year = e.year
        var this_birthday = {
            day,
            month,
            year,
        }
        setDataToUpdate(prevState => { return { ...prevState, 'birthday': this_birthday } })
        setBirthdayState(this_birthday)

    }



    // Set state for image 
    function setImage(files) {

        if (files) {
            const file = files[0].file
            // console.log(file)

            setDataToUpdate(prevState => { return { ...prevState, customer_photo: file } })

            // Update the value from customers object 
            setCustomer(prevState => { return { ...prevState, customer_photo: file } })
        } else {
            console.log('no file')
        }
    }

    // Open password dialog if these is any changes 
    function showPasswordDialog() {

        // Check the study_degree value 
        if (dataToUpdate.study_degree == 'phd') {
            if (!dataToUpdate.master_point || !dataToUpdate.bachelor_point) {
                const content = ['Master and bachelor points required!', 'Please set the master and bachelor degree points.']
                createToast(content, true)
                return
            }
        }


        // Check the study_degree value 
        if (dataToUpdate.study_degree == 'master') {
            if (!dataToUpdate.bachelor_point) {
                const content = ['Bachelor point required!', 'Please set the bachelor degree point.']
                createToast(content, true)
                return
            }
        }

        // console.log(dataToUpdate)


        const isObjectHasAnyValues = Object.keys(dataToUpdate).length > 0
        const isObjectValuesAreNotEmpty = Object.values(dataToUpdate).some(value => {
            return value
        })


        // console.log('isObjectHasAnyValues', isObjectHasAnyValues)

        if (isObjectHasAnyValues && isObjectValuesAreNotEmpty) {
            setIsDialogOpen(true)
        } else {
            setIsDialogOpen(false)
            const content = ['Nothing to update', 'There is no changes to save.']
            createToast(content, true)
        }
    }




    // Update profile function 
    async function handleUpdateCustomer() {

        console.log(dataToUpdate)

        if (!myPassword) {
            const content = ['Your password is required!', 'Please write your password to be able to make changes to your customer.']
            createToast(content, true)
        } else {

            const { role, _id } = adminData.admin_data

            const formData = new FormData()


            // Remove all empty values from the dataToUpdate object
            const valid_data_to_update = removeEmptyValues(dataToUpdate)

            // Check if valid_data_to_update has any valid values 
            const isdataToUpdateHasValues = valid_data_to_update => Object.values(valid_data_to_update).some(value => value !== undefined && value !== null);


            if (isdataToUpdateHasValues) {
                // setIsLoading(true)


                for (let i = 0; i < Object.keys(valid_data_to_update).length; i++) {
                    const key = Object.keys(valid_data_to_update)[i]
                    var value = valid_data_to_update[key]
                    if (key == 'birthday') {
                        value = JSON.stringify(birthdayState)
                    }
                    if (key == 'departement_to_study' || key == 'visa_documents' || key == 'required_university_documents') {
                        value = JSON.stringify(value)
                    }
                    formData.append(key, value)
                }
                formData.append('admin_id', _id)
                formData.append('admin_role', role)
                formData.append('my_password', myPassword)
                formData.append('customer_id', customer._id)

                // Set country and city 
                if (countryAndCity.country) {
                    formData.append('country', countryAndCity.country)
                }
                if (countryAndCity.city) {
                    formData.append('city', countryAndCity.city)
                }

                const formEntries = {};
                for (let [key, value] of formData.entries()) {
                    formEntries[key] = value;
                }

                // console.log(formEntries)

                // return

                try {
                    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
                    const response = await axios.post(`${admins_api}/updateCustomer`, formEntries, config)
                    const { err, msg, data } = response.data


                    if (err) {
                        const content = msg
                        createToast(content, true)
                    } else {
                        setIsDialogOpen(false)
                        const content = [msg[0], msg[1]]
                        createToast(content, true)

                        setDataToUpdate({})
                    }


                } catch (error) {
                    console.log('some error', error)
                } finally {
                    setIsLoading(false)
                }



            } else {
                const content = ['All inputs are required', 'Make sure to fill all inputs below']
                createToast(content, true)
            }
        }

    }



    return (
        <div className="flex flex-col gap-5">
            <CustomersBreadcrumb customer_id={params.customerId} current_page_key={'editCustomer'} />
            <TopPage pageName={`Edit`} customer={customer} admin={adminData.admin_data} />

            {
                !customer && <SkeletenTemplate />
            }


            {
                customer &&
                <div className="flex flex-col gap-4">


                    <div className="flex flex-col gap-5 bg-dark-1 p-3 rounded-lg">
                        <Title
                            icon={<UserIcon />}
                            title="Customer personal information"
                            text="Here you update the Customer's personal details"
                        />
                        <div className="flex gap-6">
                            {/* Photo  */}
                            <div className="w-[200px] aspect-square">

                                <HtmlInput
                                    type="customized_file"
                                    onChange={(files) => setImage(files)}
                                    supported_format="image"
                                    placeholder={{ onlyIcon: true, fileType: 'image', isLivePreview: true }}
                                    inputValue={`${app_images_routes.customersPhotos}/${customer.customer_photo}`}
                                />

                            </div>


                            {/* Inputs  */}
                            <div className="grid grid-cols-2 gap-2 flex-1">
                                <HtmlInput
                                    type="name"
                                    placeholder="First name"
                                    inputValue={customer.first_name}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'first_name')}
                                />
                                <HtmlInput
                                    type="name"
                                    placeholder="Last name"
                                    inputValue={customer.last_name}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'last_name')}
                                />

                                <HtmlInput
                                    type="number" // Number
                                    placeholder={{ text: 'Phone number', placeholder: "07008833838", icon: <PhoneIcon /> }}
                                    inputValue={customer.phone_number}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'phone_number')}
                                />



                                <HtmlInput
                                    type="date_picker"
                                    placeholder={{ text: 'Customer birthday' }}
                                    inputValue={customer.birthday}
                                    onChange={(e) => setStateForBirthday(e)}
                                />




                                <HtmlInput
                                    type="text"
                                    placeholder={{ text: "Address", placeholder: "Customer address", icon: <UsersIcon /> }}
                                    inputValue={customer.address}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'address')}
                                />



                                <CountriesSelector defaultValue={customer.country} />

                                <CitiesSelector defaultValue={customer.city} country={customer.country} />




                            </div>
                        </div>
                    </div>


                    <div className="flex flex-col gap-5 bg-dark-1 p-3 rounded-lg">

                        <Title
                            icon={<LegalIcon />}
                            title="Ligal information"
                            text="Here you update the Customer's ligal information"

                        />

                        {/* For typing inputs  */}
                        <div className="grid grid-cols-2 gap-2 gap-y-5">
                            <HtmlInput
                                type="text"
                                inputValue={customer.identity_id}
                                placeholder={{ text: "Personal card identity ID", placeholder: "Customer ID", icon: <IdentityIdIcon /> }}
                                onChange={(e) => setCustomerDetailsToUpdate(e, 'identity_id')}
                            />

                            <HtmlInput
                                type="text"
                                placeholder={{ text: "Personal passport ID", placeholder: "Passport ID", icon: <PassportIcon /> }}
                                inputValue={customer.passport_id}
                                onChange={(e) => setCustomerDetailsToUpdate(e, 'passport_id')}
                            />
                        </div>
                    </div>




                    <div className="flex flex-col gap-5 bg-dark-1 p-3 rounded-lg">

                        <Title
                            icon={<UserAccountIcon />}
                            title="Customer account details"
                            text="Here you update the Customer's account details"

                        />

                        {/* For typing inputs  */}
                        <div className="grid grid-cols-2 gap-2 gap-y-5">
                            <HtmlInput
                                type="username"
                                placeholder="Username"
                                inputValue={customer.username}
                                onChange={(e) => setCustomerDetailsToUpdate(e, 'username')}
                            />
                            <HtmlInput
                                type="password"
                                placeholder="Customer account password"
                                onChange={(e) => setCustomerDetailsToUpdate(e, 'password')}
                            />
                            <HtmlInput
                                type="email"
                                placeholder="Custumer email"
                                inputValue={customer.email}
                                onChange={(e) => setCustomerDetailsToUpdate(e, 'email')}
                            />
                        </div>
                    </div>



                    <div className="flex flex-col gap-5 bg-dark-1 p-3 rounded-lg">

                        <Title
                            icon={<UserAccountIcon />}
                            title="Student university account details"
                            text="Here you enter the student's account details"
                        />

                        {/* For typing inputs  */}
                        <div className="grid grid-cols-2 gap-2 gap-y-5">

                            <HtmlInput
                                type="email"
                                placeholder="Student email"
                                inputValue={customer?.university_email}
                                onChange={(e) => setCustomerDetailsToUpdate(e, 'university_email')}
                            />
                            <HtmlInput
                                type="password"
                                placeholder="Student password"
                                inputValue={customer?.university_password}
                                onChange={(e) => setCustomerDetailsToUpdate(e, 'university_password')}
                            />
                        </div>
                    </div>





                    <div className="flex flex-col gap-5 bg-dark-1 p-3 rounded-lg">
                        <Title
                            icon={<DestinationIcon />}
                            title="Study destination"
                            text="Here you update the Customer's study destination"
                        />

                        {/* For typing inputs  */}
                        <div className="grid grid-cols-2 gap-2 gap-y-5">
                            {
                                countries &&
                                <HtmlInput
                                    type="select"
                                    inputValue={customer.country_destination_to_study_at}
                                    placeholder={{ name: 'Country destination to study at', placeholder: 'Select country', data: countries, icon: <FlagIcon /> }}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'country_destination_to_study_at')}
                                />
                            }



                            {
                                departements &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: 'Specialty to study', placeholder: 'Select Specialty', data: departements, icon: <FlagIcon />, isMultiple: true, isLoaderVisible: isDepertementsLoading }}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'departement_to_study')}
                                    inputValue={customer?.departement_to_study || []}
                                />
                            }



                            {
                                studyDegrees &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: 'Study degree', placeholder: 'Select degree', data: studyDegrees, icon: <StudyIcon /> }}
                                    inputValue={customer.study_degree ? customer.study_degree : ''}
                                    // onChange={(e) => setCustomerDetailsToUpdate(e, 'study_degree')}
                                    onChange={(e) => setCustomerStudyDegreeState(e, 'study_degree')}
                                />
                            }

                            {
                                registerationSemesters &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: 'Registration semister', placeholder: 'Select semister', data: registerationSemesters, icon: <StudyIcon /> }}
                                    inputValue={customer.registeration_semester ? customer.registeration_semester : ''}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'registeration_semester')}
                                />
                            }



                            {
                                studentAccommodation &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: 'Is with accommodation', placeholder: 'Select type', data: studentAccommodation, icon: <HouseIcon /> }}
                                    // inputValue={customer.is_with_accommodation == true ? 'true' : 'false'}
                                    inputValue={customer.is_with_accommodation}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'is_with_accommodation')}
                                />
                            }
                        </div>
                    </div>



                    <div className="flex flex-col gap-5 bg-dark-1 p-3 rounded-lg">

                        <Title
                            icon={<EducationIcon />}
                            title="Student education information"
                            text="Here you update the Customer's education information"
                        />

                        {/* For typing inputs  */}
                        <div className="grid grid-cols-2 gap-2 gap-y-5">
                            <HtmlInput
                                type="text"
                                placeholder={{ text: "Baccalaureate point", placeholder: "Student Baccalaureate point", icon: <BaccalaureateIcon /> }}
                                inputValue={customer.baccalaureate_point}
                                onChange={(e) => setCustomerDetailsToUpdate(e, 'baccalaureate_point')}
                            />

                            <HtmlInput
                                type="text"
                                placeholder={{ text: "Baccalaureate english point", placeholder: "Student Baccalaureate english point", icon: <TranslateIcon /> }}
                                inputValue={customer.baccalaureate_english_point}
                                onChange={(e) => setCustomerDetailsToUpdate(e, 'baccalaureate_english_point')}
                            />





                            {/* If the user selected study degree "master", then show this input  */}
                            {
                                isbachelorDegreeInputVisible &&
                                <HtmlInput
                                    type="text"
                                    placeholder={{ text: "bachelor point", placeholder: "Student bachelor point", icon: <BaccalaureateIcon /> }}
                                    inputValue={customer?.bachelor_point}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'bachelor_point')}
                                />
                            }


                            {/* If the user selected study degree "phd", then show this input  */}
                            {
                                isMasterDegreeInputVisible &&
                                <HtmlInput
                                    type="text"
                                    placeholder={{ text: "Master point", placeholder: "Student Master point", icon: <BaccalaureateIcon /> }}
                                    inputValue={customer?.master_point}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'master_point')}

                                />
                            }

                        </div>
                    </div>






                    <div className="flex flex-col gap-5 bg-dark-1 p-3 rounded-lg">
                        <Title
                            icon={<AddMoneyIcon />}
                            title="Selected package"
                            text="Here you update the Customer's package"
                        />

                        {/* For typing inputs  */}
                        <div className="grid grid-cols-2 gap-2 gap-y-5">
                            {
                                selectedPackages &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: 'Package', placeholder: 'Select package', data: selectedPackages, icon: <FolderIcon /> }}
                                    inputValue={customer.package_id}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'package_id')}
                                />
                            }

                            <HtmlInput
                                type="text"
                                placeholder={{ text: "Package price", placeholder: "Set Package price", icon: <MadCurrencyIcon /> }}
                                inputValue={customer.package_price}
                                onChange={(e) => setCustomerDetailsToUpdate(e, 'package_price')}
                            />




                            {
                                translation &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: 'Translation ', placeholder: 'With files translation', data: translation, icon: <TranslateIcon /> }}
                                    inputValue={customer?.is_with_translation == true ? 'true' : 'false'}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'is_with_translation')}

                                />
                            }

                        </div>
                    </div>




                    <div className="flex flex-col gap-5 bg-dark-1 p-3 rounded-lg">

                        <Title
                            icon={<LegalIcon />}
                            title="Documents"
                            text="Here you insert the requested documents"

                        />


                        {/* For typing inputs  */}
                        <div className="grid grid-cols-2 gap-2 gap-y-5">

                            {/* {
                                chosenVisaDocuments && defaultChosenVisaDocuments &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: 'Visa documents', placeholder: 'Select documents', data: chosenVisaDocuments || [], defaultSelectedKeys: defaultChosenVisaDocuments, icon: <FileIcon />, isMultiple: true }}
                                    onChange={(e) => console.log(e, 'visa_documents')}
                                />
                            } */}


                            {
                                chosenVisaDocuments &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: 'Visa documents', placeholder: 'Select document', data: chosenVisaDocuments, icon: <FlagIcon />, isMultiple: true }}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'visa_documents')}
                                    inputValue={customer?.visa_documents || []}
                                />
                            }


                            {
                                chosenUniversityDocuments &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: 'University documents', placeholder: 'Select document', data: chosenUniversityDocuments, icon: <FlagIcon />, isMultiple: true }}
                                    onChange={(e) => setCustomerDetailsToUpdate(e, 'required_university_documents')}
                                    inputValue={customer?.required_university_documents || []}
                                />
                            }

                        </div>


                    </div>



                    <HtmlActionHandlerButton
                        text="Update my customer customer"
                        icon={<SaveIcon />}
                        onClick={showPasswordDialog}
                    />
                </div>

            }


            {/* Admin password modal  */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px] bg-light-1 dark:bg-dark-1">
                    <DialogHeader>
                        <DialogTitle>Set your password</DialogTitle>
                        <DialogDescription>
                            Write your password to apply changes to this customer
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center">

                        <HtmlInput
                            type="password"
                            placeholder='Your password'
                            onChange={(e) => setMyPassword(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <HtmlActionHandlerButton
                            text="Save changes"
                            icon={<SaveIcon />}
                            onClick={handleUpdateCustomer}
                            isLoaderVisible={isLoading}
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog>







            {/* Admin password modal for request customer password */}
            {/* <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                <DialogContent className="sm:max-w-[425px] bg-light-1 dark:bg-dark-1">
                    <DialogHeader>
                        <DialogTitle>Set your password</DialogTitle>

                    </DialogHeader>
                    <div className="flex items-center">

                        <HtmlInput
                            type="password"
                            placeholder='Your password'
                            onChange={(e) => setRequestCustomerPasswordAdminPassword(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <HtmlActionHandlerButton
                            text="Save changes"
                            icon={<SaveIcon />}
                            onClick={handleRequestCustomerPassword}
                            isLoaderVisible={isRequestCustomerPasswordAdminLoading}
                        />
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}


        </div>
    )
}