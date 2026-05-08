import { useState, type ChangeEvent } from "react";
import { Input } from "../../../../commons/Input/Input";
import style from './FormModal.module.css'
import { Button } from "../../../../commons/Button/Button";

const departmentOptions = [
    { value: "men", label: "Hombre" },
    { value: "women", label: "Mujer" },
    { value: "child", label: "Niño" },
];

const categoryOptions = [
    { value: "accesories", label: "Accesorios" },
    { value: "shirts", label: "Camisas" },
    { value: "jackets", label: "Chaquetas" },
    { value: "pants", label: "Pantalones" },
    { value: "shoes", label: "Zapatos" },
];

const sizeOptions: Record<string, Record<string, string[]>> = {
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

type ImageType = {
    file: File;
    preview: string;
    id: string;
};

export const FormModal = () => {

    const MAX_IMAGES = 5;
    const [productForm, setProductForm] = useState({
        name: '',
        category: '',
        department: '',
        price: 0,
        sizes: [],
        stock: []
    });
    const [images, setImages] = useState<ImageType[]>([]);
    const [votes, setVotes] = useState<Record<string, boolean>>({});
    const [stock, setStock] = useState<Record<string, number | string>>({});

    const currentSizes = sizeOptions[productForm.category]?.[productForm.department] || [];

    const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        setVotes((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setStock((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChangeImages = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        const remaining = MAX_IMAGES - images.length;
        const selectedFiles = files.slice(0, remaining);

        const imagePreviews: ImageType[] = selectedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            id: crypto.randomUUID(),
        }));

        setImages((prev) => [...prev, ...imagePreviews]);
    };

    const removeImage = (id: string) => {
        setImages((prev) =>
            prev.filter((img) => img.id !== id)
        );
    };

    return (
        <form className={style.form__container}>
            <div className={style.first__row__form}>
                <Input
                    id="name"
                    type="text"
                    placeholder="nombre del producto"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    autoComplete="off"
                    maxLength={16}
                />
                {/* {errors.password && <p style={{ color: "red" }}>{errors.password}</p>} */}

                <Input
                    id="price"
                    type="number"
                    placeholder="precio del producto"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    min={0}
                    autoComplete="off"
                    maxLength={16}
                />
            </div>

            <div className={style.second__row__form}>
                <select
                    value={productForm.department}
                    onChange={(e) => { setProductForm({ ...productForm, department: e.target.value }); setVotes({}); setStock({}); }}
                >
                    <option value="">Escoge un departamento</option>

                    {departmentOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>

                <select
                    value={productForm.category}
                    onChange={(e) => { setProductForm({ ...productForm, category: e.target.value }); setVotes({}); setStock({}); }}
                >
                    <option value="">Escoge una categoria</option>

                    {categoryOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className={style.third__row__form}>
                <div className={style.checkbox}>
                    <span>Tallas</span>
                    {currentSizes.map((size) => (
                        <label key={size}>
                            <Input
                                type="checkbox"
                                name={size}
                                checked={votes[size] || false}
                                onChange={handleChangeCheckbox}
                                className={style.checkbox__input}
                            />
                            {size}
                        </label>
                    ))}
                </div>

                <div className={style.sizes__inputs}>
                    <span>Cantidades</span>
                    {Object.entries(votes).map(([size, checked]) =>
                        checked ? (
                            <Input
                                key={size}
                                id={size}
                                type="number"
                                name={size}
                                placeholder={`talla ${size}`}
                                value={stock[size] || ""}
                                onChange={handleChangeValue}
                            />
                        ) : null
                    )}
                </div>
            </div>

            <div className={style.fourth__images__row}>
                <span>Carga de imagenes (max 5)</span>
                <div className={style.upload__container}>
                    <div className={style.preview__grid}>
                        {images.map((img) => (
                            <div key={img.id} className={style.preview__card}>
                                <img src={img.preview} alt="preview" />
                                <button onClick={() => removeImage(img.id)}>
                                    ✕
                                </button>
                            </div>
                        ))}

                        {images.length < MAX_IMAGES && (
                            <label className={style.upload__box}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleChangeImages}
                                    hidden
                                />
                                <span>+</span>
                            </label>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <Button as="button" text="guardar" />
            </div>
        </form>
    )
}
