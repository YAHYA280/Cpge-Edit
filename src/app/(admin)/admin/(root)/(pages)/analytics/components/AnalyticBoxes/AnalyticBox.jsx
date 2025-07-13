import NumberTicker from "@/components/magicui/number-ticker"
import { BarList, SparkAreaChart } from "@tremor/react"

export default function AnalyticBox({ chartType, name, visualValue = '', chartData, increasement = '4.3%+' }) {

    switch (chartType) {
        case 'bar-list':

            return (
                <div className="flex flex-col gap-3 bg-dark-1 border-1 p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-[15px]">{name}</p>
                    </div>

                    <div className="h-[100px]  rounded-xl bg-opacity-35">
                        <BarList showAnimation={true} data={chartData} className="mt-2" />
                    </div>

                </div>
            )

        case 'spark-chart':

            return (
                <div className="flex flex-col gap-3 bg-dark-1 border-1 p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-[15px]">{name}</p>

                        <p className="p-1 px-1.5 text-[12px] rounded-lg bg-red-500 border-1 border-red-900 bg-opacity-5 text-red-400">{increasement}</p>
                    </div>

                    <div>
                        <span className="text-xl font-normal flex gap-1">
                            MAD
                            <NumberTicker value={visualValue} />
                        </span>
                    </div>

                    <div className="h-[100px]  rounded-xl bg-opacity-35">
                        <SparkAreaChart
                            showAnimation={true}
                            data={chartData}
                            categories={['Performance']}
                            index={'month'}
                            colors={['emerald']}
                            className="h-full w-full"
                        />
                    </div>

                </div>
            )
    }



}
