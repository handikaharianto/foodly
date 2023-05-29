import { ReactNode } from "react";
import { Container, Title } from "@mantine/core";

type MainContentProps = {
  heading: string;
  children: ReactNode;
};

function MainContent({ heading, children }: MainContentProps) {
  return (
    <div>
      <Title order={2}>{heading}</Title>
      <Container fluid p={0} mt="2.5rem">
        {children}
      </Container>
    </div>
  );
}

export default MainContent;
