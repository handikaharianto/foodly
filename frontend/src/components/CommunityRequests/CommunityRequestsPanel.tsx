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
import { IconDotsVertical } from "@tabler/icons-react";
import { Link } from "react-router-dom";

import { CommunityRequestTabsType } from "../../pages/CommunityRequests";
import { getTimeFromNow } from "../../utils/DateAndTime";

type CommunityRequestsListProps = {
  activeTab: CommunityRequestTabsType;
};

const communityRequests = [
  {
    id: 1,
    name: "ABC Community",
    type: "ORPHANAGE",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa accusamus suscipit deserunt aliquam autem adipisci numquam est, iure sint corporis iusto nesciunt temporibus, minus laudantium magnam nisi eaque! Vero voluptatum debitis repellendus soluta porro esse vitae quaerat dolore iusto exercitationem, dolorem perspiciatis ex. Illo optio pariatur non, ullam sunt voluptatum.",
    status: "PENDING",
    createdAt: "2023-05-24T08:48:11.705+00:00",
  },
  {
    id: 2,
    name: "ABC Community",
    type: "ORPHANAGE",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa accusamus suscipit deserunt aliquam autem adipisci numquam est, iure sint corporis iusto nesciunt temporibus, minus laudantium magnam nisi eaque! Vero voluptatum debitis repellendus soluta porro esse vitae quaerat dolore iusto exercitationem, dolorem perspiciatis ex. Illo optio pariatur non, ullam sunt voluptatum.",
    status: "PENDING",
    createdAt: "2023-05-24T08:48:11.705+00:00",
  },
  {
    id: 3,
    name: "ABC Communitysasdfasdfasdfsdfasdfsdfsd",
    type: "ORPHANAGE",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa accusamus suscipit deserunt aliquam autem adipisci numquam est, iure sint corporis iusto nesciunt temporibus, minus laudantium magnam nisi eaque! Vero voluptatum debitis repellendus soluta porro esse vitae quaerat dolore iusto exercitationem, dolorem perspiciatis ex. Illo optio pariatur non, ullam sunt voluptatum.",
    status: "PENDING",
    createdAt: "2023-05-24T08:48:11.705+00:00",
  },
  {
    id: 4,
    name: "ABC Community",
    type: "orphana",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa accusamus suscipit deserunt aliquam autem adipisci numquam est, iure sint corporis iusto nesciunt temporibus, minus laudantium magnam nisi eaque! Vero voluptatum debitis repellendus soluta porro esse vitae quaerat dolore iusto exercitationem, dolorem perspiciatis ex. Illo optio pariatur non, ullam sunt voluptatum.",
    status: "PENDING",
    createdAt: "2023-05-24T08:48:11.705+00:00",
  },
];

const useStyles = createStyles((theme) => ({
  card: {
    transition: "all 0.2s",
    "&:hover": {
      boxShadow: theme.shadows.sm,
      scale: "1.01",
    },
  },
}));

function CommunityRequestsPanel({ activeTab }: CommunityRequestsListProps) {
  const { classes } = useStyles();

  useEffect(() => {
    // fetch data based on active tab
  }, []);

  return (
    <SimpleGrid
      cols={1}
      breakpoints={[
        { minWidth: "sm", cols: 2 },
        { minWidth: "lg", cols: 3 },
      ]}
      mt="xl"
    >
      {communityRequests.map((communityRequest) => (
        <Card
          key={communityRequest.id}
          withBorder
          padding="xl"
          radius="sm"
          to={`/community-requests/${communityRequest.id}`}
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
