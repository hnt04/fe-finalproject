import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Container, Stack, Link, InputAdornment, Typography ,IconButton } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from '@mui/lab';

const RegisterSchema = Yup.object().shape({
    employeeId: Yup.string().required("Employee ID is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    department: Yup.string().required("Department is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string().required("Password is required"),
    passwordConfirmation: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

const defaultValue = {
    employeeId:"",
    name: "",
    email: "",
    department:"",
    role:"",
    password: "",
    passwordConfirmation: "",
}

function RegisterPage() {
    const auth = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    
    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValue,
    });

    const {
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = methods;

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { employeeId, department, role, name, email, password } = data;
        console.log("submit",name);
        try {
            await auth.register({ employeeId, department, role, name, email, password  }, () => {
                navigate("/", { replace: true });
            })
        } catch (error) {
            reset();
            setError("responseError", error)
        }
    }

  return (
    <Stack  sx={{ backgroundColor: "##ece4f2"}}>
    <Container maxWidth="50vw" sx={{backgroundColor:"rgba(245, 248, 250, 0.918)", height:"960px", width:"25vw", paddingTop:"5%"}}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography component="h4"
            variant="h1"
            sx={{
              display: { xs: "none", md: "block" },
              textAlign: "center",
              cursor: "pointer",
              color: "#616161",
              marginBottom:"40px"}}>Sign Up</Typography>
            <Stack spacing={3}>
                {!!errors.responseError && (
                    <Alert severity='error'>{errors.responseError.message}</Alert>
                )}
                {/* <Alert variant="outlined" severity='info'>Are you have an account?{" "}
                    <Link variant="subtitle2" component={RouterLink} to="/login">Sign in
                    </Link>
                </Alert> */}
                <FTextField name="employeeId" label="Employee's ID" />
                <FTextField name="name" label="Employee's Name" />
                <FTextField name="email" label="Email address" />
                <FTextField name="department" label="Department" />
                <FTextField name="role" label="Role" />


                <FTextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end">
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}>
                </FTextField>

                <FTextField
                    name="passwordConfirmation"
                    label="Password Confirmation"
                    type={showPasswordConfirmation ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                    edge="end">
                                        {showPasswordConfirmation ? ( <VisibilityIcon /> ) : ( <VisibilityOffIcon /> )}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}>
                </FTextField>
            
                <LoadingButton
                    fulWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                    >
                        Register
                </LoadingButton>
            </Stack>
        </FormProvider>
    </Container>
    </Stack>
  );
}

export default RegisterPage;
