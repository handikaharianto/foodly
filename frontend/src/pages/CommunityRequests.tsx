import { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Group,
  Select,
  Text,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import MainContent from "../components/common/MainContent";
import { MantineReactTable } from "mantine-react-table";
import { MRT_ColumnDef, MRT_TablePagination } from "mantine-react-table";
import { useNavigate } from "react-router-dom";

import {
  CommunityApplication,
  CommunityApplicationStatus,
} from "../features/communityApplication/types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  communityApplicationState,
  getAllCommunityApplications,
} from "../features/communityApplication/CommunityApplicationSlice";
import { setDate } from "../utils/DateAndTime";

const useStyles = createStyles((theme) => ({
  statusSelect: {
    display: "flex",
    alignItems: "center",
    columnGap: theme.spacing.sm,
  },
}));

function CommunityRequests() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [filterByStatus, setFilterByStatus] =
    useState<CommunityApplicationStatus>(CommunityApplicationStatus.PENDING);

  const dispatch = useAppDispatch();
  const { totalPages, totalData, communityApplications, isLoading } =
    useAppSelector(communityApplicationState);

  const theme = useMantineTheme();
  const { classes } = useStyles();

  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, //customize the default page size
  });

  const columns = useMemo<MRT_ColumnDef<CommunityApplication>[]>(
    () => [
      {
        header: "Community name",
        Cell: ({ cell, row }) => (
          <Text weight={500} transform="capitalize">
            {row.original.name}
          </Text>
        ),
      },
      {
        header: "Type",
        Cell: ({ cell, row }) => (
          <Badge variant="dot" color="red">
            {row.original.type}
          </Badge>
        ),
      },
      {
        header: "Status",
        Cell: ({ cell, row }) => {
          const status = row.original.status;
          return (
            <Badge
              variant="outline"
              color={
                status === CommunityApplicationStatus.ACCEPTED
                  ? "green"
                  : status === CommunityApplicationStatus.REJECTED
                  ? "red"
                  : "blue"
              }
            >
              {status}
            </Badge>
          );
        },
      },
      {
        header: "Submitted by",
        Cell: ({ cell, row }) => (
          <Text transform="capitalize">
            {row.original.user.firstName} {row.original.user.lastName}
          </Text>
        ),
      },
      {
        header: "Created at",
        Cell: ({ cell, row }) => (
          <Text color="dimmed" transform="capitalize">
            {setDate(row.original.createdAt)}
          </Text>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    const status =
      filterByStatus === CommunityApplicationStatus.ALL
        ? undefined
        : filterByStatus;

    dispatch(
      getAllCommunityApplications({
        limit: pagination.pageSize,
        page: pagination.pageIndex + 1,
        searchInput: searchInput || "",
        status,
      })
    );
  }, [filterByStatus, searchInput, pagination]);

  return (
    <MainContent heading="Community Requests">
      <Group mb={theme.spacing.xl}>
        <Select
          label="Status:"
          data={[
            { value: CommunityApplicationStatus.ALL, label: "All" },
            { value: CommunityApplicationStatus.PENDING, label: "Pending" },
            { value: CommunityApplicationStatus.ACCEPTED, label: "Accepted" },
            {
              value: CommunityApplicationStatus.REJECTED,
              label: "Rejected",
            },
          ]}
          value={filterByStatus}
          onChange={(value) =>
            setFilterByStatus(value as CommunityApplicationStatus)
          }
          className={classes.statusSelect}
        />
      </Group>
      <MantineReactTable
        manualFiltering
        manualPagination
        enableRowNumbers
        rowNumberMode="original"
        columns={columns}
        data={communityApplications}
        // Table state
        initialState={{
          showGlobalFilter: true,
          density: "xl",
        }}
        state={{
          showSkeletons: isLoading,
          globalFilter: searchInput,
          pagination,
        }}
        // Table
        mantinePaperProps={{
          sx: (theme) => ({
            boxShadow: "none",
            borderRadius: theme.radius.xs,
          }),
        }}
        enableColumnActions={false}
        // Top toolbar
        mantineTopToolbarProps={{
          sx: (theme) => ({
            padding: theme.spacing.sm,
          }),
        }}
        // Table body row
        mantineTableBodyRowProps={({ row }) => ({
          onClick: () => navigate(`/community-requests/${row.original._id}`),
          sx: (theme) => ({
            cursor: "pointer",
          }),
        })}
        enableDensityToggle={false}
        enableColumnFilters={false}
        enableHiding={false}
        enableFullScreenToggle={false}
        // Global filtering (Search)
        positionGlobalFilter="left"
        mantineSearchTextInputProps={{
          placeholder: `Search community requests`,
          sx: { minWidth: "300px" },
          variant: "filled",
        }}
        onGlobalFilterChange={setSearchInput}
        // Bottom toolbar
        renderBottomToolbar={({ table }) => (
          <Group position="right" p={theme.spacing.sm}>
            <MRT_TablePagination table={table} />
          </Group>
        )}
        enableSorting={false}
        rowCount={totalData || 0}
        onPaginationChange={setPagination}
      />
    </MainContent>
  );
}

export default CommunityRequests;
