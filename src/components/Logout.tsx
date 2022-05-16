import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react"
import CookieManager from "./CookieManager";

// Create a single supabase client for interacting with your database 
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkd3NrdG9ocmh1bHVrcHptaWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk2MDc3MzEsImV4cCI6MTk2NTE4MzczMX0.FK8vTPRkX_ddUd-lijECBpWmLGuFoj7pe89TzvH9Zpk"
const supabase = createClient('https://hdwsktohrhulukpzmike.supabase.co', key)

const Logout = () => {

    useEffect(() => {
        supabase.auth.signOut()
        CookieManager.removeCookie("SBAccessToken")
        CookieManager.removeCookie("SBRefreshToken")
    }, []);

    return (
        <>
            <h2>User has logged out.</h2>
        </>
    )

}

export default Logout