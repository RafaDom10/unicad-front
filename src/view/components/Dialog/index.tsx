import {
  Stack,
  IconButton,
  DialogTitle as MUIDialogTitle,
  Dialog as MUIDialog, type DialogProps as MUIDialogProps,
} from "@mui/material";
import { DialogContent } from "./Content";
import { DialogActions } from "./Actions";
import CloseIcon from '@mui/icons-material/Close';

interface DialogProps extends MUIDialogProps {
  title: string,
  onClose: () => void
}

export function Dialog({ children, title, onClose, ...props }: DialogProps) {
  return (
    <MUIDialog {...props}>
      <Stack direction={'row'} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <MUIDialogTitle>{title}</MUIDialogTitle>
        <Stack sx={{ width: '20px', height: '20px', marginRight: '20px',  justifyContent: 'center' }}>
          <IconButton onClick={onClose} >
            <CloseIcon />
          </IconButton>
        </Stack>
      </Stack>
      {children}
    </MUIDialog>
  )
}

Dialog.Content = DialogContent
Dialog.Actions = DialogActions
