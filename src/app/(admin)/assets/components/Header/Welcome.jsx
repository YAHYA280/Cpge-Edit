"use client"

import { useState, useEffect } from 'react';


export default function Welcome({ username }) {
    const [currentDate, setCurrentDate] = useState(new Date())

    // const currentDate = new Date().toDateString();
    // const now = new Date();
    // // const day = now.getDay(); // returns a number representing the day of the week, starting with 0 for Sunday
    // const hours = now.getHours();
    // const minutes = now.getMinutes();


    useEffect(() => {
        // Function to update the date
        const updateDate = () => {
            setCurrentDate(new Date());
        };

        // Update the date every second
        const intervalId = setInterval(updateDate, 1000);

        // Cleanup interval on unmount
        return () => clearInterval(intervalId)
    }, [])

    // Format the date as "Mon Sep 16 2024 | 17:44"
    const formattedDate = `${currentDate.toDateString()} | ${currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    // This one if the user want to show the time as 24 hours => hour12: false
    // const formattedDate = `${currentDate.toDateString()} | ${currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12: false })}`;




    return (
        <div className="left-side">
            <h1 className="text-lg font-normal ">Welcome back, {username} 👋 </h1>
            {/* <p className="text-xs text-gray-400">{currentDate} | {hours}:{minutes} </p> */}
            <p className="text-xs text-gray-400">{formattedDate}</p>
        </div>
    )
}
