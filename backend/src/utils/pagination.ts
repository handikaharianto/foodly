import { Model } from "mongoose";

const setPagination = async <T>(
  dbModel: Model<T>,
  limit: number,
  page: number
): Promise<{
  currentPage: number;
  totalPages: number;
  totalData: number;
}> => {
  const totalData = await dbModel.countDocuments();

  const currentPage = totalData > limit ? page : 1;
  const totalPages = totalData / limit > 1 ? Math.ceil(totalData / limit) : 1;

  return {
    currentPage,
    totalPages,
    totalData,
  };
};

export default setPagination;
