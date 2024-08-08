import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePikerProps = {
  name: string;
  label?: string;
  width?: string;
};

const ReusableDatePiker = ({
  name,
  label,
  width = "100%",
}: TDatePikerProps) => {
  return (
    <div style={{ marginBottom: "5px" }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker {...field} size="middle" style={{ width }} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default ReusableDatePiker;
