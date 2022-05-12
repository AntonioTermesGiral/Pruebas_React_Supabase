import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js'

const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhkd3NrdG9ocmh1bHVrcHptaWtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk2MDc3MzEsImV4cCI6MTk2NTE4MzczMX0.FK8vTPRkX_ddUd-lijECBpWmLGuFoj7pe89TzvH9Zpk"
const supabase = createClient('https://hdwsktohrhulukpzmike.supabase.co', key)

const Test = () => {
    const [currentdata, setData] = useState("");
  
    useEffect(() => {

        select();
      
    }, []);
  
    const select = async () => {
      
      const {data} = await supabase
      .from('game')
      .select('cover')
      .eq("game_id", 132642)
      .single()

      setData(data!.cover) // Response data will be of type Array<Message>.

    };
  
    return (
      <img src={currentdata}/>
    )
  }

  export default Test;