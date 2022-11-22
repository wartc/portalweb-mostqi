import { useState } from "react";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../_app";
import { withAuthorization } from "../../../helpers/withAuthorization";
import AuthorizedLayout from "../../../layouts/AuthorizedLayout";

import { useQuery } from "react-query";
import { getClients, searchClientsByNameOrCreator } from "../../../api/services/clients";

import styles from "./ClientHistory.module.scss";
import tablePageStyles from "../../../styles/TablePageLayout.module.scss";
import inputStyles from "../../../styles/Input.module.scss";

import UnexpectedError from "../../../components/UnexpectedError";
import Table from "../../../components/Table";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import LoadingPage from "../../../components/LoadingPage";

const MAX_PAGE_SIZE = 10;

const ClientHistory = () => {
  const router = useRouter();
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

  if (isLoading) return <LoadingPage />;

  if (isError) return <UnexpectedError />;

  const hasPreviousPages = page > 1;
  const hasMorePages = !isPreviousData && data?.hasNextPage;

  return (
    <div className={tablePageStyles.container}>
      <h1 className={tablePageStyles.pageTitle}>Histórico de clientes</h1>

      <div className={styles.searchContainer}>
        <div className={inputStyles.inputContainer}>
          <label className={inputStyles.inputLabel} htmlFor="searchBy">
            Buscar por
          </label>
          <select
            id="searchBy"
            className={inputStyles.input}
            onChange={(e) => {
              setSearch({ ...search, searchByClient: e.target.value === "client" });
            }}
          >
            <option value="client">Nome do cliente</option>
            <option value="contributor">Nome do colaborador</option>
          </select>
        </div>

        <div className={inputStyles.inputContainer}>
          <input
            className={inputStyles.input}
            type="text"
            placeholder="Buscar cliente"
            value={search.name}
            onChange={(e) =>
              setSearch({ searchByClient: search.searchByClient, name: e.target.value })
            }
          />
        </div>
      </div>

      <span className={tablePageStyles.statusLabels}>
        Exibindo {data!.data.length} {data!.data.length === 1 ? "cliente" : "clientes"}
      </span>
      <Table
        columns={[
          { key: "name", title: "NOME" },
          { key: "email", title: "EMAIL" },
          { key: "clientDetails.rg", title: "RG" },
          { key: "createdBy.name", title: "CADASTRADO POR" },
          {
            title: "DATA DE CADASTRO",
            render: ({ createdAt }) =>
              `${new Date(createdAt).toLocaleDateString()} às ${new Date(
                createdAt
              ).toLocaleTimeString()}`,
          },
        ]}
        data={data?.data!}
        onRowClick={(user) => {
          router.push(`/clients/${user.id}`);
        }}
        emptyMessage="Sem clientes por aqui... 😞"
      />
      <span className={tablePageStyles.statusLabels}>Página atual: {page}</span>
      <div className={tablePageStyles.paginationNavigationContainer}>
        <FaRegArrowAltCircleLeft
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          className={`${tablePageStyles.paginationArrow} ${
            !hasPreviousPages ? tablePageStyles.disabled : ""
          }`}
          size="2rem"
        />
        <FaRegArrowAltCircleRight
          onClick={() => {
            if (hasMorePages) {
              setPage((old) => old + 1);
            }
          }}
          className={`${tablePageStyles.paginationArrow} ${
            !hasMorePages ? tablePageStyles.disabled : ""
          }`}
          size="2rem"
        />
      </div>
    </div>
  );
};

const ClientHistoryWithAuthorization: NextPageWithLayout = withAuthorization(
  ClientHistory,
  "CONTRIBUTOR"
);

ClientHistoryWithAuthorization.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ClientHistoryWithAuthorization;
