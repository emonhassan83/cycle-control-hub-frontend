import { Input } from "antd";
import { Controller } from "react-hook-form";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useState } from "react";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  color?: string;
  width?: string;
};

const ReusableToggleInput = ({
  type,
  name,
  label,
  placeholder,
  style,
  color = "#fff",
  width = "100%",
}: TInputProps) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  // Set input type based on password visibility
  const inputType = type === "password" && !isPasswordVisible ? "password" : "text";

  return (
    <div style={{ marginBottom: "7px", ...style }}>
      <p style={{ marginBottom: "5px", color }}>{label ? label : null}</p>
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            style={{ width, backgroundColor: "rgba(255, 255, 255, 0.137)" }}
            type={inputType}
            id={name}
            placeholder={placeholder}
            suffix={
              type === "password" ? (
                <span onClick={handleTogglePassword} style={{ cursor: "pointer" }}>
                  {isPasswordVisible ? <EyeOutlined style={{color}} /> : <EyeInvisibleOutlined style={{color}} />}
                </span>
              ) : null
            }
            {...field}
          />
        )}
      />
    </div>
  );
};

export default ReusableToggleInput;
