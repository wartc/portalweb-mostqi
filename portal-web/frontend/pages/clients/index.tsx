import { NextPageWithLayout } from "../_app";
import { withAuthorization } from "../../helpers/withAuthorization";
import AuthorizedLayout from "../../layouts/AuthorizedLayout";

import { useQuery } from "react-query";
import { getUsers } from "../../api/services/users";
import Loading from "../../components/Loading";

import styles from "./styles.module.scss";
import Table from "../../components/Table";

const Clients = () => {
  const { data: users, isLoading, isError } = useQuery("users", getUsers);

  if (isLoading) return <Loading visible={true} />;

  if (isError)
    return (
      <div className={styles.errorContainer}>
        <h1>Um erro inesperado ocorreu 😞</h1>
      </div>
    );

  return (
    <div>
      <Table columns={["id", "name", "email", "type"]} data={users!} />
    </div>
  );
};

const ClientsWithAuthorization: NextPageWithLayout = withAuthorization(Clients, "CONTRIBUTOR");

ClientsWithAuthorization.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ClientsWithAuthorization;
