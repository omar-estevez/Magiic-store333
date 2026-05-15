import { useState } from "react";
import { categoryOptions, departmentOptions } from "../../../../../data/product";
import { formatPriceCop } from "../../../../../utils/formatPriceCop";
import type { DataSectionProps } from "./DataSection.types"
import style from './DataSection.module.css'
import { Button } from "../../../../commons/Button/Button";

export const DataSection = ({ data }: DataSectionProps) => {

    const [selectedSize, setSelectedSize] = useState("");

    const findDepartment = (department?: string) => {
        const found = departmentOptions.find((dep) => dep.value === String(department));
        return found?.label ?? "";
    }

    const findCategory = (category?: string) => {
        const found = categoryOptions.find((cat) => cat.value === String(category));

        return found?.label ?? '';
    }

    return (
        <div className={style.data__container}>
            <span>Departamento: {findDepartment(data?.department)}</span>
            <br />
            <span>Categoria: {findCategory(data?.category)}</span>
            <h2>{data?.name}</h2>
            <p className={style.price}>{formatPriceCop(Number(data?.price))}</p>
            <hr />
            <p className={style.sizes__title}>Tallas: </p>
            <div className={style.sizes}>
                {data?.sizes.map((size) => (
                    <label key={size} className={`${style.size__option} ${selectedSize === size ? style.active : ""}`}>
                        <input
                            type="radio"
                            value={size}
                            checked={selectedSize === size}
                            onChange={() => setSelectedSize(size)}
                        />
                        {size}
                    </label>
                ))}
            </div>
            <hr />
            <div className={style.btn__contain}>
                <Button as="button" text='Agrega al carrito' />
            </div>
        </div>
    )
}
