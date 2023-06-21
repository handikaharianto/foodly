import { createFormContext } from "@mantine/form";

type CommunityApplicationFormType = {
  name: string;
  type: string;
  typeOthers?: string;
  foodPreferences: string[];
  description: string;
};

export const [
  CommunityApplicationFormProvider,
  useCommunityApplicationFormContext,
  useCommunityApplicationForm,
] = createFormContext<CommunityApplicationFormType>();
