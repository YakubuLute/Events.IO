import { Dialog, DialogTitle, Box, Typography, IconButton, DialogContent, Stack, OutlinedInput } from "@mui/material";
import { Close } from "@mui/icons-material";
import { MouseEventHandler } from "react";
import Chip2 from "../../Chip2";

interface ModalProps {
  onClose: MouseEventHandler<HTMLElement>,
  open: boolean,
  data: { venue: string | undefined, note: string | undefined }
}

const ConnectionDetailsModal = ({
  onClose, open, data
}: ModalProps
) => {

  return (
    <Dialog open={open} maxWidth={'lg'} component={Box} sx={{ '& .MuiDialog-paper.MuiPaper-rounded ': { borderRadius: 5, m: '16px' } }}>
      <DialogTitle component='div' sx={{ py: '10px' }}>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant="h6"
            sx={{ fontSize: 18, fontWeight: 600, lineHeight: '24px', color: '#110C22' }}
          >
            Connection Details
          </Typography>
          <IconButton
            onClick={(event) => onClose(event)}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ width: 540, maxWidth: '100%', padding: { xs: 2, sm: 3 } }} >
        <Chip2
          color="warning"
          size="medium"
          sx={{ height: 36, border: "1px solid #FFDD86" }}
          label={
            <Typography
              sx={{ fontSize: 14, fontWeight: 600, lineHeight: '20px', py: "8px", px: "16px" }}
              display={'flex'} alignItems={'center'} color="#E09400">
              {data.venue || 'No Venue'}
            </Typography>
          }
        />
        <Box sx={{ maxWidth: '100%', mx: 'auto', my: 2 }}>
          <Typography
            sx={{ fontSize: 18, fontWeight: 500, lineHeight: '24px', color: '#4F4B5C' }}
          >
            {data.note || 'No Note'}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog >

  )
}

export default ConnectionDetailsModal;