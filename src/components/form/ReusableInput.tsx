import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
    type: string;
    name: string;
    label?: string;
  };

const ReusableInput = ({ type, name, label }: TInputProps) => {
  return (
    <div style={{ marginBottom: "7px" }}>
      <p style={{ marginBottom: "5px" }}>{label ? label : null}</p>
      <Controller
        name={name}
        render={({ field }) => <Input type={type} id={name} {...field} />}
      />
    </div>
  );
};

export default ReusableInput;
