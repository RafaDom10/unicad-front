import { httpClient } from "../HttpClient"

export interface ListResponse {
  id: string
  client_name: string
  delivery_date: string
  starting_point: string
  destination_point: string
}

interface Payload {
  id: string
  client_name: string
  delivery_date: string
  starting_point: string
  destination_point: string
}

export async function update(payload: Payload) {
  const { id } = payload
  const { data } = await httpClient.put<ListResponse>(`/deliveries/${id}`, payload)
  return data
}
