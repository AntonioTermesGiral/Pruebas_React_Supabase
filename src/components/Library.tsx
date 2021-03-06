import { useEffect, useState } from "react";
import ProfileViewmodel from "../vm/ProfileViewmodel";
import { observer } from "mobx-react";
import ChipSelectorStatusTest from "./ChipSelectorStatusTest";
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import StatusEnum from "./StatusEnum";

type game = {

  user_id : string,
  game_id : number,
  name: string,
  cover: string

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
            .select('status, game(game_id, name, cover)').eq('user_id', vm.getCurrentUserId || "")
    
            console.log(data)
            return data

       } 

    }
  
    return (
      <Box sx={{marginTop: "5%", display: "flex", flexDirection:"column", alignItems:"center"}}>
        <ChipSelectorStatusTest currentStatus={StatusEnum.PLAN_TO_PLAY}/>
        {currentData?.map((item: any, i: number) => {
          return(
            <Grid container key={i} sx={{border: 'solid black 1px', margin: "1%", width: "20em",  display: "flex", flexDirection:"row"}}>
              <img src={item.game.cover} style={{width: "4em", height: "6em", margin: "1%"}}/>
              <Grid item sx={{display: "flex", flexDirection:"column"}}>
                <Typography sx={{color: "black", marginLeft: "1em", fontSize: 16, pb: "1em", mt: "10%"}}>{item.game.name}</Typography>
                <ChipSelectorStatusTest currentStatus={StatusEnum[item.status as keyof typeof StatusEnum]}/>
              </Grid>
            </Grid>
          )
        })}
        <hr/>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {currentData?.map((item:any, i:number) => (
                <TableRow
                  key={item.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left"><img src={item.game.cover} style={{width: "6em", height: "9em"}}/></TableCell>
                  <TableCell align="left"><Typography sx={{color: "black", marginLeft: "1em", fontSize: 16}}>{item.game.name}</Typography></TableCell>
                  <TableCell align="right"><ChipSelectorStatusTest currentStatus={StatusEnum[item.status as keyof typeof StatusEnum]}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  }

  export default observer(Library);