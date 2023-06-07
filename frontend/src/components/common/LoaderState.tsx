import { Center, Loader } from "@mantine/core";

function LoaderState() {
  return (
    <Center h="100%">
      <Loader variant="bars" color="red" />
    </Center>
  );
}

export default LoaderState;
