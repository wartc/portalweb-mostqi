import { useState } from "react";
import { NextPageWithLayout } from "../_app";
import { withAuthorization } from "../../helpers/withAuthorization";
import AuthorizedLayout from "../../layouts/AuthorizedLayout";

import { useQuery } from "react-query";
import { getCurrencyInformation } from "../../api/services/currency";

import styles from "./Dashboard.module.scss";
import tablePageStyles from "../../styles/TablePageLayout.module.scss";
import inputStyles from "../../styles/Input.module.scss";
import Table from "../../components/Table";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import LoadingPage from "../../components/LoadingPage";
import UnexpectedError from "../../components/UnexpectedError";

const MAX_PAGE_SIZE = 10;

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({ start: "", end: "" });

  const { data, isLoading, isError, isPreviousData } = useQuery({
    queryKey: ["currency", { start: filter.start, end: filter.end, page, MAX_PAGE_SIZE }],
    queryFn: () => getCurrencyInformation(filter.start, filter.end, page, MAX_PAGE_SIZE),
    keepPreviousData: true,
    staleTime: 60 * 1000,
  });

  const hasPreviousPages = page > 1;
  const hasMorePages = !isPreviousData && data?.hasNextPage;

  if (isLoading) return <LoadingPage />;

  if (isError) return <UnexpectedError />;

  return (
    <div className={tablePageStyles.container}>
      <h1 className={tablePageStyles.pageTitle}>Dashboard da cotação do dólar</h1>

      <div className={styles.searchContainer}>
        <span>Mostrar registros de</span>{" "}
        <div className={inputStyles.inputContainer}>
          <input
            className={inputStyles.input}
            type="datetime-local"
            value={filter.start}
            onChange={(e) => {
              setFilter({ ...filter, start: e.target.value });
              setPage(1);
            }}
            max={filter.end}
          />
        </div>
        <span>até</span>{" "}
        <div className={inputStyles.inputContainer}>
          <input
            className={inputStyles.input}
            type="datetime-local"
            value={filter.end}
            onChange={(e) => {
              setFilter({ ...filter, end: e.target.value });
              setPage(1);
            }}
            min={filter.start}
          />
        </div>
      </div>

      <span className={tablePageStyles.statusLabels}>
        Exibindo {data!.data.length} {data!.data.length === 1 ? "registro" : "registros"}
      </span>

      <Table
        columns={[
          { title: "HORA", render: (cur) => new Date(cur.time).toLocaleString() },
          { key: "dollarExchangeRate", title: "VALOR DO DÓLAR" },
        ]}
        data={data?.data!}
        emptyMessage="Sem registros por aqui... 😞"
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

const DashboardWithAuthorization: NextPageWithLayout = withAuthorization(Dashboard, "CLIENT");

DashboardWithAuthorization.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default DashboardWithAuthorization;
