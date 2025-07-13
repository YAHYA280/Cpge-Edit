"use client"

import createToast from "@/app/assets/components/toast"
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton"
import HtmlInput from "@/app/assets/smallComponents/HtmlInput"
import { backend_base_api } from "@/constants/_api"
import { DangerIcon, LoginIcon } from "@/constants/Icons"
import { useState } from "react"
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation"


export default function UserLoginForm() {
    const router = useRouter()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isButtonLoading, setIsButtonLoading] = useState(false)
    const [error, setError] = useState('')


    async function handleLogin() {

        if (!username || !password) {
            setError('Username or password is missing!')
        } else {


            try {
                setIsButtonLoading(true)

                const response = await fetch(`${backend_base_api}/customerLogin`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                    cache: 'no-cache',
                    credentials: 'include'
                })



                const result = await response.json()

                console.log(result)

                if (result.err) {
                    setError(result.msg)
                } else {

                    const customer_data = result.data
                    const customer_token = result.token

                    // Set customer data to cookies 
                    Cookies.set('customer_data', JSON.stringify(customer_data))
                    Cookies.set('customer_token', JSON.stringify(customer_token))

                    // Create alert
                    createToast({ msg: 'Your are logged in successfully', status: 'success' })


                    const user_fav_language = customer_data.language

                    // Replace user to dashboard 
                    window.location.replace(`/${user_fav_language}/account`)

                }

            } catch (error) {
                setError('Something went wrong with the server! Please try again.')
                console.log(error)
            } finally {
                setIsButtonLoading(false)
            }
        }
    }

    return (
        <div className="flex flex-col gap-5 lg:w-2/3 md:w-2/3 sm:w-full ml-auto mr-auto">
            <HtmlInput
                type="username"
                placeholder="Your username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <HtmlInput
                type="password"
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
            />

            {/* <input type="hidden" name="user_type" value="user" /> */}

            <HtmlActionHandlerButton
                text="Login"
                icon={<LoginIcon />}
                onClick={handleLogin}
                isLoaderVisible={isButtonLoading}
            />


            {
                error &&
                <p className='text-red-400 text-sm flex items-center gap-2'>
                    <DangerIcon />
                    {error}
                </p>
            }
        </div>
    )
}
