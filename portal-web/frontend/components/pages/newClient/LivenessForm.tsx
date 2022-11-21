import { useForm } from "react-hook-form";
import { useFormData } from "../../../contexts/FormContext";

import liveness from "../../../api/services/most/liveness";

import styles from "./NewClientForms.module.scss";
import inputStyles from "../../../styles/Input.module.scss";
import { BsUpload } from "react-icons/bs";
import Button from "../../Button";
import toast from "react-hot-toast";
import faceCompare from "../../../api/services/most/faceCompare";

type LivenessFormProps = {
  onStepSubmit: () => void;
};

const LivenessForm = ({ onStepSubmit }: LivenessFormProps) => {
  const { data: formData, setFormValues } = useFormData();
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

    const statusToast = toast.loading("Verificando similaridade do rosto...");

    faceCompare({
      faceFileBase64A: formData.document,
      faceFileBase64B: selfie,
    })
      .then(({ result }) => {
        if (result.distances[0] > 0.5) {
          toast.error("Rosto não confere com documento.", { id: statusToast });
        } else {
          setFormValues({ selfie });
          onStepSubmit();
          toast.success("Rosto confere com documento!", { id: statusToast });
        }
      })
      .catch(() => {
        toast.error("Erro ao verificar similaridade do rosto", { id: statusToast });
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
