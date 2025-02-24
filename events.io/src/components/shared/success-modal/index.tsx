import React from 'react'
import { Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

import { CustomButton } from '@/components/shared'
import LargeCheckIcon from '@/components/icons/largeCheckIcon'

const Transition = React.forwardRef(function Transition (
  props: TransitionProps & {
    children: React.ReactElement<unknown, string>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>

  title: string | React.ReactNode
  body?: string | React.ReactNode
}
export default function SuccessModal ({ open, setOpen, title, body }: Props) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={setOpen}
      aria-describedby='alert-dialog-slide-description'
      className='p-20'
      maxWidth='sm'
    >
      <DialogContent className='flex flex-col space-y-6 justify-center items-center'>
        <LargeCheckIcon />
        <Typography className='text-[1.75rem] font-bold'>{title}</Typography>
        <Typography className='text-sm text-center'>{body}</Typography>
        <CustomButton
          label='OK'
          type='button'
          className='max-w-[316px] w-full'
          onClick={setOpen}
        />
      </DialogContent>
    </Dialog>
  )
}
