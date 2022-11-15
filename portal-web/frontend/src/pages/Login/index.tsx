import CenteredLayout from "../../ui/layouts/CenteredLayout";
import Input from "../../ui/components/Input";
import Title from "../../ui/components/Title";
import Link from "../../ui/components/Link";
import Button from "../../ui/components/Button";

import FormContainer from "./FormContainer";
import LoginIllustration from "./LoginIllustration";

const Login = () => {
  return (
    <CenteredLayout>
      <FormContainer>
        <div
          style={{
            display: "flex",
            height: "100%",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Title style={{ marginBottom: 50 }}>Faça seu login</Title>

          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            style={{ marginBottom: 20 }}
          />
          <Input
            label="Senha"
            type="password"
            placeholder="••••••••••••"
            style={{ marginBottom: 50 }}
          />

          <Button>Entrar</Button>

          <p style={{ marginTop: 20, fontSize: "0.8rem" }}>
            Não tem uma conta? <Link to="/register">Registre-se aqui!</Link>
          </p>
        </div>

        <LoginIllustration />
      </FormContainer>
    </CenteredLayout>
  );
};

export default Login;
