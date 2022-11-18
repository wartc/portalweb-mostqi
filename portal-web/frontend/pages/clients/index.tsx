import { NextPageWithLayout } from "../_app";
import { withAuthorization } from "../../helpers/withAuthorization";
import AuthorizedLayout from "../../layouts/AuthorizedLayout";

const Clients = () => {
  return <h1>Clients</h1>;
};

const ClientsWithAuthorization: NextPageWithLayout = withAuthorization(Clients, "CONTRIBUTOR");

ClientsWithAuthorization.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ClientsWithAuthorization;
