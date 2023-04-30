import DatePicker from "react-datepicker";
import { useField } from 'formik';
import "react-datepicker/dist/react-datepicker.css";

const MyDatePicker = ({ name = "", minDate }) => {
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <DatePicker
      {...field}
      minDate={minDate}
      dateFormat="dd/MM/yyyy"
      selected={value}
      onChange={(date) => setValue(date)}
    />
  );
};
export default MyDatePicker;
