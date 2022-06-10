import { Box, Button, FormControl, TextField } from "@mui/material"
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

    const test = async () => {

        const igdbCliID = "kypiy9m30go1iycvp7uk7kvel2env3"
        const igdbKey = "Bearer a9gbpb9sn5kiqqlvpf6uy5o1lk7uky"
        const igdbURL = "https://api.igdb.com/v4/games/"

        let headers = new URLSearchParams({"Client-ID": igdbCliID, Authorization: igdbKey})
        let currentBody = `fields id, name, cover.url, platforms.abbreviation, platforms.name, total_rating; search "pokemon"; limit 10;`

        type gameItem = {

            game_id : number,
            name: string,
            cover: string,
            platforms: string,
            total_rating: number
          
          }

        await fetch(igdbURL, {
            method: "POST",
            headers:  headers,
            body: currentBody,
            mode: 'no-cors'
        }).then(response => response.json())
            .then(result => {
                let gameList : gameItem[] = []
                result.map((element : any) => {

                    let betterCover : string = element.cover.url
                    let platforms : string = getPlatforms(element.platforms)
                    let roundedRating : number = element.total_rating
                    gameList.push({game_id: element.id, name: element.name, cover: betterCover, platforms: platforms, total_rating: roundedRating})
                })

                console.log(gameList)
                return gameList

            })
            .catch(error => console.log('error', error));
    }

    const getPlatforms = (platforms : any[]) => {

        let finalPlatform = ""

        if (platforms !== null && platforms !== undefined) {

            platforms.forEach((platform) => {

                if (platform.abbreviation === null || platform.abbreviation === undefined) {
                    finalPlatform += `${platform.name}, `
                } else {
                    finalPlatform += `${platform.abbreviation}, `
                }

            })

        } else {

            finalPlatform = ""

        }

        return finalPlatform

    }

    return (
        <FormControl sx={{display:"flex", flexDirection: "column", alignItems: "center"}}>

            <TextField id="emailInput" label="Email" variant="outlined" focused={true} inputProps={{autoComplete: 'off'}} sx={{maxWidth:"20%", flexGrow: 1}} onChange={(event) => {setEmail(event.target.value)}}/>
            <TextField id="passInput" label="Password" variant="outlined" focused={true} type="password" sx={{maxWidth:"20%", mt:"2rem"}} onChange={(event) => {setPass(event.target.value)}}/>
            <Link to="/Signup" style={{textDecoration: 'none'}}>
                <p style={{fontSize: "50%", color: "blue"}}>Create an account</p>
            </Link>
            <Button variant="outlined" sx={{mt:"1rem"}} onClick={submit}>Submit</Button>
            <Button onClick={test}>test</Button>

        </FormControl>
    )

}

export default Login