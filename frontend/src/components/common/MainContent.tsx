import { ReactNode } from "react";
import { Container, Title, createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  outerContainer: {
    display: "flex",
    flexDirection: "column",
  },
  innerContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
}));

type MainContentProps = {
  heading: string;
  children: ReactNode;
};

function MainContent({ heading, children }: MainContentProps) {
  const { classes } = useStyles();

  return (
    <Container fluid h={"100%"} className={classes.outerContainer}>
      <Title order={2}>{heading}</Title>
      <Container
        fluid
        p={0}
        mt="2.5rem"
        mx={"0"}
        className={classes.innerContainer}
      >
        {children}
      </Container>
    </Container>
  );
}

export default MainContent;
