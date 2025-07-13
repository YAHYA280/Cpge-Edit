"use client"

import NumberTicker from "@/components/magicui/number-ticker"
import { AnalyticsArrowDownIcon, StudyIcon } from "@/constants/Icons"
import { SparkAreaChart } from "@tremor/react"
import CustomersDegreesToStudy from "./AnalyticBoxes/CustomersDegreesToStudy"
import AnalyticBox from "./AnalyticBoxes/AnalyticBox"


const chartdata = [
    {
        month: 'Jan 21',
        Performance: 4000,
    },
    {
        month: 'Feb 21',
        Performance: 3000,
    },
    {
        month: 'Mar 21',
        Performance: 2000,
    },
    {
        month: 'Apr 21',
        Performance: 2780,
    },
    {
        month: 'May 21',
        Performance: 1890,
    },
    {
        month: 'Jun 21',
        Performance: 2390,
    },
    {
        month: 'Jul 21',
        Performance: 3490,
    },
]

export default function AnalyticsContainer() {
    return (
        <div className="flex flex-col gap-7">


            <div className="flex flex-col gap-3 border-1  border-xm p-3 rounded-xl">

                <p className="text-base">Customers</p>

                <div className="grid grid-cols-3 gap-3">
                    <AnalyticBox
                        chartType='spark-chart'
                        name='Revenue'
                        visualValue='30000'
                        chartData={chartdata}
                        increasement='+4.3%'
                    />

                    {/* <div className="flex flex-col gap-3 bg-dark-1 border-1 p-3 rounded-xl">
                        <div className="flex items-center gap-2">
                            <AnalyticsArrowDownIcon special_size={25} />
                            <p className="font-medium text-[1'px]">Revenue</p>

                            <p className="p-1 px-1.5 text-[12px] rounded-lg bg-red-500 border-1 border-red-900 bg-opacity-5 text-red-400">+4.3%</p>
                        </div>

                        <div>
                            <span className="text-xl font-normal flex gap-1">
                                MAD
                                <NumberTicker value={30000} />
                            </span>
                        </div>

                        <div className="h-[100px]  rounded-xl bg-opacity-35">

                            <SparkAreaChart
                                showAnimation={true}
                                data={chartdata}
                                categories={['Performance']}
                                index={'month'}
                                colors={['emerald']}
                                className="h-full w-full"
                            />
                        </div>

                    </div> */}


                    {/* Get my all customers, and filter by bachlore, master and phd applies  */}
                    <CustomersDegreesToStudy />




                </div>

            </div>

        </div>
    )
}
