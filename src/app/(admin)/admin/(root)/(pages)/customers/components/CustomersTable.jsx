"use client"

import { useEffect, useRef, useState } from 'react'
import { admins_api, cpe_api, cpe_countries_images, filter_api } from '@/constants/_api'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Avatar, Badge, Pagination, Spinner, User, Button, Tooltip } from "@nextui-org/react";

import { useCookies } from 'react-cookie'
import { columns } from '../data'
import NoCustomersToDisplay from './NoCustomersToDisplay'
import LoadingCustomers from './LoadingCustomers'
import createToast from '@/app/assets/components/toast';
import { app_images_routes } from '@/constants/routes';
import Status from '../(pages)/manageInvoices/[customerId]/components/Status';
import { extractDateFromTimestamp, getAge } from '@/constants/functions';
import CustomersActionsDropbox from './CustomersActionsDropbox';
import customers_steps from '@/constants/customers_steps';
import HtmlInput from '@/app/assets/smallComponents/HtmlInput';
import { EmailIcon, FlagIcon, FolderIcon, HideIcon, InProcessIcon, PhoneIcon, SearchIcon, StepIcon, StudyIcon, TransactionIdIcon, UserIcon } from '@/constants/Icons';
import { customers_statuses, study_degrees } from '@/constants/constants';
import { packages } from '@/constants/packages';
import HtmlActionHandlerButton from '@/app/assets/smallComponents/HtmlActionHandlerButton';
import axios from 'axios';
import { cn } from '@/lib/utils';
import admins_roles from '@/constants/admins_roles';
import Image from 'next/image';
import HtmlSeparator from '@/app/assets/smallComponents/HtmlSeparator';
import ToClipboard from '@/app/assets/smallComponents/ToClipboard';

