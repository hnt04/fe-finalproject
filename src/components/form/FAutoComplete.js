import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';

function FAutoComplete({ name, children, placeholder,options,...other }) {
  const { control } = useFormContext();
  console.log("other",other)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        console.log("other return",other)
        console.log("error",error)
        console.log("field",field)
        return (
              <Autocomplete
              {...field}
              multiple
              onChange = {(e,data) => field.onChange(data)}
              size="small"
              {...other}
              options={[{name:"Cindy"}]}
              filterSelectedOptions
              renderInput={(params) => {
                console.log("params",params)
                return <TextField
                  {...params}
                  variant="standard"
                  label="Size small"
                  placeholder={placeholder}
                />
              }}
            />
        )
      }}
    />
  );
}

export default FAutoComplete;