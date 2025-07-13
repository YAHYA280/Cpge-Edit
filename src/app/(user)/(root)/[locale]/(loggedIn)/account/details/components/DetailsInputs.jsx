'use client'

import Title from "@/app/assets/components/Title"
import createToast from "@/app/assets/components/toast";
import HtmlInput from "@/app/assets/smallComponents/HtmlInput";
import { admins_api, cpe_api, cpe_countries_images } from "@/constants/_api";
import { AcceptWalletIcon, BaccalaureateIcon, DestinationIcon, EducationIcon, EmergencyIcon, FlagIcon, IdentityIdIcon, LegalIcon, MaleIcon, PassportIcon, PhoneIcon, StudyIcon, TranslateIcon, UserAccountIcon, UserIcon, UsersIcon, VerifyCheckIcon } from "@/constants/Icons";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { family_links, genders_list, registeration_semesters, study_degrees } from "@/constants/constants";
import { add_customer_steps } from "@/constants/add_customer_steps";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@nextui-org/button";
import PageTitle from "../../../assets/components/PageTitle";
import LoadingDetailsSkeleten from "./LoadingDetailsSkeleten";
import CustomizedCallOut from "@/app/assets/components/CustomizedCallOut";
import ActivePriceNumber from "@/app/(user)/(root)/components/PriceNumber";
import { useLocale, useTranslations } from "next-intl";
import { getLanguageDetails } from "@/constants/functions";
import { app_images_routes } from "@/constants/routes";
import Image from "next/image";
import SquircleButton from "@/app/assets/components/SquircleButton";


const container__className = 'flex flex-col gap-5 '

