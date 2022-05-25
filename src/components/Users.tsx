import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ProfileViewmodel from "../vm/ProfileViewmodel";

type MiniProfile = {

    library :string[],
    username: string,
    avatar_url: string,

}

const Users = () => {

    const [currentUsers, setUsers] = useState<MiniProfile[]>()
    const [searchParam, setSearchParam] = useState<string>("")

    const vm = ProfileViewmodel.getInstance()

    const search = async (usrnm: string) => {

        let {data} = await vm.getDB
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