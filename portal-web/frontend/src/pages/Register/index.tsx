import { useState } from "react";
import register from "../../api/services/register";

import CenteredLayout from "../../ui/layouts/CenteredLayout";
import BoxContainer from "../../ui/components/BoxContainer";
import Input from "../../ui/components/Input";
import Link from "../../ui/components/Link";
import Button from "../../ui/components/Button";
import Title from "../../ui/components/Title";

import RegisterIllustration from "./RegisterIllustration";
import FormContainer from "./FormContainer";
import RegistratedModal from "./RegistratedModal";
import Loading from "../../ui/components/Loading";

type FormValues = {
  name: string;
  email: string;
};

const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    const { name, email } = formData;
    register({ name, email })
      .then(() => {
        setIsModalOpen(true);
      })
      .catch((err) => {
        alert("Erro na criação de conta");
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <CenteredLayout>
      <BoxContainer>
        <RegisterIllustration />

        <FormContainer>
          <Title style={{ alignSelf: "flex-start" }}>Cadastro</Title>

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

          <Button fluid onClick={handleSubmit}>
            Registrar!
          </Button>

          <p style={{ fontSize: "0.8rem", alignSelf: "flex-start" }}>
            Já tem uma conta? <Link to="/">Faça login!</Link>
          </p>

          <Loading visible={isLoading} />

          <RegistratedModal email={formData.email} isOpen={isModalOpen} />
        </FormContainer>
      </BoxContainer>
    </CenteredLayout>
  );
};

export default Register;
