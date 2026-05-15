export const departmentOptions = [
    { value: "men", label: "Hombre" },
    { value: "women", label: "Mujer" },
    { value: "child", label: "Niño" },
];

export const categoryOptions = [
    { value: "accesories", label: "Accesorios" },
    { value: "shirts", label: "Camisas" },
    { value: "jackets", label: "Chaquetas" },
    { value: "pants", label: "Pantalones" },
    { value: "shoes", label: "Zapatos" },
];

export const sizeOptions: Record<string, Record<string, string[]>> = {
    shirts: {
        men: ["XS", "S", "M", "L", "XL", "XXL"],
        women: ["XS", "S", "M", "L", "XL"],
        child: ["2", "4", "6", "8", "10"],
    },

    jackets: {
        men: ["XS", "S", "M", "L", "XL", "XXL"],
        women: ["XS", "S", "M", "L", "XL"],
        child: ["2", "4", "6", "8", "10"],
    },

    pants: {
        men: ["28", "30", "32", "34", "36", "38"],
        women: ["6", "8", "10", "12", "14"],
        child: ["2", "4", "6", "8", "10"],
    },

    shoes: {
        men: ["39", "40", "41", "42", "43", "44"],
        women: ["35", "36", "37", "38", "39"],
        child: ["28", "29", "30", "31", "32"],
    },
};