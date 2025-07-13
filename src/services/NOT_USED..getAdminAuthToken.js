import { cookies } from "next/headers";

export async function getAdminAuthToken() {
    const authToken = cookies().get('admin_token')?.value
    return authToken
}


