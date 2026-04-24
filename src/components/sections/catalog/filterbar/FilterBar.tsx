import { useState } from 'react';
import style from './FilterBar.module.css';

const items = [
    { name: "Men", count: 124 },
    { name: "Women", count: 102 },
    { name: "Child", count: 56 },
];

const productTypes = [
    "Jackets",
    "Pants",
    "Shoes",
    "Accessories",
    "Others",
];

export const FilterBar = () => {

    const [active, setActive] = useState('all');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([""]);

    const departmentClickHandle = (name: string) => {
        setActive(name)
    }

    const toggleTypeHandle = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]);
    };

    return (
        <div className={style.filterContainer}>
            <h4>Departamento</h4>
            <div className={style.dept__container}>
                {
                    items.map((item) => (
                        <li key={item.name} className={active === item.name ? (style.active) : ''} onClick={() => departmentClickHandle(item.name)}>
                            <span>{item.name}</span>
                            <span>
                                {active === item.name ? '•' : item.count}
                            </span>
                        </li>
                    ))
                }
            </div>

            <h4>Tipo de producto</h4>
            <div className={style.type__container}>
                {productTypes.map((type) => (
                    <li key={type}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedTypes.includes(type)}
                                onChange={() => toggleTypeHandle(type)}
                            />
                            <span>{type}</span>
                        </label>
                    </li>
                ))}
            </div>
        </div>
    )
}
