import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import { createClient } from '@supabase/supabase-js'
import CookieManager from "./CookieManager"

// Create a single supabase client for interacting with your database 
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkd3NrdG9ocmh1bHVrcHptaWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk2MDc3MzEsImV4cCI6MTk2NTE4MzczMX0.FK8vTPRkX_ddUd-lijECBpWmLGuFoj7pe89TzvH9Zpk"
const supabase = createClient('https://hdwsktohrhulukpzmike.supabase.co', key)

const Login = () => {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")

    //supatestmyvc@gmail.com  |  potato200
    const submit = async () => {
        const { user, session, error } = await supabase.auth.signIn({
            email: email,
            password: pass,
          })

          console.log(user)
          console.log(session)
          console.log(error)
          console.log(supabase.auth.session())
    }

    const submitNoClient = async () => {
        
        await window.fetch('https://hdwsktohrhulukpzmike.supabase.co/auth/v1/token?grant_type=password', {
            method: 'POST',
            headers: {
              'content-type': 'application/json;charset=UTF-8',
              'apikey': key,
            },
            body: JSON.stringify({
                "email": email,
                "password": pass
              })
          }).then(response => response.json())
          .then(result => {
              console.log(result)
              console.log(result.access_token)
              CookieManager.setCookie("SBAccessToken", result.access_token, 10)//10 horas
              CookieManager.setCookie("SBRefreshToken", result.refresh_token, 4320)//180 dias
              console.log(CookieManager.getCookie("SBAccessToken"))
            })
          .catch(error => console.log('error', error))

          supabase.auth.setSession(CookieManager.getCookie("SBRefreshToken")) //lo guarda en el ls
          .then(result => console.log(result.session?.user?.id))
          .finally(() => {console.log(supabase.auth.session())})
        

    }

    return (
        <Box component="form" display={"flex"} sx={{flexDirection: "column", alignItems: "center"}}>

            <TextField id="emailInput" label="Email" variant="outlined" focused={true} inputProps={{autoComplete: 'off'}} sx={{maxWidth:"20%", flexGrow: 1, input: {color: "white"}}} onChange={(event) => {setEmail(event.target.value)}}/>
            <TextField id="passInput" label="Password" variant="outlined" focused={true} type="password" sx={{maxWidth:"20%", mt:"2rem", input: {color: "white"}}} onChange={(event) => {setPass(event.target.value)}}/>
            <Link to="/Signup" style={{textDecoration: 'none'}}>
                <p style={{fontSize: "50%", color: "blue"}}>Create an account</p>
            </Link>
            <Button variant="outlined" sx={{mt:"1rem"}} onClick={submitNoClient}>Submit</Button>

        </Box>
    )

}

export default Login