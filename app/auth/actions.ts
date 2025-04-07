'use server'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";
import { routes } from "@/constants/routes";
import { apiFetch } from "@/lib/fetch";
import { AuthResponse, SignInDTO } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAction(data: SignInDTO) {

    const response = await apiFetch<AuthResponse>('/auth/sign-in', {
        method: 'POST',
        body: JSON.stringify(data),
        withoutAuth: true,
    });

    if (!response.data) {
        return {
            ok: false,
            error: response.error,
        }
    }

    const cookieStore = await cookies();
    cookieStore.set(ACCESS_TOKEN, response.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
    });
    cookieStore.set(REFRESH_TOKEN, response.data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 днів
        path: '/',
    });

    return {
        ok: true,
        data: response.data.user,
    }
}


export async function signOutAction() {
    const cookieStore = await cookies();
    cookieStore.delete(ACCESS_TOKEN);
    cookieStore.delete(REFRESH_TOKEN);
    redirect(routes.auth.signIn);
}
