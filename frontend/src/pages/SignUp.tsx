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
          <div className={classes.logoWrapper}>
            <FoodlyLogo width={70} height={70} />
          </div>
          <Title align="center" size="h3" mb={32}>
            Get started for free today
          </Title>
          <div className={classes.twoColumnsWrapper}>
            <TextInput label="First name" placeholder="John" required mt="md" />
            <TextInput label="Last name" placeholder="Doe" required mt="md" />
          </div>
          <TextInput
            label="Email"
            placeholder="johndoe@gmail.com"
            required
            mt="md"
          />
          <div className={classes.twoColumnsWrapper}>
            <PasswordInput
              label="Password"
              placeholder="johndoe123"
              required
              mt="md"
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="johndoe123"
              required
              mt="md"
            />
          </div>
          <Button fullWidth mt="xl" color="red.6">
            Sign up
          </Button>
          <Text fz="xs" mt="sm" align="center">
            Already have an account?{" "}
            <Link to="/sign-in" className={classes.signUpLink}>
              Sign in
            </Link>
          </Text>
        </Paper>
      </Container>
    </section>
  );
}

export default SignUp;
