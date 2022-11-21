import contentExtraction from "../../../api/services/most/contentExtraction";

import { useForm } from "react-hook-form";
import { useFormData } from "../../../contexts/FormContext";

import { BsUpload } from "react-icons/bs";
import { toast } from "react-hot-toast";
import styles from "./NewClientForms.module.scss";
import inputStyles from "../../../styles/Input.module.scss";
import Button from "../../../components/Button";
import BoxContainer from "../../BoxContainer";

type DocumentFormProps = {
  onStepSubmit: () => void;
};

const DocumentForm = ({ onStepSubmit }: DocumentFormProps) => {
  const { data, setFormValues } = useFormData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

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
    onStepSubmit();
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("file", data.document[0], "file");
    formData.append("returnImage", "true");

    toast.promise(contentExtraction(formData), {
      loading: "Identificando dados...",
      success: (res) => {
        handleDataIdentification(res as object[]);
        return "Identificação concluída!";
      },
      error: (error) => {
        console.error(error);
        return "Erro ao identificar os dados. Por favor, tente novamente.";
      },
    });
  };

  const fileState = watch("document");

  return (
    <BoxContainer className={styles.boxContainer}>
      <form className={styles.documentForm} onSubmit={handleSubmit(onSubmit)}>
        <p>
          Para começar o cadastro do cliente, por favor envie{" "}
          <b>um arquivo de imagem do documento de identificação</b>
        </p>

        <div className={inputStyles.inputContainer}>
          <label data-file className={inputStyles.inputLabel} htmlFor="document">
            <span>
              Documento de identificação{" "}
              <BsUpload size="1.25rem" style={{ marginLeft: 8, display: "inline-flex" }} />
            </span>
            {fileState && fileState.length > 0 ? (
              <span className={inputStyles.fileInputStatus}>
                Arquivo carregado: {fileState[0].name}
              </span>
            ) : null}
          </label>
          <input
            type="file"
            accept="image/*"
            className={inputStyles.input}
            id="document"
            {...register("document", { required: true })}
          />
        </div>

        {errors.document && (
          <span className={styles.invalidInputText}>Por favor, selecione um arquivo</span>
        )}

        <Button className={styles.submitButton} type="submit" text="Enviar documento" />
      </form>

      <span className={styles.stepIndicator}>Passo 1/4</span>
    </BoxContainer>
  );
};

export default DocumentForm;
