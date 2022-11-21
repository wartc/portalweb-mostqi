import { useForm } from "react-hook-form";
import { useFormData } from "../../../contexts/FormContext";

import styles from "./NewClientForms.module.scss";
import inputStyles from "../../../styles/Input.module.scss";
import Button from "../../Button";
import BoxContainer from "../../BoxContainer";

type MainInformationFormProps = {
  onStepSubmit: () => void;
};

const MainInformationForm = ({ onStepSubmit }: MainInformationFormProps) => {
  const {
    data: { name, dob, rg },
    setFormValues,
  } = useFormData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      email: "",
      dob,
      rg,
    },
  });

  const onSubmit = (data: any) => {
    setFormValues(data);
    onStepSubmit();
  };

  return (
    <BoxContainer className={`${styles.boxContainer} ${styles.fixedWidth}`}>
      <form className={styles.mainInfoForm} onSubmit={handleSubmit(onSubmit)}>
        <p>Verifique as informações identificadas e preencha o email para continuar</p>

        <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
          <label className={inputStyles.inputLabel} htmlFor="name">
            Nome
          </label>
          <input
            className={inputStyles.input}
            disabled={!!name}
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
        </div>
        {errors.name && <span className={styles.invalidInputText}>Campo obrigatório</span>}

        <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
          <label className={inputStyles.inputLabel} htmlFor="rg">
            RG
          </label>
          <input
            className={inputStyles.input}
            disabled={!!rg}
            type="text"
            id="rg"
            {...register("rg", { required: true })}
          />
        </div>
        {errors.rg && <span className={styles.invalidInputText}>Campo obrigatório</span>}

        <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
          <label className={inputStyles.inputLabel} htmlFor="dob">
            Data de nascimento
          </label>
          <input
            className={inputStyles.input}
            disabled={!!dob}
            type="date"
            id="dob"
            {...register("dob", { required: true })}
          />
        </div>
        {errors.dob && <span className={styles.invalidInputText}>Campo obrigatório</span>}

        <div className={`${inputStyles.inputContainer} ${inputStyles.fluid}`}>
          <label className={inputStyles.inputLabel} htmlFor="email">
            Email
          </label>
          <input
            className={inputStyles.input}
            type="text"
            id="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className={styles.invalidInputText}>Campo obrigatório</span>}
        </div>

        <Button fluid type="submit" text="Prosseguir" />
      </form>

      <span className={styles.stepIndicator}>Passo 2/3</span>
    </BoxContainer>
  );
};

export default MainInformationForm;
