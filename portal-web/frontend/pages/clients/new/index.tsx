import { useState } from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";
import { withAuthorization } from "../../../helpers/withAuthorization";
import AuthorizedLayout from "../../../layouts/AuthorizedLayout";
import FormProvider, { useFormData } from "../../../contexts/FormContext";

import styles from "./NewClient.module.scss";
import Image from "next/image";
import ClientRegistratedIllustration from "../../../public/images/ClientRegistrated.svg";
import Button from "../../../components/Button";

import DocumentForm from "../../../components/pages/newClient/DocumentForm";
import MainInformationForm from "../../../components/pages/newClient/MainInformationForm";
import LivenessForm from "../../../components/pages/newClient/LivenessForm";

const AddClient = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const { data: formData } = useFormData();

  const handleCreateClient = () => {
    setStep(4);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adicionar novo cliente</h1>

      {step === 1 && <DocumentForm onStepSubmit={() => setStep(2)} />}

      {step === 2 && <MainInformationForm onStepSubmit={() => setStep(3)} />}

      {step === 3 && <LivenessForm onStepSubmit={handleCreateClient} />}

      {step === 4 && (
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
