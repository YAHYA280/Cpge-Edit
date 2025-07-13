"use client"
import createToast from '@/app/assets/components/toast';
import { admins_api } from '@/constants/_api';
import { study_degrees } from '@/constants/constants';
import { StudyIcon } from '@/constants/Icons';
import { BarList, Card, SparkAreaChart } from '@tremor/react';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import AnalyticBoxSkeleten from './AnalyticBoxSkeleten';
import AnalyticBox from './AnalyticBox';


export default function CustomersDegreesToStudy() {

    const [adminData, setAdminData] = useCookies(['admin_data'])

    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        // Get customers 
        var { _id, role } = adminData.admin_data

        const fetchData = async () => {

            try {
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
                    // const customers_arr = []
                    const customers_arr = {
                        bachelor: [],
                        master: [],
                        phd: [],
                    }
                    const my_customers = result.customers



                    // Fetch all study_degrees 
                    study_degrees.forEach(study_degree => {
                        const key = study_degree.key
                        const name = study_degree.name.en

                        // Fetch all customers, and if study_degree key matches with what the customer want to study,then integrate it 
                        for (let i = 0; i < my_customers.length; i++) {
                            const customer = my_customers[i]
                            const study_degree = customer.study_degree

                            // If study_degree key matches with what the customer want to study, then integrate it 
                            if (study_degree == key) {
                                customers_arr[key].push(customer)
                            }
                        }
                    })




                    // Set the data into the state 
                    const myData = []


                    study_degrees.forEach(study_degree => {
                        const key = study_degree.key
                        const name = study_degree.name.en
                        const color = study_degree.color

                        // If there is data for this study_degree
                        if (customers_arr[key]) {
                            const totalCustomers = customers_arr[key].length

                            myData.push({
                                name,
                                value: totalCustomers,
                                color
                            },)
                        }
                    })


                    setData(myData)
                    console.log(myData)

                } else {
                    createToast(result.msg, true)
                }
            } catch (error) {
                console.log(error.message, error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()

    }, [])



    return (
        <>
            {
                isLoading &&
                <AnalyticBoxSkeleten />
            }



            {
                !isLoading &&
                <AnalyticBox
                    chartType='bar-list'
                    name='Degrees to study'
                    chartData={data}
                />
            }
        </>
    )
}
