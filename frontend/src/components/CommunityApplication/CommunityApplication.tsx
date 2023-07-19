import { Button, Stack, Center } from "@mantine/core";
import { isNotEmpty } from "@mantine/form";
import { useEffect } from "react";
import { IconBinaryTree2, IconReportSearch } from "@tabler/icons-react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  communityApplicationState,
  createCommunityApplication,
  getAllCommunityApplications,
} from "../../features/communityApplication/CommunityApplicationSlice";
import {
  CommunityApplicationStatus,
  NewCommunityApplication,
} from "../../features/communityApplication/types";
import MainContent from "../common/MainContent";
import EmptyState from "../common/EmptyState";
import LoaderState from "../common/LoaderState";
import CommunityApplicationDetailsForm from "./CommunityApplicationDetailsForm";
import {
  CommunityApplicationFormProvider,
  useCommunityApplicationForm,
} from "./community-application-context";
import CommunityApplicationAddressForm from "./CommunityApplicationAddressForm";
import {
  NotificationVariant,
  showNotification,
} from "../../utils/notifications";
import { NOTIFICATION, socket } from "../../socket/socket";
import { userState } from "../../features/user/UserSlice";
import { UserRole } from "../../features/user/types";

const CommunityApplication = () => {
  const { loggedInUser } = useAppSelector(userState);
  const { isLoading, communityApplications } = useAppSelector(
    communityApplicationState
  );

  const dispatch = useAppDispatch();
  const form = useCommunityApplicationForm({
    initialValues: {
      name: "",
      type: "",
      foodPreferences: [],
      description: "",
      address: {
        addressLine1: "",
        addressLine2: "",
        city: "",
        postalCode: "",
      },
      coordinate: {
        latitude: null,
        longitude: null,
      },
    },

    validate: {
      name: isNotEmpty("Community name is required."),
      type: isNotEmpty("Community type is required."),
      foodPreferences: isNotEmpty("Food preferences are required."),
      description: isNotEmpty("Community description is required."),
      address: {
        addressLine1: isNotEmpty("Community address is required."),
        city: isNotEmpty("City is required."),
        postalCode: isNotEmpty("Postal code is required."),
      },
      coordinate: {
        latitude: isNotEmpty(),
        longitude: isNotEmpty(),
      },
    },
  });

  const submitForm = async () => {
    const formValidation = form.validate();
    if (formValidation.hasErrors) {
      return;
    }

    const formData = form.values;

    try {
      socket.emit(NOTIFICATION, {
        content: `${loggedInUser?.firstName} ${loggedInUser?.lastName} just submitted a community application.`,
        sender: loggedInUser?._id,
        target: UserRole.ADMINISTRATOR,
      });

      const res = await dispatch(
        createCommunityApplication(formData as NewCommunityApplication)
      );

      if (res.meta.requestStatus === "fulfilled") {
        showNotification({
          message:
            "Community application form has successfully been submitted.",
          variant: NotificationVariant.SUCCESS,
        });
      }
    } catch (error) {
      // display error dialog here
      console.log(error);
    }
  };

  useEffect(() => {
    if (loggedInUser?.role === UserRole.PUBLIC) {
      dispatch(
        getAllCommunityApplications({
          status: CommunityApplicationStatus.PENDING,
        })
      );
    }
  }, [dispatch, loggedInUser?.role]);

  return (
    <MainContent heading={"Community Applications"}>
      {isLoading ? (
        <LoaderState />
      ) : loggedInUser?.role === UserRole.COMMUNITY ? (
        <EmptyState
          Icon={IconBinaryTree2}
          title={"Multi-community feature is coming soon."}
        />
      ) : communityApplications.length > 0 ? (
        <EmptyState
          Icon={IconReportSearch}
          title={"Your community application is currently being reviewed."}
        />
      ) : (
        <CommunityApplicationFormProvider form={form}>
          <form>
            <Stack spacing="xl">
              <CommunityApplicationDetailsForm />
              <CommunityApplicationAddressForm />
            </Stack>
            <Center>
              <Button type="button" color="red" mt="xl" onClick={submitForm}>
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
