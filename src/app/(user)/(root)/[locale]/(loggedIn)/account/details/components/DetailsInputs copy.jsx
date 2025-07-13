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

                var { birthday, ...restCustomerData } = result.customer
                var myInvoices = result.invoices

                birthday = JSON.parse(birthday)


                setUser({ ...restCustomerData, birthday })

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
        // const all_genders = []
        // for (let i = 0; i < genders_list.length; i++) {
        //     const this_gender = genders_list[i]
        //     all_genders.push({
        //         id: this_gender.key,
        //         text: this_gender.name[active_language],
        //     })

        // }
        // setGenders(all_genders)


        // Set genders into the state 
        // const all_family_links = []
        // for (let i = 0; i < family_links.length; i++) {
        //     const this_family_link = family_links[i]
        //     all_family_links.push({
        //         id: this_family_link.key,
        //         text: this_family_link.name[active_language],
        //     })
        // }
        // setFamilyLinks(all_family_links)




        // Set study degree into the state 
        // const all_study_degrees = []
        // for (let i = 0; i < study_degrees.length; i++) {
        //     const degree = study_degrees[i]
        //     all_study_degrees.push({
        //         id: degree.key,
        //         text: degree.name[active_language],
        //     })

        // }
        // setStudyDegrees(all_study_degrees)







        // Set registeration semester into the state 
        // const all_registeration_semesters = []
        // for (let i = 0; i < registeration_semesters.length; i++) {
        //     const this_registeration_semester = registeration_semesters[i]
        //     all_registeration_semesters.push({
        //         id: this_registeration_semester.key,
        //         text: this_registeration_semester.name[active_language],
        //     })
        // }
        // setRegisterationSemesters(all_registeration_semesters)




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
                        startContent: <Avatar radius="lg" size="sm" src={`${cpe_countries_images}/${flag}`} alt={name + ' flag'} />,
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
                {/* <Button
                    className="min-w-0 p-0 h-[20px] w-[20px] flex items-center justify-center"
                >
                    ?
                </Button> */}
            </div>


            <CustomizedCallOut variant={'warning'} title={t(`global.note`)} icon={<AcceptWalletIcon />}>
                <div className="flex items-center flex-wrap gap-1">

                    {t(`invoicesPage.the_rest_to_pay_description.you_have_paid`)}

                    <ActivePriceNumber number={3000} className={'text-own_primary-1'} />

                    {t(`invoicesPage.the_rest_to_pay_description.and_you_still_have_to_pay`)}

                    <ActivePriceNumber number={9000} className={'text-own_primary-1'} />
                </div>
            </CustomizedCallOut>



            {
                areDetailsLoading &&
                <LoadingDetailsSkeleten />
            }



            {
                !areDetailsLoading && user &&
                <div className="w-full flex flex-col gap-5">


                    {/* Customer personal information  */}
                    <div className="flex flex-col gap-5 ">

                        <SectionTitle _key={'Student_personal_information'} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">

                            <div className="flex items-center gap-5">
                                <p className="text-text_color-1 ">{t('inputs.first_name')}</p>
                                <p className="font-semibold">{user?.first_name}</p>
                            </div>
                            <div className="flex items-center gap-5">
                                <p className="text-text_color-1 ">{t('inputs.last_name')}</p>
                                <p className="font-semibold">{user?.last_name}</p>
                            </div>

                            <div className="flex items-center gap-5">
                                <p className="text-text_color-1 ">{t('inputs.gender')}</p>
                                <p className="font-semibold">{genders_list.find(gender => gender.key == user?.gender).name.ar}</p>
                            </div>

                            <div className="flex items-center gap-5">
                                <p className="text-text_color-1 ">{t('inputs.phone_number')}</p>
                                <p className="font-semibold">{user?.phone_number}</p>
                            </div>


                            <div className="flex items-center gap-5">
                                <p className="text-text_color-1 ">{t('inputs.birthday')}</p>
                                <p className="font-semibold">{user?.birthday.day}-{user?.birthday.month}-{user?.birthday.year}</p>
                            </div>

                            <div className="flex items-center gap-5">
                                <p className="text-text_color-1 ">{t('inputs.your_address')}</p>
                                <p className="font-semibold">{user?.address}</p>
                            </div>
                            <div className="flex items-center gap-5">
                                <p className="text-text_color-1 ">{t('inputs.your_country')}</p>
                                <p className="font-semibold">{user?.country}</p>
                            </div>

                            <div className="flex items-center gap-5">
                                <p className="text-text_color-1 ">{t('inputs.your_city')}</p>
                                <p className="font-semibold">{user?.city}</p>
                            </div>




                            {/* <HtmlInput
                                type="text"
                                placeholder={{ text: t('inputs.first_name'), placeholder: "", icon: <UsersIcon /> }}
                                inputValue={user?.first_name}
                                isDisabled={true}
                            /> */}
                            {/* <HtmlInput
                                type="text"
                                placeholder={{ text: t('inputs.last_name'), placeholder: "", icon: <UsersIcon /> }}
                                inputValue={user?.last_name}
                                isDisabled={true}
                            /> */}

                            {/* {
                                genders &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: t('inputs.gender'), placeholder: 'Select gender', data: genders, icon: <MaleIcon /> }}
                                    isDisabled={true}
                                    inputValue={user?.gender}

                                />
                            } */}


                            {/* <HtmlInput
                                type="number" // Number
                                placeholder={{ text: t('inputs.phone_number'), placeholder: "07008833838", icon: <PhoneIcon /> }}
                                isDisabled={true}
                                inputValue={user?.phone_number}
                            /> */}

                            {/* 
                            <HtmlInput
                                type="date_picker"
                                placeholder={{ text: t('inputs.birthday') }}
                                inputValue={user?.birthday}
                                isDisabled={true}
                            /> */}


                            {/* <HtmlInput
                                type="text"
                                placeholder={{ text: t('inputs.your_address'), placeholder: '', icon: <UsersIcon /> }}
                                inputValue={user?.address}
                                isDisabled={true}
                            /> */}


                            {/* <HtmlInput
                                type="text"
                                placeholder={{ text: t('inputs.your_country'), placeholder: "", icon: <FlagIcon /> }}
                                inputValue={user?.country}
                                isDisabled={true}
                            /> */}


                            {/* <HtmlInput
                                type="text"
                                placeholder={{ text: t('inputs.your_city'), placeholder: "", icon: <FlagIcon /> }}
                                inputValue={user?.city}
                                isDisabled={true}
                            /> */}


                        </div>
                    </div>



                    {/* Customer emergency contact information  */}
                    <div className={container__className}>

                        <SectionTitle _key={'student_emergency_contact'} />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            <HtmlInput
                                type="name"
                                placeholder={t('inputs.full_name')}
                                isDisabled={true}
                                inputValue={user?.emergency?.full_name}
                            />



                            <HtmlInput
                                type="number" // Number
                                placeholder={{ text: t('inputs.phone_number'), placeholder: "", icon: <PhoneIcon /> }}
                                isDisabled={true}
                                inputValue={user?.emergency?.phone_number}
                            />


                            {
                                familyLinks &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: t('inputs.family_link'), placeholder: '', data: familyLinks, icon: <MaleIcon /> }}
                                    inputValue={user?.emergency?.family_link}
                                    isDisabled={true}
                                />
                            }


                        </div>
                    </div>




                    {/* Ligal information */}
                    <div className={container__className}>

                        <SectionTitle _key={'ligal_information'} />


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">




                            <HtmlInput
                                type="text"
                                placeholder={{ text: t('inputs.card_identity_id'), placeholder: "", icon: <IdentityIdIcon /> }}
                                isDisabled={true}
                                inputValue={user?.identity_id}
                            />


                            <HtmlInput
                                type="text"
                                placeholder={{ text: t('inputs.passport_id'), placeholder: "", icon: <PassportIcon /> }}
                                isDisabled={true}
                                inputValue={user?.passport_id}
                            />


                        </div>
                    </div>




                    {/* student university account details  */}
                    <div className={container__className}>


                        <SectionTitle _key={'student_university_account_details'} />


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

                            <HtmlInput
                                type="email"
                                placeholder={t('inputs.email')}
                                inputValue={user?.university_email}
                                isDisabled={true}
                            />

                        </div>
                    </div>





                    {/* Study destination */}
                    <div className={container__className}>


                        <SectionTitle _key={'study_destination'} />


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

                            {
                                countries &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: t('inputs.country_destination_to_study_at'), placeholder: '', data: countries, icon: <FlagIcon /> }}
                                    inputValue={user?.country_destination_to_study_at}
                                    isDisabled={true}
                                />
                            }

                            {
                                departements &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: t('inputs.specialty_to_study'), placeholder: 'Select Specialty', data: departements || [], icon: <FlagIcon />, isMultiple: true }}
                                    inputValue={user?.departement_to_study || []}
                                    isDisabled={true}
                                />
                            }

                            {
                                studyDegrees &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: t('inputs.study_degree'), placeholder: '', data: studyDegrees, icon: <StudyIcon /> }}
                                    inputValue={user?.study_degree}
                                    isDisabled={true}
                                />
                            }

                            {
                                registerationSemesters &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: t('inputs.registration_semister'), placeholder: '', data: registerationSemesters, icon: <StudyIcon /> }}
                                    inputValue={user?.registeration_semester}
                                    isDisabled={true}
                                />
                            }




                        </div>
                    </div>




                    {/* Student education information  */}
                    <div className={container__className}>


                        <SectionTitle _key={'student_education_information'} />


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">

                            <HtmlInput
                                type="text"
                                placeholder={{ text: t('inputs.baccalaureate_point'), placeholder: "", icon: <BaccalaureateIcon /> }}
                                inputValue={user?.baccalaureate_point}
                                isDisabled={true}
                            />


                            <HtmlInput
                                type="text"
                                placeholder={{ text: t('inputs.baccalaureate_english_point'), placeholder: "", icon: <TranslateIcon /> }}
                                inputValue={user?.baccalaureate_english_point}
                                isDisabled={true}
                            />


                            {/* If there is bachelor point, then show it   */}
                            {
                                user?.bachelor_point &&
                                <HtmlInput
                                    type="text"
                                    placeholder={{ text: t('inputs.bachelor_point'), placeholder: "", icon: <BaccalaureateIcon /> }}
                                    inputValue={user?.bachelor_point}
                                    isDisabled={true}
                                />
                            }


                            {/* If there is master point, then show it   */}
                            {
                                user?.master_point &&
                                <HtmlInput
                                    type="text"
                                    placeholder={{ text: t('inputs.master_point'), placeholder: "", icon: <BaccalaureateIcon /> }}
                                    inputValue={user?.master_point}
                                    isDisabled={true}
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