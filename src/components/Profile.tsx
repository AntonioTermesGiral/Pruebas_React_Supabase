import { Button } from "@mui/material";
import ProfileSB from "../models/ProfileModel";
import ProfileViewmodel from "../vm/ProfileViewmodel";
import ChipSelectorStatusTest from "./ChipSelectorStatusTest";

const Profile = () => {

    const vm = ProfileViewmodel.getInstance()
    
    const select = async () => {

        let {data} = await vm.getDB
            .from<ProfileSB>('profile')
            .select('user_id, username, avatar_url, description, country:countries(name:name)')
            .eq('user_id', vm.getCurrentUserId || "")
            .single()
    
        console.log(data)
        return data
    }

    //No se puede enlazar una tabla consigo misma asi que se hace otra consulta
    const getFriendList = async () => {

        let currentUser = vm.getCurrentUserId || ""

        let {data} = await vm.getDB
            .from('friendlist')
            .select()
            .or('user.eq.' + currentUser || "" + ',friend.eq.' + currentUser)
    
        let friends = data?.filter(friend => friend.accepted === true).map((friend) => (friend.user === currentUser) ? friend.friend : friend.user)
        console.log(friends)
        if(friends?.length === 0) {
            console.log("HAHA NO TIENES AMIGOS")
        }
        return friends
    }

    return (
        <>
            <Button variant="outlined" onClick={select}>click me and use F12 to see your data</Button>
            <Button variant="outlined" onClick={getFriendList}>click me and use F12 to see your friends</Button>
        </>
    )

}

export default Profile;