import { useEffect } from "react"
import ProfileViewmodel from "../vm/ProfileViewmodel";
import CookieManager from "./CookieManager";

const Logout = () => {

    const vm = ProfileViewmodel.getInstance()

    useEffect(() => {
        vm.getDB.auth.signOut()
        CookieManager.removeCookie("SBAccessToken")
        CookieManager.removeCookie("SBRefreshToken")
        vm.deleteLoggedUser()
    }, []);

    return (
        <>
            <h2>User has logged out.</h2>
        </>
    )

}

export default Logout