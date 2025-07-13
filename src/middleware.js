import { NextResponse } from "next/server"
import { cookies } from 'next/headers'
import { backend_base_api } from "./constants/_api"

import createMiddleware from 'next-intl/middleware';
import { languageMatcher, locales } from './config';
import { default_language } from "./languages/available_languages";



const i18nMiddleware = createMiddleware({
    // A list of all locales that are supported
    locales,
    // Used when no locale matches
    defaultLocale: default_language.key,
    localePrefix: 'never'
})

export async function middleware(request) {
    const cookieStore = cookies()
    const url = request.url
    const pathName = request.nextUrl.pathname

    const i18nResponse = i18nMiddleware(request)

    // return  NextResponse.next()
    // console.log(pathName.endsWith(''), 'sjsjsj')


    if (pathName.startsWith('/admin')) { // For Admin pages 
        console.log('starts with admin')

        const admin_token = cookieStore.get('admin_token')?.value

        // console.log(admin_token)

        if (admin_token) {

            try {
                const response = await fetch(`${backend_base_api}/verifyAdminToken`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ admin_token, pathName }),
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()


                if (request.url.includes('/login') && result.ok) {
                    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
                }

                // If autherized, but the page user's trying to reach is denied from 
                if (result.ok && !result.path_autherization) {
                    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
                }

                // If the user want to reach other page, and it's not autherized, then redirect to login
                if (!request.url.includes('/login') && !result.ok) {
                    return NextResponse.redirect(new URL('/admin/login', request.url))
                }

                return NextResponse.next()

            } catch (error) {
                if (!request.url.includes('/login')) {
                    return NextResponse.redirect(new URL('/admin/login', request.url))
                }
            }
        } else {
            if (!request.url.includes('/login')) {
                return NextResponse.redirect(new URL('/admin/login', request.url))
            } else {
                return NextResponse.next()
            }
        }
        // console.log('admin pages')
    }


    if (!pathName.startsWith('/admin')) { // For customer pages
        const customer_token = cookieStore.get('customer_token')?.value

        // console.log('customer_token', customer_token)


        if (customer_token) {
            // console.log('customer_token exist')
            try {
                const response = await fetch(`${backend_base_api}/verifyCustomerToken`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ customer_token }),
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()

                // console.log(result.ok)


                // If there is a valid token, and the user trying to access the login pages, then redirect into "account" page 

                if (result.ok && request.url.includes('/login')) {
                    return NextResponse.redirect(new URL(`/account`, request.url))
                    // return i18nResponse

                } else {
                    return i18nResponse || NextResponse.next()
                }



            } catch (error) {
                if (!request.url.includes('/login') || !pathName.endsWith('')) {
                    return NextResponse.redirect(new URL('/login', request.url))
                } else {
                    return NextResponse.next()

                }
            }
        } else {
            // console.log('customer_token is not exist')
            if (!request.url.includes('/login') || !pathName.endsWith('')) {
                return NextResponse.redirect(new URL('/login', request.url))
            } else {
                return NextResponse.next()

            }
        }
    }


    // if (i18nResponse) {
    //     return i18nResponse
    // }


    // return NextResponse.next()
    return NextResponse.next()

}




export const config = {
    matcher: ['/login', '/account/:path*', '/admin/:path*', '/(en|ar|fr)/:path*'],
}