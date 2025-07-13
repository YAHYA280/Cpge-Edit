"use client"




import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import AnalyticsSwiper from "./AnalyticsSwiper";
import RecentInvoices from "./RecentInvoices";
import RecentCustomers from "./RecentCustomers";
import { admins_api } from "@/constants/_api";
import customers_steps from "@/constants/customers_steps";
import { extractDateFromTimestamp, getAge } from "@/constants/functions";
import createToast from "@/app/assets/components/toast";

export default function DashboardPage() {
    const [adminData, setAdminData] = useCookies('admin_data')

    const [customers, setCustomers] = useState();
    // const { username, full_name, email, favorite_theme, image, role, _id } = adminData.admin_data

    const [admin_Data, setAdmin_Data] = useState();


    useEffect(() => {
        setAdmin_Data(adminData.admin_data)
        const { _id } = adminData.admin_data

        console.log(adminData.admin_data)



        const getRecentCustomers = async () => {

            try {
                // setLoadingCustomer(true)
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
                // console.log('All results: ', result.customers)


                if (!result.err) {
                    // setCustomers(result.customers)
                    const customers_arr = []

                    for (let i = 0; i < result.customers.length; i++) {

                        var { _id: customer_id, first_name, last_name, customer_photo, birthday, phone_number, email, createdAt, status, current_step, departement_to_study: departement } = result.customers[i]

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

                } else {
                    createToast(result.msg, true)
                }
            } catch (error) {
                console.log(error.message, error)
            } finally {
                // setLoadingCustomer(false)
            }
        }
        // Get all customers 
        getRecentCustomers()

    }, [])

 

    return (
        <>
            {
                admin_Data &&
                <div className="flex flex-col gap-5">
                    <div className="flex">

                        <div className="flex flex-col gap-5 w-[500px]">
                            <p className="text-4xl font-bold">Hi, {admin_Data.full_name.split(" ")[0]} 👋 <br /> Discover the News on<br /> your dashboard </p>
                            <p className="text-xs text-gray-1">You can access all your anayltics in the Analytics page.</p>
                        </div>

                        {/* Swiper  */}
                        <AnalyticsSwiper customers={customers || []} />
                    </div>


                    {/* Midlle side  */}
                    <div className="flex flex-col gap-5">

                        {/* Recent invoices  */}
                        <RecentInvoices />


                        {/* Recent customers  */}
                        {/* {
                            customers &&
                            <RecentCustomers customers={customers} />
                        } */}




                    </div>



                </div>
            }
        </>
    )
}
