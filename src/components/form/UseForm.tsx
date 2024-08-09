/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react"
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ZodSchema } from "zod";


type TFromProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>
  schema?: ZodSchema;
  defaultValues?: Record<string, unknown>;


}

type TFormConfig = {
  defaultValues?: Record<string, unknown>;
  resolver?: any;
}

const UseForm = ({ children, onSubmit, defaultValues, schema }: TFromProps) => {
  const myConfig: TFormConfig = {}
  if (defaultValues) {
    myConfig["defaultValues"] = defaultValues
  }
  if (schema) {
    myConfig["resolver"] = zodResolver(schema)
  }
  const methods = useForm(myConfig)

  const handleFormSubmit = async (data: FieldValues) => {
    await onSubmit(data)
  }

  return (
    <FormProvider {...methods} >
      <form onSubmit={methods.handleSubmit(handleFormSubmit)}>{children}</form>
    </FormProvider>
  )
}
export default UseForm