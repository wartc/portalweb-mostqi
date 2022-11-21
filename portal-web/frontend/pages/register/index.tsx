import { useState } from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../_app";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "react-query";
import { register } from "../../api/services/register";

import styles from "./styles.module.scss";
import inputStyles from "../../styles/Input.module.scss";
import DefaultLayout from "../../layouts/DefaultLayout";

import { toast } from "react-hot-toast";
import Button from "../../components/Button";
import BoxContainer from "../../components/BoxContainer";
import Modal from "../../components/Modal";

import RegisterIllustration from "../../public/images/RegisterIllustration.svg";
import RegisteredIllustration from "../../public/images/RegisteredIllustration.svg";

type FormValues = {
  name: string;
  email: string;
};

const Register: NextPageWithLayout = () => {
  const router = useRouter();
  const registerMutation = useMutation((data: FormValues) => register(data.name, data.email));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

        <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
          <label htmlFor="name" className={inputStyles.inputLabel}>
            Nome
          </label>
          <input
            className={inputStyles.input}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
          <label htmlFor="email" className={inputStyles.inputLabel}>
            Email
          </label>
          <input
            className={inputStyles.input}
            type="email"
            name="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <Button
          disabled={registerMutation.isLoading}
          text="Registrar!"
          fluid
          onClick={() =>
            toast.promise(registerMutation.mutateAsync(formData), {
              loading: "Cadastrando...",
              success: () => {
                setIsModalOpen(true);
                return "Cadastro realizado com sucesso!";
              },
              error: "Não foi possível cadastrar",
            })
          }
        />

        <p className={styles.registerText}>
          Já tem uma conta?{" "}
          <Link className={styles.link} href="/">
            Faça login!
          </Link>
        </p>

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

          <Button text="Ir para o login" secondary onClick={() => router.push("/")} />
        </Modal>
      </div>
    </BoxContainer>
  );
};

Register.getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>;

export default Register;
