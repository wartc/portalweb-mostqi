import { useState } from "react";
import { NextPageWithLayout } from "../../_app";
import { withAuthorization } from "../../../helpers/withAuthorization";
import AuthorizedLayout from "../../../layouts/AuthorizedLayout";
import FormProvider, { useFormData } from "../../../contexts/FormContext";

import styles from "./NewClient.module.scss";
import DocumentForm from "../../../components/pages/newClient/DocumentForm";
import MainInformationForm from "../../../components/pages/newClient/MainInformationForm";
import LivenessForm from "../../../components/pages/newClient/LivenessForm";

const AddClient = () => {
  const [step, setStep] = useState(1);
  const { data: formData } = useFormData();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adicionar novo cliente</h1>

      {step === 1 && <DocumentForm onStepSubmit={() => setStep(2)} />}

      {step === 2 && <MainInformationForm onStepSubmit={() => setStep(3)} />}

      {step === 3 && <LivenessForm onStepSubmit={() => setStep(4)} />}
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
