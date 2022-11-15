import Input from "../../ui/Input";
import Title from "../../ui/Title";
import Link from "../../ui/Link";
import Button from "../../ui/Button";
import Container from "./Container";
import FormContainer from "./FormContainer";
import LoginIllustration from "./LoginIllustration";

const Login = () => {
  return (
    <Container>
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
            Não tem uma conta? <Link to="/">Registre-se aqui!</Link>
          </p>
        </div>

        <LoginIllustration />
      </FormContainer>
    </Container>
  );
};

export default Login;
