import { useState, type ChangeEvent, type FormEvent } from "react";
import { Input } from "../../../../commons/Input/Input";
import style from './FormModal.module.css'
import { Button } from "../../../../commons/Button/Button";
import type { formModalErrors, FormModalProps, formModalType, ImageType } from "./FormModal.types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import type { ProductType } from "../../../../../types/product.types";
import { uploadImagesParallel } from "../../../../../services/cloudinaryService";
import { Toast } from "../../../../commons/Toast/Toast";
import { Spinner } from "../../../../commons/Spinner/Spinner";
import { useProductStore } from "../../../../../store/product.store";
import { CreateSlug } from "../../../../../utils/CreateSlug";

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



export const FormModal = ({ setModalIsOpen, idProduct, initialValues }: FormModalProps) => {

    const initialVotes = initialValues.sizes.reduce(
        (acc, size) => {
            acc[size] = true;
            return acc;
        },
        {} as Record<string, boolean>);

    const MAX_IMAGES = 5;
    const [productForm, setProductForm] = useState<formModalType>(initialValues);
    const [votes, setVotes] = useState<Record<string, boolean>>(initialVotes);
    const [stock, setStock] = useState<Record<string, number>>(initialValues.stock);
    const [errors, setErrors] = useState<formModalErrors>({});
    const [images, setImages] = useState<ImageType[]>(initialValues.imageUrl);
    const [, setUploadedUrls] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    const { addProduct, updateProduct } = useProductStore();

    const currentSizes = sizeOptions[productForm.category]?.[productForm.department] || [];

    const handleChangeCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        if (!checked) removeStock(name)

        setVotes((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setStock((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const removeStock = (key: string) => {
        setStock(prev => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [key]: _, ...rest } = prev;
            return rest;
        });
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

    const validateField = (name: string, value: string | number | string[] | number[] | Record<string, number> | undefined | ImageType[] | boolean) => {

        let selectedSizes;
        let allHaveStock;

        switch (name) {
            case 'name':
                if (!value) return 'El nombre es obligatorio'
                break;
            case 'price':
                if (!value) return 'El precio es obligatorio'
                if (Number(value) < 1000) return 'El valor debe ser mayor a $1000'
                break;
            case 'category':
                if (!value) return 'Escoge alguna categoria'
                break;
            case 'department':
                if (!value) return 'Escoge algun departamento'
                break;
            case 'sizes':
                if (Object.values(votes).every(v => v !== true)) return 'Escoge alguna talla'
                break;
            case 'stock':
                selectedSizes = Object.keys(votes).filter(k => votes[k]);

                allHaveStock = selectedSizes.every(size => {
                    const value = stock[size];

                    return value !== undefined &&
                        Number(value) > 0;
                });

                if (!allHaveStock) return 'Llena el stock del producto'
                break;
        }

        return undefined
    }

    const validateForm = () => {
        const newErrors: formModalErrors = {};

        (Object.keys(productForm) as Array<keyof formModalType>).map((key) => {
            const error = validateField(key, productForm[key]);
            if (error) newErrors[key] = error;
        })

        return newErrors
    }

    const handleType = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // return idProduct ? console.log('actualiza') : console.log('nuevo')
        return idProduct ? handleUpdate(e, idProduct) : handleSubmit(e)
    }

    const handleUpload = async (folder?: string) => {
        if (images.length === 0) return [];

        try {
            const files = images.map(img => img.file).filter((file): file is File => file !== undefined);;
            const urls = await uploadImagesParallel(files, folder);
            setUploadedUrls(urls);
            setImages([]);
            return urls;
        } catch (error) {
            console.error(error);
            alert('Error subiendo imágenes');
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formErrors = validateForm();
        setErrors(formErrors);
        if (Object.keys(formErrors).length !== 0) return;

        if (images.length === 0) {
            Toast.info('Al menos 1 imagen')
            return;
        }

        setUploading(true);

        const updatedForm: ProductType = {
            ...productForm,
            slug: CreateSlug(productForm.name),
            price: Number(productForm.price),
            sizes: Object.keys(votes).filter(k => votes[k]),
            stock,
            imageUrl: [],
            description: '',
            isActive: true,
            popular: false,
        };

        try {
            const productId = await addProduct(updatedForm);

            if (!productId) {
                Toast.error("No se pudo crear el producto");
                return;
            }

            const imageUrls = await handleUpload(productId);

            await updateDoc(doc(db, "products", productId), { imageUrl: imageUrls });

            setErrors({});
        } catch (error) {
            console.error(error);
        } finally {
            Toast.success('Guardo correctamente')

            setTimeout(() => {
                setModalIsOpen(false)
                setUploading(false);
            }, 3000);
        }
    }

    const handleUpdate = async (e: FormEvent<HTMLFormElement>, id: string) => {
        if (!id) return;
        e.preventDefault();

        const formErrors = validateForm();
        setErrors(formErrors);
        if (Object.keys(formErrors).length !== 0) return;

        if (images.length === 0) {
            Toast.info('Al menos 1 imagen')
            return;
        }

        setUploading(true);

        let updatedForm: ProductType = {
            ...productForm,
            slug: CreateSlug(productForm.name),
            price: Number(productForm.price),
            sizes: Object.keys(votes).filter(k => votes[k]),
            stock,
            imageUrl: productForm.imageUrl.map((data) => data.preview),
            description: '',
            isActive: productForm.isActive,
            popular: productForm.popular,
        };

        try {

            const imageUrls = await handleUpload(id);

            const uploadedImages = imageUrls ?? [];
            const oldImages = productForm.imageUrl.map((img) => img.preview);

            updatedForm = {
                ...updatedForm,
                imageUrl: [...oldImages, ...uploadedImages],
            };

            await updateProduct(id, updatedForm);

            setErrors({});

        } catch (error) {
            console.error("Error al actualizar:", error);
        } finally {
            Toast.success('Guardo correctamente')

            setTimeout(() => {
                setModalIsOpen(false)
                setUploading(false);
            }, 3000);
        }
    }

    return (
        <form className={style.form__container} onSubmit={handleType}>
            <fieldset className={style.container__fieldset} disabled={uploading}>
                <div className={style.first__row__form}>
                    <div>
                        <Input
                            id="name"
                            type="text"
                            placeholder="nombre del producto"
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            autoComplete="off"
                            maxLength={16}
                        />
                        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                    </div>

                    <div>
                        <Input
                            id="price"
                            type="number"
                            placeholder="precio del producto"
                            value={productForm.price}
                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                            min={0}
                            autoComplete="off"
                            maxLength={16}
                        />
                        {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
                    </div>

                    <div>
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
                        {errors.department && <p style={{ color: "red" }}>{errors.department}</p>}
                    </div>

                    <div>
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
                        {errors.category && <p style={{ color: "red" }}>{errors.category}</p>}
                    </div>
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
                        {errors.sizes && <p style={{ color: "red" }}>{errors.sizes}</p>}
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
                        {errors.stock && <p style={{ color: "red" }}>{errors.stock}</p>}
                    </div>
                </div>

                <div className={style.fourth__images__row}>
                    <span>Carga de imagenes (max 5)</span>
                    <div className={style.upload__container}>
                        <div className={style.preview__grid}>
                            {images.map((img) => (
                                <div key={img.id} className={style.preview__card}>
                                    <img src={img.preview} alt="preview" />
                                    {img.file && <button onClick={() => removeImage(img.id)}>
                                        ✕
                                    </button>}
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
            </fieldset>
            <div className={style.btn__container}>
                <Button as="button" text={uploading ? 'Subiendo Producto' : (idProduct ? 'Editar Producto' : 'Subir Producto')} disabled={uploading} left_icon={uploading ? <Spinner /> : undefined} />
            </div>
        </form>
    )
}
