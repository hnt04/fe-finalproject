import React, { useCallback } from "react";
import { Box, Card, alpha, Stack, Avatar, Grid } from "@mui/material";
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { createPost } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";

const defaultValues = {
  content: "",
  image: "",
};

function PostFormModal() {
  const { user } = useAuth();
  const { isLoading } = useSelector((state) => state.post);

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (posts) => {
    dispatch(createPost(posts)).then(() => reset());
  };

  return (
    <Card
      sx={{
        p: 3,
        width: { xs: "90%", md: "85%" },
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Stack>
        <Avatar
          alt={user.name}
          src={user.avatarUrl}
          sx={{ width: { xs: 60, md: 128 }, height: { xs: 60, md: 128 } }}
        />
      </Stack>
      <Stack sx={{ marginLeft: "2%" }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack className="postForm" spacing={2}>
            <FTextField
              name="content"
              multiline
              fullWidth
              rows={4}
              placeholder="Share something with your colleague..."
              sx={{
                "& fieldset": {
                  borderWidth: `1px !important`,
                  borderColor: alpha("#919EAB", 1.5),
                  color: "#ffff !important",
                  borderRadius: "30px",
                },
              }}
            />
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "0",
              }}
            >
              <Box onClose={handleClose}>
                <FUploadImage
                  name="image"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  width="50%"
                />
              </Box>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <LoadingButton
                type="submit"
                variant="contained"
                size="small"
                color="success"
                loading={isSubmitting || isLoading}
                sx={{
                  width: "150px",
                  display: "flex",
                  alignItem: "center",
                  height: "37px",
                  background: "#66b096",
                  borderRadius: "50px",
                }}
              >
                Post
              </LoadingButton>
            </Box>
          </Stack>
        </FormProvider>
      </Stack>
    </Card>
  );
}

export default PostFormModal;
