export interface Props {
    open: boolean
    title: string
    description?: string
    onConfirm: () => void
    onCancel: () => void
}