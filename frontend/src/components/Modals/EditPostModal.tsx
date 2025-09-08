import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { updatePost } from "../../services/api";
import type { Post } from "../../types";

interface EditPostModalProps {
  open: boolean;
  onClose: () => void;
  post: Post | null;
  onPostUpdated: (post: Post) => void;
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

const EditPostModal = ({
  open,
  onClose,
  post,
  onPostUpdated,
}: EditPostModalProps) => {
  const [submitError, setSubmitError] = useState<string>("");

  const getInitialValues = (): FormValues => ({
    title: post?.title || "",
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    if (!post) return;

    setSubmitError("");

    try {
      const updatedPost = await updatePost(post.id, {
        title: values.title.trim(),
      });

      onPostUpdated(updatedPost);
      onClose();
    } catch (error: unknown) {
      console.error("Error updating post:", error);
      setSubmitError("Failed to update post. Please try again.");
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
      <DialogTitle>Edit Post</DialogTitle>

      <Formik
        initialValues={getInitialValues()}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          submitForm,
        }) => (
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
                startIcon={
                  isSubmitting ? <CircularProgress size={20} /> : undefined
                }
              >
                {isSubmitting ? "Updating..." : "Update Post"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditPostModal;
