import { useEffect, useState } from "react";
import ProfileViewmodel from "../vm/ProfileViewmodel";

type gameItem = {

  game_id : number,
  name: string,
  cover: string,
  platforms: string,
  total_rating: number

}

const Games = () => {
    const [currentData, setData] = useState<gameItem[]>();
    const vm = ProfileViewmodel.getInstance()
  
    useEffect(() => {

        select();
      
    }, []);
  
    const select = async () => {
      
      const {data} = await vm.getDB
      .from<gameItem>('game')
      .select('*')

      console.log(data)
      setData(data!)

    };
  
    return (
      <div>
        {currentData?.map((item, i) => {
          return(
            <div key={i}>
              <h2>{item.name}</h2>
              <img src={item.cover}/>
            </div>
          )
        })}
      </div>
    )
  }

  export default Games;