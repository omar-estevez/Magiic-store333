import type { Props } from "./AlertDialog.types"
import * as Dialog from "@radix-ui/react-alert-dialog"
import style from "./AlertDialog.module.css"

export const AlertDialog = ({ open, title, description, onConfirm, onCancel, }: Props) => {
    return (
        <Dialog.Root open={open}>
            <Dialog.Portal>
                <Dialog.Overlay className={style.overlay} />

                <Dialog.Content className={style.content}>
                    <Dialog.Title className={style.title}>
                        {title}
                    </Dialog.Title>

                    {description && (
                        <Dialog.Description className={style.description}>
                            {description}
                        </Dialog.Description>
                    )}

                    <div className={style.actions}>
                        <Dialog.Cancel asChild>
                            <button onClick={onCancel}>
                                Cancelar
                            </button>
                        </Dialog.Cancel>

                        <Dialog.Action asChild>
                            <button
                                className={style.danger}
                                onClick={onConfirm}
                            >
                                Confirmar
                            </button>
                        </Dialog.Action>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
