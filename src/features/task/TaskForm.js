import React, {useEffect, useState} from "react";
import { Stack, TextField } from "@mui/material";
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import {  LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { createTask } from "./taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getUsersAllowed } from "../user/userSlice";
import { FSelect } from "../../components/form";
import FDate from "../../components/form/FDate";
import { departmentType } from "../member/departmentType";
import useAuth from "../../hooks/useAuth";
import Autocomplete from '@mui/material/Autocomplete';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

  
  const defaultValues = { 
    task_name:"",
    handler:"",
    description:"",
    // status:"",
    deadlineAt:null
  };

function TaskForm() {

    const { isLoading } = useSelector((state) => state.task);

    const methods = useForm({
        // resolver: yupResolver(yupSchema),
        defaultValues,
    });

    const { user } = useAuth();
    console.log("user",user)

    const [isDisabled, setIsDisabled] = useState(false);
    
    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;

    const dispatch = useDispatch();

    const { userList, allowedUsers, usersById } = useSelector((state) => state.user)
    console.log("usersById",usersById)
    console.log("allowedUsers",allowedUsers)

    const [filterName, setFilterName] = useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [page, setPage] = React.useState(0);

    useEffect(() => {
      dispatch(getUsers({ filterName, page: page, limit: rowsPerPage }));
    }, [dispatch, filterName, page, rowsPerPage]);
  
    useEffect(() => {
      reset({
        task_name: "",
        description: "",
        deadlineAt: null,
      });
    }, [userList]);


  const onSubmit = (tasks) => {
    console.log("tasks",tasks)
    dispatch(createTask({...tasks,handler:taskHandler, deadlineAt:taskDeadline})).then(() => reset());
};

const [selectedDate, setSelectedDate] = React.useState([]);

const handleDateChange = (date) => {
  setSelectedDate(date);
};

useEffect(() => {
  dispatch(getUsersAllowed());
}, [dispatch]);

// const users = allowedUsers.map((user) => usersById[userId]);
console.log("allowedUsers",allowedUsers)
//dispatch getUserAllowed -> select user -> map vào handler
// onChange (lấy value trong multiple) -> set new state -> add array  
const [taskHandler, setTaskHandler] = useState([]);
const [taskDeadline, setTaskDeadline] = useState("");

// const onChangeHandler = 

  return (
    // <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FTextField
          name="task_name"
          label="Task Name"
          placeholder="Enter a task name"
          variant="standard"
        />
        
        <Autocomplete
        multiple
        id="tags-standard"
        options={allowedUsers}
        getOptionLabel={(option) => {
          return option.name
        }}
        onChange={(e,value) => {setTaskHandler(value)}}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Handler"
            placeholder="Handler"
          />
        )}
        />


        <FSelect
          name="department"
          label="Department"
          variant="standard"
          inputProps={{ "aria-label": "Without label" }}
        >
          {departmentType.map((item) => (
            <option key={item.slug}>{item}
            </option>
          ))}
        </FSelect>
        
        <FTextField
          name="assigner"
          label="Assigner"
          placeholder={user?.name}
          variant="standard"
          disabled = {isDisabled}
          value={user?.name}
        >
        </FTextField>

        <FTextField
          name="description"
          label="Description"
          placeholder="Enter task's description"
          variant="standard"
          multiline
          rows={3}
        />
        
{/* // onChange cho DeadlineAt */}
        <TextField
                id="date"
                label="Deadline At"
                type="date"
                // defaultValue="2022-12-01"
                value={taskDeadline}
                onChange={(e) => {
                  setTaskDeadline(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
        {/* <DatePicker
          disableFuture
          label="Responsive"
          openTo="year"
          views={['year', 'month', 'day']}
          value={taskDeadline}
          onChange={(e,newValue) => {
            setTaskDeadline(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        /> */}

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
              Create Task
          </LoadingButton>
        </Stack>
      </FormProvider>
    // </Card>
  );
}

export default TaskForm;
