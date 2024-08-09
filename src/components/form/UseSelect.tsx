import { Controller, useFormContext } from "react-hook-form";

type TSelectProp = {
  name: string;
  options: string[];
  placeholder: string;
  required?: boolean;
  label?: string;
};

const UseSelect = ({ name, options, placeholder, required = false, label }: TSelectProp) => {


  const {
    formState: { errors = {} },  // Ensure errors is defined as an object
  } = useFormContext();

  return (
    <div className="inputDiv">
      {label ? label : null}

      <Controller
        name={name}
        render={({ field }) => (
          <div >

            <select {...field} className="select" required={required}>
              <option value="">{placeholder}</option>
              {options.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>


            {errors[name]?.message && (
              <span style={{ color: 'red', fontSize: '14px' }}>
                {errors[name]?.message as string ?? ''}
              </span>
            )}
          </div>
        )}
      />
    </div>
  );
};
export default UseSelect;
