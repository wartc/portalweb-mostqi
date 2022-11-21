import { NextPageWithLayout } from "../../_app";
import { withAuthorization } from "../../../helpers/withAuthorization";
import AuthorizedLayout from "../../../layouts/AuthorizedLayout";

import { useQuery } from "react-query";
import { getClients, searchClientsByNameOrCreator } from "../../../api/services/clients";

import styles from "./ClientHistory.module.scss";
import UnexpectedError from "../../../components/UnexpectedError";
import Loading from "../../../components/Loading";
import { useState } from "react";

const MAX_PAGE_SIZE = 10;

const ClientHistory = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({ searchByClient: true, name: "" });
  const { data, isLoading, isError, isPreviousData } = useQuery({
    queryKey: ["users", { search, page }],
    queryFn: () =>
      !search.name
        ? getClients(page, MAX_PAGE_SIZE)
        : searchClientsByNameOrCreator(search.name, search.searchByClient, page, MAX_PAGE_SIZE),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading)
    return (
      <div className={styles.loadingContainer}>
        <Loading visible={true} />
      </div>
    );

  if (isError) return <UnexpectedError />;

  const hasPreviousPages = page > 1;
  const hasMorePages = !isPreviousData && data?.hasNextPage;

  return (
    <div>
      {data?.data.map((user, i) => (
        <h3 key={i}>
          {user.name}, {user.createdBy!.name}
        </h3>
      ))}
    </div>
  );
};

const ClientHistoryWithAuthorization: NextPageWithLayout = withAuthorization(
  ClientHistory,
  "CONTRIBUTOR"
);

ClientHistoryWithAuthorization.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ClientHistoryWithAuthorization;
