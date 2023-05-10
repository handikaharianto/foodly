import { useEffect } from "react";
import { privateAxios } from "../api/axios";
import { useAppDispatch } from "../app/hooks";
import { testPage } from "../features/user/UserSlice";

function TestPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(testPage());
  }, [dispatch]);

  return <div>TestPage</div>;
}

export default TestPage;
