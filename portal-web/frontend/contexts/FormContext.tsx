import { useState, createContext, useContext } from "react";

type FormContextType = {
  data: any;
  setFormValues: (data: any) => void;
};

export const FormContext = createContext<FormContextType>({} as FormContextType);

export default function FormProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState({});

  const setFormValues = (values: any) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  return <FormContext.Provider value={{ data, setFormValues }}>{children}</FormContext.Provider>;
}

export const useFormData = () => useContext(FormContext);
