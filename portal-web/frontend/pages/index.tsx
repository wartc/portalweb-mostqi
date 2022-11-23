import { useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "react-query";
import { useAuth } from "../contexts/AuthContext";

import DefaultLayout from "../layouts/DefaultLayout";
import styles from "./index.module.scss";
import inputStyles from "../styles/Input.module.scss";

import { toast } from "react-hot-toast";
import Button from "../components/Button";
import BoxContainer from "../components/BoxContainer";

import LoginIllustration from "../public/images/InvestmentIllustration.svg";
import { useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

const Login: NextPageWithLayout = () => {
  const { user, signIn } = useAuth();
  const loginMutation = useMutation((data: FormValues) => signIn(data.email, data.password));
  const { register, handleSubmit } = useForm<FormValues>();

  useEffect(() => {
    if (user) Router.push(user.type === "CONTRIBUTOR" ? "/clients" : "/dashboard");
  }, [user]);

  const handleLogin = async (data: FormValues) => {
    toast.promise(loginMutation.mutateAsync(data), {
      loading: "Entrando...",
      success: "Bem-vindo!",
      error: "Não foi possível entrar",
    });
  };

  return (
    <BoxContainer>
      <form onSubmit={handleSubmit(handleLogin)} className={styles.formContainer}>
        <h1 className={styles.title}>Faça seu login</h1>

        <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
          <label htmlFor="email" className={inputStyles.inputLabel}>
            E-mail
          </label>
          <input
            className={inputStyles.input}
            type="email"
            id="email"
            placeholder="seu@email.com"
            {...register("email", { required: true })}
          />
        </div>

        <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
          <label htmlFor="password" className={inputStyles.inputLabel}>
            Senha
          </label>
          <input
            className={inputStyles.input}
            type="password"
            id="password"
            placeholder="••••••••••••"
            {...register("password", { required: true })}
          />
        </div>

        <Button type="submit" text="Entrar" fluid />

        <p style={{ fontSize: "0.8rem" }}>
          Não tem uma conta?{" "}
          <Link className={styles.link} href="/register">
            Registre-se aqui!
          </Link>
        </p>
      </form>

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
