import React, { useState } from 'react'

export default function useHook() {

    const [data, setData] = useState('Data are here...');




    function Template() {
        return (
            <div>
                {data}
            </div>
        )
    }


    return { Template, data, setData }
}


