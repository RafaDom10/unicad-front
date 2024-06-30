import { httpClient } from "../HttpClient"

export async function remove(id: string) {
  const { data } = await httpClient.delete<void>(`/deliveries/${id}`)
  return data
}
