import { NextPageWithLayout } from "../../_app";
import { withAuthorization } from "../../../helpers/withAuthorization";
import AuthorizedLayout from "../../../layouts/AuthorizedLayout";

const AddClient = () => {
  return <h1>Add client</h1>;
};

const ClientsWithAuthorization: NextPageWithLayout = withAuthorization(AddClient, "CONTRIBUTOR");

ClientsWithAuthorization.getLayout = (page) => <AuthorizedLayout>{page}</AuthorizedLayout>;

export default ClientsWithAuthorization;
