import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import StatusEnum from "./StatusEnum";
import { Box, styled, Theme } from "@mui/material";

const CustomStatusSelector = styled(Select)({
  
});

type Status = {
  name: string;
  color: string;
};

const statusColors: Status[] = [
  { name: "Plan to play", color: "white" },
  { name: "Dropped", color: "red" },
  { name: "Playing", color: "lime" },
  { name: "Completed", color: "cyan" },
  { name: "On hold", color: "yellow" }
];

type props = {
  currentStatus : StatusEnum
}

export default function ChipSelectorStatusTest({currentStatus}: props) {
  const [statusName, setstatusName] = React.useState<Status>(statusColors[currentStatus]);
  console.log(statusName)

  return (
    <div>
      {/**https://stackoverflow.com/questions/68275934/how-to-change-material-ui-select-menus-drop-down-colors */}
      <Box sx={{ width: 200, display: "flex", flexDirection:"column", alignContent: "space-between"}}>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          value={statusName.name}
          onChange={(e) => {
            statusColors.forEach((sts) => {
              if(sts.name == e.target.value) {
                setstatusName(sts);
              }
            })
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: 'black'
              },
            },
          }}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" sx={{"& .MuiOutlinedInput-notchedOutline": {display: "none"}, width:"9em"}}/>}
          renderValue={(selected) => (
            <Chip
              label={selected}
              sx={{ color: statusName.color, borderColor: statusName.color, backgroundColor: "black", width: "8em" }}
            />
          )}
        >
          {statusColors.map((sts) => {
            if(sts.name !== statusName.name) {
              return (
                <MenuItem key={sts.name} value={sts.name} sx={{color: sts.color, backgroundColor: "black"}}>
                  {sts.name}
                </MenuItem>
              )
            }
          })}
        </Select>
      </Box>
    </div>
  );
}
