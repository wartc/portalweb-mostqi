import { useState } from "react";
import { NextPageWithLayout } from "../_app";
import { withAuthorization } from "../../helpers/withAuthorization";
import AuthorizedLayout from "../../layouts/AuthorizedLayout";

import styles from "./Dashboard.module.scss";
import tablePageStyles from "../../styles/TablePageLayout.module.scss";
import inputStyles from "../../styles/Input.module.scss";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";

const Dashboard = () => {
  const [page, setPage] = useState(1);

  const hasPreviousPages = page > 1;
  const hasMorePages = false; // !isPreviousData && data?.hasNextPage;

  return (
    <div className={tablePageStyles.container}>
      <h1 className={tablePageStyles.pageTitle}>Histórico de clientes</h1>

      <div className={styles.searchContainer}>
        <span>Mostrar registros de</span>{" "}
        <div className={inputStyles.inputContainer}>
          <input className={inputStyles.input} type="datetime-local" />
        </div>
        <span>até</span>{" "}
        <div className={inputStyles.inputContainer}>
          <input className={inputStyles.input} type="time" />
        </div>
      </div>

      {/* <span className={tablePageStyles.statusLabels}>
        Exibindo {data!.data.length} {data!.data.length === 1 ? "registro" : "registros"}
      </span> */}
      {/* <Table
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
        emptyMessage="Sem registros por aqui... 😞"
      /> */}
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
