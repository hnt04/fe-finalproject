import React, { useState } from 'react';
import { FCheckbox, FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from '../hooks/useAuth';

import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { Alert, Container, Stack, Link, InputAdornment, IconButton, Typography } from '@mui/material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from '@mui/lab';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

const defaultValue = {
    email: "",
    password: "",
    remember: true,
}

function LoginPage() {
    const auth = useAuth();
    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValue,
    });

    const {
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = methods;

    const navigate = useNavigate();
    const location = useLocation();
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async(data) => {
        const from = location.state?.from?.pathname || "/";
        let { email, password } = data;

        try {
            await auth.login({ email, password}, () => {
                navigate(from, { replace: true });
            })
        } catch (error) {
            reset();
            console.log("error",error);
            setError("responseError", error)
        }
    }

  return (
    <Stack  sx={{ backgroundColor: "#000022"}}>
    <Container maxWidth="50vw" sx={{backgroundColor:"rgba(245, 248, 250, 0.918)", height:"680px", width:"25vw", paddingTop:"5%"}}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Typography component="h4"
            variant="h1"
            sx={{
              display: { xs: "none", md: "block" },
              textAlign: "center",
              cursor: "pointer",
              color: "#616161",
              marginBottom:"60px"}}>Sign In</Typography>
            <Stack spacing={3}>
                {!!errors.responseError && (
                    <Alert variant="filled" severity='error'>{errors.responseError.message}</Alert>
                )}
                <FTextField name="email" label="Email address" />

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
            </Stack>

            <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
            >
                <FCheckbox name="remember" label="Remember Me"></FCheckbox>
                <Link variant="subtitle2" sx={{color:"#616161"}} component={RouterLink} to="/register">Sign Up</Link> |
                <Link component={RouterLink} sx={{color:"#616161"}} variant="subtitle2" to="/">
                    Forgot Password?
                </Link>
            </Stack>
            <Stack sx={{marginTop:"30px", display:{ xs: "none", md: "flex" }, justifyContent:"center"}}>
            <LoadingButton
                fulWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
                >
                    Login
            </LoadingButton></Stack>
        </FormProvider>
    </Container>
    </Stack>
  );
}

export default LoginPage;
