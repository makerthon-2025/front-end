"use client"

import { useSearchParams } from "next/navigation";
import Cookies from 'js-cookie';

export default function TokenReceive() {
    const searchParams = useSearchParams();

    let access_token = searchParams.get("access_token");
    let refresh_token = searchParams.get("refresh_token");

    Cookies.set('access_token',  access_token, { expires: 1 });
    Cookies.set('refresh_token', refresh_token, { expires: 1 });

    if (typeof window !== 'undefined') {
        window.location.href = '/'; 
    }
}