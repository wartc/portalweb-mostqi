import { NextPageWithLayout } from "../_app";
import { withAuthorization } from "../../helpers/withAuthorization";
import AuthorizedLayout from "../../layouts/AuthorizedLayout";

import { useQuery } from "react-query";
import { getUsers } from "../../api/services/users";
import Loading from "../../components/Loading";

import styles from "./styles.module.scss";
import Table from "../../components/Table";
import Input from "../../components/Input";
import { useRouter } from "next/router";

const Clients = () => {
  const router = useRouter();
  const { data: users, isLoading, isError } = useQuery("users", getUsers);

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

      <Input label="Buscar cliente" />

      <span className={styles.showingLabel}>
        Exibindo {users!.length} {users!.length > 1 ? "clientes" : "cliente"}
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
        data={users!}
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
