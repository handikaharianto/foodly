import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  createStyles,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";

import { FoodlyLogo } from "../utils/Logo";
import { registerUser, userState } from "../features/user/UserSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const useStyles = createStyles((theme) => ({
  section: {
    height: "100vh",
    backgroundColor: theme.colors.gray[0],
  },
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: "100%",
  },
  logoWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing.md,
  },
  twoColumnsWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    columnGap: "1rem",
  },
  signUpLink: {
    color: theme.colors.red[6],
  },
}));

function SignUp() {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(userState);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      firstName: isNotEmpty("First name is required."),
      lastName: isNotEmpty("Last name is required."),
      email: isEmail("Invalid email."),
      phoneNumber: (value) =>
        /^(01)[0-46-9]*[0-9]{7,8}$/.test(value)
          ? null
          : "Invalid phone number.",
      password: isNotEmpty("Password is required."),
      confirmPassword: (value, values) =>
        value.length === 0
          ? "Confirm password is required"
          : value !== values.password
          ? "Passwords do not match"
          : null,
    },
  });

  const submitForm = form.onSubmit(async (data) => {
    const { confirmPassword, ...formData } = data;

    const payload = await dispatch(registerUser(formData));
    if (payload.meta.requestStatus === "fulfilled") {
      form.reset();
    }
  });

  return (
    <section className={classes.section}>
      <Container size={550} className={classes.container}>
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          className={classes.paper}
        >
          <form onSubmit={submitForm}>
            <div className={classes.logoWrapper}>
              <FoodlyLogo width={70} height={70} />
            </div>
            <Title align="center" size="h3" mb={32}>
              Get started for free today
            </Title>
            <div className={classes.twoColumnsWrapper}>
              <TextInput
                withAsterisk
                label="First name"
                placeholder="John"
                mt="md"
                disabled={isLoading}
                {...form.getInputProps("firstName")}
              />
              <TextInput
                withAsterisk
                label="Last name"
                placeholder="Doe"
                mt="md"
                disabled={isLoading}
                {...form.getInputProps("lastName")}
              />
            </div>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="johndoe@gmail.com"
              mt="md"
              disabled={isLoading}
              {...form.getInputProps("email")}
            />
            <TextInput
              withAsterisk
              label="Phone number"
              placeholder="0123456789"
              mt="md"
              disabled={isLoading}
              {...form.getInputProps("phoneNumber")}
            />
            <div className={classes.twoColumnsWrapper}>
              <PasswordInput
                withAsterisk
                label="Password"
                placeholder="johndoe123"
                mt="md"
                disabled={isLoading}
                {...form.getInputProps("password")}
              />
              <PasswordInput
                withAsterisk
                label="Confirm Password"
                placeholder="johndoe123"
                mt="md"
                disabled={isLoading}
                {...form.getInputProps("confirmPassword")}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              mt="xl"
              color="red.6"
              loading={isLoading}
            >
              Sign up
            </Button>
            <Text fz="xs" mt="sm" align="center">
              Already have an account?{" "}
              <Link to="/sign-in" className={classes.signUpLink}>
                Sign in
              </Link>
            </Text>
          </form>
        </Paper>
      </Container>
    </section>
  );
}

export default SignUp;
