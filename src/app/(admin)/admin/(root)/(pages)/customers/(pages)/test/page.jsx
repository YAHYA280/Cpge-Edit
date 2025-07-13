"use client"

import useHook from "./Hook";

const Custom = () => {

    const { Template, data, setData } = useHook()


    return (
        <div>
            <Template />
        </div>

    );
};

export default Custom;



