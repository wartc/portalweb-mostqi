import { useState } from "react";
import { useNavigate } from "react-router-dom";
import register from "../../api/services/register";

import CenteredLayout from "../../ui/layouts/CenteredLayout";
import BoxContainer from "../../ui/components/BoxContainer";
import Input from "../../ui/components/Input";
import Link from "../../ui/components/Link";

import RegisterIllustration from "./RegisterIllustration";
import FormContainer from "./FormContainer";
import Button from "../../ui/components/Button";
import Title from "../../ui/components/Title";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const { name, email, password } = formData;

    const response = await register({ name, email, password });

    // @TODO: Handle response & login user

    return navigate("/");
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
          <Input
            fluid
            label="Senha"
            name="password"
            type="password"
            placeholder="••••••••••••"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            fluid
            label="Confirmar senha"
            name="confirmPassword"
            type="password"
            placeholder="••••••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Button fluid onClick={handleSubmit}>
            Registrar!
          </Button>

          <p style={{ fontSize: "0.8rem", alignSelf: "flex-start" }}>
            Já tem uma conta? <Link to="/">Faça login!</Link>
          </p>
        </FormContainer>
      </BoxContainer>
    </CenteredLayout>
  );
};

export default Register;
