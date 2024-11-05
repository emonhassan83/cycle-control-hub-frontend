import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  color?: string;
  label?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  width?: string;
};

const ReusableInput = ({
  type,
  name,
  label,
  placeholder,
  color,
  style,
  width = "100%",
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "7px", ...style }}>
      <p style={{ marginBottom: "5px", color }}>{label ? label : null}</p>
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            style={{ width, backgroundColor: "rgba(255, 255, 255, 0.137)" }}
            type={type}
            id={name}
            placeholder={placeholder}
            {...field}
          />
        )}
      />
    </div>
  );
};

export default ReusableInput;
