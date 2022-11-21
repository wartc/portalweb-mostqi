import { useForm } from "react-hook-form";

import { useFormData } from "../../../contexts/FormContext";

type MainInformationFormProps = {
  onStepSubmit: (data: any) => void;
};

const MainInformationForm = ({ onStepSubmit }: MainInformationFormProps) => {
  const { data, setFormValues } = useFormData();
  const { register, handleSubmit } = useForm();

  return <form></form>;
};

export default MainInformationForm;
