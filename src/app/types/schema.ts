import { z } from 'zod'

export const schema = z.object({
  client_name: z.string().min(1, 'Nome do cliente é obrigatório'),
  delivery_date: z.string(),
  starting_point: z.string().min(1, 'Ponto de partida é obrigatório'),
  destination_point: z.string().min(1, 'Ponto de destino é obrigatório'),
})

export type FormData = z.infer<typeof schema>
