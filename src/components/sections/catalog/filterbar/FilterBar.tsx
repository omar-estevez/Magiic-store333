import style from './FilterBar.module.css';
import { Button } from '../../../commons/Button/Button';
import type { FilterBarProps } from './FilterBar.types';

const initialItems = [
    { id: 'men', name: "Hombre", count: 124 },
    { id: 'women', name: "Mujer", count: 102 },
    { id: 'child', name: "Ninnos", count: 56 },
];

const productTypes = [
    { id: 'jackets', name: "Chaquetas" },
    { id: 'shirts', name: "Camisas" },
    { id: 'pants', name: "Pantalones" },
    { id: 'shoes', name: "Zapatos" },
    { id: 'accesories', name: "Accesorios" },
];

export const FilterBar = ({ activeDepartment, selectedTypes, setActiveDepartment, setSelectedTypes, products, setSearchText }: FilterBarProps) => {

    const items = initialItems.map(item => {
        const count = products.filter(p => p.department === item.id).length;

        return {
            ...item,
            count
        };
    });

    const departmentClickHandle = (name: string) => {
        setActiveDepartment(name);
    }

    const toggleTypeHandle = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]);
    };

    const handleButtonReset = () => {
        setActiveDepartment("all");
        setSelectedTypes([]);
        setSearchText("");
    }

    return (
        <div className={style.filterContainer}>
            <div>
                <h4>Departamento</h4>
                <div className={style.dept__container}>
                    {
                        items.map((item) => (
                            <li key={item.id} className={activeDepartment === item.id ? (style.active) : ''} onClick={() => departmentClickHandle(item.id)}>
                                <span>{item.name}</span>
                                <span>
                                    {activeDepartment === item.id ? '•' : item.count}
                                </span>
                            </li>
                        ))
                    }
                </div>
            </div>

            <div>
                <h4>Tipo de producto</h4>
                <div className={style.type__container}>
                    {productTypes.map((type) => (
                        <li key={type.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedTypes.includes(type.id)}
                                    onChange={() => toggleTypeHandle(type.id)}
                                />
                                <span>{type.name}</span>
                            </label>
                        </li>
                    ))}
                </div>
            </div>

            <div>
                <Button as='button' text='Reset' onClick={handleButtonReset} />
            </div>
        </div>
    )
}
