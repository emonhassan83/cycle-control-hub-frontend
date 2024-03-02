import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePikerProps = {
  name: string;
  label?: string;
};

const ReusableDatePiker = ({ name, label }: TDatePikerProps) => {
  return (
    <div style={{ marginBottom: "5px" }}>
      <Controller
        name={name}
        render={({ field }) => (
        <Form.Item label={label}>
        <DatePicker {...field} size="middle" style={{width: "100%"}} />
        </Form.Item>
        )}
      />
    </div>
  );
};

export default ReusableDatePiker;
