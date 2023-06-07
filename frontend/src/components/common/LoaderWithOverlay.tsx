import { LoadingOverlay } from "@mantine/core";

const LoaderWithOverlay = () => {
  return (
    <LoadingOverlay
      visible
      overlayBlur={2}
      zIndex={1001}
      loaderProps={{ color: "red.7", variant: "bars" }}
    />
  );
};

export default LoaderWithOverlay;
