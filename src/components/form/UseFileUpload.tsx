import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
};

const UseFileUpload = ({
  name,
  type,
  label = "",
  placeholder,
  defaultValue = "",
}: TInputProps) => {
  const {
    formState: { errors = {} },  // Ensure errors is defined as an object
  } = useFormContext();

  return (
    <div className="inputDiv">
      {label ? label : null}
      <Controller
        name={name}
        render={({ field }) => (
          <>
            <input
              className="input"
              onChange={(e) => field.onChange(e.target?.files?.[0])}
              type={type}
              placeholder={placeholder}
              defaultValue={defaultValue}
            />
            {errors[name]?.message && (
              <span style={{ color: 'red', fontSize: '14px' }}>
                {errors[name]?.message as string ?? ''}
              </span>
            )}
          </>

        )}
      />

    </div>
  );
};
export default UseFileUpload;
