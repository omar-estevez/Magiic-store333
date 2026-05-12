export const formatPriceCop = (price: string | number) => {

    const format_price = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
    }).format(Number(price));

    return format_price;
}
