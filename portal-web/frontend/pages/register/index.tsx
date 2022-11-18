import { useState } from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import Image from "next/image";
import Link from "next/link";
import register from "../../api/services/register";

import styles from "./styles.module.scss";
import DefaultLayout from "../../layouts/DefaultLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import BoxContainer from "../../components/BoxContainer";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";

import RegisterIllustration from "../../public/images/RegisterIllustration.svg";
import RegisteredIllustration from "../../public/images/RegisteredIllustration.svg";

type FormValues = {
  name: string;
  email: string;
};

const Register: NextPageWithLayout = () => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, email } = formData;
    register(name, email).then((data) => {
      if (data) {
        setIsModalOpen(true);
      } else {
        alert("Erro na criação de conta"); // TODO: criar um componente de erro
      }
      setIsLoading(false);
    });
  };

  return (
    <BoxContainer>
      <Image
        className={styles.illustration}
        src={RegisterIllustration}
        alt="Imagem ilustrativa da página de registro"
      />

      <div className={styles.formContainer}>
        <h1 className={styles.title}>Cadastro</h1>

        <Input
          fluid
          label="Nome"
          name="name"
          type="text"
          placeholder="Nome completo"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          fluid
          label="Email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
        />

        <Button text="Registrar!" fluid onClick={handleSubmit} />

        <p className={styles.registerText}>
          Já tem uma conta?{" "}
          <Link className={styles.link} href="/login">
            Faça login!
          </Link>
        </p>

        <Loading visible={isLoading} />

        <Modal isOpen={isModalOpen}>
          <Image
            className={`${styles.illustration} ${styles.modalIllustration}`}
            style={{ marginBottom: 20 }}
            src={RegisteredIllustration}
            alt="Imagem ilustrativa de registro completo"
          />
          <h1 className={`${styles.title} ${styles.centered}`}>Verifique seu email</h1>

          <div className={styles.registeredTextContainer}>
            <p>
              Quase lá! Um email foi enviado para <b>{formData.email}</b> contendo sua senha.
            </p>
            <p>Verifique sua caixa de mensagens!</p>
          </div>

          <Button text="Ir para o login" secondary onClick={() => router.push("/login")} />
        </Modal>
      </div>
    </BoxContainer>
  );
};

Register.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Register;
