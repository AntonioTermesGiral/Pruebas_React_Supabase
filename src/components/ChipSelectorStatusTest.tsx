import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import StatusEnum from "./StatusEnum";

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
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="demo-multiple-chip-label">Status</InputLabel>
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
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Chip
              label={selected}
              sx={{ color: statusName.color, borderColor: statusName.color, backgroundColor: "black" }}
            />
          )}
        >
          {statusColors.map((sts) => (
            <MenuItem key={sts.name} value={sts.name}>
              {sts.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
