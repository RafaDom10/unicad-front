import { IconButton, Tooltip } from "@mui/material"
import { Route as RouteIcon } from '@mui/icons-material';
import { useState } from "react";
import { Dialog } from "../Dialog";
import { ActionButtonProps } from "../../../app/types/actionBtnProps";
import { Map } from "../Map";

export function ViewRouteActionButton({ row: { original: _row } }: ActionButtonProps) {

  const { starting_point, destination_point } = _row

  const [open, setOpen] = useState<boolean>(false)

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  return (
    <>
      <Tooltip title="Visualizar Rota de Entrega" arrow>
        <IconButton onClick={handleOpenDialog} size="small" >
          <RouteIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        title="Rota de Entrega"
        onClose={handleCloseDialog}
        maxWidth='lg'
        fullWidth
      >
        <Dialog.Content>
          <Map row={{ starting_point, destination_point }} />
        </Dialog.Content>
      </Dialog>

    </>
  )
}
