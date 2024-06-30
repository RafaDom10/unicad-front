import { Box } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { DeleteActionButton } from './DeleteActionButton';
import { EditActionButton } from './EditActionButton';
import { deliveryService } from '../../../app/services/deliveryService';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ViewRouteActionButton } from './ViewRouteActionButton';

export function Table() {
  const getDeliveriesData = async () => {
    const deliveries = await deliveryService.list()
    return deliveries
  }

  const { data } = useQuery({
    queryKey: ['deliveries'],
    queryFn: getDeliveriesData
  })

  const columns = [
    {
      accessorKey: 'client_name',
      header: 'Cliente',
      size: 150,
    },
    {
      accessorKey: 'delivery_date',
      header: 'Data de Entrega',
      Cell: ({ cell }) => format(new Date(cell.getValue()), 'dd/MM/yyyy'),
      size: 150,
    },
    {
      accessorKey: 'starting_point',
      header: 'Ponto de Partida',
      size: 150,
    },
    {
      accessorKey: 'destination_point',
      header: 'Ponto de Destino',
      size: 150,
    },
  ]

  return (
    <MaterialReactTable
      localization={MRT_Localization_PT_BR}
      columns={columns}
      data={data ?? []}
      enableRowActions
      renderRowActions={({ row }) => (
        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
          <ViewRouteActionButton row={row} />
          <EditActionButton row={row} />
          <DeleteActionButton row={row} />
        </Box>
      )}
    />
  );
}
