import { useState, createContext, useContext } from "react";

type FormContextType<T = unknown> = {
  data: Partial<T>;
  setFormValues: (data: Partial<T>) => void;
};

export const FormContext = createContext<FormContextType>({} as FormContextType);

export default function FormProvider<T>({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Partial<T>>({});

  const setFormValues = (values: Partial<T>) => {
    setData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  return <FormContext.Provider value={{ data, setFormValues }}>{children}</FormContext.Provider>;
}

export const useFormData = () => useContext(FormContext);
