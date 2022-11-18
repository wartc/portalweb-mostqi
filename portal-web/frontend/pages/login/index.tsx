import { useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles.module.scss";
import DefaultLayout from "../../layouts/DefaultLayout";

import Input from "../../components/Input";
import Button from "../../components/Button";
import BoxContainer from "../../components/BoxContainer";

import Image from "next/image";
import LoginIllustration from "../../public/images/InvestmentIllustration.svg";
import Link from "next/link";

const Login = () => {
  const { isLoading, user, signIn } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  // useEffect(() => {
  //   if (user) navigate(user.type === "CONTRIBUTOR" ? "/clients" : "/dashboard");
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    const user = await signIn(email, password);

    if (user) return console.log("logou", user);
    alert("Erro no login"); // TODO: criar um componente de erro
  };

  return (
    <DefaultLayout>
      <BoxContainer>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Faça seu login</h1>

          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            placeholder="••••••••••••"
            value={formData.password}
            onChange={handleChange}
          />

          <Button text="Entrar" fluid onClick={handleLogin} />

          <p style={{ fontSize: "0.8rem" }}>
            Não tem uma conta?{" "}
            <Link className={styles.link} href="/register">
              Registre-se aqui!
            </Link>
          </p>
        </div>

        <Image
          className={styles.illustration}
          src={LoginIllustration}
          alt="Imagem ilustrativa da página de login"
        />
      </BoxContainer>
    </DefaultLayout>
  );
};

export default Login;
