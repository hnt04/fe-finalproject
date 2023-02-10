import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { FormProvider } from "../../components/form";
import useAuth from "../../hooks/useAuth";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { FSelect } from "../../components/form";
import {
  createCommendations,
} from "../commendtionboard/commendationSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const filter = createFilterOptions();

const defaultValues = {
  month: "January",
  name: "",
  year:"2023"
};

function UserTable({ users }) {
  // console.log("user table",user)

  const { isLoading } = useSelector((state) => state.commendation);

  const methods = useForm({
    defaultValues,
  });

  const monthOfYear = [
    { id: "January", name: "January" },
    { id: "February", name: "February" },
    { id: "March", name: "March" },
    { id: "April", name: "April" },
    { id: "May", name: "May" },
    { id: "June", name: "June" },
    { id: "July", name: "July" },
    { id: "August", name: "August" },
    { id: "September", name: "September" },
    { id: "October", name: "October" },
    { id: "November", name: "November" },
    { id: "December", name: "December" },
  ];

  const yearCommendation = [
    { id: "2023", name: "2023" },
    { id: "2024", name: "2024" },
    { id: "2025", name: "2025" },
    { id: "2026", name: "2026" },
    { id: "2027", name: "2027" }
  ];

  const { userList } = useSelector((state) => state.user);

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  useEffect(() => {
    reset({
      name: "",
    });
  }, [userList]);

  const onSubmit = (commendations) => {
    console.log("commendations", commendations);
    dispatch(
      createCommendations({ ...commendations, name: userListCommendation })).then(() => reset());
  };

  const [userListCommendation, setUserListCommendation] = useState([]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
      <FSelect
          name="year"
          label="Year"
          variant="standard"
          inputProps={{ "aria-label": "Without label" }}
        >
          {yearCommendation.map((option) => (
            <option key={option.name}>{option.name}</option>
          ))}
        </FSelect>
        <FSelect
          name="month"
          label="Month"
          variant="standard"
          inputProps={{ "aria-label": "Without label" }}
        >
          {monthOfYear.map((option) => (
            <option key={option.name}>{option.name}</option>
          ))}
        </FSelect>
        <Autocomplete
          multiple
          id="users-tags"
          options={users}
          getOptionLabel={(option) => {
            return option.name;
          }}
          onChange={(e, value) => {
            setUserListCommendation(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="User"
              placeholder="User"
            />
          )}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          size="small"
          loading={isSubmitting || isLoading}
          sx={{
            boxShadow: "none",
            backgroundColor: "#4a148c",

            "&:hover": {
              backgroundColor: "#8f8996",
              color: "#4a148c",
            },
            color: "#ffff",
          }}
        >
          Create Commendation For This Month
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

export default UserTable;
