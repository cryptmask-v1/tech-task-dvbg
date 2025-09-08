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
import { updateUser } from "../../services/api";
import type { User } from "../../types";

interface EditUserModalProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onUserUpdated: (user: User) => void;
}

interface FormValues {
  name: string;
  username: string;
  email: string;
}

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .required("Username is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const EditUserModal = ({
  open,
  onClose,
  user,
  onUserUpdated,
}: EditUserModalProps) => {
  const [submitError, setSubmitError] = useState<string>("");

  const getInitialValues = (): FormValues => ({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>
  ) => {
    if (!user) return;

    setSubmitError("");

    try {
      const updatedUser = await updateUser(user.id, {
        name: values.name.trim(),
        username: values.username.trim(),
        email: values.email.trim(),
      });

      onUserUpdated(updatedUser);
      onClose();
    } catch (error: unknown) {
      console.error("Error updating user:", error);

      const errorMessage =
        error instanceof Error ? error.message : String(error);

      // Handle specific field errors
      if (
        errorMessage.includes("username") ||
        errorMessage.includes("Username")
      ) {
        setFieldError("username", "Username already exists");
      } else if (
        errorMessage.includes("email") ||
        errorMessage.includes("Email")
      ) {
        setFieldError("email", "Email already exists");
      } else {
        setSubmitError("Failed to update user. Please try again.");
      }
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
      <DialogTitle>Edit User</DialogTitle>

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
                name="name"
                label="Name"
                type="text"
                fullWidth
                variant="outlined"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submitForm();
                  }
                }}
              />

              <Field
                as={TextField}
                margin="dense"
                name="username"
                label="Username"
                type="text"
                fullWidth
                variant="outlined"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
              />

              <Field
                as={TextField}
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
                {isSubmitting ? "Updating..." : "Update"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditUserModal;
