import { useState, type FormEvent } from "react"
import { Input } from "../../../commons/Input/Input";
import { Button } from "../../../commons/Button/Button";
import type { FormData, FormErrors } from "./FormLogin.types";
import style from './FormLogin.module.css';
import { useAuthStore } from "../../../../store/auth.store";
import { NavLink, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { Tooltip } from 'react-tooltip';

export const FormLogin = () => {

    const [loginForm, setLoginForm] = useState<FormData>({ email: '', password: '' });
    const [errors, setErrors] = useState<FormErrors>({});

    const { login, loadingAuth, errorAuth } = useAuthStore();

    const navigate = useNavigate();

    const validateField = (name: string, value: string) => {

        switch (name) {
            case 'email':
                if (!value) return 'correo obligatorio'
                if (!value.includes('@')) return 'No es un email'
                break;
            case 'password':
                if (!value) return 'Contraseña obligatoria'
                if (value.length < 8) return 'Contraseña muy corta'
                break;
        }

        return undefined
    }

    const validateForm = () => {
        const newErrors: FormErrors = {};

        (Object.keys(loginForm) as Array<keyof FormData>).map((key) => {
            const error = validateField(key, loginForm[key]);
            if (error) newErrors[key] = error;
        })

        return newErrors
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formErrors = validateForm();
        setErrors(formErrors);

        if (Object.keys(formErrors).length !== 0) return;

        console.log('Form submitted:', loginForm);

        const response = await login(loginForm.email, loginForm.password);

        console.log(response)

        if (response) await navigate("/dashboard");

        setErrors({});
    }

    return (
        <div className={style.form__container}>
            <NavLink to="/"><IoHome className={style.icon} data-tooltip-id="my-tooltip" data-tooltip-content="Pagina principal" data-tooltip-place="right" /></NavLink>


            <h3>Inicia sesion</h3>

            <form onSubmit={handleSubmit}>
                <div>
                    <p>admin@magicstore.com / 123456789</p>
                    <Input
                        id="email"
                        type="email"
                        placeholder="correo electronico"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        autoComplete="off"
                    />
                    {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
                </div>

                <div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="contraseña"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        autoComplete="off"
                        maxLength={16}
                    />
                    {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
                </div>


                <Button as="button" type="submit" text={loadingAuth ? "Cargando..." : "Login"} variant="primary" disabled={loadingAuth} />
                {errorAuth && <p style={{ color: "red" }}>{errorAuth}</p>}
            </form>

            <Tooltip id="my-tooltip" />
        </div>
    )
}
