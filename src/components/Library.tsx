import { useEffect, useState } from "react";
import CookieManager from "./CookieManager";
import ProfileViewmodel from "../vm/ProfileViewmodel";
import { observer } from "mobx-react";

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

const Library = () => {

    const [currentData, setData] = useState<item[]>();
    const vm = ProfileViewmodel.getInstance()
  
    useEffect(() => {

        select().then(response => setData(response || []))
      
    }, []);
  
    const select = async () => {
      
      if(vm.isLoggedIn) {
            let {data} = await vm.getDB
            .from<item>('library')
            .select('status, game(game_id, name)').eq('user_id', vm.getCurrentUserId || "")
    
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

  export default observer(Library);