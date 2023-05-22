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
import { Link, useNavigate } from "react-router-dom";

import { FoodlyLogo } from "../utils/Logo";
import { isNotEmpty, useForm } from "@mantine/form";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginUser, userState } from "../features/user/UserSlice";

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
  signUpLink: {
    color: theme.colors.red[6],
  },
}));

function SignIn() {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(userState);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isNotEmpty("Email is required."),
      password: isNotEmpty("Password is required"),
    },
  });

  const submitForm = form.onSubmit(async (formData) => {
    const payload = await dispatch(loginUser(formData));
    if (payload.meta.requestStatus === "fulfilled") {
      navigate("/home");
    }
  });

  return (
    <section className={classes.section}>
      <Container size={480} className={classes.container}>
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
              Sign in to your account
            </Title>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="johndoe@gmail.com"
              disabled={isLoading}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="johndoe123"
              mt="md"
              disabled={isLoading}
              {...form.getInputProps("password")}
            />
            <Button
              type="submit"
              fullWidth
              mt="xl"
              color="red.6"
              loading={isLoading}
            >
              Sign in
            </Button>
            <Text fz="xs" mt="sm" align="center">
              Don't have an account?{" "}
              <Link to="/sign-up" className={classes.signUpLink}>
                Sign up
              </Link>
            </Text>
          </form>
        </Paper>
      </Container>
    </section>
  );
}

export default SignIn;
