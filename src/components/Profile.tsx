import { Button } from "@mui/material";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database 
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkd3NrdG9ocmh1bHVrcHptaWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk2MDc3MzEsImV4cCI6MTk2NTE4MzczMX0.FK8vTPRkX_ddUd-lijECBpWmLGuFoj7pe89TzvH9Zpk"
const supabase = createClient('https://hdwsktohrhulukpzmike.supabase.co', key, {
    persistSession: false,
    autoRefreshToken: true
}) //https://supabase.com/docs/reference/javascript/initializing#with-additional-parameters

type Profile = {
    user_id : string,
    username: string,
    avatar_url: string,
    description: string,
    country: string,
    friends: Profile[]
}

const Profile = () => {

    const select = async () => {

        let {data} = await supabase
            .from<Profile>('profile')
            .select('user_id, username, avatar_url, description, country:countries(name:name)')
            .eq('user_id', supabase.auth.session()?.user?.id || "")
            .single()
    
        console.log(data)
        return data
    }

    //No se puede enlazar una tabla consigo misma asi que se hace otra consulta
    const getFriendList = async () => {

        let currentUser = supabase.auth.session()?.user?.id || ""

        let {data} = await supabase
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