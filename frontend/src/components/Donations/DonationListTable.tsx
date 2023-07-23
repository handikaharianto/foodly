import { useMemo } from "react";
import { Stack, Text, Title } from "@mantine/core";
import { useAppSelector } from "../../app/hooks";
import { donationState } from "../../features/donation/donationSlice";
import { MRT_ColumnDef, MantineReactTable } from "mantine-react-table";
import { DonationItem } from "../../features/donation/types";

function DonationListTable() {
  const { donation, isLoading } = useAppSelector(donationState);

  const columns = useMemo<MRT_ColumnDef<DonationItem>[]>(
    () => [
      {
        header: "Item name",
        Cell: ({ cell, row }) => (
          <Text weight={500} transform="capitalize">
            {row.original.name}
          </Text>
        ),
      },
      {
        header: "Quantity",
        Cell: ({ cell, row }) => (
          <Text weight={500} transform="capitalize">
            {row.original.quantity}
          </Text>
        ),
      },
      {
        header: "Unit",
        Cell: ({ cell, row }) => <Text weight={500}>{row.original.unit}</Text>,
      },
    ],
    []
  );

  if (isLoading) return;

  return (
    <Stack>
      <Title order={4} size="h5" weight={600}>
        Donated items
      </Title>
      <MantineReactTable
        manualFiltering
        enableRowNumbers
        enableTopToolbar={false}
        enableBottomToolbar={false}
        enableGlobalFilter={false}
        rowNumberMode="original"
        columns={columns}
        data={donation?.items ? donation.items : []}
        // Table state
        initialState={{
          density: "md",
        }}
        state={{
          showSkeletons: isLoading,
        }}
        // Table
        mantinePaperProps={{
          sx: (theme) => ({
            boxShadow: "none",
            borderRadius: theme.radius.xs,
          }),
        }}
        enableColumnActions={false}
        enableDensityToggle={false}
        enableColumnFilters={false}
        enableHiding={false}
        enableFullScreenToggle={false}
        enableSorting={false}
      />
    </Stack>
  );
}

export default DonationListTable;
