import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import ProfileViewmodel from "../vm/ProfileViewmodel";
import GameCard from "./GameCard";

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
      <Box sx={{display: "flex", flexWrap: "wrap"}}>
        {currentData?.map((item, i) => {
          return(
            <GameCard 
              title={item.name}
              cover={item.cover}
              platforms={item.platforms}
              score={item.total_rating}
              key={item.game_id}
              style={{
                width: 250,
                m: 3,
              }}
              imageSize={300}/>
          )
        })}
      </Box>
    )
  }

  export default Games;