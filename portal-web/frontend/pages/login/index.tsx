import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "react-query";
import { useAuth } from "../../contexts/AuthContext";

import DefaultLayout from "../../layouts/DefaultLayout";
import styles from "./styles.module.scss";

import { toast } from "react-hot-toast";
import Input from "../../components/Input";
import Button from "../../components/Button";
import BoxContainer from "../../components/BoxContainer";

import LoginIllustration from "../../public/images/InvestmentIllustration.svg";

type FormValues = {
  email: string;
  password: string;
};

const Login: NextPageWithLayout = () => {
  const { user, signIn } = useAuth();
  const loginMutation = useMutation((data: FormValues) => signIn(data.email, data.password));
  const [formData, setFormData] = useState<FormValues>({ email: "", password: "" });

  useEffect(() => {
    if (user) Router.push(user.type === "CONTRIBUTOR" ? "/clients" : "/dashboard");
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    toast.promise(loginMutation.mutateAsync(formData), {
      loading: "Entrando...",
      success: "Bem-vindo!",
      error: "Não foi possível entrar",
    });
  };

  return (
    <BoxContainer>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Faça seu login</h1>

        <Input
          fluid
          name="email"
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          fluid
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
  );
};

Login.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Login;