export default function DetailsInputs() {
    const [customerData, setCustomerData] = useCookies(['customer_data']);

    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction


    const [areDetailsLoading, setAreDetailsLoading] = useState(true)

    var [user, setUser] = useState()

    const [genders, setGenders] = useState()
    const [familyLinks, setFamilyLinks] = useState()
    const [countries, setCountries] = useState()
    const [departements, setDepartements] = useState()
    const [studyDegrees, setStudyDegrees] = useState()
    const [registerationSemesters, setRegisterationSemesters] = useState()



    async function getThisCustomer() {
        const { _id } = customerData.customer_data

        try {
            setAreDetailsLoading(true)


            const response = await fetch(`${admins_api}/getSpecialcustomersAndTheirInvoices`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ customer_id: _id }),
                cache: 'no-cache',
                credentials: 'include'
            })

            const result = await response.json()


            if (result.err) {
                createToast(result.msg)
            } else {

                var { birthday, emergency, departement_to_study, sponsor, ...restCustomerData } = result.customer
                var myInvoices = result.invoices

                birthday = JSON.parse(birthday)
                emergency = JSON.parse(emergency)
                departement_to_study = JSON.parse(departement_to_study)
                sponsor = JSON.parse(sponsor)


                setUser({ ...restCustomerData, birthday, emergency, departement_to_study, sponsor })

            }
        } catch (error) {
            console.log(error.message)

        } finally {
            setAreDetailsLoading(false)
        }
    }

    // console.log(user)

    //  Get this customer once
    useEffect(() => {
        getThisCustomer()
    }, [])





    useEffect(() => {
        // Set genders into the state 
        const all_genders = []
        for (let i = 0; i < genders_list.length; i++) {
            const this_gender = genders_list[i]
            all_genders.push({
                id: this_gender.key,
                text: this_gender.name[active_language],
            })

        }
        setGenders(all_genders)


        // Set genders into the state 
        const all_family_links = []
        for (let i = 0; i < family_links.length; i++) {
            const this_family_link = family_links[i]
            all_family_links.push({
                id: this_family_link.key,
                text: this_family_link.name[active_language],
            })
        }
        setFamilyLinks(all_family_links)




        // Set study degree into the state 
        const all_study_degrees = []
        for (let i = 0; i < study_degrees.length; i++) {
            const degree = study_degrees[i]
            all_study_degrees.push({
                id: degree.key,
                text: degree.name[active_language],
            })

        }
        setStudyDegrees(all_study_degrees)







        // Set registeration semester into the state 
        const all_registeration_semesters = []
        for (let i = 0; i < registeration_semesters.length; i++) {
            const this_registeration_semester = registeration_semesters[i]
            all_registeration_semesters.push({
                id: this_registeration_semester.key,
                text: this_registeration_semester.name[active_language],
            })
        }
        setRegisterationSemesters(all_registeration_semesters)




        // Fetch all countries 
        const fetchAllCountries = async () => {
            try {
                const { data: response } = await axios.get(`${cpe_api}?target=countries`);
                const all_countries = []

                for (let i = 0; i < response.length; i++) {
                    const { id, name, flag, name_in_languages } = response[i]
                    all_countries.push({
                        id,
                        // text: name,
                        text: name_in_languages[active_language],
                        startContent: <Image src={`${cpe_countries_images}/${flag}`} alt={name + ' flag'} width={30} height={30} />,
                    })

                }
                setCountries(all_countries)
            } catch (error) {
                console.log(error.message)

            }
        }
        fetchAllCountries()





        // Fetch all the departements, or for a specific country 
        const fetchDepartements = async (country_id = '') => {
            try {
                const { data: response } = await axios.get(`${cpe_api}?target=departements&country=${country_id}`)

                const all_departements = []

                for (let i = 0; i < response.length; i++) {
                    const departement = response[i]

                    all_departements.push({
                        id: departement.id,
                        text: departement.name_in_languages[active_language],
                        startContent: <p className="bg-red-500 h-4 w-4 rounded-xl flex items-center justify-center">{i + 1}</p>,
                    })

                }


                setDepartements(all_departements)
            } catch (error) {
                console.log(error.message);

            }
        }
        fetchDepartements(user?.country_destination_to_study_at)

    }, [])





    return (
        <div className="flex flex-col gap-10 mt-4 w-full max-width mx-auto">
            <div className="flex gap-2 justify-center items-center">
                <PageTitle title={t('accountDetailsPage.my_account')} description={t('accountDetailsPage.here_are_amy_application_details')} />
            </div>

            {/* 
            <CustomizedCallOut variant={'warning'} title={t(`global.note`)} icon={<AcceptWalletIcon />}>
                <div className="flex items-center flex-wrap gap-1">

                    {t(`invoicesPage.the_rest_to_pay_description.you_have_paid`)}

                    <ActivePriceNumber number={3000} className={'text-own_primary-1'} />

                    {t(`invoicesPage.the_rest_to_pay_description.and_you_still_have_to_pay`)}

                    <ActivePriceNumber number={9000} className={'text-own_primary-1'} />
                </div>
            </CustomizedCallOut> */}



            {
                areDetailsLoading &&
                <LoadingDetailsSkeleten />
            }



            {
                !areDetailsLoading && user &&
                <div className="w-full flex flex-col gap-12">


                    {/* Customer personal information  */}
                    <div className="flex flex-col gap-5 ">

                        <SectionTitle _key={'Student_personal_information'} />


                        {/* Personal image  */}
                        <div>
                            <SquircleButton>
                                <Image
                                    src={user.customer_photo ? `${app_images_routes.customersPhotos}/${user.customer_photo}` : '/icons/preload-avatar.png'}
                                    alt={user.username + " photo"}
                                    height={150}
                                    width={150}
                                    className="rounded-xl"
                                />
                            </SquircleButton>
                        </div>



                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

                            <TitleAndValueDetails
                                title={t('inputs.first_name')}
                                value={user?.first_name}
                            />
                            <TitleAndValueDetails
                                title={t('inputs.last_name')}
                                value={user?.last_name}
                            />
                            <TitleAndValueDetails
                                title={t('inputs.gender')}
                                value={genders_list.find(gender => gender.key == user?.gender).name.ar}
                            />
                            <TitleAndValueDetails
                                title={t('inputs.phone_number')}
                                value={user.phone_number}
                            />
                            <TitleAndValueDetails
                                title={t('inputs.birthday')}
                                value={`${user?.birthday.day}-${user?.birthday.month}-${user?.birthday.year}`}
                            />
                            <TitleAndValueDetails
                                title={t('inputs.your_address')}
                                value={user?.address}
                            />
                            <TitleAndValueDetails
                                title={t('inputs.your_country')}
                                value={user?.country}
                            />
                            <TitleAndValueDetails
                                title={t('inputs.your_city')}
                                value={user?.city}
                            />

                        </div>
                    </div>



                    {/* Customer emergency contact information  */}
                    <div className={container__className}>

                        <SectionTitle _key={'student_emergency_contact'} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

                            <TitleAndValueDetails
                                title={t('inputs.full_name')}
                                value={user?.emergency?.full_name}
                            />
                            <TitleAndValueDetails
                                title={t('inputs.phone_number')}
                                value={user?.emergency?.phone_number}
                            />

                            {
                                familyLinks &&
                                <TitleAndValueDetails
                                    title={t('inputs.family_link')}
                                    value={family_links.find(link => link.key == user?.emergency?.family_link).name.ar}
                                />
                            }

                        </div>
                    </div>




                    {/* Ligal information */}
                    <div className={container__className}>

                        <SectionTitle _key={'ligal_information'} />


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

                            <TitleAndValueDetails
                                title={t('inputs.card_identity_id')}
                                value={user?.identity_id}
                            />
                            <TitleAndValueDetails
                                title={t('inputs.passport_id')}
                                value={user?.passport_id}
                            />

                        </div>
                    </div>




                    {/* student university account details  */}
                    <div className={container__className}>


                        <SectionTitle _key={'student_university_account_details'} />


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

                            <TitleAndValueDetails
                                title={t('inputs.email')}
                                value={user?.university_email}
                            />

                        </div>
                    </div>





                    {/* Study destination */}
                    <div className={container__className}>


                        <SectionTitle _key={'study_destination'} />


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">



                            {
                                countries &&
                                <TitleAndValueDetails
                                    title={t('inputs.country_destination_to_study_at')}
                                    value={countries.find(country => country.id == user?.country_destination_to_study_at).text}
                                    ValueIcon={countries.find(country => country.id == user?.country_destination_to_study_at).startContent}
                                />
                            }


                            {
                                departements &&
                                <TitleAndValueDetails
                                    title={t('inputs.specialty_to_study')}
                                    value={
                                        departements
                                            .filter(obj => user?.departement_to_study.includes(obj.id))
                                            .map(obj => obj.text)
                                            .join(', ')
                                    }
                                />
                            }



                            {
                                studyDegrees &&
                                <TitleAndValueDetails
                                    title={t('inputs.study_degree')}
                                    value={studyDegrees.find(study_degree => study_degree.id == user?.study_degree).text}
                                />
                            }



                            {
                                registerationSemesters &&
                                <TitleAndValueDetails
                                    title={t('inputs.registration_semister')}
                                    value={registerationSemesters.find(registeration_semester => registeration_semester.id == user?.registeration_semester).text}
                                />
                            }


                        </div>
                    </div>




                    {/* Student education information  */}
                    <div className={container__className}>

                        <SectionTitle _key={'student_education_information'} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">


                            <TitleAndValueDetails
                                title={t('inputs.baccalaureate_point')}
                                value={user?.baccalaureate_point}
                            />

                            <TitleAndValueDetails
                                title={t('inputs.baccalaureate_english_point')}
                                value={user?.baccalaureate_english_point}
                            />


                            {/* If there is bachelor point, then show it   */}
                            {
                                user?.bachelor_point &&
                                <TitleAndValueDetails
                                    title={t('inputs.bachelor_point')}
                                    value={user?.bachelor_point}
                                />
                            }


                            {/* If there is master point, then show it   */}
                            {
                                user?.master_point &&

                                <TitleAndValueDetails
                                    title={t('inputs.master_point')}
                                    value={user?.master_point}
                                />
                            }

                        </div>
                    </div>


                </div>
            }

        </div>
    )
}






function SectionTitle({ _key }) {

    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key




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
            title={title[active_language]}
            text={description[active_language]}
        />
    )
}





function TitleAndValueDetails({ title, titleIcon = '', value, ValueIcon = '' }) {

    return (
        <div className="flex items-center text-sm gap-5 w-full">
            <div className="flex items-center gap-1 w-1/3">
                {titleIcon && titleIcon}
                <p className="text-text_color-1">{title}</p>
            </div>

            <div className="flex items-center gap-1">
                {ValueIcon && ValueIcon}
                <p className="font-medium ">{value}</p>
            </div>
        </div>
    )
}