import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean
};

const UseInput = ({
  name,
  type,
  label = "",
  placeholder,
  required = false

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
              {...field}
              className="input"
              onChange={field.onChange}
              type={type}
              placeholder={placeholder}
              required={required}

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
export default UseInput;
