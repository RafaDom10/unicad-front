import { Stack } from "@mui/material";
import { NewDeliveryButton } from "./NewDeliveryButton";

export function HeaderButtons() {
  return (
    <Stack
      direction='row'
      spacing={1}
      justifyContent='flex-end'
      alignContent='center'
    >
      <NewDeliveryButton />
    </Stack>
  )
}
