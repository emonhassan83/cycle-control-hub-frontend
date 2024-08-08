import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    style?: React.CSSProperties;
    width?: string;
  };

const ReusableInput = ({ type, name, label, placeholder, style, width = "100%" }: TInputProps) => {
  return (
    <div style={{ marginBottom: "7px", ...style}}>
      <p style={{ marginBottom: "5px" }}>{label ? label : null}</p>
      <Controller
        name={name}
        render={({ field }) => <Input style={{width}} type={type} id={name} placeholder={placeholder} {...field} />}
      />
    </div>
  );
};

export default ReusableInput;
