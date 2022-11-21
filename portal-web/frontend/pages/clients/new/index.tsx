import { useState } from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";
import { withAuthorization } from "../../../helpers/withAuthorization";
import AuthorizedLayout from "../../../layouts/AuthorizedLayout";
import FormProvider, { useFormData } from "../../../contexts/FormContext";
import { useQueryClient } from "react-query";
import { createUser } from "../../../api/services/users";

import styles from "./NewClient.module.scss";
import Image from "next/image";
import ClientRegistratedIllustration from "../../../public/images/ClientRegistrated.svg";
import Button from "../../../components/Button";

import DocumentForm from "../../../components/pages/newClient/DocumentForm";
import MainInformationForm from "../../../components/pages/newClient/MainInformationForm";
import LivenessForm from "../../../components/pages/newClient/LivenessForm";
import BoxContainer from "../../../components/BoxContainer";
import toast from "react-hot-toast";

const AddClient = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [step, setStep] = useState(1); // 1 = Document, 2 = Main Information, 3 = Liveness
  const { data: formData } = useFormData();

  const handleLivenessSubmit = (selfieB64: string) => {
    toast.promise(
      createUser({
        name: formData.name,
        email: formData.email,
        clientDetails: {
          selfieB64,
          documentB64: formData.document,
          rg: formData.rg,
          dob: formData.dob,
        },
      }),
      {
        loading: "Cadastrando cliente...",
        success: () => {
          queryClient.invalidateQueries("users");
          setStep(4);
          return "Cliente cadastrado com sucesso!";
        },
        error: (err) => {
          setStep(1);
          console.log(err);
          if (err.data.title === "Email já cadastrado") {
            return "Email já cadastrado";
          }

          return "Erro ao criar cliente.";
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adicionar novo cliente</h1>

      {step === 1 && <DocumentForm onStepSubmit={() => setStep(2)} />}

      {step === 2 && <MainInformationForm onStepSubmit={() => setStep(3)} />}

      {step === 3 && <LivenessForm onStepSubmit={handleLivenessSubmit} />}

      {step === 4 && (
        <BoxContainer className={styles.boxContainer}>
          <div className={styles.success}>
            <h2>Novo cliente cadastrado com sucesso!</h2>
            <Image
              className={styles.illustration}
              src={ClientRegistratedIllustration}
              alt="Imagem ilustrativa de cadastro completo"
            />
            <p>
              A senha para acessar o sistema foi enviada para o email do cliente{" "}
              <b>{formData.email}</b>!
            </p>

            <Button
              secondary
              text="Voltar para a página de clientes"
              onClick={() => router.push("/clients")}
            />
          </div>
        </BoxContainer>
      )}
    </div>
  );
};

const ClientsWithAuthorization: NextPageWithLayout = withAuthorization(AddClient, "CONTRIBUTOR");

ClientsWithAuthorization.getLayout = (page) => (
  <AuthorizedLayout>
    <FormProvider>{page}</FormProvider>
  </AuthorizedLayout>
);

export default ClientsWithAuthorization;
