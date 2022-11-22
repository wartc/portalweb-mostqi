import { useState } from "react";
import { NextPageWithLayout } from "../_app";
import { withAuthorization } from "../../helpers/withAuthorization";
import AuthorizedLayout from "../../layouts/AuthorizedLayout";

import { useQuery } from "react-query";
import {
  getCurrencyInformation,
  getMeanMaxMinCurrencyInformation,
} from "../../api/services/currency";

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

  const currencyInfoQuery = useQuery({
    queryKey: ["currency", { start: filter.start, end: filter.end, page, MAX_PAGE_SIZE }],
    queryFn: () => getCurrencyInformation(filter.start, filter.end, page, MAX_PAGE_SIZE),
    keepPreviousData: true,
    staleTime: 60 * 1000,
  });

  const currencyMinMaxQuery = useQuery({
    queryKey: ["currencyMinMax", { start: filter.start, end: filter.end }],
    queryFn: () => getMeanMaxMinCurrencyInformation(filter.start, filter.end),
    staleTime: 60 * 1000,
  });

  if (currencyInfoQuery.isLoading || currencyMinMaxQuery.isLoading) return <LoadingPage />;

  if (currencyInfoQuery.isError || currencyMinMaxQuery.isError) return <UnexpectedError />;

  const hasPreviousPages = page > 1;
  const hasMorePages = !currencyInfoQuery.isPreviousData && currencyInfoQuery.data?.hasNextPage;
  const numberFormat = new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
  });

  return (
    <div className={tablePageStyles.container}>
      <h1 className={tablePageStyles.pageTitle}>Dashboard da cotação do dólar</h1>

      <span className={styles.currencyMinMaxInfo}>
        Mínima do dia: <span>{numberFormat.format(currencyMinMaxQuery.data?.min || 0)}</span> |
        Máxima do dia: <span>{numberFormat.format(currencyMinMaxQuery.data?.max || 0)}</span>
      </span>

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
        Exibindo {currencyInfoQuery.data!.data.length}{" "}
        {currencyInfoQuery.data!.data.length === 1 ? "registro" : "registros"}
      </span>

      <Table
        columns={[
          { title: "HORA", render: (cur) => new Date(cur.time).toLocaleString() },
          { title: "VALOR DO DÓLAR", render: (cur) => numberFormat.format(cur.dollarExchangeRate) },
        ]}
        data={currencyInfoQuery.data?.data!}
        emptyMessage="Sem registros por aqui... 😞"
      />

      <span className={tablePageStyles.statusLabels}>Página atual: {page}</span>

      <div
        className={tablePageStyles.paginationNavigationContainer}
        style={{ marginBottom: "1rem" }}
      >
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
