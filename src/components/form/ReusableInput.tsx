import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    style?: React.CSSProperties; 
  };

const ReusableInput = ({ type, name, label, placeholder, style }: TInputProps) => {
  return (
    <div style={{ marginBottom: "7px", ...style}}>
      <p style={{ marginBottom: "5px" }}>{label ? label : null}</p>
      <Controller
        name={name}
        render={({ field }) => <Input style={{width: "100%"}} type={type} id={name} placeholder={placeholder} {...field} />}
      />
    </div>
  );
};

export default ReusableInput;
