import {
  ActionIcon,
  Button,
  Container,
  Group,
  NativeSelect,
  ScrollArea,
  Stack,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useForm, useFieldArray } from "react-hook-form";

import { IconRowInsertBottom, IconTrash } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createDonation } from "../../features/donation/donationSlice";
import { NewDonation } from "../../features/donation/types";
import { communityState } from "../../features/community/communitySlice";
import { userState } from "../../features/user/UserSlice";
import {
  NotificationVariant,
  showNotification,
} from "../../utils/notifications";
import { NOTIFICATION, socket } from "../../socket/socket";
import { UserRole } from "../../features/user/types";

type FormValues = {
  items: {
    name: string;
    quantity: number;
    unit: string;
  }[];
};

type DonationCreationProps = {
  closeDonateModal: () => void;
};

function DonationCreation({ closeDonateModal }: DonationCreationProps) {
  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      items: [{ name: "", quantity: 1, unit: "Kilogram(s)" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  console.log({ errors });
  console.log({ fields });

  const theme = useMantineTheme();

  const dispatch = useAppDispatch();
  const { community } = useAppSelector(communityState);
  const { loggedInUser } = useAppSelector(userState);

  const addItem = () => {
    append({ name: "", quantity: 1, unit: "Kilogram(s)" });
  };

  const removeItem = (index: number) => {
    remove(index);
  };

  const submitDonation = async (data: FormValues) => {
    trigger();

    socket.emit(NOTIFICATION, {
      content: `${loggedInUser?.firstName} ${loggedInUser?.lastName} has sent a donation request.`,
      sender: loggedInUser?._id,
      receiver: community?.user._id,
      target: UserRole.COMMUNITY,
    });

    await dispatch(
      createDonation({
        items: data,
        community: community?._id as string,
        donor: loggedInUser?._id as string,
      } as unknown as NewDonation)
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        closeDonateModal();
        showNotification({
          message: "Food donation request has successfully been submitted.",
          variant: NotificationVariant.SUCCESS,
        });
      }
    });
  };

  return (
    <Container>
      <form>
        <Group position="left">
          <Button
            leftIcon={<IconRowInsertBottom size="1rem" />}
            my="xl"
            color="red"
            variant="filled"
            onClick={addItem}
          >
            Add item
          </Button>
        </Group>
        <ScrollArea offsetScrollbars h={390}>
          <Stack>
            {fields.map((field, index) => {
              return (
                <Group key={field.id} align="flex-start">
                  <TextInput
                    withAsterisk
                    autoComplete="off"
                    error={errors.items?.[index]?.name?.message}
                    label="Item name"
                    placeholder="Potato"
                    {...register(`items.${index}.name`, {
                      required: "Item name is required.",
                    })}
                  />
                  <TextInput
                    withAsterisk
                    error={errors.items?.[index]?.quantity?.message}
                    type="number"
                    min="0"
                    label="Item quantity"
                    placeholder="10"
                    rightSection={
                      <NativeSelect
                        data={[
                          "Kilogram(s)",
                          "Litre(s)",
                          "Box(es)",
                          "Pack(s)",
                          "Piece(s)",
                        ]}
                        styles={{
                          input: {
                            fontWeight: 500,
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            width: 130,
                          },
                        }}
                        {...register(`items.${index}.unit`, {
                          required: true,
                        })}
                      />
                    }
                    rightSectionWidth={130}
                    {...register(`items.${index}.quantity` as const, {
                      required: "Item quantity is required.",
                      valueAsNumber: true,
                    })}
                  />
                  <ActionIcon onClick={() => removeItem(index)} mt="1.75rem">
                    <IconTrash size="1rem" color={theme.colors.red[7]} />
                  </ActionIcon>
                </Group>
              );
            })}
          </Stack>
        </ScrollArea>

        <Group position="apart" mt="xl">
          <Button color="red" variant="subtle" onClick={closeDonateModal}>
            Cancel
          </Button>
          <Button
            color="red"
            variant="filled"
            onClick={handleSubmit(submitDonation)}
          >
            Donate
          </Button>
        </Group>
      </form>
    </Container>
  );
}

export default DonationCreation;
