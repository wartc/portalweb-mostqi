import { NextPageWithLayout } from "../_app";
import { withAuthorization } from "../../helpers/withAuthorization";
import AuthorizedLayout from "../../layouts/AuthorizedLayout";
import { useRouter } from "next/router";
import { useState } from "react";

import { useQuery } from "react-query";
import { getClients, searchClientsByName } from "../../api/services/clients";
import Loading from "../../components/Loading";

import styles from "./styles.module.scss";
import Table from "../../components/Table";
import Input from "../../components/Input";

const MAX_PAGE_SIZE = 10;

const Clients = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isPreviousData } = useQuery({
    queryKey: ["users", { search, page }],
    queryFn: () =>
      !search ? getClients(page, MAX_PAGE_SIZE) : searchClientsByName(search, page, MAX_PAGE_SIZE),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <Loading visible={true} />;

  if (isError)
    return (
      <div className={styles.errorContainer}>
        <h1>Um erro inesperado ocorreu 😞</h1>
      </div>
    );

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Clientes</h1>
      <Input
        label="Buscar cliente"
        fluid
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <span className={styles.showingLabel}>
        Exibindo {data!.data.length} {data!.data.length > 1 ? "clientes" : "cliente"}
      </span>
      <Table
        columns={[
          { key: "name", title: "NOME" },
          { key: "email", title: "EMAIL" },
          {
            key: "createdAt",
            title: "CADASTRADO EM",
            render: (user) => {
              const created = new Date(user.createdAt);

              return `${created.toLocaleDateString()} às ${created.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`;
            },
          },
        ]}
        data={data?.data!}
        onRowClick={(user) => {
          router.push(`/clients/${user.id}`);
        }}
      />
    </div>
  );
};

const ClientsWithAuthorization: NextPageWithLayout = withAuthorization(Clients, "CONTRIBUTOR");

ClientsWithAuthorization.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ClientsWithAuthorization;
