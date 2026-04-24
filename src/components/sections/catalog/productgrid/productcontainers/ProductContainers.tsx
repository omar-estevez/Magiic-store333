import { CardProduct } from "../../../../commons/CardProduct/CardProduct"

export const ProductContainers = () => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.8rem', margin: '1.8rem 0.5rem' }}>
            {
                [...new Array(12)].map((_, i: number) => (
                    <CardProduct key={i} />
                ))
            }
        </div>
    )
}
