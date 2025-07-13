'use client'

import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton";
import HtmlInput from "@/app/assets/smallComponents/HtmlInput";
import { CalendarIcon, ImageIcon, PhoneIcon, SaveIcon, SettingsIcon, UploadIcon, UserIcon } from "@/constants/Icons";
import { Avatar } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { app_images_routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import phone_number_providers from "@/constants/phone_number_providers";
import { admins_api } from "@/constants/_api";
import createToast from "@/app/assets/components/toast";

export default function GeneralSettingsSide() {

    const [them, setThem] = useState('');
    const [profileAvatar, setProfileAvatar] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [adminData, setAdminData] = useCookies('admin_data');
    const { username, full_name, email, favorite_theme, image, role, _id } = adminData.admin_data

    const [admin, setAdmin] = useState({
        full_name: '',
        age: '',
        phone_number: '',
        phone_number_provider: '',
        // Account details 
        username: '',
        email: '',
        favorite_theme: '',
        _id,
    })


    const [adminDataToUpdate, setAdminDataToUpdate] = useState({
        full_name: '',
        age: '',
        phone_number: '',
        phone_number_provider: '',
        // Account details 
        username: '',
        email: '',
        favorite_theme: '',
        _id,
    })


    // Get admin data from backend 
    useEffect(() => {
        async function fetch_data() {
            try {
                const response = await fetch(`${admins_api}/getAdminData`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ _id }),
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const { data } = await response.json()
                console.log(data)


                // Set data for inputs 
                setAdmin(prevState => { return { ...prevState, full_name: data.full_name } })
                setAdmin(prevState => { return { ...prevState, age: data.age } })
                setAdmin(prevState => { return { ...prevState, phone_number: data.phone_number } })
                setAdmin(prevState => { return { ...prevState, phone_number_provider: data.phone_number_provider } })
                setAdmin(prevState => { return { ...prevState, username: data.username } })
                setAdmin(prevState => { return { ...prevState, email: data.email } })
                setAdmin(prevState => { return { ...prevState, favorite_theme: data.favorite_theme } })





                setThem(data.favorite_theme)

            } catch (error) {
                console.log(error)
                createToast('Some error happend!')
            }
        }

        fetch_data()

    }, []);


    async function handleLogin() {

        console.log(adminDataToUpdate)

        // console.log(admin)
        // if (condition) {

        // }
        // const isAllFilled = Object.values(admin).every(value => {
        //   return value
        // })

        // if (isAllFilled) {
        //   setIsLoading(true)

        //   try {
        //     const response = await fetch(`${admins_api}/updateGeneralSettings`, {
        //       method: 'POST',
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify(admin),
        //       cache: 'no-cache',
        //       credentials: 'include'
        //     })

        //     const { data } = await response.json()
        //     // setThisAdminData(data)
        //     console.log('Admin data: ',data)
        //     // setThem(data.favorite_theme)

        //   } catch (error) {
        //     console.log(error)
        //     createToast('Some error happend!')
        //   }

        //   setIsLoading(false)

        // } else {
        //   const content = ['All inputs are required', 'Make sure to fill all inputs below']
        //   createToast(content, true)
        // }

    }

    function Dot() {
        return <span className="h-1 w-1 rounded-full bg-gray-400"></span>
    }


    function setState(e, target) {
        setAdmin(prevState => { return { ...prevState, [target]: e.target.value } })
    }

    function setStateForSelector(e, target) {
        var value = e.target.value
        setAdmin(prevState => { return { ...prevState, [target]: value } })
    }

    function setnewAvatar(e) {
        // if (e.target.files && e.target.files.length > 0) {
        //   setProfileAvatar(e.target.files[0]);
        // }
    }



    // Set phone number providers 
    const all_phone_numbers_providers = []
    phone_number_providers.forEach(item => {

        all_phone_numbers_providers.push({
            id: item.key,
            text: item.name,
            startContent: '',
        })
    })


    function change_theme(theme) {
        setThem(theme)
        // setAdmin(prevState => { return { ...prevState, favorite_theme: theme } })
        setAdminDataToUpdate(prevState => { return { ...prevState, favorite_theme: theme } })

    }

    return (
        <div className="flex flex-col gap-4">
            {
                admin &&
                <div className="flex flex-col gap-4">
                    <div className="p-5 pt-5 pb-5 flex flex-col gap-4 bg-light-2 dark:bg-dark-2 w-full rounded-md h-fit">
                        <p className="text-base font-semibold">Profile picture</p>
                        <div className="flex w-full flex-col">


                            <div className="group relative  w-fit rounded-xl overflow-hidden cursor-pointer group">

                                <Avatar
                                    src={profileAvatar && app_images_routes + profileAvatar}
                                    isBordered
                                    radius="lg"
                                    className="w-20 h-20 text-large"
                                    showFallback
                                    fallback={
                                        <ImageIcon />
                                    }
                                />

                                <input
                                    className="absolute top-0 h-full w-full opacity-0 z-50 cursor-pointer"
                                    type="file"
                                    name="admin_profile"
                                    title="Click to upload your profile picture"
                                    onChange={e => setnewAvatar(e)}
                                />

                                <div className="bg-dark-4 pointer-events-none opacity-0 flex items-center p-4 justify-center absolute top-0 left-0 w-full h-full text-light-1 group-hover:opacity-50 transition-all">
                                    <UploadIcon />
                                </div>
                            </div>


                            {/* <Avatar isBordered radius="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" /> */}

                            {/* <div className="h-[120px] w-[120px] rounded-full bg-red-500 flex justify-center items-center cursor-pointer relative overflow-hidden">
            AF
            <input className="absolute h-full w-full opacity-0 z-50 cursor-pointer" type="file" name="admin_profile" title="Click to upload your profile picture" />

            <div className="bg-dark-2 flex items-center justify-center absolute bottom-0 left-0 w-full h-10 text-light-1">
              <UploadIcon />
            </div>
          </div> */}

                        </div>



                    </div>


                    <div className="p-5 pt-5 pb-5 flex flex-col gap-4 bg-light-2 dark:bg-dark-2 w-full rounded-md h-fit">
                        <p className="text-base font-semibold">General settings</p>
                        <div className="flex w-full flex-col">

                            <div className="grid grid-cols-2 gap-4 ">
                                <HtmlInput
                                    type="name"
                                    placeholder='Full name'
                                    // onChange={(e) => setState(e, 'full_name')}
                                    onChange={(e) => setAdminDataToUpdate(e, 'full_name')}
                                    inputValue={admin.full_name}
                                />

                                <HtmlInput
                                    type="number" // Number
                                    placeholder={{ text: 'Age', placeholder: "23 years old", icon: <CalendarIcon />, maxLength: 2 }}
                                    // onChange={(e) => setState(e, 'age')}
                                    onChange={(e) => setAdminDataToUpdate(e, 'age')}

                                    inputValue={admin?.age || ''}
                                />

                                <HtmlInput
                                    type="number"
                                    placeholder={{ text: 'Phone number', placeholder: "0700000000", icon: <PhoneIcon />, maxLength: 10 }}
                                    // onChange={(e) => setState(e, 'phone_number')}
                                    onChange={(e) => setAdminDataToUpdate(e, 'phone_number')}

                                    inputValue={admin?.phone_number || ''}
                                />

                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: 'Phone number provider', placeholder: 'Select phone number provider', data: all_phone_numbers_providers, icon: <SettingsIcon /> }}
                                    // onChange={(e) => setStateForSelector(e, 'phone_number_provider')}
                                    onChange={(e) => setAdminDataToUpdate(e, 'phone_number_provider')}

                                    inputValue={admin?.phone_number_provider || ''}

                                />

                                <HtmlInput
                                    type="name"
                                    placeholder='Your username'
                                    // onChange={(e) => setState(e, 'username')}
                                    onChange={(e) => setAdminDataToUpdate(e, 'username')}

                                    inputValue={admin?.username || ''}
                                />


                                <HtmlInput
                                    type="email"
                                    placeholder='Work email'
                                    // onChange={(e) => setState(e, 'email')}
                                    onChange={(e) => setAdminDataToUpdate(e, 'email')}

                                    inputValue={admin?.email || ''}
                                />

                            </div>

                        </div>
                    </div>



                    <div className="p-5 pt-5 pb-5 flex flex-col gap-4 bg-light-2 dark:bg-dark-2 w-full rounded-md h-fit">
                        <p className="text-base font-semibold">Theme</p>
                        <div className="flex w-full flex-col">

                            <div className="flex flex-col gap-4 ">
                                <div className="flex items-center gap-7">

                                    <div
                                        className={cn(`flex cursor-pointer items-center relative border-2 border-transparent h-[150px] w-[250px] rounded-lg bg-gray-600 bg-opacity-80 ${them == 'dark' && 'border-own_primary-1'}`)}
                                        onClick={() => change_theme('dark')}
                                    >
                                        <div className="w-[85%] h-[120px] ml-auto bg-dark-1 rounded-l-2xl p-2">
                                            <p className="text-3xl font-bold text-light-1">Aa</p>
                                        </div>
                                    </div>


                                    <div
                                        className={cn(`flex cursor-pointer items-center relative h-[150px] w-[250px] border-2 border-transparent rounded-lg bg-gray-600 bg-opacity-80 ${them == 'light' && 'border-own_primary-1'}`)}
                                        onClick={() => change_theme('light')}
                                    >
                                        <div className="w-[85%] h-[120px] ml-auto bg-light-1 rounded-l-2xl p-2">
                                            <p className="text-3xl font-bold text-dark-1">Aa</p>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            }


            <HtmlActionHandlerButton
                text="Save changes"
                icon={<SaveIcon />}
                onClick={handleLogin}
                isLoaderVisible={isLoading}
            />



        </div>

    )
}
