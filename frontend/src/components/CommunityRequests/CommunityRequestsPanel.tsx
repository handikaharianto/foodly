import { useEffect } from "react";
import {
  ActionIcon,
  Badge,
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { IconDotsVertical, IconFilesOff } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import { getTimeFromNow } from "../../utils/DateAndTime";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  communityApplicationState,
  getAllCommunityApplications,
} from "../../features/communityApplication/CommunityApplicationSlice";
import { CommunityApplicationStatus } from "../../features/communityApplication/types";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";

type CommunityRequestsListProps = {
  activeTab: CommunityApplicationStatus;
  searchInput: string;
};

// const communityRequests = [
//   {
//     id: 1,
//     name: "ABC Community",
//     type: "ORPHANAGE",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa accusamus suscipit deserunt aliquam autem adipisci numquam est, iure sint corporis iusto nesciunt temporibus, minus laudantium magnam nisi eaque! Vero voluptatum debitis repellendus soluta porro esse vitae quaerat dolore iusto exercitationem, dolorem perspiciatis ex. Illo optio pariatur non, ullam sunt voluptatum.",
//     status: "PENDING",
//     createdAt: "2023-05-24T08:48:11.705+00:00",
//   },
//   {
//     id: 2,
//     name: "ABC Community",
//     type: "ORPHANAGE",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa accusamus suscipit deserunt aliquam autem adipisci numquam est, iure sint corporis iusto nesciunt temporibus, minus laudantium magnam nisi eaque! Vero voluptatum debitis repellendus soluta porro esse vitae quaerat dolore iusto exercitationem, dolorem perspiciatis ex. Illo optio pariatur non, ullam sunt voluptatum.",
//     status: "PENDING",
//     createdAt: "2023-05-24T08:48:11.705+00:00",
//   },
//   {
//     id: 3,
//     name: "ABC Communitysasdfasdfasdfsdfasdfsdfsd",
//     type: "ORPHANAGE",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa accusamus suscipit deserunt aliquam autem adipisci numquam est, iure sint corporis iusto nesciunt temporibus, minus laudantium magnam nisi eaque! Vero voluptatum debitis repellendus soluta porro esse vitae quaerat dolore iusto exercitationem, dolorem perspiciatis ex. Illo optio pariatur non, ullam sunt voluptatum.",
//     status: "PENDING",
//     createdAt: "2023-05-24T08:48:11.705+00:00",
//   },
//   {
//     id: 4,
//     name: "ABC Community",
//     type: "orphana",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa accusamus suscipit deserunt aliquam autem adipisci numquam est, iure sint corporis iusto nesciunt temporibus, minus laudantium magnam nisi eaque! Vero voluptatum debitis repellendus soluta porro esse vitae quaerat dolore iusto exercitationem, dolorem perspiciatis ex. Illo optio pariatur non, ullam sunt voluptatum.",
//     status: "PENDING",
//     createdAt: "2023-05-24T08:48:11.705+00:00",
//   },
// ];

const useStyles = createStyles((theme) => ({
  card: {
    transition: "all 0.2s",
    "&:hover": {
      boxShadow: theme.shadows.sm,
      scale: "1.01",
    },
  },
}));

function CommunityRequestsPanel({
  activeTab,
  searchInput,
}: CommunityRequestsListProps) {
  const { classes } = useStyles();
  const { isLoading, communityApplications } = useAppSelector(
    communityApplicationState
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getAllCommunityApplications({
        status: activeTab,
        searchInput,
        limit: 10,
      })
    );
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const title =
    activeTab === CommunityApplicationStatus.PENDING
      ? "All community applications have been reviewed."
      : activeTab === CommunityApplicationStatus.ACCEPTED
      ? "No community applications have been accepted."
      : activeTab === CommunityApplicationStatus.REJECTED
      ? "No community applications have been rejected."
      : "No community applications found.";

  if (communityApplications.length == 0) {
    return <EmptyState Icon={IconFilesOff} title={title} />;
  }

  return (
    <SimpleGrid
      cols={1}
      breakpoints={[
        { minWidth: "sm", cols: 2 },
        { minWidth: "lg", cols: 3 },
      ]}
      mt="xl"
    >
      {communityApplications.map((communityRequest) => (
        <Card
          key={communityRequest._id}
          withBorder
          padding="xl"
          radius="sm"
          to={`/community-requests/${communityRequest._id}`}
          component={Link}
          className={classes.card}
        >
          <Card.Section withBorder p="md">
            <Group noWrap align="center" position="apart">
              <Container p={0} m={0} miw="0%">
                <Title
                  truncate
                  transform="capitalize"
                  order={3}
                  align="left"
                  size="h5"
                >
                  {communityRequest.name}
                </Title>
                <Badge color="red" size="md" mt="xs">
                  {communityRequest.type}
                </Badge>
              </Container>
              <ActionIcon
                miw="0%"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <IconDotsVertical size="1.125rem" />
              </ActionIcon>
            </Group>
          </Card.Section>
          <Card.Section p="md">
            <Text lineClamp={3} color="gray.7" size="sm">
              {communityRequest.description}
            </Text>
            <Text align="right" size="xs" mt="md" color="dimmed">
              {getTimeFromNow(communityRequest.createdAt)}
            </Text>
          </Card.Section>
        </Card>
      ))}
    </SimpleGrid>
  );
}

export default CommunityRequestsPanel;
