import { useFormData } from "../../../contexts/FormContext";

type MainInformationFormProps = {
  onStepSubmit: (data: any) => void;
};

const MainInformationForm = ({ onStepSubmit }: MainInformationFormProps) => {
  const { data, setFormValues } = useFormData();
  console.log(data);

  return <div>main info form</div>;
};

export default MainInformationForm;
