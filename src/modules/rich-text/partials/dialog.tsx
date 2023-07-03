import { forwardRef } from 'react'
import * as s from './dialog.module.css'
import type { DialogHTMLAttributes, RefObject } from 'react'

export function useDialog(dialogRef: RefObject<HTMLDialogElement>) {
  return {
    open: () => {
      dialogRef.current?.showModal()
    },
    close: () => {
      dialogRef.current?.close()
    },
  }
}

const Dialog = forwardRef<HTMLDialogElement, Omit<DialogHTMLAttributes<HTMLDialogElement>, 'className' | 'open'>>(
  function dialog(dialogProps, ref) {
    return <dialog {...dialogProps} ref={ref} className={s.Dialog} />
  }
)

export default Dialog
