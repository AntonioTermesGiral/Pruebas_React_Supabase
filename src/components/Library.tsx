import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'
import CookieManager from "./CookieManager";

type game = {

  user_id : string,
  game_id : number,
  name: string,

}

type item = {

    user_id : string,
    status : string,
    game : game
  
  }

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkd3NrdG9ocmh1bHVrcHptaWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk2MDc3MzEsImV4cCI6MTk2NTE4MzczMX0.FK8vTPRkX_ddUd-lijECBpWmLGuFoj7pe89TzvH9Zpk"
const supabase = createClient('https://hdwsktohrhulukpzmike.supabase.co', key)

const Library = () => {
    const [currentData, setData] = useState<item[]>();
  
    useEffect(() => {

        select().then(response => setData(response || []))
      
    }, []);
  
    const select = async () => {
      
      if(CookieManager.checkCookie("SBRefreshToken")) {
            let {data} = await supabase
            .from<item>('library')
            .select('status, game(game_id, name)').eq('user_id', supabase.auth.session()?.user?.id!!)
    
            console.log(data)
            return data

       } 

    }
  
    return (
      <div>
        {currentData?.map((item: any, i: number) => {
          return(
            <div key={i} style={{border: 'solid white 1px'}}>
              <h2>{item.game.name}</h2>
              <h3>{item.status}</h3>
            </div>
          )
        })}
      </div>
    )
  }

  export default Library;