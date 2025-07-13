'use client'
import HtmlInput from '@/app/assets/smallComponents/HtmlInput'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { useState } from 'react';
import HtmlButton from '@/app/assets/smallComponents/HtmlButton';
import { DangerIcon, LoginIcon, UserIcon } from '@/constants/Icons';
import HtmlActionHandlerButton from '@/app/assets/smallComponents/HtmlActionHandlerButton';
import axios from 'axios';
import { admins_api, backend_base_api } from '@/constants/_api';
import { useRouter } from 'next/navigation'
import createToast from '@/app/assets/components/toast';
import Cookies from 'js-cookie';


export default function Login() {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    // const [_, setAdminData] = useCookies(['admin_data'])
    // Inputs states 
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    async function login() {
        setIsLoading(true)
        setError('')

        if (!username || !password) {
            setError('Username or password is missing!')
            setIsLoading(false)

        } else {

            axios.defaults.withCredentials = true
            try {
                await axios.post(`${backend_base_api}/adminLogin`, {
                    username,
                    password,
                })
                    .then(function (response) {
                        const { loginStatus } = response.data

                        if (!loginStatus) {
                            setError(response.data.msg)

                        } else {
                            const result = response.data

                            console.log(result.data)

                            // Set admin data to cookies 
                            Cookies.set('admin_data', JSON.stringify(result.data));
                            Cookies.set('admin_token', JSON.stringify(result.token))

                            // Create alert
                            createToast({ msg: 'Your are logged in successfully', status: 'success' })

                            // Replace user to dashboard 
                            window.location.replace('/admin/dashboard')

                        }

                        setIsLoading(false)


                    })
                    .catch(function (error) {
                        console.log('error', error)
                        setError('Something went wrong! Please try again.')
                        setIsLoading(false)
                    });
            } catch (error) {
                setError('Something went wrong with the server! Please try again.')
                setIsLoading(false)
            }
        }
    }

    function handleLogin() {
        login()

    }


    function handleSubmitForm(e) {
        e.preventDefault()
        login()

    }





    return (
        <main className='flex h-screen'>
            <div className='w-1/2 h-full p-10 bg-login-background bg-no-repeat flex flex-col relative'>
                <Image
                    src={'/icons/cpe.svg'}
                    height={30}
                    width={120}
                    alt='Logo'
                />
                <p className='text-6xl mt-40 text-white'>Welcome Back to <br /> <span className='text-own_primary-1'>CPE</span> Panel</p>

                <p className='text-gray-1 mt-auto'>Ⓒ2024 CPE. All Rights Reserved.</p>

                <Image
                    src={'/backgrounds/circles-bg.svg'}
                    height={150}
                    width={150}
                    alt='background'
                    className='absolute bottom-0 left-0'
                />
            </div>

            <div className='w-1/2 h-full p-40 flex flex-col justify-center gap-7'>
                <div className='flex flex-col gap-1'>
                    <p className='text-4xl font-bold'>Login! 👋</p>
                    <p className='text-xs text-gray-1'>Fill blank below to access your dashboard</p>
                </div>

                <form className='input-containerflex flex flex-col gap-5' onSubmit={handleSubmitForm}>
                    {/* {username} */}
                    <HtmlInput
                        type="text"
                        placeholder={{ text: "Username", placeholder: "Your username", icon: <UserIcon /> }}
                        onChange={(e) => {
                            setUsername(e.target.value)
                            setError('')
                        }}
                    />

                    {/* {password} */}
                    <HtmlInput
                        type="password"
                        placeholder="Your password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setError('')
                        }}
                    />

                    {
                        error &&
                        <p className='text-red-400 text-sm flex items-center gap-2'>
                            <DangerIcon />
                            {error}
                        </p>
                    }


                    <HtmlActionHandlerButton
                        text="Login"
                        icon={<LoginIcon />}
                        onClick={handleLogin}
                        isLoaderVisible={isLoading}
                    />

                    <Button variant="link" >
                        <Link
                            href={'/admin/customers'}
                        >
                            Forgot password?
                        </Link>
                    </Button>
                </form>
            </div>
        </main>
    )
}
