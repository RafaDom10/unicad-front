import { httpClient } from "../HttpClient"

export interface ListResponse {
  id: string
  client_name: string
  delivery_date: string
  starting_point: string
  destination_point: string
}

interface Payload {
  client_name: string
  delivery_date: string
  starting_point: string
  destination_point: string
}

export async function create(payload: Payload) {
  const { data } = await httpClient.post<ListResponse>('/deliveries', payload)
  return data
}
