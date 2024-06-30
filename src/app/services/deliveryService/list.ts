import { httpClient } from "../HttpClient"

export interface ListResponse {
  id: string
  client_name: string
  delivery_date: string
  starting_point: string
  destination_point: string
}

export async function list() {
  const { data } = await httpClient.get<ListResponse[]>('/deliveries')
  return data
}
