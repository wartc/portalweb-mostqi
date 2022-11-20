import contentExtraction from "../../../api/services/most/contentExtraction";

import { useForm } from "react-hook-form";

import { BsUpload } from "react-icons/bs";
import { toast } from "react-hot-toast";
import inputStyles from "../../../styles/Input.module.scss";
import Button from "../../../components/Button";

type DocumentFormProps = {
  onStepSubmit: (data: object[]) => void;
};

const DocumentForm = ({ onStepSubmit }: DocumentFormProps) => {
  const { register, handleSubmit, watch } = useForm();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("file", data.document[0], "file");
    formData.append("returnImage", "true");

    toast.promise(contentExtraction(formData), {
      loading: "Identificando dados...",
      success: (res) => {
        onStepSubmit(res as object[]);
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("document")}
        />
      </div>

      <Button type="submit" text="Subir documento" />
    </form>
  );
};

export default DocumentForm;
