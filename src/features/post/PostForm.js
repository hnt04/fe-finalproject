import React, { useCallback } from "react";
import { Box, Card, alpha, Stack,Button, Modal, Container, Grid } from "@mui/material";
import { FormProvider, FTextField, FUploadImage } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { createPost } from "./postSlice";
import { useDispatch, useSelector } from "react-redux";
import ClearIcon from '@mui/icons-material/Clear';

const yupSchema = Yup.object().shape({
    content: Yup.string().required("Content is required"),
  });
  
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

    const handleDrop = useCallback((acceptedFiles) => {
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
    console.log("posts post",posts)
    dispatch(createPost(posts)).then(() => reset());
};

  return (
    <Card sx={{ p: 3 }}>
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
                color:"#ffff !important" 
              },
            }}
          />
          <Grid sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop:"0"}}>
          <Button sx={{width:"150px", marginRight:"10px"}} onClick={handleOpen} variant="contained" color="success">Add Image
            <Modal sx={{width:"700px", marginTop:"500px",marginLeft:"1000px"}} open={open} >
              <Box onClose={handleClose}>
                <FUploadImage
                  name="image"
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                />
              </Box>
            </Modal>
          </Button>
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop:"0"
            }}
          > */}
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              color="success"
              loading={isSubmitting}
              sx={{width:"150px", height:"37px"}}
            >
              Post
            </LoadingButton>
          {/* </Box> */}
          </Grid>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default PostForm;
