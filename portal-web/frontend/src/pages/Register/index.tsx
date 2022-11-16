import CenteredLayout from "../../ui/layouts/CenteredLayout";
import BoxContainer from "../../ui/components/BoxContainer";
import Input from "../../ui/components/Input";
import Link from "../../ui/components/Link";

import RegisterIllustration from "./RegisterIllustration";
import FormContainer from "./FormContainer";
import Button from "../../ui/components/Button";
import Title from "../../ui/components/Title";

const Register = () => {
  return (
    <CenteredLayout>
      <BoxContainer>
        <RegisterIllustration />

        <FormContainer>
          <Title style={{ alignSelf: "flex-start" }}>Cadastro</Title>

          <Input fluid label="Nome" type="text" placeholder="Nome completo" />
          <Input fluid label="Email" type="email" placeholder="seu@email.com" />
          <Input
            fluid
            label="Senha"
            type="password"
            placeholder="••••••••••••"
          />
          <Input
            fluid
            label="Confirmar senha"
            type="password"
            placeholder="••••••••••••"
          />

          <Button fluid>Registrar!</Button>

          <p style={{ fontSize: "0.8rem", alignSelf: "flex-start" }}>
            Já tem uma conta? <Link to="/">Faça login!</Link>
          </p>
        </FormContainer>
      </BoxContainer>
    </CenteredLayout>
  );
};

export default Register;
