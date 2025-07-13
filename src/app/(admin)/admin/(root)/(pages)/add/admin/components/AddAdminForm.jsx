"use client"

import HtmlInput from "@/app/assets/smallComponents/HtmlInput";
import { AddressIcon, AddUserIcon, AdminIcon, BaccalaureateIcon, CalendarIcon, DestinationIcon, EducationIcon, FileIcon, FlagIcon, IdentityIdIcon, LegalIcon, PassportIcon, PhoneIcon, SettingsIcon, TranslateIcon, UserAccountIcon, UserIcon, UsersIcon } from "@/constants/Icons";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/react";
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton";
import phone_number_providers from "@/constants/phone_number_providers";
import { admins_api } from "@/constants/_api";
import createToast from "@/app/assets/components/toast";
import admins_roles from "@/constants/admins_roles";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { app_images_routes } from "@/constants/routes";
// import { toast } from 'sonner'

const Title = ({ icon, title, text }) => {
    return (
        <div className="flex flex-col">
            <p className="text-xl font-semibold flex items-center gap-2">{icon}{title}</p>
            <p className="text-sm pl-7 text-text_color-1">{text}</p>
        </div>
    )
}





export default function AddAdminForm() {
    const router = useRouter()



    const [adminData, setAdminData] = useCookies(['admin_data']);
    // Current admin role from the cookies 
    var [admin_Data, setAdmin_Data] = useState()



    // This must hold the chosen admin role 
    var [chooseRole, setChooseRole] = useState()
    var [isChoosingRoleLoading, setIsChoosingRoleLoading] = useState(false)

    // Get all exiting admins and super admins if they're needed 
    var [allAdmins, setAllAdmins] = useState()
    var [allSuperAdmins, setAllSuperAdmins] = useState()




    const [admin, setAdmin] = useState({
        full_name: '',
        birthday: {},
        address: '',
        phone_number: '',
        phone_number_provider: '',

        // Account details 
        username: '',
        password: '',
        email: '',
        role: '',
    })

    // Admins roles 
    const [adminRoles, setAdminRoles] = useState()

    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        // Set admin cookies data 
        setAdmin_Data(adminData.admin_data)
    }, [])



    // Set phone number providers 
    const all_phone_numbers_providers = []
    phone_number_providers.forEach(item => {

        all_phone_numbers_providers.push({
            id: item.key,
            text: item.name,
            startContent: '',
        })
    })


    // Set admin roles 
    useEffect(() => {
        const { role } = adminData.admin_data


        const all_admin_roles = []
        admins_roles.forEach(item => {

            const id = item.key
            const text = item.name
            const this_role = item.key


            if (role == 'employee') {
                // Redirect the employee to the dashboard 
                router.replace('/admin/dashboard')
            }

            else if (role == 'super_admin') { // Deny super admin from adding another super admin
                if (item.visible && this_role != role) {
                    all_admin_roles.push({
                        id,
                        text,
                        startContent: '',
                    })
                }
            } else if (role == 'admin') { // Deny admin from adding another admin
                if (item.visible && this_role != 'super_admin' && this_role != 'admin') {
                    all_admin_roles.push({
                        id,
                        text,
                        startContent: '',
                    })
                }
            } else {
                if (item.visible) {
                    all_admin_roles.push({
                        id,
                        text,
                        startContent: '',
                    })
                }
            }
        })


        setAdminRoles(all_admin_roles)
    }, [])



    // Set admin state generally 
    function setState(e, target) {
        setAdmin(prevState => { return { ...prevState, [target]: e.target.value } })
    }


    // Set admin state for date picker
    function setStateForDatePicker(e, target) {
        var day = e.day
        var month = e.month
        var year = e.year
        var this_birthday = {
            day,
            month,
            year,
        }
        setAdmin(prevState => { return { ...prevState, [target]: this_birthday } })
    }

    // Set admin state for selector
    function setStateForSelector(e, target) {
        var value = e.target.value
        setAdmin(prevState => { return { ...prevState, [target]: value } })
    }


    async function getAllSuperAdminsOrAdminsOnly(admin_id, role_name, role_visual_name = '') {
        var returned_data = []
        try {
            const response = await fetch(`${admins_api}/getSuperAdminsOrAdminsOnly`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ admin_id, role_name }),
                cache: 'no-cache',
                credentials: 'include'
            })
            const result = await response.json()

            if (result.err) {
                const content = result.msg
                createToast(content, true)
            } else {
                if (result.admins.length == 0) {
                    createToast({ msg: `Try to add new ${role_visual_name} role.`, status: 'error' })
                }

                for (let i = 0; i < result.admins.length; i++) {
                    const admin = result.admins[i];
                    returned_data.push({
                        id: admin._id,
                        text: `${admin.full_name}`,
                        startContent: <Avatar radius="lg" size="sm" src={`${app_images_routes.adminAvatars}/${admin.avatar}`} />,
                    })
                }
            }


        } catch (error) {
            console.log(error)
            createToast({ msg: 'Cannot get your admins list!', status: 'error' })
        } finally {
            return returned_data
        }
    }



    async function setRoleState(e, target) {
        const current_admin_role = admin_Data.role
        const current_admin_id = admin_Data._id
        var value = e.target.value
        var target = target
        var isAllowed = false

        // Empty all admins and all super admins states 
        setAllAdmins([])
        setAllSuperAdmins([])

        // Check the current admin role, if it's not admin then then do whay's inside
        if (current_admin_role != 'admin') {

            setIsChoosingRoleLoading(true)

            // Check the current admin role 
            if (current_admin_role == 'super_admin') {
                if (value == 'employee') {
                    // Get all admins of under the current super admin
                    const all_admins = await getAllSuperAdminsOrAdminsOnly(current_admin_id, 'admin', 'admin')
                    if (all_admins.length > 0) {
                        setAllAdmins(all_admins)
                        isAllowed = true
                        // console.log('all_admins', all_admins)
                    }
                } else {
                    isAllowed = true
                }
            }


            else {
                if (value == 'employee') {
                    // Get all admins
                    const all_admins = await getAllSuperAdminsOrAdminsOnly('all', 'admin', 'admin')
                    if (all_admins.length > 0) {
                        setAllAdmins(all_admins)
                        isAllowed = true

                    }

                } else if (value == 'admin') {
                    // Get all super admins
                    const all_super_admins = await getAllSuperAdminsOrAdminsOnly('all', 'super_admin', 'super admin')
                    if (all_super_admins.length > 0) {
                        setAllSuperAdmins(all_super_admins)
                        isAllowed = true
                        // console.log('all_super_admins', all_super_admins)
                    }
                } else {
                    isAllowed = true
                }
            }

            setIsChoosingRoleLoading(false)
        } else {
            isAllowed = true
        }


        // Is allowed to set the admin role in the state
        if (isAllowed) {
            // console.log('added...')
            setAdmin(prevState => { return { ...prevState, [target]: value } })
        }

    }


    // Set responsable admin, and get all super admins
    // async function setSelectedResponsableAdmin(e, target) {
    //     const current_admin_role = admin_Data.role
    //     const current_admin_id = admin_Data._id
    //     var value = e.target.value
    //     var target = target

    //     // Empty all admins and all super admins states 
    //     setAllAdmins([])
    //     setAllSuperAdmins([])


    //     // Check the current admin role 
    //     if (current_admin_role != 'admin') {

    //         setIsChoosingRoleLoading(true)



    //         if (current_admin_role == 'super_admin') {
    //             // Get all admins of under the current super admin
    //             const all_admins = await getAllSuperAdminsOrAdminsOnly(current_admin_id, 'admin')

    //             setAllAdmins(all_admins)
    //         }


    //         else {
    //             // Get all admins
    //             const all_admins = await getAllSuperAdminsOrAdminsOnly('all', 'admin')
    //             const all_super_admins = await getAllSuperAdminsOrAdminsOnly('all', 'super_admin')
    //             setAllAdmins(all_super_admins)
    //         }



    //         setIsChoosingRoleLoading(false)

    //     }

    //     setAdmin(prevState => { return { ...prevState, [target]: value } })
    // }








    // Send admin to server to be created 
    async function addNewAdmin() {
        // console.log('new Admin added')


        const isAllFilled = Object.values(admin).every(value => {
            return value
        })


        if (isAllFilled) {
            setIsLoading(true)

            if (!admin.created_by) {
                admin.created_by = admin_Data._id
            }


            try {
                const response = await fetch(`${admins_api}/add`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(admin),
                    cache: 'no-cache',
                    credentials: 'include'
                })


                const result = await response.json()

                const content = result.msg
                createToast(content, true)

                setIsLoading(false)

            } catch (error) {
                createToast('Some error happend!')
                setIsLoading(false)
            }


        } else {
            // Create toast
            const content = ['All inputs are required', 'Make sure to fill all inputs below']
            createToast(content, true)
        }



        // return true
    }



    return (
        <div className="flex flex-col gap-[50px]">

            <div className="flex gap-5">

                <div className="flex flex-col gap-5 flex-1">
                    <div className="flex flex-col gap-5">
                        <Title
                            icon={<UserIcon />}
                            title="Admin personal information"
                            text="Here you enter the Admin's personal details"
                        />

                        {/* For typing inputs  */}
                        <div className="grid grid-cols-2 gap-2 gap-y-5">
                            <HtmlInput
                                type="name"
                                placeholder={{ label: 'Full name' }}
                                onChange={(e) => setState(e, 'full_name')}
                            />

                            <HtmlInput
                                type="date_picker"
                                placeholder={{ text: 'Birthday date', defaultValue: '2024-04-04' }}
                                onChange={(e) => setStateForDatePicker(e, 'birthday')}
                            />

                            <HtmlInput
                                type="text"
                                placeholder={{ text: "Address", placeholder: "Admin address", icon: <AddressIcon /> }}
                                onChange={(e) => setState(e, 'address')}
                            />

                            <HtmlInput
                                type="number"
                                placeholder={{ text: 'Phone number', placeholder: "0700000000", icon: <PhoneIcon />, maxLength: 10 }}
                                onChange={(e) => setState(e, 'phone_number')}
                            />

                            <HtmlInput
                                type="select"
                                placeholder={{ name: 'Phone number provider', placeholder: 'Select phone number provider', data: all_phone_numbers_providers, icon: <SettingsIcon /> }}
                                onChange={(e) => setStateForSelector(e, 'phone_number_provider')}
                                inputValue={admin.phone_number_provider}
                            />
                        </div>

                    </div>
                </div>
            </div>


            {/* Admin account details  */}
            <div className="flex gap-5">
                <div className="flex flex-col gap-5 flex-1">
                    <div className="flex flex-col gap-5">

                        <Title
                            icon={<UserAccountIcon />}
                            title="Admin account details"
                            text="Here you enter the Admin's account details"
                        />

                        {/* For typing inputs  */}
                        <div className="grid grid-cols-2 gap-2 gap-y-5">
                            <HtmlInput
                                type="name"
                                placeholder={{ label: 'Username', placeholder: 'Username here' }}
                                onChange={(e) => setState(e, 'username')}

                            />
                            <HtmlInput
                                type="password"
                                placeholder="Admin account password"
                                onChange={(e) => setState(e, 'password')}

                            />
                            <HtmlInput
                                type="email"
                                placeholder="Admin work email"
                                onChange={(e) => setState(e, 'email')}
                            />


                            {
                                adminRoles &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: 'Role', placeholder: 'Select admin role', data: adminRoles, icon: <AdminIcon />, isLoaderVisible: isChoosingRoleLoading }}
                                    onChange={(e) => setRoleState(e, 'role')}
                                    inputValue={admin?.role}
                                />
                            }



                            {/* Contains all admins under the current admin */}
                            {
                                allAdmins && allAdmins.length > 0 &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: 'Responsable admins', placeholder: 'Select admin', data: allAdmins, icon: <AdminIcon /> }}
                                    onChange={(e) => setState(e, 'created_by')}
                                    inputValue={admin?.created_by}
                                />
                            }



                            {/* Contains all super admins under the current admin */}
                            {
                                allSuperAdmins && allSuperAdmins.length > 0 &&
                                <HtmlInput
                                    type="select"
                                    placeholder={{ name: 'Responsable super admins', placeholder: 'Select super admin', data: allSuperAdmins, icon: <AdminIcon /> }}
                                    // onChange={(e) => setState(e, 'responsable_super_admin')}
                                    onChange={(e) => setState(e, 'created_by')}
                                    inputValue={admin?.created_by}
                                />
                            }

                        </div>

                    </div>
                </div>
            </div>

            <HtmlActionHandlerButton
                text="Add new Admin"
                icon={<AddUserIcon />}
                onClick={addNewAdmin}
                isLoaderVisible={isLoading}
            />

        </div>
    )
}
