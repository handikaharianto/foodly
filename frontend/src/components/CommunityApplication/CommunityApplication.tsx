import { Button, Stack, Center } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";
import { useEffect } from "react";
import { IconReportSearch } from "@tabler/icons-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  communityApplicationState,
  getAllCommunityApplications,
} from "../../features/communityApplication/CommunityApplicationSlice";
import { CommunityApplicationStatus } from "../../features/communityApplication/types";
import MainContent from "../common/MainContent";
import EmptyState from "../common/EmptyState";
import LoaderState from "../common/LoaderState";
import CommunityDetailsForm from "./CommunityDetailsForm";
import {
  CommunityApplicationFormProvider,
  useCommunityApplicationForm,
} from "./community-application-context";
import CommunityAddressForm from "./CommunityAddressForm";

const CommunityApplication = () => {
  const { isLoading, communityApplications } = useAppSelector(
    communityApplicationState
  );

  const dispatch = useAppDispatch();
  const form = useCommunityApplicationForm({
    initialValues: {
      name: "",
      type: "",
      typeOthers: "",
      foodPreferences: [],
      description: "",
      address: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
      },
      coordinate: {
        latitude: "",
        longitude: "",
      },
    },

    validate: {
      name: isNotEmpty("Community name is required."),
      type: isNotEmpty("Community type is required"),
      typeOthers: (value, values) =>
        values.type !== "Others"
          ? null
          : value?.trim() === ""
          ? "Community type is required"
          : null,
      description: isNotEmpty("Community description is required."),
      address: {
        addressLine1: isNotEmpty("Community address is required."),
        city: isNotEmpty("City is required."),
        postalCode: isNotEmpty("Postal code is required."),
      },
    },
  });

  const submitForm = form.onSubmit(async (formData) => {
    console.log(formData);

    // if (formData.type !== "Others") {
    //   delete formData.typeOthers;
    // } else {
    //   formData = { ...formData, type: formData.typeOthers! };
    //   delete formData.typeOthers;
    // }

    // try {
    //   dispatch(createCommunityApplication(formData));
    // } catch (error) {
    //   // display error dialog here
    // }
  });

  useEffect(() => {
    dispatch(
      getAllCommunityApplications({
        status: CommunityApplicationStatus.PENDING,
      })
    );
  }, [dispatch]);

  return (
    <MainContent heading={"Community Applications"}>
      {isLoading ? (
        <LoaderState />
      ) : communityApplications.length > 0 ? (
        <EmptyState
          Icon={IconReportSearch}
          title={"Your community application is currently being reviewed."}
        />
      ) : (
        <CommunityApplicationFormProvider form={form}>
          <form onSubmit={submitForm}>
            <Stack spacing="xl">
              <CommunityDetailsForm />
              <CommunityAddressForm />
            </Stack>
            <Center>
              <Button type="submit" color="red" mt="xl">
                Submit
              </Button>
            </Center>
          </form>
        </CommunityApplicationFormProvider>
      )}
    </MainContent>
  );
};

export default CommunityApplication;
