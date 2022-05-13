import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'

type gameItem = {

  game_id : number,
  name: string,
  cover: string,
  platforms: string,
  total_rating: number

}

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkd3NrdG9ocmh1bHVrcHptaWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk2MDc3MzEsImV4cCI6MTk2NTE4MzczMX0.FK8vTPRkX_ddUd-lijECBpWmLGuFoj7pe89TzvH9Zpk"
const supabase = createClient('https://hdwsktohrhulukpzmike.supabase.co', key)

const AuthTest = () => {
    
    const [loggedIn, setData] = useState<gameItem[]>();
  
    const select = async () => {
      
      const {data} = await supabase
      .from<gameItem>('game')
      .select('*')
      //.eq("game_id", 132642)
      //.single()

      console.log(data)
      setData(data!)

    };
  
    return (
      <div>
        
      </div>
    )
  }

  export default AuthTest;