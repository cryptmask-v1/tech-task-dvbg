import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { createPost } from "../../services/api";
import type { User, Post } from "../../types";

interface AddPostModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onPostAdded: (post: Post) => void;
}

interface FormValues {
  title: string;
}

// Validation Schema
const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be less than 200 characters")
    .required("Title is required"),
});

const AddPostModal = ({
  open,
  onClose,
  user,
  onPostAdded,
}: AddPostModalProps) => {
  const [submitError, setSubmitError] = useState<string>("");

  const initialValues: FormValues = {
    title: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    if (!user) return;
    
    setSubmitError("");
    
    try {
      const postData = {
        title: values.title.trim(),
        user_id: user.id,
      };

      const createdPost = await createPost(postData);
      onPostAdded(createdPost);
      resetForm();
      onClose();
    } catch (error: unknown) {
      console.error("Error creating post:", error);
      setSubmitError("Failed to create post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitError("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Add New Post for{" "}
        <Typography component="span" color="primary" fontWeight="bold">
          {user?.name}
        </Typography>
      </DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting, submitForm }) => (
          <Form>
            <DialogContent>
              {submitError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {submitError}
                </Alert>
              )}
              
              <Field
                as={TextField}
                autoFocus
                margin="dense"
                name="title"
                label="Post Title"
                type="text"
                fullWidth
                variant="outlined"
                placeholder="What's on your mind?"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submitForm();
                  }
                }}
              />
            </DialogContent>
            
            <DialogActions>
              <Button onClick={handleClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button 
                type="submit"
                variant="contained" 
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress size={20} /> : undefined}
              >
                {isSubmitting ? "Creating..." : "Create Post"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddPostModal;
