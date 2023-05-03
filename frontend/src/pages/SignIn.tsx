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

import { FoodlyLogo } from "../utils/Logo";

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
          <div className={classes.logoWrapper}>
            <FoodlyLogo width={70} height={70} />
          </div>
          <Title align="center" size="h3" mb={32}>
            Sign in to your account
          </Title>
          <TextInput label="Email" placeholder="johndoe@gmail.com" required />
          <PasswordInput
            label="Password"
            placeholder="johndoe123"
            required
            mt="md"
          />
          <Button fullWidth mt="xl" color="red.6">
            Sign in
          </Button>
          <Text fz="xs" mt="sm" align="center">
            Don't have an account?{" "}
            <Link to="/sign-up" className={classes.signUpLink}>
              Sign up
            </Link>
          </Text>
        </Paper>
      </Container>
    </section>
  );
}

export default SignIn;
