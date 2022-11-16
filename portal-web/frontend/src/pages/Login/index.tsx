import CenteredLayout from "../../ui/layouts/CenteredLayout";
import Input from "../../ui/components/Input";
import Title from "../../ui/components/Title";
import Link from "../../ui/components/Link";
import Button from "../../ui/components/Button";
import BoxContainer from "../../ui/components/BoxContainer";

import LoginIllustration from "./LoginIllustration";
import FormContainer from "./FormContainer";

const Login = () => {
  return (
    <CenteredLayout>
      <BoxContainer>
        <FormContainer>
          <Title style={{ alignSelf: "flex-start" }}>Faça seu login</Title>

          <Input label="Email" type="email" placeholder="seu@email.com" />
          <Input label="Senha" type="password" placeholder="••••••••••••" />

          <Button fluid>Entrar</Button>

          <p style={{ fontSize: "0.8rem" }}>
            Não tem uma conta? <Link to="/register">Registre-se aqui!</Link>
          </p>
        </FormContainer>

        <LoginIllustration />
      </BoxContainer>
    </CenteredLayout>
  );
};

export default Login;
