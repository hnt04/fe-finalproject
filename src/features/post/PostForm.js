import React, { useCallback } from "react";
import {
  Box,
  Card,
  alpha,
  Stack,
  Button,
  Modal,
  Container,
  Grid,
} from "@mui/material";
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { createPost } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";

const defaultValues = {
  content: "",
  image: "",
};

function PostForm() {
  const { isLoading } = useSelector((state) => state.post);

  const methods = useForm({
    // resolver: yupResolver(yupSchema),
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
    console.log("posts post", posts);
    dispatch(createPost(posts)).then(() => reset());
  };

  return (
    <Card sx={{ p: 3, width: "60vw", backgroundColor: "#ebebeb" }}>
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
                borderColor: alpha("#919EAB", 0.32),
                color: "#ffff !important",
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
                // maxSize={3145728}
                onDrop={handleDrop}
              />
            </Box>
          </Grid>
          <Box sx={{display:"flex", justifyContent:"center"}}>
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
                background: "#4a148c",
              }}
            >
              Post
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostForm;
