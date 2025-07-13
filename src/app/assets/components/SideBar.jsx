import { cn } from "@/lib/utils"


const user_steps = [
    {
        id: 1,
        title: "Your personal information",
        sub_title: "This is the sub title for step 1",
        status: "finished",
    },
    {
        id: 2,
        title: "This is step 2",
        sub_title: "This is the sub title for step 1",
        status: "current",
    },
    {
        id: 3,
        title: "This is step 3",
        sub_title: "This is the sub title for step 1",
        // status: "current",
    },
    {
        id: 4,
        title: "This is step 4",
        sub_title: "This is the sub title for step 1",
        // status: "current",
    },
    {
        id: 5,
        title: "This is step 5",
        sub_title: "This is the sub title for step 1",
        // status: "current",
    },
]

/** 
 finished => The step already finished and done
 in process => The step is in process
 current => This is the current step, and you must fill the blanks
 next => This is the current step, and you must fill the blanks

**/

export default function SideBar() {
    return (
        <div className="flex flex-col gap-2 h-full border-r-1 w-[500px] p-10 pt-5 bg-light-1 dark:bg-dark-1">

            {
                user_steps.map((user_step, i) => {
                    const id = user_step.id
                    const title = user_step.title
                    const sub_title = user_step.sub_title
                    var box_design = 'opacity-50'
                    var cyrcle_design = ''
                    // const is_last_box = i == user_steps.length - 1 ? true : false
                    // console.log(is_last_box)

                    if (user_step.status) {
                        const status = user_step.status

                        // This design applies on the boxes in default 

                        if (status == 'finished') {
                            cyrcle_design = 'border-own_primary-1'
                        }

                        if (status == 'current') {
                            cyrcle_design = 'bg-own_primary-1 border-transparent'
                            box_design = ''
                        }

                    }


                    return (
                        <div key={id} className={`flex flex-col items-start gap-2 rounded-md`}>
                            <div className={`flex items-center gap-3 rounded-md ${box_design}`}>
                                <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2  text-dark-1 ${cyrcle_design}`}>
                                    {id}
                                </div>

                                <div className="flex flex-col">
                                    <p className="text-base font-semibold">{title}</p>
                                    <p className="text-sm text-gray-1">{sub_title}</p>
                                </div>
                            </div>

                            {
                                i < user_steps.length - 1 && (
                                    <svg className="translate-x-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}>
                                        <path d="M10.3974 18.5859L9.63612 17.6194C8.40264 16.0536 7.7859 15.2707 8.06721 14.6354C8.34853 14 9.31191 14 11.2387 14H12.7613C14.6881 14 15.6515 14 15.9328 14.6354C16.2141 15.2707 15.5974 16.0536 14.3639 17.6194L13.6026 18.5858C12.8599 19.5286 12.4885 20 12 20C11.5115 20 11.1401 19.5286 10.3974 18.5859Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 14L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )
                            }

                        </div>
                    )
                })
            }



        </div>
    )
}
