import { Pagination, SimpleGrid } from "@mantine/core";
import MainContent from "../components/common/MainContent";
import {
  communityState,
  getAllCommunities,
} from "../features/community/communitySlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import LoaderState from "../components/common/LoaderState";
import CommunityCard from "../components/Communities/CommunityCard";
import EmptyState from "../components/common/EmptyState";
import { IconBuildingCommunity, IconHeartHandshake } from "@tabler/icons-react";

function Communities() {
  const [currentPage, setCurrentPage] = useState(1);

  const { isLoading, communityList, totalPages } =
    useAppSelector(communityState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCommunities({ limit: 9, page: currentPage }));
  }, [currentPage]);

  return (
    <MainContent heading="Browse Communities">
      {isLoading ? (
        <LoaderState />
      ) : communityList.length < 1 ? (
        <EmptyState
          Icon={IconBuildingCommunity}
          title="No communities found."
        />
      ) : (
        <SimpleGrid
          cols={1}
          breakpoints={[
            { minWidth: "sm", cols: 2 },
            { minWidth: "lg", cols: 3 },
          ]}
          mt="xl"
        >
          {communityList.map((community) => (
            <CommunityCard key={community.name} {...community} />
          ))}
        </SimpleGrid>
      )}
      {communityList.length > 0 && (
        <Pagination
          total={totalPages || 1}
          firstIcon={IconHeartHandshake}
          value={currentPage}
          onChange={setCurrentPage}
          color="red"
          position="right"
          mt="auto"
        />
      )}
    </MainContent>
  );
}

export default Communities;
