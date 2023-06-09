import { Container } from "./style"
import { LogoExplorer } from "../../components/LogoExplorer"
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "../../components/Button";
import { Link } from "react-router-dom";
import { HandleLoginTypes, useAuth } from "../../hooks/useAuth";
import { useSystem } from "../../hooks/useSystem";
import { useEffect } from "react";

export function SignIn() {
  const { register, handleSubmit, formState: { errors } } = useForm<HandleLoginTypes>();
  const { handleLogin } = useAuth();
  const { windowWidth, setWindowWidth } = useSystem();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const onSubmit: SubmitHandler<HandleLoginTypes> = ({ email, password }) => {
    handleLogin({ email, password })
  };

  return (
    <Container>
      <div className="foodExplorerLogo">
        <LogoExplorer />
      </div>

      <div className="formBox">
        {windowWidth > 640 && <h2>Faça Login</h2>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <section>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Exemplo: exemplo@exemplo.com.br"
              {...register("email", {
                required: "Campo obrigatório",
                pattern: { value: /\S+@\S+\.\S+/, message: "Insira um email válido" },
                maxLength: { value: 255, message: "Número máximo de caracteres é 255" }
              })}
            />
            {errors.email && <span className='inputError'>{errors.email.message}</span>}
          </section>

          <section>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="No mínimo 6 caracteres"
              {...register("password", {
                required: "Campo obrigatório",
                maxLength: { value: 255, message: "Número máximo de caracteres é 255" },
                minLength: { value: 6, message: "No mínimo 6 caracteres" },
              })}
            />
            {errors.password && <span className='inputError'>{errors.password.message}</span>}
          </section>

          <Button name="Entrar" />
        </form>

        <Link to="/signup" className="buttonSignUp">
          Criar uma conta
        </Link>
      </div>
    </Container>
  )
}