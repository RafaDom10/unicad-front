import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { Add as AddIcon } from '@mui/icons-material'
import { Dialog } from "../Dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, schema } from "../../../app/types/schema";
import toast from "react-hot-toast";
import { deliveryService } from "../../../app/services/deliveryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { parseISO } from "date-fns";

interface Payload {
  client_name: string
  delivery_date: string
  starting_point: string
  destination_point: string
}

export function NewDeliveryButton() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState<boolean>(false)

  const {
    register,
    formState: { errors },
    reset,
    trigger,
    getValues
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const handleOpenDialog = () => {
    reset()
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const onSubmit = async (data: Payload) => {
    await deliveryService.create(data)
  }

  const { mutateAsync: createDeliveryFn } = useMutation({
    mutationFn: onSubmit,
    onSuccess(_, variables) {
      queryClient.setQueryData(['deliveries'], (data: Payload[]) => {
        return [...data, {
          client_name: variables.client_name,
          delivery_date: parseISO(variables.delivery_date).getTime(),
          starting_point: variables.starting_point,
          destination_point: variables.destination_point
        }]
      })
    }
  })

  async function handleCreateDelivery() {
    try {
      const triggerResult = await trigger()

      if (!triggerResult) {
        return
      }

      const payload = getValues()

      await createDeliveryFn(payload)

      reset()
      setOpen(false)
      toast.success('Entrega cadastrada com sucesso!')
    } catch {
      toast.error('Ocorreu um erro ao cadastrar a entrega!')
    }
  }

  return (
    <>
      <Button
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
        onClick={handleOpenDialog}
      >
        Cadastrar Entrega
      </Button>

      <Dialog
        title="Nova Entrega"
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
            fullWidth
            label="Data de Entrega"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
            error={'delivery_date' in errors}
            helperText={'delivery_date' in errors && errors.delivery_date?.message}
            {...register('delivery_date')}
          />
          <TextField
            label="Ponto de Partida *"
            fullWidth
            error={'starting_point' in errors}
            helperText={'starting_point' in errors && errors.starting_point?.message}
            {...register('starting_point')}
          />
          <TextField
            label="Ponto de Destino *"
            fullWidth
            error={'destination_point' in errors}
            helperText={'destination_point' in errors && errors.destination_point?.message}
            {...register('destination_point')}
          />
        </Dialog.Content>
        <Dialog.Actions
          onCancel={handleCloseDialog}
          onConfirm={handleCreateDelivery}
        />
      </Dialog>
    </>
  )
}
