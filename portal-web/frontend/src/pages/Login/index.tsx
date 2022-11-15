import Input from "../../ui/Input";
import Title from "../../ui/Title";
import Container from "./Container";
import FormContainer from "./FormContainer";

import { ReactComponent as LoginIllustration } from "../../assets/images/InvestmentIllustration.svg";

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
          <Input label="Senha" type="password" placeholder="••••••••••••" />
        </div>

        <LoginIllustration style={{ maxHeight: "70%" }} />
      </FormContainer>
    </Container>
  );
};

export default Login;
