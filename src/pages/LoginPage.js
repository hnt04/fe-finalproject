import React, { useState } from "react";
import { FCheckbox, FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";

import { useNavigate, useLocation } from "react-router-dom";
import {
  Alert,
  Container,
  Stack,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValue = {
  email: "",
  password: "",
  remember: true,
};

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

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      console.log("error", error);
      setError("responseError", error);
    }
  };

  return (
    // <Stack  sx={{ backgroundColor: "#ece4f2" }}>
    <Container
      maxWidth="xs"
      sx={{ backgroundColor: "rgba(245, 248, 250, 0.918)", height: "72vh" }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography
          component="h4"
          variant="h1"
          sx={{
            display: { xs: "none", md: "block" },
            textAlign: "center",
            cursor: "pointer",
            color: "#616161",
            paddingTop: "8vh",
            marginBottom: "4vh",
          }}
        >
          Log In
        </Typography>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert variant="filled" severity="error">
              {errors.responseError.message}
            </Alert>
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
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></FTextField>
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <FCheckbox name="remember" label="Remember Me"></FCheckbox>
        </Stack>
        <LoadingButton
          fulWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{width:"17vw"}}
        >
          Login
        </LoadingButton>
      </FormProvider>
    </Container>
    // </Stack>
  );
}

export default LoginPage;
