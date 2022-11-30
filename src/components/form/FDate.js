import { useFormContext, Controller } from "react-hook-form";
import React from "react";
import { DatePicker } from "@mui/lab";
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';


function FDate({ name, ...other }) {
  const { control } = useFormContext();
  const [value, setValue] = React.useState<Dayjs | null > (dayjs());

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState: { error } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />
        </LocalizationProvider>
          )}
          {...other}
        />
  );
}

export default FDate;
