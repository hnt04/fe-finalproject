import React, {useEffect, useState} from "react";
import { Stack, TextField } from "@mui/material";
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createTask } from "./taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../user/userSlice";
import { FSelect } from "../../components/form";
import FDate from "../../components/form/FDate";
import { departmentType } from "../member/departmentType";
import useAuth from "../../hooks/useAuth";
import DateFnsUtils from '@date-io/date-fns';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';


const yupSchema = Yup.object().shape({
    task_name: Yup.string().required("Task Name is required"),
    handler: Yup.string().required("Handler is required"),
    // assigner:Yup.string().required("Assigner is required"),
    description:Yup.string().required("Description is required"),
    deadlineAt: Yup.string().required("Deadline is required"),
  });
  
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
        resolver: yupResolver(yupSchema),
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

    const { userList } = useSelector((state) => state.user)

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
        handler: userList[0],
        deadlineAt: null,
      });
    }, [userList]);


  const onSubmit = (tasks) => {
    console.log("tasks",tasks)
    dispatch(createTask(tasks)).then(() => reset());
};

// const props = { placeholder: 'Please Select Deadline Date' };
// const show = () => {
//   setOpenPicker(true);
// };
// const onClose = () => {
//   setOpenPicker(false);
// };

const [selectedDate, setSelectedDate] = React.useState([null, null]);

const handleDateChange = (date) => {
  setSelectedDate(date);
};


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
        
        <FTextField
          name="handler"
          label="Handler"
          placeholder="Enter handler"
          variant="standard"
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
          placeholder={user.name}
          variant="standard"
          disabled = {isDisabled}
          value={user.name}
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

        <form  noValidate>
              <TextField
                id="date"
                label="Deadline At"
                type="date"
                defaultValue="2022-12-01"
                InputLabelProps={{
                  shrink: true,
                }}
              />
        </form>

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
