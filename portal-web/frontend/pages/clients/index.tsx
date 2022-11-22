import { NextPageWithLayout } from "../_app";
import { withAuthorization } from "../../helpers/withAuthorization";
import AuthorizedLayout from "../../layouts/AuthorizedLayout";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import { useQuery } from "react-query";
import { getClients, searchClientsByNameOrCreator } from "../../api/services/clients";

import styles from "../../styles/TablePageLayout.module.scss";
import inputStyles from "../../styles/Input.module.scss";
import Table from "../../components/Table";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import UnexpectedError from "../../components/UnexpectedError";
import LoadingPage from "../../components/LoadingPage";

const MAX_PAGE_SIZE = 10;

const Clients = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 250);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isPreviousData } = useQuery({
    queryKey: ["users", { value, page }],
    queryFn: () =>
      !search
        ? getClients(page, MAX_PAGE_SIZE)
        : searchClientsByNameOrCreator(value, true, page, MAX_PAGE_SIZE),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <LoadingPage />;

  if (isError) return <UnexpectedError />;

  const hasPreviousPages = page > 1;
  const hasMorePages = !isPreviousData && data?.hasNextPage;

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Clientes</h1>
      <input
        className={inputStyles.input}
        type="text"
        placeholder="Buscar cliente por nome"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <span className={styles.statusLabels}>
        Exibindo {data!.data.length} {data!.data.length === 1 ? "cliente" : "clientes"}
      </span>
      <Table
        columns={[
          { key: "name", title: "NOME" },
          { key: "email", title: "EMAIL" },
          { key: "clientDetails.rg", title: "RG" },
        ]}
        data={data?.data!}
        onRowClick={(user) => {
          router.push(`/clients/${user.id}`);
        }}
        emptyMessage="Sem clientes por aqui... 😞"
      />
      <span className={styles.statusLabels}>Página atual: {page}</span>
      <div className={styles.paginationNavigationContainer}>
        <FaRegArrowAltCircleLeft
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          className={`${styles.paginationArrow} ${!hasPreviousPages ? styles.disabled : ""}`}
          size="2rem"
        />
        <FaRegArrowAltCircleRight
          onClick={() => {
            if (hasMorePages) {
              setPage((old) => old + 1);
            }
          }}
          className={`${styles.paginationArrow} ${!hasMorePages ? styles.disabled : ""}`}
          size="2rem"
        />
      </div>
    </div>
  );
};

const ClientsWithAuthorization: NextPageWithLayout = withAuthorization(Clients, "CONTRIBUTOR");

ClientsWithAuthorization.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ClientsWithAuthorization;
