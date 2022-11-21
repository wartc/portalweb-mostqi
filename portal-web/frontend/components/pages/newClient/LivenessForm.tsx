import { useForm } from "react-hook-form";
import { useFormData } from "../../../contexts/FormContext";

import liveness from "../../../api/services/most/liveness";

import styles from "./NewClientForms.module.scss";
import inputStyles from "../../../styles/Input.module.scss";
import { BsUpload } from "react-icons/bs";
import Button from "../../Button";
import toast from "react-hot-toast";

type LivenessFormProps = {
  onStepSubmit: () => void;
};

const LivenessForm = ({ onStepSubmit }: LivenessFormProps) => {
  const { setFormValues } = useFormData();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data: any) => {
    if (data.livenessVideo[0].size > 2097152) {
      toast.error("Arquivo deve ter no máximo 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", data.livenessVideo[0], "file");

    toast.promise(liveness(formData), {
      loading: "Verificando autenticidade...",
      success: ({ result }: any) => {
        if (result.livenessScore === 0) {
          return "Autenticidade não verificada.";
        }

        setFormValues({ selfie: result.frontalImage });
        onStepSubmit();
        return "Autenticidade verificada com sucesso!";
      },
      error: () => {
        return "Falha ao verificar autenticidade";
      },
    });
  };

  const fileState = watch("livenessVideo");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={inputStyles.inputContainer}>
        <label data-file className={inputStyles.inputLabel} htmlFor="livenessVideo">
          <span>
            Prova de vida (vídeo de até 2MB){" "}
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
          accept="video/*"
          className={inputStyles.input}
          id="livenessVideo"
          {...register("livenessVideo", { required: true })}
        />
      </div>

      {errors.livenessVideo && (
        <span className={styles.invalidInputText}>Por favor, selecione um arquivo</span>
      )}

      <Button type="submit" text="Enviar vídeo" />
    </form>
  );
};

export default LivenessForm;
