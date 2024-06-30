import { IconButton, Tooltip, Typography } from "@mui/material"
import { Close as DeleteIcon } from '@mui/icons-material';
import { useState } from "react";
import { Dialog } from "../Dialog";
import toast from "react-hot-toast";
import { deliveryService } from "../../../app/services/deliveryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActionButtonProps } from "../../../app/types/actionBtnProps";
import { Payload } from "../../../app/types/clientPayload";

export function DeleteActionButton({ row }: ActionButtonProps) {
  const queryClient = useQueryClient()

  const { original: rowData } = row
  const [open, setOpen] = useState<boolean>(false)

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const onDelete = async (id: string) => {
    await deliveryService.remove(id)
  }

  const { mutateAsync: deleteDeliveryFn } = useMutation({
    mutationFn: onDelete,
    onSuccess() {
      queryClient.setQueryData(['deliveries'], (data: Payload[]) => {
        const filteredData = data.filter(d => d.id !== rowData.id)
        return [...filteredData]
      })
    }
  })

  async function handleRemoveDelivery() {
    try {
      await deleteDeliveryFn(rowData.id)

      handleCloseDialog()

      toast.success('Entrega deletada com sucesso!')
    } catch {
      toast.error('Ocorreu um erro ao deletar a entrega!')
    }
  }

  return (
    <>
      <Tooltip title="Deletar Entrega" arrow>
        <IconButton
          color="error"
          onClick={handleOpenDialog}
          size="small"
        >
          <DeleteIcon fontSize="small"/>
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        title="Deletar Entrega"
        onClose={handleCloseDialog}
      >
        <Dialog.Content>
          <Typography>
            Você tem certeza que deseja excluir a entrega para o cliente <strong>{rowData.client_name}</strong>?
          </Typography>
        </Dialog.Content>

        <Dialog.Actions onCancel={handleCloseDialog} onConfirm={handleRemoveDelivery} />

      </Dialog>

    </>
  )
}
