import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
  };

const ReusableInput = ({ type, name, label, placeholder }: TInputProps) => {
  return (
    <div style={{ marginBottom: "7px" }}>
      <p style={{ marginBottom: "5px" }}>{label ? label : null}</p>
      <Controller
        name={name}
        render={({ field }) => <Input type={type} id={name} placeholder={placeholder} {...field} />}
      />
    </div>
  );
};

export default ReusableInput;
