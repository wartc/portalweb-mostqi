import { useNavigate } from "react-router-dom";

import Title from "../../ui/components/Title";
import Button from "../../ui/components/Button";
import Modal from "../../ui/components/Modal";

import RegisteredIllustration from "./RegisteredIllustration";
import styled from "styled-components";

type RegistratedModalProps = {
  email: string;
  isOpen: boolean;
};

const TextContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 18px;
  line-height: 1.75;
  text-align: center;
`;

const RegistratedModal = ({ email, isOpen }: RegistratedModalProps) => {
  const navigate = useNavigate();

  return (
    <Modal isOpen={isOpen}>
      <RegisteredIllustration />
      <Title>Verifique seu email</Title>

      <TextContainer>
        <p>
          Quase lá! Um email foi enviado para <b>{email}</b> contendo sua senha.
        </p>
        <p>Verifique sua caixa de mensagens!</p>
      </TextContainer>

      <Button secondary onClick={() => navigate("/")}>
        Ir para o login
      </Button>
    </Modal>
  );
};

export default RegistratedModal;
