'use server'

import { ACCESS_TOKEN } from "@/constants/auth";
import { routes } from "@/constants/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const testUsers = [
    {
        id: 1,
        email: 'admin@test.com',
        password: 'password',
        role: 'admin',
        firstname: 'Admin',
        lastname: 'Admin',
    },
    {
        id: 2,
        email: 'teacher@test.com',
        password: 'password',
        role: 'teacher',
        firstname: 'Teacher',
        lastname: 'Teacher',
    }
]   


export async function signInAction(data: any) {

    const user = testUsers.find(user => user.email === data.email && user.password === data.password);

    if (!user) {
        return { error: 'Invalid email or password' };
    }

    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN, user.id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 днів
        path: '/',
    });

    console.log('cookieStore', cookieStore.get(ACCESS_TOKEN));

    return {
        ok: true,
        data: user,
    }

    // TODO: add api call in the future
    // return await fetch('/api/auth/signin', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //   });
}


export async function signOutAction() {
    const cookieStore = await cookies();
    cookieStore.delete(ACCESS_TOKEN);
    redirect(routes.auth.signIn);
}
