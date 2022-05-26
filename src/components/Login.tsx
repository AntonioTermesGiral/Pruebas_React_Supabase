import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import CookieManager from "./CookieManager"
import ProfileViewmodel from "../vm/ProfileViewmodel"

const Login = () => {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    
    const vm = ProfileViewmodel.getInstance()

    //supatestmyvc@gmail.com  |  potato200
    const submit = async () => {
        const { user, session, error } = await vm.getDB.auth.signIn({
            email: email,
            password: pass,
          })

          if (session !== undefined && session !== null) {

            CookieManager.setCookie("SBAccessToken", session!.access_token, 10)//10 horas
            CookieManager.setCookie("SBRefreshToken", session!.refresh_token!, 4320)//180 dias
            vm.requestLoggedUser()
            console.log(CookieManager.getCookie("SBAccessToken"))

          } else if (error !== undefined) {
              //error
              console.log("error")
          }

    }

    return (
        <Box component="form" display={"flex"} sx={{flexDirection: "column", alignItems: "center"}}>

            <TextField id="emailInput" label="Email" variant="outlined" focused={true} inputProps={{autoComplete: 'off'}} sx={{maxWidth:"20%", flexGrow: 1}} onChange={(event) => {setEmail(event.target.value)}}/>
            <TextField id="passInput" label="Password" variant="outlined" focused={true} type="password" sx={{maxWidth:"20%", mt:"2rem"}} onChange={(event) => {setPass(event.target.value)}}/>
            <Link to="/Signup" style={{textDecoration: 'none'}}>
                <p style={{fontSize: "50%", color: "blue"}}>Create an account</p>
            </Link>
            <Button variant="outlined" sx={{mt:"1rem"}} onClick={submit}>Submit</Button>

        </Box>
    )

}

export default Login