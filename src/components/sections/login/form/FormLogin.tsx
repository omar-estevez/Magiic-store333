import { useState, type FormEvent } from "react"
import { Input } from "../../../commons/Input/Input";
import { Button } from "../../../commons/Button/Button";

export const FormLogin = () => {

    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string; }>({});
    const [loading, setLoading] = useState(false);

    const validate = () => {

        if (!loginForm.email) setErrors({ email: "Email obligatorio" });
        else if (!loginForm.email.includes('@')) setErrors({ email: "No es un email" });

        if (!loginForm.password) setErrors({ password: "Contrasenna obligatoria" });
        else if (loginForm.password.length < 8) setErrors({ password: "Contrasenna muy corta" });

        return errors;
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        validate();


        console.log(validate())

        setErrors({});
        setLoading(true);

        console.log(loginForm)

        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }

    return (
        <div>
            <h3>Inicia sesion</h3>

            <form onSubmit={handleSubmit}>
                <Input
                    id="email"
                    type="email"
                    placeholder="correo electronico"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    autoComplete="off"
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

                <Input
                    id="password"
                    type="password"
                    placeholder="contrasenna"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    autoComplete="off"
                    maxLength={16}
                />
                {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

                <Button as="button" type="submit" text={loading ? "Cargando..." : "Login"} variant="primary" disabled={loading} />
            </form>
        </div>
    )
}
