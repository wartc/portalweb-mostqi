import { useForm } from "react-hook-form";
import { useFormData } from "../../../contexts/FormContext";

import liveness from "../../../api/services/most/liveness";

import styles from "./NewClientForms.module.scss";
import inputStyles from "../../../styles/Input.module.scss";

import { BsUpload } from "react-icons/bs";
import toast from "react-hot-toast";
import Button from "../../Button";
import BoxContainer from "../../BoxContainer";
import faceCompare from "../../../api/services/most/faceCompare";

type LivenessFormProps = {
  onStepSubmit: (selfieB64: string) => void;
};

const LivenessForm = ({ onStepSubmit }: LivenessFormProps) => {
  const { data: formData } = useFormData();
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

    let selfie = "";
    const requestFormData = new FormData();
    requestFormData.append("file", data.livenessVideo[0], "file");

    await toast.promise(liveness(requestFormData), {
      loading: "Verificando autenticidade...",
      success: ({ result }: any) => {
        if (result.livenessScore === 0) {
          return "Autenticidade não verificada.";
        }

        selfie = result.frontalImage;
        return "Autenticidade verificada com sucesso!";
      },
      error: () => {
        return "Falha ao verificar autenticidade";
      },
    });

    toast.promise(
      faceCompare({
        faceFileBase64A: formData.document,
        faceFileBase64B: selfie,
      }),
      {
        loading: "Verificando similaridade do rosto...",
        success: ({ result }: any) => {
          if (result.distances[0] > 0.5) return "Rosto não confere com documento.";

          onStepSubmit(selfie);
          return "Rosto confere com documento!";
        },
        error: () => {
          return "Erro ao verificar similaridade do rosto";
        },
      }
    );
  };

  const fileState = watch("livenessVideo");

  return (
    <BoxContainer className={`${styles.boxContainer} ${styles.fixedWidth}`}>
      <form className={styles.livenessForm} onSubmit={handleSubmit(onSubmit)}>
        <p>
          Para finalizar o cadastro, por favor envie <b>em vídeo uma prova de vida do cliente</b>
        </p>

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

      <span className={styles.stepIndicator}>Passo 3/3</span>
    </BoxContainer>
  );
};

export default LivenessForm;
