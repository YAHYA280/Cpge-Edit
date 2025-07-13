import NumberTicker from '@/components/magicui/number-ticker'
import { CarouselItem } from '@/components/ui/carousel'
import { AnalyticsArrowDownIcon, AnalyticsArrowUpIcon, CustomerIcon } from '@/constants/Icons'
import { SparkAreaChart, SparkLineChart, SparkBarChart } from '@tremor/react';



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



export default function CarouselUiItem({ title, total, percentage, analytics_status, chartColor = 'emerald' }) {
    return (
        <CarouselItem className="basis-1/2">

            <div className="bg-dark-2 p-4 border-1 border-dashed flex flex-col gap-5 rounded-2xl">
                <div className="flex gap-3 items-center">
                    <span className="bg-light-3 dark:bg-dark-1 border-1 rounded-2xl h-[40px] w-[40px] flex items-center justify-center">
                        <CustomerIcon />
                    </span>
                    <p className="flex gap-1 items-end text-base font-medium">{title}</p>
                </div>
                <div className='flex justify-between gap-4'>
                    <p className="text-4xl font-bold">
                        <NumberTicker value={total} />
                    </p>



                    <SparkAreaChart
                        showAnimation={true}
                        data={chartdata}
                        categories={['Performance']}
                        index={'month'}
                        // colors={['emerald']}
                        colors={[chartColor]}
                        className="h-8 w-full sm:h-10"
                    />
                </div>

                <div className="border-t-1 pt-2 flex justify-between  text-sm">
                    {
                        analytics_status == 'up' ? <span className="text-green-500 flex gap-1 items-center">
                            <AnalyticsArrowUpIcon />
                            <p>+{percentage}</p>
                        </span> :
                            <span className="text-red-500 flex gap-1 items-center">
                                <AnalyticsArrowDownIcon />
                                <p>+{percentage}</p>
                            </span>
                    }

                    <p>Than last mounth</p>
                </div>
            </div>
        </CarouselItem>

    )
}
