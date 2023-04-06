import React, { useState } from "react";
import { Box, Grid, Card, InputAdornment, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { updateUserProfile } from "./userSlice";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FormProvider, FTextField,  } from "../../components/form";

const UpdateUserSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
  .required("Please confirm your password")
  .oneOf([Yup.ref("password")], "Passwords must match"),
});

function PasswordChanging() {
  const { user } = useAuth();
  const isLoading = useSelector((state) => state.user.isLoading);

  const defaultValues = {
    password: user?.password || "",
    passwordConfirmation: ""
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const onSubmitPassword = (data) => {
    dispatch(updateUserProfile({ userId: user._id, ...data }));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitPassword)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
                paddingBottom:"30px",
                marginLeft:"10px"
              }}
            >
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
            </Box>

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || isLoading}
              >
                Save Changes
              </LoadingButton>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default PasswordChanging;