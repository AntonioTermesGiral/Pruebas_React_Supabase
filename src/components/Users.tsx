import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

type MiniProfile = {

    library :string[],
    username: string,
    avatar_url: string,

}

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkd3NrdG9ocmh1bHVrcHptaWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk2MDc3MzEsImV4cCI6MTk2NTE4MzczMX0.FK8vTPRkX_ddUd-lijECBpWmLGuFoj7pe89TzvH9Zpk"
const supabase = createClient('https://hdwsktohrhulukpzmike.supabase.co', key)

const Users = () => {

    const [currentUsers, setUsers] = useState<MiniProfile[]>()
    const [searchParam, setSearchParam] = useState<string>("")

    const search = async (usrnm: string) => {

        let {data} = await supabase
            .from<MiniProfile>('profile')
            .select('username, avatar_url, library(user_id)')
            .ilike('username', "%" + usrnm + "%")
    
        console.log(data)
        return data

    }

    return (
        <>
            <Box>
                <br/>
                <br/>
                <TextField label="Outlined" variant="filled" onChange={(event) => {setSearchParam(event.target.value)}}/>
                <Button variant="contained" onClick={() => {search(searchParam || "").then(response => setUsers(response || []))}}>Search</Button>
            </Box>
            <Box>
                {currentUsers?.map((user, i) => {
                    return (
                        <div key={i}>
                            <h4>{user.username}</h4>
                            <img alt="user profile" src={user.avatar_url} width="184" height="184" />
                            <p>Games: {user.library.length}</p>
                        </div>
                    )
                })}
            </Box>
        </>
    )

}

export default Users;