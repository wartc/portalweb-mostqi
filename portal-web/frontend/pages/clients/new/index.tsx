import { useState } from "react";
import { NextPageWithLayout } from "../../_app";
import { withAuthorization } from "../../../helpers/withAuthorization";
import AuthorizedLayout from "../../../layouts/AuthorizedLayout";
import FormProvider, { useFormData } from "../../../contexts/FormContext";

import styles from "./NewClient.module.scss";
import DocumentForm from "../../../components/pages/newClient/DocumentForm";
import MainInformationForm from "../../../components/pages/newClient/MainInformationForm";

const AddClient = () => {
  const [step, setStep] = useState(1);
  const { data: formData, setFormValues } = useFormData();

  const handleDataIdentification = (data: any) => {
    const identifiedData: { [key: string]: string | undefined } = {
      name: undefined,
      document: undefined,
      dob: undefined,
      rg: undefined,
    };

    data.result.forEach(
      (result: { fields: Array<{ name: string; value: string }> } & { image: string }) => {
        identifiedData.name =
          identifiedData.name ?? result.fields.find((field) => field.name === "nome")?.value;

        identifiedData.dob =
          identifiedData.dob ??
          result.fields.find((field) => field.name === "data_nascimento")?.value;

        identifiedData.rg =
          identifiedData.rg ?? result.fields.find((field) => field.name === "rg")?.value;

        identifiedData.document = identifiedData.document ?? result.image;
      }
    );

    setFormValues(identifiedData);
    setStep(2);
  };

  return (
    <div className={styles.container}>
      <h1>Adicionar novo cliente</h1>

      {step === 1 && <DocumentForm onStepSubmit={handleDataIdentification} />}

      {step === 2 && <MainInformationForm onStepSubmit={() => setStep(3)} />}
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
