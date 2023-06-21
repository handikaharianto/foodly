import { createFormContext } from "@mantine/form";

type CommunityApplicationFormType = {
  name: string;
  type: string;
  typeOthers?: string;
  foodPreferences: string[];
  description: string;
  address: {
    addressLine1: string;
    addressLine2?: string;
    city: string;
    postalCode: string;
  };
  coordinate: {
    latitude: string;
    longitude: string;
  };
};

export const [
  CommunityApplicationFormProvider,
  useCommunityApplicationFormContext,
  useCommunityApplicationForm,
] = createFormContext<CommunityApplicationFormType>();