export default function CustomersTable() {
    const [customers, setCustomers] = useState()
    const [LoadingCustomer, setLoadingCustomer] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState()

    const [selectedPackages, setSelectedPackages] = useState()
    const [studyDegrees, setStudyDegrees] = useState()
    const [countries, setCountries] = useState()
    const [statuses, setStatuses] = useState()
    const [steps, setSteps] = useState()
    const [admins, setAdmins] = useState()


    const [isSearchBtnLoasing, setIsSearchBtnLoasing] = useState(false);

    const [filter, setFilter] = useState({})

    const removeFilterRef = useRef()

    // console.log(filter)

    // Current admin role from the cookies 
    const [adminData, setAdminData] = useCookies(['admin_data'])
    var [admin_Data, setAdmin_Data] = useState()

    useEffect(() => {
        setAdmin_Data(adminData.admin_data)
    }, [])



    useEffect(() => {
        var { _id, role } = adminData.admin_data

        const fetchData = async () => {

            try {
                setLoadingCustomer(true)
                const response = await fetch(`${admins_api}/customers`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ _id }),
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()


                if (!result.err) {
                    // setCustomers(result.customers)
                    const customers_arr = []

                    for (let i = 0; i < result.customers.length; i++) {

                        var { _id: customer_id, first_name, last_name, username, customer_photo, birthday, phone_number, email, createdAt, status, current_step, departement_to_study: departement } = result.customers[i]

                        if (status == 'active') {
                            status = ['Active', 'active']
                        } if (status == 'unactive') {
                            status = ['Unactive', 'unactive']
                        } else if (status == 'completed') {
                            status = ['Completed', 'completed']
                        } else if (status == 'deleted') {
                            status = ['Deleted', 'deleted']
                        }

                        // console.log(status)

                        // Fetch customer steps to get the current step name 
                        for (let i = 0; i < customers_steps.length; i++) {
                            const step = customers_steps[i]
                            if (step.key == current_step) {
                                current_step = {
                                    icon: step.icon,
                                    idName: step.idName,
                                }
                            }

                        }

                        customers_arr.push({
                            key: customer_id,
                            full_name: `${first_name} ${last_name}`,
                            username,
                            customer_photo,
                            email,
                            phone_number,
                            current_step,
                            departement,
                            age: getAge(birthday),
                            createdAt: extractDateFromTimestamp(createdAt).finalFormattedDate,
                            status, // Pending, Accepted, Refused
                        })
                    }


                    setCustomers(customers_arr)
                    // console.log(customers_arr)

                } else {
                    createToast(result.msg, true)
                }
            } catch (error) {
                console.log(error.message, error)
            } finally {
                setLoadingCustomer(false)
            }
        }
        fetchData()




        if (role != 'employee') {
            // Get all admins list accourding to the current admin role
            const getAllAdmins = async () => {
                // const { _id } = adminData.admin_data
                try {
                    setLoadingCustomer(true)
                    const response = await fetch(`${admins_api}/getAdminsOfSpecificRole`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ admin_id: _id }),
                        cache: 'no-cache',
                        credentials: 'include'
                    })

                    const result = await response.json()

                    if (!result.err) {
                        // console.log('All admins: ', result.admins)
                        const admins_arr = []

                        for (let i = 0; i < result.admins.length; i++) {
                            var { _id: admin_id, full_name, avatar, phone_number, email, role } = result.admins[i]

                            for (let a = 0; a < admins_roles.length; a++) {
                                var current_role = admins_roles[a]
                                if (current_role.key == role) {
                                    role = current_role.name
                                }
                            }

                            admins_arr.push({
                                id: admin_id,
                                text: full_name,
                                subtext: role,
                                startContent: <Avatar radius="lg" size="sm" src={`${app_images_routes.adminAvatars}/${avatar}`} />,
                            })
                        }


                        setAdmins(admins_arr)
                    } else {
                        createToast(result.msg, true)
                    }
                } catch (error) {
                    console.log(error.message, error)
                }
            }
            getAllAdmins()
        }

        // const existing_cookies_data = adminData.admin_data
        // setAdminData('admin_data', { ...existing_cookies_data, full_name: 'Zaina mmch' });

    }, [])


    // Fetch all countries 
    useEffect(() => {
        const fetchAgenceAvailableCountries = async () => {
            try {
                const { data: response } = await axios.get(`${cpe_api}?target=countries`);
                const all_countries = []

                for (let i = 0; i < response.length; i++) {
                    const country = response[i]
                    all_countries.push({
                        id: country.id,
                        text: country.name,
                        startContent: <Avatar radius="lg" size="sm" src={`${cpe_countries_images}/${country.flag}`} />,
                    })
                }
                setCountries(all_countries);
            } catch (error) {
                console.log('error:', error.message);
            }
        }

        fetchAgenceAvailableCountries()
    }, [])



    useEffect(() => {

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




        // Set statuses into the state 
        const all_statuses = []
        for (let i = 0; i < customers_statuses.length; i++) {
            const status = customers_statuses[i]
            all_statuses.push({
                id: status.key,
                text: status.name.en,
                startContent: <span className={cn('h-2 w-2 rounded-full', status.background)} />,
            })

        }
        setStatuses(all_statuses)




        // Set steps into the state 
        const all_steps = []
        for (let i = 0; i < customers_steps.length; i++) {
            const step = customers_steps[i]
            all_steps.push({
                id: step.key,
                text: step.name.en,
                startContent: step.icon,
            })
        }

        setSteps(all_steps)
    }, [])



    function setFilterStateForInput(e, target, name) {
        var value = e.target.value
        const obj = {
            [target]: {
                name,
                value,
                target,
            }
        }


        setFilter(prevState => {
            return (
                {
                    ...prevState,
                    [target]: {
                        target,
                        value,
                        inputName: name,
                    }
                }
            )
        });
    }



    function removeFilterItem(target) {
        const filterItems = { ...filter }
        delete filterItems[target] // Delete the item
        setFilter(filterItems)
    }


    // Handle filter into server 
    async function handleFilter() {
        const { _id } = adminData.admin_data

        const filtering_items = {}

        const filter_object_keys = Object.keys(filter)
        for (let i = 0; i < filter_object_keys.length; i++) {
            const target = filter_object_keys[i]
            const value = filter[target].value

            // Remove empty object values 
            if (!value) {
                delete filter[target]
            } else {
                filtering_items[target] = value
            }
        }

        try {
            // Start filter button loader 
            setIsSearchBtnLoasing(true)

            const response = await fetch(`${filter_api}/filterCustomers`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ filter: filtering_items, _id }),
                cache: 'no-cache',
                credentials: 'include'
            })

            const result = await response.json()
            console.log('Customers: ', result.data)


            if (!result.err) {

                const customers_arr = []
                if (result.data.length > 0) {
                    for (let i = 0; i < result.data.length; i++) {

                        var { _id: customer_id, first_name, last_name, customer_photo, birthday, phone_number, email, createdAt, status, current_step, departement_to_study: departement } = result.data[i]

                        if (status == 'active') {
                            status = ['Active', 'active']
                        } if (status == 'unactive') {
                            status = ['Unactive', 'unactive']
                        } else if (status == 'completed') {
                            status = ['Completed', 'completed']
                        } else if (status == 'deleted') {
                            status = ['Deleted', 'deleted']
                        }

                        // Fetch customer steps to get the current step name 
                        for (let i = 0; i < customers_steps.length; i++) {
                            const step = customers_steps[i]
                            if (step.key == current_step) {
                                current_step = {
                                    icon: step.icon,
                                    idName: step.idName,
                                }
                            }

                        }

                        customers_arr.push({
                            key: customer_id,
                            full_name: `${first_name} ${last_name}`,
                            customer_photo,
                            email,
                            phone_number,
                            current_step,
                            departement,
                            age: getAge(birthday),
                            createdAt: extractDateFromTimestamp(createdAt).finalFormattedDate,
                            status, // Pending, Accepted, Refused
                        })
                    }
                }

                setCustomers(customers_arr)


            } else {
                createToast(result.msg, true)
            }
        } catch (error) {
            console.log(error.message, error)
        } finally {
            setIsSearchBtnLoasing(false)
            // console.log(filter)
        }
        // }


    }

    return (
        <>
            {
                admin_Data &&
                <div className="flex flex-col gap-5">

                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-5 p-2 rounded-xl border-1'>
                            <div className='flex items-center gap-2 flex-wrap'>
                                {
                                    Object.keys(filter).map((item) => {
                                        const { inputName, target, value } = filter[item]

                                        return (
                                            <div key={value} className='flex items-center gap-1 bg-dark-3 bg-opacity-20 border-1 py-1 px-2 rounded-lg w-fit'>
                                                <p className='text-dark-1 dark:text-light-1 text-sm'>{inputName}</p>
                                                <Button
                                                    ref={removeFilterRef}
                                                    className='w-[25px] h-[25px] ml-2 bg-opacity-20 hover:bg-opacity-30 rounded-lg px-0 min-w-0 text-text_color-1'
                                                    onClick={() => removeFilterItem(target)}
                                                >
                                                    <HideIcon special_size={16} />
                                                </Button>
                                            </div>
                                        )
                                    })
                                }
                            </div>


                            <div className='w-full grid grid-cols-3 items-center gap-2 ' >

                                <HtmlInput
                                    type="text"
                                    placeholder={{
                                        text: "Filter by something",
                                        placeholder: "Search ...",
                                        icon: <UserIcon />,
                                    }}
                                    inputValue={filter?.random?.value}
                                    onChange={(e) => setFilterStateForInput(e, 'random', e.target.value)}
                                />


                                {
                                    countries &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{
                                            name: `Country destination`,
                                            placeholder: 'Filter by country',
                                            data: countries,
                                            icon: <FlagIcon />,
                                        }}
                                        onChange={(e) => setFilterStateForInput(e, 'country_destination_to_study_at', 'Country')}
                                        inputValue={filter?.country_destination_to_study_at?.value}
                                    />
                                }

                                {
                                    countries &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{
                                            name: 'Departement',
                                            placeholder: 'Filter by departement',
                                            data: countries,
                                            icon: <FlagIcon />,
                                            // selectedItems: [filter?.departement_to_study]
                                        }}
                                        onChange={(e) => setFilterStateForInput(e, 'departement_to_study', 'Departement')}
                                        inputValue={filter?.departement_to_study?.value}


                                    />
                                }



                                {
                                    selectedPackages &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{
                                            name: 'Package',
                                            placeholder: 'Filter by package',
                                            data: selectedPackages,
                                            icon: <FolderIcon />,
                                            // selectedItems: [filter?.package_id]
                                        }}
                                        onChange={(e) => setFilterStateForInput(e, 'package_id', 'Package')}
                                        inputValue={filter?.package_id?.value}
                                    />
                                }


                                {
                                    studyDegrees &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{
                                            name: 'Study degree',
                                            placeholder: 'Filter by degree',
                                            data: studyDegrees,
                                            icon: <StudyIcon />,
                                            // selectedItems: [filter?.study_degree]
                                        }}
                                        // onChange={(e) => setFilterStateForInput(e, 'study_degree')}
                                        onChange={(e) => setFilterStateForInput(e, 'study_degree', 'Study degree')}
                                        inputValue={filter?.study_degree?.value}

                                    />
                                }




                                {
                                    statuses &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{
                                            name: 'Status',
                                            placeholder: 'Filter by status',
                                            data: statuses,
                                            icon: <InProcessIcon />,
                                            // selectedItems: [filter?.status]
                                        }}
                                        // onChange={(e) => setFilterStateForInput(e, 'status')}
                                        onChange={(e) => setFilterStateForInput(e, 'status', 'Status')}
                                        inputValue={filter?.status?.value}


                                    />
                                }





                                {
                                    steps &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{
                                            name: 'Steps',
                                            placeholder: 'Filter by step',
                                            data: steps,
                                            icon: <StepIcon />,
                                        }}
                                        onChange={(e) => setFilterStateForInput(e, 'current_step', 'Current step')}
                                        inputValue={filter?.current_step?.value}
                                    />
                                }



                                {
                                    admins &&
                                    <HtmlInput
                                        type="select"
                                        placeholder={{
                                            name: 'Admins',
                                            placeholder: 'Filter by responsables',
                                            data: admins,
                                            icon: <StepIcon />,
                                        }}
                                        onChange={(e) => setFilterStateForInput(e, 'created_by', 'Responsable admin')}
                                        inputValue={filter?.created_by?.value}
                                    />
                                }

                            </div>


                            {/* BUTTON  */}
                            <div className='flex gap-2'>
                                <HtmlActionHandlerButton
                                    isLoaderVisible={isSearchBtnLoasing}
                                    text="Filter"
                                    icon={<SearchIcon />}
                                    onClick={handleFilter}
                                    className='flex-1'
                                />

                                <Button
                                    onClick={() => setFilter({})}
                                    className={cn('w-fit ', {
                                        'bg-red-600': Object.keys(filter) != 0
                                    })}
                                >
                                    Clear filter
                                </Button>
                            </div>
                        </div>



                        <Table
                            removeWrapper
                            aria-label="Controlled table example with dynamic content"
                            selectionMode="multiple"
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}
                            className='bg-light-1 dark:bg-dark-1 rounded-xl border-1 overflow-hidden'
                        >
                            <TableHeader>
                                {
                                    columns.map(({ key, label, icon }) => (
                                        <TableColumn key={key}>
                                            <div className='flex items-center gap-1'>
                                                {icon} {label}
                                            </div>
                                        </TableColumn>
                                    ))
                                }
                            </TableHeader>

                            <TableBody isLoading={LoadingCustomer} loadingContent={<LoadingCustomers />} emptyContent={<NoCustomersToDisplay />}>
                                {
                                    customers && !LoadingCustomer &&
                                    customers.map(({ key, full_name, username, age, customer_photo, email, phone_number, createdAt, status, current_step, departement }) => (
                                        <TableRow key={key} className='border-b-1 last:border-none border-opacity-20'>
                                            <TableCell className='flex items-center gap-2'>
                                                <Tooltip size="sm" placement='right' delay={1000} content={<CustomerDetailsTooltip data={{ key, full_name, username, age, customer_photo, email, phone_number, createdAt, status, current_step, departement }} />}>
                                                    <User
                                                        avatarProps={{ isBordered: true, radius: "lg", size: "sm", src: `${app_images_routes.customersPhotos}/${customer_photo}` }}
                                                        classNames={{
                                                            description: "text-default-500",
                                                        }}
                                                        description={email}
                                                        name={full_name}
                                                    >
                                                    </User>
                                                </Tooltip>

                                            </TableCell>

                                            <TableCell>
                                                <p className='truncate max-w-[150px] flex items-center gap-1'>
                                                    {current_step.icon}
                                                    {current_step.idName}
                                                </p>
                                            </TableCell>


                                            <TableCell>
                                                <p>departement</p>
                                                {/* <p>{departement}</p> */}
                                            </TableCell>

                                            {/* <TableCell>
                                                <p>{age} years</p>
                                            </TableCell> */}

                                            {/* <TableCell>
                                                <p>{phone_number}</p>
                                            </TableCell> */}


                                            <TableCell>
                                                <div>
                                                    {
                                                        status[1] == 'active' &&
                                                        <Status color={"bg-green-700"} text={status[0]} borderColor={'border-green-700'} />
                                                    }
                                                    {
                                                        status[1] == 'completed' &&
                                                        <Status color={"bg-blue-700"} text={status[0]} borderColor={'border-blue-400'} />
                                                    }
                                                    {
                                                        status[1] == 'unactive' &&
                                                        <Status color={"bg-yellow-600"} text={status[0]} borderColor={'border-red-400'} />
                                                    }

                                                    {
                                                        status[1] == 'deleted' &&
                                                        <Status color={"bg-red-600"} text={status[0]} borderColor={'border-red-400'} />
                                                    }
                                                </div>

                                            </TableCell>
                                            <TableCell>
                                                <p className='text-xs rounded-3xl px-3 py-1 w-fit'>{createdAt}</p>
                                            </TableCell>

                                            <TableCell>
                                                <CustomersActionsDropbox id={key} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>

                </div>
            }
        </>
    )
}







function CustomerDetailsTooltip({ data }) {

    const { key, full_name, username, age, customer_photo, email, phone_number, createdAt, status, current_step, departement } = data


    return (
        <div className='flex flex-col gap-2'>

            <div className='flex items-center gap-2'>
                <Image
                    src={`${app_images_routes.customersPhotos}/${customer_photo}`}
                    height={50}
                    width={50}
                    alt='Customer photo'
                    className='rounded-full'
                />

                <div className='flex flex-col gap-1'>
                    <p className='font-semibold text-base'>{full_name}</p>

                    <div className='flex items-center gap-1'>
                        <p>{username}</p>
                        <span className='bg-gray-600 bg-opacity-25 h-1 w-1 rounded-full' />
                        <p>{age} years</p>
                    </div>
                </div>
            </div>


            <HtmlSeparator />


            <div className='flex flex-col gap-1'>
                <span className='flex items-center gap-1'>
                    <EmailIcon className='text-blue-700 font-semibold' special_size={17} />
                    <p className='text-xs'>{email}</p>
                </span>
                <span className='flex items-center gap-1'>
                    <PhoneIcon className='text-blue-700' special_size={17} />
                    <p className='text-xs'>{phone_number}</p>
                </span>

            </div>

        </div>
    )
}
