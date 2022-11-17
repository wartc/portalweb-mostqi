import { useEffect, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import Input from "../../ui/components/Input";
import Title from "../../ui/components/Title";
import Link from "../../ui/components/Link";
import Button from "../../ui/components/Button";
import BoxContainer from "../../ui/components/BoxContainer";

import LoginIllustration from "./LoginIllustration";
import FormContainer from "./FormContainer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { isLoading, user, signIn } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user) navigate(user.type === "CONTRIBUTOR" ? "/clients" : "/dashboard");
  }, [isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    const user = await signIn(email, password);

    if (user)
      return navigate(user.type === "CONTRIBUTOR" ? "/clients" : "/dashboard");
    alert("Erro no login"); // TODO: criar um componente de erro
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Title style={{ alignSelf: "flex-start" }}>Faça seu login</Title>

        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="password"
          label="Senha"
          type="password"
          placeholder="••••••••••••"
          value={formData.password}
          onChange={handleChange}
        />

        <Button fluid onClick={handleLogin}>
          Entrar
        </Button>

        <p style={{ fontSize: "0.8rem" }}>
          Não tem uma conta? <Link to="/register">Registre-se aqui!</Link>
        </p>
      </FormContainer>

      <LoginIllustration />
    </BoxContainer>
  );
};

export default Login;
