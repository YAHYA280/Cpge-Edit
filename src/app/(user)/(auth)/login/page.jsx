import Image from "next/image";
import Link from "next/link";
import UserLoginForm from "./components/UserLoginForm";

const global_key = process.env.GLOBAL_KEY


export const metadata = {
    title: `Welcome to ${global_key}`,
    description: "Login to your account to setup your application",
}


export default function UserLogin() {

    return (
        <div className="flex h-[100vh] p-3 ">


            <div className="hidden lg:flex h-full before:bg-black before:bg-opacity-60 before:absolute before:top-0 before:z-1 before:left-0 before:h-full before:w-full relative w-[80%] bg-[url(/backgrounds/login-page-background.jpg)] bg-cover rounded-xl  p-3 overflow-hidden">

                <div className="flex flex-col items-start justify-between h-full w-full relative z-2">
                    <Image
                        src={'/icons/cpe.svg'}
                        width={120}
                        height={50}
                        alt='Logo'
                    />


                    <div>
                        <p className="text-[60px] font-bold">Get <br /> Everything <br /> You Want</p>
                        <p className="text-sm">lorem jje ke ze zel fzelf zef zefkzef zekfzekuf zek fkzefze fiu</p>
                    </div>
                </div>

            </div>





            <div className="flex justify-center items-start gap-5 flex-col p-5  w-full">
                <div className="flex gap-3 flex-col items-center justify-center w-full">
                    <Image
                        src={'/icons/cpe.svg'}
                        width={120}
                        height={50}
                        alt='Logo'
                    />
                    <p className="text-2xl font-semibold">Welcome to {global_key} </p>
                    <p className="text-sm text-gray-1 text-center">Login to your account to setup your application</p>
                </div>

                <UserLoginForm />

                <p className="text-sm ml-auto mr-auto text-center">By continuing, you agree to the <Link href={'/'} className="text-link_color-1 hover:text-link_color-2">Terms of Use</Link> applicable to {global_key} .</p>

            </div>

        </div>

    )
}
