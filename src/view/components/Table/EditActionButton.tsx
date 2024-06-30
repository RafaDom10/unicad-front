import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { IconButton, TextField, Tooltip } from "@mui/material";
import { Edit as EditIcon } from '@mui/icons-material';
import { FormData, schema } from "../../../app/types/schema";
import { Dialog } from "../Dialog";
import toast from "react-hot-toast";
import { deliveryService } from '../../../app/services/deliveryService/index';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActionButtonProps } from "../../../app/types/actionBtnProps";
import { Payload } from "../../../app/types/clientPayload";
import { format, parseISO } from "date-fns";

export function EditActionButton({ row }: ActionButtonProps) {
  const queryClient = useQueryClient()

  const { original: rowData } = row
  const [open, setOpen] = useState<boolean>(false)

  const {
    register,
    formState: { errors, isDirty },
    reset,
    trigger,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })


  const handleOpenDialog = () => {
    const formattedDefaultDate = format(parseISO(rowData.delivery_date), "yyyy-MM-dd");
    reset({
      client_name: rowData.client_name,
      delivery_date: formattedDefaultDate,
      starting_point: rowData.starting_point,
      destination_point: rowData.destination_point,
    })
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const onUpdate = async (payload: Payload) => {
    await deliveryService.update(payload)
  }

  const { mutateAsync: updateDeliveryFn } = useMutation({
    mutationFn: onUpdate,
    onSuccess(_, variables) {
      queryClient.setQueryData(['deliveries'], (data: Payload[]) => {

        const filteredData = data.filter(d => d.id !== rowData.id)

        return [...filteredData, {
          client_name: variables.client_name,
          delivery_date: parseISO(variables.delivery_date).getTime(),
          starting_point: variables.starting_point,
          destination_point: variables.destination_point
        }]
      })
    }
  })

  async function handleUpdateDelivery() {
    try {
      const triggerResult = await trigger()

      if (!triggerResult) {
        return
      }

      const payload = getValues()
      await updateDeliveryFn({ ...payload, id: rowData.id })

      reset()
      setOpen(false)
      toast.success('Entrega atualizada com sucesso!')
    } catch {
      toast.error('Ocorreu um erro ao atualizar a entrega!')
    }
  }

  return (
    <>

      <Tooltip title="Editar Entrega" arrow>
          <IconButton onClick={handleOpenDialog} size="small">
          <EditIcon fontSize="small"/>
        </IconButton>
      </Tooltip>

      <Dialog
        title="Editar Entrega"
        open={open}
        onClose={handleCloseDialog}
      >

        <Dialog.Content>
          <TextField
            label="Nome do Cliente *"
            fullWidth
            error={'client_name' in errors}
            helperText={'client_name' in errors && errors.client_name?.message}
            {...register('client_name')}
          />
          <TextField
            label="Data de Entrega"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true
            }}
            {...register('delivery_date')}
          />
          <TextField
            label="Ponto de Partida"
            fullWidth
            error={'starting_point' in errors}
            helperText={'starting_point' in errors && errors.starting_point?.message}
            {...register('starting_point')}
          />
          <TextField
            label="Ponto de Destino"
            fullWidth
            error={'destination_point' in errors}
            helperText={'destination_point' in errors && errors.destination_point?.message}
            {...register('destination_point')}
          />
        </Dialog.Content>
        <Dialog.Actions
          onCancel={handleCloseDialog}
          onConfirm={handleUpdateDelivery}
          disabled={!isDirty}
        />
      </Dialog>
    </>
  )
}
