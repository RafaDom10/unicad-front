import { MRT_Row } from "material-react-table";

export interface ActionButtonProps {
  row: MRT_Row<{
    id: string;
    client_name: string;
    delivery_date: string;
    starting_point: string;
    destination_point: string;
  }>
}
